import {
  ClaimDefaultedLoanEventOptional,
  ClearinghouseSnapshotOptional,
  ClearLoanRequestEventOptional,
  ExtendLoanEventOptional,
  RepayLoanEventOptional,
} from "./subgraph";

export type Loan = {
  /**
   * cooler-loanId
   */
  id: string;
  loanId: number;
  createdTimestamp: number;
  coolerAddress: string;
  borrowerAddress: string;
  lenderAddress: string;
  principal: number;
  interest: number;
  collateralDeposited: number;
  expiryTimestamp: number;
  secondsToExpiry: number;
  status: "Active" | "Expired" | "Reclaimed" | "Repaid";
  principalPaid: number;
  interestPaid: number;
  collateralIncome: number;
  collateralClaimedQuantity: number;
  collateralClaimedValue: number;
};

export type Snapshot = {
  date: Date;
  // Top-level summary
  principalReceivables: number;
  interestReceivables: number;
  clearinghouse: {
    daiBalance: number;
    sDaiBalance: number;
    sDaiInDaiBalance: number;
  };
  treasury: {
    daiBalance: number;
    sDaiBalance: number;
    sDaiInDaiBalance: number;
  };
  /**
   * Dictionary of the loans that had been created by this date.
   *
   * Key: `cooler address`-`loanId`
   * Value: Loan record
   */
  loans: {
    [key: string]: Loan;
  };
  creationEvents: ClearLoanRequestEventOptional[];
  defaultedClaimEvents: ClaimDefaultedLoanEventOptional[];
  repaymentEvents: RepayLoanEventOptional[];
  extendEvents: ExtendLoanEventOptional[];
  clearinghouseEvents: ClearinghouseSnapshotOptional[];
};
