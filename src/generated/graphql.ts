import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  BigDecimal: { input: number; output: number };
  BigInt: { input: number; output: number };
  Bytes: { input: string; output: string };
  Int8: { input: number; output: number };
};

export type BlockChangedFilter = {
  number_gte: Scalars["Int"]["input"];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars["Bytes"]["input"]>;
  number?: InputMaybe<Scalars["Int"]["input"]>;
  number_gte?: InputMaybe<Scalars["Int"]["input"]>;
};

export type ClaimDefaultedLoanEvent = {
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  collateralPrice: Scalars["BigDecimal"]["output"];
  collateralQuantityClaimed: Scalars["BigDecimal"]["output"];
  collateralValueClaimed: Scalars["BigDecimal"]["output"];
  date: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  loan: CoolerLoan;
  secondsSinceExpiry: Scalars["BigInt"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
};

export type ClaimDefaultedLoanEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ClaimDefaultedLoanEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  collateralPrice?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateralPrice_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateralPrice_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateralPrice_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  collateralPrice_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateralPrice_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateralPrice_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateralPrice_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  collateralQuantityClaimed?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateralQuantityClaimed_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateralQuantityClaimed_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateralQuantityClaimed_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  collateralQuantityClaimed_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateralQuantityClaimed_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateralQuantityClaimed_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateralQuantityClaimed_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  collateralValueClaimed?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateralValueClaimed_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateralValueClaimed_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateralValueClaimed_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  collateralValueClaimed_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateralValueClaimed_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateralValueClaimed_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateralValueClaimed_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  date?: InputMaybe<Scalars["String"]["input"]>;
  date_contains?: InputMaybe<Scalars["String"]["input"]>;
  date_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  date_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_gt?: InputMaybe<Scalars["String"]["input"]>;
  date_gte?: InputMaybe<Scalars["String"]["input"]>;
  date_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  date_lt?: InputMaybe<Scalars["String"]["input"]>;
  date_lte?: InputMaybe<Scalars["String"]["input"]>;
  date_not?: InputMaybe<Scalars["String"]["input"]>;
  date_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  date_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  date_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  date_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  date_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  date_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  id_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_gt?: InputMaybe<Scalars["String"]["input"]>;
  id_gte?: InputMaybe<Scalars["String"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_lt?: InputMaybe<Scalars["String"]["input"]>;
  id_lte?: InputMaybe<Scalars["String"]["input"]>;
  id_not?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  loan?: InputMaybe<Scalars["String"]["input"]>;
  loan_?: InputMaybe<CoolerLoan_Filter>;
  loan_contains?: InputMaybe<Scalars["String"]["input"]>;
  loan_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  loan_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  loan_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  loan_gt?: InputMaybe<Scalars["String"]["input"]>;
  loan_gte?: InputMaybe<Scalars["String"]["input"]>;
  loan_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  loan_lt?: InputMaybe<Scalars["String"]["input"]>;
  loan_lte?: InputMaybe<Scalars["String"]["input"]>;
  loan_not?: InputMaybe<Scalars["String"]["input"]>;
  loan_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  loan_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  loan_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  loan_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  loan_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  loan_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  loan_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  loan_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  loan_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<ClaimDefaultedLoanEvent_Filter>>>;
  secondsSinceExpiry?: InputMaybe<Scalars["BigInt"]["input"]>;
  secondsSinceExpiry_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  secondsSinceExpiry_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  secondsSinceExpiry_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  secondsSinceExpiry_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  secondsSinceExpiry_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  secondsSinceExpiry_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  secondsSinceExpiry_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum ClaimDefaultedLoanEvent_OrderBy {
  BlockNumber = "blockNumber",
  BlockTimestamp = "blockTimestamp",
  CollateralPrice = "collateralPrice",
  CollateralQuantityClaimed = "collateralQuantityClaimed",
  CollateralValueClaimed = "collateralValueClaimed",
  Date = "date",
  Id = "id",
  Loan = "loan",
  LoanBorrower = "loan__borrower",
  LoanCollateral = "loan__collateral",
  LoanCollateralToken = "loan__collateralToken",
  LoanCooler = "loan__cooler",
  LoanCreatedBlock = "loan__createdBlock",
  LoanCreatedTimestamp = "loan__createdTimestamp",
  LoanCreatedTransaction = "loan__createdTransaction",
  LoanDebtToken = "loan__debtToken",
  LoanExpiryTimestamp = "loan__expiryTimestamp",
  LoanHasCallback = "loan__hasCallback",
  LoanId = "loan__id",
  LoanInterest = "loan__interest",
  LoanLender = "loan__lender",
  LoanLoanId = "loan__loanId",
  LoanPrincipal = "loan__principal",
  SecondsSinceExpiry = "secondsSinceExpiry",
  TransactionHash = "transactionHash",
}

export type ClearLoanRequestEvent = {
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  clearinghouseDaiBalance: Scalars["BigDecimal"]["output"];
  clearinghouseSDaiBalance: Scalars["BigDecimal"]["output"];
  clearinghouseSDaiInDaiBalance: Scalars["BigDecimal"]["output"];
  date: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  loan: CoolerLoan;
  request: CoolerLoanRequest;
  transactionHash: Scalars["Bytes"]["output"];
  treasuryDaiBalance: Scalars["BigDecimal"]["output"];
  treasurySDaiBalance: Scalars["BigDecimal"]["output"];
  treasurySDaiInDaiBalance: Scalars["BigDecimal"]["output"];
};

export type ClearLoanRequestEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ClearLoanRequestEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  clearinghouseDaiBalance?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseDaiBalance_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseDaiBalance_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseDaiBalance_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  clearinghouseDaiBalance_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseDaiBalance_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseDaiBalance_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseDaiBalance_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  clearinghouseSDaiBalance?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiBalance_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiBalance_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiBalance_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  clearinghouseSDaiBalance_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiBalance_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiBalance_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiBalance_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  clearinghouseSDaiInDaiBalance?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiInDaiBalance_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiInDaiBalance_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiInDaiBalance_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  clearinghouseSDaiInDaiBalance_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiInDaiBalance_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiInDaiBalance_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiInDaiBalance_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  date?: InputMaybe<Scalars["String"]["input"]>;
  date_contains?: InputMaybe<Scalars["String"]["input"]>;
  date_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  date_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_gt?: InputMaybe<Scalars["String"]["input"]>;
  date_gte?: InputMaybe<Scalars["String"]["input"]>;
  date_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  date_lt?: InputMaybe<Scalars["String"]["input"]>;
  date_lte?: InputMaybe<Scalars["String"]["input"]>;
  date_not?: InputMaybe<Scalars["String"]["input"]>;
  date_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  date_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  date_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  date_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  date_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  date_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  id_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_gt?: InputMaybe<Scalars["String"]["input"]>;
  id_gte?: InputMaybe<Scalars["String"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_lt?: InputMaybe<Scalars["String"]["input"]>;
  id_lte?: InputMaybe<Scalars["String"]["input"]>;
  id_not?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  loan?: InputMaybe<Scalars["String"]["input"]>;
  loan_?: InputMaybe<CoolerLoan_Filter>;
  loan_contains?: InputMaybe<Scalars["String"]["input"]>;
  loan_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  loan_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  loan_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  loan_gt?: InputMaybe<Scalars["String"]["input"]>;
  loan_gte?: InputMaybe<Scalars["String"]["input"]>;
  loan_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  loan_lt?: InputMaybe<Scalars["String"]["input"]>;
  loan_lte?: InputMaybe<Scalars["String"]["input"]>;
  loan_not?: InputMaybe<Scalars["String"]["input"]>;
  loan_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  loan_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  loan_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  loan_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  loan_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  loan_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  loan_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  loan_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  loan_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<ClearLoanRequestEvent_Filter>>>;
  request?: InputMaybe<Scalars["String"]["input"]>;
  request_?: InputMaybe<CoolerLoanRequest_Filter>;
  request_contains?: InputMaybe<Scalars["String"]["input"]>;
  request_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  request_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  request_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  request_gt?: InputMaybe<Scalars["String"]["input"]>;
  request_gte?: InputMaybe<Scalars["String"]["input"]>;
  request_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  request_lt?: InputMaybe<Scalars["String"]["input"]>;
  request_lte?: InputMaybe<Scalars["String"]["input"]>;
  request_not?: InputMaybe<Scalars["String"]["input"]>;
  request_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  request_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  request_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  request_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  request_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  request_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  request_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  request_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  request_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  treasuryDaiBalance?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasuryDaiBalance_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasuryDaiBalance_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasuryDaiBalance_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  treasuryDaiBalance_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasuryDaiBalance_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasuryDaiBalance_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasuryDaiBalance_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  treasurySDaiBalance?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiBalance_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiBalance_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiBalance_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  treasurySDaiBalance_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiBalance_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiBalance_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiBalance_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  treasurySDaiInDaiBalance?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiInDaiBalance_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiInDaiBalance_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiInDaiBalance_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  treasurySDaiInDaiBalance_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiInDaiBalance_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiInDaiBalance_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiInDaiBalance_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
};

export enum ClearLoanRequestEvent_OrderBy {
  BlockNumber = "blockNumber",
  BlockTimestamp = "blockTimestamp",
  ClearinghouseDaiBalance = "clearinghouseDaiBalance",
  ClearinghouseSDaiBalance = "clearinghouseSDaiBalance",
  ClearinghouseSDaiInDaiBalance = "clearinghouseSDaiInDaiBalance",
  Date = "date",
  Id = "id",
  Loan = "loan",
  LoanBorrower = "loan__borrower",
  LoanCollateral = "loan__collateral",
  LoanCollateralToken = "loan__collateralToken",
  LoanCooler = "loan__cooler",
  LoanCreatedBlock = "loan__createdBlock",
  LoanCreatedTimestamp = "loan__createdTimestamp",
  LoanCreatedTransaction = "loan__createdTransaction",
  LoanDebtToken = "loan__debtToken",
  LoanExpiryTimestamp = "loan__expiryTimestamp",
  LoanHasCallback = "loan__hasCallback",
  LoanId = "loan__id",
  LoanInterest = "loan__interest",
  LoanLender = "loan__lender",
  LoanLoanId = "loan__loanId",
  LoanPrincipal = "loan__principal",
  Request = "request",
  RequestAmount = "request__amount",
  RequestBorrower = "request__borrower",
  RequestCollateralToken = "request__collateralToken",
  RequestCooler = "request__cooler",
  RequestCreatedBlock = "request__createdBlock",
  RequestCreatedTimestamp = "request__createdTimestamp",
  RequestCreatedTransaction = "request__createdTransaction",
  RequestDebtToken = "request__debtToken",
  RequestDurationSeconds = "request__durationSeconds",
  RequestId = "request__id",
  RequestInterestPercentage = "request__interestPercentage",
  RequestIsRescinded = "request__isRescinded",
  RequestLoanToCollateralRatio = "request__loanToCollateralRatio",
  RequestRequestId = "request__requestId",
  TransactionHash = "transactionHash",
  TreasuryDaiBalance = "treasuryDaiBalance",
  TreasurySDaiBalance = "treasurySDaiBalance",
  TreasurySDaiInDaiBalance = "treasurySDaiInDaiBalance",
}

export type ClearinghouseSnapshot = {
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  clearinghouse: Scalars["Bytes"]["output"];
  collateralAddress: Scalars["Bytes"]["output"];
  coolerFactoryAddress: Scalars["Bytes"]["output"];
  daiBalance: Scalars["BigDecimal"]["output"];
  date: Scalars["String"]["output"];
  debtAddress: Scalars["Bytes"]["output"];
  defundEvents: Array<DefundEvent>;
  duration: Scalars["BigInt"]["output"];
  fundAmount: Scalars["BigDecimal"]["output"];
  fundCadence: Scalars["BigInt"]["output"];
  id: Scalars["String"]["output"];
  interestRate: Scalars["BigDecimal"]["output"];
  interestReceivables: Scalars["BigDecimal"]["output"];
  isActive: Scalars["Boolean"]["output"];
  loanToCollateral: Scalars["BigDecimal"]["output"];
  nextRebalanceTimestamp: Scalars["BigInt"]["output"];
  principalReceivables: Scalars["BigDecimal"]["output"];
  rebalanceEvents: Array<RebalanceEvent>;
  sDaiBalance: Scalars["BigDecimal"]["output"];
  sDaiInDaiBalance: Scalars["BigDecimal"]["output"];
  treasuryDaiBalance: Scalars["BigDecimal"]["output"];
  treasurySDaiBalance: Scalars["BigDecimal"]["output"];
  treasurySDaiInDaiBalance: Scalars["BigDecimal"]["output"];
};

export type ClearinghouseSnapshotDefundEventsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<DefundEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<DefundEvent_Filter>;
};

export type ClearinghouseSnapshotRebalanceEventsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<RebalanceEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<RebalanceEvent_Filter>;
};

