import { Snapshot } from "@repo/types/snapshot";
import { generateSnapshots } from "../snapshot";
import { ClearinghouseEvents } from "../types";
import { LoanSnapshotMap } from "@repo/types/loanSnapshot";
import { CoolerLoan } from "@repo/subgraph-cache-types";

const LOAN_ID = "0x3-0";
const LOAN_PRINCIPAL = 99000;
const LOAN_INTEREST = 1000;
const LOAN_CREATION_TIMESTAMP = 1690876800;
const LOAN_INITIAL_COLLATERAL = 30;
const CLEARINGHOUSE_DAI_BALANCE_AFTER_CREATION = 100.1;
const CLEARINGHOUSE_SDAI_BALANCE_AFTER_CREATION = 499900.0;
const CLEARINGHOUSE_SDAI_IN_DAI_BALANCE_AFTER_CREATION = 499800.0;
const TREASURY_DAI_BALANCE_AFTER_CREATION = 21.1;
const TREASURY_SDAI_BALANCE_AFTER_CREATION = 21.2;
const TREASURY_SDAI_IN_DAI_BALANCE_AFTER_CREATION = 21.3;

const REPAYMENT_AMOUNT = 900;
const CLEARINGHOUSE_DAI_BALANCE_AFTER_REPAYMENT = 20.0;
const CLEARINGHOUSE_SDAI_BALANCE_AFTER_REPAYMENT = 499800.0;
const CLEARINGHOUSE_SDAI_IN_DAI_BALANCE_AFTER_REPAYMENT = 499900.0;
const TREASURY_DAI_BALANCE_AFTER_REPAYMENT = 22.1;
const TREASURY_SDAI_BALANCE_AFTER_REPAYMENT = 22.2;
const TREASURY_SDAI_IN_DAI_BALANCE_AFTER_REPAYMENT = 22.3;

const COLLATERAL_CLAIM_QUANTITY = 29;
const COLLATERAL_PRICE = 1000;
const COLLATERAL_CLAIM_VALUE = 29000;

const CLEARINGHOUSE_DAI_BALANCE = 10000000.0;
const CLEARINGHOUSE_SDAI_BALANCE = 500000.0;
const CLEARINGHOUSE_SDAI_IN_DAI_BALANCE = 600000.01;
const CLEARINGHOUSE_DURATION_DAYS = 121;
const CLEARINGHOUSE_DURATION_SECONDS = CLEARINGHOUSE_DURATION_DAYS * 24 * 60 * 60;
const CLEARINGHOUSE_INTEREST_RATE = 0.005;
const CLEARINGHOUSE_LOAN_TO_COLLATERAL = 3000;
const CLEARINGHOUSE_FUND_AMOUNT = 18000000;
const CLEARINGHOUSE_FUND_CADENCE = 7 * 24 * 60 * 60;
const CLEARINGHOUSE_COOLER_FACTORY_ADDRESS = "0x00000";
const CLEARINGHOUSE_COLLATERAL_ADDRESS = "0x00001";
const CLEARINGHOUSE_DEBT_ADDRESS = "0x00002";
const CLEARINGHOUSE_ADDRESS = "0x02";

const TREASURY_DAI_BALANCE = 1000;
const TREASURY_SDAI_BALANCE = 1500;
const TREASURY_SDAI_IN_DAI_BALANCE = 1600;

const getLoanData = (): CoolerLoan => {
  return {
    __typename: "Loan",
    id: LOAN_ID,
    createdBlock: 12223,
    createdTransaction: "0x0000001",
    // 2023-08-01
    createdTimestamp: LOAN_CREATION_TIMESTAMP,
    loanId: 0,
    borrower: "0x01",
    lender: CLEARINGHOUSE_ADDRESS,
    cooler: "0x03",
    interest: LOAN_INTEREST,
    principal: LOAN_PRINCIPAL,
    collateral: LOAN_INITIAL_COLLATERAL,
    // 2023-09-10
    expiryTimestamp: 1694332800,
    collateralToken: "0x04",
    debtToken: "0x05",
    hasCallback: false,
    request: {
      __typename: "LoanRequest",
      id: "0x3-0",
    },
    creationEvents: [],
    repaymentEvents: [],
    defaultedClaimEvents: [],
    extendEvents: [],
    dt: "2023-08-01",
  };
};

/**
 * Provides sample data.
 *
 * Summary:
 *
 * Loan with id 0x3-0
 * - Created on 2023-08-01
 * - Repayment on 2023-08-10
 * - Expiry on 2023-09-10
 * - Default claim on 2023-09-12
 */
const getSampleData = (): ClearinghouseEvents => {
  return {
    clearinghouseSnapshots: {
      "2023-08-01": [
        {
          __typename: "ClearinghouseSnapshot",
          id: "12223",
          date: "2023-08-01",
          blockNumber: 12223,
          blockTimestamp: 100000,
          clearinghouse: CLEARINGHOUSE_ADDRESS,
          isActive: true,
          nextRebalanceTimestamp: 100001,
          principalReceivables: 100000,
          interestReceivables: 5000,
          daiBalance: CLEARINGHOUSE_DAI_BALANCE,
          sDaiBalance: CLEARINGHOUSE_SDAI_BALANCE,
          sDaiInDaiBalance: CLEARINGHOUSE_SDAI_IN_DAI_BALANCE,
          treasuryDaiBalance: TREASURY_DAI_BALANCE,
          treasurySDaiBalance: TREASURY_SDAI_BALANCE,
          treasurySDaiInDaiBalance: TREASURY_SDAI_IN_DAI_BALANCE,
          duration: CLEARINGHOUSE_DURATION_SECONDS,
          interestRate: CLEARINGHOUSE_INTEREST_RATE,
          loanToCollateral: CLEARINGHOUSE_LOAN_TO_COLLATERAL,
          fundAmount: CLEARINGHOUSE_FUND_AMOUNT,
          fundCadence: CLEARINGHOUSE_FUND_CADENCE,
          coolerFactoryAddress: CLEARINGHOUSE_COOLER_FACTORY_ADDRESS,
          collateralAddress: CLEARINGHOUSE_COLLATERAL_ADDRESS,
          debtAddress: CLEARINGHOUSE_DEBT_ADDRESS,
          dt: "2023-08-01",
        },
      ],
      "2023-08-20": [
        {
          __typename: "ClearinghouseSnapshot",
          id: "12255",
          date: "2023-08-20",
          blockNumber: 12255,
          blockTimestamp: 100000,
          clearinghouse: CLEARINGHOUSE_ADDRESS,
          isActive: true,
          nextRebalanceTimestamp: 100001,
          principalReceivables: 20000000.01,
          interestReceivables: 6000,
          daiBalance: 9000000.0,
          sDaiBalance: 500000.0,
          sDaiInDaiBalance: 600000.01,
          treasuryDaiBalance: 1100,
          treasurySDaiBalance: 1700,
          treasurySDaiInDaiBalance: 1800,
          duration: CLEARINGHOUSE_DURATION_SECONDS,
          interestRate: CLEARINGHOUSE_INTEREST_RATE,
          loanToCollateral: CLEARINGHOUSE_LOAN_TO_COLLATERAL,
          fundAmount: CLEARINGHOUSE_FUND_AMOUNT,
          fundCadence: CLEARINGHOUSE_FUND_CADENCE,
          coolerFactoryAddress: CLEARINGHOUSE_COOLER_FACTORY_ADDRESS,
          collateralAddress: CLEARINGHOUSE_COLLATERAL_ADDRESS,
          debtAddress: CLEARINGHOUSE_DEBT_ADDRESS,
          dt: "2023-08-20",
        },
      ],
    },
    creationEvents: {
      "2023-08-01": [
        {
          __typename: "ClearLoanRequestEvent",
          id: "0x3-0",
          date: "2023-08-01",
          blockTimestamp: LOAN_CREATION_TIMESTAMP,
          blockNumber: 12223,
          transactionHash: "0x0000001",
          loan: getLoanData(),
          clearinghouseDaiBalance: CLEARINGHOUSE_DAI_BALANCE_AFTER_CREATION,
          clearinghouseSDaiBalance: CLEARINGHOUSE_SDAI_BALANCE_AFTER_CREATION,
          clearinghouseSDaiInDaiBalance: CLEARINGHOUSE_SDAI_IN_DAI_BALANCE_AFTER_CREATION,
          treasuryDaiBalance: TREASURY_DAI_BALANCE_AFTER_CREATION,
          treasurySDaiBalance: TREASURY_SDAI_BALANCE_AFTER_CREATION,
          treasurySDaiInDaiBalance: TREASURY_SDAI_IN_DAI_BALANCE_AFTER_CREATION,
          dt: "2023-08-01",
          request: {
            __typename: "",
            id: "",
          },
        },
      ],
    },
    repaymentEvents: {
      "2023-08-10": [
        {
          __typename: "RepayLoanEvent",
          id: "0x3-0-1691654400",
          date: "2023-08-10",
          blockNumber: 1233455,
          transactionHash: "0x0000002",
          principalPayable: LOAN_PRINCIPAL - (REPAYMENT_AMOUNT * LOAN_PRINCIPAL) / (LOAN_PRINCIPAL + LOAN_INTEREST),
          interestPayable: LOAN_INTEREST - (REPAYMENT_AMOUNT * LOAN_INTEREST) / (LOAN_PRINCIPAL + LOAN_INTEREST),
          blockTimestamp: 1691654400,
          secondsToExpiry: 1694332800 - 1691654400,
          amountPaid: REPAYMENT_AMOUNT,
          collateralDeposited: 29,
          loan: getLoanData(),
          clearinghouseDaiBalance: CLEARINGHOUSE_DAI_BALANCE_AFTER_REPAYMENT,
          clearinghouseSDaiBalance: CLEARINGHOUSE_SDAI_BALANCE_AFTER_REPAYMENT,
          clearinghouseSDaiInDaiBalance: CLEARINGHOUSE_SDAI_IN_DAI_BALANCE_AFTER_REPAYMENT,
          treasuryDaiBalance: TREASURY_DAI_BALANCE_AFTER_REPAYMENT,
          treasurySDaiBalance: TREASURY_SDAI_BALANCE_AFTER_REPAYMENT,
          treasurySDaiInDaiBalance: TREASURY_SDAI_IN_DAI_BALANCE_AFTER_REPAYMENT,
          dt: "2023-08-10",
        },
      ],
    },
    defaultedClaimEvents: {
      "2023-09-12": [
        {
          __typename: "ClaimDefaultedLoanEvent",
          id: "0x3-0-1691654400",
          date: "2023-09-12",
          blockNumber: 1233455,
          blockTimestamp: 1691654400,
          transactionHash: "0x0000003",
          secondsSinceExpiry: 5000,
          collateralQuantityClaimed: COLLATERAL_CLAIM_QUANTITY,
          collateralPrice: COLLATERAL_PRICE,
          collateralValueClaimed: COLLATERAL_CLAIM_VALUE,
          loan: getLoanData(),
          dt: "2023-09-12",
        },
      ],
    },
    extendEvents: {},
    createdLoans: {
      "2023-08-01": {
        "0x3-0": getLoanData(),
      },
    },
    loanRequests: {
      "2023-08-01": {
        "0x3-0": {
          __typename: "LoanRequest",
          id: "0x3-0",
          createdBlock: 12223,
          createdTimestamp: LOAN_CREATION_TIMESTAMP,
          createdTransaction: "0x0000001",
          cooler: "0x03",
          requestId: 0,
          borrower: "0x01",
          collateralToken: "0x04",
          debtToken: "0x05",
          amount: LOAN_PRINCIPAL,
          interestPercentage: CLEARINGHOUSE_INTEREST_RATE,
          loanToCollateralRatio: CLEARINGHOUSE_LOAN_TO_COLLATERAL,
          durationSeconds: CLEARINGHOUSE_DURATION_SECONDS,
          isRescinded: false,
          requestEvents: [],
          rescindEvents: [],
          clearEvents: [],
          loans: [],
          dt: "2023-08-01",
        },
      },
    },
  };
};

const getSecondsToExpiry = (currentDate: string, expiryTimestamp: number): number => {
  const currentDateBeforeMidnight = new Date(currentDate);
  currentDateBeforeMidnight.setUTCHours(23, 59, 59, 999);

  const expiryDate = new Date(expiryTimestamp * 1000);
  return Math.floor((expiryDate.getTime() - currentDateBeforeMidnight.getTime()) / 1000);
};

/**
 * Based on: https://github.com/ohmzeus/Cooler/blob/a899201f503d74a956028ee4d8b7bc3ef71f55fa/src/Clearinghouse.sol#L455
 */
const getInterestForLoan = (
  principal: number,
  interestRate = CLEARINGHOUSE_INTEREST_RATE,
  duration = CLEARINGHOUSE_DURATION_DAYS,
): number => {
  return principal * ((interestRate * duration) / 365);
};

type ClearinghouseBalance = {
  daiBalance: number;
  sDaiBalance: number;
  sDaiInDaiBalance: number;
};

const assertClearinghouseSnapshots = (snapshot: Snapshot, balances: ClearinghouseBalance[]) => {
  // Check the clearinghouse balances
  const clearinghouseSnapshots = snapshot.clearinghouses;
  expect(clearinghouseSnapshots).toHaveLength(balances.length);
  for (let i = 0; i < clearinghouseSnapshots.length; i++) {
    const clearinghouseSnapshot = clearinghouseSnapshots[i];
    const balance = balances[i];
    expect(clearinghouseSnapshot.daiBalance).toEqual(balance.daiBalance);
    expect(clearinghouseSnapshot.sDaiBalance).toEqual(balance.sDaiBalance);
    expect(clearinghouseSnapshot.sDaiInDaiBalance).toEqual(balance.sDaiInDaiBalance);
    expect(clearinghouseSnapshot.fundAmount).toEqual(CLEARINGHOUSE_FUND_AMOUNT);
    expect(clearinghouseSnapshot.fundCadence).toEqual(CLEARINGHOUSE_FUND_CADENCE);
    expect(clearinghouseSnapshot.coolerFactoryAddress).toEqual(CLEARINGHOUSE_COOLER_FACTORY_ADDRESS);
    expect(clearinghouseSnapshot.collateralAddress).toEqual(CLEARINGHOUSE_COLLATERAL_ADDRESS);
    expect(clearinghouseSnapshot.debtAddress).toEqual(CLEARINGHOUSE_DEBT_ADDRESS);
    expect(clearinghouseSnapshot.address).toEqual(CLEARINGHOUSE_ADDRESS);
  }

  // Check the total
  const clearinghouseTotals = snapshot.clearinghouseTotals;
  expect(clearinghouseTotals.daiBalance).toEqual(balances.reduce((acc, balance) => acc + balance.daiBalance, 0));
  expect(clearinghouseTotals.sDaiBalance).toEqual(balances.reduce((acc, balance) => acc + balance.sDaiBalance, 0));
  expect(clearinghouseTotals.sDaiInDaiBalance).toEqual(
    balances.reduce((acc, balance) => acc + balance.sDaiInDaiBalance, 0),
  );
};

