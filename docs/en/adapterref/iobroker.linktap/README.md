![Logo](admin/Logo_small.png)
# ioBroker.LinkTap

[![NPM version](http://img.shields.io/npm/v/iobroker.linktap.svg)](https://www.npmjs.com/package/iobroker.linktap)
[![Downloads](https://img.shields.io/npm/dm/iobroker.linktap.svg)](https://www.npmjs.com/package/iobroker.linktap)
[![Dependency Status](https://img.shields.io/david/Smart-Gang/iobroker.linktap.svg)](https://david-dm.org/Smart-Gang/iobroker.linktap)
[![Tests](https://img.shields.io/travis/Smart-Gang/ioBroker.linktap.svg)](https://travis-ci.org/Smart-Gang/ioBroker.linktap)

[![NPM](https://nodei.co/npm/iobroker.linktap.png?downloads=true)](https://nodei.co/npm/iobroker.linktap/)

## ioBroker.linktap

Control your garden irrigation with the LinkTap Wireless Water Timer
Manufacturer: https://www.link-tap.com/

## Installation
Was developed under Node.js 12. So it is recommended to use this version at least.

## Settings
Create Api key at https://www.link-tap.com/#!/api-for-developers with your LinkTap credentials. 

Please enter the username and API key in the configuration.
All connected gateways and taplinkers will be retrieved after the adapter is started. The manufacturer allows a polling of all gateway and devices every 5 minutes. The adapter performs the retrieval automatically every hour or each time the adapter is restarted.

The watering status retrieval can be set individually in the configuration based on minutes. It may take up to one minute for LinkTap's web service to provide updated watering information.

All irrigation functions provided by the API have been implemented. 

Important: The desired schedules must be set up in the app prior to use. These can then be enabled / disabled via the adapter. For this purpose the corresponding states of the role "Argument in" must be set additionally.

## Changelog

### 0.1.8
* (Smart-Gang) Retrieve historical data (API update from manufacturer) and optimize data point settings.

### 0.1.7
* (Smart-Gang) First public release


## License
MIT License

Copyright (c) 2021 Author <gangrulez@gmail.com>

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
