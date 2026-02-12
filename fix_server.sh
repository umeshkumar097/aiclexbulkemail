#!/bin/bash

# Configuration
SERVER_IP="151.243.146.192"
USER="root"
DOMAIN="mail.ro9.in"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}Fixing Nginx Configuration on ${SERVER_IP}...${NC}"

# 1. Check Docker Status
echo "Checking if App Container is running..."
ssh $USER@$SERVER_IP "docker ps | grep mailsysem"

# 2. Disable 'default' Nginx config if it exists (often causes conflicts)
echo "Removing default Nginx config..."
ssh $USER@$SERVER_IP "rm -f /etc/nginx/sites-enabled/default"

# 3. Check for other conflicting configs (Wildcards)
echo "Checking for conflicting configs..."
ssh $USER@$SERVER_IP "grep -r 'server_name' /etc/nginx/sites-enabled/"

# 4. Overwrite mail.ro9.in Config explicitly
echo "Applying correct Nginx config..."
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

# 5. Enable Site & Restart Nginx
echo "Restarting Nginx..."
ssh $USER@$SERVER_IP "ln -sf /etc/nginx/sites-available/${DOMAIN} /etc/nginx/sites-enabled/"
ssh $USER@$SERVER_IP "nginx -t && systemctl restart nginx"

# 6. Re-run Certbot (Force SSL)
echo -e "${GREEN}Applying SSL Certificate...${NC}"
ssh -t $USER@$SERVER_IP "certbot --nginx -d ${DOMAIN} --redirect --non-interactive --agree-tos --register-unsafely-without-email"

echo -e "${GREEN}Fix Complete! Try verifying with: curl -I https://${DOMAIN}${NC}"
