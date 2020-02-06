![Logo](admin/countdown.png)
# ioBroker.countdown
=================

[![Greenkeeper badge](https://badges.greenkeeper.io/jack-blackson/ioBroker.countdown.svg)](https://greenkeeper.io/) [![NPM version](http://img.shields.io/npm/v/iobroker.countdown.svg)](https://www.npmjs.com/package/iobroker.countdown) [![Build Status Travis](https://travis-ci.com/jack-blackson/ioBroker.countdown.svg?branch=master)](https://travis-ci.com/jack-blackson/ioBroker.countdown)  [![Downloads](https://img.shields.io/npm/dm/iobroker.countdown.svg)](https://www.npmjs.com/package/iobroker.countdown) ![Number of Installations](http://iobroker.live/badges/countdown-installed.svg) ![Number of Installations](http://iobroker.live/badges/countdown-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.countdown.png?downloads=true)](https://nodei.co/npm/iobroker.countdown.png?downloads=true/)


Countdown Adapter for ioBroker
------------------------------------------------------------------------------

The goal of the adapter is to provide you a possibility to run countdowns for future events, with years, months, days, hours and minutes. It will provide you each of those valies seperately, and also two strings with a short and long version of the date.


## Displaying countdowns
The adapter prowides you automatically a json table. You just need to use it with the json table widged. Please tick "No Header" there. It is possible to either display the short text or the long text.
![Logo](admin/countdown_json.png)

## How to create countdowns
There are two ways to set up countdowns:

* You can create a manual state in the device "setup". The name of the object is the alarm name, and the value will be the date. The date neets to be in the format "DD.MM.YYYY HH:mm:ss".
* You can create an alarm with sendto. There, you can either send the components (minimum is Year Month Date) or a date string. For the date string, you can adjust the format in the setup of the adapter.
![Logo](admin/countdown_blocky.png)
* You can add days, months and years with sendto to todays date. Therefore, please send the component "name" and either "addminutes", "addhours", "adddays", "addmonths" or "addyears" as int value.
![Logo](admin/countdown_blocky_add.png)

## How to delete countdowns
You  can delete a countdown with the sendto. Therefore, send just the name with sendto to the adapter, and the countdown will be deleted automatically.

## Available outputs

|Data type|Description|                                                                       
|:---:|:---:|
|minutes|Minutes until countdown end (not total!)|
|hours|Hours until countdown end (not total!)|
|days|Days until countdown end (not total!)|
|months|Months until countdown end (not total!)|
|years|Years until countdown end (not total!)|
|name|Countdown name|
|endDate|End date of count down - formated as in the setup defined|
|inWordsShort|Combined value of minutes, hours,... - e.g. 1Y 5M 4D|
|inWordsLong|Combined value of minutes, hours,... - e.g. 1 Year 5 Months 4 Days|
|totalHours|Total No. of hours until the end date|
|totalDays|Total No. of days until the end date|
|totalWeeks|Total No. of weeks until the end date|
|reached|Boolean field defining if the end date was reached or not|

## Features to add
* Possibility to add a script as a parameter and start it when countdown ends
* Possibility to use plus and minus in addminutes and the other add functions

## Changelog
## 1.0.5 (2020-02-05)
* (jack-blackson) Bugfix for alarm at midnight -> thanks to @Lueghi

## 1.0.4 (2019-08-25)
* (jack-blackson) Reordered release infos

## 1.0.3 (2019-08-10)
* (jack-blackson) Changes for Compact Mode
* (jack-blackson) Various bugfixes
* (jack-blackson) Having multiple instances of the adapater are now possible

## 1.0.2 (2019-07-22)
* (jack-blackson) Release version

## 0.7.0 (2019-07-07)
* (jack-blackson) Bugfixes
* (jack-blackson) addminutes and addhours are now also possible
* (jack-blackson) datapoint in setup is now editable
* (jack-blackson) added total no. of weeks

## 0.6.0 (2019-07-06)
* (jack-blackson) adjustable date format for input and output
* (jack-blackson) delete countdowns with sendto
* (jack-blackson) ability to add countdowns by "days/months/weeks from now)

## 0.5.0 (2019-07-04)
* (jack-blackson) adjust the data in the table
* (jack-blackson) bugfix date import 

### 0.4.0 (2019-06-04)
* (jack-blackson) restructuring - creation of alarms with sendto or manually with datapoint is now possible

### 0.3.0 (2019-05-24)
* (jack-blackson) added total No. of days and hours

### 0.2.0 (2019-05-21)
* (jack-blackson) adjusted packages

### 0.1.0 (2019-04-29)
* (jack-blackson) initial version

## License
The MIT License (MIT)

Copyright (c) 2019 jack-blackson <blacksonj7@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.