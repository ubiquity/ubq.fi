import * as esbuild from "esbuild";
import { esBuildContext } from "./esbuild-build.ts";

void server();

export async function server() {
  const _context = await esbuild.context(esBuildContext);
  const { port } = await _context.serve({
    servedir: "static",
    port: 8080,
  });
  console.log(`http://localhost:${port}`);
}
