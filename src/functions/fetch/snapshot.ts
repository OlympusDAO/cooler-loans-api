import { adjustDate, getISO8601DateString, setBeforeMidnight, setMidnight } from "../../helpers/dateHelper";
import {
  ClaimDefaultedLoanEventOptional,
  ClearinghouseSnapshotOptional,
  ClearLoanRequestEventOptional,
  ExtendLoanEventOptional,
  RepayLoanEventOptional,
  SubgraphData,
} from "./subgraph";

export type Snapshot = {
  date: Date;
  // Top-level summary
  principalReceivables: number;
  interestReceivables: number;
  clearinghouse: {
    daiBalance: number;
    sDaiBalance: number;
    sDaiInDaiBalance: number;
  };
  treasury: {
    daiBalance: number;
    sDaiBalance: number;
    sDaiInDaiBalance: number;
  };
  /**
   * Dictionary of the loans that had been created by this date.
   *
   * Key: `cooler address`-`loanId`
   * Value: Loan record
   */
  loans: Record<
    string,
    {
      /**
       * cooler-loanId
       */
      id: string;
      loanId: number;
      createdTimestamp: number;
      coolerAddress: string;
      borrowerAddress: string;
      lenderAddress: string;
      principal: number;
      interest: number;
      collateralDeposited: number;
      expiryTimestamp: number;
      secondsToExpiry: number;
      status: "Active" | "Expired" | "Reclaimed" | "Repaid";
      principalPaid: number;
      interestPaid: number;
      collateralIncome: number;
      collateralClaimedQuantity: number;
      collateralClaimedValue: number;
    }
  >;
  creationEvents: ClearLoanRequestEventOptional[];
  defaultedClaimEvents: ClaimDefaultedLoanEventOptional[];
  repaymentEvents: RepayLoanEventOptional[];
  extendEvents: ExtendLoanEventOptional[];
  clearinghouseEvents: ClearinghouseSnapshotOptional[];
};

