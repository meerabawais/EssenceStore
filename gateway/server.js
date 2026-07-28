const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const PORT = process.env.GATEWAY_PORT || 3001;
const STORE_TARGET = process.env.STORE_ORIGIN || "http://localhost:3002";
const ADMIN_TARGET = process.env.ADMIN_ORIGIN || "http://localhost:3003";

const app = express();

// Disable Express's own body parsing / buffering so requests (including
// multipart uploads and streamed bodies) are piped straight through untouched.
app.disable("x-powered-by");

const commonProxyOptions = {
  changeOrigin: true,
  ws: true,
  xfwd: true,
  logger: console,
  on: {
    proxyReq: (proxyReq, req) => {
      console.log(`[gateway] ${req.method} ${req.originalUrl} -> ${proxyReq.getHeader("host")}${proxyReq.path}`);
    },
    error: (err, req, res) => {
      console.error(`[gateway] proxy error for ${req.method} ${req.originalUrl}:`, err.message);
      if (res.writeHead && !res.headersSent) {
        res.writeHead(502, { "Content-Type": "text/plain" });
      }
      res.end("Bad gateway: upstream application is not reachable.");
    },
  },
};

// Everything under /admin (including /admin itself) is served by essence-admin.
// essence-admin's own basePath is "/admin", so no path rewriting is needed.
const adminProxy = createProxyMiddleware({
  ...commonProxyOptions,
  target: ADMIN_TARGET,
});

// Everything else is served by mystore.
const storeProxy = createProxyMiddleware({
  ...commonProxyOptions,
  target: STORE_TARGET,
});

// Mounting these at "/" (rather than app.use("/admin", adminProxy)) matters:
// Express strips the mount path from req.url before invoking a router-level
// middleware, which would turn "/admin/dashboard" into "/dashboard" — but
// essence-admin's own basePath is "/admin", so it needs the prefix intact.
app.use((req, res, next) => {
  if (req.url === "/admin" || req.url.startsWith("/admin/")) {
    return adminProxy(req, res, next);
  }
  return storeProxy(req, res, next);
});

const server = app.listen(PORT, () => {
  console.log(`[gateway] listening on http://localhost:${PORT}`);
  console.log(`[gateway] /admin       -> ${ADMIN_TARGET}`);
  console.log(`[gateway] everything else -> ${STORE_TARGET}`);
});

// http-proxy-middleware v3 attaches its own upgrade handler via `ws: true`
// through `app.use`, but that only fires for requests Express has routed.
// Express does not route the raw `upgrade` event, so we forward it manually,
// picking the target the same way the HTTP routes do.
server.on("upgrade", (req, socket, head) => {
  if (req.url.startsWith("/admin")) {
    adminProxy.upgrade(req, socket, head);
  } else {
    storeProxy.upgrade(req, socket, head);
  }
});

function shutdown(signal) {
  console.log(`[gateway] received ${signal}, shutting down`);
  server.close(() => process.exit(0));
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
