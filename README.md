# Ubiquity DAO Website (ubq.fi)

- TypeScript + esbuild bundling to `static/dist`
- Deployment: Deno Deploy via GitHub Actions OIDC (`.github/workflows/deploy-deno.yml`)
- Local dev: `yarn start` serves `static` at http://localhost:8080

Deploy (CI):
- On push to `main`/`master`, CI builds and deploys using `denoland/deployctl`.
- Project name in Deno Deploy: `ubq-fi`
- Entrypoint: `serve.ts` (serves `static/`)

Custom Domain:
- Add `ubq.fi` in Deno Deploy project Domains and follow the DNS records shown there (ANAME/ALIAS or A for apex; CNAME for subdomains). TLS is auto-provisioned.

Notes:
- Previous Cloudflare Pages deployment has been replaced by Deno Deploy.
