// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import AutoPaginationTransform from "@graphprotocol/client-auto-pagination";
import BareMerger from "@graphql-mesh/merger-bare";
import { printWithCache } from '@graphql-mesh/utils';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { CoolerLoansTypes } from './sources/cooler-loans/types';
import * as importedModule$0 from "./sources/cooler-loans/introspectionSchema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
  Int8: any;
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type ClaimDefaultedLoanEvent = {
  id: Scalars['String'];
  date: Scalars['String'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
  collateralQuantityClaimed: Scalars['BigDecimal'];
  collateralPrice: Scalars['BigDecimal'];
  collateralValueClaimed: Scalars['BigDecimal'];
  loan: CoolerLoan;
  secondsSinceExpiry: Scalars['BigInt'];
};

export type ClaimDefaultedLoanEvent_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['String']>;
  date_not?: InputMaybe<Scalars['String']>;
  date_gt?: InputMaybe<Scalars['String']>;
  date_lt?: InputMaybe<Scalars['String']>;
  date_gte?: InputMaybe<Scalars['String']>;
  date_lte?: InputMaybe<Scalars['String']>;
  date_in?: InputMaybe<Array<Scalars['String']>>;
  date_not_in?: InputMaybe<Array<Scalars['String']>>;
  date_contains?: InputMaybe<Scalars['String']>;
  date_contains_nocase?: InputMaybe<Scalars['String']>;
  date_not_contains?: InputMaybe<Scalars['String']>;
  date_not_contains_nocase?: InputMaybe<Scalars['String']>;
  date_starts_with?: InputMaybe<Scalars['String']>;
  date_starts_with_nocase?: InputMaybe<Scalars['String']>;
  date_not_starts_with?: InputMaybe<Scalars['String']>;
  date_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  date_ends_with?: InputMaybe<Scalars['String']>;
  date_ends_with_nocase?: InputMaybe<Scalars['String']>;
  date_not_ends_with?: InputMaybe<Scalars['String']>;
  date_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  collateralQuantityClaimed?: InputMaybe<Scalars['BigDecimal']>;
  collateralQuantityClaimed_not?: InputMaybe<Scalars['BigDecimal']>;
  collateralQuantityClaimed_gt?: InputMaybe<Scalars['BigDecimal']>;
  collateralQuantityClaimed_lt?: InputMaybe<Scalars['BigDecimal']>;
  collateralQuantityClaimed_gte?: InputMaybe<Scalars['BigDecimal']>;
  collateralQuantityClaimed_lte?: InputMaybe<Scalars['BigDecimal']>;
  collateralQuantityClaimed_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  collateralQuantityClaimed_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  collateralPrice?: InputMaybe<Scalars['BigDecimal']>;
  collateralPrice_not?: InputMaybe<Scalars['BigDecimal']>;
  collateralPrice_gt?: InputMaybe<Scalars['BigDecimal']>;
  collateralPrice_lt?: InputMaybe<Scalars['BigDecimal']>;
  collateralPrice_gte?: InputMaybe<Scalars['BigDecimal']>;
  collateralPrice_lte?: InputMaybe<Scalars['BigDecimal']>;
  collateralPrice_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  collateralPrice_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  collateralValueClaimed?: InputMaybe<Scalars['BigDecimal']>;
  collateralValueClaimed_not?: InputMaybe<Scalars['BigDecimal']>;
  collateralValueClaimed_gt?: InputMaybe<Scalars['BigDecimal']>;
  collateralValueClaimed_lt?: InputMaybe<Scalars['BigDecimal']>;
  collateralValueClaimed_gte?: InputMaybe<Scalars['BigDecimal']>;
  collateralValueClaimed_lte?: InputMaybe<Scalars['BigDecimal']>;
  collateralValueClaimed_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  collateralValueClaimed_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  loan?: InputMaybe<Scalars['String']>;
  loan_not?: InputMaybe<Scalars['String']>;
  loan_gt?: InputMaybe<Scalars['String']>;
  loan_lt?: InputMaybe<Scalars['String']>;
  loan_gte?: InputMaybe<Scalars['String']>;
  loan_lte?: InputMaybe<Scalars['String']>;
  loan_in?: InputMaybe<Array<Scalars['String']>>;
  loan_not_in?: InputMaybe<Array<Scalars['String']>>;
  loan_contains?: InputMaybe<Scalars['String']>;
  loan_contains_nocase?: InputMaybe<Scalars['String']>;
  loan_not_contains?: InputMaybe<Scalars['String']>;
  loan_not_contains_nocase?: InputMaybe<Scalars['String']>;
  loan_starts_with?: InputMaybe<Scalars['String']>;
  loan_starts_with_nocase?: InputMaybe<Scalars['String']>;
  loan_not_starts_with?: InputMaybe<Scalars['String']>;
  loan_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  loan_ends_with?: InputMaybe<Scalars['String']>;
  loan_ends_with_nocase?: InputMaybe<Scalars['String']>;
  loan_not_ends_with?: InputMaybe<Scalars['String']>;
  loan_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  loan_?: InputMaybe<CoolerLoan_filter>;
  secondsSinceExpiry?: InputMaybe<Scalars['BigInt']>;
  secondsSinceExpiry_not?: InputMaybe<Scalars['BigInt']>;
  secondsSinceExpiry_gt?: InputMaybe<Scalars['BigInt']>;
  secondsSinceExpiry_lt?: InputMaybe<Scalars['BigInt']>;
  secondsSinceExpiry_gte?: InputMaybe<Scalars['BigInt']>;
  secondsSinceExpiry_lte?: InputMaybe<Scalars['BigInt']>;
  secondsSinceExpiry_in?: InputMaybe<Array<Scalars['BigInt']>>;
  secondsSinceExpiry_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ClaimDefaultedLoanEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ClaimDefaultedLoanEvent_filter>>>;
};

export type ClaimDefaultedLoanEvent_orderBy =
  | 'id'
  | 'date'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash'
  | 'collateralQuantityClaimed'
  | 'collateralPrice'
  | 'collateralValueClaimed'
  | 'loan'
  | 'loan__id'
  | 'loan__createdBlock'
  | 'loan__createdTimestamp'
  | 'loan__createdTransaction'
  | 'loan__cooler'
  | 'loan__loanId'
  | 'loan__borrower'
  | 'loan__lender'
  | 'loan__interest'
  | 'loan__principal'
  | 'loan__collateral'
  | 'loan__expiryTimestamp'
  | 'loan__hasCallback'
  | 'loan__collateralToken'
  | 'loan__debtToken'
  | 'secondsSinceExpiry';

export type ClearLoanRequestEvent = {
  id: Scalars['String'];
  date: Scalars['String'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
  request: CoolerLoanRequest;
  loan: CoolerLoan;
};

export type ClearLoanRequestEvent_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['String']>;
  date_not?: InputMaybe<Scalars['String']>;
  date_gt?: InputMaybe<Scalars['String']>;
  date_lt?: InputMaybe<Scalars['String']>;
  date_gte?: InputMaybe<Scalars['String']>;
  date_lte?: InputMaybe<Scalars['String']>;
  date_in?: InputMaybe<Array<Scalars['String']>>;
  date_not_in?: InputMaybe<Array<Scalars['String']>>;
  date_contains?: InputMaybe<Scalars['String']>;
  date_contains_nocase?: InputMaybe<Scalars['String']>;
  date_not_contains?: InputMaybe<Scalars['String']>;
  date_not_contains_nocase?: InputMaybe<Scalars['String']>;
  date_starts_with?: InputMaybe<Scalars['String']>;
  date_starts_with_nocase?: InputMaybe<Scalars['String']>;
  date_not_starts_with?: InputMaybe<Scalars['String']>;
  date_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  date_ends_with?: InputMaybe<Scalars['String']>;
  date_ends_with_nocase?: InputMaybe<Scalars['String']>;
  date_not_ends_with?: InputMaybe<Scalars['String']>;
  date_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  request?: InputMaybe<Scalars['String']>;
  request_not?: InputMaybe<Scalars['String']>;
  request_gt?: InputMaybe<Scalars['String']>;
  request_lt?: InputMaybe<Scalars['String']>;
  request_gte?: InputMaybe<Scalars['String']>;
  request_lte?: InputMaybe<Scalars['String']>;
  request_in?: InputMaybe<Array<Scalars['String']>>;
  request_not_in?: InputMaybe<Array<Scalars['String']>>;
  request_contains?: InputMaybe<Scalars['String']>;
  request_contains_nocase?: InputMaybe<Scalars['String']>;
  request_not_contains?: InputMaybe<Scalars['String']>;
  request_not_contains_nocase?: InputMaybe<Scalars['String']>;
  request_starts_with?: InputMaybe<Scalars['String']>;
  request_starts_with_nocase?: InputMaybe<Scalars['String']>;
  request_not_starts_with?: InputMaybe<Scalars['String']>;
  request_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  request_ends_with?: InputMaybe<Scalars['String']>;
  request_ends_with_nocase?: InputMaybe<Scalars['String']>;
  request_not_ends_with?: InputMaybe<Scalars['String']>;
  request_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  request_?: InputMaybe<CoolerLoanRequest_filter>;
  loan?: InputMaybe<Scalars['String']>;
  loan_not?: InputMaybe<Scalars['String']>;
  loan_gt?: InputMaybe<Scalars['String']>;
  loan_lt?: InputMaybe<Scalars['String']>;
  loan_gte?: InputMaybe<Scalars['String']>;
  loan_lte?: InputMaybe<Scalars['String']>;
  loan_in?: InputMaybe<Array<Scalars['String']>>;
  loan_not_in?: InputMaybe<Array<Scalars['String']>>;
  loan_contains?: InputMaybe<Scalars['String']>;
  loan_contains_nocase?: InputMaybe<Scalars['String']>;
  loan_not_contains?: InputMaybe<Scalars['String']>;
  loan_not_contains_nocase?: InputMaybe<Scalars['String']>;
  loan_starts_with?: InputMaybe<Scalars['String']>;
  loan_starts_with_nocase?: InputMaybe<Scalars['String']>;
  loan_not_starts_with?: InputMaybe<Scalars['String']>;
  loan_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  loan_ends_with?: InputMaybe<Scalars['String']>;
  loan_ends_with_nocase?: InputMaybe<Scalars['String']>;
  loan_not_ends_with?: InputMaybe<Scalars['String']>;
  loan_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  loan_?: InputMaybe<CoolerLoan_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ClearLoanRequestEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ClearLoanRequestEvent_filter>>>;
};

export type ClearLoanRequestEvent_orderBy =
  | 'id'
  | 'date'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash'
  | 'request'
  | 'request__id'
  | 'request__createdBlock'
  | 'request__createdTimestamp'
  | 'request__createdTransaction'
  | 'request__cooler'
  | 'request__requestId'
  | 'request__borrower'
  | 'request__collateralToken'
  | 'request__debtToken'
  | 'request__amount'
  | 'request__interestPercentage'
  | 'request__loanToCollateralRatio'
  | 'request__durationSeconds'
  | 'request__isRescinded'
  | 'loan'
  | 'loan__id'
  | 'loan__createdBlock'
  | 'loan__createdTimestamp'
  | 'loan__createdTransaction'
  | 'loan__cooler'
  | 'loan__loanId'
  | 'loan__borrower'
  | 'loan__lender'
  | 'loan__interest'
  | 'loan__principal'
  | 'loan__collateral'
  | 'loan__expiryTimestamp'
  | 'loan__hasCallback'
  | 'loan__collateralToken'
  | 'loan__debtToken';

export type ClearinghouseSnapshot = {
  id: Scalars['String'];
  date: Scalars['String'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  clearinghouse: Scalars['Bytes'];
  isActive: Scalars['Boolean'];
  nextRebalanceTimestamp: Scalars['BigInt'];
  interestReceivables: Scalars['BigDecimal'];
  principalReceivables: Scalars['BigDecimal'];
  daiBalance: Scalars['BigDecimal'];
  sDaiBalance: Scalars['BigDecimal'];
  sDaiInDaiBalance: Scalars['BigDecimal'];
  treasuryDaiBalance: Scalars['BigDecimal'];
  treasurySDaiBalance: Scalars['BigDecimal'];
  treasurySDaiInDaiBalance: Scalars['BigDecimal'];
  rebalanceEvents: Array<RebalanceEvent>;
  defundEvents: Array<DefundEvent>;
};


export type ClearinghouseSnapshotrebalanceEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RebalanceEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RebalanceEvent_filter>;
};


export type ClearinghouseSnapshotdefundEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DefundEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DefundEvent_filter>;
};

export type ClearinghouseSnapshot_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['String']>;
  date_not?: InputMaybe<Scalars['String']>;
  date_gt?: InputMaybe<Scalars['String']>;
  date_lt?: InputMaybe<Scalars['String']>;
  date_gte?: InputMaybe<Scalars['String']>;
  date_lte?: InputMaybe<Scalars['String']>;
  date_in?: InputMaybe<Array<Scalars['String']>>;
  date_not_in?: InputMaybe<Array<Scalars['String']>>;
  date_contains?: InputMaybe<Scalars['String']>;
  date_contains_nocase?: InputMaybe<Scalars['String']>;
  date_not_contains?: InputMaybe<Scalars['String']>;
  date_not_contains_nocase?: InputMaybe<Scalars['String']>;
  date_starts_with?: InputMaybe<Scalars['String']>;
  date_starts_with_nocase?: InputMaybe<Scalars['String']>;
  date_not_starts_with?: InputMaybe<Scalars['String']>;
  date_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  date_ends_with?: InputMaybe<Scalars['String']>;
  date_ends_with_nocase?: InputMaybe<Scalars['String']>;
  date_not_ends_with?: InputMaybe<Scalars['String']>;
  date_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  clearinghouse?: InputMaybe<Scalars['Bytes']>;
  clearinghouse_not?: InputMaybe<Scalars['Bytes']>;
  clearinghouse_gt?: InputMaybe<Scalars['Bytes']>;
  clearinghouse_lt?: InputMaybe<Scalars['Bytes']>;
  clearinghouse_gte?: InputMaybe<Scalars['Bytes']>;
  clearinghouse_lte?: InputMaybe<Scalars['Bytes']>;
  clearinghouse_in?: InputMaybe<Array<Scalars['Bytes']>>;
  clearinghouse_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  clearinghouse_contains?: InputMaybe<Scalars['Bytes']>;
  clearinghouse_not_contains?: InputMaybe<Scalars['Bytes']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  isActive_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isActive_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  nextRebalanceTimestamp?: InputMaybe<Scalars['BigInt']>;
  nextRebalanceTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  nextRebalanceTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  nextRebalanceTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  nextRebalanceTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  nextRebalanceTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  nextRebalanceTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nextRebalanceTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  interestReceivables?: InputMaybe<Scalars['BigDecimal']>;
  interestReceivables_not?: InputMaybe<Scalars['BigDecimal']>;
  interestReceivables_gt?: InputMaybe<Scalars['BigDecimal']>;
  interestReceivables_lt?: InputMaybe<Scalars['BigDecimal']>;
  interestReceivables_gte?: InputMaybe<Scalars['BigDecimal']>;
  interestReceivables_lte?: InputMaybe<Scalars['BigDecimal']>;
  interestReceivables_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  interestReceivables_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  principalReceivables?: InputMaybe<Scalars['BigDecimal']>;
  principalReceivables_not?: InputMaybe<Scalars['BigDecimal']>;
  principalReceivables_gt?: InputMaybe<Scalars['BigDecimal']>;
  principalReceivables_lt?: InputMaybe<Scalars['BigDecimal']>;
  principalReceivables_gte?: InputMaybe<Scalars['BigDecimal']>;
  principalReceivables_lte?: InputMaybe<Scalars['BigDecimal']>;
  principalReceivables_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  principalReceivables_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  daiBalance?: InputMaybe<Scalars['BigDecimal']>;
  daiBalance_not?: InputMaybe<Scalars['BigDecimal']>;
  daiBalance_gt?: InputMaybe<Scalars['BigDecimal']>;
  daiBalance_lt?: InputMaybe<Scalars['BigDecimal']>;
  daiBalance_gte?: InputMaybe<Scalars['BigDecimal']>;
  daiBalance_lte?: InputMaybe<Scalars['BigDecimal']>;
  daiBalance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  daiBalance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  sDaiBalance?: InputMaybe<Scalars['BigDecimal']>;
  sDaiBalance_not?: InputMaybe<Scalars['BigDecimal']>;
  sDaiBalance_gt?: InputMaybe<Scalars['BigDecimal']>;
  sDaiBalance_lt?: InputMaybe<Scalars['BigDecimal']>;
  sDaiBalance_gte?: InputMaybe<Scalars['BigDecimal']>;
  sDaiBalance_lte?: InputMaybe<Scalars['BigDecimal']>;
  sDaiBalance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  sDaiBalance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  sDaiInDaiBalance?: InputMaybe<Scalars['BigDecimal']>;
  sDaiInDaiBalance_not?: InputMaybe<Scalars['BigDecimal']>;
  sDaiInDaiBalance_gt?: InputMaybe<Scalars['BigDecimal']>;
  sDaiInDaiBalance_lt?: InputMaybe<Scalars['BigDecimal']>;
  sDaiInDaiBalance_gte?: InputMaybe<Scalars['BigDecimal']>;
  sDaiInDaiBalance_lte?: InputMaybe<Scalars['BigDecimal']>;
  sDaiInDaiBalance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  sDaiInDaiBalance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  treasuryDaiBalance?: InputMaybe<Scalars['BigDecimal']>;
  treasuryDaiBalance_not?: InputMaybe<Scalars['BigDecimal']>;
  treasuryDaiBalance_gt?: InputMaybe<Scalars['BigDecimal']>;
  treasuryDaiBalance_lt?: InputMaybe<Scalars['BigDecimal']>;
  treasuryDaiBalance_gte?: InputMaybe<Scalars['BigDecimal']>;
  treasuryDaiBalance_lte?: InputMaybe<Scalars['BigDecimal']>;
  treasuryDaiBalance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  treasuryDaiBalance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  treasurySDaiBalance?: InputMaybe<Scalars['BigDecimal']>;
  treasurySDaiBalance_not?: InputMaybe<Scalars['BigDecimal']>;
  treasurySDaiBalance_gt?: InputMaybe<Scalars['BigDecimal']>;
  treasurySDaiBalance_lt?: InputMaybe<Scalars['BigDecimal']>;
  treasurySDaiBalance_gte?: InputMaybe<Scalars['BigDecimal']>;
  treasurySDaiBalance_lte?: InputMaybe<Scalars['BigDecimal']>;
  treasurySDaiBalance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  treasurySDaiBalance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  treasurySDaiInDaiBalance?: InputMaybe<Scalars['BigDecimal']>;
  treasurySDaiInDaiBalance_not?: InputMaybe<Scalars['BigDecimal']>;
  treasurySDaiInDaiBalance_gt?: InputMaybe<Scalars['BigDecimal']>;
  treasurySDaiInDaiBalance_lt?: InputMaybe<Scalars['BigDecimal']>;
  treasurySDaiInDaiBalance_gte?: InputMaybe<Scalars['BigDecimal']>;
  treasurySDaiInDaiBalance_lte?: InputMaybe<Scalars['BigDecimal']>;
  treasurySDaiInDaiBalance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  treasurySDaiInDaiBalance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  rebalanceEvents_?: InputMaybe<RebalanceEvent_filter>;
  defundEvents_?: InputMaybe<DefundEvent_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ClearinghouseSnapshot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ClearinghouseSnapshot_filter>>>;
};

export type ClearinghouseSnapshot_orderBy =
  | 'id'
  | 'date'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'clearinghouse'
  | 'isActive'
  | 'nextRebalanceTimestamp'
  | 'interestReceivables'
  | 'principalReceivables'
  | 'daiBalance'
  | 'sDaiBalance'
  | 'sDaiInDaiBalance'
  | 'treasuryDaiBalance'
  | 'treasurySDaiBalance'
  | 'treasurySDaiInDaiBalance'
  | 'rebalanceEvents'
  | 'defundEvents';

export type CoolerLoan = {
  id: Scalars['String'];
  createdBlock: Scalars['BigInt'];
  createdTimestamp: Scalars['BigInt'];
  createdTransaction: Scalars['Bytes'];
  cooler: Scalars['Bytes'];
  request: CoolerLoanRequest;
  loanId: Scalars['BigInt'];
  borrower: Scalars['Bytes'];
  lender: Scalars['Bytes'];
  interest: Scalars['BigDecimal'];
  principal: Scalars['BigDecimal'];
  collateral: Scalars['BigDecimal'];
  expiryTimestamp: Scalars['BigInt'];
  hasCallback: Scalars['Boolean'];
  collateralToken: Scalars['Bytes'];
  debtToken: Scalars['Bytes'];
  creationEvents: Array<ClearLoanRequestEvent>;
  defaultedClaimEvents: Array<ClaimDefaultedLoanEvent>;
  repaymentEvents: Array<RepayLoanEvent>;
  extendEvents: Array<ExtendLoanEvent>;
};


export type CoolerLoancreationEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ClearLoanRequestEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ClearLoanRequestEvent_filter>;
};


export type CoolerLoandefaultedClaimEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ClaimDefaultedLoanEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ClaimDefaultedLoanEvent_filter>;
};


export type CoolerLoanrepaymentEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RepayLoanEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RepayLoanEvent_filter>;
};


export type CoolerLoanextendEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ExtendLoanEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ExtendLoanEvent_filter>;
};

export type CoolerLoanRequest = {
  id: Scalars['String'];
  createdBlock: Scalars['BigInt'];
  createdTimestamp: Scalars['BigInt'];
  createdTransaction: Scalars['Bytes'];
  cooler: Scalars['Bytes'];
  requestId: Scalars['BigInt'];
  borrower: Scalars['Bytes'];
  collateralToken: Scalars['Bytes'];
  debtToken: Scalars['Bytes'];
  amount: Scalars['BigDecimal'];
  interestPercentage: Scalars['BigDecimal'];
  loanToCollateralRatio: Scalars['BigDecimal'];
  durationSeconds: Scalars['BigInt'];
  isRescinded: Scalars['Boolean'];
  requestEvents: Array<RequestLoanEvent>;
  rescindEvents: Array<RescindLoanRequestEvent>;
  clearEvents: Array<ClearLoanRequestEvent>;
  loans: Array<CoolerLoan>;
};


export type CoolerLoanRequestrequestEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RequestLoanEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RequestLoanEvent_filter>;
};


export type CoolerLoanRequestrescindEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RescindLoanRequestEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RescindLoanRequestEvent_filter>;
};


export type CoolerLoanRequestclearEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ClearLoanRequestEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ClearLoanRequestEvent_filter>;
};


export type CoolerLoanRequestloansArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CoolerLoan_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CoolerLoan_filter>;
};

