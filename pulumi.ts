import * as gcp from "@pulumi/gcp";
import * as pulumi from "@pulumi/pulumi";
import cors from "cors";
import express from "express";

import { handleGenerate } from "./src/functions/generate";
import { handleGet } from "./src/functions/get";

const gcpConfig = new pulumi.Config("gcp");
const pulumiConfig = new pulumi.Config();
const projectName = "cooler-loans-api";
const projectStackName = `${projectName}-${pulumi.getStack()}`;

/**
 * Enable services
 */
const serviceFirestore = new gcp.projects.Service("firestore", {
  service: "firestore.googleapis.com",
});
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

/**
 * Create Firestore database
 */
new gcp.firestore.Database(
  "default",
  {
    name: "(default)",
    // us-central1 is not supported, so this is used instead
    locationId: "us-east1",
    type: "FIRESTORE_NATIVE",
  },
  {
    dependsOn: [serviceFirestore],
  },
);

/**
 * Deploy Cloud Function - Generate daily snapshots
 */
const functionGenerate = new gcp.cloudfunctions.HttpCallbackFunction(
  "generate",
  {
    runtime: "nodejs18",
    availableMemoryMb: 512,
    timeout: 300, // This ensures that the function ends before the next scheduled run
    callback: handleGenerate,
    environmentVariables: {
      GRAPHQL_ENDPOINT: pulumiConfig.require("GRAPHQL_ENDPOINT"),
      SUBGRAPH_API_KEY: pulumiConfig.requireSecret("SUBGRAPH_API_KEY"),
    },
  },
  {
    dependsOn: [serviceFirestore, serviceCloudBuild, serviceCloudFunctions],
  },
);

// Create a Cloud Scheduler job to run every hour
new gcp.cloudscheduler.Job(
  "generate",
  {
    schedule: "*/5 * * * *", // Every 5 minutes
    timeZone: "UTC",
    httpTarget: {
      uri: functionGenerate.httpsTriggerUrl,
      httpMethod: "GET",
    },
  },
  {
    dependsOn: [serviceCloudScheduler, functionGenerate],
  },
);

/**
 * Deploy Cloud Function - Fetch
 */
const corsOrigins: (string | RegExp)[] = [/\.olympusdao.finance$/, /\.on.fleek.co$/];
if (pulumi.getStack() === "dev") {
  corsOrigins.push("http://localhost:5173");
}

const functionGet = new gcp.cloudfunctions.HttpCallbackFunction(
  "get",
  {
    runtime: "nodejs18",
    availableMemoryMb: 512,
    callbackFactory: () => {
      /**
       * Google Cloud Functions mangles the handling of CORS, so we
       * wrap it in an Express app that is configured to handle CORS
       * and applies restrictions to the origin.
       */
      const app = express();
      app.use(
        cors({
          origin: corsOrigins,
        }),
      );

      app.get("/", handleGet);

      return app;
    },
  },
  {
    dependsOn: [serviceFirestore, serviceCloudBuild, serviceCloudFunctions],
  },
);

/**
 * Firebase
 *
 * We utilise Firebase hosting to provide a static URL to the Cloud Function.
 */

// Deploy a Firebase Hosting site, so that we can obtain a static URL
const firebaseProject = new gcp.firebase.Project(
  projectName,
  {
    project: gcpConfig.require("project"),
  },
  {
    dependsOn: [serviceFirebase],
  },
);

const firebaseHostingSite = new gcp.firebase.HostingSite(
  projectName,
  {
    project: firebaseProject.project,
    siteId: `olympus-${projectStackName}`, // Will end up as olympus-cooler-loans-api-<stack>.web.app
  },
  {
    dependsOn: [firebaseProject],
  },
);

const firebaseSiteId = firebaseHostingSite.siteId;
if (!firebaseSiteId) {
  throw new Error("Firebase Hosting site ID is undefined");
}

const firebaseSiteIdInput: pulumi.Input<string> = firebaseSiteId.apply(str => `${str}`);

// Rewrite all requests to the Cloud Function
const firebaseHostingVersion = new gcp.firebase.HostingVersion(
  projectName,
  {
    siteId: firebaseSiteIdInput,
    config: {
      /**
       * Firebase hosting does not forward CORS headers to the Cloud Function
       * when using redirects, so we need to do a rewrite.
       *
       * Pulumi's implementation does not support specifying the region of the
       * function (or does not discover the region accurately), so we need to
       * ensure that both the Cloud Function and Firebase Hosting are in the
       * default region, which is us-central1.
       */
      rewrites: [
        {
          glob: "**",
          function: functionGet.function.name,
        },
      ],
    },
  },
  {
    dependsOn: [firebaseHostingSite, functionGet],
  },
);

new gcp.firebase.HostingRelease(
  projectName,
  {
    siteId: firebaseSiteIdInput,
    versionName: firebaseHostingVersion.name,
    message: "Cloud Functions integration",
  },
  {
    dependsOn: [firebaseHostingVersion],
  },
);

/**
 * Alerts
 */
// Notification channel
const notificationEmail = new gcp.monitoring.NotificationChannel("email", {
  displayName: "Email",
  type: "email",
  labels: {
    email_address: pulumiConfig.requireSecret("alertEmail"),
  },
});

