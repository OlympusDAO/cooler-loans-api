import { adjustDate, getISO8601DateString, setMidnight } from "../../helpers/dateHelper";
import { generateSnapshots } from "./snapshot";
import { getLatestCachedDate, writeSnapshots } from "./storage";
import { getData } from "./subgraph";

export const handler = async () => {
  // Determine the last cached date in Firestore
  const lastCachedDate: string = await getLatestCachedDate();
  const startDate: string = getISO8601DateString(setMidnight(adjustDate(new Date(lastCachedDate), -1)));
  const endDate: string = getISO8601DateString(setMidnight(adjustDate(new Date(), 1)));

  // Grab data from the subgraph
  const subgraphData = await getData(startDate, endDate);

  // Prepare snapshots
  const dateSnapshots = generateSnapshots(startDate, endDate, subgraphData);

  // Write to the bucket
  await writeSnapshots(dateSnapshots);
};