const assertTreasurySnapshot = (
  snapshot: Snapshot,
  daiBalance: number,
  sDaiBalance: number,
  sDaiInDaiBalance: number,
) => {
  expect(snapshot.treasury.daiBalance).toEqual(daiBalance);
  expect(snapshot.treasury.sDaiBalance).toEqual(sDaiBalance);
  expect(snapshot.treasury.sDaiInDaiBalance).toEqual(sDaiInDaiBalance);
};

const assertExpiryBuckets = (snapshot: Snapshot, active: number, expired: number, days30: number, days121: number) => {
  expect(snapshot.expiryBuckets.active).toEqual(active);
  expect(snapshot.expiryBuckets.expired).toEqual(expired);
  expect(snapshot.expiryBuckets.days30).toEqual(days30);
  expect(snapshot.expiryBuckets.days121).toEqual(days121);

  expect(
    snapshot.expiryBuckets.active +
      snapshot.expiryBuckets.expired +
      snapshot.expiryBuckets.days30 +
      snapshot.expiryBuckets.days121,
  ).toEqual(snapshot.principalReceivables);
};

const assertPrincipalReceivables = (snapshot: Snapshot, loans: LoanSnapshotMap) => {
  expect(snapshot.principalReceivables).toEqual(
    Object.values(loans).reduce((acc, loan) => acc + loan.principal - loan.principalPaid, 0),
  );
};

