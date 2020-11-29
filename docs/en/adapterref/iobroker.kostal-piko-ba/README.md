![Logo](admin/picoba.png)
# ioBroker.kostal-piko-ba

[![NPM version](http://img.shields.io/npm/v/iobroker.kostal-piko-ba.svg)](https://www.npmjs.com/package/iobroker.kostal-piko-ba)
![NPM version (stable)](http://ioBroker.live/badges/kostal-piko-ba-stable.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.kostal-piko-ba.svg)](https://www.npmjs.com/package/iobroker.kostal-piko-ba)
![Number of Installations (latest)](http://ioBroker.live/badges/kostal-piko-ba-installed.svg)
[![Dependency Status](https://img.shields.io/david/hombach/ioBroker.kostal-piko-ba.svg)](https://david-dm.org/hombach/ioBroker.kostal-piko-ba)
[![Known Vulnerabilities](https://snyk.io/test/github/hombach/ioBroker.kostal-piko-ba/badge.svg)](https://snyk.io/test/github/hombach/ioBroker.kostal-piko-ba)

![Node.js CI](https://github.com/hombach/ioBroker.kostal-piko-ba/workflows/Node.js%20CI/badge.svg)

[![NPM](https://nodei.co/npm/iobroker.kostal-piko-ba.png?downloads=true)](https://nodei.co/npm/iobroker.kostal-piko-ba/)

**Travis CI-Tests:**: [![Travis-CI](http://img.shields.io/travis/hombach/ioBroker.kostal-piko-ba/master.svg)](https://travis-ci.org/hombach/ioBroker.kostal-piko-ba)

## Adapter for reading Kostal Piko BA data for iOBroker
Adapter for reading Kostal Piko BA data. Adapter creates some states and updates them sequentially.
Adapter also working with Kostal Piko 15 inverter. 
It's greatly appreciated if you verify functionality with other inverters and please send me a note.

## Settings
To connect to the Kostal Pico BA inverter noting its IP-address into the config is mandatory.
You could also edit the update frequencies of live, daily and livetime data.

## Notes
This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers. For more details and for informations on how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Changelog

### 1.1.3 (23.11.2020)
* (HombachC) added battery.Voltage; added additional error handler; bumped dependencies

### 1.1.2 (26.10.2020)
* (HombachC) bumped dependencies

### 1.1.1 (09.10.2020) stable
* (HombachC) minor documentation tweaks; DC current accuracy changed to mA

### 1.1.0 (09.10.2020)
* (tobstare) added DC1-3 Current, Voltage and Power
* (HombachC) added battery.ChargeCycles
* (HombachC) bumped dependencies; added battery.temperature

### 1.0.2 (23.09.2020) stable
* (HombachC) public release for stable repo

### 0.8.0 (18.08.2020)
* (HombachC) seperate editable poll timer for statistics data

### 0.7.4 (03.07.2020)
* (HombachC) added sentry.io support

### 0.6.1 (28.06.2020)
* (HombachC) poll of statistics data separated

### 0.5.1 (22.06.2020)
* (HombachC) introduced editable poll interval 

### 0.1.0 (15.05.2020)
* (HombachC) initial working release

## License
MIT License

Copyright (c) 2020 HombachC

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
