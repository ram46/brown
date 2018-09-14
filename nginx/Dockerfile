FROM nginx:alpine
COPY nginx_brown.conf /etc/nginx/nginx.conf

RUN mkdir /etc/nginx/ssl

COPY ele-one-brown.key /etc/nginx/ssl/ele-one-brown.com.key
COPY ele-one-brown.crt /etc/nginx/ssl/ele-one-brown.com.crt

RUN chmod -R 600 /etc/nginx/ssl