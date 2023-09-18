# Cooler Loans API

## Purpose

This repository contains the source code for middleware that will provide time-series data related to Cooler Loans.

## Design

TODO

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

### OpenAPI

REST API clients can utilise the `openapi.yml` file to generate typings. The schema, contained in `snapshot.jsonschema` is regenerated with the `yarn codegen` command.
