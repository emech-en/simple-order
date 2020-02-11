FROM node:12-alpine3.10

WORKDIR "/app"

COPY ./package.json ./yarn.lock ./tsconfig.build.json ./tsconfig.json  ./
COPY ./src ./src

RUN yarn install
RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start:prod" ]