export type CoolerLoanRequest_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  createdBlock?: InputMaybe<Scalars['BigInt']>;
  createdBlock_not?: InputMaybe<Scalars['BigInt']>;
  createdBlock_gt?: InputMaybe<Scalars['BigInt']>;
  createdBlock_lt?: InputMaybe<Scalars['BigInt']>;
  createdBlock_gte?: InputMaybe<Scalars['BigInt']>;
  createdBlock_lte?: InputMaybe<Scalars['BigInt']>;
  createdBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdTimestamp?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdTransaction?: InputMaybe<Scalars['Bytes']>;
  createdTransaction_not?: InputMaybe<Scalars['Bytes']>;
  createdTransaction_gt?: InputMaybe<Scalars['Bytes']>;
  createdTransaction_lt?: InputMaybe<Scalars['Bytes']>;
  createdTransaction_gte?: InputMaybe<Scalars['Bytes']>;
  createdTransaction_lte?: InputMaybe<Scalars['Bytes']>;
  createdTransaction_in?: InputMaybe<Array<Scalars['Bytes']>>;
  createdTransaction_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  createdTransaction_contains?: InputMaybe<Scalars['Bytes']>;
  createdTransaction_not_contains?: InputMaybe<Scalars['Bytes']>;
  cooler?: InputMaybe<Scalars['Bytes']>;
  cooler_not?: InputMaybe<Scalars['Bytes']>;
  cooler_gt?: InputMaybe<Scalars['Bytes']>;
  cooler_lt?: InputMaybe<Scalars['Bytes']>;
  cooler_gte?: InputMaybe<Scalars['Bytes']>;
  cooler_lte?: InputMaybe<Scalars['Bytes']>;
  cooler_in?: InputMaybe<Array<Scalars['Bytes']>>;
  cooler_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  cooler_contains?: InputMaybe<Scalars['Bytes']>;
  cooler_not_contains?: InputMaybe<Scalars['Bytes']>;
  requestId?: InputMaybe<Scalars['BigInt']>;
  requestId_not?: InputMaybe<Scalars['BigInt']>;
  requestId_gt?: InputMaybe<Scalars['BigInt']>;
  requestId_lt?: InputMaybe<Scalars['BigInt']>;
  requestId_gte?: InputMaybe<Scalars['BigInt']>;
  requestId_lte?: InputMaybe<Scalars['BigInt']>;
  requestId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  requestId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  borrower?: InputMaybe<Scalars['Bytes']>;
  borrower_not?: InputMaybe<Scalars['Bytes']>;
  borrower_gt?: InputMaybe<Scalars['Bytes']>;
  borrower_lt?: InputMaybe<Scalars['Bytes']>;
  borrower_gte?: InputMaybe<Scalars['Bytes']>;
  borrower_lte?: InputMaybe<Scalars['Bytes']>;
  borrower_in?: InputMaybe<Array<Scalars['Bytes']>>;
  borrower_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  borrower_contains?: InputMaybe<Scalars['Bytes']>;
  borrower_not_contains?: InputMaybe<Scalars['Bytes']>;
  collateralToken?: InputMaybe<Scalars['Bytes']>;
  collateralToken_not?: InputMaybe<Scalars['Bytes']>;
  collateralToken_gt?: InputMaybe<Scalars['Bytes']>;
  collateralToken_lt?: InputMaybe<Scalars['Bytes']>;
  collateralToken_gte?: InputMaybe<Scalars['Bytes']>;
  collateralToken_lte?: InputMaybe<Scalars['Bytes']>;
  collateralToken_in?: InputMaybe<Array<Scalars['Bytes']>>;
  collateralToken_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  collateralToken_contains?: InputMaybe<Scalars['Bytes']>;
  collateralToken_not_contains?: InputMaybe<Scalars['Bytes']>;
  debtToken?: InputMaybe<Scalars['Bytes']>;
  debtToken_not?: InputMaybe<Scalars['Bytes']>;
  debtToken_gt?: InputMaybe<Scalars['Bytes']>;
  debtToken_lt?: InputMaybe<Scalars['Bytes']>;
  debtToken_gte?: InputMaybe<Scalars['Bytes']>;
  debtToken_lte?: InputMaybe<Scalars['Bytes']>;
  debtToken_in?: InputMaybe<Array<Scalars['Bytes']>>;
  debtToken_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  debtToken_contains?: InputMaybe<Scalars['Bytes']>;
  debtToken_not_contains?: InputMaybe<Scalars['Bytes']>;
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  interestPercentage?: InputMaybe<Scalars['BigDecimal']>;
  interestPercentage_not?: InputMaybe<Scalars['BigDecimal']>;
  interestPercentage_gt?: InputMaybe<Scalars['BigDecimal']>;
  interestPercentage_lt?: InputMaybe<Scalars['BigDecimal']>;
  interestPercentage_gte?: InputMaybe<Scalars['BigDecimal']>;
  interestPercentage_lte?: InputMaybe<Scalars['BigDecimal']>;
  interestPercentage_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  interestPercentage_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  loanToCollateralRatio?: InputMaybe<Scalars['BigDecimal']>;
  loanToCollateralRatio_not?: InputMaybe<Scalars['BigDecimal']>;
  loanToCollateralRatio_gt?: InputMaybe<Scalars['BigDecimal']>;
  loanToCollateralRatio_lt?: InputMaybe<Scalars['BigDecimal']>;
  loanToCollateralRatio_gte?: InputMaybe<Scalars['BigDecimal']>;
  loanToCollateralRatio_lte?: InputMaybe<Scalars['BigDecimal']>;
  loanToCollateralRatio_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  loanToCollateralRatio_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  durationSeconds?: InputMaybe<Scalars['BigInt']>;
  durationSeconds_not?: InputMaybe<Scalars['BigInt']>;
  durationSeconds_gt?: InputMaybe<Scalars['BigInt']>;
  durationSeconds_lt?: InputMaybe<Scalars['BigInt']>;
  durationSeconds_gte?: InputMaybe<Scalars['BigInt']>;
  durationSeconds_lte?: InputMaybe<Scalars['BigInt']>;
  durationSeconds_in?: InputMaybe<Array<Scalars['BigInt']>>;
  durationSeconds_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  isRescinded?: InputMaybe<Scalars['Boolean']>;
  isRescinded_not?: InputMaybe<Scalars['Boolean']>;
  isRescinded_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isRescinded_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  requestEvents_?: InputMaybe<RequestLoanEvent_filter>;
  rescindEvents_?: InputMaybe<RescindLoanRequestEvent_filter>;
  clearEvents_?: InputMaybe<ClearLoanRequestEvent_filter>;
  loans_?: InputMaybe<CoolerLoan_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CoolerLoanRequest_filter>>>;
  or?: InputMaybe<Array<InputMaybe<CoolerLoanRequest_filter>>>;
};

export type CoolerLoanRequest_orderBy =
  | 'id'
  | 'createdBlock'
  | 'createdTimestamp'
  | 'createdTransaction'
  | 'cooler'
  | 'requestId'
  | 'borrower'
  | 'collateralToken'
  | 'debtToken'
  | 'amount'
  | 'interestPercentage'
  | 'loanToCollateralRatio'
  | 'durationSeconds'
  | 'isRescinded'
  | 'requestEvents'
  | 'rescindEvents'
  | 'clearEvents'
  | 'loans';

export type CoolerLoan_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  createdBlock?: InputMaybe<Scalars['BigInt']>;
  createdBlock_not?: InputMaybe<Scalars['BigInt']>;
  createdBlock_gt?: InputMaybe<Scalars['BigInt']>;
  createdBlock_lt?: InputMaybe<Scalars['BigInt']>;
  createdBlock_gte?: InputMaybe<Scalars['BigInt']>;
  createdBlock_lte?: InputMaybe<Scalars['BigInt']>;
  createdBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdTimestamp?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdTransaction?: InputMaybe<Scalars['Bytes']>;
  createdTransaction_not?: InputMaybe<Scalars['Bytes']>;
  createdTransaction_gt?: InputMaybe<Scalars['Bytes']>;
  createdTransaction_lt?: InputMaybe<Scalars['Bytes']>;
  createdTransaction_gte?: InputMaybe<Scalars['Bytes']>;
  createdTransaction_lte?: InputMaybe<Scalars['Bytes']>;
  createdTransaction_in?: InputMaybe<Array<Scalars['Bytes']>>;
  createdTransaction_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  createdTransaction_contains?: InputMaybe<Scalars['Bytes']>;
  createdTransaction_not_contains?: InputMaybe<Scalars['Bytes']>;
  cooler?: InputMaybe<Scalars['Bytes']>;
  cooler_not?: InputMaybe<Scalars['Bytes']>;
  cooler_gt?: InputMaybe<Scalars['Bytes']>;
  cooler_lt?: InputMaybe<Scalars['Bytes']>;
  cooler_gte?: InputMaybe<Scalars['Bytes']>;
  cooler_lte?: InputMaybe<Scalars['Bytes']>;
  cooler_in?: InputMaybe<Array<Scalars['Bytes']>>;
  cooler_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  cooler_contains?: InputMaybe<Scalars['Bytes']>;
  cooler_not_contains?: InputMaybe<Scalars['Bytes']>;
  request?: InputMaybe<Scalars['String']>;
  request_not?: InputMaybe<Scalars['String']>;
  request_gt?: InputMaybe<Scalars['String']>;
  request_lt?: InputMaybe<Scalars['String']>;
  request_gte?: InputMaybe<Scalars['String']>;
  request_lte?: InputMaybe<Scalars['String']>;
  request_in?: InputMaybe<Array<Scalars['String']>>;
  request_not_in?: InputMaybe<Array<Scalars['String']>>;
  request_contains?: InputMaybe<Scalars['String']>;
  request_contains_nocase?: InputMaybe<Scalars['String']>;
  request_not_contains?: InputMaybe<Scalars['String']>;
  request_not_contains_nocase?: InputMaybe<Scalars['String']>;
  request_starts_with?: InputMaybe<Scalars['String']>;
  request_starts_with_nocase?: InputMaybe<Scalars['String']>;
  request_not_starts_with?: InputMaybe<Scalars['String']>;
  request_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  request_ends_with?: InputMaybe<Scalars['String']>;
  request_ends_with_nocase?: InputMaybe<Scalars['String']>;
  request_not_ends_with?: InputMaybe<Scalars['String']>;
  request_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  request_?: InputMaybe<CoolerLoanRequest_filter>;
  loanId?: InputMaybe<Scalars['BigInt']>;
  loanId_not?: InputMaybe<Scalars['BigInt']>;
  loanId_gt?: InputMaybe<Scalars['BigInt']>;
  loanId_lt?: InputMaybe<Scalars['BigInt']>;
  loanId_gte?: InputMaybe<Scalars['BigInt']>;
  loanId_lte?: InputMaybe<Scalars['BigInt']>;
  loanId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  loanId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  borrower?: InputMaybe<Scalars['Bytes']>;
  borrower_not?: InputMaybe<Scalars['Bytes']>;
  borrower_gt?: InputMaybe<Scalars['Bytes']>;
  borrower_lt?: InputMaybe<Scalars['Bytes']>;
  borrower_gte?: InputMaybe<Scalars['Bytes']>;
  borrower_lte?: InputMaybe<Scalars['Bytes']>;
  borrower_in?: InputMaybe<Array<Scalars['Bytes']>>;
  borrower_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  borrower_contains?: InputMaybe<Scalars['Bytes']>;
  borrower_not_contains?: InputMaybe<Scalars['Bytes']>;
  lender?: InputMaybe<Scalars['Bytes']>;
  lender_not?: InputMaybe<Scalars['Bytes']>;
  lender_gt?: InputMaybe<Scalars['Bytes']>;
  lender_lt?: InputMaybe<Scalars['Bytes']>;
  lender_gte?: InputMaybe<Scalars['Bytes']>;
  lender_lte?: InputMaybe<Scalars['Bytes']>;
  lender_in?: InputMaybe<Array<Scalars['Bytes']>>;
  lender_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  lender_contains?: InputMaybe<Scalars['Bytes']>;
  lender_not_contains?: InputMaybe<Scalars['Bytes']>;
  interest?: InputMaybe<Scalars['BigDecimal']>;
  interest_not?: InputMaybe<Scalars['BigDecimal']>;
  interest_gt?: InputMaybe<Scalars['BigDecimal']>;
  interest_lt?: InputMaybe<Scalars['BigDecimal']>;
  interest_gte?: InputMaybe<Scalars['BigDecimal']>;
  interest_lte?: InputMaybe<Scalars['BigDecimal']>;
  interest_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  interest_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  principal?: InputMaybe<Scalars['BigDecimal']>;
  principal_not?: InputMaybe<Scalars['BigDecimal']>;
  principal_gt?: InputMaybe<Scalars['BigDecimal']>;
  principal_lt?: InputMaybe<Scalars['BigDecimal']>;
  principal_gte?: InputMaybe<Scalars['BigDecimal']>;
  principal_lte?: InputMaybe<Scalars['BigDecimal']>;
  principal_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  principal_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  collateral?: InputMaybe<Scalars['BigDecimal']>;
  collateral_not?: InputMaybe<Scalars['BigDecimal']>;
  collateral_gt?: InputMaybe<Scalars['BigDecimal']>;
  collateral_lt?: InputMaybe<Scalars['BigDecimal']>;
  collateral_gte?: InputMaybe<Scalars['BigDecimal']>;
  collateral_lte?: InputMaybe<Scalars['BigDecimal']>;
  collateral_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  collateral_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  expiryTimestamp?: InputMaybe<Scalars['BigInt']>;
  expiryTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  expiryTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  expiryTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  expiryTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  expiryTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  expiryTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expiryTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  hasCallback?: InputMaybe<Scalars['Boolean']>;
  hasCallback_not?: InputMaybe<Scalars['Boolean']>;
  hasCallback_in?: InputMaybe<Array<Scalars['Boolean']>>;
  hasCallback_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  collateralToken?: InputMaybe<Scalars['Bytes']>;
  collateralToken_not?: InputMaybe<Scalars['Bytes']>;
  collateralToken_gt?: InputMaybe<Scalars['Bytes']>;
  collateralToken_lt?: InputMaybe<Scalars['Bytes']>;
  collateralToken_gte?: InputMaybe<Scalars['Bytes']>;
  collateralToken_lte?: InputMaybe<Scalars['Bytes']>;
  collateralToken_in?: InputMaybe<Array<Scalars['Bytes']>>;
  collateralToken_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  collateralToken_contains?: InputMaybe<Scalars['Bytes']>;
  collateralToken_not_contains?: InputMaybe<Scalars['Bytes']>;
  debtToken?: InputMaybe<Scalars['Bytes']>;
  debtToken_not?: InputMaybe<Scalars['Bytes']>;
  debtToken_gt?: InputMaybe<Scalars['Bytes']>;
  debtToken_lt?: InputMaybe<Scalars['Bytes']>;
  debtToken_gte?: InputMaybe<Scalars['Bytes']>;
  debtToken_lte?: InputMaybe<Scalars['Bytes']>;
  debtToken_in?: InputMaybe<Array<Scalars['Bytes']>>;
  debtToken_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  debtToken_contains?: InputMaybe<Scalars['Bytes']>;
  debtToken_not_contains?: InputMaybe<Scalars['Bytes']>;
  creationEvents_?: InputMaybe<ClearLoanRequestEvent_filter>;
  defaultedClaimEvents_?: InputMaybe<ClaimDefaultedLoanEvent_filter>;
  repaymentEvents_?: InputMaybe<RepayLoanEvent_filter>;
  extendEvents_?: InputMaybe<ExtendLoanEvent_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CoolerLoan_filter>>>;
  or?: InputMaybe<Array<InputMaybe<CoolerLoan_filter>>>;
};

