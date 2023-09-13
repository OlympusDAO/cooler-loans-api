import { adjustDate, getISO8601DateString, setMidnight } from "../../helpers/dateHelper";
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
    status: "Active" | "Expired" | "Reclaimed" | "Repaid";
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

const createSnapshot = (currentDate: Date, previousSnapshot: Snapshot | null): Snapshot => {
  // If there is no previous snapshot, return a new one
  if (!previousSnapshot) {
    return {
      date: currentDate,
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
  const newSnapshot = JSON.parse(JSON.stringify(previousSnapshot));
  newSnapshot.date = currentDate;
  return newSnapshot;
};

const getSecondsToExpiry = (currentDate: Date, expiryTimestamp: number): number => {
  const expiryDate = new Date(expiryTimestamp * 1000);
  return Math.floor((expiryDate.getTime() - currentDate.getTime()) / 1000);
};

export const generateSnapshots = (
  startDateString: string,
  endDateString: string,
  previousDateRecord: Snapshot | null,
  subgraphData: SubgraphData,
): Snapshot[] => {
  const FUNC = "generateSnapshots";
  const snapshots: Snapshot[] = [];

  // Iterate through the dates
  let currentDate = setMidnight(new Date(startDateString));
  const endDate = setMidnight(new Date(endDateString));

  let previousSnapshot: Snapshot | null = previousDateRecord;
  console.log(`${FUNC}: previousSnapshot: ${previousSnapshot}`);

  while (currentDate <= endDate) {
    const currentDateString = getISO8601DateString(currentDate);
    console.log(`${FUNC}: currentDate: ${currentDateString}`);

    // Populate a new Snapshot based on the previous one
    const currentSnapshot = createSnapshot(currentDate, previousSnapshot);

    // Update clearinghouse data, if it exists
    const currentClearinghouseData = subgraphData.clearinghouseSnapshots[currentDateString];
    if (currentClearinghouseData) {
      currentSnapshot.clearinghouse.daiBalance = currentClearinghouseData.daiBalance;
      currentSnapshot.clearinghouse.sDaiBalance = currentClearinghouseData.sDaiBalance;
      currentSnapshot.clearinghouse.sDaiInDaiBalance = currentClearinghouseData.sDaiInDaiBalance;
    }

    // Create loans where there were creation events
    const currentCreationEvents = subgraphData.creationEvents[currentDateString] || [];
    console.log(`${FUNC}: processing ${currentCreationEvents.length} creation events`);
    currentCreationEvents.forEach(creationEvent => {
      console.log(`${FUNC}: processing creation event ${creationEvent.id}`);
      currentSnapshot.receivables += creationEvent.loan.amount;

      console.log(`${FUNC}: creationEvent.loan.id: ${creationEvent.loan.id}`);
      currentSnapshot.loans.push({
        id: creationEvent.loan.id,
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
    const currentRepaymentEvents = subgraphData.repaymentEvents[currentDateString] || [];
    console.log(`${FUNC}: processing ${currentRepaymentEvents.length} repayment events`);
    currentRepaymentEvents.forEach(repaymentEvent => {
      console.log(`${FUNC}: processing repayment event ${repaymentEvent.id}`);

      // Find the loan
      const loan = currentSnapshot.loans.find(loan => loan.id === repaymentEvent.loan.id);
      if (!loan) {
        throw new Error(`repaymentEvents: Could not find loan ${repaymentEvent.loan.id}`);
      }

      // Update the loan
      loan.amountRepaid += repaymentEvent.amountPaid;
      loan.amountPayable -= repaymentEvent.amountPaid;
      loan.interestIncome += repaymentEvent.interestIncome;
      loan.collateralDeposited = repaymentEvent.collateralDeposited;

      // Update overall receivables
      currentSnapshot.receivables -= repaymentEvent.amountPaid;
    });

    // Update loans where there were defaulted claim events
    const currentDefaultedClaimEvents = subgraphData.defaultedClaimEvents[currentDateString] || [];
    console.log(`${FUNC}: processing ${currentDefaultedClaimEvents.length} default claim events`);
    currentDefaultedClaimEvents.forEach(defaultedClaimEvent => {
      console.log(`${FUNC}: processing default claim event ${defaultedClaimEvent.id}`);

      // Find the loan
      const loan = currentSnapshot.loans.find(loan => loan.id === defaultedClaimEvent.loan.id);
      if (!loan) {
        throw new Error(`defaultClaimEvents: Could not find loan ${defaultedClaimEvent.loan.id}`);
      }

      // Update the loan
      loan.status = "Reclaimed";
      loan.collateralClaimedQuantity = defaultedClaimEvent.collateralQuantityClaimed;
      loan.collateralClaimedValue = defaultedClaimEvent.collateralValueClaimed;
      loan.collateralIncome = defaultedClaimEvent.collateralIncome;

      // Update overall receivables
      currentSnapshot.receivables -= defaultedClaimEvent.loan.amount;
    });

    // Update loans where there were rollover events
    const currentRolloverEvents = subgraphData.rolloverEvents[currentDateString] || [];
    console.log(`${FUNC}: processing ${currentRolloverEvents.length} rollover events`);
    currentRolloverEvents.forEach(rolloverEvent => {
      console.log(`${FUNC}: processing rollover event ${rolloverEvent.id}`);

      // Find the loan
      const loan = currentSnapshot.loans.find(loan => loan.id === rolloverEvent.loan.id);
      if (!loan) {
        throw new Error(`rolloverEvents: Could not find loan ${rolloverEvent.loan.id}`);
      }

      // Update the loan
      loan.status = "Active";
      loan.expiryTimestamp = rolloverEvent.loan.expiryTimestamp;
      loan.amountPayable = rolloverEvent.loan.principal + rolloverEvent.loan.interest; // TODO check this

      // TODO update receivables
    });

    // Update secondsToExpiry for all loans
    currentSnapshot.loans.forEach(loan => {
      loan.secondsToExpiry = getSecondsToExpiry(currentDate, loan.expiryTimestamp);
    });

    // Update the status for all loans
    currentSnapshot.loans.forEach(loan => {
      if (loan.status === "Active" && loan.secondsToExpiry <= 0) {
        loan.status = "Expired";
      }
    });

    // Add all events
    currentSnapshot.creationEvents.push(...currentCreationEvents);
    currentSnapshot.repaymentEvents.push(...currentRepaymentEvents);
    currentSnapshot.defaultedClaimEvents.push(...currentDefaultedClaimEvents);
    currentSnapshot.rolloverEvents.push(...currentRolloverEvents);

    snapshots.push(currentSnapshot);

    previousSnapshot = currentSnapshot;
    currentDate = adjustDate(currentDate, 1);
  }

  return snapshots;
};
