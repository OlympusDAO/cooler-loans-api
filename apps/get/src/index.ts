import cors from "cors";
import express from "express";

import { handleGetCurrentSnapshot, handleGetSnapshots } from "./snapshots";

const app = express();

// Allow cross-origin requests
app.use(cors({ origin: true }));

// Routes
app.get("/snapshots", (req, res) => handleGetSnapshots(req, res));
app.get("/snapshots/current", (req, res) => handleGetCurrentSnapshot(req, res));

// Register the function
// This matches the entry point defined for the cloud function
exports.app = app;
