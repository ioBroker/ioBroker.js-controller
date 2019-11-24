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
* manual temperature override for a certain time
* predefined heating period
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
* HeatingPeriod = start and end date of heating period. Used to set "HeatingPeriodActive" 



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

## datapoints

| DP name             | description                                                                                         |
|---------------------|-----------------------------------------------------------------------------------------------------|
| HeatingPeriodActive | if off, the profiles will not be used                                                               | 
| CurrentProfile      | select current profile (1 based, means profile 1 use datapoints under heatingcontrol.0.Profiles.0 ) | 
| LastProgramRun      | shows last time when adapter run                                                                    | 

### temperature descrease / increase

| DP name           | description                                                | target temperature for relative decrease                                       | target temperature for absolute decrease                      |
|-------------------|------------------------------------------------------------|--------------------------------------------------------------------------------|---------------------------------------------------------------|
| GuestsPresent     | increase temperature because guests wants it warmer        | increase current profile temperature by Profiles.0.room.GuestIncrease          | set target to Profiles.0.room.absolute.GuestIncrease          | 
| PartyNow          | decrease temperature because it's becoming hot'            | decrease current profile temperature by Profiles.0.room.PartyDecrease          | set target to Profiles.0.room.absolute.PartyDecrease          | 
| Present           | we are present, if we are not present decrease temperature | decrease current profile temperature by Profiles.0.room.AbsentDecrease         | set target to Profiles.0.room.absolute.AbsentDecrease         | 
| VacationAbsent    | we are absent, so decrease also on weekend                 | decrease current profile temperature by Profiles.0.room.VacationAbsentDecrease | set target to Profiles.0.room.absolute.VacationAbsentDecrease | 

* in both szenarious only one lowering is used (in previous version of adapter more then one degreases could be used)
* in absolute degrease szenario only target values not equal 0°C are used. If you do not need any lowering for a certain room then keep decrease-values at 0°C

## others

* HolidayPresent
if HolidayPresent is set to true then profile for Sunday is used in any case. We assume you are at home like on Sunday.

* PublicHolidyToday
There is a option to handle PublicHoliday like Sunday. This option can be enabled in admin.


### window open
if "use sensors" is active and sensor(s) for a room is / are configured then

a) decrease current profile temperature when window is open (true) by Profiles.0.room.WindowOpenDecrease if relative decrease is configured
b) set target to Profiles.0.room.absolute.WindowOpenDecrease when window is open (true) if  absolute decrease is configured

## ical support
you can use your calendar to change datapoints in adapter.
Just configure events from ical in admin. Supported are

* heatingcontrol.0.Present
* heatingcontrol.0.HolidayPresent
* heatingcontrol.0.VacationAbsent

## Requirements
* Node version 8 or higher is required

## Issues and Feature Requests
* If you are faced with any bugs or have feature requests for this adapter, please create an issue within the GitHub issue section of the adapter at [github](https://github.com/rg-engineering/ioBroker.heatingcontrol/issues). Any feedback is appreciated and will help to improve this adapter.


## Changelog

### 0.3.6 (2019-11-xx)
Attention: some changes in datapoints!!
* (René) moved some datapoints from "profile" to "rooms"
* (René) see issue #50: support absolute and relative decrease of target temperature
* (René) do not check all rooms everytime: when data only for one room changed then check only one room
* (René) only one event is used to lower temperature
* (René) add interface to ical (path to vacation and path to holiday present datapoints)

### 0.3.4 (2019-11-09)
* (René) bug fix in data point name

### 0.3.3 (2019-11-08)
Attention: some changes in datapoints!!
* (René) in admin: new buttons to add search new rooms
* (René) bug fix: in profil type Mo-Fr / Sa- So period order check failed  
* (René) see issue #38: new datapoint for WindowIsOpen
* (René) change datapoint "CurrentTimePeriod" to "CurrentTimePeriodFull", "CurrentTimePeriod" and "CurrentTimePeriodTime"
* (René) bugfix datapoint name "Sa-Su"
* (René) see issue #16: new datapoint "state" per room to show reason for temperatur change 
* (René) change format of LastProgramRun date / time



### 0.3.2 (2019-11-01)
* (René) try to convert temperature to number if NaN
* (René) see issue #33: check for heating period when adapter starts
* (René) fix a problem in subscription function when room can not be found 

### 0.3.1 (2019-10-31)
* (René) see issue #42 and #44: check all sensors per room and set state when adapter starts
* (René) show message in admin when adapter is not online
* (René) pre-define devicelist; add dummy thermostat, if list is empty


### 0.3.0 (2019-10-27)
* (René) see issue #20 + #24: start and end of heating period is configurable in admin 
* (René) see issue #24: use external data point to set internal "present" data point 
* (René) see issue #15: manual temperatur override
* (René) see issue #35: delete of devices
* (René) reset DeleteAll at next admin start 


### 0.2.3 (2019-09-20)
* (René) see issue #19: handling of enums created in iobroker admin fixed
* (René) see issue #13: check order of periods; if order is wrong (next time is smaller than previous) then time si not used for cron and a warning appears in log
* (René) see issue #21: check temperatures after changing of period settings (e.g. time)
* (René) see issue #25: select OID for target and current of thermostat in admin overworked
* (René) change datapoint type from bool to boolean


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
