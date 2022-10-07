FROM node:18-alpine3.14
WORKDIR /srv
COPY . .
RUN npm install serve -g
EXPOSE 8080
ENTRYPOINT [ "serve", "-s", "build", "-p", "8080" ]
