import esbuild from "esbuild";
const typescriptEntries = ["static/code/js/ubq.ts"];
const cssEntries = ["static/code/css/ubq.css"];
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
