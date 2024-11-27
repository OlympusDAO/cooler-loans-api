import { adjustDate, getISO8601DateString, setBeforeMidnight, setMidnight } from "@repo/shared/date";
import { logger, throwError } from "@repo/shared/logging";
import { parseNumber } from "@repo/shared/number";
import {
  ClaimDefaultedLoanEvent,
  ClearinghouseSnapshot,
  ClearLoanRequestEvent,
  CoolerLoan,
  CoolerLoanRequest,
  ExtendLoanEvent,
  RepayLoanEvent,
} from "@repo/subgraph-cache-types/types";
import { LoanSnapshot, LoanSnapshotMap } from "@repo/types/loanSnapshot";
import { ClearinghouseBalanceSnapshot, Snapshot } from "@repo/types/snapshot";

import { ClearinghouseEvents } from "./types";

type DateSnapshot = {
  /**
   * The date of the snapshot
   */
  date: Date;
  /**
   * The snapshot
   */
  snapshot: Snapshot;
  /**
   * A mapping between the loan id and the loan snapshot
   */
  loans: Record<string, LoanSnapshot>;
};

/**
 * A map of clearinghouse addresses to the clearinghouse balance snapshot
 */
type ClearinghouseBalanceSnapshotMap = Record<string, ClearinghouseBalanceSnapshot>;

/**
 * Updates the day's Clearinghouse balance snapshot with the latest values.
 *
 * This is needed as there are multiple Clearinghouses, which each can have multiple updates per day.
 *
 * @param clearinghouseBalanceSnapshotMap
 * @param lender
 * @param reserveBalance
 * @param sReserveBalance
 * @param sReserveInReserveBalance
 */
const updateClearinghouseBalanceSnapshot = (
  clearinghouseBalanceSnapshotMap: Record<string, ClearinghouseBalanceSnapshot>,
  lender: string,
  reserveBalance: string | number,
  sReserveBalance: string | number,
  sReserveInReserveBalance: string | number,
) => {
  const clearinghouseBalanceSnapshot = clearinghouseBalanceSnapshotMap[lender];
  if (!clearinghouseBalanceSnapshot) {
    throwError(`updateClearinghouseBalanceSnapshot: Could not find clearinghouse balance snapshot for ${lender}`);
  }

  clearinghouseBalanceSnapshot.reserveBalance = parseNumber(reserveBalance);
  clearinghouseBalanceSnapshot.sReserveBalance = parseNumber(sReserveBalance);
  clearinghouseBalanceSnapshot.sReserveInReserveBalance = parseNumber(sReserveInReserveBalance);
};

/**
 * Updates the snapshot's treasury with the latest values.
 *
 * @param snapshot - The snapshot to update
 * @param clearinghouseSnapshot - The clearinghouse snapshot to update from
 */
const updateSnapshotTreasury = (snapshot: Snapshot, clearinghouseSnapshot: ClearinghouseSnapshot) => {
  snapshot.treasury.reserveBalance = parseNumber(clearinghouseSnapshot.treasuryReserveBalance);
  snapshot.treasury.sReserveBalance = parseNumber(clearinghouseSnapshot.treasurySReserveBalance);
  snapshot.treasury.sReserveInReserveBalance = parseNumber(clearinghouseSnapshot.treasurySReserveInReserveBalance);
};

const calculateInterestRepayment = (repayment: number, loan: LoanSnapshot): number => {
  logger.debug(`repayment is ${repayment}`);
  const interestDue = loan.interest - loan.interestPaid;
  logger.debug(`Interest due: ${interestDue}`);

  if (repayment > interestDue) {
    return interestDue;
  }

  return repayment;
};

const calculatePrincipalRepayment = (repayment: number, loan: LoanSnapshot): number => {
  logger.debug(`repayment is ${repayment}`);
  const interestRepayment = calculateInterestRepayment(repayment, loan);

  if (interestRepayment <= 0) {
    logger.debug(`No interest payment. Making full repayment of ${repayment}`);
    return repayment;
  }

  // Interest is paid first
  const principalRepayment = repayment - interestRepayment;
  logger.debug(`Principal repayment after deduction of interest is ${principalRepayment}`);
  return principalRepayment;
};

