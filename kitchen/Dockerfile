FROM node:alpine

WORKDIR /app
COPY package*.json /app/
COPY tsconfig.json /app/
COPY src /app/src/

RUN npm install
RUN npm run build
COPY . .

EXPOSE 3000

CMD ["npm", "start"]