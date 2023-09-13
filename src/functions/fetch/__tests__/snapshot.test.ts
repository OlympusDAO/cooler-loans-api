import { generateSnapshots, Snapshot } from "../snapshot";
import { SubgraphData } from "../subgraph";

const getLoanData = () => {
  return {
    id: "0x3-0",
    // 2023-08-01
    createdTimestamp: 1690876800,
    loanId: 0,
    borrowerAddress: "0x01",
    lenderAddress: "0x02",
    coolerAddress: "0x03",
    amount: 100000,
    interest: 1000,
    principal: 99000,
    collateralDeposited: 30,
    // 2023-09-10
    expiryTimestamp: 1694332800,
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
      "2023-08-01": {
        id: "12223",
        date: "2023-08-01",
        blockNumber: 12223,
        blockTimestamp: 100000,
        clearinghouse: "0x00000",
        isActive: true,
        nextRebalanceTimestamp: 100001,
        receivables: 100000,
        daiBalance: 10000000.0,
        sDaiBalance: 500000.0,
        sDaiInDaiBalance: 600000.01,
      },
      "2023-08-20": {
        id: "12255",
        date: "2023-08-20",
        blockNumber: 12255,
        blockTimestamp: 100000,
        clearinghouse: "0x00000",
        isActive: true,
        nextRebalanceTimestamp: 100001,
        receivables: 20000000.01,
        daiBalance: 9000000.0,
        sDaiBalance: 500000.0,
        sDaiInDaiBalance: 600000.01,
      },
    },
    creationEvents: {
      "2023-08-01": [
        {
          id: "0x3-0",
          date: "2023-08-01",
          blockTimestamp: 1690876800,
          loan: getLoanData(),
        },
      ],
    },
    repaymentEvents: {
      "2023-08-10": [
        {
          id: "0x3-0-1691654400",
          date: "2023-08-10",
          blockTimestamp: 1691654400,
          secondsToExpiry: 1694332800 - 1691654400,
          amountPaid: 1000,
          amountPayable: 100000 - 1000,
          interestIncome: 10,
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
          blockTimestamp: 1691654400,
          secondsSinceExpiry: 5000,
          collateralQuantityClaimed: 29,
          collateralPrice: 1000,
          collateralValueClaimed: 29000,
          collateralIncome: 29000 - (100000 - 1000),
          loan: getLoanData(),
        },
      ],
    },
    rolloverEvents: {},
  };
};

const getSecondsToExpiry = (currentDate: Date, expiryTimestamp: number): number => {
  const expiryDate = new Date(expiryTimestamp * 1000);
  return Math.floor((expiryDate.getTime() - currentDate.getTime()) / 1000);
};

