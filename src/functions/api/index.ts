import { Response } from "express-serve-static-core";

import { isISO8601DateString } from "../../helpers/dateHelper";
import { getSnapshots } from "../../helpers/storage";
import { TypedRequest } from "./typedRequest";

export async function handler(req: TypedRequest<{ startDate: string; beforeDate: string }>, res: Response) {
  // Get start and end parameters
  const startDate: string | undefined = req.query.startDate;
  const beforeDate: string | undefined = req.query.beforeDate;

  // Validate inputs
  if (!startDate || !beforeDate || !isISO8601DateString(startDate) || !isISO8601DateString(beforeDate)) {
    res.status(400).send("startDate and beforeDate must be set and in the format of YYYY-MM-DD");
    return;
  }

  // Grab from Firestore
  const snapshots = await getSnapshots(new Date(startDate), new Date(beforeDate));

  // Return
  return snapshots;
}
