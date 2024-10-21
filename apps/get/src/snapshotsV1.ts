import { isISO8601DateString } from "@repo/shared/date";
import { logger } from "@repo/shared/logging";
import express from "express";

import { getSnapshots } from "./helpers/firestore";

export const handleGetSnapshotsFirestore = async (req: express.Request, res: express.Response) => {
  const FUNC = "handleGetSnapshotsFirestore";

  // Get start and end parameters
  const startDate: string | undefined = req.query.startDate as string;
  const beforeDate: string | undefined = req.query.beforeDate as string;

  // Validate inputs
  if (!startDate || !beforeDate || !isISO8601DateString(startDate) || !isISO8601DateString(beforeDate)) {
    res.status(400).send("startDate and beforeDate must be set and in the format of YYYY-MM-DD");
    return;
  }

  // Grab from Firestore
  logger.info(`${FUNC}: Getting snapshots between ${startDate} and ${beforeDate}`);
  const snapshots = await getSnapshots(new Date(startDate), new Date(beforeDate), false);

  // Enable caching
  // Source: https://firebase.google.com/docs/hosting/manage-cache
  res.set("Cache-Control", "public, max-age=1800, s-maxage=1800");

  // Required to end the function
  res
    .json({
      records: snapshots,
    })
    .end();
};