describe("generateSnapshots", () => {
  it("should return empty records if no subgraphData is provided", () => {
    const startDate = "2022-01-01";
    const endDate = "2022-01-31";
    const previousDateRecords: Snapshot | null = null;
    const subgraphData: SubgraphData = {
      clearinghouseSnapshots: {},
      creationEvents: {},
      defaultedClaimEvents: {},
      repaymentEvents: {},
      rolloverEvents: {},
    };

    const result = generateSnapshots(startDate, endDate, previousDateRecords, subgraphData);

    const resultOne = result[0];
    expect(resultOne.date.toISOString()).toEqual("2022-01-01T23:59:59.000Z");
    expect(resultOne.receivables).toEqual(0);
    expect(resultOne.clearinghouse.daiBalance).toEqual(0);
    expect(resultOne.clearinghouse.sDaiBalance).toEqual(0);
    expect(resultOne.clearinghouse.sDaiInDaiBalance).toEqual(0);
    expect(resultOne.loans).toEqual([]);
    expect(resultOne.creationEvents).toEqual([]);
    expect(resultOne.defaultedClaimEvents).toEqual([]);
    expect(resultOne.repaymentEvents).toEqual([]);
    expect(resultOne.rolloverEvents).toEqual([]);
    expect(resultOne.clearinghouseEvents).toEqual([]);

    expect(result.length).toEqual(31);
  });

  it("loan creation", () => {
    const startDate = "2023-08-01";
    const endDate = "2023-08-02";
    const previousDateRecords: Snapshot | null = null;
    const subgraphData = getSampleData();

    const snapshots = generateSnapshots(startDate, endDate, previousDateRecords, subgraphData);

    expect(snapshots.length).toEqual(2);

    // Day 1 should have the correct values
    const snapshotOne = snapshots[0];
    expect(snapshotOne.date.toISOString()).toEqual("2023-08-01T23:59:59.000Z");
    expect(snapshotOne.receivables).toEqual(100000);
    expect(snapshotOne.clearinghouse.daiBalance).toEqual(10000000.0);
    expect(snapshotOne.clearinghouse.sDaiBalance).toEqual(500000.0);
    expect(snapshotOne.clearinghouse.sDaiInDaiBalance).toEqual(600000.01);
    expect(snapshotOne.loans.length).toEqual(1);
    const snapshotOneLoanOne = snapshotOne.loans[0];
    expect(snapshotOneLoanOne.loanId).toEqual(0);
    expect(snapshotOneLoanOne.createdTimestamp).toEqual(1690876800);
    expect(snapshotOneLoanOne.borrowerAddress).toEqual("0x01");
    expect(snapshotOneLoanOne.lenderAddress).toEqual("0x02");
    expect(snapshotOneLoanOne.principal).toEqual(99000);
    expect(snapshotOneLoanOne.interest).toEqual(1000);
    expect(snapshotOneLoanOne.collateralDeposited).toEqual(30);
    expect(snapshotOneLoanOne.expiryTimestamp).toEqual(1694332800);
    expect(snapshotOneLoanOne.secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotOne.date, snapshotOneLoanOne.expiryTimestamp),
    );
    expect(snapshotOneLoanOne.status).toEqual("Active");
    expect(snapshotOneLoanOne.amountRepaid).toEqual(0);
    expect(snapshotOneLoanOne.amountPayable).toEqual(100000);
    expect(snapshotOneLoanOne.interestIncome).toEqual(0);
    expect(snapshotOneLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotOneLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotOneLoanOne.collateralIncome).toEqual(0);
    expect(snapshotOne.creationEvents.length).toEqual(1);
    expect(snapshotOne.repaymentEvents.length).toEqual(0);
    expect(snapshotOne.defaultedClaimEvents.length).toEqual(0);
    expect(snapshotOne.rolloverEvents.length).toEqual(0);
    expect(snapshotOne.clearinghouseEvents.length).toEqual(1);

    const snapshotTwo = snapshots[1];
    expect(snapshotTwo.date.toISOString()).toEqual("2023-08-02T23:59:59.000Z");
    expect(snapshotTwo.receivables).toEqual(100000);
    expect(snapshotTwo.clearinghouse.daiBalance).toEqual(10000000.0);
    expect(snapshotTwo.clearinghouse.sDaiBalance).toEqual(500000.0);
    expect(snapshotTwo.clearinghouse.sDaiInDaiBalance).toEqual(600000.01);
    expect(snapshotTwo.loans.length).toEqual(1);
    const snapshotTwoLoanOne = snapshotTwo.loans[0];
    expect(snapshotTwoLoanOne.loanId).toEqual(0);
    expect(snapshotTwoLoanOne.createdTimestamp).toEqual(1690876800);
    expect(snapshotTwoLoanOne.borrowerAddress).toEqual("0x01");
    expect(snapshotTwoLoanOne.lenderAddress).toEqual("0x02");
    expect(snapshotTwoLoanOne.principal).toEqual(99000);
    expect(snapshotTwoLoanOne.interest).toEqual(1000);
    expect(snapshotTwoLoanOne.collateralDeposited).toEqual(30);
    expect(snapshotTwoLoanOne.expiryTimestamp).toEqual(1694332800);
    expect(snapshotTwoLoanOne.secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotTwo.date, snapshotTwoLoanOne.expiryTimestamp),
    );
    expect(snapshotTwoLoanOne.status).toEqual("Active");
    expect(snapshotTwoLoanOne.amountRepaid).toEqual(0);
    expect(snapshotTwoLoanOne.amountPayable).toEqual(100000);
    expect(snapshotTwoLoanOne.interestIncome).toEqual(0);
    expect(snapshotTwoLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotTwoLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotTwoLoanOne.collateralIncome).toEqual(0);
    expect(snapshotTwo.creationEvents.length).toEqual(0);
    expect(snapshotTwo.repaymentEvents.length).toEqual(0);
    expect(snapshotTwo.defaultedClaimEvents.length).toEqual(0);
    expect(snapshotTwo.rolloverEvents.length).toEqual(0);
    expect(snapshotTwo.clearinghouseEvents.length).toEqual(0);
  });

  it("loan repayment", () => {
    const startDate = "2023-08-01";
    const endDate = "2023-08-11";
    const previousDateRecords: Snapshot | null = null;
    const subgraphData = getSampleData();

    const snapshots = generateSnapshots(startDate, endDate, previousDateRecords, subgraphData);

    expect(snapshots.length).toEqual(11);

    // Day 10 should include the repayment
    const snapshotTen = snapshots[9];
    expect(snapshotTen.date.toISOString()).toEqual("2023-08-10T23:59:59.000Z");
    expect(snapshotTen.receivables).toEqual(100000 - 1000);
    expect(snapshotTen.clearinghouse.daiBalance).toEqual(10000000.0);
    expect(snapshotTen.clearinghouse.sDaiBalance).toEqual(500000.0);
    expect(snapshotTen.clearinghouse.sDaiInDaiBalance).toEqual(600000.01);
    expect(snapshotTen.loans.length).toEqual(1);
    const snapshotTenLoanOne = snapshotTen.loans[0];
    expect(snapshotTenLoanOne.loanId).toEqual(0);
    expect(snapshotTenLoanOne.principal).toEqual(99000);
    expect(snapshotTenLoanOne.interest).toEqual(1000);
    expect(snapshotTenLoanOne.collateralDeposited).toEqual(29);
    expect(snapshotTenLoanOne.expiryTimestamp).toEqual(1694332800);
    expect(snapshotTenLoanOne.secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotTen.date, snapshotTenLoanOne.expiryTimestamp),
    );
    expect(snapshotTenLoanOne.status).toEqual("Active");
    expect(snapshotTenLoanOne.amountRepaid).toEqual(1000);
    expect(snapshotTenLoanOne.amountPayable).toEqual(100000 - 1000);
    expect(snapshotTenLoanOne.interestIncome).toEqual(10);
    expect(snapshotTenLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotTenLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotTenLoanOne.collateralIncome).toEqual(0);
    expect(snapshotTen.creationEvents.length).toEqual(0);
    expect(snapshotTen.repaymentEvents.length).toEqual(1);
    expect(snapshotTen.defaultedClaimEvents.length).toEqual(0);
    expect(snapshotTen.rolloverEvents.length).toEqual(0);
    expect(snapshotTen.clearinghouseEvents.length).toEqual(0);

    // Day after should be the same
    const snapshotEleven = snapshots[10];
    expect(snapshotEleven.date.toISOString()).toEqual("2023-08-11T23:59:59.000Z");
    expect(snapshotEleven.receivables).toEqual(100000 - 1000);
    expect(snapshotEleven.clearinghouse.daiBalance).toEqual(10000000.0);
    expect(snapshotEleven.clearinghouse.sDaiBalance).toEqual(500000.0);
    expect(snapshotEleven.clearinghouse.sDaiInDaiBalance).toEqual(600000.01);
    expect(snapshotEleven.loans.length).toEqual(1);
    const snapshotElevenLoanOne = snapshotEleven.loans[0];
    expect(snapshotElevenLoanOne.loanId).toEqual(0);
    expect(snapshotElevenLoanOne.principal).toEqual(99000);
    expect(snapshotElevenLoanOne.interest).toEqual(1000);
    expect(snapshotElevenLoanOne.collateralDeposited).toEqual(29);
    expect(snapshotElevenLoanOne.expiryTimestamp).toEqual(1694332800);
    expect(snapshotElevenLoanOne.secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotEleven.date, snapshotElevenLoanOne.expiryTimestamp),
    );
    expect(snapshotElevenLoanOne.status).toEqual("Active");
    expect(snapshotElevenLoanOne.amountRepaid).toEqual(1000);
    expect(snapshotElevenLoanOne.amountPayable).toEqual(100000 - 1000);
    expect(snapshotElevenLoanOne.interestIncome).toEqual(10);
    expect(snapshotElevenLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotElevenLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotElevenLoanOne.collateralIncome).toEqual(0);
    expect(snapshotEleven.creationEvents.length).toEqual(0);
    expect(snapshotEleven.repaymentEvents.length).toEqual(0);
    expect(snapshotEleven.defaultedClaimEvents.length).toEqual(0);
    expect(snapshotEleven.rolloverEvents.length).toEqual(0);
    expect(snapshotEleven.clearinghouseEvents.length).toEqual(0);
  });

  it("clearinghouse balances", () => {
    const startDate = "2023-08-01";
    const endDate = "2023-08-21";
    const previousDateRecords: Snapshot | null = null;
    const subgraphData = getSampleData();

    const snapshots = generateSnapshots(startDate, endDate, previousDateRecords, subgraphData);

    expect(snapshots.length).toEqual(21);

    // Day 20 should have the adjusted clearinghouse balances
    const snapshotTwenty = snapshots[19];
    expect(snapshotTwenty.date.toISOString()).toEqual("2023-08-20T23:59:59.000Z");
    expect(snapshotTwenty.receivables).toEqual(100000 - 1000); // Ignores the clearinghouse snapshot
    expect(snapshotTwenty.clearinghouse.daiBalance).toEqual(9000000.0);
    expect(snapshotTwenty.clearinghouse.sDaiBalance).toEqual(500000.0);
    expect(snapshotTwenty.clearinghouse.sDaiInDaiBalance).toEqual(600000.01);
    expect(snapshotTwenty.creationEvents.length).toEqual(0);
    expect(snapshotTwenty.repaymentEvents.length).toEqual(0);
    expect(snapshotTwenty.defaultedClaimEvents.length).toEqual(0);
    expect(snapshotTwenty.rolloverEvents.length).toEqual(0);
    expect(snapshotTwenty.clearinghouseEvents.length).toEqual(1);

    // Day 21 should carry on balances
    const snapshotTwentyOne = snapshots[20];
    expect(snapshotTwentyOne.date.toISOString()).toEqual("2023-08-21T23:59:59.000Z");
    expect(snapshotTwentyOne.receivables).toEqual(100000 - 1000);
    expect(snapshotTwentyOne.clearinghouse.daiBalance).toEqual(9000000.0);
    expect(snapshotTwentyOne.clearinghouse.sDaiBalance).toEqual(500000.0);
    expect(snapshotTwentyOne.clearinghouse.sDaiInDaiBalance).toEqual(600000.01);
    expect(snapshotTwentyOne.creationEvents.length).toEqual(0);
    expect(snapshotTwentyOne.repaymentEvents.length).toEqual(0);
    expect(snapshotTwentyOne.defaultedClaimEvents.length).toEqual(0);
    expect(snapshotTwentyOne.rolloverEvents.length).toEqual(0);
    expect(snapshotTwentyOne.clearinghouseEvents.length).toEqual(0);
  });

  it("should use the previous day records", () => {
    const previousDateSnapshot: Snapshot = {
      date: new Date("2023-08-01"),
      receivables: 100000,
      clearinghouse: {
        daiBalance: 10000000.0,
        sDaiBalance: 500000.0,
        sDaiInDaiBalance: 600000.01,
      },
      loans: [
        {
          id: "0x3-0",
          loanId: 0,
          createdTimestamp: 1690876800,
          borrowerAddress: "0x01",
          lenderAddress: "0x02",
          coolerAddress: "0x03",
          principal: 99000,
          interest: 1000,
          collateralDeposited: 30,
          expiryTimestamp: 1694332800,
          secondsToExpiry: 1694332800 - 1690876800,
          status: "Active",
          amountRepaid: 0,
          amountPayable: 100000,
          interestIncome: 0,
          collateralIncome: 0,
          collateralClaimedQuantity: 0,
          collateralClaimedValue: 0,
        },
      ],
      creationEvents: [],
      defaultedClaimEvents: [],
      repaymentEvents: [],
      rolloverEvents: [],
      clearinghouseEvents: [],
    };

    const startDate = "2023-08-02";
    const endDate = "2023-08-02";
    const subgraphData = {
      clearinghouseSnapshots: {},
      creationEvents: {},
      defaultedClaimEvents: {},
      repaymentEvents: {},
      rolloverEvents: {},
    };

    const snapshots = generateSnapshots(startDate, endDate, previousDateSnapshot, subgraphData);

    // Should generate records based on the existing snapshots
    expect(snapshots.length).toEqual(1);
    const snapshotOne = snapshots[0];
    expect(snapshotOne.date.toISOString()).toEqual("2023-08-02T23:59:59.000Z");
    expect(snapshotOne.receivables).toEqual(100000);
    expect(snapshotOne.clearinghouse.daiBalance).toEqual(10000000.0);
    expect(snapshotOne.clearinghouse.sDaiBalance).toEqual(500000.0);
    expect(snapshotOne.clearinghouse.sDaiInDaiBalance).toEqual(600000.01);
    expect(snapshotOne.loans.length).toEqual(1);
    const snapshotOneLoanOne = snapshotOne.loans[0];
    expect(snapshotOneLoanOne.loanId).toEqual(0);
    expect(snapshotOneLoanOne.createdTimestamp).toEqual(1690876800);
    expect(snapshotOneLoanOne.borrowerAddress).toEqual("0x01");
    expect(snapshotOneLoanOne.lenderAddress).toEqual("0x02");
    expect(snapshotOneLoanOne.principal).toEqual(99000);
    expect(snapshotOneLoanOne.interest).toEqual(1000);
    expect(snapshotOneLoanOne.collateralDeposited).toEqual(30);
    expect(snapshotOneLoanOne.expiryTimestamp).toEqual(1694332800);
    expect(snapshotOneLoanOne.secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotOne.date, snapshotOneLoanOne.expiryTimestamp),
    );
    expect(snapshotOneLoanOne.status).toEqual("Active");
    expect(snapshotOneLoanOne.amountRepaid).toEqual(0);
    expect(snapshotOneLoanOne.amountPayable).toEqual(100000);
    expect(snapshotOneLoanOne.interestIncome).toEqual(0);
    expect(snapshotOneLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotOneLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotOneLoanOne.collateralIncome).toEqual(0);
    expect(snapshotOne.creationEvents.length).toEqual(0);
    expect(snapshotOne.repaymentEvents.length).toEqual(0);
    expect(snapshotOne.defaultedClaimEvents.length).toEqual(0);
    expect(snapshotOne.rolloverEvents.length).toEqual(0);
    expect(snapshotOne.clearinghouseEvents.length).toEqual(0);
  });

  it("loan expiry", () => {
    const startDate = "2023-08-01";
    const endDate = "2023-09-11"; // 1 day after expiry
    const previousDateRecords: Snapshot | null = null;
    const subgraphData = getSampleData();

    const snapshots = generateSnapshots(startDate, endDate, previousDateRecords, subgraphData);

    expect(snapshots.length).toEqual(42); // 31 + 11

    // Day of expiry
    const snapshotDayOfExpiry = snapshots[40];
    expect(snapshotDayOfExpiry.date.toISOString()).toEqual("2023-09-10T23:59:59.000Z");
    expect(snapshotDayOfExpiry.receivables).toEqual(100000 - 1000);
    expect(snapshotDayOfExpiry.loans.length).toEqual(1);
    const snapshotDayOfExpiryLoanOne = snapshotDayOfExpiry.loans[0];
    expect(snapshotDayOfExpiryLoanOne.loanId).toEqual(0);
    expect(snapshotDayOfExpiryLoanOne.createdTimestamp).toEqual(1690876800);
    expect(snapshotDayOfExpiryLoanOne.borrowerAddress).toEqual("0x01");
    expect(snapshotDayOfExpiryLoanOne.lenderAddress).toEqual("0x02");
    expect(snapshotDayOfExpiryLoanOne.principal).toEqual(99000);
    expect(snapshotDayOfExpiryLoanOne.interest).toEqual(1000);
    expect(snapshotDayOfExpiryLoanOne.collateralDeposited).toEqual(29);
    expect(snapshotDayOfExpiryLoanOne.expiryTimestamp).toEqual(1694332800);
    expect(snapshotDayOfExpiryLoanOne.secondsToExpiry).toEqual(0);
    expect(snapshotDayOfExpiryLoanOne.status).toEqual("Expired");
    expect(snapshotDayOfExpiryLoanOne.amountRepaid).toEqual(1000);
    expect(snapshotDayOfExpiryLoanOne.amountPayable).toEqual(100000 - 1000);
    expect(snapshotDayOfExpiryLoanOne.interestIncome).toEqual(10); // From payment
    expect(snapshotDayOfExpiryLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotDayOfExpiryLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotDayOfExpiryLoanOne.collateralIncome).toEqual(0);
    expect(snapshotDayOfExpiry.creationEvents.length).toEqual(0);
    expect(snapshotDayOfExpiry.repaymentEvents.length).toEqual(0);
    expect(snapshotDayOfExpiry.defaultedClaimEvents.length).toEqual(0);
    expect(snapshotDayOfExpiry.rolloverEvents.length).toEqual(0);
    expect(snapshotDayOfExpiry.clearinghouseEvents.length).toEqual(0);

    // Same for the next day
    const snapshotDayAfterExpiry = snapshots[41];
    expect(snapshotDayAfterExpiry.date.toISOString()).toEqual("2023-09-11T23:59:59.000Z");
    expect(snapshotDayAfterExpiry.loans.length).toEqual(1);
    const snapshotDayAfterExpiryLoanOne = snapshotDayAfterExpiry.loans[0];
    expect(snapshotDayAfterExpiryLoanOne.loanId).toEqual(0);
    expect(snapshotDayAfterExpiryLoanOne.createdTimestamp).toEqual(1690876800);
    expect(snapshotDayAfterExpiryLoanOne.borrowerAddress).toEqual("0x01");
    expect(snapshotDayAfterExpiryLoanOne.lenderAddress).toEqual("0x02");
    expect(snapshotDayAfterExpiryLoanOne.principal).toEqual(99000);
    expect(snapshotDayAfterExpiryLoanOne.interest).toEqual(1000);
    expect(snapshotDayAfterExpiryLoanOne.collateralDeposited).toEqual(29);
    expect(snapshotDayAfterExpiryLoanOne.expiryTimestamp).toEqual(1694332800);
    expect(snapshotDayAfterExpiryLoanOne.secondsToExpiry).toEqual(0);
    expect(snapshotDayAfterExpiryLoanOne.status).toEqual("Expired");
    expect(snapshotDayAfterExpiryLoanOne.amountRepaid).toEqual(1000);
    expect(snapshotDayAfterExpiryLoanOne.amountPayable).toEqual(100000 - 1000);
    expect(snapshotDayAfterExpiryLoanOne.interestIncome).toEqual(10); // From payment
    expect(snapshotDayAfterExpiryLoanOne.collateralClaimedQuantity).toEqual(0);
    expect(snapshotDayAfterExpiryLoanOne.collateralClaimedValue).toEqual(0);
    expect(snapshotDayAfterExpiryLoanOne.collateralIncome).toEqual(0);
    expect(snapshotDayAfterExpiry.creationEvents.length).toEqual(0);
    expect(snapshotDayAfterExpiry.repaymentEvents.length).toEqual(0);
    expect(snapshotDayAfterExpiry.defaultedClaimEvents.length).toEqual(0);
    expect(snapshotDayAfterExpiry.rolloverEvents.length).toEqual(0);
    expect(snapshotDayAfterExpiry.clearinghouseEvents.length).toEqual(0);
  });

  it("loan default claim", () => {
    const startDate = "2023-08-01";
    const endDate = "2023-09-13"; // 1 day after default claim
    const previousDateRecords: Snapshot | null = null;
    const subgraphData = getSampleData();

    const snapshots = generateSnapshots(startDate, endDate, previousDateRecords, subgraphData);

    expect(snapshots.length).toEqual(44); // 31 + 13

    // Day of claim
    const snapshotDayOfExpiry = snapshots[42];
    expect(snapshotDayOfExpiry.date.toISOString()).toEqual("2023-09-12T23:59:59.000Z");
    expect(snapshotDayOfExpiry.receivables).toEqual(0);
    expect(snapshotDayOfExpiry.loans.length).toEqual(1);
    const snapshotDayOfExpiryLoanOne = snapshotDayOfExpiry.loans[0];
    expect(snapshotDayOfExpiryLoanOne.loanId).toEqual(0);
    expect(snapshotDayOfExpiryLoanOne.createdTimestamp).toEqual(1690876800);
    expect(snapshotDayOfExpiryLoanOne.borrowerAddress).toEqual("0x01");
    expect(snapshotDayOfExpiryLoanOne.lenderAddress).toEqual("0x02");
    expect(snapshotDayOfExpiryLoanOne.principal).toEqual(99000);
    expect(snapshotDayOfExpiryLoanOne.interest).toEqual(1000);
    expect(snapshotDayOfExpiryLoanOne.collateralDeposited).toEqual(0);
    expect(snapshotDayOfExpiryLoanOne.expiryTimestamp).toEqual(1694332800);
    expect(snapshotDayOfExpiryLoanOne.secondsToExpiry).toEqual(0);
    expect(snapshotDayOfExpiryLoanOne.status).toEqual("Reclaimed");
    expect(snapshotDayOfExpiryLoanOne.amountRepaid).toEqual(1000);
    expect(snapshotDayOfExpiryLoanOne.amountPayable).toEqual(0);
    expect(snapshotDayOfExpiryLoanOne.interestIncome).toEqual(10); // From payment
    expect(snapshotDayOfExpiryLoanOne.collateralClaimedQuantity).toEqual(29); // From default
    expect(snapshotDayOfExpiryLoanOne.collateralClaimedValue).toEqual(29000); // From default
    expect(snapshotDayOfExpiryLoanOne.collateralIncome).toEqual(29000 - (100000 - 1000)); // From default
    expect(snapshotDayOfExpiry.creationEvents.length).toEqual(0);
    expect(snapshotDayOfExpiry.repaymentEvents.length).toEqual(0);
    expect(snapshotDayOfExpiry.defaultedClaimEvents.length).toEqual(1);
    expect(snapshotDayOfExpiry.rolloverEvents.length).toEqual(0);
    expect(snapshotDayOfExpiry.clearinghouseEvents.length).toEqual(0);

    // Same for next day
    const snapshotDayAfterExpiry = snapshots[43];
    expect(snapshotDayAfterExpiry.date.toISOString()).toEqual("2023-09-13T23:59:59.000Z");
    expect(snapshotDayAfterExpiry.loans.length).toEqual(1);
    const snapshotDayAfterExpiryLoanOne = snapshotDayAfterExpiry.loans[0];
    expect(snapshotDayAfterExpiryLoanOne.loanId).toEqual(0);
    expect(snapshotDayAfterExpiryLoanOne.createdTimestamp).toEqual(1690876800);
    expect(snapshotDayAfterExpiryLoanOne.borrowerAddress).toEqual("0x01");
    expect(snapshotDayAfterExpiryLoanOne.lenderAddress).toEqual("0x02");
    expect(snapshotDayAfterExpiryLoanOne.principal).toEqual(99000);
    expect(snapshotDayAfterExpiryLoanOne.interest).toEqual(1000);
    expect(snapshotDayAfterExpiryLoanOne.collateralDeposited).toEqual(0);
    expect(snapshotDayAfterExpiryLoanOne.expiryTimestamp).toEqual(1694332800);
    expect(snapshotDayAfterExpiryLoanOne.secondsToExpiry).toEqual(0);
    expect(snapshotDayAfterExpiryLoanOne.status).toEqual("Reclaimed");
    expect(snapshotDayAfterExpiryLoanOne.amountRepaid).toEqual(1000);
    expect(snapshotDayAfterExpiryLoanOne.amountPayable).toEqual(0);
    expect(snapshotDayAfterExpiryLoanOne.interestIncome).toEqual(10); // From payment
    expect(snapshotDayAfterExpiryLoanOne.collateralClaimedQuantity).toEqual(29); // From default
    expect(snapshotDayAfterExpiryLoanOne.collateralClaimedValue).toEqual(29000); // From default
    expect(snapshotDayAfterExpiryLoanOne.collateralIncome).toEqual(29000 - (100000 - 1000)); // From default
    expect(snapshotDayAfterExpiry.creationEvents.length).toEqual(0);
    expect(snapshotDayAfterExpiry.repaymentEvents.length).toEqual(0);
    expect(snapshotDayAfterExpiry.defaultedClaimEvents.length).toEqual(0);
    expect(snapshotDayAfterExpiry.rolloverEvents.length).toEqual(0);
    expect(snapshotDayAfterExpiry.clearinghouseEvents.length).toEqual(0);
  });
});

// TODO Add tests for rollover