export type ClearinghouseSnapshot_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ClearinghouseSnapshot_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  clearinghouse?: InputMaybe<Scalars["Bytes"]["input"]>;
  clearinghouse_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  clearinghouse_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  clearinghouse_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  clearinghouse_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  clearinghouse_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  clearinghouse_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  clearinghouse_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  clearinghouse_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  clearinghouse_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  collateralAddress?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralAddress_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralAddress_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralAddress_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralAddress_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  collateralAddress_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralAddress_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralAddress_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralAddress_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralAddress_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  coolerFactoryAddress?: InputMaybe<Scalars["Bytes"]["input"]>;
  coolerFactoryAddress_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  coolerFactoryAddress_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  coolerFactoryAddress_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  coolerFactoryAddress_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  coolerFactoryAddress_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  coolerFactoryAddress_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  coolerFactoryAddress_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  coolerFactoryAddress_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  coolerFactoryAddress_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  daiBalance?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  daiBalance_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  daiBalance_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  daiBalance_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  daiBalance_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  daiBalance_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  daiBalance_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  daiBalance_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  date?: InputMaybe<Scalars["String"]["input"]>;
  date_contains?: InputMaybe<Scalars["String"]["input"]>;
  date_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  date_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_gt?: InputMaybe<Scalars["String"]["input"]>;
  date_gte?: InputMaybe<Scalars["String"]["input"]>;
  date_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  date_lt?: InputMaybe<Scalars["String"]["input"]>;
  date_lte?: InputMaybe<Scalars["String"]["input"]>;
  date_not?: InputMaybe<Scalars["String"]["input"]>;
  date_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  date_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  date_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  date_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  date_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  date_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  debtAddress?: InputMaybe<Scalars["Bytes"]["input"]>;
  debtAddress_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  debtAddress_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  debtAddress_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  debtAddress_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  debtAddress_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  debtAddress_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  debtAddress_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  debtAddress_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  debtAddress_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  defundEvents_?: InputMaybe<DefundEvent_Filter>;
  duration?: InputMaybe<Scalars["BigInt"]["input"]>;
  duration_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  duration_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  duration_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  duration_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  duration_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  duration_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  duration_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  fundAmount?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  fundAmount_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  fundAmount_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  fundAmount_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  fundAmount_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  fundAmount_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  fundAmount_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  fundAmount_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  fundCadence?: InputMaybe<Scalars["BigInt"]["input"]>;
  fundCadence_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  fundCadence_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  fundCadence_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  fundCadence_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  fundCadence_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  fundCadence_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  fundCadence_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  id_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_gt?: InputMaybe<Scalars["String"]["input"]>;
  id_gte?: InputMaybe<Scalars["String"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_lt?: InputMaybe<Scalars["String"]["input"]>;
  id_lte?: InputMaybe<Scalars["String"]["input"]>;
  id_not?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  interestRate?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interestRate_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interestRate_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interestRate_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  interestRate_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interestRate_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interestRate_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interestRate_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  interestReceivables?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interestReceivables_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interestReceivables_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interestReceivables_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  interestReceivables_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interestReceivables_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interestReceivables_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interestReceivables_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
  isActive_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  isActive_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  isActive_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  loanToCollateral?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  loanToCollateral_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  loanToCollateral_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  loanToCollateral_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  loanToCollateral_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  loanToCollateral_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  loanToCollateral_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  loanToCollateral_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  nextRebalanceTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  nextRebalanceTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  nextRebalanceTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  nextRebalanceTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  nextRebalanceTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  nextRebalanceTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  nextRebalanceTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  nextRebalanceTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<ClearinghouseSnapshot_Filter>>>;
  principalReceivables?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  principalReceivables_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  principalReceivables_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  principalReceivables_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  principalReceivables_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  principalReceivables_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  principalReceivables_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  principalReceivables_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  rebalanceEvents_?: InputMaybe<RebalanceEvent_Filter>;
  sDaiBalance?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sDaiBalance_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sDaiBalance_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sDaiBalance_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sDaiBalance_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sDaiBalance_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sDaiBalance_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sDaiBalance_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sDaiInDaiBalance?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sDaiInDaiBalance_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sDaiInDaiBalance_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sDaiInDaiBalance_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  sDaiInDaiBalance_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sDaiInDaiBalance_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sDaiInDaiBalance_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  sDaiInDaiBalance_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  treasuryDaiBalance?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasuryDaiBalance_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasuryDaiBalance_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasuryDaiBalance_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  treasuryDaiBalance_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasuryDaiBalance_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasuryDaiBalance_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasuryDaiBalance_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  treasurySDaiBalance?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiBalance_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiBalance_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiBalance_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  treasurySDaiBalance_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiBalance_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiBalance_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiBalance_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  treasurySDaiInDaiBalance?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiInDaiBalance_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiInDaiBalance_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiInDaiBalance_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  treasurySDaiInDaiBalance_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiInDaiBalance_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiInDaiBalance_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiInDaiBalance_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
};

export enum ClearinghouseSnapshot_OrderBy {
  BlockNumber = "blockNumber",
  BlockTimestamp = "blockTimestamp",
  Clearinghouse = "clearinghouse",
  CollateralAddress = "collateralAddress",
  CoolerFactoryAddress = "coolerFactoryAddress",
  DaiBalance = "daiBalance",
  Date = "date",
  DebtAddress = "debtAddress",
  DefundEvents = "defundEvents",
  Duration = "duration",
  FundAmount = "fundAmount",
  FundCadence = "fundCadence",
  Id = "id",
  InterestRate = "interestRate",
  InterestReceivables = "interestReceivables",
  IsActive = "isActive",
  LoanToCollateral = "loanToCollateral",
  NextRebalanceTimestamp = "nextRebalanceTimestamp",
  PrincipalReceivables = "principalReceivables",
  RebalanceEvents = "rebalanceEvents",
  SDaiBalance = "sDaiBalance",
  SDaiInDaiBalance = "sDaiInDaiBalance",
  TreasuryDaiBalance = "treasuryDaiBalance",
  TreasurySDaiBalance = "treasurySDaiBalance",
  TreasurySDaiInDaiBalance = "treasurySDaiInDaiBalance",
}

export type CoolerLoan = {
  borrower: Scalars["Bytes"]["output"];
  collateral: Scalars["BigDecimal"]["output"];
  collateralToken: Scalars["Bytes"]["output"];
  cooler: Scalars["Bytes"]["output"];
  createdBlock: Scalars["BigInt"]["output"];
  createdTimestamp: Scalars["BigInt"]["output"];
  createdTransaction: Scalars["Bytes"]["output"];
  creationEvents: Array<ClearLoanRequestEvent>;
  debtToken: Scalars["Bytes"]["output"];
  defaultedClaimEvents: Array<ClaimDefaultedLoanEvent>;
  expiryTimestamp: Scalars["BigInt"]["output"];
  extendEvents: Array<ExtendLoanEvent>;
  hasCallback: Scalars["Boolean"]["output"];
  id: Scalars["String"]["output"];
  interest: Scalars["BigDecimal"]["output"];
  lender: Scalars["Bytes"]["output"];
  loanId: Scalars["BigInt"]["output"];
  principal: Scalars["BigDecimal"]["output"];
  repaymentEvents: Array<RepayLoanEvent>;
  request: CoolerLoanRequest;
};

export type CoolerLoanCreationEventsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ClearLoanRequestEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<ClearLoanRequestEvent_Filter>;
};

export type CoolerLoanDefaultedClaimEventsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ClaimDefaultedLoanEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<ClaimDefaultedLoanEvent_Filter>;
};

export type CoolerLoanExtendEventsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ExtendLoanEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<ExtendLoanEvent_Filter>;
};

export type CoolerLoanRepaymentEventsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<RepayLoanEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<RepayLoanEvent_Filter>;
};

export type CoolerLoanRequest = {
  amount: Scalars["BigDecimal"]["output"];
  borrower: Scalars["Bytes"]["output"];
  clearEvents: Array<ClearLoanRequestEvent>;
  collateralToken: Scalars["Bytes"]["output"];
  cooler: Scalars["Bytes"]["output"];
  createdBlock: Scalars["BigInt"]["output"];
  createdTimestamp: Scalars["BigInt"]["output"];
  createdTransaction: Scalars["Bytes"]["output"];
  debtToken: Scalars["Bytes"]["output"];
  durationSeconds: Scalars["BigInt"]["output"];
  id: Scalars["String"]["output"];
  interestPercentage: Scalars["BigDecimal"]["output"];
  isRescinded: Scalars["Boolean"]["output"];
  loanToCollateralRatio: Scalars["BigDecimal"]["output"];
  loans: Array<CoolerLoan>;
  requestEvents: Array<RequestLoanEvent>;
  requestId: Scalars["BigInt"]["output"];
  rescindEvents: Array<RescindLoanRequestEvent>;
};

export type CoolerLoanRequestClearEventsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ClearLoanRequestEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<ClearLoanRequestEvent_Filter>;
};

export type CoolerLoanRequestLoansArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<CoolerLoan_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<CoolerLoan_Filter>;
};

export type CoolerLoanRequestRequestEventsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<RequestLoanEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<RequestLoanEvent_Filter>;
};

export type CoolerLoanRequestRescindEventsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<RescindLoanRequestEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<RescindLoanRequestEvent_Filter>;
};

export type CoolerLoanRequest_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  amount_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<CoolerLoanRequest_Filter>>>;
  borrower?: InputMaybe<Scalars["Bytes"]["input"]>;
  borrower_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  borrower_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  borrower_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  borrower_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  borrower_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  borrower_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  borrower_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  borrower_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  borrower_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  clearEvents_?: InputMaybe<ClearLoanRequestEvent_Filter>;
  collateralToken?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  collateralToken_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  cooler?: InputMaybe<Scalars["Bytes"]["input"]>;
  cooler_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  cooler_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  cooler_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  cooler_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  cooler_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  cooler_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  cooler_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  cooler_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  cooler_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  createdBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdTransaction?: InputMaybe<Scalars["Bytes"]["input"]>;
  createdTransaction_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  createdTransaction_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  createdTransaction_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  createdTransaction_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  createdTransaction_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  createdTransaction_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  createdTransaction_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  createdTransaction_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  createdTransaction_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  debtToken?: InputMaybe<Scalars["Bytes"]["input"]>;
  debtToken_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  debtToken_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  debtToken_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  debtToken_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  debtToken_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  debtToken_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  debtToken_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  debtToken_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  debtToken_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  durationSeconds?: InputMaybe<Scalars["BigInt"]["input"]>;
  durationSeconds_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  durationSeconds_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  durationSeconds_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  durationSeconds_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  durationSeconds_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  durationSeconds_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  durationSeconds_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  id_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_gt?: InputMaybe<Scalars["String"]["input"]>;
  id_gte?: InputMaybe<Scalars["String"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_lt?: InputMaybe<Scalars["String"]["input"]>;
  id_lte?: InputMaybe<Scalars["String"]["input"]>;
  id_not?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  interestPercentage?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interestPercentage_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interestPercentage_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interestPercentage_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  interestPercentage_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interestPercentage_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interestPercentage_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interestPercentage_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  isRescinded?: InputMaybe<Scalars["Boolean"]["input"]>;
  isRescinded_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  isRescinded_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  isRescinded_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  loanToCollateralRatio?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  loanToCollateralRatio_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  loanToCollateralRatio_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  loanToCollateralRatio_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  loanToCollateralRatio_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  loanToCollateralRatio_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  loanToCollateralRatio_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  loanToCollateralRatio_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  loans_?: InputMaybe<CoolerLoan_Filter>;
  or?: InputMaybe<Array<InputMaybe<CoolerLoanRequest_Filter>>>;
  requestEvents_?: InputMaybe<RequestLoanEvent_Filter>;
  requestId?: InputMaybe<Scalars["BigInt"]["input"]>;
  requestId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  requestId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  requestId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  requestId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  requestId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  requestId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  requestId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  rescindEvents_?: InputMaybe<RescindLoanRequestEvent_Filter>;
};

export enum CoolerLoanRequest_OrderBy {
  Amount = "amount",
  Borrower = "borrower",
  ClearEvents = "clearEvents",
  CollateralToken = "collateralToken",
  Cooler = "cooler",
  CreatedBlock = "createdBlock",
  CreatedTimestamp = "createdTimestamp",
  CreatedTransaction = "createdTransaction",
  DebtToken = "debtToken",
  DurationSeconds = "durationSeconds",
  Id = "id",
  InterestPercentage = "interestPercentage",
  IsRescinded = "isRescinded",
  LoanToCollateralRatio = "loanToCollateralRatio",
  Loans = "loans",
  RequestEvents = "requestEvents",
  RequestId = "requestId",
  RescindEvents = "rescindEvents",
}

