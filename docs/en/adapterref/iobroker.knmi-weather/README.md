![Logo](admin/knmi-weather.png)
# ioBroker.knmi-weather

[![NPM version](http://img.shields.io/npm/v/iobroker.knmi-weather.svg)](https://www.npmjs.com/package/iobroker.knmi-weather)
[![Downloads](https://img.shields.io/npm/dm/iobroker.knmi-weather.svg)](https://www.npmjs.com/package/iobroker.knmi-weather)
![Number of Installations (latest)](http://iobroker.live/badges/knmi-weather-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/knmi-weather-stable.svg)
[![Dependency Status](https://img.shields.io/david/iobroker-community-adapters/iobroker.knmi-weather.svg)](https://david-dm.org/iobroker-community-adapters/iobroker.knmi-weather)
[![Known Vulnerabilities](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.knmi-weather/badge.svg)](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.knmi-weather)

[![NPM](https://nodei.co/npm/iobroker.knmi-weather.png?downloads=true)](https://nodei.co/npm/iobroker.knmi-weather/)

**Tests:**: [![Travis-CI](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.knmi-weather/master.svg)](https://travis-ci.org/iobroker-community-adapters/ioBroker.knmi-weather)

## KNMI-Weather data and alarms for ioBroker

KNMI provides an API which data is updated every 10 minutes based on all sensor data the instituate collects.
This adapter allows to read this API (registration required !) and store all relevant values in user friendly states to be further processed in notifications (Example : Telegram / Pushover) or visialisations.

The API can be used for free up to 300 attements a day, therefore the adapter is sheduled every 5 minutes.

Following data is availaible :

* Current klimat conditions
* Forecast today, tomorrow, day after tomorrow
* Weather alarms

Location data is based on GPS coordinates stored in admin configuration.

For more information please visit : http://weerlive.nl/index.php  
Get your free API-Key here : http://weerlive.nl/delen.php

## Changelog

### 0.2.0
* (DutchmanNL) improve propper adapter termination instead of guessing by timer
* (DutchmanNL) Release to stable repository

### 0.1.1
* (DutchmanNL) implement states for RainRadar

### 0.1.0
* (DutchmanNL) initial release

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
