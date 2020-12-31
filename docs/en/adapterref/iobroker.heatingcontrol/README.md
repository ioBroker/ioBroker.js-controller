![Logo](admin/heatingcontrol.png)
# ioBroker.HeatingControl
![Number of Installations](http://iobroker.live/badges/heatingcontrol-installed.svg) ![Number of Installations](http://iobroker.live/badges/heatingcontrol-stable.svg) 

[![NPM version](https://img.shields.io/npm/v/iobroker.heatingcontrol.svg)](https://www.npmjs.com/package/iobroker.heatingcontrol)
[![Downloads](https://img.shields.io/npm/dm/iobroker.heatingcontrol.svg)](https://www.npmjs.com/package/iobroker.heatingcontrol)
[![Tests](https://travis-ci.org/rg-engineering/ioBroker.heatingcontrol.svg?branch=master)](https://travis-ci.org/rg-engineering/ioBroker.heatingcontrol)

[![NPM](https://nodei.co/npm/iobroker.heatingcontrol.png?downloads=true)](https://nodei.co/npm/iobroker.heatingcontrol/)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** 
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.


**If you like it, please consider a donation:**
                                                                          
[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YBAZTEBT9SYC2&source=url) 




## Adapter for controlling your heating system.

Features:
* Control the setpoint temperature levels of all thermostats per schedules
* Configure multiple heating periods for each day and night 
* Supports all kind of thermostats (precondition: it must be available in ioBroker)
* Homematic device autodetection 
* supports multiple profiles
* If there is no direct connection between the thermostat and the actuator, the actuator can be switched directly out of the adapter
* Currently, the actuator is switched off directly when the setpoint temperature is reached. As soon as the setpoint temperature is below the actual temperature, the actuator will be switched on. (To do: implement improved control)
* unlimited number of thermostats, actuators and sonsors per room are supported
* Thermostat, actuator and sensor are automatically detected per room. The function (eg "heating") is used for this.
* Rooms can be excluded within the admin interface, if a room contains a thermostat but should not be controlled
* sensor is used to reduce target temperature (e.g. if a window is open); optionally with SensorDelay
* interface to Feiertag-Adapter or any others to detect public holiday. Public holiday can be a normal day or like sundays. (admin setting)
* manual temperature override for a certain time
* predefined heating period
* take over changes from thermostat (optional)
* visualization from [Pittini](https://github.com/Pittini/iobroker-heatingcontrol-vis) is supported. Thank you!

[FAQ](doc/FAQ.md)


## Installation

## Settings
### main
* Function = Function to be used to detect thermostats, actuators and sensors per room. It's one of the sytem enums
* timezone = to be used for cron to adjust cron jobs
* Path to Feiertag - Adapter = if you wnat to use Feiertag-Adapter to dectect automatically public holiday for today then set the path here (e.g. feiertage.0)
* delete all devices when admin opens = should be disabled. Enable it only when you need to delete all room, actuator and sensor settings. A device search will be executed when adapter admin opens
* sensor used = if you have window sensors and you want to decrease target temperature when window is open then enable that option
* actuators used = if you want to control actuators directly from adapter. Just in case there is no direct connection between thermostat and actuator.
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

### temperature decrease / increase

| DP name           | description                                                | target temperature for relative decrease                                       | target temperature for absolute decrease                      |
|-------------------|------------------------------------------------------------|--------------------------------------------------------------------------------|---------------------------------------------------------------|
| GuestsPresent     | increase temperature because guests wants it warmer        | increase current profile temperature by Profiles.0.room.GuestIncrease          | set target to Profiles.0.room.absolute.GuestIncrease          | 
| PartyNow          | decrease temperature because it's becoming hot'            | decrease current profile temperature by Profiles.0.room.PartyDecrease          | set target to Profiles.0.room.absolute.PartyDecrease          | 
| Present           | we are present, if we are not present decrease temperature | decrease current profile temperature by Profiles.0.room.AbsentDecrease         | set target to Profiles.0.room.absolute.AbsentDecrease         | 
| VacationAbsent    | we are absent, so decrease also on weekend                 | decrease current profile temperature by Profiles.0.room.VacationAbsentDecrease | set target to Profiles.0.room.absolute.VacationAbsentDecrease | 


* in both szenarious only one lowering is used (in previous version of adapter more then one degreases could be used)
* in absolute degrease szenario only target values not equal 0°C are used. If you do not need any lowering for a certain room then keep decrease-values at 0°C

### no heating period
there are three options

* fix Temperature per room
if this option is selected, a new datapoint in object tree appears for every room. Here you can set a fix target temperature which is set when heating period is not active.
* fix Temperature for all rooms
with this option you can use one target temperature for every room when heating period is not active
* nothing
with this option nothing will be sent to thermostat if no heating period is active. Target temperature remain from last taget when heating period still was active.
In that case and if you use actuators from the adapter then you have the possibilty to define how actuators should be set (off, on, or leave it as it is) 


## others

* HolidayPresent
if HolidayPresent is set to true then profile for Sunday is used in any case. We assume you are at home like on Sunday.

* PublicHolidyToday
There is a option to handle PublicHoliday like Sunday. This option can be enabled in admin.


### window open
if "use sensors" is active and sensor(s) for a room is / are configured then

a) decrease current profile temperature when window is open (true) by Profiles.0.room.WindowOpenDecrease if relative decrease is configured
b) set target to Profiles.0.room.absolute.WindowOpenDecrease when window is open (true) if  absolute decrease is configured

optionally a delay can be used. If window is opened only for a short time sensor delay can avoid from reduce and back to normal in very short times.

## ical support
you can use your calendar to change datapoints in adapter.
Just configure events from ical in admin. Supported are

* heatingcontrol.0.Present
* heatingcontrol.0.HolidayPresent
* heatingcontrol.0.VacationAbsent
* heatingcontrol.0.GuestsPresent
* heatingcontrol.0.PartyNow

## use changes from thermostat
Many user asked for an option to take over changes from thermostat into adapter. Now a four options are implemented:

| option                   | description                                                
|--------------------------|---------------------------------------------------------------------------------------
| no                       | changes from thermostat are ignored
| as override              | changes from thermostat are taken as override; override time must be set in advance in heatingcontrol.0.Rooms.RoomName.TemperaturOverrideTime
|                          | if override time is not set, than override is not executed
| as new profile setting   | changes from thermostat are taken as target temperature for current profile period
| until next profile point | changes from thermostat are taken as target temperature until next profile point. This is a manual mode, so only Window sensors are used. All other 
|                          | increases / decreases are ignored. There is a datapoint in every room to disable manual mode before reaching next profile point.


## Issues and Feature Requests
* If you are faced with any bugs or have feature requests for this adapter, please create an issue within the GitHub issue section of the adapter at [github](https://github.com/rg-engineering/ioBroker.heatingcontrol/issues). Any feedback is appreciated and will help to improve this adapter.

## known issues

### Adapter with Homematic IP Fußbodenheizungsaktor HmIP-FAL230-C10 – 10fach, 230 V 
It seems that HmIP-FAL230-C10 can not be used directly as an actuator in combination with that adapter. If you use HmIP-FAL230-C10 together with Homematic thermostats it should work.
see also [Forum](https://forum.iobroker.net/topic/22579/test-adapter-heatingcontrol-v1-0-x/1553)


When the adapter crashes or an other Code error happens, this error message that also appears in the ioBroker log is submitted to Sentry.  All of this helps me to provide error free adapters that basically never crashs.

## Changelog

### 2.0.0 (2020-12-xx)
* (René) internal refactoring

**ATTENTION: breaking changes !!!!**
* complete internal refactoring (new source files, internal data structures, code review, ...)
* **Periods and Profils count from 1 instead 0**
* ChangesFromThermostat adjustable per room is removed
* recalculation of room temperature is performed only for the room where necessary (in previous versions all rooms were recalculated and new value transmitted)
* SensorOpenDelay / SensorCloseDelay renamed
* ResetButton to disable manual mode (and go back to auto)
* status log per room
* complete profile can be saved and loaded in admin
* copy profile (complete or for a single room) and periods (for a certain profile and room) by button supported
* datapoint selector for external datapoints added in admin
* autodectection for thermostats, sensors and actuators completely overworked
* room detection overworked
* limits and step widh for profil temperatures adjustable in admin for Pittini vis
* simple window status view (in html) for Pittini vis added
* room state as simple html table for vis added
* issues in github: 
	* #161 Profil springt zur angegebenen Zeit nicht um
	* #153 cron Probleme beim ändern eines Profils mittels Javascript
	* #152 Fenstererkennung im manuellen Modus
	* #148 Bei Änderung vom Thermostat bis zum nächsten Profilpunkt müssen Sensoren berücksichtigt werden


### 1.1.2 (2020-11-11)
* (René) bug fix: activate actors after temperatur change

### 1.1.0 (2020-11-01)
* (René) see issue #149: bug fix: calculate current period in case we are still in last period from yesterday

### 1.1.0 (2020-10-20)
* (René) see issue #132: timer before on and off for actuators 
* (René) see issue #143: additional checks to avoid unneccessary override 
* (René) see issue #140: use guests present and party now DP's also as counter like present (as a option); add adjustable counter limit for present, party now and guest present
* (René) see issue #145: avoid reset of target temperatur by profile settings in option "until next profil point" when set by thermostat 

### 1.0.0 (2020-10-09)
* (matida538) added better Handling of strings in HandleThermostat (convert to Number, instead of warn) (e.g. fhem connector for fht80)
* (matida538) changed Check4ValidTemperature to convert strings to Number instead of Int (else we lose information e.g. 18.5 will be 18)
* (René) some smaller code optimisations

### 0.6.0 (2020-09-15)
* (René) see issue #123: use window open / close delay only when window state changed
* (René) see issue #122: better log for different type warning
* (René) see issue #120: override from thermostat only if it's different to current settings
* (René) see issue #126: TestThermostat should not be checked for correct configuration
* (René) see issue #124: vis from Pittini: Image for open / closed window adjustabel (as an option, if nothing is configured the original will be used)
* (René) see issue #127: use value from thermostat until next profile point 
* (René) see issue #128: try to convert string data to number

### 0.5.7 (2020-07-07)
* (René) see issue #116: get MinimumTemperature for vis only if enabled

### 0.5.6 (2020-06-14)
* (René) see issue #113: re-order of rooms added
* (René) see issue #112: bug fix "Fensterübersicht"

### 0.5.4 (2020-06-04)
* (René) bug fix: HeatingControlVis avoid exceptions like "Cannot read property 'val' of null"

### 0.5.3 (2020-06-03)
* (René) bug fix: new temperatures set when current profile is changed
* (René) refactoring HeatingControlVis to avoid exceptions like "Cannot read property 'val' of null"

### 0.5.2 (2020-05-25)
* (René) bug fix: log a warning if actors are configured but UseActors are off

### 0.5.1 (2020-05-22)
* (René) log a warning if actors are configured but UseActors are off
* (René) sentry added
* (René) some hints in admin

### 0.5.0 (2020-05-03)
* (René) see issue #101: sensor close delay added (similar to already existing sensor open delay)
* (René) see issue #103: date/time format string corrected for vis
* (René) see issue #104: bug fix to take over changes from vis
* (René) see issue #102: bug fix change current time period to be shown on vis

### 0.4.0 (2020-05-02)
* (René) see issue #70: use changes from thermostat
* (René) see issue #91 bug fix: if the same sensor is configured for more than one room thermostat target temperature will be set for all configured rooms
* (René) script from Pittini integrated to support his visualization [Pittini](https://github.com/Pittini/iobroker-heatingcontrol-vis) 
* (Dutchman) some refactoring 

### 0.3.19 (2020-03-15)
* (René) create correct cron job for sunday if profile type "every day" is used
* (René) see issue #87: change type of time data points to string
* (René) see issue #87: set correct roles for data points
* (René) see issue #84: set default value for minimum temperature
* (René) see issue #86: all "float" converted to "number""

### 0.3.18 (2020-03-08)
* (René) fix issues reported by adapter checker

### 0.3.17 (2020-03-01)
* (René) check datapoint configuration: if datapoint points to itself then error messages
* (René) support of new vis see issue  #76
* (Rene) thermostat mode if no heating period

### 0.3.16 (2020-02-09)
* (René) deccrease/increase-handling also when Override is active (see issue #72)
* (René) priority handling for temperature increase / decrease overworked (use only values not equal zero)

### 0.3.15 (2020-01-18)
* (René) bug fix: avoid exception when go to override if MinTemperature-check is active

### 0.3.14 (2020-01-12)
* (René) format conversion for temperatures in string to number
* (René) ack for MinTemperature

### 0.3.13 (2019-12-28)
* (René) bugfix create cron jobs for profile type 3 (daily)

### 0.3.12 (2019-12-27)
* (René) bugfix exception in CheckTemperatureChange [ReferenceError: RoomState is not defined] 

### 0.3.11 (2019-12-27)
* (René) option: minimum temperature per room
* (René) bugfix exception in CheckTemperatureChange [ReferenceError: PublicHolidyToday is not defined] 

### 0.3.10 (2019-12-26)
* (René) see issue #54: stop override with OverrideTemperature =0
* (René) new priority for lowering reasons
* (René) handling of actuators without thermostat
* (René) see issue #66: handle lowering in time between 0:00 and first period
* (René) see issue #64: import of configuration fixed

### 0.3.9 (2019-12-14)
* (René) see issue #60: sensor delay
* (René) see issue #57: support of the same sensor for different rooms
* (René) bug fix: "AbsentDecrease not defined" for relative lowering

### 0.3.8 (2019-12-12)
* (René) see issue #59: TemperaturOverride: acceppt hh:mm and hh:mm:ss
* (René) PartyNow support by iCal 
* (René) if useActuators: show how many actuators are active (as a datapoint)

### 0.3.7 (2019-11-29)
Attention: some changes in datapoints!!
* (René) see issue  #53: moved datapoints for relative lowering into "relative"
* (René) new datapoint to show lowering decrease mode (heatingcontrol.0.TemperatureDecreaseMode)
* (René) guest present as interface to ical
* (René) see issue #52: support radar adapter
* (René) all external states checked when adapter starts

### 0.3.6 (2019-11-23)
Attention: some changes in datapoints!!
* (René) moved some datapoints from "profile" to "rooms"
* (René) see issue #50: support absolute and relative decrease of target temperature
* (René) do not check all rooms everytime: when data only for one room changed then check only one room
* (René) only one event is used to lower temperature
* (René) add interface to ical (path to vacation and path to holiday present datapoints)
* (René) support of more then one instance

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

Copyright (C) <2019-2020>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
