// Auto-generated types from BigQuery schema

export type CoolerLoan = {
  __typename: string;
  id: string;
  createdBlock: string;
  createdTimestamp: string;
  createdTransaction: string;
  cooler: string;
  request: {
    __typename: string;
    id: string;
  };
  loanId: string;
  borrower: string;
  lender: string;
  interest: string;
  principal: string;
  collateral: string;
  expiryTimestamp: string;
  hasCallback: boolean;
  collateralToken: string;
  debtToken: string;
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
