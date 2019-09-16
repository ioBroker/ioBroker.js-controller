![Logo](admin/hue-extended.png)
# ioBroker.hue-extended
Connect your Philips Hue Lights with ioBroker.

[![Paypal Donation](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=S45U45EHXGQHN&source=url)

![Number of Installations](http://iobroker.live/badges/hue-extended-installed.svg)
![Stable version](http://iobroker.live/badges/hue-extended-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.hue-extended.svg)](https://www.npmjs.com/package/iobroker.hue-extended)
[![Travis CI](https://travis-ci.org/Zefau/ioBroker.hue-extended.svg?branch=master)](https://travis-ci.org/Zefau/ioBroker.hue-extended)
[![Downloads](https://img.shields.io/npm/dm/iobroker.hue-extended.svg)](https://www.npmjs.com/package/iobroker.hue-extended)

[![NPM](https://nodei.co/npm/iobroker.hue-extended.png?downloads=true)](https://nodei.co/npm/iobroker.hue-extended/) 


## Features
- Synchronize Config
- Synchronize Groups
- Synchronize Lights
- Synchronize Resources
- Synchronize Rules
- Synchronize Scenes
- Synchronize Schedules
- Synchronize Sensors 
- Trigger changes on states `on/off`, `bri` (`level`), `hue`, `sat`, `xy`, `ct`, `alert`, `effect` and `transitiontime`
- Additional triggers based on color spaces for `rgb`, `hsv`, `xyz`, `cmyk` and `hex`
- Apply own combination of commands using `commands` trigger
- Control lights of all groups at once using `0-all` group
- Run scene or apply `scene` on light or group


## Changelog

### 0.8.3 (2019-09-13)
- (Zefau) added `lastAction` channel (with states `lastCommand`, `lastResult`, `error`, `timestamp` and `datetime`) to each light and group as well as for all lights / groups in `info` channel
- (Zefau) fixed error retrieving and setting state `xy`
- (Zefau) moved `syncing`, `timestamp`, `datetime` to `info` channel

### 0.8.2 (2019-09-11)
- (Zefau) ~~Node.js v6 compatibility~~ Node.js v6 compatibility not possible due to a package dependency, thus added warning on adapter start.
- (Zefau) fixed error retrieving a new user from Hue Bridge

### 0.8.1 (2019-09-09)
- (Zefau) fixed incorrect Version in ioBroker

### 0.8.0 (2019-09-08)
- (Zefau) reworked triggering scenes
- (Zefau) fixed missing level state on non-Philips lights
- (Zefau) changed data retrieval from Hue Bridge to reduce parallel connection attemps
- (Zefau) added connection retry when Hue Bridge returns error

### 0.7.0 (2019-08-27)
- (Zefau) added `0-all`-group to apply action on all groups at once
- (Zefau) added `commands` action to apply own commands combination at once
- (Zefau) lowered minimum refresh time

### 0.6.2 (2019-08-18)
- (Zefau) fixed error when triggering scene (`Error setting /lights/undefined/state: resource, /lights/undefined/state, not available`)
- (Zefau) fixed display error in adapter configuration interface

### 0.6.1 (2019-08-16)
- (Zefau) Corrected German translations
- (Zefau) Completed README

### 0.6.0 (2019-08-15)
- (Zefau) implemented queue for any applied actions
- (Zefau) implemented user creation in interface configuration (admin panel)
- (Zefau) added additional actions for color spaces `rgb`, `hsv`, `cmyk`, `xyz` and `hex`

### 0.5.0 (2019-08-11)
- (Zefau) added support for scenes (reorganized states and added trigger)
- (Zefau) fixed action `xy`
- (Zefau) reorganized states within tree `state` into `action` in case they are executable

### 0.4.0 (2019-08-10)
- (Zefau) fixed applying action on group

### 0.4.0 (2019-08-09)
- (Zefau) renamed adapter to hue-extended (formerly hue-lights)
- (Zefau) changed roles of some states

### 0.3.2 (2019-08-07)
- (Zefau) refactored data retrieval and state creation

### 0.3.1 (2019-08-03)
- (Zefau) when turning on a device, set level / bri to 100 if it was set to 0

### 0.3.0 (2019-08-03)

__REMARK: If you are coming from an earlier version, please delete all your hue-extended states before running this release!__

- (Zefau) added error message when incorrect bridge credentials are provided ([see issue description](https://forum.iobroker.net/post/287505))
- (Zefau) when turning off a device, set level / bri to 0 ([see issue description](https://forum.iobroker.net/post/287566))
- (Zefau) fixed error that prevented `groups` being set / changed
- (Zefau) added specific role information to states under `lights`, `groups` and `sensors` ([see issue description](https://forum.iobroker.net/post/287566))
- (Zefau) fixed wrong value for temperature sensors ([see issue description](https://forum.iobroker.net/post/287564))

### 0.2.0 (2019-07-24)
- (Zefau) added support to change states _level_, _xy_, _effect_, _alert_, and _transitiontime_

### 0.1.0 (2019-07-21)
- (Zefau) retrieve lights, groups, resourcelinks, rules, scenes, schedules, sensors and config from Hue Bridge
- (Zefau) change states (e.g. on/off, brightness, saturation)


## License
The MIT License (MIT)

Copyright (c) 2019 Zefau <zefau@mailbox.org>

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
