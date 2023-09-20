import {
  ClaimDefaultedLoanEventOptional,
  ClearinghouseSnapshotOptional,
  ClearLoanRequestEventOptional,
  ExtendLoanEventOptional,
  RepayLoanEventOptional,
} from "./subgraph";

export type Loan = {
  /**
   * Loan id unique across the clearinghouse and its coolers
   *
   * Format: cooler-loanId
   */
  id: string;
  /**
   * Loan id unique to the cooler
   */
  loanId: number;
  createdTimestamp: number;
  coolerAddress: string;
  borrowerAddress: string;
  lenderAddress: string;
  /**
   * The amount of interest charged per period.
   */
  interestPerPeriod: number;
  /**
   * The amount of collateral required per period.
   *
   * As this is fixed on the clearinghouse, it does not change.
   */
  collateralPerPeriod: number;
  /**
   * The loan principal
   */
  principal: number;
  /**
   * The interest charged on the loan.
   *
   * When the loan is extended, this number will be incremented.
   */
  interest: number;
  /**
   * The current quantity of the collateral token that is deposited.
   *
   * As the loan is repaid, this will decrease.
   */
  collateralDeposited: number;
  expiryTimestamp: number;
  secondsToExpiry: number;
  status: "Active" | "Expired" | "Reclaimed" | "Repaid";
  /**
   * Cumulative principal paid on the loan.
   */
  principalPaid: number;
  /**
   * Cumulative interest paid on the loan.
   */
  interestPaid: number;
  collateralIncome: number;
  collateralClaimedQuantity: number;
  collateralClaimedValue: number;
};

export type Snapshot = {
  date: Date;
  /**
   * Timestamp of the snapshot, in milliseconds
   */
  timestamp: number;
  /**
   * Principal receivable across all Coolers
   */
  principalReceivables: number;
  /**
   * Interest receivable across all Coolers
   */
  interestReceivables: number;
  /**
   * Income from interest payments made on this date.
   */
  interestIncome: number;
  /**
   * Income from collateral reclaimed on this date.
   */
  collateralIncome: number;
  /**
   * Quantity of collateral deposited across all Coolers
   */
  collateralDeposited: number;
  clearinghouse: {
    daiBalance: number;
    sDaiBalance: number;
    sDaiInDaiBalance: number;
    fundAmount: number;
    fundCadence: number;
    coolerFactoryAddress: string;
    collateralAddress: string;
    debtAddress: string;
  };
  treasury: {
    daiBalance: number;
    sDaiBalance: number;
    sDaiInDaiBalance: number;
  };
  terms: {
    interestRate: number;
    duration: number;
    loanToCollateral: number;
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
