import { BigQuery } from "@google-cloud/bigquery";
import { getISO8601DateString } from "@repo/shared/src/dateHelper";
import { getEnv } from "@repo/shared/src/env";
import { logger } from "@repo/shared/src/logging";

import {
  ClaimDefaultedLoanEvent,
  ClearinghouseEvents,
  ClearinghouseSnapshot,
  ClearLoanRequestEvent,
  ExtendLoanEvent,
  RepayLoanEvent,
} from "../types";

const performQuery = async (client: BigQuery, query: string) => {
  const [job] = await client.createQueryJob({
    query,
  });
  logger.info(`Query job ${job.id} started.`);

  const [rows] = await job.getQueryResults();

  logger.info(`Query job ${job.id} completed.`);

  return rows;
};

/**
 * Fetched subgraph data for the given date range from the BigQuery cache.
 */
export const getClearinghouseEvents = async (startDate: Date, beforeDate: Date): Promise<ClearinghouseEvents> => {
  // Get the BigQuery details
  const cacheProject = getEnv("CACHE_PROJECT");
  const cacheBigQueryDataset = getEnv("CACHE_BIGQUERY_DATASET");

  // Create a BigQuery client
  const bigQuery = new BigQuery({
    projectId: cacheProject,
  });

  // Get the clearinghouse snapshots
  const snapshotRows = (await performQuery(
    bigQuery,
    `
    SELECT * except(rebalanceEvents, defundEvents)
    FROM \`${cacheProject}.${cacheBigQueryDataset}.ClearinghouseSnapshot\`
    WHERE dt >= DATE('${BigQuery.date(getISO8601DateString(startDate))}') AND dt < DATE('${BigQuery.date(
      getISO8601DateString(beforeDate),
    )}')
  `,
  )) as ClearinghouseSnapshot[];

  // Creation events
  const creationRows = (await performQuery(
    bigQuery,
    `
    SELECT *
    FROM \`${cacheProject}.${cacheBigQueryDataset}.ClearLoanRequestEvent\`
    WHERE dt >= DATE('${BigQuery.date(getISO8601DateString(startDate))}') AND dt < DATE('${BigQuery.date(
      getISO8601DateString(beforeDate),
    )}')
  `,
  )) as ClearLoanRequestEvent[];

  // Repayment events
  const repaymentRows = (await performQuery(
    bigQuery,
    `
    SELECT *
    FROM \`${cacheProject}.${cacheBigQueryDataset}.RepayLoanEvent\`
    WHERE dt >= DATE('${BigQuery.date(getISO8601DateString(startDate))}') AND dt < DATE('${BigQuery.date(
      getISO8601DateString(beforeDate),
    )}')
  `,
  )) as RepayLoanEvent[];

  // Defaulted claim events
  const defaultedClaimRows = (await performQuery(
    bigQuery,
    `
    SELECT *
    FROM \`${cacheProject}.${cacheBigQueryDataset}.ClaimDefaultedLoanEvent\`
    WHERE dt >= DATE('${BigQuery.date(getISO8601DateString(startDate))}') AND dt < DATE('${BigQuery.date(
      getISO8601DateString(beforeDate),
    )}')
  `,
  )) as ClaimDefaultedLoanEvent[];

  // Extend events
  const extendRows = (await performQuery(
    bigQuery,
    `
    SELECT *
    FROM \`${cacheProject}.${cacheBigQueryDataset}.ExtendLoanEvent\`
    WHERE dt >= DATE('${BigQuery.date(getISO8601DateString(startDate))}') AND dt < DATE('${BigQuery.date(
      getISO8601DateString(beforeDate),
    )}')
  `,
  )) as ExtendLoanEvent[];

  // TODO do defund and rebalance events need to be included?

  // Format
  // Each map is keyed on the date in YYYY-MM-DD format and has an array of events as the value
  // Clearinghouse snapshots
  const clearinghouseSnapshots = snapshotRows.reduce(
    (acc, row) => {
      const date = getISO8601DateString(row.dt);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(row);
      return acc;
    },
    {} as Record<string, ClearinghouseSnapshot[]>,
  );

  // Creation events
  const creationEvents = creationRows.reduce(
    (acc, row) => {
      const date = getISO8601DateString(row.dt);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(row);
      return acc;
    },
    {} as Record<string, ClearLoanRequestEvent[]>,
  );

  // Repayment events
  const repaymentEvents = repaymentRows.reduce(
    (acc, row) => {
      const date = getISO8601DateString(row.dt);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(row);
      return acc;
    },
    {} as Record<string, RepayLoanEvent[]>,
  );

  // Defaulted claim events
  const defaultedClaimEvents = defaultedClaimRows.reduce(
    (acc, row) => {
      const date = getISO8601DateString(row.dt);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(row);
      return acc;
    },
    {} as Record<string, ClaimDefaultedLoanEvent[]>,
  );

  // Extend events
  const extendEvents = extendRows.reduce(
    (acc, row) => {
      const date = getISO8601DateString(row.dt);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(row);
      return acc;
    },
    {} as Record<string, ExtendLoanEvent[]>,
  );

  return {
    clearinghouseSnapshots,
    creationEvents,
    repaymentEvents,
    defaultedClaimEvents,
    extendEvents,
  };
};
