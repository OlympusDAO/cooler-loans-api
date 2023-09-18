import { getBuiltGraphSDK } from "../../../.graphclient";
import { getISO8601DateString, getTimestampSeconds } from "../../helpers/dateHelper";
import {
  ClaimDefaultedLoanEventOptional,
  ClearinghouseSnapshotOptional,
  ClearLoanRequestEventOptional,
  ExtendLoanEventOptional,
  RepayLoanEventOptional,
  SubgraphData,
} from "../../types/subgraph";

export const getData = async (startDate: Date, beforeDate: Date): Promise<SubgraphData> => {
  const sdk = getBuiltGraphSDK();

  // Fetch events
  const eventData = await sdk.CoolerLoanEvents({
    startTimestamp: getTimestampSeconds(startDate),
    beforeTimestamp: getTimestampSeconds(beforeDate),
  });

  /**
   * Clearinghouse Snapshots
   */
  const clearinghouseSnapshotsArray: ClearinghouseSnapshotOptional[] = [];

  eventData.defundEvents.forEach(defundEvent => {
    clearinghouseSnapshotsArray.push(defundEvent.clearinghouseSnapshot);
  });

  eventData.rebalanceEvents.forEach(rebalanceEvent => {
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
  const creationEventsArray: ClearLoanRequestEventOptional[] = eventData.clearLoanRequestEvents;

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
  const repaymentEventsArray: RepayLoanEventOptional[] = eventData.repayLoanEvents;

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
  const claimDefaultedEventsArray: ClaimDefaultedLoanEventOptional[] = eventData.claimDefaultedLoanEvents;

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
  const extendEventsArray: ExtendLoanEventOptional[] = eventData.extendLoanEvents;

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
