import * as gcp from "@pulumi/gcp";
import * as pulumi from "@pulumi/pulumi";
import { readFileSync } from "fs";

import { createDummyFile } from "./bigQuery";
import { createGenerateFunction } from "./cloudFunction";

const gcpConfig = new pulumi.Config("gcp");
const pulumiConfig = new pulumi.Config();
const projectName = "cooler-loans-api";
const projectStackName = `${projectName}-${pulumi.getStack()}`;

/**
 * Enable services
 */
const serviceCloudBuild = new gcp.projects.Service("cloudbuild", {
  service: "cloudbuild.googleapis.com",
});
const serviceCloudFunctions = new gcp.projects.Service("cloudfunctions", {
  service: "cloudfunctions.googleapis.com",
});
const serviceCloudScheduler = new gcp.projects.Service("cloudscheduler", {
  service: "cloudscheduler.googleapis.com",
});
const serviceFirebase = new gcp.projects.Service("firebase", {
  service: "firebase.googleapis.com",
});
const serviceBigQuery = new gcp.projects.Service("bigquery", {
  service: "bigquery.googleapis.com",
});

/**
 * Create BigQuery dataset
 */
const bigQueryDataset = new gcp.bigquery.Dataset(
  projectName,
  {
    datasetId: projectName.replace(/-/g, "_"), // - is unsupported
  },
  {
    dependsOn: [serviceBigQuery],
  },
);
export const bigQueryDatasetId = bigQueryDataset.datasetId;

/**
 * Create a GCS bucket to store the snapshot data
 */
const snapshotDataBucket = new gcp.storage.Bucket(`${projectStackName}-snapshot-data`, {
  location: "us-central1",
});
export const snapshotDataBucketName = snapshotDataBucket.name;

/**
 * Create BigQuery tables
 */
const bigQueryLoanSnapshotSchema = readFileSync("../bigquery-codegen/schemas/loanSnapshot.json", "utf-8");
const bigQueryLoanSnapshotSourceUriPrefix = snapshotDataBucket.url.apply(url => `${url}/loanSnapshots`);
const bigQueryLoanSnapshotSourceUri = snapshotDataBucket.url.apply(url => `${url}/loanSnapshots/*`);
const bigQueryLoanSnapshotDummyFile = createDummyFile(snapshotDataBucket, "loanSnapshots", "./data/loanSnapshot.json");

const bigQueryLoanSnapshotTable = new gcp.bigquery.Table(
  "loanSnapshots",
  {
    datasetId: bigQueryDataset.datasetId,
    tableId: "loanSnapshots",
    externalDataConfiguration: {
      sourceFormat: "NEWLINE_DELIMITED_JSON",
      sourceUris: [bigQueryLoanSnapshotSourceUri],
      autodetect: false,
      schema: bigQueryLoanSnapshotSchema,
      hivePartitioningOptions: {
        mode: "AUTO",
        sourceUriPrefix: bigQueryLoanSnapshotSourceUriPrefix,
      },
    },
  },
  {
    dependsOn: [bigQueryDataset, bigQueryLoanSnapshotDummyFile],
  },
);
export const bigQueryLoanSnapshotTableId = bigQueryLoanSnapshotTable.tableId;

const bigQuerySnapshotSchema = readFileSync("../bigquery-codegen/schemas/snapshot.json", "utf-8");
const bigQuerySnapshotSourceUriPrefix = snapshotDataBucket.url.apply(url => `${url}/snapshots`);
const bigQuerySnapshotSourceUri = snapshotDataBucket.url.apply(url => `${url}/snapshots/*`);
const bigQuerySnapshotDummyFile = createDummyFile(snapshotDataBucket, "snapshots", "./data/snapshot.json");

const bigQuerySnapshotTable = new gcp.bigquery.Table(
  "snapshots",
  {
    datasetId: bigQueryDataset.datasetId,
    tableId: "snapshots",
    externalDataConfiguration: {
      sourceFormat: "NEWLINE_DELIMITED_JSON",
      sourceUris: [bigQuerySnapshotSourceUri],
      autodetect: false,
      schema: bigQuerySnapshotSchema,
      hivePartitioningOptions: {
        mode: "AUTO",
        sourceUriPrefix: bigQuerySnapshotSourceUriPrefix,
      },
    },
  },
  {
    dependsOn: [bigQueryDataset, bigQuerySnapshotDummyFile],
  },
);
export const bigQuerySnapshotTableId = bigQuerySnapshotTable.tableId;

/**
 * Create a GCS bucket to store the function code
 */
