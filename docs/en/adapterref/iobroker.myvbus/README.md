# ioBroker.myvbus

![Logo](admin/myvbus.png)

[![NPM version](http://img.shields.io/npm/v/iobroker.myvbus.svg)](https://www.npmjs.com/package/iobroker.myvbus)
[![Downloads](https://img.shields.io/npm/dm/iobroker.myvbus.svg)](https://www.npmjs.com/package/iobroker.myvbus)
![Number of Installations (latest)](http://iobroker.live/badges/myvbus-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/myvbus-stable.svg)
[![Dependency Status](https://img.shields.io/david/iobroker-community-adapters/iobroker.myvbus.svg)](https://david-dm.org/iobroker-community-adapters/iobroker.myvbus)
[![Known Vulnerabilities](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.myvbus/badge.svg)](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.myvbus)

[![NPM](https://nodei.co/npm/iobroker.myvbus.png?downloads=true)](https://nodei.co/npm/iobroker.myvbus/)

**Tests:**: [![Travis-CI](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.myvbus/master.svg)](https://travis-ci.org/iobroker-community-adapters/ioBroker.myvbus) [![Greenkeeper badge](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.myvbus.svg)](https://greenkeeper.io/)

## ioBroker Adapter for Resol VBus

This ioBroker Adapter connects to various VBus-based devices via resol-vbus, a JavaScript library for processing RESOL VBus data provided by Daniel Wippermann.
<https://github.com/danielwippermann/resol-vbus>
<https://www.npmjs.com/package/resol-vbus>

## Features

* Provides access to various RESOL(R) VBus(R) devices using DL3 or DL2 dataloggers, KM2 communication module, VBus/LAN interface adapter or Serial/LAN Gateways locally over TCP/IP. Device access using VBus/USB interface adapter or DLx/KMx via VBus.net(R) is also supported.
* Processes live VBus data streams and makes them available as ioBroker states.
* Values are updated with a configurable cycle time.

## Changelog

### 0.0.1

* (pdbjjens) initial release tested only with VBus/USB (Serial) and DeltaSol(R) BS2009 (0x427B)

## Legal Notices

RESOL, VBus, VBus.net, DeltaSol and others are trademarks or registered trademarks of RESOL - Elektronische Regelungen GmbH.
<https://www.resol.de/en>
All other trademarks are the property of their respective owners.

## License

MIT License

Copyright (c) 2020 Jens-Peter Jensen <jjensen@t-online.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
