import type { CodegenConfig } from "@graphql-codegen/cli";
import * as dotenv from "dotenv";
import fs from "fs";
import { parse } from "yaml";

// Read .env file
dotenv.config();

const resolveSubgraphUrl = (): string => {
  if (!process.env.SUBGRAPH_API_KEY) {
    throw new Error(
      `"SUBGRAPH_API_KEY environment variable is not set. Please set it to your Subgraph API key to query subgraphs"`,
    );
  }

  // Parse the Pulumi config file
  const pulumiConfig = parse(fs.readFileSync("./Pulumi.dev.yaml", "utf-8"));
  const url = pulumiConfig.config["cooler-loans-api:GRAPHQL_ENDPOINT"] as string;

  return url.replace("[api-key]", process.env.SUBGRAPH_API_KEY);
};

const config: CodegenConfig = {
  overwrite: true,
  schema: resolveSubgraphUrl(),
  documents: "./src/**/*.graphql",
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
      config: {
        preResolveTypes: true,
        strictScalars: true,
        scalars: {
          BigDecimal: "number",
          BigInt: "number",
          Bytes: "string",
          Int8: "number",
          Timestamp: "number",
        },
        skipTypename: true,
      },
    },
  },
};

export default config;
