![Logo](admin/traccar.png)
# ioBroker.traccar

[![NPM version](http://img.shields.io/npm/v/iobroker.traccar.svg?dummy=unused)](https://www.npmjs.com/package/iobroker.traccar)
[![Downloads](https://img.shields.io/npm/dm/iobroker.traccar.svg?dummy=unused)](https://www.npmjs.com/package/iobroker.traccar)
![Number of Installations (latest)](https://iobroker.live/badges/traccar-installed.svg?dummy=unused)
![Number of Installations (stable)](https://iobroker.live/badges/traccar-stable.svg?dummy=unused)
[![Dependency Status](https://img.shields.io/david/o0shojo0o/iobroker.traccar.svg?dummy=unused)](https://david-dm.org/o0shojo0o/iobroker.traccar)
[![Known Vulnerabilities](https://snyk.io/test/github/o0shojo0o/ioBroker.traccar/badge.svg?dummy=unused)](https://snyk.io/test/github/o0shojo0o/ioBroker.traccar)

[![NPM](https://nodei.co/npm/iobroker.traccar.png?downloads=true)](https://nodei.co/npm/iobroker.traccar/)

## Traccar adapter for ioBroker

This adapter imports in real time the position and the extended data from [Traccar](https://www.traccar.org) and makes them available in ioBroker.

## Changelog
<!--
 https://github.com/AlCalzone/release-script#usage
    npm run release minor -- --all 0.9.8 -> 0.10.0
    npm run release patch -- --all 0.9.8 -> 0.9.9
    npm run release prerelease beta -- --all v0.2.1 -> v0.2.2-beta.0  
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 0.0.6 (2021-03-19)
* (o0shojo0o) adjustments according to the adapter review

### 0.0.5 (2021-03-08)
* (o0shojo0o) add [release-script](https://github.com/AlCalzone/release-script)

### 0.0.4
* (o0shojo0o) add datapoint address (https://www.traccar.org/reverse-geocoding/)

### 0.0.3
* (o0shojo0o) workaround for unclean geofences in the database 

### 0.0.2
* (o0shojo0o) add websocket connection
* (o0shojo0o) add position url
* (o0shojo0o) add dynamic datapoints for attributes  

### 0.0.1
* (braindead1) initial release

## License
MIT License

Copyright (c) 2021 Dennis Rathjen <info@bastelbunker.de>

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
