import { getISO8601DateString } from "../../helpers/dateHelper";
import { getSnapshot, writeSnapshots } from "../../helpers/storage";
import { Snapshot } from "../../types/snapshot";

type SnapshotCache = {
  [key: string]: Snapshot;
};

const cache: SnapshotCache = {};

export const getCachedSnapshot = async (date: Date): Promise<Snapshot | null> => {
  // Fetch from the cache
  const cachedSnapshot = cache[date.toISOString()];
  if (cachedSnapshot) {
    console.debug(`${getISO8601DateString(date)}: Cache hit`);
    return cachedSnapshot;
  }

  // Otherwise fetch from Firestore
  console.debug(`${getISO8601DateString(date)}: Cache miss`);
  const snapshot = await getSnapshot(date);
  if (snapshot) {
    cache[getISO8601DateString(date)] = snapshot;
  }

  return snapshot;
};

export const cacheSnapshots = async (snapshots: Snapshot[]) => {
  console.debug("Caching snapshots");
  for (const snapshot of snapshots) {
    cache[getISO8601DateString(snapshot.date)] = snapshot;
  }
  console.debug("Done");
};

export const writeCachedSnapshots = async () => {
  // Get an array of all cached snapshots
  const cachedSnapshots = Object.values(cache);

  // Write all the snapshots in the cache
  await writeSnapshots(cachedSnapshots);
};
