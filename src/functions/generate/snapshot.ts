import { adjustDate, getISO8601DateString, setBeforeMidnight, setMidnight } from "../../helpers/dateHelper";
import { parseNumber } from "../../helpers/numberHelper";
import { Snapshot } from "../../types/snapshot";
import { SubgraphData } from "../../types/subgraph";

const createSnapshot = (currentDate: Date, previousSnapshot: Snapshot | null): Snapshot => {
  const FUNC = "createSnapshot";
  // If there is no previous snapshot, return a new one
  if (!previousSnapshot) {
    console.log(`${FUNC}: No previous snapshot found for ${getISO8601DateString(currentDate)}`);
    return {
      date: currentDate,
      timestamp: currentDate.getTime(),
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
  newSnapshot.timestamp = currentDate.getTime();

  // Events are not carried over
  newSnapshot.creationEvents = [];
  newSnapshot.repaymentEvents = [];
  newSnapshot.defaultedClaimEvents = [];
  newSnapshot.extendEvents = [];
  newSnapshot.clearinghouseEvents = [];

  // Some snapshot values are not carried over
  newSnapshot.interestIncome = 0;
  newSnapshot.collateralIncome = 0;
  newSnapshot.collateralDeposited = 0;

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

      currentSnapshot.clearinghouseEvents.push(clearinghouseSnapshot);
    });

    // Create loans where there were creation events
    const currentCreationEvents = subgraphData.creationEvents[currentDateString] || [];
    console.log(`${FUNC}: processing ${currentCreationEvents.length} creation events`);
    currentCreationEvents.forEach(creationEvent => {
      console.log(`${FUNC}: processing creation event ${creationEvent.id}`);
      currentSnapshot.principalReceivables += parseNumber(creationEvent.loan.principal);
      currentSnapshot.interestReceivables += parseNumber(creationEvent.loan.interest);

      // Add any new loans into running list
      console.log(`${FUNC}: creationEvent.loan.id: ${creationEvent.loan.id}`);
      currentSnapshot.loans[creationEvent.loan.id] = {
        id: creationEvent.loan.id,
        loanId: parseNumber(creationEvent.loan.loanId),
        createdTimestamp: parseNumber(creationEvent.blockTimestamp),
        coolerAddress: creationEvent.loan.cooler,
        borrowerAddress: creationEvent.loan.borrower,
        lenderAddress: creationEvent.loan.lender,
        interestPerPeriod: parseNumber(creationEvent.loan.interest),
        collateralPerPeriod: parseNumber(creationEvent.loan.collateral),
        principal: parseNumber(creationEvent.loan.principal),
        interest: parseNumber(creationEvent.loan.interest),
        collateralDeposited: parseNumber(creationEvent.loan.collateral),
        expiryTimestamp: parseNumber(creationEvent.loan.expiryTimestamp),
        secondsToExpiry: getSecondsToExpiry(currentDateBeforeMidnight, parseNumber(creationEvent.loan.expiryTimestamp)),
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
      loan.collateralDeposited = parseNumber(repaymentEvent.collateralDeposited);

      // Calculate the interest and principal paid for this payment
      const eventAmountPaid = parseNumber(repaymentEvent.amountPaid);
      const interestPaid = (eventAmountPaid / (loan.principal + loan.interest)) * loan.interest;
      const principalPaid = eventAmountPaid - interestPaid;
      loan.interestPaid += interestPaid;
      loan.principalPaid += principalPaid;

      // If the loan is fully repaid, update the status
      if (loan.interestPaid >= loan.interest && loan.principalPaid >= loan.principal) {
        loan.status = "Repaid";
      }

      // Update overall receivables
      currentSnapshot.interestReceivables -= interestPaid;
      currentSnapshot.principalReceivables -= principalPaid;

      // Set the income from the repayment
      currentSnapshot.interestIncome += interestPaid;
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

      const collateralValueClaimed = parseNumber(defaultedClaimEvent.collateralValueClaimed);

      // Update the loan
      loan.status = "Reclaimed";
      loan.collateralClaimedQuantity += parseNumber(defaultedClaimEvent.collateralQuantityClaimed);
      loan.collateralClaimedValue += collateralValueClaimed;
      loan.collateralDeposited = 0;

      // Calculate the income from the collateral claim
      loan.collateralIncome += collateralValueClaimed;

      // Remove the loan payable from the receivables
      currentSnapshot.interestReceivables -= interestPayable;
      currentSnapshot.principalReceivables -= principalPayable;

      // Set the income from the default claim
      currentSnapshot.collateralIncome += collateralValueClaimed;
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
      loan.expiryTimestamp = parseNumber(extendEvent.expiryTimestamp);

      // Additional interest is paid at the time a loan is extended
      // https://github.com/ohmzeus/Cooler/pull/63
      const newInterest = parseNumber(extendEvent.periods) * loan.interestPerPeriod;
      loan.interest += newInterest;

      // Update receivables
      currentSnapshot.interestReceivables += newInterest;
    });

    // Update secondsToExpiry and status for all loans
    const loans = currentSnapshot.loans ? Object.values(currentSnapshot.loans) : [];
    console.log(`${FUNC}: processing ${loans.length} loans`);
    loans.forEach(loan => {
      // Update the seconds to expiry
      loan.secondsToExpiry = getSecondsToExpiry(currentDateBeforeMidnight, loan.expiryTimestamp);

      // Update the collateral deposited
      currentSnapshot.collateralDeposited += loan.collateralDeposited;

      // Set the status
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
