FROM node:18-alpine3.14
WORKDIR /srv
COPY . .
RUN npm install
EXPOSE 8080
ENTRYPOINT [ "npm", "run", "start" ]
