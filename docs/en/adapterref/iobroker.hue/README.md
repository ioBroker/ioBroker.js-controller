![Logo](admin/hue.jpeg)
# ioBroker Philips Hue Bridge Adapter
==============

![Number of Installations](http://iobroker.live/badges/hue-installed.svg) ![Number of Installations](http://iobroker.live/badges/hue-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.hue.svg)](https://www.npmjs.com/package/iobroker.hue)
[![Downloads](https://img.shields.io/npm/dm/iobroker.hue.svg)](https://www.npmjs.com/package/iobroker.hue)

[![NPM](https://nodei.co/npm/iobroker.hue.png?downloads=true)](https://nodei.co/npm/iobroker.hue/)

## English :gb:
This adapter connects your Philips Hue Bridges with ioBroker to control Philips Hue LED bulbs, Friends of Hue LED lamps, stripes, plugs like from Osram, and other SmartLink capable devices (like LivingWhites and some LivingColors).

### Setup
Once you have installed this adapter within ioBroker, create an adapter instance accordingly. Next, you need to connect your Hue bridge with ioBroker within the adapter settings:
1. If you are using another bridge than v2, configure port to 80 (non-https), else 443 (https) should be the way to go.
2. Click on "Find Bridge" button to get the IP address of your bridge. This will search for all bridges in your environment. Then select the bridge to which you want to connect. The field "Bridge Address" will be populated with the IP address of your chosen Hue bridge.
3. Next, click on "Create User" button in the settings and then walk to your Hue bridge device, so your hardware, to push its round button. You'll gonna have 30 seconds to proceed. Once you pushed the button, the field "Bridge User" should be populated with a generated string.
4. Modify any other options in the adapter settings and then select "save and close".
5. Finally, you should be all set: The adapter will generate all objects to control your Hue devices accordingly.

Please note: Adapter settings button "Find Bridge" will be inactive if field "Bridge Address" is populated, and button "Create User" will be inactive if field "Bridge User" is populated.

### Settings
|Name|Description|
|---|---|
|__Bridge address__|IP address of your Hue bridge, you can try to detect it by pressing `Find Bridge` button.|
|__Port__|Port of your Hue bridge, normally 443 (SSL) and 80 (non-SSL).|
|__SSL__|If checked, connecton is secured via SSL, port will automatically change to 443 (it is strongly recommended to use SSL).|
|__User__|Username of your bridge user. You can create it, by pressing `Create User` button and following the screen instructions.|
|__Ignore scenes__|If checked, scenes will not be shown/controlled by the adapter.|
|__Ignore groups__|If checked, groups will not be shown/controlled by the adapter.|
|__"Legacy" structure__|To support backwards compatibility, it is possible to hold an old object structure in ioBroker. This old structure is `hue.<instance_number>.<brdige_name_channel>.<light_or_group_channel>.<state>`. The new structure removes `<brdige_name_channel>` and thus makes it necessary to adapt old scripts, etc. If an existing old strcuture is detected by the adapter, the structure will be used without checking the checkbox. However, if migration from old to new structure is desired, delete the whole `hue.<instance_number>` namespace once.
|__Native turn off/on behaviour__|If checked, the adapter will turn on/off lights in the same fashion as the native Hue app does. Otherwise, lamps will be set to a level of 100 % when switching on.|
|__Sync software sensors__|Also sync software sensors. These are virtual sensors, e.g. created by Hue Labs scenes. By controlling the `status` datapoint of such a sensor you can start/stop scenes which follow this logic. In most cases `0` turns scene off and `1` turns it on.|
|__Polling__|If checked, the adapter will poll state changes, otherwise it can only be used to control lamps, not to show their status.|
|__Polling interval__|Defines how often the states will be polled, and thus updated in ioBroker. Low polling intervals can cause performance issues in some settings. Hence, the minimum allowed polling interval is 2 seconds. If polling interval is set to less than 2 seconds it will be set to 2 seconds during runtime.|

## Deutsch :de:
Bindet Philips Hue / LivingColors / LivingWhites Lampen ein. 
In den Adapter-Settings muss die IP der Hue Bridge sowie ein Username konfiguriert werden. Um einen User zu aktivieren einmal auf create user drücken und dann innerhalb von 30 Sekunden den Button an der Hue bridge drücken. Dann wird automatisch der User übergeben. 

## Changelog
### 2.4.3 (2019-11-19)
* (foxriver76) increased version of node-hue-api to fix authentication for old bridge

### 2.4.2 (2019-11-16)
* (foxriver76) we now use nupnp + upnp to discover bridges (previously only upnp)

### 2.4.1 (2019-11-13)
* (foxriver76) added possibility to control zones and entertainment areas
* (foxriver76) log queue retires on debug instead warn
* (foxriver76) __BETA__: added possibility to control software sensors (Note: this may be handled in a more suitable fashion soon)

### 2.3.1 (2019-11-02)
* (foxriver76) fixed controlling `on` state of sensors

### 2.2.3 (2019-10-21)
* (foxriver76) migrate everything to Hue v3
* (foxriver76) add possibility to turn on/off sensor
* (foxriver76) add anyOn state for all group
* (foxriver76) different kinds of fixes for v3 (Osram Plugs, SSL connection, etc)

### 2.1.0 (2019-10-15)
* (foxriver76) usage and adaptions for node-hue-api v3
* (foxriver76) ability to turn lights on with last settings
* (foxriver76) polling interval minimum is now 2 sec

### 2.0.1 (2019-10-04)
* (foxriver76) fixed bug, that prevented some sensor states getting updated during runtime

### 2.0.0 (2019-09-23)
__ATTENTION: Remove all objects once, ids have changed__
* (foxriver76) internal optimizations
* (foxriver76) usage of iobroker testing
* (foxriver76) add possibility to sync scenes
* (foxriver76) restart adapter when room is deleted in app
* (foxriver76) fix .hue value, user had to set 0-360° but adapter set 0-65535
* (foxriver76) fix .color.temperature
* (foxriver76) remove unnecessary bridge channel, adapter namespace is the bridge
* (foxriver76) add "update available" indicator for light bulbs
* (foxriver76) we now poll the root endpoint instead of (|lights| + |groups| + |sensors|) endpoints every pollingInterval seconds
* (foxriver76) min poll interval now 3 seconds instead of 5 seconds
* (foxriver76) add new indicator state 'anyOn'

### 1.2.4 (2019.09.18)
* (Apollon77) Make compatible with js-controller 2.0

### 1.2.3 (2019.03.11//2019.07.07)
* (jens-maus) Refactored command queue handling to use 'bottleneck' package so that command execution are processed with minimum delay.

### 1.1.2 (2019.01.25)
* (BasGo) Added compact mode

### 1.1.1 (2018.08.17)
* (bluefox) Ignoring of groups was implemented

### 1.1.0 (2018.08.17)
* (bluefox) The command queue was optimized

### 1.0.1 (2018.08.14)
* (bluefox) Roles were adjusted
* (bluefox) temperature changed from 153-cold, 500-warm to 2200-warm, 6500-cold
* (bluefox) hue changed from 0-65535 to 0-360°

### 1.0.0 (2018.04.12)
* (arteck) Enable/Disable OSRAM check from HUE Bridge
* (arteck) polling ZLLSwitch and ZGPSwitch     
* (bluefox) admin3
* (bluefox) do not send commands ofter than 10 in 10 seconds

### 0.6.9 (2017.05.18)
* (bluefox) Enable adapter by default

### 0.6.8 (2017.04.22)
* (bluefox) Poll groups

### 0.6.7 (2017.04.21)
* (bluefox) Fix error with turn on the lamp on start
* (bluefox) configurable port

### 0.6.6 (2017.04.20)
* (bluefox) Use new version of npm library

### 0.6.0 (2016.11.30)
* (pmant) support new lamps
* (pmant) add light name to log

### 0.5.9 (2016.10.11)
* (pmant) fix error with null values

### 0.5.8 (2016.06.05)
* (bluefox) fix typo

### 0.5.7 (2016.06.05)
* (soef) write back known states for group/room
* (soef) Integer conversion for bri_inc command

### 0.5.6
* (Pmant) (experimental) support for power switches

### 0.5.5
* (Pmant) fix error with xy state
* (Pmant) support level in command state

### 0.5.4
* (Pman) Lightset 0 fixed
* (Pman) support for diffent gamuts
* (Pman) support Rooms (new HUE App)

### 0.5.3
* (soef) Default Lightset 0 added

### 0.5.2
* (Pman) fix jscs warnings
* (Pman) improve RGB conversion
* (Pman) add update rgb color

### 0.5.1
* (Pman) fix find bridge popup

### 0.5.0
* (Pman) update to node-hue-api 1.2.x
* (Pman) add level state (bri percentage)

### 0.4.4
* (bluefox) fix config edit

### 0.4.3
* (Pmant) fix adapter crash

### 0.4.2
* (Pmant) add find bridge (experimental)
* (Pmant) add create user (experimental)
* (Pmant) fix enable polling

### 0.4.1
* (Pmant) calculate and write back inc values

### 0.4.0
* (Pmant) add command state

### 0.3.2
* (Pmant) add groups as channels (write only)
* (Pmant) fix prevent duplicate channel names

### 0.3.1
* (Pmant) fix another bug with spaces
* (Pmant) fix hue/sat bug
* (Pmant) fix effect bug
* (Pmant) fix xy colormode

### 0.3.0
* (Pmant) fix rgb states only for color lights
* (Pmant) change set known state changes immediately
* (Pmant) change on/off sets brightness to 254/0
* (Pmant) change changing any color (hs,ct,xy) while light is off sets brightness to max
* (Pmant) fix set brightness to zero if light is off
* (Pmant) change set bri to zero if lamp is not reachable
* (Pmant) fix bridges and lamps with spaces in name

### 0.2.1
* (Pmant) add rgb states (write only)
* (Pmant) fix parent/children warnings
* (Pmant) add switch light off if brightness is zero

### 0.1.4
* (bluefox) fix some null objects

### 0.1.3
* (hobbyquaker) config UI
* (hobbyquaker) added children

### 0.1.2
* (hobbyquaker) fixes

### 0.1.1

* (hobbyquaker) fixed min/max attributes
* (hobbyquaker) added common.oper.read/write attributes

### 0.1.0

* (hobbyquaker) first release

## Roadmap/Todo

* Automatic bridge discovery
* Automatic user setup via bridge link button

## License

Apache 2.0

Copyright (c) 2017-2019 Bluefox <dogafox@gmail.com>
Copyright (c) 2014-2016 hobbyquaker



