![Logo](admin/tahoma.png)

![Number of Installations](http://iobroker.live/badges/tahoma-installed.svg) [![Downloads](https://img.shields.io/npm/dm/iobroker.tahoma.svg)](https://www.npmjs.com/package/iobroker.tahoma)

[![NPM](https://nodei.co/npm/iobroker.tahoma.png?downloads=true)](https://nodei.co/npm/iobroker.tahoma/)

![Stable](http://iobroker.live/badges/tahoma-stable.svg)
[![NPM version](https://img.shields.io/npm/v/iobroker.tahoma.svg)](https://www.npmjs.com/package/iobroker.tahoma)
[![Build Status](https://travis-ci.org/StrathCole/ioBroker.tahoma.svg?branch=master)](https://travis-ci.org/StrathCole/ioBroker.tahoma)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/StrathCole/iobroker.tahoma/blob/master/LICENSE)

# NOT MAINTAINED CURRENTLY !!!


# ioBroker.tahoma

An ioBroker adapter for Somfy Tahoma. This project has no affiliation with Somfy. Initially based on the script taken from https://forum.iobroker.net/post/336001.

The adapter connects to the Tahomalink end user API and controls the devices set up through Tahoma Box (and most likely Connexoon).  
The adapter is not feature-complete, yet, but it should support most actions for controlling blinds and shutters etc.

Follwing some of the states created by the adapter.

## tahoma.X.location

The state in this tree contain the personal information of the user like city, street address and longitude/latitude.

## tahoma.X.devices.*.deviceURL

This state contains the device URL that is used by Tahoma to identify the device.

## tahoma.X.devices.*.commands

These states contain button commands for controlling the devices. Most devices will support commands like `close` and `open` but also some more.  
Some of the commands have a `:slow` at the end if supported by the device. Using those enables low speed or so-called silent mode.

## tahoma.X.devices.*.states

These states contain current status of the devices as follows. All settings marked with `[**]` are editable to controll device's behaviour / send commands.  
Some of the states have a `:slow` at the end if supported by the device. Setting those enables low speed or so-called silent mode.

`[**] tahoma.X.devices.*.states.core:DeploymentState` - Provides information about and controls the state of current deployment. 100 means fully deployed, 0 is undeployed. Not all devices have this value, some have `ClosureState` instead.  
`[**] tahoma.X.devices.*.states.core:TargetDeploymentState` - See `tahoma.X.devices.*.states.core:DeploymentState`  
`[**] tahoma.X.devices.*.states.coreClosureState` - Provides information about and controls the state of current closure. 100 means fully closed, 0 is open. Not all devices have this value, some have `DeploymentState` instead.  
`[**] tahoma.X.devices.*.states.core:TargetClosureState` - See `tahoma.X.devices.*.states.core:ClosureState`  
`[**] tahoma.X.devices.*.states.core:OrientationState` - Provides information about and ocntrols the orientation (e. g. for shutters) of slats. Not all devices offer this value.  
`[**] tahoma.X.devices.*.states.core:TargetOrientationState` - See `tahoma.X.devices.*.states.core:OrientationState`  
`tahoma.X.devices.*.states.core:NameState` - Contains the current name of the device.  
`tahoma.X.devices.*.states.core:OpenClosedState` - Contains `closed` if the device is 100% closed or 0% deployed and `open` otherwise.  
`tahoma.X.devices.*.states.core:PriorityLockTimerState` - If a sensor has locked the device this is stated here, e. g. a wind sensor blocking an awning.  
`tahoma.X.devices.*.states.core:RSSILevelState` - The current signal quality of the device.  
`tahoma.X.devices.*.states.core:StatusState` - `available` if the device is currently available.  
`tahoma.X.devices.*.states.io:PriorityLockLevelState` - See `tahoma.X.devices.*.states.core:PriorityLockTimerState`  
`tahoma.X.devices.*.states.io:PriorityLockOriginatorState` - See `tahoma.X.devices.*.states.core:PriorityLockTimerState`  
`tahoma.X.devices.*.states.moving` - States if the device is currently moving. `0 = stopped`, `1 = up/undeploy`, `2 = down/deploy`, `3 = unknown direction`  


## Changelog

### 0.3.3

-  Removed credentials from log on error and debug

### 0.3.2

-  Fixed silent modes (low speed) for newer Somfy devices
-  Fixed problem with wrong reference to `this`

### 0.3.1

-   Fixed adapter crash on empty response object after request error
-   Fixed problems with slow/silent mode for closure

### 0.3.0

-   Added possibility for low speed open and close on supported devices
-   Fixed commands not stopping on next command for device
-   Smaller fixes

### 0.2.6

-   Added queue for device commands not already covered by update to 0.2.1

### 0.2.5

-   Added README for states

### 0.2.4

-   Switched moving state values 1 / 2 for DeploymentState devices

### 0.2.3

-   Fixed direction (moving state) for deployment devices

### 0.2.2

-   Fixed problem with DeploymentState treated as ClosureState on setting values

### 0.2.1

-   Fixed problems with too many simultanous commands/devices

### 0.2.0

-   Added deployment actions
-   Added new state for moving direction
-   Changed command buttons to boolean type

### 0.1.2

-   Retry device command on error 400 (payload) once

### 0.1.1

-   No changes

### 0.1.0

-   First running Version

## License

The MIT License (MIT)

Copyright (c) 2020 Marius Burkard

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


## Donate
[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SFLJ8HCW9T698&source=url)
