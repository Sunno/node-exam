# How to install and run project

## Requirements

This is the environment I developed the project

- node 10.18.1
- yarn 1.21.1
- mysql 5.7

## Install dependencies

```bash
yarn install
```
## Create a .env file in project root with a content like this

```
DATABASE_HOST='127.0.0.1'
DATABASE_USER='nodeexam'
DATABASE_PASSWORD='nodeexam'
DATABASE_NAME='nodeexam'
```

## Create Database

```mysql
CREATE SCHEMA `nodeexam` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ;
```

## Install table

```bash
node install_db.js
```

## Run server

```bash
node app.js
```