export type CoolerLoan_orderBy =
  | 'id'
  | 'createdBlock'
  | 'createdTimestamp'
  | 'createdTransaction'
  | 'cooler'
  | 'request'
  | 'request__id'
  | 'request__createdBlock'
  | 'request__createdTimestamp'
  | 'request__createdTransaction'
  | 'request__cooler'
  | 'request__requestId'
  | 'request__borrower'
  | 'request__collateralToken'
  | 'request__debtToken'
  | 'request__amount'
  | 'request__interestPercentage'
  | 'request__loanToCollateralRatio'
  | 'request__durationSeconds'
  | 'request__isRescinded'
  | 'loanId'
  | 'borrower'
  | 'lender'
  | 'interest'
  | 'principal'
  | 'collateral'
  | 'expiryTimestamp'
  | 'hasCallback'
  | 'collateralToken'
  | 'debtToken'
  | 'creationEvents'
  | 'defaultedClaimEvents'
  | 'repaymentEvents'
  | 'extendEvents';

export type DefundEvent = {
  id: Scalars['String'];
  date: Scalars['String'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
  clearinghouse: Scalars['Bytes'];
  clearinghouseSnapshot: ClearinghouseSnapshot;
  amount: Scalars['BigDecimal'];
};

export type DefundEvent_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['String']>;
  date_not?: InputMaybe<Scalars['String']>;
  date_gt?: InputMaybe<Scalars['String']>;
  date_lt?: InputMaybe<Scalars['String']>;
  date_gte?: InputMaybe<Scalars['String']>;
  date_lte?: InputMaybe<Scalars['String']>;
  date_in?: InputMaybe<Array<Scalars['String']>>;
  date_not_in?: InputMaybe<Array<Scalars['String']>>;
  date_contains?: InputMaybe<Scalars['String']>;
  date_contains_nocase?: InputMaybe<Scalars['String']>;
  date_not_contains?: InputMaybe<Scalars['String']>;
  date_not_contains_nocase?: InputMaybe<Scalars['String']>;
  date_starts_with?: InputMaybe<Scalars['String']>;
  date_starts_with_nocase?: InputMaybe<Scalars['String']>;
  date_not_starts_with?: InputMaybe<Scalars['String']>;
  date_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  date_ends_with?: InputMaybe<Scalars['String']>;
  date_ends_with_nocase?: InputMaybe<Scalars['String']>;
  date_not_ends_with?: InputMaybe<Scalars['String']>;
  date_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  clearinghouse?: InputMaybe<Scalars['Bytes']>;
  clearinghouse_not?: InputMaybe<Scalars['Bytes']>;
  clearinghouse_gt?: InputMaybe<Scalars['Bytes']>;
  clearinghouse_lt?: InputMaybe<Scalars['Bytes']>;
  clearinghouse_gte?: InputMaybe<Scalars['Bytes']>;
  clearinghouse_lte?: InputMaybe<Scalars['Bytes']>;
  clearinghouse_in?: InputMaybe<Array<Scalars['Bytes']>>;
  clearinghouse_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  clearinghouse_contains?: InputMaybe<Scalars['Bytes']>;
  clearinghouse_not_contains?: InputMaybe<Scalars['Bytes']>;
  clearinghouseSnapshot?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_not?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_gt?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_lt?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_gte?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_lte?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_in?: InputMaybe<Array<Scalars['String']>>;
  clearinghouseSnapshot_not_in?: InputMaybe<Array<Scalars['String']>>;
  clearinghouseSnapshot_contains?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_contains_nocase?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_not_contains?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_not_contains_nocase?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_starts_with?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_starts_with_nocase?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_not_starts_with?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_ends_with?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_ends_with_nocase?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_not_ends_with?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_?: InputMaybe<ClearinghouseSnapshot_filter>;
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DefundEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<DefundEvent_filter>>>;
};

export type DefundEvent_orderBy =
  | 'id'
  | 'date'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash'
  | 'clearinghouse'
  | 'clearinghouseSnapshot'
  | 'clearinghouseSnapshot__id'
  | 'clearinghouseSnapshot__date'
  | 'clearinghouseSnapshot__blockNumber'
  | 'clearinghouseSnapshot__blockTimestamp'
  | 'clearinghouseSnapshot__clearinghouse'
  | 'clearinghouseSnapshot__isActive'
  | 'clearinghouseSnapshot__nextRebalanceTimestamp'
  | 'clearinghouseSnapshot__interestReceivables'
  | 'clearinghouseSnapshot__principalReceivables'
  | 'clearinghouseSnapshot__daiBalance'
  | 'clearinghouseSnapshot__sDaiBalance'
  | 'clearinghouseSnapshot__sDaiInDaiBalance'
  | 'clearinghouseSnapshot__treasuryDaiBalance'
  | 'clearinghouseSnapshot__treasurySDaiBalance'
  | 'clearinghouseSnapshot__treasurySDaiInDaiBalance'
  | 'amount';

export type ExtendLoanEvent = {
  id: Scalars['String'];
  date: Scalars['String'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
  periods: Scalars['Int'];
  loan: CoolerLoan;
  expiryTimestamp: Scalars['BigInt'];
  interestDue: Scalars['BigDecimal'];
};

export type ExtendLoanEvent_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['String']>;
  date_not?: InputMaybe<Scalars['String']>;
  date_gt?: InputMaybe<Scalars['String']>;
  date_lt?: InputMaybe<Scalars['String']>;
  date_gte?: InputMaybe<Scalars['String']>;
  date_lte?: InputMaybe<Scalars['String']>;
  date_in?: InputMaybe<Array<Scalars['String']>>;
  date_not_in?: InputMaybe<Array<Scalars['String']>>;
  date_contains?: InputMaybe<Scalars['String']>;
  date_contains_nocase?: InputMaybe<Scalars['String']>;
  date_not_contains?: InputMaybe<Scalars['String']>;
  date_not_contains_nocase?: InputMaybe<Scalars['String']>;
  date_starts_with?: InputMaybe<Scalars['String']>;
  date_starts_with_nocase?: InputMaybe<Scalars['String']>;
  date_not_starts_with?: InputMaybe<Scalars['String']>;
  date_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  date_ends_with?: InputMaybe<Scalars['String']>;
  date_ends_with_nocase?: InputMaybe<Scalars['String']>;
  date_not_ends_with?: InputMaybe<Scalars['String']>;
  date_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  periods?: InputMaybe<Scalars['Int']>;
  periods_not?: InputMaybe<Scalars['Int']>;
  periods_gt?: InputMaybe<Scalars['Int']>;
  periods_lt?: InputMaybe<Scalars['Int']>;
  periods_gte?: InputMaybe<Scalars['Int']>;
  periods_lte?: InputMaybe<Scalars['Int']>;
  periods_in?: InputMaybe<Array<Scalars['Int']>>;
  periods_not_in?: InputMaybe<Array<Scalars['Int']>>;
  loan?: InputMaybe<Scalars['String']>;
  loan_not?: InputMaybe<Scalars['String']>;
  loan_gt?: InputMaybe<Scalars['String']>;
  loan_lt?: InputMaybe<Scalars['String']>;
  loan_gte?: InputMaybe<Scalars['String']>;
  loan_lte?: InputMaybe<Scalars['String']>;
  loan_in?: InputMaybe<Array<Scalars['String']>>;
  loan_not_in?: InputMaybe<Array<Scalars['String']>>;
  loan_contains?: InputMaybe<Scalars['String']>;
  loan_contains_nocase?: InputMaybe<Scalars['String']>;
  loan_not_contains?: InputMaybe<Scalars['String']>;
  loan_not_contains_nocase?: InputMaybe<Scalars['String']>;
  loan_starts_with?: InputMaybe<Scalars['String']>;
  loan_starts_with_nocase?: InputMaybe<Scalars['String']>;
  loan_not_starts_with?: InputMaybe<Scalars['String']>;
  loan_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  loan_ends_with?: InputMaybe<Scalars['String']>;
  loan_ends_with_nocase?: InputMaybe<Scalars['String']>;
  loan_not_ends_with?: InputMaybe<Scalars['String']>;
  loan_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  loan_?: InputMaybe<CoolerLoan_filter>;
  expiryTimestamp?: InputMaybe<Scalars['BigInt']>;
  expiryTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  expiryTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  expiryTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  expiryTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  expiryTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  expiryTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expiryTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  interestDue?: InputMaybe<Scalars['BigDecimal']>;
  interestDue_not?: InputMaybe<Scalars['BigDecimal']>;
  interestDue_gt?: InputMaybe<Scalars['BigDecimal']>;
  interestDue_lt?: InputMaybe<Scalars['BigDecimal']>;
  interestDue_gte?: InputMaybe<Scalars['BigDecimal']>;
  interestDue_lte?: InputMaybe<Scalars['BigDecimal']>;
  interestDue_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  interestDue_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ExtendLoanEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ExtendLoanEvent_filter>>>;
};

