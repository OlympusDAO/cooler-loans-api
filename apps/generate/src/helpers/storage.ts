// TODO
// [ ] Write snapshots to GCS
// [ ] Write loans to GCS
// [ ] Fetch snapshots from GCS
// [ ] Fetch loans from GCS

import { File, Storage } from "@google-cloud/storage";
import { getISO8601DateString } from "@repo/shared/src/dateHelper";
import { LoanSnapshot } from "@repo/types/src/loanSnapshot";
import { Snapshot } from "@repo/types/src/snapshot";

const SNAPSHOT_DIR = "snapshot";
const LOAN_SNAPSHOT_DIR = "loanSnapshot";

const getBucket = () => {
  const bucketName = process.env.BUCKET_NAME;
  if (!bucketName) {
    throw new Error("BUCKET_NAME environment variable is not set");
  }

  // Get the GCS bucket
  const bucket = new Storage().bucket(bucketName);

  return bucket;
};

/**
 * Get the path to the snapshot file for a given date
 *
 * Example:
 *
 * snapshot/dt=2024-10-01/snapshot.json
 *
 * @param date - The date to get the snapshot file path for
 * @returns The path to the snapshot file
 */
const getSnapshotFilePath = (date: Date) => {
  return `${SNAPSHOT_DIR}/dt=${getISO8601DateString(date)}/snapshot.json`;
};

/**
 * Get the path to the loan snapshot file for a given date
 *
 * Example:
 *
 * loanSnapshot/dt=2024-10-01/loanSnapshot.json
 *
 * @param date - The date to get the loan snapshot file path for
 * @returns The path to the loan snapshot file
 */
const getLoanSnapshotFilePath = (date: Date) => {
  return `${LOAN_SNAPSHOT_DIR}/dt=${getISO8601DateString(date)}/loanSnapshot.json`;
};

/**
 * Get the snapshot file for a given date
 *
 * @param date - The date to get the snapshot file for
 * @returns The snapshot file and a boolean indicating if it exists
 */
const getSnapshotFile = async (date: Date): Promise<[File, boolean]> => {
  const snapshotFile = getBucket().file(getSnapshotFilePath(date));

  const [snapshotExists] = await snapshotFile.exists();
  return [snapshotFile, snapshotExists];
};

export const getSnapshot = async (date: Date): Promise<Snapshot> => {
  const [snapshotFile, snapshotExists] = await getSnapshotFile(date);

  if (!snapshotExists) {
    throw new Error(`Snapshot for date ${date.toISOString()} does not exist`);
  }

  const [snapshot] = await snapshotFile.download();

  return JSON.parse(snapshot.toString()) as Snapshot;
};

export const getLatestSnapshotDate = async (): Promise<Date | null> => {
  const bucket = getBucket();

  // Get a listing of all the folders in the snapshot directory
  const [files] = await bucket.getFiles({ prefix: SNAPSHOT_DIR });

  // Get the latest snapshot date
  // Directory is in the format of /dt=<date>/
  const snapshotDates = files.map(file => {
    const dateString = file.name.split("dt=")[1];

    return new Date(dateString);
  });

  // No snapshot directories found
  if (snapshotDates.length === 0) {
    return null;
  }

  // Sort in descending order, in place
  snapshotDates.sort((a, b) => b.getTime() - a.getTime());

  // Iterate through the sorted dates and return the first date that has a snapshot file that exists
  for (const snapshotDate of snapshotDates) {
    const [, snapshotExists] = await getSnapshotFile(snapshotDate);
    if (snapshotExists) {
      return snapshotDate;
    }
  }

  return null;
};

export const writeSnapshot = async (snapshot: Snapshot) => {
  const snapshotFile = getBucket().file(getSnapshotFilePath(snapshot.snapshotDate));

  await snapshotFile.save(JSON.stringify(snapshot, null, 2));
};

export const getLoanSnapshots = async (date: Date): Promise<LoanSnapshot[]> => {
  const loanSnapshotFile = getBucket().file(getLoanSnapshotFilePath(date));

  const [loanSnapshotExists] = await loanSnapshotFile.exists();
  if (!loanSnapshotExists) {
    throw new Error(`Loan snapshots for date ${date.toISOString()} do not exist`);
  }

  const [loanSnapshot] = await loanSnapshotFile.download();

  return JSON.parse(loanSnapshot.toString()) as LoanSnapshot[];
};

export const writeLoanSnapshots = async (date: Date, loanSnapshots: LoanSnapshot[]) => {
  const loanSnapshotFile = getBucket().file(getLoanSnapshotFilePath(date));

  await loanSnapshotFile.save(JSON.stringify(loanSnapshots, null, 2));
};