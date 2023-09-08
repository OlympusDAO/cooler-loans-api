export type Snapshot = {
  date: Date;
  // Top-level summary
  /**
   * Sum of amountPayable for all loans
   */
  receivables: number;
  clearinghouse: {
    daiBalance: number;
    sDaiBalance: number;
    sDaiInDaiBalance: number;
  };
  // Per-loan summary
  loans: {
    id: number;
    createdTimestamp: number;
    borrower: string;
    lender: string;
    principal: number;
    interest: number;
    collateralDeposited: number;
    expiryTimestamp: number;
    secondsToExpiry: number;
    status: "Active" | "Expired" | "Defaulted" | "Repaid";
    amountRepaid: number;
    amountPayable: number;
    interestIncome: number;
    collateralClaimed: number;
    collateralClaimedValue: number;
  }[];
  events: {
    create: any[];
    default: any[];
    payment: any[];
    rollover: any[];
  };
};

export const generateSnapshots = (
  startDate: string,
  endDate: string,
  previousDateRecords: Snapshot | null,
  subgraphData: any,
): Snapshot[] => {
  return [];
};
