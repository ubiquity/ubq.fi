import type { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: ["build/esbuild-build.ts", "build/esbuild-server.ts", "serve.ts", "static/code/js/ubq.ts"],
  project: [
    "build/**/*.ts",
    "serve.ts",
    // Frontend TypeScript modules
    "static/code/js/**/*.ts",
  ],
  ignore: ["static/dist/**"],
  ignoreExportsUsedInFile: true,
  ignoreDependencies: [
    // Deno import map / std libs are not Node deps
    "esbuild",
    "@std/*",
  ],
};

export default config;
