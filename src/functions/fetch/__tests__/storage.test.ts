import { Firestore } from "@google-cloud/firestore";

import { Snapshot } from "../snapshot";
import { getLatestCachedDate, getSnapshot, writeSnapshots } from "../storage";

// Set the variable to connect to the Firestore emulator
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

  for (const snapshot of snapshots) {
    await client.collection("snapshots").doc(snapshot.id).set(snapshot);
  }
};

beforeEach(async () => {
  // Clear the Firestore database
  const client = getFirestoreClient();
  const documents = await client.collection("snapshots").listDocuments();
  console.log("Clearing Firestore documents");
  for (const document of documents) {
    await document.delete();
  }
});

describe("getLatestCachedDate", () => {
  test("empty", async () => {
    const latestCachedDate = await getLatestCachedDate();

    expect(latestCachedDate).toBeNull();
  });

  test("returns the most recent date", async () => {
    addSnapshots([
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
  });
});

describe("writeSnapshots", () => {
  test("writes multiple snapshots, one per day", async () => {
    const snapshots: Snapshot[] = [
      {
        date: new Date("2020-01-01"),
        principalReceivables: 0,
        interestReceivables: 0,
        clearinghouse: {
          daiBalance: 0,
          sDaiBalance: 0,
          sDaiInDaiBalance: 0,
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
      },
      {
        date: new Date("2020-01-02"),
        principalReceivables: 0,
        interestReceivables: 0,
        clearinghouse: {
          daiBalance: 0,
          sDaiBalance: 0,
          sDaiInDaiBalance: 0,
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
      },
    ];

    await writeSnapshots(snapshots);

    const latestCachedDate = await getLatestCachedDate();
    expect(latestCachedDate).toEqual("2020-01-02");

    const snapshotOne = await getSnapshot(new Date("2020-01-01"));
    expect(snapshotOne?.date).toEqual(new Date("2020-01-01"));

    const snapshotTwo = await getSnapshot(new Date("2020-01-02"));
    expect(snapshotTwo?.date).toEqual(new Date("2020-01-02"));
  });
});
