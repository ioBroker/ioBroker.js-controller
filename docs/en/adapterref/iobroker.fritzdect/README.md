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
|devicetype.productname|text|-|product name|
|devicetype.manufacturer|text|-|product manufacturer|
|devicetype.fwversion|text|-|product FW version|

### groups
|Object|Value|settable|Description|
|--------|-------|:-:|--------|
|group.masterdeviceid|text|-|internal id of group|
|group.members|text|-|member id's of group|

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
|*COMET.battery*|value|-|actual capacity in %|
|*COMET.summeractive*|boolean|-|summer program status|
|*COMET.holidayactive*|boolean|-|holiday program status|
|*COMET.windowopenactiv*|boolean|-|status of window open detection|

### lamp e.g DECT500
|Object|Value|settable|Description|
|--------|-------|:-:|--------|
|DECT500.state|boolean|x|true/false -> ON/OFF|
|DECT500.txbusy|boolean|-|actual|
|DECT500.colormodes|value|-|supported colormodes|
|DECT500.current_mode|value|?|actual colormode|
|DECT500.level|value|?|brightness 0-255 |
|DECT500.levelpercentage|value|?|brightness 0-100% |
|DECT500.hue|value|?|color 0-359 |
|DECT500.saturation|value|?|saturation|
|DECT500.temperature|value|?|color temperature (white mode)|

### repeater e.g. DECT100
|Object|Value|settable|Description|
|--------|-------|:-:|--------|
|DECT100.temp|value|-|actual temperature in °C|

### contact
|Object|Value|settable|Description|
|--------|-------|:-:|--------|
|Contact.state|boolean|-|true/false -> ON/OFF|

### button (HAN-FUN, DECT400)
|Object|Value|settable|Description|
|--------|-------|:-:|--------|
|Button.lastclick|number|-|timestamp|


## Known Issues:
Not all FW-versions support all objects.

## TODO:
* universal object names
* improvement of thermostat mode to text representation (auto, off, boost, comfort, night), comfort and night are also auto mode, but preset to the parametrized value
* FritzDECT440 after API release

## Changelog
### 1.0.1
* bugfixes in fritz API calls

### 1.0.0 Breaking Change for non-native API objects
* merge of fritzapi into repo directly including added DECT500 commands
* **no longer support of non-native API calls (scraping of website)**
    * GuestWLAN
    * BatteryCharge
    * OS version
* correction of timestamp to date conversion fpr DECT400

### 0.3.2
* new states in heater group, operationList and operationMode

### 0.3.1
* (scrounger) new states in COMET, operationList and operationMode


### 0.3.0
* new DECT500 supported (without commands)

### 0.2.5
* fixed testing
* correction for indication of actualtemp in heater groups
* connection type and datasource added in io-package.json
* correction pf switch and alert state (boolean in update routine)

### 0.2.4
* (Scrounger) correction of type mismatch (string boolean)

### 0.2.3
* skip updating values, when device not present

### 0.2.2
* added FritzDECT400 incl. testing
* removed offset in temp value
* new datapoint offset
* added template for switches
* added template testing

### 0.2.1
* gulp added
* correction for DECT100 without temperature (caused a stop in creation of objects)
* template creation corrected
* my templates added in admin page

### 0.2.0
* compact mode

### 0.1.5
* reading and activation of templates added
* correction of actual temperature in DECT200 and COMET (now offset recognized)
* password now hidden typed and encrypted
* new datapoint actualtemp for Comet
* fritzapi 0.10.5

### 0.1.4
* button added, only send the timestamp of last click
* fritzapi 0.10.4

### 0.1.3
* windowopenactiv added to thermostat

### 0.1.2
* errorcode string->number
* batterylow -> boolean
* switch in admin for non native API call for battery charge in % (shall prevent 403 message logs)

### 0.1.1
* switch for GuestWLAN when no access is granted and polling creates an error
* check for devices in admin page for better access to the xml/json stream from fritzbox
* admin v3 implemented

### 0.1.0
* major code change to use the xml stream instead the dedicated API-commands for the dedicated values
* creation of objects according the feedback from fritzbox
* support of groups
* still usage of non-universal object names
* more objects

### 0.0.14
* correction of temp offset influence

### 0.0.13
* DECT200 voltage new object
* DECT200 mode/lock value polling
* Comet mode as number and not array
* ADMIN v3

### 0.0.12
* changed state to  mode AUTO/OFF/ON for thermostat (including datapoint lasttarget when going back to AUTO)
* added name state for thermostat
* DECT100 temperature reading
* Contact reading

### 0.0.11
* added state OFF/ON for thermostat

### 0.0.10
* change to object oriented interface
* getOSversion when starting for log

### 0.0.9
* values '1' accepted for ON
* values '0' accepted for OFF

### 0.0.8
* messages info-> debug
* values 1/true/on/ON accepted for ON
* values 0/false/off/OFF accepted for OFF

### 0.0.7
* current temp of Comet/DECT300
* cyclic polling GuestWLAN

### 0.0.6
* correction targettemp in DECT200 section

### 0.0.5
* setTemp on COMET
* GuestWlan corrected

### 0.0.4
* cyclic status polling

### 0.0.3
* user now configurable

### 0.0.2
* metro widget for Dect200
* smartfritz-promise->fritzapi
* running version, tested with 1x DECT200 and Fritzbox FW=6.51 on Win10 with 4.5.0 and raspberry 4.7.0

### 0.0.1
* running version, tested with 1x DECT200 and Fritzbox FW=6.30

## License

The MIT License (MIT)

Copyright (c) 2018 - 2020 foxthefox <foxthefox@wysiwis.net>