const createSnapshot = (currentDate: Date, previousSnapshot: Snapshot | null): Snapshot => {
  const FUNC = "createSnapshot";
  // If there is no previous snapshot, return a new one
  if (!previousSnapshot) {
    logger.debug(`${FUNC}: No previous snapshot found`);
    return {
      snapshotDate: getISO8601DateString(currentDate),
      principalReceivables: 0,
      interestReceivables: 0,
      interestIncome: 0,
      collateralIncome: 0,
      collateralClaimedQuantity: 0,
      collateralClaimedValue: 0,
      collateralDeposited: 0,
      clearinghouses: [],
      clearinghouseTotals: {
        reserveBalance: 0,
        sReserveBalance: 0,
        sReserveInReserveBalance: 0,
      },
      terms: {
        interestRate: 0,
        duration: 0,
        loanToCollateral: 0,
      },
      treasury: {
        reserveBalance: 0,
        sReserveBalance: 0,
        sReserveInReserveBalance: 0,
      },
      expiryBuckets: {
        active: 0,
        expired: 0,
        days30: 0,
        days121: 0,
      },
    };
  }

  // Otherwise, return a new one based on the previous day
  logger.debug(`${FUNC}: Previous snapshot for ${previousSnapshot.snapshotDate} found. Copying.`);
  const newSnapshot = JSON.parse(JSON.stringify(previousSnapshot)) as Snapshot;

  // Set the current date
  newSnapshot.snapshotDate = getISO8601DateString(currentDate);

  // Some snapshot values are not carried over
  newSnapshot.interestIncome = 0;
  newSnapshot.collateralIncome = 0;
  newSnapshot.collateralClaimedQuantity = 0;
  newSnapshot.collateralClaimedValue = 0;
  newSnapshot.collateralDeposited = 0;
  newSnapshot.principalReceivables = 0;
  newSnapshot.interestReceivables = 0;
  newSnapshot.expiryBuckets = {
    active: 0,
    expired: 0,
    days30: 0,
    days121: 0,
  };
  newSnapshot.clearinghouseTotals = {
    reserveBalance: 0,
    sReserveBalance: 0,
    sReserveInReserveBalance: 0,
  };

  // Ensure the terms has a value
  if (!newSnapshot.terms) {
    newSnapshot.terms = {
      interestRate: 0,
      duration: 0,
      loanToCollateral: 0,
    };
  }

  // Ensure the treasury snapshot has a value
  if (!newSnapshot.treasury) {
    newSnapshot.treasury = {
      reserveBalance: 0,
      sReserveBalance: 0,
      sReserveInReserveBalance: 0,
    };
  }

  // Ensure the clearinghouses has an array
  if (!newSnapshot.clearinghouses) {
    newSnapshot.clearinghouses = [];
  }

  return newSnapshot;
};

const getSecondsToExpiry = (currentDate: Date, expiryTimestamp: number): number => {
  const expiryDate = new Date(expiryTimestamp * 1000);
  const timestampDifference = expiryDate.getTime() - currentDate.getTime();
  if (timestampDifference < 0) {
    return 0;
  }

  return Math.floor(timestampDifference / 1000);
};

/**
 * Maps a timestamp to the events that occurred at that timestamp
 */
type EventsByTimestamp = Record<
  number,
  {
    /**
     * A map of clearinghouse snapshot ids to the clearinghouse snapshots
     */
    clearinghouseSnapshots: Record<string, ClearinghouseSnapshot>;
    creationEvents: ClearLoanRequestEvent[];
    repaymentEvents: RepayLoanEvent[];
    defaultedClaimEvents: ClaimDefaultedLoanEvent[];
    extendEvents: ExtendLoanEvent[];
    createdLoans: Record<string, CoolerLoan>;
    loanRequests: Record<string, CoolerLoanRequest>;
  }
