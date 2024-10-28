import * as gcp from "@pulumi/gcp";
import * as pulumi from "@pulumi/pulumi";
import { mkdirSync, writeFileSync } from "fs";
import * as fsExtra from "fs-extra";
import { join } from "path";

const prepareTemporaryDirectory = (name: string, distDirectory: string) => {
  // Create a temporary directory
  const tempDirectory = join("../../tmp", name);
  mkdirSync(tempDirectory, { recursive: true });
  console.log(`Created temporary directory ${tempDirectory}`);

  // Construct a dummy package.json
  const packageJson = {
    name,
    main: "dist/index.js",
  };

  // Write a package.json to the temporary directory
  writeFileSync(join(tempDirectory, "package.json"), JSON.stringify(packageJson, null, 2));

  // Copy the dist directory to the temporary directory
  fsExtra.copySync(distDirectory, join(tempDirectory, "dist"));

  return tempDirectory;
};

export const createGenerateFunction = (
  pulumiConfig: pulumi.Config,
  gcpConfig: pulumi.Config,
  functionAssetsBucket: gcp.storage.Bucket,
  storageBucket: gcp.storage.Bucket,
  bigQueryDataset: gcp.bigquery.Dataset,
  bigQuerySnapshotTable: gcp.bigquery.Table,
  bigQueryLoanSnapshotTable: gcp.bigquery.Table,
  serviceCloudBuild: gcp.projects.Service,
  serviceCloudFunctions: gcp.projects.Service,
  serviceCloudScheduler: gcp.projects.Service,
  serviceBigQuery: gcp.projects.Service,
) => {
  // Create a temporary directory to store the function code
  // Google Cloud Functions struggles with bundling the internal packages, so this is a workaround
  const tempDirectory = prepareTemporaryDirectory("generate", "../../apps/generate/dist");

  // Archive the function code in the bucket
  const functionBucketObject = new gcp.storage.BucketObject(
    `generate`, // Lowercase to avoid issues with GCS
    {
      bucket: functionAssetsBucket.name,
      source: new pulumi.asset.AssetArchive({
        ".": new pulumi.asset.FileArchive(tempDirectory),
      }),
    },
    {
      dependsOn: [functionAssetsBucket],
    },
  );

  // Create the function
  const cloudFunction = new gcp.cloudfunctions.Function(
    `generate`,
    {
      sourceArchiveBucket: functionAssetsBucket.name,
      sourceArchiveObject: functionBucketObject.name,
      triggerHttp: true,
      runtime: "nodejs18",
      entryPoint: "handleGenerate",
      timeout: 540,
      maxInstances: 1,
      availableMemoryMb: 1024,
      environmentVariables: {
        SNAPSHOT_BUCKET: storageBucket.name,
        GCP_PROJECT: gcpConfig.require("project"),
        BIGQUERY_DATASET: bigQueryDataset.datasetId,
        BIGQUERY_SNAPSHOT_TABLE: bigQuerySnapshotTable.tableId,
        BIGQUERY_LOAN_SNAPSHOT_TABLE: bigQueryLoanSnapshotTable.tableId,
        CACHE_PROJECT: pulumiConfig.require("cacheProject"),
        CACHE_BIGQUERY_DATASET: pulumiConfig.require("cacheBigQueryDataset"),
      },
    },
    {
      dependsOn: [
        functionBucketObject,
        serviceCloudBuild,
        serviceCloudFunctions,
        storageBucket,
        bigQueryDataset,
        bigQuerySnapshotTable,
        bigQueryLoanSnapshotTable,
      ],
    },
  );

  /**
   * Scheduling: Cloud Scheduler
   */
  new gcp.cloudscheduler.Job(
    `generate`,
    {
      schedule: "0 */4 * * *", // Every 4 hours
      timeZone: "UTC",
      httpTarget: {
        httpMethod: "GET",
        uri: cloudFunction.httpsTriggerUrl,
        oidcToken: {
          serviceAccountEmail: cloudFunction.serviceAccountEmail,
        },
      },
    },
    {
      dependsOn: [cloudFunction, serviceCloudScheduler],
    },
  );

  // Allow Cloud Scheduler to invoke the Cloud Function
  new gcp.cloudfunctions.FunctionIamMember(
    `generate-invoker`,
    {
      project: cloudFunction.project,
      region: cloudFunction.region,
      cloudFunction: cloudFunction.name,
      role: "roles/cloudfunctions.invoker",
      member: pulumi.interpolate`serviceAccount:${gcp.config.project}@appspot.gserviceaccount.com`,
    },
    {
      dependsOn: [cloudFunction],
    },
  );

  // Allow the generate function to access the subgraph-cache project
  new gcp.projects.IAMMember(
    `cooler-loans-api-generate`,
    {
      project: pulumiConfig.require("cacheProject"),
      role: "roles/bigquery.jobUser",
      member: pulumi.interpolate`serviceAccount:${cloudFunction.serviceAccountEmail}`,
    },
    {
      dependsOn: [cloudFunction, serviceBigQuery],
    },
  );

  // Allow the generate function to access the subgraph-cache BigQuery dataset
  new gcp.bigquery.DatasetIamMember(
    `cooler-loans-api-generate`,
    {
      project: pulumiConfig.require("cacheProject"),
      datasetId: pulumiConfig.require("cacheBigQueryDataset"),
      role: "roles/bigquery.dataViewer",
      member: pulumi.interpolate`serviceAccount:${cloudFunction.serviceAccountEmail}`,
    },
    {
      dependsOn: [cloudFunction, serviceBigQuery],
    },
  );

  // Allow the generate function to access the subgraph-cache GCS bucket
  new gcp.storage.BucketIAMMember(
    `cooler-loans-api-generate`,
    {
      bucket: pulumiConfig.require("cacheBucket"),
      role: "roles/storage.objectViewer",
      member: pulumi.interpolate`serviceAccount:${cloudFunction.serviceAccountEmail}`,
    },
    {
      dependsOn: [cloudFunction],
    },
  );

  return cloudFunction;
};

