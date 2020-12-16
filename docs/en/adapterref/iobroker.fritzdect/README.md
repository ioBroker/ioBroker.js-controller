![Logo](admin/fritzdect_logo.png)
# ioBroker.fritzdect

![Number of Installations](http://iobroker.live/badges/fritzdect-installed.svg) ![Number of Installations](http://iobroker.live/badges/fritzdect-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.fritzdect.svg)](https://www.npmjs.com/package/iobroker.fritzdect)
[![Downloads](https://img.shields.io/npm/dm/iobroker.fritzdect.svg)](https://www.npmjs.com/package/iobroker.fritzdect)
[![Build Status](https://travis-ci.org/foxthefox/ioBroker.fritzdect.svg?branch=master)](https://travis-ci.org/foxthefox/ioBroker.fritzdect)

[![NPM](https://nodei.co/npm/iobroker.fritzdect.png?downloads=true)](https://nodei.co/npm/iobroker.fritzdect/)

Fritzbox DECT adapter for ioBroker

## Installation:
released version on npm with
```javascript
 npm install iobroker.fritzdect
```


or the actual version from github with 
```javascript
npm install https://github.com/foxthefox/ioBroker.fritzdect/tarball/master --production
```
## Setup

IP-address and password of Fritzbox should be defined via admin page, before the first start of the instance.
The IP-address must be written with leading 'http://'

The devices are detected automatically during startup of fritzdect instance. If devices are added to the fritzbox during a running adapter instance, then please restart the adapter for object creation.

Several permissions have to be set in the fritzbox in order to interact with the adapter!

A german explanatory doc is available here: [install_de](./docs/de/install.md)

The widget requires that also vis-metro and vis-jqui-mfd are installed

## Common Issues / Frequently Asked Questions

  1. no login to the FritzBox

      Log messages if the form of:

          { error: { [Error: self signed certificate] code: 'DEPTH_ZERO_SELF_SIGNED_CERT' }

      indicate that there are SSL security problems. Use the `"strictSSL": false` option (no tick in checkbox) in the admin page of adapter to disable the respective check.

## ioBroker objects

objects in *italic* are not part of all fritz.box configurations

### all devices
|Object|Value|settable|Description|
|--------|-------|:-:|--------|
|devicetype.id|text|-|internal id of device|
|devicetype.name|text|-|name of device|
|devicetype.mode|text|-|mode, manuell or auto|
|devicetype.present|boolean|-|true/false -> connected/not available|
|devicetype.txbusy|boolean|-|true/false -> cmd sending active/not active|
|devicetype.productname|text|-|product name|
|devicetype.manufacturer|text|-|product manufacturer|
|devicetype.fwversion|text|-|product FW version|

### groups
|Object|Value|settable|Description|
|--------|-------|:-:|--------|
|group.masterdeviceid|text|-|internal id of group|
|group.members|text|-|member id's of group|
|group.masterdeviceid|boolean|-|cmd sending active |

### templates
|Object|Value|settable|Description|
|--------|-------|:-:|--------|
|template.id|text|-|internal id of template|
|template.name|text|-|name of template|
|template.toggle|boolean|x|toggle switch for template activation|
|template.lasttemplate|text|-|last confirmed template|

### switch e.g DECT200/DECT210
|Object|Value|settable|Description|
|--------|-------|:-:|--------|
|DECT200.state|boolean|x|true/false -> ON/OFF|
|DECT200.power|value|-|actual power in W|
|DECT200.energy|value|-|actual energy consumption in Wh|
|DECT200.lock|boolean|-|UI/API lock|
|DECT200.devicelock|boolean|-|Button lock|
|*DECT200.temp*|value|-|actual temperature in °C|
|*DECT200.temp_offset*|value|-|offset temperature in °C|
|*DECT200.voltage*|value|-|actual voltage in V|
|*DECT200.txbusy*|boolean|-|cmd sending active |

### thermostat eg. COMET/DECT300/ Heater group
|Object|Value|settable|Description|
|--------|-------|:-:|--------|
|COMET.temp|value|-|actual temperature in °C w/o offset|
|COMET.temp_offset|value|-|offset temperature in °C |
|COMET.actualtemp|value|x|actual temperature in °C|
|COMET.targettemp|value|x|target temperature in °C|
|COMET.comfytemp|value|-|comfort temperature in °C|
|COMET.nighttemp|value|-|night temperature in °C|
|COMET.mode|array|x| 0=AUTO/1=OFF/2=ON state of thermostat|
|COMET.lasttarget|value|-| last target temperature in °C|
|COMET.batterylow|boolean|-|battery status|
|COMET.errorcode|number|-|errorcode|
|COMET.lock|boolean|-|UI/API lock|
|COMET.devicelock|boolean|-|Button lock|
|COMET.operationList|value|-|list of possible modes|
|COMET.operationMode|value|-|actual mode|
|*COMET.windowopenendtime*|time|-|time when open window status ends|
|*COMET.windowopenactiv*|boolean|x|status and cmd of window open detection|
|*COMET.windowopenactivtime*|value|x|time (minutes) when activation of window open |
|*COMET.boostactive|boolean*|x|boost mode active status and cmd|
|*COMET.boostactiveendtime*|time|-|time when boost status ends|
|*COMET.boostactivtime*|value|x|time (minutes) when activation of boost|
|*COMET.battery*|value|-|actual capacity in %|
|*COMET.summeractive*|boolean|-|summer program status|
|*COMET.holidayactive*|boolean|-|holiday program status|
|*COMET.txbusy*|boolean|-|cmd sending active |

### lamp e.g DECT500
|Object|Value|settable|Description|
|--------|-------|:-:|--------|
|DECT500.state|boolean|x|true/false -> ON/OFF|
|DECT500.txbusy|boolean|-|cmd sending active|
|DECT500.supported_modes|value|-|supported colormodes|
|DECT500.current_mode|value|?|actual colormode|
|DECT500.level|value|x|brightness 0-255 |
|DECT500.levelpercentage|value|x|brightness 0-100% |
|DECT500.hue|value|x|color 0-359 |
|DECT500.saturation|value|x|saturation|
|DECT500.temperature|value|x|color temperature (white mode)|

### lamp e.g DECT400
|Object|Value|settable|Description|
|--------|-------|:-:|--------|
|DECT440.txbusy|boolean|-|cmd sending active|
|DECT440.battery|value|-|battery level|
|DECT440.batterylow|boolean|-|battery status|
|DECT440.temperature|value|-|temperature |
|*DECT440.humidity*|value|-|relative humidity %|
|DECT440.button|time|-|see DECT400 button (4x) |

### repeater e.g. DECT100
|Object|Value|settable|Description|
|--------|-------|:-:|--------|
|DECT100.temp|value|-|actual temperature in °C|

### contact/alert (HAN-FUN)
|Object|Value|settable|Description|
|--------|-------|:-:|--------|
|Contact.state|boolean|-|true/false -> ON/OFF|

### button (HAN-FUN, DECT400, DECT440)
|Object|Value|settable|Description|
|--------|-------|:-:|--------|
|Button.lastclick|number|-|timestamp|

### blind (HAN-FUN)
|Object|Value|settable|Description|
|--------|-------|:-:|--------|
|Blind.blindtarget|string|x|target open/close/stop|

## API limitations
* Boost and WindowOpen can only be set for the next 24h. time=0 is cancelling the command
* updates to the thermostat are within a 15min range, depending on the previous communication of thermostat with fritzbox the next cycle is sooner or later, but definitely imediately not after an ioBroker intervention


## Known Issues:
Not all FW-versions of fritz.box support all objects.

## TODO:
* universal object names and structures -> breaking change
* groups inside a device e.g. DECT440 -> breaking change
* usage of predefined colors
* improvement of thermostat mode to text representation (auto, off, boost, comfort, night), comfort and night are also auto mode, but preset to the parametrized value

## Changelog
### 1.1.3 (npm)
* setcolor cmd correction
* only valid color temperatures for white

### 1.1.2
* merge boost and boost active
* merge windowopen and windowopenactive
* DECT440 test

### 1.1.1 (npm)
* getColorDefaults in Admin, prepared but format of xml can no

### 1.1.0
* new features of AVM API 1.33
    * setblind
	* sethkrboost
	* setwindowopen
	* txbusy, windowopenactiveendtime,  boostactiveendtime, boostactive
* fade duration
* DECT440
* DECT500

### 1.0.1 (npm)
* bugfixes in fritz API calls
* error code 303 (but unknown what it means)
* (Black-Thunder) targetTemp=null
* (PascalBru) datapoint nextchange in hkr 

### 1.0.0 Breaking Change for non-native API objects
* merge of fritzapi into repo directly including added DECT500 commands
* **no longer support of non-native API calls (scraping of website)**
    * GuestWLAN
    * BatteryCharge
    * OS version
* correction of timestamp to date conversion for DECT400

### 0.3.2 (npm)
* new states in heater group, operationList and operationMode

### 0.3.1 (npm)
* (scrounger) new states in COMET, operationList and operationMode

### 0.3.0 (npm)
* new DECT500 supported (without commands)

### 0.2.5 (npm)
* fixed testing
* correction for indication of actualtemp in heater groups
* connection type and datasource added in io-package.json
* correction pf switch and alert state (boolean in update routine)

### 0.2.4 (npm)
* (Scrounger) correction of type mismatch (string boolean)

### 0.2.3 (npm)
* skip updating values, when device not present

### 0.2.2 (npm)
* added FritzDECT400 incl. testing
* removed offset in temp value
* new datapoint offset
* added template for switches
* added template testing

### 0.2.1 (npm)
* gulp added
* correction for DECT100 without temperature (caused a stop in creation of objects)
* template creation corrected
* my templates added in admin page

### 0.2.0
* compact mode

### 0.1.5 (npm)
* reading and activation of templates added
* correction of actual temperature in DECT200 and COMET (now offset recognized)
* password now hidden typed and encrypted
* new datapoint actualtemp for Comet
* fritzapi 0.10.5

### 0.1.4 (npm)
* button added, only send the timestamp of last click
* fritzapi 0.10.4

### 0.1.3 (npm)
* windowopenactiv added to thermostat

### 0.1.2  (npm)
* errorcode string->number
* batterylow -> boolean
* switch in admin for non native API call for battery charge in % (shall prevent 403 message logs)

### 0.1.1 (npm)
* switch for GuestWLAN when no access is granted and polling creates an error
* check for devices in admin page for better access to the xml/json stream from fritzbox
* admin v3 implemented

### 0.1.0 (npm)
* major code change to use the xml stream instead the dedicated API-commands for the dedicated values
* creation of objects according the feedback from fritzbox
* support of groups
* still usage of non-universal object names
* more objects

### 0.0.14 (npm)
* correction of temp offset influence

### 0.0.13 (npm)
* DECT200 voltage new object
* DECT200 mode/lock value polling
* Comet mode as number and not array
* ADMIN v3

### 0.0.12 (npm)
* changed state to  mode AUTO/OFF/ON for thermostat (including datapoint lasttarget when going back to AUTO)
* added name state for thermostat
* DECT100 temperature reading
* Contact reading

### 0.0.11 (npm)
* added state OFF/ON for thermostat

### 0.0.10 (npm)
* change to object oriented interface
* getOSversion when starting for log

### 0.0.9 (npm)
* values '1' accepted for ON
* values '0' accepted for OFF

### 0.0.8 (npm)
* messages info-> debug
* values 1/true/on/ON accepted for ON
* values 0/false/off/OFF accepted for OFF

### 0.0.7 (npm)
* current temp of Comet/DECT300
* cyclic polling GuestWLAN

### 0.0.6 (npm)
* correction targettemp in DECT200 section

### 0.0.5 (npm)
* setTemp on COMET
* GuestWlan corrected

### 0.0.4 (npm)
* cyclic status polling

### 0.0.3 (npm)
* user now configurable

### 0.0.2 (npm)
* metro widget for Dect200
* smartfritz-promise->fritzapi
* running version, tested with 1x DECT200 and Fritzbox FW=6.51 on Win10 with 4.5.0 and raspberry 4.7.0

### 0.0.1
* running version, tested with 1x DECT200 and Fritzbox FW=6.30

## License

The MIT License (MIT)

Copyright (c) 2018 - 2020 foxthefox <foxthefox@wysiwis.net>