const functionAssetsBucket = new gcp.storage.Bucket(`${projectStackName}-function-assets`, {
  location: "us-central1",
});

/**
 * Deploy Cloud Function - Generate daily snapshots
 */
const functionGenerate = createGenerateFunction(
  pulumiConfig,
  gcpConfig,
  functionAssetsBucket,
  snapshotDataBucket,
  bigQueryDataset,
  bigQuerySnapshotTable,
  bigQueryLoanSnapshotTable,
  serviceCloudBuild,
  serviceCloudFunctions,
  serviceCloudScheduler,
  serviceBigQuery,
);

// /**
//  * Deploy Cloud Function - Fetch
//  */
// const functionGet = createGetFunction(
//   bigQueryDataset,
//   bigQueryLoanSnapshotTable,
//   bigQuerySnapshotTable,
//   functionAssetsBucket,
//   serviceCloudFunctions,
//   serviceBigQuery,
// );

// /**
//  * Firebase
//  *
//  * We utilise Firebase hosting to provide a static URL to the Cloud Function.
//  */

// // Deploy a Firebase Hosting site, so that we can obtain a static URL
// const firebaseProject = new gcp.firebase.Project(
//   projectName,
//   {
//     project: gcpConfig.require("project"),
//   },
//   {
//     dependsOn: [serviceFirebase],
//   },
// );

// const firebaseHostingSite = new gcp.firebase.HostingSite(
//   projectName,
//   {
//     project: firebaseProject.project,
//     siteId: `olympus-${projectStackName}`, // Will end up as olympus-cooler-loans-api-<stack>.web.app
//   },
//   {
//     dependsOn: [firebaseProject],
//   },
// );

// const firebaseSiteId = firebaseHostingSite.siteId;
// if (!firebaseSiteId) {
//   throw new Error("Firebase Hosting site ID is undefined");
// }

// const firebaseSiteIdInput: pulumi.Input<string> = firebaseSiteId.apply(str => `${str}`);

// // Rewrite all requests to the Cloud Function
// const firebaseHostingVersion = new gcp.firebase.HostingVersion(
//   projectName,
//   {
//     siteId: firebaseSiteIdInput,
//     config: {
//       /**
//        * Firebase hosting does not forward CORS headers to the Cloud Function
//        * when using redirects, so we need to do a rewrite.
//        *
//        * Pulumi's implementation does not support specifying the region of the
//        * function (or does not discover the region accurately), so we need to
//        * ensure that both the Cloud Function and Firebase Hosting are in the
//        * default region, which is us-central1.
//        */
//       rewrites: [
//         {
//           glob: "**",
//           function: functionGet.name,
//         },
//       ],
//     },
//   },
//   {
//     dependsOn: [firebaseHostingSite, functionGet],
//   },
// );

// new gcp.firebase.HostingRelease(
//   projectName,
//   {
//     siteId: firebaseSiteIdInput,
//     versionName: firebaseHostingVersion.name,
//     message: "Cloud Functions integration",
//   },
//   {
//     dependsOn: [firebaseHostingVersion],
//   },
// );

// /**
//  * Alerts
//  */
// // Notification channel
// const notificationEmail = new gcp.monitoring.NotificationChannel("email", {
//   displayName: "Email",
//   type: "email",
//   labels: {
//     email_address: pulumiConfig.requireSecret("alertEmail"),
//   },
// });

// // High Latency
// new gcp.monitoring.AlertPolicy(
//   "get-high-latency",
//   {
//     displayName: `${projectName} - Get - High Request Latency`,
//     userLabels: {},
//     conditions: [
//       {
//         displayName: `50% above 5s Latency`,
//         conditionThreshold: {
//           filter: pulumi.interpolate`
//             resource.type = "cloud_function" AND
//             resource.labels.function_name = "${functionGet.name}" AND
//             metric.type = "cloudfunctions.googleapis.com/function/execution_times"
//             `,
//           aggregations: [
//             {
//               alignmentPeriod: "300s",
//               perSeriesAligner: "ALIGN_PERCENTILE_99",
//             },
//           ],
//           comparison: "COMPARISON_GT",
//           duration: "0s",
//           trigger: {
//             percent: 50,
//           },
//           thresholdValue: 30000000000, // 30 seconds in nanoseconds??
//         },
//       },
//     ],
//     alertStrategy: {
//       autoClose: "604800s",
//     },
//     combiner: "AND",
//     enabled: true,
//     notificationChannels: [notificationEmail.name],
//   },
//   {
//     dependsOn: [functionGet, notificationEmail],
//   },
// );

