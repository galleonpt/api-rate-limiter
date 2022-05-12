FROM node:16
WORKDIR /app
COPY package.json /app
RUN yarn
COPY . /app

CMD ls node_modules > /dev/null 2>&1 || yarn install && yarn start