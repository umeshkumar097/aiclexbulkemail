#!/bin/bash
SERVER_IP="151.243.146.192"
USER="root"
DOMAIN="mail.ro9.in"

echo "=== Fixing Nginx IP Binding ==="

# Update Nginx config to listen on specific IP
ssh $USER@$SERVER_IP "cat > /etc/nginx/sites-available/${DOMAIN} <<EOF
server {
    listen ${SERVER_IP}:80;
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

echo "Reloading Nginx..."
ssh $USER@$SERVER_IP "nginx -t && systemctl reload nginx"

echo "Checking with curl locally on server..."
ssh $USER@$SERVER_IP "curl -I http://${DOMAIN}"