export type CoolerLoan_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CoolerLoan_Filter>>>;
  borrower?: InputMaybe<Scalars["Bytes"]["input"]>;
  borrower_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  borrower_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  borrower_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  borrower_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  borrower_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  borrower_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  borrower_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  borrower_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  borrower_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  collateral?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateralToken?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  collateralToken_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  collateralToken_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  collateral_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateral_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateral_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  collateral_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateral_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateral_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateral_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  cooler?: InputMaybe<Scalars["Bytes"]["input"]>;
  cooler_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  cooler_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  cooler_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  cooler_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  cooler_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  cooler_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  cooler_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  cooler_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  cooler_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  createdBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdTransaction?: InputMaybe<Scalars["Bytes"]["input"]>;
  createdTransaction_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  createdTransaction_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  createdTransaction_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  createdTransaction_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  createdTransaction_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  createdTransaction_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  createdTransaction_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  createdTransaction_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  createdTransaction_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  creationEvents_?: InputMaybe<ClearLoanRequestEvent_Filter>;
  debtToken?: InputMaybe<Scalars["Bytes"]["input"]>;
  debtToken_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  debtToken_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  debtToken_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  debtToken_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  debtToken_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  debtToken_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  debtToken_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  debtToken_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  debtToken_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  defaultedClaimEvents_?: InputMaybe<ClaimDefaultedLoanEvent_Filter>;
  expiryTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  expiryTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  expiryTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  expiryTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  expiryTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  expiryTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  expiryTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  expiryTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  extendEvents_?: InputMaybe<ExtendLoanEvent_Filter>;
  hasCallback?: InputMaybe<Scalars["Boolean"]["input"]>;
  hasCallback_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  hasCallback_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  hasCallback_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  id_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_gt?: InputMaybe<Scalars["String"]["input"]>;
  id_gte?: InputMaybe<Scalars["String"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_lt?: InputMaybe<Scalars["String"]["input"]>;
  id_lte?: InputMaybe<Scalars["String"]["input"]>;
  id_not?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  interest?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interest_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interest_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interest_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  interest_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interest_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interest_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interest_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  lender?: InputMaybe<Scalars["Bytes"]["input"]>;
  lender_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  lender_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  lender_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  lender_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  lender_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  lender_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  lender_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  lender_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  lender_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  loanId?: InputMaybe<Scalars["BigInt"]["input"]>;
  loanId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  loanId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  loanId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  loanId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  loanId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  loanId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  loanId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<CoolerLoan_Filter>>>;
  principal?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  principal_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  principal_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  principal_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  principal_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  principal_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  principal_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  principal_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  repaymentEvents_?: InputMaybe<RepayLoanEvent_Filter>;
  request?: InputMaybe<Scalars["String"]["input"]>;
  request_?: InputMaybe<CoolerLoanRequest_Filter>;
  request_contains?: InputMaybe<Scalars["String"]["input"]>;
  request_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  request_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  request_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  request_gt?: InputMaybe<Scalars["String"]["input"]>;
  request_gte?: InputMaybe<Scalars["String"]["input"]>;
  request_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  request_lt?: InputMaybe<Scalars["String"]["input"]>;
  request_lte?: InputMaybe<Scalars["String"]["input"]>;
  request_not?: InputMaybe<Scalars["String"]["input"]>;
  request_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  request_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  request_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  request_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  request_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  request_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  request_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  request_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  request_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum CoolerLoan_OrderBy {
  Borrower = "borrower",
  Collateral = "collateral",
  CollateralToken = "collateralToken",
  Cooler = "cooler",
  CreatedBlock = "createdBlock",
  CreatedTimestamp = "createdTimestamp",
  CreatedTransaction = "createdTransaction",
  CreationEvents = "creationEvents",
  DebtToken = "debtToken",
  DefaultedClaimEvents = "defaultedClaimEvents",
  ExpiryTimestamp = "expiryTimestamp",
  ExtendEvents = "extendEvents",
  HasCallback = "hasCallback",
  Id = "id",
  Interest = "interest",
  Lender = "lender",
  LoanId = "loanId",
  Principal = "principal",
  RepaymentEvents = "repaymentEvents",
  Request = "request",
  RequestAmount = "request__amount",
  RequestBorrower = "request__borrower",
  RequestCollateralToken = "request__collateralToken",
  RequestCooler = "request__cooler",
  RequestCreatedBlock = "request__createdBlock",
  RequestCreatedTimestamp = "request__createdTimestamp",
  RequestCreatedTransaction = "request__createdTransaction",
  RequestDebtToken = "request__debtToken",
  RequestDurationSeconds = "request__durationSeconds",
  RequestId = "request__id",
  RequestInterestPercentage = "request__interestPercentage",
  RequestIsRescinded = "request__isRescinded",
  RequestLoanToCollateralRatio = "request__loanToCollateralRatio",
  RequestRequestId = "request__requestId",
}

export type DefundEvent = {
  amount: Scalars["BigDecimal"]["output"];
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  clearinghouse: Scalars["Bytes"]["output"];
  clearinghouseSnapshot: ClearinghouseSnapshot;
  date: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
};

export type DefundEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  amount_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<DefundEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  clearinghouse?: InputMaybe<Scalars["Bytes"]["input"]>;
  clearinghouseSnapshot?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouseSnapshot_?: InputMaybe<ClearinghouseSnapshot_Filter>;
  clearinghouseSnapshot_contains?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouseSnapshot_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouseSnapshot_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouseSnapshot_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouseSnapshot_gt?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouseSnapshot_gte?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouseSnapshot_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  clearinghouseSnapshot_lt?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouseSnapshot_lte?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouseSnapshot_not?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouseSnapshot_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouseSnapshot_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouseSnapshot_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouseSnapshot_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouseSnapshot_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  clearinghouseSnapshot_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouseSnapshot_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouseSnapshot_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouseSnapshot_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouse_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  clearinghouse_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  clearinghouse_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  clearinghouse_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  clearinghouse_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  clearinghouse_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  clearinghouse_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  clearinghouse_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  clearinghouse_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  date?: InputMaybe<Scalars["String"]["input"]>;
  date_contains?: InputMaybe<Scalars["String"]["input"]>;
  date_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  date_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_gt?: InputMaybe<Scalars["String"]["input"]>;
  date_gte?: InputMaybe<Scalars["String"]["input"]>;
  date_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  date_lt?: InputMaybe<Scalars["String"]["input"]>;
  date_lte?: InputMaybe<Scalars["String"]["input"]>;
  date_not?: InputMaybe<Scalars["String"]["input"]>;
  date_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  date_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  date_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  date_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  date_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  date_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  id_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_gt?: InputMaybe<Scalars["String"]["input"]>;
  id_gte?: InputMaybe<Scalars["String"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_lt?: InputMaybe<Scalars["String"]["input"]>;
  id_lte?: InputMaybe<Scalars["String"]["input"]>;
  id_not?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<DefundEvent_Filter>>>;
  transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum DefundEvent_OrderBy {
  Amount = "amount",
  BlockNumber = "blockNumber",
  BlockTimestamp = "blockTimestamp",
  Clearinghouse = "clearinghouse",
  ClearinghouseSnapshot = "clearinghouseSnapshot",
  ClearinghouseSnapshotBlockNumber = "clearinghouseSnapshot__blockNumber",
  ClearinghouseSnapshotBlockTimestamp = "clearinghouseSnapshot__blockTimestamp",
  ClearinghouseSnapshotClearinghouse = "clearinghouseSnapshot__clearinghouse",
  ClearinghouseSnapshotCollateralAddress = "clearinghouseSnapshot__collateralAddress",
  ClearinghouseSnapshotCoolerFactoryAddress = "clearinghouseSnapshot__coolerFactoryAddress",
  ClearinghouseSnapshotDaiBalance = "clearinghouseSnapshot__daiBalance",
  ClearinghouseSnapshotDate = "clearinghouseSnapshot__date",
  ClearinghouseSnapshotDebtAddress = "clearinghouseSnapshot__debtAddress",
  ClearinghouseSnapshotDuration = "clearinghouseSnapshot__duration",
  ClearinghouseSnapshotFundAmount = "clearinghouseSnapshot__fundAmount",
  ClearinghouseSnapshotFundCadence = "clearinghouseSnapshot__fundCadence",
  ClearinghouseSnapshotId = "clearinghouseSnapshot__id",
  ClearinghouseSnapshotInterestRate = "clearinghouseSnapshot__interestRate",
  ClearinghouseSnapshotInterestReceivables = "clearinghouseSnapshot__interestReceivables",
  ClearinghouseSnapshotIsActive = "clearinghouseSnapshot__isActive",
  ClearinghouseSnapshotLoanToCollateral = "clearinghouseSnapshot__loanToCollateral",
  ClearinghouseSnapshotNextRebalanceTimestamp = "clearinghouseSnapshot__nextRebalanceTimestamp",
  ClearinghouseSnapshotPrincipalReceivables = "clearinghouseSnapshot__principalReceivables",
  ClearinghouseSnapshotSDaiBalance = "clearinghouseSnapshot__sDaiBalance",
  ClearinghouseSnapshotSDaiInDaiBalance = "clearinghouseSnapshot__sDaiInDaiBalance",
  ClearinghouseSnapshotTreasuryDaiBalance = "clearinghouseSnapshot__treasuryDaiBalance",
  ClearinghouseSnapshotTreasurySDaiBalance = "clearinghouseSnapshot__treasurySDaiBalance",
  ClearinghouseSnapshotTreasurySDaiInDaiBalance = "clearinghouseSnapshot__treasurySDaiInDaiBalance",
  Date = "date",
  Id = "id",
  TransactionHash = "transactionHash",
}

export type ExtendLoanEvent = {
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  clearinghouseDaiBalance: Scalars["BigDecimal"]["output"];
  clearinghouseSDaiBalance: Scalars["BigDecimal"]["output"];
  clearinghouseSDaiInDaiBalance: Scalars["BigDecimal"]["output"];
  date: Scalars["String"]["output"];
  expiryTimestamp: Scalars["BigInt"]["output"];
  id: Scalars["String"]["output"];
  interestDue: Scalars["BigDecimal"]["output"];
  loan: CoolerLoan;
  periods: Scalars["Int"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
  treasuryDaiBalance: Scalars["BigDecimal"]["output"];
  treasurySDaiBalance: Scalars["BigDecimal"]["output"];
  treasurySDaiInDaiBalance: Scalars["BigDecimal"]["output"];
};

export type ExtendLoanEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ExtendLoanEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  clearinghouseDaiBalance?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseDaiBalance_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseDaiBalance_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseDaiBalance_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  clearinghouseDaiBalance_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseDaiBalance_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseDaiBalance_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseDaiBalance_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  clearinghouseSDaiBalance?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiBalance_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiBalance_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiBalance_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  clearinghouseSDaiBalance_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiBalance_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiBalance_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiBalance_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  clearinghouseSDaiInDaiBalance?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiInDaiBalance_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiInDaiBalance_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiInDaiBalance_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  clearinghouseSDaiInDaiBalance_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiInDaiBalance_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiInDaiBalance_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiInDaiBalance_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  date?: InputMaybe<Scalars["String"]["input"]>;
  date_contains?: InputMaybe<Scalars["String"]["input"]>;
  date_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  date_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_gt?: InputMaybe<Scalars["String"]["input"]>;
  date_gte?: InputMaybe<Scalars["String"]["input"]>;
  date_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  date_lt?: InputMaybe<Scalars["String"]["input"]>;
  date_lte?: InputMaybe<Scalars["String"]["input"]>;
  date_not?: InputMaybe<Scalars["String"]["input"]>;
  date_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  date_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  date_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  date_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  date_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  date_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  expiryTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  expiryTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  expiryTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  expiryTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  expiryTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  expiryTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  expiryTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  expiryTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  id_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_gt?: InputMaybe<Scalars["String"]["input"]>;
  id_gte?: InputMaybe<Scalars["String"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_lt?: InputMaybe<Scalars["String"]["input"]>;
  id_lte?: InputMaybe<Scalars["String"]["input"]>;
  id_not?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  interestDue?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interestDue_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interestDue_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interestDue_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  interestDue_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interestDue_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interestDue_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interestDue_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  loan?: InputMaybe<Scalars["String"]["input"]>;
  loan_?: InputMaybe<CoolerLoan_Filter>;
  loan_contains?: InputMaybe<Scalars["String"]["input"]>;
  loan_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  loan_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  loan_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  loan_gt?: InputMaybe<Scalars["String"]["input"]>;
  loan_gte?: InputMaybe<Scalars["String"]["input"]>;
  loan_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  loan_lt?: InputMaybe<Scalars["String"]["input"]>;
  loan_lte?: InputMaybe<Scalars["String"]["input"]>;
  loan_not?: InputMaybe<Scalars["String"]["input"]>;
  loan_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  loan_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  loan_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  loan_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  loan_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  loan_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  loan_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  loan_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  loan_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<ExtendLoanEvent_Filter>>>;
  periods?: InputMaybe<Scalars["Int"]["input"]>;
  periods_gt?: InputMaybe<Scalars["Int"]["input"]>;
  periods_gte?: InputMaybe<Scalars["Int"]["input"]>;
  periods_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  periods_lt?: InputMaybe<Scalars["Int"]["input"]>;
  periods_lte?: InputMaybe<Scalars["Int"]["input"]>;
  periods_not?: InputMaybe<Scalars["Int"]["input"]>;
  periods_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  treasuryDaiBalance?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasuryDaiBalance_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasuryDaiBalance_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasuryDaiBalance_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  treasuryDaiBalance_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasuryDaiBalance_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasuryDaiBalance_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasuryDaiBalance_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  treasurySDaiBalance?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiBalance_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiBalance_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiBalance_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  treasurySDaiBalance_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiBalance_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiBalance_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiBalance_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  treasurySDaiInDaiBalance?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiInDaiBalance_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiInDaiBalance_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiInDaiBalance_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  treasurySDaiInDaiBalance_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiInDaiBalance_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiInDaiBalance_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiInDaiBalance_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
};

export enum ExtendLoanEvent_OrderBy {
  BlockNumber = "blockNumber",
  BlockTimestamp = "blockTimestamp",
  ClearinghouseDaiBalance = "clearinghouseDaiBalance",
  ClearinghouseSDaiBalance = "clearinghouseSDaiBalance",
  ClearinghouseSDaiInDaiBalance = "clearinghouseSDaiInDaiBalance",
  Date = "date",
  ExpiryTimestamp = "expiryTimestamp",
  Id = "id",
  InterestDue = "interestDue",
  Loan = "loan",
  LoanBorrower = "loan__borrower",
  LoanCollateral = "loan__collateral",
  LoanCollateralToken = "loan__collateralToken",
  LoanCooler = "loan__cooler",
  LoanCreatedBlock = "loan__createdBlock",
  LoanCreatedTimestamp = "loan__createdTimestamp",
  LoanCreatedTransaction = "loan__createdTransaction",
  LoanDebtToken = "loan__debtToken",
  LoanExpiryTimestamp = "loan__expiryTimestamp",
  LoanHasCallback = "loan__hasCallback",
  LoanId = "loan__id",
  LoanInterest = "loan__interest",
  LoanLender = "loan__lender",
  LoanLoanId = "loan__loanId",
  LoanPrincipal = "loan__principal",
  Periods = "periods",
  TransactionHash = "transactionHash",
  TreasuryDaiBalance = "treasuryDaiBalance",
  TreasurySDaiBalance = "treasurySDaiBalance",
  TreasurySDaiInDaiBalance = "treasurySDaiInDaiBalance",
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = "asc",
  Desc = "desc",
}

export type Query = {
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  claimDefaultedLoanEvent?: Maybe<ClaimDefaultedLoanEvent>;
  claimDefaultedLoanEvents: Array<ClaimDefaultedLoanEvent>;
  clearLoanRequestEvent?: Maybe<ClearLoanRequestEvent>;
  clearLoanRequestEvents: Array<ClearLoanRequestEvent>;
  clearinghouseSnapshot?: Maybe<ClearinghouseSnapshot>;
  clearinghouseSnapshots: Array<ClearinghouseSnapshot>;
  coolerLoan?: Maybe<CoolerLoan>;
  coolerLoanRequest?: Maybe<CoolerLoanRequest>;
  coolerLoanRequests: Array<CoolerLoanRequest>;
  coolerLoans: Array<CoolerLoan>;
  defundEvent?: Maybe<DefundEvent>;
  defundEvents: Array<DefundEvent>;
  extendLoanEvent?: Maybe<ExtendLoanEvent>;
  extendLoanEvents: Array<ExtendLoanEvent>;
  rebalanceEvent?: Maybe<RebalanceEvent>;
  rebalanceEvents: Array<RebalanceEvent>;
  repayLoanEvent?: Maybe<RepayLoanEvent>;
  repayLoanEvents: Array<RepayLoanEvent>;
  requestLoanEvent?: Maybe<RequestLoanEvent>;
  requestLoanEvents: Array<RequestLoanEvent>;
  rescindLoanRequestEvent?: Maybe<RescindLoanRequestEvent>;
  rescindLoanRequestEvents: Array<RescindLoanRequestEvent>;
};

export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type QueryClaimDefaultedLoanEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryClaimDefaultedLoanEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ClaimDefaultedLoanEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ClaimDefaultedLoanEvent_Filter>;
};

export type QueryClearLoanRequestEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryClearLoanRequestEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ClearLoanRequestEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ClearLoanRequestEvent_Filter>;
};

export type QueryClearinghouseSnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryClearinghouseSnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ClearinghouseSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ClearinghouseSnapshot_Filter>;
};

