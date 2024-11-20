import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/types"],
  format: ["cjs"],
  clean: true,
  dts: true,
});
