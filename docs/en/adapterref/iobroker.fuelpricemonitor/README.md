![Logo](admin/fuelpricemonitor.png)
# ioBroker.fuelpricemonitor

[![NPM version](http://img.shields.io/npm/v/iobroker.fuelpricemonitor.svg)](https://www.npmjs.com/package/iobroker.fuelpricemonitor)
![Number of Installations (stable)](http://iobroker.live/badges/fuelpricemonitor-stable.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.fuelpricemonitor.svg)](https://www.npmjs.com/package/iobroker.fuelpricemonitor)
![Number of Installations (latest)](http://iobroker.live/badges/fuelpricemonitor-installed.svg)
[![Dependency Status](https://img.shields.io/david/HGlab01/iobroker.fuelpricemonitor.svg)](https://david-dm.org/HGlab01/iobroker.fuelpricemonitor)
[![Known Vulnerabilities](https://snyk.io/test/github/HGlab01/ioBroker.fuelpricemonitor/badge.svg)](https://snyk.io/test/github/HGlab01/ioBroker.fuelpricemonitor)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.fuelpricemonitor.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.fuelpricemonitor?ref=badge_shield)
![Test and Release](https://github.com/HGlab01/ioBroker.fuelpricemonitor/workflows/Test%20and%20Release/badge.svg)

[![NPM](https://nodei.co/npm/iobroker.fuelpricemonitor.png?downloads=true)](https://nodei.co/npm/iobroker.fuelpricemonitor/)

## fuelpricemonitor adapter for ioBroker

This adapter retrieves the fuel (Diesel, Super95 and CNG) prices from the offical Austria database based on your configered geo-position. Additional locations can be added.
Default schedule is done every 20 minutes as cron job in the instance tab.  

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!  

**WORKS WITH JSCONTROLER VERSION 3.2.16 OR LATER!**

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

### 0.2.4 (2021-04-21)
* (HGlab01) add feature (experimental!) to sort by ID instead of price (helps to monitor one specific gas station)
* (HGlab01) add attributes 'from', 'to', 'day' and 'orders'
* (HGlab01) Bump iobroker-jsonexplorer to v0.0.0-18

### 0.2.3 (2021-03-26)
* (HGlab01) switch library from deprecated "request" to "axios"

### 0.2.2 (2021-03-13)
* (HGlab01) improve error handling and debug log

### 0.2.1 (2021-03-08)
* (HGlab01) Bump js-controller to 3.2.16 for proper device/channel/state deletion
* (HGlab01) use function deleteEverything from json-Explorer@0.0.13
* (HGlab01) improve device/channel/state cleaning

### 0.2.0 (2021-03-04)
* (HGlab01) additional locations can be added
* (HGlab01) for a proper working of the new version a uninstall/install is recommended
* (HGlab01) small improvements

### 0.1.4 (2021-02-22)
* (HGlab01) optimize device/channel deletion
* (HGlab01) improve Sentry handling

### 0.1.3 (2021-02-20)
* (HGlab01) add attributes accessMod and clubCardText
* (HGlab01) Improve logs
* (HGlab01) fuel type (Diesel, Super95, CNG) can be selected

### 0.1.2 (2021-02-17)
* (HGlab01) first beta version

## License
MIT License

Copyright (c) 2021 HGlab01 <iobroker.followthesun@gmail.com>

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


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.fuelpricemonitor.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.fuelpricemonitor?ref=badge_large)
