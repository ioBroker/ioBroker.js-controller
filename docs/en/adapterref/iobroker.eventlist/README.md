![Logo](admin/eventlist.png)
# ioBroker.eventlist

[![NPM version](http://img.shields.io/npm/v/iobroker.eventlist.svg)](https://www.npmjs.com/package/iobroker.eventlist)
[![Downloads](https://img.shields.io/npm/dm/iobroker.eventlist.svg)](https://www.npmjs.com/package/iobroker.eventlist)
![Number of Installations (latest)](http://iobroker.live/badges/eventlist-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/eventlist-stable.svg)
[![Dependency Status](https://img.shields.io/david/bluefox/iobroker.eventlist.svg)](https://david-dm.org/bluefox/iobroker.eventlist)
[![Known Vulnerabilities](https://snyk.io/test/github/bluefox/ioBroker.eventlist/badge.svg)](https://snyk.io/test/github/bluefox/ioBroker.eventlist)

[![NPM](https://nodei.co/npm/iobroker.eventlist.png?downloads=true)](https://nodei.co/npm/iobroker.eventlist/)

## eventlist adapter for ioBroker
Allows to define the states that must be logged in event list.

The list can be shown in admin, web, vis, saved as PDF, material (not yet implemented).

Additionally you can send events via Telegram or WhatsApp.

![List](img/list.png)

![PDF](img/pdf.png)

## Alarm mode
The events could be generated only in alarm mode.
The alarm mode could be controlled by variable `eventlist.X.alarm`.
 
Additionally the messages to messengers could be sent only if alarm mode is ON.

Use case:
- E.g. door sensor can send the messages only if nobody is home. Elsewise the events about door opening will be only collected in the event list.  

## Possible presentations

### In Admin as tab
You can enable the event list as a tab in admin.

### Web
Event list could be shown under `http://<IP>:8082/eventlist/index.html`

### Vis Widget
Event list can be displayed as vis widget. 

### PDF generation
There is a possibility to generate a PDF document with all events.

Document title can consist the generation date if you place the pattern into it: `Event list on {{YYYY MM DD}}`. 
The exactly description of time format could be found here: https://momentjs.com/docs/#/displaying/format/

The generation of PDF can be triggered by writing a `true` into `eventlist.0.triggerPDF`. 

The PDF file could be accesses via:
- web: `http://<IP>:8082/eventlist/eventlist/report.pdf`
- admin: `http://<IP>:8081/files/eventlist/report.pdf`

**The icons could not be shown in PDF.**

## Todo
- Many predefined icons (minimum 100)
- Material widget
- Send messages to syslog (may be splunk) https://www.npmjs.com/package/splunk-logging

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

## Changelog
### 0.2.5 (2020-09-24)
* (bluefox) Extended icon selector 
 
### 0.2.1 (2020-09-21)
* (bluefox) Vis-widget was corrected 

### 0.1.3 (2020-09-15)
* (bluefox) Implemented the alarm mode and messengers 

### 0.0.3 (2020-09-08)
* (bluefox) Objects with states are supported now 

### 0.0.2 (2020-09-07)
* (bluefox) initial commit

### 0.0.1
* (bluefox) initial release

## License
MIT License

Copyright (c) 2020 ioBroker <dogafox@gmail.com>

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