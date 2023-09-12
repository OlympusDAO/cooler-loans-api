import { Firestore } from "@google-cloud/firestore";

import { getISO8601DateString } from "../../helpers/dateHelper";
import { Snapshot, SnapshotDateMap } from "./snapshot";

const FIRESTORE_ROOT_COLLECTION = "snapshots";

const getClient = () => {
  return new Firestore();
};

export const getLatestCachedDate = async () => {
  // Get the Firestore client
  const client = getClient();

  // Get the latest snapshot
  const snapshot = await client.collection(FIRESTORE_ROOT_COLLECTION).orderBy("date", "desc").limit(1).get();

  // If there are no snapshots, return null
  if (snapshot.empty) {
    return null;
  }

  // Return the date
  return snapshot.docs[0].data().date;
};

export const getSnapshot = async (date: string): Promise<Snapshot | null> => {
  // Get the Firestore client
  const client = getClient();

  // Get the snapshot
  const snapshot = await client.collection(FIRESTORE_ROOT_COLLECTION).doc(date).get();

  // If there is no snapshot, return null
  if (!snapshot.exists) {
    return null;
  }

  // Return the snapshot
  return snapshot.data() as Snapshot;
};

export const writeSnapshots = async (snapshots: SnapshotDateMap) => {
  // Get the Firestore client
  const client = getClient();

  // Write the snapshots
  await Promise.all(
    Object.values(snapshots).map(snapshot => {
      return client.collection(FIRESTORE_ROOT_COLLECTION).doc(getISO8601DateString(snapshot.date)).set(snapshot);
    }),
  );
};
