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
// Runs the `next` binary directly (not via `npm run start`) — PM2's script
// resolution for "npm" as a bare command is unreliable across apps/cwds
// (it resolved fine for one app and silently mis-resolved for the other,
// producing a process that reports "online" but never listens and never
// logs anything). Invoking next directly sidesteps that.
module.exports = {
  apps: [
    {
      name: "essencestore-store",
      cwd: __dirname + "/mystore",
      script: "node_modules/.bin/next",
      args: "start -p 3002",
      env: {
        NODE_ENV: "production",
      },
    },
    {
      name: "essencestore-admin",
      cwd: __dirname + "/essence-admin",
      script: "node_modules/.bin/next",
      args: "start -p 3003",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
