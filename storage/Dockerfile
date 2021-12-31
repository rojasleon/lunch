FROM node:alpine

WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY src /app/src/

RUN npm install --force
RUN npm run build
COPY . .

EXPOSE 3000

CMD ["npm", "start"]