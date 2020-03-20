![Logo](admin/lifx_logo.png)
# ioBroker.lifx

![Number of Installations](http://iobroker.live/badges/lifx-installed.svg) ![Number of Installations](http://iobroker.live/badges/lifx-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.lifx.svg)](https://www.npmjs.com/package/iobroker.lifx)
[![Downloads](https://img.shields.io/npm/dm/iobroker.lifx.svg)](https://www.npmjs.com/package/iobroker.lifx)
[![Build Status](https://travis-ci.org/foxthefox/ioBroker.lifx.svg?branch=master)](https://travis-ci.org/foxthefox/ioBroker.lifx)


[![NPM](https://nodei.co/npm/iobroker.lifx.png?downloads=true)](https://nodei.co/npm/iobroker.lifx/)

Lifx adapter for ioBroker

## Installation:
the official released version
```javascript
npm install iobroker.lifx
```

the actual version from github:
```javascript
npm install https://github.com/foxthefox/ioBroker.lifx/tarball/master --production
```

## Settings/Configuration:
- no settings or configuration required, adapter automatically detects the lamps
### metro widget unreachable status
- small icon for unreachable status in metro-widget is the first object of notification
- object_id[0] is the indicator.unreachable
- instead of presetting "true", "false" shall be written
- the icon should be wifiColorRed.png 
- horizontal offset of 6 should work fine

## Visualization:
- use lifx widgets

## objects
|Object|Value|settable|Description|
|--------|-------|:-:|--------|
|Bulb.state|boolean|x|true/false -> ON/OFF|
|Bulb.colormode|boolean|x|color, white|
|Bulb.temp|value|x|color temperature 2500...9000 K|
|Bulb.hue|value|x|color 0...360|
|Bulb.sat|value|x|saturation 0...100 %|
|Bulb.bright|value|x|brightness 0...100 %|
|Bulb.online|boolean|-|true/false|
|Bulb.vendor|string|-|vendor|
|Bulb.product|string|-|product|
|Bulb.version|string|-|version|
|Bulb.label|string|-|label|
|Bulb.colorLamp|boolean|-|true/false|
|Bulb.infraredLamp|boolean|-|true/false|
|Bulb.multizoneLamp|boolean|-|true/false|

## TODO:
- cyclical getState from lamp, if adjusted outside ioBroker
- getting adjustment of color values with all existing settings (brighness adjust has fixed 80% saturation and keeps the previous hue setting; saturation adjust and hue adjust has fixed 80% brightness)
- transition times
- waveforms
- objects for white lamp

## known issues
??

## Changelog:
### 0.1.1
- logo quadratic
### 0.1.0
- compact mode
### 0.0.5
- adminv3
- noConfig -> no admin page anymore

### 0.0.4
- jqui widget with interactive colored slider

### 0.0.3
- metro widget
- jqui widget

### 0.0.2 
- change to node-lifx
- successful tested with 2 lamps and firmware 2.1

### 0.0.1 
- initial setup with lifx

## License

The MIT License (MIT)

Copyright (c) 2016-2020 foxthefox <foxthefox@wysiwis.net>
