![Logo](admin/deconz.png)
# ioBroker deConz dresden-elektronik Adapter
==============

![Number of Installations](http://iobroker.live/badges/deconz-installed.svg) ![Number of Installations](http://iobroker.live/badges/deconz-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.deconz.svg)](https://www.npmjs.com/package/iobroker.deconz)
[![Downloads](https://img.shields.io/npm/dm/iobroker.deconz.svg)](https://www.npmjs.com/package/iobroker.deconz)

[![NPM](https://nodei.co/npm/iobroker.deconz.png?downloads=true)](https://nodei.co/npm/iobroker.deconz/) [![Greenkeeper badge](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.deconz.svg)](https://greenkeeper.io/)

English
--------------------
Connects to deConz software developed by dresden-elektronik. This software aims to be a universal ZigBee Gateway solution, using hardware from dresden-elektronik the ConBee USB stick and RaspBee a modul for the Raspberry Pi.


You must first link to deConz.
1.  a) For that find first the IP address by pressing "Find deConz" button. It is only enabled if no IP address entered.
    b) If "Find deConz" will not find your deConz installation you have to enter the ip address.
2. After IP address is found the USER must be created. For that press the "Create User" button and then press "Link" button on HUE bridge. "Create User" button is only enabled if no USER entered

## Notice

### No Support for Beta Versions of deConz

Required node.js >= 0.12.

## Changelog

### 0.4.0
* (asgothian) Fix for hue change
* (halloamt)  Added support for dimming lights and groups
* (halloamt)  Added support for custom actions

### 0.3.1
* Fixing hue from range 0-65535 to 0-360


### 0.3.0
* Added scene support
*  Drop nodejs 4 support


### 0.2.5
* Fix/Change handling create objects during running Adapter

### 0.2.4
* Fix create objects during running adapter

### 0.2.3
* Create objects during runing adapter

### 0.2.2
*  Changed id naming
*  Use websocket messages instead polling afterwards

### 0.2.1
* (Jey-Cee) Added new elements to config
* (Jey-Cee) Changed som small things

### 0.2.0
* (Jey-Cee) next Try with Xiaomi Sensors
* (Jey-Cee) Added "pressure" sensor
* (Jey-Cee) Added create group to adapter config

### 0.1.7

* (Jey-Cee) add possibility to delete devices from deConz
* (Jey-Cee) fix issue on getAll... functions when there are is nothing

### 0.1.6

* (Jey-Cee) fix Xiaomi Sensors recognition

### 0.1.5

* (Jey-Cee) Try to fix Sensors

### 0.1.4

* (Jey-Cee) Added support for Admin v3
* (Jey-Cee) Create API Key without use of WebApp/Phoscon (only with deConz standard password)

### 0.1.3

* (Jey-Cee) Stop Spam in log
* (Jey-Cee) Added filter for name to id conversation

### 0.1.2

* (Jey-Cee) Added new datapoints for sensors (experimental)

### 0.1.1

* (Jey-Cee) Adapter complete rewritten

### 0.1.0

* (Jey-Cee) first release

## License

Apache 2.0

Copyright (c) 2017 Jey Cee <jey-cee@live.com>
Copyright (c) 2017 Bluefox <dogafox@gmail.com>
Copyright (c) 2014-2016 hobbyquaker


