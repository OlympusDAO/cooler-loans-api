// Auto-generated types from BigQuery schema

export type Clearinghouse = {
  __typename: string;
  id: string;
  createdBlock: string;
  createdTimestamp: string;
  address: string;
  version: string;
  singleton: {
    __typename: string;
    id: string;
  };
  coolerFactoryAddress: string;
  collateralToken: string;
  collateralTokenDecimals: number;
  reserveToken: string;
  reserveTokenDecimals: number;
  sReserveToken: string;
  sReserveTokenDecimals: number;
  interestRate: string;
  duration: string;
  fundCadence: string;
  fundAmount: string;
  loanToCollateral: string;
  loans: {
    __typename: string;
    id: string;
  }[];
  snapshots: {
    __typename: string;
    id: string;
  }[];
  dt: string;
};
