import { BigQuery } from "@google-cloud/bigquery";
import * as fs from "fs";

const projectId = process.env.CACHE_PROJECT;
if (!projectId) {
  throw new Error("CACHE_PROJECT environment variable is not set");
}

const bigquery = new BigQuery({
  projectId,
});

// BigQuery to TypeScript type mapping
const typeMapping: Record<string, string> = {
  STRING: "string",
  INTEGER: "number",
  FLOAT: "number",
  BOOLEAN: "boolean",
  TIMESTAMP: "string",
  DATETIME: "string",
  DATE: "string",
  NUMERIC: "number",
  RECORD: "object",
};

export async function generateTypes(dataset: string, table: string, outputPath: string) {
  console.log(`Generating types for ${table} in dataset ${dataset}`);
  const [metadata] = await bigquery.dataset(dataset).table(table).getMetadata();

  const schema = metadata.schema.fields;
  let typeDefinition = `// Auto-generated types from BigQuery schema\n\n`;

  // Generate the type
  typeDefinition += `export type ${table} = {\n`;

  for (const field of schema) {
    let tsType = typeMapping[field.type] || "any";

    // Handle nested RECORD types
    if (field.type === "RECORD" && field.fields) {
      tsType = "{\n";
      for (const subField of field.fields) {
        const subType = typeMapping[subField.type] || "any";
        tsType += `    ${subField.name}: ${subType};\n`;
      }
      tsType += "  }";
    }

    // Handle repeated/array fields
    if (field.mode === "REPEATED") {
      tsType = `${tsType}[]`;
    }

    typeDefinition += `  ${field.name}: ${tsType};\n`;
  }

  typeDefinition += `};\n`;

  // Write to file
  fs.writeFileSync(outputPath, typeDefinition);
  console.log(`Types generated successfully at ${outputPath}`);

  // Export the type by appending to index.ts (create if doesn't exist)
  const indexPath = "./src/types/index.ts";
  if (!fs.existsSync(indexPath)) {
    fs.writeFileSync(indexPath, "");
  }
  fs.appendFileSync(indexPath, `export type { ${table} } from "./${table}";\n`);
  console.log(`Type ${table} exported in index.ts`);
}
