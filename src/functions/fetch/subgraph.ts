import {
  ClaimDefaultedLoanEvent,
  ClearinghouseSnapshot,
  ClearLoanRequestEvent,
  ExtendLoanEvent,
  getBuiltGraphSDK,
  RepayLoanEvent,
} from "../../../.graphclient";
import { getISO8601DateString, getTimestampSeconds } from "../../helpers/dateHelper";

// A number of the entity properties are required, but we don't include them in the query, so they are omitted here. (Else we get linting errors.)
export type ClearinghouseSnapshotOptional = Omit<ClearinghouseSnapshot, "rebalanceEvents" | "defundEvents">;
export type ClearLoanRequestEventOptional = Omit<ClearLoanRequestEvent, "request" | "loan">;
export type RepayLoanEventOptional = Omit<RepayLoanEvent, "loan">;
export type ClaimDefaultedLoanEventOptional = Omit<ClaimDefaultedLoanEvent, "loan">;
export type ExtendLoanEventOptional = Omit<ExtendLoanEvent, "loan">;

export type SubgraphData = {
  clearinghouseSnapshots: {
    [key: string]: ClearinghouseSnapshotOptional[];
  };
  creationEvents: {
    [key: string]: ClearLoanRequestEventOptional[];
  };
  repaymentEvents: {
    [key: string]: RepayLoanEventOptional[];
  };
  defaultedClaimEvents: {
    [key: string]: ClaimDefaultedLoanEventOptional[];
  };
  extendEvents: {
    [key: string]: ExtendLoanEventOptional[];
  };
};

export const getData = async (startDate: Date, beforeDate: Date): Promise<SubgraphData> => {
  const sdk = getBuiltGraphSDK();

  // Fetch events
  const result = await sdk.CoolerLoans({
    startTimestamp: getTimestampSeconds(startDate),
    beforeTimestamp: getTimestampSeconds(beforeDate),
  });

  // TODO Fetch loans up to beforeDate

  /**
   * Clearinghouse Snapshots
   */
  const clearinghouseSnapshotsArray: ClearinghouseSnapshotOptional[] = [];

  result.defundEvents.forEach(defundEvent => {
    clearinghouseSnapshotsArray.push(defundEvent.clearinghouseSnapshot);
  });

  result.rebalanceEvents.forEach(rebalanceEvent => {
    clearinghouseSnapshotsArray.push(rebalanceEvent.clearinghouseSnapshot);
  });

  // Convert to a map with the date in YYYY-MM-DD format as the key and an array of snapshots as the values
  const clearinghouseSnapshots = clearinghouseSnapshotsArray.reduce(
    (accumulator, currentValue) => {
      const dateString: string = getISO8601DateString(new Date(currentValue.date));
      if (!accumulator[dateString]) {
        accumulator[dateString] = [];
      }

      accumulator[dateString].push(currentValue);
      return accumulator;
    },
    {} as { [key: string]: ClearinghouseSnapshotOptional[] },
  );

  /**
   * Creation Events
   */
  const creationEventsArray: ClearLoanRequestEventOptional[] = result.clearLoanRequestEvents;

  // Convert to a map with the date in YYYY-MM-DD format as the key and an array of events as the values
  const creationEvents = creationEventsArray.reduce(
    (accumulator, currentValue) => {
      const dateString: string = getISO8601DateString(new Date(currentValue.date));
      if (!accumulator[dateString]) {
        accumulator[dateString] = [];
      }

      accumulator[dateString].push(currentValue);
      return accumulator;
    },
    {} as { [key: string]: ClearLoanRequestEventOptional[] },
  );

  /**
   * Repayment Events
   */
  const repaymentEventsArray: RepayLoanEventOptional[] = result.repayLoanEvents;

  // Convert to a map with the date in YYYY-MM-DD format as the key and an array of events as the values
  const repaymentEvents = repaymentEventsArray.reduce(
    (accumulator, currentValue) => {
      const dateString: string = getISO8601DateString(new Date(currentValue.date));
      if (!accumulator[dateString]) {
        accumulator[dateString] = [];
      }

      accumulator[dateString].push(currentValue);
      return accumulator;
    },
    {} as { [key: string]: RepayLoanEventOptional[] },
  );

  /**
   * Claim Default Events
   */
  const claimDefaultedEventsArray: ClaimDefaultedLoanEventOptional[] = result.claimDefaultedLoanEvents;

  // Convert to a map with the date in YYYY-MM-DD format as the key and an array of events as the values
  const claimDefaultedEvents = claimDefaultedEventsArray.reduce(
    (accumulator, currentValue) => {
      const dateString: string = getISO8601DateString(new Date(currentValue.date));
      if (!accumulator[dateString]) {
        accumulator[dateString] = [];
      }

      accumulator[dateString].push(currentValue);
      return accumulator;
    },
    {} as { [key: string]: ClaimDefaultedLoanEventOptional[] },
  );

  /**
   * Extend Events
   */
  const extendEventsArray: ExtendLoanEventOptional[] = result.extendLoanEvents;

  // Convert to a map with the date in YYYY-MM-DD format as the key and an array of events as the values
  const extendEvents = extendEventsArray.reduce(
    (accumulator, currentValue) => {
      const dateString: string = getISO8601DateString(new Date(currentValue.date));
      if (!accumulator[dateString]) {
        accumulator[dateString] = [];
      }

      accumulator[dateString].push(currentValue);
      return accumulator;
    },
    {} as { [key: string]: ExtendLoanEventOptional[] },
  );

  return {
    clearinghouseSnapshots: clearinghouseSnapshots,
    creationEvents: creationEvents,
    defaultedClaimEvents: claimDefaultedEvents,
    repaymentEvents: repaymentEvents,
    extendEvents: extendEvents,
  };
};
