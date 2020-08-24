![Logo](admin/accuweather.png)
# ioBroker.accuweather

[![NPM version](http://img.shields.io/npm/v/iobroker.accuweather.svg)](https://www.npmjs.com/package/iobroker.accuweather)
[![Downloads](https://img.shields.io/npm/dm/iobroker.accuweather.svg)](https://www.npmjs.com/package/iobroker.accuweather)
[![Dependency Status](https://img.shields.io/david/algar42/iobroker.accuweather.svg)](https://david-dm.org/algar42/iobroker.accuweather)
[![Known Vulnerabilities](https://snyk.io/test/github/algar42/ioBroker.accuweather/badge.svg)](https://snyk.io/test/github/algar42/ioBroker.accuweather)

[![NPM](https://nodei.co/npm/iobroker.accuweather.png?downloads=true)](https://nodei.co/npm/iobroker.accuweather/)

**Tests:**: [![Travis-CI](http://img.shields.io/travis/algar42/ioBroker.accuweather/master.svg)](https://travis-ci.org/algar42/ioBroker.accuweather) 

## accuweather adapter for ioBroker

Weather forecast using AccuWeather API

Adapter receives Current Conditions (updated every hour), 5 Days daily forecast (update once daily at approximately 7am), and 12 hours forecast (updated every six hours at 12am, 6am, 12pm and 6pm). 

## Getting started

### Get API Key

To get API Key, register on https://developer.accuweather.com/ and create application in \"My Apps\" menu. Once application created you will have API key generated. 
For free use it is possible to make 50 requests to API per day. 
It was noted that to get API working the following settings are preferred (please choose your country!):
![settings](admin/image.png)

### Get Location Key

In order to get location key, go to https://www.accuweather.com/ and enter your city name, or try to enter your coordinates (latitude, longitude) as you have them e.g. in IoBroker settings. 
Your location key wil be the number at the end of URL of forecast.

### Using in Lovelace visualization (starting version 1.1.0)
Summary channel contains current and by-day forecast with role/types of states supported by type-detector. 
New feature can be used in order to show weather forecast in Lovelace UI. 
For better view a custom lovelace card is created - see https://github.com/algar42/IoB.lovelace.accuweather-card


## Changelog

### 1.1.4
* (HGlab01) small bugfix regarding setTimeout range

### 1.1.3
* (algar42) Minor updates for compact mode

### 1.1.0
* (algar42) Summary channel added to support type-detector and automatic weather device creation

### 1.0.2
* (algar42) Production Release


## License
MIT License

Copyright (c) 2020 algar42 <igor.aleschenkov@gmail.com>

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
