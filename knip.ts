import type { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: [
    "build/esbuild-build.ts",
    "build/esbuild-server.ts",
    "serve.ts",
    "static/code/js/ubq.ts",
  ],
  project: [
    "build/**/*.ts",
    "static/code/js/**/*.ts",
  ],
  ignore: [],
  ignoreExportsUsedInFile: true,
  ignoreDependencies: [],
};

export default config;