>;

const newDateEvents = () => {
  return {
    clearinghouseSnapshots: {},
    creationEvents: [],
    repaymentEvents: [],
    defaultedClaimEvents: [],
    extendEvents: [],
    createdLoans: {},
    loanRequests: {},
  };
};

const populateEventsByTimestamp = (
  currentDateString: string,
  clearinghouseEvents: ClearinghouseEvents,
): EventsByTimestamp => {
  const dateEventsByTimestamp: EventsByTimestamp = {};

  // Clearinghouse snapshots
  const currentClearinghouseSnapshots = clearinghouseEvents.clearinghouseSnapshots[currentDateString] || [];
  currentClearinghouseSnapshots.forEach(clearinghouseSnapshot => {
    const timestamp = parseNumber(clearinghouseSnapshot.blockTimestamp);
    if (!dateEventsByTimestamp[timestamp]) {
      dateEventsByTimestamp[timestamp] = newDateEvents();
    }
    dateEventsByTimestamp[timestamp].clearinghouseSnapshots[clearinghouseSnapshot.id] = clearinghouseSnapshot;
  });

  // Creation events
  const currentCreationEvents = clearinghouseEvents.creationEvents[currentDateString] || [];
  currentCreationEvents.forEach(creationEvent => {
    const timestamp = parseNumber(creationEvent.blockTimestamp);
    if (!dateEventsByTimestamp[timestamp]) {
      dateEventsByTimestamp[timestamp] = newDateEvents();
    }
    dateEventsByTimestamp[timestamp].creationEvents.push(creationEvent);
  });

  // Repayment events
  const currentRepaymentEvents = clearinghouseEvents.repaymentEvents[currentDateString] || [];
  currentRepaymentEvents.forEach(repaymentEvent => {
    const timestamp = parseNumber(repaymentEvent.blockTimestamp);
    if (!dateEventsByTimestamp[timestamp]) {
      dateEventsByTimestamp[timestamp] = newDateEvents();
    }
    dateEventsByTimestamp[timestamp].repaymentEvents.push(repaymentEvent);
  });

  // Defaulted claim events
  const currentDefaultedClaimEvents = clearinghouseEvents.defaultedClaimEvents[currentDateString] || [];
  currentDefaultedClaimEvents.forEach(defaultedClaimEvent => {
    const timestamp = parseNumber(defaultedClaimEvent.blockTimestamp);
    if (!dateEventsByTimestamp[timestamp]) {
      dateEventsByTimestamp[timestamp] = newDateEvents();
    }
    dateEventsByTimestamp[timestamp].defaultedClaimEvents.push(defaultedClaimEvent);
  });

  // Extend events
  const currentExtendEvents = clearinghouseEvents.extendEvents[currentDateString] || [];
  currentExtendEvents.forEach(extendEvent => {
    const timestamp = parseNumber(extendEvent.blockTimestamp);
    if (!dateEventsByTimestamp[timestamp]) {
      dateEventsByTimestamp[timestamp] = newDateEvents();
    }
    dateEventsByTimestamp[timestamp].extendEvents.push(extendEvent);
  });

  // Created loans
  const currentCreatedLoans = clearinghouseEvents.createdLoans[currentDateString] || {};
  Object.entries(currentCreatedLoans).forEach(([id, loan]) => {
    const timestamp = parseNumber(loan.createdTimestamp);
    if (!dateEventsByTimestamp[timestamp]) {
      dateEventsByTimestamp[timestamp] = newDateEvents();
    }
    dateEventsByTimestamp[timestamp].createdLoans[id] = loan;
  });

  // Loan requests
  const currentLoanRequests = clearinghouseEvents.loanRequests[currentDateString] || {};
  Object.entries(currentLoanRequests).forEach(([id, loanRequest]) => {
    const timestamp = parseNumber(loanRequest.createdTimestamp);
    if (!dateEventsByTimestamp[timestamp]) {
      dateEventsByTimestamp[timestamp] = newDateEvents();
    }
    dateEventsByTimestamp[timestamp].loanRequests[id] = loanRequest;
  });

  // Sort the events by timestamp
  Object.entries(dateEventsByTimestamp).sort((a, b) => {
    return parseInt(a[0]) - parseInt(b[0]);
  });

  return dateEventsByTimestamp;
};

