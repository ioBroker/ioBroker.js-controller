![Logo](admin/heatingcontrol.png)
# ioBroker.HeatingControl
![Number of Installations](http://iobroker.live/badges/heatingcontrol-installed.svg) ![Number of Installations](http://iobroker.live/badges/heatingcontrol-stable.svg) 

[![NPM version](https://img.shields.io/npm/v/iobroker.heatingcontrol.svg)](https://www.npmjs.com/package/iobroker.heatingcontrol)
[![Downloads](https://img.shields.io/npm/dm/iobroker.heatingcontrol.svg)](https://www.npmjs.com/package/iobroker.heatingcontrol)
[![Tests](https://travis-ci.org/rg-engineering/ioBroker.heatingcontrol.svg?branch=master)](https://travis-ci.org/rg-engineering/ioBroker.heatingcontrol)

[![NPM](https://nodei.co/npm/iobroker.heatingcontrol.png?downloads=true)](https://nodei.co/npm/iobroker.heatingcontrol/)

Adapter for controlling thermostats.

features:
* Setting the set temperature at specific times
* Number of daily sections with different setpoint temperatures adjustable
* Supports various homematic thermostats
* supports multiple profiles (to do)
* If there is no direct connection between the thermostat and the actuator, the actuator can be switched directly out of the adapter
* Currently, the actuator is switched off directly when the setpoint temperature is reached. As soon as the setpoint temperature is undershot, the actuator is switched on again. Later, a better regulation will be implemented here.
* up to two actuators are supported
* Thermostat and actuator are automatically detected per room. The function (eg "heating") is used for this.
* Rooms can be deactivated in the admin if a room has a thermostat but should not be controlled
* A visualization example will be available here later


## Settings
### main
* use actors = if you want to control actuators directly from adapter. Just in case there is no direct connection between thermostat and actuator.
* Gewerk = Function to be used to detect thermostats and actuators per room
* Path to Thermostats = object path to thermostats, e.g. "hm-rpc.0."
* Path To Actors = object path to actuators, e.g. "hm-rpc.0."
* timezone = to be used for cron to adjust cron jobs
* delete all = delete all room settings when admin opens. After that a new scan for rooms will start

### profile
* Profile Type = at this moment only monday to sunday is supportet. The others will be implemented soon
* number of profiles = if you need more then on profile increase that value. You can then select which profile will be used.
* number of periods = define how many daily sections with different temperature you need. As more you set as more datapoints will be created. Better to use a low value (e.g. 5)
* public holyday = if you check this you get a separate adjustment for public holidays (not implemented yet)

### devices
* a list of all rooms with thermostats and actuators. You can disable a room here. You should not change settings for thermostats or actuators because this will be overwritten next time you start admin

## Notes
* node with version higher then 8 is necessary!

## known issues
* please create issues at [github](https://github.com/rg-engineering/ioBroker.heatingcontrol/issues) if you find bugs or whish new features


## Changelog

### 0.0.3 (2019-06-02)
* (René) ready to publish

### 0.0.2 (2019-05-19)
* (René) actuator handling added

### 0.0.1 (2019-04-27)
* (René) initial release

## License

Copyright (C) <2019>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
