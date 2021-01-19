---
local: true
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.hm-rega/README.md
title: HomeMatic ReGaHSS
hash: 5nzOtddjd6p/3BVJJkfR7yHWPQUqVm2mcbdsP7tvrkM=
---
![logo](../../../de/adapterref/iobroker.hm-rega/media/homematic.png)

# HomeMatic ReGaHSS
## Homematic
> Homematic is the Smart Home System from eQ-3, which enables the comprehensive control of a wide variety of functions using scenarios (from simple to complex) in the house or apartment.

> The devices include products for light, roller shutter and heating control, hazard detectors, safety sensors and products for measuring weather data. The radio communication simplifies retrofitting. Wire bus components can be used in new buildings.

[source](https://www.eq-3.de/produkte/homematic.html)

## Adapter Homematic ReGaHss
This adapter establishes a connection to the Homematic logic layer "ReGaHSS" (** Re ** sidential ** Ga ** teway).
It synchronizes real names, system variables, rooms, trades and programs between Homematic and ioBroker.

If several central units are to be integrated into ioBroker, a separate instance must be installed and configured for each central unit.

With the installation of ReGaHSS an instance of the adapter "hm-rpc" is also installed, which should be configured and activated in advance.

One instance of this adapter can manage up to 5 different instances of the Homematic RPC adapter, which provide different services (each service requires its own RPC instance):

- rfd (CCU radio service for standard components)
- hs485d (Wired) (for wired bus components)
- CuxD (additional software to provide a universal interface)
- Homematic IP (IP-supported components)
- Virtual Devices

### Requirements before installation
- Homematic Gateway (CCU / CCU2 / CCU3…) *or*
- Radio module with suitable software (piVCCU (* x) *, RaspberryMatic or similar)

## Installation
An instance of the adapter is installed via the ioBroker admin interface.

When the installation is complete, the configuration window opens automatically.

Before the actual configuration, the instance of the HM-RPC adapter (created together with this adapter) or, if necessary, additional HM-RPC instances should be created and configured.

## Configuration
![](../../../de/adapterref/iobroker.hm-rega/media/01c7dbc4da0240421b0711b331971d2d.png) **Selection menu above**

Three different areas can be selected in the upper selection menu:

### Main settings area
![](../../../de/adapterref/iobroker.hm-rega/media/3e0325b2bf61e508e131f8792e2c004d.png) **Main Settings**

The basic settings are made in this area.

The IP address of the CCU can be selected in the pull-down menu; the reconnection interval (standard 30 sec) can also be adjusted by the user.

![](../../../de/adapterref/iobroker.hm-rega/media/ce181cdbb3b8979e1233b57a4588cf1d.png) **Assignment of the RPC instances**

The required services are then activated and linked to the appropriate HM-RPC instance.

Polling

If activated, the RegaHSS data is regularly queried by the CCU, based on the seconds set in the Intervals field. The interval should not be set too low, as too frequent polling can lead to the CCU crashing.

Trigger

In order to minimize the active queries from ioBroker to the RegaHSS, a trigger can also push the data on the CCU within a program when changes are made.
A virtual button on the CCU that is triggered in a CCU program can be used for this. By default, this is the BidCosRF.50.PRESS_SHORT key (see sample program).

### Synchronize area
Here the user can specify which information is to be transferred from the CCU to ioBroker. The corresponding objects and data points are then created in ioBroker.

- DutyCycle: Activates the indication of the duty cycle (in%)
- Variables: Activates the transfer of the system variables from the CCU
- Programs: Activates the transfer of the program names from the CCU
- Names: Activates the transfer of the plain text names of the data points from the CCU
- Favorites: Activates the transfer and listing of favorites
- Rooms: Activates the takeover of the rooms and a listing of them
- Trades: Activates the transfer of trades and a list of them

### Additional settings area
Here the user can decide whether https (encrypted and tap-proof connection) should be used. If activated, the user name and the associated password are required

Once all settings have been made, the configuration page is closed with the command "save and close" (button below the settings area). The adapter is closed and the instance is started with the new values.

### Instance
![](../../../de/adapterref/iobroker.hm-rega/media/44785b82964bcdc198565b1681787dc0.png) **Instance and Signal**

The created instance (s) can now be found in the *Instances* area of the ioBroker. The traffic light system on the left shows whether the adapter is activated or connected to the CCU.

If you place the mouse pointer on a symbol, you get detailed information.

### Objects of the adapter
In the Objects area, all values and information transmitted by the adapter from the CCU are displayed in a tree structure.

Since the objects are user-specific, only the general objects that are the same for all users are shown here.

![](../../../de/adapterref/iobroker.hm-rega/media/c24d8382beda4c970093097959080524.png) **folder structure**

The first folders (usually number ID) are the programs contained in the CCU.

CCU and info folders contain the basic information of the gateway incl.
percentage specification of the duty cycle (if activated).

Finally, the variables created in the CCU are listed

### FAQ

## Changelog
### 3.0.7 (2021-01-17)
* (foxriver76) we notify the user about aborted connection by CCU during request

### 3.0.6 (2020-12-25)
* (Hirsch-DE) don't write datapoints if timestamp is 0"

### 3.0.5 (2020-12-24)
* (foxriver76) provide possibility to use custom webinterface port, please see FAQ

### 3.0.4 (2020-12-21)
* (foxriver76) fixed enum translations (changed in API)
* (foxriver76) fixed handling of "favorites" enum
* __this can be breaking for some users, please check your enums__

### 2.6.25 (2020-12-16)
* (foxriver76) fix aliases being removed from enums if they contain `hm-rpc.`

### 2.6.24 (2020-11-03)
* (foxriver76) now states will be accordingly marked to indicate that rega is down when receiving invalid responses

### 2.6.23 (2020-10-15)
* (foxriver76) fixes for edge case crashes

### 2.6.22 (2020-09-29)
* (foxriver76) fixed error where alarm states of hm-rpc instances with instance number >= 10 are created for the wrong instance (issue #111)

### 2.6.20 (2020-09-15)
* (foxriver76) set explicit object type on extending object (issue #109)

### 2.6.19 (2020-08-23)
* (foxriver76) fixed issue on syncing service message counter when invisible variables are synchronized
* (foxriver76) fixed issue where value list variables are a string instead of an integer

### 2.6.17 (2020-08-17)
* (foxriver76) fix for % scaling of float numbers

### 2.6.15 (2020-08-08)
* (foxriver76) fix potential issues with scaling of % values as in https://github.com/ioBroker/ioBroker.hm-rpc/issues/263

### 2.6.14 (2020-06-11)
* (foxriver76) fix potential problem on enum sync, where to many channels could be deleted

### 2.6.11 (2020-06-11)
* (foxriver76) timeout of requests increased to 90 seconds (its only important to have a timeout to prevent infinite stucking)

### 2.6.10 (2020-06-10)
* (foxriver76) fix crash when a user on CCU is a empty string on synchronizing favorites

### 2.6.9 (2020-05-29)
* (foxriver76) fixed crash when we cannot determine CCU version

### 2.6.8 (2020-05-26)
* (foxriver76) Script post requests will time out after 15 seconds to prevent 
stucking in queue if no answer from ccu received

### 2.6.7 (2020-05-11)
* (foxriver76) fixed some edge cases, reported by Sentry

### 2.6.6 (2020-05-06)
* (foxriver76) use current time as timestamp if non-existent on initial variables poll

### 2.6.5 (2020-04-22)
* (foxriver76) improved error handling, no longer use legacy log file

### 2.6.4 (2020-04-13)
* (foxriver76) now storing scripts in iob file storage

### 2.6.2 (2020-04-11)
* (foxriver76) minor fix on ccu object

### 2.6.1 (2020-04-04)
* (foxriver76) fix synchronization

### 2.6.0 (2020-04-02)
* (foxriver76) sentry plugin support added

### 2.5.5 (2020-02-17)
* (foxriver76) we are logging the script name in still pending warning from now on

### 2.5.4 (2020-02-05)
* (foxriver76) made port fully configurable, also with https enabled

### 2.5.3 (2020-01-15)
* (foxriver76) improved error handling in edge cases and more verbose logging on errors

### 2.5.2 (2019-12-29)
* (foxriver76) fixed issue which originated by undefined tclsh alias on CCU for dutycycle.fn script

### 2.5.1 (2019-12-14)
* (foxriver76) no longer use adapter.objects
* (foxriver76) js-controller v > 2 required

### 2.4.12 (2019-09-26)
* (foxriver76) fixed bug which lead to alarm counter showing number of service messages

### 2.4.10 (2019-09-17)
* (foxriver76) we set enum name as translation object again

### 2.4.9 (2019-09-04)
* (foxriver76) fix minor bug which prevented correct room sync
* (foxriver76) in 2.4.6 we implemented the mechanism for hm-rega and rpc, in fact we should only delete hm-rpc devices, 
because rega will be added on ioB side (can't be done in CCU)

### 2.4.7 (2019-08-28)
* (foxriver76) fixed another legacy bug, which prevented some enums from getting correct name

### 2.4.6 (2019-08-11)
* (foxriver76) only deleting hm adapter objects from enums

### 2.4.4 (2019-08-02)
* (foxriver76) fixed enum sync and improved logging

### 2.4.2 (2019-07-23)
* (foxriver76) lc and ts for alarm states are now valid formatted for js-controller

### 2.4.1 (2019-07-13)
* (foxriver76) also poll invisible vars if configured

### 2.4.0 (2019-07-03)
* (foxriver76) added possibility to synchronize hidden variables

### 2.3.3 (2019-04-05)
* (foxriver76) added more systeminfo states when syncing duty cycle
* (foxriver76) when setting ts, do it in ms

### 2.3.2 (2019-03-10)
* (foxriver76) when ccu sysvar is nan, replace it by null

### 2.3.1 (2019-03-07)
* (foxriver76) also unescape %0A (\n)
* (foxriver76) remove line break in firmware version

### 2.3.0 (2019-02-07)
* (foxriver76) implemented messagebox

### 2.2.2 (2019-02-04)
* (foxriver76) show correct number of service messages even if automatic checking is enabled

### 2.2.1 (2019-01-29)
* (foxriver76) create alarm states with correct name instead of renaming on restart
* (foxriver76) fix to enable acknowledging servicemessages for all instance types

### 2.2.0 (2019-01-26)
* (foxriver76) reworked alarm states, see FAQ
* (foxriver76) fix where virtual devices were not named

### 2.1.8 (2019-01-24)
* (foxriver76) from now on we are displaying the firmware version instead of coprocessor fw version
* (foxriver76) we are making sure to prevent a CCU3 being exposed as a CCU2
* (foxriver76) fixed renaming of alarms on start

### 2.1.7 (2019-01-21)
* (foxriver76) fixed the bug that all alarms of devices are in hm-rpc rfd instance 
or non existent if no rpc instance existed
* (foxriver76) fix bug where datapoints were not named

### 2.1.6 (2019-01-20)
* (foxriver76) update state when same value is set with another timestamp
* (foxriver76) revert duty cycle script
* (foxriver76) fix for parse errors on -inf values

### 2.1.3 (2019-01-14)
* (foxriver76) also decode string values when setting foreign states
* (foxriver76) add more translations

### 2.1.2 (2019-01-10)
* (foxriver76) fix duty cycle script
* (foxriver76) fix bug where state units were ignored for all except rfd

### 2.1.0 (2019-01-07)
* (foxriver76) usage of adapter-core
* (bluefox) compact mode compatibility

### 2.0.1 (2019-01-01)
* (foxriver76) fix error that prevented setting umlauts to system variables in ioBroker
* (foxriver76) usage and application of eslint 

### 2.0.0 (2018-11-28)
* (foxriver76) Https checkbox added
* (foxriver76) Https can be used instead of http
* (foxriver76) Added possibility to authenticate on API
* (foxriver76) de- and encryption added

### 1.7.2 (2018-07-29)
* (bluefox) Configuration dialog was corrected

### 1.7.1 (2018-06-25)
* (bluefox) Forbidden characters were replaced

### 1.7.0 (2018-01-26)
* (bluefox) Ready for Admin3

### 1.6.6 (2017-09-23)
* (AlGu1) Fix error if Lan Interfaces exits

### 1.6.5 (2017-09-10)
* (AlGu1) Change adapter logging of new values to debug

### 1.6.4 (2017-09-10)
* (AlGu1) Config Settings changed to set defaults after update adapter

### 1.6.3 (2017-09-06)
* (AlGu1) Read values from CCU in raw format and create JSON string and object in adapter

### 1.6.2 (2017-09-05)
* (AlGu1) dutycycle.fn script changed for better compatiblity without ReGaHss Beta version

### 1.6.1 (2017-09-05)
* (AlGu1) Error in script file fixed

### 1.6.0 (2017-09-05)
* (AlGu1) Read DutyCycle and other params from listBidcosInterfaces

### 1.5.0 (2017-06-29)
* (Apollon77) Also update names of states when syncing with CCU

### 1.4.8 (2017-05-24)
* (bluefox) Fix values conversion for CUxD

### 1.4.4 (2017-02-28)
* (Apollon77) small fix (issue #23)

### 1.4.3 (2017-02-01)
* (Apollon77) respect settings and only sync variables and programs if selected in settings (issue #22)

### 1.4.2 (2017-01-30)
* (bluefox) remove error log in CCU by start

### 1.4.1 (2017-01-16)
* (bluefox) merge rooms, functions and favorites with existing one

### 1.4.0 (2017-01-15)
* (jens-maus) Add HMIP support

### 1.3.0 (2016-08-23)
* (bluefox) update states only if changed

### 1.2.1 (2016-07-15)
* (nobody) fix initial read of states

### 1.2.0 (2016-05-27)
* (bluefox) read variables anew if connection of rfd detected
* (bluefox) read alarms
* (bluefox) support of acknowledgment of alarms

### 1.1.1 (2016-05-27)
* (bluefox) fix min/max for variables

### 1.1.0 (2016-04-19)
* (bluefox) change timestamp and last change of states

### 1.0.0 (2016-04-19)
* (bluefox) detect disconnection and handle it

### 0.3.7 (2016-04-18)
* (bluefox) fix error with polling trigger

### 0.3.6 (2016-03-12)
* (bluefox) fix read datapoints

### 0.3.5 (2016-03-12)
* (bluefox) remove deprecated unescape

### 0.3.4 (2016-03-09)
* (bluefox) remove deprecated unescape

### 0.3.3 (2016-03-01)
* (bluefox) remove deprecated unescape
* (bluefox) add connection state

### 0.3.2 (2016-03-01)
* (bluefox) remove deprecated unescape

### 0.3.1 (2016-02-29)
* (bluefox) fix dimmer and blinds values at start

### 0.3.0 (2016-02-28)
* (bluefox) remove deprecated unescape

### 0.2.1 (2015-03-25)
* (bluefox) fix "\n" in values

### 0.2.0 (2015-03-24)
* (bluefox) implement check init function

### 0.1.16 (2015-01-04)
* (bluefox) catch errors if states deleted

### 0.1.15 (2015-01-03)
* (bluefox) add hm-rpc as dependency

### 0.1.14 (2015-01-03)
* (bluefox) enable npm install

### 0.1.13 (2014-12-11)
* (bluefox) process errors

### 0.1.12 (2014-12-10)
* (bluefox) update devices if hm-rpc updates the device list

### 0.1.11 (2014-12-06)
* (bluefox) update devices if hm-rpc updates the device list

### 0.1.10 (2014-11-21)
* (bluefox) support of new naming concept with no parents and children

### 0.1.9 (2014-11-11)
* (bluefox) fix error with stopping adapter

### 0.1.8 (2014-10-22)
* (bluefox) fix error with scripts
* (bluefox) add gruntfile.js and remove jscs warnings

### 0.1.7
* (Bluefox, Hobbyquaker) fix bug if no programs or variables exist

### 0.1.6
* (hobbyquaker) added common.role for variables
* (hobbyquaker) get state values
* (hobbyquaker) queue device/channel renaming

### 0.1.5
* (hobbyquaker) enum fixes

### 0.1.4
* (hobbyquaker) fixes
* (hobbyquaker) add settings ui

### 0.1.3
* (hobbyquaker) common.children vs children

### 0.1.2
* (hobbyquaker) Fix common.children in getPrograms

### 0.1.1
* (hobbyquaker) Fix common.name attribute

## License

The MIT License (MIT)

Copyright (c) 2014-2021 bluefox <dogafox@gmail.com>

Copyright (c) 2014 hobbyquaker

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