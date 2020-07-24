![Logo](admin/logparser.png)
# ioBroker.logparser

[![NPM version](http://img.shields.io/npm/v/iobroker.logparser.svg)](https://www.npmjs.com/package/iobroker.logparser)
[![Downloads](https://img.shields.io/npm/dm/iobroker.logparser.svg)](https://www.npmjs.com/package/iobroker.logparser)
![Number of Installations (latest)](http://iobroker.live/badges/logparser-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/logparser-stable.svg)
[![Dependency Status](https://img.shields.io/david/Mic-M/iobroker.logparser.svg)](https://david-dm.org/Mic-M/iobroker.logparser)
[![Known Vulnerabilities](https://snyk.io/test/github/Mic-M/ioBroker.logparser/badge.svg)](https://snyk.io/test/github/Mic-M/ioBroker.logparser)

[![NPM](https://nodei.co/npm/iobroker.logparser.png?downloads=true)](https://nodei.co/npm/iobroker.logparser/)

**Tests:** [![Travis-CI](http://img.shields.io/travis/Mic-M/ioBroker.logparser/master.svg)](https://travis-ci.org/Mic-M/ioBroker.logparser)

## Log Parser for all ioBroker adapters

This adapter parses (filters) all logs of ioBroker adapters and provides the results as JSON in states for each filter as configured in the settings.
Resulting JSON can then be used in VIS for visualization. States for emptying (clearing) old logs are provided as well (like `logparser.0.filters.Homematic.emptyJson` or `logparser.0.emptyAllJson` to empty all.)

![States](docs/en/img/states.png)


## Instructions

* **[English Instructions](docs/en/logparser.md)**

* **[Deutsche Anleitung](docs/de/logparser.md)**

## Visualization Example (animated gif)

![Vis](docs/de/img/visintro.gif)

## Changelog

### 1.0.0
* (Mic-M) No changes - just prepare versioning to add adapter to stable repository per [Adapter dev docu](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md#versioning)

### 0.4.11
* (Mic-M) Adapter is now in latest repository.
* (Mic-M) Removed unused adapter features 'extra tab' and 'custom state options'
* (Mic-M) Removed unused subscription to object changes

### 0.4.10
* (Mic-M) Fixed reference to 'visualization.table' for adapter instances other than instance 0.
* (Mic-M) Cleanup code.

### 0.4.9
* (Mic-M) Add option to remove script.js.Script_Name, update documentation

### 0.4.8
* (Mic-M) Fixed npm issue

### 0.4.7
* (Mic-M) Fixed translations, disabled 'supportCustoms', improved admin settings

### 0.4.6
* (Mic-M) Added error handling for invalid regex provided by user
* (Mic-M) A few other fixes/improvements under the hood

### 0.4.5
* (Mic-M) Fixed issue with merge option and other filter settings by now cloning input logObject prior to handling
* (Mic-M) Allow wildcard * for 'Whitelist AND' and 'Whitelist OR' to indicate matching all

### 0.4.4
* (Mic-M) Translations added, adapter instructions added, optimized admin interface

### 0.4.3
* (Mic-M) Fix multiple regex/string config values separated by comma

### 0.4.2
* (Mic-M) Fix issue #12 ('state is missing the required property val')
* (Mic-M) Fix issue with visualization.tableX.json and .selection. See https://forum.iobroker.net/post/408513

### 0.4.1
* (Mic-M) Fix 'Yesterday' for date, 2. Fix multiple filters, 3. Add description to settings page

### 0.4.0
* (Mic-M) Add new option "maxLength" to limit the length of each log message

### 0.3.0
* (Mic-M) initial public release

## License
MIT License

Copyright (c) 2020 Mic-M

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