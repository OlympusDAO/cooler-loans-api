export type ClearinghouseSnapshot = {
  id: string;
  date: string;
  blockNumber: number;
  blockTimestamp: number;
  clearinghouse: string;
  isActive: boolean;
  nextRebalanceTimestamp: number;
  receivables: number;
  daiBalance: number;
  sDaiBalance: number;
  sDaiInDaiBalance: number;
};

type Loan = {
  id: string;
  createdTimestamp: number;
  loanId: number;
  borrowerAddress: string;
  coolerAddress: string;
  lenderAddress: string;
  amount: number;
  interest: number;
  principal: number;
  collateralDeposited: number;
  expiryTimestamp: number;
};

export type CreationEvent = {
  id: string;
  date: string;
  blockTimestamp: number;
  loan: Loan;
};

export type DefaultedClaimEvent = {
  id: string;
  date: string;
  blockTimestamp: number;
  secondsSinceExpiry: number;
  loan: Loan;
  collateralQuantityClaimed: number;
  collateralPrice: number;
  collateralValueClaimed: number;
  collateralIncome: number;
};

export type RepaymentEvent = {
  id: string;
  date: string;
  blockTimestamp: number;
  loan: Loan;
  secondsToExpiry: number;
  amountPaid: number;
  amountPayable: number;
  interestIncome: number;
  collateralDeposited: number;
};

export type ExtendEvent = {
  id: string;
  date: string;
  blockTimestamp: number;
  loan: Loan;
  times: number;
};

export type SubgraphData = {
  clearinghouseSnapshots: {
    [key: string]: ClearinghouseSnapshot;
  };
  creationEvents: {
    [key: string]: CreationEvent[];
  };
  defaultedClaimEvents: {
    [key: string]: DefaultedClaimEvent[];
  };
  repaymentEvents: {
    [key: string]: RepaymentEvent[];
  };
  extendEvents: {
    [key: string]: ExtendEvent[];
  };
};

export const getData = async (startDate: string, endDate: string): Promise<SubgraphData> => {
  // Get Cooler Loan data
  // Get event data

  const clearinghouseSnapshots = {
    "2023-08-05": {
      id: "0",
      date: "2023-08-05",
      blockNumber: 12223,
      blockTimestamp: 100000,
      clearinghouse: "0x00000",
      isActive: true,
      nextRebalanceTimestamp: 100001,
      receivables: 100000,
      daiBalance: 10000000.0,
      sDaiBalance: 500000.0,
      sDaiInDaiBalance: 600000.01,
    },
    "2023-08-20": {
      id: "0",
      date: "2023-08-20",
      blockNumber: 12223,
      blockTimestamp: 100000,
      clearinghouse: "0x00000",
      isActive: true,
      nextRebalanceTimestamp: 100001,
      receivables: 20000000.01,
      daiBalance: 9000000.0,
      sDaiBalance: 500000.0,
      sDaiInDaiBalance: 600000.01,
    },
  };

  const loan: Loan = {
    id: "0",
    // 2023-08-05
    createdTimestamp: 1691222400,
    loanId: 0,
    coolerAddress: "0x03",
    borrowerAddress: "0x01",
    lenderAddress: "0x02",
    amount: 100000,
    interest: 1000,
    principal: 99000,
    collateralDeposited: 30,
    // 2023-09-10
    expiryTimestamp: 1694332800,
  };

  const creationEvents = {
    "2023-08-05": [
      {
        id: "0",
        date: "2023-08-05",
        blockTimestamp: 1691222400,
        loan: loan,
      },
    ],
  };

  const repaymentEvents = {
    "2023-08-10": [
      {
        id: "0",
        date: "2023-08-10",
        blockTimestamp: 1691654400,
        secondsToExpiry: 1694332800 - 1691654400,
        amountPaid: 1000,
        amountPayable: 100000 - 1000,
        interestIncome: 10,
        collateralDeposited: 29,
        loan: loan,
      },
    ],
  };

  // Grab clearinghouse snapshots for the given date range

  // Grab events for the given date range

  return {
    clearinghouseSnapshots: clearinghouseSnapshots,
    creationEvents: creationEvents,
    defaultedClaimEvents: {},
    repaymentEvents: repaymentEvents,
    extendEvents: {},
  };
};
