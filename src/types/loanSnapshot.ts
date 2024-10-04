export type LoanSnapshotMap = {
  [key: string]: LoanSnapshot;
};

export type LoanSnapshot = {
  /**
   * Date of the snapshot.
   *
   * Times are stored at UTC.
   */
  snapshotDate: Date;
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
