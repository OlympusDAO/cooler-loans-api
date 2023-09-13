import { adjustDate } from "../../../helpers/dateHelper";
import { generateSnapshots, Snapshot } from "../snapshot";
import { SubgraphData } from "../subgraph";

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
          loan: {
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
          },
        },
      ],
    },
    defaultedClaimEvents: {},
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
          loan: {
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
          },
        },
      ],
    },
    rolloverEvents: {},
  };
};

const validateSecondsToExpiry = (date: Date, loan: Record<string, any>, expiryTimestamp: number): void => {
  const dateTimestamp = date.getTime() / 1000;

  // The seconds to expiry should be the difference between the expiry timestamp and the current timestamp
  expect(loan.secondsToExpiry).toEqual(expiryTimestamp - dateTimestamp);
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
    expect(resultOne.date.toISOString()).toEqual("2022-01-01T00:00:00.000Z");
    expect(resultOne.receivables).toEqual(0);
    expect(resultOne.clearinghouse.daiBalance).toEqual(0);
    expect(resultOne.clearinghouse.sDaiBalance).toEqual(0);
    expect(resultOne.clearinghouse.sDaiInDaiBalance).toEqual(0);
    expect(resultOne.loans).toEqual([]);
    expect(resultOne.creationEvents).toEqual([]);
    expect(resultOne.defaultedClaimEvents).toEqual([]);
    expect(resultOne.repaymentEvents).toEqual([]);
    expect(resultOne.rolloverEvents).toEqual([]);

    expect(result.length).toEqual(31);
  });

  it("should generate a snapshot for each day in the date range", () => {
    const startDate = "2023-08-01";
    const endDate = "2023-08-31";
    const previousDateRecords: Snapshot | null = null;
    const subgraphData = getSampleData();

    const snapshots = generateSnapshots(startDate, endDate, previousDateRecords, subgraphData);

    expect(snapshots.length).toEqual(31);

    // Day 1 should have the correct values
    const snapshotOne = snapshots[0];
    expect(snapshotOne.date.toISOString()).toEqual("2023-08-01T00:00:00.000Z");
    expect(snapshotOne.receivables).toEqual(100000);
    expect(snapshotOne.clearinghouse.daiBalance).toEqual(10000000.0);
    expect(snapshotOne.clearinghouse.sDaiBalance).toEqual(500000.0);
    expect(snapshotOne.clearinghouse.sDaiInDaiBalance).toEqual(600000.01);
    expect(snapshotOne.loans.length).toEqual(1);
    expect(snapshotOne.loans[0].loanId).toEqual(0);
    expect(snapshotOne.loans[0].createdTimestamp).toEqual(1690876800);
    expect(snapshotOne.loans[0].borrowerAddress).toEqual("0x01");
    expect(snapshotOne.loans[0].lenderAddress).toEqual("0x02");
    expect(snapshotOne.loans[0].principal).toEqual(99000);
    expect(snapshotOne.loans[0].interest).toEqual(1000);
    expect(snapshotOne.loans[0].collateralDeposited).toEqual(30);
    expect(snapshotOne.loans[0].expiryTimestamp).toEqual(1694332800);
    validateSecondsToExpiry(snapshots[0].date, snapshots[0].loans[0], 1694332800);
    expect(snapshotOne.loans[0].status).toEqual("Active");
    expect(snapshotOne.loans[0].amountRepaid).toEqual(0);
    expect(snapshotOne.loans[0].amountPayable).toEqual(100000);
    expect(snapshotOne.loans[0].interestIncome).toEqual(0);
    expect(snapshotOne.loans[0].collateralClaimedQuantity).toEqual(0);
    expect(snapshotOne.loans[0].collateralClaimedValue).toEqual(0);

    // Days 2-9 should be the same
    for (let i = 1; i < 9; i++) {
      const currentSnapshot = snapshots[i];
      expect(currentSnapshot.date).toEqual(adjustDate(snapshotOne.date, i));
      expect(currentSnapshot.receivables).toEqual(100000);
      expect(currentSnapshot.clearinghouse.daiBalance).toEqual(10000000.0);
      expect(currentSnapshot.clearinghouse.sDaiBalance).toEqual(500000.0);
      expect(currentSnapshot.clearinghouse.sDaiInDaiBalance).toEqual(600000.01);
      expect(currentSnapshot.loans.length).toEqual(1);
      expect(currentSnapshot.loans[0].loanId).toEqual(snapshotOne.loans[0].loanId);
      expect(currentSnapshot.loans[0].createdTimestamp).toEqual(snapshotOne.loans[0].createdTimestamp);
      expect(currentSnapshot.loans[0].borrowerAddress).toEqual(snapshotOne.loans[0].borrowerAddress);
      expect(currentSnapshot.loans[0].lenderAddress).toEqual(snapshotOne.loans[0].lenderAddress);
      expect(currentSnapshot.loans[0].principal).toEqual(snapshotOne.loans[0].principal);
      expect(currentSnapshot.loans[0].interest).toEqual(snapshotOne.loans[0].interest);
      expect(currentSnapshot.loans[0].collateralDeposited).toEqual(snapshotOne.loans[0].collateralDeposited);
      expect(currentSnapshot.loans[0].expiryTimestamp).toEqual(snapshotOne.loans[0].expiryTimestamp);
      validateSecondsToExpiry(currentSnapshot.date, currentSnapshot.loans[0], 1694332800);
      expect(currentSnapshot.loans[0].status).toEqual(snapshotOne.loans[0].status);
      expect(currentSnapshot.loans[0].amountRepaid).toEqual(snapshotOne.loans[0].amountRepaid);
      expect(currentSnapshot.loans[0].amountPayable).toEqual(snapshotOne.loans[0].amountPayable);
      expect(currentSnapshot.loans[0].interestIncome).toEqual(snapshotOne.loans[0].interestIncome);
      expect(currentSnapshot.loans[0].collateralClaimedQuantity).toEqual(
        snapshotOne.loans[0].collateralClaimedQuantity,
      );
      expect(currentSnapshot.loans[0].collateralClaimedValue).toEqual(snapshotOne.loans[0].collateralClaimedValue);
    }

    // Day 10 should include the repayment
    const snapshotTen = snapshots[9];
    expect(snapshotTen.date.toISOString()).toEqual("2023-08-10T00:00:00.000Z");
    expect(snapshotTen.receivables).toEqual(100000 - 1000);
    expect(snapshotTen.clearinghouse.daiBalance).toEqual(10000000.0);
    expect(snapshotTen.clearinghouse.sDaiBalance).toEqual(500000.0);
    expect(snapshotTen.clearinghouse.sDaiInDaiBalance).toEqual(600000.01);
    expect(snapshotTen.loans.length).toEqual(1);
    expect(snapshotTen.loans[0].loanId).toEqual(0);
    expect(snapshotTen.loans[0].principal).toEqual(99000);
    expect(snapshotTen.loans[0].interest).toEqual(1000);
    expect(snapshotTen.loans[0].collateralDeposited).toEqual(29);
    expect(snapshotTen.loans[0].expiryTimestamp).toEqual(1694332800);
    validateSecondsToExpiry(snapshotTen.date, snapshotTen.loans[0], 1694332800);
    expect(snapshotTen.loans[0].status).toEqual("Active");
    expect(snapshotTen.loans[0].amountRepaid).toEqual(1000);
    expect(snapshotTen.loans[0].amountPayable).toEqual(100000 - 1000);
    expect(snapshotTen.loans[0].interestIncome).toEqual(10);
    expect(snapshotTen.loans[0].collateralClaimedQuantity).toEqual(0);
    expect(snapshotTen.loans[0].collateralClaimedValue).toEqual(0);

    // Days 11-19 should be the same
    for (let i = 10; i < 19; i++) {
      const currentSnapshot = snapshots[i];
      expect(currentSnapshot.date).toEqual(adjustDate(snapshotTen.date, i - 9));
      expect(currentSnapshot.receivables).toEqual(100000 - 1000);
      expect(currentSnapshot.clearinghouse.daiBalance).toEqual(10000000.0);
      expect(currentSnapshot.clearinghouse.sDaiBalance).toEqual(500000.0);
      expect(currentSnapshot.clearinghouse.sDaiInDaiBalance).toEqual(600000.01);
      expect(currentSnapshot.loans.length).toEqual(1);
      expect(currentSnapshot.loans[0].loanId).toEqual(snapshotTen.loans[0].loanId);
      expect(currentSnapshot.loans[0].createdTimestamp).toEqual(snapshotTen.loans[0].createdTimestamp);
      expect(currentSnapshot.loans[0].borrowerAddress).toEqual(snapshotTen.loans[0].borrowerAddress);
      expect(currentSnapshot.loans[0].lenderAddress).toEqual(snapshotTen.loans[0].lenderAddress);
      expect(currentSnapshot.loans[0].principal).toEqual(snapshotTen.loans[0].principal);
      expect(currentSnapshot.loans[0].interest).toEqual(snapshotTen.loans[0].interest);
      expect(currentSnapshot.loans[0].collateralDeposited).toEqual(snapshotTen.loans[0].collateralDeposited);
      expect(currentSnapshot.loans[0].expiryTimestamp).toEqual(snapshotTen.loans[0].expiryTimestamp);
      validateSecondsToExpiry(currentSnapshot.date, currentSnapshot.loans[0], 1694332800);
      expect(currentSnapshot.loans[0].status).toEqual(snapshotTen.loans[0].status);
      expect(currentSnapshot.loans[0].amountRepaid).toEqual(snapshotTen.loans[0].amountRepaid);
      expect(currentSnapshot.loans[0].amountPayable).toEqual(snapshotTen.loans[0].amountPayable);
      expect(currentSnapshot.loans[0].interestIncome).toEqual(snapshotTen.loans[0].interestIncome);
      expect(currentSnapshot.loans[0].collateralClaimedQuantity).toEqual(
        snapshotTen.loans[0].collateralClaimedQuantity,
      );
      expect(currentSnapshot.loans[0].collateralClaimedValue).toEqual(snapshotTen.loans[0].collateralClaimedValue);
    }

    // Day 20 should have the adjusted clearinghouse balances
    const snapshotTwenty = snapshots[19];
    expect(snapshotTwenty.date.toISOString()).toEqual("2023-08-20T00:00:00.000Z");
    expect(snapshotTwenty.receivables).toEqual(snapshotTen.receivables); // Ignores the clearinghouse snapshot
    expect(snapshotTwenty.clearinghouse.daiBalance).toEqual(9000000.0);
    expect(snapshotTwenty.clearinghouse.sDaiBalance).toEqual(500000.0);
    expect(snapshotTwenty.clearinghouse.sDaiInDaiBalance).toEqual(600000.01);
    expect(snapshotTwenty.loans.length).toEqual(1);
    expect(snapshotTwenty.loans[0].loanId).toEqual(snapshotTen.loans[0].loanId);
    expect(snapshotTwenty.loans[0].createdTimestamp).toEqual(snapshotTen.loans[0].createdTimestamp);
    expect(snapshotTwenty.loans[0].borrowerAddress).toEqual(snapshotTen.loans[0].borrowerAddress);
    expect(snapshotTwenty.loans[0].lenderAddress).toEqual(snapshotTen.loans[0].lenderAddress);
    expect(snapshotTwenty.loans[0].principal).toEqual(snapshotTen.loans[0].principal);
    expect(snapshotTwenty.loans[0].interest).toEqual(snapshotTen.loans[0].interest);
    expect(snapshotTwenty.loans[0].collateralDeposited).toEqual(snapshotTen.loans[0].collateralDeposited);
    expect(snapshotTwenty.loans[0].expiryTimestamp).toEqual(snapshotTen.loans[0].expiryTimestamp);
    validateSecondsToExpiry(snapshotTwenty.date, snapshotTwenty.loans[0], 1694332800);
    expect(snapshotTwenty.loans[0].status).toEqual(snapshotTen.loans[0].status);
    expect(snapshotTwenty.loans[0].amountRepaid).toEqual(snapshotTen.loans[0].amountRepaid);
    expect(snapshotTwenty.loans[0].amountPayable).toEqual(snapshotTen.loans[0].amountPayable);
    expect(snapshotTwenty.loans[0].interestIncome).toEqual(snapshotTen.loans[0].interestIncome);
    expect(snapshotTwenty.loans[0].collateralClaimedQuantity).toEqual(snapshotTen.loans[0].collateralClaimedQuantity);
    expect(snapshotTwenty.loans[0].collateralClaimedValue).toEqual(snapshotTen.loans[0].collateralClaimedValue);
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
    expect(snapshots[0].date.toISOString()).toEqual("2023-08-02T00:00:00.000Z");
    expect(snapshots[0].receivables).toEqual(100000);
    expect(snapshots[0].clearinghouse.daiBalance).toEqual(10000000.0);
    expect(snapshots[0].clearinghouse.sDaiBalance).toEqual(500000.0);
    expect(snapshots[0].clearinghouse.sDaiInDaiBalance).toEqual(600000.01);
    expect(snapshots[0].loans.length).toEqual(1);
    expect(snapshots[0].loans[0].loanId).toEqual(0);
    expect(snapshots[0].loans[0].createdTimestamp).toEqual(1690876800);
    expect(snapshots[0].loans[0].borrowerAddress).toEqual("0x01");
    expect(snapshots[0].loans[0].lenderAddress).toEqual("0x02");
    expect(snapshots[0].loans[0].principal).toEqual(99000);
    expect(snapshots[0].loans[0].interest).toEqual(1000);
    expect(snapshots[0].loans[0].collateralDeposited).toEqual(30);
    expect(snapshots[0].loans[0].expiryTimestamp).toEqual(1694332800);
    validateSecondsToExpiry(snapshots[0].date, snapshots[0].loans[0], 1694332800);
    expect(snapshots[0].loans[0].status).toEqual("Active");
    expect(snapshots[0].loans[0].amountRepaid).toEqual(0);
    expect(snapshots[0].loans[0].amountPayable).toEqual(100000);
    expect(snapshots[0].loans[0].interestIncome).toEqual(0);
    expect(snapshots[0].loans[0].collateralClaimedQuantity).toEqual(0);
    expect(snapshots[0].loans[0].collateralClaimedValue).toEqual(0);
  });
});

// TODO mark defaulted loans
