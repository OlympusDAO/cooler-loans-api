import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src", "!src/**/__tests__/**"],
  noExternal: ["@repo/shared", "@repo/types"],
  // format: ["cjs"],
  clean: true,
  dts: true,
  target: "node18",
});
