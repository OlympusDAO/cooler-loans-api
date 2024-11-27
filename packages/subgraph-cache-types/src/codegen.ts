import { mkdirSync, rmSync } from "fs";

import { generateTypes } from "./bigqueryMetadata";

// Define the list of tables
const tables = [
  "ClearinghouseSnapshot",
  "ClearLoanRequestEvent",
  "RepayLoanEvent",
  "ClaimDefaultedLoanEvent",
  "ExtendLoanEvent",
  "CoolerLoan",
  "CoolerLoanRequest",
  "Clearinghouse",
];

const datasetId = process.env.CACHE_BIGQUERY_DATASET;
if (!datasetId) {
  throw new Error("CACHE_BIGQUERY_DATASET environment variable is not set");
}

// Wipe the types directory
rmSync("./src/types", { recursive: true, force: true });
mkdirSync("./src/types");

(async () => {
  for (const table of tables) {
    await generateTypes(datasetId, table, `./src/types/${table}.ts`);
  }
})();
