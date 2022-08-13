FROM node:lts-alpine

RUN apk add --no-cache libc6-compat
RUN apk --no-cache add --virtual .builds-deps build-base python3

WORKDIR /app/backend

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

CMD ["yarn", "start:dev"]