export type QueryCoolerLoanArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryCoolerLoanRequestArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryCoolerLoanRequestsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<CoolerLoanRequest_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CoolerLoanRequest_Filter>;
};

export type QueryCoolerLoansArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<CoolerLoan_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CoolerLoan_Filter>;
};

export type QueryDefundEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryDefundEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<DefundEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DefundEvent_Filter>;
};

export type QueryExtendLoanEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryExtendLoanEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ExtendLoanEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ExtendLoanEvent_Filter>;
};

export type QueryRebalanceEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryRebalanceEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<RebalanceEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RebalanceEvent_Filter>;
};

export type QueryRepayLoanEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryRepayLoanEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<RepayLoanEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RepayLoanEvent_Filter>;
};

export type QueryRequestLoanEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryRequestLoanEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<RequestLoanEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RequestLoanEvent_Filter>;
};

export type QueryRescindLoanRequestEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryRescindLoanRequestEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<RescindLoanRequestEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RescindLoanRequestEvent_Filter>;
};

export type RebalanceEvent = {
  amount: Scalars["BigDecimal"]["output"];
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  clearinghouse: Scalars["Bytes"]["output"];
  clearinghouseSnapshot: ClearinghouseSnapshot;
  date: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
};

export type RebalanceEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  amount_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<RebalanceEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  clearinghouse?: InputMaybe<Scalars["Bytes"]["input"]>;
  clearinghouseSnapshot?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouseSnapshot_?: InputMaybe<ClearinghouseSnapshot_Filter>;
  clearinghouseSnapshot_contains?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouseSnapshot_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouseSnapshot_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouseSnapshot_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouseSnapshot_gt?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouseSnapshot_gte?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouseSnapshot_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  clearinghouseSnapshot_lt?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouseSnapshot_lte?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouseSnapshot_not?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouseSnapshot_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouseSnapshot_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouseSnapshot_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouseSnapshot_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouseSnapshot_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  clearinghouseSnapshot_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouseSnapshot_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouseSnapshot_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouseSnapshot_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  clearinghouse_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  clearinghouse_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  clearinghouse_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  clearinghouse_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  clearinghouse_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  clearinghouse_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  clearinghouse_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  clearinghouse_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  clearinghouse_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  date?: InputMaybe<Scalars["String"]["input"]>;
  date_contains?: InputMaybe<Scalars["String"]["input"]>;
  date_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  date_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_gt?: InputMaybe<Scalars["String"]["input"]>;
  date_gte?: InputMaybe<Scalars["String"]["input"]>;
  date_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  date_lt?: InputMaybe<Scalars["String"]["input"]>;
  date_lte?: InputMaybe<Scalars["String"]["input"]>;
  date_not?: InputMaybe<Scalars["String"]["input"]>;
  date_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  date_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  date_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  date_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  date_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  date_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  id_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_gt?: InputMaybe<Scalars["String"]["input"]>;
  id_gte?: InputMaybe<Scalars["String"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_lt?: InputMaybe<Scalars["String"]["input"]>;
  id_lte?: InputMaybe<Scalars["String"]["input"]>;
  id_not?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<RebalanceEvent_Filter>>>;
  transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum RebalanceEvent_OrderBy {
  Amount = "amount",
  BlockNumber = "blockNumber",
  BlockTimestamp = "blockTimestamp",
  Clearinghouse = "clearinghouse",
  ClearinghouseSnapshot = "clearinghouseSnapshot",
  ClearinghouseSnapshotBlockNumber = "clearinghouseSnapshot__blockNumber",
  ClearinghouseSnapshotBlockTimestamp = "clearinghouseSnapshot__blockTimestamp",
  ClearinghouseSnapshotClearinghouse = "clearinghouseSnapshot__clearinghouse",
  ClearinghouseSnapshotCollateralAddress = "clearinghouseSnapshot__collateralAddress",
  ClearinghouseSnapshotCoolerFactoryAddress = "clearinghouseSnapshot__coolerFactoryAddress",
  ClearinghouseSnapshotDaiBalance = "clearinghouseSnapshot__daiBalance",
  ClearinghouseSnapshotDate = "clearinghouseSnapshot__date",
  ClearinghouseSnapshotDebtAddress = "clearinghouseSnapshot__debtAddress",
  ClearinghouseSnapshotDuration = "clearinghouseSnapshot__duration",
  ClearinghouseSnapshotFundAmount = "clearinghouseSnapshot__fundAmount",
  ClearinghouseSnapshotFundCadence = "clearinghouseSnapshot__fundCadence",
  ClearinghouseSnapshotId = "clearinghouseSnapshot__id",
  ClearinghouseSnapshotInterestRate = "clearinghouseSnapshot__interestRate",
  ClearinghouseSnapshotInterestReceivables = "clearinghouseSnapshot__interestReceivables",
  ClearinghouseSnapshotIsActive = "clearinghouseSnapshot__isActive",
  ClearinghouseSnapshotLoanToCollateral = "clearinghouseSnapshot__loanToCollateral",
  ClearinghouseSnapshotNextRebalanceTimestamp = "clearinghouseSnapshot__nextRebalanceTimestamp",
  ClearinghouseSnapshotPrincipalReceivables = "clearinghouseSnapshot__principalReceivables",
  ClearinghouseSnapshotSDaiBalance = "clearinghouseSnapshot__sDaiBalance",
  ClearinghouseSnapshotSDaiInDaiBalance = "clearinghouseSnapshot__sDaiInDaiBalance",
  ClearinghouseSnapshotTreasuryDaiBalance = "clearinghouseSnapshot__treasuryDaiBalance",
  ClearinghouseSnapshotTreasurySDaiBalance = "clearinghouseSnapshot__treasurySDaiBalance",
  ClearinghouseSnapshotTreasurySDaiInDaiBalance = "clearinghouseSnapshot__treasurySDaiInDaiBalance",
  Date = "date",
  Id = "id",
  TransactionHash = "transactionHash",
}

export type RepayLoanEvent = {
  amountPaid: Scalars["BigDecimal"]["output"];
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  clearinghouseDaiBalance: Scalars["BigDecimal"]["output"];
  clearinghouseSDaiBalance: Scalars["BigDecimal"]["output"];
  clearinghouseSDaiInDaiBalance: Scalars["BigDecimal"]["output"];
  collateralDeposited: Scalars["BigDecimal"]["output"];
  date: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  interestPayable: Scalars["BigDecimal"]["output"];
  loan: CoolerLoan;
  principalPayable: Scalars["BigDecimal"]["output"];
  secondsToExpiry: Scalars["BigInt"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
  treasuryDaiBalance: Scalars["BigDecimal"]["output"];
  treasurySDaiBalance: Scalars["BigDecimal"]["output"];
  treasurySDaiInDaiBalance: Scalars["BigDecimal"]["output"];
};

export type RepayLoanEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amountPaid?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountPaid_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountPaid_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountPaid_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  amountPaid_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountPaid_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountPaid_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountPaid_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<RepayLoanEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  clearinghouseDaiBalance?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseDaiBalance_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseDaiBalance_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseDaiBalance_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  clearinghouseDaiBalance_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseDaiBalance_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseDaiBalance_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseDaiBalance_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  clearinghouseSDaiBalance?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiBalance_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiBalance_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiBalance_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  clearinghouseSDaiBalance_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiBalance_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiBalance_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiBalance_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  clearinghouseSDaiInDaiBalance?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiInDaiBalance_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiInDaiBalance_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiInDaiBalance_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  clearinghouseSDaiInDaiBalance_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiInDaiBalance_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiInDaiBalance_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  clearinghouseSDaiInDaiBalance_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  collateralDeposited?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateralDeposited_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateralDeposited_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateralDeposited_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  collateralDeposited_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateralDeposited_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateralDeposited_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collateralDeposited_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  date?: InputMaybe<Scalars["String"]["input"]>;
  date_contains?: InputMaybe<Scalars["String"]["input"]>;
  date_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  date_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_gt?: InputMaybe<Scalars["String"]["input"]>;
  date_gte?: InputMaybe<Scalars["String"]["input"]>;
  date_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  date_lt?: InputMaybe<Scalars["String"]["input"]>;
  date_lte?: InputMaybe<Scalars["String"]["input"]>;
  date_not?: InputMaybe<Scalars["String"]["input"]>;
  date_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  date_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  date_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  date_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  date_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  date_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  id_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_gt?: InputMaybe<Scalars["String"]["input"]>;
  id_gte?: InputMaybe<Scalars["String"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_lt?: InputMaybe<Scalars["String"]["input"]>;
  id_lte?: InputMaybe<Scalars["String"]["input"]>;
  id_not?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  interestPayable?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interestPayable_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interestPayable_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interestPayable_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  interestPayable_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interestPayable_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interestPayable_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  interestPayable_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  loan?: InputMaybe<Scalars["String"]["input"]>;
  loan_?: InputMaybe<CoolerLoan_Filter>;
  loan_contains?: InputMaybe<Scalars["String"]["input"]>;
  loan_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  loan_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  loan_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  loan_gt?: InputMaybe<Scalars["String"]["input"]>;
  loan_gte?: InputMaybe<Scalars["String"]["input"]>;
  loan_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  loan_lt?: InputMaybe<Scalars["String"]["input"]>;
  loan_lte?: InputMaybe<Scalars["String"]["input"]>;
  loan_not?: InputMaybe<Scalars["String"]["input"]>;
  loan_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  loan_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  loan_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  loan_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  loan_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  loan_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  loan_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  loan_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  loan_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<RepayLoanEvent_Filter>>>;
  principalPayable?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  principalPayable_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  principalPayable_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  principalPayable_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  principalPayable_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  principalPayable_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  principalPayable_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  principalPayable_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  secondsToExpiry?: InputMaybe<Scalars["BigInt"]["input"]>;
  secondsToExpiry_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  secondsToExpiry_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  secondsToExpiry_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  secondsToExpiry_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  secondsToExpiry_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  secondsToExpiry_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  secondsToExpiry_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  treasuryDaiBalance?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasuryDaiBalance_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasuryDaiBalance_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasuryDaiBalance_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  treasuryDaiBalance_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasuryDaiBalance_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasuryDaiBalance_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasuryDaiBalance_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  treasurySDaiBalance?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiBalance_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiBalance_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiBalance_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  treasurySDaiBalance_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiBalance_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiBalance_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiBalance_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  treasurySDaiInDaiBalance?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiInDaiBalance_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiInDaiBalance_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiInDaiBalance_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  treasurySDaiInDaiBalance_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiInDaiBalance_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiInDaiBalance_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  treasurySDaiInDaiBalance_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
};

export enum RepayLoanEvent_OrderBy {
  AmountPaid = "amountPaid",
  BlockNumber = "blockNumber",
  BlockTimestamp = "blockTimestamp",
  ClearinghouseDaiBalance = "clearinghouseDaiBalance",
  ClearinghouseSDaiBalance = "clearinghouseSDaiBalance",
  ClearinghouseSDaiInDaiBalance = "clearinghouseSDaiInDaiBalance",
  CollateralDeposited = "collateralDeposited",
  Date = "date",
  Id = "id",
  InterestPayable = "interestPayable",
  Loan = "loan",
  LoanBorrower = "loan__borrower",
  LoanCollateral = "loan__collateral",
  LoanCollateralToken = "loan__collateralToken",
  LoanCooler = "loan__cooler",
  LoanCreatedBlock = "loan__createdBlock",
  LoanCreatedTimestamp = "loan__createdTimestamp",
  LoanCreatedTransaction = "loan__createdTransaction",
  LoanDebtToken = "loan__debtToken",
  LoanExpiryTimestamp = "loan__expiryTimestamp",
  LoanHasCallback = "loan__hasCallback",
  LoanId = "loan__id",
  LoanInterest = "loan__interest",
  LoanLender = "loan__lender",
  LoanLoanId = "loan__loanId",
  LoanPrincipal = "loan__principal",
  PrincipalPayable = "principalPayable",
  SecondsToExpiry = "secondsToExpiry",
  TransactionHash = "transactionHash",
  TreasuryDaiBalance = "treasuryDaiBalance",
  TreasurySDaiBalance = "treasurySDaiBalance",
  TreasurySDaiInDaiBalance = "treasurySDaiInDaiBalance",
}

export type RequestLoanEvent = {
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  date: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  request: CoolerLoanRequest;
  transactionHash: Scalars["Bytes"]["output"];
};

export type RequestLoanEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RequestLoanEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  date?: InputMaybe<Scalars["String"]["input"]>;
  date_contains?: InputMaybe<Scalars["String"]["input"]>;
  date_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  date_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_gt?: InputMaybe<Scalars["String"]["input"]>;
  date_gte?: InputMaybe<Scalars["String"]["input"]>;
  date_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  date_lt?: InputMaybe<Scalars["String"]["input"]>;
  date_lte?: InputMaybe<Scalars["String"]["input"]>;
  date_not?: InputMaybe<Scalars["String"]["input"]>;
  date_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  date_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  date_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  date_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  date_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  date_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  id_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_gt?: InputMaybe<Scalars["String"]["input"]>;
  id_gte?: InputMaybe<Scalars["String"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_lt?: InputMaybe<Scalars["String"]["input"]>;
  id_lte?: InputMaybe<Scalars["String"]["input"]>;
  id_not?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<RequestLoanEvent_Filter>>>;
  request?: InputMaybe<Scalars["String"]["input"]>;
  request_?: InputMaybe<CoolerLoanRequest_Filter>;
  request_contains?: InputMaybe<Scalars["String"]["input"]>;
  request_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  request_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  request_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  request_gt?: InputMaybe<Scalars["String"]["input"]>;
  request_gte?: InputMaybe<Scalars["String"]["input"]>;
  request_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  request_lt?: InputMaybe<Scalars["String"]["input"]>;
  request_lte?: InputMaybe<Scalars["String"]["input"]>;
  request_not?: InputMaybe<Scalars["String"]["input"]>;
  request_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  request_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  request_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  request_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  request_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  request_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  request_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  request_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  request_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum RequestLoanEvent_OrderBy {
  BlockNumber = "blockNumber",
  BlockTimestamp = "blockTimestamp",
  Date = "date",
  Id = "id",
  Request = "request",
  RequestAmount = "request__amount",
  RequestBorrower = "request__borrower",
  RequestCollateralToken = "request__collateralToken",
  RequestCooler = "request__cooler",
  RequestCreatedBlock = "request__createdBlock",
  RequestCreatedTimestamp = "request__createdTimestamp",
  RequestCreatedTransaction = "request__createdTransaction",
  RequestDebtToken = "request__debtToken",
  RequestDurationSeconds = "request__durationSeconds",
  RequestId = "request__id",
  RequestInterestPercentage = "request__interestPercentage",
  RequestIsRescinded = "request__isRescinded",
  RequestLoanToCollateralRatio = "request__loanToCollateralRatio",
  RequestRequestId = "request__requestId",
  TransactionHash = "transactionHash",
}

export type RescindLoanRequestEvent = {
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  date: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  request: CoolerLoanRequest;
  transactionHash: Scalars["Bytes"]["output"];
};

export type RescindLoanRequestEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RescindLoanRequestEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  date?: InputMaybe<Scalars["String"]["input"]>;
  date_contains?: InputMaybe<Scalars["String"]["input"]>;
  date_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  date_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_gt?: InputMaybe<Scalars["String"]["input"]>;
  date_gte?: InputMaybe<Scalars["String"]["input"]>;
  date_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  date_lt?: InputMaybe<Scalars["String"]["input"]>;
  date_lte?: InputMaybe<Scalars["String"]["input"]>;
  date_not?: InputMaybe<Scalars["String"]["input"]>;
  date_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  date_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  date_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  date_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  date_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  date_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  date_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  id_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_gt?: InputMaybe<Scalars["String"]["input"]>;
  id_gte?: InputMaybe<Scalars["String"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_lt?: InputMaybe<Scalars["String"]["input"]>;
  id_lte?: InputMaybe<Scalars["String"]["input"]>;
  id_not?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<RescindLoanRequestEvent_Filter>>>;
  request?: InputMaybe<Scalars["String"]["input"]>;
  request_?: InputMaybe<CoolerLoanRequest_Filter>;
  request_contains?: InputMaybe<Scalars["String"]["input"]>;
  request_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  request_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  request_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  request_gt?: InputMaybe<Scalars["String"]["input"]>;
  request_gte?: InputMaybe<Scalars["String"]["input"]>;
  request_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  request_lt?: InputMaybe<Scalars["String"]["input"]>;
  request_lte?: InputMaybe<Scalars["String"]["input"]>;
  request_not?: InputMaybe<Scalars["String"]["input"]>;
  request_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  request_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  request_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  request_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  request_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  request_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  request_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  request_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  request_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum RescindLoanRequestEvent_OrderBy {
  BlockNumber = "blockNumber",
  BlockTimestamp = "blockTimestamp",
  Date = "date",
  Id = "id",
  Request = "request",
  RequestAmount = "request__amount",
  RequestBorrower = "request__borrower",
  RequestCollateralToken = "request__collateralToken",
  RequestCooler = "request__cooler",
  RequestCreatedBlock = "request__createdBlock",
  RequestCreatedTimestamp = "request__createdTimestamp",
  RequestCreatedTransaction = "request__createdTransaction",
  RequestDebtToken = "request__debtToken",
  RequestDurationSeconds = "request__durationSeconds",
  RequestId = "request__id",
  RequestInterestPercentage = "request__interestPercentage",
  RequestIsRescinded = "request__isRescinded",
  RequestLoanToCollateralRatio = "request__loanToCollateralRatio",
  RequestRequestId = "request__requestId",
  TransactionHash = "transactionHash",
}

export type Subscription = {
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  claimDefaultedLoanEvent?: Maybe<ClaimDefaultedLoanEvent>;
  claimDefaultedLoanEvents: Array<ClaimDefaultedLoanEvent>;
  clearLoanRequestEvent?: Maybe<ClearLoanRequestEvent>;
  clearLoanRequestEvents: Array<ClearLoanRequestEvent>;
  clearinghouseSnapshot?: Maybe<ClearinghouseSnapshot>;
  clearinghouseSnapshots: Array<ClearinghouseSnapshot>;
  coolerLoan?: Maybe<CoolerLoan>;
  coolerLoanRequest?: Maybe<CoolerLoanRequest>;
  coolerLoanRequests: Array<CoolerLoanRequest>;
  coolerLoans: Array<CoolerLoan>;
  defundEvent?: Maybe<DefundEvent>;
  defundEvents: Array<DefundEvent>;
  extendLoanEvent?: Maybe<ExtendLoanEvent>;
  extendLoanEvents: Array<ExtendLoanEvent>;
  rebalanceEvent?: Maybe<RebalanceEvent>;
  rebalanceEvents: Array<RebalanceEvent>;
  repayLoanEvent?: Maybe<RepayLoanEvent>;
  repayLoanEvents: Array<RepayLoanEvent>;
  requestLoanEvent?: Maybe<RequestLoanEvent>;
  requestLoanEvents: Array<RequestLoanEvent>;
  rescindLoanRequestEvent?: Maybe<RescindLoanRequestEvent>;
  rescindLoanRequestEvents: Array<RescindLoanRequestEvent>;
};

export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type SubscriptionClaimDefaultedLoanEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionClaimDefaultedLoanEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ClaimDefaultedLoanEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ClaimDefaultedLoanEvent_Filter>;
};

export type SubscriptionClearLoanRequestEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionClearLoanRequestEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ClearLoanRequestEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ClearLoanRequestEvent_Filter>;
};

export type SubscriptionClearinghouseSnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionClearinghouseSnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ClearinghouseSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ClearinghouseSnapshot_Filter>;
};

export type SubscriptionCoolerLoanArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionCoolerLoanRequestArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionCoolerLoanRequestsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<CoolerLoanRequest_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CoolerLoanRequest_Filter>;
};

export type SubscriptionCoolerLoansArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<CoolerLoan_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CoolerLoan_Filter>;
};

export type SubscriptionDefundEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionDefundEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<DefundEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DefundEvent_Filter>;
};

export type SubscriptionExtendLoanEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionExtendLoanEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ExtendLoanEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ExtendLoanEvent_Filter>;
};

export type SubscriptionRebalanceEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionRebalanceEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<RebalanceEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RebalanceEvent_Filter>;
};

export type SubscriptionRepayLoanEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionRepayLoanEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<RepayLoanEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RepayLoanEvent_Filter>;
};

export type SubscriptionRequestLoanEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionRequestLoanEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<RequestLoanEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RequestLoanEvent_Filter>;
};

export type SubscriptionRescindLoanRequestEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionRescindLoanRequestEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<RescindLoanRequestEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RescindLoanRequestEvent_Filter>;
};

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars["Bytes"]["output"]>;
  /** The block number */
  number: Scalars["Int"]["output"];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars["Int"]["output"]>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars["String"]["output"];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars["Boolean"]["output"];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = "allow",
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = "deny",
}

export type CoolerLoanEventsQueryVariables = Exact<{
  startTimestamp: Scalars["BigInt"]["input"];
  beforeTimestamp: Scalars["BigInt"]["input"];
}>;

