# Cooler Loans API

## Purpose

This repository contains the source code for middleware that will provide time-series data related to Cooler Loans.

## Design

This repository deploys two API endpoints:

- `generate`

  - Generates daily snapshots for Cooler Loans.
    - Each snapshot is based on the previous day's snapshot (where applicable), in combination with the loan events (e.g. repayment) from that day.
    - Loan events are processed in the order that they occur.
  - A Google Cloud Function (with a periodic trigger) determines the previous date for which the snapshot was generated, and generates from that day onwards.
  - The snapshots are stored in Google Cloud Storage and exposed through a BigQuery database.

- `get`

  - Fetches the daily snapshots for the given `startDate` and `beforeDate`

## Developer

### Setup

- Run `yarn` to install the dependencies of the whole project

### Testing

- `yarn test`

### Deployment

Pulumi is used to deploy the infrastructure.

To deploy:

- Build the project: `yarn run build`
- `cd packages/infrastructure`
- `pulumi up --stack <STACK_NAME>`

### Rebuild Snapshots

If the daily snapshots need to be rebuilt (e.g. change in the subgraph or the snapshot structure), simply delete the directories in the Google Cloud Storage bucket that corresponds to the environment.

### OpenAPI

REST API clients can utilise the `apps/get/openapi/openapi.yml` file to generate typings. The schema, contained in `apps/get/openapi/snapshot.yaml` is regenerated with the `yarn run build` command.
