# EssenceStore

`mystore` (customer-facing store) and `essence-admin` (admin panel) are two
independent Next.js apps that share one PostgreSQL database. In development
and production they are served behind a single reverse proxy so they behave
as one website on one origin.

```
https://example.com/            -> mystore
https://example.com/admin/      -> essence-admin
```

---

## Architecture

```
                         ┌─────────────────────────┐
   Browser  ───────────► │   Gateway (dev) / Nginx │
                         │        (prod)           │
                         └───────────┬─────────────┘
                                     │
                    ┌────────────────┴────────────────┐
                    │                                  │
             /admin/*                             everything else
                    │                                  │
                    ▼                                  ▼
        ┌───────────────────────┐          ┌───────────────────────┐
        │   essence-admin        │          │   mystore              │
        │   (Next.js, :3002)     │          │   (Next.js, :3001)     │
        │   basePath: "/admin"   │          │                        │
        └───────────┬────────────┘          └───────────┬────────────┘
                    │                                    │
                    └───────────────┬────────────────────┘
                                     ▼
                          Shared PostgreSQL database
                             (Prisma in both apps)
```

- **mystore** and **essence-admin** are ordinary standalone Next.js 16 (App
  Router) apps — nothing about them is merged or turned into a monorepo.
  Each keeps its own `package.json`, `node_modules`, and `next.config.mjs`.
- **essence-admin** sets `basePath: "/admin"` in its `next.config.mjs`. That
  makes Next.js itself rewrite all of its internal links, `next/image`
  usage, and `/_next/*` asset requests to live under `/admin/*`, so the app
  behaves correctly when it isn't at the domain root.
- **Gateway** (`gateway/`) is a small Express + `http-proxy-middleware`
  reverse proxy used **in development only**, for convenience — it exists so
  `npm run dev` gives you one URL instead of juggling two ports. It proxies
  `/admin` (and everything under it) to essence-admin unmodified, and
  everything else to mystore. It supports all HTTP methods, WebSockets
  (Next.js Fast Refresh), multipart uploads, cookies, and streamed
  responses.
- **In production**, Nginx (`deploy/nginx.conf`) plays the same role the
  gateway plays in dev — it's simply more appropriate for TLS termination,
  HTTP/2, and high-throughput proxying, so the Node gateway is not run in
  production.
- Both apps read the same `DATABASE_URL` and use the same Prisma schema —
  no new database, no schema changes.

---

## Directory Structure

```
project-root/
├── mystore/                  # Customer-facing store (Next.js App Router)
│   ├── app/                  # Routes: /, /shop, /cart, /checkout, /account, ...
│   ├── components/
│   ├── context/
│   ├── lib/                  # lib/prisma.js — Prisma client singleton
│   ├── prisma/                # schema.prisma (shared DB schema)
│   ├── public/
│   ├── styles/
│   ├── next.config.mjs       # turbopack.root only — no basePath (root app)
│   ├── package.json          # dev/start scripts pinned to port 3001
│   └── .env.example
│
├── essence-admin/            # Admin panel (Next.js App Router)
│   ├── app/                  # Routes: /dashboard, /products, /Orders, ...
│   ├── components/
│   ├── lib/                  # lib/prisma.js — Prisma client singleton
│   ├── prisma/                # schema.prisma (identical to mystore's)
│   ├── public/
│   ├── next.config.mjs       # basePath + assetPrefix = "/admin"
│   ├── package.json          # dev/start scripts pinned to port 3002
│   └── .env.example
│
├── gateway/                  # Dev-only reverse proxy
│   ├── server.js             # Express + http-proxy-middleware
│   └── package.json
│
├── deploy/
│   └── nginx.conf            # Production reverse-proxy config
│
├── ecosystem.production.config.js       # PM2 config for production (mystore + admin)
├── package.json              # Root orchestrator (concurrently)
├── .env.example              # Gateway env vars (ports/origins)
└── README.md
```

---

## Installation

**Requirements:** Node.js 20+, npm (both apps already use npm — no other
package manager is involved), and a running PostgreSQL instance.

```bash
git clone <repo-url>
cd project-root
npm install
```

`npm install` at the root installs the root's own dependency
(`concurrently`) and, via its `postinstall` script, also runs `npm install`
inside `mystore/`, `essence-admin/`, and `gateway/`. Each app keeps its own
independent `node_modules` — this is intentionally **not** an npm
workspaces/monorepo setup, per the project constraints.

---

## Environment Variables

Copy each example file and fill in real values:

