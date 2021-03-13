![Logo](admin/geofency.png)
# ioBroker.geofency
====================

![Number of Installations](http://iobroker.live/badges/geofency-installed.svg) ![Number of Installations](http://iobroker.live/badges/geofency-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.geofency.svg)](https://www.npmjs.com/package/iobroker.geofency)
[![Downloads](https://img.shields.io/npm/dm/iobroker.geofency.svg)](https://www.npmjs.com/package/iobroker.geofency)

[![NPM](https://nodei.co/npm/iobroker.geofency.png?downloads=true)](https://nodei.co/npm/iobroker.geofency/)


This Adapter is able to receive [geofency](http://www.geofency.com/) events when entering or leaving a defined area with your mobile device.
All values of the geofency-webhook of the request are stored under the name of the location in ioBroker.

## configuration on mobile device:
* for any location -> properties -> webhook settings:
 * URL for entry & exit: &lt;your ioBroker Domain&gt;:&lt;configured port&gt;/&lt;any locationname&gt;
 * Post Format: JSON-encoded: enabled
 * authentication: set user / password from iobroker.geofency config

## in ioBroker Forum (German)
http://forum.iobroker.net/viewtopic.php?f=20&t=2076

## security note:
It is not recommended to expose this adapter to the public internet.
Some kind of WAF/proxy/entry Server should be put before ioBroker. (e.g. nginx is nice and easy to configure).

## Changelog

### 1.0.3 (2021-03-10)
* (Apollon77) Fix port checks

### 1.0.2 (2021-03-09)
* (Apollon77) optimize stop handling to really end the server

### 1.0.1 (2021-03-07)
* (Apollon77) prevent warnings with js-controller 3.2

### 1.0.0 (2021-02-26)
* (Apollon77) js-controller 2.0 is now needed at least
* (allesgutewarweg) Add more JSON decoded states
* (Apollon77) Update dependencies

### 0.3.2 (2018-03-07)
* (Apollon77) Fix Authentication

### 0.3.0 (2017-10-04)
* (Apollon77) BREAKING!!! Make sure 'entry' is really a boolean as defined in object

### 0.2.0 (2017-06-09)
* (Apollon77) Add missing authentication check
* (Apollon77) Add option to send in data as Message when received over other ways
* (Apollon77) Add option not to start a webserver for cases where data are received using messages

### 0.1.5 (2016-09-19)
* (soef) support of certificates

### 0.1.4 (2016-03-29)
* (dschaedl) replaced geofency Icon (on request of bluefox)

### 0.1.3 (2016-03-29)
* (soef) fixed atHome and atHomeCount state creation

### 0.1.2 (2016-02-13)
* (soef) Dots in location name will be replaced by an underscore

### 0.1.1 (2016-02-01)
* (Pmant) Fix config page

### 0.1.0 (2016-01-26)
* (soef) Fix error with "at home" settings

### 0.0.4 (2016-01-24)
* (soef) Added some new states

### 0.0.3 (2016-01-21)
* (soef) Some modifications
* (bluefox) change type

### 0.0.2
* (dschaedl) moved to iobroker/iobroker.geofency

### 0.0.1
* (dschaedl) initial release

## License

The MIT License (MIT)

Copyright (c) 2015 dschaedl <daniel.schaedler@gmail.com>

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
