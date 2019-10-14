# ioBroker.stiebel-isg ![Logo](admin/stiebel-isg.png)

![Number of Installations](http://iobroker.live/badges/stiebel-isg-installed.svg) ![Number of Installations](http://iobroker.live/badges/stiebel-isg-stable.svg)

=================

[![Build Status](https://api.travis-ci.org/unltdnetworx/ioBroker.stiebel-isg.svg?branch=master)](https://travis-ci.org/unltdnetworx/ioBroker.stiebel-isg)
[![NPM version](https://img.shields.io/npm/v/iobroker.stiebel-isg.svg)](https://www.npmjs.com/package/iobroker.stiebel-isg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.stiebel-isg.svg)](https://www.npmjs.com/package/iobroker.stiebel-isg)

[![NPM](https://nodei.co/npm/iobroker.stiebel-isg.png?downloads=true)](https://nodei.co/npm/iobroker.stiebel-isg/)

This adapter is a ment to read values from stiebel-eltron/tecalor internet service gateways (ISG) and control the device.

USE AT YOUR OWN RISK!!! ABSOLUTELY NO WARRANTY FOR DAMAGES, ETC.!!!

Help or hints are welcome.

## Steps 

1. Install the adpater

2. Grab the values out of the your stiebel-isg.[x]-object.

## Requirements

* stiebel-eltron/tecalor internet service gateway (ISG)

## Changelog

### 1.4.8

* update due to security vulnerabilities in dependencies

### 1.4.7

* update due to security vulnerabilities in dependencies

### 1.4.6

* bugfix for some boolean-values

### 1.4.5

* bugfix for false state for boolean-values

### 1.4.4

* bugfix for error handling

### 1.4.3

* Timeout of 5 seconds for sending commands to gather multiple commands to reduce the load of the ISG
* Timeout for pulling deleted

### 1.4.2

* Timeout of 10 seconds for pulling settings after multiple commands to reduce the load of the ISG

### 1.4.1

* Core Files/Testing Update and introduce adapter-core

### 1.4.0

* expert-values can be pulled/written

### 1.3.2

* bugfix: 0 is now recognized

### 1.3.1

* reboot-option added

### 1.3.0

* support for compact-mode added

### 1.2.4

* bug repaired: unnecessary space characters in units removed 

### 1.2.3

* bug repaired: ignore hidden fields in some heatings

### 1.2.2

* additional values available, like filter-lifetime

### 1.2.1

* according to a problem with the history-adapter, umlauts can now be deactivated

### 1.2.0

* status for photovoltaik and device included

### 1.1.1

* bugfix for controls-menu

### 1.1.0

* Energymanagment added (ISG plus required)

## License

The MIT License (MIT)

Copyright (c) 2018-2019 Michael Schuster <development@unltd-networx.de>

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
