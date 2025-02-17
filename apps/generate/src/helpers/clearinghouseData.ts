import { BigQuery, BigQueryDate } from "@google-cloud/bigquery";
import { getISO8601DateString } from "@repo/shared/date";
import { getEnv } from "@repo/shared/env";
import { logger, throwError } from "@repo/shared/logging";
import type {
  ClaimDefaultedLoanEvent,
  Clearinghouse,
  ClearinghouseSnapshot,
  ClearLoanRequestEvent,
  CoolerLoan,
  CoolerLoanRequest,
  ExtendLoanEvent,
  RebalanceEvent,
  RepayLoanEvent,
} from "@repo/subgraph-cache-types";

import { ClearinghouseEvents } from "../types";

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

/**
 * Fetched subgraph data for the given date range from the BigQuery cache.
 */
export const getClearinghouseEvents = async (startDate: Date, beforeDate: Date): Promise<ClearinghouseEvents> => {
  // Get the BigQuery details
  const cacheProject = getEnv("CACHE_PROJECT");
  const cacheBigQueryDataset = getEnv("CACHE_BIGQUERY_DATASET");

  logger.info(
    `Fetching clearinghouse events for date range ${getISO8601DateString(startDate)} to ${getISO8601DateString(
      beforeDate,
    )}`,
  );

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
    WHERE dt >= '${getISO8601DateString(startDate)}' AND dt < '${getISO8601DateString(beforeDate)}'
  `,
  )) as ClearinghouseSnapshot[];
  logger.debug(`Fetched ${snapshotRows.length} clearinghouse snapshots`);

  // Creation events
  const creationRows = (await performQuery(
    bigQuery,
    `
    SELECT *
    FROM \`${cacheProject}.${cacheBigQueryDataset}.ClearLoanRequestEvent\`
    WHERE dt >= '${getISO8601DateString(startDate)}' AND dt < '${getISO8601DateString(beforeDate)}'
  `,
  )) as ClearLoanRequestEvent[];
  logger.debug(`Fetched ${creationRows.length} creation events`);

  // Repayment events
  const repaymentRows = (await performQuery(
    bigQuery,
    `
    SELECT *
    FROM \`${cacheProject}.${cacheBigQueryDataset}.RepayLoanEvent\`
    WHERE dt >= '${getISO8601DateString(startDate)}' AND dt < '${getISO8601DateString(beforeDate)}'
  `,
  )) as RepayLoanEvent[];
  logger.debug(`Fetched ${repaymentRows.length} repayment events`);

  // Defaulted claim events
  const defaultedClaimRows = (await performQuery(
    bigQuery,
    `
    SELECT *
    FROM \`${cacheProject}.${cacheBigQueryDataset}.ClaimDefaultedLoanEvent\`
    WHERE dt >= '${getISO8601DateString(startDate)}' AND dt < '${getISO8601DateString(beforeDate)}'
  `,
  )) as ClaimDefaultedLoanEvent[];
  logger.debug(`Fetched ${defaultedClaimRows.length} defaulted claim events`);

  // Extend events
  const extendRows = (await performQuery(
    bigQuery,
    `
    SELECT *
    FROM \`${cacheProject}.${cacheBigQueryDataset}.ExtendLoanEvent\`
    WHERE dt >= '${getISO8601DateString(startDate)}' AND dt < '${getISO8601DateString(beforeDate)}'
  `,
  )) as ExtendLoanEvent[];
  logger.debug(`Fetched ${extendRows.length} extend events`);

  // Created loans
  const createdLoansRows = (await performQuery(
    bigQuery,
    `
    SELECT *
    FROM \`${cacheProject}.${cacheBigQueryDataset}.CoolerLoan\`
    WHERE dt >= '${getISO8601DateString(startDate)}' AND dt < '${getISO8601DateString(beforeDate)}'
  `,
  )) as CoolerLoan[];
  logger.debug(`Fetched ${createdLoansRows.length} created loans`);

  // Loan requests
  const loanRequestRows = (await performQuery(
    bigQuery,
    `
    SELECT *
    FROM \`${cacheProject}.${cacheBigQueryDataset}.CoolerLoanRequest\`
    WHERE dt >= '${getISO8601DateString(startDate)}' AND dt < '${getISO8601DateString(beforeDate)}'
  `,
  )) as CoolerLoanRequest[];
  logger.debug(`Fetched ${loanRequestRows.length} loan requests`);

  // Clearinghouses
  const clearinghouseRows = (await performQuery(
    bigQuery,
    `
    SELECT *
    FROM \`${cacheProject}.${cacheBigQueryDataset}.Clearinghouse\`
    WHERE dt >= '2021-01-01'
  `, // Partitioning is required, so we add in a dummy date
  )) as Clearinghouse[];
  logger.debug(`Fetched ${clearinghouseRows.length} clearinghouses`);

  // Rebalance events
  const rebalanceRows = (await performQuery(
    bigQuery,
    `
    SELECT *
    FROM \`${cacheProject}.${cacheBigQueryDataset}.RebalanceEvent\`
    WHERE dt >= '${getISO8601DateString(startDate)}' AND dt < '${getISO8601DateString(beforeDate)}'
  `,
  )) as RebalanceEvent[];
  logger.debug(`Fetched ${rebalanceRows.length} rebalance events`);

  // Format
  // Each map is keyed on the date in YYYY-MM-DD format and has an array of events as the value
  // Clearinghouse snapshots
  const clearinghouseSnapshots = snapshotRows.reduce(
    (acc, row) => {
      const date = getDateValue(row.dt);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(row);
      return acc;
    },
    {} as Record<string, ClearinghouseSnapshot[]>,
  );
  logger.debug(`Clearinghouse snapshot dates: ${Object.keys(clearinghouseSnapshots).join(", ")}`);

  // Creation events
  const creationEvents = creationRows.reduce(
    (acc, row) => {
      const date = getDateValue(row.dt);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(row);
      return acc;
    },
    {} as Record<string, ClearLoanRequestEvent[]>,
  );
  logger.debug(`Creation event dates: ${Object.keys(creationEvents).join(", ")}`);

  // Repayment events
  const repaymentEvents = repaymentRows.reduce(
    (acc, row) => {
      const date = getDateValue(row.dt);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(row);
      return acc;
    },
    {} as Record<string, RepayLoanEvent[]>,
  );
  logger.debug(`Repayment event dates: ${Object.keys(repaymentEvents).join(", ")}`);
  // Defaulted claim events
  const defaultedClaimEvents = defaultedClaimRows.reduce(
    (acc, row) => {
      const date = getDateValue(row.dt);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(row);
      return acc;
    },
    {} as Record<string, ClaimDefaultedLoanEvent[]>,
  );
  logger.debug(`Defaulted claim event dates: ${Object.keys(defaultedClaimEvents).join(", ")}`);

  // Extend events
  const extendEvents = extendRows.reduce(
    (acc, row) => {
      const date = getDateValue(row.dt);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(row);
      return acc;
    },
    {} as Record<string, ExtendLoanEvent[]>,
  );
  logger.debug(`Extend event dates: ${Object.keys(extendEvents).join(", ")}`);

  // Created loans
  const createdLoans = createdLoansRows.reduce(
    (acc, row) => {
      const date = getDateValue(row.dt);
      if (!acc[date]) {
        acc[date] = {};
      }
      acc[date][row.id] = row;
      return acc;
    },
    {} as Record<string, Record<string, CoolerLoan>>,
  );
  logger.debug(`Created loan dates: ${Object.keys(createdLoans).join(", ")}`);

  // Loan requests
  const loanRequests = loanRequestRows.reduce(
    (acc, row) => {
      const date = getDateValue(row.dt);
      if (!acc[date]) {
        acc[date] = {};
      }
      acc[date][row.id] = row;
      return acc;
    },
    {} as Record<string, Record<string, CoolerLoanRequest>>,
  );
  logger.debug(`Loan request dates: ${Object.keys(loanRequests).join(", ")}`);

  // Clearinghouses
  const clearinghouses = clearinghouseRows.reduce(
    (acc, row) => {
      acc[row.address] = row;
      return acc;
    },
    {} as Record<string, Clearinghouse>,
  );

  // Rebalance events
  const rebalanceEvents = rebalanceRows.reduce(
    (acc, row) => {
      const date = getDateValue(row.dt);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(row);
      return acc;
    },
    {} as Record<string, RebalanceEvent[]>,
  );
  logger.debug(`Rebalance event dates: ${Object.keys(rebalanceEvents).join(", ")}`);

  logger.info(`Completed fetching clearinghouse events`);

  return {
    clearinghouseSnapshots,
    creationEvents,
    repaymentEvents,
    defaultedClaimEvents,
    extendEvents,
    createdLoans,
    loanRequests,
    clearinghouses,
    rebalanceEvents,
  };
};
