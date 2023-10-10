import { isISO8601DateString } from "../../helpers/dateHelper";
import { getSnapshots } from "../../helpers/storage";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function handleGet(req: any, res: any) {
  // Get start and end parameters
  const startDate: string | undefined = req.query.startDate as string;
  const beforeDate: string | undefined = req.query.beforeDate as string;

  // Validate inputs
  if (!startDate || !beforeDate || !isISO8601DateString(startDate) || !isISO8601DateString(beforeDate)) {
    res.status(400).send("startDate and beforeDate must be set and in the format of YYYY-MM-DD");
    return;
  }

  // Grab from Firestore
  const snapshots = await getSnapshots(new Date(startDate), new Date(beforeDate));

  // Enable caching
  // Source: https://firebase.google.com/docs/hosting/manage-cache
  res.set("Cache-Control", "public, max-age=300, s-maxage=600");

  // Required to end the function
  res
    .json({
      records: snapshots,
    })
    .end();
}
