import { adjustDate, setMidnight } from "../../helpers/dateHelper";
import { getLatestCachedDate } from "../../helpers/firestore";
import { LoanSnapshotMap } from "../../types/loanSnapshot";
import { Snapshot } from "../../types/snapshot";
import { cacheSnapshots, getCachedSnapshot, writeCachedSnapshots } from "./cache";
import { generateSnapshots } from "./snapshot";
import { getData } from "./subgraph";

const LAUNCH_DATE = "2023-09-21";
// So that the next 4 months of income can be projected
const DAYS_AFTER = 121;
const DAYS_OFFSET = 7;

const resolveSubgraphUrl = (): string => {
  const endpointUrl = process.env.GRAPHQL_ENDPOINT;
  if (!endpointUrl) {
    throw new Error(`The environment variable GRAPHQL_ENDPOINT must be set`);
  }

  const apiKey = process.env.SUBGRAPH_API_KEY;
  if (!apiKey) {
    throw new Error(
      `"SUBGRAPH_API_KEY environment variable is not set. Please set it to your Subgraph API key to query subgraphs"`,
    );
  }

  return endpointUrl.replace("[api-key]", apiKey);
};

const run = async (endpointUrl: string, startDate: Date, beforeDate: Date) => {
  console.log(`run: Generating snapshots from ${startDate.toISOString()} to ${beforeDate.toISOString()}`);

  // Fetch event data
  // TODO fetch from BigQuery
  const subgraphData = await getData(endpointUrl, startDate, beforeDate);

  // Grab the previous date's data
  const previousSnapshot: Snapshot | null = await getCachedSnapshot(adjustDate(startDate, -1));

  // Grab the previous date's loans
  const previousLoans: LoanSnapshotMap = {};

  // Prepare snapshots
  const dateSnapshots = generateSnapshots(startDate, beforeDate, previousSnapshot, previousLoans, subgraphData);

  // TODO consider writing data here

  // Update cache
  cacheSnapshots(dateSnapshots);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleGenerate = async (req: any, res: any) => {
  const endpointUrl = resolveSubgraphUrl();

  // Determine the last cached date in Firestore
  const lastCachedDate: string | null = await getLatestCachedDate();
  const startDate: Date = setMidnight(
    // Is the last cached date before the current date?
    lastCachedDate
      ? new Date(lastCachedDate) < new Date()
        ? adjustDate(new Date(lastCachedDate), -1) // If there is a cached date, use the day before to catch anything in between
        : adjustDate(new Date(), -1) // Otherwise, use the day before
      : new Date(LAUNCH_DATE), // Otherwise, use the launch date
  );
  console.debug(`handleGenerate: Starting from ${startDate.toISOString()}`);
  const todayMidnight = setMidnight(new Date());
  // Generate `DAYS_AFTER` days of snapshots if doing catch-up
  const beforeDate: Date = setMidnight(adjustDate(startDate < todayMidnight ? startDate : todayMidnight, DAYS_AFTER));
  console.debug(`handleGenerate: Up to ${beforeDate.toISOString()}`);

  let currentStartDate = new Date(startDate);
  let currentEndDate = adjustDate(new Date(startDate), DAYS_OFFSET);

  // Generate snapshots for every `DAYS_OFFSET` days
  // This avoids having too many records in memory at once
  // and fetching too many records over GraphQL
  while (currentEndDate < beforeDate) {
    await run(endpointUrl, currentStartDate, currentEndDate);

    currentStartDate = adjustDate(currentStartDate, DAYS_OFFSET);
    currentEndDate = adjustDate(currentEndDate, DAYS_OFFSET);
  }

  // Write the cache to Firestore
  await writeCachedSnapshots();

  // Required to end the function
  res.send("OK").end();
};
