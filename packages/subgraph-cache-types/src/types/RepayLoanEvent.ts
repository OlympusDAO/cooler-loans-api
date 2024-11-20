// Auto-generated types from BigQuery schema

export type RepayLoanEvent = {
  __typename: string;
  id: string;
  date: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
  amountPaid: string;
  loan: {
    __typename: string;
    id: string;
  };
  secondsToExpiry: string;
  principalPayable: string;
  interestPayable: string;
  collateralDeposited: string;
  clearinghouseDaiBalance: string;
  clearinghouseSDaiBalance: string;
  clearinghouseSDaiInDaiBalance: string;
  treasuryDaiBalance: string;
  treasurySDaiBalance: string;
  treasurySDaiInDaiBalance: string;
  dt: string;
};
