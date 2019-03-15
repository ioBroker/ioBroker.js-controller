![Logo](media/sbfspot.png)
# ioBroker.sbfspot
===========================

[![NPM version](https://img.shields.io/npm/v/iobroker.sbfspot.svg)](https://www.npmjs.com/package/iobroker.sbfspot)
[![Downloads](https://img.shields.io/npm/dm/iobroker.sbfspot.svg)](https://www.npmjs.com/package/iobroker.sbfspot)

[![NPM](https://nodei.co/npm/iobroker.sbfspot.png?downloads=true)](https://nodei.co/npm/iobroker.sbfspot/)



This adapter reads data from SMA power inverters using sbfspot.
Now both database types (mySQL and sqlite) are supported.
Since version 0.2.3 there is a own vis widget based on flot available to show historical data.

Hints: 
* use latest version from sbfspot from https://sbfspot.codeplex.com/ or from https://github.com/rg-engineering/SBFspot
* adapter, sbfspot and databases (mySQL or sqlite) must run on the same system e.g. Raspberry PI
* installation manual for sbfspot on Raspberry Pi (or similar) can be found under http://wiki.rg-engineering.eu/index.php?title=Install_sbfspot


## Changelog
#### 2.2.3
* (René) the same as 2.2.2

#### 2.2.2
* (René) add timestamp of last update

#### 2.2.1
* (René) close of database connection after last query result is available (e.g. to support more than one inverter)

#### 2.2.0
* (Nis) background color and border
* (René) bug fixes in admin3

#### 2.1.0
* (René) Support MariaDB

#### 2.0.1
* (René) Support of admin3

#### 2.0.0
* (René) since we always use one graph per widget, only one is supported now
		Attention: widget is not compatible with version 1.x.x; just check settings in widget after installation!

#### 1.1.0
* (René) autoscale of y axis
* (René) color for y axis 
* (René) adjustable date format 

#### 1.0.1
* (René) bug fix for sqlite

#### 1.0.0
* (René) first stable release

#### 0.2.6
* (René) bug fix for android app > 1.0.6

#### 0.2.5
* (René) use install date to calculate historical values

#### 0.2.4
* (René) logo changed

#### 0.2.3
* (René) adding historical data as datapoint (JSON)
* (René) new vis widget to show historical data

#### 0.2.2
* (René) renamed to sbfspot

#### 0.2.1
* (René) index.html updated

#### 0.2.0
* (René) support of sqlite and license changed to MIT

#### 0.1.1
* (René) UTF8 coding

#### 0.1.0
* (René) first release

#### 0.0.1
* (René) initial release


## License
Copyright (C) <2017>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.




