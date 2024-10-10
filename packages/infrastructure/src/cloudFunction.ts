import * as gcp from "@pulumi/gcp";
import * as pulumi from "@pulumi/pulumi";

export const createGenerateFunction = (
  pulumiConfig: pulumi.Config,
  functionAssetsBucket: gcp.storage.Bucket,
  storageBucket: gcp.storage.Bucket,
  serviceCloudFunctions: gcp.projects.Service,
  serviceCloudScheduler: gcp.projects.Service,
  serviceBigQuery: gcp.projects.Service,
) => {
  // Archive the function code in the bucket
  const functionBucketObject = new gcp.storage.BucketObject(
    `generate`, // Lowercase to avoid issues with GCS
    {
      bucket: functionAssetsBucket.name,
      source: new pulumi.asset.AssetArchive({
        // TODO verify this path
        ".": new pulumi.asset.FileArchive("../../apps/generate/dist/"),
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
        CACHE_PROJECT: pulumiConfig.require("cacheProject"),
        CACHE_BIGQUERY_DATASET: pulumiConfig.require("cacheBigQueryDataset"),
      },
    },
    {
      dependsOn: [functionBucketObject, serviceCloudFunctions, storageBucket],
    },
  );

  /**
   * Scheduling: Cloud Scheduler
   */
  const schedulerJob = new gcp.cloudscheduler.Job(
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

  return cloudFunction;
};

export const createGetFunction = (
  bigQueryDataset: gcp.bigquery.Dataset,
  bigQueryLoanSnapshotTable: gcp.bigquery.Table,
  bigQuerySnapshotTable: gcp.bigquery.Table,
  functionAssetsBucket: gcp.storage.Bucket,
  serviceCloudFunctions: gcp.projects.Service,
  serviceBigQuery: gcp.projects.Service,
) => {
  // Archive the function code in the bucket
  const functionBucketObject = new gcp.storage.BucketObject(
    `get`, // Lowercase to avoid issues with GCS
    {
      bucket: functionAssetsBucket.name,
      source: new pulumi.asset.AssetArchive({
        // TODO verify this path
        ".": new pulumi.asset.FileArchive("../../apps/get/dist/"),
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
      entryPoint: "handleGet",
      availableMemoryMb: 512,
      environmentVariables: {
        BIGQUERY_DATASET: bigQueryDataset.datasetId,
        BIGQUERY_LOAN_SNAPSHOT_TABLE: bigQueryLoanSnapshotTable.tableId,
        BIGQUERY_SNAPSHOT_TABLE: bigQuerySnapshotTable.tableId,
      },
      // TODO enable open access?
    },
    {
      dependsOn: [
        functionBucketObject,
        bigQueryDataset,
        bigQueryLoanSnapshotTable,
        bigQuerySnapshotTable,
        serviceCloudFunctions,
        serviceBigQuery,
      ],
    },
  );

  return cloudFunction;
};
