// TODO use BigQuery schema types
type ClearinghouseEvents = {
  clearinghouseSnapshots: {
    [key: string]: ClearinghouseSnapshotOptional[];
  };
  creationEvents: {
    [key: string]: ClearLoanRequestEventOptional[];
  };
  repaymentEvents: {
    [key: string]: RepayLoanEventOptional[];
  };
  defaultedClaimEvents: {
    [key: string]: ClaimDefaultedLoanEventOptional[];
  };
  extendEvents: {
    [key: string]: ExtendLoanEventOptional[];
  };
};

/**
 * Fetched subgraph data for the given date range from the BigQuery cache.
 */
export const getClearinghouseEvents = async (startDate: Date, beforeDate: Date): Promise<ClearinghouseEvents> => {
  // TODO get the name of the BigQuery project, dataset, and table
  // Perform queries

  const clearinghouseEvents = {
    clearinghouseSnapshots: {},
    creationEvents: {},
    repaymentEvents: {},
    defaultedClaimEvents: {},
  };

  // Format

  return clearinghouseEvents;
};
