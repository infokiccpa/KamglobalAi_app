/**
 * PM2 Ecosystem Config — kamglobalai.com
 * VPS: Shared Hostinger VPS (alongside kiccpa, lms+website, saas-eduaitutors)
 *
 * Services:
 *   - kamglobal-backend  → Port 5001 (Express + MongoDB)
 *   - Frontend is served as static files by Nginx (no PM2 process needed)
 *
 * Usage:
 *   cd /var/www/kamglobalai-com
 *   pm2 start ecosystem.config.cjs --env production
 *   pm2 save
 */
module.exports = {
  apps: [
    {
      name: 'kamglobal-backend',
      script: 'src/index.js',
      cwd: './backend',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '400M',
      env: {
        NODE_ENV: 'production',
        PORT: 5001,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5001,
      },
      restart_delay: 3000,
      max_restarts: 10,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: '/var/log/pm2/kamglobal-backend-error.log',
      out_file: '/var/log/pm2/kamglobal-backend-out.log',
    },
  ],
};
