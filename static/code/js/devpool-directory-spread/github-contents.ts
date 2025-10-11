const OWNER = "devpool-directory";
const REPO = "devpool-directory";
const REF = "__STORAGE__";

function contentsUrl(path: string) {
  const baseUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/`;
  return `${baseUrl}${path}?ref=${REF}`;
}

function etagKey(path: string) {
  return `devpool:etag:${path}`;
}

function dataKey(path: string) {
  return `devpool:data:${path}`;
}

export type FetchResult<T = unknown> = {
  json: T | null;
  etag: string | null;
  notModified: boolean;
};

function readCache<T = unknown>(path: string): { etag: string | null; json: T | null } {
  try {
    const etag = localStorage.getItem(etagKey(path));
    const data = localStorage.getItem(dataKey(path));
    if (!data) return { etag, json: null };
    return { etag, json: JSON.parse(data) as T };
  } catch (_e) {
    return { etag: null, json: null };
  }
}

function writeCache<T = unknown>(path: string, etag: string | null, json: T) {
  try {
    if (etag) localStorage.setItem(etagKey(path), etag);
    localStorage.setItem(dataKey(path), JSON.stringify(json));
  } catch (_e) {
    // Ignore storage errors (quota/disabled)
  }
}

function base64ToString(b64: string) {
  const clean = b64.replace(/\s+/g, "");
  try {
    // atob is available in browsers; fallback for robustness
    return atob(clean);
  } catch (_e) {
    // minimal fallback
    try {
      const chars = Array.prototype.map
        .call(atob(clean), (c: string) => {
          const code = c.charCodeAt(0).toString(16);
          const padded = `00${code}`.slice(-2);
          return `%${padded}`;
        })
        .join("");
      return decodeURIComponent(chars);
    } catch (_e2) {
      return "";
    }
  }
}

export async function fetchContentsJSON<T = unknown>(path: string, opts?: { bypassEtag?: boolean }): Promise<FetchResult<T>> {
  const cache = readCache<T>(path);
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };
  if (!opts?.bypassEtag && cache.etag) headers["If-None-Match"] = cache.etag;

  const resp = await fetch(contentsUrl(path), { headers });
  if (resp.status === 304) {
    return { json: cache.json, etag: cache.etag, notModified: true };
  }
  if (!resp.ok) {
    throw new Error(`GitHub Contents API error ${resp.status} for ${path}`);
  }

  const etag = resp.headers.get("ETag");
  const payload = (await resp.json()) as { content?: string; encoding?: string };
  if (!payload.content) {
    // Unexpected shape; return null but keep etag to avoid hot looping.
    return { json: null, etag, notModified: false };
  }
  const raw = payload.encoding === "base64" ? base64ToString(payload.content) : payload.content;
  const json = JSON.parse(raw) as T;
  writeCache(path, etag, json);
  return { json, etag, notModified: false };
}

export function getCachedJSON<T = unknown>(path: string): T | null {
  return readCache<T>(path).json;
}

export function clearCache(path: string): void {
  try {
    localStorage.removeItem(etagKey(path));
    localStorage.removeItem(dataKey(path));
  } catch (_e) {
    // ignore
  }
}

export function clearAllCache(): void {
  try {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith("devpool:")) keys.push(k);
    }
    keys.forEach((k) => localStorage.removeItem(k));
  } catch (_e) {
    // ignore
  }
}
