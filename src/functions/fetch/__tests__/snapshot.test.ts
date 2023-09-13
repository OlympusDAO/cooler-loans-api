import { adjustDate } from "../../../helpers/dateHelper";
import { generateSnapshots, Snapshot } from "../snapshot";
import { SubgraphData } from "../subgraph";

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
    expect(snapshotOne.date.toISOString()).toEqual("2023-08-01T23:59:59.000Z");
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
    expect(snapshotOne.loans[0].secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotOne.date, snapshotOne.loans[0].expiryTimestamp),
    );
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
      expect(currentSnapshot.loans[0].secondsToExpiry).toEqual(
        getSecondsToExpiry(currentSnapshot.date, snapshotOne.loans[0].expiryTimestamp),
      );
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
    expect(snapshotTen.date.toISOString()).toEqual("2023-08-10T23:59:59.000Z");
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
    expect(snapshotTen.loans[0].secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotTen.date, snapshotOne.loans[0].expiryTimestamp),
    );
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
      expect(currentSnapshot.loans[0].secondsToExpiry).toEqual(
        getSecondsToExpiry(currentSnapshot.date, snapshotOne.loans[0].expiryTimestamp),
      );
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
    expect(snapshotTwenty.date.toISOString()).toEqual("2023-08-20T23:59:59.000Z");
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
    expect(snapshotTwenty.loans[0].secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotTwenty.date, snapshotOne.loans[0].expiryTimestamp),
    );
    expect(snapshotTwenty.loans[0].status).toEqual(snapshotTen.loans[0].status);
    expect(snapshotTwenty.loans[0].amountRepaid).toEqual(snapshotTen.loans[0].amountRepaid);
    expect(snapshotTwenty.loans[0].amountPayable).toEqual(snapshotTen.loans[0].amountPayable);
    expect(snapshotTwenty.loans[0].interestIncome).toEqual(snapshotTen.loans[0].interestIncome);
    expect(snapshotTwenty.loans[0].collateralClaimedQuantity).toEqual(snapshotTen.loans[0].collateralClaimedQuantity);
    expect(snapshotTwenty.loans[0].collateralClaimedValue).toEqual(snapshotTen.loans[0].collateralClaimedValue);
  });

  it("should handle loan expiry", () => {
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
    expect(snapshotDayOfExpiry.loans[0].loanId).toEqual(0);
    expect(snapshotDayOfExpiry.loans[0].createdTimestamp).toEqual(1690876800);
    expect(snapshotDayOfExpiry.loans[0].borrowerAddress).toEqual("0x01");
    expect(snapshotDayOfExpiry.loans[0].lenderAddress).toEqual("0x02");
    expect(snapshotDayOfExpiry.loans[0].principal).toEqual(99000);
    expect(snapshotDayOfExpiry.loans[0].interest).toEqual(1000);
    expect(snapshotDayOfExpiry.loans[0].collateralDeposited).toEqual(29);
    expect(snapshotDayOfExpiry.loans[0].expiryTimestamp).toEqual(1694332800);
    expect(snapshotDayOfExpiry.loans[0].secondsToExpiry).toEqual(0);
    expect(snapshotDayOfExpiry.loans[0].status).toEqual("Expired");
    expect(snapshotDayOfExpiry.loans[0].amountRepaid).toEqual(1000);
    expect(snapshotDayOfExpiry.loans[0].amountPayable).toEqual(100000 - 1000);
    expect(snapshotDayOfExpiry.loans[0].interestIncome).toEqual(10); // From payment
    expect(snapshotDayOfExpiry.loans[0].collateralClaimedQuantity).toEqual(0);
    expect(snapshotDayOfExpiry.loans[0].collateralClaimedValue).toEqual(0);
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
    const snapshotOne = snapshots[0];
    expect(snapshotOne.date.toISOString()).toEqual("2023-08-02T23:59:59.000Z");
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
    expect(snapshotOne.loans[0].secondsToExpiry).toEqual(
      getSecondsToExpiry(snapshotOne.date, snapshotOne.loans[0].expiryTimestamp),
    );
    expect(snapshotOne.loans[0].status).toEqual("Active");
    expect(snapshotOne.loans[0].amountRepaid).toEqual(0);
    expect(snapshotOne.loans[0].amountPayable).toEqual(100000);
    expect(snapshotOne.loans[0].interestIncome).toEqual(0);
    expect(snapshotOne.loans[0].collateralClaimedQuantity).toEqual(0);
    expect(snapshotOne.loans[0].collateralClaimedValue).toEqual(0);
  });
});

// TODO mark defaulted loans
