// Auto-generated types from BigQuery schema

export type ClearinghouseSnapshot = {
  __typename: string;
  id: string;
  date: string;
  blockNumber: string;
  blockTimestamp: string;
  clearinghouse: string;
  coolerFactoryAddress: string;
  collateralAddress: string;
  debtAddress: string;
  isActive: boolean;
  nextRebalanceTimestamp: string;
  interestReceivables: string;
  principalReceivables: string;
  interestRate: string;
  duration: string;
  fundCadence: string;
  fundAmount: string;
  loanToCollateral: string;
  daiBalance: string;
  sDaiBalance: string;
  sDaiInDaiBalance: string;
  treasuryDaiBalance: string;
  treasurySDaiBalance: string;
  treasurySDaiInDaiBalance: string;
  rebalanceEvents: {
    __typename: string;
    id: string;
  }[];
  defundEvents: {
    __typename: string;
    id: string;
  }[];
  dt: string;
};
