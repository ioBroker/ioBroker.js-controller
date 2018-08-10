![Logo](media/maxcul.png)
# ioBroker.maxcul
==================================
[![NPM version](http://img.shields.io/npm/v/iobroker.maxcul.svg)](https://www.npmjs.com/package/iobroker.maxcul)
[![Downloads](https://img.shields.io/npm/dm/iobroker.maxcul.svg)](https://www.npmjs.com/package/iobroker.maxcul)
[![Tests](https://travis-ci.org/ioBroker/ioBroker.maxcul.svg?branch=master)](https://travis-ci.org/ioBroker/ioBroker.maxcul)

[![NPM](https://nodei.co/npm/iobroker.maxcul.png?downloads=true)](https://nodei.co/npm/iobroker.maxcul/)

ioBroker adapter to control Max! via [CUL](http://busware.de/tiki-index.php?page=CUL)

Adapter is derived from [pimatic-maxcul](https://github.com/fbeek/pimatic-maxcul)

## Supported devices

- Thermostat
- Door/window sensor
- Push button

## Usage
Before using you must first pair the devcies with ioBroker.
E.g. for thermostats press longer the "boost" button till the countdown will start.

## Changelog
### 0.5.3 (2018-03-25)
* (skraw.iobroker) Optimize logic to send commands and scanning

### 0.5.1 (2018-03-07)
* (Apollon77) Further fixes

### 0.5.0 (2018-02-25)
* (Apollon77) Fix Serial data parsing
* (bluefox) Admin3 ready

### 0.4.1 (2018-02-15)
* (Apollon77) Upgrade dependencies

### 0.4.0 (2018-01-24)
* (Apollon77) Upgrade Serialport and cul library

### 0.3.0 (2017-06-21)
* (bowao) Fix control of thermostates

### 0.2.3 (2017-04-11)
* (bluefox) Fix calculation of serial number
* (bluefox) Add valve configuration

### 0.2.0 (2017-04-11)
* (bluefox) Activate thermostat scanner

### 0.1.1 (2017-04-10)
* (bluefox) intial commit

## License

[Licensed under GPLv2](LICENSE) Copyright (c) 2017-2018 bluefox
