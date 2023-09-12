import { adjustDate, getISO8601DateString, setMidnight } from "../../helpers/dateHelper";
import { generateSnapshots, Snapshot } from "./snapshot";
import { getLatestCachedDate, getSnapshot, writeSnapshots } from "./storage";
import { getData } from "./subgraph";

const INITIAL_DATE = "2023-09-01";

export const handler = async () => {
  // Determine the last cached date in Firestore
  const lastCachedDate: string | null = await getLatestCachedDate();
  const startDate: string = getISO8601DateString(setMidnight(adjustDate(new Date(lastCachedDate || INITIAL_DATE), -1)));
  const endDate: string = getISO8601DateString(setMidnight(adjustDate(new Date(), 1)));

  // Grab data from the subgraph
  const subgraphData = await getData(startDate, endDate);

  // Grab the previous date's data
  const previousSnapshot: Snapshot | null = await getSnapshot(startDate);

  // Prepare snapshots
  const dateSnapshots = generateSnapshots(startDate, endDate, previousSnapshot, subgraphData);

  // Write to the bucket
  await writeSnapshots(dateSnapshots);
};
