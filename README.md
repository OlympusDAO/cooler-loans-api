# Cooler Loans API

## Purpose

This repository contains the source code for middleware that will provide time-series data related to Cooler Loans.

## Setup Environment

- Install JDK 11+, which is required for the firestore emulator
  - On Mac:
    - Install OpenJDK: `brew install openjdk@11`
    - Let the system know where OpenJDK 11 is installed: `sudo ln -sfn /opt/homebrew/opt/openjdk@11/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-11.jdk`
    - Switch to OpenJDK 11 by default: `/usr/libexec/java_home -v 11`
- Install the firebase emulator
  - `gcloud emulators firestore start`

## Testing

- Run the firestore emulator: `yarn firestore:start`
- `yarn test`
