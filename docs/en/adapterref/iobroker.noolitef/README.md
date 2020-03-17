<h1>
	<img src="admin/noolitef.png" width="64"/>
	ioBroker.noolitef
</h1>

[![NPM version](http://img.shields.io/npm/v/iobroker.noolitef.svg)](https://www.npmjs.com/package/iobroker.noolitef)
[![Downloads](https://img.shields.io/npm/dm/iobroker.noolitef.svg)](https://www.npmjs.com/package/iobroker.noolitef)
[![Dependency Status](https://img.shields.io/david/paveltsytovich/iobroker.noolitef.svg)](https://david-dm.org/paveltsytovich/iobroker.noolitef)
[![Known Vulnerabilities](https://snyk.io/test/github/paveltsytovich/ioBroker.noolitef/badge.svg)](https://snyk.io/test/github/paveltsytovich/ioBroker.noolitef)

[![NPM](https://nodei.co/npm/iobroker.noolitef.png?downloads=true)](https://nodei.co/npm/iobroker.noolitef/)

**Tests:** Linux/Mac: [![Travis-CI](http://img.shields.io/travis/paveltsytovich/ioBroker.noolitef/master.svg)](https://travis-ci.org/paveltsytovich/ioBroker.noolitef)
Windows: [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/paveltsytovich/ioBroker.noolitef?branch=master&svg=true)](https://ci.appveyor.com/project/paveltsytovich/ioBroker-noolitef/)

## noolitef adapter for ioBroker

This adapter integrated Noolite-F device into iobroker

## Changelog

### 0.0.1
* (Pavel Tsytovich) initial release. Base function for Noolite-F protocol

### Known problem and TODO

* MQTT not supported yet
* Request and receive state from SUF device not supported yet
* In LED RGB state brigthness not used. It is bug. Fix in future versions
* Timeout between send Noolite command is fixed now. It is occur some problem in different situation
* In device list protocol must be Noolite-F constantly. Use Noolite protocol only for binding or unbinding operation. This problem will solve in near future version

## Usage

* For install please read [Installation Guide](/docs/install.md)
* For use this adapter with ioBroker scenaries please read [Programming Manual](/docs/programming.md)


## License
MIT License

Copyright (c) 2020 Pavel Tsytovich <pavel.tsytovich@gmail.com>

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