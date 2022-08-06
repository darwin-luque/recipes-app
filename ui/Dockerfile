FROM node:16-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /app/ui

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

CMD ["yarn", "dev"]
