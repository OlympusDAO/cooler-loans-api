// Auto-generated types from BigQuery schema

export type CoolerLoanRequest = {
  __typename: string;
  id: string;
  createdBlock: string;
  createdTimestamp: string;
  createdTransaction: string;
  cooler: string;
  requestId: string;
  borrower: string;
  collateralToken: string;
  debtToken: string;
  amount: string;
  interestPercentage: string;
  loanToCollateralRatio: string;
  durationSeconds: string;
  isRescinded: boolean;
  requestEvents: {
    __typename: string;
    id: string;
  }[];
  rescindEvents: {
    __typename: string;
    id: string;
  }[];
  clearEvents: {
    __typename: string;
    id: string;
  }[];
  loans: {
    __typename: string;
    id: string;
  }[];
  dt: string;
};
