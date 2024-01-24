FROM node:16-alpine AS builder


WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

FROM node:16-alpine AS final

WORKDIR /app

COPY --from=builder ./app/dist ./dist

COPY package*.json .

ENV NODE_ENV=production
RUN npm install --only=production

CMD ["npm", "run", "start"]