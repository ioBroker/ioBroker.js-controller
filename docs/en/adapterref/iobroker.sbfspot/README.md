![Logo](admin/sbfspot.png)
# ioBroker.sbfspot
![Number of Installations](http://iobroker.live/badges/sbfspot-installed.svg) ![Number of Installations](http://iobroker.live/badges/sbfspot-stable.svg) 

[![NPM version](https://img.shields.io/npm/v/iobroker.sbfspot.svg)](https://www.npmjs.com/package/iobroker.sbfspot)
[![Downloads](https://img.shields.io/npm/dm/iobroker.sbfspot.svg)](https://www.npmjs.com/package/iobroker.sbfspot)
[![Tests](https://travis-ci.org/rg-engineering/ioBroker.sbfspot.svg?branch=master)](https://travis-ci.org/rg-engineering/ioBroker.sbfspot)

[![NPM](https://nodei.co/npm/iobroker.sbfspot.png?downloads=true)](https://nodei.co/npm/iobroker.sbfspot/)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** 
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.



**If you like it, please consider a donation:**
                                                                          
[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YBAZTEBT9SYC2&source=url) 

This adapter reads data from SMA power inverters using sbfspot.
Now both database types (mySQL and sqlite) are supported.
Since version 0.2.3 there is a own vis widget based on flot available to show historical data.

## Installation

please follow installation instructions for sbfspot under https://github.com/SBFspot/SBFspot/wiki

[detailed installation on arm based systems ](docs/en/install_arm.md)

## Hints
* use latest version from sbfspot from https://github.com/SBFspot/SBFspot 
* adapter, sbfspot and databases (mySQL or sqlite) must run on the same system e.g. Raspberry PI
* installation manual for sbfspot on Raspberry Pi (or similar) can be found under https://github.com/SBFspot/SBFspot/wiki/Installation-Linux-SQLite or https://www.rg-engineering.eu/index.php/produkte/software/plugin-fuer-iobroker-sbfspot
* for Raspberry Pi there is a semi-automated configuration tool available under https://github.com/SBFspot/sbfspot-config

## known issues

* sometimes installation of npm package sqlite3 fails. 
in that case reinstall all npm packages

> cd /opt/iobroker/node_modules/iobroker.sbfspot
> sudo npm install

sometimes npm intall must be called more then one time to successfully install all necessray packages


* please create issues at [github](https://github.com/rg-engineering/ioBroker.sbfspot/issues) if you find bugs or whish new features

## Changelog


## 4.0.2 (2020-10-09)
* (René) bug fix based on CI tests

## 4.0.0 (2020-07-28)
* (René) rework to use async/await
* (René) use mysql2

## 3.0.0 (2020-04-25)
* (René) sqlite3 package replaced by better-sqlite3
* (René) roles of DP overworked
* (René) see issue #19: get data only when daylight added as an option
* (René) see issue #29: default color for widget axis label changed
* (René) widget: log if widget is too small added

## 2.4.3 (2020-04-02)
* (René) bugfix in DB_CalcHistory_Today used for widget

## 2.4.2 (2020-02-01)
* (René) bugfix widget

## 2.4.0 (2019-12-28)
* (René) update to my own flot 3.0

## 2.3.4 (2019-10-31)
* (René) update flot to version 3.0

### 2.3.3 (2019-02-03)
* (René) due to install problems downgrade of sqlite3 package

### 2.3.1 (2019-02-02)
* (René) bug fix: with sqlite "today" data were not shown

### 2.3.0 (2019-01-20)
* (René) support of compact mode
* (René) add additional error information in log

### 2.2.5 (2018-11-26)
* (René) upgrade packages

### 2.2.5 (2018-11-04)
* (René) reset yield if no new value from today

### 2.2.4 (2018-08-19)
* (René) bugfix for ticks on X

### 2.2.3
* (René) the same as 2.2.2

### 2.2.2
* (René) add timestamp of last update

### 2.2.1
* (René) close of database connection after last query result is available (e.g. to support more than one inverter)

### 2.2.0
* (Nis) background color and border
* (René) bug fixes in admin3

### 2.1.0
* (René) Support MariaDB

### 2.0.1
* (René) Support of admin3

### 2.0.0
* (René) since we always use one graph per widget, only one is supported now
		Attention: widget is not compatible with version 1.x.x; just check settings in widget after installation!

### 1.1.0
* (René) autoscale of y axis
* (René) color for y axis 
* (René) adjustable date format 

### 1.0.1
* (René) bug fix for sqlite

### 1.0.0
* (René) first stable release

### 0.2.6
* (René) bug fix for android app > 1.0.6

### 0.2.5
* (René) use install date to calculate historical values

### 0.2.4
* (René) logo changed

### 0.2.3
* (René) adding historical data as datapoint (JSON)
* (René) new vis widget to show historical data

### 0.2.2
* (René) renamed to sbfspot

### 0.2.1
* (René) index.html updated

### 0.2.0
* (René) support of sqlite and license changed to MIT

### 0.1.1
* (René) UTF8 coding

### 0.1.0
* (René) first release

### 0.0.1
* (René) initial release


## License
Copyright (C) <2017-2020>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.




