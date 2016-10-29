FROM nginx:stable-alpine
ADD ./docs /usr/share/nginx/html
RUN echo 'server {  listen 80;  server_name localhost;  root /usr/share/nginx/html;  location / {    try_files $uri @rewrites;  }  location @rewrites {    rewrite ^(.+)$ /index.html last;  }}' > /etc/nginx/conf.d/clickhouse.conf
