// Auto-generated types from BigQuery schema

export type ClearLoanRequestEvent = {
  __typename: string;
  id: string;
  date: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
  request: {
    __typename: string;
    id: string;
  };
  loan: {
    __typename: string;
    id: string;
  };
  clearinghouseDaiBalance: string;
  clearinghouseSDaiBalance: string;
  clearinghouseSDaiInDaiBalance: string;
  treasuryDaiBalance: string;
  treasurySDaiBalance: string;
  treasurySDaiInDaiBalance: string;
  dt: string;
};
