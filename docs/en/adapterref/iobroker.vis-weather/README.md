![Logo](admin/vis-weather.png)
# ioBroker.vis-weather
![Number of Installations](http://iobroker.live/badges/vis-weather-installed.svg) ![Number of Installations](http://iobroker.live/badges/vis-weather-stable.svg) 

[![NPM version](https://img.shields.io/npm/v/iobroker.vis-weather.svg)](https://www.npmjs.com/package/iobroker.vis-weather)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vis-weather.svg)](https://www.npmjs.com/package/iobroker.vis-weather)
[![Tests](https://travis-ci.org/rg-engineering/ioBroker.vis-weather.svg?branch=master)](https://travis-ci.org/rg-engineering/ioBroker.vis-weather)

[![NPM](https://nodei.co/npm/iobroker.vis-weather.png?downloads=true)](https://nodei.co/npm/iobroker.vis-weather/)

This vis-widget shows weather forecast data from DasWetter.com or weatherunderground
You need DasWetter-Adpater or weatherunderground-Adapter running as well...

In weatherunderground you need forecast of next 36 hours enabled.
In DasWetter.com you need one of four forecast data structures enabled. You can select the one you want to display. 

## Notes / wiki
### Define Forecast hours
By default the forecast diagram shows 40 hours (DasWetter) or 36 hours (wunderground). If you prefer to only show e.g. 10 hours forecast, simply delete the unnecessary OIDs under oid_groups in vis-edit. 

### OID's are not created automatically when using DasWetter
Normally OID's will be created automatically when you select instance or data structure. When you get "no OID's available" then check whether you use "NextDaysDetailed" in DasWetter. 
You might need to enable "NextDaysDetailed".

## known issues
* please create issues at [github](https://github.com/rg-engineering/ioBroker.vis-weather/issues) if you find bugs or whish new features

## Changelog

### 2.5.1 (2019-12-08)
* (René) alignment of bars with marking
* (René) position of tick labels of Y axis changed

### 2.5.0 (2019-12-07)
* (René) see issue #20: scaling problem solved 
* (René) see issue #22: bugfix colors for axis labeling 
* (René) color adjustment for axis and tick lables 
* (René) more adjustments for ticks on Y axis
* (René) see issue #23: names for legend adjustable

### 2.4.0 (2019-10-31)
* (René) legend added

### 2.3.2 (2019-10-24)
* (René) add logs for issue #20
* (René) update flot to version 3.0

### 2.3.1 (2019-07-13)
* (René) bug fix: missing timer added

### 2.3.0 (2019-03-25)
* (René) markings added

### 2.2.2 (2018-12-30)
* (René) bug fix: If oid_date is not set when using weatherunderground, an unnecessary error message was issued and the plot was not shown

### 2.2.1 (2018-12-23)
* (René) bug fix issue #12: unnecessary code removed

### 2.2.0 (2018-08-25)
* (René) OID's for different data structures (only DasWetter 2.x)

### 2.1.1 (2018-08-24)
* (René) bug fixes

### 2.1.0 (2018-08-18)
* (René) support of 2.x of weatherundergruond

### 2.0.0
* (René) support of 2.x of daswetter.com

### 1.2.0
* (René) background color and border

### 1.1.2
* (René) Support of admin3

### 1.1.1
* (René) Y axis with units

### 1.1.0
* (René) logs auskommentiert
* (René) Berechnung min / max für Temperaturgraph optimiert
* (René) Y-Achse automatisch ausblenden, wenn Graph nicht dargestellt wird
* (gitbock) konfigurierbare Y-Achsen je Graph (anzeigen/nicht anzeigen)
* (gitbock) Y-Achsen Beschriftung in der Farbe des Graphen
* (gitbock) Max.-/Min Werte für Temperatur Y-Achse
* (gitbock) konfigurierbares Datumsformat für X-Achse

### 1.0.0
* (René) first stable version

### 0.0.7
* (René) bug fix for android app > 1.0.6
* (René) color adjustment for ticks and tick lable (from sbfspot)

### 0.0.6
* (René) css removed

### 0.0.5
* (René) number of labels on X axis adjustable

### 0.0.4
* (René) bug fixes

### 0.0.3
* (René) support of DasWetter.com and weatherunderground

### 0.0.2
* (René) bug fixes
	- in live mode nothing was shown

### 0.0.1
* (René) initial release

## License
Copyright (C) <2017 - 2019>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.





