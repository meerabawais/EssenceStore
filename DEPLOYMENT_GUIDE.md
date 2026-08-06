# Essence Store Deployment Guide

**Project:** Essence Store (Monorepo with mystore, essence-admin, and gateway)  
**Date:** August 2026  
**Server:** AWS EC2 (Ubuntu 24.04 LTS, 8GB RAM)  
**IP Address:** 13.229.93.26  

---

## Overview

This guide covers the complete deployment process for the Essence Store project, a monorepo containing:
- **mystore**: Next.js store frontend (Port 3000)
- **essence-admin**: Next.js admin panel (Port 3001)
- **gateway**: Node.js backend API (Port 5000)

The deployment uses:
- **PM2** for process management
- **Nginx** as reverse proxy
- **PostgreSQL** for database
- **Node.js v20** runtime
- **Next.js v16.3.0**

---

## Prerequisites

Before starting, ensure you have:
- AWS account with EC2 access
- SSH key pair downloaded (.pem file)
- GitHub repository with your code
- Local PostgreSQL database (for data migration)
- MobaXterm or similar SSH client
- Command line access on local machine

---

## AWS EC2 Setup

### Step 1: Launch EC2 Instance

1. Go to **AWS Console** → **EC2** → **Instances**
2. Click **Launch Instances**
3. **Choose AMI:** Ubuntu 24.04 LTS (free tier eligible)
4. **Instance Type:** t2.micro or t3.micro (free tier) or larger if needed
5. **Key Pair:** Create new key pair named `essencestorekey`
   - Format: `.pem`
   - Download immediately and keep safe
6. **Network Settings:**
   - Allow SSH (Port 22)
   - Allow HTTP (Port 80)
   - Allow HTTPS (Port 443)
   - Allow Custom TCP 3000, 3001, 5000
7. **Storage:** 20-30 GB (we increased from 8GB)
8. Click **Launch**

### Step 2: Increase Storage (if needed)

1. Go to **EC2 Dashboard** → **Volumes**
2. Find your instance's volume
3. Right-click → **Modify Volume**
4. Change size from 8GB to desired size (e.g., 20GB)
5. Confirm

On server, extend filesystem:
```bash
sudo growpart /dev/nvme0n1 1
sudo resize2fs /dev/nvme0n1p1
df -h  # Verify
```

---

## SSH Connection

### Connect via MobaXterm (Recommended)

1. Open MobaXterm
2. Click **Session** → **New Session**
3. Select **SSH**
4. Fill in:
   - **Remote host:** `13.229.93.26` (your IP)
   - **Username:** `ubuntu`
   - **Port:** `22`
5. **Advanced SSH settings** → Browse for private key
6. Select `essencestorekey.pem`
7. Click **OK**

### Or via Command Line

**Windows:**
```bash
ssh -i C:\Users\YourName\Downloads\essencestorekey.pem ubuntu@13.229.93.26
```

**Mac/Linux:**
```bash
chmod 400 ~/Downloads/essencestorekey.pem
ssh -i ~/Downloads/essencestorekey.pem ubuntu@13.229.93.26
```

---

## Server Environment Setup

### Step 1: Update System

```bash
sudo apt update && sudo apt upgrade -y
```

### Step 2: Install Node.js v20

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

Verify:
```bash
node --version
npm --version
```

### Step 3: Install Required Tools

```bash
sudo npm install -g pm2
sudo apt install -y nginx git postgresql postgresql-contrib
```

### Step 4: Start Services

```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
sudo systemctl start nginx
sudo systemctl enable nginx
```

---

## Database Setup

### Step 1: Create PostgreSQL User & Database

```bash
sudo -u postgres psql -c "CREATE USER essence_user WITH PASSWORD 'essence123';"
```

```bash
sudo -u postgres psql -c "CREATE DATABASE essence_store OWNER essence_user;"
```

```bash
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE essence_store TO essence_user;"
```

### Step 2: Verify

```bash
sudo systemctl status postgresql
```

### Step 3: Migrate Data from Local Database

**On your local PC:**
```bash
"C:\Program Files\PostgreSQL\18\bin\pg_dump" -U postgres -h localhost --data-only essence_db > essence_data.sql
```

