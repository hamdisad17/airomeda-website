// PM2 process manager config for Hostinger VPS.
// Run with: pm2 start ecosystem.config.cjs --env production
module.exports = {
  apps: [
    {
      name: 'airomeda-website',
      cwd: '/var/www/airomeda/current',
      script: 'server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '127.0.0.1',
      },
      max_memory_restart: '512M',
      error_file: '/var/log/pm2/airomeda-website.err.log',
      out_file: '/var/log/pm2/airomeda-website.out.log',
      time: true,
    },
  ],
};
