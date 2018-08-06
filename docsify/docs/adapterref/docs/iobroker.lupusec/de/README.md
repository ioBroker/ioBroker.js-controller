![Logo](media/lupusec.png)
# ioBroker.lupusec
=================

[![Build Status](https://travis-ci.org/schmupu/ioBroker.lupusec.svg?branch=master)](https://travis-ci.org/schmupu/ioBroker.lupusec)
[![NPM version](http://img.shields.io/npm/v/iobroker.lupusec.svg)](https://www.npmjs.com/package/iobroker.lupusec)
[![Downloads](https://img.shields.io/npm/dm/iobroker.lupusec.svg)](https://www.npmjs.com/package/iobroker.lupusec)

[![NPM](https://nodei.co/npm/iobroker.lupusec.png?downloads=true)](https://nodei.co/npm/iobroker.lupusec/)

Requires node.js 6.0 or higher and Admin v3!

This adapter connects the Lupusec alarm system XT1 Plus, XT2, XT2 Plus and XT3 with ioBroker.
The XT1 (without Plus) will not be supported. You can read the status of the Lupusec sensors
like door, windows, water, smoke sensors and the status of the alarm system.
You can turn on switches and arm/disarm the alarm system.


You can find detailed information here: [Lupus](https://www.lupus-electronics.de/en)

## Installation

1. Install the adapter

2. Configuration of the adapter

  Choose the IP-Address or hostname from the Lupusec alarm system. Choose https (recommended) if possible.
  For only reading the status, select a user without write access. If you want to change the status
  (for example, turn on/off the light or arm/disarm the alarm) pick a user with write access.


## Changelog

### 0.2.4 (16.07.2018)
* (Stübi) Wrong device description removed

### 0.2.3 (16.07.2018)
* (Stübi) RSSI Status an Device shutter (type 76) supported

### 0.2.2 (13.07.2018)
* (Stübi) Devices thermostat (type 79) and switch (type 48) supported

### 0.2.1 (08.06.2018)
* (Stübi) Directory widged deleted

### 0.2.0 (03.06.2018)
* (Stübi) Port can be added

### 0.1.9 (01.06.2018)
* (Stübi) Translation of a view files

### 0.1.8 (01.06.2018)
* (Stübi) First stable version

### 0.1.7 (30.05.2018)
* (Stübi) Beta Version of Adapter !!!! XT1+, XT2, XT2+ and XT3 supported.



## License
The MIT License (MIT)

Copyright (c) 2018 Thorsten Stueben <thorsten@stueben.de>

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
