![milight-smart-light Logo](admin/milight-smart-light.png)

# ioBroker.milight-smart-light

[![NPM version](http://img.shields.io/npm/v/iobroker.milight-smart-light.svg)](https://www.npmjs.com/package/milight-smart-light)
[![Downloads](https://img.shields.io/npm/dm/iobroker.milight-smart-light.svg)](https://www.npmjs.com/package/iobroker.milight-smart-light)
[![stable](http://iobroker.live/badges/milight-smart-light-stable.svg)](http://iobroker.live/badges/milight-smart-light-stable.svg)
[![installed](http://iobroker.live/badges/milight-smart-light-installed.svg)](http://iobroker.live/badges/milight-smart-light-installed.svg)
[![Dependency Status](https://img.shields.io/david/steiger04/iobroker.milight-smart-light.svg)](https://david-dm.org/steiger04/iobroker.milight-smart-light)
[![Known Vulnerabilities](https://snyk.io/test/github/steiger04/ioBroker.milight-smart-light/badge.svg)](https://snyk.io/test/github/steiger04/ioBroker.milight-smart-light)

![Test and Release](https://github.com/steiger04/ioBroker.milight-smart-light/workflows/Test%20and%20Release/badge.svg)

[![NPM](https://nodei.co/npm/iobroker.milight-smart-light.png?downloads=true)](https://nodei.co/npm/iobroker.milight-smart-light/)

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
### 1.0.1 (2020-11-21)
- (steiger04) Added admin-UI based on Vue and Quasar
### 0.6.0 (2020-05-23)
- (steiger04): Added effectBrightness, effectOn, effectOff, effectOnOff for iBox1 and iBox2

### 0.5.0 (2020-05-21)
- (steiger04): Bug fix in rgb(w)

## License

The MIT License (MIT)

Copyright (c) 2017-2020 Steiger04 <steiger04@posteo.de>
