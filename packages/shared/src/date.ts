/**
 * Returns the date as an ISO8601 string in the format YYYY-MM-DD.
 *
 * @param date The date to convert
 * @returns The date as an ISO8601 string
 */
export const getISO8601DateString = (date: Date) => {
  return date.toISOString().split("T")[0];
};

/**
 * Checks if a string is a valid ISO8601 date string.
 *
 * @param dateString The string to check
 * @returns True if the string is a valid ISO8601 date string, false otherwise
 */
export const isISO8601DateString = (dateString: string) => {
  return dateString.match(/^\d{4}-\d{2}-\d{2}$/) !== null;
};

/**
 * Adjusts a date by a given number of days.
 *
 * @param date The date to adjust
 * @param days The number of days to adjust the date by
 * @returns The adjusted date
 */
export const adjustDate = (date: Date, days: number) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

/**
 * Sets the date to midnight.
 *
 * @param date The date to set to midnight
 * @returns The date set to midnight
 */
export const setMidnight = (date: Date) => {
  const newDate = new Date(date);
  newDate.setUTCHours(0, 0, 0);
  return newDate;
};

/**
 * Sets the date to before midnight.
 *
 * @param date The date to set to before midnight
 * @returns The date set to before midnight
 */
export const setBeforeMidnight = (date: Date) => {
  const newDate = new Date(date);
  newDate.setUTCHours(23, 59, 59, 999);
  return newDate;
};

/**
 * Returns the timestamp in seconds since the Unix epoch.
 *
 * @param date The date to get the timestamp for
 * @returns The timestamp in seconds since the Unix epoch
 */
export const getTimestampSeconds = (date: Date) => {
  return Math.floor(date.getTime() / 1000);
};
