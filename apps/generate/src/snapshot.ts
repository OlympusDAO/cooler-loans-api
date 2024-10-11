import { adjustDate, getISO8601DateString, setBeforeMidnight, setMidnight } from "@repo/shared/date";
import { logger, throwError } from "@repo/shared/logging";
import { parseNumber } from "@repo/shared/number";
import { LoanSnapshot, LoanSnapshotMap } from "@repo/types/loanSnapshot";
import { Snapshot } from "@repo/types/snapshot";

import {
  ClaimDefaultedLoanEvent,
  ClearinghouseEvents,
  ClearinghouseSnapshot,
  ClearLoanRequestEvent,
  ExtendLoanEvent,
  Loan,
  LoanRequest,
  RepayLoanEvent,
} from "./types";

type DateSnapshot = {
  date: Date;
  snapshot: Snapshot;
  loans: LoanSnapshot[];
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
      collateralDeposited: 0,
      clearinghouse: {
        daiBalance: 0,
        sDaiBalance: 0,
        sDaiInDaiBalance: 0,
        fundAmount: 0,
        fundCadence: 0,
        coolerFactoryAddress: "",
        collateralAddress: "",
        debtAddress: "",
      },
      terms: {
        interestRate: 0,
        duration: 0,
        loanToCollateral: 0,
      },
      treasury: {
        daiBalance: 0,
        sDaiBalance: 0,
        sDaiInDaiBalance: 0,
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
  newSnapshot.collateralDeposited = 0;
  newSnapshot.principalReceivables = 0;
  newSnapshot.interestReceivables = 0;
  newSnapshot.expiryBuckets = {
    active: 0,
    expired: 0,
    days30: 0,
    days121: 0,
  };

  // Ensure the clearinghouse snapshot has a value
  if (!newSnapshot.clearinghouse) {
    newSnapshot.clearinghouse = {
      daiBalance: 0,
      sDaiBalance: 0,
      sDaiInDaiBalance: 0,
      fundAmount: 0,
      fundCadence: 0,
      coolerFactoryAddress: "",
      collateralAddress: "",
      debtAddress: "",
    };
  }

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
      daiBalance: 0,
      sDaiBalance: 0,
      sDaiInDaiBalance: 0,
    };
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

type EventsByTimestamp = Record<
  number,
  {
    clearinghouseSnapshots: ClearinghouseSnapshot[];
    creationEvents: ClearLoanRequestEvent[];
    repaymentEvents: RepayLoanEvent[];
    defaultedClaimEvents: ClaimDefaultedLoanEvent[];
    extendEvents: ExtendLoanEvent[];
    createdLoans: Record<string, Loan>;
    loanRequests: Record<string, LoanRequest>;
  }
>;

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
      dateEventsByTimestamp[timestamp] = {
        clearinghouseSnapshots: [],
        creationEvents: [],
        repaymentEvents: [],
        defaultedClaimEvents: [],
        extendEvents: [],
        createdLoans: {},
        loanRequests: {},
      };
    }
    dateEventsByTimestamp[timestamp].clearinghouseSnapshots.push(clearinghouseSnapshot);
  });

  // Creation events
  const currentCreationEvents = clearinghouseEvents.creationEvents[currentDateString] || [];
  currentCreationEvents.forEach(creationEvent => {
    const timestamp = parseNumber(creationEvent.blockTimestamp);
    if (!dateEventsByTimestamp[timestamp]) {
      dateEventsByTimestamp[timestamp] = {
        clearinghouseSnapshots: [],
        creationEvents: [],
        repaymentEvents: [],
        defaultedClaimEvents: [],
        extendEvents: [],
        createdLoans: {},
        loanRequests: {},
      };
    }
    dateEventsByTimestamp[timestamp].creationEvents.push(creationEvent);
  });

  // Repayment events
  const currentRepaymentEvents = clearinghouseEvents.repaymentEvents[currentDateString] || [];
  currentRepaymentEvents.forEach(repaymentEvent => {
    const timestamp = parseNumber(repaymentEvent.blockTimestamp);
    if (!dateEventsByTimestamp[timestamp]) {
      dateEventsByTimestamp[timestamp] = {
        clearinghouseSnapshots: [],
        creationEvents: [],
        repaymentEvents: [],
        defaultedClaimEvents: [],
        extendEvents: [],
        createdLoans: {},
        loanRequests: {},
      };
    }
    dateEventsByTimestamp[timestamp].repaymentEvents.push(repaymentEvent);
  });

  // Defaulted claim events
  const currentDefaultedClaimEvents = clearinghouseEvents.defaultedClaimEvents[currentDateString] || [];
  currentDefaultedClaimEvents.forEach(defaultedClaimEvent => {
    const timestamp = parseNumber(defaultedClaimEvent.blockTimestamp);
    if (!dateEventsByTimestamp[timestamp]) {
      dateEventsByTimestamp[timestamp] = {
        clearinghouseSnapshots: [],
        creationEvents: [],
        repaymentEvents: [],
        defaultedClaimEvents: [],
        extendEvents: [],
        createdLoans: {},
        loanRequests: {},
      };
    }
    dateEventsByTimestamp[timestamp].defaultedClaimEvents.push(defaultedClaimEvent);
  });

  // Extend events
  const currentExtendEvents = clearinghouseEvents.extendEvents[currentDateString] || [];
  currentExtendEvents.forEach(extendEvent => {
    const timestamp = parseNumber(extendEvent.blockTimestamp);
    if (!dateEventsByTimestamp[timestamp]) {
      dateEventsByTimestamp[timestamp] = {
        clearinghouseSnapshots: [],
        creationEvents: [],
        repaymentEvents: [],
        defaultedClaimEvents: [],
        extendEvents: [],
        createdLoans: {},
        loanRequests: {},
      };
    }
    dateEventsByTimestamp[timestamp].extendEvents.push(extendEvent);
  });

  // Created loans
  const currentCreatedLoans = clearinghouseEvents.createdLoans[currentDateString] || {};
  Object.entries(currentCreatedLoans).forEach(([id, loan]) => {
    const timestamp = parseNumber(loan.createdTimestamp);
    if (!dateEventsByTimestamp[timestamp]) {
      dateEventsByTimestamp[timestamp] = {
        clearinghouseSnapshots: [],
        creationEvents: [],
        repaymentEvents: [],
        defaultedClaimEvents: [],
        extendEvents: [],
        createdLoans: {},
        loanRequests: {},
      };
    }
    dateEventsByTimestamp[timestamp].createdLoans[id] = loan;
  });

  // Loan requests
  const currentLoanRequests = clearinghouseEvents.loanRequests[currentDateString] || {};
  Object.entries(currentLoanRequests).forEach(([id, loanRequest]) => {
    const timestamp = parseNumber(loanRequest.createdTimestamp);
    if (!dateEventsByTimestamp[timestamp]) {
      dateEventsByTimestamp[timestamp] = {
        clearinghouseSnapshots: [],
        creationEvents: [],
        repaymentEvents: [],
        defaultedClaimEvents: [],
        extendEvents: [],
        createdLoans: {},
        loanRequests: {},
      };
    }
    dateEventsByTimestamp[timestamp].loanRequests[id] = loanRequest;
  });

  // Sort the events by timestamp
  Object.entries(dateEventsByTimestamp).sort((a, b) => {
    return parseInt(a[0]) - parseInt(b[0]);
  });

  return dateEventsByTimestamp;
};

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

  while (currentDate.getTime() < endDate.getTime()) {
    const currentDateString = getISO8601DateString(currentDate);
    const currentDateBeforeMidnight = setBeforeMidnight(currentDate);
    logger.info(`${FUNC}: currentDate: ${currentDateString}`);

    // Populate a new Snapshot based on the previous one
    const currentSnapshot = createSnapshot(currentDateBeforeMidnight, previousSnapshot);

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
      currentClearinghouseSnapshots.forEach(clearinghouseSnapshot => {
        logger.debug(`${FUNC}: processing clearinghouse snapshot ${clearinghouseSnapshot.id}`);

        // If there are multiple snapshots in a day, successive ones will overwrite the previous values
        currentSnapshot.clearinghouse.daiBalance = parseNumber(clearinghouseSnapshot.daiBalance);
        currentSnapshot.clearinghouse.sDaiBalance = parseNumber(clearinghouseSnapshot.sDaiBalance);
        currentSnapshot.clearinghouse.sDaiInDaiBalance = parseNumber(clearinghouseSnapshot.sDaiInDaiBalance);
        currentSnapshot.clearinghouse.fundAmount = parseNumber(clearinghouseSnapshot.fundAmount);
        currentSnapshot.clearinghouse.fundCadence = parseNumber(clearinghouseSnapshot.fundCadence);
        currentSnapshot.clearinghouse.coolerFactoryAddress = clearinghouseSnapshot.coolerFactoryAddress;
        currentSnapshot.clearinghouse.collateralAddress = clearinghouseSnapshot.collateralAddress;
        currentSnapshot.clearinghouse.debtAddress = clearinghouseSnapshot.debtAddress;

        currentSnapshot.treasury.daiBalance = parseNumber(clearinghouseSnapshot.treasuryDaiBalance);
        currentSnapshot.treasury.sDaiBalance = parseNumber(clearinghouseSnapshot.treasurySDaiBalance);
        currentSnapshot.treasury.sDaiInDaiBalance = parseNumber(clearinghouseSnapshot.treasurySDaiInDaiBalance);

        currentSnapshot.terms.interestRate = parseNumber(clearinghouseSnapshot.interestRate);
        currentSnapshot.terms.duration = parseNumber(clearinghouseSnapshot.duration);
        currentSnapshot.terms.loanToCollateral = parseNumber(clearinghouseSnapshot.loanToCollateral);
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

        // Add any new loans into running list
        logger.debug(`${FUNC}: creationEvent.loan.id: ${creationEvent.loan.id}`);
        currentLoansMap[creationEvent.loan.id] = {
          snapshotDate: getISO8601DateString(currentDateBeforeMidnight),
          id: creationEvent.loan.id,
          loanId: parseNumber(loan.loanId),
          createdTimestamp: parseNumber(creationEvent.blockTimestamp),
          coolerAddress: loan.cooler,
          borrowerAddress: loan.borrower,
          lenderAddress: loan.lender,
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

        // Adjust the clearinghouse and treasury balances to reflect the value at the time of the event
        currentSnapshot.clearinghouse.daiBalance = parseNumber(creationEvent.clearinghouseDaiBalance);
        currentSnapshot.clearinghouse.sDaiBalance = parseNumber(creationEvent.clearinghouseSDaiBalance);
        currentSnapshot.clearinghouse.sDaiInDaiBalance = parseNumber(creationEvent.clearinghouseSDaiInDaiBalance);
        currentSnapshot.treasury.daiBalance = parseNumber(creationEvent.treasuryDaiBalance);
        currentSnapshot.treasury.sDaiBalance = parseNumber(creationEvent.treasurySDaiBalance);
        currentSnapshot.treasury.sDaiInDaiBalance = parseNumber(creationEvent.treasurySDaiInDaiBalance);
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

        // Adjust the clearinghouse and treasury balances to reflect the value at the time of the event
        currentSnapshot.clearinghouse.daiBalance = parseNumber(repaymentEvent.clearinghouseDaiBalance);
        currentSnapshot.clearinghouse.sDaiBalance = parseNumber(repaymentEvent.clearinghouseSDaiBalance);
        currentSnapshot.clearinghouse.sDaiInDaiBalance = parseNumber(repaymentEvent.clearinghouseSDaiInDaiBalance);
        currentSnapshot.treasury.daiBalance = parseNumber(repaymentEvent.treasuryDaiBalance);
        currentSnapshot.treasury.sDaiBalance = parseNumber(repaymentEvent.treasurySDaiBalance);
        currentSnapshot.treasury.sDaiInDaiBalance = parseNumber(repaymentEvent.treasurySDaiInDaiBalance);
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

        const collateralValueClaimed = parseNumber(defaultedClaimEvent.collateralValueClaimed);

        // Update the loan
        loan.status = "Reclaimed";
        loan.collateralClaimedQuantity += parseNumber(defaultedClaimEvent.collateralQuantityClaimed);
        loan.collateralClaimedValue += collateralValueClaimed;
        loan.collateralDeposited = 0;

        // Calculate the income from the collateral claim
        const collateralIncome = collateralValueClaimed - (loan.principal - loan.principalPaid);
        loan.collateralIncome += collateralIncome;

        // Set the income from the default claim
        currentSnapshot.collateralIncome += collateralIncome;
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

        // Adjust the clearinghouse and treasury balances to reflect the value at the time of the event
        currentSnapshot.clearinghouse.daiBalance = parseNumber(extendEvent.clearinghouseDaiBalance);
        currentSnapshot.clearinghouse.sDaiBalance = parseNumber(extendEvent.clearinghouseSDaiBalance);
        currentSnapshot.clearinghouse.sDaiInDaiBalance = parseNumber(extendEvent.clearinghouseSDaiInDaiBalance);
        currentSnapshot.treasury.daiBalance = parseNumber(extendEvent.treasuryDaiBalance);
        currentSnapshot.treasury.sDaiBalance = parseNumber(extendEvent.treasurySDaiBalance);
        currentSnapshot.treasury.sDaiInDaiBalance = parseNumber(extendEvent.treasurySDaiInDaiBalance);
      });
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

    dateSnapshots.push({
      date: currentDateBeforeMidnight,
      snapshot: currentSnapshot,
      loans: Object.values(currentLoansMap),
    });

    previousSnapshot = currentSnapshot;
    previousLoans = currentLoansMap;
    currentDate = adjustDate(currentDate, 1);
  }

  logger.info(`${FUNC}: Completed generating snapshots`);

  return dateSnapshots;
};
