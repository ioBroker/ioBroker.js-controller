![Logo](admin/hyperion_ng.png)
# ioBroker.hyperion_ng

[![NPM version](http://img.shields.io/npm/v/iobroker.hyperion_ng.svg)](https://www.npmjs.com/package/iobroker.hyperion_ng)
[![Downloads](https://img.shields.io/npm/dm/iobroker.hyperion_ng.svg)](https://www.npmjs.com/package/iobroker.hyperion_ng)
![Number of Installations (latest)](http://iobroker.live/badges/hyperion_ng-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/hyperion_ng-stable.svg)
[![Dependency Status](https://img.shields.io/david/felixganzer/ioBroker.hyperion_ng.svg)](https://david-dm.org/felixganzer/ioBroker.hyperion_ng)
[![Known Vulnerabilities](https://snyk.io/test/github/felixganzer/ioBroker.hyperion_ng/badge.svg)](https://snyk.io/test/github/felixganzer/ioBroker.hyperion_ng)

[![NPM](https://nodei.co/npm/iobroker.hyperion_ng.png?downloads=true)](https://nodei.co/npm/iobroker.hyperion_ng/)

**Tests:** ![Test and Release](https://github.com/felixganzer/ioBroker.hyperion_ng/workflows/Test%20and%20Release/badge.svg)

## hyperion_ng adapter for ioBroker

With this adapter you can control your HyperionNG devices

https://hyperion-project.org/

## Manual

### General

The adapter will create for every hyperion hardware instance a folder with the instance number. Inside of these folder the actual adjustments, all components and all active priorities.

Additionally a general folder will be created which includes control, to send commands to hyperion, all possible effects and system informations about hyperion.

### control components and deactivate hyperion instance

You can control the components inside of the instance.components folder to set the boolean. After setting the parameter, all components parameter of the controlled instance and every following instances will be updated

Additionally you can set the instance.running parameter to activate and deactivate the whole instance

### control adjustments

you can control the adjustments inside of the instance.components folder to set the parameter. After setting the parameter, all adjustments of the controlled instance and every following instances will be updated

### set effects

To set an effect you have to set an instance number under general.control.instance. After that you can enter the correct name of an exisitng effect under general.control.setEffect. After setting the effect the priorities of the used instance and every following instances will be updated

Over general.control.durationEffectColor you can set a duration in seconds. You have to set these value before you set the effect. The standard value 0. This will set the effect time to infinity.

### set colors

To set a color you have to set an instance number under general.control.instance. After that you can enter a RGB value under general.control.setColorRGB. After setting the color the priorities of the used instance and every following instances will be updated

Over general.control.durationEffectColor you can set a duration in seconds. You have to set these value before you set the color. The standard value 0. This will set the effect time to infinity.

An other possibility to set the color is over HSL. For these it exist 3 datapoints at general.control.setColorHSL. If one of these datapoints will be changed, the color will be updated.

### set Grabber Visible

you can set the internal or USB video Grabber as the visible priority if you set general.control.setinternalGrabberVisible or setUSBGrabberVisible to true. Before you have to set the instance to control under general.control.instance. If you changed the standard priorities at hyperion you have to change the values under the adapter config page to have the same values.

### clear effects and colors

To clear a priority you have to set an instance number under general.control.instance. After that you can set the parameter general.control.clearAll or general.control.clearVisible to true to clear priorities. After success the boolean will be set to false.

### update Data from Hyperion

You can manually update the data of the whole adaptor, if you set general.control.updateAdapter to true. With the datapoint general.control.updatePriorities you can update the Priorities of all instances



## Changelog

### 0.1.19 (2021.03.29)
* (felixganzer) little bugfixing

### 0.1.18 (2021.03.06)
* (felixganzer) increase stopTimeout to 3 seconds
* (felixganzer) add communicationTimer object


### 0.1.17 (2021.02.26)
* (felixganzer) bugfixing: add error event handler for socket connection
* (felixganzer) bugfixing: change state roles of control states
* (felixganzer) bugfixing: add try and catch at set RGB color

### 0.1.16 (2021.02.07)
* (felixganzer) bugfixing: clear socket at adapter unload
* (felixganzer) bugfixing: change logo
* (felixganzer) bugfixing: fix testing for github
* (felixganzer) bugfixing: remove all the stuff inserted by an npm install

### 0.1.13 (2021.02.03)
* (felixganzer) add set Color over HSL values

### 0.1.12 (2021.02.02)
* (felixganzer) bugfix: add type-of-is to dependencies

### 0.1.11 (2021.01.30)
* (felixganzer) bugfix: reduce warning "state has no existing object" for js-controller 3.2
* (felixganzer) bugfix: read out priority of color crash at js-controller 3.2

### 0.1.10 (2021.01.10)
* (felixganzer) reorginize config page and add config parameter
* (felixganzer) add set internal or USB Grabber Visible with boolean

### 0.1.9 (2021.01.09)
* (felixganzer) bugfix: reduce warnings
* (felixganzer) add set Grabber Visible without any error catching
* (felixganzer) add start update whole adapter data points and update Priorities

### 0.1.8 (2021.01.07)
* (felixganzer) add set duration of effect and color to set
* (felixganzer) bugfix: clearVisible did not work

### 0.1.7 (2021.01.06)
* (felixganzer) bugfix: only works with iobroker adapter instance 0
* (felixganzer) updating the manual

### 0.1.6 (2021.01.03)
* (felixganzer) add setColorRGB under general.control
* (felixganzer) add controlling adjustments of hyperion
* (felixganzer) add start and stop Instance

### 0.1.5 (2021.01.02)
* (felixganzer) read out all possible effects
* (felixganzer) add setEffect under general.control
* (felixganzer) read out video Mode and LED Mapping
* (felixganzer) read out adjustments of instance

### 0.1.4 (2021.01.01)
* (felixganzer) add control clear of colors and effects

### 0.1.3 (2021.01.01)
* (felixganzer) add read out priorities to see actual running colors and effects

### 0.1.2 (2020.12.30)
* (felixganzer) add read out sysinfos to check Version of Hyperion

### 0.1.1 (2020.12.30)
* (felixganzer) add controlling components of hyperion
* (felixganzer) create first config to set IP, Port and Priority

### 0.1.0 (2020.12.29)
* (felixganzer) creating api class to communicate with hyperion and adding read out instances of hyperionNG

### 0.0.1 (2020.12.29)
* (felixganzer) initial release

## License
MIT License

Copyright (c) 2020-2021 felixganzer <felixganzer@web.de>

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