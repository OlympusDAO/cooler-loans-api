import { LoanSnapshot, LoanSnapshotMap } from "@repo/types/src/loanSnapshot";
import { Snapshot } from "@repo/types/src/snapshot";

import {
  adjustDate,
  getISO8601DateString,
  setBeforeMidnight,
  setMidnight,
} from "../../../packages/shared/src/dateHelper";
import { parseNumber } from "../../../packages/shared/src/numberHelper";
import {
  ClaimDefaultedLoanEventOptional,
  ClearinghouseSnapshotOptional,
  ClearLoanRequestEventOptional,
  ExtendLoanEventOptional,
  RepayLoanEventOptional,
  SubgraphData,
} from "../../../src/types/subgraph";

type DateSnapshot = {
  date: Date;
  snapshot: Snapshot;
  loans: LoanSnapshot[];
};

const calculateInterestRepayment = (repayment: number, loan: LoanSnapshot): number => {
  console.log(`repayment is ${repayment}`);
  const interestDue = loan.interest - loan.interestPaid;
  console.log(`Interest due: ${interestDue}`);

  if (repayment > interestDue) {
    return interestDue;
  }

  return repayment;
};

const calculatePrincipalRepayment = (repayment: number, loan: LoanSnapshot): number => {
  console.log(`repayment is ${repayment}`);
  const interestRepayment = calculateInterestRepayment(repayment, loan);

  if (interestRepayment <= 0) {
    console.log(`No interest payment. Making full repayment of ${repayment}`);
    return repayment;
  }

  // Interest is paid first
  const principalRepayment = repayment - interestRepayment;
  console.log(`Principal repayment after deduction of interest is ${principalRepayment}`);
  return principalRepayment;
};

