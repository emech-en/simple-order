# Simple Order Api

[![Build Status](https://travis-ci.org/emech-en/simple-order.svg?branch=master)](https://travis-ci.org/emech-en/simple-order)
[![Coverage Status](https://coveralls.io/repos/github/emech-en/simple-order/badge.svg?branch=master)](https://coveralls.io/github/emech-en/simple-order?branch=master)

**Simple Order API** is a simple rest API created with the excellent [NestJs Framework](https://nestjs.com/). This API server has only one functional endpoint `[post] /api/order` which, receives the order's JSON object and saves it in a database.

The purpose of this project is to demonstrate the followings:

- Development of an **extensible** backend service with `TypeScript` and `NestJs` framework.
- Using [`TypeORM`](https://typeorm.io/) to design data models and insert / query data.
- Application of the **SOLID** principles:
  - Single Responsibility
  - Open/Closed Principle
  - Liskov Substitution
  - Interface Segregation
  - Dependency Inversion
- Automatic software testing with [`jest`](https://jestjs.io/) and achieving almost 100% code coverage:
  - Unit Tests
  - End-to-End Tests
- Containerization with `Docker` and `docker-compose`
- Using CI/CD tools:
  - [Travis CI](https://travis-ci.org/) to automatically run tests, build docker images and push to docker hub.
  - [Coveralls](https://coveralls.io/) to store test coverage reports.
- Usage of `Swagger` to document the API specifications

## Project Structure

- `src/` contains all typescript source files
  - `dto/` contains data type definitions for api interfaces
  - `models/` contains data models and entities
  - `services/` contains services required for creating and validating Orders and Products
  - `app.module.ts` file is the main Nest module and contains the dependency injection configurations
  - `order.controller.ts` file is the controller class to handler `api/order` endpoint
  - `*.spec.ts` files are the unit tests files (for example `order.controller.spec.ts`)
- `test/` directory contains e2e tests

## Extensibility vs Simplicity

According to the __`KISS`__ Principle (Keep It Stupid Simple), the complexity of this project seems too high for now. But there is a consideration for support new product and order types in the future with minimum changes:
1. Define new Product and Order types in the `dto/` and `models/` directories.
2. Implement their associated handlers in the `services/` folder.
3. Register new handlers in the `app.module.ts` file.

## Online Resources

- [The project's Swagger documentation](http://localhost:3000/docs) is under `http://localhost:3000/docs` path
- [Docker Hub page containing the docker images](https://hub.docker.com/repository/docker/emech/simple-order/general)
- [Travis CI page to show test results and build status](https://travis-ci.org/emech-en/simple-order)
- [Coveralls page to show test coverage results](https://coveralls.io/github/emech-en/simple-order)

## Requirements

- node.js
- yarn
- postgres databases:
  - `simple_order` for development
  - `simple_order_test` for e2e tests

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production build 
$ yarn build

# production mode
$ yarn start:prod
```

## Test

```bash
# run all tests and calculate the coverage
$ yarn test

# unit tests only
$ yarn test:unit

# e2e tests only
$ yarn test:e2e
```

## Deployment

```bash
$ docker-compose up 
```

## Stay in touch

- Author: [Emech En](https://github.com/emech-en) < [mh.niroomand91@gmail.com](mailto:mh.niroomand91@gmail.com?Subject=Simple-Order) >
