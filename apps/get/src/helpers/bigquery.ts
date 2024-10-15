import { BigQuery, BigQueryDate } from "@google-cloud/bigquery";
import { getISO8601DateString } from "@repo/shared/date";
import { getEnv } from "@repo/shared/env";
import { logger, throwError } from "@repo/shared/logging";

const performQuery = async (client: BigQuery, query: string) => {
  const [job] = await client.createQueryJob({
    query,
  });
  logger.debug(`Query job ${job.id} started.`);

  const [rows] = await job.getQueryResults();

  logger.debug(`Query job ${job.id} completed.`);

  return rows;
};

const getDateValue = (date: unknown): string => {
  if (typeof date !== "object" || date === null) {
    throwError("object expected");
  }

  const bqDate = date as BigQueryDate;
  return bqDate.value;
};

export const getSnapshots = async (startDate: Date, beforeDate: Date) => {
  // Get the BigQuery details
  const gcpProject = getEnv("GCP_PROJECT");
  const bigQueryDataset = getEnv("BIGQUERY_DATASET");
  const snapshotTable = getEnv("BIGQUERY_SNAPSHOT_TABLE");

  logger.info(
    `Fetching clearinghouse events for date range ${getISO8601DateString(startDate)} to ${getISO8601DateString(
      beforeDate,
    )}`,
  );

  // Create a BigQuery client
  const bigQuery = new BigQuery({});

  // Get the snapshots
  const snapshotRows = await performQuery(
    bigQuery,
    `
    SELECT *
    FROM \`${gcpProject}.${bigQueryDataset}.${snapshotTable}\`
    WHERE dt >= '${getISO8601DateString(startDate)}' AND dt < '${getISO8601DateString(beforeDate)}'
  `,
  );
  logger.debug(`Fetched ${snapshotRows.length} snapshots`);

  // Convert the dt column values to a date string
  const snapshots = snapshotRows.map(row => {
    return {
      ...row,
      dt: getDateValue(row.dt),
    };
  });

  return snapshots;
};
