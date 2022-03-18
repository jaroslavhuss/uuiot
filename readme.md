# uuIOT official repository

## The team

- Jaroslav Huss
- Jan Vojáček
- Róbert Kuzma
- Lukáš Bříza
- Jiří Hejtmánek
- Alan Kováč

## Weather Station Arudino

1. Download the code from https://github.com/jaroslavhuss/uuiot/blob/master/weatherstation/sketch_feb24a/sketch_feb24a.ino and flash it on the Arduino
2. It will require a library for DHT22 - just google it and upload it along with the code.

## Gateway

1. I am using RPi Ubuntu, u need to have nodejs installed
2. I recommend to intall everything in a root folder in order to avoid problem with paths

3. type ```npm init -y```
4. type ```touch weatherimporter.js```
5. type ```npm install dontenv axios node-cron node-red```
6. Into ```weatherimporter.js``` place a code from https://github.com/jaroslavhuss/uuiot/blob/master/gateway/weatherimporter.js

### Now we need to setup node-red


## How to prepare your environment for the local development

1. sudo npm install -g typescript
2. cd server && npm install
3. touch .env
4. cd ..
5. cd client && npm install

## In server/.env file few lines must be saved

DB_LOCAL = mongodb://127.0.0.1:27017/iot \
DB_PRODUCTION = this string is provided by Honza or Jarda \
DEV_MODE = This is ENUM type development|production \
JWT_SECRET = JWT secret - Jarda can provide it \
JWT_EXPIRE = 60min
TEST = false
## How to run whole dev environment with one command (FE and BE)

cd server && npm run dev
## Weather station schema

![DHT22 Schema](dht22_schema.png)