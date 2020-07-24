![Logo](admin/schoolfree.png)
# ioBroker.schoolfree

![Number of Installations](http://iobroker.live/badges/schoolfree-installed.svg) ![Number of Installations](http://iobroker.live/badges/schoolfree-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.schoolfree.svg)](https://www.npmjs.com/package/iobroker.schoolfree)
[![Downloads](https://img.shields.io/npm/dm/iobroker.schoolfree.svg)](https://www.npmjs.com/package/iobroker.schoolfree)
[![Dependency Status](https://img.shields.io/david/simatec/iobroker.schoolfree.svg)](https://david-dm.org/simatec/iobroker.schoolfree)
[![Known Vulnerabilities](https://snyk.io/test/github/simatec/ioBroker.schoolfree/badge.svg)](https://snyk.io/test/github/simatec/ioBroker.schoolfree)
[![Travis-CI](http://img.shields.io/travis/simatec/ioBroker.schoolfree/master.svg)](https://travis-ci.org/simatec/ioBroker.schoolfree)
[![AppVeyor](https://ci.appveyor.com/api/projects/status/github/simatec/ioBroker.schoolfree?branch=master&svg=true)](https://ci.appveyor.com/project/simatec/ioBroker-schoolfree/)

[![NPM](https://nodei.co/npm/iobroker.schoolfree.png?downloads=true)](https://nodei.co/npm/iobroker.schoolfree/)


This adapter uses the service Sentry.io to automatically report exceptions and code errors and new device schemas to me as the developer. More details see below!


## schoolfree adapter for ioBroker


**If you like it, please consider a donation:**
  
[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=Q4EEXQ6U96ZTQ&source=url)



### Deutsche Beschreibung:

Schoolfree ist ein Adapter für iobroker Installationen.
Mit dem Adapter lassen sich die Schulferien auswerten und in Datenpunkte übergeben.
Die Datenpunkte können somit für weitere Funktionen wie Heizungssteuerungen, Rolladen- und Anwesenheitssteuerungen ausgewertet und verarbeitet werden.

Der aktuelle Bezug von Terminen für die Schulferien erfolgt über die API von https://www.mehr-schulferien.de

Aktuell werden die Schulferien und freien Tage für Deutschland unterstützt.

Folgende Datenpunkte stehen mit Schoolfree für die weitere Verarbeitung zur Verfügung:

* info.current.end: Datum für das Ende der aktuellen Ferien
* info.current.name: Bezeichnung der aktuellen Schulferien
* info.current.start: Startdatum der aktuellen Ferien
* info.next.end: Datum für das Ende der nächsten Ferien
* info.next.name: Bezeichnung der nächsten Schulferien
* info.next.start: Startdatum der nächsten Ferien
* info.today: Switch für den aktuellen Status heute (true/false)
* info.tomorrow: Switch für den aktuellen Status morgen (true/false)

*************************************************************************************************************************************

### English description:

Schoolfree is an adapter for iobroker installations.
With the adapter, the school holidays can be evaluated and transferred to data points.
The data points can thus be evaluated and processed for other functions such as heating controls, shutter and presence controls.

The current subscription for school holidays is via the API of https://www.mehr-schulferien.de

Currently, the school holidays and days off for Germany are supported.

The following data points are available for further processing with Schoolfree:

* info.current.end: Date for the end of the current holidays
* info.current.name: name of the current school holidays
* info.current.start: Start date of the current holiday
* info.next.end: Date for the end of the next holidays
* info.next.name: name of the next school holidays
* info.next.start: Start date of the next holiday
* info.today: Switch for the current status today (true / false)
* info.tomorrow: switch for the current status tomorrow (true / false)


### What is Sentry.io and what is reported to the servers of that company?
Sentry.io is a service for developers to get an overview about errors from their applications. And exactly this is implemented in this adapter.

When the adapter crashes or an other Code error happens, this error message that also appears in the ioBroker log is submitted to Sentry. When you allowed iobroker GmbH to collect diagnostic data then also your installation ID (this is just a unique ID **without** any additional infos about you, email, name or such) is included. This allows Sentry to group errors and show how many unique users are affected by such an error. All of this helps me to provide error free adapters that basically never crashs.


*************************************************************************************************************************************

## Changelog

### 0.6.4 (06.07.2020)
* (simatec) small Bugfixes

### 0.6.3 (02.07.2020)
* (simatec) Bugfix API Request error

### 0.6.2 (27.05.2020)
* (simatec) small Bugfixes at locations settings

### 0.6.1 (11.05.2020)
* (simatec) added errorhandling for sentry.io
* (simatec) added node 14 support

### 0.6.0 (04.05.2020)
* (simatec) added new features
* (simatec) Bugfix next day schoolfree
* (simatec) added sentry.io
* (simatec) added translations
* (simatec) added error handling

### 0.5.1 (25.03.2020)
* (simatec) added new features

### 0.5.0 (23.03.2020)
* (simatec) added public holidays
* (simatec) Bugfix next schoolfree for API 2.0
* (simatec) Bugfix schoolfree-name for API 2.0

### 0.4.1 (22.03.2020)
* (simatec) new query as adaptation to API v2.0
* (simatec) Adjustment of the federal state IDs"
* (simatec) Code fix for autochecker
* (simatec) update Dependencies

### 0.4.0 (21.03.2020)
* (simatec) added new api v2.0 from www.mehr-schulferien.de

### 0.3.1 (28.10.2019)
* (simatec) Fix start after install

### 0.3.0 (18.10.2019)
* (simatec) end of node 6 support
* (simatec) changed dateformat

### 0.2.2 (04.06.2019)
* (simatec)new object structure

### 0.2.1 (14.05.2019)
* (simatec) fix travis and appveyor

### 0.2.0 (13.05.2019)
* (simatec) Add Objects for next school holiday
* (simatec) cleaned code

### 0.1.0 (10.05.2019)
* (simatec) First Beta

### 0.0.1 (08.05.2019)
* (simatec) initial release

*************************************************************************************************************************************


## License
MIT License

Copyright (c) 2019 - 2020 simatec

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