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
   * The loan duration, in seconds.
   */
  durationSeconds: number;
  /**
   * The loan principal. Will not change after loan creation.
   */
  principal: number;
  /**
   * Cumulative principal paid on the loan.
   */
  principalPaid: number;
  /**
   * The interest rate, stored as a decimal.
   *
   * e.g. 0.5% = 0.005
   */
  interestRate: number;
  /**
   * The total interest charged on the loan.
   *
   * When the loan is extended, this number will be increased.
   */
  interest: number;
  /**
   * Cumulative interest paid on the loan.
   *
   * Any outstanding interest is paid first, followed by principal.
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
  /**
   * The number of seconds until the loan expires.
   */
  secondsToExpiry: number;
  /**
   * Status of the loan
   */
  status: "Active" | "Expired" | "Reclaimed" | "Repaid";
  /**
   * USD value of the income recognised from claiming the loan's collateral.
   *
   * As collateral is returned to the borrower as they repay the loan principal, the collateral at any point in time covers the principal outstanding.
   *
   * The income is therefore calculated as:
   *
   * collateralValueAtClaim - principalOutstanding
   */
  collateralIncome: number;
  /**
   * Quantity of collateral claimed by the lender.
   */
  collateralClaimedQuantity: number;
  /**
   * USD value of the collateral claimed by the lender (at the time of claiming)
   */
  collateralClaimedValue: number;
};

export type SnapshotLoanMap = {
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
  /**
   * Represents the state of the Clearinghouse at the time of the snapshot.
   */
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
  /**
   * Represents the state of the Treasury at the time of the snapshot.
   */
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
   *
   * Will only be fetched if explicitly specified.
   */
  loans: SnapshotLoanMap;

  /**
   * Principal due for each expiry bucket.
   */
  expiryBuckets: {
    active: number;
    expired: number;
    "30Days": number;
    "121Days": number;
  };

  creationEvents: unknown[];
  defaultedClaimEvents: unknown[];
  repaymentEvents: unknown[];
  extendEvents: unknown[];
  clearinghouseEvents: unknown[];
};
