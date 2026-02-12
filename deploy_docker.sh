#!/bin/bash

# Configuration
SERVER_IP="151.243.146.192"
USER="root"
DOMAIN="mail.ro9.in"
APP_DIR="/var/www/mailsysem"
REPO_URL="https://github.com/umeshkumar097/aiclexbulkemail.git"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${GREEN}Starting Docker Deployment to ${SERVER_IP}...${NC}"
echo "You will be asked for the server password multiple times."

# 1. Update System & Install Docker (if missing)
echo -e "${BLUE}[1/7] Checking/Installing Docker...${NC}"
ssh $USER@$SERVER_IP "
    if ! command -v docker &> /dev/null; then
        echo 'Installing Docker...'
        apt update && apt install -y docker.io docker-compose
        systemctl start docker
        systemctl enable docker
    else
        echo 'Docker already installed.'
    fi
"

# 2. Setup App Directory & Git
echo -e "${BLUE}[2/7] improved Git setup...${NC}"
ssh $USER@$SERVER_IP "mkdir -p ${APP_DIR} && chown -R $USER:$USER ${APP_DIR}"
ssh $USER@$SERVER_IP "
    if [ -d '${APP_DIR}/.git' ]; then 
        echo 'Pulling latest changes...'
        cd ${APP_DIR} && git pull origin main
    else 
        echo 'Cloning repository...'
        git clone ${REPO_URL} ${APP_DIR}
    fi
"

# 3. Create .env file (Production Values)
echo -e "${BLUE}[3/7] Configuring Environment...${NC}"
ssh $USER@$SERVER_IP "cat > ${APP_DIR}/.env <<EOF
DATABASE_URL='postgresql://neondb_owner:npg_YWVu3E7zMSBL@ep-billowing-paper-aidx5mso-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require'
NEXTAUTH_URL='https://${DOMAIN}'
NEXTAUTH_SECRET='w6qPW+VwcL/a2JJW+qVtvVOtPMIn3ym20kZKqS9KxKI='
REDIS_URL='redis://redis:6379'
ENCRYPTION_KEY='06726082a766cc573df0f52f5b523066'
EOF"

# 4. Build & Start Containers
echo -e "${BLUE}[4/7] Building and Starting Containers...${NC}"
ssh $USER@$SERVER_IP "cd ${APP_DIR} && docker-compose down && docker-compose up -d --build"

# 5. Database Migration (inside container)
echo -e "${BLUE}[5/7] Running Database Migrations...${NC}"
# Wait a bit for container to be ready
sleep 10
ssh $USER@$SERVER_IP "cd ${APP_DIR} && docker-compose exec -T mailsysem npx prisma migrate deploy"

# 6. Configure Host Nginx
echo -e "${BLUE}[6/7] Configuring Host Nginx...${NC}"
ssh $USER@$SERVER_IP "cat > /etc/nginx/sites-available/${DOMAIN} <<EOF
server {
    listen 80;
    server_name ${DOMAIN};

    location / {
        proxy_pass http://localhost:3005;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \\\$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \\\$host;
        proxy_cache_bypass \\\$http_upgrade;
    }
}
EOF"

ssh $USER@$SERVER_IP "ln -sf /etc/nginx/sites-available/${DOMAIN} /etc/nginx/sites-enabled/ && nginx -t && systemctl restart nginx"

# 7. SSL with Certbot
echo -e "${BLUE}[7/7] Use Certbot for SSL...${NC}"
echo "Running certbot interactively on the server..."
ssh -t $USER@$SERVER_IP "certbot --nginx -d ${DOMAIN}"

echo -e "${GREEN}Docker Deployment Complete! Visit https://${DOMAIN}${NC}"
