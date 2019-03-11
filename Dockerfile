FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY . .

EXPOSE "8443"
EXPOSE "8080"