**Transfer to server (from local PC):**
```bash
scp -i C:\Users\meera\Downloads\essencestorekey.pem C:\Users\meera\essence_data.sql ubuntu@13.229.93.26:/home/ubuntu/
```

**On server, import data:**
```bash
sudo -u postgres psql essence_store < /home/ubuntu/essence_data.sql
```

**Verify import:**
```bash
sudo -u postgres psql -c "\dt" essence_store
```

---

## Project Deployment

### Step 1: Clone Repository

```bash
sudo mkdir -p /var/www
sudo chown ubuntu:ubuntu /var/www
cd /var/www
git clone https://YOUR_TOKEN@github.com/YOUR_USERNAME/YOUR_REPO.git EssenceStore
cd EssenceStore
```

### Step 2: Create Environment Files

**For mystore (.env file - NOT .env.local):**
```bash
nano /var/www/EssenceStore/mystore/.env
```

Add:
```
DATABASE_URL="postgresql://essence_user:essence123@localhost:5432/essence_store"
NODE_ENV=production
NEXT_PUBLIC_API_URL=http://13.229.93.26/api
```

**For essence-admin:**
```bash
nano /var/www/EssenceStore/essence-admin/.env
```

Add:
```
DATABASE_URL="postgresql://essence_user:essence123@localhost:5432/essence_store"
NODE_ENV=production
NEXT_PUBLIC_API_URL=http://13.229.93.26/api
```

**For gateway (if needed):**
```bash
nano /var/www/EssenceStore/gateway/.env
```

Add:
```
NODE_ENV=production
PORT=5000
DATABASE_URL="postgresql://essence_user:essence123@localhost:5432/essence_store"
```

### Step 3: Install Dependencies

```bash
cd /var/www/EssenceStore
npm install
```

This automatically runs `postinstall` script which installs dependencies for mystore, essence-admin, and gateway.

### Step 4: Generate Prisma Client

```bash
cd /var/www/EssenceStore/mystore && npx prisma generate
cd /var/www/EssenceStore/mystore && npx prisma migrate deploy
```

```bash
cd /var/www/EssenceStore/essence-admin && npx prisma generate
cd /var/www/EssenceStore/essence-admin && npx prisma migrate deploy
```

### Step 5: Build Project

```bash
cd /var/www/EssenceStore
npm run build
```

### Step 6: Create PM2 Ecosystem File

```bash
cat > /var/www/EssenceStore/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: 'gateway',
      script: 'npm',
      args: 'start --prefix gateway',
      env: { NODE_ENV: 'production', PORT: 5000 }
    },
    {
      name: 'mystore',
      script: 'npm',
      args: 'start --prefix mystore',
      env: { NODE_ENV: 'production', PORT: 3000, NEXT_PUBLIC_API_URL: 'http://13.229.93.26/api' }
    },
    {
      name: 'essence-admin',
      script: 'npm',
      args: 'start --prefix essence-admin',
      env: { NODE_ENV: 'production', PORT: 3001, NEXT_PUBLIC_API_URL: 'http://13.229.93.26/api' }
    }
  ]
};
EOF
```

### Step 7: Start Services with PM2

```bash
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

Verify status:
```bash
pm2 status
```

### Step 8: Configure Nginx Reverse Proxy

```bash
sudo tee /etc/nginx/sites-available/default > /dev/null << 'EOF'
upstream mystore { server localhost:3000; }
upstream admin { server localhost:3001; }
upstream gateway { server localhost:5000; }

