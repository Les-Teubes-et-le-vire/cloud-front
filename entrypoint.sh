#!/bin/sh
set -e

# Generate nginx config with env vars substituted
# Using heredoc so nginx variables ($uri, $proxy_host) are escaped
# while shell variables ($PORT, $BACKEND_URL) are expanded
cat > /etc/nginx/conf.d/default.conf << EOF
server {
    listen ${PORT:-8080};
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location /api/ {
        proxy_pass ${BACKEND_URL}/;
        proxy_ssl_server_name on;
        proxy_set_header Host \$proxy_host;
    }
}
EOF

exec nginx -g 'daemon off;'
