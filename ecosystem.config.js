// PM2 process manager config for production.
//
// Usage (from project-root, after `npm run build` in both apps):
//   pm2 start ecosystem.config.js
//   pm2 status
//   pm2 logs essencestore-store
//   pm2 logs essencestore-admin
//   pm2 restart essencestore-store
//   pm2 stop all
//
// Nginx (see deploy/nginx.conf) proxies directly to these two processes —
// the Node gateway (gateway/server.js) is a dev-only convenience and does
// not need to run in production.
module.exports = {
  apps: [
    {
      name: "essencestore-store",
      cwd: "./mystore",
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "production",
      },
    },
    {
      name: "essencestore-admin",
      cwd: "./essence-admin",
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