export type ExtendLoanEvent_orderBy =
  | 'id'
  | 'date'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash'
  | 'periods'
  | 'loan'
  | 'loan__id'
  | 'loan__createdBlock'
  | 'loan__createdTimestamp'
  | 'loan__createdTransaction'
  | 'loan__cooler'
  | 'loan__loanId'
  | 'loan__borrower'
  | 'loan__lender'
  | 'loan__interest'
  | 'loan__principal'
  | 'loan__collateral'
  | 'loan__expiryTimestamp'
  | 'loan__hasCallback'
  | 'loan__collateralToken'
  | 'loan__debtToken'
  | 'expiryTimestamp'
  | 'interestDue';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
  coolerLoanRequest?: Maybe<CoolerLoanRequest>;
  coolerLoanRequests: Array<CoolerLoanRequest>;
  coolerLoan?: Maybe<CoolerLoan>;
  coolerLoans: Array<CoolerLoan>;
  clearinghouseSnapshot?: Maybe<ClearinghouseSnapshot>;
  clearinghouseSnapshots: Array<ClearinghouseSnapshot>;
  rebalanceEvent?: Maybe<RebalanceEvent>;
  rebalanceEvents: Array<RebalanceEvent>;
  defundEvent?: Maybe<DefundEvent>;
  defundEvents: Array<DefundEvent>;
  requestLoanEvent?: Maybe<RequestLoanEvent>;
  requestLoanEvents: Array<RequestLoanEvent>;
  rescindLoanRequestEvent?: Maybe<RescindLoanRequestEvent>;
  rescindLoanRequestEvents: Array<RescindLoanRequestEvent>;
  clearLoanRequestEvent?: Maybe<ClearLoanRequestEvent>;
  clearLoanRequestEvents: Array<ClearLoanRequestEvent>;
  claimDefaultedLoanEvent?: Maybe<ClaimDefaultedLoanEvent>;
  claimDefaultedLoanEvents: Array<ClaimDefaultedLoanEvent>;
  repayLoanEvent?: Maybe<RepayLoanEvent>;
  repayLoanEvents: Array<RepayLoanEvent>;
  extendLoanEvent?: Maybe<ExtendLoanEvent>;
  extendLoanEvents: Array<ExtendLoanEvent>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QuerycoolerLoanRequestArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycoolerLoanRequestsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CoolerLoanRequest_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CoolerLoanRequest_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycoolerLoanArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycoolerLoansArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CoolerLoan_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CoolerLoan_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryclearinghouseSnapshotArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryclearinghouseSnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ClearinghouseSnapshot_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ClearinghouseSnapshot_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryrebalanceEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryrebalanceEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RebalanceEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RebalanceEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydefundEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydefundEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DefundEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DefundEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryrequestLoanEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryrequestLoanEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RequestLoanEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RequestLoanEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryrescindLoanRequestEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryrescindLoanRequestEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RescindLoanRequestEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RescindLoanRequestEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryclearLoanRequestEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryclearLoanRequestEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ClearLoanRequestEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ClearLoanRequestEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryclaimDefaultedLoanEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryclaimDefaultedLoanEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ClaimDefaultedLoanEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ClaimDefaultedLoanEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryrepayLoanEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryrepayLoanEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RepayLoanEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RepayLoanEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryextendLoanEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryextendLoanEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ExtendLoanEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ExtendLoanEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type RebalanceEvent = {
  id: Scalars['String'];
  date: Scalars['String'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
  clearinghouse: Scalars['Bytes'];
  clearinghouseSnapshot: ClearinghouseSnapshot;
  amount: Scalars['BigDecimal'];
};

export type RebalanceEvent_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['String']>;
  date_not?: InputMaybe<Scalars['String']>;
  date_gt?: InputMaybe<Scalars['String']>;
  date_lt?: InputMaybe<Scalars['String']>;
  date_gte?: InputMaybe<Scalars['String']>;
  date_lte?: InputMaybe<Scalars['String']>;
  date_in?: InputMaybe<Array<Scalars['String']>>;
  date_not_in?: InputMaybe<Array<Scalars['String']>>;
  date_contains?: InputMaybe<Scalars['String']>;
  date_contains_nocase?: InputMaybe<Scalars['String']>;
  date_not_contains?: InputMaybe<Scalars['String']>;
  date_not_contains_nocase?: InputMaybe<Scalars['String']>;
  date_starts_with?: InputMaybe<Scalars['String']>;
  date_starts_with_nocase?: InputMaybe<Scalars['String']>;
  date_not_starts_with?: InputMaybe<Scalars['String']>;
  date_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  date_ends_with?: InputMaybe<Scalars['String']>;
  date_ends_with_nocase?: InputMaybe<Scalars['String']>;
  date_not_ends_with?: InputMaybe<Scalars['String']>;
  date_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  clearinghouse?: InputMaybe<Scalars['Bytes']>;
  clearinghouse_not?: InputMaybe<Scalars['Bytes']>;
  clearinghouse_gt?: InputMaybe<Scalars['Bytes']>;
  clearinghouse_lt?: InputMaybe<Scalars['Bytes']>;
  clearinghouse_gte?: InputMaybe<Scalars['Bytes']>;
  clearinghouse_lte?: InputMaybe<Scalars['Bytes']>;
  clearinghouse_in?: InputMaybe<Array<Scalars['Bytes']>>;
  clearinghouse_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  clearinghouse_contains?: InputMaybe<Scalars['Bytes']>;
  clearinghouse_not_contains?: InputMaybe<Scalars['Bytes']>;
  clearinghouseSnapshot?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_not?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_gt?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_lt?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_gte?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_lte?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_in?: InputMaybe<Array<Scalars['String']>>;
  clearinghouseSnapshot_not_in?: InputMaybe<Array<Scalars['String']>>;
  clearinghouseSnapshot_contains?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_contains_nocase?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_not_contains?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_not_contains_nocase?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_starts_with?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_starts_with_nocase?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_not_starts_with?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_ends_with?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_ends_with_nocase?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_not_ends_with?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  clearinghouseSnapshot_?: InputMaybe<ClearinghouseSnapshot_filter>;
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RebalanceEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<RebalanceEvent_filter>>>;
};

export type RebalanceEvent_orderBy =
  | 'id'
  | 'date'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash'
  | 'clearinghouse'
  | 'clearinghouseSnapshot'
  | 'clearinghouseSnapshot__id'
  | 'clearinghouseSnapshot__date'
  | 'clearinghouseSnapshot__blockNumber'
  | 'clearinghouseSnapshot__blockTimestamp'
  | 'clearinghouseSnapshot__clearinghouse'
  | 'clearinghouseSnapshot__isActive'
  | 'clearinghouseSnapshot__nextRebalanceTimestamp'
  | 'clearinghouseSnapshot__interestReceivables'
  | 'clearinghouseSnapshot__principalReceivables'
  | 'clearinghouseSnapshot__daiBalance'
  | 'clearinghouseSnapshot__sDaiBalance'
  | 'clearinghouseSnapshot__sDaiInDaiBalance'
  | 'clearinghouseSnapshot__treasuryDaiBalance'
  | 'clearinghouseSnapshot__treasurySDaiBalance'
  | 'clearinghouseSnapshot__treasurySDaiInDaiBalance'
  | 'amount';

export type RepayLoanEvent = {
  id: Scalars['String'];
  date: Scalars['String'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
  amountPaid: Scalars['BigDecimal'];
  loan: CoolerLoan;
  secondsToExpiry: Scalars['BigInt'];
  principalPayable: Scalars['BigDecimal'];
  interestPayable: Scalars['BigDecimal'];
  collateralDeposited: Scalars['BigDecimal'];
};

export type RepayLoanEvent_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['String']>;
  date_not?: InputMaybe<Scalars['String']>;
  date_gt?: InputMaybe<Scalars['String']>;
  date_lt?: InputMaybe<Scalars['String']>;
  date_gte?: InputMaybe<Scalars['String']>;
  date_lte?: InputMaybe<Scalars['String']>;
  date_in?: InputMaybe<Array<Scalars['String']>>;
  date_not_in?: InputMaybe<Array<Scalars['String']>>;
  date_contains?: InputMaybe<Scalars['String']>;
  date_contains_nocase?: InputMaybe<Scalars['String']>;
  date_not_contains?: InputMaybe<Scalars['String']>;
  date_not_contains_nocase?: InputMaybe<Scalars['String']>;
  date_starts_with?: InputMaybe<Scalars['String']>;
  date_starts_with_nocase?: InputMaybe<Scalars['String']>;
  date_not_starts_with?: InputMaybe<Scalars['String']>;
  date_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  date_ends_with?: InputMaybe<Scalars['String']>;
  date_ends_with_nocase?: InputMaybe<Scalars['String']>;
  date_not_ends_with?: InputMaybe<Scalars['String']>;
  date_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  amountPaid?: InputMaybe<Scalars['BigDecimal']>;
  amountPaid_not?: InputMaybe<Scalars['BigDecimal']>;
  amountPaid_gt?: InputMaybe<Scalars['BigDecimal']>;
  amountPaid_lt?: InputMaybe<Scalars['BigDecimal']>;
  amountPaid_gte?: InputMaybe<Scalars['BigDecimal']>;
  amountPaid_lte?: InputMaybe<Scalars['BigDecimal']>;
  amountPaid_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amountPaid_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  loan?: InputMaybe<Scalars['String']>;
  loan_not?: InputMaybe<Scalars['String']>;
  loan_gt?: InputMaybe<Scalars['String']>;
  loan_lt?: InputMaybe<Scalars['String']>;
  loan_gte?: InputMaybe<Scalars['String']>;
  loan_lte?: InputMaybe<Scalars['String']>;
  loan_in?: InputMaybe<Array<Scalars['String']>>;
  loan_not_in?: InputMaybe<Array<Scalars['String']>>;
  loan_contains?: InputMaybe<Scalars['String']>;
  loan_contains_nocase?: InputMaybe<Scalars['String']>;
  loan_not_contains?: InputMaybe<Scalars['String']>;
  loan_not_contains_nocase?: InputMaybe<Scalars['String']>;
  loan_starts_with?: InputMaybe<Scalars['String']>;
  loan_starts_with_nocase?: InputMaybe<Scalars['String']>;
  loan_not_starts_with?: InputMaybe<Scalars['String']>;
  loan_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  loan_ends_with?: InputMaybe<Scalars['String']>;
  loan_ends_with_nocase?: InputMaybe<Scalars['String']>;
  loan_not_ends_with?: InputMaybe<Scalars['String']>;
  loan_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  loan_?: InputMaybe<CoolerLoan_filter>;
  secondsToExpiry?: InputMaybe<Scalars['BigInt']>;
  secondsToExpiry_not?: InputMaybe<Scalars['BigInt']>;
  secondsToExpiry_gt?: InputMaybe<Scalars['BigInt']>;
  secondsToExpiry_lt?: InputMaybe<Scalars['BigInt']>;
  secondsToExpiry_gte?: InputMaybe<Scalars['BigInt']>;
  secondsToExpiry_lte?: InputMaybe<Scalars['BigInt']>;
  secondsToExpiry_in?: InputMaybe<Array<Scalars['BigInt']>>;
  secondsToExpiry_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  principalPayable?: InputMaybe<Scalars['BigDecimal']>;
  principalPayable_not?: InputMaybe<Scalars['BigDecimal']>;
  principalPayable_gt?: InputMaybe<Scalars['BigDecimal']>;
  principalPayable_lt?: InputMaybe<Scalars['BigDecimal']>;
  principalPayable_gte?: InputMaybe<Scalars['BigDecimal']>;
  principalPayable_lte?: InputMaybe<Scalars['BigDecimal']>;
  principalPayable_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  principalPayable_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  interestPayable?: InputMaybe<Scalars['BigDecimal']>;
  interestPayable_not?: InputMaybe<Scalars['BigDecimal']>;
  interestPayable_gt?: InputMaybe<Scalars['BigDecimal']>;
  interestPayable_lt?: InputMaybe<Scalars['BigDecimal']>;
  interestPayable_gte?: InputMaybe<Scalars['BigDecimal']>;
  interestPayable_lte?: InputMaybe<Scalars['BigDecimal']>;
  interestPayable_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  interestPayable_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  collateralDeposited?: InputMaybe<Scalars['BigDecimal']>;
  collateralDeposited_not?: InputMaybe<Scalars['BigDecimal']>;
  collateralDeposited_gt?: InputMaybe<Scalars['BigDecimal']>;
  collateralDeposited_lt?: InputMaybe<Scalars['BigDecimal']>;
  collateralDeposited_gte?: InputMaybe<Scalars['BigDecimal']>;
  collateralDeposited_lte?: InputMaybe<Scalars['BigDecimal']>;
  collateralDeposited_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  collateralDeposited_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RepayLoanEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<RepayLoanEvent_filter>>>;
};

export type RepayLoanEvent_orderBy =
  | 'id'
  | 'date'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash'
  | 'amountPaid'
  | 'loan'
  | 'loan__id'
  | 'loan__createdBlock'
  | 'loan__createdTimestamp'
  | 'loan__createdTransaction'
  | 'loan__cooler'
  | 'loan__loanId'
  | 'loan__borrower'
  | 'loan__lender'
  | 'loan__interest'
  | 'loan__principal'
  | 'loan__collateral'
  | 'loan__expiryTimestamp'
  | 'loan__hasCallback'
  | 'loan__collateralToken'
  | 'loan__debtToken'
  | 'secondsToExpiry'
  | 'principalPayable'
  | 'interestPayable'
  | 'collateralDeposited';

