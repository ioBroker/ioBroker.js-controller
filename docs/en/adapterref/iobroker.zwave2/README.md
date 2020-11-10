![Logo](admin/zwave2.svg)

# ioBroker.zwave2

[![node](https://img.shields.io/node/v/iobroker.zwave2.svg)
![npm](https://img.shields.io/npm/v/iobroker.zwave2.svg)](https://www.npmjs.com/package/iobroker.zwave2)
[![changelog](https://img.shields.io/badge/read-Changelog-informational)](CHANGELOG.md)

![Number of Installations](http://iobroker.live/badges/zwave2-installed.svg)
![Number of Installations](http://iobroker.live/badges/zwave2-stable.svg)

![Test and Release](https://github.com/AlCalzone/iobroker.zwave2/workflows/Test%20and%20Release/badge.svg)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/AlCalzone/ioBroker.zwave2.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/AlCalzone/ioBroker.zwave2/context:javascript)

<h2 align="center">Z-Wave for ioBroker. But better.</h3>

Z-Wave 2 is a brand new Z-Wave implementation for ioBroker. It is based on [`zwave-js`](https://github.com/AlCalzone/node-zwave-js), which was written from the ground up for your benefit.

Unless [`ioBroker.zwave`](https://github.com/ioBroker/ioBroker.zwave/) it does not require `OpenZWave`. This means that the installation and updates are fast, and no compilation of static libraries and other complicated steps are necessary.

Furthermore, some devices just don't work in the original adapter, e.g. the Fibaro Roller Shutter 3.

Easy usage in ioBroker was kept in mind during the whole development. For example, some devices reuse configuration parameters to configure many different things. In this adapter, most of them are split into separate states and no complicated math is necessary:
| Config params in ioBroker.zwave2 | vs | Config params in ioBroker.zwave |
| --- | --- | --- |
| ![](docs/de/images/config-params.png) | vs | ![](docs/de/images/config-params-legacy.png) |

---

## Documentation and usage
* [FAQ](docs/en/FAQ.md)
* [Troubleshooting](docs/en/troubleshooting.md) · [bei Problemen](docs/de/bei-problemen.md)

---

## Changelog
[Older changes](CHANGELOG_OLD.md)
<!--
	Placeholder for next versions:
	### __WORK IN PROGRESS__
-->

### 1.7.10 (2020-11-04)
* Improved compatibility with devices that don't follow the `User Code CC` and `Notification CC` specifications correctly (like Zipato Keypad)
* Added the ability to edit binary values (e.g. RFID codes) using hexadecimal strings, e.g. `0xbada55`.

### 1.7.9 (2020-11-01)
* Fixed a crash in the adapter settings when a node's device type is not yet set

### 1.7.8 (2020-10-25)
* Fixed a crash while sending a `Door Lock` command under specific circumstances
* The timespan that a node is assumed to be awake is now prolonged when it acknowledges a command
* Fixed a bug where `Alarm Sensor CC` reports could be assigned to a non-existing node
* Including nodes which can act as controllers is now supported
* For nodes with an `unknown` status, the "remove failed node" button is now enabled
* The loglevel for warnings about insecure communication because of a missing network key has been reduced to warning.

### 1.7.7 (2020-10-21)
* Objects and states are now created for all nodes immediately after the driver is ready
* States are no longer marked as stale (orange) after a node was interviewed for the first time
* Fixed an error that would cause the interview of nodes with `User Code CC` V1 to abort
* Fixed an error that would cause the interview of nodes which support `Central Scene CC` but not `Association Group Information CC` to abort
* For several CCs, the interview now continues without a fresh value if the node does not respond to a non-critical request
* Fixed the secure inclusion process for some devices that would behave strangely when nonces were sent without requesting an acknowledgement
* Fixed an error during logging of a `DoorLockCC::ConfigurationSet` command
* After a complete interview, battery-powered nodes that are temporarily mains-powered (e.g. Multisensor 6 with USB power), are no longer sent into a "go to sleep" loop
* When a node requests multiple nonces in a short timespan, only respond to the most recent request

### 1.7.6 (2020-10-15)
* The roles of states are now determined depending on the value they represent instead of just `"value"`
* Added a new option to configure if user-defined names for states may be overwritten
* The `targetValue` state of `Color Switch CC` no longer has `write` set to `false`

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