```bash
cp mystore/.env.example mystore/.env
cp essence-admin/.env.example essence-admin/.env
cp .env.example .env   # optional — only needed to override gateway defaults
```

| File                        | Variable        | Required | Notes                                                          |
|------------------------------|------------------|----------|------------------------------------------------------------------|
| `mystore/.env`               | `DATABASE_URL`   | Yes      | Same Postgres database as essence-admin                        |
| `essence-admin/.env`         | `DATABASE_URL`   | Yes      | Same value as mystore's                                         |
| `.env` (root, gateway only)  | `GATEWAY_PORT`   | No       | Default `3000` — the single public dev port                    |
| `.env` (root, gateway only)  | `STORE_ORIGIN`   | No       | Default `http://localhost:3001`                                 |
| `.env` (root, gateway only)  | `ADMIN_ORIGIN`   | No       | Default `http://localhost:3002`                                 |

Never commit real `.env` files — they're already covered by `.gitignore` in
each app and at the root.

If your database doesn't have the schema yet, push it from either app
(schemas are identical):

```bash
cd mystore && npx prisma db push
```

---

## Local Development

From `project-root`:

```bash
npm install
npm run dev
```

This starts, concurrently, in one terminal with color-coded, labeled logs:

- `mystore` on `http://localhost:3001`
- `essence-admin` on `http://localhost:3002`
- the gateway on `http://localhost:3000`

Everything is accessible from one origin:

- Store: http://localhost:3000/
- Admin: http://localhost:3000/admin/

`Ctrl+C` terminates all three processes together — verified with no orphan
processes left behind. If any one process exits, the others are also
terminated (`concurrently --kill-others --kill-others-on-fail`).

---

## Production Deployment

Expected URLs:

```
https://example.com/
https://example.com/admin/
```

### 1. Build both apps

```bash
npm run build   # runs `next build` in mystore/ and essence-admin/
```

### 2. Start both apps with PM2

```bash
npm install -g pm2
pm2 start ecosystem.production.config.js
pm2 save
```

This runs:

- `essencestore-store` → `mystore`, `next start -p 3001`
- `essencestore-admin` → `essence-admin`, `next start -p 3002`

The dev-only Node gateway (`gateway/`) is **not** used in production —
Nginx takes over that role directly against ports 3001/3002.

### 3. Configure Nginx

Copy `deploy/nginx.conf` to `/etc/nginx/sites-available/essencestore.conf`,
update `server_name` and the TLS certificate paths, then:

```bash
ln -s /etc/nginx/sites-available/essencestore.conf /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

The config proxies `/admin` (unmodified — essence-admin expects the prefix,
since it sets `basePath: "/admin"`) to port 3002, and everything else to
port 3001. It forwards `Host`, `X-Forwarded-For`, `X-Forwarded-Proto`,
supports WebSocket upgrades, and sets a generous `client_max_body_size` for
uploads.

### PM2 operations

```bash
pm2 status
pm2 logs essencestore-store
pm2 logs essencestore-admin
pm2 restart essencestore-store
pm2 restart essencestore-admin
pm2 stop all
```

---

## Server Setup (Ubuntu example)

```bash
# Node.js (20.x LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt-get install -y nodejs

# PostgreSQL client tools (if the DB is remote, the server itself isn't
# required locally)
sudo apt-get install -y postgresql-client

# Nginx
sudo apt-get install -y nginx
sudo apt-get install -y certbot python3-certbot-nginx   # for Let's Encrypt

