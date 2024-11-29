// Auto-generated types from BigQuery schema

export type RebalanceEvent = {
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
  clearinghouseSnapshot: {
    __typename: string;
    id: string;
  };
  amount: string;
  dt: string;
};
