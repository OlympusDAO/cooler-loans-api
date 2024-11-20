// Auto-generated types from BigQuery schema

export type ExtendLoanEvent = {
  __typename: string;
  id: string;
  date: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
  periods: number;
  loan: {
    __typename: string;
    id: string;
  };
  expiryTimestamp: string;
  interestDue: string;
  clearinghouseDaiBalance: string;
  clearinghouseSDaiBalance: string;
  clearinghouseSDaiInDaiBalance: string;
  treasuryDaiBalance: string;
  treasurySDaiBalance: string;
  treasurySDaiInDaiBalance: string;
  dt: string;
};
