import { Firestore } from "@google-cloud/firestore";

import { getLatestCachedDate, getSnapshot, getSnapshots, writeSnapshots } from "../../../helpers/firestore";
import { Loan, Snapshot } from "../../../types/snapshot";

// Set up the firestore emulator
process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";

const getFirestoreClient = () => {
  return new Firestore();
};

type SnapshotStub = {
  id: string;
  [key: string]: unknown;
};

const addSnapshots = async (snapshots: SnapshotStub[]) => {
  const client = getFirestoreClient();

  for (let i = 0; i < snapshots.length; i++) {
    const snapshot = snapshots[i];
    await client.collection("snapshots").doc(snapshot.id).set(snapshot);
  }
};

const clearFirestore = async () => {
  // Clear the Firestore database
  const client = getFirestoreClient();
  const documents = await client.collection("snapshots").listDocuments();
  console.log("Clearing Firestore documents");
  for (let i = 0; i < documents.length; i++) {
    const document = documents[i];
    await document.delete();
  }
};

const getSampleLoan = (id: string): Loan => {
  return {
    id: id,
    loanId: 1,
    createdTimestamp: 1704881410,
    coolerAddress: "0x4",
    borrowerAddress: "0x3",
    lenderAddress: "0x1",
    durationSeconds: 100,
    principal: 100,
    principalPaid: 0,
    interestRate: 0.005,
    interest: 0,
    interestPaid: 0,
    collateralDeposited: 10,
    expiryTimestamp: 1704881410,
    secondsToExpiry: 100,
    status: "Active",
    collateralIncome: 0,
    collateralClaimedQuantity: 0,
    collateralClaimedValue: 0,
  };
};

describe("getLatestCachedDate", () => {
  beforeEach(async () => {
    await clearFirestore();
  }, 10000);

  test("empty", async () => {
    const latestCachedDate = await getLatestCachedDate();

    expect(latestCachedDate).toBeNull();
  });

  test("returns the most recent date", async () => {
    await addSnapshots([
      {
        id: "2020-01-01",
        date: new Date("2020-01-01"),
      },
      {
        id: "2020-01-03",
        date: new Date("2020-01-03"),
      },
      {
        id: "2020-01-02",
        date: new Date("2020-01-02"),
      },
    ]);

    const latestCachedDate = await getLatestCachedDate();

    expect(latestCachedDate).toEqual("2020-01-03");
  }, 10000);
});

describe("writeSnapshots", () => {
  beforeEach(async () => {
    await clearFirestore();
  }, 10000);

  test("writes multiple snapshots, one per day", async () => {
    const snapshots: Snapshot[] = [
      {
        date: new Date("2020-01-01"),
        timestamp: new Date("2020-01-01").getTime(),
        principalReceivables: 0,
        interestReceivables: 0,
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
        treasury: {
          daiBalance: 0,
          sDaiBalance: 0,
          sDaiInDaiBalance: 0,
        },
        terms: {
          interestRate: 0,
          duration: 0,
          loanToCollateral: 0,
        },
        loans: {
          "0x3-1": getSampleLoan("0x3-1"),
        },
        expiryBuckets: {
          active: 0,
          expired: 100000,
          "30Days": 50000,
          "121Days": 60000,
        },
        creationEvents: [],
        defaultedClaimEvents: [],
        repaymentEvents: [],
        extendEvents: [],
        clearinghouseEvents: [],
        interestIncome: 0,
        collateralIncome: 0,
        collateralDeposited: 0,
      },
      {
        date: new Date("2020-01-02"),
        timestamp: new Date("2020-01-02").getTime(),
        principalReceivables: 0,
        interestReceivables: 0,
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
        treasury: {
          daiBalance: 0,
          sDaiBalance: 0,
          sDaiInDaiBalance: 0,
        },
        terms: {
          interestRate: 0,
          duration: 0,
          loanToCollateral: 0,
        },
        loans: {},
        expiryBuckets: {
          active: 1,
          expired: 100001,
          "30Days": 50001,
          "121Days": 60001,
        },
        creationEvents: [],
        defaultedClaimEvents: [],
        repaymentEvents: [],
        extendEvents: [],
        clearinghouseEvents: [],
        interestIncome: 0,
        collateralIncome: 0,
        collateralDeposited: 0,
      },
    ];

    await writeSnapshots(snapshots);

    const latestCachedDate = await getLatestCachedDate();
    expect(latestCachedDate).toEqual("2020-01-02");

    // Test getSnapshot
    const snapshotOne = await getSnapshot(new Date("2020-01-01"));
    expect(snapshotOne?.date).toEqual(new Date("2020-01-01"));
    expect(snapshotOne?.clearinghouse.daiBalance).toEqual(0);

    const snapshotTwo = await getSnapshot(new Date("2020-01-02"));
    expect(snapshotTwo?.date).toEqual(new Date("2020-01-02"));
    expect(snapshotTwo?.clearinghouse.daiBalance).toEqual(0);

    const snapshotOneLoanOne = snapshotOne?.loans["0x3-1"];
    expect(snapshotOneLoanOne?.principal).toEqual(100);

    expect(snapshotOne?.expiryBuckets.active).toEqual(0);
    expect(snapshotOne?.expiryBuckets.expired).toEqual(100000);
    expect(snapshotOne?.expiryBuckets["30Days"]).toEqual(50000);
    expect(snapshotOne?.expiryBuckets["121Days"]).toEqual(60000);

    // Test getSnapshots
    const snapshotResults = await getSnapshots(new Date("2020-01-01"), new Date("2020-01-03"), true);
    expect(snapshotResults.length).toEqual(2);

    const snapshotResultsOne = snapshotResults[0];
    expect(snapshotResultsOne.date).toEqual(new Date("2020-01-01"));
    expect(snapshotResultsOne.clearinghouse.daiBalance).toEqual(0);

    expect(snapshotResultsOne?.expiryBuckets.active).toEqual(0);
    expect(snapshotResultsOne?.expiryBuckets.expired).toEqual(100000);
    expect(snapshotResultsOne?.expiryBuckets["30Days"]).toEqual(50000);
    expect(snapshotResultsOne?.expiryBuckets["121Days"]).toEqual(60000);

    const snapshotResultsTwo = snapshotResults[1];
    expect(snapshotResultsTwo.date).toEqual(new Date("2020-01-02"));
    expect(snapshotResultsTwo.clearinghouse.daiBalance).toEqual(0);

    const snapshotResultsOneLoanOne = snapshotResultsOne.loans["0x3-1"];
    expect(snapshotResultsOneLoanOne?.principal).toEqual(100);

    // Test getSnapshots without loans
    const snapshotResultsWithoutLoans = await getSnapshots(new Date("2020-01-01"), new Date("2020-01-03"), false);
    expect(snapshotResultsWithoutLoans[0].loans.length).toEqual(0);
    expect(snapshotResultsWithoutLoans[1].loans.length).toEqual(0);
  }, 10000);
});
