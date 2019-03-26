![Logo](admin/homematic.png)
# ioBroker HomeMatic IP Cloud AccessPoint Adapter
=================

![Number of Installations](http://iobroker.live/badges/hmip-installed.svg) ![Number of Installations](http://iobroker.live/badges/hmip-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.hmip.svg)](https://www.npmjs.com/package/iobroker.hmip)
[![Downloads](https://img.shields.io/npm/dm/iobroker.hmip.svg)](https://www.npmjs.com/package/iobroker.hmip)
[![Build Status](https://travis-ci.org/iobroker-community-adapters/ioBroker.hmip.svg?branch=master)](https://travis-ci.org/iobroker-community-adapters/ioBroker.hmip.svg?branch=master)

[![NPM](https://nodei.co/npm/iobroker.hmip.png?downloads=true)](https://nodei.co/npm/iobroker.hmip/) [![Greenkeeper badge](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.hmip.svg)](https://greenkeeper.io/)

## Description
This adapter allows to communicate with a HomematicIP CloudAccessPoint via the Rest API of the Homematic IP Cloud

## Installation
This Adapter needs node-js in version >= 8.6

## Info

Most Homematic IP devices are already working with the latest adapter version. 

I will improve it constantly, but it will take time. Any help from the community thru e.g. Pull Request would be highly appreciated.

For not working HmIP devices, please create an issue with this info (please one per device and if possible the technical name in the subject).
Switch adapter logging in ioBroker to silly mode and add the json of the device which is printed to the log in the issue.
I may also need a json of a state change.

Thank you

## Important Info what can be done with this adapter

!!! You can only trigger events with this adapater that can be triggered thru the original Homematic IP app. 
For example direct connections between devices have no events in the app and can also not be triggert thru this adapter!!! 

## Settings
* enter your SGTIN (back of the Access Point) and the PIN (if set before), and validate the data via press of the blue LED Button. This will create an Authentication token.

## Thanks
to coreGreenberet for his python lib (https://github.com/coreGreenberet/homematicip-rest-api)

## Diskussion in ioBroker Forum
https://forum.iobroker.net/viewtopic.php?f=36&t=21000#p220517

## Adapter Request auf GitHub
https://github.com/ioBroker/AdapterRequests/issues/62

## Changelog

### 0.0.10
* (jogibear9988) added ping/pong, enable setBoots, more units, more hardware

### 0.0.9
* (jogibear9988) fullrx and operationlock channel

### 0.0.8
* (jogibear9988) fixes a few devices

### 0.0.7
* (jogibear9988) fixes wrong state handling

### 0.0.6
* (jogibear9988) fixes for more devices, alarm handling

### 0.0.5
* (jogibear9988) more devices and big refactoring (switched from DeviceType to FunctionalChannelType)

### 0.0.4
* (jogibear9988) more devices, bugfixes. thanks to TobiasF1986, steckenpferd and Ma-ster77

### 0.0.3
* (jogibear9988) bugfixes and more devices 

### 0.0.2
* (jogibear9988) bugfixes, more devices and initial support of groups

### 0.0.1
* (jogibear9988) initial release

## License
The MIT License (MIT)

Copyright (c) 2018 @@Author@@ <@@email@@>

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
