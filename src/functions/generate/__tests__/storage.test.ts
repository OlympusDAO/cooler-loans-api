import { Firestore } from "@google-cloud/firestore";

import { getLatestCachedDate, getSnapshot, writeSnapshots } from "../../../helpers/storage";
import { Snapshot } from "../../../types/snapshot";

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
        loans: {},
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

    const snapshotOne = await getSnapshot(new Date("2020-01-01"));
    expect(snapshotOne?.date).toEqual(new Date("2020-01-01"));
    expect(snapshotOne?.clearinghouse.daiBalance).toEqual(0);

    const snapshotTwo = await getSnapshot(new Date("2020-01-02"));
    expect(snapshotTwo?.date).toEqual(new Date("2020-01-02"));
    expect(snapshotTwo?.clearinghouse.daiBalance).toEqual(0);
  }, 10000);
});
