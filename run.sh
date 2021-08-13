# Run inside devcontainer
ls /workspaces/darts;
cat >/etc/nginx/sites-enabled/current <<EOF
server {
       listen 8888;
       listen [::]:8888;

       server_name darts;

       root /workspaces/darts/dist;
       index index.html;

       location / {
               try_files $uri $uri/ =404;
       }
}
EOF

service nginx start;
npm run build;
