import { File, Storage } from "@google-cloud/storage";
import { getEnv, logger } from "@repo/shared";
import { getISO8601DateString } from "@repo/shared/date";
import { LoanSnapshot } from "@repo/types/loanSnapshot";
import { Snapshot } from "@repo/types/snapshot";
import JSONL from "jsonl-parse-stringify";

import { LOAN_SNAPSHOT_DIR, SNAPSHOT_DIR } from "../constants";

const getBucket = () => {
  const bucketName = getEnv("SNAPSHOT_BUCKET");

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
  return `${SNAPSHOT_DIR}/dt=${getISO8601DateString(date)}/snapshot.jsonl`;
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
  return `${LOAN_SNAPSHOT_DIR}/dt=${getISO8601DateString(date)}/loanSnapshot.jsonl`;
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

/**
 * Get the snapshot for a given date.
 *
 * This retrieves the file from Google Cloud Storage.
 *
 * @param date - The date to get the snapshot for
 * @returns The snapshot
 */
export const getSnapshot = async (date: Date): Promise<Snapshot | null> => {
  logger.info(`Getting snapshot for date ${date.toISOString()}`);
  const [snapshotFile, snapshotExists] = await getSnapshotFile(date);

  if (!snapshotExists) {
    logger.warn(`Snapshot for date ${date.toISOString()} does not exist`);
    return null;
  }

  const [snapshot] = await snapshotFile.download();

  const snapshots = JSONL.parse(snapshot.toString()) as Snapshot[];

  if (snapshots.length === 0) {
    logger.warn(`Snapshot for date ${date.toISOString()} does not contain any snapshots`);
    return null;
  }

  return snapshots[0];
};

/**
 * Get the latest snapshot date.
 *
 * @returns The latest snapshot date or null if no snapshots exist
 */
export const getLatestSnapshotDate = async (): Promise<Date | null> => {
  logger.info(`Getting latest snapshot date`);
  const bucket = getBucket();

  // Get a listing of all the folders in the snapshot directory
  const [files] = await bucket.getFiles({ prefix: SNAPSHOT_DIR });

  // Get the latest snapshot date
  // Directory is in the format of /dt=<date>/
  const snapshotDates = files.map(file => {
    const dateString = file.name.split("dt=")[1].split("/")[0];

    return new Date(dateString);
  });

  // No snapshot directories found
  if (snapshotDates.length === 0) {
    return null;
  }

  logger.debug(`Found ${snapshotDates.length} snapshot dates`);

  // Sort in descending order, in place
  snapshotDates.sort((a, b) => b.getTime() - a.getTime());

  // Iterate through the sorted dates and return the first date that has a snapshot file that exists
  for (const snapshotDate of snapshotDates) {
    const [, snapshotExists] = await getSnapshotFile(snapshotDate);
    if (snapshotExists) {
      logger.info(`Found latest snapshot date: ${snapshotDate.toISOString()}`);
      return snapshotDate;
    }
  }

  return null;
};

/**
 * Write the snapshot for a given date to Google Cloud Storage.
 *
 * @param snapshot - The snapshot to write
 */
export const writeSnapshot = async (snapshot: Snapshot) => {
  const snapshotFile = getBucket().file(getSnapshotFilePath(new Date(snapshot.snapshotDate)));

  await snapshotFile.save(JSONL.stringify([snapshot]));
};

/**
 * Get the loan snapshots for a given date.
 *
 * This retrieves the file from Google Cloud Storage.
 *
 * @param date - The date to get the loan snapshots for
 * @returns The loan snapshots
 */
export const getLoanSnapshots = async (date: Date): Promise<LoanSnapshot[]> => {
  logger.info(`Getting loan snapshots for date ${date.toISOString()}`);
  const loanSnapshotFile = getBucket().file(getLoanSnapshotFilePath(date));

  const [loanSnapshotExists] = await loanSnapshotFile.exists();
  if (!loanSnapshotExists) {
    logger.warn(`Loan snapshots for date ${date.toISOString()} do not exist`);
    return [];
  }

  const [loanSnapshot] = await loanSnapshotFile.download();

  return JSONL.parse(loanSnapshot.toString()) as LoanSnapshot[];
};

/**
 * Write the loan snapshots for a given date to Google Cloud Storage.
 *
 * @param date - The date to write the loan snapshots for
 * @param loanSnapshots - The loan snapshots to write
 */
export const writeLoanSnapshots = async (date: Date, loanSnapshots: LoanSnapshot[]) => {
  const loanSnapshotFile = getBucket().file(getLoanSnapshotFilePath(date));

  await loanSnapshotFile.save(JSONL.stringify(loanSnapshots));
};
