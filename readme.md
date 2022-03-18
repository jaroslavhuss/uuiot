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

I forgot to mention - you need to also ```touch .env``` and place credentials there as followed:

GW_USERNAME = Name of your GW (u have created this in cloud) \
GW_PASSWORD = Password to the GW (u have created this as well)

### Now we need to setup node-red

7. Open console on RPi and type ```node-red```
8. this will start a local server. To access it you need to know your RPi IP address - mine runs on ```http://10.0.1.29:1880/```
9. You have to import a json file into node-red UI from https://github.com/jaroslavhuss/uuiot/blob/master/gateway/node-red.json
10. Do not forget to deploy changes done on node-red

### How to run the script on boot? 

The best way I found is described here: https://nodered.org/docs/faq/starting-node-red-on-boot

Basically you need to type just this:

1. sudo npm install -g pm2
2. navigate to the folder where you downloaded the project (```weatherimporter.js```)
3. Hit ```pm2 start weatherimporter.js --node-args="--max-old-space-size=128" -- -v```
4. Update the list of tasks ```pm2 save```
5. Lastyl hit ```pm2 startup``` - this will spill the command for @boot
6. Just take that fakin command and place it into console
7. Hit ```sudo reboot``` and u are fakin done! 

## Weather station schema

![DHT22 Schema](dht22_schema.png)