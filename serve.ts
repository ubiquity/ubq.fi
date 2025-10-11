import { serveDir } from "https://deno.land/std@0.224.0/http/file_server.ts";

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
