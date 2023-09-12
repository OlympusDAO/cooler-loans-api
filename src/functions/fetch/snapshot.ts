import { adjustDate, getISO8601DateString } from "../../helpers/dateHelper";
import { CreationEvent, DefaultedClaimEvent, RepaymentEvent, RolloverEvent, SubgraphData } from "./subgraph";

export type Snapshot = {
  date: Date;
  // Top-level summary
  /**
   * Sum of amountPayable for all loans
   */
  receivables: number;
  clearinghouse: {
    daiBalance: number;
    sDaiBalance: number;
    sDaiInDaiBalance: number;
  };
  // Per-loan summary
  loans: {
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
    status: "Active" | "Default - Unclaimed" | "Default - Claimed" | "Repaid";
    amountRepaid: number;
    amountPayable: number;
    interestIncome: number;
    collateralIncome: number;
    collateralClaimedQuantity: number;
    collateralClaimedValue: number;
  }[];
  creationEvents: CreationEvent[];
  defaultedClaimEvents: DefaultedClaimEvent[];
  repaymentEvents: RepaymentEvent[];
  rolloverEvents: RolloverEvent[];
};

const createSnapshot = (previousSnapshot: Snapshot | null): Snapshot => {
  // If there is no previous snapshot, return a new one
  if (!previousSnapshot) {
    return {
      date: new Date(),
      receivables: 0,
      clearinghouse: {
        daiBalance: 0,
        sDaiBalance: 0,
        sDaiInDaiBalance: 0,
      },
      loans: [],
      creationEvents: [],
      defaultedClaimEvents: [],
      repaymentEvents: [],
      rolloverEvents: [],
    };
  }

  // Otherwise, return a new one based on the previous one
  return JSON.parse(JSON.stringify(previousSnapshot));
};

export type SnapshotDateMap = {
  [date: string]: Snapshot;
};

const getSecondsToExpiry = (currentDate: Date, expiryTimestamp: number): number => {
  const expiryDate = new Date(expiryTimestamp * 1000);
  return Math.floor((expiryDate.getTime() - currentDate.getTime()) / 1000);
};

export const generateSnapshots = (
  startDate: string,
  endDate: string,
  previousDateRecord: Snapshot | null,
  subgraphData: SubgraphData,
): SnapshotDateMap => {
  const snapshots: SnapshotDateMap = {};

  // Iterate through the dates
  let currentDate = new Date(startDate);
  const endDateDate = new Date(endDate);

  const previousSnapshot: Snapshot | null = previousDateRecord;

  while (currentDate <= endDateDate) {
    // Populate a new Snapshot based on the previous one
    const currentSnapshot = createSnapshot(previousSnapshot);

    // Update clearinghouse data, if it exists
    const currentClearinghouseData = subgraphData.clearinghouseSnapshots[currentDate.toISOString()];
    if (currentClearinghouseData) {
      currentSnapshot.clearinghouse.daiBalance = currentClearinghouseData.daiBalance;
      currentSnapshot.clearinghouse.sDaiBalance = currentClearinghouseData.sDaiBalance;
      currentSnapshot.clearinghouse.sDaiInDaiBalance = currentClearinghouseData.sDaiInDaiBalance;
    }

    // Create loans where there were creation events
    const currentCreationEvents = subgraphData.creationEvents[currentDate.toISOString()] || [];
    currentCreationEvents.forEach(creationEvent => {
      currentSnapshot.loans.push({
        id: creationEvent.id,
        loanId: creationEvent.loan.loanId,
        createdTimestamp: creationEvent.blockTimestamp,
        coolerAddress: creationEvent.loan.coolerAddress,
        borrowerAddress: creationEvent.loan.borrowerAddress,
        lenderAddress: creationEvent.loan.lenderAddress,
        principal: creationEvent.loan.principal,
        interest: creationEvent.loan.interest,
        collateralDeposited: creationEvent.loan.collateralDeposited,
        expiryTimestamp: creationEvent.loan.expiryTimestamp,
        secondsToExpiry: getSecondsToExpiry(currentDate, creationEvent.loan.expiryTimestamp),
        status: "Active",
        amountRepaid: 0,
        amountPayable: creationEvent.loan.principal + creationEvent.loan.interest,
        interestIncome: 0,
        collateralIncome: 0,
        collateralClaimedQuantity: 0,
        collateralClaimedValue: 0,
      });
    });

    // Update loans where there were repayment events
    const currentRepaymentEvents = subgraphData.repaymentEvents[currentDate.toISOString()] || [];
    currentRepaymentEvents.forEach(repaymentEvent => {
      // Find the loan
      const loan = currentSnapshot.loans.find(loan => loan.id === repaymentEvent.loan.id);
      if (!loan) {
        throw new Error(`Could not find loan ${repaymentEvent.loan.id}`);
      }

      // Update the loan
      loan.amountRepaid += repaymentEvent.amountPaid;
      loan.amountPayable -= repaymentEvent.amountPaid;
      loan.interestIncome += repaymentEvent.interestIncome;
      loan.collateralDeposited = repaymentEvent.collateralDeposited;
    });

    // Update loans where there were defaulted claim events
    const currentDefaultedClaimEvents = subgraphData.defaultedClaimEvents[currentDate.toISOString()] || [];
    currentDefaultedClaimEvents.forEach(defaultedClaimEvent => {
      // Find the loan
      const loan = currentSnapshot.loans.find(loan => loan.id === defaultedClaimEvent.loan.id);
      if (!loan) {
        throw new Error(`Could not find loan ${defaultedClaimEvent.loan.id}`);
      }

      // Update the loan
      loan.status = "Default - Claimed";
      loan.collateralClaimedQuantity = defaultedClaimEvent.collateralQuantityClaimed;
      loan.collateralClaimedValue = defaultedClaimEvent.collateralValueClaimed;
      loan.collateralIncome = defaultedClaimEvent.collateralIncome;
    });

    // Update loans where there were rollover events
    const currentRolloverEvents = subgraphData.rolloverEvents[currentDate.toISOString()] || [];
    currentRolloverEvents.forEach(rolloverEvent => {
      // Find the loan
      const loan = currentSnapshot.loans.find(loan => loan.id === rolloverEvent.loan.id);
      if (!loan) {
        throw new Error(`Could not find loan ${rolloverEvent.loan.id}`);
      }

      // Update the loan
      loan.status = "Active";
      loan.expiryTimestamp = rolloverEvent.loan.expiryTimestamp;
      loan.amountPayable = rolloverEvent.loan.principal + rolloverEvent.loan.interest; // TODO check this
    });

    // Update secondsToExpiry for all loans
    currentSnapshot.loans.forEach(loan => {
      loan.secondsToExpiry = getSecondsToExpiry(currentDate, loan.expiryTimestamp);
    });

    // Update the status for all loans
    currentSnapshot.loans.forEach(loan => {
      if (loan.status === "Active" && loan.secondsToExpiry <= 0) {
        loan.status = "Default - Unclaimed";
      }
    });

    // Add all events
    currentSnapshot.creationEvents.push(...currentCreationEvents);
    currentSnapshot.repaymentEvents.push(...currentRepaymentEvents);
    currentSnapshot.defaultedClaimEvents.push(...currentDefaultedClaimEvents);
    currentSnapshot.rolloverEvents.push(...currentRolloverEvents);

    snapshots[getISO8601DateString(currentDate)] = currentSnapshot;

    currentDate = adjustDate(currentDate, 1);
  }

  return snapshots;
};
