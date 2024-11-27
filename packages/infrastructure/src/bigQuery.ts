import * as gcp from "@pulumi/gcp";
import { readFileSync } from "fs";

/**
 * Create a dummy file in the given bucket and base directory.
 *
 * This is needed for Hive partitioning, as it will complain if there are no files.
 *
 * @param bucket - The bucket to create the dummy file in
 * @param baseDirectory - The base directory to create the dummy file in
 */
export const createDummyFile = (bucket: gcp.storage.Bucket, baseDirectory: string, input: string) => {
  // Read the content from the input file, but make sure it is on a single line
  const content = JSON.stringify(JSON.parse(readFileSync(input, "utf-8")));

  const dummyObjectName = `${baseDirectory}/dt=2021-01-01/dummy.jsonl`;
  const dummyFile = new gcp.storage.BucketObject(
    dummyObjectName,
    {
      bucket: bucket.name,
      content: content,
      name: dummyObjectName,
    },
    {
      dependsOn: [bucket],
    },
  );

  return dummyFile;
};

export const createBigQueryDataset = (name: string, serviceBigQuery: gcp.projects.Service) => {
  return new gcp.bigquery.Dataset(
    name,
    {
      datasetId: name.replace(/-/g, "_"), // - is unsupported,
    },
    {
      dependsOn: [serviceBigQuery],
    },
  );
};

export const createBigQueryTable = (
  name: string,
  dataset: gcp.bigquery.Dataset,
  dataBucket: gcp.storage.Bucket,
  dataBucketPrefix: string,
  schemaPath: string,
  dummyFileInputPath: string,
) => {
  const schema = readFileSync(schemaPath, "utf-8");
  const sourceUriPrefix = dataBucket.url.apply(url => `${url}/${dataBucketPrefix}`);
  const sourceUri = dataBucket.url.apply(url => `${url}/${dataBucketPrefix}/*`);
  const dummyFile = createDummyFile(dataBucket, dataBucketPrefix, dummyFileInputPath);

  return new gcp.bigquery.Table(
    name,
    {
      datasetId: dataset.datasetId,
      tableId: name,
      deletionProtection: false, // Allow for table deletion, since it is backed by a GCS bucket and we sometimes need to change settings or the schema
      externalDataConfiguration: {
        sourceFormat: "NEWLINE_DELIMITED_JSON",
        sourceUris: [sourceUri],
        autodetect: false,
        schema: schema,
        hivePartitioningOptions: {
          mode: "AUTO",
          sourceUriPrefix: sourceUriPrefix,
        },
      },
    },
    {
      dependsOn: [dataset, dataBucket, dummyFile],
    },
  );
};
