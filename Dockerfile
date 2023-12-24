FROM node:18-slim

WORKDIR /app
COPY ./package.json .

RUN npm install
COPY . .

EXPOSE 3100
CMD [ "npm", "start" ]