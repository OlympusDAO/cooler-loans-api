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
  /**
   * Timestamp of the loan creation, in seconds
   */
  createdTimestamp: number;
  coolerAddress: string;
  borrowerAddress: string;
  lenderAddress: string;
  /**
   * The loan principal. Will not change after loan creation.
   */
  principal: number;
  /**
   * Cumulative principal paid on the loan.
   */
  principalPaid: number;
  /**
   * The total interest charged on the loan.
   *
   * When the loan is extended, this number will be increased.
   */
  interest: number;
  /**
   * Cumulative interest paid on the loan.
   */
  interestPaid: number;
  /**
   * The current quantity of the collateral token that is deposited.
   *
   * As the loan is repaid, this will decrease.
   */
  collateralDeposited: number;
  /**
   * Timestamp of the expected loan expiry, in seconds
   */
  expiryTimestamp: number;
  secondsToExpiry: number;
  /**
   * Status of the loan
   */
  status: "Active" | "Expired" | "Reclaimed" | "Repaid";
  collateralIncome: number;
  collateralClaimedQuantity: number;
  collateralClaimedValue: number;
};

type SnapshotLoanMap = {
  [key: string]: Loan;
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
  loans: SnapshotLoanMap;
  creationEvents: ClearLoanRequestEventOptional[];
  defaultedClaimEvents: ClaimDefaultedLoanEventOptional[];
  repaymentEvents: RepayLoanEventOptional[];
  extendEvents: ExtendLoanEventOptional[];
  clearinghouseEvents: ClearinghouseSnapshotOptional[];
};
