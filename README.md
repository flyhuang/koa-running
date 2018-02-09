# Koa Sequelize Start Kit

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](https://nodejs.org/en/) Node ^8.4.0, npm ^5.3.0
- [gulp](http://gulpjs.com/) (`npm install -g gulp-cli`)
- [Mysql](https://www.mysql.com/) (`brew install mysql`)  Mysql ^5.6.20
- [ES6](http://es6.ruanyifeng.com/#docs/intro) - [BookList](https://github.com/ericdouglas/ES6-Learning)
- [ES7](https://github.com/w3c-html-ig-zh/es7)

### Setup

Run `npm install` to install server dependencies.

### Develop

Run `gulp` to start a node server and watch the source code

### Debug

1. Select **babel-node** as node interceptor (`npm install babel-cli`)
2. Start debug **server/index.js** in ide

### Build

- Run `gulp build` to build ci package
- Run `gulp prod` to build prod package


## Dependency

- watch and hot-reload: [nodemon](http://nodemon.io/)
- compile: [babel](http://babeljs.io/)
- build: [gulp](http://gulpjs.com/)

## TODO
- db migrations
- project deploy
- auth
