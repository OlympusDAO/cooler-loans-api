import { getISO8601DateString } from "../../helpers/dateHelper";
import { getSnapshot, writeSnapshots } from "../../helpers/firestore";
import { Snapshot } from "../../types/snapshot";

type SnapshotCache = {
  [key: string]: Snapshot;
};

const cache: SnapshotCache = {};

export const getCachedSnapshot = async (date: Date): Promise<Snapshot | null> => {
  // Fetch from the cache
  const cachedSnapshot = cache[getISO8601DateString(date)];
  if (cachedSnapshot) {
    console.debug(`getCachedSnapshot: ${getISO8601DateString(date)}: Cache hit`);
    return cachedSnapshot;
  }

  // Otherwise fetch from Firestore
  console.debug(`getCachedSnapshot: ${getISO8601DateString(date)}: Cache miss`);
  const snapshot = await getSnapshot(date);
  if (snapshot) {
    console.debug("getCachedSnapshot: Stored in cache");
    cache[getISO8601DateString(date)] = snapshot;
  }

  return snapshot;
};

export const cacheSnapshots = (snapshots: Snapshot[]) => {
  console.debug("cacheSnapshots: Caching snapshots");
  for (const snapshot of snapshots) {
    // TODO consider marking if the cache has been changed, and use that to determine what to write. On the level of individual loans?
    console.debug(getISO8601DateString(snapshot.date));
    cache[getISO8601DateString(snapshot.date)] = snapshot;
  }
  console.debug("cacheSnapshots: Done");
};

export const writeCachedSnapshots = async () => {
  console.debug("writeCachedSnapshots: Writing cached snapshots");

  // Get an array of all cached snapshots
  const cachedSnapshots = Object.values(cache).sort((a, b) => a.date.getTime() - b.date.getTime());

  // Write all the snapshots in the cache
  await writeSnapshots(cachedSnapshots);

  if (cacheSnapshots.length > 0) {
    console.debug(
      `writeCachedSnapshots: Last snapshot date: ${getISO8601DateString(
        cachedSnapshots[cachedSnapshots.length - 1].date,
      )}`,
    );
  }
  console.debug("writeCachedSnapshots: Done");
};
