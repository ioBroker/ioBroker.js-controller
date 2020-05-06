![milight-smart-light Logo](admin/lib/images/milight-smart-light-md.png)

# ioBroker.milight-smart-light

[![NPM version](http://img.shields.io/npm/v/iobroker.milight-smart-light.svg)](https://www.npmjs.com/package/milight-smart-light)
[![Downloads](https://img.shields.io/npm/dm/iobroker.milight-smart-light.svg)](https://www.npmjs.com/package/iobroker.milight-smart-light)
[![Tests](http://img.shields.io/travis/Steiger04/ioBroker.milight-smart-light/master.svg)](https://travis-ci.org/Steiger04/ioBroker.milight-smart-light)
[![stable](http://iobroker.live/badges/milight-smart-light-stable.svg)](http://iobroker.live/badges/milight-smart-light-stable.svg)
[![installed](http://iobroker.live/badges/milight-smart-light-installed.svg)](http://iobroker.live/badges/milight-smart-light-installed.svg)

[![NPM](https://nodei.co/npm/iobroker.milight-smart-light.png?downloads=true)](https://nodei.co/npm/milight-smart-light/)

This adapter for ioBroker controls Milight LED bulbs and LED strips and
based on the node module from mwittig.

mwittig / [node-milight-promise](https://github.com/mwittig/node-milight-promise)

With adapter you can use both: **v6 Bridge** and **Legacy Bridge**.

**v6 Bridge:**

- bridge (only iBox1)
- white
- rgb(w)
- fullColor
- fullColor8Zone


**Legacy Bridge:**
- white
- rgb(w)

### Versions
- **Node.js**: use v. 8.0.0 or higher
- **iobroker.admin**: use v. 3.5.10 or higher


## Changelog
### 0.4.1 (2020-05-04)
- (steiger04): Some small bug fixes

### 0.4.0 (2020-05-04)
- (steiger04): Some small bug fixes

### 0.3.0 (2020-04-30)
- (steiger04): Optimizations, bug fixes and new app

### 0.2.7 (2019-04-15)
- (steiger04): Additions to the Stable Repository

### 0.2.6 (2019-04-11)
- (steiger04): Updated the CI test and some MaterialiseCSS optimizations

### 0.2.5 (2019-03-07)
- (steiger04): Core Files/Testing Update and introduce adapter-core

### 0.2.4 (2019-03-03)
- (steiger04): Bug for addDeviceButton fixed in Admin

### 0.2.3 (2019-03-02)
- (steiger04): Fixed a bug in configuration load and save

### 0.2.2 (2019-02-28)
- (steiger04): Optimization of the App

### 0.2.1 (2019-02-13)
- (steiger04): Integration of  node-milight-promise v0.3.2

### 0.2.0 (2019-01-16)
- (steiger04): Adaptation to Admin3, materialzeCSS, general revision, new app

### 0.1.9 (2018-03-13)
- (steiger04): Adaption for js-controller > v.1.2.5

### 0.1.8 (2018-01-21)
- (steiger04): some optimizations for Alexa

### 0.1.7 (2018-01-12)
- (steiger04): optimized: create states

### 0.1.6 (2018-01-08)
- (steiger04): Bug fix: rgbToHsv(...)

### 0.1.5 (2018-01-05)
- (steiger04): Info about required fields in tab Zones inserted

### 0.1.4 (2017-11-05)
- (steiger04): Set configuration option fullSync to false in milight instance

### 0.1.3 (2017-11-04)
- (steiger04): Added start image

### 0.1.2 (2017-11-04)
- (steiger04): Bug fix: socketio

### 0.1.1 (2017-11-02)
- (steiger04): Bug fix: Fixed EffectMode for Legacy

### 0.1.0 (2017-11-01)
- (steiger04): Added Small FE for milight-smart-light

### 0.0.6 (2017-10-18)
- (steiger04): Bug fix: All four zones can be created for the instance (via iobroker.admin) and remain after a reload. There are no more problems with umlauts.
- (steiger04): The types "RGB + White" and "RGB" were combined in the type "RGB (W)"

### 0.0.5 (2017-08-02)
- (bluefox): Added russian translation

### 0.0.4 (2017-07-28)
- (steiger04): Added basis-testing


### 0.0.3 (2017-07-24)
- (steiger04): on- /off- /onoff-states optimized for vis widgets

### 0.0.2 (2017-07-23)
- (steiger04): Bug fix: added parameter in effectMode(...)

### 0.0.1 (2017-07-16)
- (steiger04): Initial Version

## License

The MIT License (MIT)

Copyright (c) 2017-2020 Steiger04 <steiger04@posteo.de>
