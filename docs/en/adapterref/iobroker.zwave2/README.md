![Logo](admin/zwave2.svg)

# ioBroker.zwave2

[![NPM version](http://img.shields.io/npm/v/iobroker.zwave2.svg)](https://www.npmjs.com/package/iobroker.zwave2)
[![Downloads](https://img.shields.io/npm/dm/iobroker.zwave2.svg)](https://www.npmjs.com/package/iobroker.zwave2)
[![Dependency Status](https://img.shields.io/david/AlCalzone/iobroker.zwave2.svg)](https://david-dm.org/AlCalzone/iobroker.zwave2)
[![Known Vulnerabilities](https://snyk.io/test/github/AlCalzone/ioBroker.zwave2/badge.svg)](https://snyk.io/test/github/AlCalzone/ioBroker.zwave2)

[![NPM](https://nodei.co/npm/iobroker.zwave2.png?downloads=true)](https://nodei.co/npm/iobroker.zwave2/)

**Tests:**: [![Travis-CI](http://img.shields.io/travis/AlCalzone/ioBroker.zwave2/master.svg)](https://travis-ci.org/AlCalzone/ioBroker.zwave2)

## zwave2 adapter for ioBroker

Alternative Z-Wave implementation

## Changelog
<!-- 
	Placeholder for next versions:
	### __WORK IN PROGRESS__
-->

### 0.11.5 (2020-03-16)
Fixed a bug that caused the interview process to be stuck on the `Fibaro CC`

### 0.11.4 (2020-03-15)
Fixed a crash that happened when saving the network state including a `Manufacturer Proprietary CC` to cache

### 0.11.3 (2020-03-11)
Fixed a crash that happens when controlling blinds using the `Fibaro Venetian Blind CC`

### 0.11.2 (2020-03-09)
Updated `zwave-js` to v2.15.3. This includes the following fixes:
* Fixed an issue where the firmware version of nodes would not be read correctly
* Fixed an issue that caused the interview procedure for the `Manufacturer Proprietary CC` to be skipped

### 0.11.1 (2020-03-07)
Updated `zwave-js` to v2.15.2. This includes the following improvements and fixes:
* Shortened the interview procedure for some multichannel devices
* Updated `ZHC5002` configuration for firmware versions >= 2.02
* The clock of devices supporting `Clock CC` can now be automatically kept in sync with the controller
* Completed support for the `Fibaro Venetian Blind CC`
* Added support for older devices supporting `Multi Instance CC`
* The name and status of the controller is now correctly shown in the objects list
* Values for the root endpoint are now hidden if a corresponding values exists on at least one endpoint

### 0.10.0 (2020-02-13)
* Updated `zwave-js` to v2.13.3 to improve support for older `Multi Channel` devices
* Added an *actions* dialog to the device overview, which allows performing node-specific actions. The first available action is removing failed nodes.
* Added a `ready` state for nodes which can be used in scripts to check if the node is ready to accept commands
* Value that are set to `undefined` are now converted to `null` before being passed to ioBroker. This avoids a bug in the javascript adapter where triggers would be called with wrong state values.

### 0.9.6 (2020-02-10)
Updated `zwave-js` to v2.13.2. This includes the following fixes:
* Improved support for older devices with multiple endpoints
* The *HeatIt Z-Push Button 8* should now correctly be detected
* Potential fix for weird behavior of Start Level Change commands in some devices.

### 0.9.5 (2020-02-07)
Updated `zwave-js` to v2.13.0. This includes the following changes:
* Improved support for some notifications types
* Added support for the `Clock CC`.
* Fixed a bug where unsolicited commands could wrongly be interpreted as a response to the current request

### 0.9.4 (2020-02-02)
* Small performance improvements
* Fixed an error that could happen when a state was changed before the driver is ready
* Updated `zwave-js` to v2.12.3. This includes the following changes:
	* The interview sequence for `Thermostat CC` V1/V2 should no longer get stuck
	* Improved handling of nodes that don't respond to a request
	* Minor stability improvements and bugfixes

### 0.9.3 (2020-01-26)
* Updated `zwave-js` to v2.12.2. This should fix issues with older Thermostats.

### 0.9.2 (2020-01-25)
Updated `zwave-js` to v2.12.1. This includes the following changes:
* When a node is removed from the network, all associations to it are also removed
* The interview procedure is now canceled and retried when an error occurs instead of silently failing all futher steps
* Improvents to the network heal process were made
* Several stability improvements regarding the interview procedure and handling of sleeping nodes

### 0.9.1 (2020-01-21)
* The progress report for network healing now correctly distinguishes between not yet healed nodes and nodes that failed to heal
* A potential source of stalled communication because of a missing timeout was eliminated

### 0.9.0 (2020-01-21)
Updated `zwave-js` to v2.11.0. This includes the following changes:
* Improved `Multilevel Switch` support for some devices that report the immediate state after a `targetValue` change but not the final values
* Fixed two issues where the communication with nodes (especially during the interview) could get stuck

### 0.8.2 (2020-01-18)
Updated `zwave-js` to v2.10.0. This includes the following changes:
* Locally reset devices are now treated like failing nodes and automatically removed from the controller
* The Notification status is now also queried on wakeup
* The status of non-reporting listening nodes is now regularly queried
* The controller is now correctly treated as an awake node when prioritizing messages


### 0.8.1 (2020-01-07)
* Brand new icon!
* Updated `zwave-js` to v2.9.1. This includes the following fixes:
	* Notification CC Reports that are received as a response during the interview are now correctly handled
	* Status changes for nodes are now handled better
	* The scenes of the Scene Activation CC are now automatically reset after the duration has elapsed.

### 0.8.0 (2020-01-04)
* The cache file is now saved in `iobroker-data`, so it doesn't get lost between updates
* Added a button on the device overview tab to clear the cache

### 0.7.2 (2020-01-04)
* Fixed an issue where indicators with `boolean` values could not be written to

### 0.7.1 (2020-01-03)
Updated `zwave-js` to v2.7.0. This includes the following changes:
* The driver is no longer reset when unexpected data is received. Instead the invalid bytes are skipped.
* `Basic CC` reports no longer create a value when they are mapped to another CC
* `IndicatorCC`: Binary indicators now use `boolean` values
* `IndicatorCC`: V1 indicators (unspecified) are now ignored if an endpoint is known to have V2 indicators

### 0.7.0 (2020-01-02)
* Added a config option to write debug logfiles
* Updated `zwave-js` to v2.6.0 to add support for `Scene Activation CC`

### 0.6.4 (2020-01-01)
* Bugfixes

### 0.6.3 (2019-12-30)
* Updated `zwave-js` to v2.5.1. This includes the following changes:
	* Fixed issues with the `Meter CC` and `Indicator CC`
	* Fixed an issue where the information about device endpoints was not correctly saved and restored
	* Several configuration parameters with duplicate labels were renamed
* Node objects and states are now synchronized when the node is ready (rather than waiting for the interview to be completed)
* When `udevadm` is not installed on a unix system, the adapter no longer crashes when opening the configuration UI
* If a node name was manually changed, that change is now preserved
* The debug log is no longer filled with "state changed" logs
* Updated some dependencies

### 0.6.2 (2019-12-22)
* When nodes are removed, the channel objects are now also removed
* `BasicCC` commands from some devices are now mapped to more specific CCs
* Fixed the interview procedure for `IndicatorCC`
* Fixed some causes for crashs

### 0.6.1 (2019-12-18)
* Enabled scrolling in the device list

### 0.6.0 (2019-12-17)
* Improved handling of sleeping nodes
* New interactive network healing process in the configuration UI

### 0.5.2 (2019-12-14)
* Fixed installation issues with `alcalzone-shared`

### 0.5.1 (2019-12-13)
* A new settings page has been added with a device overview and buttons to add and remove nodes from the network
* Minor bugfixes

### 0.4.0 (2019-12-11)
* The network map is now drawn correctly when there are only unconnected nodes
* Nodes and command classes are now represented with device and channel objects
* Updated `zwave-js` to v2.2.0. This includes the following changes:
	* Less errors are logged when opening the serial port fails
	* Accessing a node's or endpoint's `commandClasses` property with `Symbol`s no longer causes a crash. *(This should not be an issue in ioBroker)*
	* Revised querying logic for devices without Z-Wave+ or Lifeline associations
	* Added support for `Indicator CC`

### 0.3.4 (2019-12-07)
* Non-critical errors from `zwave-js` are now logged instead of crashing the adapter
* Fixed a crash that happens when the object for a state is missing
* When the Z-Wave driver fails to start, an error is now logged instead of crashing the adapter
* The adapter settings are no longer polluted with the `serialports` list from the frontend

### 0.3.3 (2019-12-01)
* Updated `zwave-js` to v2.1.0. This includes the following changes:
	* Support for the `Meter CC`
	* Support for unsigned configuration parameters

### 0.3.2 (2019-11-28)
* Fixed a crash when property(Key) names contain weird punctuation

### 0.3.1
* Fixed a crash from v0.3.0

### 0.3.0
* Updated `zwave-js` to v2.0.0. For the full list of changes, see [here](https://github.com/AlCalzone/node-zwave-js/blob/master/CHANGELOG.md#200-2019-11-26). Notable improvements include:
	* Added configuration files for over 1000 devices. This improves support for some older devices and greatly improves the `Configuration CC`.
	* `Basic` CC is now hidden if a node support other Actuator CCs
	* Fixed `Binary Sensor` support
* Improved generation of state names for complex property names

### 0.2.1
* The network map now correctly displays the nodes' IDs

### 0.2.0
* Update `zwave-js` from v1.5.0 to v1.7.0. For the full list of changes, see [here](https://github.com/AlCalzone/node-zwave-js/blob/master/CHANGELOG.md#170-2019-11-03). Notable improvements include:
	* Complete `Multi Channel` support
	* Improved `Multilevel Switch` support
* improve value/metadata logging and change loglevel to debug
* use unit from value metadata
* use translated property keys to name states

### 0.1.3
* Update `zwave-js` dependency. Notable improvements include:
	* Support for `Time` and `Time Parameters` CCs. This automatically sets the correct time on supporting nodes.
	* Support for `Battery` CC v2
	* Cleanup of CC values
* Update misc. dependencies

### 0.1.2
* Several bugfixes and working admin menu

### 0.0.1
* initial release

## License
MIT License

Copyright (c) 2019-2020 AlCalzone

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
