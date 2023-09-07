export const getISO8601DateString = (date: Date) => {
  return date.toISOString().split("T")[0];
};

export const isISO8601DateString = (dateString: string) => {
  return dateString.match(/^\d{4}-\d{2}-\d{2}$/) !== null;
};

export const adjustDate = (date: Date, days: number) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

export const setMidnight = (date: Date) => {
  const newDate = new Date(date);
  newDate.setUTCHours(0, 0, 0, 0);
  return newDate;
};