const createSnapshot = (currentDate: Date, previousSnapshot: Snapshot | null): Snapshot => {
  // If there is no previous snapshot, return a new one
  if (!previousSnapshot) {
    return {
      date: currentDate,
      principalReceivables: 0,
      interestReceivables: 0,
      clearinghouse: {
        daiBalance: 0,
        sDaiBalance: 0,
        sDaiInDaiBalance: 0,
      },
      treasury: {
        daiBalance: 0,
        sDaiBalance: 0,
        sDaiInDaiBalance: 0,
      },
      loans: {},
      creationEvents: [],
      defaultedClaimEvents: [],
      repaymentEvents: [],
      extendEvents: [],
      clearinghouseEvents: [],
    };
  }

  // Otherwise, return a new one based on the previous one
  const newSnapshot = JSON.parse(JSON.stringify(previousSnapshot));

  // Set the current date
  newSnapshot.date = currentDate;

  // Events are not carried over
  newSnapshot.creationEvents = [];
  newSnapshot.repaymentEvents = [];
  newSnapshot.defaultedClaimEvents = [];
  newSnapshot.rolloverEvents = [];
  newSnapshot.clearinghouseEvents = [];

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

export const generateSnapshots = (
  startDate: Date,
  beforeDate: Date,
  previousDateRecord: Snapshot | null,
  subgraphData: SubgraphData,
): Snapshot[] => {
  const FUNC = "generateSnapshots";
  const snapshots: Snapshot[] = [];

  // Iterate through the dates
  let currentDate = setMidnight(startDate);
  const endDate = beforeDate;

  let previousSnapshot: Snapshot | null = previousDateRecord;
  while (currentDate.getTime() < endDate.getTime()) {
    const currentDateString = getISO8601DateString(currentDate);
    const currentDateBeforeMidnight = setBeforeMidnight(currentDate);
    console.log(`${FUNC}: currentDate: ${currentDateString}`);

    // Populate a new Snapshot based on the previous one
    const currentSnapshot = createSnapshot(currentDateBeforeMidnight, previousSnapshot);

    // Update clearinghouse data, if it exists
    const currentClearinghouseSnapshots = subgraphData.clearinghouseSnapshots[currentDateString] || [];
    console.log(`${FUNC}: processing ${currentClearinghouseSnapshots.length} clearinghouse snapshots`);
    currentClearinghouseSnapshots.forEach(clearinghouseSnapshot => {
      console.log(`${FUNC}: processing clearinghouse snapshot ${clearinghouseSnapshot.id}`);

      // If there are multiple snapshots in a day, successive ones will overwrite the previous values
      currentSnapshot.clearinghouse.daiBalance = clearinghouseSnapshot.daiBalance;
      currentSnapshot.clearinghouse.sDaiBalance = clearinghouseSnapshot.sDaiBalance;
      currentSnapshot.clearinghouse.sDaiInDaiBalance = clearinghouseSnapshot.sDaiInDaiBalance;
      currentSnapshot.treasury.daiBalance = clearinghouseSnapshot.treasuryDaiBalance;
      currentSnapshot.treasury.sDaiBalance = clearinghouseSnapshot.treasurySDaiBalance;
      currentSnapshot.treasury.sDaiInDaiBalance = clearinghouseSnapshot.treasurySDaiInDaiBalance;

      currentSnapshot.clearinghouseEvents.push(clearinghouseSnapshot);
    });

    // Create loans where there were creation events
    const currentCreationEvents = subgraphData.creationEvents[currentDateString] || [];
    console.log(`${FUNC}: processing ${currentCreationEvents.length} creation events`);
    currentCreationEvents.forEach(creationEvent => {
      console.log(`${FUNC}: processing creation event ${creationEvent.id}`);
      currentSnapshot.principalReceivables += creationEvent.loan.principal;
      currentSnapshot.interestReceivables += creationEvent.loan.interest;

      // Add any new loans into running list
      console.log(`${FUNC}: creationEvent.loan.id: ${creationEvent.loan.id}`);
      currentSnapshot.loans[creationEvent.loan.id] = {
        id: creationEvent.loan.id,
        loanId: creationEvent.loan.loanId,
        createdTimestamp: creationEvent.blockTimestamp,
        coolerAddress: creationEvent.loan.cooler,
        borrowerAddress: creationEvent.loan.borrower,
        lenderAddress: creationEvent.loan.lender,
        principal: creationEvent.loan.principal,
        interest: creationEvent.loan.interest,
        collateralDeposited: creationEvent.loan.collateral,
        expiryTimestamp: creationEvent.loan.expiryTimestamp,
        secondsToExpiry: getSecondsToExpiry(currentDateBeforeMidnight, creationEvent.loan.expiryTimestamp),
        status: "Active",
        principalPaid: 0,
        interestPaid: 0,
        collateralIncome: 0,
        collateralClaimedQuantity: 0,
        collateralClaimedValue: 0,
      };
    });

    // Update loans where there were repayment events
    const currentRepaymentEvents = subgraphData.repaymentEvents[currentDateString] || [];
    console.log(`${FUNC}: processing ${currentRepaymentEvents.length} repayment events`);
    currentRepaymentEvents.forEach(repaymentEvent => {
      console.log(`${FUNC}: processing repayment event ${repaymentEvent.id}`);

      // Find the loan
      const loan = currentSnapshot.loans[repaymentEvent.loan.id];
      if (!loan) {
        throw new Error(`repaymentEvents: Could not find loan ${repaymentEvent.loan.id}`);
      }

      // Update the loan state
      loan.collateralDeposited = repaymentEvent.collateralDeposited;

      // Calculate the interest and principal paid for this payment
      const interestPaid = (repaymentEvent.amountPaid / (loan.principal + loan.interest)) * loan.interest;
      const principalPaid = repaymentEvent.amountPaid - interestPaid;
      loan.interestPaid += interestPaid;
      loan.principalPaid += principalPaid;

      // If the loan is fully repaid, update the status
      if (loan.interestPaid >= loan.interest && loan.principalPaid >= loan.principal) {
        loan.status = "Repaid";
      }

      // Update overall receivables
      currentSnapshot.interestReceivables -= interestPaid;
      currentSnapshot.principalReceivables -= principalPaid;
    });

    // Update loans where there were defaulted claim events
    const currentDefaultedClaimEvents = subgraphData.defaultedClaimEvents[currentDateString] || [];
    console.log(`${FUNC}: processing ${currentDefaultedClaimEvents.length} default claim events`);
    currentDefaultedClaimEvents.forEach(defaultedClaimEvent => {
      console.log(`${FUNC}: processing default claim event ${defaultedClaimEvent.id}`);

      // Find the loan
      const loan = currentSnapshot.loans[defaultedClaimEvent.loan.id];
      if (!loan) {
        throw new Error(`repaymentEvents: Could not find loan ${defaultedClaimEvent.loan.id}`);
      }

      const interestPayable = loan.interest - loan.interestPaid;
      const principalPayable = loan.principal - loan.principalPaid;

      // Update the loan
      loan.status = "Reclaimed";
      loan.collateralClaimedQuantity += defaultedClaimEvent.collateralQuantityClaimed;
      loan.collateralClaimedValue += defaultedClaimEvent.collateralValueClaimed;
      loan.collateralDeposited = 0;

      // Calculate the income from the collateral claim
      loan.collateralIncome += defaultedClaimEvent.collateralValueClaimed;

      // Remove the loan payable from the receivables
      currentSnapshot.interestReceivables -= interestPayable;
      currentSnapshot.principalReceivables -= principalPayable;
    });

    // Update loans where there were rollover events
    const currentRolloverEvents = subgraphData.extendEvents[currentDateString] || [];
    console.log(`${FUNC}: processing ${currentRolloverEvents.length} rollover events`);
    currentRolloverEvents.forEach(rolloverEvent => {
      console.log(`${FUNC}: processing rollover event ${rolloverEvent.id}`);

      // Find the loan
      const loan = currentSnapshot.loans[rolloverEvent.loan.id];
      if (!loan) {
        throw new Error(`repaymentEvents: Could not find loan ${rolloverEvent.loan.id}`);
      }

      // Update the loan
      loan.status = "Active";
      loan.expiryTimestamp = rolloverEvent.expiryTimestamp;

      const incrementalInterest = rolloverEvent.interestDue - loan.interest;
      loan.interest += incrementalInterest;

      // Update receivables
      currentSnapshot.interestReceivables += incrementalInterest;
    });

    // Update secondsToExpiry and status for all loans
    Object.values(currentSnapshot.loans).forEach(loan => {
      loan.secondsToExpiry = getSecondsToExpiry(currentDateBeforeMidnight, loan.expiryTimestamp);

      if (loan.status === "Active" && loan.secondsToExpiry <= 0) {
        loan.status = "Expired";
      }
    });

    // Add all events
    currentSnapshot.creationEvents.push(...currentCreationEvents);
    currentSnapshot.repaymentEvents.push(...currentRepaymentEvents);
    currentSnapshot.defaultedClaimEvents.push(...currentDefaultedClaimEvents);
    currentSnapshot.extendEvents.push(...currentRolloverEvents);

    snapshots.push(currentSnapshot);

    previousSnapshot = currentSnapshot;
    currentDate = adjustDate(currentDate, 1);
  }

  return snapshots;
};
