import { adjustDate, getISO8601DateString, setBeforeMidnight, setMidnight } from "../../helpers/dateHelper";
import { Snapshot } from "../../types/snapshot";
import { SubgraphData } from "../../types/subgraph";

const createSnapshot = (currentDate: Date, previousSnapshot: Snapshot | null): Snapshot => {
  const FUNC = "createSnapshot";
  // If there is no previous snapshot, return a new one
  if (!previousSnapshot) {
    console.log(`${FUNC}: No previous snapshot found for ${getISO8601DateString(currentDate)}`);
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
  console.log(`${FUNC}: Previous snapshot for ${getISO8601DateString(currentDate)} found. Copying.`);
  const newSnapshot = JSON.parse(JSON.stringify(previousSnapshot)) as Snapshot;

  // Set the current date
  newSnapshot.date = currentDate;

  // Events are not carried over
  newSnapshot.creationEvents = [];
  newSnapshot.repaymentEvents = [];
  newSnapshot.defaultedClaimEvents = [];
  newSnapshot.extendEvents = [];
  newSnapshot.clearinghouseEvents = [];

  // Ensure the loans property has a value
  if (!newSnapshot.loans) {
    newSnapshot.loans = {};
  }

  // Ensure the clearinghouse snapshot has a value
  if (!newSnapshot.clearinghouse) {
    newSnapshot.clearinghouse = {
      daiBalance: 0,
      sDaiBalance: 0,
      sDaiInDaiBalance: 0,
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
  if (previousSnapshot) {
    console.log(`Previous snapshot exists`);
  }

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
        throw new Error(`defaultedClaim: Could not find loan ${defaultedClaimEvent.loan.id}`);
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

    // Update loans where there were extend events
    const currentExtendEvents = subgraphData.extendEvents[currentDateString] || [];
    console.log(`${FUNC}: processing ${currentExtendEvents.length} extend events`);
    currentExtendEvents.forEach(extendEvent => {
      console.log(`${FUNC}: processing extend event ${extendEvent.id}`);

      // Find the loan
      const loan = currentSnapshot.loans[extendEvent.loan.id];
      if (!loan) {
        throw new Error(`extendEvents: Could not find loan ${extendEvent.loan.id}`);
      }

      // Update the loan
      loan.status = "Active";
      loan.expiryTimestamp = extendEvent.expiryTimestamp;

      const incrementalInterest = extendEvent.interestDue - loan.interest;
      loan.interest += incrementalInterest;

      // Update receivables
      currentSnapshot.interestReceivables += incrementalInterest;
    });

    // Update secondsToExpiry and status for all loans
    const loans = currentSnapshot.loans ? Object.values(currentSnapshot.loans) : [];
    console.log(`${FUNC}: processing ${loans.length} loans`);
    loans.forEach(loan => {
      loan.secondsToExpiry = getSecondsToExpiry(currentDateBeforeMidnight, loan.expiryTimestamp);

      if (loan.status === "Active" && loan.secondsToExpiry <= 0) {
        loan.status = "Expired";
      }
    });

    // Add all events
    currentSnapshot.creationEvents.push(...currentCreationEvents);
    currentSnapshot.repaymentEvents.push(...currentRepaymentEvents);
    currentSnapshot.defaultedClaimEvents.push(...currentDefaultedClaimEvents);
    currentSnapshot.extendEvents.push(...currentExtendEvents);

    snapshots.push(currentSnapshot);

    previousSnapshot = currentSnapshot;
    currentDate = adjustDate(currentDate, 1);
  }

  return snapshots;
};
