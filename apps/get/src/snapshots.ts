import { isISO8601DateString } from "@repo/shared/date";
import express from "express";

import { getCurrentSnapshot, getEarliestSnapshot, getSnapshots } from "./helpers/bigquery";

const setHeaders = (res: express.Response) => {
  // Enable caching
  // Source: https://firebase.google.com/docs/hosting/manage-cache
  res.set("Cache-Control", "public, max-age=3600, s-maxage=3600");
};

export const handleGetSnapshots = async (req: express.Request, res: express.Response) => {
  // Get start and end parameters
  const startDate: string | undefined = req.query.startDate as string;
  const beforeDate: string | undefined = req.query.beforeDate as string;
  const orderBy: string = (req.query.orderBy as string) || "DESC";

  // Validate inputs
  if (!startDate || !beforeDate || !isISO8601DateString(startDate) || !isISO8601DateString(beforeDate)) {
    res.status(400).send("startDate and beforeDate must be set and in the format of YYYY-MM-DD");
    return;
  }

  if (orderBy !== "ASC" && orderBy !== "DESC") {
    res.status(400).send("orderBy must be set to ASC or DESC");
    return;
  }

  // Grab from BigQuery
  console.log(`Getting snapshots between ${startDate} and ${beforeDate}`);
  const snapshots = await getSnapshots(new Date(startDate), new Date(beforeDate), orderBy);

  setHeaders(res);

  // Send results and end
  res
    .status(200)
    .json({
      records: snapshots,
    })
    .end();
};

export const handleGetCurrentSnapshot = async (_req: express.Request, res: express.Response) => {
  // Grab from BigQuery
  const snapshot = await getCurrentSnapshot();

  setHeaders(res);

  // Send results and end
  res.status(200).json({ record: snapshot }).end();
};

export const handleGetEarliestSnapshot = async (_req: express.Request, res: express.Response) => {
  // Grab from BigQuery
  const snapshot = await getEarliestSnapshot();

  setHeaders(res);

  // Send results and end
  res.status(200).json({ record: snapshot }).end();
};
