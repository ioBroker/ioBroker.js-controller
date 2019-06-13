![Logo](admin/landroid-s2.png)
# ioBroker.landroid-s

[![NPM version](http://img.shields.io/npm/v/iobroker.landroid-s.svg)](https://www.npmjs.com/package/iobroker.landroid-s)
[![Downloads](https://img.shields.io/npm/dm/iobroker.landroid-s.svg)](https://www.npmjs.com/package/iobroker.landroid-s)

[![NPM](https://nodei.co/npm/iobroker.landroid-s.png?downloads=true)](https://nodei.co/npm/iobroker.landroid-s/)

**Tests:** Linux/Mac: [![Travis-CI](https://api.travis-ci.org/MeisterTR/ioBroker.landroid-s.svg?branch=master)](https://travis-ci.org/MeisterTR/ioBroker.landroid-s)
Windows: [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/MeisterTR/ioBroker.landroid-s?branch=master&svg=true)](https://ci.appveyor.com/project/MeisterTR/ioBroker-landroid-s/)


# THIS ADAPTER IS CLOSED DOWN PLEASE USE THE NEW ONE
## [iobroker.worx](https://github.com/MeisterTR/ioBroker.worx)

[Deutsche Beschreibung hier](README_de.md)

This adapter connects IoBroker with your Landroid S Model or Landroid M with firmware bigger than 5.0.0 and Mqtt support
Temperatures, mowing times, battery level and various other data are read out from the mower
The adapter can control the mower and you can change config params like mowtimes.

<h4>Version lower 2.5.5 are no more supported!!!</h4>

## settings
- to connect to the mower type in email and password from your worx account in the Config.

## second mower
- If two mowers are to be integrated, a second instance must be installed, one is selected in the Config mower 0 and in the second mower 1 and so on.

## Changelog
### 2.5.5(08.04.2019)
* (MeisterTR) Api change from v1 to v2
### 2.5.4 (09.08.2018)
* (MeisterTR) support of Landroid M FW > 5.X.X add pause change connection 
### 2.1.2 (13.04.2018)
* (MeisterTR) add mower selection, clean up, remove CA
### 2.0.1 (31.01.2018)
* (MeisterTR) connection problem with new mower fixed 
### 2.0.0 (31.01.2018)
* (MeisterTR) admin3, del Polling
### 1.1.7 (09.10.2017)
* (MeisterTR) hard coded guest-token
* (MeisterTR) change cloud connection need no OpenSSL
* (MeisterTR) Serverselction automatic form Worx Server
* (MeisterTR) No Mac adress is needed
### 1.0.4 (18.09.2017)
* (MeisterTR) Update dependencies, no more error Messages on install
### 1.0.3 (08.09.2017)
* (MeisterTR) change Values from vis did not work (Fixed)
* (MeisterTR) changeing path from OpenSSL.exe on Windows now in config
* (MeisterTR) chatch errors on start if config is not set
* (MeisterTR) some other changes
### 0.3.1 (12.08.2017)
* (MeisterTR) bugfix cound not set bordercut to false
* (MeisterTR) add checkbox for m and min.
* (MeisterTR) add rawdata, chargecycle and actualArea
### 0.2.5
* (MeisterTR) now every parameter can be configure
### 0.2.3
* (MeisterTR) add areas, supporting change areas
### 0.2.2
* (MeisterTR) supported change of mowing times and error catching
### 0.1.2
* (MeisterTR) add mowing data
### 0.0.1
* (MeisterTR) initial release
 
## License
The MIT License (MIT)

Copyright (c) 2017-2019 MeisterTR <meistertr.smarthome@gmail.com>

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
