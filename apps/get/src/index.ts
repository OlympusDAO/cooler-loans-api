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

  // Grab from BigQuery
  console.log(`Getting snapshots between ${startDate} and ${beforeDate}`);
  const snapshots = await getSnapshots(new Date(startDate), new Date(beforeDate));

  // Enable caching
  // Source: https://firebase.google.com/docs/hosting/manage-cache
  res.set("Cache-Control", "public, max-age=1800, s-maxage=1800");

  // Handle CORS
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    res.status(204).send("");
    return;
  }

  // Send results and end
  res
    .status(200)
    .json({
      records: snapshots,
    })
    .end();
}
