#!/bin/bash
SERVER_IP="151.243.146.192"
USER="root"

echo "=== Nginx Config Debug ==="

# 1. List all enabled sites
echo "Enabled Sites:"
ssh $USER@$SERVER_IP "ls -l /etc/nginx/sites-enabled/"

# 2. Find file containing 'app.ro9.in' (The redirect destination)
echo -e "\nFinding config causing redirect to app.ro9.in:"
ssh $USER@$SERVER_IP "grep -r 'app.ro9.in' /etc/nginx/sites-enabled/"

# 3. Check if mail.ro9.in is actually enabled
echo -e "\nChecking mail.ro9.in config:"
ssh $USER@$SERVER_IP "cat /etc/nginx/sites-enabled/mail.ro9.in"

# 4. Test Nginx Config
echo -e "\nNginx Test Result:"
ssh $USER@$SERVER_IP "nginx -t"
