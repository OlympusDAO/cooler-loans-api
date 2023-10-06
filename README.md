# Cooler Loans API

## Purpose

This repository contains the source code for middleware that will provide time-series data related to Cooler Loans.

## Design

This repository deploys two API endpoints:

- `generate`

  - Generates daily snapshots for Cooler Loans
  - A Google Cloud Function (with a periodic trigger) determines the previous date for which the snapshot was generated, and generates from that day until the current day.
  - The snapshots are stored in Google Firestore

- `get`

  - Fetches the daily snapshots for the given `startDate` and `beforeDate`

## Developer

### Environment

- Install JDK 11+, which is required for the firestore emulator
  - On Mac:
    - Install OpenJDK: `brew install openjdk@11`
    - Let the system know where OpenJDK 11 is installed: `sudo ln -sfn /opt/homebrew/opt/openjdk@11/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-11.jdk`
    - Switch to OpenJDK 11 by default: `/usr/libexec/java_home -v 11`
- Install the firebase emulator
  - `gcloud emulators firestore start`

### Testing

- Run the firestore emulator: `yarn firestore:start`
- `yarn test`

### Rebuild Snapshots

If the daily snapshots need to be rebuilt (e.g. change in the subgraph or the snapshot structure), simply delete the `snapshots` collection in the GCP project's Firestore section.

This can alternatively be achieved using the `firebase` CLI:

`firebase firestore:delete --recursive "/snapshots" -P <GCP PROJECT>`

### OpenAPI

REST API clients can utilise the `openapi/openapi.yml` file to generate typings. The schema, contained in `openapi/snapshot.yaml` is regenerated with the `yarn codegen` command.
