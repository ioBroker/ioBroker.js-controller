![Logo](admin/glogo.png)
# ioBroker.growatt

[![NPM version](http://img.shields.io/npm/v/iobroker.growatt.svg)](https://www.npmjs.com/package/iobroker.growatt)
[![Downloads](https://img.shields.io/npm/dm/iobroker.growatt.svg)](https://www.npmjs.com/package/iobroker.growatt)
![Number of Installations (latest)](http://iobroker.live/badges/growatt-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/growatt-stable.svg)
[![Dependency Status](https://img.shields.io/david/PLCHome/ioBroker.growatt.svg)](https://david-dm.org/PLCHome/ioBroker.growatt)
[![Known Vulnerabilities](https://snyk.io/test/github/PLCHome/ioBroker.growatt/badge.svg)](https://snyk.io/test/github/PLCHome/ioBroker.growatt)

[![NPM](https://nodei.co/npm/iobroker.growatt.png?downloads=true)](https://nodei.co/npm/ioBroker.growatt/)

## growatt adapter for ioBroker

ioBroker Growatt Adapter to communiacte with Growatt Shine Server.
I'm not affiliated.
Usually, the data is sent from the data logger to the cloud every 5 minutes.
The software queries the server every 30 seconds so that the offset is not too great.

Not all plant types are implemented.

Currently only data can be read, writing parameters or changing parameters is not possible.

## Admin Page

### User and Password
Please enter the name and password that you also use in the Shine app or in the web portal.

### Login with shared key
On the Growatt website under energy, plant management, operating tools you can send yourself a key by e-mail.

### Read plant data
This data record contains the stored master data

### Read status data
These data are not available for all plants (not INV/MAX/TLX). This dataset contains live data.

### Read last data of chart
These data are only available for the plants without read status data (INV/MAX/TLX). The last valid data for the day is searched for.

### Read data of chart
These data are only available for the plants without read status data and requires read last data of chart (INV/MAX/TLX). The data is written and stored as a JSON string.

### Read total data
This data record contains aggregation data.

### Read device data
This data record contains some data from the device. Some data are also available in the other categories.

### Read weather
This data set contains the weather forecast. 




## Changelog
### 0.0.12 (27.11.2020)
* (PLCHome) wrong initialization for shared key: string instead of boolean

### 0.0.11 (27.11.2020)
* (PLCHome) Read me

### 0.0.10 (26.11.2020)
* (PLCHome) Shared key login
* (PLCHome) Last value of the graph if there are no live data.
* (PLCHome) Change of the polling interval

### 0.0.9 (05.10.2020)
* (PLCHome) fix no feature 'ADAPTER_AUTO_DECRYPT_NATIVE'

### 0.0.8 (05.10.2020)
* (PLCHome) fix io-package

### 0.0.7 (05.10.2020)
* (PLCHome) with "@iobroker/adapter-core": "^2.4.0", the js-controller dep needs to be >=2.0.0!
* (PLCHome) io-package native defined 5 values, admin sets 7
* (PLCHome) store password encrypted

### 0.0.6 (31.08.2020)
* (PLCHome) translation with ioBroker tool.

### 0.0.5
* (PLCHome) initial release.

### 0.0.1
* (PLCHome) initial release. 




## License
MIT License

Copyright (c) 2020 PLCHome <https://github.com/PLCHome>

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