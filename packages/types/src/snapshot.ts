export type ClearinghouseBalanceSnapshot = {
  /**
   * Address of the Clearinghouse
   */
  address: string;
  /**
   * Balance of DAI
   */
  daiBalance: number;
  /**
   * Balance of sDAI
   */
  sDaiBalance: number;
  /**
   * Balance of sDAI in terms of DAI
   */
  sDaiInDaiBalance: number;
  /**
   * Amount of DAI that the Clearinghouse should be funded with
   */
  fundAmount: number;
  /**
   * The cadence of the funding
   */
  fundCadence: number;
  /**
   * The address of the CoolerFactory
   */
  coolerFactoryAddress: string;
  /**
   * The address of the collateral
   */
  collateralAddress: string;
  /**
   * The address of the debt
   */
  debtAddress: string;
};

export type Snapshot = {
  /**
   * Date of the snapshot.
   *
   * Times are stored at UTC.
   */
  snapshotDate: string;
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
   * Quantity of collateral reclaimed on this date.
   */
  collateralClaimedQuantity: number;
  /**
   * USD value of collateral claimed on this date.
   */
  collateralClaimedValue: number;
  /**
   * Quantity of collateral deposited across all Coolers
   */
  collateralDeposited: number;
  /**
   * State of the Clearinghouses at the time of the snapshot.
   */
  clearinghouses: ClearinghouseBalanceSnapshot[];
  /**
   * Totals for the Clearinghouses at the time of the snapshot.
   */
  clearinghouseTotals: {
    /**
     * Total balance of DAI across all Clearinghouses
     */
    daiBalance: number;
    /**
     * Total balance of sDAI across all Clearinghouses
     */
    sDaiBalance: number;
    /**
     * Total balance of sDAI in terms of DAI across all Clearinghouses
     */
    sDaiInDaiBalance: number;
  };
  /**
   * Represents the state of the Treasury at the time of the snapshot.
   */
  treasury: {
    /**
     * Total balance of DAI in the active treasury
     */
    daiBalance: number;
    /**
     * Total balance of sDAI in the active treasury
     */
    sDaiBalance: number;
    /**
     * Total balance of sDAI in terms of DAI in the active treasury
     */
    sDaiInDaiBalance: number;
  };
  /**
   * Current Clearinghouse terms
   */
  terms: {
    /**
     * Interest rate as a decimal
     *
     * e.g. 0.005 = 0.5%
     */
    interestRate: number;
    /**
     * Duration of the loan in seconds
     */
    duration: number;
    /**
     * Value of the loan (in DAI) provided against the collateral
     */
    loanToCollateral: number;
  };
  /**
   * Principal due for each expiry bucket.
   */
  expiryBuckets: {
    /**
     * Principal due for loans that are active
     */
    active: number;
    /**
     * Principal due for loans that are expired
     */
    expired: number;
    /**
     * Principal due for loans that are within 30 days of expiry
     */
    days30: number;
    /**
     * Principal due for loans that are within 121 days of expiry
     */
    days121: number;
  };
};
