![Logo](media/maxcube.png)
# ioBroker.maxcube
==================================
[![NPM version](http://img.shields.io/npm/v/iobroker.maxcube.svg)](https://www.npmjs.com/package/iobroker.maxcube)
[![Downloads](https://img.shields.io/npm/dm/iobroker.maxcube.svg)](https://www.npmjs.com/package/iobroker.maxcube)
[![Tests](https://travis-ci.org/ioBroker/ioBroker.maxcube.svg?branch=master)](https://travis-ci.org/ioBroker/ioBroker.maxcube)

[![NPM](https://nodei.co/npm/iobroker.maxcube.png?downloads=true)](https://nodei.co/npm/iobroker.maxcube/)

ioBroker adapter to control Max! via Cube

## Supported devices
- Thermostat
- Door/window sensor
- Push button (only battery status)

## Usage
Before using you must first connect all devices to MAX! Cube via MAX! Firmware. 

## Changelog
### 1.0.1 (2018-07-06)
* (stabilostick) initialization of working state
* (stabilostick) setpoint rounding to 0.5
* (stabilostick) upstream only changed states
* (stabilostick) stabilize state display for setpoint and mode values

### 1.0.0 (2018-05-24)
* (bluefox) refactoring
* (bluefox) added admin3

### 0.1.2 (2017-06-11)
* (paul53) Try to read wall thermostat

### 0.1.1 (2017-06-07)
* (bluefox) use local maxcube lib

### 0.1.0 (2017-06-05)
* (bluefox) intial commit

## License

MIT Copyright (c) 2017-2018 bluefox
