# ioBroker.siegenia

<img src="./admin/siegenia_logo.jpg"/>

[![NPM version](http://img.shields.io/npm/v/iobroker.siegenia.svg)](https://www.npmjs.com/package/iobroker.siegenia)
[![Downloads](https://img.shields.io/npm/dm/iobroker.siegenia.svg)](https://www.npmjs.com/package/iobroker.siegenia)
[![Dependency Status](https://img.shields.io/david/Apollon77/iobroker.siegenia.svg)](https://david-dm.org/Apollon77/iobroker.siegenia)
[![Known Vulnerabilities](https://snyk.io/test/github/Apollon77/ioBroker.siegenia/badge.svg)](https://snyk.io/test/github/Apollon77/ioBroker.siegenia)

[![NPM](https://nodei.co/npm/iobroker.siegenia.png?downloads=true)](https://nodei.co/npm/iobroker.siegenia/)

**Tests:** Linux/Mac/Windows: [![Travis-CI](http://img.shields.io/travis/Apollon77/ioBroker.siegenia/master.svg)](https://travis-ci.org/Apollon77/ioBroker.siegenia)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

This adapter provides ioBroker support for Siegenia Climate and Air control Devices (https://www.siegenia.com).

The adapter requires minimum Nodejs 8.x.

## Featureset

All current devices are support by this adapter:
* AEROPAC
* AEROMAT VT
* DRIVE axxent DK/MH
* SENSOAIR
* AEROVITAL ambience
* MHS Family
* AEROTUBE
* Universal Module

The adapter is capable to automatically detect the Siegenia devices in the same network as ioBroker and will list them in it's Admin interface. You only need to correct the user and password after the detection. But you can also enter IPs and login data manually.

All available data fields of the detected device are shown in objects and provide current data and/or allow data to be changed.

Timers and other more complex data are shown by the adapter, but can be changed only through the Siegenia App. 


## Changelog

### 1.1.0 (2021-01-22)
* (Apollon77) Prevent crash case (Sentry IOBROKER-SIEGENIA-1)
* (Apollon77) js-controller 2.0 is now required at least

### 1.0.1 (2020-12-24)
* (Apollon77) update dependencies
* (Apollon77) disconnect device if authentication was not successful

### 1.0.0
* (Apollon77) initial release

## License
MIT License

Copyright (c) 2019 Apollon77

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