// // HTTP Errors
// new gcp.monitoring.AlertPolicy(
//   "get-http-errors",
//   {
//     displayName: `${projectName} - Get - HTTP Errors`,
//     userLabels: {},
//     conditions: [
//       {
//         displayName: `Error Count`,
//         conditionThreshold: {
//           filter: pulumi.interpolate`
//             resource.type = "cloud_function" AND
//             resource.labels.function_name = "${functionGet.name}" AND
//             metric.type = "cloudfunctions.googleapis.com/function/execution_count" AND
//             metric.labels.status != "ok"
//             `,
//           aggregations: [
//             {
//               alignmentPeriod: "300s",
//               crossSeriesReducer: "REDUCE_NONE",
//               perSeriesAligner: "ALIGN_COUNT",
//             },
//           ],
//           comparison: "COMPARISON_GT",
//           duration: "0s",
//           trigger: {
//             count: 1,
//           },
//           thresholdValue: 5,
//         },
//       },
//     ],
//     alertStrategy: {
//       autoClose: "604800s",
//     },
//     combiner: "OR",
//     enabled: true,
//     notificationChannels: [notificationEmail.name],
//   },
//   {
//     dependsOn: [functionGet, notificationEmail],
//   },
// );

// new gcp.monitoring.AlertPolicy(
//   "generate-http-errors",
//   {
//     displayName: `${projectName} - Generate - HTTP Errors`,
//     userLabels: {},
//     conditions: [
//       {
//         displayName: `Error Count`,
//         conditionThreshold: {
//           filter: pulumi.interpolate`
//             resource.type = "cloud_function" AND
//             resource.labels.function_name = "${functionGenerate.name}" AND
//             metric.type = "cloudfunctions.googleapis.com/function/execution_count" AND
//             metric.labels.status != "ok"
//             `,
//           aggregations: [
//             {
//               alignmentPeriod: "300s",
//               crossSeriesReducer: "REDUCE_NONE",
//               perSeriesAligner: "ALIGN_COUNT",
//             },
//           ],
//           comparison: "COMPARISON_GT",
//           duration: "0s",
//           trigger: {
//             count: 1,
//           },
//           thresholdValue: 5,
//         },
//       },
//     ],
//     alertStrategy: {
//       autoClose: "604800s",
//     },
//     combiner: "OR",
//     enabled: true,
//     notificationChannels: [notificationEmail.name],
//   },
//   {
//     dependsOn: [functionGet, notificationEmail],
//   },
// );

// // Log Errors
// new gcp.monitoring.AlertPolicy(
//   "get-log-errors",
//   {
//     displayName: `${projectName} - Get - Log Errors`,
//     userLabels: {},
//     conditions: [
//       {
//         displayName: `Log contains error`,
//         conditionMatchedLog: {
//           filter: pulumi.interpolate`
//             resource.type = "cloud_function" AND
//             resource.labels.function_name = "${functionGet.name}" AND
//             textPayload =~ "error"
//             `,
//         },
//       },
//     ],
//     alertStrategy: {
//       notificationRateLimit: {
//         period: "3600s",
//       },
//       autoClose: "604800s",
//     },
//     combiner: "OR",
//     enabled: true,
//     notificationChannels: [notificationEmail.name],
//   },
//   {
//     dependsOn: [functionGet, notificationEmail],
//   },
// );

// new gcp.monitoring.AlertPolicy(
//   "generate-log-errors",
//   {
//     displayName: `${projectName} - Generate - Log Errors`,
//     userLabels: {},
//     conditions: [
//       {
//         displayName: `Log contains error`,
//         conditionMatchedLog: {
//           filter: pulumi.interpolate`
//             resource.type = "cloud_function" AND
//             resource.labels.function_name = "${functionGenerate.name}" AND
//             textPayload =~ "error"
//             `,
//         },
//       },
//     ],
//     alertStrategy: {
//       notificationRateLimit: {
//         period: "3600s",
//       },
//       autoClose: "604800s",
//     },
//     combiner: "OR",
//     enabled: true,
//     notificationChannels: [notificationEmail.name],
//   },
//   {
//     dependsOn: [functionGet, notificationEmail],
//   },
// );

/**
 * Exports
 */
export const generateHttpsUrl = functionGenerate.httpsTriggerUrl;
// export const getHttpsUrl = functionGet.httpsTriggerUrl;
// export const firebaseHostingUrl = firebaseHostingSite.defaultUrl;
