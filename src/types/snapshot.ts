export type Snapshot = {
  /**
   * Date of the snapshot.
   *
   * Times are stored at UTC.
   */
  snapshotDate: Date;
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
   * Principal due for each expiry bucket.
   */
  expiryBuckets: {
    active: number;
    expired: number;
    days30: number;
    days121: number;
  };
};
