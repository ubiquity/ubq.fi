/**
 * Cloudflare Workers port of the ubq.fi apex site.
 *
 * Files come from the assets binding (the built static/ tree, with 404.html
 * for misses). /rpc/:chainId keeps the same-origin JSON-RPC path that the
 * router previously served on the apex, proxying to https://rpc.ubq.fi (now
 * the VPS Permit2 RPC proxy), and /__health mirrors the router's probe.
 */
export interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/__health") {
      return new Response(JSON.stringify({ status: "ok", time: new Date().toISOString() }), {
        headers: { "content-type": "application/json", "cache-control": "no-store" },
      });
    }

    if (url.pathname.startsWith("/rpc/")) {
      const chainId = url.pathname.split("/")[2];
      if (!chainId || !/^\d+$/.test(chainId)) {
        return new Response("Invalid chain ID. Must be numeric.", { status: 400 });
      }
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: { ...CORS_HEADERS, "Access-Control-Max-Age": "86400" } });
      }
      const headers = new Headers();
      for (const [key, value] of request.headers.entries()) {
        const k = key.toLowerCase();
        if (k === "host" || k === "origin" || k === "referer") continue;
        headers.set(key, value);
      }
      const upstream = await fetch(`https://rpc.ubq.fi/${chainId}${url.search}`, {
        method: request.method,
        headers,
        body: request.method === "GET" || request.method === "HEAD" ? undefined : request.body,
        redirect: "manual",
      });
      const outHeaders = new Headers(upstream.headers);
      for (const [key, value] of Object.entries(CORS_HEADERS)) outHeaders.set(key, value);
      return new Response(upstream.body, { status: upstream.status, statusText: upstream.statusText, headers: outHeaders });
    }

    return await env.ASSETS.fetch(request);
  },
};
