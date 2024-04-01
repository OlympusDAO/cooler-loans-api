import { getISO8601DateString } from "../../helpers/dateHelper";
import { getSnapshot, writeSnapshots } from "../../helpers/storage";
import { Snapshot } from "../../types/snapshot";

type SnapshotCache = {
  [key: string]: Snapshot;
};

const cache: SnapshotCache = {};

export const getCachedSnapshot = async (date: Date): Promise<Snapshot | null> => {
  // Fetch from the cache
  const cachedSnapshot = cache[getISO8601DateString(date)];
  if (cachedSnapshot) {
    console.debug(`${getISO8601DateString(date)}: Cache hit`);
    return cachedSnapshot;
  }

  // Otherwise fetch from Firestore
  console.debug(`${getISO8601DateString(date)}: Cache miss`);
  const snapshot = await getSnapshot(date);
  if (snapshot) {
    console.debug("Stored in cache");
    cache[getISO8601DateString(date)] = snapshot;
  }

  return snapshot;
};

export const cacheSnapshots = (snapshots: Snapshot[]) => {
  console.debug("Caching snapshots");
  for (const snapshot of snapshots) {
    console.debug(getISO8601DateString(snapshot.date));
    cache[getISO8601DateString(snapshot.date)] = snapshot;
  }
  console.debug("Done");
};

export const writeCachedSnapshots = async () => {
  console.debug("Writing cached snapshots");

  // Get an array of all cached snapshots
  const cachedSnapshots = Object.values(cache);

  // Write all the snapshots in the cache
  await writeSnapshots(cachedSnapshots);
};
