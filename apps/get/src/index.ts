import { isISO8601DateString } from "@repo/shared/date";
import express from "express";

import { getSnapshots } from "./helpers/bigquery";

export async function handleGet(req: express.Request, res: express.Response) {
  // Get start and end parameters
  const startDate: string | undefined = req.query.startDate as string;
  const beforeDate: string | undefined = req.query.beforeDate as string;

  // Validate inputs
  if (!startDate || !beforeDate || !isISO8601DateString(startDate) || !isISO8601DateString(beforeDate)) {
    res.status(400).send("startDate and beforeDate must be set and in the format of YYYY-MM-DD");
    return;
  }

  // Grab from Firestore
  console.log(`Getting snapshots between ${startDate} and ${beforeDate}`);
  const snapshots = await getSnapshots(new Date(startDate), new Date(beforeDate));

  res.json({
    records: snapshots,
  });

  // Enable caching
  // Source: https://firebase.google.com/docs/hosting/manage-cache
  res.set("Cache-Control", "public, max-age=1800, s-maxage=1800");

  // Required to end the function
  // https://cloud.google.com/functions/docs/concepts/nodejs-runtime#http_functions
  res.status(200);
  res.end();
}
