import { request } from "graphql-request";

import { CoolerLoanEventsDocument, CoolerLoanEventsQuery } from "../../generated/graphql";
import { getISO8601DateString, getTimestampSeconds } from "../../helpers/dateHelper";
import {
  ClaimDefaultedLoanEventOptional,
  ClearinghouseSnapshotOptional,
  ClearLoanRequestEventOptional,
  DefundEventOptional,
  ExtendLoanEventOptional,
  RebalanceEventOptional,
  RepayLoanEventOptional,
  SubgraphData,
} from "../../types/subgraph";

export const getData = async (endpointUrl: string, startDate: Date, beforeDate: Date): Promise<SubgraphData> => {
  const FUNC = "getData";
  // Fetch events
  console.log(`${FUNC}: Fetching events from ${startDate.toISOString()} to ${beforeDate.toISOString()}`);
  const eventData: CoolerLoanEventsQuery = await request({
    url: endpointUrl,
    document: CoolerLoanEventsDocument,
    variables: {
      startTimestamp: getTimestampSeconds(startDate),
      beforeTimestamp: getTimestampSeconds(beforeDate),
    },
  });

  /**
   * Clearinghouse Snapshots
   */
  const clearinghouseSnapshotsArray: ClearinghouseSnapshotOptional[] = [];

  eventData.defundEvents.forEach((defundEvent: DefundEventOptional) => {
    clearinghouseSnapshotsArray.push(defundEvent.clearinghouseSnapshot);
  });
  console.log(`${FUNC}: fetched ${eventData.defundEvents.length} defund events`);

  eventData.rebalanceEvents.forEach((rebalanceEvent: RebalanceEventOptional) => {
    clearinghouseSnapshotsArray.push(rebalanceEvent.clearinghouseSnapshot);
  });
  console.log(`${FUNC}: fetched ${eventData.rebalanceEvents.length} rebalance events`);

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
  console.log(`${FUNC}: fetched ${creationEventsArray.length} loan creation events`);

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
  console.log(`${FUNC}: fetched ${repaymentEventsArray.length} loan repayment events`);

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
  console.log(`${FUNC}: fetched ${claimDefaultedEventsArray.length} loan default claim events`);

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
  console.log(`${FUNC}: fetched ${extendEventsArray.length} loan extension events`);

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