const generateClearinghouseBalanceSnapshotsMap = (
  clearinghouseSnapshots: ClearinghouseBalanceSnapshot[],
): ClearinghouseBalanceSnapshotMap => {
  const clearinghouseBalanceSnapshotsMap: ClearinghouseBalanceSnapshotMap = {};
  clearinghouseSnapshots.forEach(snapshot => {
    clearinghouseBalanceSnapshotsMap[snapshot.address] = snapshot;
  });

  return clearinghouseBalanceSnapshotsMap;
};

/**
 * Generate a series of snapshots from the start date to the before date
 *
 * @param startDate - The start date
 * @param beforeDate - The date to stop at
 * @param previousSnapshotIn - The previous snapshot, if it exists
 * @param previousLoanSnapshotIn - The previous loan snapshot, if it exists
 * @param clearinghouseEvents - The clearinghouse events
 * @returns An array of snapshots in ascending order
 */
export const generateSnapshots = (
  startDate: Date,
  beforeDate: Date,
  previousSnapshotIn: Snapshot | null,
  previousLoanSnapshotIn: LoanSnapshotMap | null,
  clearinghouseEvents: ClearinghouseEvents,
): DateSnapshot[] => {
  const FUNC = "generateSnapshots";
  const dateSnapshots: DateSnapshot[] = [];

  // Iterate through the dates
  let currentDate = setMidnight(startDate);
  const endDate = beforeDate;

  logger.info(
    `${FUNC}: Generating snapshots from ${getISO8601DateString(currentDate)} to ${getISO8601DateString(endDate)}`,
  );

  let previousSnapshot: Snapshot | null = previousSnapshotIn;
  if (previousSnapshot) {
    logger.debug(`Previous snapshot exists with date: ${previousSnapshot.snapshotDate}`);
  }

  let previousLoans: LoanSnapshotMap = previousLoanSnapshotIn || {};

  let previousClearinghouseBalanceSnapshotsMap: ClearinghouseBalanceSnapshotMap = {};
  if (previousSnapshot) {
    previousClearinghouseBalanceSnapshotsMap = generateClearinghouseBalanceSnapshotsMap(
      previousSnapshot.clearinghouses,
    );
  }

  while (currentDate.getTime() < endDate.getTime()) {
    const currentDateString = getISO8601DateString(currentDate);
    const currentDateBeforeMidnight = setBeforeMidnight(currentDate);
    logger.info(`${FUNC}: currentDate: ${currentDateString}`);

    // Populate a new Snapshot based on the previous one
    const currentSnapshot = createSnapshot(currentDateBeforeMidnight, previousSnapshot);

    // Populate a new ClearinghouseBalanceSnapshotMap based on a deep copy of the previous one
    // This will track the latest balances for each clearinghouse
    const currentClearinghouseBalanceSnapshotsMap = structuredClone(previousClearinghouseBalanceSnapshotsMap);

    // Populate a new LoanSnapshotMap based on a deep copy of the previous one
    const currentLoansMap = structuredClone(previousLoans);
    // Adjust the snapshot date in the new loans
    Object.values(currentLoansMap).forEach(loan => {
      loan.snapshotDate = getISO8601DateString(currentDateBeforeMidnight);
    });

    // Order all events by block timestamp
    const currentDateEventsByTimestamp: EventsByTimestamp = populateEventsByTimestamp(
      currentDateString,
      clearinghouseEvents,
    );

    // Iterate by timestamp, so that events are processed in order
    for (const [timestamp, records] of Object.entries(currentDateEventsByTimestamp)) {
      logger.debug(`${FUNC}: processing events for timestamp ${new Date(parseInt(timestamp) * 1000).toISOString()}`);

      // Update clearinghouse data, if it exists
      const currentClearinghouseSnapshots = records.clearinghouseSnapshots;
      logger.debug(`${FUNC}: processing ${currentClearinghouseSnapshots.length} clearinghouse snapshots`);
      Object.values(currentClearinghouseSnapshots).forEach(clearinghouseSnapshot => {
        logger.debug(`${FUNC}: processing clearinghouse snapshot ${clearinghouseSnapshot.id}`);

        // Fetch the clearinghouse
        const clearinghouse = clearinghouseEvents.clearinghouses[clearinghouseSnapshot.clearinghouse.id];
        if (!clearinghouse) {
          throwError(`clearinghouseSnapshots: Could not find clearinghouse ${clearinghouseSnapshot.clearinghouse.id}`);
        }

        // Overwrite any existing ClearinghouseBalanceSnapshot with the values from the ClearinghouseSnapshot event
        // Subsequent events may overwrite the balances, but won't have the backing ClearinghouseSnapshot
        currentClearinghouseBalanceSnapshotsMap[clearinghouseSnapshot.clearinghouse.id] = {
          address: clearinghouseSnapshot.clearinghouse.id,
          reserveBalance: parseNumber(clearinghouseSnapshot.reserveBalance),
          sReserveBalance: parseNumber(clearinghouseSnapshot.sReserveBalance),
          sReserveInReserveBalance: parseNumber(clearinghouseSnapshot.sReserveInReserveBalance),
          fundAmount: parseNumber(clearinghouse.fundAmount),
          fundCadence: parseNumber(clearinghouse.fundCadence),
          coolerFactoryAddress: clearinghouse.coolerFactoryAddress,
          collateralAddress: clearinghouse.collateralToken,
          debtAddress: clearinghouse.reserveToken,
        };

        updateSnapshotTreasury(currentSnapshot, clearinghouseSnapshot);

        currentSnapshot.terms.interestRate = parseNumber(clearinghouse.interestRate);
        currentSnapshot.terms.duration = parseNumber(clearinghouse.duration);
        currentSnapshot.terms.loanToCollateral = parseNumber(clearinghouse.loanToCollateral);
      });

      // Create loans where there were creation events
      const currentCreationEvents = records.creationEvents;
      logger.debug(`${FUNC}: processing ${currentCreationEvents.length} creation events`);
      currentCreationEvents.forEach(creationEvent => {
        logger.debug(`${FUNC}: processing creation event ${creationEvent.id}`);

        // Fetch the loan from the created loans
        const loan = records.createdLoans[creationEvent.id];
        if (!loan) {
          throwError(`creationEvents: Could not find loan ${creationEvent.loan.id}`);
        }

        // Fetch the loan request
        const loanRequest = records.loanRequests[loan.request.id];
        if (!loanRequest) {
          throwError(`creationEvents: Could not find loan request ${loan.request.id}`);
        }

        // Fetch the clearinghouse snapshot
        const clearinghouseSnapshot = records.clearinghouseSnapshots[creationEvent.clearinghouseSnapshot.id];
        if (!clearinghouseSnapshot) {
          throwError(`creationEvents: Could not find clearinghouse snapshot ${creationEvent.clearinghouseSnapshot.id}`);
        }

        // Add any new loans into running list
        logger.debug(`${FUNC}: creationEvent.loan.id: ${creationEvent.loan.id}`);
        currentLoansMap[creationEvent.loan.id] = {
          snapshotDate: getISO8601DateString(currentDateBeforeMidnight),
          id: creationEvent.loan.id,
          loanId: parseNumber(loan.loanId),
          createdTimestamp: parseNumber(creationEvent.blockTimestamp),
          coolerAddress: loan.cooler,
          borrowerAddress: loan.borrower,
          lenderAddress: loan.clearinghouse.id,
          principal: parseNumber(loan.principal),
          interest: parseNumber(loan.interest),
          collateralDeposited: parseNumber(loan.collateral),
          expiryTimestamp: parseNumber(loan.expiryTimestamp),
          secondsToExpiry: getSecondsToExpiry(currentDateBeforeMidnight, parseNumber(loan.expiryTimestamp)),
          status: "Active",
          principalPaid: 0,
          interestPaid: 0,
          collateralIncome: 0,
          collateralClaimedQuantity: 0,
          collateralClaimedValue: 0,
          interestRate: parseNumber(loanRequest.interestPercentage),
          durationSeconds: parseNumber(loanRequest.durationSeconds),
        };

        // Adjust the clearinghouse balances to reflect the value at the time of the event
        updateClearinghouseBalanceSnapshot(
          currentClearinghouseBalanceSnapshotsMap,
          loan.clearinghouse.id,
          clearinghouseSnapshot.reserveBalance,
          clearinghouseSnapshot.sReserveBalance,
          clearinghouseSnapshot.sReserveInReserveBalance,
        );
        updateSnapshotTreasury(currentSnapshot, clearinghouseSnapshot);
      });

      // Update loans where there were repayment events
      const currentRepaymentEvents = records.repaymentEvents;
      logger.debug(`${FUNC}: processing ${currentRepaymentEvents.length} repayment events`);
      currentRepaymentEvents.forEach(repaymentEvent => {
        logger.debug(`${FUNC}: processing repayment event ${repaymentEvent.id}`);

        // Find the loan
        const loan = currentLoansMap[repaymentEvent.loan.id];
        if (!loan) {
          throwError(`repaymentEvents: Could not find loan ${repaymentEvent.loan.id}`);
        }

        // Fetch the clearinghouse snapshot
        const clearinghouseSnapshot = records.clearinghouseSnapshots[repaymentEvent.clearinghouseSnapshot.id];
        if (!clearinghouseSnapshot) {
          throwError(
            `repaymentEvents: Could not find clearinghouse snapshot ${repaymentEvent.clearinghouseSnapshot.id}`,
          );
        }

        // Update the loan state
        loan.collateralDeposited = parseNumber(repaymentEvent.collateralDeposited);

        // Calculate the interest and principal paid for this payment
        const eventAmountPaid = parseNumber(repaymentEvent.amountPaid);
        const interestRepayment = calculateInterestRepayment(eventAmountPaid, loan);
        const principalRepayment = calculatePrincipalRepayment(eventAmountPaid, loan);
        logger.debug(`${FUNC}: eventAmountPaid: ${eventAmountPaid}`);
        logger.debug(`${FUNC}: interestRepayment: ${interestRepayment}`);
        logger.debug(`${FUNC}: principalRepayment: ${principalRepayment}`);

        loan.interestPaid += interestRepayment;
        loan.principalPaid += principalRepayment;

        // Set the income from the repayment
        currentSnapshot.interestIncome += interestRepayment;

        // Adjust the clearinghouse balances to reflect the value at the time of the event
        updateClearinghouseBalanceSnapshot(
          currentClearinghouseBalanceSnapshotsMap,
          loan.lenderAddress,
          clearinghouseSnapshot.reserveBalance,
          clearinghouseSnapshot.sReserveBalance,
          clearinghouseSnapshot.sReserveInReserveBalance,
        );
        updateSnapshotTreasury(currentSnapshot, clearinghouseSnapshot);
      });

      // Update loans where there were defaulted claim events
      const currentDefaultedClaimEvents = records.defaultedClaimEvents;
      logger.debug(`${FUNC}: processing ${currentDefaultedClaimEvents.length} default claim events`);
      currentDefaultedClaimEvents.forEach(defaultedClaimEvent => {
        logger.debug(`${FUNC}: processing default claim event ${defaultedClaimEvent.id}`);

        // Find the loan
        const loan = currentLoansMap[defaultedClaimEvent.loan.id];
        if (!loan) {
          throwError(`defaultedClaim: Could not find loan ${defaultedClaimEvent.loan.id}`);
        }

        // Fetch the clearinghouse snapshot
        const clearinghouseSnapshot = records.clearinghouseSnapshots[defaultedClaimEvent.clearinghouseSnapshot.id];
        if (!clearinghouseSnapshot) {
          throwError(
            `defaultedClaim: Could not find clearinghouse snapshot ${defaultedClaimEvent.clearinghouseSnapshot.id}`,
          );
        }

        const collateralValueClaimed = parseNumber(defaultedClaimEvent.collateralValueClaimed);

        // Update the loan
        loan.status = "Reclaimed";
        loan.collateralClaimedQuantity += parseNumber(defaultedClaimEvent.collateralQuantityClaimed);
        loan.collateralClaimedValue += collateralValueClaimed;
        loan.collateralDeposited = 0;

        // Calculate the income from the collateral claim
        const collateralIncome = collateralValueClaimed - (loan.principal - loan.principalPaid);
        loan.collateralIncome += collateralIncome;

        // Update the overall snapshot with reclaimed collateral
        currentSnapshot.collateralIncome += collateralIncome;
        currentSnapshot.collateralClaimedQuantity += loan.collateralClaimedQuantity;
        currentSnapshot.collateralClaimedValue += loan.collateralClaimedValue;

        // Adjust the clearinghouse balances to reflect the value at the time of the event
        updateClearinghouseBalanceSnapshot(
          currentClearinghouseBalanceSnapshotsMap,
          loan.lenderAddress,
          clearinghouseSnapshot.reserveBalance,
          clearinghouseSnapshot.sReserveBalance,
          clearinghouseSnapshot.sReserveInReserveBalance,
        );
        updateSnapshotTreasury(currentSnapshot, clearinghouseSnapshot);
      });

      // Update loans where there were extend events
      const currentExtendEvents = records.extendEvents;
      logger.debug(`${FUNC}: processing ${currentExtendEvents.length} extend events`);
      currentExtendEvents.forEach(extendEvent => {
        logger.debug(`${FUNC}: processing extend event ${extendEvent.id}`);

        // Find the loan
        const loan = currentLoansMap[extendEvent.loan.id];
        if (!loan) {
          throwError(`extendEvents: Could not find loan ${extendEvent.loan.id}`);
        }

        // Fetch the clearinghouse snapshot
        const clearinghouseSnapshot = records.clearinghouseSnapshots[extendEvent.clearinghouseSnapshot.id];
        if (!clearinghouseSnapshot) {
          throwError(`extendEvents: Could not find clearinghouse snapshot ${extendEvent.clearinghouseSnapshot.id}`);
        }

        // Update the loan
        loan.status = "Active";
        loan.expiryTimestamp = parseNumber(extendEvent.expiryTimestamp);

        // Additional interest is paid at the time a loan is extended
        // No impact on receivables
        // https://github.com/ohmzeus/Cooler/pull/63
        const interestPerPeriod =
          ((loan.principal - loan.principalPaid) * loan.interestRate * loan.durationSeconds) / (365 * 24 * 60 * 60);
        logger.debug(
          `${FUNC}: interestPerPeriod for loan ${loan.id} on remaining principal ${
            loan.principal - loan.principalPaid
          }: ${interestPerPeriod}`,
        );
        const newInterest = parseNumber(extendEvent.periods) * interestPerPeriod;
        loan.interest += newInterest;
        loan.interestPaid += newInterest;

        // The interest income is updated
        currentSnapshot.interestIncome += newInterest;

        // Adjust the clearinghouse balances to reflect the value at the time of the event
        updateClearinghouseBalanceSnapshot(
          currentClearinghouseBalanceSnapshotsMap,
          loan.lenderAddress,
          clearinghouseSnapshot.reserveBalance,
          clearinghouseSnapshot.sReserveBalance,
          clearinghouseSnapshot.sReserveInReserveBalance,
        );
        updateSnapshotTreasury(currentSnapshot, clearinghouseSnapshot);
      });

      // No need to handle defund events, as there is a clearinghouse snapshot created for each defund event

      // No need to handle rebalance events, as there is a clearinghouse snapshot created for each rebalance event
    }

    // Update secondsToExpiry and status for all loans
    const loans = Object.values(currentLoansMap);
    logger.debug(`${FUNC}: processing ${loans.length} loans`);
    loans.forEach(loan => {
      // Update the seconds to expiry
      loan.secondsToExpiry = getSecondsToExpiry(currentDateBeforeMidnight, loan.expiryTimestamp);

      // Update the collateral deposited
      currentSnapshot.collateralDeposited += loan.collateralDeposited;

      /**
       * Status
       */
      // If the loan is fully repaid, update the status
      if (loan.interestPaid >= loan.interest && loan.principalPaid >= loan.principal) {
        loan.status = "Repaid";
      } else if (loan.status !== "Reclaimed" && loan.secondsToExpiry <= 0) {
        loan.status = "Expired";
      }
      // Default status is Active, so doesn't need to be handled

      /**
       * Receivables
       */
      // If it isn't reclaimed or repaid, then the interest and principal are receivables
      if (loan.status !== "Reclaimed" && loan.status !== "Repaid") {
        currentSnapshot.interestReceivables += loan.interest - loan.interestPaid;
        currentSnapshot.principalReceivables += loan.principal - loan.principalPaid;
      }
    });

    // Update the expiry buckets
    logger.debug(`${FUNC}: updating expiry buckets`);
    loans.forEach(loan => {
      // Exclude repaid and reclaimed loans
      if (loan.status === "Repaid" || loan.status === "Reclaimed") {
        return;
      }

      const principalDue = loan.principal - loan.principalPaid;

      // Handle expired but unclaimed loans
      if (loan.status === "Expired") {
        // Expired loans are bucketed into the "expired" bucket
        currentSnapshot.expiryBuckets.expired += principalDue;
        return;
      }

      // Expiring within 30 days
      if (loan.secondsToExpiry <= 30 * 24 * 60 * 60) {
        currentSnapshot.expiryBuckets.days30 += principalDue;
        return;
      }

      // Expiring within 121 days
      if (loan.secondsToExpiry <= 121 * 24 * 60 * 60) {
        currentSnapshot.expiryBuckets.days121 += principalDue;
        return;
      }

      // Otherwise active
      currentSnapshot.expiryBuckets.active += principalDue;
    });

    // Update the clearinghouse balance totals
    Object.values(currentClearinghouseBalanceSnapshotsMap).forEach(clearinghouseBalanceSnapshot => {
      currentSnapshot.clearinghouseTotals.reserveBalance += clearinghouseBalanceSnapshot.reserveBalance;
      currentSnapshot.clearinghouseTotals.sReserveBalance += clearinghouseBalanceSnapshot.sReserveBalance;
      currentSnapshot.clearinghouseTotals.sReserveInReserveBalance +=
        clearinghouseBalanceSnapshot.sReserveInReserveBalance;
    });

    // Update the clearinghouses array
    currentSnapshot.clearinghouses = Object.values(currentClearinghouseBalanceSnapshotsMap);

    dateSnapshots.push({
      date: currentDateBeforeMidnight,
      snapshot: currentSnapshot,
      loans: currentLoansMap,
    });

    previousSnapshot = currentSnapshot;
    previousClearinghouseBalanceSnapshotsMap = currentClearinghouseBalanceSnapshotsMap;
    previousLoans = currentLoansMap;
    currentDate = adjustDate(currentDate, 1);
  }

  logger.info(`${FUNC}: Completed generating snapshots`);

  return dateSnapshots;
};
