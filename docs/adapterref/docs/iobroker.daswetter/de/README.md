![Logo](media/daswettercom.png)
ioBroker.DasWetter.
===========================

[![NPM version](https://img.shields.io/npm/v/iobroker.daswetter.svg)](https://www.npmjs.com/package/iobroker.daswetter)
[![Downloads](https://img.shields.io/npm/dm/iobroker.daswetter.svg)](https://www.npmjs.com/package/iobroker.daswetter)
[![Tests](https://travis-ci.org/rg-engineering/ioBroker.daswetter.svg?branch=master)](https://travis-ci.org/rg-engineering/ioBroker.daswetter)
[![Build Status](https://travis-ci.org/rg-engineering/ioBroker.daswetter.svg?branch=master)](https://travis-ci.org/rg-engineering/ioBroker.daswetter)
[![NPM](https://nodei.co/npm/iobroker.daswetter.png?downloads=true)](https://nodei.co/npm/iobroker.daswetter/)


This adapter reads weather forecast data from DasWetter.com.

You need an account on DasWetter.com. Register at https://www.daswetter.com/api/#/login
The account is for free under certain conditions.

In your account you will find three URL for three different data models:
* 7 days forecast and general overview
* 5 days forecast and detailed 3 hours overview
* hourly forecast

All three models are implemented and one should be used at least.
In settings URL like http://api.daswetter.com/index.php?api_lang=de&localidad=xxxx  must be used. Just copy the complete URL from your account.

Access icons like `http://ip:8082/adapter/daswetter/icons/tiempo-weather/galeria6/1.svg`.




## Changelog

### 2.1.1 (2018-08-04)
* (René) parse timeout added
* (René) missing roles and states added

### 2.1.0 (2018-07-30)
* (bluefox) Added URLs to icons
* (bluefox) Added the roles and the names to states
* (bluefox) Icons moved to admin directory

### 2.0.1
* (René) deleting of unused date structur to avoid confusion about missing updates

### 2.0.0
* (René) new datastructure !not compatible to version 1.x!
now parsing all data from xml and store them in datapoints
for compatibility: in configuration old data structure can be enabled (default)
needs also 2.x of vis-weather-widget

### 1.0.3
* (René) bug fix for admin V3

### 1.0.2
* (René) bug fix for admin V3

### 1.0.1
* (René) Support of admin3

### 1.0.0
* (René) first stable version
* (René) symbol and symbolid: both values parsed	

### 0.1.6
* (René) bug fixing: wind-gust and wind-idb

### 0.1.5
* (René) testing changed

### 0.1.4
* (René) license changed

### 0.1.3
* (René) external png's corrected

### 0.1.2
* (René) dependencies added

### 0.1.1
* (René) UTF8 coding

### 0.1.0
* (René) first release

### 0.0.1
* (René) initial release

## License
Copyright (C) <2017, 2018>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.




