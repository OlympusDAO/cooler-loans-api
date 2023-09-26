import { adjustDate, setMidnight } from "../../helpers/dateHelper";
import { getLatestCachedDate, getSnapshot, writeSnapshots } from "../../helpers/storage";
import { Snapshot } from "../../types/snapshot";
import { generateSnapshots } from "./snapshot";
import { getData } from "./subgraph";

const LAUNCH_DATE = "2023-09-21";
// So that the next 4 months of income can be projected
const DAYS_AFTER = 121;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleGenerate = async (req: any, res: any) => {
  // Determine the last cached date in Firestore
  const lastCachedDate: string | null = await getLatestCachedDate();
  const startDate: Date = setMidnight(adjustDate(new Date(lastCachedDate || LAUNCH_DATE), -1));
  const beforeDate: Date = setMidnight(adjustDate(new Date(), DAYS_AFTER));

  const endpointUrl = process.env.GRAPHQL_ENDPOINT;
  if (!endpointUrl) {
    throw new Error(`The environment variable GRAPHQL_ENDPOINT must be set`);
  }

  // Fetch event data
  const subgraphData = await getData(endpointUrl, startDate, beforeDate);

  // Grab the previous date's data
  const previousSnapshot: Snapshot | null = await getSnapshot(startDate);

  // Prepare snapshots
  const dateSnapshots = generateSnapshots(startDate, beforeDate, previousSnapshot, subgraphData);

  // Write snapshots
  await writeSnapshots(dateSnapshots);

  // Required to end the function
  res.send("OK").end();
};