server {
    listen 80 default_server;
    server_name _;
    
    location / {
        proxy_pass http://mystore;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
    location /admin {
        proxy_pass http://admin;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
    location /api {
        proxy_pass http://gateway;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF
```

### Step 9: Test & Restart Nginx

```bash
sudo nginx -t
sudo systemctl restart nginx
```

---

## Problems Encountered & Solutions

### Problem 1: SSH Permission Denied (Public Key)

**Error:**
```
Permission denied (publickey).
```

**Solution:**
- Use correct key file path
- Ensure key has correct permissions: `chmod 400 essencestorekey.pem`
- Verify IP address is correct
- Key file must be `.pem` format from AWS

---

### Problem 2: Key File Not Found in Home Directory

**Error:**
```
Warning: Identity file my-app-key.pem not accessible: No such file or directory.
```

**Solution:**
- Download key from AWS EC2 Key Pairs console
- Place in ~/Downloads folder
- Use full path: `~/Downloads/essencestorekey.pem`
- In MobaXterm, use file browser to locate key

---

### Problem 3: Prisma Client Not Initialized

**Error:**
```
Error: @prisma/client did not initialize yet. Please run "prisma generate"
```

**Solution:**
Run for each service:
```bash
cd /var/www/EssenceStore/mystore
npx prisma generate
npx prisma migrate deploy
```

Ensure `.env` file (not `.env.local`) exists with DATABASE_URL

---

### Problem 4: Environment Variable DATABASE_URL Not Found

**Error:**
```
error: Environment variable not found: DATABASE_URL.
```

**Solution:**
- Prisma reads `.env` file, NOT `.env.local`
- Create `.env` file (not `.env.local`) in each service directory
- Add: `DATABASE_URL="postgresql://essence_user:essence123@localhost:5432/essence_store"`

---

### Problem 5: Next.js Build Error - useSearchParams Suspense

**Error:**
```
useSearchParams() should be wrapped in a suspense boundary at page "/404"
```

**Solution:**
- Fix in your code by wrapping `useSearchParams()` in Suspense component
- Or add `export const dynamic = 'force-dynamic'` to root layout
- Rebuild: `npm run build`

---

### Problem 6: PM2 Services Errored (Status Shows 0 PID)

**Error:**
```
| id │ name             │ status    │ pid      │
├────┼──────────────────┼───────────┼──────────┤
│ 0  │ mystore          │ errored   │ 0        │
```

**Solution:**
- Check logs: `pm2 logs`
- Common causes:
  - Missing .env file
  - Prisma not generated
  - Database not set up
  - Build failed
- Fix underlying issue and restart: `pm2 restart all`

---

### Problem 7: PostgreSQL Password Authentication Failed

**Error:**
```
FATAL: password authentication failed for user "essence_user"
```

**Solution:**
- Reset password:
  ```bash
  sudo -u postgres psql -c "ALTER USER essence_user WITH PASSWORD 'essence123';"
  ```
- Verify user exists:
  ```bash
  sudo -u postgres psql -c "\du"
  ```
- Use postgres superuser to restore:
  ```bash
  sudo -u postgres psql essence_store < /home/ubuntu/essence_data.sql
  ```

---

### Problem 8: Database Not Found During Dump

**Error:**
```
pg_dump: error: database "essence_db" does not exist
```

**Solution:**
- `essence_db` is your LOCAL database
- `essence_store` is the SERVER database
- Export from local, import to server
- Command sequence:
  1. Local PC: `pg_dump -U postgres -h localhost --data-only essence_db > essence_data.sql`
  2. Transfer: `scp essence_data.sql ubuntu@13.229.93.26:/home/ubuntu/`
  3. Server: `sudo -u postgres psql essence_store < /home/ubuntu/essence_data.sql`

---

### Problem 9: pg_dump Command Not Found on Local PC

**Error:**
```
'pg_dump' is not recognized as an internal or external command
```

**Solution:**
- PostgreSQL not in system PATH
- Use full path:
  ```bash
  "C:\Program Files\PostgreSQL\18\bin\pg_dump" -U postgres -h localhost --data-only essence_db > essence_data.sql
  ```
- Or add to PATH and restart Command Prompt
- Find version: `"C:\Program Files\PostgreSQL\18\bin\psql" --version`

---

### Problem 10: scp Command Run on Wrong Machine

**Error:**
```
Warning: Identity file /home/ubuntu/Downloads/essencestorekey.pem not accessible
```

**Solution:**
- scp command must run on LOCAL PC, NOT server SSH
- Open new Command Prompt on Windows (not MobaXterm SSH)
- Then run scp with full local paths

---

### Problem 11: File Pasting Issues in Terminal

**Issue:**
```
^[[200~npm run build
```

**Solution:**
- Copy one command at a time
- Use individual code blocks
- In MobaXterm, paste carefully or type manually
- Some terminals have paste formatting issues

---

### Problem 12: Monorepo Postinstall Script

**Issue:**
Understanding the `postinstall` script and monorepo structure

**Solution:**
Root `package.json` has:
```json
{
  "scripts": {
    "postinstall": "npm install --prefix mystore && npm install --prefix essence-admin && npm install --prefix gateway"
  }
}
```

When you run `npm install` in root, it automatically installs dependencies for all three services.

---

## Accessing Your Application

Once deployed, access your services at:

| Service | URL | Port |
|---------|-----|------|
| **Store** | http://13.229.93.26 | 3000 |
| **Admin Panel** | http://13.229.93.26/admin | 3001 |
| **API/Gateway** | http://13.229.93.26/api | 5000 |

Nginx reverse proxy routes:
- `/` → mystore (Port 3000)
- `/admin` → essence-admin (Port 3001)
- `/api` → gateway (Port 5000)

---

## Monitoring & Maintenance

### Check Service Status

```bash
pm2 status
```

### View Logs

```bash
pm2 logs                    # All services
pm2 logs mystore           # Specific service
pm2 logs essence-admin
pm2 logs gateway
```

### Restart Services

```bash
pm2 restart all            # All services
pm2 restart mystore        # Specific service
pm2 stop all               # Stop all
pm2 start ecosystem.config.js  # Start all
```

### Monitor in Real-time

```bash
pm2 monit
```

### Check Nginx Status

```bash
sudo systemctl status nginx
sudo systemctl restart nginx
sudo nginx -t              # Test config
```

### Check PostgreSQL Status

```bash
sudo systemctl status postgresql
```

### Database Backup

```bash
sudo -u postgres pg_dump essence_store > backup.sql
```

### Database Restore

```bash
sudo -u postgres psql essence_store < backup.sql
```

---

## Deployment Credentials

### Database

| Setting | Value |
|---------|-------|
| **User** | essence_user |
| **Password** | essence123 |
| **Database** | essence_store |
| **Host** | localhost (or 13.229.93.26) |
| **Port** | 5432 |

### Environment Variables

```
DATABASE_URL="postgresql://essence_user:essence123@localhost:5432/essence_store"
NODE_ENV=production
NEXT_PUBLIC_API_URL=http://13.229.93.26/api
```

### Server Access

| Type | Value |
|------|-------|
| **IP Address** | 13.229.93.26 |
| **SSH User** | ubuntu |
| **SSH Key** | essencestorekey.pem |
| **SSH Port** | 22 |

---

## Update & Redeploy Process

To push new code to production:

```bash
# On server
cd /var/www/EssenceStore

# Pull latest code
git pull origin main

# Install new dependencies
npm install

# Rebuild
npm run build

# Restart services
pm2 restart all

# Check logs
pm2 logs
```

Or create a deploy script:

```bash
#!/bin/bash
cd /var/www/EssenceStore
git pull origin main
npm install
npm run build
pm2 restart all
echo "✅ Deployment complete!"
```

Save as `deploy.sh` and run:
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## Troubleshooting Checklist

- [ ] PostgreSQL is running: `sudo systemctl status postgresql`
- [ ] Nginx is running: `sudo systemctl status nginx`
- [ ] PM2 shows all services online: `pm2 status`
- [ ] .env files exist in each service directory
- [ ] Prisma client generated: Check `.env` files exist
- [ ] Database connection working: `sudo -u postgres psql essence_store`
- [ ] Port access: `sudo netstat -tlnp | grep -E '3000|3001|5000'`
- [ ] Security groups allow ports 80, 443, 22, 3000, 3001, 5000
- [ ] IP address is correct: `curl http://13.229.93.26`

---

## Summary

This deployment successfully hosted the Essence Store monorepo on AWS EC2 with:
- ✅ Node.js v20 runtime
- ✅ PostgreSQL database with migrated data
- ✅ Three independent services (mystore, essence-admin, gateway)
- ✅ PM2 process management
- ✅ Nginx reverse proxy
- ✅ Production-ready configuration

All services are running and accessible through a single IP address with path-based routing.

---

## Support & Next Steps

**Future Improvements:**
- Add SSL/HTTPS certificate (Let's Encrypt)
- Set up auto-backups
- Implement CI/CD pipeline
- Add monitoring tools (New Relic, DataDog)
- Scale to multiple instances
- Use RDS for managed database

**Documentation:** This guide
**Repository:** https://github.com/meerabawais/EssenceStore
**Server IP:** 13.229.93.26
