import * as gcp from "@pulumi/gcp";

/**
 * Create a dummy file in the given bucket and base directory.
 *
 * This is needed for Hive partitioning, as it will complain if there are no files.
 *
 * @param bucket - The bucket to create the dummy file in
 * @param baseDirectory - The base directory to create the dummy file in
 */
export const createDummyFile = (bucket: gcp.storage.Bucket, baseDirectory: string) => {
  const dummyObjectName = `${baseDirectory}/dt=2021-01-01/dummy.jsonl`;
  const dummyFile = new gcp.storage.BucketObject(
    dummyObjectName,
    {
      bucket: bucket.name,
      content: "{}", // Empty file
      name: dummyObjectName,
    },
    {
      dependsOn: [bucket],
    },
  );

  return dummyFile;
};
