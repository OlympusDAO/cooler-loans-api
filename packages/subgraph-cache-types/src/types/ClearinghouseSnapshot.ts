// Auto-generated types from BigQuery schema

export type ClearinghouseSnapshot = {
  __typename: string;
  id: string;
  date: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
  clearinghouse: {
    __typename: string;
    id: string;
  };
  isActive: boolean;
  nextRebalanceTimestamp: string;
  interestReceivables: string;
  principalReceivables: string;
  reserveToken: string;
  sReserveToken: string;
  reserveBalance: string;
  sReserveBalance: string;
  sReserveInReserveBalance: string;
  treasuryReserveBalance: string;
  treasurySReserveBalance: string;
  treasurySReserveInReserveBalance: string;
  rebalanceEvents: {
    __typename: string;
    id: string;
  }[];
  defundEvents: {
    __typename: string;
    id: string;
  }[];
  creationEvents: {
    __typename: string;
    id: string;
  }[];
  defaultedClaimEvents: {
    __typename: string;
    id: string;
  }[];
  repaymentEvents: {
    __typename: string;
    id: string;
  }[];
  extendEvents: {
    __typename: string;
    id: string;
  }[];
  dt: string;
};
