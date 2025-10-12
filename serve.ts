import { serveDir } from "@std/http/file-server";

const port = parseInt(Deno.env.get("PORT") ?? "8080");

console.log(`ubq.fi static server listening on :${port}`);

// Serve files from the "static" directory with basic cache controls
Deno.serve({ port }, async (req) => {
  const url = new URL(req.url);
  const pathname = url.pathname;

  const res = await serveDir(req, {
    fsRoot: "static",
    urlRoot: "",
    enableCors: true,
  });

  // Ensure fresh index.html; long-cache immutable assets
  const h = new Headers(res.headers);
  if (
    pathname === "/" || pathname === "/index.html" ||
    pathname.endsWith("/index.html")
  ) {
    h.set("Cache-Control", "no-store, must-revalidate");
    const body = await res.arrayBuffer();
    return new Response(body, { status: res.status, headers: h });
  }

  if (
    pathname.startsWith("/dist/") ||
    pathname.startsWith("/assets/") ||
    pathname.startsWith("/image/") ||
    pathname.endsWith(".js") ||
    pathname.endsWith(".css")
  ) {
    h.set("Cache-Control", "public, max-age=31536000, immutable");
    return new Response(res.body, { status: res.status, headers: h });
  }

  return res;
});
