FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 8089
CMD [ "npm", "start"]
