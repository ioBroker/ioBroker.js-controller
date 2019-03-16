![Logo](media/vis-history.png)
ioBroker.vis-history
============
[![NPM version](http://img.shields.io/npm/v/iobroker.vis-history.svg)](https://www.npmjs.com/package/iobroker.vis-history)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vis-history.svg)](https://www.npmjs.com/package/iobroker.vis-history)

[![NPM](https://nodei.co/npm/iobroker.vis-history.png?downloads=true)](https://nodei.co/npm/iobroker.vis-history/)


![Screenshot](img/widgets.png)

Widgets, that can work with history data. Of course for that is some of the History Adapters are required: sql, history or influx (or something else).

Sparklines can be shown only for non-binary data, because of aggregation.

For sparklines is used the [jquery plugin](http://omnipotent.net/jquery.sparkline/), that was written by Gareth Watts and released under the New BSD License.

## Changelog

### 0.2.7 (2017-05-29)
- (Apollon77) small fixes on Title (http://forum.iobroker.net/viewtopic.php?f=23&t=3111&start=20#p68971) and getHistory parameters

### 0.2.6 (2017-03-02)
- (bluefox) small fix for empty values

### 0.2.5 (2017-01-13)
- (bluefox) make http links "clickable" in the list

### 0.2.4 (2016-10-09)
- (bluefox) support of new custom schema

### 0.2.3 (2016-09-22)
- (bluefox) fixed JS error

### 0.2.2 (2016-08-22)
- (bluefox) add units and suffix

### 0.2.1 (2016-07-09)
- (bluefox) typo

### 0.2.0 (2016-07-09)
- (bluefox) fix max line settings
- (bluefox) add 'none' time selector

### 0.1.1 (2016-06-13)
- (bluefox) change default style to vis-style-green-gray

### 0.1.0 (2016-06-13)
- (bluefox) initial checkin

## License
 Copyright (c) 2016 bluefox
 BSD-3-Clause