// High Latency
new gcp.monitoring.AlertPolicy(
  "get-high-latency",
  {
    displayName: `${projectName} - Get - High Request Latency`,
    userLabels: {},
    conditions: [
      {
        displayName: `50% above 5s Latency`,
        conditionThreshold: {
          filter: pulumi.interpolate`
            resource.type = "cloud_function" AND
            resource.labels.function_name = "${functionGet.function.name}" AND
            metric.type = "cloudfunctions.googleapis.com/function/execution_times"
            `,
          aggregations: [
            {
              alignmentPeriod: "300s",
              perSeriesAligner: "ALIGN_PERCENTILE_99",
            },
          ],
          comparison: "COMPARISON_GT",
          duration: "0s",
          trigger: {
            percent: 50,
          },
          thresholdValue: 30000000000, // 30 seconds in nanoseconds??
        },
      },
    ],
    alertStrategy: {
      autoClose: "604800s",
    },
    combiner: "AND",
    enabled: true,
    notificationChannels: [notificationEmail.name],
  },
  {
    dependsOn: [functionGet, notificationEmail],
  },
);

// HTTP Errors
new gcp.monitoring.AlertPolicy(
  "get-http-errors",
  {
    displayName: `${projectName} - Get - HTTP Errors`,
    userLabels: {},
    conditions: [
      {
        displayName: `Error Count`,
        conditionThreshold: {
          filter: pulumi.interpolate`
            resource.type = "cloud_function" AND
            resource.labels.function_name = "${functionGet.function.name}" AND
            metric.type = "cloudfunctions.googleapis.com/function/execution_count" AND
            metric.labels.status != "ok"
            `,
          aggregations: [
            {
              alignmentPeriod: "300s",
              crossSeriesReducer: "REDUCE_NONE",
              perSeriesAligner: "ALIGN_COUNT",
            },
          ],
          comparison: "COMPARISON_GT",
          duration: "0s",
          trigger: {
            count: 1,
          },
          thresholdValue: 5,
        },
      },
    ],
    alertStrategy: {
      autoClose: "604800s",
    },
    combiner: "OR",
    enabled: true,
    notificationChannels: [notificationEmail.name],
  },
  {
    dependsOn: [functionGet, notificationEmail],
  },
);

new gcp.monitoring.AlertPolicy(
  "generate-http-errors",
  {
    displayName: `${projectName} - Generate - HTTP Errors`,
    userLabels: {},
    conditions: [
      {
        displayName: `Error Count`,
        conditionThreshold: {
          filter: pulumi.interpolate`
            resource.type = "cloud_function" AND
            resource.labels.function_name = "${functionGenerate.function.name}" AND
            metric.type = "cloudfunctions.googleapis.com/function/execution_count" AND
            metric.labels.status != "ok"
            `,
          aggregations: [
            {
              alignmentPeriod: "300s",
              crossSeriesReducer: "REDUCE_NONE",
              perSeriesAligner: "ALIGN_COUNT",
            },
          ],
          comparison: "COMPARISON_GT",
          duration: "0s",
          trigger: {
            count: 1,
          },
          thresholdValue: 5,
        },
      },
    ],
    alertStrategy: {
      autoClose: "604800s",
    },
    combiner: "OR",
    enabled: true,
    notificationChannels: [notificationEmail.name],
  },
  {
    dependsOn: [functionGet, notificationEmail],
  },
);

// Log Errors
new gcp.monitoring.AlertPolicy(
  "get-log-errors",
  {
    displayName: `${projectName} - Get - Log Errors`,
    userLabels: {},
    conditions: [
      {
        displayName: `Log contains error`,
        conditionMatchedLog: {
          filter: pulumi.interpolate`
            resource.type = "cloud_function" AND
            resource.labels.function_name = "${functionGet.function.name}" AND
            textPayload =~ "error"
            `,
        },
      },
    ],
    alertStrategy: {
      notificationRateLimit: {
        period: "3600s",
      },
      autoClose: "604800s",
    },
    combiner: "OR",
    enabled: true,
    notificationChannels: [notificationEmail.name],
  },
  {
    dependsOn: [functionGet, notificationEmail],
  },
);

new gcp.monitoring.AlertPolicy(
  "generate-log-errors",
  {
    displayName: `${projectName} - Generate - Log Errors`,
    userLabels: {},
    conditions: [
      {
        displayName: `Log contains error`,
        conditionMatchedLog: {
          filter: pulumi.interpolate`
            resource.type = "cloud_function" AND
            resource.labels.function_name = "${functionGenerate.function.name}" AND
            textPayload =~ "error"
            `,
        },
      },
    ],
    alertStrategy: {
      notificationRateLimit: {
        period: "3600s",
      },
      autoClose: "604800s",
    },
    combiner: "OR",
    enabled: true,
    notificationChannels: [notificationEmail.name],
  },
  {
    dependsOn: [functionGet, notificationEmail],
  },
);

/**
 * Exports
 */
export const generateHttpsUrl = functionGenerate.httpsTriggerUrl;
export const getHttpsUrl = functionGet.httpsTriggerUrl;
export const firebaseHostingUrl = firebaseHostingSite.defaultUrl;
