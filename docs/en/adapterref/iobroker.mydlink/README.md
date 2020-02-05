![Logo](admin/mydlink.png)
# ioBroker.mydlink


![Number of Installations](http://iobroker.live/badges/mydlink-installed.svg) ![Number of Installations](http://iobroker.live/badges/mydlink-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.mydlink.svg)](https://www.npmjs.com/package/iobroker.mydlink)
[![Downloads](https://img.shields.io/npm/dm/iobroker.mydlink.svg)](https://www.npmjs.com/package/iobroker.mydlink)
[![Tests](https://travis-ci.org/arteck/ioBroker.mydlink.svg?branch=master)](https://travis-ci.org/arteck/ioBroker.mydlink)

[![NPM](https://nodei.co/npm/iobroker.mydlink.png?downloads=true)](https://nodei.co/npm/iobroker.mydlink/) [![Greenkeeper badge](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.mydlink.svg)](https://greenkeeper.io/)



MyDlink Adapter for ioBroker. 
------------------------------------------------------------------------------

Allows to control power sockets or motion detectors from [D-Link](https://eu.dlink.com/uk/en/for-home/smart-home) from within ioBroker. 

Currently tested devices:

| Model | Type  | Image |
| :---: | :---: | :---: |
| [DSP-W215](https://eu.dlink.com/uk/en/products/dsp-w215-smart-plug) | Socket (socket, temperature, current) | ![Image](admin/DSP_W215.png) | 
| [DCH-S150](https://eu.dlink.com/uk/en/products/dch-s150-motion-sensor) | Motion Detector (last motion detected) | ![Image](admin/DCH_S150.png) |

The adapter needs to poll the devices. So sensor readings and motion detection will be 
delayed by polling interval (can be set in config).

#### Configuration:
* global poll interval - Adapter will poll all devices in that interval, if they do not have a specific interval set. Set to 0 to disable.
* List of devices, each device with following settings:

<table>
<tr><td>Name</td><td>set a name here, must be unique (for mydlink devices)</td></tr>
<tr><td>IP</td><td>fill in IP address here, hostname should also work</td></tr>
<tr><td>PIN</td><td>PIN is printed on a sticker on the device, probably at the bottom</td></tr>
<tr><td>Poll interval</td><td>per device poll interval, leave empty to use global poll interval. <br /> Set 0 to disable polling. <br /><b>Recommendation:</b> Set a fast poll interval for sensors and a longer one for plugs.</td></tr>
<tr><td>enable</td><td>if not enabled, will not be polled or controlled. <br />Devices that are not plugged in can be disabled to avoid error messages in the log.</td></tr>
</table>

The adapter does not interfere with the use of the app.

## Changelog

### 0.0.6
* (Garfonso) prevent removement of custom details in objects.

### 0.0.5
* (Garfonso) fixed config files for release in latest repository.

### 0.0.4
* (Garfonso) polling interval can now be configured on per device basis (if not configured for a device global poll intervall will be used.) Recommendation: Use high global poll interval and a smaller one for motion detectors.
* (Garfonso) added no_motion state for motion detectors, contains number of seconds since last motion.

### 0.0.3
* (Garfonso) use setStateChanged instead of polling state before writing.
* (Garfonso) minor clean ups.

### 0.0.2
* (Garfonso) move to ioborker-community-adapters

### 0.0.1
* (Garfonso) initial release

## License
MIT License

Copyright (c) 2020 Garfonso <garfonso@mobo.info>

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

