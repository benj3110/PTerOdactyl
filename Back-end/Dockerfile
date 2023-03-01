FROM node:18-alpine

RUN npm i -g nodemon

WORKDIR /app

COPY ./package*json .

RUN npm ci

COPY . .

EXPOSE 8000

CMD ["npm", "run", "dev"]