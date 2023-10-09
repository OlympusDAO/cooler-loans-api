import { Snapshot } from "../../../types/snapshot";
import { CoolerLoanOptional, SubgraphData } from "../../../types/subgraph";
import { generateSnapshots } from "../snapshot";

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
    request: {
      interestPercentage: CLEARINGHOUSE_INTEREST_RATE,
      durationSeconds: CLEARINGHOUSE_DURATION_SECONDS,
    },
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
          duration: CLEARINGHOUSE_DURATION_SECONDS,
          interestRate: CLEARINGHOUSE_INTEREST_RATE,
          loanToCollateral: CLEARINGHOUSE_LOAN_TO_COLLATERAL,
          fundAmount: CLEARINGHOUSE_FUND_AMOUNT,
          fundCadence: CLEARINGHOUSE_FUND_CADENCE,
          coolerFactoryAddress: CLEARINGHOUSE_COOLER_FACTORY_ADDRESS,
          collateralAddress: CLEARINGHOUSE_COLLATERAL_ADDRESS,
          debtAddress: CLEARINGHOUSE_DEBT_ADDRESS,
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
          duration: CLEARINGHOUSE_DURATION_SECONDS,
          interestRate: CLEARINGHOUSE_INTEREST_RATE,
          loanToCollateral: CLEARINGHOUSE_LOAN_TO_COLLATERAL,
          fundAmount: CLEARINGHOUSE_FUND_AMOUNT,
          fundCadence: CLEARINGHOUSE_FUND_CADENCE,
          coolerFactoryAddress: CLEARINGHOUSE_COOLER_FACTORY_ADDRESS,
          collateralAddress: CLEARINGHOUSE_COLLATERAL_ADDRESS,
          debtAddress: CLEARINGHOUSE_DEBT_ADDRESS,
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
          clearinghouseDaiBalance: CLEARINGHOUSE_DAI_BALANCE_AFTER_CREATION,
          clearinghouseSDaiBalance: CLEARINGHOUSE_SDAI_BALANCE_AFTER_CREATION,
          clearinghouseSDaiInDaiBalance: CLEARINGHOUSE_SDAI_IN_DAI_BALANCE_AFTER_CREATION,
          treasuryDaiBalance: TREASURY_DAI_BALANCE_AFTER_CREATION,
          treasurySDaiBalance: TREASURY_SDAI_BALANCE_AFTER_CREATION,
          treasurySDaiInDaiBalance: TREASURY_SDAI_IN_DAI_BALANCE_AFTER_CREATION,
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
          clearinghouseDaiBalance: CLEARINGHOUSE_DAI_BALANCE_AFTER_REPAYMENT,
          clearinghouseSDaiBalance: CLEARINGHOUSE_SDAI_BALANCE_AFTER_REPAYMENT,
          clearinghouseSDaiInDaiBalance: CLEARINGHOUSE_SDAI_IN_DAI_BALANCE_AFTER_REPAYMENT,
          treasuryDaiBalance: TREASURY_DAI_BALANCE_AFTER_REPAYMENT,
          treasurySDaiBalance: TREASURY_SDAI_BALANCE_AFTER_REPAYMENT,
          treasurySDaiInDaiBalance: TREASURY_SDAI_IN_DAI_BALANCE_AFTER_REPAYMENT,
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
 * Based on: https://github.com/ohmzeus/Cooler/blob/a899201f503d74a956028ee4d8b7bc3ef71f55fa/src/Clearinghouse.sol#L455
 */