const createSnapshot = (currentDate: Date, previousSnapshot: Snapshot | null): Snapshot => {
  const FUNC = "createSnapshot";
  // If there is no previous snapshot, return a new one
  if (!previousSnapshot) {
    console.log(`${FUNC}: No previous snapshot found`);
    return {
      snapshotDate: currentDate,
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
  console.log(`${FUNC}: Previous snapshot for ${getISO8601DateString(previousSnapshot.snapshotDate)} found. Copying.`);
  const newSnapshot = JSON.parse(JSON.stringify(previousSnapshot)) as Snapshot;

  // Set the current date
  newSnapshot.snapshotDate = currentDate;

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
    clearinghouseSnapshots: ClearinghouseSnapshotOptional[];
    creationEvents: ClearLoanRequestEventOptional[];
    repaymentEvents: RepayLoanEventOptional[];
    defaultedClaimEvents: ClaimDefaultedLoanEventOptional[];
    extendEvents: ExtendLoanEventOptional[];
  }
>;

const populateEventsByTimestamp = (currentDateString: string, subgraphData: SubgraphData): EventsByTimestamp => {
  const dateEventsByTimestamp: EventsByTimestamp = {};

  const currentClearinghouseSnapshots = subgraphData.clearinghouseSnapshots[currentDateString] || [];
  currentClearinghouseSnapshots.forEach(clearinghouseSnapshot => {
    const timestamp = parseNumber(clearinghouseSnapshot.blockTimestamp);
    if (!dateEventsByTimestamp[timestamp]) {
      dateEventsByTimestamp[timestamp] = {
        clearinghouseSnapshots: [],
        creationEvents: [],
        repaymentEvents: [],
        defaultedClaimEvents: [],
        extendEvents: [],
      };
    }
    dateEventsByTimestamp[timestamp].clearinghouseSnapshots.push(clearinghouseSnapshot);
  });

  const currentCreationEvents = subgraphData.creationEvents[currentDateString] || [];
  currentCreationEvents.forEach(creationEvent => {
    const timestamp = parseNumber(creationEvent.blockTimestamp);
    if (!dateEventsByTimestamp[timestamp]) {
      dateEventsByTimestamp[timestamp] = {
        clearinghouseSnapshots: [],
        creationEvents: [],
        repaymentEvents: [],
        defaultedClaimEvents: [],
        extendEvents: [],
      };
    }
    dateEventsByTimestamp[timestamp].creationEvents.push(creationEvent);
  });

  const currentRepaymentEvents = subgraphData.repaymentEvents[currentDateString] || [];
  currentRepaymentEvents.forEach(repaymentEvent => {
    const timestamp = parseNumber(repaymentEvent.blockTimestamp);
    if (!dateEventsByTimestamp[timestamp]) {
      dateEventsByTimestamp[timestamp] = {
        clearinghouseSnapshots: [],
        creationEvents: [],
        repaymentEvents: [],
        defaultedClaimEvents: [],
        extendEvents: [],
      };
    }
    dateEventsByTimestamp[timestamp].repaymentEvents.push(repaymentEvent);
  });

  const currentDefaultedClaimEvents = subgraphData.defaultedClaimEvents[currentDateString] || [];
  currentDefaultedClaimEvents.forEach(defaultedClaimEvent => {
    const timestamp = parseNumber(defaultedClaimEvent.blockTimestamp);
    if (!dateEventsByTimestamp[timestamp]) {
      dateEventsByTimestamp[timestamp] = {
        clearinghouseSnapshots: [],
        creationEvents: [],
        repaymentEvents: [],
        defaultedClaimEvents: [],
        extendEvents: [],
      };
    }
    dateEventsByTimestamp[timestamp].defaultedClaimEvents.push(defaultedClaimEvent);
  });

  const currentExtendEvents = subgraphData.extendEvents[currentDateString] || [];
  currentExtendEvents.forEach(extendEvent => {
    const timestamp = parseNumber(extendEvent.blockTimestamp);
    if (!dateEventsByTimestamp[timestamp]) {
      dateEventsByTimestamp[timestamp] = {
        clearinghouseSnapshots: [],
        creationEvents: [],
        repaymentEvents: [],
        defaultedClaimEvents: [],
        extendEvents: [],
      };
    }
    dateEventsByTimestamp[timestamp].extendEvents.push(extendEvent);
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
  previousDateRecord: Snapshot | null,
  previousDateLoans: LoanSnapshotMap | null,
  subgraphData: SubgraphData,
): DateSnapshot[] => {
  const FUNC = "generateSnapshots";
  const dateSnapshots: DateSnapshot[] = [];

  // Iterate through the dates
  let currentDate = setMidnight(startDate);
  const endDate = beforeDate;

  let previousSnapshot: Snapshot | null = previousDateRecord;
  if (previousSnapshot) {
    console.log(`Previous snapshot exists`);
  }
  const previousLoans: LoanSnapshotMap = previousDateLoans || {};

  while (currentDate.getTime() < endDate.getTime()) {
    const currentDateString = getISO8601DateString(currentDate);
    const currentDateBeforeMidnight = setBeforeMidnight(currentDate);
    console.log(`${FUNC}: currentDate: ${currentDateString}`);

    // Populate a new Snapshot based on the previous one
    const currentSnapshot = createSnapshot(currentDateBeforeMidnight, previousSnapshot);

    // Populate a new LoanSnapshotMap based on a deep copy of the previous one
    const currentLoansMap = structuredClone(previousLoans);
    // TODO need to return loan records

    // Order all events by block timestamp
    const currentDateEventsByTimestamp: EventsByTimestamp = populateEventsByTimestamp(currentDateString, subgraphData);

    // Iterate by timestamp, so that events are processed in order
    for (const [timestamp, records] of Object.entries(currentDateEventsByTimestamp)) {
      console.log(
        `${FUNC}: processing events for timestamp ${getISO8601DateString(new Date(parseInt(timestamp) * 1000))}`,
      );

      // Update clearinghouse data, if it exists
      const currentClearinghouseSnapshots = records.clearinghouseSnapshots;
      console.log(`${FUNC}: processing ${currentClearinghouseSnapshots.length} clearinghouse snapshots`);
      currentClearinghouseSnapshots.forEach(clearinghouseSnapshot => {
        console.log(`${FUNC}: processing clearinghouse snapshot ${clearinghouseSnapshot.id}`);

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
      console.log(`${FUNC}: processing ${currentCreationEvents.length} creation events`);
      currentCreationEvents.forEach(creationEvent => {
        console.log(`${FUNC}: processing creation event ${creationEvent.id}`);

        // Add any new loans into running list
        console.log(`${FUNC}: creationEvent.loan.id: ${creationEvent.loan.id}`);
        currentLoansMap[creationEvent.loan.id] = {
          snapshotDate: currentDateBeforeMidnight,
          id: creationEvent.loan.id,
          loanId: parseNumber(creationEvent.loan.loanId),
          createdTimestamp: parseNumber(creationEvent.blockTimestamp),
          coolerAddress: creationEvent.loan.cooler,
          borrowerAddress: creationEvent.loan.borrower,
          lenderAddress: creationEvent.loan.lender,
          principal: parseNumber(creationEvent.loan.principal),
          interest: parseNumber(creationEvent.loan.interest),
          collateralDeposited: parseNumber(creationEvent.loan.collateral),
          expiryTimestamp: parseNumber(creationEvent.loan.expiryTimestamp),
          secondsToExpiry: getSecondsToExpiry(
            currentDateBeforeMidnight,
            parseNumber(creationEvent.loan.expiryTimestamp),
          ),
          status: "Active",
          principalPaid: 0,
          interestPaid: 0,
          collateralIncome: 0,
          collateralClaimedQuantity: 0,
          collateralClaimedValue: 0,
          interestRate: creationEvent.loan.request.interestPercentage,
          durationSeconds: creationEvent.loan.request.durationSeconds,
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
      console.log(`${FUNC}: processing ${currentRepaymentEvents.length} repayment events`);
      currentRepaymentEvents.forEach(repaymentEvent => {
        console.log(`${FUNC}: processing repayment event ${repaymentEvent.id}`);

        // Find the loan
        const loan = currentLoansMap[repaymentEvent.loan.id];
        if (!loan) {
          throw new Error(`repaymentEvents: Could not find loan ${repaymentEvent.loan.id}`);
        }

        // Update the loan state
        loan.collateralDeposited = parseNumber(repaymentEvent.collateralDeposited);

        // Calculate the interest and principal paid for this payment
        const eventAmountPaid = parseNumber(repaymentEvent.amountPaid);
        const interestRepayment = calculateInterestRepayment(eventAmountPaid, loan);
        const principalRepayment = calculatePrincipalRepayment(eventAmountPaid, loan);
        console.log(`${FUNC}: eventAmountPaid: ${eventAmountPaid}`);
        console.log(`${FUNC}: interestRepayment: ${interestRepayment}`);
        console.log(`${FUNC}: principalRepayment: ${principalRepayment}`);

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
      console.log(`${FUNC}: processing ${currentDefaultedClaimEvents.length} default claim events`);
      currentDefaultedClaimEvents.forEach(defaultedClaimEvent => {
        console.log(`${FUNC}: processing default claim event ${defaultedClaimEvent.id}`);

        // Find the loan
        const loan = currentLoansMap[defaultedClaimEvent.loan.id];
        if (!loan) {
          throw new Error(`defaultedClaim: Could not find loan ${defaultedClaimEvent.loan.id}`);
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
      console.log(`${FUNC}: processing ${currentExtendEvents.length} extend events`);
      currentExtendEvents.forEach(extendEvent => {
        console.log(`${FUNC}: processing extend event ${extendEvent.id}`);

        // Find the loan
        const loan = currentLoansMap[extendEvent.loan.id];
        if (!loan) {
          throw new Error(`extendEvents: Could not find loan ${extendEvent.loan.id}`);
        }

        // Update the loan
        loan.status = "Active";
        loan.expiryTimestamp = parseNumber(extendEvent.expiryTimestamp);

        // Additional interest is paid at the time a loan is extended
        // No impact on receivables
        // https://github.com/ohmzeus/Cooler/pull/63
        const interestPerPeriod =
          ((loan.principal - loan.principalPaid) * loan.interestRate * loan.durationSeconds) / (365 * 24 * 60 * 60);
        console.log(
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
    console.log(`${FUNC}: processing ${loans.length} loans`);
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
    console.log(`${FUNC}: updating expiry buckets`);
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
    currentDate = adjustDate(currentDate, 1);
  }

  return dateSnapshots;
};
