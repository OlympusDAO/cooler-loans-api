import * as gcp from "@pulumi/gcp";
import * as pulumi from "@pulumi/pulumi";

import { handleGenerate } from "./src/functions/generate";
import { handleGet } from "./src/functions/get";

const gcpConfig = new pulumi.Config("gcp");
// const pulumiConfig = new pulumi.Config("pulumi");
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
    locationId: gcpConfig.require("region"),
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
    timeout: 540,
    callback: handleGenerate,
    environmentVariables: {
      GRAPHQL_ENDPOINT: "https://api.studio.thegraph.com/query/28103/cooler-loans-goerli/0.0.3",
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
    schedule: "0 * * * *",
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
const functionGet = new gcp.cloudfunctions.HttpCallbackFunction(
  "get",
  {
    runtime: "nodejs18",
    callback: handleGet,
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
    siteId: `olympusdao-${projectStackName}`, // Will end up as olympusdao-cooler-loans-api-<stack>.web.app
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

// Create a rewrite rule to redirect all requests to the Cloud Function
const firebaseHostingVersion = new gcp.firebase.HostingVersion(
  projectName,
  {
    siteId: firebaseSiteIdInput,
    config: {
      redirects: [
        {
          glob: "/",
          location: functionGet.httpsTriggerUrl,
          statusCode: 302,
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
 * Exports
 */
export const generateHttpsUrl = functionGenerate.httpsTriggerUrl;
export const getHttpsUrl = functionGet.httpsTriggerUrl;
export const firebaseHostingUrl = firebaseHostingSite.defaultUrl;
