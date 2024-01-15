import { DocumentData, Firestore, QueryDocumentSnapshot, Timestamp } from "@google-cloud/firestore";

import { Loan, Snapshot, SnapshotLoanMap } from "../types/snapshot";
import { getISO8601DateString } from "./dateHelper";

const FIRESTORE_ROOT_COLLECTION = "snapshots";
const FIRESTORE_LOAN_COLLECTION = "loans";

const getClient = () => {
  return new Firestore();
};

function deepCopy<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date((obj as Date).getTime()) as unknown as T;
  }

  if (Array.isArray(obj)) {
    return (obj as Array<unknown>).map(deepCopy) as unknown as T;
  }

  const copy: Record<string, unknown> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = deepCopy((obj as Record<string, unknown>)[key]);
    }
  }

  return copy as T;
}

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

const LoanConverter = {
  toFirestore(loan: Loan): DocumentData {
    return loan;
  },
  fromFirestore(loan: QueryDocumentSnapshot): Loan {
    const data = loan.data();
    return data as Loan;
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

  // Get the loans
  const loans = await client
    .collection(FIRESTORE_ROOT_COLLECTION)
    .doc(getISO8601DateString(date))
    .collection(FIRESTORE_LOAN_COLLECTION)
    .withConverter(LoanConverter)
    .get();
  let loanMap: SnapshotLoanMap = {};
  if (!loans.empty) {
    loanMap = loans.docs.reduce((accumulator, currentValue) => {
      const loan = currentValue.data();
      accumulator[loan.id] = loan;
      return accumulator;
    }, {} as SnapshotLoanMap);
  }

  // Add the loans into the snapshot
  snapshotData.loans = loanMap;

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
  const snapshotRecords = snapshots.docs.map(snapshot => snapshot.data());

  // Iterate over the snapshots
  for (let i = 0; i < snapshotRecords.length; i++) {
    const snapshot = snapshotRecords[i];

    // Get the loans
    const loans = await client
      .collection(FIRESTORE_ROOT_COLLECTION)
      .doc(getISO8601DateString(snapshot.date))
      .collection(FIRESTORE_LOAN_COLLECTION)
      .withConverter(LoanConverter)
      .get();
    let loanMap: SnapshotLoanMap = {};
    if (!loans.empty) {
      loanMap = loans.docs.reduce((accumulator, currentValue) => {
        const loan = currentValue.data();
        accumulator[loan.id] = loan;
        return accumulator;
      }, {} as SnapshotLoanMap);
    }

    // Add the loans into the snapshot
    snapshot.loans = loanMap;
  }

  return snapshotRecords;
};

const writeLoans = async (snapshotDate: Date, loans: Loan[]) => {
  // Get the Firestore client
  const client = getClient();

  // Write the loans
  for (let i = 0; i < loans.length; i++) {
    const loan = loans[i];

    await client
      .collection(FIRESTORE_ROOT_COLLECTION)
      .doc(getISO8601DateString(snapshotDate))
      .collection(FIRESTORE_LOAN_COLLECTION)
      .withConverter(LoanConverter)
      .doc(loan.id)
      .set(loan);
  }
};

export const writeSnapshots = async (snapshots: Snapshot[]) => {
  // Get the Firestore client
  const client = getClient();
  console.log(`Writing ${snapshots.length} snapshots`);

  // Write the snapshots
  for (let i = 0; i < snapshots.length; i++) {
    const currentSnapshot = snapshots[i];

    // Do a deep copy of the snapshot, as it will be modified
    const snapshot = deepCopy(currentSnapshot) as Snapshot;

    // Extract the loans
    const loans: Loan[] = Object.values(snapshot.loans);

    // Delete the loans from the snapshot
    snapshot.loans = {};

    console.log(`typeof snapshot.date: ${typeof snapshot.date}`);

    // Write the snapshot
    await client
      .collection(FIRESTORE_ROOT_COLLECTION)
      .withConverter(SnapshotConverter)
      .doc(getISO8601DateString(snapshot.date))
      .set(snapshot);

    // Write the loans in a sub-collection in order to avoid hitting document limits
    await writeLoans(snapshot.date, loans);
  }
  console.log("Finished writing snapshots");
};
