FROM node:18-alpine as angular-build
WORKDIR /usr/src/app/
RUN chmod 777 /usr/src/app
COPY package.json package.json
RUN npm install --dev --silent
COPY . .
RUN npm install -g @angular/cli
RUN npm i @angular/material
RUN ng build --prod --verbose=true

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/*
COPY --from=angular-build /usr/src/app/dist/. /usr/share/nginx/html/.
EXPOSE 80 443
CMD [ "nginx", "-g", "daemon off;" ]