export type CoolerLoanEventsQuery = {
  claimDefaultedLoanEvents: Array<{
    blockNumber: number;
    blockTimestamp: number;
    collateralPrice: number;
    collateralQuantityClaimed: number;
    collateralValueClaimed: number;
    date: string;
    id: string;
    secondsSinceExpiry: number;
    transactionHash: string;
    loan: { id: string };
  }>;
  clearLoanRequestEvents: Array<{
    blockNumber: number;
    blockTimestamp: number;
    date: string;
    id: string;
    transactionHash: string;
    clearinghouseDaiBalance: number;
    clearinghouseSDaiBalance: number;
    clearinghouseSDaiInDaiBalance: number;
    treasuryDaiBalance: number;
    treasurySDaiBalance: number;
    treasurySDaiInDaiBalance: number;
    loan: {
      borrower: string;
      collateral: number;
      collateralToken: string;
      cooler: string;
      createdBlock: number;
      createdTimestamp: number;
      createdTransaction: string;
      debtToken: string;
      expiryTimestamp: number;
      hasCallback: boolean;
      id: string;
      interest: number;
      lender: string;
      loanId: number;
      principal: number;
      request: { interestPercentage: number; durationSeconds: number };
    };
  }>;
  defundEvents: Array<{
    amount: number;
    blockNumber: number;
    blockTimestamp: number;
    clearinghouse: string;
    date: string;
    id: string;
    transactionHash: string;
    clearinghouseSnapshot: {
      blockNumber: number;
      blockTimestamp: number;
      clearinghouse: string;
      daiBalance: number;
      date: string;
      id: string;
      interestReceivables: number;
      isActive: boolean;
      nextRebalanceTimestamp: number;
      principalReceivables: number;
      sDaiBalance: number;
      sDaiInDaiBalance: number;
      treasuryDaiBalance: number;
      treasurySDaiBalance: number;
      treasurySDaiInDaiBalance: number;
      duration: number;
      fundAmount: number;
      fundCadence: number;
      interestRate: number;
      loanToCollateral: number;
      coolerFactoryAddress: string;
      collateralAddress: string;
      debtAddress: string;
    };
  }>;
  extendLoanEvents: Array<{
    blockNumber: number;
    blockTimestamp: number;
    date: string;
    expiryTimestamp: number;
    id: string;
    interestDue: number;
    periods: number;
    transactionHash: string;
    clearinghouseDaiBalance: number;
    clearinghouseSDaiBalance: number;
    clearinghouseSDaiInDaiBalance: number;
    treasuryDaiBalance: number;
    treasurySDaiBalance: number;
    treasurySDaiInDaiBalance: number;
    loan: { id: string };
  }>;
  rebalanceEvents: Array<{
    amount: number;
    blockNumber: number;
    blockTimestamp: number;
    clearinghouse: string;
    date: string;
    id: string;
    transactionHash: string;
    clearinghouseSnapshot: {
      blockNumber: number;
      blockTimestamp: number;
      clearinghouse: string;
      daiBalance: number;
      date: string;
      id: string;
      interestReceivables: number;
      isActive: boolean;
      nextRebalanceTimestamp: number;
      principalReceivables: number;
      sDaiBalance: number;
      sDaiInDaiBalance: number;
      treasuryDaiBalance: number;
      treasurySDaiBalance: number;
      treasurySDaiInDaiBalance: number;
      duration: number;
      fundAmount: number;
      fundCadence: number;
      interestRate: number;
      loanToCollateral: number;
      coolerFactoryAddress: string;
      collateralAddress: string;
      debtAddress: string;
    };
  }>;
  repayLoanEvents: Array<{
    amountPaid: number;
    blockNumber: number;
    blockTimestamp: number;
    collateralDeposited: number;
    date: string;
    id: string;
    interestPayable: number;
    principalPayable: number;
    secondsToExpiry: number;
    transactionHash: string;
    clearinghouseDaiBalance: number;
    clearinghouseSDaiBalance: number;
    clearinghouseSDaiInDaiBalance: number;
    treasuryDaiBalance: number;
    treasurySDaiBalance: number;
    treasurySDaiInDaiBalance: number;
    loan: { id: string };
  }>;
};

