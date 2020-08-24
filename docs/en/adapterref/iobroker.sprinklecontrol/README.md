![Logo](admin/sprinklecontrol.png)
# ioBroker.sprinklecontrol



![Number of Installations](http://iobroker.live/badges/sprinklecontrol-installed.svg) 
[![NPM version](http://img.shields.io/npm/v/iobroker.sprinklecontrol.svg)](https://www.npmjs.com/package/iobroker.sprinklecontrol)
[![Downloads](https://img.shields.io/npm/dm/iobroker.sprinklecontrol.svg)](https://www.npmjs.com/package/iobroker.sprinklecontrol)
[![Dependency Status](https://img.shields.io/david/Dirk-Peter-md/iobroker.sprinklecontrol.svg)](https://david-dm.org/Dirk-Peter-md/iobroker.sprinklecontrol)
[![Known Vulnerabilities](https://snyk.io/test/github/Dirk-Peter-md/ioBroker.sprinklecontrol/badge.svg)](https://snyk.io/test/github/Dirk-Peter-md/ioBroker.sprinklecontrol)
[![Travis-CI](http://img.shields.io/travis/Dirk-Peter-md/ioBroker.sprinklecontrol/master.svg)](https://travis-ci.org/Dirk-Peter-md/ioBroker.sprinklecontrol)

[![NPM](https://nodei.co/npm/iobroker.sprinklecontrol.png?downloads=true)](https://nodei.co/npm/iobroker.sprinklecontrol/)


## sprinklecontrol adapter for ioBroker

This adapter controls individual irrigation circuits in the garden. Depending on the weather and soil conditions, they start working at a specific time or at sunrise, as specified in the configuration.

Wetterabhängige automatische steuerung der Gartenbewässerungs

[Deutsche Beschreibung hier](docs/de/sprinklecontrol.md)

Weather-dependent automatic control of garden irrigation

[English Description here](docs/en/sprinklecontrol.md)

*************************************************************************************************************************************


## Changelog

### 0.0.8 (17.08.2020)
* (Dirk-Peter-md) adapter.unload: (setTimeout > 1s) >>> delete

### 0.0.7 (23.07.2020)
* (Dirk-Peter-md) history zu festen Zeit 0:05 (nicht über dayNum)
* (Dirk-Peter-md) main.js aufgeräumt

### 0.0.6 (16.07.2020)
* (Dirk-Peter-md) calcPosTimer angepasst
* (Dirk-Peter-md) Beschreibung vervollständigt

### 0.0.5 (12.07.2020)
* (Dirk-Peter-md) .travis.yml für Node.js 10, 12 und 14 laut ioBroker.template angepasst

### 0.0.4 (04.07.2020)
* (Dirk-Peter-md) readme.md hinzugefügt
* (Dirk-Peter-md) sprinklecontrol.md hinzugefügt
* (Dirk-Peter-md) words.js hinzugefügt

### 0.0.1 (01.06.2020)
* (Dirk-Peter-md) initial release


*************************************************************************************************************************************



## License
MIT License

Copyright (c) 2019 - 2020 Dirk-Peter-md

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

