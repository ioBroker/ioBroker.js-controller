![Logo](admin/vodafone-speedtest.png)
# ioBroker.vodafone-speedtest

[![NPM version](http://img.shields.io/npm/v/iobroker.vodafone-speedtest.svg)](https://www.npmjs.com/package/iobroker.vodafone-speedtest)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vodafone-speedtest.svg)](https://www.npmjs.com/package/iobroker.vodafone-speedtest)
![Number of Installations (latest)](http://iobroker.live/badges/vodafone-speedtest-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/vodafone-speedtest-stable.svg)
[![Dependency Status](https://img.shields.io/david/peterbaumert/iobroker.vodafone-speedtest.svg)](https://david-dm.org/peterbaumert/iobroker.vodafone-speedtest)
[![Known Vulnerabilities](https://snyk.io/test/github/peterbaumert/ioBroker.vodafone-speedtest/badge.svg)](https://snyk.io/test/github/peterbaumert/ioBroker.vodafone-speedtest)

[![NPM](https://nodei.co/npm/iobroker.vodafone-speedtest.png?downloads=true)](https://nodei.co/npm/iobroker.vodafone-speedtest/)

**This adapter uses the service [Sentry.io](https://sentry.io) to automatically report exceptions and code errors and new device schemas to me as the developer.** More details see below!


## vodafone-speedtest adapter for ioBroker

Speedtest of Vodafone.de

Implements same technique as https://speedtest.vodafone.de

## What is Sentry.io and what is reported to the servers of that company?
Sentry.io is a service for developers to get an overview about errors from their applications. And exactly this is implemented in this adapter.

When the adapter crashes or an other Code error happens, this error message that also appears in the ioBroker log is submitted to Sentry. When you allowed iobroker GmbH to collect diagnostic data then also your installation ID (this is just a unique ID **without** any additional infos about you, email, name or such) is included. This allows Sentry to group errors and show how many unique users are affected by such an error. All of this helps me to provide error free adapters that basically never crashs.

## Changelog

### 0.0.6 (2021-01-21)
* Added Sentry.io Integration

### 0.0.5 (2020-05-26)
* Added ping results
* Added calculated values by actual raw data

### 0.0.4 (2020-04-30)
* Changed Adapter start type to scheduled (reinstallation might be needed)
* Bug fixes and feedback implementation

### 0.0.3 (2020-04-24)
* Implemented feedback from Forum and github issue

### 0.0.2 (2020-04-19)
* Added actual settings in Admin interface
* first version ready for testing

### 0.0.1 (2020-04-18)
* (Peter Baumert) initial release

## License
MIT License

Copyright (c) 2020 Peter Baumert <ioBroker.vodafone-speedtest@outlook.com>

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