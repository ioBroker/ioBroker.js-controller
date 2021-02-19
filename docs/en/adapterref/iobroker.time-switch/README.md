![Logo](admin/time-switch.png)
# ioBroker.time-switch

[![NPM version](http://img.shields.io/npm/v/iobroker.time-switch.svg)](https://www.npmjs.com/package/iobroker.time-switch)
[![Downloads](https://img.shields.io/npm/dm/iobroker.time-switch.svg)](https://www.npmjs.com/package/iobroker.time-switch)
[![Installs](https://camo.githubusercontent.com/5d62363be94ae20ae8302ef5dc2f3c533268742d/687474703a2f2f696f62726f6b65722e6c6976652f6261646765732f74696d652d7377697463682d696e7374616c6c65642e737667)]()
[![Dependency Status](https://img.shields.io/david/walli545/iobroker.time-switch.svg)](https://david-dm.org/walli545/iobroker.time-switch)
[![Known Vulnerabilities](https://snyk.io/test/github/walli545/ioBroker.time-switch/badge.svg)](https://snyk.io/test/github/walli545/ioBroker.time-switch)
[![Travis-CI](http://img.shields.io/travis/walli545/ioBroker.time-switch/master.svg)](https://travis-ci.org/walli545/ioBroker.time-switch)
[![codecov](https://codecov.io/gh/walli545/ioBroker.time-switch/branch/master/graph/badge.svg)](https://codecov.io/gh/walli545/ioBroker.time-switch)

[![NPM](https://nodei.co/npm/iobroker.time-switch.png?downloads=true)](https://nodei.co/npm/iobroker.time-switch/)


## time-switch adapter for ioBroker

This adapter allows the user to switch devices on and off using time schedules. 
The schedules can be fully configured by a vis widget.
One schedule switches one or more ioBroker states and consists of one or more triggers that define when and how the state should be switched. 
It is possible to configure at which time and on which weekdays the trigger should be triggered. Astro triggers can also be created.
There can be custom on/off values also.
In the widget the schedule can be disabled temporarily and the switched state can be controlled manually.

![Preview](widgets/time-switch/img/prev/prev-device-schedule.jpg)

## Setup

For setup instructions visit the [wiki](https://github.com/walli545/ioBroker.time-switch/wiki) (German instructions available also).
     
## Possible features in the future

- Countdown trigger
- Switching of arbitrary values

## Changelog

### 2.2.1
* (walli545)
    * (Fix) Set js-controller dependency to >= 2.0.0

### 2.2.0
* (walli545)
    * (New) Conditional triggers that only execute when a certain condition is met (#31)
    * (New) Option to hide edit name button in widget (#119)
    * (Fix) Astro triggers not executing on days after initial creation (#123)
    * (Fix) Improved error handling (#61)

### 2.1.0
* (walli545)
    * Added astro triggers which can trigger on sunrise, noon, sunset with +- 120 min offset (#30)
    * Added custom styling via css custom properties
    * Fixed a bug which lead to undefined button behaviour when the widget is used together with material design theme by Uhula (#62)
    * Changed state listening to be a be ack based and removed unused on object change listener (#6)

### 2.0.0
**Attention**: Due to breaking changes in the schedule data structure, schedules created with versions 1.x are not compatible with 2.x.

*Before upgrading, remove all schedules in the instance settings and remove widgets in vis.*
* (walli545)
    * Value type can now be configured, this enables switching of real booleans and numbers (#19)
    * Added a new state for each schedule to disable/enable automatic switching (#24)
    * Added option to hide current value switch in widget (#23)
    * Switching of multiple states with one schedule. This allows the creation of groups for devices of the same type
    * Added translations to widget (#35)
    * Fixed widget not working on Safari and fully browser

### 1.1.0
* (walli545) 
    * New option to hide switched oid in widget (#20)
    * Fixed admin page not working on Firefox (#18)
    * Showing full schedule oid in admin page (e.g. time-switch.0.schedule0 instead of schedule0).

### 1.0.0
* (walli545) initial release, features:
    * Admin settings to create schedules
    * vis widget to edit schedules and add actions
    

## License
MIT License

Copyright (c) 2019-2021 walli545 <walli5446@gmail.com>

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
