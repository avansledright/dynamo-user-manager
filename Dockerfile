FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache aws-cli

COPY tsconfig.json ./
COPY next.config.js ./
COPY package.json ./

RUN npm install

COPY app ./app
RUN mkdir -p pages/api
COPY app/src/api/signup.ts ./pages/api/
COPY app/src/api/login.ts ./pages/api/
COPY app/src/pages/*.tsx ./pages/

EXPOSE 3000

ENV AWS_SDK_LOAD_CONFIG=1

CMD ["/bin/sh", "-c", "eval $(aws configure export-credentials --format env) && npm run dev"]