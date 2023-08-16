import esbuild from "esbuild";
const typescriptEntries = ["static/code/js/ubq.ts", "static/code/js/sine.ts"];
const CSSEntries = ["static/code/css/ubq.css", "static/code/css/proxima.css"];
export const entries = [...typescriptEntries, ...CSSEntries];

export const esBuildContext = {
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
  outdir: "static/out",
} as esbuild.BuildOptions;
