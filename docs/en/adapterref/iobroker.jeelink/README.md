![Logo](admin/jeelab_logo.png)
# ioBroker.jeelink
![Number of Installations](http://iobroker.live/badges/jeelink-installed.svg) ![Number of Installations](http://iobroker.live/badges/jeelink-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.jeelink.svg)](https://www.npmjs.com/package/iobroker.jeelink)
[![Downloads](https://img.shields.io/npm/dm/iobroker.jeelink.svg)](https://www.npmjs.com/package/iobroker.jeelink)
[![Build Status](https://travis-ci.org/foxthefox/ioBroker.jeelink.svg?branch=master)](https://travis-ci.org/foxthefox/ioBroker.jeelink)

[![NPM](https://nodei.co/npm/iobroker.jeelink.png?downloads=true)](https://nodei.co/npm/iobroker.jeelink/)

This is an adapter for ioBroker to integrate RFM12B/RFM69 via Jeelink.
The jeelink can be used with the preloaded software (rfmdemo) for the reading of openenergy sensors (emon).
For the usage of LaCrosse sensors, the firmware has to be exchanged (see iobroker forum).

## Installation:
### released version
```javascript
npm install iobroker.jeelink
```
on raspberry it might help to use:
```javascript
 npm install --unsafe-perm iobroker.jeelink
 ```
 because serialport package must be built on unsupported arm-hw 

### the actual development version from github (when under testing, may not work!)
```javascript
npm install https://github.com/foxthefox/ioBroker.jeelink/tarball/master --production
```
or
```javascript
npm install --unsafe-perm https://github.com/foxthefox/ioBroker.jeelink/tarball/master --production
```
## Settings:
- USB port of JeelinkAdapter usually /dev/ttyACME
- Serial Speed usually 57600 Baud

## Configuration:
to be done in admin
* deinition of the USB port
* setting the baudrate
- define sensor address which is received on air
- define unique sensors address within adapter (LaCrosse changes the on air address after battery change, so observe the log and adjust the sensor address after battery change)
- define the type of sensor (see belows examples)
- define the room

## Sensors
|Object|device variants|telegram example|Description|
|--------|-------|:-:|--------|
|emonTH|emonTH|OK 19 ...|sensor from openenergy.org|
|emonWater|emonWater|OK 21 ... |sensor with RFM12B for water metering|
|LaCrosseDTH |TX|OK 9 ... |sensors from LaCrosse, technoline|
|HMS100TF |TXH29DTH-IT|H00 ... |sensors technoline|
|LaCrosseBMP180||OK WS ... |sensor mod, superjee|
|LaCrosseWS|WS1080,TX22,WS1600|OK WS ... |Weather Station|
|EC3000|EC3000|OK 22 ... |Energy Meter|
|EMT7110|EMT7110|OK EMT7110 ... |Energy Meter|
|level|level|OK LS ... |level sensor|

## TODO:
* other sensor types
* put the sensor code in separate file
* pushing new sensor to config, then visible in admin/config page
* HMS100TF Temp below 0°C and battery low to be implemented


## Changelog:
### 0.1.1
* delete buffer function to be compatible with nodejs10
* enhanced automatic testing

### 0.1.0
* compact mode

### 0.0.7
* new level sensor (fhem)

### 0.0.6
* last version of serialport
* new sensor TXH29DTH-IT
* new weather station WS1600
* new sensor EC3000, EMT7110 not verified with life data

### 0.0.5
* adminv3 improved with values2table

### 0.0.4
* command to USB-stick for configuration
* added superjee, BMP180 sensor on jeenode
* admin v3 implementation

### 0.0.3
* abs humidity and dewpoint calculation

### 0.0.2
* definition of unique sensor ID for iobroker datapoint
* implementation of LaCrosseDTH
* definition of sensors via admin

### 0.0.1
* working with 3 sensors emon

## License

The MIT License (MIT)

Copyright (c) 2018 foxthefox <foxthefox@wysiwis.net>
