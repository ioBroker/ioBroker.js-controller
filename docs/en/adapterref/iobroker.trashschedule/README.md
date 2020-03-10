![Logo](admin/trashschedule.png)

# ioBroker.trashschedule

[![NPM version](http://img.shields.io/npm/v/iobroker.trashschedule.svg)](https://www.npmjs.com/package/iobroker.trashschedule)
[![Downloads](https://img.shields.io/npm/dm/iobroker.trashschedule.svg)](https://www.npmjs.com/package/iobroker.trashschedule)
[![Stable](http://iobroker.live/badges/trashschedule-stable.svg)](http://iobroker.live/badges/trashschedule-stable.svg)
[![installed](http://iobroker.live/badges/trashschedule-installed.svg)](http://iobroker.live/badges/trashschedule-installed.svg)
[![Dependency Status](https://img.shields.io/david/klein0r/iobroker.trashschedule.svg)](https://david-dm.org/klein0r/iobroker.trashschedule)
[![Known Vulnerabilities](https://snyk.io/test/github/klein0r/ioBroker.trashschedule/badge.svg)](https://snyk.io/test/github/klein0r/ioBroker.trashschedule)
[![Build Status](http://img.shields.io/travis/klein0r/ioBroker.trashschedule.svg)](https://travis-ci.org/klein0r/ioBroker.trashschedule)

[![NPM](https://nodei.co/npm/iobroker.trashschedule.png?downloads=true)](https://nodei.co/npm/iobroker.trashschedule/)

Scans an ical calendar to calculate the days left until next trash pickup

## Preconditions

1. Create an **ical instance**
2. Configure url of your calendar (e.g. google calendar)
3. Set "Preview days" to a range which includes every trash type once
4. Choose option to "Hide Start-End of events"
5. If you use the "events" tab, ensure to enable the "display" checkbox for each event type which should also be used in your trash schedule (otherwise the event will be hidden by the ical instance)

## Configuration

1. Create a trash schedule instance and choose the ical instance as source
2. Go to the trash types tab and add type names and event matches
3. Start the instance

## Changelog

### 0.0.5

* (klein0r) added pickup dates after next date

### 0.0.4

* (klein0r) added VIS templates

### 0.0.3

* (klein0r) fixed issue with events after time change date

### 0.0.2

* (klein0r) added global offset in days
* (klein0r) added exact match for types

### 0.0.1

* (klein0r) initial release

## License

MIT License

Copyright (c) 2020 Matthias Kleine <info@haus-automatisierung.com>

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