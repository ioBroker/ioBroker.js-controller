![Logo](admin/philips-air.png)
# ioBroker.philips-air

[![NPM version](http://img.shields.io/npm/v/iobroker.philips-air.svg)](https://www.npmjs.com/package/iobroker.philips-air)
[![Downloads](https://img.shields.io/npm/dm/iobroker.philips-air.svg)](https://www.npmjs.com/package/iobroker.philips-air)
![Number of Installations (latest)](http://iobroker.live/badges/philips-air-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/philips-air-stable.svg)
[![Dependency Status](https://img.shields.io/david/iobroker-community-adapters/iobroker.philips-air.svg)](https://david-dm.org/iobroker-community-adapters/iobroker.philips-air)
[![Known Vulnerabilities](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.philips-air/badge.svg)](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.philips-air)

[![NPM](https://nodei.co/npm/iobroker.philips-air.png?downloads=true)](https://nodei.co/npm/iobroker.philips-air/)

## Philips air purifier adapter for ioBroker
Connects Philips air purifier with ioBroker.
**Tested only with AC2729**, but should work with new purifier that communicate via COAP with encryption.
![AC2729](img/device.png)

[Link to philips web site](https://www.philips.de/c-m-ho/luftreiniger-und-luftbefeuchter/kombi)

## Usage
Only IP address of device is required. Find it in your router (e.g. `MiCO`).
It can happen, that some devices have not all variables and they will stay unfilled in object tree.

![Objects](img/objects.png)
## Changelog

### 0.1.1 (2020-10-14)
* (ioBroker) initial release

## License
MIT License

Copyright (c) 2020 ioBroker <dogafox@gmail.com>

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