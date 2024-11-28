import type {
  ClaimDefaultedLoanEvent,
  Clearinghouse,
  ClearinghouseSnapshot,
  ClearLoanRequestEvent,
  CoolerLoan,
  CoolerLoanRequest,
  ExtendLoanEvent,
  RebalanceEvent,
  RepayLoanEvent,
} from "@repo/subgraph-cache-types";

export type ClearinghouseEvents = {
  /**
   * A map of YYYY-MM-DD date strings to the clearinghouse snapshots for that date.
   */
  clearinghouseSnapshots: Record<string, ClearinghouseSnapshot[]>;

  /**
   * A map of YYYY-MM-DD date strings to the creation events for that date.
   */
  creationEvents: Record<string, ClearLoanRequestEvent[]>;

  /**
   * A map of YYYY-MM-DD date strings to the repayment events for that date.
   */
  repaymentEvents: Record<string, RepayLoanEvent[]>;

  /**
   * A map of YYYY-MM-DD date strings to the defaulted claim events for that date.
   */
  defaultedClaimEvents: Record<string, ClaimDefaultedLoanEvent[]>;

  /**
   * A map of YYYY-MM-DD date strings to the extend events for that date.
   */
  extendEvents: Record<string, ExtendLoanEvent[]>;

  /**
   * A map of YYYY-MM-DD date strings to a map of record IDs to the loans for that date.
   */
  createdLoans: Record<string, Record<string, CoolerLoan>>;

  /**
   * A map of YYYY-MM-DD date strings to a map of record IDs to the loan requests for that date.
   */
  loanRequests: Record<string, Record<string, CoolerLoanRequest>>;

  /**
   * A map of clearinghouse addresses to the Clearinghouse.
   */
  clearinghouses: Record<string, Clearinghouse>;

  /**
   * A map of YYYY-MM-DD date strings to the rebalance events for that date.
   */
  rebalanceEvents: Record<string, RebalanceEvent[]>;
};
