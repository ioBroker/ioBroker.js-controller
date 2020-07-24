![Logo](admin/hue-extended.png)
# ioBroker.hue-extended
Connect your Philips Hue and / or deCONZ devices with ioBroker 

[![Paypal Donation](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)](https://paypal.me/chvoelkel)

![Number of Installations](http://iobroker.live/badges/hue-extended-installed.svg)
![Stable Version](http://iobroker.live/badges/hue-extended-stable.svg)
[![NPM Version](http://img.shields.io/npm/v/iobroker.hue-extended.svg)](https://www.npmjs.com/package/iobroker.hue-extended)
[![Commits since last release](https://img.shields.io/github/commits-since/Zefau/ioBroker.hue-extended/latest.svg)](https://github.com/Zefau/ioBroker.hue-extended/releases/latest)
[![Travis CI](https://travis-ci.com/Zefau/ioBroker.hue-extended.svg?branch=master)](https://travis-ci.com/Zefau/ioBroker.hue-extended)
[![Downloads](https://img.shields.io/npm/dm/iobroker.hue-extended.svg)](https://www.npmjs.com/package/iobroker.hue-extended)

[![NPM](https://nodei.co/npm/iobroker.hue-extended.png?downloads=true)](https://nodei.co/npm/iobroker.hue-extended/) 


## Features
- Supports both Philips Hue and deCONZ devices
- Synchronize Lights
- Synchronize Groups
- Synchronize Scenes (including GroupScenes, LightScenes and Scenes from [HueLabs](https://labs.meethue.com/))
- Synchronize Sensors 
- Synchronize Schedules
- Synchronize Config
- Synchronize Resources
- Synchronize Rules
- Trigger changes on states `on/off`, `brightness` (`level`), `hue`, `saturation`, `xy`, `colorTemperature`, `alert`, `effect` and `transitiontime`
- Additional triggers based on color spaces for `rgb`, `hsv` and `hex`
- Apply own combination of commands using `_commands` trigger
- Control lights of all groups at once using `0-all` group
- Run scene or apply `_scene` on light or group


## Changelog

### 2.0.0 (2020-07-14)
- (Zefau) Support for [deCONZ REST API](https://dresden-elektronik.github.io/deconz-rest-doc/) (meaning support for Conbee / Conbee II stick)

### 1.3.8 (2020-07-05)
- (Zefau) fixed long-time polling for connection retry after connection fails serval times on short-time polling (see [#58](https://github.com/Zefau/ioBroker.hue-extended/issues/58))

### 1.3.7 (2020-07-01)
- (Zefau) added additional verification checks of the response received from the Hue Bridge (see [#45](https://github.com/Zefau/ioBroker.hue-extended/issues/45))
- (Zefau) fixed long-time polling for connection retry after connection fails serval times on short-time polling (see [#58](https://github.com/Zefau/ioBroker.hue-extended/issues/58))

### 1.3.6 (2020-05-31)
- (Zefau) added long-time polling for connection retry after connection fails serval times on short-time polling (see [#58](https://github.com/Zefau/ioBroker.hue-extended/issues/58))

### 1.3.5 (2020-05-23)
- (Zefau) added action `onOffAllLights` for groups to reflect state of ALL lights and turn on/off all lights at once (respectively, the `on` state for groups reflects the state of `any_on`).

### 1.3.2 (2020-04-01)
- (Zefau) fixed `on` state being disappeared

### 1.3.1 (2020-03-24)
- (Zefau) added check for http status code to the response received from the Hue Bridge (see [#45](https://github.com/Zefau/ioBroker.hue-extended/issues/45))
- (Zefau) second try changing state `on` of a group to match state `any_on` (see [#19](https://github.com/Zefau/ioBroker.hue-extended/issues/19))

### 1.3.0 (2020-03-04)
- (Zefau) added option to only set devices in a group which are already turned on (thus devices which are off are not set) (see [#19](https://github.com/Zefau/ioBroker.hue-extended/issues/19))
- (Zefau) added option to set `brightness` / `level` to 0 when device is not reachable (see [#38](https://github.com/Zefau/ioBroker.hue-extended/issues/38))
- (Zefau) change state `on` of a group to match state `any_on` (see [#19](https://github.com/Zefau/ioBroker.hue-extended/issues/19))

### 1.2.3 (2020-02-21)
- (Zefau) added `Signify` (formerly Philips Lighting) as official manufacturer
- (Zefau) updated dependencies

### 1.2.2 (2020-02-04)
- ~(Zefau) fixed wrong group state (see [#19](https://github.com/Zefau/ioBroker.hue-extended/issues/19))~

### 1.2.1 (2020-02-03)
- (Zefau) fixed failing secure connection when selecting default certificates

### 1.2.0 (2019-11-23)
- (Zefau) added option to change `transitiontime` on scenes (see [#24](https://github.com/Zefau/ioBroker.hue-extended/issues/24))

### 1.1.7 (2019-11-23)
- (Zefau) fixed failing retrieval of new user / token from admin panel (see [#20](https://github.com/Zefau/ioBroker.hue-extended/issues/20))

### 1.1.7 (2019-11-23)
- (Zefau) fixed incorrect behaviour of garbage collector (again)

### 1.1.6 (2019-11-07)
- (Zefau) fixed `effect` and `alert` not being applied correctly

### 1.1.5 (2019-11-05)
- (Zefau) added option for conversion of `colorTemperature` to `xy` for non-Philips lights (see [#9](https://github.com/Zefau/ioBroker.hue-extended/issues/9))
- (Zefau) fixed conversion of `hue` to `xy` for groups consisting of either only Philips lights, mixed lights or only non-Philips lights (see [#11](https://github.com/Zefau/ioBroker.hue-extended/issues/11))
- (Zefau) fixed conversion of `hue` to `xy` to only convert if `xy` is actually supported by the light

### 1.1.3 / 1.1.4 (2019-10-31)
- (Zefau) added option for secure connection via SSL/TLS
- (Zefau) fixed `scenes` not being applied correctly

### 1.1.2 (2019-10-29)
- (Zefau) added option to (not) synchronise duplicated scenes
- (Zefau) added reworked garbage collector (deletion of old states)
- (Zefau) fixed `transitiontime` not being applied correctly (see [#8](https://github.com/Zefau/ioBroker.hue-extended/issues/8))

### 1.1.1 (2019-10-28)
- (Zefau) removed garbage collector (deletion of old states) due to incorrect behaviour

### 1.1.0 (2019-10-27)
- (Zefau) add full support for Hue Labs scenes
- (Zefau) add retry if bridge returns error `socket hang up`
- (Zefau) add retry if device is not reachable

### 1.0.2 (2019-10-20)
- (Zefau) added scenes from Hue Labs

### 1.0.1 (2019-10-20)
- (Zefau) fixed incorrect omitting GroupScenes

### 1.0.0 (2019-10-20)
- (Zefau) fixed issue setting devices with `bri` / `brightness` (e.g. plugs)

### 1.0.0-rc.1 (2019-10-13)
- (Zefau) __BREAKING CHANGE__ changed certain objects due to standardization (see https://forum.iobroker.net/post/298019)
	- changed `bri` to `brightness`*
	- changed `sat` to `saturation`*
	- removed `hue_degrees`
	- changed `hue` (changed value range from 0-65535 (native Hue API) to 0-360°C)
	- changed `ct` to `colorTemperature`* (changed value range from 153-500 (native Hue API) to 2000-6500K)
	- changed `_hex` to `hex`
	- changed `_hsv` to `hsv`
	- changed `_rgb` to `rgb`
	- removed `_cmyk`*
	- removed `_xyz`*

- fixed incorrect conversion between color spaces (`rgb`, `hex`, etc.)

_Note: If you are using the state `_commands` **renaming is not necessary** for the states `ct` (adapting the value range is required), `bri` or `sat`._

### 0.9.0 (2019-10-13)
- (Zefau) __BREAKING CHANGE__: changed grouping of scenes and added option to choose how objects are mapping (either `scenes.<group>.<scene>.objects` or `scenes.<scene>.<group>.objects`)
- (Zefau) retrieving group for all-lights directly from Hue Bridge API (instead of assembling through states)
- (Zefau) added option to delete outdated devices (gargabe collector)


## License
The MIT License (MIT)

Copyright (c) 2019-2020 Zefau <zefau@mailbox.org>

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
