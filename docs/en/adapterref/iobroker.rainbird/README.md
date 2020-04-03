![Logo](admin/rainbird.png)

![Number of Installations](http://iobroker.live/badges/rainbird-installed.svg) [![Downloads](https://img.shields.io/npm/dm/iobroker.rainbird.svg)](https://www.npmjs.com/package/iobroker.rainbird)

[![NPM](https://nodei.co/npm/iobroker.rainbird.png?downloads=true)](https://nodei.co/npm/iobroker.rainbird/)

![Stable](http://iobroker.live/badges/rainbird-stable.svg)
[![NPM version](https://img.shields.io/npm/v/iobroker.rainbird.svg)](https://www.npmjs.com/package/iobroker.rainbird)
[![Build Status](https://travis-ci.org/StrathCole/ioBroker.rainbird.svg?branch=master)](https://travis-ci.org/StrathCole/ioBroker.rainbird)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/StrathCole/iobroker.rainbird/blob/master/LICENSE)

# ioBroker.rainbird

An ioBroker adapter for Rain Bird with LNK WiFi adapter. This project has no affiliation with Rain Bird.

Based on the python library "pyrainbird" from https://github.com/jbarrancos/pyrainbird and completely ported to NodeJS. The adapter makes a direct connection to the device through WiFi connection and is not using the Rain Bird cloud service.


## States

`rainbird.X.device.commands.advanceZone` - When current program is running, advance to the next irrigation zone and stop the current one.  
`rainbird.X.device.commands.runProgram` - Run the specified program manually (1 to X) as previously configured in the device.  
`rainbird.X.device.commands.stopIrrigation` - Immediately stop the irrigation in all zones.  

`rainbird.X.device.irrigation.active` - The irrigation is currently active. If false this can mean that you set the switch on the device to "Stop".  
`rainbird.X.device.irrigation.station` - Number of the zone that is currently irrigated.  

`rainbird.X.device.sensors.rain` - True if a rain sensor is attached and rain is detected.  

`rainbird.X.device.settings.rainDelay` - The current irrigation delay (in days) set for the device.  

`rainbird.X.device.stations.Y.available` - True if zone Y is available in the device.  
`rainbird.X.device.stations.Y.irrigation` - True if zone Y is currently irrigated.  
`rainbird.X.device.stations.Y.runZone` - Manually run irrigation on zone Y for the specified amount of minutes.  
`rainbird.X.device.stations.Y.testZone` - Test zone Y.  


## Changelog

### 0.1.2

-   Fixed adapter stalling on connection timeout

### 0.1.1

-   Smaller fixes

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
