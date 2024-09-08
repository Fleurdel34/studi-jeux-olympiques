FROM node:22-alpine3.19 AS build

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build --prod

FROM nginx:1.27-alpine3.20

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/frontend-jeuxolympiques/browser /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]
