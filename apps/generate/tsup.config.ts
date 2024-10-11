import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src", "!src/**/__tests__/**"],
  // https://github.com/egoist/tsup/issues/619
  noExternal: [/(.*)/],
  clean: true,
  dts: true,
  // https://github.com/node-fetch/node-fetch/issues/784
  minify: false,
  target: "node18",
});
