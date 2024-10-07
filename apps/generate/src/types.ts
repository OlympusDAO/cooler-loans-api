// Copied from subgraph-cache
// TODO automate type generation
export type ClaimDefaultedLoanEvent = {
  __typename: string;
  id: string;
  date: string;
  blockNumber: number;
  blockTimestamp: number;
  transactionHash: string;
  collateralQuantityClaimed: number;
  collateralPrice: number;
  collateralValueClaimed: number;
  loan: {
    __typename: string;
    id: string;
  };
  secondsSinceExpiry: number;
  dt: Date;
};

export type ClearinghouseSnapshot = {
  __typename: string;
  id: string;
  date: string;
  blockNumber: number;
  blockTimestamp: number;
  clearinghouse: string;
  coolerFactoryAddress: string;
  collateralAddress: string;
  debtAddress: string;
  isActive: boolean;
  nextRebalanceTimestamp: number;
  interestReceivables: number;
  principalReceivables: number;
  interestRate: number;
  duration: number;
  fundCadence: number;
  fundAmount: number;
  loanToCollateral: number;
  daiBalance: number;
  sDaiBalance: number;
  sDaiInDaiBalance: number;
  treasuryDaiBalance: number;
  treasurySDaiBalance: number;
  treasurySDaiInDaiBalance: number;
  dt: Date;
};

export type ClearLoanRequestEvent = {
  __typename: string;
  id: string;
  date: string;
  blockNumber: number;
  blockTimestamp: number;
  transactionHash: string;
  request: {
    __typename: string;
    id: string;
  };
  loan: {
    __typename: string;
    id: string;
  };
  clearinghouseDaiBalance: number;
  clearinghouseSDaiBalance: number;
  clearinghouseSDaiInDaiBalance: number;
  treasuryDaiBalance: number;
  treasurySDaiBalance: number;
  treasurySDaiInDaiBalance: number;
  dt: Date;
};

export type RepayLoanEvent = {
  __typename: string;
  id: string;
  date: string;
  blockNumber: number;
  blockTimestamp: number;
  transactionHash: string;
  amountPaid: number;
  loan: {
    __typename: string;
    id: string;
  };
  secondsToExpiry: number;
  principalPayable: number;
  interestPayable: number;
  collateralDeposited: number;
  clearinghouseDaiBalance: number;
  clearinghouseSDaiBalance: number;
  clearinghouseSDaiInDaiBalance: number;
  treasuryDaiBalance: number;
  treasurySDaiBalance: number;
  treasurySDaiInDaiBalance: number;
  dt: Date;
};

export type ExtendLoanEvent = {
  __typename: string;
  id: string;
  date: string;
  blockNumber: number;
  blockTimestamp: number;
  transactionHash: string;
  periods: number;
  loan: {
    __typename: string;
    id: string;
  };
  expiryTimestamp: number;
  interestDue: number;
  clearinghouseDaiBalance: number;
  clearinghouseSDaiBalance: number;
  clearinghouseSDaiInDaiBalance: number;
  treasuryDaiBalance: number;
  treasurySDaiBalance: number;
  treasurySDaiInDaiBalance: number;
  dt: Date;
};

export type DefundEvent = {
  __typename: string;
  id: string;
  date: string;
  blockNumber: number;
  blockTimestamp: number;
  transactionHash: string;
  clearinghouse: string;
  clearinghouseSnapshot: {
    __typename: string;
    id: string;
  };
  amount: number;
  dt: Date;
};

export type RebalanceEvent = {
  __typename: string;
  id: string;
  date: string;
  blockNumber: number;
  blockTimestamp: number;
  transactionHash: string;
  clearinghouse: string;
  clearinghouseSnapshot: {
    __typename: string;
    id: string;
  };
  amount: number;
  dt: Date;
};

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
};
