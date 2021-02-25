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

This adapter retrieves the fuel (Diesel, Super and Gas) prices from the offical Austria database based on your configered geo-position.
Default schedule is done every 20 minutes and can be changed in the "instance" tab.  


**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.1.4 (2021-02-22)
* (HGlab01) optimize device/channel deletion
* (HGlab01) improve Sentry handling

### 0.1.3 (2021-02-20)
* (HGlab01) add attributes accessMod and clubCardText
* (HGlab01) Improve logs
* (HGlab01) fuel type (Diesel, Super, Gas) can be selected

### 0.1.2 (2021-02-17)
* (HGlab01) first beta version

### 0.0.1-3 (2021-01-07)
* (HGlab01) first alpha version

## License
MIT License

Copyright (c) 2021 HGlab01 <iobroker.fuelpricemonitor@gmail.com>

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
