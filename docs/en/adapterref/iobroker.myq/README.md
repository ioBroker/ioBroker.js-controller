![Logo](admin/myq.png)

![Number of Installations](http://iobroker.live/badges/myq-installed.svg) [![Downloads](https://img.shields.io/npm/dm/iobroker.myq.svg)](https://www.npmjs.com/package/iobroker.myq)

[![NPM](https://nodei.co/npm/iobroker.myq.png?downloads=true)](https://nodei.co/npm/iobroker.myq/)

![Stable](http://iobroker.live/badges/myq-stable.svg)
[![NPM version](https://img.shields.io/npm/v/iobroker.myq.svg)](https://www.npmjs.com/package/iobroker.myq)
[![Build Status](https://travis-ci.org/StrathCole/ioBroker.myq.svg?branch=master)](https://travis-ci.org/StrathCole/ioBroker.myq)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/StrathCole/iobroker.myq/blob/master/LICENSE)

# ioBroker.myq

An ioBroker adapter for MyQ (Chamberlain/Liftmaster). This project has no affiliation with the mentioned companies.  
To start using the adapter add an instance and enter your myQ username and password on the config screen.

## States

Not all states are available for all type of devices.

`myq.0.devices.<id>.info.MyQDeviceTypeId` - The type of the device in numeric form  
`myq.0.devices.<id>.info.MyQDeviceTypeName` - The human-readable type of the device, e.g. Gateway or GarageDoorOpener  
`myq.0.devices.<id>.info.SerialNumber` - The serial number of the device  
`myq.0.devices.<id>.info.desc` - The user-provided name of the device  
`myq.0.devices.<id>.info.fwver` - The current firmware version of the device  
`myq.0.devices.<id>.info.name` - The internal device name (not the user provided one)  
`myq.0.devices.<id>.info.numdevices` - (gateway) The number of connected devices for this gateway  
`myq.0.devices.<id>.info.online` - The device is currently connected to the cloud and is reachable  
`myq.0.devices.<id>.states.IsFirmwareCurrent` - `true`, if the device firmware is up to date  
`myq.0.devices.<id>.states.ishomekitactive` - `true`, if Homekit usage is active for this device  
`myq.0.devices.<id>.states.ishomekitcapable` - `true`, if the device is homekit-capable  
`myq.0.devices.<id>.states.doorstate` - (garage door) State of the door (see Door states)  
`myq.0.devices.<id>.states.moving` - `true`, if door is currently moving  

### Door states
 - 1: door is open
 - 2: door is closed
 - 3: door was stopped
 - 4: door is opening
 - 5: door is closing
 - 8: door is moving
 - 9: door is in undefined state (not closed)

## Commands

`myq.0.devices.<id>.commands.close` - Close door  
`myq.0.devices.<id>.commands.open` - Open door


## Changelog

### 0.1.2

-  Poll states after sending command

### 0.1.1

-  Code rework and several bugs fixed

### 0.1.0

-   First running Version

## License

The MIT License (MIT)

Copyright (c) 2020 Marius Burkard

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


## Donate
[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SFLJ8HCW9T698&source=url)