# PM2
sudo npm install -g pm2
pm2 startup   # follow the printed instructions to enable PM2 on boot
```

Deployment steps on the server:

```bash
git clone <repo-url> /var/www/essencestore
cd /var/www/essencestore
npm install
cp mystore/.env.example mystore/.env       # then edit with real DATABASE_URL
cp essence-admin/.env.example essence-admin/.env
npm run build
pm2 start ecosystem.production.config.js
pm2 save
sudo cp deploy/nginx.conf /etc/nginx/sites-available/essencestore.conf
sudo ln -s /etc/nginx/sites-available/essencestore.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d example.com
```

Log locations:

- PM2 process logs: `pm2 logs` or `~/.pm2/logs/`
- Nginx: `/var/log/nginx/access.log`, `/var/log/nginx/error.log`

Health checks:

```bash
curl -I https://example.com/
curl -I https://example.com/admin/
pm2 status
```

Restart after a deploy:

```bash
git pull
npm install
npm run build
pm2 restart essencestore-store essencestore-admin
```

---

## Troubleshooting

**Port already in use** — something else is bound to 3000/3001/3002.
Find and stop it: `lsof -i :3001` (or change the `-p` flag in the
corresponding app's `package.json` and the gateway's `.env`).

**Missing env / Prisma errors about `DATABASE_URL`** — copy the relevant
`.env.example` to `.env` in `mystore/` and `essence-admin/` and fill in a
real connection string.

**Database connection failures** — confirm Postgres is running and
reachable, and that both apps' `DATABASE_URL` values point at the same
database. Run `npx prisma db push` from either app if tables are missing.

**Proxy failures / 502 Bad Gateway (dev)** — the gateway logs
`ECONNREFUSED` when mystore or essence-admin isn't up yet; this is normal
for the few seconds after `npm run dev` starts. If it persists, check the
`STORE`/`ADMIN` labeled logs in the same terminal for a crash.

**404s under `/admin`** — make sure `essence-admin/next.config.mjs` still
has `basePath: "/admin"` and that requests keep the `/admin` prefix intact
end-to-end. (In the gateway, this must be proxied without stripping the
mount path — see the comment in `gateway/server.js`.)

**Static assets (CSS/JS/images/fonts) not loading under `/admin`** — Next.js
auto-prefixes `next/image`, `<Link>`, and `/_next/*` requests when
`basePath` is set, but any hardcoded `<img src="/...">` using a root-
relative path needs the `/admin` prefix added manually (see
`essence-admin/components/admin/Profile/ProfileInfoCard.js` for an example
already fixed this way).

**Next.js build cache issues** — delete `.next/` in the affected app and
rebuild: `rm -rf mystore/.next` or `rm -rf essence-admin/.next`.

**Build errors** — run `npm run build --prefix mystore` or
`--prefix essence-admin` individually to isolate which app is failing.

**Authentication** — `essence-admin` currently has no login page or
middleware implemented (`/admin/login` does not exist yet); this is a
pre-existing gap unrelated to the proxy/gateway setup. `mystore`'s customer
auth (`app/account/*`) sets cookies with `path: "/"` and no `domain`
restriction, so they work correctly under the single-origin gateway/Nginx
setup without changes.

---

## Testing / Verification Checklist

Verified against this setup (`npm run dev`, then requests through
`http://localhost:3000`):

| Route | Status |
|---|---|
| `/` | ✅ 200 |
| `/shop` | ✅ 200 |
| `/cart` | ✅ 200 |
| `/checkout` | ✅ 200 |
| `/admin` | ✅ 200 |
| `/admin/products` | ✅ 200 |
| `/admin/customers` | ✅ 200 |
| `/admin/profile` | ✅ 200 |

Static assets (`/_next/static/...` for mystore, `/admin/_next/static/...`
for essence-admin) load with `200` through the gateway. `Ctrl+C` was tested
and cleanly terminates all three processes with no orphans.

**Pre-existing gaps found during verification (not caused by, or in scope
of, this proxy/gateway work — flagged for follow-up):**

- `essence-admin/app/dashboard/page.js` is an empty file (no default
  export) → `/admin/dashboard` currently 500s.
- `mystore/app/{about,contact,blog,wishlist}/page.js` are empty files →
  those routes currently 500 as well.
- `essence-admin` has no `/admin/login` route or any authentication/
  middleware implemented yet.
- The task's example URLs `/products` and `/categories` (mystore) don't
  correspond 1:1 to existing routes — the real store routes are `/shop`
  and `/categories/[slug]` (no `/categories` index page).

None of the above required changes to satisfy the actual routing/proxy
goal — they're existing incomplete pages in the underlying apps.

---

## Rollback

Everything added by this setup is additive and isolated to specific files;
no existing route, component, or business logic was removed or rewritten.

To roll back to two independently-run apps:

1. Delete `gateway/`, `ecosystem.production.config.js`, `deploy/`, the root
   `package.json`, root `package-lock.json`, root `node_modules/`, and root
   `.env.example`.
2. In `essence-admin/next.config.mjs`, remove `basePath` and `assetPrefix`.
3. In `essence-admin/components/admin/Profile/ProfileInfoCard.js`, change
   `src="/admin/profile.png"` back to `src="/profile.png"`.
4. In both apps' `package.json`, remove the `-p 3001` / `-p 3002` flags
   from the `dev`/`start` scripts if you want them back on Next's default
   port.
5. Run each app with its own `npm run dev` from within its own directory,
   as before.
