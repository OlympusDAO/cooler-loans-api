import { generateSnapshots, Snapshot } from "../snapshot";
import { CoolerLoanOptional, SubgraphData } from "../subgraph";

const LOAN_ID = "0x3-0";
const LOAN_PRINCIPAL = 99000;
const LOAN_INTEREST = 1000;
const LOAN_CREATION_TIMESTAMP = 1690876800;
const LOAN_INITIAL_COLLATERAL = 30;

const REPAYMENT_AMOUNT = 1000;

const COLLATERAL_CLAIM_QUANTITY = 29;
const COLLATERAL_PRICE = 1000;
const COLLATERAL_CLAIM_VALUE = 29000;

const CLEARINGHOUSE_DAI_BALANCE = 10000000.0;
const CLEARINGHOUSE_SDAI_BALANCE = 500000.0;
const CLEARINGHOUSE_SDAI_IN_DAI_BALANCE = 600000.01;

const TREASURY_DAI_BALANCE = 1000;
const TREASURY_SDAI_BALANCE = 1500;
const TREASURY_SDAI_IN_DAI_BALANCE = 1600;

const getLoanData = (): CoolerLoanOptional => {
  return {
    id: LOAN_ID,
    createdBlock: 12223,
    createdTransaction: "0x0000001",
    // 2023-08-01
    createdTimestamp: LOAN_CREATION_TIMESTAMP,
    loanId: 0,
    borrower: "0x01",
    lender: "0x02",
    cooler: "0x03",
    interest: LOAN_INTEREST,
    principal: LOAN_PRINCIPAL,
    collateral: LOAN_INITIAL_COLLATERAL,
    // 2023-09-10
    expiryTimestamp: 1694332800,
    collateralToken: "0x04",
    debtToken: "0x05",
    hasCallback: false,
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
const getSampleData = (): SubgraphData => {
  return {
    clearinghouseSnapshots: {
      "2023-08-01": [
        {
          id: "12223",
          date: "2023-08-01",
          blockNumber: 12223,
          blockTimestamp: 100000,
          clearinghouse: "0x00000",
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
        },
      ],
      "2023-08-20": [
        {
          id: "12255",
          date: "2023-08-20",
          blockNumber: 12255,
          blockTimestamp: 100000,
          clearinghouse: "0x00000",
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
        },
      ],
    },
    creationEvents: {
      "2023-08-01": [
        {
          id: "0x3-0",
          date: "2023-08-01",
          blockTimestamp: LOAN_CREATION_TIMESTAMP,
          blockNumber: 12223,
          transactionHash: "0x0000001",
          loan: getLoanData(),
        },
      ],
    },
    repaymentEvents: {
      "2023-08-10": [
        {
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
        },
      ],
    },
    defaultedClaimEvents: {
      "2023-09-12": [
        {
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
        },
      ],
    },
    extendEvents: {},
  };
};

const getSecondsToExpiry = (currentDate: Date, expiryTimestamp: number): number => {
  const expiryDate = new Date(expiryTimestamp * 1000);
  return Math.floor((expiryDate.getTime() - currentDate.getTime()) / 1000);
};

/**
 * Principal is calculated proportionally to the loan total.
 *
 * For example:
 *
 * Principal: 1000
 * Interest: 100
 * Total: 1100
 *
 * Total paid: 100
 *
 * Principal paid: 100 / 1100 * 1000 = 90.91
 *
 * When full payment is made:
 *
 * Principal paid: 1100 / 1100 * 1000 = 1000
 */
const getPrincipalPaid = (principal: number, interest: number, totalPaid: number): number => {
  return (totalPaid / (principal + interest)) * principal;
};

/**
 * Interest is calculated proportionally to the loan total.
 *
 * For example:
 *
 * Principal: 1000
 * Interest: 100
 * Total: 1100
 *
 * Total paid: 100
 *
 * Interest paid: 100 / 1100 * 100 = 9.09
 *
 * When full payment is made:
 *
 * Interest paid: 1100 / 1100 * 100 = 100
 */
const getInterestPaid = (principal: number, interest: number, totalPaid: number): number => {
  return (totalPaid / (principal + interest)) * interest;
};

describe("generateSnapshots", () => {
  it("generate up to beforeDate", () => {
    const startDate = new Date("2022-01-01");
    const beforeDate = new Date("2022-01-05");
    const previousDateRecords: Snapshot | null = null;
    const subgraphData: SubgraphData = {
      clearinghouseSnapshots: {},
      creationEvents: {},
      defaultedClaimEvents: {},
      repaymentEvents: {},
      extendEvents: {},
    };

    const result = generateSnapshots(startDate, beforeDate, previousDateRecords, subgraphData);

    // Generates snapshots for each day, before but not including the beforeDate
    expect(result.length).toEqual(4);
  });

  it("should return empty records if no subgraphData is provided", () => {
    const startDate = new Date("2022-01-01");
    const beforeDate = new Date("2022-02-01");
    const previousDateRecords: Snapshot | null = null;
    const subgraphData: SubgraphData = {
      clearinghouseSnapshots: {},
      creationEvents: {},
      defaultedClaimEvents: {},
      repaymentEvents: {},
      extendEvents: {},
    };

    const result = generateSnapshots(startDate, beforeDate, previousDateRecords, subgraphData);

    const resultOne = result[0];
    expect(resultOne.date.toISOString()).toEqual("2022-01-01T23:59:59.999Z");
    expect(resultOne.principalReceivables).toEqual(0);
    expect(resultOne.interestReceivables).toEqual(0);
    expect(resultOne.clearinghouse.daiBalance).toEqual(0);
    expect(resultOne.clearinghouse.sDaiBalance).toEqual(0);
    expect(resultOne.clearinghouse.sDaiInDaiBalance).toEqual(0);
    expect(resultOne.treasury.daiBalance).toEqual(0);
    expect(resultOne.treasury.sDaiBalance).toEqual(0);
    expect(resultOne.treasury.sDaiInDaiBalance).toEqual(0);
    expect(Object.values(resultOne.loans)).toHaveLength(0);
    expect(resultOne.creationEvents).toHaveLength(0);
    expect(resultOne.defaultedClaimEvents).toHaveLength(0);
    expect(resultOne.repaymentEvents).toHaveLength(0);
    expect(resultOne.extendEvents).toHaveLength(0);
    expect(resultOne.clearinghouseEvents).toHaveLength(0);

    expect(result.length).toEqual(31);
  });

  it("loan creation", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-03");
    const previousDateRecords: Snapshot | null = null;
    const subgraphData = getSampleData();

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, subgraphData);

    expect(snapshots.length).toEqual(2);

    // Day 1 should have the correct values
    const snapshotOne = snapshots[0];
    expect(snapshotOne.date.toISOString()).toEqual("2023-08-01T23:59:59.999Z");
    expect(snapshotOne.principalReceivables).toEqual(LOAN_PRINCIPAL);
    expect(snapshotOne.interestReceivables).toEqual(LOAN_INTEREST);

    expect(Object.values(snapshotOne.loans)).toHaveLength(1);
    const snapshotOneLoanOne = snapshotOne.loans[LOAN_ID];
    expect(snapshotOneLoanOne.loanId).toEqual(0);
    expect(snapshotOneLoanOne.createdTimestamp).toEqual(LOAN_CREATION_TIMESTAMP);
    expect(snapshotOneLoanOne.borrowerAddress).toEqual("0x01");
    expect(snapshotOneLoanOne.lenderAddress).toEqual("0x02");
    expect(snapshotOneLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotOneLoanOne.interest).toEqual(LOAN_INTEREST);
    expect(snapshotOneLoanOne.collateralDeposited).toEqual(LOAN_INITIAL_COLLATERAL);
    expect(snapshotOneLoanOne.expiryTimestamp).toEqual(1694332800);
    expect(snapshotOneLoanOne.secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotOne.date, snapshotOneLoanOne.expiryTimestamp),
    );
    expect(snapshotOneLoanOne.status).toEqual("Active");
    expect(snapshotOneLoanOne.principalPaid).toEqual(0);
    expect(snapshotOneLoanOne.interestPaid).toEqual(0);
    expect(snapshotOneLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotOneLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotOneLoanOne.collateralIncome).toEqual(0);
    expect(snapshotOne.creationEvents.length).toEqual(1);
    expect(snapshotOne.repaymentEvents.length).toEqual(0);
    expect(snapshotOne.defaultedClaimEvents.length).toEqual(0);
    expect(snapshotOne.extendEvents.length).toEqual(0);
    expect(snapshotOne.clearinghouseEvents.length).toEqual(1);

    const snapshotTwo = snapshots[1];
    expect(snapshotTwo.date.toISOString()).toEqual("2023-08-02T23:59:59.999Z");
    expect(snapshotTwo.principalReceivables).toEqual(LOAN_PRINCIPAL);
    expect(snapshotTwo.interestReceivables).toEqual(LOAN_INTEREST);

    expect(Object.values(snapshotTwo.loans)).toHaveLength(1);
    const snapshotTwoLoanOne = snapshotTwo.loans[LOAN_ID];
    expect(snapshotTwoLoanOne.loanId).toEqual(0);
    expect(snapshotTwoLoanOne.createdTimestamp).toEqual(LOAN_CREATION_TIMESTAMP);
    expect(snapshotTwoLoanOne.borrowerAddress).toEqual("0x01");
    expect(snapshotTwoLoanOne.lenderAddress).toEqual("0x02");
    expect(snapshotTwoLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotTwoLoanOne.interest).toEqual(LOAN_INTEREST);
    expect(snapshotTwoLoanOne.collateralDeposited).toEqual(LOAN_INITIAL_COLLATERAL);
    expect(snapshotTwoLoanOne.expiryTimestamp).toEqual(1694332800);
    expect(snapshotTwoLoanOne.secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotTwo.date, snapshotTwoLoanOne.expiryTimestamp),
    );
    expect(snapshotTwoLoanOne.status).toEqual("Active");
    expect(snapshotTwoLoanOne.principalPaid).toEqual(0);
    expect(snapshotTwoLoanOne.interestPaid).toEqual(0);
    expect(snapshotTwoLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotTwoLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotTwoLoanOne.collateralIncome).toEqual(0);
    expect(snapshotTwo.creationEvents.length).toEqual(0);
    expect(snapshotTwo.repaymentEvents.length).toEqual(0);
    expect(snapshotTwo.defaultedClaimEvents.length).toEqual(0);
    expect(snapshotTwo.extendEvents.length).toEqual(0);
    expect(snapshotTwo.clearinghouseEvents.length).toEqual(0);
  });

  it("multiple loans", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-03");
    const previousDateRecords: Snapshot | null = null;
    const subgraphData = getSampleData();

    // Add a second loan
    const loanTwoPrincipal = 10000;
    const loanTwoInterest = 500;
    subgraphData.creationEvents["2023-08-02"] = [
      {
        id: "0x3-1",
        date: "2023-08-02",
        blockTimestamp: 1690876800,
        blockNumber: 12223,
        transactionHash: "0x0000001",
        loan: {
          id: "0x3-1",
          createdBlock: 12223,
          createdTransaction: "0x0000001",
          // 2023-08-02
          createdTimestamp: 1690876800,
          loanId: 1,
          borrower: "0x01",
          lender: "0x02",
          cooler: "0x03",
          interest: loanTwoInterest,
          principal: loanTwoPrincipal,
          collateral: 30,
          // 2023-09-11
          expiryTimestamp: 1694246400,
          collateralToken: "0x04",
          debtToken: "0x05",
          hasCallback: false,
        },
      },
    ];

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, subgraphData);

    const snapshotTwo = snapshots[1];

    expect(snapshotTwo.date.toISOString()).toEqual("2023-08-02T23:59:59.999Z");
    expect(snapshotTwo.principalReceivables).toEqual(LOAN_PRINCIPAL + loanTwoPrincipal);
    expect(snapshotTwo.interestReceivables).toEqual(LOAN_INTEREST + loanTwoInterest);

    // Should have 2 loans
    expect(Object.values(snapshotTwo.loans)).toHaveLength(2);

    // Loan 1
    const snapshotTwoLoanOne = snapshotTwo.loans[LOAN_ID];
    expect(snapshotTwoLoanOne.id).toEqual(LOAN_ID);

    // Loan 2
    const snapshotTwoLoanTwo = snapshotTwo.loans["0x3-1"];
    expect(snapshotTwoLoanTwo.id).toEqual("0x3-1");
  });

  it("loan repayment", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-12");
    const previousDateRecords: Snapshot | null = null;
    const subgraphData = getSampleData();

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, subgraphData);

    expect(snapshots.length).toEqual(11);

    // Day 10 should include the repayment
    const snapshotTen = snapshots[9];
    expect(snapshotTen.date.toISOString()).toEqual("2023-08-10T23:59:59.999Z");
    expect(snapshotTen.principalReceivables).toEqual(
      LOAN_PRINCIPAL - getPrincipalPaid(LOAN_PRINCIPAL, LOAN_INTEREST, REPAYMENT_AMOUNT),
    );
    expect(snapshotTen.interestReceivables).toEqual(
      LOAN_INTEREST - getInterestPaid(LOAN_PRINCIPAL, LOAN_INTEREST, REPAYMENT_AMOUNT),
    );

    expect(Object.values(snapshotTen.loans)).toHaveLength(1);
    const snapshotTenLoanOne = snapshotTen.loans[LOAN_ID];
    expect(snapshotTenLoanOne.loanId).toEqual(0);
    expect(snapshotTenLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotTenLoanOne.interest).toEqual(LOAN_INTEREST);
    expect(snapshotTenLoanOne.collateralDeposited).toEqual(29);
    expect(snapshotTenLoanOne.expiryTimestamp).toEqual(1694332800);
    expect(snapshotTenLoanOne.secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotTen.date, snapshotTenLoanOne.expiryTimestamp),
    );
    expect(snapshotTenLoanOne.status).toEqual("Active");

    expect(snapshotTenLoanOne.principalPaid).toEqual(getPrincipalPaid(LOAN_PRINCIPAL, LOAN_INTEREST, REPAYMENT_AMOUNT));
    expect(snapshotTenLoanOne.interestPaid).toEqual(getInterestPaid(LOAN_PRINCIPAL, LOAN_INTEREST, REPAYMENT_AMOUNT));
    expect(snapshotTenLoanOne.principalPaid + snapshotTenLoanOne.interestPaid).toEqual(REPAYMENT_AMOUNT);

    expect(snapshotTenLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotTenLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotTenLoanOne.collateralIncome).toEqual(0);
    expect(snapshotTen.creationEvents.length).toEqual(0);
    expect(snapshotTen.repaymentEvents.length).toEqual(1);
    expect(snapshotTen.defaultedClaimEvents.length).toEqual(0);
    expect(snapshotTen.extendEvents.length).toEqual(0);
    expect(snapshotTen.clearinghouseEvents.length).toEqual(0);

    // Day after should be the same
    const snapshotEleven = snapshots[10];
    expect(snapshotEleven.date.toISOString()).toEqual("2023-08-11T23:59:59.999Z");
    expect(snapshotTen.principalReceivables).toEqual(
      LOAN_PRINCIPAL - getPrincipalPaid(LOAN_PRINCIPAL, LOAN_INTEREST, REPAYMENT_AMOUNT),
    );
    expect(snapshotTen.interestReceivables).toEqual(
      LOAN_INTEREST - getInterestPaid(LOAN_PRINCIPAL, LOAN_INTEREST, REPAYMENT_AMOUNT),
    );

    expect(Object.values(snapshotEleven.loans)).toHaveLength(1);
    const snapshotElevenLoanOne = snapshotEleven.loans[LOAN_ID];
    expect(snapshotElevenLoanOne.loanId).toEqual(0);
    expect(snapshotElevenLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotElevenLoanOne.interest).toEqual(LOAN_INTEREST);
    expect(snapshotElevenLoanOne.collateralDeposited).toEqual(29);
    expect(snapshotElevenLoanOne.expiryTimestamp).toEqual(1694332800);
    expect(snapshotElevenLoanOne.secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotEleven.date, snapshotElevenLoanOne.expiryTimestamp),
    );
    expect(snapshotElevenLoanOne.status).toEqual("Active");
    expect(snapshotTenLoanOne.principalPaid).toEqual(getPrincipalPaid(LOAN_PRINCIPAL, LOAN_INTEREST, REPAYMENT_AMOUNT));
    expect(snapshotTenLoanOne.interestPaid).toEqual(getInterestPaid(LOAN_PRINCIPAL, LOAN_INTEREST, REPAYMENT_AMOUNT));
    expect(snapshotElevenLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotElevenLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotElevenLoanOne.collateralIncome).toEqual(0);
    expect(snapshotEleven.creationEvents.length).toEqual(0);
    expect(snapshotEleven.repaymentEvents.length).toEqual(0);
    expect(snapshotEleven.defaultedClaimEvents.length).toEqual(0);
    expect(snapshotEleven.extendEvents.length).toEqual(0);
    expect(snapshotEleven.clearinghouseEvents.length).toEqual(0);
  });

  it("loan full repayment", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-13"); // Includes the remaining repayment, but not expiry
    const previousDateRecords: Snapshot | null = null;
    const repaymentAmountTwo = LOAN_PRINCIPAL + LOAN_INTEREST - REPAYMENT_AMOUNT;

    const subgraphData = getSampleData();
    subgraphData.repaymentEvents["2023-08-12"] = [
      {
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
      },
    ];

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, subgraphData);

    expect(snapshots.length).toEqual(12);

    // Day 12 should include the full repayment
    const snapshotTwelve = snapshots[11];
    expect(snapshotTwelve.date.toISOString()).toEqual("2023-08-12T23:59:59.999Z");
    expect(snapshotTwelve.principalReceivables).toEqual(0);
    expect(snapshotTwelve.interestReceivables).toEqual(0);

    expect(Object.values(snapshotTwelve.loans)).toHaveLength(1);
    const snapshotTenLoanOne = snapshotTwelve.loans[LOAN_ID];
    expect(snapshotTenLoanOne.loanId).toEqual(0);
    expect(snapshotTenLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotTenLoanOne.interest).toEqual(LOAN_INTEREST);
    expect(snapshotTenLoanOne.collateralDeposited).toEqual(0); // Returned to borrower
    expect(snapshotTenLoanOne.expiryTimestamp).toEqual(1694332800);
    expect(snapshotTenLoanOne.secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotTwelve.date, snapshotTenLoanOne.expiryTimestamp),
    );

    expect(snapshotTenLoanOne.principalPaid).toEqual(LOAN_PRINCIPAL);
    expect(snapshotTenLoanOne.interestPaid).toEqual(LOAN_INTEREST);
    expect(snapshotTenLoanOne.principalPaid + snapshotTenLoanOne.interestPaid).toEqual(
      REPAYMENT_AMOUNT + repaymentAmountTwo,
    );

    expect(snapshotTenLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotTenLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotTenLoanOne.collateralIncome).toEqual(0);
    expect(snapshotTenLoanOne.status).toEqual("Repaid");
    expect(snapshotTwelve.creationEvents.length).toEqual(0);
    expect(snapshotTwelve.repaymentEvents.length).toEqual(1);
    expect(snapshotTwelve.defaultedClaimEvents.length).toEqual(0);
    expect(snapshotTwelve.extendEvents.length).toEqual(0);
    expect(snapshotTwelve.clearinghouseEvents.length).toEqual(0);
  });

  it("clearinghouse balances", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-22");
    const previousDateRecords: Snapshot | null = null;
    const subgraphData = getSampleData();

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, subgraphData);

    expect(snapshots.length).toEqual(21);

    // Day 1 should have clearinghouse balances
    const snapshotOne = snapshots[0];
    expect(snapshotOne.date.toISOString()).toEqual("2023-08-01T23:59:59.999Z");
    expect(snapshotOne.principalReceivables).toEqual(LOAN_PRINCIPAL);
    expect(snapshotOne.interestReceivables).toEqual(LOAN_INTEREST);
    expect(snapshotOne.clearinghouse.daiBalance).toEqual(CLEARINGHOUSE_DAI_BALANCE);
    expect(snapshotOne.clearinghouse.sDaiBalance).toEqual(CLEARINGHOUSE_SDAI_BALANCE);
    expect(snapshotOne.clearinghouse.sDaiInDaiBalance).toEqual(CLEARINGHOUSE_SDAI_IN_DAI_BALANCE);
    expect(snapshotOne.treasury.daiBalance).toEqual(TREASURY_DAI_BALANCE);
    expect(snapshotOne.treasury.sDaiBalance).toEqual(TREASURY_SDAI_BALANCE);
    expect(snapshotOne.treasury.sDaiInDaiBalance).toEqual(TREASURY_SDAI_IN_DAI_BALANCE);

    // Day 20 should have the adjusted clearinghouse balances
    const snapshotTwenty = snapshots[19];
    expect(snapshotTwenty.date.toISOString()).toEqual("2023-08-20T23:59:59.999Z");
    expect(snapshotTwenty.principalReceivables).toEqual(
      LOAN_PRINCIPAL - getPrincipalPaid(LOAN_PRINCIPAL, LOAN_INTEREST, REPAYMENT_AMOUNT),
    ); // Ignores the clearinghouse snapshot
    expect(snapshotTwenty.interestReceivables).toEqual(
      LOAN_INTEREST - getInterestPaid(LOAN_PRINCIPAL, LOAN_INTEREST, REPAYMENT_AMOUNT),
    ); // Ignores the clearinghouse snapshot

    expect(snapshotTwenty.clearinghouse.daiBalance).toEqual(9000000.0);
    expect(snapshotTwenty.clearinghouse.sDaiBalance).toEqual(500000.0);
    expect(snapshotTwenty.clearinghouse.sDaiInDaiBalance).toEqual(600000.01);

    expect(snapshotTwenty.treasury.daiBalance).toEqual(1100);
    expect(snapshotTwenty.treasury.sDaiBalance).toEqual(1700);
    expect(snapshotTwenty.treasury.sDaiInDaiBalance).toEqual(1800);

    expect(snapshotTwenty.creationEvents.length).toEqual(0);
    expect(snapshotTwenty.repaymentEvents.length).toEqual(0);
    expect(snapshotTwenty.defaultedClaimEvents.length).toEqual(0);
    expect(snapshotTwenty.extendEvents.length).toEqual(0);
    expect(snapshotTwenty.clearinghouseEvents.length).toEqual(1);

    // Day 21 should carry on balances
    const snapshotTwentyOne = snapshots[20];
    expect(snapshotTwentyOne.date.toISOString()).toEqual("2023-08-21T23:59:59.999Z");
    expect(snapshotTwentyOne.principalReceivables).toEqual(
      LOAN_PRINCIPAL - getPrincipalPaid(LOAN_PRINCIPAL, LOAN_INTEREST, REPAYMENT_AMOUNT),
    ); // Ignores the clearinghouse snapshot
    expect(snapshotTwentyOne.interestReceivables).toEqual(
      LOAN_INTEREST - getInterestPaid(LOAN_PRINCIPAL, LOAN_INTEREST, REPAYMENT_AMOUNT),
    ); // Ignores the clearinghouse snapshot

    expect(snapshotTwentyOne.clearinghouse.daiBalance).toEqual(9000000.0);
    expect(snapshotTwentyOne.clearinghouse.sDaiBalance).toEqual(500000.0);
    expect(snapshotTwentyOne.clearinghouse.sDaiInDaiBalance).toEqual(600000.01);

    expect(snapshotTwentyOne.treasury.daiBalance).toEqual(1100);
    expect(snapshotTwentyOne.treasury.sDaiBalance).toEqual(1700);
    expect(snapshotTwentyOne.treasury.sDaiInDaiBalance).toEqual(1800);

    expect(snapshotTwentyOne.creationEvents.length).toEqual(0);
    expect(snapshotTwentyOne.repaymentEvents.length).toEqual(0);
    expect(snapshotTwentyOne.defaultedClaimEvents.length).toEqual(0);
    expect(snapshotTwentyOne.extendEvents.length).toEqual(0);
    expect(snapshotTwentyOne.clearinghouseEvents.length).toEqual(0);
  });

  it("should use the previous day records", () => {
    const previousDateSnapshot: Snapshot = {
      date: new Date("2023-08-01"),
      principalReceivables: 55555,
      interestReceivables: 6666,
      clearinghouse: {
        daiBalance: 12345,
        sDaiBalance: 56789,
        sDaiInDaiBalance: 101010,
      },
      treasury: {
        daiBalance: 111111,
        sDaiBalance: 3333,
        sDaiInDaiBalance: 4444,
      },
      loans: {
        [LOAN_ID]: {
          id: LOAN_ID,
          loanId: 0,
          createdTimestamp: LOAN_CREATION_TIMESTAMP,
          borrowerAddress: "0x01",
          lenderAddress: "0x02",
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
        },
      },
      creationEvents: [],
      defaultedClaimEvents: [],
      repaymentEvents: [],
      extendEvents: [],
      clearinghouseEvents: [],
    };

    const startDate = new Date("2023-08-02");
    const beforeDate = new Date("2023-08-03");
    const subgraphData = {
      clearinghouseSnapshots: {},
      creationEvents: {},
      defaultedClaimEvents: {},
      repaymentEvents: {},
      extendEvents: {},
    };

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateSnapshot, subgraphData);

    // Should generate records based on the existing snapshots
    expect(snapshots.length).toEqual(1);
    const snapshotOne = snapshots[0];
    expect(snapshotOne.date.toISOString()).toEqual("2023-08-02T23:59:59.999Z");
    expect(snapshotOne.principalReceivables).toEqual(55555); // Uses previous snapshot
    expect(snapshotOne.interestReceivables).toEqual(6666); // Uses previous snapshot

    expect(snapshotOne.clearinghouse.daiBalance).toEqual(12345); // Uses previous snapshot
    expect(snapshotOne.clearinghouse.sDaiBalance).toEqual(56789); // Uses previous snapshot
    expect(snapshotOne.clearinghouse.sDaiInDaiBalance).toEqual(101010); // Uses previous snapshot
    expect(snapshotOne.treasury.daiBalance).toEqual(111111); // Uses previous snapshot
    expect(snapshotOne.treasury.sDaiBalance).toEqual(3333); // Uses previous snapshot
    expect(snapshotOne.treasury.sDaiInDaiBalance).toEqual(4444); // Uses previous snapshot

    expect(Object.values(snapshotOne.loans)).toHaveLength(1);
    const snapshotOneLoanOne = snapshotOne.loans[LOAN_ID];
    expect(snapshotOneLoanOne.loanId).toEqual(0);
    expect(snapshotOneLoanOne.createdTimestamp).toEqual(LOAN_CREATION_TIMESTAMP);
    expect(snapshotOneLoanOne.borrowerAddress).toEqual("0x01");
    expect(snapshotOneLoanOne.lenderAddress).toEqual("0x02");
    expect(snapshotOneLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotOneLoanOne.interest).toEqual(LOAN_INTEREST);
    expect(snapshotOneLoanOne.collateralDeposited).toEqual(LOAN_INITIAL_COLLATERAL);
    expect(snapshotOneLoanOne.expiryTimestamp).toEqual(1694332800);
    expect(snapshotOneLoanOne.secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotOne.date, snapshotOneLoanOne.expiryTimestamp),
    );
    expect(snapshotOneLoanOne.status).toEqual("Active");
    expect(snapshotOneLoanOne.principalPaid).toEqual(999); // Uses previous snapshot
    expect(snapshotOneLoanOne.interestPaid).toEqual(22); // Uses previous snapshot
    expect(snapshotOneLoanOne.collateralIncome).toEqual(0);
    expect(snapshotOneLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotOneLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotOne.creationEvents.length).toEqual(0);
    expect(snapshotOne.repaymentEvents.length).toEqual(0);
    expect(snapshotOne.defaultedClaimEvents.length).toEqual(0);
    expect(snapshotOne.extendEvents.length).toEqual(0);
    expect(snapshotOne.clearinghouseEvents.length).toEqual(0);
  });

  it("loan expiry", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-09-12"); // includes 1 day after expiry
    const previousDateRecords: Snapshot | null = null;
    const subgraphData = getSampleData();

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, subgraphData);

    expect(snapshots.length).toEqual(42); // 31 + 11

    // Day of expiry
    const snapshotDayOfExpiry = snapshots[40];
    expect(snapshotDayOfExpiry.date.toISOString()).toEqual("2023-09-10T23:59:59.999Z");
    expect(snapshotDayOfExpiry.principalReceivables).toEqual(
      LOAN_PRINCIPAL - getPrincipalPaid(LOAN_PRINCIPAL, LOAN_INTEREST, REPAYMENT_AMOUNT),
    );
    expect(snapshotDayOfExpiry.interestReceivables).toEqual(
      LOAN_INTEREST - getInterestPaid(LOAN_PRINCIPAL, LOAN_INTEREST, REPAYMENT_AMOUNT),
    );
    expect(Object.values(snapshotDayOfExpiry.loans)).toHaveLength(1);
    const snapshotDayOfExpiryLoanOne = snapshotDayOfExpiry.loans[LOAN_ID];
    expect(snapshotDayOfExpiryLoanOne.loanId).toEqual(0);
    expect(snapshotDayOfExpiryLoanOne.createdTimestamp).toEqual(LOAN_CREATION_TIMESTAMP);
    expect(snapshotDayOfExpiryLoanOne.borrowerAddress).toEqual("0x01");
    expect(snapshotDayOfExpiryLoanOne.lenderAddress).toEqual("0x02");
    expect(snapshotDayOfExpiryLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotDayOfExpiryLoanOne.interest).toEqual(LOAN_INTEREST);
    expect(snapshotDayOfExpiryLoanOne.collateralDeposited).toEqual(29);
    expect(snapshotDayOfExpiryLoanOne.expiryTimestamp).toEqual(1694332800);
    expect(snapshotDayOfExpiryLoanOne.secondsToExpiry).toEqual(0);
    expect(snapshotDayOfExpiryLoanOne.status).toEqual("Expired");
    expect(snapshotDayOfExpiryLoanOne.principalPaid).toEqual(
      getPrincipalPaid(LOAN_PRINCIPAL, LOAN_INTEREST, REPAYMENT_AMOUNT),
    );
    expect(snapshotDayOfExpiryLoanOne.interestPaid).toEqual(
      getInterestPaid(LOAN_PRINCIPAL, LOAN_INTEREST, REPAYMENT_AMOUNT),
    );

    expect(snapshotDayOfExpiryLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotDayOfExpiryLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotDayOfExpiryLoanOne.collateralIncome).toEqual(0);

    expect(snapshotDayOfExpiry.creationEvents.length).toEqual(0);
    expect(snapshotDayOfExpiry.repaymentEvents.length).toEqual(0);
    expect(snapshotDayOfExpiry.defaultedClaimEvents.length).toEqual(0);
    expect(snapshotDayOfExpiry.extendEvents.length).toEqual(0);
    expect(snapshotDayOfExpiry.clearinghouseEvents.length).toEqual(0);

    // Same for the next day
    const snapshotDayAfterExpiry = snapshots[41];
    expect(snapshotDayAfterExpiry.date.toISOString()).toEqual("2023-09-11T23:59:59.999Z");
    expect(Object.values(snapshotDayAfterExpiry.loans)).toHaveLength(1);
    const snapshotDayAfterExpiryLoanOne = snapshotDayAfterExpiry.loans[LOAN_ID];
    expect(snapshotDayAfterExpiryLoanOne.loanId).toEqual(0);
    expect(snapshotDayAfterExpiryLoanOne.createdTimestamp).toEqual(LOAN_CREATION_TIMESTAMP);
    expect(snapshotDayAfterExpiryLoanOne.borrowerAddress).toEqual("0x01");
    expect(snapshotDayAfterExpiryLoanOne.lenderAddress).toEqual("0x02");
    expect(snapshotDayAfterExpiryLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotDayAfterExpiryLoanOne.interest).toEqual(LOAN_INTEREST);
    expect(snapshotDayAfterExpiryLoanOne.collateralDeposited).toEqual(29);
    expect(snapshotDayAfterExpiryLoanOne.expiryTimestamp).toEqual(1694332800);
    expect(snapshotDayAfterExpiryLoanOne.secondsToExpiry).toEqual(0);
    expect(snapshotDayAfterExpiryLoanOne.status).toEqual("Expired");
    expect(snapshotDayAfterExpiryLoanOne.principalPaid).toEqual(
      getPrincipalPaid(LOAN_PRINCIPAL, LOAN_INTEREST, REPAYMENT_AMOUNT),
    );
    expect(snapshotDayAfterExpiryLoanOne.interestPaid).toEqual(
      getInterestPaid(LOAN_PRINCIPAL, LOAN_INTEREST, REPAYMENT_AMOUNT),
    );
    expect(snapshotDayAfterExpiryLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotDayAfterExpiryLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotDayAfterExpiryLoanOne.collateralIncome).toEqual(0);
    expect(snapshotDayAfterExpiry.creationEvents.length).toEqual(0);
    expect(snapshotDayAfterExpiry.repaymentEvents.length).toEqual(0);
    expect(snapshotDayAfterExpiry.defaultedClaimEvents.length).toEqual(0);
    expect(snapshotDayAfterExpiry.extendEvents.length).toEqual(0);
    expect(snapshotDayAfterExpiry.clearinghouseEvents.length).toEqual(0);
  });

  it("loan default claim", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-09-14"); // includes 1 day after default claim
    const previousDateRecords: Snapshot | null = null;
    const subgraphData = getSampleData();

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, subgraphData);

    expect(snapshots.length).toEqual(44); // 31 + 13

    // Day of claim
    const snapshotDayOfExpiry = snapshots[42];
    expect(snapshotDayOfExpiry.date.toISOString()).toEqual("2023-09-12T23:59:59.999Z");
    expect(snapshotDayOfExpiry.principalReceivables).toEqual(0); // Zero-ed out
    expect(snapshotDayOfExpiry.interestReceivables).toEqual(0); // Zero-ed out

    expect(Object.values(snapshotDayOfExpiry.loans)).toHaveLength(1);
    const snapshotDayOfExpiryLoanOne = snapshotDayOfExpiry.loans[LOAN_ID];
    expect(snapshotDayOfExpiryLoanOne.loanId).toEqual(0);
    expect(snapshotDayOfExpiryLoanOne.createdTimestamp).toEqual(LOAN_CREATION_TIMESTAMP);
    expect(snapshotDayOfExpiryLoanOne.borrowerAddress).toEqual("0x01");
    expect(snapshotDayOfExpiryLoanOne.lenderAddress).toEqual("0x02");
    expect(snapshotDayOfExpiryLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotDayOfExpiryLoanOne.interest).toEqual(LOAN_INTEREST);
    expect(snapshotDayOfExpiryLoanOne.collateralDeposited).toEqual(0);
    expect(snapshotDayOfExpiryLoanOne.expiryTimestamp).toEqual(1694332800);
    expect(snapshotDayOfExpiryLoanOne.secondsToExpiry).toEqual(0);
    expect(snapshotDayOfExpiryLoanOne.status).toEqual("Reclaimed");
    expect(snapshotDayOfExpiryLoanOne.principalPaid).toEqual(
      getPrincipalPaid(LOAN_PRINCIPAL, LOAN_INTEREST, REPAYMENT_AMOUNT),
    );
    expect(snapshotDayOfExpiryLoanOne.interestPaid).toEqual(
      getInterestPaid(LOAN_PRINCIPAL, LOAN_INTEREST, REPAYMENT_AMOUNT),
    );

    expect(snapshotDayOfExpiryLoanOne.collateralClaimedQuantity).toEqual(COLLATERAL_CLAIM_QUANTITY); // From default
    expect(snapshotDayOfExpiryLoanOne.collateralClaimedValue).toEqual(COLLATERAL_CLAIM_VALUE); // From default
    expect(snapshotDayOfExpiryLoanOne.collateralIncome).toEqual(COLLATERAL_CLAIM_VALUE);

    expect(snapshotDayOfExpiry.creationEvents.length).toEqual(0);
    expect(snapshotDayOfExpiry.repaymentEvents.length).toEqual(0);
    expect(snapshotDayOfExpiry.defaultedClaimEvents.length).toEqual(1);
    expect(snapshotDayOfExpiry.extendEvents.length).toEqual(0);
    expect(snapshotDayOfExpiry.clearinghouseEvents.length).toEqual(0);

    // Same for next day
    const snapshotDayAfterExpiry = snapshots[43];
    expect(snapshotDayAfterExpiry.date.toISOString()).toEqual("2023-09-13T23:59:59.999Z");

    expect(Object.values(snapshotDayAfterExpiry.loans)).toHaveLength(1);
    const snapshotDayAfterExpiryLoanOne = snapshotDayAfterExpiry.loans[LOAN_ID];
    expect(snapshotDayAfterExpiryLoanOne.loanId).toEqual(0);
    expect(snapshotDayAfterExpiryLoanOne.createdTimestamp).toEqual(LOAN_CREATION_TIMESTAMP);
    expect(snapshotDayAfterExpiryLoanOne.borrowerAddress).toEqual("0x01");
    expect(snapshotDayAfterExpiryLoanOne.lenderAddress).toEqual("0x02");
    expect(snapshotDayAfterExpiryLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotDayAfterExpiryLoanOne.interest).toEqual(LOAN_INTEREST);
    expect(snapshotDayAfterExpiryLoanOne.collateralDeposited).toEqual(0);
    expect(snapshotDayAfterExpiryLoanOne.expiryTimestamp).toEqual(1694332800);
    expect(snapshotDayAfterExpiryLoanOne.secondsToExpiry).toEqual(0);
    expect(snapshotDayAfterExpiryLoanOne.status).toEqual("Reclaimed");
    expect(snapshotDayAfterExpiryLoanOne.principalPaid).toEqual(
      getPrincipalPaid(LOAN_PRINCIPAL, LOAN_INTEREST, REPAYMENT_AMOUNT),
    );
    expect(snapshotDayAfterExpiryLoanOne.interestPaid).toEqual(
      getInterestPaid(LOAN_PRINCIPAL, LOAN_INTEREST, REPAYMENT_AMOUNT),
    );

    expect(snapshotDayAfterExpiryLoanOne.collateralClaimedQuantity).toEqual(COLLATERAL_CLAIM_QUANTITY); // From default
    expect(snapshotDayAfterExpiryLoanOne.collateralClaimedValue).toEqual(COLLATERAL_CLAIM_VALUE); // From default
    expect(snapshotDayAfterExpiryLoanOne.collateralIncome).toEqual(COLLATERAL_CLAIM_VALUE);

    expect(snapshotDayAfterExpiry.creationEvents.length).toEqual(0);
    expect(snapshotDayAfterExpiry.repaymentEvents.length).toEqual(0);
    expect(snapshotDayAfterExpiry.defaultedClaimEvents.length).toEqual(0);
    expect(snapshotDayAfterExpiry.extendEvents.length).toEqual(0);
    expect(snapshotDayAfterExpiry.clearinghouseEvents.length).toEqual(0);
  });

  it("extend loan", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-03");
    const previousDateRecords: Snapshot | null = null;
    const subgraphData = getSampleData();

    // Add extension on day 2
    const newInterestDue = LOAN_INTEREST + 2 * LOAN_INTEREST;
    const newExpiryTimestamp = 99999999999;
    subgraphData.extendEvents["2023-08-02"] = [
      {
        id: "0x3-0-1233456",
        date: "2023-08-02",
        blockNumber: 1233456,
        blockTimestamp: 1691654400,
        transactionHash: "0x0000002",
        periods: 2,
        expiryTimestamp: newExpiryTimestamp,
        interestDue: newInterestDue,
        loan: {
          id: "0x3-0",
        },
      },
    ];

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, subgraphData);

    // Day 2 should have the loan extended
    const snapshotTwo = snapshots[1];
    expect(snapshotTwo.date.toISOString()).toEqual("2023-08-02T23:59:59.999Z");
    expect(snapshotTwo.principalReceivables).toEqual(LOAN_PRINCIPAL);
    expect(snapshotTwo.interestReceivables).toEqual(newInterestDue);

    expect(Object.values(snapshotTwo.loans)).toHaveLength(1);
    const snapshotTwoLoanOne = snapshotTwo.loans[LOAN_ID];
    expect(snapshotTwoLoanOne.loanId).toEqual(0);
    expect(snapshotTwoLoanOne.createdTimestamp).toEqual(LOAN_CREATION_TIMESTAMP);
    expect(snapshotTwoLoanOne.borrowerAddress).toEqual("0x01");
    expect(snapshotTwoLoanOne.lenderAddress).toEqual("0x02");
    expect(snapshotTwoLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotTwoLoanOne.interest).toEqual(newInterestDue);
    expect(snapshotTwoLoanOne.collateralDeposited).toEqual(LOAN_INITIAL_COLLATERAL);
    expect(snapshotTwoLoanOne.expiryTimestamp).toEqual(newExpiryTimestamp);
    expect(snapshotTwoLoanOne.secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotTwo.date, snapshotTwoLoanOne.expiryTimestamp),
    );
    expect(snapshotTwoLoanOne.status).toEqual("Active");
    expect(snapshotTwoLoanOne.principalPaid).toEqual(0);
    expect(snapshotTwoLoanOne.interestPaid).toEqual(0);
    expect(snapshotTwoLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotTwoLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotTwoLoanOne.collateralIncome).toEqual(0);
    expect(snapshotTwo.creationEvents.length).toEqual(0);
    expect(snapshotTwo.repaymentEvents.length).toEqual(0);
    expect(snapshotTwo.defaultedClaimEvents.length).toEqual(0);
    expect(snapshotTwo.extendEvents.length).toEqual(1);
    expect(snapshotTwo.clearinghouseEvents.length).toEqual(0);
  });

  it("loan repayment then extension", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-13");
    const previousDateRecords: Snapshot | null = null;
    const subgraphData = getSampleData();

    // Add extension on day 12
    const newInterestDue = LOAN_INTEREST + 2 * LOAN_INTEREST;
    const newExpiryTimestamp = 99999999999;
    subgraphData.extendEvents["2023-08-12"] = [
      {
        id: "0x3-0-1233456",
        date: "2023-08-12",
        blockNumber: 1233456,
        blockTimestamp: 1691654400,
        transactionHash: "0x0000002",
        periods: 2,
        expiryTimestamp: newExpiryTimestamp,
        interestDue: newInterestDue,
        loan: {
          id: "0x3-0",
        },
      },
    ];

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, subgraphData);

    expect(snapshots.length).toEqual(12);

    // Day 12 should have the loan extended
    const snapshotTwelve = snapshots[11];
    expect(snapshotTwelve.date.toISOString()).toEqual("2023-08-12T23:59:59.999Z");
    expect(snapshotTwelve.principalReceivables).toEqual(
      LOAN_PRINCIPAL - getPrincipalPaid(LOAN_PRINCIPAL, LOAN_INTEREST, REPAYMENT_AMOUNT),
    );
    expect(snapshotTwelve.interestReceivables).toEqual(
      newInterestDue - getInterestPaid(LOAN_PRINCIPAL, LOAN_INTEREST, REPAYMENT_AMOUNT),
    );

    expect(Object.values(snapshotTwelve.loans)).toHaveLength(1);
    const snapshotTwelveLoanOne = snapshotTwelve.loans[LOAN_ID];
    expect(snapshotTwelveLoanOne.loanId).toEqual(0);
    expect(snapshotTwelveLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotTwelveLoanOne.interest).toEqual(newInterestDue);
    expect(snapshotTwelveLoanOne.collateralDeposited).toEqual(29);
    expect(snapshotTwelveLoanOne.expiryTimestamp).toEqual(newExpiryTimestamp);
    expect(snapshotTwelveLoanOne.secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotTwelve.date, snapshotTwelveLoanOne.expiryTimestamp),
    );
    expect(snapshotTwelveLoanOne.status).toEqual("Active");
    expect(snapshotTwelveLoanOne.principalPaid).toEqual(
      getPrincipalPaid(LOAN_PRINCIPAL, LOAN_INTEREST, REPAYMENT_AMOUNT),
    );
    expect(snapshotTwelveLoanOne.interestPaid).toEqual(
      getInterestPaid(LOAN_PRINCIPAL, LOAN_INTEREST, REPAYMENT_AMOUNT),
    );
    expect(snapshotTwelveLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotTwelveLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotTwelveLoanOne.collateralIncome).toEqual(0);
    expect(snapshotTwelve.creationEvents.length).toEqual(0);
    expect(snapshotTwelve.repaymentEvents.length).toEqual(0);
    expect(snapshotTwelve.defaultedClaimEvents.length).toEqual(0);
    expect(snapshotTwelve.extendEvents.length).toEqual(1);
    expect(snapshotTwelve.clearinghouseEvents.length).toEqual(0);
  });
});
