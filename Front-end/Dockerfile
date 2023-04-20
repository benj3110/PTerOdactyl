FROM node:18-alpine

WORKDIR /app

COPY ./package*json .

# ENV NODE_ENV=development

RUN npm ci

COPY . .

EXPOSE 5173

CMD ["npm", "run" ,"dev"]