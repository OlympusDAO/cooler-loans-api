import { DocumentData, Firestore, QueryDocumentSnapshot, Timestamp } from "@google-cloud/firestore";
import { getISO8601DateString } from "@repo/shared/date";

import { Loan, Snapshot, SnapshotLoanMap } from "../types/snapshotV1";

const FIRESTORE_ROOT_COLLECTION = "snapshots";
const FIRESTORE_LOAN_COLLECTION = "loans";

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

const LoanConverter = {
  toFirestore(loan: Loan): DocumentData {
    return loan;
  },
  fromFirestore(loan: QueryDocumentSnapshot): Loan {
    const data = loan.data();
    return data as Loan;
  },
};

export const getSnapshots = async (startDate: Date, beforeDate: Date, includeLoans: boolean): Promise<Snapshot[]> => {
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

  if (includeLoans === true) {
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
  }

  return snapshotRecords;
};
