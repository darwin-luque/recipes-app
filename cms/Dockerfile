FROM node:lts-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /app/cms

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

CMD ["yarn", "start"]
