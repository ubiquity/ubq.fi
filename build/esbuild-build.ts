import esbuild from "esbuild";
const typescriptEntries = ["static/main.ts", "static/code/js/ubq.ts", "static/code/js/sine.ts"];
const cssEntries = ["static/code/css/ubq.css", "static/code/css/proxima.css"];
const entries = [...typescriptEntries, ...cssEntries];
export const esBuildContext: esbuild.BuildOptions = {
  sourcemap: true,
  entryPoints: entries,
  bundle: true,
  minify: false,
  loader: {
    ".png": "dataurl",
    ".woff": "dataurl",
    ".woff2": "dataurl",
    ".eot": "dataurl",
    ".ttf": "dataurl",
    ".svg": "dataurl",
  },
  outdir: "static/dist",
};

void esbuild.build(esBuildContext);
