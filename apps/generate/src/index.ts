import { adjustDate, setMidnight } from "@repo/shared/date";
import { LoanSnapshot, LoanSnapshotMap } from "@repo/types/loanSnapshot";
import { Snapshot } from "@repo/types/snapshot";

import { getClearinghouseEvents } from "./helpers/clearinghouseData";
import {
  getLatestSnapshotDate,
  getLoanSnapshots,
  getSnapshot,
  writeLoanSnapshots,
  writeSnapshot,
} from "./helpers/storage";
import { generateSnapshots } from "./snapshot";

const LAUNCH_DATE = "2023-09-21";
// So that the next 4 months of income can be projected
const DAYS_AFTER = 121;
const DAYS_OFFSET = 7;

const run = async (startDate: Date, beforeDate: Date) => {
  console.log(`run: Generating snapshots from ${startDate.toISOString()} to ${beforeDate.toISOString()}`);

  // Fetch events data from BigQuery
  const clearinghouseEvents = await getClearinghouseEvents(startDate, beforeDate);

  // Grab the previous date's data
  const previousSnapshot: Snapshot | null = await getSnapshot(adjustDate(startDate, -1));

  // Grab the previous date's loans
  const previousLoans: LoanSnapshot[] = await getLoanSnapshots(adjustDate(startDate, -1));
  const previousLoanMap: LoanSnapshotMap = previousLoans.reduce((acc, loan) => {
    acc[loan.id] = loan;
    return acc;
  }, {} as LoanSnapshotMap);

  // Prepare snapshots
  const dateSnapshots = generateSnapshots(
    startDate,
    beforeDate,
    previousSnapshot,
    previousLoanMap,
    clearinghouseEvents,
  );

  // Write the snapshots to BigQuery
  for (const dateSnapshot of dateSnapshots) {
    console.log(`run: Writing snapshot for ${dateSnapshot.date}`);
    await writeSnapshot(dateSnapshot.snapshot);
    await writeLoanSnapshots(dateSnapshot.date, dateSnapshot.loans);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleGenerate = async (req: any, res: any) => {
  // Determine the last cached date
  const lastCachedDate: Date | null = await getLatestSnapshotDate();
  const startDate: Date = setMidnight(
    // Is the last cached date before the current date?
    lastCachedDate
      ? lastCachedDate < new Date()
        ? adjustDate(lastCachedDate, -1) // If there is a cached date, use the day before to catch anything in between
        : adjustDate(new Date(), -1) // Otherwise, use the day before
      : new Date(LAUNCH_DATE), // Otherwise, use the launch date
  );
  console.debug(`handleGenerate: Starting from ${startDate.toISOString()}`);
  const todayMidnight = setMidnight(new Date());
  // Generate `DAYS_AFTER` days of snapshots if doing catch-up
  const beforeDate: Date = setMidnight(adjustDate(startDate < todayMidnight ? startDate : todayMidnight, DAYS_AFTER));
  console.debug(`handleGenerate: Up to ${beforeDate.toISOString()}`);

  let currentStartDate = new Date(startDate);
  let currentEndDate = adjustDate(new Date(startDate), DAYS_OFFSET);

  // Generate snapshots for every `DAYS_OFFSET` days
  // This avoids having too many records in memory at once
  // and fetching too many records over GraphQL
  while (currentEndDate < beforeDate) {
    await run(currentStartDate, currentEndDate);

    currentStartDate = adjustDate(currentStartDate, DAYS_OFFSET);
    currentEndDate = adjustDate(currentEndDate, DAYS_OFFSET);
  }

  // Required to end the function
  res.send("OK").end();
};
