# Subgraph Cache Types

This package generates TypeScript types from the BigQuery schema of the subgraph-cache dataset.

## Environment Variables

- `CACHE_PROJECT`: The Google Cloud project ID for the subgraph-cache dataset.
- `CACHE_BIGQUERY_DATASET`: The BigQuery dataset ID for the subgraph-cache dataset.

These can be retrieved from the [Pulumi stack configuration](../infrastructure/Pulumi.prod.yaml).
