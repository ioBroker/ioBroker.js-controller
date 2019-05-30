![Logo](admin/rflink.png)
# ioBroker.rflink
=================

![Number of Installations](http://iobroker.live/badges/rflink-installed.svg) ![Number of Installations](http://iobroker.live/badges/rflink-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.rflink.svg)](https://www.npmjs.com/package/iobroker.rflink)
[![Downloads](https://img.shields.io/npm/dm/iobroker.rflink.svg)](https://www.npmjs.com/package/iobroker.rflink)
[![Tests](https://travis-ci.org/ioBroker/ioBroker.rflink.svg?branch=master)](https://travis-ci.org/ioBroker/ioBroker.rflink)

[![NPM](https://nodei.co/npm/iobroker.rflink.png?downloads=true)](https://nodei.co/npm/iobroker.rflink/)

This adapter communicates with [rflink](http://www.nemcon.nl/blog2/) build on arduino mega and RFC 433MHz/866MHz/2.6Gz communication.
Used for receiving the data from weather sensors and wireless power switches.

## Prerequires
To use serial port on Windows it is VS required to build the binary.
To use serial port on linux it is build-essential required. To install it just write:

```
sudo apt-get update
sudo apt-get install build-essential -y
```

## Usage
To enable the learning of sensors you must activate "Inclusion mode". The inclusion mode by default will be enabled for 5 minutes (300000 ms) and after 5 minutes will be disabled automatically.

To enable inclusion mode forever, just set "Inclusion timeout" to 0.

## Pair
The devices get the new address every time the battery changed.

So after the battery changed it must be learned anew.

To do that press the pair button just before inserting the battery and the device will be learned with new address.

## Auto pairing
If you have not so many sensors in the near you can activate auto re-pairing.

It is possible only if the device can be definitely identified.

That means that only one device with this brand and type is present. (E.g. only one temperature sensor from one brand)

If system detect more than one device with such a parameter it will automatically deactivate the auto re-pairing mode and indicate problem sensors with flash.

## Send raw commands
The user has the possibility to send raw commands to device. Just write you command in form described [here](http://www.nemcon.nl/blog2/protref).

E.g: ```10;AB400D;00004d;1;OFF;```. Please read documentation to understand the commands.

## Changelog

### 2.0.0 (2019-05-15)
* (Apollon77) Support for nodejs 12 added, nodejs 4 is no longer supported!

### 1.2.0 (2018-01-23)
* (Apollon77) Upgrade Serialport Library

### 1.1.6 (2017-10-08)
* (Apollon77) Fix parsing for Wind-Direction

### 1.1.5 (2017-05-23)
* (Apollon77) Upgrade Serialport Library for compatibility to node 6.x

### 1.1.4 (2017-04-15)
* (bluefox) Fix the rain calculation

### 1.1.3 (2017-04-11)
* (bluefox) Allow flash on node.js < 5

### 1.1.2 (2017-04-10)
* (bluefox) Fix the wind gist calculation

### 1.1.0 (2017-02-03)
* (bluefox) Add stop for blinds

### 1.0.8 (2017-01-20)
* (bluefox) fix KWATT calculation for Oregon CM180

### 1.0.6 (2016-12-15)
* (bluefox) Support of raw commands
* (bluefox) Support MiLightv1 commands
* (Apollon77) update serialport library for node 6.x compatibility

### 1.0.5 (2016-11-11)
* (bluefox) Read newest sketch from web

### 1.0.2 (2016-10-23)
* (bluefox) Flashing of sketch into arduino
* (bluefox) Set_level from 1 to 15
* (bluefox) show version of sketch

### 0.2.1 (2016-10-19)
* (bluefox) Fix for SET_LEVEL

### 0.2.0 (2016-10-18)
* (bluefox) Fix write of commands

### 0.1.4 (2016-10-18)
* (bluefox) Fix the last changed time indication

### 0.1.3 (2016-10-17)
* (bluefox) initial commit
