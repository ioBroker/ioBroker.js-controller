![Logo](admin/opentherm.png)
# ioBroker.opentherm

[![NPM version](http://img.shields.io/npm/v/iobroker.opentherm.svg)](https://www.npmjs.com/package/iobroker.opentherm)
[![Downloads](https://img.shields.io/npm/dm/iobroker.opentherm.svg)](https://www.npmjs.com/package/iobroker.opentherm)
![Number of Installations (latest)](http://iobroker.live/badges/opentherm-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/opentherm-stable.svg)
[![Dependency Status](https://img.shields.io/david/DrozmotiX/ioBroker.opentherm.svg)](https://david-dm.org/DrozmotiX/ioBroker.opentherm)
[![Known Vulnerabilities](https://snyk.io/test/github/DrozmotiX/ioBroker.opentherm/badge.svg)](https://snyk.io/test/github/DrozmotiX/ioBroker.opentherm)

[![NPM](https://nodei.co/npm/ioBroker.opentherm.png?downloads=true)](https://nodei.co/npm/ioBroker.opentherm/)

**Tests:**: [![Travis-CI](http://img.shields.io/travis/DrozmotiX/iobroker.opentherm/master.svg)](https://travis-ci.org/DrozmotiX/ioBroker.opentherm)

This adapter integrates all features of the opentherm gateway into ioBroker.
Opentherm is an gateway protocol used by several modern heating systems like Remeha.

For more information http://otgw.tclcode.com/index.html#intro with all credits to the developers.

### Featured Functionality in final state :
* Provide TCP/IP relay server to allow other OpenTherm monitor software connection by this instance (when direct USB connection is used)
* Where possible, adjust values in ioBroker and send command to Opentherm
* Please feel free to add feature requests 

### Currently implemented

* Connect to OpenTherm Gateway by TCP/IP
* Connect to OpenTherm Gateway direcly by USB connection

## To-Do
* Connect to OpenTherm Gateway directly by USB connection
* Provide TCP/IP relay server to allow other OpenTherm monitor software connection by this instance (when direct USB connection is used)
* Where 

## Support me
If you like my work, please feel free to provide a personal donation  
(this is an personal Donate link for DutchmanNL, no relation to the ioBroker Project !)  
[![Donate](https://raw.githubusercontent.com/DrozmotiX/ioBroker.wled/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Changelog

### 0.2.3
* Adapter fully rebuilded

### 0.2.2
* Fix read TCP/IP data (svenp)

### 0.2.1
* Fix translations

### 0.1.9
* Implemented direct connection by USB
* added configuration options to adapter settings
* Fixed issue for incorrect logging

### 0.1.8
* Fixed issue for incorrect object type (boolean/number/string)
* Implemented rounding states to 1 digit after comma

### 0.1.7
* implemented Developer mode (all states for all message types will be created in _Dev
* Implemented Developer Logging mode (if not activated no information is written to log !)
* Several small backend fixes

### 0.1.6
* Creation of logical channels
* creation of states
* reduced logging, all received messages still in log during beta for data gathering
* creation of definition file (please feel free to provide input)

### 0.1.0
* Data reading by TCP connection to logfile 

### 0.0.1
* (Dutchman) initial commit

## License
MIT License

Copyright (c) 2020 DutchmanNL <rdrozda86@gmail.com>

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