import type { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: ["build/esbuild-build.ts", "build/esbuild-server.ts", "serve.ts", "static/code/js/ubq.ts"],
  project: [
    "build/**/*.ts",
    "serve.ts",
    // Application code lives under static/code/js; most files are bundled
    // or referenced via HTML, which Knip can't see. Ignore to reduce noise.
    // Remove this ignore when migrating these modules to explicit TS imports.
  ],
  ignore: ["static/code/js/**", "static/dist/**"],
  ignoreExportsUsedInFile: true,
  ignoreDependencies: [
    // Deno import map / std libs are not Node deps
    "esbuild",
    "@std/*",
  ],
};

export default config;
