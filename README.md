# Ubiquity DAO Website (ubq.fi)

- TypeScript + esbuild bundling to `static/dist`
- Deployment: Deno 2 Deploy via `ubiquity-os/deno-deploy`
  (`.github/workflows/deploy-deno.yml`)
- Local dev: `deno task start` serves `static` at http://localhost:8080

Deploy (CI):

- On push to non-`dist/**` branches, CI builds and provisions a branch Deno app.
- Default branch app: `ubq-fi.ubiquity-dao.deno.net`
- Entrypoint: `serve.ts` (serves `static/`)

Custom Domain:

- Add `ubq.fi` in Deno Deploy project Domains and follow the DNS records shown
  there (ANAME/ALIAS or A for apex; CNAME for subdomains). TLS is
  auto-provisioned.

Notes:

- Previous Cloudflare Pages deployment has been replaced by Deno Deploy.