export const createGetFunction = (
  gcpConfig: pulumi.Config,
  bigQueryDataset: gcp.bigquery.Dataset,
  bigQueryLoanSnapshotTable: gcp.bigquery.Table,
  bigQuerySnapshotTable: gcp.bigquery.Table,
  functionAssetsBucket: gcp.storage.Bucket,
  serviceCloudBuild: gcp.projects.Service,
  serviceCloudFunctions: gcp.projects.Service,
  serviceBigQuery: gcp.projects.Service,
) => {
  // Create a temporary directory to store the function code
  // Google Cloud Functions struggles with bundling the internal packages, so this is a workaround
  const tempDirectory = prepareTemporaryDirectory("get", "../../apps/get/dist");

  // Archive the function code in the bucket
  const functionBucketObject = new gcp.storage.BucketObject(
    `get`, // Lowercase to avoid issues with GCS
    {
      bucket: functionAssetsBucket.name,
      source: new pulumi.asset.AssetArchive({
        ".": new pulumi.asset.FileArchive(tempDirectory),
      }),
    },
    {
      dependsOn: [functionAssetsBucket],
    },
  );

  // Create the function
  const cloudFunction = new gcp.cloudfunctions.Function(
    `get`,
    {
      sourceArchiveBucket: functionAssetsBucket.name,
      sourceArchiveObject: functionBucketObject.name,
      triggerHttp: true,
      runtime: "nodejs18",
      entryPoint: "app",
      availableMemoryMb: 512,
      environmentVariables: {
        GCP_PROJECT: gcpConfig.require("project"),
        BIGQUERY_DATASET: bigQueryDataset.datasetId,
        BIGQUERY_LOAN_SNAPSHOT_TABLE: bigQueryLoanSnapshotTable.tableId,
        BIGQUERY_SNAPSHOT_TABLE: bigQuerySnapshotTable.tableId,
      },
    },
    {
      dependsOn: [
        functionBucketObject,
        bigQueryDataset,
        bigQueryLoanSnapshotTable,
        bigQuerySnapshotTable,
        serviceCloudBuild,
        serviceCloudFunctions,
        serviceBigQuery,
      ],
    },
  );

  // Allow the function to be called by the public
  new gcp.cloudfunctions.FunctionIamMember(
    `get-invoker`,
    {
      project: cloudFunction.project,
      region: cloudFunction.region,
      cloudFunction: cloudFunction.name,
      role: "roles/cloudfunctions.invoker",
      member: "allUsers",
    },
    {
      dependsOn: [cloudFunction],
    },
  );

  return cloudFunction;
};
