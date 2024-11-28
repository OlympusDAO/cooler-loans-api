import { Snapshot } from "@repo/types/snapshot";
import { generateSnapshots } from "../snapshot";
import { ClearinghouseEvents } from "../types";
import { LoanSnapshotMap } from "@repo/types/loanSnapshot";
import { ClearinghouseSnapshot, CoolerLoan } from "@repo/subgraph-cache-types";
import { DAI_ADDRESS, USDS_ADDRESS, SDAI_ADDRESS, SUSDS_ADDRESS } from "../constants";
import { throwError } from "@repo/shared/logging";

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

const LOAN_REPAYMENT_TIMESTAMP = 1691654400;
const REPAYMENT_AMOUNT = 900;
const CLEARINGHOUSE_DAI_BALANCE_AFTER_REPAYMENT = 20.0;
const CLEARINGHOUSE_SDAI_BALANCE_AFTER_REPAYMENT = 499800.0;
const CLEARINGHOUSE_SDAI_IN_DAI_BALANCE_AFTER_REPAYMENT = 499900.0;
const TREASURY_DAI_BALANCE_AFTER_REPAYMENT = 22.1;
const TREASURY_SDAI_BALANCE_AFTER_REPAYMENT = 22.2;
const TREASURY_SDAI_IN_DAI_BALANCE_AFTER_REPAYMENT = 22.3;

const LOAN_DEFAULT_TIMESTAMP = 169166000;
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
const CLEARINGHOUSE_COLLATERAL_ADDRESS = "0x04";
const CLEARINGHOUSE_ADDRESS = "0x02";
const CLEARINGHOUSE_CREATION_BLOCK = "12000";
const CLEARINGHOUSE_CREATION_TIMESTAMP = 1690876800;

const CLEARINGHOUSE_SNAPSHOT_ID = "2023-08-01-creation";

const TREASURY_DAI_BALANCE = 1000;
const TREASURY_SDAI_BALANCE = 1500;
const TREASURY_SDAI_IN_DAI_BALANCE = 1600;

