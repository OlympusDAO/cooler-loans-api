import { mkdirSync, rmSync } from "fs";

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
  "RebalanceEvent",
];

const datasetId = process.env.CACHE_BIGQUERY_DATASET;
if (!datasetId) {
  console.warn("CACHE_BIGQUERY_DATASET is not set; skipping code generation");
  process.exit(0);
}

// Wipe the types directory
rmSync("./src/types", { recursive: true, force: true });
mkdirSync("./src/types");

(async () => {
  const { generateTypes } = await import("./bigqueryMetadata");

  for (const table of tables) {
    await generateTypes(datasetId, table, `./src/types/${table}.ts`);
  }
})();
