import { DocumentData, Firestore, QueryDocumentSnapshot, Timestamp } from "@google-cloud/firestore";

import { Snapshot } from "../types/snapshot";
import { getISO8601DateString } from "./dateHelper";

const FIRESTORE_ROOT_COLLECTION = "snapshots";

const getClient = () => {
  return new Firestore();
};

const SnapshotConverter = {
  toFirestore(snapshot: Snapshot): DocumentData {
    return {
      ...snapshot,
      date: Timestamp.fromDate(snapshot.date),
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Snapshot {
    const data = snapshot.data();
    return {
      ...data,
      date: data.date.toDate(),
    } as Snapshot;
  },
};

export const getLatestCachedDate = async (): Promise<string | null> => {
  // Get the Firestore client
  const client = getClient();

  // Get the latest snapshot
  const snapshot = await client
    .collection(FIRESTORE_ROOT_COLLECTION)
    .withConverter(SnapshotConverter)
    .orderBy("date", "desc")
    .limit(1)
    .get();
  // If there are no snapshots, return null
  if (snapshot.empty) {
    return null;
  }

  return getISO8601DateString(snapshot.docs[0].data().date);
};

export const getSnapshot = async (date: Date): Promise<Snapshot | null> => {
  // Get the Firestore client
  const client = getClient();

  // Get the snapshot
  const snapshot = await client
    .collection(FIRESTORE_ROOT_COLLECTION)
    .withConverter(SnapshotConverter)
    .doc(getISO8601DateString(date))
    .get();

  // If there is no snapshot, return null
  const snapshotData = snapshot.data();
  if (!snapshot.exists || !snapshotData) {
    return null;
  }

  // Return the snapshot
  return snapshotData;
};

export const getSnapshots = async (startDate: Date, beforeDate: Date): Promise<Snapshot[]> => {
  // Get the Firestore client
  const client = getClient();

  // Get the snapshot
  const snapshots = await client
    .collection(FIRESTORE_ROOT_COLLECTION)
    .withConverter(SnapshotConverter)
    .where("date", ">=", startDate)
    .where("date", "<", beforeDate)
    .get();

  // If there is no snapshot, return null
  return snapshots.docs.map(snapshot => snapshot.data());
};

export const writeSnapshots = async (snapshots: Snapshot[]) => {
  // Get the Firestore client
  const client = getClient();
  console.log(`Writing ${snapshots.length} snapshots`);

  // Write the snapshots
  for (let i = 0; i < snapshots.length; i++) {
    const snapshot = snapshots[i];
    await client
      .collection(FIRESTORE_ROOT_COLLECTION)
      .withConverter(SnapshotConverter)
      .doc(getISO8601DateString(snapshot.date))
      .set(snapshot);
  }
  console.log("Finished writing snapshots");
};
