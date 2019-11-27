![Logo](admin/hqwidgets.png)
ioBroker.vis-hqWidgets
============

![Number of Installations](http://iobroker.live/badges/vis-hqwidgets-installed.svg) ![Number of Installations](http://iobroker.live/badges/vis-hqwidgets-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.vis-hqwidgets.svg)](https://www.npmjs.com/package/iobroker.vis-hqwidgets)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vis-hqwidgets.svg)](https://www.npmjs.com/package/iobroker.vis-hqwidgets)

[![NPM](https://nodei.co/npm/iobroker.vis-hqwidgets.png?downloads=true)](https://nodei.co/npm/iobroker.vis-hqwidgets/)

hqWidgets - High quality widgets for ioBroker.vis
![Example](img/widgets.png)

For one widget the jQuery.knob plugin (MIT) from Anthony Terrien is used.
http://anthonyterrien.com/knob/ or https://github.com/aterrien/jQuery-Knob 

## Changelog
### 1.1.3 (2019-10-27)
* (bluefox) Preparations for js-controller 2.0. Check undefined and nulls.

### 1.1.2 (2018-06-09)
* (bluefox) Odometer was fixed while rendering in invisible state

### 1.1.1 (2017-10-18)
* (bluefox) Fix interval description for russian

### 1.0.11 (2017-09-18)
* (bluefox) Hide left description
* (Sebastian Rosenberg) added feature to select shutter popup window position.

### 1.0.10 (2017-08-12)
* (bluefox) Fix the window handle update

### 1.0.9 (2017-07-22)
* (bluefox) Small fixes for empty images

### 1.0.8 (2016-11-24)
* (bluefox) Reduce render interval

### 1.0.7 (2016-11-11)
* (bluefox) Allow set of padding for description

### 1.0.6 (2016-10-11)
* (bluefox) Fix circle Knob if negative limits
* (bluefox) Fix first switch by checkbox

### 1.0.5 (2016-09-14)
* (bluefox) show "last action" fixed

### 1.0.4 (2016-09-13)
* (bluefox) fix problem in inner temperature if knob widget set installed
* (Jens Maus) removed all special IE5/6 CSS hacky statements with prepending asterisk (*) characters which are just producing CSS warnings on browsers like Safari.

### 1.0.3 (2016-05-30)
* (bluefox) fix initial value of shutter if inverted

### 1.0.2 (2016-05-30)
* (bluefox) change "last changed" to ms

### 1.0.1 (2016-05-26)
* (bluefox) add odometer widget

### 1.0.0 (2016-04-12)
* (bluefox) fix blinds - control z-index of widgets if popup window opened
* (bluefox) add colorOn for checkbox

### 0.2.5 (2015-12-19)
* (bluefox) fix hqWidgets on/off

### 0.2.4 (2015-12-19)
* (bluefox) fix height of graphic dialog

### 0.2.3 (2015-12-19)
* (bluefox) add green and blue colors to checkbox
* (bluefox) working on lock
* (bluefox) add readOnly option to "on/off"

### 0.2.2 (2015-11-10)
(bluefox) fix checkbox

### 0.2.1 (2015-10-17)
(bluefox) enable description for door and shutter

### 0.2.0 (2015-10-14)
(bluefox) fix problem with temperature if it was as string
(bluefox) make popup window (shutter) with most z-index when showing them

### 0.1.10 (2015-10-12)
* (bluefox) fix door widget

### 0.1.9 (2015-10-05)
* (bluefox) fix update of temperature on widgets

### 0.1.8 (2015-10-03)
* (bluefox) fix On/Off Icon if changed while invisible
* (bluefox) fix error with style in OutTemp

### 0.1.7 (2015-10-02)
* (bluefox) fix "working" icon
* (bluefox) fix on/Off button

### 0.1.6 (2015-09-30)
* (bluefox) draw widgets first when the view is visible

### 0.1.5 (2015-09-26)
* (bluefox) add push-button feature to on/off

### 0.1.4 (2015-09-24)
* (bluefox) add outdoor temperature widget
* (bluefox) auto fill of OIDs
* (bluefox) add colors for texts
* (bluefox) add door widget

### 0.1.3 (2015-09-17)
* (bluefox) try to fix feedback in hqWidgets/Dimmer

### 0.1.2 (2015-09-13)
* (bluefox) add step to dimmer and temperature
* (bluefox) add "is comma" and "digits after comma" to circle
* (bluefox) show waves when ack=true, even if widget itself set the value.

### 0.1.0 (2015-07-09)
- (bluefox) initial checkin

## License
 Copyright (c) 2013-2018 bluefox https://github.com/GermanBluefox
 MIT
