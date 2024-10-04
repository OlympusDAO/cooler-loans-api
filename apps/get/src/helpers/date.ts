export const isISO8601DateString = (dateString: string) => {
  return dateString.match(/^\d{4}-\d{2}-\d{2}$/) !== null;
};
