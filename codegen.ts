import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://api.studio.thegraph.com/query/28103/cooler-loans-goerli/0.0.1",
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
        },
        skipTypename: true,
      },
    },
  },
};

export default config;
