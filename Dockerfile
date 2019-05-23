FROM node:11.11.0 as build-stg
ARG ENV
COPY package*.json ./
RUN npm ci && mkdir /ng-app && mv ./node_modules ./ng-app
WORKDIR /ng-app
COPY . .
# RUN rm -rf src/environments/environment.ts
# COPY src/environments/environment.$ENV.ts src/environments/environment.ts

RUN if [ "$ENV" = "prod" ]; then \
    npm run ng build -- --prod; \
    else \
    npm run ng build -- --configuration=$ENV; \
    fi

# RUN npm run ng build -- --output-path=dist
# RUN npm run ng build
# RUN npm run ng build -- --prod
# RUN npm run ng build -- --prod --output-path=dist

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stg /ng-app/dist/ /usr/share/nginx/html

EXPOSE "8443"
EXPOSE "8080"

CMD ["nginx", "-g", "daemon off;"]