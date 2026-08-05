// PM2 process manager config for PRODUCTION ONLY.
//
// Usage (from project-root, after `npm run build` in both apps):
//   pm2 start ecosystem.production.config.js
//   pm2 status
//   pm2 logs essencestore-store
//   pm2 logs essencestore-admin
//   pm2 restart essencestore-store
//   pm2 stop all
//   pm2 save   # persist this process list so `pm2 startup` restores it on reboot
//
// Nginx (see deploy/nginx.conf) proxies directly to these two processes —
// the Node gateway (gateway/server.js) is a dev-only convenience and must
// NOT run in production (it's not started here on purpose).
//
// Ports come from each app's own `start` script (mystore -> 3002,
// essence-admin -> 3003) via `next start -p <port>` — that flag takes
// precedence over a PORT env var, so don't try to override ports here.
module.exports = {
  apps: [
    {
      name: "essencestore-store",
      cwd: __dirname + "/mystore",
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "production",
      },
    },
    {
      name: "essencestore-admin",
      cwd: __dirname + "/essence-admin",
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
