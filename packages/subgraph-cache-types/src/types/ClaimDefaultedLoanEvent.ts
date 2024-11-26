// Auto-generated types from BigQuery schema

export type ClaimDefaultedLoanEvent = {
  __typename: string;
  id: string;
  date: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
  collateralQuantityClaimed: string;
  collateralPrice: string;
  collateralValueClaimed: string;
  loan: {
    __typename: string;
    id: string;
  };
  secondsSinceExpiry: string;
  clearinghouseSnapshot: {
    __typename: string;
    id: string;
  };
  dt: string;
};
