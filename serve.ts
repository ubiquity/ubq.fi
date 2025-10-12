import { serveDir } from "@std/http/file-server";

const port = parseInt(Deno.env.get("PORT") ?? "8080");

console.log(`ubq.fi static server listening on :${port}`);

// Serve files from the "static" directory
Deno.serve({ port }, (req) => {
  return serveDir(req, {
    fsRoot: "static",
    urlRoot: "",
    enableCors: true,
  });
});