export const CoolerLoanEventsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "CoolerLoanEvents" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "startTimestamp" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "BigInt" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "beforeTimestamp" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "BigInt" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "claimDefaultedLoanEvents" },
            arguments: [
              { kind: "Argument", name: { kind: "Name", value: "first" }, value: { kind: "IntValue", value: "1000" } },
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "blockTimestamp_gte" },
                      value: { kind: "Variable", name: { kind: "Name", value: "startTimestamp" } },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "blockTimestamp_lt" },
                      value: { kind: "Variable", name: { kind: "Name", value: "beforeTimestamp" } },
                    },
                  ],
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: { kind: "EnumValue", value: "blockTimestamp" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: { kind: "EnumValue", value: "asc" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "blockNumber" } },
                { kind: "Field", name: { kind: "Name", value: "blockTimestamp" } },
                { kind: "Field", name: { kind: "Name", value: "collateralPrice" } },
                { kind: "Field", name: { kind: "Name", value: "collateralQuantityClaimed" } },
                { kind: "Field", name: { kind: "Name", value: "collateralValueClaimed" } },
                { kind: "Field", name: { kind: "Name", value: "date" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "secondsSinceExpiry" } },
                { kind: "Field", name: { kind: "Name", value: "transactionHash" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "loan" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "clearLoanRequestEvents" },
            arguments: [
              { kind: "Argument", name: { kind: "Name", value: "first" }, value: { kind: "IntValue", value: "1000" } },
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "blockTimestamp_gte" },
                      value: { kind: "Variable", name: { kind: "Name", value: "startTimestamp" } },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "blockTimestamp_lt" },
                      value: { kind: "Variable", name: { kind: "Name", value: "beforeTimestamp" } },
                    },
                  ],
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: { kind: "EnumValue", value: "blockTimestamp" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: { kind: "EnumValue", value: "asc" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "blockNumber" } },
                { kind: "Field", name: { kind: "Name", value: "blockTimestamp" } },
                { kind: "Field", name: { kind: "Name", value: "date" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "transactionHash" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "loan" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "borrower" } },
                      { kind: "Field", name: { kind: "Name", value: "collateral" } },
                      { kind: "Field", name: { kind: "Name", value: "collateralToken" } },
                      { kind: "Field", name: { kind: "Name", value: "cooler" } },
                      { kind: "Field", name: { kind: "Name", value: "createdBlock" } },
                      { kind: "Field", name: { kind: "Name", value: "createdTimestamp" } },
                      { kind: "Field", name: { kind: "Name", value: "createdTransaction" } },
                      { kind: "Field", name: { kind: "Name", value: "debtToken" } },
                      { kind: "Field", name: { kind: "Name", value: "expiryTimestamp" } },
                      { kind: "Field", name: { kind: "Name", value: "hasCallback" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "interest" } },
                      { kind: "Field", name: { kind: "Name", value: "lender" } },
                      { kind: "Field", name: { kind: "Name", value: "loanId" } },
                      { kind: "Field", name: { kind: "Name", value: "principal" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "request" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "interestPercentage" } },
                            { kind: "Field", name: { kind: "Name", value: "durationSeconds" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "clearinghouseDaiBalance" } },
                { kind: "Field", name: { kind: "Name", value: "clearinghouseSDaiBalance" } },
                { kind: "Field", name: { kind: "Name", value: "clearinghouseSDaiInDaiBalance" } },
                { kind: "Field", name: { kind: "Name", value: "treasuryDaiBalance" } },
                { kind: "Field", name: { kind: "Name", value: "treasurySDaiBalance" } },
                { kind: "Field", name: { kind: "Name", value: "treasurySDaiInDaiBalance" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "defundEvents" },
            arguments: [
              { kind: "Argument", name: { kind: "Name", value: "first" }, value: { kind: "IntValue", value: "1000" } },
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "blockTimestamp_gte" },
                      value: { kind: "Variable", name: { kind: "Name", value: "startTimestamp" } },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "blockTimestamp_lt" },
                      value: { kind: "Variable", name: { kind: "Name", value: "beforeTimestamp" } },
                    },
                  ],
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: { kind: "EnumValue", value: "blockTimestamp" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: { kind: "EnumValue", value: "asc" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "amount" } },
                { kind: "Field", name: { kind: "Name", value: "blockNumber" } },
                { kind: "Field", name: { kind: "Name", value: "blockTimestamp" } },
                { kind: "Field", name: { kind: "Name", value: "clearinghouse" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "clearinghouseSnapshot" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "blockNumber" } },
                      { kind: "Field", name: { kind: "Name", value: "blockTimestamp" } },
                      { kind: "Field", name: { kind: "Name", value: "clearinghouse" } },
                      { kind: "Field", name: { kind: "Name", value: "daiBalance" } },
                      { kind: "Field", name: { kind: "Name", value: "date" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "interestReceivables" } },
                      { kind: "Field", name: { kind: "Name", value: "isActive" } },
                      { kind: "Field", name: { kind: "Name", value: "nextRebalanceTimestamp" } },
                      { kind: "Field", name: { kind: "Name", value: "principalReceivables" } },
                      { kind: "Field", name: { kind: "Name", value: "sDaiBalance" } },
                      { kind: "Field", name: { kind: "Name", value: "sDaiInDaiBalance" } },
                      { kind: "Field", name: { kind: "Name", value: "treasuryDaiBalance" } },
                      { kind: "Field", name: { kind: "Name", value: "treasurySDaiBalance" } },
                      { kind: "Field", name: { kind: "Name", value: "treasurySDaiInDaiBalance" } },
                      { kind: "Field", name: { kind: "Name", value: "duration" } },
                      { kind: "Field", name: { kind: "Name", value: "fundAmount" } },
                      { kind: "Field", name: { kind: "Name", value: "fundCadence" } },
                      { kind: "Field", name: { kind: "Name", value: "interestRate" } },
                      { kind: "Field", name: { kind: "Name", value: "loanToCollateral" } },
                      { kind: "Field", name: { kind: "Name", value: "coolerFactoryAddress" } },
                      { kind: "Field", name: { kind: "Name", value: "collateralAddress" } },
                      { kind: "Field", name: { kind: "Name", value: "debtAddress" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "date" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "transactionHash" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "extendLoanEvents" },
            arguments: [
              { kind: "Argument", name: { kind: "Name", value: "first" }, value: { kind: "IntValue", value: "1000" } },
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "blockTimestamp_gte" },
                      value: { kind: "Variable", name: { kind: "Name", value: "startTimestamp" } },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "blockTimestamp_lt" },
                      value: { kind: "Variable", name: { kind: "Name", value: "beforeTimestamp" } },
                    },
                  ],
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: { kind: "EnumValue", value: "blockTimestamp" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: { kind: "EnumValue", value: "asc" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "blockNumber" } },
                { kind: "Field", name: { kind: "Name", value: "blockTimestamp" } },
                { kind: "Field", name: { kind: "Name", value: "date" } },
                { kind: "Field", name: { kind: "Name", value: "expiryTimestamp" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "interestDue" } },
                { kind: "Field", name: { kind: "Name", value: "periods" } },
                { kind: "Field", name: { kind: "Name", value: "transactionHash" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "loan" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "clearinghouseDaiBalance" } },
                { kind: "Field", name: { kind: "Name", value: "clearinghouseSDaiBalance" } },
                { kind: "Field", name: { kind: "Name", value: "clearinghouseSDaiInDaiBalance" } },
                { kind: "Field", name: { kind: "Name", value: "treasuryDaiBalance" } },
                { kind: "Field", name: { kind: "Name", value: "treasurySDaiBalance" } },
                { kind: "Field", name: { kind: "Name", value: "treasurySDaiInDaiBalance" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "rebalanceEvents" },
            arguments: [
              { kind: "Argument", name: { kind: "Name", value: "first" }, value: { kind: "IntValue", value: "1000" } },
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "blockTimestamp_gte" },
                      value: { kind: "Variable", name: { kind: "Name", value: "startTimestamp" } },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "blockTimestamp_lt" },
                      value: { kind: "Variable", name: { kind: "Name", value: "beforeTimestamp" } },
                    },
                  ],
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: { kind: "EnumValue", value: "blockTimestamp" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: { kind: "EnumValue", value: "asc" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "amount" } },
                { kind: "Field", name: { kind: "Name", value: "blockNumber" } },
                { kind: "Field", name: { kind: "Name", value: "blockTimestamp" } },
                { kind: "Field", name: { kind: "Name", value: "clearinghouse" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "clearinghouseSnapshot" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "blockNumber" } },
                      { kind: "Field", name: { kind: "Name", value: "blockTimestamp" } },
                      { kind: "Field", name: { kind: "Name", value: "clearinghouse" } },
                      { kind: "Field", name: { kind: "Name", value: "daiBalance" } },
                      { kind: "Field", name: { kind: "Name", value: "date" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "interestReceivables" } },
                      { kind: "Field", name: { kind: "Name", value: "isActive" } },
                      { kind: "Field", name: { kind: "Name", value: "nextRebalanceTimestamp" } },
                      { kind: "Field", name: { kind: "Name", value: "principalReceivables" } },
                      { kind: "Field", name: { kind: "Name", value: "sDaiBalance" } },
                      { kind: "Field", name: { kind: "Name", value: "sDaiInDaiBalance" } },
                      { kind: "Field", name: { kind: "Name", value: "treasuryDaiBalance" } },
                      { kind: "Field", name: { kind: "Name", value: "treasurySDaiBalance" } },
                      { kind: "Field", name: { kind: "Name", value: "treasurySDaiInDaiBalance" } },
                      { kind: "Field", name: { kind: "Name", value: "duration" } },
                      { kind: "Field", name: { kind: "Name", value: "fundAmount" } },
                      { kind: "Field", name: { kind: "Name", value: "fundCadence" } },
                      { kind: "Field", name: { kind: "Name", value: "interestRate" } },
                      { kind: "Field", name: { kind: "Name", value: "loanToCollateral" } },
                      { kind: "Field", name: { kind: "Name", value: "coolerFactoryAddress" } },
                      { kind: "Field", name: { kind: "Name", value: "collateralAddress" } },
                      { kind: "Field", name: { kind: "Name", value: "debtAddress" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "date" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "transactionHash" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "repayLoanEvents" },
            arguments: [
              { kind: "Argument", name: { kind: "Name", value: "first" }, value: { kind: "IntValue", value: "1000" } },
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "blockTimestamp_gte" },
                      value: { kind: "Variable", name: { kind: "Name", value: "startTimestamp" } },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "blockTimestamp_lt" },
                      value: { kind: "Variable", name: { kind: "Name", value: "beforeTimestamp" } },
                    },
                  ],
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: { kind: "EnumValue", value: "blockTimestamp" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: { kind: "EnumValue", value: "asc" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "amountPaid" } },
                { kind: "Field", name: { kind: "Name", value: "blockNumber" } },
                { kind: "Field", name: { kind: "Name", value: "blockTimestamp" } },
                { kind: "Field", name: { kind: "Name", value: "collateralDeposited" } },
                { kind: "Field", name: { kind: "Name", value: "date" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "interestPayable" } },
                { kind: "Field", name: { kind: "Name", value: "principalPayable" } },
                { kind: "Field", name: { kind: "Name", value: "secondsToExpiry" } },
                { kind: "Field", name: { kind: "Name", value: "transactionHash" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "loan" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "clearinghouseDaiBalance" } },
                { kind: "Field", name: { kind: "Name", value: "clearinghouseSDaiBalance" } },
                { kind: "Field", name: { kind: "Name", value: "clearinghouseSDaiInDaiBalance" } },
                { kind: "Field", name: { kind: "Name", value: "treasuryDaiBalance" } },
                { kind: "Field", name: { kind: "Name", value: "treasurySDaiBalance" } },
                { kind: "Field", name: { kind: "Name", value: "treasurySDaiInDaiBalance" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CoolerLoanEventsQuery, CoolerLoanEventsQueryVariables>;
