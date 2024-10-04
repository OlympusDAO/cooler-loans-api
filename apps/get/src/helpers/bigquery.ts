import { BigQuery, Table } from "@google-cloud/bigquery";

// TODO
// [ ] Fetch loans from BigQuery
// [ ] Fetch snapshots from BigQuery

export const getTable = (datasetId: string, tableId: string): Table => {
  const bigQuery = new BigQuery();
  const dataset = bigQuery.dataset(datasetId);
  return dataset.table(tableId);
};
