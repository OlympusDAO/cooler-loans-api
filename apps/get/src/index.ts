import cors from "cors";
import express from "express";

import { handleGetCurrentSnapshot, handleGetEarliestSnapshot, handleGetSnapshots } from "./snapshots";
import { handleGetSnapshotsFirestore } from "./snapshotsV1";

const app = express();

// Allow cross-origin requests
app.use(cors({ origin: true }));

// Routes

// Backwards-compatibility, to be removed
app.get("/", (req, res) => handleGetSnapshotsFirestore(req, res));

// V2
app.get("/snapshots", (req, res) => handleGetSnapshots(req, res));
app.get("/snapshots/current", (req, res) => handleGetCurrentSnapshot(req, res));
app.get("/snapshots/earliest", (req, res) => handleGetEarliestSnapshot(req, res));

// Register the function
// This matches the entry point defined for the cloud function
exports.app = app;
