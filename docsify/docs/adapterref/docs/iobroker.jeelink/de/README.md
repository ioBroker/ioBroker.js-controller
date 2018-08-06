![Logo](media/jeelab_logo.png)
# ioBroker.jeelink
[![NPM version](http://img.shields.io/npm/v/iobroker.jeelink.svg)](https://www.npmjs.com/package/iobroker.jeelink)
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
- define the type of sensor (as of now emonTH, emonWater, LaCrosseDTH, LaCrosseBMP180)
- define the room

## TODO:
* other sensor types
* put the sensor code in separate file
* pushing new sensor to config, then visible in admin/config page


## Changelog:

### 0.0.6
* last version of serialport

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
