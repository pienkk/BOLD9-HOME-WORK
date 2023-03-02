FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g pm2

COPY . .

RUN npx prisma generate

RUN npm run build


EXPOSE 3000

CMD [ "npm", "start"]
