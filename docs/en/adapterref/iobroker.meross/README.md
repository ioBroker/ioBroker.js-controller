![Logo](admin/meross-logo.png)
# ioBroker.meross

[![Greenkeeper badge](https://badges.greenkeeper.io/Apollon77/ioBroker.meross.svg)](https://greenkeeper.io/)

![Number of Installations](http://iobroker.live/badges/meross-installed.svg) ![Number of Installations](http://iobroker.live/badges/meross-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.meross.svg)](https://www.npmjs.com/package/iobroker.meross)
[![Downloads](https://img.shields.io/npm/dm/iobroker.meross.svg)](https://www.npmjs.com/package/iobroker.meross)

**Tests:** Linux/Mac/Windows: [![Travis-CI](http://img.shields.io/travis/Apollon77/ioBroker.meross/master.svg)](https://travis-ci.org/Apollon77/ioBroker.meross)
Windows: [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Apollon77/ioBroker.meross?branch=master&svg=true)](https://ci.appveyor.com/project/Apollon77/ioBroker-daikin/)

[![NPM](https://nodei.co/npm/iobroker.meross.png?downloads=true)](https://nodei.co/npm/iobroker.meross/)


## Description
This adapter allows to control Meross devices by connecting to the Meross cloud servers.

You need to provide your Cloud login credentials. The adapter connects to your cloud account and subscribe to all device data via MQTT. Because of this the devices need to be connected to their cloud. Currently no way is known to control the devices locally.

One Adapter instance will show all devices from one Meross Cloud account and allows to control them.

## Known working devices
* mss425e
* mss310

If more devices work (or also not) please report them by opening a GitHub issue.

## Changelog

### 1.2.0 (2019.07.05)
* (Apollon77) Add msg100 with Garage Door Reed contact
* (Apollon77) Add reconnection handling
* (Apollon77) Add light support (e.g. MSL120 RGB bulb)
* (Apollon77) Add units and roles for electricity
* (Apollon77) Add support for MSXH0

### 1.0.0 (2018.12.16)
* (Apollon77) finalize and move to 1.0.0

### 0.4.1 (2018.11.26)
* (Apollon77) finalize version and allow electricity polling interval to be configured

### 0.3.0 (2018.11.16)
* (Apollon77) add support for mss310 devices

### 0.1.0 (2018.11.14)
* (Apollon77) First release to support ToggleX devices

## License
The MIT License (MIT)

Copyright (c) 2018-2019 Apollon77 <iobroker@fischer-ka.de>

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