export type RequestLoanEvent = {
  id: Scalars['String'];
  date: Scalars['String'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
  request: CoolerLoanRequest;
};

export type RequestLoanEvent_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['String']>;
  date_not?: InputMaybe<Scalars['String']>;
  date_gt?: InputMaybe<Scalars['String']>;
  date_lt?: InputMaybe<Scalars['String']>;
  date_gte?: InputMaybe<Scalars['String']>;
  date_lte?: InputMaybe<Scalars['String']>;
  date_in?: InputMaybe<Array<Scalars['String']>>;
  date_not_in?: InputMaybe<Array<Scalars['String']>>;
  date_contains?: InputMaybe<Scalars['String']>;
  date_contains_nocase?: InputMaybe<Scalars['String']>;
  date_not_contains?: InputMaybe<Scalars['String']>;
  date_not_contains_nocase?: InputMaybe<Scalars['String']>;
  date_starts_with?: InputMaybe<Scalars['String']>;
  date_starts_with_nocase?: InputMaybe<Scalars['String']>;
  date_not_starts_with?: InputMaybe<Scalars['String']>;
  date_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  date_ends_with?: InputMaybe<Scalars['String']>;
  date_ends_with_nocase?: InputMaybe<Scalars['String']>;
  date_not_ends_with?: InputMaybe<Scalars['String']>;
  date_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  request?: InputMaybe<Scalars['String']>;
  request_not?: InputMaybe<Scalars['String']>;
  request_gt?: InputMaybe<Scalars['String']>;
  request_lt?: InputMaybe<Scalars['String']>;
  request_gte?: InputMaybe<Scalars['String']>;
  request_lte?: InputMaybe<Scalars['String']>;
  request_in?: InputMaybe<Array<Scalars['String']>>;
  request_not_in?: InputMaybe<Array<Scalars['String']>>;
  request_contains?: InputMaybe<Scalars['String']>;
  request_contains_nocase?: InputMaybe<Scalars['String']>;
  request_not_contains?: InputMaybe<Scalars['String']>;
  request_not_contains_nocase?: InputMaybe<Scalars['String']>;
  request_starts_with?: InputMaybe<Scalars['String']>;
  request_starts_with_nocase?: InputMaybe<Scalars['String']>;
  request_not_starts_with?: InputMaybe<Scalars['String']>;
  request_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  request_ends_with?: InputMaybe<Scalars['String']>;
  request_ends_with_nocase?: InputMaybe<Scalars['String']>;
  request_not_ends_with?: InputMaybe<Scalars['String']>;
  request_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  request_?: InputMaybe<CoolerLoanRequest_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RequestLoanEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<RequestLoanEvent_filter>>>;
};

export type RequestLoanEvent_orderBy =
  | 'id'
  | 'date'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash'
  | 'request'
  | 'request__id'
  | 'request__createdBlock'
  | 'request__createdTimestamp'
  | 'request__createdTransaction'
  | 'request__cooler'
  | 'request__requestId'
  | 'request__borrower'
  | 'request__collateralToken'
  | 'request__debtToken'
  | 'request__amount'
  | 'request__interestPercentage'
  | 'request__loanToCollateralRatio'
  | 'request__durationSeconds'
  | 'request__isRescinded';

export type RescindLoanRequestEvent = {
  id: Scalars['String'];
  date: Scalars['String'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
  request: CoolerLoanRequest;
};

export type RescindLoanRequestEvent_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['String']>;
  date_not?: InputMaybe<Scalars['String']>;
  date_gt?: InputMaybe<Scalars['String']>;
  date_lt?: InputMaybe<Scalars['String']>;
  date_gte?: InputMaybe<Scalars['String']>;
  date_lte?: InputMaybe<Scalars['String']>;
  date_in?: InputMaybe<Array<Scalars['String']>>;
  date_not_in?: InputMaybe<Array<Scalars['String']>>;
  date_contains?: InputMaybe<Scalars['String']>;
  date_contains_nocase?: InputMaybe<Scalars['String']>;
  date_not_contains?: InputMaybe<Scalars['String']>;
  date_not_contains_nocase?: InputMaybe<Scalars['String']>;
  date_starts_with?: InputMaybe<Scalars['String']>;
  date_starts_with_nocase?: InputMaybe<Scalars['String']>;
  date_not_starts_with?: InputMaybe<Scalars['String']>;
  date_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  date_ends_with?: InputMaybe<Scalars['String']>;
  date_ends_with_nocase?: InputMaybe<Scalars['String']>;
  date_not_ends_with?: InputMaybe<Scalars['String']>;
  date_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  request?: InputMaybe<Scalars['String']>;
  request_not?: InputMaybe<Scalars['String']>;
  request_gt?: InputMaybe<Scalars['String']>;
  request_lt?: InputMaybe<Scalars['String']>;
  request_gte?: InputMaybe<Scalars['String']>;
  request_lte?: InputMaybe<Scalars['String']>;
  request_in?: InputMaybe<Array<Scalars['String']>>;
  request_not_in?: InputMaybe<Array<Scalars['String']>>;
  request_contains?: InputMaybe<Scalars['String']>;
  request_contains_nocase?: InputMaybe<Scalars['String']>;
  request_not_contains?: InputMaybe<Scalars['String']>;
  request_not_contains_nocase?: InputMaybe<Scalars['String']>;
  request_starts_with?: InputMaybe<Scalars['String']>;
  request_starts_with_nocase?: InputMaybe<Scalars['String']>;
  request_not_starts_with?: InputMaybe<Scalars['String']>;
  request_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  request_ends_with?: InputMaybe<Scalars['String']>;
  request_ends_with_nocase?: InputMaybe<Scalars['String']>;
  request_not_ends_with?: InputMaybe<Scalars['String']>;
  request_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  request_?: InputMaybe<CoolerLoanRequest_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RescindLoanRequestEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<RescindLoanRequestEvent_filter>>>;
};

export type RescindLoanRequestEvent_orderBy =
  | 'id'
  | 'date'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash'
  | 'request'
  | 'request__id'
  | 'request__createdBlock'
  | 'request__createdTimestamp'
  | 'request__createdTransaction'
  | 'request__cooler'
  | 'request__requestId'
  | 'request__borrower'
  | 'request__collateralToken'
  | 'request__debtToken'
  | 'request__amount'
  | 'request__interestPercentage'
  | 'request__loanToCollateralRatio'
  | 'request__durationSeconds'
  | 'request__isRescinded';

