#!/bin/bash

# Configuration
SERVER_IP="151.243.146.192"
USER="root"
DOMAIN="mail.ro9.in"
APP_DIR="/var/www/mailsysem"
REPO_URL="https://github.com/umeshkumar097/aiclexbulkemail.git"

# Colors
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${GREEN}Starting Deployment to ${SERVER_IP}...${NC}"
echo "You will be asked for the server password multiple times."

# 1. Update System
ssh $USER@$SERVER_IP "apt update && apt upgrade -y"

# 2. Install Node.js 18
ssh $USER@$SERVER_IP "curl -fsSL https://deb.nodesource.com/setup_18.x | 00 bash - && apt-get install -y nodejs"

# 3. Install Dependencies (Nginx, Git, Certbot)
ssh $USER@$SERVER_IP "apt install -y nginx git certbot python3-certbot-nginx"

# 4. Install PM2
ssh $USER@$SERVER_IP "npm install -g pm2"

# 5. Setup App Directory
ssh $USER@$SERVER_IP "mkdir -p ${APP_DIR} && chown -R $USER:$USER ${APP_DIR}"

# 6. Clone/Pull Repo
ssh $USER@$SERVER_IP "if [ -d '${APP_DIR}/.git' ]; then cd ${APP_DIR} && git pull; else git clone ${REPO_URL} ${APP_DIR}; fi"

# 7. Install App Dependencies & Build
ssh $USER@$SERVER_IP "cd ${APP_DIR} && npm install && npm run build"

# 8. Create .env file (Interactive or Pre-filled)
echo "Creating .env file on server..."
# Note: You should replace these with actual production values or prompt the user
ssh $USER@$SERVER_IP "cat > ${APP_DIR}/.env <<EOF
DATABASE_URL='postgresql://neondb_owner:npg_YWVu3E7zMSBL@ep-billowing-paper-aidx5mso-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require'
NEXTAUTH_URL='https://${DOMAIN}'
NEXTAUTH_SECRET='w6qPW+VwcL/a2JJW+qVtvVOtPMIn3ym20kZKqS9KxKI='
REDIS_URL='redis://localhost:6379' 
ENCRYPTION_KEY='06726082a766cc573df0f52f5b523066'
EOF"

# 9. Database Migration
ssh $USER@$SERVER_IP "cd ${APP_DIR} && npx prisma migrate deploy"

# 10. Start App with PM2
ssh $USER@$SERVER_IP "cd ${APP_DIR} && pm2 start npm --name 'mailsysem' -- start -- -p 3000 || pm2 restart mailsysem"
ssh $USER@$SERVER_IP "pm2 save && pm2 startup"

# 11. Configure Nginx
ssh $USER@$SERVER_IP "cat > /etc/nginx/sites-available/${DOMAIN} <<EOF
server {
    listen 80;
    server_name ${DOMAIN};

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \\\$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \\\$host;
        proxy_cache_bypass \\\$http_upgrade;
    }
}
EOF"

ssh $USER@$SERVER_IP "ln -sf /etc/nginx/sites-available/${DOMAIN} /etc/nginx/sites-enabled/ && nginx -t && systemctl restart nginx"

# 12. Setup SSL (Certbot) - Interactive
echo -e "${GREEN}Setting up SSL... Follow the prompts!${NC}"
ssh -t $USER@$SERVER_IP "certbot --nginx -d ${DOMAIN}"

echo -e "${GREEN}Deployment Complete! Visit https://${DOMAIN}${NC}"
