![Logo](media/fronius.png)
ioBroker.fronius
=============

[![NPM version](http://img.shields.io/npm/v/iobroker.fronius.svg)](https://www.npmjs.com/package/iobroker.fronius)
[![Downloads](https://img.shields.io/npm/dm/iobroker.fronius.svg)](https://www.npmjs.com/package/iobroker.fronius)
[![Dependency Status](https://img.shields.io/david/ldittmar81/iobroker.fronius.svg)](https://david-dm.org/ldittmar81/iobroker.fronius)
[![Known Vulnerabilities](https://snyk.io/test/github/ldittmar81/ioBroker.fronius/badge.svg)](https://snyk.io/test/github/ldittmar81/ioBroker.fronius)
[![bitHound Overall Score](https://www.bithound.io/github/ldittmar81/ioBroker.fronius/badges/score.svg)](https://www.bithound.io/github/ldittmar81/ioBroker.fronius)

[![NPM](https://nodei.co/npm/iobroker.fronius.png?downloads=true)](https://nodei.co/npm/iobroker.fronius/)

**Tests:** Linux/Mac: [![Travis-CI](http://img.shields.io/travis/ldittmar81/ioBroker.fronius/master.svg)](https://travis-ci.org/ldittmar81/ioBroker.fronius)
Windows: [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/ldittmar81/ioBroker.fronius?branch=master&svg=true)](https://ci.appveyor.com/project/ldittmar81/ioBroker-fronius/)

### A Fronius inverter adapter for ioBroker
=================

This is an ioBroker adapter for your Fronius PV inverter with Fronius Datalogger Web from version 2.0.4-1 onwards or Fronius Datamanager from version 3.0.3-1 onwards.

## Changelog

#### 1.0.2
* (tobintax) Bugfix - Inverter Query regarding PAC adjusted.

#### 1.0.1
* (tobintax) Added more values from Smartmeter
* (tobintax) Added more Powerflow Values
* (tobintax) Removed Value "EnergyReal_WAC_Minus_Relative" . This Value had no result and is undocumented in the fronius api documentation.

#### 1.0.0
* (ldittmar) Fixed little errors

#### 0.0.5
* (ldittmar) Read storage data and error/status codes

#### 0.0.4
* (ldittmar) Read more data

#### 0.0.3
* (ldittmar) Improved installation routine

#### 0.0.2
* (ldittmar) First data is read

#### 0.0.1
* (ldittmar) initial commit

## License
The MIT License (MIT)

Copyright (c) 2017 ldittmar <iobroker@lmdsoft.de>

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
