import { BigQuery } from "@google-cloud/bigquery";
import { getISO8601DateString } from "@repo/shared/date";
import { getEnv } from "@repo/shared/env";
import { logger } from "@repo/shared/logging";
import { parseNumber } from "@repo/shared/number";
import { Snapshot } from "@repo/types";

const performQuery = async (client: BigQuery, query: string) => {
  const [job] = await client.createQueryJob({
    query,
  });
  logger.debug(`Query job ${job.id} started.`);

  const [rows] = await job.getQueryResults();

  logger.debug(`Query job ${job.id} completed.`);

  return rows;
};

export const getSnapshots = async (startDate: Date, beforeDate: Date): Promise<Snapshot[]> => {
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
  // Skip the dt column, which is used for partitioning
  const snapshotRows = (await performQuery(
    bigQuery,
    `
    SELECT * EXCEPT (dt)
    FROM \`${gcpProject}.${bigQueryDataset}.${snapshotTable}\`
    WHERE dt >= '${getISO8601DateString(startDate)}' AND dt < '${getISO8601DateString(beforeDate)}'
  `,
  )) as Snapshot[];
  logger.debug(`Fetched ${snapshotRows.length} snapshots`);

  // All values are returned as strings
  // Convert the number values to the correct type
  const snapshots = snapshotRows.map(row => {
    const clearinghouses = row.clearinghouses.map(clearinghouse => {
      return {
        ...clearinghouse,
        daiBalance: parseNumber(clearinghouse.daiBalance),
        sDaiBalance: parseNumber(clearinghouse.sDaiBalance),
        sDaiInDaiBalance: parseNumber(clearinghouse.sDaiInDaiBalance),
        fundAmount: parseNumber(clearinghouse.fundAmount),
        fundCadence: parseNumber(clearinghouse.fundCadence),
      };
    });

    return {
      ...row,
      clearinghouses,
      clearinghouseTotals: {
        daiBalance: parseNumber(row.clearinghouseTotals.daiBalance),
        sDaiBalance: parseNumber(row.clearinghouseTotals.sDaiBalance),
        sDaiInDaiBalance: parseNumber(row.clearinghouseTotals.sDaiInDaiBalance),
      },
      expiryBuckets: {
        active: parseNumber(row.expiryBuckets.active),
        expired: parseNumber(row.expiryBuckets.expired),
        days30: parseNumber(row.expiryBuckets.days30),
        days121: parseNumber(row.expiryBuckets.days121),
      },
      collateralDeposited: parseNumber(row.collateralDeposited),
      collateralIncome: parseNumber(row.collateralIncome),
      interestIncome: parseNumber(row.interestIncome),
      interestReceivables: parseNumber(row.interestReceivables),
      principalReceivables: parseNumber(row.principalReceivables),
      terms: {
        ...row.terms,
        interestRate: parseNumber(row.terms.interestRate),
        duration: parseNumber(row.terms.duration),
        loanToCollateral: parseNumber(row.terms.loanToCollateral),
      },
      treasury: {
        ...row.treasury,
        daiBalance: parseNumber(row.treasury.daiBalance),
        sDaiBalance: parseNumber(row.treasury.sDaiBalance),
        sDaiInDaiBalance: parseNumber(row.treasury.sDaiInDaiBalance),
      },
    };
  });

  return snapshots;
};
