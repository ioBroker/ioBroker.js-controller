![Logo](admin/followthesun.png)
# ioBroker.followthesun

[![NPM version](http://img.shields.io/npm/v/iobroker.followthesun.svg)](https://www.npmjs.com/package/iobroker.followthesun)
![Number of Installations (stable)](http://iobroker.live/badges/followthesun-stable.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.followthesun.svg)](https://www.npmjs.com/package/iobroker.followthesun)
![Number of Installations (latest)](http://iobroker.live/badges/followthesun-installed.svg)
[![Dependency Status](https://img.shields.io/david/HGlab01/iobroker.followthesun.svg)](https://david-dm.org/HGlab01/iobroker.followthesun)
[![Known Vulnerabilities](https://snyk.io/test/github/HGlab01/ioBroker.followthesun/badge.svg)](https://snyk.io/test/github/HGlab01/ioBroker.followthesun)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.followthesun.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.followthesun?ref=badge_shield)
![Test and Release](https://github.com/HGlab01/ioBroker.followthesun/workflows/Test%20and%20Release/badge.svg)

[![NPM](https://nodei.co/npm/iobroker.followthesun.png?downloads=true)](https://nodei.co/npm/iobroker.followthesun/)

## followthesun adapter for ioBroker

This adapter calculates the current altitude and azimuth of the sun based on the geoposition. Additionally compass direction and the movement (sunrise or sunset) of the sun is stored.
It is using the geo-position defined in the configuration. Calculation interval can be defined in instance preferences.
Solar-noon values for some days like today, tomorrow or beginn of spring/summer/autumn/winter are stored as well.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.2.6 (2020-12-30)
* (HGlab01) implement license check provided by app.fossa.com

### 0.2.5 (2020-12-16)
* (HGlab01) add unit to solarnoon-values (issue #30)

### 0.2.4 (2020-12-13)
* (HGlab01) Prepare for stable repository

### 0.2.3 (2020-12-13)
* (HGlab01) Update dependencies
* (HGlab01) Change type to "geoposition" 

### 0.2.2 (2020-12-07)
* (HGlab01) Decrease log-level

### 0.2.1 (2020-12-07)
* (HGlab01) update dependecies
* (HGlab01) add solar-noon information
* (HGlab01) add compass information
* (HGlab01) breaking change! states moved from root to "current"

### 0.1.0 (2020-11-30)
* (HGlab01) first beta release

### 0.0.7-0 (2020-07-21)
* (HGlab01) alpha version

## License
MIT License

Copyright (c) 2020 HGlab01 <iobroker.followthesun@gmail.com>

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


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.followthesun.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.followthesun?ref=badge_large)
