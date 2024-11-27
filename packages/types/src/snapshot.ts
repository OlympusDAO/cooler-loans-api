export type ClearinghouseBalanceSnapshot = {
  /**
   * Address of the Clearinghouse
   */
  address: string;
  /**
   * Balance of the reserve token
   */
  reserveBalance: number;
  /**
   * Balance of the sReserve token
   */
  sReserveBalance: number;
  /**
   * Balance of the sReserve token in terms of the reserve token
   */
  sReserveInReserveBalance: number;
  /**
   * Amount of the reserve token that the Clearinghouse should be funded with
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
     * Total balance of the reserve token across all Clearinghouses
     */
    reserveBalance: number;
    /**
     * Total balance of the sReserve token across all Clearinghouses
     */
    sReserveBalance: number;
    /**
     * Total balance of the sReserve token in terms of the reserve token across all Clearinghouses
     */
    sReserveInReserveBalance: number;
  };
  /**
   * Represents the state of the Treasury at the time of the snapshot.
   */
  treasury: {
    /**
     * Total balance of the reserve token in the active treasury
     */
    reserveBalance: number;
    /**
     * Total balance of the sReserve token in the active treasury
     */
    sReserveBalance: number;
    /**
     * Total balance of the sReserve token in terms of the reserve token in the active treasury
     */
    sReserveInReserveBalance: number;
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
