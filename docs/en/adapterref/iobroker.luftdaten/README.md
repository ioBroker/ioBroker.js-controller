![Logo](admin/luftdaten.png)

# ioBroker.luftdaten

[![NPM version](http://img.shields.io/npm/v/iobroker.luftdaten.svg)](https://www.npmjs.com/package/iobroker.luftdaten)
[![Downloads](https://img.shields.io/npm/dm/iobroker.luftdaten.svg)](https://www.npmjs.com/package/iobroker.luftdaten)
[![Stable](http://iobroker.live/badges/luftdaten-stable.svg)](http://iobroker.live/badges/luftdaten-stable.svg)
[![installed](http://iobroker.live/badges/luftdaten-installed.svg)](http://iobroker.live/badges/luftdaten-installed.svg)
[![Dependency Status](https://img.shields.io/david/klein0r/iobroker.luftdaten.svg)](https://david-dm.org/klein0r/iobroker.luftdaten)
[![Known Vulnerabilities](https://snyk.io/test/github/klein0r/ioBroker.luftdaten/badge.svg)](https://snyk.io/test/github/klein0r/ioBroker.luftdaten)
[![Build Status](http://img.shields.io/travis/klein0r/ioBroker.luftdaten.svg)](https://travis-ci.org/klein0r/ioBroker.luftdaten)

[![NPM](https://nodei.co/npm/iobroker.luftdaten.png?downloads=true)](https://nodei.co/npm/iobroker.luftdaten/)

This adapter adds "luftdaten.info" sensor data to your ioBroker installation.
You can decide if you want to add a local sensor by ip or if you just want to use the API of lufdaten.info to get the data of another sensor.

## Configuration

### Local

1. Build your own adapter and add it to your local wifi network
2. Create a new instance of the adapter
3. Choose "Local" as type
4. Fill the IP or Hostname of the sensor in the second input
5. Choose a name and save the settings

Wait some minutes until the cronjob collects the data for the first time.

*Feel free to change the schedule settings in the instances tab (default is every 15 minutes).*

### Remote

1. Choose one of the sensors on the online map: [deutschland.maps.luftdaten.info](https://deutschland.maps.luftdaten.info/)
2. Click on the sensor and copy the ID (#XXXXX)
3. Create a new instance of the adapter
4. Choose "Remote" as type
5. Fill the ID of the sensor in the second input
6. Choose a name and save the settings

Wait some minutes until the cronjob collects the data for the first time.

*Feel free to change the schedule settings in the instances tab (default is every 15 minutes).*

## Contributors

- klein0r
- pix
- GermanBluefox
- Apollon77

## Changelog

### 1.0.2

* (klein0r) Fixed async object creation

### 1.0.1

* (klein0r) Added iobroker sentry

### 1.0.0

* (klein0r) First stable release

### 0.0.18

* (klein0r) Added units for pressure and noise

### 0.0.17

* (klein0r) Added link to sensor map

### 0.0.16

* (klein0r) Minor bugfixes

### 0.0.15

* (klein0r) setTimeout found in main.js, but no clearTimeout detected

### 0.0.14

* (klein0r) Fixed sensor data check issue

### 0.0.13

* (klein0r) Added missing translations

### 0.0.12

* (klein0r) Minor bugfixes
* (dominik-lienemann) Added timestamp of last sensor update

### 0.0.11

* (klein0r) fixed units of states

### 0.0.10

* (klein0r) changed API url

### 0.0.9

* (klein0r) minor bugfixes

### 0.0.9

* (klein0r) improved logging

### 0.0.8

* (klein0r) added response time and units

### 0.0.7

* (klein0r) merged pull requests - thanks a lot for contribution

### 0.0.6

* (klein0r) changed type to weather

### 0.0.5

* (klein0r) fixed issues when sensor is not available
* (klein0r) added location information for remote sensors

### 0.0.4

* (pix) path is IP if sensor is local

### 0.0.3

* (pix) path and sensor name added

### 0.0.1

* (klein0r) initial release

## License

The MIT License (MIT)

Copyright (c) 2021 Matthias Kleine <info@haus-automatisierung.com>

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
