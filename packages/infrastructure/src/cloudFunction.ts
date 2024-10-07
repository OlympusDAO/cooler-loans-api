import * as gcp from "@pulumi/gcp";
import * as pulumi from "@pulumi/pulumi";

export const createGenerateFunction = (
  pulumiConfig: pulumi.Config,
  functionAssetsBucket: gcp.storage.Bucket,
  serviceCloudFunctions: gcp.projects.Service,
  serviceCloudScheduler: gcp.projects.Service,
) => {
  // Archive the function code in the bucket
  const functionBucketObject = new gcp.storage.BucketObject(
    `generate`, // Lowercase to avoid issues with GCS
    {
      bucket: functionAssetsBucket.name,
      source: new pulumi.asset.AssetArchive({
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
      environmentVariables: {},
    },
    {
      dependsOn: [functionBucketObject, serviceCloudFunctions],
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
