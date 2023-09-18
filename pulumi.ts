import * as gcp from "@pulumi/gcp";
import * as pulumi from "@pulumi/pulumi";

import { handleGenerate } from "./src/functions/generate";
import { handleGet } from "./src/functions/get";

const gcpConfig = new pulumi.Config("gcp");
// const pulumiConfig = new pulumi.Config("pulumi");

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
// const serviceCloudScheduler = new gcp.projects.Service("cloudscheduler", {
//   service: "cloudscheduler.googleapis.com",
// });

/**
 * Create Firestore database
 */
new gcp.firestore.Database(
  "firestore",
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
 * Deploy Cloud Function - Generate
 */
const functionGenerate = new gcp.cloudfunctions.HttpCallbackFunction(
  "generate",
  {
    runtime: "nodejs18",
    availableMemoryMb: 512,
    timeout: 540,
    callback: handleGenerate,
    environmentVariables: {
      GRAPHQL_ENDPOINT: "https://api.studio.thegraph.com/query/28103/cooler-loans-goerli/0.0.1",
    },
  },
  {
    dependsOn: [serviceFirestore, serviceCloudBuild, serviceCloudFunctions],
  },
);

// TODO Schedule it

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

export const generateHttpsUrl = functionGenerate.httpsTriggerUrl;
export const getHttpsUrl = functionGet.httpsTriggerUrl;
