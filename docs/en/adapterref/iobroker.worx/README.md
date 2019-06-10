![Logo](admin/worx.png)
# ioBroker.worx

![Number of Installations](http://iobroker.live/badges/worx-installed.svg) 
![Number of Installations](http://iobroker.live/badges/worx-stable.svg)

[![NPM version](http://img.shields.io/npm/v/iobroker.worx.svg)](https://www.npmjs.com/package/iobroker.worx)
[![Downloads](https://img.shields.io/npm/dm/iobroker.worx.svg)](https://www.npmjs.com/package/iobroker.worx)
[![dependencies Status](https://david-dm.org/MeisterTR/iobroker.worx/status.svg)](https://david-dm.org/MeisterTR/iobroker.worx)
[![Known Vulnerabilities](https://snyk.io/test/github/MeisterTR/ioBroker.worx/badge.svg)](https://snyk.io/test/github/MeisterTR/ioBroker.worx)

[![NPM](https://nodei.co/npm/iobroker.worx.png?downloads=true)](https://nodei.co/npm/iobroker.worx/)

**Tests:** [![Travis-CI](http://img.shields.io/travis/MeisterTR/ioBroker.worx/master.svg)](https://travis-ci.org/MeisterTR/ioBroker.worx)

## worx adapter for ioBroker

control via cloud and mqtt

This adapter connects IoBroker with your Landroid S/M/L via Cloud. 
Temperatures, mowing times, battery level and various other data are read out from the mower
The adapter can control the mower and you can change config params like mowtimes.

<img src="admin/worx_ada2.png" alt="drawing" width="100%"/>

## Settings
- to connect to the mower type in email and password from your worx account in the Config.
- Delay for Edgecut : If the edgecut starts in a curve or bend, the lawnmower may lose the wire and stop with a fault, or the blades may not rotate. For this purpose, the starting point at which the blades start to rotate can be set.

## Changelog
### 0.3.0 (06.06.2019)
* (MeisterTR) add delay for edgecut in config

### 0.2.0 (01.06.2019)
* (MeisterTR) add border
* (MeisterTR) fix small errors
* (MeisterTR) code cleanup
### 0.0.1
* (MeisterTR) initial release

## License
MIT License

Copyright (c) 2019 MeisterTR

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
