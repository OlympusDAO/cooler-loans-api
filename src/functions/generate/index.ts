import { adjustDate, setMidnight } from "../../helpers/dateHelper";
import { getLatestCachedDate, getSnapshot, writeSnapshots } from "../../helpers/storage";
import { Snapshot } from "../../types/snapshot";
import { generateSnapshots } from "./snapshot";
import { getData } from "./subgraph";

const LAUNCH_DATE = "2023-09-21";
// So that the next 4 months of income can be projected
const DAYS_AFTER = 121;

const run = async (startDate: Date, beforeDate: Date) => {
  console.log(`Generating snapshots from ${startDate.toISOString()} to ${beforeDate.toISOString()}`);

  const endpointUrl = process.env.GRAPHQL_ENDPOINT;
  if (!endpointUrl) {
    throw new Error(`The environment variable GRAPHQL_ENDPOINT must be set`);
  }

  // Fetch event data
  const subgraphData = await getData(endpointUrl, startDate, beforeDate);

  // Grab the previous date's data
  const previousSnapshot: Snapshot | null = await getSnapshot(adjustDate(startDate, -1));

  // Prepare snapshots
  const dateSnapshots = generateSnapshots(startDate, beforeDate, previousSnapshot, subgraphData);

  // Write snapshots
  await writeSnapshots(dateSnapshots);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleGenerate = async (req: any, res: any) => {
  // Determine the last cached date in Firestore
  const lastCachedDate: string | null = await getLatestCachedDate();
  const startDate: Date = setMidnight(
    // Is the last cached date before the current date?
    lastCachedDate
      ? new Date(lastCachedDate) < new Date()
        ? adjustDate(new Date(lastCachedDate), -1) // If there is a cached date, use the day before to catch anything in between
        : new Date() // Otherwise, use the current date
      : new Date(LAUNCH_DATE), // Otherwise, use the launch date
  );
  const beforeDate: Date = setMidnight(adjustDate(new Date(), DAYS_AFTER));

  let currentStartDate = new Date(startDate);
  let currentEndDate = adjustDate(new Date(startDate), 7);

  // Generate snapshots for every 7 days
  // This avoids having too many records in memory at once
  // and fetching too many records over GraphQL
  while (currentEndDate < beforeDate) {
    await run(currentStartDate, currentEndDate);

    currentStartDate = adjustDate(currentStartDate, 7);
    currentEndDate = adjustDate(currentEndDate, 7);
  }

  // Required to end the function
  res.send("OK").end();
};