describe("generateSnapshots", () => {
  it("generate up to beforeDate", () => {
    const startDate = new Date("2022-01-01");
    const beforeDate = new Date("2022-01-05");
    const previousDateRecords: Snapshot | null = null;
    const previousLoanSnapshot: LoanSnapshotMap | null = null;
    const subgraphData: ClearinghouseEvents = {
      clearinghouseSnapshots: {},
      creationEvents: {},
      defaultedClaimEvents: {},
      repaymentEvents: {},
      extendEvents: {},
      createdLoans: {},
      loanRequests: {},
    };

    const result = generateSnapshots(startDate, beforeDate, previousDateRecords, previousLoanSnapshot, subgraphData);

    // Generates snapshots for each day, before but not including the beforeDate
    expect(result.length).toEqual(4);
  });

  it("should return empty records if no subgraphData is provided", () => {
    const startDate = new Date("2022-01-01");
    const beforeDate = new Date("2022-02-01");
    const previousDateRecords: Snapshot | null = null;
    const previousLoanSnapshot: LoanSnapshotMap | null = null;
    const subgraphData: ClearinghouseEvents = {
      clearinghouseSnapshots: {},
      creationEvents: {},
      defaultedClaimEvents: {},
      repaymentEvents: {},
      extendEvents: {},
      createdLoans: {},
      loanRequests: {},
    };

    const result = generateSnapshots(startDate, beforeDate, previousDateRecords, previousLoanSnapshot, subgraphData);

    const resultOneDate = result[0].date;
    const resultOne = result[0].snapshot;
    expect(resultOneDate.toISOString()).toEqual("2022-01-01T23:59:59.999Z");
    expect(resultOne.snapshotDate).toEqual("2022-01-01");
    expect(resultOne.principalReceivables).toEqual(0);
    expect(resultOne.interestReceivables).toEqual(0);

    assertClearinghouseSnapshots(resultOne, []);
    assertTreasurySnapshot(resultOne, 0, 0, 0);
    assertExpiryBuckets(resultOne, 0, 0, 0, 0);

    expect(resultOne.terms.duration).toEqual(0);
    expect(resultOne.terms.interestRate).toEqual(0);
    expect(resultOne.terms.loanToCollateral).toEqual(0);

    const resultOneLoans = result[0].loans;
    expect(Object.values(resultOneLoans)).toHaveLength(0);

    assertPrincipalReceivables(resultOne, resultOneLoans);

    expect(result.length).toEqual(31);
  });

  it("loan creation", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-03");
    const previousDateRecords: Snapshot | null = null;
    const previousLoanSnapshot: LoanSnapshotMap | null = null;
    const subgraphData = getSampleData();

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, previousLoanSnapshot, subgraphData);

    expect(snapshots.length).toEqual(2);

    // Day 1 should have the correct values
    const snapshotOneDate = snapshots[0].date;
    const snapshotOne = snapshots[0].snapshot;
    expect(snapshotOneDate.toISOString()).toEqual("2023-08-01T23:59:59.999Z");
    expect(snapshotOne.snapshotDate).toEqual("2023-08-01");
    expect(snapshotOne.principalReceivables).toEqual(LOAN_PRINCIPAL);
    expect(snapshotOne.interestReceivables).toEqual(LOAN_INTEREST);
    expect(snapshotOne.interestIncome).toEqual(0);
    expect(snapshotOne.collateralIncome).toEqual(0);
    expect(snapshotOne.collateralDeposited).toEqual(LOAN_INITIAL_COLLATERAL);

    const snapshotOneLoans = snapshots[0].loans;
    expect(Object.values(snapshotOneLoans)).toHaveLength(1);
    const snapshotOneLoanOne = snapshotOneLoans[LOAN_ID];
    expect(snapshotOneLoanOne.loanId).toEqual(0);
    expect(snapshotOneLoanOne.createdTimestamp).toEqual(LOAN_CREATION_TIMESTAMP);
    expect(snapshotOneLoanOne.borrowerAddress).toEqual("0x01");
    expect(snapshotOneLoanOne.lenderAddress).toEqual(CLEARINGHOUSE_ADDRESS);
    expect(snapshotOneLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotOneLoanOne.interest).toEqual(LOAN_INTEREST);
    expect(snapshotOneLoanOne.collateralDeposited).toEqual(LOAN_INITIAL_COLLATERAL);
    expect(snapshotOneLoanOne.expiryTimestamp).toEqual(1694332800);
    expect(snapshotOneLoanOne.secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotOne.snapshotDate, snapshotOneLoanOne.expiryTimestamp),
    );
    expect(snapshotOneLoanOne.status).toEqual("Active");
    expect(snapshotOneLoanOne.principalPaid).toEqual(0);
    expect(snapshotOneLoanOne.interestPaid).toEqual(0);
    expect(snapshotOneLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotOneLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotOneLoanOne.collateralIncome).toEqual(0);

    // Clearinghouse and treasury balances should have the new balance from the creation event
    assertClearinghouseSnapshots(snapshotOne, [
      {
        daiBalance: CLEARINGHOUSE_DAI_BALANCE_AFTER_CREATION,
        sDaiBalance: CLEARINGHOUSE_SDAI_BALANCE_AFTER_CREATION,
        sDaiInDaiBalance: CLEARINGHOUSE_SDAI_IN_DAI_BALANCE_AFTER_CREATION,
      },
    ]);
    assertTreasurySnapshot(
      snapshotOne,
      TREASURY_DAI_BALANCE_AFTER_CREATION,
      TREASURY_SDAI_BALANCE_AFTER_CREATION,
      TREASURY_SDAI_IN_DAI_BALANCE_AFTER_CREATION,
    );
    assertExpiryBuckets(snapshotOne, 0, 0, 0, LOAN_PRINCIPAL);

    const snapshotTwoDate = snapshots[1].date;
    const snapshotTwo = snapshots[1].snapshot;
    expect(snapshotTwoDate.toISOString()).toEqual("2023-08-02T23:59:59.999Z");
    expect(snapshotTwo.snapshotDate).toEqual("2023-08-02");
    expect(snapshotTwo.principalReceivables).toEqual(LOAN_PRINCIPAL);
    expect(snapshotTwo.interestReceivables).toEqual(LOAN_INTEREST);

    const snapshotTwoLoans = snapshots[1].loans;
    expect(Object.values(snapshotTwoLoans)).toHaveLength(1);
    const snapshotTwoLoanOne = snapshotTwoLoans[LOAN_ID];
    expect(snapshotTwoLoanOne.loanId).toEqual(0);
    expect(snapshotTwoLoanOne.createdTimestamp).toEqual(LOAN_CREATION_TIMESTAMP);
    expect(snapshotTwoLoanOne.borrowerAddress).toEqual("0x01");
    expect(snapshotTwoLoanOne.lenderAddress).toEqual(CLEARINGHOUSE_ADDRESS);
    expect(snapshotTwoLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotTwoLoanOne.interest).toEqual(LOAN_INTEREST);
    expect(snapshotTwoLoanOne.collateralDeposited).toEqual(LOAN_INITIAL_COLLATERAL);
    expect(snapshotTwoLoanOne.expiryTimestamp).toEqual(1694332800);
    expect(snapshotTwoLoanOne.secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotTwo.snapshotDate, snapshotTwoLoanOne.expiryTimestamp),
    );
    expect(snapshotTwoLoanOne.status).toEqual("Active");
    expect(snapshotTwoLoanOne.principalPaid).toEqual(0);
    expect(snapshotTwoLoanOne.interestPaid).toEqual(0);
    expect(snapshotTwoLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotTwoLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotTwoLoanOne.collateralIncome).toEqual(0);

    // Clearinghouse and treasury balances should have the new balance from the creation event
    assertClearinghouseSnapshots(snapshotTwo, [
      {
        daiBalance: CLEARINGHOUSE_DAI_BALANCE_AFTER_CREATION,
        sDaiBalance: CLEARINGHOUSE_SDAI_BALANCE_AFTER_CREATION,
        sDaiInDaiBalance: CLEARINGHOUSE_SDAI_IN_DAI_BALANCE_AFTER_CREATION,
      },
    ]);
    assertTreasurySnapshot(
      snapshotTwo,
      TREASURY_DAI_BALANCE_AFTER_CREATION,
      TREASURY_SDAI_BALANCE_AFTER_CREATION,
      TREASURY_SDAI_IN_DAI_BALANCE_AFTER_CREATION,
    );
    assertExpiryBuckets(snapshotTwo, 0, 0, 0, LOAN_PRINCIPAL);
  });

  it("expiry buckets - 30 days", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-03");
    const previousDateRecords: Snapshot | null = null;
    const previousLoanSnapshot: LoanSnapshotMap | null = null;
    const subgraphData = getSampleData();

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, previousLoanSnapshot, subgraphData);

    expect(snapshots.length).toEqual(2);
  });

  it("multiple loans", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-11");
    const previousDateRecords: Snapshot | null = null;
    const previousLoanSnapshot: LoanSnapshotMap | null = null;
    const subgraphData = getSampleData();

    // Add a second loan
    const loanTwoPrincipal = 10000;
    const loanTwoInterest = 500;
    const loanTwoClearinghouseDaiBalance = 99.9;
    const loanTwoClearinghouseSDaiBalance = 100.5;
    const loanTwoClearinghouseSDaiInDaiBalance = 100.6;
    const loanTwoTreasuryDaiBalance = 77.7;
    const loanTwoTreasurySDaiBalance = 77.8;
    const loanTwoTreasurySDaiInDaiBalance = 77.9;
    subgraphData.creationEvents["2023-08-02"] = [
      {
        __typename: "CreationEvent",
        id: "0x3-1",
        date: "2023-08-02",
        blockTimestamp: 1690876800,
        blockNumber: 12223,
        transactionHash: "0x0000001",
        loan: {
          __typename: "Loan",
          id: "0x3-1",
        },
        clearinghouseDaiBalance: loanTwoClearinghouseDaiBalance,
        clearinghouseSDaiBalance: loanTwoClearinghouseSDaiBalance,
        clearinghouseSDaiInDaiBalance: loanTwoClearinghouseSDaiInDaiBalance,
        treasuryDaiBalance: loanTwoTreasuryDaiBalance,
        treasurySDaiBalance: loanTwoTreasurySDaiBalance,
        treasurySDaiInDaiBalance: loanTwoTreasurySDaiInDaiBalance,
        request: {
          __typename: "LoanRequest",
          id: "0x3-1",
        },
        dt: "2023-08-02",
      },
    ];
    subgraphData.createdLoans["2023-08-02"] = {
      "0x3-1": {
        __typename: "Loan",
        id: "0x3-1",
        createdBlock: 12223,
        createdTransaction: "0x0000001",
        createdTimestamp: 1690876800,
        loanId: 1,
        borrower: "0x01",
        lender: CLEARINGHOUSE_ADDRESS,
        cooler: "0x03",
        interest: loanTwoInterest,
        principal: loanTwoPrincipal,
        collateral: 30,
        // 2023-09-11
        expiryTimestamp: 1694246400,
        collateralToken: "0x04",
        debtToken: "0x05",
        hasCallback: false,
        request: {
          __typename: "LoanRequest",
          id: "0x3-1",
        },
        creationEvents: [],
        repaymentEvents: [],
        defaultedClaimEvents: [],
        extendEvents: [],
        dt: "2023-08-02",
      },
    };
    subgraphData.loanRequests["2023-08-02"] = {
      "0x3-1": {
        __typename: "LoanRequest",
        id: "0x3-1",
        createdBlock: 12223,
        createdTimestamp: 1690876800,
        createdTransaction: "0x0000001",
        cooler: "0x03",
        requestId: 1,
        borrower: "0x01",
        collateralToken: "0x04",
        debtToken: "0x05",
        amount: loanTwoPrincipal,
        interestPercentage: CLEARINGHOUSE_INTEREST_RATE,
        loanToCollateralRatio: CLEARINGHOUSE_LOAN_TO_COLLATERAL,
        durationSeconds: CLEARINGHOUSE_DURATION_SECONDS,
        isRescinded: false,
        requestEvents: [],
        rescindEvents: [],
        clearEvents: [],
        loans: [],
        dt: "2023-08-02",
      },
    };

    // Change the payment amount to be more than interest
    const loanOneAmountPaid = 2000;
    const loanOneInterestPaid = loanOneAmountPaid > LOAN_INTEREST ? LOAN_INTEREST : loanOneAmountPaid;
    const loanOnePrincipalPaid = loanOneAmountPaid - loanOneInterestPaid;
    subgraphData.repaymentEvents["2023-08-10"][0].amountPaid = loanOneAmountPaid;

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, previousLoanSnapshot, subgraphData);

    const snapshotTwoDate = snapshots[1].date;
    const snapshotTwo = snapshots[1].snapshot;
    expect(snapshotTwoDate.toISOString()).toEqual("2023-08-02T23:59:59.999Z");
    expect(snapshotTwo.principalReceivables).toEqual(LOAN_PRINCIPAL + loanTwoPrincipal);
    expect(snapshotTwo.interestReceivables).toEqual(LOAN_INTEREST + loanTwoInterest);

    // Should have 2 loans
    const snapshotTwoLoans = snapshots[1].loans;
    expect(Object.values(snapshotTwoLoans)).toHaveLength(2);

    // Loan 1
    const snapshotTwoLoanOne = snapshotTwoLoans[LOAN_ID];
    expect(snapshotTwoLoanOne.id).toEqual(LOAN_ID);
    expect(snapshotTwoLoanOne.principalPaid).toEqual(0);
    expect(snapshotTwoLoanOne.interestPaid).toEqual(0);

    // Loan 2
    const snapshotTwoLoanTwo = snapshotTwoLoans["0x3-1"];
    expect(snapshotTwoLoanTwo.id).toEqual("0x3-1");
    expect(snapshotTwoLoanTwo.principalPaid).toEqual(0);
    expect(snapshotTwoLoanTwo.interestPaid).toEqual(0);

    assertPrincipalReceivables(snapshotTwo, snapshotTwoLoans);
    assertExpiryBuckets(
      snapshotTwo,
      0,
      0,
      0,
      snapshotTwoLoanOne.principal -
        snapshotTwoLoanOne.principalPaid +
        snapshotTwoLoanTwo.principal -
        snapshotTwoLoanTwo.principalPaid,
    );

    // Skip to day 10 after payment
    const snapshotTen = snapshots[9].snapshot;

    expect(snapshotTen.principalReceivables).toEqual(LOAN_PRINCIPAL + loanTwoPrincipal - loanOnePrincipalPaid);
    expect(snapshotTen.interestReceivables).toEqual(LOAN_INTEREST + loanTwoInterest - loanOneInterestPaid);

    const snapshotTenLoans = snapshots[9].loans;
    // Loan 1
    const snapshotTenLoanOne = snapshotTenLoans[LOAN_ID];
    expect(snapshotTenLoanOne.id).toEqual(LOAN_ID);

    // Loan 2
    const snapshotTenLoanTwo = snapshotTenLoans["0x3-1"];
    expect(snapshotTenLoanTwo.id).toEqual("0x3-1");

    assertPrincipalReceivables(snapshotTen, snapshotTenLoans);
    assertExpiryBuckets(
      snapshotTen,
      0,
      0,
      snapshotTenLoanTwo.principal + snapshotTenLoanTwo.principalPaid,
      snapshotTenLoanOne.principal - snapshotTenLoanOne.principalPaid,
    );
  });

  it("loan repayment < interest due", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-12");
    const previousDateRecords: Snapshot | null = null;
    const previousLoanSnapshot: LoanSnapshotMap | null = null;
    const subgraphData = getSampleData();

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, previousLoanSnapshot, subgraphData);

    expect(snapshots.length).toEqual(11);

    // Day 10 should include the repayment
    const snapshotTenDate = snapshots[9].date;
    const snapshotTen = snapshots[9].snapshot;
    expect(snapshotTenDate.toISOString()).toEqual("2023-08-10T23:59:59.999Z");

    expect(snapshotTen.principalReceivables).toEqual(LOAN_PRINCIPAL);
    expect(snapshotTen.interestReceivables).toEqual(LOAN_INTEREST - REPAYMENT_AMOUNT);
    expect(snapshotTen.interestIncome).toEqual(REPAYMENT_AMOUNT);
    expect(snapshotTen.interestReceivables + snapshotTen.interestIncome).toEqual(LOAN_INTEREST); // Invariant

    expect(snapshotTen.collateralIncome).toEqual(0);
    expect(snapshotTen.collateralDeposited).toEqual(29); // Takes the value from the repayment event

    const snapshotTenLoans = snapshots[9].loans;
    expect(Object.values(snapshotTenLoans)).toHaveLength(1);
    const snapshotTenLoanOne = snapshotTenLoans[LOAN_ID];
    expect(snapshotTenLoanOne.loanId).toEqual(0);
    expect(snapshotTenLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotTenLoanOne.interest).toEqual(LOAN_INTEREST);
    expect(snapshotTenLoanOne.collateralDeposited).toEqual(29);
    expect(snapshotTenLoanOne.expiryTimestamp).toEqual(1694332800);
    expect(snapshotTenLoanOne.secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotTen.snapshotDate, snapshotTenLoanOne.expiryTimestamp),
    );
    expect(snapshotTenLoanOne.status).toEqual("Active");

    expect(snapshotTenLoanOne.principalPaid).toEqual(0);
    expect(snapshotTenLoanOne.interestPaid).toEqual(REPAYMENT_AMOUNT);

    expect(snapshotTenLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotTenLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotTenLoanOne.collateralIncome).toEqual(0);

    // Clearinghouse and treasury balances should have the new balance from the repayment event
    assertClearinghouseSnapshots(snapshotTen, [
      {
        daiBalance: CLEARINGHOUSE_DAI_BALANCE_AFTER_REPAYMENT,
        sDaiBalance: CLEARINGHOUSE_SDAI_BALANCE_AFTER_REPAYMENT,
        sDaiInDaiBalance: CLEARINGHOUSE_SDAI_IN_DAI_BALANCE_AFTER_REPAYMENT,
      },
    ]);
    assertTreasurySnapshot(
      snapshotTen,
      TREASURY_DAI_BALANCE_AFTER_REPAYMENT,
      TREASURY_SDAI_BALANCE_AFTER_REPAYMENT,
      TREASURY_SDAI_IN_DAI_BALANCE_AFTER_REPAYMENT,
    );
    assertExpiryBuckets(snapshotTen, 0, 0, 0, LOAN_PRINCIPAL);

    // Day after should be the same
    const snapshotElevenDate = snapshots[10].date;
    const snapshotEleven = snapshots[10].snapshot;
    expect(snapshotElevenDate.toISOString()).toEqual("2023-08-11T23:59:59.999Z");

    expect(snapshotEleven.principalReceivables).toEqual(LOAN_PRINCIPAL);
    expect(snapshotEleven.interestReceivables).toEqual(LOAN_INTEREST - REPAYMENT_AMOUNT);
    expect(snapshotEleven.interestIncome).toEqual(0);
    // Check the invariant
    expect(snapshotEleven.interestReceivables + snapshotTen.interestIncome).toEqual(LOAN_INTEREST);

    expect(snapshotEleven.collateralIncome).toEqual(0);

    const snapshotElevenLoans = snapshots[10].loans;
    expect(Object.values(snapshotElevenLoans)).toHaveLength(1);
    const snapshotElevenLoanOne = snapshotElevenLoans[LOAN_ID];
    expect(snapshotElevenLoanOne.loanId).toEqual(0);
    expect(snapshotElevenLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotElevenLoanOne.interest).toEqual(LOAN_INTEREST);
    expect(snapshotElevenLoanOne.collateralDeposited).toEqual(29);
    expect(snapshotElevenLoanOne.expiryTimestamp).toEqual(1694332800);
    expect(snapshotElevenLoanOne.secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotEleven.snapshotDate, snapshotElevenLoanOne.expiryTimestamp),
    );
    expect(snapshotElevenLoanOne.status).toEqual("Active");

    expect(snapshotElevenLoanOne.principalPaid).toEqual(0);
    expect(snapshotElevenLoanOne.interestPaid).toEqual(REPAYMENT_AMOUNT);
    expect(snapshotElevenLoanOne.principalPaid + snapshotElevenLoanOne.interestPaid).toEqual(REPAYMENT_AMOUNT); // Invariant

    expect(snapshotElevenLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotElevenLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotElevenLoanOne.collateralIncome).toEqual(0);

    // Clearinghouse and treasury balances should have the new balance from the repayment event
    assertClearinghouseSnapshots(snapshotEleven, [
      {
        daiBalance: CLEARINGHOUSE_DAI_BALANCE_AFTER_REPAYMENT,
        sDaiBalance: CLEARINGHOUSE_SDAI_BALANCE_AFTER_REPAYMENT,
        sDaiInDaiBalance: CLEARINGHOUSE_SDAI_IN_DAI_BALANCE_AFTER_REPAYMENT,
      },
    ]);
    assertTreasurySnapshot(
      snapshotEleven,
      TREASURY_DAI_BALANCE_AFTER_REPAYMENT,
      TREASURY_SDAI_BALANCE_AFTER_REPAYMENT,
      TREASURY_SDAI_IN_DAI_BALANCE_AFTER_REPAYMENT,
    );
    assertExpiryBuckets(snapshotEleven, 0, 0, LOAN_PRINCIPAL, 0);
  });

  it("loan full repayment", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-13"); // Includes the remaining repayment, but not expiry
    const previousDateRecords: Snapshot | null = null;
    const previousLoanSnapshot: LoanSnapshotMap | null = null;
    const repaymentAmountTwo = LOAN_PRINCIPAL + LOAN_INTEREST - REPAYMENT_AMOUNT;

    const clearinghouseDaiBalance = 21.0;
    const clearinghouseSDaiBalance = 22.0;
    const clearinghouseSDaiInDaiBalance = 23.0;
    const treasuryDaiBalance = 24.0;
    const treasurySDaiBalance = 25.0;
    const treasurySDaiInDaiBalance = 26.0;

    const subgraphData = getSampleData();
    subgraphData.repaymentEvents["2023-08-12"] = [
      {
        __typename: "RepayLoanEvent",
        id: "0x3-0-1233456",
        date: "2023-08-12",
        blockNumber: 1233456,
        transactionHash: "0x0000002",
        principalPayable: 100000, // Unused
        interestPayable: 1000, // Unused
        blockTimestamp: 1691654400,
        secondsToExpiry: 1694332800 - 1691654400,
        amountPaid: repaymentAmountTwo,
        collateralDeposited: 0,
        loan: getLoanData(),
        clearinghouseDaiBalance: clearinghouseDaiBalance,
        clearinghouseSDaiBalance: clearinghouseSDaiBalance,
        clearinghouseSDaiInDaiBalance: clearinghouseSDaiInDaiBalance,
        treasuryDaiBalance: treasuryDaiBalance,
        treasurySDaiBalance: treasurySDaiBalance,
        treasurySDaiInDaiBalance: treasurySDaiInDaiBalance,
        dt: "2023-08-12",
      },
    ];

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, previousLoanSnapshot, subgraphData);

    expect(snapshots.length).toEqual(12);

    // Day 12 should include the full repayment
    const snapshotTwelveDate = snapshots[11].date;
    const snapshotTwelve = snapshots[11].snapshot;
    expect(snapshotTwelveDate.toISOString()).toEqual("2023-08-12T23:59:59.999Z");

    expect(snapshotTwelve.principalReceivables).toEqual(0);
    expect(snapshotTwelve.interestReceivables).toEqual(0);
    expect(snapshotTwelve.interestIncome).toEqual(LOAN_INTEREST - REPAYMENT_AMOUNT); // Residual income

    expect(snapshotTwelve.collateralIncome).toEqual(0);
    expect(snapshotTwelve.collateralDeposited).toEqual(0); // Returned to borrower

    const snapshotTwelveLoans = snapshots[11].loans;
    expect(Object.values(snapshotTwelveLoans)).toHaveLength(1);
    const snapshotTwelveLoanOne = snapshotTwelveLoans[LOAN_ID];
    expect(snapshotTwelveLoanOne.loanId).toEqual(0);
    expect(snapshotTwelveLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotTwelveLoanOne.interest).toEqual(LOAN_INTEREST);
    expect(snapshotTwelveLoanOne.collateralDeposited).toEqual(0); // Returned to borrower
    expect(snapshotTwelveLoanOne.expiryTimestamp).toEqual(1694332800);
    expect(snapshotTwelveLoanOne.secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotTwelve.snapshotDate, snapshotTwelveLoanOne.expiryTimestamp),
    );
    expect(snapshotTwelveLoanOne.status).toEqual("Repaid");

    expect(snapshotTwelveLoanOne.principalPaid).toEqual(LOAN_PRINCIPAL); // Cumulative
    expect(snapshotTwelveLoanOne.interestPaid).toEqual(LOAN_INTEREST); // Cumulative
    expect(snapshotTwelveLoanOne.principalPaid + snapshotTwelveLoanOne.interestPaid).toEqual(
      REPAYMENT_AMOUNT + repaymentAmountTwo,
    ); // Invariant

    expect(snapshotTwelveLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotTwelveLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotTwelveLoanOne.collateralIncome).toEqual(0);

    // Repayment of principal and interest should be reflected in the clearinghouse
    assertClearinghouseSnapshots(snapshotTwelve, [
      {
        daiBalance: clearinghouseDaiBalance,
        sDaiBalance: clearinghouseSDaiBalance,
        sDaiInDaiBalance: clearinghouseSDaiInDaiBalance,
      },
    ]);
    assertTreasurySnapshot(snapshotTwelve, treasuryDaiBalance, treasurySDaiBalance, treasurySDaiInDaiBalance);
    assertExpiryBuckets(snapshotTwelve, 0, 0, 0, 0);
  });

  it("clearinghouse balances", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-22");
    const previousDateRecords: Snapshot | null = null;
    const previousLoanSnapshot: LoanSnapshotMap | null = null;
    const subgraphData = getSampleData();

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, previousLoanSnapshot, subgraphData);

    expect(snapshots.length).toEqual(21);

    // Day 1 should have clearinghouse balances
    const snapshotOneDate = snapshots[0].date;
    const snapshotOne = snapshots[0].snapshot;
    expect(snapshotOneDate.toISOString()).toEqual("2023-08-01T23:59:59.999Z");
    expect(snapshotOne.principalReceivables).toEqual(LOAN_PRINCIPAL);
    expect(snapshotOne.interestReceivables).toEqual(LOAN_INTEREST);

    // Clearinghouse and treasury balances should have the new balance from the creation event
    assertClearinghouseSnapshots(snapshotOne, [
      {
        daiBalance: CLEARINGHOUSE_DAI_BALANCE_AFTER_CREATION,
        sDaiBalance: CLEARINGHOUSE_SDAI_BALANCE_AFTER_CREATION,
        sDaiInDaiBalance: CLEARINGHOUSE_SDAI_IN_DAI_BALANCE_AFTER_CREATION,
      },
    ]);
    assertTreasurySnapshot(
      snapshotOne,
      TREASURY_DAI_BALANCE_AFTER_CREATION,
      TREASURY_SDAI_BALANCE_AFTER_CREATION,
      TREASURY_SDAI_IN_DAI_BALANCE_AFTER_CREATION,
    );

    expect(snapshotOne.terms.duration).toEqual(CLEARINGHOUSE_DURATION_SECONDS);
    expect(snapshotOne.terms.interestRate).toEqual(CLEARINGHOUSE_INTEREST_RATE);
    expect(snapshotOne.terms.loanToCollateral).toEqual(CLEARINGHOUSE_LOAN_TO_COLLATERAL);

    // Day 20 should have the adjusted clearinghouse balances
    const snapshotTwentyDate = snapshots[19].date;
    const snapshotTwenty = snapshots[19].snapshot;
    expect(snapshotTwentyDate.toISOString()).toEqual("2023-08-20T23:59:59.999Z");
    expect(snapshotTwenty.principalReceivables).toEqual(LOAN_PRINCIPAL); // Ignores the clearinghouse snapshot
    expect(snapshotTwenty.interestReceivables).toEqual(LOAN_INTEREST - REPAYMENT_AMOUNT); // Ignores the clearinghouse snapshot

    assertClearinghouseSnapshots(snapshotTwenty, [
      {
        daiBalance: 9000000.0,
        sDaiBalance: 500000.0,
        sDaiInDaiBalance: 600000.01,
      },
    ]);
    assertTreasurySnapshot(snapshotTwenty, 1100, 1700, 1800);

    // Day 21 should carry on balances
    const snapshotTwentyOneDate = snapshots[20].date;
    const snapshotTwentyOne = snapshots[20].snapshot;
    expect(snapshotTwentyOneDate.toISOString()).toEqual("2023-08-21T23:59:59.999Z");
    expect(snapshotTwentyOne.principalReceivables).toEqual(LOAN_PRINCIPAL); // Ignores the clearinghouse snapshot
    expect(snapshotTwentyOne.interestReceivables).toEqual(LOAN_INTEREST - REPAYMENT_AMOUNT); // Ignores the clearinghouse snapshot

    assertClearinghouseSnapshots(snapshotTwentyOne, [
      {
        daiBalance: 9000000.0,
        sDaiBalance: 500000.0,
        sDaiInDaiBalance: 600000.01,
      },
    ]);
    assertTreasurySnapshot(snapshotTwentyOne, 1100, 1700, 1800);
  });

  it("clearinghouse balances as strings", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-02");
    const previousDateRecords: Snapshot | null = null;
    const previousLoanSnapshot: LoanSnapshotMap | null = null;
    const subgraphData = getSampleData();
    // @ts-ignore
    subgraphData.clearinghouseSnapshots["2023-08-01"][0].interestRate = "0.005";

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, previousLoanSnapshot, subgraphData);

    expect(snapshots.length).toEqual(1);

    // Day 1 should have clearinghouse balances
    const snapshotOneDate = snapshots[0].date;
    const snapshotOne = snapshots[0].snapshot;
    expect(snapshotOneDate.toISOString()).toEqual("2023-08-01T23:59:59.999Z");

    expect(snapshotOne.terms.interestRate).toEqual(CLEARINGHOUSE_INTEREST_RATE);
  });

  it("repayment amount as strings", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-11");
    const previousDateRecords: Snapshot | null = null;
    const previousLoanSnapshot: LoanSnapshotMap | null = null;
    const subgraphData = getSampleData();
    // @ts-ignore
    subgraphData.repaymentEvents["2023-08-10"][0].amountPaid = "999";

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, previousLoanSnapshot, subgraphData);

    expect(snapshots.length).toEqual(10);

    // Check that the amount paid is interpreted correctly
    const snapshotTen = snapshots[9].snapshot;
    expect(snapshotTen.principalReceivables).toEqual(LOAN_PRINCIPAL);
    expect(snapshotTen.interestReceivables).toEqual(LOAN_INTEREST - 999);

    expect(snapshotTen.interestIncome).toEqual(999);
  });

  it("repayment amount as scientific notation strings", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-11");
    const previousDateRecords: Snapshot | null = null;
    const previousLoanSnapshot: LoanSnapshotMap | null = null;
    const subgraphData = getSampleData();
    // @ts-ignore
    subgraphData.repaymentEvents["2023-08-10"][0].amountPaid = "1.26e-13";

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, previousLoanSnapshot, subgraphData);

    expect(snapshots.length).toEqual(10);

    // Check that the amount paid is interpreted correctly
    const snapshotTen = snapshots[9].snapshot;
    expect(snapshotTen.principalReceivables).toEqual(LOAN_PRINCIPAL);
    expect(snapshotTen.interestReceivables).toEqual(LOAN_INTEREST - 0.000000000000126);

    expect(snapshotTen.interestIncome).toEqual(0.000000000000126);
  });

  it("should handle no previous snapshot", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-02");
    const subgraphData: ClearinghouseEvents = {
      clearinghouseSnapshots: {},
      creationEvents: {},
      defaultedClaimEvents: {},
      repaymentEvents: {},
      extendEvents: {},
      createdLoans: {},
      loanRequests: {},
    };

    const snapshots = generateSnapshots(startDate, beforeDate, null, null, subgraphData);

    expect(snapshots).toHaveLength(1);

    const snapshotOneDate = snapshots[0].date;
    const snapshotOne = snapshots[0].snapshot;
    expect(snapshotOneDate.toISOString()).toEqual("2023-08-01T23:59:59.999Z");
    expect(snapshotOne.principalReceivables).toEqual(0);
    expect(snapshotOne.interestReceivables).toEqual(0);
    expect(snapshotOne.interestIncome).toEqual(0);
    expect(snapshotOne.collateralIncome).toEqual(0);
    expect(snapshotOne.collateralDeposited).toEqual(0);

    const snapshotOneLoans = snapshots[0].loans;
    expect(Object.keys(snapshotOneLoans)).toHaveLength(0);
  });

  it("should use the previous day records", () => {
    const previousDateSnapshot: Snapshot = {
      snapshotDate: "2023-08-01",
      principalReceivables: 55555,
      interestReceivables: 6666,
      interestIncome: 10000,
      collateralIncome: 1000000,
      collateralClaimedQuantity: 1234,
      collateralClaimedValue: 123456,
      collateralDeposited: 1234,
      clearinghouseTotals: {
        daiBalance: 12345,
        sDaiBalance: 56789,
        sDaiInDaiBalance: 101010,
      },
      clearinghouses: [
        {
          daiBalance: 12345,
          sDaiBalance: 56789,
          sDaiInDaiBalance: 101010,
          address: CLEARINGHOUSE_ADDRESS,
          fundAmount: CLEARINGHOUSE_FUND_AMOUNT,
          fundCadence: CLEARINGHOUSE_FUND_CADENCE,
          coolerFactoryAddress: CLEARINGHOUSE_COOLER_FACTORY_ADDRESS,
          collateralAddress: CLEARINGHOUSE_COLLATERAL_ADDRESS,
          debtAddress: CLEARINGHOUSE_DEBT_ADDRESS,
        },
      ],
      treasury: {
        daiBalance: 111111,
        sDaiBalance: 3333,
        sDaiInDaiBalance: 4444,
      },
      terms: {
        duration: CLEARINGHOUSE_DURATION_SECONDS,
        interestRate: CLEARINGHOUSE_INTEREST_RATE,
        loanToCollateral: CLEARINGHOUSE_LOAN_TO_COLLATERAL,
      },
      expiryBuckets: {
        active: 0,
        expired: 0,
        days30: 0,
        days121: 0,
      },
    };
    const previousLoanSnapshot: LoanSnapshotMap = {
      [LOAN_ID]: {
        id: LOAN_ID,
        loanId: 0,
        createdTimestamp: LOAN_CREATION_TIMESTAMP,
        borrowerAddress: "0x01",
        snapshotDate: "2023-08-01",
        lenderAddress: CLEARINGHOUSE_ADDRESS,
        coolerAddress: "0x03",
        principal: LOAN_PRINCIPAL,
        interest: LOAN_INTEREST,
        collateralDeposited: LOAN_INITIAL_COLLATERAL,
        expiryTimestamp: 1694332800,
        secondsToExpiry: 1694332800 - LOAN_CREATION_TIMESTAMP,
        status: "Active",
        principalPaid: 999,
        interestPaid: 22,
        collateralIncome: 0,
        collateralClaimedQuantity: 0,
        collateralClaimedValue: 0,
        durationSeconds: CLEARINGHOUSE_DURATION_SECONDS,
        interestRate: CLEARINGHOUSE_INTEREST_RATE,
      },
    };

    const startDate = new Date("2023-08-02");
    const beforeDate = new Date("2023-08-03");
    const subgraphData: ClearinghouseEvents = {
      clearinghouseSnapshots: {},
      creationEvents: {},
      defaultedClaimEvents: {},
      repaymentEvents: {},
      extendEvents: {},
      createdLoans: {},
      loanRequests: {},
    };

    const snapshots = generateSnapshots(
      startDate,
      beforeDate,
      previousDateSnapshot,
      previousLoanSnapshot,
      subgraphData,
    );

    // Should generate records based on the existing snapshots
    expect(snapshots.length).toEqual(1);

    const snapshotOne = snapshots[0].snapshot;
    expect(snapshots[0].date.toISOString()).toEqual("2023-08-02T23:59:59.999Z");
    expect(snapshotOne.principalReceivables).toEqual(LOAN_PRINCIPAL - 999); // Does not use the previous snapshot
    expect(snapshotOne.interestReceivables).toEqual(LOAN_INTEREST - 22); // Does not use the previous snapshot
    expect(snapshotOne.interestIncome).toEqual(0); // Does not carry over
    expect(snapshotOne.collateralIncome).toEqual(0); // Does not carry over
    expect(snapshotOne.collateralClaimedQuantity).toEqual(0); // Does not carry over
    expect(snapshotOne.collateralClaimedValue).toEqual(0); // Does not carry over
    expect(snapshotOne.collateralDeposited).toEqual(30); // Does not carry over

    assertClearinghouseSnapshots(snapshotOne, [
      {
        daiBalance: 12345,
        sDaiBalance: 56789,
        sDaiInDaiBalance: 101010,
      },
    ]);
    assertTreasurySnapshot(snapshotOne, 111111, 3333, 4444);

    const snapshotOneLoans = snapshots[0].loans;
    expect(Object.keys(snapshotOneLoans)).toHaveLength(1);
    const snapshotOneLoanOne = snapshotOneLoans[LOAN_ID];
    expect(snapshotOneLoanOne.loanId).toEqual(0);
    expect(snapshotOneLoanOne.createdTimestamp).toEqual(LOAN_CREATION_TIMESTAMP);
    expect(snapshotOneLoanOne.borrowerAddress).toEqual("0x01");
    expect(snapshotOneLoanOne.lenderAddress).toEqual(CLEARINGHOUSE_ADDRESS);
    expect(snapshotOneLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotOneLoanOne.interest).toEqual(LOAN_INTEREST);
    expect(snapshotOneLoanOne.collateralDeposited).toEqual(LOAN_INITIAL_COLLATERAL);
    expect(snapshotOneLoanOne.expiryTimestamp).toEqual(1694332800);
    expect(snapshotOneLoanOne.secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotOne.snapshotDate, snapshotOneLoanOne.expiryTimestamp),
    );
    expect(snapshotOneLoanOne.status).toEqual("Active");
    expect(snapshotOneLoanOne.principalPaid).toEqual(999); // Uses previous snapshot
    expect(snapshotOneLoanOne.interestPaid).toEqual(22); // Uses previous snapshot
    expect(snapshotOneLoanOne.collateralIncome).toEqual(0);
    expect(snapshotOneLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotOneLoanOne.collateralClaimedValue).toEqual(0);
  });

  it("loan expiry", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-09-12"); // includes 1 day after expiry
    const previousDateRecords: Snapshot | null = null;
    const previousLoanSnapshot: LoanSnapshotMap = {};
    const subgraphData = getSampleData();

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, previousLoanSnapshot, subgraphData);

    expect(snapshots.length).toEqual(42); // 31 + 11

    // Day of expiry
    const snapshotDayOfExpiry = snapshots[40].snapshot;
    expect(snapshots[40].date.toISOString()).toEqual("2023-09-10T23:59:59.999Z");

    expect(snapshotDayOfExpiry.principalReceivables).toEqual(LOAN_PRINCIPAL);
    expect(snapshotDayOfExpiry.interestReceivables).toEqual(LOAN_INTEREST - REPAYMENT_AMOUNT);

    expect(snapshotDayOfExpiry.interestIncome).toEqual(0);
    expect(snapshotDayOfExpiry.collateralIncome).toEqual(0);
    expect(snapshotDayOfExpiry.collateralDeposited).toEqual(29);

    const snapshotDayOfExpiryLoans = snapshots[40].loans;
    expect(Object.keys(snapshotDayOfExpiryLoans)).toHaveLength(1);
    const snapshotDayOfExpiryLoanOne = snapshotDayOfExpiryLoans[LOAN_ID];
    expect(snapshotDayOfExpiryLoanOne.loanId).toEqual(0);
    expect(snapshotDayOfExpiryLoanOne.createdTimestamp).toEqual(LOAN_CREATION_TIMESTAMP);
    expect(snapshotDayOfExpiryLoanOne.borrowerAddress).toEqual("0x01");
    expect(snapshotDayOfExpiryLoanOne.lenderAddress).toEqual(CLEARINGHOUSE_ADDRESS);
    expect(snapshotDayOfExpiryLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotDayOfExpiryLoanOne.interest).toEqual(LOAN_INTEREST);
    expect(snapshotDayOfExpiryLoanOne.collateralDeposited).toEqual(29);
    expect(snapshotDayOfExpiryLoanOne.expiryTimestamp).toEqual(1694332800);
    expect(snapshotDayOfExpiryLoanOne.secondsToExpiry).toEqual(0);
    expect(snapshotDayOfExpiryLoanOne.status).toEqual("Expired");
    expect(snapshotDayOfExpiryLoanOne.principalPaid).toEqual(0);
    expect(snapshotDayOfExpiryLoanOne.interestPaid).toEqual(REPAYMENT_AMOUNT);

    expect(snapshotDayOfExpiryLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotDayOfExpiryLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotDayOfExpiryLoanOne.collateralIncome).toEqual(0);

    assertExpiryBuckets(snapshotDayOfExpiry, 0, LOAN_PRINCIPAL, 0, 0);

    // Same for the next day
    const snapshotDayAfterExpiry = snapshots[41].snapshot;
    expect(snapshots[41].date.toISOString()).toEqual("2023-09-11T23:59:59.999Z");

    const snapshotDayAfterExpiryLoans = snapshots[41].loans;
    expect(Object.keys(snapshotDayAfterExpiryLoans)).toHaveLength(1);
    const snapshotDayAfterExpiryLoanOne = snapshotDayAfterExpiryLoans[LOAN_ID];
    expect(snapshotDayAfterExpiryLoanOne.loanId).toEqual(0);
    expect(snapshotDayAfterExpiryLoanOne.createdTimestamp).toEqual(LOAN_CREATION_TIMESTAMP);
    expect(snapshotDayAfterExpiryLoanOne.borrowerAddress).toEqual("0x01");
    expect(snapshotDayAfterExpiryLoanOne.lenderAddress).toEqual(CLEARINGHOUSE_ADDRESS);
    expect(snapshotDayAfterExpiryLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotDayAfterExpiryLoanOne.interest).toEqual(LOAN_INTEREST);
    expect(snapshotDayAfterExpiryLoanOne.collateralDeposited).toEqual(29);
    expect(snapshotDayAfterExpiryLoanOne.expiryTimestamp).toEqual(1694332800);
    expect(snapshotDayAfterExpiryLoanOne.secondsToExpiry).toEqual(0);
    expect(snapshotDayAfterExpiryLoanOne.status).toEqual("Expired");
    expect(snapshotDayAfterExpiryLoanOne.principalPaid).toEqual(0);
    expect(snapshotDayAfterExpiryLoanOne.interestPaid).toEqual(REPAYMENT_AMOUNT);

    expect(snapshotDayAfterExpiryLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotDayAfterExpiryLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotDayAfterExpiryLoanOne.collateralIncome).toEqual(0);

    assertExpiryBuckets(snapshotDayAfterExpiry, 0, LOAN_PRINCIPAL, 0, 0);
  });

  it("loan default claim", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-09-14"); // includes 1 day after default claim
    const previousDateRecords: Snapshot | null = null;
    const previousLoanSnapshot: LoanSnapshotMap = {};
    const subgraphData = getSampleData();

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, previousLoanSnapshot, subgraphData);

    expect(snapshots.length).toEqual(44); // 31 + 13

    // Entire principal is outstanding and is not returned, so is deducted from the claim value
    const loanOneCollateralIncome = COLLATERAL_CLAIM_VALUE - LOAN_PRINCIPAL;

    // Day of claim
    const snapshotDayOfExpiry = snapshots[42].snapshot;
    expect(snapshots[42].date.toISOString()).toEqual("2023-09-12T23:59:59.999Z");
    expect(snapshotDayOfExpiry.principalReceivables).toEqual(0); // Zero-ed out
    expect(snapshotDayOfExpiry.interestReceivables).toEqual(0); // Zero-ed out
    expect(snapshotDayOfExpiry.interestIncome).toEqual(0);
    expect(snapshotDayOfExpiry.collateralIncome).toEqual(loanOneCollateralIncome);
    expect(snapshotDayOfExpiry.collateralDeposited).toEqual(0);

    const snapshotDayOfExpiryLoans = snapshots[42].loans;
    expect(Object.keys(snapshotDayOfExpiryLoans)).toHaveLength(1);
    const snapshotDayOfExpiryLoanOne = snapshotDayOfExpiryLoans[LOAN_ID];
    expect(snapshotDayOfExpiryLoanOne.loanId).toEqual(0);
    expect(snapshotDayOfExpiryLoanOne.createdTimestamp).toEqual(LOAN_CREATION_TIMESTAMP);
    expect(snapshotDayOfExpiryLoanOne.borrowerAddress).toEqual("0x01");
    expect(snapshotDayOfExpiryLoanOne.lenderAddress).toEqual(CLEARINGHOUSE_ADDRESS);
    expect(snapshotDayOfExpiryLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotDayOfExpiryLoanOne.interest).toEqual(LOAN_INTEREST);
    expect(snapshotDayOfExpiryLoanOne.collateralDeposited).toEqual(0);
    expect(snapshotDayOfExpiryLoanOne.expiryTimestamp).toEqual(1694332800);
    expect(snapshotDayOfExpiryLoanOne.secondsToExpiry).toEqual(0);
    expect(snapshotDayOfExpiryLoanOne.status).toEqual("Reclaimed");
    expect(snapshotDayOfExpiryLoanOne.principalPaid).toEqual(0);
    expect(snapshotDayOfExpiryLoanOne.interestPaid).toEqual(REPAYMENT_AMOUNT);

    expect(snapshotDayOfExpiryLoanOne.collateralClaimedQuantity).toEqual(COLLATERAL_CLAIM_QUANTITY); // From default
    expect(snapshotDayOfExpiryLoanOne.collateralClaimedValue).toEqual(COLLATERAL_CLAIM_VALUE); // From default
    expect(snapshotDayOfExpiryLoanOne.collateralIncome).toEqual(loanOneCollateralIncome);

    assertExpiryBuckets(snapshotDayOfExpiry, 0, 0, 0, 0);

    // Same for next day
    const snapshotDayAfterExpiry = snapshots[43].snapshot;
    expect(snapshots[43].date.toISOString()).toEqual("2023-09-13T23:59:59.999Z");

    const snapshotDayAfterExpiryLoans = snapshots[43].loans;
    expect(Object.keys(snapshotDayAfterExpiryLoans)).toHaveLength(1);
    const snapshotDayAfterExpiryLoanOne = snapshotDayAfterExpiryLoans[LOAN_ID];
    expect(snapshotDayAfterExpiryLoanOne.loanId).toEqual(0);
    expect(snapshotDayAfterExpiryLoanOne.createdTimestamp).toEqual(LOAN_CREATION_TIMESTAMP);
    expect(snapshotDayAfterExpiryLoanOne.borrowerAddress).toEqual("0x01");
    expect(snapshotDayAfterExpiryLoanOne.lenderAddress).toEqual(CLEARINGHOUSE_ADDRESS);
    expect(snapshotDayAfterExpiryLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotDayAfterExpiryLoanOne.interest).toEqual(LOAN_INTEREST);
    expect(snapshotDayAfterExpiryLoanOne.collateralDeposited).toEqual(0);
    expect(snapshotDayAfterExpiryLoanOne.expiryTimestamp).toEqual(1694332800);
    expect(snapshotDayAfterExpiryLoanOne.secondsToExpiry).toEqual(0);
    expect(snapshotDayAfterExpiryLoanOne.status).toEqual("Reclaimed");
    expect(snapshotDayAfterExpiryLoanOne.principalPaid).toEqual(0);
    expect(snapshotDayAfterExpiryLoanOne.interestPaid).toEqual(REPAYMENT_AMOUNT);

    expect(snapshotDayAfterExpiryLoanOne.collateralClaimedQuantity).toEqual(COLLATERAL_CLAIM_QUANTITY); // From default
    expect(snapshotDayAfterExpiryLoanOne.collateralClaimedValue).toEqual(COLLATERAL_CLAIM_VALUE); // From default
    expect(snapshotDayAfterExpiryLoanOne.collateralIncome).toEqual(loanOneCollateralIncome);

    assertExpiryBuckets(snapshotDayAfterExpiry, 0, 0, 0, 0);
  });

  it("loan default claim, principal repayment", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-09-14"); // includes 1 day after default claim
    const previousDateRecords: Snapshot | null = null;
    const previousLoanSnapshot: LoanSnapshotMap = {};
    const subgraphData = getSampleData();

    const clearinghouseDaiBalance = 21.0;
    const clearinghouseSDaiBalance = 22.0;
    const clearinghouseSDaiInDaiBalance = 23.0;
    const treasuryDaiBalance = 24.0;
    const treasurySDaiBalance = 25.0;
    const treasurySDaiInDaiBalance = 26.0;

    // Add a partial repayment that reduces the principal outstanding
    const repaymentAmountTwo = LOAN_INTEREST - REPAYMENT_AMOUNT + 1000;
    subgraphData.repaymentEvents["2023-08-12"] = [
      {
        __typename: "RepayLoanEvent",
        id: "0x3-0-1233456",
        date: "2023-08-12",
        blockNumber: 1233456,
        transactionHash: "0x0000002",
        principalPayable: 100000, // Unused
        interestPayable: 1000, // Unused
        blockTimestamp: 1691654400,
        secondsToExpiry: 1694332800 - 1691654400,
        amountPaid: repaymentAmountTwo,
        collateralDeposited: 0,
        loan: getLoanData(),
        clearinghouseDaiBalance: clearinghouseDaiBalance,
        clearinghouseSDaiBalance: clearinghouseSDaiBalance,
        clearinghouseSDaiInDaiBalance: clearinghouseSDaiInDaiBalance,
        treasuryDaiBalance: treasuryDaiBalance,
        treasurySDaiBalance: treasurySDaiBalance,
        treasurySDaiInDaiBalance: treasurySDaiInDaiBalance,
        dt: "2023-08-12",
      },
    ];

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, previousLoanSnapshot, subgraphData);

    expect(snapshots.length).toEqual(44); // 31 + 13

    // 1000 of the principal has been repaid, so is not recognised as income
    const loanOneCollateralIncome = COLLATERAL_CLAIM_VALUE - LOAN_PRINCIPAL + 1000;

    // Day of claim
    const snapshotDayOfExpiry = snapshots[42].snapshot;
    expect(snapshots[42].date.toISOString()).toEqual("2023-09-12T23:59:59.999Z");
    expect(snapshotDayOfExpiry.principalReceivables).toEqual(0); // Zero-ed out
    expect(snapshotDayOfExpiry.interestReceivables).toEqual(0); // Zero-ed out
    expect(snapshotDayOfExpiry.interestIncome).toEqual(0);
    expect(snapshotDayOfExpiry.collateralIncome).toEqual(loanOneCollateralIncome);
    expect(snapshotDayOfExpiry.collateralDeposited).toEqual(0);

    const snapshotDayOfExpiryLoans = snapshots[42].loans;
    expect(Object.keys(snapshotDayOfExpiryLoans)).toHaveLength(1);
    const snapshotDayOfExpiryLoanOne = snapshotDayOfExpiryLoans[LOAN_ID];
    expect(snapshotDayOfExpiryLoanOne.loanId).toEqual(0);
    expect(snapshotDayOfExpiryLoanOne.createdTimestamp).toEqual(LOAN_CREATION_TIMESTAMP);
    expect(snapshotDayOfExpiryLoanOne.borrowerAddress).toEqual("0x01");
    expect(snapshotDayOfExpiryLoanOne.lenderAddress).toEqual(CLEARINGHOUSE_ADDRESS);
    expect(snapshotDayOfExpiryLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotDayOfExpiryLoanOne.interest).toEqual(LOAN_INTEREST);
    expect(snapshotDayOfExpiryLoanOne.collateralDeposited).toEqual(0);
    expect(snapshotDayOfExpiryLoanOne.expiryTimestamp).toEqual(1694332800);
    expect(snapshotDayOfExpiryLoanOne.secondsToExpiry).toEqual(0);
    expect(snapshotDayOfExpiryLoanOne.status).toEqual("Reclaimed");
    expect(snapshotDayOfExpiryLoanOne.principalPaid).toEqual(1000);
    expect(snapshotDayOfExpiryLoanOne.interestPaid).toEqual(LOAN_INTEREST);

    expect(snapshotDayOfExpiryLoanOne.collateralClaimedQuantity).toEqual(COLLATERAL_CLAIM_QUANTITY); // From default
    expect(snapshotDayOfExpiryLoanOne.collateralClaimedValue).toEqual(COLLATERAL_CLAIM_VALUE); // From default
    expect(snapshotDayOfExpiryLoanOne.collateralIncome).toEqual(loanOneCollateralIncome);

    assertExpiryBuckets(snapshotDayOfExpiry, 0, 0, 0, 0);
  });

  it("loan default claim, multiple", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-09-14"); // includes 1 day after default claim
    const previousDateRecords: Snapshot | null = null;
    const previousLoanSnapshot: LoanSnapshotMap = {};
    const subgraphData = getSampleData();

    // Add a second loan
    const loanTwoPrincipal = 10000;
    const loanTwoInterest = 500;
    const loanTwoCollateral = 10;
    const loanTwoClearinghouseDaiBalance = 999.9;
    const loanTwoClearinghouseSDaiBalance = 1000;
    const loanTwoClearinghouseSDaiInDaiBalance = 1000.1;
    const loanTwoTreasuryDaiBalance = 888.1;
    const loanTwoTreasurySDaiBalance = 888.2;
    const loanTwoTreasurySDaiInDaiBalance = 888.3;

    const loanTwo: Loan = {
      __typename: "Loan",
      id: "0x3-1",
      createdBlock: 12223,
      createdTransaction: "0x0000001",
      // 2023-08-02
      createdTimestamp: 1690876800,
      loanId: 1,
      borrower: "0x01",
      lender: CLEARINGHOUSE_ADDRESS,
      cooler: "0x03",
      interest: loanTwoInterest,
      principal: loanTwoPrincipal,
      collateral: loanTwoCollateral,
      // 2023-09-11
      expiryTimestamp: 1694246400,
      collateralToken: "0x04",
      debtToken: "0x05",
      hasCallback: false,
      request: {
        __typename: "LoanRequest",
        id: "0x3-1",
      },
      dt: "2023-08-02",
      creationEvents: [],
      repaymentEvents: [],
      defaultedClaimEvents: [],
      extendEvents: [],
    };
    subgraphData.creationEvents["2023-08-02"] = [
      {
        __typename: "CreationEvent",
        id: "0x3-1",
        date: "2023-08-02",
        blockTimestamp: 1690876800,
        blockNumber: 12223,
        transactionHash: "0x0000001",
        loan: {
          __typename: "Loan",
          id: "0x3-1",
        },
        request: {
          __typename: "LoanRequest",
          id: "0x3-1",
        },
        clearinghouseDaiBalance: loanTwoClearinghouseDaiBalance,
        clearinghouseSDaiBalance: loanTwoClearinghouseSDaiBalance,
        clearinghouseSDaiInDaiBalance: loanTwoClearinghouseSDaiInDaiBalance,
        treasuryDaiBalance: loanTwoTreasuryDaiBalance,
        treasurySDaiBalance: loanTwoTreasurySDaiBalance,
        treasurySDaiInDaiBalance: loanTwoTreasurySDaiInDaiBalance,
        dt: "2023-08-02",
      },
    ];
    subgraphData.createdLoans["2023-08-02"] = {
      "0x3-1": loanTwo,
    };
    subgraphData.loanRequests["2023-08-02"] = {
      "0x3-1": {
        __typename: "LoanRequest",
        id: "0x3-1",
        createdBlock: 12223,
        createdTransaction: "0x0000001",
        createdTimestamp: 1690876800,
        cooler: "0x03",
        requestId: 1,
        borrower: "0x01",
        collateralToken: "0x04",
        debtToken: "0x05",
        interestPercentage: CLEARINGHOUSE_INTEREST_RATE,
        durationSeconds: CLEARINGHOUSE_DURATION_SECONDS,
        amount: loanTwoPrincipal,
        loanToCollateralRatio: CLEARINGHOUSE_LOAN_TO_COLLATERAL,
        isRescinded: false,
        requestEvents: [],
        rescindEvents: [],
        clearEvents: [],
        loans: [],
        dt: "2023-08-02",
      },
    };

    // Add a second default claim on the same day
    const loanTwoCollateralClaimed = loanTwoCollateral * COLLATERAL_PRICE;
    subgraphData.defaultedClaimEvents["2023-09-12"].push({
      __typename: "ClaimDefaultedLoanEvent",
      id: "0x3-1-1691654400",
      date: "2023-09-12",
      blockNumber: 1233455,
      blockTimestamp: 1691654400,
      transactionHash: "0x0000003",
      secondsSinceExpiry: 5000,
      collateralQuantityClaimed: loanTwoCollateral,
      collateralPrice: COLLATERAL_PRICE,
      collateralValueClaimed: loanTwoCollateralClaimed,
      loan: loanTwo,
      dt: "2023-09-12",
    });

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, previousLoanSnapshot, subgraphData);

    const collateralIncomeLoanOne = COLLATERAL_CLAIM_VALUE - LOAN_PRINCIPAL; // No principal repayments
    const collateralIncomeLoanTwo = loanTwoCollateralClaimed - loanTwoPrincipal; // No principal repayments
    const collateralIncome = collateralIncomeLoanOne + collateralIncomeLoanTwo;

    // Day of claim
    const snapshotDayOfExpiry = snapshots[42].snapshot;
    expect(snapshots[42].date.toISOString()).toEqual("2023-09-12T23:59:59.999Z");
    expect(snapshotDayOfExpiry.principalReceivables).toEqual(0); // Zero-ed out
    expect(snapshotDayOfExpiry.interestReceivables).toEqual(0); // Zero-ed out
    expect(snapshotDayOfExpiry.interestIncome).toEqual(0);
    expect(snapshotDayOfExpiry.collateralIncome).toEqual(collateralIncome);
    expect(snapshotDayOfExpiry.collateralDeposited).toEqual(0);
  });

  it("extend loan", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-03");
    const previousDateRecords: Snapshot | null = null;
    const previousLoanSnapshot: LoanSnapshotMap = {};
    const subgraphData = getSampleData();

    // Add extension on day 2
    const newPeriods = 2;
    const newInterest = newPeriods * getInterestForLoan(LOAN_PRINCIPAL);
    const newExpiryTimestamp = 99999999999;
    const newClearinghouseDaiBalance = 200;
    const newClearinghouseSDaiBalance = 200.1;
    const newClearinghouseSDaiInDaiBalance = 200.2;
    const newTreasuryDaiBalance = 220.1;
    const newTreasurySDaiBalance = 220.2;
    const newTreasurySDaiInDaiBalance = 220.3;
    subgraphData.extendEvents["2023-08-02"] = [
      {
        __typename: "ExtendLoanEvent",
        id: "0x3-0-1233456",
        date: "2023-08-02",
        blockNumber: 1233456,
        blockTimestamp: 1691654400,
        transactionHash: "0x0000002",
        periods: newPeriods,
        expiryTimestamp: newExpiryTimestamp,
        interestDue: LOAN_INTEREST, // Interest for the extension is paid at the time, and is not reflected here. This is residual interest from before the extension.
        loan: {
          __typename: "Loan",
          id: "0x3-0",
        },
        clearinghouseDaiBalance: newClearinghouseDaiBalance,
        clearinghouseSDaiBalance: newClearinghouseSDaiBalance,
        clearinghouseSDaiInDaiBalance: newClearinghouseSDaiInDaiBalance,
        treasuryDaiBalance: newTreasuryDaiBalance,
        treasurySDaiBalance: newTreasurySDaiBalance,
        treasurySDaiInDaiBalance: newTreasurySDaiInDaiBalance,
        dt: "2023-08-02",
      },
    ];

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, previousLoanSnapshot, subgraphData);

    // Day 2 should have the loan extended
    const snapshotTwo = snapshots[1].snapshot;
    expect(snapshots[1].date.toISOString()).toEqual("2023-08-02T23:59:59.999Z");
    expect(snapshotTwo.principalReceivables).toEqual(LOAN_PRINCIPAL);
    expect(snapshotTwo.interestReceivables).toEqual(LOAN_INTEREST); // Extension interest already paid
    expect(snapshotTwo.interestIncome).toEqual(newInterest); // Should reflect the interest paid for the extension
    expect(snapshotTwo.interestReceivables + snapshotTwo.interestIncome).toEqual(LOAN_INTEREST + newInterest); // Invariant

    expect(snapshotTwo.collateralIncome).toEqual(0);

    const snapshotTwoLoans = snapshots[1].loans;
    expect(Object.values(snapshotTwoLoans)).toHaveLength(1);
    const snapshotTwoLoanOne = snapshotTwoLoans[LOAN_ID];
    expect(snapshotTwoLoanOne.loanId).toEqual(0);
    expect(snapshotTwoLoanOne.createdTimestamp).toEqual(LOAN_CREATION_TIMESTAMP);
    expect(snapshotTwoLoanOne.borrowerAddress).toEqual("0x01");
    expect(snapshotTwoLoanOne.lenderAddress).toEqual(CLEARINGHOUSE_ADDRESS);
    expect(snapshotTwoLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotTwoLoanOne.interest).toEqual(LOAN_INTEREST + newInterest);
    expect(snapshotTwoLoanOne.collateralDeposited).toEqual(LOAN_INITIAL_COLLATERAL);
    expect(snapshotTwoLoanOne.expiryTimestamp).toEqual(newExpiryTimestamp);
    expect(snapshotTwoLoanOne.secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotTwo.snapshotDate, snapshotTwoLoanOne.expiryTimestamp),
    );
    expect(snapshotTwoLoanOne.status).toEqual("Active");

    expect(snapshotTwoLoanOne.principalPaid).toEqual(0);
    expect(snapshotTwoLoanOne.interestPaid).toEqual(newInterest); // Should reflect the interest paid for the extension

    expect(snapshotTwoLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotTwoLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotTwoLoanOne.collateralIncome).toEqual(0);

    // Clearinghouse and treasury balances should have the new balance from the extension event
    assertClearinghouseSnapshots(snapshotTwo, [
      {
        daiBalance: newClearinghouseDaiBalance,
        sDaiBalance: newClearinghouseSDaiBalance,
        sDaiInDaiBalance: newClearinghouseSDaiInDaiBalance,
      },
    ]);
    assertTreasurySnapshot(snapshotTwo, newTreasuryDaiBalance, newTreasurySDaiBalance, newTreasurySDaiInDaiBalance);
  });

  it("loan repayment then extension", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-13");
    const previousDateRecords: Snapshot | null = null;
    const previousLoanSnapshot: LoanSnapshotMap = {};
    const subgraphData = getSampleData();

    const interestDue = LOAN_INTEREST - REPAYMENT_AMOUNT;

    // Add extension on day 12
    const newPeriods = 2;
    const newInterest = newPeriods * getInterestForLoan(LOAN_PRINCIPAL);
    const newExpiryTimestamp = 99999999999;
    const newClearinghouseDaiBalance = 200;
    const newClearinghouseSDaiBalance = 200.1;
    const newClearinghouseSDaiInDaiBalance = 200.2;
    const newTreasuryDaiBalance = 220.1;
    const newTreasurySDaiBalance = 220.2;
    const newTreasurySDaiInDaiBalance = 220.3;
    subgraphData.extendEvents["2023-08-12"] = [
      {
        __typename: "ExtendLoanEvent",
        id: "0x3-0-1233456",
        date: "2023-08-12",
        blockNumber: 1233456,
        blockTimestamp: 1691654400,
        transactionHash: "0x0000002",
        periods: newPeriods,
        expiryTimestamp: newExpiryTimestamp,
        interestDue: interestDue, // Interest for the extension is paid at the time, and is not reflected here. This is residual interest from before the extension.
        loan: {
          __typename: "Loan",
          id: "0x3-0",
        },
        clearinghouseDaiBalance: newClearinghouseDaiBalance,
        clearinghouseSDaiBalance: newClearinghouseSDaiBalance,
        clearinghouseSDaiInDaiBalance: newClearinghouseSDaiInDaiBalance,
        treasuryDaiBalance: newTreasuryDaiBalance,
        treasurySDaiBalance: newTreasurySDaiBalance,
        treasurySDaiInDaiBalance: newTreasurySDaiInDaiBalance,
        dt: "2023-08-12",
      },
    ];

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, previousLoanSnapshot, subgraphData);

    expect(snapshots.length).toEqual(12);

    // Day 12 should have the loan extended
    const snapshotTwelve = snapshots[11].snapshot;
    expect(snapshots[11].date.toISOString()).toEqual("2023-08-12T23:59:59.999Z");
    expect(snapshotTwelve.principalReceivables).toEqual(LOAN_PRINCIPAL);
    expect(snapshotTwelve.interestReceivables).toEqual(interestDue); // Extension interest already paid

    expect(snapshotTwelve.interestIncome).toEqual(newInterest); // Should reflect the interest paid for the extension
    expect(snapshotTwelve.collateralIncome).toEqual(0);

    const snapshotTwelveLoans = snapshots[11].loans;
    expect(Object.values(snapshotTwelveLoans)).toHaveLength(1);
    const snapshotTwelveLoanOne = snapshotTwelveLoans[LOAN_ID];
    expect(snapshotTwelveLoanOne.loanId).toEqual(0);
    expect(snapshotTwelveLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotTwelveLoanOne.interest).toEqual(LOAN_INTEREST + newInterest);
    expect(snapshotTwelveLoanOne.collateralDeposited).toEqual(29);
    expect(snapshotTwelveLoanOne.expiryTimestamp).toEqual(newExpiryTimestamp);
    expect(snapshotTwelveLoanOne.secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotTwelve.snapshotDate, snapshotTwelveLoanOne.expiryTimestamp),
    );
    expect(snapshotTwelveLoanOne.status).toEqual("Active");
    expect(snapshotTwelveLoanOne.principalPaid).toEqual(0);
    expect(snapshotTwelveLoanOne.interestPaid).toEqual(REPAYMENT_AMOUNT + newInterest); // Should reflect the interest paid for the extension
    expect(snapshotTwelveLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotTwelveLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotTwelveLoanOne.collateralIncome).toEqual(0);

    assertExpiryBuckets(snapshotTwelve, LOAN_PRINCIPAL, 0, 0, 0);
  });

  it("loan repayment, extension, then repayment", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-14");
    const previousDateRecords: Snapshot | null = null;
    const previousLoanSnapshot: LoanSnapshotMap = {};
    const subgraphData = getSampleData();

    const repaymentOneInterestDueAfter = LOAN_INTEREST - REPAYMENT_AMOUNT;

    // Add extension on day 12
    const extensionOnePeriods = 2;
    const extensionOneAdditionalInterest = extensionOnePeriods * getInterestForLoan(LOAN_PRINCIPAL);
    const extensionOneExpiryTimestamp = 1699999000; // 2023-11-14
    const extensionOneClearinghouseDaiBalance = 200;
    const extensionOneClearinghouseSDaiBalance = 200.1;
    const extensionOneClearinghouseSDaiInDaiBalance = 200.2;
    const extensionOneTreasuryDaiBalance = 220.1;
    const extensionOneTreasurySDaiBalance = 220.2;
    const extensionOneTreasurySDaiInDaiBalance = 220.3;
    subgraphData.extendEvents["2023-08-12"] = [
      {
        __typename: "ExtendLoanEvent",
        id: "0x3-0-1233456",
        date: "2023-08-12",
        blockNumber: 1233456,
        blockTimestamp: 1691654400,
        transactionHash: "0x0000002",
        periods: extensionOnePeriods,
        expiryTimestamp: extensionOneExpiryTimestamp,
        interestDue: repaymentOneInterestDueAfter, // Interest for the extension is paid at the time, and is not reflected here. This is residual interest from before the extension.
        loan: {
          __typename: "Loan",
          id: "0x3-0",
        },
        clearinghouseDaiBalance: extensionOneClearinghouseDaiBalance,
        clearinghouseSDaiBalance: extensionOneClearinghouseSDaiBalance,
        clearinghouseSDaiInDaiBalance: extensionOneClearinghouseSDaiInDaiBalance,
        treasuryDaiBalance: extensionOneTreasuryDaiBalance,
        treasurySDaiBalance: extensionOneTreasurySDaiBalance,
        treasurySDaiInDaiBalance: extensionOneTreasurySDaiInDaiBalance,
        dt: "2023-08-12",
      },
    ];

    // Add repayment on day 13
    const repaymentTwoAmount = 1000;
    const repaymentTwoInterestPaid = repaymentOneInterestDueAfter;
    const repaymentTwoInterestDueAfter = repaymentOneInterestDueAfter - repaymentTwoInterestPaid;
    const repaymentTwoPrincipalPaid = repaymentTwoAmount - repaymentTwoInterestPaid;
    const repaymentTwoPrincipalDueAfter = LOAN_PRINCIPAL - repaymentTwoPrincipalPaid;
    const repaymentTwoClearinghouseDaiBalance = 200.3;
    const repaymentTwoClearinghouseSDaiBalance = 200.5;
    const repaymentTwoClearinghouseSDaiInDaiBalance = 200.6;
    const repaymentTwoTreasuryDaiBalance = 220.4;
    const repaymentTwoTreasurySDaiBalance = 220.5;
    const repaymentTwoTreasurySDaiInDaiBalance = 220.6;
    subgraphData.repaymentEvents["2023-08-13"] = [
      {
        __typename: "RepayLoanEvent",
        id: "0x3-0-1233456",
        date: "2023-08-13",
        blockNumber: 1233456,
        transactionHash: "0x0000002",
        principalPayable: repaymentTwoPrincipalDueAfter,
        interestPayable: repaymentTwoInterestDueAfter,
        blockTimestamp: 1691654400,
        secondsToExpiry: 1694332800 - 1691654400,
        amountPaid: repaymentTwoAmount,
        collateralDeposited: 20,
        loan: getLoanData(),
        clearinghouseDaiBalance: repaymentTwoClearinghouseDaiBalance,
        clearinghouseSDaiBalance: repaymentTwoClearinghouseSDaiBalance,
        clearinghouseSDaiInDaiBalance: repaymentTwoClearinghouseSDaiInDaiBalance,
        treasuryDaiBalance: repaymentTwoTreasuryDaiBalance,
        treasurySDaiBalance: repaymentTwoTreasurySDaiBalance,
        treasurySDaiInDaiBalance: repaymentTwoTreasurySDaiInDaiBalance,
        dt: "2023-08-13",
      },
    ];

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, previousLoanSnapshot, subgraphData);

    expect(snapshots.length).toEqual(13);

    // Day 13 should have the second payment
    const snapshotThirteen = snapshots[12].snapshot;
    expect(snapshots[12].date.toISOString()).toEqual("2023-08-13T23:59:59.999Z");
    expect(snapshotThirteen.principalReceivables).toEqual(repaymentTwoPrincipalDueAfter); // Updated from repayment
    expect(snapshotThirteen.interestReceivables).toEqual(repaymentTwoInterestDueAfter); // Updated from repayment

    expect(snapshotThirteen.interestIncome).toEqual(repaymentTwoInterestPaid); // Should reflect the interest paid for the repayment
    expect(snapshotThirteen.collateralIncome).toEqual(0);

    const snapshotThirteenLoans = snapshots[12].loans;
    expect(Object.values(snapshotThirteenLoans)).toHaveLength(1);
    const snapshotThirteenLoanOne = snapshotThirteenLoans[LOAN_ID];
    expect(snapshotThirteenLoanOne.loanId).toEqual(0);
    expect(snapshotThirteenLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotThirteenLoanOne.interest).toEqual(LOAN_INTEREST + extensionOneAdditionalInterest);
    expect(snapshotThirteenLoanOne.collateralDeposited).toEqual(20); // From repayment
    expect(snapshotThirteenLoanOne.expiryTimestamp).toEqual(extensionOneExpiryTimestamp);
    expect(snapshotThirteenLoanOne.secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotThirteen.snapshotDate, snapshotThirteenLoanOne.expiryTimestamp),
    );
    expect(snapshotThirteenLoanOne.status).toEqual("Active");
    expect(snapshotThirteenLoanOne.principalPaid).toEqual(repaymentTwoPrincipalPaid);
    expect(snapshotThirteenLoanOne.interestPaid).toEqual(
      REPAYMENT_AMOUNT + extensionOneAdditionalInterest + repaymentTwoInterestPaid,
    );
    expect(snapshotThirteenLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotThirteenLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotThirteenLoanOne.collateralIncome).toEqual(0);

    assertExpiryBuckets(snapshotThirteen, 0, 0, 0, repaymentTwoPrincipalDueAfter);
  });

  it("loan repayment then extension x2", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-15");
    const previousDateRecords: Snapshot | null = null;
    const previousLoanSnapshot: LoanSnapshotMap = {};
    const subgraphData = getSampleData();

    const repaymentOneInterestDueAfter = LOAN_INTEREST - REPAYMENT_AMOUNT;

    // Add extension on day 12
    const extensionOnePeriods = 2;
    const extensionOneAdditionalInterest = extensionOnePeriods * getInterestForLoan(LOAN_PRINCIPAL);
    const extensionOneExpiryTimestamp = 1691655000;
    const extensionOneClearinghouseDaiBalance = 200;
    const extensionOneClearinghouseSDaiBalance = 200.1;
    const extensionOneClearinghouseSDaiInDaiBalance = 200.2;
    const extensionOneTreasuryDaiBalance = 220.1;
    const extensionOneTreasurySDaiBalance = 220.2;
    const extensionOneTreasurySDaiInDaiBalance = 220.3;
    subgraphData.extendEvents["2023-08-12"] = [
      {
        __typename: "ExtendLoanEvent",
        id: "0x3-0-1233456",
        date: "2023-08-12",
        blockNumber: 1233456,
        blockTimestamp: 1691654400,
        transactionHash: "0x0000002",
        periods: extensionOnePeriods,
        expiryTimestamp: extensionOneExpiryTimestamp,
        interestDue: repaymentOneInterestDueAfter, // Interest for the extension is paid at the time, and is not reflected here. This is residual interest from before the extension.
        loan: {
          __typename: "Loan",
          id: "0x3-0",
        },
        clearinghouseDaiBalance: extensionOneClearinghouseDaiBalance,
        clearinghouseSDaiBalance: extensionOneClearinghouseSDaiBalance,
        clearinghouseSDaiInDaiBalance: extensionOneClearinghouseSDaiInDaiBalance,
        treasuryDaiBalance: extensionOneTreasuryDaiBalance,
        treasurySDaiBalance: extensionOneTreasurySDaiBalance,
        treasurySDaiInDaiBalance: extensionOneTreasurySDaiInDaiBalance,
        dt: "2023-08-12",
      },
    ];

    // Add repayment on day 13
    const repaymentTwoAmount = 1000;
    const repaymentTwoInterestPaid = repaymentOneInterestDueAfter;
    const repaymentTwoInterestDueAfter = repaymentOneInterestDueAfter - repaymentTwoInterestPaid;
    const repaymentTwoPrincipalPaid = repaymentTwoAmount - repaymentTwoInterestPaid;
    const repaymentTwoPrincipalDueAfter = LOAN_PRINCIPAL - repaymentTwoPrincipalPaid;
    const repaymentTwoClearinghouseDaiBalance = 200.3;
    const repaymentTwoClearinghouseSDaiBalance = 200.5;
    const repaymentTwoClearinghouseSDaiInDaiBalance = 200.6;
    const repaymentTwoTreasuryDaiBalance = 220.4;
    const repaymentTwoTreasurySDaiBalance = 220.5;
    const repaymentTwoTreasurySDaiInDaiBalance = 220.6;
    subgraphData.repaymentEvents["2023-08-13"] = [
      {
        __typename: "RepayLoanEvent",
        id: "0x3-0-1233456",
        date: "2023-08-13",
        blockNumber: 1233456,
        transactionHash: "0x0000002",
        principalPayable: repaymentTwoPrincipalDueAfter,
        interestPayable: repaymentTwoInterestDueAfter,
        blockTimestamp: 1691654400,
        secondsToExpiry: 1694332800 - 1691654400,
        amountPaid: repaymentTwoAmount,
        collateralDeposited: 20,
        loan: getLoanData(),
        clearinghouseDaiBalance: repaymentTwoClearinghouseDaiBalance,
        clearinghouseSDaiBalance: repaymentTwoClearinghouseSDaiBalance,
        clearinghouseSDaiInDaiBalance: repaymentTwoClearinghouseSDaiInDaiBalance,
        treasuryDaiBalance: repaymentTwoTreasuryDaiBalance,
        treasurySDaiBalance: repaymentTwoTreasurySDaiBalance,
        treasurySDaiInDaiBalance: repaymentTwoTreasurySDaiInDaiBalance,
        dt: "2023-08-13",
      },
    ];

    // Add extension on day 14
    const extensionTwoPeriods = 3;
    const extensionTwoAdditionalInterest = extensionTwoPeriods * getInterestForLoan(repaymentTwoPrincipalDueAfter);
    const extensionTwoExpiryTimestamp = 1699990000;
    const extensionTwoClearinghouseDaiBalance = 200.2;
    const extensionTwoClearinghouseSDaiBalance = 200.3;
    const extensionTwoClearinghouseSDaiInDaiBalance = 200.4;
    const extensionTwoTreasuryDaiBalance = 220.2;
    const extensionTwoTreasurySDaiBalance = 220.3;
    const extensionTwoTreasurySDaiInDaiBalance = 220.4;
    subgraphData.extendEvents["2023-08-14"] = [
      {
        __typename: "ExtendLoanEvent",
        id: "0x3-0-1233456",
        date: "2023-08-14",
        blockNumber: 1233456,
        blockTimestamp: 169099400,
        transactionHash: "0x0000002",
        periods: extensionTwoPeriods,
        expiryTimestamp: extensionTwoExpiryTimestamp,
        interestDue: extensionTwoAdditionalInterest, // Interest for the extension is paid at the time, and is not reflected here. This is residual interest from before the extension.
        loan: {
          __typename: "Loan",
          id: "0x3-0",
        },
        clearinghouseDaiBalance: extensionTwoClearinghouseDaiBalance,
        clearinghouseSDaiBalance: extensionTwoClearinghouseSDaiBalance,
        clearinghouseSDaiInDaiBalance: extensionTwoClearinghouseSDaiInDaiBalance,
        treasuryDaiBalance: extensionTwoTreasuryDaiBalance,
        treasurySDaiBalance: extensionTwoTreasurySDaiBalance,
        treasurySDaiInDaiBalance: extensionTwoTreasurySDaiInDaiBalance,
        dt: "2023-08-14",
      },
    ];

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, previousLoanSnapshot, subgraphData);

    expect(snapshots.length).toEqual(14);

    // Day 14 should have the loan extended the second time
    const snapshotFourteen = snapshots[13].snapshot;
    expect(snapshots[13].date.toISOString()).toEqual("2023-08-14T23:59:59.999Z");
    expect(snapshotFourteen.principalReceivables).toEqual(repaymentTwoPrincipalDueAfter); // Extension does not change the principal due
    expect(snapshotFourteen.interestReceivables).toEqual(repaymentTwoInterestDueAfter); // Extension interest already paid

    expect(snapshotFourteen.interestIncome).toEqual(extensionTwoAdditionalInterest); // Should reflect the interest paid for the extension
    expect(snapshotFourteen.collateralIncome).toEqual(0);

    const snapshotFourteenLoans = snapshots[13].loans;
    expect(Object.values(snapshotFourteenLoans)).toHaveLength(1);
    const snapshotFourteenLoanOne = snapshotFourteenLoans[LOAN_ID];
    expect(snapshotFourteenLoanOne.loanId).toEqual(0);
    expect(snapshotFourteenLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotFourteenLoanOne.interest).toEqual(
      LOAN_INTEREST + extensionOneAdditionalInterest + extensionTwoAdditionalInterest,
    );
    expect(snapshotFourteenLoanOne.collateralDeposited).toEqual(20); // From repayment
    expect(snapshotFourteenLoanOne.expiryTimestamp).toEqual(extensionTwoExpiryTimestamp);
    expect(snapshotFourteenLoanOne.secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotFourteen.snapshotDate, snapshotFourteenLoanOne.expiryTimestamp),
    );
    expect(snapshotFourteenLoanOne.status).toEqual("Active");
    expect(snapshotFourteenLoanOne.principalPaid).toEqual(repaymentTwoPrincipalPaid);
    expect(snapshotFourteenLoanOne.interestPaid).toEqual(
      REPAYMENT_AMOUNT + repaymentTwoInterestPaid + extensionOneAdditionalInterest + extensionTwoAdditionalInterest,
    ); // Should reflect the interest paid for the extension
    expect(snapshotFourteenLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotFourteenLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotFourteenLoanOne.collateralIncome).toEqual(0);

    assertExpiryBuckets(snapshotFourteen, 0, 0, 0, repaymentTwoPrincipalDueAfter);
  });

  it("loan extension then repayment, same day", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-13");
    const previousDateRecords: Snapshot | null = null;
    const previousLoanSnapshot: LoanSnapshotMap = {};
    const subgraphData = getSampleData();

    const repaymentOneInterestDueAfter = LOAN_INTEREST - REPAYMENT_AMOUNT;

    // Add extension on day 12
    const extensionOnePeriods = 2;
    const extensionOneAdditionalInterest = extensionOnePeriods * getInterestForLoan(LOAN_PRINCIPAL);
    const extensionOneExpiryTimestamp = 1699999000;
    const extensionOneClearinghouseDaiBalance = 200;
    const extensionOneClearinghouseSDaiBalance = 200.1;
    const extensionOneClearinghouseSDaiInDaiBalance = 200.2;
    const extensionOneTreasuryDaiBalance = 220.1;
    const extensionOneTreasurySDaiBalance = 220.2;
    const extensionOneTreasurySDaiInDaiBalance = 220.3;
    subgraphData.extendEvents["2023-08-12"] = [
      {
        __typename: "ExtendLoanEvent",
        id: "0x3-0-1233456",
        date: "2023-08-12",
        blockNumber: 1233456,
        blockTimestamp: 1691654400,
        transactionHash: "0x0000002",
        periods: extensionOnePeriods,
        expiryTimestamp: extensionOneExpiryTimestamp,
        interestDue: repaymentOneInterestDueAfter, // Interest for the extension is paid at the time, and is not reflected here. This is residual interest from before the extension.
        loan: {
          __typename: "Loan",
          id: "0x3-0",
        },
        clearinghouseDaiBalance: extensionOneClearinghouseDaiBalance,
        clearinghouseSDaiBalance: extensionOneClearinghouseSDaiBalance,
        clearinghouseSDaiInDaiBalance: extensionOneClearinghouseSDaiInDaiBalance,
        treasuryDaiBalance: extensionOneTreasuryDaiBalance,
        treasurySDaiBalance: extensionOneTreasurySDaiBalance,
        treasurySDaiInDaiBalance: extensionOneTreasurySDaiInDaiBalance,
        dt: "2023-08-12",
      },
    ];

    // Add repayment on day 12
    const repaymentTwoAmount = 1000;
    const repaymentTwoInterestPaid = repaymentOneInterestDueAfter;
    const repaymentTwoInterestDueAfter = repaymentOneInterestDueAfter - repaymentTwoInterestPaid;
    const repaymentTwoPrincipalPaid = repaymentTwoAmount - repaymentTwoInterestPaid;
    const repaymentTwoPrincipalDueAfter = LOAN_PRINCIPAL - repaymentTwoPrincipalPaid;
    const repaymentTwoClearinghouseDaiBalance = 200.3;
    const repaymentTwoClearinghouseSDaiBalance = 200.5;
    const repaymentTwoClearinghouseSDaiInDaiBalance = 200.6;
    const repaymentTwoTreasuryDaiBalance = 220.4;
    const repaymentTwoTreasurySDaiBalance = 220.5;
    const repaymentTwoTreasurySDaiInDaiBalance = 220.6;
    subgraphData.repaymentEvents["2023-08-12"] = [
      {
        __typename: "RepayLoanEvent",
        id: "0x3-0-1233456",
        date: "2023-08-12",
        blockNumber: 1233456,
        transactionHash: "0x0000002",
        principalPayable: repaymentTwoPrincipalDueAfter,
        interestPayable: repaymentTwoInterestDueAfter,
        blockTimestamp: 1691654401, // Just after the extension
        secondsToExpiry: 1694332800 - 1691654401,
        amountPaid: repaymentTwoAmount,
        collateralDeposited: 20,
        loan: getLoanData(),
        clearinghouseDaiBalance: repaymentTwoClearinghouseDaiBalance,
        clearinghouseSDaiBalance: repaymentTwoClearinghouseSDaiBalance,
        clearinghouseSDaiInDaiBalance: repaymentTwoClearinghouseSDaiInDaiBalance,
        treasuryDaiBalance: repaymentTwoTreasuryDaiBalance,
        treasurySDaiBalance: repaymentTwoTreasurySDaiBalance,
        treasurySDaiInDaiBalance: repaymentTwoTreasurySDaiInDaiBalance,
        dt: "2023-08-12",
      },
    ];

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, previousLoanSnapshot, subgraphData);

    expect(snapshots.length).toEqual(12);

    // Day 12 should have the second payment
    const snapshotTwelve = snapshots[11].snapshot;
    expect(snapshots[11].date.toISOString()).toEqual("2023-08-12T23:59:59.999Z");
    expect(snapshotTwelve.principalReceivables).toEqual(repaymentTwoPrincipalDueAfter); // Updated from repayment
    expect(snapshotTwelve.interestReceivables).toEqual(repaymentTwoInterestDueAfter); // Updated from repayment

    expect(snapshotTwelve.interestIncome).toEqual(repaymentTwoInterestPaid + extensionOneAdditionalInterest); // Should reflect the interest paid for the repayment and extension
    expect(snapshotTwelve.collateralIncome).toEqual(0);

    const snapshotTwelveLoans = snapshots[11].loans;
    expect(Object.values(snapshotTwelveLoans)).toHaveLength(1);
    const snapshotTwelveLoanOne = snapshotTwelveLoans[LOAN_ID];
    expect(snapshotTwelveLoanOne.loanId).toEqual(0);
    expect(snapshotTwelveLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotTwelveLoanOne.interest).toEqual(LOAN_INTEREST + extensionOneAdditionalInterest);
    expect(snapshotTwelveLoanOne.collateralDeposited).toEqual(20); // From repayment
    expect(snapshotTwelveLoanOne.expiryTimestamp).toEqual(extensionOneExpiryTimestamp);
    expect(snapshotTwelveLoanOne.secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotTwelve.snapshotDate, snapshotTwelveLoanOne.expiryTimestamp),
    );
    expect(snapshotTwelveLoanOne.status).toEqual("Active");
    expect(snapshotTwelveLoanOne.principalPaid).toEqual(repaymentTwoPrincipalPaid);
    expect(snapshotTwelveLoanOne.interestPaid).toEqual(
      REPAYMENT_AMOUNT + extensionOneAdditionalInterest + repaymentTwoInterestPaid,
    );
    expect(snapshotTwelveLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotTwelveLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotTwelveLoanOne.collateralIncome).toEqual(0);

    // Clearinghouse and treasury balances should have the new balance from the latest event in the day - repayment
    assertClearinghouseSnapshots(snapshotTwelve, [
      {
        daiBalance: repaymentTwoClearinghouseDaiBalance,
        sDaiBalance: repaymentTwoClearinghouseSDaiBalance,
        sDaiInDaiBalance: repaymentTwoClearinghouseSDaiInDaiBalance,
      },
    ]);
    assertTreasurySnapshot(
      snapshotTwelve,
      repaymentTwoTreasuryDaiBalance,
      repaymentTwoTreasurySDaiBalance,
      repaymentTwoTreasurySDaiInDaiBalance,
    );
  });

  it("loan repayment then extension, same day", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-13");
    const previousDateRecords: Snapshot | null = null;
    const previousLoanSnapshot: LoanSnapshotMap = {};
    const subgraphData = getSampleData();

    const repaymentOneInterestDueAfter = LOAN_INTEREST - REPAYMENT_AMOUNT;

    // Add repayment on day 12
    const repaymentTwoAmount = 1000;
    const repaymentTwoInterestPaid = repaymentOneInterestDueAfter;
    const repaymentTwoInterestDueAfter = repaymentOneInterestDueAfter - repaymentTwoInterestPaid;
    const repaymentTwoPrincipalPaid = repaymentTwoAmount - repaymentTwoInterestPaid;
    const repaymentTwoPrincipalDueAfter = LOAN_PRINCIPAL - repaymentTwoPrincipalPaid;
    const repaymentTwoClearinghouseDaiBalance = 200.3;
    const repaymentTwoClearinghouseSDaiBalance = 200.5;
    const repaymentTwoClearinghouseSDaiInDaiBalance = 200.6;
    const repaymentTwoTreasuryDaiBalance = 220.4;
    const repaymentTwoTreasurySDaiBalance = 220.5;
    const repaymentTwoTreasurySDaiInDaiBalance = 220.6;
    subgraphData.repaymentEvents["2023-08-12"] = [
      {
        __typename: "RepayLoanEvent",
        id: "0x3-0-1233456",
        date: "2023-08-12",
        blockNumber: 1233456,
        transactionHash: "0x0000002",
        principalPayable: repaymentTwoPrincipalDueAfter,
        interestPayable: repaymentTwoInterestDueAfter,
        blockTimestamp: 1691654400, // Just before the extension
        secondsToExpiry: 1694332800 - 1691654401,
        amountPaid: repaymentTwoAmount,
        collateralDeposited: 20,
        loan: getLoanData(),
        clearinghouseDaiBalance: repaymentTwoClearinghouseDaiBalance,
        clearinghouseSDaiBalance: repaymentTwoClearinghouseSDaiBalance,
        clearinghouseSDaiInDaiBalance: repaymentTwoClearinghouseSDaiInDaiBalance,
        treasuryDaiBalance: repaymentTwoTreasuryDaiBalance,
        treasurySDaiBalance: repaymentTwoTreasurySDaiBalance,
        treasurySDaiInDaiBalance: repaymentTwoTreasurySDaiInDaiBalance,
        dt: "2023-08-12",
      },
    ];

    // Add extension on day 12
    const extensionOnePeriods = 2;
    const extensionOneAdditionalInterest = extensionOnePeriods * getInterestForLoan(repaymentTwoPrincipalDueAfter);
    const extensionOneExpiryTimestamp = 1699999000;
    const extensionOneClearinghouseDaiBalance = 200;
    const extensionOneClearinghouseSDaiBalance = 200.1;
    const extensionOneClearinghouseSDaiInDaiBalance = 200.2;
    const extensionOneTreasuryDaiBalance = 220.1;
    const extensionOneTreasurySDaiBalance = 220.2;
    const extensionOneTreasurySDaiInDaiBalance = 220.3;
    subgraphData.extendEvents["2023-08-12"] = [
      {
        __typename: "ExtendLoanEvent",
        id: "0x3-0-1233456",
        date: "2023-08-12",
        blockNumber: 1233456,
        blockTimestamp: 1691654401,
        transactionHash: "0x0000002",
        periods: extensionOnePeriods,
        expiryTimestamp: extensionOneExpiryTimestamp,
        interestDue: repaymentOneInterestDueAfter, // Interest for the extension is paid at the time, and is not reflected here. This is residual interest from before the extension.
        loan: {
          __typename: "Loan",
          id: "0x3-0",
        },
        clearinghouseDaiBalance: extensionOneClearinghouseDaiBalance,
        clearinghouseSDaiBalance: extensionOneClearinghouseSDaiBalance,
        clearinghouseSDaiInDaiBalance: extensionOneClearinghouseSDaiInDaiBalance,
        treasuryDaiBalance: extensionOneTreasuryDaiBalance,
        treasurySDaiBalance: extensionOneTreasurySDaiBalance,
        treasurySDaiInDaiBalance: extensionOneTreasurySDaiInDaiBalance,
        dt: "2023-08-12",
      },
    ];

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, previousLoanSnapshot, subgraphData);

    expect(snapshots.length).toEqual(12);

    // Day 12 should have the second payment
    const snapshotTwelve = snapshots[11].snapshot;
    expect(snapshots[11].date.toISOString()).toEqual("2023-08-12T23:59:59.999Z");
    expect(snapshotTwelve.principalReceivables).toEqual(repaymentTwoPrincipalDueAfter); // Updated from repayment
    expect(snapshotTwelve.interestReceivables).toEqual(repaymentTwoInterestDueAfter); // Updated from repayment

    expect(snapshotTwelve.interestIncome).toEqual(repaymentTwoInterestPaid + extensionOneAdditionalInterest); // Should reflect the interest paid for the repayment and extension
    expect(snapshotTwelve.collateralIncome).toEqual(0);

    const snapshotTwelveLoans = snapshots[11].loans;
    expect(Object.values(snapshotTwelveLoans)).toHaveLength(1);
    const snapshotTwelveLoanOne = snapshotTwelveLoans[LOAN_ID];
    expect(snapshotTwelveLoanOne.loanId).toEqual(0);
    expect(snapshotTwelveLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotTwelveLoanOne.interest).toEqual(LOAN_INTEREST + extensionOneAdditionalInterest);
    expect(snapshotTwelveLoanOne.collateralDeposited).toEqual(20); // From repayment
    expect(snapshotTwelveLoanOne.expiryTimestamp).toEqual(extensionOneExpiryTimestamp);
    expect(snapshotTwelveLoanOne.secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotTwelve.snapshotDate, snapshotTwelveLoanOne.expiryTimestamp),
    );
    expect(snapshotTwelveLoanOne.status).toEqual("Active");
    expect(snapshotTwelveLoanOne.principalPaid).toEqual(repaymentTwoPrincipalPaid);
    expect(snapshotTwelveLoanOne.interestPaid).toEqual(
      REPAYMENT_AMOUNT + extensionOneAdditionalInterest + repaymentTwoInterestPaid,
    );
    expect(snapshotTwelveLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotTwelveLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotTwelveLoanOne.collateralIncome).toEqual(0);

    // Clearinghouse and treasury balances should have the new balance from the latest event in the day - extension
    assertClearinghouseSnapshots(snapshotTwelve, [
      {
        daiBalance: extensionOneClearinghouseDaiBalance,
        sDaiBalance: extensionOneClearinghouseSDaiBalance,
        sDaiInDaiBalance: extensionOneClearinghouseSDaiInDaiBalance,
      },
    ]);
    assertTreasurySnapshot(
      snapshotTwelve,
      extensionOneTreasuryDaiBalance,
      extensionOneTreasurySDaiBalance,
      extensionOneTreasurySDaiInDaiBalance,
    );
  });
});