const getLoanData = (): CoolerLoan => {
  return {
    __typename: "Loan",
    id: LOAN_ID,
    createdBlock: "12223",
    createdTransaction: "0x0000001",
    // 2023-08-01
    createdTimestamp: LOAN_CREATION_TIMESTAMP.toString(),
    loanId: "0",
    borrower: "0x01",
    clearinghouse: {
      __typename: "Clearinghouse",
      id: CLEARINGHOUSE_ADDRESS,
    },
    cooler: "0x03",
    interest: LOAN_INTEREST.toString(),
    principal: LOAN_PRINCIPAL.toString(),
    collateral: LOAN_INITIAL_COLLATERAL.toString(),
    // 2023-09-10
    expiryTimestamp: "1694332800",
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
    clearinghouses: {
      [CLEARINGHOUSE_ADDRESS]: {
        __typename: "Clearinghouse",
        id: CLEARINGHOUSE_ADDRESS,
        duration: CLEARINGHOUSE_DURATION_SECONDS.toString(),
        interestRate: CLEARINGHOUSE_INTEREST_RATE.toString(),
        loanToCollateral: CLEARINGHOUSE_LOAN_TO_COLLATERAL.toString(),
        fundAmount: CLEARINGHOUSE_FUND_AMOUNT.toString(),
        fundCadence: CLEARINGHOUSE_FUND_CADENCE.toString(),
        coolerFactoryAddress: CLEARINGHOUSE_COOLER_FACTORY_ADDRESS,
        collateralToken: CLEARINGHOUSE_COLLATERAL_ADDRESS,
        collateralTokenDecimals: 18,
        reserveToken: DAI_ADDRESS,
        reserveTokenDecimals: 18,
        sReserveToken: SDAI_ADDRESS,
        sReserveTokenDecimals: 18,
        createdBlock: CLEARINGHOUSE_CREATION_BLOCK,
        createdTimestamp: CLEARINGHOUSE_CREATION_TIMESTAMP.toString(),
        address: CLEARINGHOUSE_ADDRESS,
        version: "1",
        singleton: {
          __typename: "Singleton",
          id: "0x0000000000000000000000000000000000000000",
        },
        loans: [],
        snapshots: [],
        dt: "2023-08-01",
      },
    },
    clearinghouseSnapshots: {
      "2023-08-01": [
        getClearinghouseSnapshot(
          CLEARINGHOUSE_SNAPSHOT_ID,
          "2023-08-01",
          LOAN_CREATION_TIMESTAMP,
          100000,
          5000,
          CLEARINGHOUSE_DAI_BALANCE_AFTER_CREATION,
          CLEARINGHOUSE_SDAI_BALANCE_AFTER_CREATION,
          CLEARINGHOUSE_SDAI_IN_DAI_BALANCE_AFTER_CREATION,
          TREASURY_DAI_BALANCE_AFTER_CREATION,
          TREASURY_SDAI_BALANCE_AFTER_CREATION,
          TREASURY_SDAI_IN_DAI_BALANCE_AFTER_CREATION,
        ),
      ],
      "2023-08-10": [
        getClearinghouseSnapshot(
          "2023-08-10-repayment",
          "2023-08-10",
          LOAN_REPAYMENT_TIMESTAMP,
          0, // TODO correct?
          0, // TODO correct?
          CLEARINGHOUSE_DAI_BALANCE_AFTER_REPAYMENT,
          CLEARINGHOUSE_SDAI_BALANCE_AFTER_REPAYMENT,
          CLEARINGHOUSE_SDAI_IN_DAI_BALANCE_AFTER_REPAYMENT,
          TREASURY_DAI_BALANCE_AFTER_REPAYMENT,
          TREASURY_SDAI_BALANCE_AFTER_REPAYMENT,
          TREASURY_SDAI_IN_DAI_BALANCE_AFTER_REPAYMENT,
        ),
      ],
      "2023-08-20": [
        getClearinghouseSnapshot(
          "12255",
          "2023-08-20",
          100000,
          20000000.01,
          6000,
          9000000.0,
          500000.0,
          600000.01,
          1100,
          1700,
          1800,
        ),
      ],
      "2023-09-12": [
        getClearinghouseSnapshot(
          "2023-09-12-default",
          "2023-09-12",
          LOAN_DEFAULT_TIMESTAMP,
          0, // TODO correct?
          0, // TODO correct?
          0,
          0,
          0,
          0,
          0,
          0,
        ),
      ],
    },
    creationEvents: {
      "2023-08-01": [
        {
          __typename: "ClearLoanRequestEvent",
          id: "0x3-0",
          date: "2023-08-01",
          blockTimestamp: LOAN_CREATION_TIMESTAMP.toString(),
          blockNumber: "12223",
          transactionHash: "0x0000001",
          loan: {
            __typename: "Loan",
            id: LOAN_ID,
          },
          dt: "2023-08-01",
          request: {
            __typename: "",
            id: "",
          },
          clearinghouseSnapshot: {
            __typename: "ClearinghouseSnapshot",
            id: CLEARINGHOUSE_SNAPSHOT_ID,
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
          blockNumber: "1233455",
          transactionHash: "0x0000002",
          principalPayable: (
            LOAN_PRINCIPAL -
            (REPAYMENT_AMOUNT * LOAN_PRINCIPAL) / (LOAN_PRINCIPAL + LOAN_INTEREST)
          ).toString(),
          interestPayable: (
            LOAN_INTEREST -
            (REPAYMENT_AMOUNT * LOAN_INTEREST) / (LOAN_PRINCIPAL + LOAN_INTEREST)
          ).toString(),
          blockTimestamp: LOAN_REPAYMENT_TIMESTAMP.toString(),
          secondsToExpiry: (1694332800 - LOAN_REPAYMENT_TIMESTAMP).toString(),
          amountPaid: REPAYMENT_AMOUNT.toString(),
          collateralDeposited: "29",
          loan: {
            __typename: "Loan",
            id: LOAN_ID,
          },
          clearinghouseSnapshot: {
            __typename: "ClearinghouseSnapshot",
            id: "2023-08-10-repayment",
          },
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
          blockNumber: "1233455",
          blockTimestamp: LOAN_DEFAULT_TIMESTAMP.toString(),
          transactionHash: "0x0000003",
          secondsSinceExpiry: "5000",
          collateralQuantityClaimed: COLLATERAL_CLAIM_QUANTITY.toString(),
          collateralPrice: COLLATERAL_PRICE.toString(),
          collateralValueClaimed: COLLATERAL_CLAIM_VALUE.toString(),
          loan: {
            __typename: "Loan",
            id: LOAN_ID,
          },
          clearinghouseSnapshot: {
            __typename: "ClearinghouseSnapshot",
            id: "2023-09-12-default",
          },
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
          id: LOAN_ID,
          createdBlock: "12223",
          createdTimestamp: LOAN_CREATION_TIMESTAMP.toString(),
          createdTransaction: "0x0000001",
          cooler: "0x03",
          requestId: "0",
          borrower: "0x01",
          collateralToken: CLEARINGHOUSE_COLLATERAL_ADDRESS,
          debtToken: DAI_ADDRESS,
          amount: LOAN_PRINCIPAL.toString(),
          interestPercentage: CLEARINGHOUSE_INTEREST_RATE.toString(),
          loanToCollateralRatio: CLEARINGHOUSE_LOAN_TO_COLLATERAL.toString(),
          durationSeconds: CLEARINGHOUSE_DURATION_SECONDS.toString(),
          isRescinded: false,
          requestEvents: [],
          rescindEvents: [],
          clearEvents: [],
          loans: [],
          dt: "2023-08-01",
        },
      },
    },
    rebalanceEvents: {},
  };
};

const getClearinghouseSnapshot = (
  id: string,
  date: string,
  blockTimestamp: number,
  principalReceivables: number,
  interestReceivables: number,
  reserveBalance: number,
  sReserveBalance: number,
  sReserveInReserveBalance: number,
  treasuryReserveBalance: number,
  treasurySReserveBalance: number,
  treasurySReserveInReserveBalance: number,
  reserveToken: string = DAI_ADDRESS,
  sReserveToken: string = SDAI_ADDRESS,
  clearinghouseAddress: string = CLEARINGHOUSE_ADDRESS,
): ClearinghouseSnapshot => {
  return {
    __typename: "ClearinghouseSnapshot",
    id,
    date,
    blockNumber: "1233456",
    blockTimestamp: blockTimestamp.toString(),
    transactionHash: "0x0000002",
    clearinghouse: {
      __typename: "Clearinghouse",
      id: clearinghouseAddress,
    },
    isActive: true,
    nextRebalanceTimestamp: "1694332800",
    principalReceivables: principalReceivables.toString(),
    interestReceivables: interestReceivables.toString(),
    reserveToken: reserveToken,
    sReserveToken: sReserveToken,
    reserveBalance: reserveBalance.toString(),
    sReserveBalance: sReserveBalance.toString(),
    sReserveInReserveBalance: sReserveInReserveBalance.toString(),
    treasuryReserveBalance: treasuryReserveBalance.toString(),
    treasurySReserveBalance: treasurySReserveBalance.toString(),
    treasurySReserveInReserveBalance: treasurySReserveInReserveBalance.toString(),
    rebalanceEvents: [],
    defundEvents: [],
    creationEvents: [],
    defaultedClaimEvents: [],
    repaymentEvents: [],
    extendEvents: [],
    dt: date,
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
  usdsBalance: number;
  sUsdsBalance: number;
  sUsdsInUsdsBalance: number;
};

const assertClearinghouseSnapshots = (
  snapshot: Snapshot,
  balances: ClearinghouseBalance[],
  tokens: Record<string, string> = {
    [CLEARINGHOUSE_ADDRESS]: DAI_ADDRESS,
  },
) => {
  // Check the clearinghouse balances
  const clearinghouseSnapshots = snapshot.clearinghouses;
  expect(clearinghouseSnapshots).toHaveLength(balances.length);
  for (let i = 0; i < clearinghouseSnapshots.length; i++) {
    const clearinghouseSnapshot = clearinghouseSnapshots[i];
    const balance = balances[i];

    // Get the expected reserve token
    const reserveToken = tokens[clearinghouseSnapshot.address];

    // Check balances
    if (reserveToken.toLowerCase() === DAI_ADDRESS.toLowerCase()) {
      expect(clearinghouseSnapshot.reserveBalance).toEqual(balance.daiBalance);
      expect(clearinghouseSnapshot.sReserveBalance).toEqual(balance.sDaiBalance);
      expect(clearinghouseSnapshot.sReserveInReserveBalance).toEqual(balance.sDaiInDaiBalance);
    } else if (reserveToken.toLowerCase() === USDS_ADDRESS.toLowerCase()) {
      expect(clearinghouseSnapshot.reserveBalance).toEqual(balance.usdsBalance);
      expect(clearinghouseSnapshot.sReserveBalance).toEqual(balance.sUsdsBalance);
      expect(clearinghouseSnapshot.sReserveInReserveBalance).toEqual(balance.sUsdsInUsdsBalance);
    } else {
      throwError(`Unknown reserve token ${reserveToken} for clearinghouse ${clearinghouseSnapshot.address}`);
    }

    expect(clearinghouseSnapshot.fundAmount).toEqual(CLEARINGHOUSE_FUND_AMOUNT);
    expect(clearinghouseSnapshot.fundCadence).toEqual(CLEARINGHOUSE_FUND_CADENCE);
    expect(clearinghouseSnapshot.coolerFactoryAddress).toEqual(CLEARINGHOUSE_COOLER_FACTORY_ADDRESS);
    expect(clearinghouseSnapshot.collateralAddress).toEqual(CLEARINGHOUSE_COLLATERAL_ADDRESS);
    expect(clearinghouseSnapshot.debtAddress).toEqual(reserveToken);
  }

  // Check the total
  const clearinghouseTotals = snapshot.clearinghouseTotals;
  expect(clearinghouseTotals.daiBalance).toEqual(balances.reduce((acc, balance) => acc + balance.daiBalance, 0));
  expect(clearinghouseTotals.sDaiBalance).toEqual(balances.reduce((acc, balance) => acc + balance.sDaiBalance, 0));
  expect(clearinghouseTotals.sDaiInDaiBalance).toEqual(
    balances.reduce((acc, balance) => acc + balance.sDaiInDaiBalance, 0),
  );
  expect(clearinghouseTotals.usdsBalance).toEqual(balances.reduce((acc, balance) => acc + balance.usdsBalance, 0));
  expect(clearinghouseTotals.sUsdsBalance).toEqual(balances.reduce((acc, balance) => acc + balance.sUsdsBalance, 0));
  expect(clearinghouseTotals.sUsdsInUsdsBalance).toEqual(
    balances.reduce((acc, balance) => acc + balance.sUsdsInUsdsBalance, 0),
  );
};

const assertTreasurySnapshot = (
  snapshot: Snapshot,
  daiBalance: number,
  sDaiBalance: number,
  sDaiInDaiBalance: number,
  usdsBalance: number = 0,
  sUsdsBalance: number = 0,
  sUsdsInUsdsBalance: number = 0,
) => {
  expect(snapshot.treasury.daiBalance).toEqual(daiBalance);
  expect(snapshot.treasury.sDaiBalance).toEqual(sDaiBalance);
  expect(snapshot.treasury.sDaiInDaiBalance).toEqual(sDaiInDaiBalance);
  expect(snapshot.treasury.usdsBalance).toEqual(usdsBalance);
  expect(snapshot.treasury.sUsdsBalance).toEqual(sUsdsBalance);
  expect(snapshot.treasury.sUsdsInUsdsBalance).toEqual(sUsdsInUsdsBalance);
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
      clearinghouses: {},
      rebalanceEvents: {},
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
      clearinghouses: {},
      rebalanceEvents: {},
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
        usdsBalance: 0,
        sUsdsBalance: 0,
        sUsdsInUsdsBalance: 0,
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
        usdsBalance: 0,
        sUsdsBalance: 0,
        sUsdsInUsdsBalance: 0,
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
    const clearinghouseSnapshotTwoId = "12224";
    const loanTwoId = "0x3-1";
    const loanTwoCreationTimestamp = 1690876800;
    const loanTwoPrincipal = 10000;
    const loanTwoInterest = 500;
    const loanTwoClearinghouseDaiBalance = 99.9;
    const loanTwoClearinghouseSDaiBalance = 100.5;
    const loanTwoClearinghouseSDaiInDaiBalance = 100.6;
    const loanTwoTreasuryDaiBalance = 77.7;
    const loanTwoTreasurySDaiBalance = 77.8;
    const loanTwoTreasurySDaiInDaiBalance = 77.9;
    subgraphData.clearinghouseSnapshots["2023-08-02"] = [
      ...(subgraphData.clearinghouseSnapshots["2023-08-02"] || []),
      getClearinghouseSnapshot(
        clearinghouseSnapshotTwoId,
        "2023-08-02",
        loanTwoCreationTimestamp,
        0, // principalReceivables
        0, // interestReceivables
        loanTwoClearinghouseDaiBalance,
        loanTwoClearinghouseSDaiBalance,
        loanTwoClearinghouseSDaiInDaiBalance,
        loanTwoTreasuryDaiBalance,
        loanTwoTreasurySDaiBalance,
        loanTwoTreasurySDaiInDaiBalance,
      ),
    ];
    subgraphData.creationEvents["2023-08-02"] = [
      ...(subgraphData.creationEvents["2023-08-02"] || []),
      {
        __typename: "CreationEvent",
        id: loanTwoId,
        date: "2023-08-02",
        blockTimestamp: loanTwoCreationTimestamp.toString(),
        blockNumber: "12223",
        transactionHash: "0x0000001",
        loan: {
          __typename: "Loan",
          id: loanTwoId,
        },
        request: {
          __typename: "LoanRequest",
          id: loanTwoId,
        },
        dt: "2023-08-02",
        clearinghouseSnapshot: {
          __typename: "ClearinghouseSnapshot",
          id: clearinghouseSnapshotTwoId,
        },
      },
    ];
    subgraphData.createdLoans["2023-08-02"] = {
      ...(subgraphData.createdLoans["2023-08-02"] || {}),
      [loanTwoId]: {
        __typename: "Loan",
        id: loanTwoId,
        createdBlock: "12223",
        createdTransaction: "0x0000001",
        createdTimestamp: loanTwoCreationTimestamp.toString(),
        loanId: "1",
        borrower: "0x01",
        clearinghouse: {
          __typename: "Clearinghouse",
          id: CLEARINGHOUSE_ADDRESS,
        },
        cooler: "0x03",
        interest: loanTwoInterest.toString(),
        principal: loanTwoPrincipal.toString(),
        collateral: "30",
        // 2023-09-11
        expiryTimestamp: "1694246400",
        hasCallback: false,
        request: {
          __typename: "LoanRequest",
          id: loanTwoId,
        },
        creationEvents: [],
        repaymentEvents: [],
        defaultedClaimEvents: [],
        extendEvents: [],
        dt: "2023-08-02",
      },
    };
    subgraphData.loanRequests["2023-08-02"] = {
      ...(subgraphData.loanRequests["2023-08-02"] || {}),
      [loanTwoId]: {
        __typename: "LoanRequest",
        id: loanTwoId,
        createdBlock: "12223",
        createdTimestamp: loanTwoCreationTimestamp.toString(),
        createdTransaction: "0x0000001",
        cooler: "0x03",
        requestId: "1",
        borrower: "0x01",
        collateralToken: CLEARINGHOUSE_COLLATERAL_ADDRESS,
        debtToken: DAI_ADDRESS,
        amount: loanTwoPrincipal.toString(),
        interestPercentage: CLEARINGHOUSE_INTEREST_RATE.toString(),
        loanToCollateralRatio: CLEARINGHOUSE_LOAN_TO_COLLATERAL.toString(),
        durationSeconds: CLEARINGHOUSE_DURATION_SECONDS.toString(),
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
    subgraphData.repaymentEvents["2023-08-10"][0].amountPaid = loanOneAmountPaid.toString();

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
    const snapshotTwoLoanTwo = snapshotTwoLoans[loanTwoId];
    expect(snapshotTwoLoanTwo.id).toEqual(loanTwoId);
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
    const snapshotTenLoanTwo = snapshotTenLoans[loanTwoId];
    expect(snapshotTenLoanTwo.id).toEqual(loanTwoId);

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
        usdsBalance: 0,
        sUsdsBalance: 0,
        sUsdsInUsdsBalance: 0,
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
        usdsBalance: 0,
        sUsdsBalance: 0,
        sUsdsInUsdsBalance: 0,
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

    const clearinghouseSnapshotTwoId = "0x0123465";
    const repaymentTimestamp = 1691654400;
    const clearinghouseDaiBalance = 21.0;
    const clearinghouseSDaiBalance = 22.0;
    const clearinghouseSDaiInDaiBalance = 23.0;
    const treasuryDaiBalance = 24.0;
    const treasurySDaiBalance = 25.0;
    const treasurySDaiInDaiBalance = 26.0;

    const subgraphData = getSampleData();
    subgraphData.clearinghouseSnapshots["2023-08-12"] = [
      ...(subgraphData.clearinghouseSnapshots["2023-08-12"] || []),
      getClearinghouseSnapshot(
        clearinghouseSnapshotTwoId,
        "2023-08-12",
        repaymentTimestamp,
        0,
        0,
        clearinghouseDaiBalance,
        clearinghouseSDaiBalance,
        clearinghouseSDaiInDaiBalance,
        treasuryDaiBalance,
        treasurySDaiBalance,
        treasurySDaiInDaiBalance,
      ),
    ];
    subgraphData.repaymentEvents["2023-08-12"] = [
      ...(subgraphData.repaymentEvents["2023-08-12"] || []),
      {
        __typename: "RepayLoanEvent",
        id: "0x3-0-1233456",
        date: "2023-08-12",
        blockNumber: "1233456",
        transactionHash: "0x0000002",
        principalPayable: "100000", // Unused
        interestPayable: "1000", // Unused
        blockTimestamp: repaymentTimestamp.toString(),
        secondsToExpiry: (1694332800 - repaymentTimestamp).toString(),
        amountPaid: repaymentAmountTwo.toString(),
        collateralDeposited: "0",
        loan: {
          __typename: "CoolerLoan",
          id: LOAN_ID,
        },
        clearinghouseSnapshot: {
          __typename: "ClearinghouseSnapshot",
          id: clearinghouseSnapshotTwoId,
        },
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
        usdsBalance: 0,
        sUsdsBalance: 0,
        sUsdsInUsdsBalance: 0,
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
        usdsBalance: 0,
        sUsdsBalance: 0,
        sUsdsInUsdsBalance: 0,
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
        usdsBalance: 0,
        sUsdsBalance: 0,
        sUsdsInUsdsBalance: 0,
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
        usdsBalance: 0,
        sUsdsBalance: 0,
        sUsdsInUsdsBalance: 0,
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
      clearinghouses: {},
      rebalanceEvents: {},
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
        usdsBalance: 0,
        sUsdsBalance: 0,
        sUsdsInUsdsBalance: 0,
      },
      clearinghouses: [
        {
          reserveBalance: 12345,
          sReserveBalance: 56789,
          sReserveInReserveBalance: 101010,
          address: CLEARINGHOUSE_ADDRESS,
          fundAmount: CLEARINGHOUSE_FUND_AMOUNT,
          fundCadence: CLEARINGHOUSE_FUND_CADENCE,
          coolerFactoryAddress: CLEARINGHOUSE_COOLER_FACTORY_ADDRESS,
          collateralAddress: CLEARINGHOUSE_COLLATERAL_ADDRESS,
          debtAddress: DAI_ADDRESS,
        },
      ],
      treasury: {
        daiBalance: 111111,
        sDaiBalance: 3333,
        sDaiInDaiBalance: 4444,
        usdsBalance: 0,
        sUsdsBalance: 0,
        sUsdsInUsdsBalance: 0,
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
      clearinghouses: {},
      rebalanceEvents: {},
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
        usdsBalance: 0,
        sUsdsBalance: 0,
        sUsdsInUsdsBalance: 0,
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

    const clearinghouseSnapshotTwoId = "0x009120932109312";
    const repaymentTimestamp = 1691654400;
    const clearinghouseDaiBalance = 21.0;
    const clearinghouseSDaiBalance = 22.0;
    const clearinghouseSDaiInDaiBalance = 23.0;
    const treasuryDaiBalance = 24.0;
    const treasurySDaiBalance = 25.0;
    const treasurySDaiInDaiBalance = 26.0;

    // Add a partial repayment that reduces the principal outstanding
    const repaymentAmountTwo = LOAN_INTEREST - REPAYMENT_AMOUNT + 1000;
    subgraphData.repaymentEvents["2023-08-12"] = [
      ...(subgraphData.repaymentEvents["2023-08-12"] || []),
      {
        __typename: "RepayLoanEvent",
        id: "0x3-0-1233456",
        date: "2023-08-12",
        blockNumber: "1233456",
        transactionHash: "0x0000002",
        principalPayable: "100000", // Unused
        interestPayable: "1000", // Unused
        blockTimestamp: repaymentTimestamp.toString(),
        secondsToExpiry: (1694332800 - repaymentTimestamp).toString(),
        amountPaid: repaymentAmountTwo.toString(),
        collateralDeposited: "0",
        loan: {
          __typename: "Loan",
          id: LOAN_ID,
        },
        dt: "2023-08-12",
        clearinghouseSnapshot: {
          __typename: "ClearinghouseSnapshot",
          id: clearinghouseSnapshotTwoId,
        },
      },
    ];
    subgraphData.clearinghouseSnapshots["2023-08-12"] = [
      ...(subgraphData.clearinghouseSnapshots["2023-08-12"] || []),
      getClearinghouseSnapshot(
        clearinghouseSnapshotTwoId,
        "2023-08-12",
        repaymentTimestamp,
        0,
        0,
        clearinghouseDaiBalance,
        clearinghouseSDaiBalance,
        clearinghouseSDaiInDaiBalance,
        treasuryDaiBalance,
        treasurySDaiBalance,
        treasurySDaiInDaiBalance,
      ),
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
    const loanTwoId = "0x3-1";
    const loanTwoCreationTimestamp = 1690876800;
    const loanTwoPrincipal = 10000;
    const loanTwoInterest = 500;
    const loanTwoCollateral = 10;
    const clearinghouseSnapshotTwoId = "0x009120932109312";
    const loanTwoClearinghouseDaiBalance = 999.9;
    const loanTwoClearinghouseSDaiBalance = 1000;
    const loanTwoClearinghouseSDaiInDaiBalance = 1000.1;
    const loanTwoTreasuryDaiBalance = 888.1;
    const loanTwoTreasurySDaiBalance = 888.2;
    const loanTwoTreasurySDaiInDaiBalance = 888.3;

    const loanTwo: CoolerLoan = {
      __typename: "CoolerLoan",
      id: loanTwoId,
      createdBlock: "12223",
      createdTransaction: "0x0000001",
      // 2023-08-02
      createdTimestamp: loanTwoCreationTimestamp.toString(),
      loanId: "1",
      borrower: "0x01",
      clearinghouse: {
        __typename: "Clearinghouse",
        id: CLEARINGHOUSE_ADDRESS,
      },
      cooler: "0x03",
      interest: loanTwoInterest.toString(),
      principal: loanTwoPrincipal.toString(),
      collateral: loanTwoCollateral.toString(),
      // 2023-09-11
      expiryTimestamp: "1694246400",
      hasCallback: false,
      request: {
        __typename: "LoanRequest",
        id: loanTwoId,
      },
      dt: "2023-08-02",
      creationEvents: [],
      repaymentEvents: [],
      defaultedClaimEvents: [],
      extendEvents: [],
    };
    subgraphData.clearinghouseSnapshots["2023-08-02"] = [
      ...(subgraphData.clearinghouseSnapshots["2023-08-02"] || []),
      getClearinghouseSnapshot(
        clearinghouseSnapshotTwoId,
        "2023-08-02",
        loanTwoCreationTimestamp,
        0,
        0,
        loanTwoClearinghouseDaiBalance,
        loanTwoClearinghouseSDaiBalance,
        loanTwoClearinghouseSDaiInDaiBalance,
        loanTwoTreasuryDaiBalance,
        loanTwoTreasurySDaiBalance,
        loanTwoTreasurySDaiInDaiBalance,
      ),
    ];
    subgraphData.creationEvents["2023-08-02"] = [
      ...(subgraphData.creationEvents["2023-08-02"] || []),
      {
        __typename: "CreationEvent",
        id: loanTwoId,
        date: "2023-08-02",
        blockTimestamp: loanTwoCreationTimestamp.toString(),
        blockNumber: "12223",
        transactionHash: "0x0000001",
        loan: {
          __typename: "Loan",
          id: loanTwoId,
        },
        request: {
          __typename: "LoanRequest",
          id: loanTwoId,
        },
        dt: "2023-08-02",
        clearinghouseSnapshot: {
          __typename: "ClearinghouseSnapshot",
          id: clearinghouseSnapshotTwoId,
        },
      },
    ];
    subgraphData.createdLoans["2023-08-02"] = {
      ...(subgraphData.createdLoans["2023-08-02"] || {}),
      [loanTwoId]: loanTwo,
    };
    subgraphData.loanRequests["2023-08-02"] = {
      ...(subgraphData.loanRequests["2023-08-02"] || {}),
      [loanTwoId]: {
        __typename: "LoanRequest",
        id: loanTwoId,
        createdBlock: "12223",
        createdTransaction: "0x0000001",
        createdTimestamp: loanTwoCreationTimestamp.toString(),
        cooler: "0x03",
        requestId: "1",
        borrower: "0x01",
        collateralToken: CLEARINGHOUSE_COLLATERAL_ADDRESS,
        debtToken: DAI_ADDRESS,
        interestPercentage: CLEARINGHOUSE_INTEREST_RATE.toString(),
        durationSeconds: CLEARINGHOUSE_DURATION_SECONDS.toString(),
        amount: loanTwoPrincipal.toString(),
        loanToCollateralRatio: CLEARINGHOUSE_LOAN_TO_COLLATERAL.toString(),
        isRescinded: false,
        requestEvents: [],
        rescindEvents: [],
        clearEvents: [],
        loans: [],
        dt: "2023-08-02",
      },
    };

    // Add a second default claim on the same day
    const collateralClaimTimestamp = 1691654400;
    const collateralClaimClearinghouseSnapshotId = "098098098098";
    const loanTwoCollateralClaimed = loanTwoCollateral * COLLATERAL_PRICE;
    subgraphData.clearinghouseSnapshots["2023-09-12"] = [
      ...(subgraphData.clearinghouseSnapshots["2023-09-12"] || []),
      getClearinghouseSnapshot(
        collateralClaimClearinghouseSnapshotId,
        "2023-09-12",
        collateralClaimTimestamp,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ),
    ];
    subgraphData.defaultedClaimEvents["2023-09-12"] = [
      ...(subgraphData.defaultedClaimEvents["2023-09-12"] || []),
      {
        __typename: "ClaimDefaultedLoanEvent",
        id: "0x3-1-1691654400",
        date: "2023-09-12",
        blockNumber: "1233455",
        blockTimestamp: collateralClaimTimestamp.toString(),
        transactionHash: "0x0000003",
        secondsSinceExpiry: "5000",
        collateralQuantityClaimed: loanTwoCollateral.toString(),
        collateralPrice: COLLATERAL_PRICE.toString(),
        collateralValueClaimed: loanTwoCollateralClaimed.toString(),
        loan: loanTwo,
        dt: "2023-09-12",
        clearinghouseSnapshot: {
          __typename: "ClearinghouseSnapshot",
          id: collateralClaimClearinghouseSnapshotId,
        },
      },
    ];

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
    const clearinghouseSnapshotTwoId = "0x009120932109312";
    const extensionTimestamp = 1691654400;
    const newClearinghouseDaiBalance = 200;
    const newClearinghouseSDaiBalance = 200.1;
    const newClearinghouseSDaiInDaiBalance = 200.2;
    const newTreasuryDaiBalance = 220.1;
    const newTreasurySDaiBalance = 220.2;
    const newTreasurySDaiInDaiBalance = 220.3;
    subgraphData.clearinghouseSnapshots["2023-08-02"] = [
      ...(subgraphData.clearinghouseSnapshots["2023-08-02"] || []),
      getClearinghouseSnapshot(
        clearinghouseSnapshotTwoId,
        "2023-08-02",
        extensionTimestamp,
        0, // principalReceivables
        0, // interestReceivables
        newClearinghouseDaiBalance,
        newClearinghouseSDaiBalance,
        newClearinghouseSDaiInDaiBalance,
        newTreasuryDaiBalance,
        newTreasurySDaiBalance,
        newTreasurySDaiInDaiBalance,
      ),
    ];
    subgraphData.extendEvents["2023-08-02"] = [
      ...(subgraphData.extendEvents["2023-08-02"] || []),
      {
        __typename: "ExtendLoanEvent",
        id: "0x3-0-1233456",
        date: "2023-08-02",
        blockNumber: "1233456",
        blockTimestamp: extensionTimestamp.toString(),
        transactionHash: "0x0000002",
        periods: newPeriods,
        expiryTimestamp: newExpiryTimestamp.toString(),
        interestDue: LOAN_INTEREST.toString(), // Interest for the extension is paid at the time, and is not reflected here. This is residual interest from before the extension.
        loan: {
          __typename: "Loan",
          id: "0x3-0",
        },
        clearinghouseSnapshot: {
          __typename: "ClearinghouseSnapshot",
          id: clearinghouseSnapshotTwoId,
        },
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
        usdsBalance: 0,
        sUsdsBalance: 0,
        sUsdsInUsdsBalance: 0,
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
    const clearinghouseSnapshotTwoId = "0x009120932109312";
    const extensionTimestamp = 1691654400;
    const newClearinghouseDaiBalance = 200;
    const newClearinghouseSDaiBalance = 200.1;
    const newClearinghouseSDaiInDaiBalance = 200.2;
    const newTreasuryDaiBalance = 220.1;
    const newTreasurySDaiBalance = 220.2;
    const newTreasurySDaiInDaiBalance = 220.3;
    subgraphData.clearinghouseSnapshots["2023-08-12"] = [
      ...(subgraphData.clearinghouseSnapshots["2023-08-12"] || []),
      getClearinghouseSnapshot(
        clearinghouseSnapshotTwoId,
        "2023-08-12",
        extensionTimestamp,
        0, // principalReceivables
        0, // interestReceivables
        newClearinghouseDaiBalance,
        newClearinghouseSDaiBalance,
        newClearinghouseSDaiInDaiBalance,
        newTreasuryDaiBalance,
        newTreasurySDaiBalance,
        newTreasurySDaiInDaiBalance,
      ),
    ];
    subgraphData.extendEvents["2023-08-12"] = [
      ...(subgraphData.extendEvents["2023-08-12"] || []),
      {
        __typename: "ExtendLoanEvent",
        id: "0x3-0-1233456",
        date: "2023-08-12",
        blockNumber: "1233456",
        blockTimestamp: extensionTimestamp.toString(),
        transactionHash: "0x0000002",
        periods: newPeriods,
        expiryTimestamp: newExpiryTimestamp.toString(),
        interestDue: interestDue.toString(), // Interest for the extension is paid at the time, and is not reflected here. This is residual interest from before the extension.
        loan: {
          __typename: "Loan",
          id: "0x3-0",
        },
        clearinghouseSnapshot: {
          __typename: "ClearinghouseSnapshot",
          id: clearinghouseSnapshotTwoId,
        },
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
    const extensionOneClearinghouseSnapshotId = "sdfdsfsdfdsfsd";
    const extensionOneTimestamp = 1691654400;
    const extensionOneClearinghouseDaiBalance = 200;
    const extensionOneClearinghouseSDaiBalance = 200.1;
    const extensionOneClearinghouseSDaiInDaiBalance = 200.2;
    const extensionOneTreasuryDaiBalance = 220.1;
    const extensionOneTreasurySDaiBalance = 220.2;
    const extensionOneTreasurySDaiInDaiBalance = 220.3;
    subgraphData.clearinghouseSnapshots["2023-08-12"] = [
      ...(subgraphData.clearinghouseSnapshots["2023-08-12"] || []),
      getClearinghouseSnapshot(
        extensionOneClearinghouseSnapshotId,
        "2023-08-12",
        extensionOneTimestamp,
        0, // principalReceivables
        0, // interestReceivables
        extensionOneClearinghouseDaiBalance,
        extensionOneClearinghouseSDaiBalance,
        extensionOneClearinghouseSDaiInDaiBalance,
        extensionOneTreasuryDaiBalance,
        extensionOneTreasurySDaiBalance,
        extensionOneTreasurySDaiInDaiBalance,
      ),
    ];
    subgraphData.extendEvents["2023-08-12"] = [
      ...(subgraphData.extendEvents["2023-08-12"] || []),
      {
        __typename: "ExtendLoanEvent",
        id: "0x3-0-1233456",
        date: "2023-08-12",
        blockNumber: "1233456",
        blockTimestamp: extensionOneTimestamp.toString(),
        transactionHash: "0x0000002",
        periods: extensionOnePeriods,
        expiryTimestamp: extensionOneExpiryTimestamp.toString(),
        interestDue: repaymentOneInterestDueAfter.toString(), // Interest for the extension is paid at the time, and is not reflected here. This is residual interest from before the extension.
        loan: {
          __typename: "Loan",
          id: "0x3-0",
        },
        dt: "2023-08-12",
        clearinghouseSnapshot: {
          __typename: "ClearinghouseSnapshot",
          id: extensionOneClearinghouseSnapshotId,
        },
      },
    ];

    // Add repayment on day 13
    const repaymentTwoTimestamp = 1691654400;
    const repaymentTwoClearinghouseSnapshotId = "sdadadsdasdsaads";
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
    subgraphData.clearinghouseSnapshots["2023-08-13"] = [
      ...(subgraphData.clearinghouseSnapshots["2023-08-13"] || []),
      getClearinghouseSnapshot(
        repaymentTwoClearinghouseSnapshotId,
        "2023-08-13",
        repaymentTwoTimestamp,
        0, // principalReceivables
        0, // interestReceivables
        repaymentTwoClearinghouseDaiBalance,
        repaymentTwoClearinghouseSDaiBalance,
        repaymentTwoClearinghouseSDaiInDaiBalance,
        repaymentTwoTreasuryDaiBalance,
        repaymentTwoTreasurySDaiBalance,
        repaymentTwoTreasurySDaiInDaiBalance,
      ),
    ];
    subgraphData.repaymentEvents["2023-08-13"] = [
      ...(subgraphData.repaymentEvents["2023-08-13"] || []),
      {
        __typename: "RepayLoanEvent",
        id: "0x3-0-1233456",
        date: "2023-08-13",
        blockNumber: "1233456",
        transactionHash: "0x0000002",
        principalPayable: repaymentTwoPrincipalDueAfter.toString(),
        interestPayable: repaymentTwoInterestDueAfter.toString(),
        blockTimestamp: repaymentTwoTimestamp.toString(),
        secondsToExpiry: (1694332800 - repaymentTwoTimestamp).toString(),
        amountPaid: repaymentTwoAmount.toString(),
        collateralDeposited: "20",
        loan: {
          __typename: "Loan",
          id: "0x3-0",
        },
        clearinghouseSnapshot: {
          __typename: "ClearinghouseSnapshot",
          id: repaymentTwoClearinghouseSnapshotId,
        },
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
    const extensionOneTimestamp = 1691654400;
    const extensionOneClearinghouseSnapshotId = "sdfdsfsdfdsfsd";
    const extensionOneClearinghouseDaiBalance = 200;
    const extensionOneClearinghouseSDaiBalance = 200.1;
    const extensionOneClearinghouseSDaiInDaiBalance = 200.2;
    const extensionOneTreasuryDaiBalance = 220.1;
    const extensionOneTreasurySDaiBalance = 220.2;
    const extensionOneTreasurySDaiInDaiBalance = 220.3;
    subgraphData.clearinghouseSnapshots["2023-08-12"] = [
      ...(subgraphData.clearinghouseSnapshots["2023-08-12"] || []),
      getClearinghouseSnapshot(
        extensionOneClearinghouseSnapshotId,
        "2023-08-12",
        extensionOneTimestamp,
        0, // principalReceivables
        0, // interestReceivables
        extensionOneClearinghouseDaiBalance,
        extensionOneClearinghouseSDaiBalance,
        extensionOneClearinghouseSDaiInDaiBalance,
        extensionOneTreasuryDaiBalance,
        extensionOneTreasurySDaiBalance,
        extensionOneTreasurySDaiInDaiBalance,
      ),
    ];
    subgraphData.extendEvents["2023-08-12"] = [
      ...(subgraphData.extendEvents["2023-08-12"] || []),
      {
        __typename: "ExtendLoanEvent",
        id: "0x3-0-1233456",
        date: "2023-08-12",
        blockNumber: "1233456",
        blockTimestamp: extensionOneTimestamp.toString(),
        transactionHash: "0x0000002",
        periods: extensionOnePeriods,
        expiryTimestamp: extensionOneExpiryTimestamp.toString(),
        interestDue: repaymentOneInterestDueAfter.toString(), // Interest for the extension is paid at the time, and is not reflected here. This is residual interest from before the extension.
        loan: {
          __typename: "Loan",
          id: "0x3-0",
        },
        clearinghouseSnapshot: {
          __typename: "ClearinghouseSnapshot",
          id: extensionOneClearinghouseSnapshotId,
        },
        dt: "2023-08-12",
      },
    ];

    // Add repayment on day 13
    const repaymentTwoTimestamp = 1691654400;
    const repaymentTwoClearinghouseSnapshotId = "sdadadsdasdsaads";
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
    subgraphData.clearinghouseSnapshots["2023-08-13"] = [
      ...(subgraphData.clearinghouseSnapshots["2023-08-13"] || []),
      getClearinghouseSnapshot(
        repaymentTwoClearinghouseSnapshotId,
        "2023-08-13",
        repaymentTwoTimestamp,
        repaymentTwoPrincipalDueAfter,
        repaymentTwoInterestDueAfter,
        repaymentTwoClearinghouseDaiBalance,
        repaymentTwoClearinghouseSDaiBalance,
        repaymentTwoClearinghouseSDaiInDaiBalance,
        repaymentTwoTreasuryDaiBalance,
        repaymentTwoTreasurySDaiBalance,
        repaymentTwoTreasurySDaiInDaiBalance,
      ),
    ];
    subgraphData.repaymentEvents["2023-08-13"] = [
      ...(subgraphData.repaymentEvents["2023-08-13"] || []),
      {
        __typename: "RepayLoanEvent",
        id: "0x3-0-1233456",
        date: "2023-08-13",
        blockNumber: "1233456",
        transactionHash: "0x0000002",
        principalPayable: repaymentTwoPrincipalDueAfter.toString(),
        interestPayable: repaymentTwoInterestDueAfter.toString(),
        blockTimestamp: repaymentTwoTimestamp.toString(),
        secondsToExpiry: (1694332800 - repaymentTwoTimestamp).toString(),
        amountPaid: repaymentTwoAmount.toString(),
        collateralDeposited: "20",
        loan: {
          __typename: "Loan",
          id: "0x3-0",
        },
        clearinghouseSnapshot: {
          __typename: "ClearinghouseSnapshot",
          id: repaymentTwoClearinghouseSnapshotId,
        },
        dt: "2023-08-13",
      },
    ];

    // Add extension on day 14
    const extensionTwoPeriods = 3;
    const extensionTwoAdditionalInterest = extensionTwoPeriods * getInterestForLoan(repaymentTwoPrincipalDueAfter);
    const extensionTwoExpiryTimestamp = 1699990000;
    const extensionTwoTimestamp = 169099400;
    const extensionTwoClearinghouseSnapshotId = "asdadsaads";
    const extensionTwoClearinghouseDaiBalance = 200.2;
    const extensionTwoClearinghouseSDaiBalance = 200.3;
    const extensionTwoClearinghouseSDaiInDaiBalance = 200.4;
    const extensionTwoTreasuryDaiBalance = 220.2;
    const extensionTwoTreasurySDaiBalance = 220.3;
    const extensionTwoTreasurySDaiInDaiBalance = 220.4;
    subgraphData.clearinghouseSnapshots["2023-08-14"] = [
      ...(subgraphData.clearinghouseSnapshots["2023-08-14"] || []),
      getClearinghouseSnapshot(
        extensionTwoClearinghouseSnapshotId,
        "2023-08-14",
        extensionTwoTimestamp,
        repaymentTwoPrincipalDueAfter,
        repaymentTwoInterestDueAfter,
        extensionTwoClearinghouseDaiBalance,
        extensionTwoClearinghouseSDaiBalance,
        extensionTwoClearinghouseSDaiInDaiBalance,
        extensionTwoTreasuryDaiBalance,
        extensionTwoTreasurySDaiBalance,
        extensionTwoTreasurySDaiInDaiBalance,
      ),
    ];
    subgraphData.extendEvents["2023-08-14"] = [
      ...(subgraphData.extendEvents["2023-08-14"] || []),
      {
        __typename: "ExtendLoanEvent",
        id: "0x3-0-1233456",
        date: "2023-08-14",
        blockNumber: "1233456",
        blockTimestamp: extensionTwoTimestamp.toString(),
        transactionHash: "0x0000002",
        periods: extensionTwoPeriods,
        expiryTimestamp: extensionTwoExpiryTimestamp.toString(),
        interestDue: extensionTwoAdditionalInterest.toString(), // Interest for the extension is paid at the time, and is not reflected here. This is residual interest from before the extension.
        loan: {
          __typename: "Loan",
          id: "0x3-0",
        },
        clearinghouseSnapshot: {
          __typename: "ClearinghouseSnapshot",
          id: extensionTwoClearinghouseSnapshotId,
        },
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
    const extensionOneTimestamp = 169099400;
    const extensionOneClearinghouseSnapshotId = "2023-08-12-extension";
    const extensionOneClearinghouseDaiBalance = 200;
    const extensionOneClearinghouseSDaiBalance = 200.1;
    const extensionOneClearinghouseSDaiInDaiBalance = 200.2;
    const extensionOneTreasuryDaiBalance = 220.1;
    const extensionOneTreasurySDaiBalance = 220.2;
    const extensionOneTreasurySDaiInDaiBalance = 220.3;
    subgraphData.clearinghouseSnapshots["2023-08-12"] = [
      ...(subgraphData.clearinghouseSnapshots["2023-08-12"] || []),
      getClearinghouseSnapshot(
        extensionOneClearinghouseSnapshotId,
        "2023-08-12",
        extensionOneTimestamp,
        0,
        0,
        extensionOneClearinghouseDaiBalance,
        extensionOneClearinghouseSDaiBalance,
        extensionOneClearinghouseSDaiInDaiBalance,
        extensionOneTreasuryDaiBalance,
        extensionOneTreasurySDaiBalance,
        extensionOneTreasurySDaiInDaiBalance,
      ),
    ];
    subgraphData.extendEvents["2023-08-12"] = [
      ...(subgraphData.extendEvents["2023-08-12"] || []),
      {
        __typename: "ExtendLoanEvent",
        id: "0x3-0-1233456",
        date: "2023-08-12",
        blockNumber: "1233456",
        blockTimestamp: extensionOneTimestamp.toString(),
        transactionHash: "0x0000002",
        periods: extensionOnePeriods,
        expiryTimestamp: extensionOneExpiryTimestamp.toString(),
        interestDue: repaymentOneInterestDueAfter.toString(), // Interest for the extension is paid at the time, and is not reflected here. This is residual interest from before the extension.
        loan: {
          __typename: "Loan",
          id: "0x3-0",
        },
        clearinghouseSnapshot: {
          __typename: "ClearinghouseSnapshot",
          id: extensionOneClearinghouseSnapshotId,
        },
        dt: "2023-08-12",
      },
    ];

    // Add repayment on day 12
    const repaymentTwoTimestamp = 1691654401;
    const repaymentTwoClearinghouseSnapshotId = "2023-08-12-repayment";
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
    subgraphData.clearinghouseSnapshots["2023-08-12"] = [
      ...(subgraphData.clearinghouseSnapshots["2023-08-12"] || []),
      getClearinghouseSnapshot(
        repaymentTwoClearinghouseSnapshotId,
        "2023-08-12",
        repaymentTwoTimestamp,
        repaymentTwoPrincipalDueAfter,
        repaymentTwoInterestDueAfter,
        repaymentTwoClearinghouseDaiBalance,
        repaymentTwoClearinghouseSDaiBalance,
        repaymentTwoClearinghouseSDaiInDaiBalance,
        repaymentTwoTreasuryDaiBalance,
        repaymentTwoTreasurySDaiBalance,
        repaymentTwoTreasurySDaiInDaiBalance,
      ),
    ];
    subgraphData.repaymentEvents["2023-08-12"] = [
      ...(subgraphData.repaymentEvents["2023-08-12"] || []),
      {
        __typename: "RepayLoanEvent",
        id: "0x3-0-1233456",
        date: "2023-08-12",
        blockNumber: "1233456",
        transactionHash: "0x0000002",
        principalPayable: repaymentTwoPrincipalDueAfter.toString(),
        interestPayable: repaymentTwoInterestDueAfter.toString(),
        blockTimestamp: repaymentTwoTimestamp.toString(), // Just after the extension
        secondsToExpiry: (1694332800 - repaymentTwoTimestamp).toString(),
        amountPaid: repaymentTwoAmount.toString(),
        collateralDeposited: "20",
        loan: {
          __typename: "Loan",
          id: "0x3-0",
        },
        clearinghouseSnapshot: {
          __typename: "ClearinghouseSnapshot",
          id: repaymentTwoClearinghouseSnapshotId,
        },
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
        usdsBalance: 0,
        sUsdsBalance: 0,
        sUsdsInUsdsBalance: 0,
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
    const repaymentTwoTimestamp = 1691654400;
    const repaymentTwoClearinghouseSnapshotId = "2023-08-12-repayment";
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
    subgraphData.clearinghouseSnapshots["2023-08-12"] = [
      ...(subgraphData.clearinghouseSnapshots["2023-08-12"] || []),
      getClearinghouseSnapshot(
        repaymentTwoClearinghouseSnapshotId,
        "2023-08-12",
        repaymentTwoTimestamp,
        repaymentTwoPrincipalDueAfter,
        repaymentTwoInterestDueAfter,
        repaymentTwoClearinghouseDaiBalance,
        repaymentTwoClearinghouseSDaiBalance,
        repaymentTwoClearinghouseSDaiInDaiBalance,
        repaymentTwoTreasuryDaiBalance,
        repaymentTwoTreasurySDaiBalance,
        repaymentTwoTreasurySDaiInDaiBalance,
      ),
    ];
    subgraphData.repaymentEvents["2023-08-12"] = [
      ...(subgraphData.repaymentEvents["2023-08-12"] || []),
      {
        __typename: "RepayLoanEvent",
        id: "0x3-0-1233456",
        date: "2023-08-12",
        blockNumber: "1233456",
        transactionHash: "0x0000002",
        principalPayable: repaymentTwoPrincipalDueAfter.toString(),
        interestPayable: repaymentTwoInterestDueAfter.toString(),
        blockTimestamp: repaymentTwoTimestamp.toString(), // Just before the extension
        secondsToExpiry: (1694332800 - repaymentTwoTimestamp).toString(),
        amountPaid: repaymentTwoAmount.toString(),
        collateralDeposited: "20",
        loan: {
          __typename: "Loan",
          id: "0x3-0",
        },
        clearinghouseSnapshot: {
          __typename: "ClearinghouseSnapshot",
          id: repaymentTwoClearinghouseSnapshotId,
        },
        dt: "2023-08-12",
      },
    ];

    // Add extension on day 12
    const extensionOneTimestamp = 1691654401;
    const extensionOneClearinghouseSnapshotId = "sdfdsdfdsfsdfsdsf";
    const extensionOnePeriods = 2;
    const extensionOneAdditionalInterest = extensionOnePeriods * getInterestForLoan(repaymentTwoPrincipalDueAfter);
    const extensionOneExpiryTimestamp = 1699999000;
    const extensionOneClearinghouseDaiBalance = 200;
    const extensionOneClearinghouseSDaiBalance = 200.1;
    const extensionOneClearinghouseSDaiInDaiBalance = 200.2;
    const extensionOneTreasuryDaiBalance = 220.1;
    const extensionOneTreasurySDaiBalance = 220.2;
    const extensionOneTreasurySDaiInDaiBalance = 220.3;
    subgraphData.clearinghouseSnapshots["2023-08-12"] = [
      ...(subgraphData.clearinghouseSnapshots["2023-08-12"] || []),
      getClearinghouseSnapshot(
        extensionOneClearinghouseSnapshotId,
        "2023-08-12",
        extensionOneTimestamp,
        repaymentTwoPrincipalDueAfter,
        repaymentTwoInterestDueAfter,
        extensionOneClearinghouseDaiBalance,
        extensionOneClearinghouseSDaiBalance,
        extensionOneClearinghouseSDaiInDaiBalance,
        extensionOneTreasuryDaiBalance,
        extensionOneTreasurySDaiBalance,
        extensionOneTreasurySDaiInDaiBalance,
      ),
    ];
    subgraphData.extendEvents["2023-08-12"] = [
      ...(subgraphData.extendEvents["2023-08-12"] || []),
      {
        __typename: "ExtendLoanEvent",
        id: "0x3-0-1233456",
        date: "2023-08-12",
        blockNumber: "1233456",
        blockTimestamp: extensionOneTimestamp.toString(),
        transactionHash: "0x0000002",
        periods: extensionOnePeriods,
        expiryTimestamp: extensionOneExpiryTimestamp.toString(),
        interestDue: repaymentOneInterestDueAfter.toString(), // Interest for the extension is paid at the time, and is not reflected here. This is residual interest from before the extension.
        loan: {
          __typename: "Loan",
          id: "0x3-0",
        },
        clearinghouseSnapshot: {
          __typename: "ClearinghouseSnapshot",
          id: extensionOneClearinghouseSnapshotId,
        },
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
        usdsBalance: 0,
        sUsdsBalance: 0,
        sUsdsInUsdsBalance: 0,
      },
    ]);
    assertTreasurySnapshot(
      snapshotTwelve,
      extensionOneTreasuryDaiBalance,
      extensionOneTreasurySDaiBalance,
      extensionOneTreasurySDaiInDaiBalance,
    );
  });

  it("handles usds", () => {
    const startDate = new Date("2023-08-01");
    const beforeDate = new Date("2023-08-13");
    const previousDateRecords: Snapshot | null = null;
    const previousLoanSnapshot: LoanSnapshotMap = {};
    const subgraphData = getSampleData();

    // Define a new Clearinghouse with USDS
    const usdsClearinghouseAddress = "0x1234567890123456789012345678901234567890";
    subgraphData.clearinghouses[usdsClearinghouseAddress] = {
      __typename: "Clearinghouse",
      id: usdsClearinghouseAddress,
      address: usdsClearinghouseAddress,
      createdBlock: "1234567890",
      createdTimestamp: "1234567890",
      version: "1",
      singleton: {
        __typename: "ClearinghouseSingleton",
        id: "0x1111111111111111111111111111111111111111",
      },
      coolerFactoryAddress: CLEARINGHOUSE_COOLER_FACTORY_ADDRESS,
      collateralToken: CLEARINGHOUSE_COLLATERAL_ADDRESS,
      collateralTokenDecimals: 18,
      reserveToken: USDS_ADDRESS,
      reserveTokenDecimals: 18,
      fundAmount: CLEARINGHOUSE_FUND_AMOUNT.toString(),
      fundCadence: CLEARINGHOUSE_FUND_CADENCE.toString(),
      sReserveToken: SUSDS_ADDRESS,
      sReserveTokenDecimals: 18,
      interestRate: "0",
      duration: "0",
      loanToCollateral: "0",
      dt: "2023-08-12",
      loans: [],
      snapshots: [],
    };
    // Define a rebalance event for the new Clearinghouse
    const rebalanceTimestamp = 1691654400;
    const usdsClearinghouseSnapshotId = "2023-08-12-rebalance";
    subgraphData.rebalanceEvents["2023-08-12"] = [
      ...(subgraphData.rebalanceEvents["2023-08-12"] || []),
      {
        __typename: "RebalanceEvent",
        id: "0x1234567890123456789012345678901234567890",
        date: "2023-08-12",
        blockNumber: "1234567890",
        blockTimestamp: rebalanceTimestamp.toString(),
        transactionHash: "0x0000002",
        clearinghouse: {
          __typename: "Clearinghouse",
          id: usdsClearinghouseAddress,
        },
        clearinghouseSnapshot: {
          __typename: "ClearinghouseSnapshot",
          id: usdsClearinghouseSnapshotId,
        },
        amount: "0",
        dt: "2023-08-12",
      },
    ];
    // Define a Clearinghouse snapshot for the new Clearinghouse
    const clearinghouseUsdsBalance = 1000;
    const clearinghouseSUsdsBalance = 1001;
    const clearinghouseSUsdsInUsdsBalance = 1002;
    const treasuryUsdsBalance = 1003;
    const treasurySUsdsBalance = 1004;
    const treasurySUsdsInUsdsBalance = 1005;
    subgraphData.clearinghouseSnapshots["2023-08-12"] = [
      ...(subgraphData.clearinghouseSnapshots["2023-08-12"] || []),
      getClearinghouseSnapshot(
        usdsClearinghouseSnapshotId,
        "2023-08-12",
        rebalanceTimestamp,
        0,
        0,
        clearinghouseUsdsBalance,
        clearinghouseSUsdsBalance,
        clearinghouseSUsdsInUsdsBalance,
        treasuryUsdsBalance,
        treasurySUsdsBalance,
        treasurySUsdsInUsdsBalance,
        USDS_ADDRESS,
        SUSDS_ADDRESS,
        usdsClearinghouseAddress,
      ),
    ];

    // Generate snapshots
    const snapshots = generateSnapshots(startDate, beforeDate, previousDateRecords, previousLoanSnapshot, subgraphData);

    // Day 12
    const snapshotTwelve = snapshots[11].snapshot;

    // Should incorporate USDS balances from the new Clearinghouse
    assertClearinghouseSnapshots(
      snapshotTwelve,
      [
        {
          daiBalance: CLEARINGHOUSE_DAI_BALANCE_AFTER_REPAYMENT,
          sDaiBalance: CLEARINGHOUSE_SDAI_BALANCE_AFTER_REPAYMENT,
          sDaiInDaiBalance: CLEARINGHOUSE_SDAI_IN_DAI_BALANCE_AFTER_REPAYMENT,
          usdsBalance: 0,
          sUsdsBalance: 0,
          sUsdsInUsdsBalance: 0,
        },
        {
          daiBalance: 0,
          sDaiBalance: 0,
          sDaiInDaiBalance: 0,
          usdsBalance: clearinghouseUsdsBalance,
          sUsdsBalance: clearinghouseSUsdsBalance,
          sUsdsInUsdsBalance: clearinghouseSUsdsInUsdsBalance,
        },
      ],
      {
        [CLEARINGHOUSE_ADDRESS]: DAI_ADDRESS,
        [usdsClearinghouseAddress]: USDS_ADDRESS,
      },
    );

    // Should incorporate USDS balances from the treasury
    assertTreasurySnapshot(
      snapshotTwelve,
      TREASURY_DAI_BALANCE_AFTER_REPAYMENT,
      TREASURY_SDAI_BALANCE_AFTER_REPAYMENT,
      TREASURY_SDAI_IN_DAI_BALANCE_AFTER_REPAYMENT,
      treasuryUsdsBalance,
      treasurySUsdsBalance,
      treasurySUsdsInUsdsBalance,
    );
  });
});
