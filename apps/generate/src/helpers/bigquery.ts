import { BigQuery } from "@google-cloud/bigquery";
import { adjustDate, getEnv, getISO8601DateString, logger } from "@repo/shared";

import { LOAN_SNAPSHOT_DIR, SNAPSHOT_DIR } from "../constants";

const getSnapshotPath = (date: Date): string => {
  const bucketName = getEnv("SNAPSHOT_BUCKET");

  return `gs://${bucketName}/${SNAPSHOT_DIR}/dt=${getISO8601DateString(date)}/*`;
};

const getLoanSnapshotPath = (date: Date): string => {
  const bucketName = getEnv("SNAPSHOT_BUCKET");

  return `gs://${bucketName}/${LOAN_SNAPSHOT_DIR}/dt=${getISO8601DateString(date)}/*`;
};

export const refreshBigQueryMetadata = async (startDate: Date, endDate: Date) => {
  const gcpProject = getEnv("GCP_PROJECT");
  const bigQueryDataset = getEnv("BIGQUERY_DATASET");
  const bigQuerySnapshotTable = getEnv("BIGQUERY_SNAPSHOT_TABLE");
  const bigQueryLoanSnapshotTable = getEnv("BIGQUERY_LOAN_SNAPSHOT_TABLE");
  const snapshotTable = `${gcpProject}.${bigQueryDataset}.${bigQuerySnapshotTable}`;
  const loanSnapshotTable = `${gcpProject}.${bigQueryDataset}.${bigQueryLoanSnapshotTable}`;

  const snapshotPaths: string[] = [];
  const loanSnapshotPaths: string[] = [];

  for (let date = startDate; date <= endDate; date = adjustDate(date, 1)) {
    snapshotPaths.push(getSnapshotPath(date));
    loanSnapshotPaths.push(getLoanSnapshotPath(date));
  }

  logger.info(
    `Refreshing BigQuery metadata between dates ${getISO8601DateString(startDate)} and ${getISO8601DateString(
      endDate,
    )}`,
  );

  const client = new BigQuery();

  await client.createQueryJob({
    query: `CALL BQ.REFRESH_EXTERNAL_METADATA_CACHE('${snapshotTable}', [${snapshotPaths
      .map(value => `'${value}'`)
      .join(",")}])`,
  });
  logger.info(`Refreshed BigQuery metadata for snapshot table: ${snapshotTable}`);

  await client.createQueryJob({
    query: `CALL BQ.REFRESH_EXTERNAL_METADATA_CACHE('${loanSnapshotTable}', [${loanSnapshotPaths
      .map(value => `'${value}'`)
      .join(",")}])`,
  });
  logger.info(`Refreshed BigQuery metadata for loan snapshot table: ${loanSnapshotTable}`);
};
