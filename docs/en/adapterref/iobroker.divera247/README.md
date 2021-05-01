![Logo](admin/divera247_long.png)
# ioBroker.divera247

[![NPM version](http://img.shields.io/npm/v/iobroker.divera247.svg)](https://www.npmjs.com/package/iobroker.divera247)
[![Downloads](https://img.shields.io/npm/dm/iobroker.divera247.svg)](https://www.npmjs.com/package/iobroker.divera247)
![Number of Installations (latest)](http://iobroker.live/badges/divera247-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/divera247-stable.svg)
[![Dependency Status](https://img.shields.io/david/TKnpl/iobroker.divera247.svg)](https://david-dm.org/TKnpl/iobroker.divera247)
[![Known Vulnerabilities](https://snyk.io/test/github/TKnpl/ioBroker.divera247/badge.svg)](https://snyk.io/test/github/TKnpl/ioBroker.divera247)

[![NPM](https://nodei.co/npm/iobroker.divera247.png?downloads=true)](https://nodei.co/npm/iobroker.divera247/)

**Tests:** ![Test and Release](https://github.com/TKnpl/ioBroker.divera247/workflows/Test%20and%20Release/badge.svg)

## divera247 adapter for ioBroker

Adapter for the alerting service "Divera 24/7"

## Requirements
For full usability of this adapter your organisation has to subscribe the "Alarm" plan of Divera 24/7 services

## Configuartion of this adapter
You have to enter the "Divera 24/7" API key from your organisation to this adapter.
To find out the API key, go to the official [Divera 24 / 7 website](https://www.divera247.com/) and navigate to administration -> settings -> interfaces -> API. Here you can find the token in the "authorisation" area.

Furthermore you can restrict the alarms on specific users or alarm groups.
For this you have to enter the Divera user IDs or alarm group number into the admin page of this adapter. Several user IDs and / or alarm group numbers can be specifyed seperated by comma (,).
This adapter checks first the userIDs befor it checks the groups. The first hit will trigger the alarm and update all states. A combination of userID and alarm group is currently not possible. 
To find out the own user ID, go to the official [Divera 24 / 7 website](https://www.divera247.com/) and navigate to user profile -> settings -> debug -> "Aktuelle ID".

To subscribe **all alarms**, just leave the relevant field empty.

Furthermore please choose an updating interval for calling the API server. 30 seconds are recommended. The minimum is 10 seconds.

## Changelog

### 0.1.2
* (TKnpl) added alarmed vehicles datapoint

### 0.1.1
* (TKnpl) small changes - wording

### 0.1.0
* (TKnpl) added possibility to specify alarm groups

### 0.0.10
* (TKnpl) bug in info.connection fixed and handling of user ids expanded

### 0.0.9
* (TKnpl) added default values for admin page

### 0.0.8
* (TKnpl) Changed API call from intervall to timeout, added states 'group' and 'foreign_id'

### 0.0.7
* (TKnpl) added object 'priority' and 'alarm' object updates only in case of an new alarm or when an alarm was closed

### 0.0.6
* (TKnpl) state handling while active alarm and connection check improved, fixed object types

### 0.0.5
* (TKnpl) fixed io-package news issue

### 0.0.4
* (TKnpl) Connection check to api improved, added timestamp of latest alert

### 0.0.3
* (TKnpl) added title, text, address, latitude, longitude, general formatting

### 0.0.2
* (TKnpl) adjusted translation

### 0.0.1
* (TKnpl) initial commit

## License
MIT License

Copyright (c) 2021 TKnpl <dev@t-concepts.de>

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
