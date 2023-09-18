import { adjustDate, setMidnight } from "../../helpers/dateHelper";
import { getLatestCachedDate, getSnapshot, writeSnapshots } from "../../helpers/storage";
import { Snapshot } from "../../types/snapshot";
import { generateSnapshots } from "./snapshot";
import { getData } from "./subgraph";

const INITIAL_DATE = "2023-09-01";

export const handleGenerate = async () => {
  // Determine the last cached date in Firestore
  const lastCachedDate: string | null = await getLatestCachedDate();
  const startDate: Date = setMidnight(adjustDate(new Date(lastCachedDate || INITIAL_DATE), -1));
  const beforeDate: Date = setMidnight(adjustDate(new Date(), 1)); // So that all of the current day is captured

  // Fetch event data
  const subgraphData = await getData(startDate, beforeDate);

  // Grab the previous date's data
  const previousSnapshot: Snapshot | null = await getSnapshot(startDate);

  // Prepare snapshots
  const dateSnapshots = generateSnapshots(startDate, beforeDate, previousSnapshot, subgraphData);

  // Write snapshots
  await writeSnapshots(dateSnapshots);
};
