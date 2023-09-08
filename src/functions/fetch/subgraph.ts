export const getData = async (startDate: string, endDate: string) => {
  // Get Cooler Loan data
  // Get event data

  const clearinghouseSnapshots = [
    {
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
    {
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
  ];

  const loans = [
    {
      id: "0",
      // 2023-08-05
      createdTimestamp: 1691222400,
      loanId: 0,
      borrower: 0x01,
      lender: 0x02,
      amount: 100000,
      interest: 1000,
      principal: 99000,
      collateral: 30,
      // 2023-09-10
      expiryTimestamp: 1694332800,
      creationEvents: [
        {
          id: "0",
          date: "2023-08-05",
          blockTimestamp: 1691222400,
        },
      ],
      defaultedClaimEvents: [],
      repaymentEvents: [
        {
          id: "0",
          date: "2023-08-10",
          blockTimestamp: 1691654400,
          secondsToExpiry: 1694332800 - 1691654400,
          amountPaid: 1000,
          amountPayable: 100000 - 1000,
          interestIncome: 10,
          collateralDeposited: 29,
        },
      ],
      rolloverEvents: [],
    },
  ];

  return {
    clearinghouseSnapshots: clearinghouseSnapshots,
    loans: loans,
  };
};