const getInterestForLoan = (
  principal: number,
  interestRate = CLEARINGHOUSE_INTEREST_RATE,
  duration = CLEARINGHOUSE_DURATION_DAYS,
): number => {
  return principal * ((interestRate * duration) / 365);
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
    expect(resultOne.timestamp).toEqual(resultOne.date.getTime());
    expect(resultOne.principalReceivables).toEqual(0);
    expect(resultOne.interestReceivables).toEqual(0);

    expect(resultOne.clearinghouse.daiBalance).toEqual(0);
    expect(resultOne.clearinghouse.sDaiBalance).toEqual(0);
    expect(resultOne.clearinghouse.sDaiInDaiBalance).toEqual(0);
    expect(resultOne.clearinghouse.fundAmount).toEqual(0);
    expect(resultOne.clearinghouse.fundCadence).toEqual(0);
    expect(resultOne.clearinghouse.coolerFactoryAddress).toEqual("");
    expect(resultOne.clearinghouse.collateralAddress).toEqual("");
    expect(resultOne.clearinghouse.debtAddress).toEqual("");

    expect(resultOne.treasury.daiBalance).toEqual(0);
    expect(resultOne.treasury.sDaiBalance).toEqual(0);
    expect(resultOne.treasury.sDaiInDaiBalance).toEqual(0);

    expect(resultOne.terms.duration).toEqual(0);
    expect(resultOne.terms.interestRate).toEqual(0);
    expect(resultOne.terms.loanToCollateral).toEqual(0);

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
    expect(snapshotOne.timestamp).toEqual(snapshotOne.date.getTime());
    expect(snapshotOne.principalReceivables).toEqual(LOAN_PRINCIPAL);
    expect(snapshotOne.interestReceivables).toEqual(LOAN_INTEREST);
    expect(snapshotOne.interestIncome).toEqual(0);
    expect(snapshotOne.collateralIncome).toEqual(0);
    expect(snapshotOne.collateralDeposited).toEqual(LOAN_INITIAL_COLLATERAL);

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

    // Clearinghouse and treasury balances should have the new balance from the creation event
    expect(snapshotOne.clearinghouse.daiBalance).toEqual(CLEARINGHOUSE_DAI_BALANCE_AFTER_CREATION);
    expect(snapshotOne.clearinghouse.sDaiBalance).toEqual(CLEARINGHOUSE_SDAI_BALANCE_AFTER_CREATION);
    expect(snapshotOne.clearinghouse.sDaiInDaiBalance).toEqual(CLEARINGHOUSE_SDAI_IN_DAI_BALANCE_AFTER_CREATION);
    expect(snapshotOne.treasury.daiBalance).toEqual(TREASURY_DAI_BALANCE_AFTER_CREATION);
    expect(snapshotOne.treasury.sDaiBalance).toEqual(TREASURY_SDAI_BALANCE_AFTER_CREATION);
    expect(snapshotOne.treasury.sDaiInDaiBalance).toEqual(TREASURY_SDAI_IN_DAI_BALANCE_AFTER_CREATION);

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

    // Clearinghouse and treasury balances should have the new balance from the creation event
    expect(snapshotTwo.clearinghouse.daiBalance).toEqual(CLEARINGHOUSE_DAI_BALANCE_AFTER_CREATION);
    expect(snapshotTwo.clearinghouse.sDaiBalance).toEqual(CLEARINGHOUSE_SDAI_BALANCE_AFTER_CREATION);
    expect(snapshotTwo.clearinghouse.sDaiInDaiBalance).toEqual(CLEARINGHOUSE_SDAI_IN_DAI_BALANCE_AFTER_CREATION);
    expect(snapshotTwo.treasury.daiBalance).toEqual(TREASURY_DAI_BALANCE_AFTER_CREATION);
    expect(snapshotTwo.treasury.sDaiBalance).toEqual(TREASURY_SDAI_BALANCE_AFTER_CREATION);
    expect(snapshotTwo.treasury.sDaiInDaiBalance).toEqual(TREASURY_SDAI_IN_DAI_BALANCE_AFTER_CREATION);
  });

  it("multiple loans", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-11");
    const previousDateRecords: Snapshot | null = null;
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
          request: {
            interestPercentage: CLEARINGHOUSE_INTEREST_RATE,
            durationSeconds: CLEARINGHOUSE_DURATION_SECONDS,
          },
        },
        clearinghouseDaiBalance: loanTwoClearinghouseDaiBalance,
        clearinghouseSDaiBalance: loanTwoClearinghouseSDaiBalance,
        clearinghouseSDaiInDaiBalance: loanTwoClearinghouseSDaiInDaiBalance,
        treasuryDaiBalance: loanTwoTreasuryDaiBalance,
        treasurySDaiBalance: loanTwoTreasurySDaiBalance,
        treasurySDaiInDaiBalance: loanTwoTreasurySDaiInDaiBalance,
      },
    ];

    // Change the payment amount to be more than interest
    const loanOneAmountPaid = 2000;
    const loanOneInterestPaid = loanOneAmountPaid > LOAN_INTEREST ? LOAN_INTEREST : loanOneAmountPaid;
    const loanOnePrincipalPaid = loanOneAmountPaid - loanOneInterestPaid;
    subgraphData.repaymentEvents["2023-08-10"][0].amountPaid = loanOneAmountPaid;

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
    expect(snapshotTwoLoanOne.principalPaid).toEqual(0);
    expect(snapshotTwoLoanOne.interestPaid).toEqual(0);

    // Loan 2
    const snapshotTwoLoanTwo = snapshotTwo.loans["0x3-1"];
    expect(snapshotTwoLoanTwo.id).toEqual("0x3-1");
    expect(snapshotTwoLoanTwo.principalPaid).toEqual(0);
    expect(snapshotTwoLoanTwo.interestPaid).toEqual(0);

    // eslint-disable-next-line prettier/prettier
    expect(snapshotTwo.principalReceivables).toEqual(
      snapshotTwoLoanOne.principal -
      snapshotTwoLoanOne.principalPaid +
      snapshotTwoLoanTwo.principal -
      snapshotTwoLoanTwo.principalPaid,
    );

    // Skip to day 10 after payment
    const snapshotTen = snapshots[9];

    expect(snapshotTen.principalReceivables).toEqual(LOAN_PRINCIPAL + loanTwoPrincipal - loanOnePrincipalPaid);
    expect(snapshotTen.interestReceivables).toEqual(LOAN_INTEREST + loanTwoInterest - loanOneInterestPaid);

    // Loan 1
    const snapshotTenLoanOne = snapshotTen.loans[LOAN_ID];
    expect(snapshotTenLoanOne.id).toEqual(LOAN_ID);

    // Loan 2
    const snapshotTenLoanTwo = snapshotTen.loans["0x3-1"];
    expect(snapshotTenLoanTwo.id).toEqual("0x3-1");

    // eslint-disable-next-line prettier/prettier
    expect(snapshotTen.principalReceivables).toEqual(
      snapshotTenLoanOne.principal -
      snapshotTenLoanOne.principalPaid +
      snapshotTenLoanTwo.principal +
      snapshotTenLoanTwo.principalPaid,
    );
  });

  it("loan repayment < interest due", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-12");
    const previousDateRecords: Snapshot | null = null;
    const subgraphData = getSampleData();

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, subgraphData);

    expect(snapshots.length).toEqual(11);

    // Day 10 should include the repayment
    const snapshotTen = snapshots[9];
    expect(snapshotTen.date.toISOString()).toEqual("2023-08-10T23:59:59.999Z");

    expect(snapshotTen.principalReceivables).toEqual(LOAN_PRINCIPAL);
    expect(snapshotTen.interestReceivables).toEqual(LOAN_INTEREST - REPAYMENT_AMOUNT);
    expect(snapshotTen.interestIncome).toEqual(REPAYMENT_AMOUNT);
    expect(snapshotTen.interestReceivables + snapshotTen.interestIncome).toEqual(LOAN_INTEREST); // Invariant

    expect(snapshotTen.collateralIncome).toEqual(0);
    expect(snapshotTen.collateralDeposited).toEqual(29); // Takes the value from the repayment event

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

    expect(snapshotTenLoanOne.principalPaid).toEqual(0);
    expect(snapshotTenLoanOne.interestPaid).toEqual(REPAYMENT_AMOUNT);

    expect(snapshotTenLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotTenLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotTenLoanOne.collateralIncome).toEqual(0);
    expect(snapshotTen.creationEvents.length).toEqual(0);
    expect(snapshotTen.repaymentEvents.length).toEqual(1);
    expect(snapshotTen.defaultedClaimEvents.length).toEqual(0);
    expect(snapshotTen.extendEvents.length).toEqual(0);
    expect(snapshotTen.clearinghouseEvents.length).toEqual(0);

    // Clearinghouse and treasury balances should have the new balance from the repayment event
    expect(snapshotTen.clearinghouse.daiBalance).toEqual(CLEARINGHOUSE_DAI_BALANCE_AFTER_REPAYMENT);
    expect(snapshotTen.clearinghouse.sDaiBalance).toEqual(CLEARINGHOUSE_SDAI_BALANCE_AFTER_REPAYMENT);
    expect(snapshotTen.clearinghouse.sDaiInDaiBalance).toEqual(CLEARINGHOUSE_SDAI_IN_DAI_BALANCE_AFTER_REPAYMENT);
    expect(snapshotTen.treasury.daiBalance).toEqual(TREASURY_DAI_BALANCE_AFTER_REPAYMENT);
    expect(snapshotTen.treasury.sDaiBalance).toEqual(TREASURY_SDAI_BALANCE_AFTER_REPAYMENT);
    expect(snapshotTen.treasury.sDaiInDaiBalance).toEqual(TREASURY_SDAI_IN_DAI_BALANCE_AFTER_REPAYMENT);

    // Day after should be the same
    const snapshotEleven = snapshots[10];
    expect(snapshotEleven.date.toISOString()).toEqual("2023-08-11T23:59:59.999Z");

    expect(snapshotEleven.principalReceivables).toEqual(LOAN_PRINCIPAL);
    expect(snapshotEleven.interestReceivables).toEqual(LOAN_INTEREST - REPAYMENT_AMOUNT);
    expect(snapshotEleven.interestIncome).toEqual(0);
    // Check the invariant
    expect(snapshotEleven.interestReceivables + snapshotTen.interestIncome).toEqual(LOAN_INTEREST);

    expect(snapshotEleven.collateralIncome).toEqual(0);

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

    expect(snapshotElevenLoanOne.principalPaid).toEqual(0);
    expect(snapshotElevenLoanOne.interestPaid).toEqual(REPAYMENT_AMOUNT);
    expect(snapshotElevenLoanOne.principalPaid + snapshotElevenLoanOne.interestPaid).toEqual(REPAYMENT_AMOUNT); // Invariant

    expect(snapshotElevenLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotElevenLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotElevenLoanOne.collateralIncome).toEqual(0);
    expect(snapshotEleven.creationEvents.length).toEqual(0);
    expect(snapshotEleven.repaymentEvents.length).toEqual(0);
    expect(snapshotEleven.defaultedClaimEvents.length).toEqual(0);
    expect(snapshotEleven.extendEvents.length).toEqual(0);
    expect(snapshotEleven.clearinghouseEvents.length).toEqual(0);

    // Clearinghouse and treasury balances should have the new balance from the repayment event
    expect(snapshotEleven.clearinghouse.daiBalance).toEqual(CLEARINGHOUSE_DAI_BALANCE_AFTER_REPAYMENT);
    expect(snapshotEleven.clearinghouse.sDaiBalance).toEqual(CLEARINGHOUSE_SDAI_BALANCE_AFTER_REPAYMENT);
    expect(snapshotEleven.clearinghouse.sDaiInDaiBalance).toEqual(CLEARINGHOUSE_SDAI_IN_DAI_BALANCE_AFTER_REPAYMENT);
    expect(snapshotEleven.treasury.daiBalance).toEqual(TREASURY_DAI_BALANCE_AFTER_REPAYMENT);
    expect(snapshotEleven.treasury.sDaiBalance).toEqual(TREASURY_SDAI_BALANCE_AFTER_REPAYMENT);
    expect(snapshotEleven.treasury.sDaiInDaiBalance).toEqual(TREASURY_SDAI_IN_DAI_BALANCE_AFTER_REPAYMENT);
  });

  it("loan full repayment", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-13"); // Includes the remaining repayment, but not expiry
    const previousDateRecords: Snapshot | null = null;
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
      },
    ];

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, subgraphData);

    expect(snapshots.length).toEqual(12);

    // Day 12 should include the full repayment
    const snapshotTwelve = snapshots[11];
    expect(snapshotTwelve.date.toISOString()).toEqual("2023-08-12T23:59:59.999Z");

    expect(snapshotTwelve.principalReceivables).toEqual(0);
    expect(snapshotTwelve.interestReceivables).toEqual(0);
    expect(snapshotTwelve.interestIncome).toEqual(LOAN_INTEREST - REPAYMENT_AMOUNT); // Residual income

    expect(snapshotTwelve.collateralIncome).toEqual(0);
    expect(snapshotTwelve.collateralDeposited).toEqual(0); // Returned to borrower

    expect(Object.values(snapshotTwelve.loans)).toHaveLength(1);
    const snapshotTwelveLoanOne = snapshotTwelve.loans[LOAN_ID];
    expect(snapshotTwelveLoanOne.loanId).toEqual(0);
    expect(snapshotTwelveLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotTwelveLoanOne.interest).toEqual(LOAN_INTEREST);
    expect(snapshotTwelveLoanOne.collateralDeposited).toEqual(0); // Returned to borrower
    expect(snapshotTwelveLoanOne.expiryTimestamp).toEqual(1694332800);
    expect(snapshotTwelveLoanOne.secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotTwelve.date, snapshotTwelveLoanOne.expiryTimestamp),
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
    expect(snapshotTwelve.creationEvents.length).toEqual(0);
    expect(snapshotTwelve.repaymentEvents.length).toEqual(1);
    expect(snapshotTwelve.defaultedClaimEvents.length).toEqual(0);
    expect(snapshotTwelve.extendEvents.length).toEqual(0);
    expect(snapshotTwelve.clearinghouseEvents.length).toEqual(0);

    // Repayment of principal and interest should be reflected in the clearinghouse
    expect(snapshotTwelve.clearinghouse.daiBalance).toEqual(clearinghouseDaiBalance);
    expect(snapshotTwelve.clearinghouse.sDaiBalance).toEqual(clearinghouseSDaiBalance);
    expect(snapshotTwelve.clearinghouse.sDaiInDaiBalance).toEqual(clearinghouseSDaiInDaiBalance);
    expect(snapshotTwelve.treasury.daiBalance).toEqual(treasuryDaiBalance);
    expect(snapshotTwelve.treasury.sDaiBalance).toEqual(treasurySDaiBalance);
    expect(snapshotTwelve.treasury.sDaiInDaiBalance).toEqual(treasurySDaiInDaiBalance);
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

    // Clearinghouse and treasury balances should have the new balance from the creation event
    expect(snapshotOne.clearinghouse.daiBalance).toEqual(CLEARINGHOUSE_DAI_BALANCE_AFTER_CREATION);
    expect(snapshotOne.clearinghouse.sDaiBalance).toEqual(CLEARINGHOUSE_SDAI_BALANCE_AFTER_CREATION);
    expect(snapshotOne.clearinghouse.sDaiInDaiBalance).toEqual(CLEARINGHOUSE_SDAI_IN_DAI_BALANCE_AFTER_CREATION);
    expect(snapshotOne.treasury.daiBalance).toEqual(TREASURY_DAI_BALANCE_AFTER_CREATION);
    expect(snapshotOne.treasury.sDaiBalance).toEqual(TREASURY_SDAI_BALANCE_AFTER_CREATION);
    expect(snapshotOne.treasury.sDaiInDaiBalance).toEqual(TREASURY_SDAI_IN_DAI_BALANCE_AFTER_CREATION);

    expect(snapshotOne.clearinghouse.fundAmount).toEqual(CLEARINGHOUSE_FUND_AMOUNT);
    expect(snapshotOne.clearinghouse.fundCadence).toEqual(CLEARINGHOUSE_FUND_CADENCE);
    expect(snapshotOne.clearinghouse.coolerFactoryAddress).toEqual(CLEARINGHOUSE_COOLER_FACTORY_ADDRESS);
    expect(snapshotOne.clearinghouse.collateralAddress).toEqual(CLEARINGHOUSE_COLLATERAL_ADDRESS);
    expect(snapshotOne.clearinghouse.debtAddress).toEqual(CLEARINGHOUSE_DEBT_ADDRESS);

    expect(snapshotOne.terms.duration).toEqual(CLEARINGHOUSE_DURATION_SECONDS);
    expect(snapshotOne.terms.interestRate).toEqual(CLEARINGHOUSE_INTEREST_RATE);
    expect(snapshotOne.terms.loanToCollateral).toEqual(CLEARINGHOUSE_LOAN_TO_COLLATERAL);

    // Day 20 should have the adjusted clearinghouse balances
    const snapshotTwenty = snapshots[19];
    expect(snapshotTwenty.date.toISOString()).toEqual("2023-08-20T23:59:59.999Z");
    expect(snapshotTwenty.principalReceivables).toEqual(LOAN_PRINCIPAL); // Ignores the clearinghouse snapshot
    expect(snapshotTwenty.interestReceivables).toEqual(LOAN_INTEREST - REPAYMENT_AMOUNT); // Ignores the clearinghouse snapshot

    expect(snapshotTwenty.clearinghouse.daiBalance).toEqual(9000000.0);

    expect(snapshotTwenty.clearinghouse.sDaiBalance).toEqual(500000.0);
    expect(snapshotTwenty.clearinghouse.sDaiInDaiBalance).toEqual(600000.01);

    expect(snapshotTwenty.clearinghouse.fundAmount).toEqual(CLEARINGHOUSE_FUND_AMOUNT);
    expect(snapshotTwenty.clearinghouse.fundCadence).toEqual(CLEARINGHOUSE_FUND_CADENCE);
    expect(snapshotTwenty.clearinghouse.coolerFactoryAddress).toEqual(CLEARINGHOUSE_COOLER_FACTORY_ADDRESS);
    expect(snapshotTwenty.clearinghouse.collateralAddress).toEqual(CLEARINGHOUSE_COLLATERAL_ADDRESS);
    expect(snapshotTwenty.clearinghouse.debtAddress).toEqual(CLEARINGHOUSE_DEBT_ADDRESS);

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
    expect(snapshotTwentyOne.principalReceivables).toEqual(LOAN_PRINCIPAL); // Ignores the clearinghouse snapshot
    expect(snapshotTwentyOne.interestReceivables).toEqual(LOAN_INTEREST - REPAYMENT_AMOUNT); // Ignores the clearinghouse snapshot

    expect(snapshotTwentyOne.clearinghouse.daiBalance).toEqual(9000000.0);

    expect(snapshotTwentyOne.clearinghouse.sDaiBalance).toEqual(500000.0);
    expect(snapshotTwentyOne.clearinghouse.sDaiInDaiBalance).toEqual(600000.01);

    expect(snapshotTwentyOne.clearinghouse.fundAmount).toEqual(CLEARINGHOUSE_FUND_AMOUNT);
    expect(snapshotTwentyOne.clearinghouse.fundCadence).toEqual(CLEARINGHOUSE_FUND_CADENCE);
    expect(snapshotTwentyOne.clearinghouse.coolerFactoryAddress).toEqual(CLEARINGHOUSE_COOLER_FACTORY_ADDRESS);
    expect(snapshotTwentyOne.clearinghouse.collateralAddress).toEqual(CLEARINGHOUSE_COLLATERAL_ADDRESS);
    expect(snapshotTwentyOne.clearinghouse.debtAddress).toEqual(CLEARINGHOUSE_DEBT_ADDRESS);

    expect(snapshotTwentyOne.treasury.daiBalance).toEqual(1100);
    expect(snapshotTwentyOne.treasury.sDaiBalance).toEqual(1700);
    expect(snapshotTwentyOne.treasury.sDaiInDaiBalance).toEqual(1800);

    expect(snapshotTwentyOne.creationEvents.length).toEqual(0);
    expect(snapshotTwentyOne.repaymentEvents.length).toEqual(0);
    expect(snapshotTwentyOne.defaultedClaimEvents.length).toEqual(0);
    expect(snapshotTwentyOne.extendEvents.length).toEqual(0);
    expect(snapshotTwentyOne.clearinghouseEvents.length).toEqual(0);
  });

  it("clearinghouse balances as strings", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-02");
    const previousDateRecords: Snapshot | null = null;
    const subgraphData = getSampleData();
    // @ts-ignore
    subgraphData.clearinghouseSnapshots["2023-08-01"][0].interestRate = "0.005";

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, subgraphData);

    expect(snapshots.length).toEqual(1);

    // Day 1 should have clearinghouse balances
    const snapshotOne = snapshots[0];
    expect(snapshotOne.date.toISOString()).toEqual("2023-08-01T23:59:59.999Z");

    expect(snapshotOne.terms.interestRate).toEqual(CLEARINGHOUSE_INTEREST_RATE);
  });

  it("repayment amount as strings", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-11");
    const previousDateRecords: Snapshot | null = null;
    const subgraphData = getSampleData();
    // @ts-ignore
    subgraphData.repaymentEvents["2023-08-10"][0].amountPaid = "999";

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, subgraphData);

    expect(snapshots.length).toEqual(10);

    // Check that the amount paid is interpreted correctly
    const snapshotTen = snapshots[9];
    expect(snapshotTen.principalReceivables).toEqual(LOAN_PRINCIPAL);
    expect(snapshotTen.interestReceivables).toEqual(LOAN_INTEREST - 999);

    expect(snapshotTen.interestIncome).toEqual(999);
  });

  it("repayment amount as scientific notation strings", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-11");
    const previousDateRecords: Snapshot | null = null;
    const subgraphData = getSampleData();
    // @ts-ignore
    subgraphData.repaymentEvents["2023-08-10"][0].amountPaid = "1.26e-13";

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, subgraphData);

    expect(snapshots.length).toEqual(10);

    // Check that the amount paid is interpreted correctly
    const snapshotTen = snapshots[9];
    expect(snapshotTen.principalReceivables).toEqual(LOAN_PRINCIPAL);
    expect(snapshotTen.interestReceivables).toEqual(LOAN_INTEREST - 0.000000000000126);

    expect(snapshotTen.interestIncome).toEqual(0.000000000000126);
  });

  it("should handle no previous snapshot", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-02");
    const subgraphData = {
      clearinghouseSnapshots: {},
      creationEvents: {},
      defaultedClaimEvents: {},
      repaymentEvents: {},
      extendEvents: {},
    };

    const snapshots = generateSnapshots(startDate, beforeDate, null, subgraphData);

    expect(snapshots).toHaveLength(1);

    const snapshotOne = snapshots[0];
    expect(snapshotOne.date.toISOString()).toEqual("2023-08-01T23:59:59.999Z");
    expect(snapshotOne.principalReceivables).toEqual(0);
    expect(snapshotOne.interestReceivables).toEqual(0);
    expect(snapshotOne.interestIncome).toEqual(0);
    expect(snapshotOne.collateralIncome).toEqual(0);
    expect(snapshotOne.collateralDeposited).toEqual(0);

    expect(Object.keys(snapshotOne.loans)).toHaveLength(0);
  });

  it("should use the previous day records", () => {
    const previousDateSnapshot: Snapshot = {
      date: new Date("2023-08-01"),
      timestamp: new Date("2023-08-01").getTime(),
      principalReceivables: 55555,
      interestReceivables: 6666,
      interestIncome: 10000,
      collateralIncome: 1000000,
      collateralDeposited: 1234,
      clearinghouse: {
        daiBalance: 12345,
        sDaiBalance: 56789,
        sDaiInDaiBalance: 101010,
        fundAmount: CLEARINGHOUSE_FUND_AMOUNT,
        fundCadence: CLEARINGHOUSE_FUND_CADENCE,
        coolerFactoryAddress: CLEARINGHOUSE_COOLER_FACTORY_ADDRESS,
        collateralAddress: CLEARINGHOUSE_COLLATERAL_ADDRESS,
        debtAddress: CLEARINGHOUSE_DEBT_ADDRESS,
      },
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
          durationSeconds: CLEARINGHOUSE_DURATION_SECONDS,
          interestRate: CLEARINGHOUSE_INTEREST_RATE,
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
    expect(snapshotOne.principalReceivables).toEqual(LOAN_PRINCIPAL - 999); // Does not use the previous snapshot
    expect(snapshotOne.interestReceivables).toEqual(LOAN_INTEREST - 22); // Does not use the previous snapshot
    expect(snapshotOne.interestIncome).toEqual(0); // Does not carry over
    expect(snapshotOne.collateralIncome).toEqual(0); // Does not carry over
    expect(snapshotOne.collateralDeposited).toEqual(30); // Does not carry over

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

    expect(snapshotDayOfExpiry.principalReceivables).toEqual(LOAN_PRINCIPAL);
    expect(snapshotDayOfExpiry.interestReceivables).toEqual(LOAN_INTEREST - REPAYMENT_AMOUNT);

    expect(snapshotDayOfExpiry.interestIncome).toEqual(0);
    expect(snapshotDayOfExpiry.collateralIncome).toEqual(0);
    expect(snapshotDayOfExpiry.collateralDeposited).toEqual(29);

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
    expect(snapshotDayOfExpiryLoanOne.principalPaid).toEqual(0);
    expect(snapshotDayOfExpiryLoanOne.interestPaid).toEqual(REPAYMENT_AMOUNT);

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
    expect(snapshotDayAfterExpiryLoanOne.principalPaid).toEqual(0);
    expect(snapshotDayAfterExpiryLoanOne.interestPaid).toEqual(REPAYMENT_AMOUNT);

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
    expect(snapshotDayOfExpiry.interestIncome).toEqual(0);
    expect(snapshotDayOfExpiry.collateralIncome).toEqual(COLLATERAL_CLAIM_VALUE);
    expect(snapshotDayOfExpiry.collateralDeposited).toEqual(0);

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
    expect(snapshotDayOfExpiryLoanOne.principalPaid).toEqual(0);
    expect(snapshotDayOfExpiryLoanOne.interestPaid).toEqual(REPAYMENT_AMOUNT);

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
    expect(snapshotDayAfterExpiryLoanOne.principalPaid).toEqual(0);
    expect(snapshotDayAfterExpiryLoanOne.interestPaid).toEqual(REPAYMENT_AMOUNT);

    expect(snapshotDayAfterExpiryLoanOne.collateralClaimedQuantity).toEqual(COLLATERAL_CLAIM_QUANTITY); // From default
    expect(snapshotDayAfterExpiryLoanOne.collateralClaimedValue).toEqual(COLLATERAL_CLAIM_VALUE); // From default
    expect(snapshotDayAfterExpiryLoanOne.collateralIncome).toEqual(COLLATERAL_CLAIM_VALUE);

    expect(snapshotDayAfterExpiry.creationEvents.length).toEqual(0);
    expect(snapshotDayAfterExpiry.repaymentEvents.length).toEqual(0);
    expect(snapshotDayAfterExpiry.defaultedClaimEvents.length).toEqual(0);
    expect(snapshotDayAfterExpiry.extendEvents.length).toEqual(0);
    expect(snapshotDayAfterExpiry.clearinghouseEvents.length).toEqual(0);
  });

  it("loan default claim, multiple", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-09-14"); // includes 1 day after default claim
    const previousDateRecords: Snapshot | null = null;
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

    const loanTwo = {
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
      collateral: loanTwoCollateral,
      // 2023-09-11
      expiryTimestamp: 1694246400,
      collateralToken: "0x04",
      debtToken: "0x05",
      hasCallback: false,
      request: {
        interestPercentage: CLEARINGHOUSE_INTEREST_RATE,
        durationSeconds: CLEARINGHOUSE_DURATION_SECONDS,
      },
    };
    subgraphData.creationEvents["2023-08-02"] = [
      {
        id: "0x3-1",
        date: "2023-08-02",
        blockTimestamp: 1690876800,
        blockNumber: 12223,
        transactionHash: "0x0000001",
        loan: loanTwo,
        clearinghouseDaiBalance: loanTwoClearinghouseDaiBalance,
        clearinghouseSDaiBalance: loanTwoClearinghouseSDaiBalance,
        clearinghouseSDaiInDaiBalance: loanTwoClearinghouseSDaiInDaiBalance,
        treasuryDaiBalance: loanTwoTreasuryDaiBalance,
        treasurySDaiBalance: loanTwoTreasurySDaiBalance,
        treasurySDaiInDaiBalance: loanTwoTreasurySDaiInDaiBalance,
      },
    ];

    // Add a second default claim on the same day
    const loanTwoCollateralClaimed = loanTwoCollateral * COLLATERAL_PRICE;
    subgraphData.defaultedClaimEvents["2023-09-12"].push({
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
    });

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, subgraphData);

    // Day of claim
    const snapshotDayOfExpiry = snapshots[42];
    expect(snapshotDayOfExpiry.date.toISOString()).toEqual("2023-09-12T23:59:59.999Z");
    expect(snapshotDayOfExpiry.principalReceivables).toEqual(0); // Zero-ed out
    expect(snapshotDayOfExpiry.interestReceivables).toEqual(0); // Zero-ed out
    expect(snapshotDayOfExpiry.interestIncome).toEqual(0);
    expect(snapshotDayOfExpiry.collateralIncome).toEqual(COLLATERAL_CLAIM_VALUE + loanTwoCollateralClaimed);
    expect(snapshotDayOfExpiry.collateralDeposited).toEqual(0);
  });

  it("extend loan", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-03");
    const previousDateRecords: Snapshot | null = null;
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
        id: "0x3-0-1233456",
        date: "2023-08-02",
        blockNumber: 1233456,
        blockTimestamp: 1691654400,
        transactionHash: "0x0000002",
        periods: newPeriods,
        expiryTimestamp: newExpiryTimestamp,
        interestDue: LOAN_INTEREST, // Interest for the extension is paid at the time, and is not reflected here. This is residual interest from before the extension.
        loan: {
          id: "0x3-0",
        },
        clearinghouseDaiBalance: newClearinghouseDaiBalance,
        clearinghouseSDaiBalance: newClearinghouseSDaiBalance,
        clearinghouseSDaiInDaiBalance: newClearinghouseSDaiInDaiBalance,
        treasuryDaiBalance: newTreasuryDaiBalance,
        treasurySDaiBalance: newTreasurySDaiBalance,
        treasurySDaiInDaiBalance: newTreasurySDaiInDaiBalance,
      },
    ];

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, subgraphData);

    // Day 2 should have the loan extended
    const snapshotTwo = snapshots[1];
    expect(snapshotTwo.date.toISOString()).toEqual("2023-08-02T23:59:59.999Z");
    expect(snapshotTwo.principalReceivables).toEqual(LOAN_PRINCIPAL);
    expect(snapshotTwo.interestReceivables).toEqual(LOAN_INTEREST); // Extension interest already paid
    expect(snapshotTwo.interestIncome).toEqual(newInterest); // Should reflect the interest paid for the extension
    expect(snapshotTwo.interestReceivables + snapshotTwo.interestIncome).toEqual(LOAN_INTEREST + newInterest); // Invariant

    expect(snapshotTwo.collateralIncome).toEqual(0);

    expect(Object.values(snapshotTwo.loans)).toHaveLength(1);
    const snapshotTwoLoanOne = snapshotTwo.loans[LOAN_ID];
    expect(snapshotTwoLoanOne.loanId).toEqual(0);
    expect(snapshotTwoLoanOne.createdTimestamp).toEqual(LOAN_CREATION_TIMESTAMP);
    expect(snapshotTwoLoanOne.borrowerAddress).toEqual("0x01");
    expect(snapshotTwoLoanOne.lenderAddress).toEqual("0x02");
    expect(snapshotTwoLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotTwoLoanOne.interest).toEqual(LOAN_INTEREST + newInterest);
    expect(snapshotTwoLoanOne.collateralDeposited).toEqual(LOAN_INITIAL_COLLATERAL);
    expect(snapshotTwoLoanOne.expiryTimestamp).toEqual(newExpiryTimestamp);
    expect(snapshotTwoLoanOne.secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotTwo.date, snapshotTwoLoanOne.expiryTimestamp),
    );
    expect(snapshotTwoLoanOne.status).toEqual("Active");

    expect(snapshotTwoLoanOne.principalPaid).toEqual(0);
    expect(snapshotTwoLoanOne.interestPaid).toEqual(newInterest); // Should reflect the interest paid for the extension

    expect(snapshotTwoLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotTwoLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotTwoLoanOne.collateralIncome).toEqual(0);
    expect(snapshotTwo.creationEvents.length).toEqual(0);
    expect(snapshotTwo.repaymentEvents.length).toEqual(0);
    expect(snapshotTwo.defaultedClaimEvents.length).toEqual(0);
    expect(snapshotTwo.extendEvents.length).toEqual(1);
    expect(snapshotTwo.clearinghouseEvents.length).toEqual(0);

    // Clearinghouse and treasury balances should have the new balance from the extension event
    expect(snapshotTwo.clearinghouse.daiBalance).toEqual(newClearinghouseDaiBalance);
    expect(snapshotTwo.clearinghouse.sDaiBalance).toEqual(newClearinghouseSDaiBalance);
    expect(snapshotTwo.clearinghouse.sDaiInDaiBalance).toEqual(newClearinghouseSDaiInDaiBalance);
    expect(snapshotTwo.treasury.daiBalance).toEqual(newTreasuryDaiBalance);
    expect(snapshotTwo.treasury.sDaiBalance).toEqual(newTreasurySDaiBalance);
    expect(snapshotTwo.treasury.sDaiInDaiBalance).toEqual(newTreasurySDaiInDaiBalance);
  });

  it("loan repayment then extension", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-13");
    const previousDateRecords: Snapshot | null = null;
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
        id: "0x3-0-1233456",
        date: "2023-08-12",
        blockNumber: 1233456,
        blockTimestamp: 1691654400,
        transactionHash: "0x0000002",
        periods: newPeriods,
        expiryTimestamp: newExpiryTimestamp,
        interestDue: interestDue, // Interest for the extension is paid at the time, and is not reflected here. This is residual interest from before the extension.
        loan: {
          id: "0x3-0",
        },
        clearinghouseDaiBalance: newClearinghouseDaiBalance,
        clearinghouseSDaiBalance: newClearinghouseSDaiBalance,
        clearinghouseSDaiInDaiBalance: newClearinghouseSDaiInDaiBalance,
        treasuryDaiBalance: newTreasuryDaiBalance,
        treasurySDaiBalance: newTreasurySDaiBalance,
        treasurySDaiInDaiBalance: newTreasurySDaiInDaiBalance,
      },
    ];

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, subgraphData);

    expect(snapshots.length).toEqual(12);

    // Day 12 should have the loan extended
    const snapshotTwelve = snapshots[11];
    expect(snapshotTwelve.date.toISOString()).toEqual("2023-08-12T23:59:59.999Z");
    expect(snapshotTwelve.principalReceivables).toEqual(LOAN_PRINCIPAL);
    expect(snapshotTwelve.interestReceivables).toEqual(interestDue); // Extension interest already paid

    expect(snapshotTwelve.interestIncome).toEqual(newInterest); // Should reflect the interest paid for the extension
    expect(snapshotTwelve.collateralIncome).toEqual(0);

    expect(Object.values(snapshotTwelve.loans)).toHaveLength(1);
    const snapshotTwelveLoanOne = snapshotTwelve.loans[LOAN_ID];
    expect(snapshotTwelveLoanOne.loanId).toEqual(0);
    expect(snapshotTwelveLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotTwelveLoanOne.interest).toEqual(LOAN_INTEREST + newInterest);
    expect(snapshotTwelveLoanOne.collateralDeposited).toEqual(29);
    expect(snapshotTwelveLoanOne.expiryTimestamp).toEqual(newExpiryTimestamp);
    expect(snapshotTwelveLoanOne.secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotTwelve.date, snapshotTwelveLoanOne.expiryTimestamp),
    );
    expect(snapshotTwelveLoanOne.status).toEqual("Active");
    expect(snapshotTwelveLoanOne.principalPaid).toEqual(0);
    expect(snapshotTwelveLoanOne.interestPaid).toEqual(REPAYMENT_AMOUNT + newInterest); // Should reflect the interest paid for the extension
    expect(snapshotTwelveLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotTwelveLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotTwelveLoanOne.collateralIncome).toEqual(0);
    expect(snapshotTwelve.creationEvents.length).toEqual(0);
    expect(snapshotTwelve.repaymentEvents.length).toEqual(0);
    expect(snapshotTwelve.defaultedClaimEvents.length).toEqual(0);
    expect(snapshotTwelve.extendEvents.length).toEqual(1);
    expect(snapshotTwelve.clearinghouseEvents.length).toEqual(0);
  });

  it("loan repayment, extension, then repayment", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-14");
    const previousDateRecords: Snapshot | null = null;
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
        id: "0x3-0-1233456",
        date: "2023-08-12",
        blockNumber: 1233456,
        blockTimestamp: 1691654400,
        transactionHash: "0x0000002",
        periods: extensionOnePeriods,
        expiryTimestamp: extensionOneExpiryTimestamp,
        interestDue: repaymentOneInterestDueAfter, // Interest for the extension is paid at the time, and is not reflected here. This is residual interest from before the extension.
        loan: {
          id: "0x3-0",
        },
        clearinghouseDaiBalance: extensionOneClearinghouseDaiBalance,
        clearinghouseSDaiBalance: extensionOneClearinghouseSDaiBalance,
        clearinghouseSDaiInDaiBalance: extensionOneClearinghouseSDaiInDaiBalance,
        treasuryDaiBalance: extensionOneTreasuryDaiBalance,
        treasurySDaiBalance: extensionOneTreasurySDaiBalance,
        treasurySDaiInDaiBalance: extensionOneTreasurySDaiInDaiBalance,
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
      },
    ];

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, subgraphData);

    expect(snapshots.length).toEqual(13);

    // Day 13 should have the second payment
    const snapshotThirteen = snapshots[12];
    expect(snapshotThirteen.date.toISOString()).toEqual("2023-08-13T23:59:59.999Z");
    expect(snapshotThirteen.principalReceivables).toEqual(repaymentTwoPrincipalDueAfter); // Updated from repayment
    expect(snapshotThirteen.interestReceivables).toEqual(repaymentTwoInterestDueAfter); // Updated from repayment

    expect(snapshotThirteen.interestIncome).toEqual(repaymentTwoInterestPaid); // Should reflect the interest paid for the repayment
    expect(snapshotThirteen.collateralIncome).toEqual(0);

    expect(Object.values(snapshotThirteen.loans)).toHaveLength(1);
    const snapshotThirteenLoanOne = snapshotThirteen.loans[LOAN_ID];
    expect(snapshotThirteenLoanOne.loanId).toEqual(0);
    expect(snapshotThirteenLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotThirteenLoanOne.interest).toEqual(LOAN_INTEREST + extensionOneAdditionalInterest);
    expect(snapshotThirteenLoanOne.collateralDeposited).toEqual(20); // From repayment
    expect(snapshotThirteenLoanOne.expiryTimestamp).toEqual(extensionOneExpiryTimestamp);
    expect(snapshotThirteenLoanOne.secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotThirteen.date, snapshotThirteenLoanOne.expiryTimestamp),
    );
    expect(snapshotThirteenLoanOne.status).toEqual("Active");
    expect(snapshotThirteenLoanOne.principalPaid).toEqual(repaymentTwoPrincipalPaid);
    expect(snapshotThirteenLoanOne.interestPaid).toEqual(
      REPAYMENT_AMOUNT + extensionOneAdditionalInterest + repaymentTwoInterestPaid,
    );
    expect(snapshotThirteenLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotThirteenLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotThirteenLoanOne.collateralIncome).toEqual(0);
    expect(snapshotThirteen.creationEvents.length).toEqual(0);
    expect(snapshotThirteen.repaymentEvents.length).toEqual(1);
    expect(snapshotThirteen.defaultedClaimEvents.length).toEqual(0);
    expect(snapshotThirteen.extendEvents.length).toEqual(0);
    expect(snapshotThirteen.clearinghouseEvents.length).toEqual(0);
  });

  it("loan repayment then extension x2", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-15");
    const previousDateRecords: Snapshot | null = null;
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
        id: "0x3-0-1233456",
        date: "2023-08-12",
        blockNumber: 1233456,
        blockTimestamp: 1691654400,
        transactionHash: "0x0000002",
        periods: extensionOnePeriods,
        expiryTimestamp: extensionOneExpiryTimestamp,
        interestDue: repaymentOneInterestDueAfter, // Interest for the extension is paid at the time, and is not reflected here. This is residual interest from before the extension.
        loan: {
          id: "0x3-0",
        },
        clearinghouseDaiBalance: extensionOneClearinghouseDaiBalance,
        clearinghouseSDaiBalance: extensionOneClearinghouseSDaiBalance,
        clearinghouseSDaiInDaiBalance: extensionOneClearinghouseSDaiInDaiBalance,
        treasuryDaiBalance: extensionOneTreasuryDaiBalance,
        treasurySDaiBalance: extensionOneTreasurySDaiBalance,
        treasurySDaiInDaiBalance: extensionOneTreasurySDaiInDaiBalance,
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
        id: "0x3-0-1233456",
        date: "2023-08-14",
        blockNumber: 1233456,
        blockTimestamp: 169099400,
        transactionHash: "0x0000002",
        periods: extensionTwoPeriods,
        expiryTimestamp: extensionTwoExpiryTimestamp,
        interestDue: extensionTwoAdditionalInterest, // Interest for the extension is paid at the time, and is not reflected here. This is residual interest from before the extension.
        loan: {
          id: "0x3-0",
        },
        clearinghouseDaiBalance: extensionTwoClearinghouseDaiBalance,
        clearinghouseSDaiBalance: extensionTwoClearinghouseSDaiBalance,
        clearinghouseSDaiInDaiBalance: extensionTwoClearinghouseSDaiInDaiBalance,
        treasuryDaiBalance: extensionTwoTreasuryDaiBalance,
        treasurySDaiBalance: extensionTwoTreasurySDaiBalance,
        treasurySDaiInDaiBalance: extensionTwoTreasurySDaiInDaiBalance,
      },
    ];

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, subgraphData);

    expect(snapshots.length).toEqual(14);

    // Day 14 should have the loan extended the second time
    const snapshotFourteen = snapshots[13];
    expect(snapshotFourteen.date.toISOString()).toEqual("2023-08-14T23:59:59.999Z");
    expect(snapshotFourteen.principalReceivables).toEqual(repaymentTwoPrincipalDueAfter); // Extension does not change the principal due
    expect(snapshotFourteen.interestReceivables).toEqual(repaymentTwoInterestDueAfter); // Extension interest already paid

    expect(snapshotFourteen.interestIncome).toEqual(extensionTwoAdditionalInterest); // Should reflect the interest paid for the extension
    expect(snapshotFourteen.collateralIncome).toEqual(0);

    expect(Object.values(snapshotFourteen.loans)).toHaveLength(1);
    const snapshotFourteenLoanOne = snapshotFourteen.loans[LOAN_ID];
    expect(snapshotFourteenLoanOne.loanId).toEqual(0);
    expect(snapshotFourteenLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotFourteenLoanOne.interest).toEqual(
      LOAN_INTEREST + extensionOneAdditionalInterest + extensionTwoAdditionalInterest,
    );
    expect(snapshotFourteenLoanOne.collateralDeposited).toEqual(20); // From repayment
    expect(snapshotFourteenLoanOne.expiryTimestamp).toEqual(extensionTwoExpiryTimestamp);
    expect(snapshotFourteenLoanOne.secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotFourteen.date, snapshotFourteenLoanOne.expiryTimestamp),
    );
    expect(snapshotFourteenLoanOne.status).toEqual("Active");
    expect(snapshotFourteenLoanOne.principalPaid).toEqual(repaymentTwoPrincipalPaid);
    expect(snapshotFourteenLoanOne.interestPaid).toEqual(
      REPAYMENT_AMOUNT + repaymentTwoInterestPaid + extensionOneAdditionalInterest + extensionTwoAdditionalInterest,
    ); // Should reflect the interest paid for the extension
    expect(snapshotFourteenLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotFourteenLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotFourteenLoanOne.collateralIncome).toEqual(0);
    expect(snapshotFourteen.creationEvents.length).toEqual(0);
    expect(snapshotFourteen.repaymentEvents.length).toEqual(0);
    expect(snapshotFourteen.defaultedClaimEvents.length).toEqual(0);
    expect(snapshotFourteen.extendEvents.length).toEqual(1);
    expect(snapshotFourteen.clearinghouseEvents.length).toEqual(0);
  });

  it("loan extension then repayment, same day", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-13");
    const previousDateRecords: Snapshot | null = null;
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
        id: "0x3-0-1233456",
        date: "2023-08-12",
        blockNumber: 1233456,
        blockTimestamp: 1691654400,
        transactionHash: "0x0000002",
        periods: extensionOnePeriods,
        expiryTimestamp: extensionOneExpiryTimestamp,
        interestDue: repaymentOneInterestDueAfter, // Interest for the extension is paid at the time, and is not reflected here. This is residual interest from before the extension.
        loan: {
          id: "0x3-0",
        },
        clearinghouseDaiBalance: extensionOneClearinghouseDaiBalance,
        clearinghouseSDaiBalance: extensionOneClearinghouseSDaiBalance,
        clearinghouseSDaiInDaiBalance: extensionOneClearinghouseSDaiInDaiBalance,
        treasuryDaiBalance: extensionOneTreasuryDaiBalance,
        treasurySDaiBalance: extensionOneTreasurySDaiBalance,
        treasurySDaiInDaiBalance: extensionOneTreasurySDaiInDaiBalance,
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
      },
    ];

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, subgraphData);

    expect(snapshots.length).toEqual(12);

    // Day 12 should have the second payment
    const snapshotTwelve = snapshots[11];
    expect(snapshotTwelve.date.toISOString()).toEqual("2023-08-12T23:59:59.999Z");
    expect(snapshotTwelve.principalReceivables).toEqual(repaymentTwoPrincipalDueAfter); // Updated from repayment
    expect(snapshotTwelve.interestReceivables).toEqual(repaymentTwoInterestDueAfter); // Updated from repayment

    expect(snapshotTwelve.interestIncome).toEqual(repaymentTwoInterestPaid + extensionOneAdditionalInterest); // Should reflect the interest paid for the repayment and extension
    expect(snapshotTwelve.collateralIncome).toEqual(0);

    expect(Object.values(snapshotTwelve.loans)).toHaveLength(1);
    const snapshotTwelveLoanOne = snapshotTwelve.loans[LOAN_ID];
    expect(snapshotTwelveLoanOne.loanId).toEqual(0);
    expect(snapshotTwelveLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotTwelveLoanOne.interest).toEqual(LOAN_INTEREST + extensionOneAdditionalInterest);
    expect(snapshotTwelveLoanOne.collateralDeposited).toEqual(20); // From repayment
    expect(snapshotTwelveLoanOne.expiryTimestamp).toEqual(extensionOneExpiryTimestamp);
    expect(snapshotTwelveLoanOne.secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotTwelve.date, snapshotTwelveLoanOne.expiryTimestamp),
    );
    expect(snapshotTwelveLoanOne.status).toEqual("Active");
    expect(snapshotTwelveLoanOne.principalPaid).toEqual(repaymentTwoPrincipalPaid);
    expect(snapshotTwelveLoanOne.interestPaid).toEqual(
      REPAYMENT_AMOUNT + extensionOneAdditionalInterest + repaymentTwoInterestPaid,
    );
    expect(snapshotTwelveLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotTwelveLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotTwelveLoanOne.collateralIncome).toEqual(0);
    expect(snapshotTwelve.creationEvents.length).toEqual(0);
    expect(snapshotTwelve.repaymentEvents.length).toEqual(1);
    expect(snapshotTwelve.defaultedClaimEvents.length).toEqual(0);
    expect(snapshotTwelve.extendEvents.length).toEqual(1);
    expect(snapshotTwelve.clearinghouseEvents.length).toEqual(0);

    // Clearinghouse and treasury balances should have the new balance from the latest event in the day - repayment
    expect(snapshotTwelve.clearinghouse.daiBalance).toEqual(repaymentTwoClearinghouseDaiBalance);
    expect(snapshotTwelve.clearinghouse.sDaiBalance).toEqual(repaymentTwoClearinghouseSDaiBalance);
    expect(snapshotTwelve.clearinghouse.sDaiInDaiBalance).toEqual(repaymentTwoClearinghouseSDaiInDaiBalance);
    expect(snapshotTwelve.treasury.daiBalance).toEqual(repaymentTwoTreasuryDaiBalance);
    expect(snapshotTwelve.treasury.sDaiBalance).toEqual(repaymentTwoTreasurySDaiBalance);
    expect(snapshotTwelve.treasury.sDaiInDaiBalance).toEqual(repaymentTwoTreasurySDaiInDaiBalance);
  });

  it("loan repayment then extension, same day", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-13");
    const previousDateRecords: Snapshot | null = null;
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
        id: "0x3-0-1233456",
        date: "2023-08-12",
        blockNumber: 1233456,
        blockTimestamp: 1691654401,
        transactionHash: "0x0000002",
        periods: extensionOnePeriods,
        expiryTimestamp: extensionOneExpiryTimestamp,
        interestDue: repaymentOneInterestDueAfter, // Interest for the extension is paid at the time, and is not reflected here. This is residual interest from before the extension.
        loan: {
          id: "0x3-0",
        },
        clearinghouseDaiBalance: extensionOneClearinghouseDaiBalance,
        clearinghouseSDaiBalance: extensionOneClearinghouseSDaiBalance,
        clearinghouseSDaiInDaiBalance: extensionOneClearinghouseSDaiInDaiBalance,
        treasuryDaiBalance: extensionOneTreasuryDaiBalance,
        treasurySDaiBalance: extensionOneTreasurySDaiBalance,
        treasurySDaiInDaiBalance: extensionOneTreasurySDaiInDaiBalance,
      },
    ];

    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, subgraphData);

    expect(snapshots.length).toEqual(12);

    // Day 12 should have the second payment
    const snapshotTwelve = snapshots[11];
    expect(snapshotTwelve.date.toISOString()).toEqual("2023-08-12T23:59:59.999Z");
    expect(snapshotTwelve.principalReceivables).toEqual(repaymentTwoPrincipalDueAfter); // Updated from repayment
    expect(snapshotTwelve.interestReceivables).toEqual(repaymentTwoInterestDueAfter); // Updated from repayment

    expect(snapshotTwelve.interestIncome).toEqual(repaymentTwoInterestPaid + extensionOneAdditionalInterest); // Should reflect the interest paid for the repayment and extension
    expect(snapshotTwelve.collateralIncome).toEqual(0);

    expect(Object.values(snapshotTwelve.loans)).toHaveLength(1);
    const snapshotTwelveLoanOne = snapshotTwelve.loans[LOAN_ID];
    expect(snapshotTwelveLoanOne.loanId).toEqual(0);
    expect(snapshotTwelveLoanOne.principal).toEqual(LOAN_PRINCIPAL);
    expect(snapshotTwelveLoanOne.interest).toEqual(LOAN_INTEREST + extensionOneAdditionalInterest);
    expect(snapshotTwelveLoanOne.collateralDeposited).toEqual(20); // From repayment
    expect(snapshotTwelveLoanOne.expiryTimestamp).toEqual(extensionOneExpiryTimestamp);
    expect(snapshotTwelveLoanOne.secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotTwelve.date, snapshotTwelveLoanOne.expiryTimestamp),
    );
    expect(snapshotTwelveLoanOne.status).toEqual("Active");
    expect(snapshotTwelveLoanOne.principalPaid).toEqual(repaymentTwoPrincipalPaid);
    expect(snapshotTwelveLoanOne.interestPaid).toEqual(
      REPAYMENT_AMOUNT + extensionOneAdditionalInterest + repaymentTwoInterestPaid,
    );
    expect(snapshotTwelveLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotTwelveLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotTwelveLoanOne.collateralIncome).toEqual(0);
    expect(snapshotTwelve.creationEvents.length).toEqual(0);
    expect(snapshotTwelve.repaymentEvents.length).toEqual(1);
    expect(snapshotTwelve.defaultedClaimEvents.length).toEqual(0);
    expect(snapshotTwelve.extendEvents.length).toEqual(1);
    expect(snapshotTwelve.clearinghouseEvents.length).toEqual(0);

    // Clearinghouse and treasury balances should have the new balance from the latest event in the day - extension
    expect(snapshotTwelve.clearinghouse.daiBalance).toEqual(extensionOneClearinghouseDaiBalance);
    expect(snapshotTwelve.clearinghouse.sDaiBalance).toEqual(extensionOneClearinghouseSDaiBalance);
    expect(snapshotTwelve.clearinghouse.sDaiInDaiBalance).toEqual(extensionOneClearinghouseSDaiInDaiBalance);
    expect(snapshotTwelve.treasury.daiBalance).toEqual(extensionOneTreasuryDaiBalance);
    expect(snapshotTwelve.treasury.sDaiBalance).toEqual(extensionOneTreasurySDaiBalance);
    expect(snapshotTwelve.treasury.sDaiInDaiBalance).toEqual(extensionOneTreasurySDaiInDaiBalance);
  });
});
