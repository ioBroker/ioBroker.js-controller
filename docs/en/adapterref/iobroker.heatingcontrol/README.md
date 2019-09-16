![Logo](admin/heatingcontrol.png)
# ioBroker.HeatingControl



![Number of Installations](http://iobroker.live/badges/heatingcontrol-installed.svg) 
![Number of Installations](http://iobroker.live/badges/heatingcontrol-stable.svg) 
[![NPM version](http://img.shields.io/npm/v/iobroker.heatingcontrol.svg)](https://www.npmjs.com/package/iobroker.heatingcontrol)
[![Downloads](https://img.shields.io/npm/dm/iobroker.heatingcontrol.svg)](https://www.npmjs.com/package/iobroker.heatingcontrol)

[![NPM](https://nodei.co/npm/iobroker.heatingcontrol.png?downloads=true)](https://nodei.co/npm/iobroker.heatingcontrol/)

[![Travis-CI](http://img.shields.io/travis/rg-engineering/ioBroker.heatingcontrol/master.svg)](https://travis-ci.org/rg-engineering/ioBroker.heatingcontrol)





Adapter for controlling your heating system.

Features:
* Control the setpoint temperature levels of all thermostats per schedules
* Configure multiple heating periods for each day and night 
* Supports various homematic and max! thermostats
* supports multiple profiles
* If there is no direct connection between the thermostat and the actuator, the actuator can be switched directly out of the adapter
* Currently, the actuator is switched off directly when the setpoint temperature is reached. As soon as the setpoint temperature is below the actual temperature, the actuator will be switched on. (To do: implement improved control)
* unlimited thermostat, actuator and sonsor per room are supported
* Thermostat, actuator and sensor are automatically detected per room. The function (eg "heating") is used for this.
* Rooms can be excluded within the admin interface, if a room contains a thermostat but should not be controlled
* sensor is used to reduce target temperature (e.g. if a window is open)
* interface to Feiertag-Adapter or any others to detect public holiday. Public holiday can be a normal day or like sundays. (admin setting)
* A visualization example will be provided later


## Settings
### main
* Function = Function to be used to detect thermostats, actuators and sensors per room. It's one of the sytem enums
* timezone = to be used for cron to adjust cron jobs
* Path to Feiertag - Adapter = if you wnat to use Feiertag-Adapter to dectect automatically public holiday for today then set the path here (e.g. feiertage.0)
* delete all devices when admin opens = should be disabled. Enable it only when you need to delete all room, actuator and sensor settings. A device search will be executed when adapter admin opens
* sensor used = if you have window sensors and you want to decrease target temperature when window is open then enable that option
* actors used = if you want to control actuators directly from adapter. Just in case there is no direct connection between thermostat and actuator.
* use actuators if no heating period = only valid with actuators. Defines how actuators are set when no heating period is active
* use actuators if no thermostat available = only valid with actuators. If you have rooms without thermostat but with heating actuator you can switche them on or off permanantly


### profile
* Profile Type = three different profile types (Monday - Sunday, or Monday - Friday and Suturday/Sunday or every day) are supported
* number of profiles = if you need more then on profile increase that value. You can then select which profile will be used.
* number of periods = define how many daily sections with different temperature you need. As more you set as more datapoints will be created. Better to use a low value (e.g. 5)
* "public holiday like sunday = if you want to set target temperatures on public holiday like sunday enable that option. Otherwise public holiday settings are the same as on normal days

### devices
* a list of all rooms. You can disable a room here. 
* press edit button on right hand side to open settings window for thermostats, actuators and sensors for that room

### Edit Room
* here you can verifay and set object ID's for thermostats, actuators and sensors
* you can add manually new thermostats, actuators or sensors. Just press + button. Then you get an empty line which needs to filled up. The Edit-Button opens a list of available devices on the system
* thermostats:
** name, temperature target OID and current temperature OID should be set. 
* actuators
** name and OID for state should be set
* sensors
** name and OID for current state should be set

## Requirements
* Node version 8 or higher is required

## Issues and Feature Requests
* If you are faced with any bugs or have feature requests for this adapter, please create an issue within the GitHub issue section of the adapter at [github](https://github.com/rg-engineering/ioBroker.heatingcontrol/issues). Any feedback is appreciated and will help to improve this adapter.


## Changelog

### 0.2.2 (2019-09-13)
* (René) see issue #14: description of datapoint time changed ('from' instead 'until')
* (René) see issue #12: unnecessary warnings removed
* (René) see issue #17: seconds removed from time list
* (René) datepoint change handling reworked
* (René) see issue #18: take over values from external PublicHoliday-datapoint

### 0.2.1 (2019-09-08)
* (René) bug fixes in actuator handling

### 0.2.0 (2019-09-05)
* (René) path to Feiertag-Adapter can also include a complete datapoint path 

### 0.1.0 (2019-08-25)
* (René) redesign of data structure
	- more then one actuator, sensor and thermostat per room
	- three different profile types
	- manual configuration of devices (if device is not detected automatically)
	- interface to Feiertag-Adapter
	- public holiday as normal day or like sunday (setting in admin)
	- window sensor support. Reduce target temperature when window is open
	- !!ATTENTION!! data structure/objects has been changed. You need to update your visualisation settings

### 0.0.5 (2019-07-08)
* (René) support for max! thermostats

### 0.0.4 (2019-06-23)
* (René) debugging

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
