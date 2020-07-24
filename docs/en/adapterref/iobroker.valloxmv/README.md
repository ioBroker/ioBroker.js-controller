<h1>
    <img src="admin/valloxmv.png" width="64"/>
    ioBroker.valloxmv
</h1>

[![NPM version](http://img.shields.io/npm/v/iobroker.valloxmv.svg)](https://www.npmjs.com/package/iobroker.valloxmv)
[![Downloads](https://img.shields.io/npm/dm/iobroker.valloxmv.svg)](https://www.npmjs.com/package/iobroker.valloxmv)
[![Dependency Status](https://img.shields.io/david/hacki11/iobroker.valloxmv.svg)](https://david-dm.org/hacki11/iobroker.valloxmv)
[![Known Vulnerabilities](https://snyk.io/test/github/hacki11/ioBroker.valloxmv/badge.svg)](https://snyk.io/test/github/hacki11/ioBroker.valloxmv)

[![NPM](https://nodei.co/npm/iobroker.valloxmv.png?downloads=true)](https://nodei.co/npm/iobroker.valloxmv/)

[![Travis-CI](http://img.shields.io/travis/hacki11/ioBroker.valloxmv/master.svg)](https://travis-ci.org/hacki11/ioBroker.valloxmv)

## ValloxMV adapter for ioBroker

Connects your Vallox Air Ventilation system into your ioBroker home automation.

## Usage
* Install adapter
* Configure device address and poll interval (60 is minimum)
* Read and write states as usual

## Changelog

### 1.1.1
* Fix adapter-checker issues

### 1.1.0
* A_CYC_BYPASS_LOCKED added
* A_CYC_SUPP_FAN_BALANCE_BASE added
* A_CYC_EXTR_FAN_BALANCE_BASE added
* A_CYC_IP_ADDRESS added
* A_CYC_CELL_STATE changed to read only

### 1.0.3
* Fix adapter-checker issues

### 1.0.2
* Added subscriptions of own objects to allow write values

### 1.0.1 
* Fixed resetting custom configuration of objects
* Removed subscription of own objects

### 1.0.0
* Fixed empty states
* Canged bool states to switches

### 0.1.3
* added expert settings (@williandalton, @hliebscher)
  * A_CYC_RH_BASIC_LEVEL
  * A_CYC_CO2_THRESHOLD
  * A_CYC_RH_LEVEL_MODE
  * A_CYC_SUPPLY_HEATING_ADJUST_MODE
  * A_CYC_OPT_TEMP_SENSOR_MODE

### 0.1.2
* add State 'NORMAL' to A_CYC_MODE (@williandalton)

### 0.1.1
* fix io-package.json version number

### 0.1.0
* added profile switch and editing

### 0.0.1
* (hacki11) initial release

## License
MIT License

Copyright (c) 2020 hacki11

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