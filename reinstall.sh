#!/bin/bash
iobroker stop
ls -1 ./node_modules | grep iobroker. > list.txt
cd node_modules; 
rm * -R
cd ..
while read in; do npm install $in --production; cd node_modules/$in/; npm install --production; cd ../..; done < list.txt
chmod 777 * -R
rm list.txt
iobroker upload all