export type Subscription = {
  coolerLoanRequest?: Maybe<CoolerLoanRequest>;
  coolerLoanRequests: Array<CoolerLoanRequest>;
  coolerLoan?: Maybe<CoolerLoan>;
  coolerLoans: Array<CoolerLoan>;
  clearinghouseSnapshot?: Maybe<ClearinghouseSnapshot>;
  clearinghouseSnapshots: Array<ClearinghouseSnapshot>;
  rebalanceEvent?: Maybe<RebalanceEvent>;
  rebalanceEvents: Array<RebalanceEvent>;
  defundEvent?: Maybe<DefundEvent>;
  defundEvents: Array<DefundEvent>;
  requestLoanEvent?: Maybe<RequestLoanEvent>;
  requestLoanEvents: Array<RequestLoanEvent>;
  rescindLoanRequestEvent?: Maybe<RescindLoanRequestEvent>;
  rescindLoanRequestEvents: Array<RescindLoanRequestEvent>;
  clearLoanRequestEvent?: Maybe<ClearLoanRequestEvent>;
  clearLoanRequestEvents: Array<ClearLoanRequestEvent>;
  claimDefaultedLoanEvent?: Maybe<ClaimDefaultedLoanEvent>;
  claimDefaultedLoanEvents: Array<ClaimDefaultedLoanEvent>;
  repayLoanEvent?: Maybe<RepayLoanEvent>;
  repayLoanEvents: Array<RepayLoanEvent>;
  extendLoanEvent?: Maybe<ExtendLoanEvent>;
  extendLoanEvents: Array<ExtendLoanEvent>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptioncoolerLoanRequestArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncoolerLoanRequestsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CoolerLoanRequest_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CoolerLoanRequest_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncoolerLoanArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncoolerLoansArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CoolerLoan_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CoolerLoan_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionclearinghouseSnapshotArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionclearinghouseSnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ClearinghouseSnapshot_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ClearinghouseSnapshot_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionrebalanceEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionrebalanceEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RebalanceEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RebalanceEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondefundEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondefundEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DefundEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DefundEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionrequestLoanEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionrequestLoanEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RequestLoanEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RequestLoanEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionrescindLoanRequestEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionrescindLoanRequestEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RescindLoanRequestEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RescindLoanRequestEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionclearLoanRequestEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionclearLoanRequestEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ClearLoanRequestEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ClearLoanRequestEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionclaimDefaultedLoanEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionclaimDefaultedLoanEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ClaimDefaultedLoanEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ClaimDefaultedLoanEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionrepayLoanEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionrepayLoanEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RepayLoanEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RepayLoanEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionextendLoanEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionextendLoanEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ExtendLoanEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ExtendLoanEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
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
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  ClaimDefaultedLoanEvent: ResolverTypeWrapper<ClaimDefaultedLoanEvent>;
  ClaimDefaultedLoanEvent_filter: ClaimDefaultedLoanEvent_filter;
  ClaimDefaultedLoanEvent_orderBy: ClaimDefaultedLoanEvent_orderBy;
  ClearLoanRequestEvent: ResolverTypeWrapper<ClearLoanRequestEvent>;
  ClearLoanRequestEvent_filter: ClearLoanRequestEvent_filter;
  ClearLoanRequestEvent_orderBy: ClearLoanRequestEvent_orderBy;
  ClearinghouseSnapshot: ResolverTypeWrapper<ClearinghouseSnapshot>;
  ClearinghouseSnapshot_filter: ClearinghouseSnapshot_filter;
  ClearinghouseSnapshot_orderBy: ClearinghouseSnapshot_orderBy;
  CoolerLoan: ResolverTypeWrapper<CoolerLoan>;
  CoolerLoanRequest: ResolverTypeWrapper<CoolerLoanRequest>;
  CoolerLoanRequest_filter: CoolerLoanRequest_filter;
  CoolerLoanRequest_orderBy: CoolerLoanRequest_orderBy;
  CoolerLoan_filter: CoolerLoan_filter;
  CoolerLoan_orderBy: CoolerLoan_orderBy;
  DefundEvent: ResolverTypeWrapper<DefundEvent>;
  DefundEvent_filter: DefundEvent_filter;
  DefundEvent_orderBy: DefundEvent_orderBy;
  ExtendLoanEvent: ResolverTypeWrapper<ExtendLoanEvent>;
  ExtendLoanEvent_filter: ExtendLoanEvent_filter;
  ExtendLoanEvent_orderBy: ExtendLoanEvent_orderBy;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']>;
  OrderDirection: OrderDirection;
  Query: ResolverTypeWrapper<{}>;
  RebalanceEvent: ResolverTypeWrapper<RebalanceEvent>;
  RebalanceEvent_filter: RebalanceEvent_filter;
  RebalanceEvent_orderBy: RebalanceEvent_orderBy;
  RepayLoanEvent: ResolverTypeWrapper<RepayLoanEvent>;
  RepayLoanEvent_filter: RepayLoanEvent_filter;
  RepayLoanEvent_orderBy: RepayLoanEvent_orderBy;
  RequestLoanEvent: ResolverTypeWrapper<RequestLoanEvent>;
  RequestLoanEvent_filter: RequestLoanEvent_filter;
  RequestLoanEvent_orderBy: RequestLoanEvent_orderBy;
  RescindLoanRequestEvent: ResolverTypeWrapper<RescindLoanRequestEvent>;
  RescindLoanRequestEvent_filter: RescindLoanRequestEvent_filter;
  RescindLoanRequestEvent_orderBy: RescindLoanRequestEvent_orderBy;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean'];
  Bytes: Scalars['Bytes'];
  ClaimDefaultedLoanEvent: ClaimDefaultedLoanEvent;
  ClaimDefaultedLoanEvent_filter: ClaimDefaultedLoanEvent_filter;
  ClearLoanRequestEvent: ClearLoanRequestEvent;
  ClearLoanRequestEvent_filter: ClearLoanRequestEvent_filter;
  ClearinghouseSnapshot: ClearinghouseSnapshot;
  ClearinghouseSnapshot_filter: ClearinghouseSnapshot_filter;
  CoolerLoan: CoolerLoan;
  CoolerLoanRequest: CoolerLoanRequest;
  CoolerLoanRequest_filter: CoolerLoanRequest_filter;
  CoolerLoan_filter: CoolerLoan_filter;
  DefundEvent: DefundEvent;
  DefundEvent_filter: DefundEvent_filter;
  ExtendLoanEvent: ExtendLoanEvent;
  ExtendLoanEvent_filter: ExtendLoanEvent_filter;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Int8: Scalars['Int8'];
  Query: {};
  RebalanceEvent: RebalanceEvent;
  RebalanceEvent_filter: RebalanceEvent_filter;
  RepayLoanEvent: RepayLoanEvent;
  RepayLoanEvent_filter: RepayLoanEvent_filter;
  RequestLoanEvent: RequestLoanEvent;
  RequestLoanEvent_filter: RequestLoanEvent_filter;
  RescindLoanRequestEvent: RescindLoanRequestEvent;
  RescindLoanRequestEvent_filter: RescindLoanRequestEvent_filter;
  String: Scalars['String'];
  Subscription: {};
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type ClaimDefaultedLoanEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ClaimDefaultedLoanEvent'] = ResolversParentTypes['ClaimDefaultedLoanEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  collateralQuantityClaimed?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  collateralPrice?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  collateralValueClaimed?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  loan?: Resolver<ResolversTypes['CoolerLoan'], ParentType, ContextType>;
  secondsSinceExpiry?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClearLoanRequestEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ClearLoanRequestEvent'] = ResolversParentTypes['ClearLoanRequestEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  request?: Resolver<ResolversTypes['CoolerLoanRequest'], ParentType, ContextType>;
  loan?: Resolver<ResolversTypes['CoolerLoan'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClearinghouseSnapshotResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ClearinghouseSnapshot'] = ResolversParentTypes['ClearinghouseSnapshot']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  clearinghouse?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  nextRebalanceTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  interestReceivables?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  principalReceivables?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  daiBalance?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  sDaiBalance?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  sDaiInDaiBalance?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  treasuryDaiBalance?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  treasurySDaiBalance?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  treasurySDaiInDaiBalance?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  rebalanceEvents?: Resolver<Array<ResolversTypes['RebalanceEvent']>, ParentType, ContextType, RequireFields<ClearinghouseSnapshotrebalanceEventsArgs, 'skip' | 'first'>>;
  defundEvents?: Resolver<Array<ResolversTypes['DefundEvent']>, ParentType, ContextType, RequireFields<ClearinghouseSnapshotdefundEventsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CoolerLoanResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['CoolerLoan'] = ResolversParentTypes['CoolerLoan']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBlock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdTransaction?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  cooler?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  request?: Resolver<ResolversTypes['CoolerLoanRequest'], ParentType, ContextType>;
  loanId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  borrower?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  lender?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  interest?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  principal?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  collateral?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  expiryTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  hasCallback?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  collateralToken?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  debtToken?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  creationEvents?: Resolver<Array<ResolversTypes['ClearLoanRequestEvent']>, ParentType, ContextType, RequireFields<CoolerLoancreationEventsArgs, 'skip' | 'first'>>;
  defaultedClaimEvents?: Resolver<Array<ResolversTypes['ClaimDefaultedLoanEvent']>, ParentType, ContextType, RequireFields<CoolerLoandefaultedClaimEventsArgs, 'skip' | 'first'>>;
  repaymentEvents?: Resolver<Array<ResolversTypes['RepayLoanEvent']>, ParentType, ContextType, RequireFields<CoolerLoanrepaymentEventsArgs, 'skip' | 'first'>>;
  extendEvents?: Resolver<Array<ResolversTypes['ExtendLoanEvent']>, ParentType, ContextType, RequireFields<CoolerLoanextendEventsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CoolerLoanRequestResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['CoolerLoanRequest'] = ResolversParentTypes['CoolerLoanRequest']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBlock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdTransaction?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  cooler?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  requestId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  borrower?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  collateralToken?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  debtToken?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  interestPercentage?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  loanToCollateralRatio?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  durationSeconds?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  isRescinded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  requestEvents?: Resolver<Array<ResolversTypes['RequestLoanEvent']>, ParentType, ContextType, RequireFields<CoolerLoanRequestrequestEventsArgs, 'skip' | 'first'>>;
  rescindEvents?: Resolver<Array<ResolversTypes['RescindLoanRequestEvent']>, ParentType, ContextType, RequireFields<CoolerLoanRequestrescindEventsArgs, 'skip' | 'first'>>;
  clearEvents?: Resolver<Array<ResolversTypes['ClearLoanRequestEvent']>, ParentType, ContextType, RequireFields<CoolerLoanRequestclearEventsArgs, 'skip' | 'first'>>;
  loans?: Resolver<Array<ResolversTypes['CoolerLoan']>, ParentType, ContextType, RequireFields<CoolerLoanRequestloansArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DefundEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['DefundEvent'] = ResolversParentTypes['DefundEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  clearinghouse?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  clearinghouseSnapshot?: Resolver<ResolversTypes['ClearinghouseSnapshot'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ExtendLoanEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ExtendLoanEvent'] = ResolversParentTypes['ExtendLoanEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  periods?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  loan?: Resolver<ResolversTypes['CoolerLoan'], ParentType, ContextType>;
  expiryTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  interestDue?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  coolerLoanRequest?: Resolver<Maybe<ResolversTypes['CoolerLoanRequest']>, ParentType, ContextType, RequireFields<QuerycoolerLoanRequestArgs, 'id' | 'subgraphError'>>;
  coolerLoanRequests?: Resolver<Array<ResolversTypes['CoolerLoanRequest']>, ParentType, ContextType, RequireFields<QuerycoolerLoanRequestsArgs, 'skip' | 'first' | 'subgraphError'>>;
  coolerLoan?: Resolver<Maybe<ResolversTypes['CoolerLoan']>, ParentType, ContextType, RequireFields<QuerycoolerLoanArgs, 'id' | 'subgraphError'>>;
  coolerLoans?: Resolver<Array<ResolversTypes['CoolerLoan']>, ParentType, ContextType, RequireFields<QuerycoolerLoansArgs, 'skip' | 'first' | 'subgraphError'>>;
  clearinghouseSnapshot?: Resolver<Maybe<ResolversTypes['ClearinghouseSnapshot']>, ParentType, ContextType, RequireFields<QueryclearinghouseSnapshotArgs, 'id' | 'subgraphError'>>;
  clearinghouseSnapshots?: Resolver<Array<ResolversTypes['ClearinghouseSnapshot']>, ParentType, ContextType, RequireFields<QueryclearinghouseSnapshotsArgs, 'skip' | 'first' | 'subgraphError'>>;
  rebalanceEvent?: Resolver<Maybe<ResolversTypes['RebalanceEvent']>, ParentType, ContextType, RequireFields<QueryrebalanceEventArgs, 'id' | 'subgraphError'>>;
  rebalanceEvents?: Resolver<Array<ResolversTypes['RebalanceEvent']>, ParentType, ContextType, RequireFields<QueryrebalanceEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  defundEvent?: Resolver<Maybe<ResolversTypes['DefundEvent']>, ParentType, ContextType, RequireFields<QuerydefundEventArgs, 'id' | 'subgraphError'>>;
  defundEvents?: Resolver<Array<ResolversTypes['DefundEvent']>, ParentType, ContextType, RequireFields<QuerydefundEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  requestLoanEvent?: Resolver<Maybe<ResolversTypes['RequestLoanEvent']>, ParentType, ContextType, RequireFields<QueryrequestLoanEventArgs, 'id' | 'subgraphError'>>;
  requestLoanEvents?: Resolver<Array<ResolversTypes['RequestLoanEvent']>, ParentType, ContextType, RequireFields<QueryrequestLoanEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  rescindLoanRequestEvent?: Resolver<Maybe<ResolversTypes['RescindLoanRequestEvent']>, ParentType, ContextType, RequireFields<QueryrescindLoanRequestEventArgs, 'id' | 'subgraphError'>>;
  rescindLoanRequestEvents?: Resolver<Array<ResolversTypes['RescindLoanRequestEvent']>, ParentType, ContextType, RequireFields<QueryrescindLoanRequestEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  clearLoanRequestEvent?: Resolver<Maybe<ResolversTypes['ClearLoanRequestEvent']>, ParentType, ContextType, RequireFields<QueryclearLoanRequestEventArgs, 'id' | 'subgraphError'>>;
  clearLoanRequestEvents?: Resolver<Array<ResolversTypes['ClearLoanRequestEvent']>, ParentType, ContextType, RequireFields<QueryclearLoanRequestEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  claimDefaultedLoanEvent?: Resolver<Maybe<ResolversTypes['ClaimDefaultedLoanEvent']>, ParentType, ContextType, RequireFields<QueryclaimDefaultedLoanEventArgs, 'id' | 'subgraphError'>>;
  claimDefaultedLoanEvents?: Resolver<Array<ResolversTypes['ClaimDefaultedLoanEvent']>, ParentType, ContextType, RequireFields<QueryclaimDefaultedLoanEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  repayLoanEvent?: Resolver<Maybe<ResolversTypes['RepayLoanEvent']>, ParentType, ContextType, RequireFields<QueryrepayLoanEventArgs, 'id' | 'subgraphError'>>;
  repayLoanEvents?: Resolver<Array<ResolversTypes['RepayLoanEvent']>, ParentType, ContextType, RequireFields<QueryrepayLoanEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  extendLoanEvent?: Resolver<Maybe<ResolversTypes['ExtendLoanEvent']>, ParentType, ContextType, RequireFields<QueryextendLoanEventArgs, 'id' | 'subgraphError'>>;
  extendLoanEvents?: Resolver<Array<ResolversTypes['ExtendLoanEvent']>, ParentType, ContextType, RequireFields<QueryextendLoanEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type RebalanceEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['RebalanceEvent'] = ResolversParentTypes['RebalanceEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  clearinghouse?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  clearinghouseSnapshot?: Resolver<ResolversTypes['ClearinghouseSnapshot'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RepayLoanEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['RepayLoanEvent'] = ResolversParentTypes['RepayLoanEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  amountPaid?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  loan?: Resolver<ResolversTypes['CoolerLoan'], ParentType, ContextType>;
  secondsToExpiry?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  principalPayable?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  interestPayable?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  collateralDeposited?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RequestLoanEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['RequestLoanEvent'] = ResolversParentTypes['RequestLoanEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  request?: Resolver<ResolversTypes['CoolerLoanRequest'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RescindLoanRequestEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['RescindLoanRequestEvent'] = ResolversParentTypes['RescindLoanRequestEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  request?: Resolver<ResolversTypes['CoolerLoanRequest'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  coolerLoanRequest?: SubscriptionResolver<Maybe<ResolversTypes['CoolerLoanRequest']>, "coolerLoanRequest", ParentType, ContextType, RequireFields<SubscriptioncoolerLoanRequestArgs, 'id' | 'subgraphError'>>;
  coolerLoanRequests?: SubscriptionResolver<Array<ResolversTypes['CoolerLoanRequest']>, "coolerLoanRequests", ParentType, ContextType, RequireFields<SubscriptioncoolerLoanRequestsArgs, 'skip' | 'first' | 'subgraphError'>>;
  coolerLoan?: SubscriptionResolver<Maybe<ResolversTypes['CoolerLoan']>, "coolerLoan", ParentType, ContextType, RequireFields<SubscriptioncoolerLoanArgs, 'id' | 'subgraphError'>>;
  coolerLoans?: SubscriptionResolver<Array<ResolversTypes['CoolerLoan']>, "coolerLoans", ParentType, ContextType, RequireFields<SubscriptioncoolerLoansArgs, 'skip' | 'first' | 'subgraphError'>>;
  clearinghouseSnapshot?: SubscriptionResolver<Maybe<ResolversTypes['ClearinghouseSnapshot']>, "clearinghouseSnapshot", ParentType, ContextType, RequireFields<SubscriptionclearinghouseSnapshotArgs, 'id' | 'subgraphError'>>;
  clearinghouseSnapshots?: SubscriptionResolver<Array<ResolversTypes['ClearinghouseSnapshot']>, "clearinghouseSnapshots", ParentType, ContextType, RequireFields<SubscriptionclearinghouseSnapshotsArgs, 'skip' | 'first' | 'subgraphError'>>;
  rebalanceEvent?: SubscriptionResolver<Maybe<ResolversTypes['RebalanceEvent']>, "rebalanceEvent", ParentType, ContextType, RequireFields<SubscriptionrebalanceEventArgs, 'id' | 'subgraphError'>>;
  rebalanceEvents?: SubscriptionResolver<Array<ResolversTypes['RebalanceEvent']>, "rebalanceEvents", ParentType, ContextType, RequireFields<SubscriptionrebalanceEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  defundEvent?: SubscriptionResolver<Maybe<ResolversTypes['DefundEvent']>, "defundEvent", ParentType, ContextType, RequireFields<SubscriptiondefundEventArgs, 'id' | 'subgraphError'>>;
  defundEvents?: SubscriptionResolver<Array<ResolversTypes['DefundEvent']>, "defundEvents", ParentType, ContextType, RequireFields<SubscriptiondefundEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  requestLoanEvent?: SubscriptionResolver<Maybe<ResolversTypes['RequestLoanEvent']>, "requestLoanEvent", ParentType, ContextType, RequireFields<SubscriptionrequestLoanEventArgs, 'id' | 'subgraphError'>>;
  requestLoanEvents?: SubscriptionResolver<Array<ResolversTypes['RequestLoanEvent']>, "requestLoanEvents", ParentType, ContextType, RequireFields<SubscriptionrequestLoanEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  rescindLoanRequestEvent?: SubscriptionResolver<Maybe<ResolversTypes['RescindLoanRequestEvent']>, "rescindLoanRequestEvent", ParentType, ContextType, RequireFields<SubscriptionrescindLoanRequestEventArgs, 'id' | 'subgraphError'>>;
  rescindLoanRequestEvents?: SubscriptionResolver<Array<ResolversTypes['RescindLoanRequestEvent']>, "rescindLoanRequestEvents", ParentType, ContextType, RequireFields<SubscriptionrescindLoanRequestEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  clearLoanRequestEvent?: SubscriptionResolver<Maybe<ResolversTypes['ClearLoanRequestEvent']>, "clearLoanRequestEvent", ParentType, ContextType, RequireFields<SubscriptionclearLoanRequestEventArgs, 'id' | 'subgraphError'>>;
  clearLoanRequestEvents?: SubscriptionResolver<Array<ResolversTypes['ClearLoanRequestEvent']>, "clearLoanRequestEvents", ParentType, ContextType, RequireFields<SubscriptionclearLoanRequestEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  claimDefaultedLoanEvent?: SubscriptionResolver<Maybe<ResolversTypes['ClaimDefaultedLoanEvent']>, "claimDefaultedLoanEvent", ParentType, ContextType, RequireFields<SubscriptionclaimDefaultedLoanEventArgs, 'id' | 'subgraphError'>>;
  claimDefaultedLoanEvents?: SubscriptionResolver<Array<ResolversTypes['ClaimDefaultedLoanEvent']>, "claimDefaultedLoanEvents", ParentType, ContextType, RequireFields<SubscriptionclaimDefaultedLoanEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  repayLoanEvent?: SubscriptionResolver<Maybe<ResolversTypes['RepayLoanEvent']>, "repayLoanEvent", ParentType, ContextType, RequireFields<SubscriptionrepayLoanEventArgs, 'id' | 'subgraphError'>>;
  repayLoanEvents?: SubscriptionResolver<Array<ResolversTypes['RepayLoanEvent']>, "repayLoanEvents", ParentType, ContextType, RequireFields<SubscriptionrepayLoanEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  extendLoanEvent?: SubscriptionResolver<Maybe<ResolversTypes['ExtendLoanEvent']>, "extendLoanEvent", ParentType, ContextType, RequireFields<SubscriptionextendLoanEventArgs, 'id' | 'subgraphError'>>;
  extendLoanEvents?: SubscriptionResolver<Array<ResolversTypes['ExtendLoanEvent']>, "extendLoanEvents", ParentType, ContextType, RequireFields<SubscriptionextendLoanEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  ClaimDefaultedLoanEvent?: ClaimDefaultedLoanEventResolvers<ContextType>;
  ClearLoanRequestEvent?: ClearLoanRequestEventResolvers<ContextType>;
  ClearinghouseSnapshot?: ClearinghouseSnapshotResolvers<ContextType>;
  CoolerLoan?: CoolerLoanResolvers<ContextType>;
  CoolerLoanRequest?: CoolerLoanRequestResolvers<ContextType>;
  DefundEvent?: DefundEventResolvers<ContextType>;
  ExtendLoanEvent?: ExtendLoanEventResolvers<ContextType>;
  Int8?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  RebalanceEvent?: RebalanceEventResolvers<ContextType>;
  RepayLoanEvent?: RepayLoanEventResolvers<ContextType>;
  RequestLoanEvent?: RequestLoanEventResolvers<ContextType>;
  RescindLoanRequestEvent?: RescindLoanRequestEventResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = CoolerLoansTypes.Context & BaseMeshContext;


const baseDir = pathModule.join(typeof __dirname === 'string' ? __dirname : '/', '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/cooler-loans/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const coolerLoansTransforms = [];
const additionalTypeDefs = [] as any[];
const coolerLoansHandler = new GraphqlHandler({
              name: "cooler-loans",
              config: {"endpoint":"https://api.studio.thegraph.com/query/28103/cooler-loans-goerli/0.0.1"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("cooler-loans"),
              logger: logger.child("cooler-loans"),
              importFn,
            });
coolerLoansTransforms[0] = new AutoPaginationTransform({
                  apiName: "cooler-loans",
                  config: {"validateSchema":true},
                  baseDir,
                  cache,
                  pubsub,
                  importFn,
                  logger,
                });
sources[0] = {
          name: 'cooler-loans',
          handler: coolerLoansHandler,
          transforms: coolerLoansTransforms
        }
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      {
        document: CoolerLoanEventsDocument,
        get rawSDL() {
          return printWithCache(CoolerLoanEventsDocument);
        },
        location: 'CoolerLoanEventsDocument.graphql'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type CoolerLoanEventsQueryVariables = Exact<{
  startTimestamp: Scalars['BigInt'];
  beforeTimestamp: Scalars['BigInt'];
}>;


export type CoolerLoanEventsQuery = { claimDefaultedLoanEvents: Array<(
    Pick<ClaimDefaultedLoanEvent, 'blockNumber' | 'blockTimestamp' | 'collateralPrice' | 'collateralQuantityClaimed' | 'collateralValueClaimed' | 'date' | 'id' | 'secondsSinceExpiry' | 'transactionHash'>
    & { loan: Pick<CoolerLoan, 'id'> }
  )>, clearLoanRequestEvents: Array<(
    Pick<ClearLoanRequestEvent, 'blockNumber' | 'blockTimestamp' | 'date' | 'id' | 'transactionHash'>
    & { loan: Pick<CoolerLoan, 'borrower' | 'collateral' | 'collateralToken' | 'cooler' | 'createdBlock' | 'createdTimestamp' | 'createdTransaction' | 'debtToken' | 'expiryTimestamp' | 'hasCallback' | 'id' | 'interest' | 'lender' | 'loanId' | 'principal'> }
  )>, defundEvents: Array<(
    Pick<DefundEvent, 'amount' | 'blockNumber' | 'blockTimestamp' | 'clearinghouse' | 'date' | 'id' | 'transactionHash'>
    & { clearinghouseSnapshot: Pick<ClearinghouseSnapshot, 'blockNumber' | 'blockTimestamp' | 'clearinghouse' | 'daiBalance' | 'date' | 'id' | 'interestReceivables' | 'isActive' | 'nextRebalanceTimestamp' | 'principalReceivables' | 'sDaiBalance' | 'sDaiInDaiBalance' | 'treasuryDaiBalance' | 'treasurySDaiBalance' | 'treasurySDaiInDaiBalance'> }
  )>, extendLoanEvents: Array<(
    Pick<ExtendLoanEvent, 'blockNumber' | 'blockTimestamp' | 'date' | 'expiryTimestamp' | 'id' | 'interestDue' | 'periods' | 'transactionHash'>
    & { loan: Pick<CoolerLoan, 'id'> }
  )>, rebalanceEvents: Array<(
    Pick<RebalanceEvent, 'amount' | 'blockNumber' | 'blockTimestamp' | 'clearinghouse' | 'date' | 'id' | 'transactionHash'>
    & { clearinghouseSnapshot: Pick<ClearinghouseSnapshot, 'blockNumber' | 'blockTimestamp' | 'clearinghouse' | 'daiBalance' | 'date' | 'id' | 'interestReceivables' | 'isActive' | 'nextRebalanceTimestamp' | 'principalReceivables' | 'sDaiBalance' | 'sDaiInDaiBalance' | 'treasuryDaiBalance' | 'treasurySDaiBalance' | 'treasurySDaiInDaiBalance'> }
  )>, repayLoanEvents: Array<(
    Pick<RepayLoanEvent, 'amountPaid' | 'blockNumber' | 'blockTimestamp' | 'collateralDeposited' | 'date' | 'id' | 'interestPayable' | 'principalPayable' | 'secondsToExpiry' | 'transactionHash'>
    & { loan: Pick<CoolerLoan, 'id'> }
  )> };


export const CoolerLoanEventsDocument = gql`
    query CoolerLoanEvents($startTimestamp: BigInt!, $beforeTimestamp: BigInt!) {
  claimDefaultedLoanEvents(
    where: {blockTimestamp_gte: $startTimestamp, blockTimestamp_lt: $beforeTimestamp}
    orderBy: blockTimestamp
    orderDirection: asc
  ) {
    blockNumber
    blockTimestamp
    collateralPrice
    collateralQuantityClaimed
    collateralValueClaimed
    date
    id
    secondsSinceExpiry
    transactionHash
    loan {
      id
    }
  }
  clearLoanRequestEvents(
    where: {blockTimestamp_gte: $startTimestamp, blockTimestamp_lt: $beforeTimestamp}
    orderBy: blockTimestamp
    orderDirection: asc
  ) {
    blockNumber
    blockTimestamp
    date
    id
    transactionHash
    loan {
      borrower
      collateral
      collateralToken
      cooler
      createdBlock
      createdTimestamp
      createdTransaction
      debtToken
      expiryTimestamp
      hasCallback
      id
      interest
      lender
      loanId
      principal
    }
  }
  defundEvents(
    where: {blockTimestamp_gte: $startTimestamp, blockTimestamp_lt: $beforeTimestamp}
    orderBy: blockTimestamp
    orderDirection: asc
  ) {
    amount
    blockNumber
    blockTimestamp
    clearinghouse
    clearinghouseSnapshot {
      blockNumber
      blockTimestamp
      clearinghouse
      daiBalance
      date
      id
      interestReceivables
      isActive
      nextRebalanceTimestamp
      principalReceivables
      sDaiBalance
      sDaiInDaiBalance
      treasuryDaiBalance
      treasurySDaiBalance
      treasurySDaiInDaiBalance
    }
    date
    id
    transactionHash
  }
  extendLoanEvents(
    where: {blockTimestamp_gte: $startTimestamp, blockTimestamp_lt: $beforeTimestamp}
    orderBy: blockTimestamp
    orderDirection: asc
  ) {
    blockNumber
    blockTimestamp
    date
    expiryTimestamp
    id
    interestDue
    periods
    transactionHash
    loan {
      id
    }
  }
  rebalanceEvents(
    where: {blockTimestamp_gte: $startTimestamp, blockTimestamp_lt: $beforeTimestamp}
    orderBy: blockTimestamp
    orderDirection: asc
  ) {
    amount
    blockNumber
    blockTimestamp
    clearinghouse
    clearinghouseSnapshot {
      blockNumber
      blockTimestamp
      clearinghouse
      daiBalance
      date
      id
      interestReceivables
      isActive
      nextRebalanceTimestamp
      principalReceivables
      sDaiBalance
      sDaiInDaiBalance
      treasuryDaiBalance
      treasurySDaiBalance
      treasurySDaiInDaiBalance
    }
    date
    id
    transactionHash
  }
  repayLoanEvents(
    where: {blockTimestamp_gte: $startTimestamp, blockTimestamp_lt: $beforeTimestamp}
    orderBy: blockTimestamp
    orderDirection: asc
  ) {
    amountPaid
    blockNumber
    blockTimestamp
    collateralDeposited
    date
    id
    interestPayable
    principalPayable
    secondsToExpiry
    transactionHash
    loan {
      id
    }
  }
}
    ` as unknown as DocumentNode<CoolerLoanEventsQuery, CoolerLoanEventsQueryVariables>;


export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    CoolerLoanEvents(variables: CoolerLoanEventsQueryVariables, options?: C): Promise<CoolerLoanEventsQuery> {
      return requester<CoolerLoanEventsQuery, CoolerLoanEventsQueryVariables>(CoolerLoanEventsDocument, variables, options) as Promise<CoolerLoanEventsQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;