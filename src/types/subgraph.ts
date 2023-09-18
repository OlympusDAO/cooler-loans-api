import {
  ClaimDefaultedLoanEvent,
  ClearinghouseSnapshot,
  ClearLoanRequestEvent,
  CoolerLoan,
  ExtendLoanEvent,
  RepayLoanEvent,
} from "../../.graphclient";

// A number of the entity properties are required, but we don't include them in the query, so they are omitted here. (Else we get linting errors.)
export type CoolerLoanOptional = Omit<
  CoolerLoan,
  "creationEvents" | "repaymentEvents" | "defaultedClaimEvents" | "extendEvents" | "request"
>;
export type ClearinghouseSnapshotOptional = Omit<ClearinghouseSnapshot, "rebalanceEvents" | "defundEvents">;
export type ClearLoanRequestEventOptional = Omit<ClearLoanRequestEvent, "request" | "loan"> & {
  loan: CoolerLoanOptional;
};
export type RepayLoanEventOptional = Omit<RepayLoanEvent, "loan"> & {
  loan: {
    id: string;
  };
};
export type ClaimDefaultedLoanEventOptional = Omit<ClaimDefaultedLoanEvent, "loan"> & {
  loan: {
    id: string;
  };
};
export type ExtendLoanEventOptional = Omit<ExtendLoanEvent, "loan"> & {
  loan: {
    id: string;
  };
};

export type SubgraphData = {
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
