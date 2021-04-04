![Logo](admin/fritzdect_logo.png)
# ioBroker.fritzdect

[![NPM version](http://img.shields.io/npm/v/iobroker.fritzdect.svg)](https://www.npmjs.com/package/iobroker.fritzdect)
[![Downloads](https://img.shields.io/npm/dm/iobroker.fritzdect.svg)](https://www.npmjs.com/package/iobroker.fritzdect)
![Number of Installations (latest)](http://iobroker.live/badges/fritzdect-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/fritzdect-stable.svg)
[![Dependency Status](https://img.shields.io/david/foxthefox/iobroker.fritzdect.svg)](https://david-dm.org/foxthefox/iobroker.fritzdect)
[![Known Vulnerabilities](https://snyk.io/test/github/foxthefox/ioBroker.fritzdect/badge.svg)](https://snyk.io/test/github/foxthefox/ioBroker.fritzdect)

[![NPM](https://nodei.co/npm/iobroker.fritzdect.png?downloads=true)](https://nodei.co/npm/iobroker.fritzdect/)

**Tests:** ![Test and Release](https://github.com/foxthefox/ioBroker.fritzdect/workflows/Test%20and%20Release/badge.svg)

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

  1. Fritzbox returned '00000000' no login possible. possible reasons:

        The fritzbox allows only a limited number of logins in a timeframe. So very fast polling (update) attempts may lead to blocking of logins.
        There are no appropriate user rights set in the fritzbox.
        There is a time elapsing in the fritzbox blocking the logins.
        A german doc is available here: [troubleshooting](./docs/de/troubleshooting.md)

 2. no login to the FritzBox, when using https

      Log messages if the form of:

          { error: { [Error: self signed certificate] code: 'DEPTH_ZERO_SELF_SIGNED_CERT' }

      indicate that there are SSL security problems (certificate). Use the `"strictSSL": false` option (no tick in checkbox) in the admin page of adapter to disable the respective check (experimental). 

## Thermostat
### Fritzbox AHA API
The API of fritzbox has the following access:
* sethkrtsoll
    * 8-28°C for automatic control
    * greater 28°C (254=ON)
    * greater 28°C (255=OFF)

These settings are covered by the hkrmode and the 3 buttons. The activation lasts as long there is no other command or programmed sequence.

Additionally there is the access to:
* windowopenactiv
* boostactive

These are indications as well as commands (sethkrwindowopen,sethkrboost) and when commanded they act with the provided time limit (max. 24h).

### fritzdect implementation
From the above API possibilities the thermostat has different modes in point of view of iobroker.adapter:
* auto (temperature control), to be set by hkrmode (0) or button "setmodeauto" -> the tsoll value will be used!
* night if tsoll = absenk
* comfort if tsoll = komfort
* on (full open), to be set by hkrmode (1) or button "setmodeon"
* off (full close), to be set by hkrmode (2) or button "setmodeoff"
* boost (full open for limited time), detected by feedback boostactive, can be set by boostactive (false->true)
* windowopen (full closed for defined time), detected by feedback windowopenactiv, can be set be windowopenactiv (false->true)
* holiday (temp control), detected by holidayactive
* summer (temp control), detected by summeractive

## ioBroker objects

objects in *italic* are not part of all fritz.box configurations
objects in **bold** are datapoints from the adapter

The datapoints are created on the basis of the returned values of the Fritz AHA API. All groups or devices start wirth "DECT_".

### devices or groups
|Object|Value|settable|Description|DECT2x0|DECT3x0|DECT400|DECT440|DECT500|Blinds|Contact|
|--------|-------|:-:|--------|-----|-----|-----|-----|-----|-----|-----|
|id|text|-|internal id of device|DECT2x0|DECT3x0|DECT400|DECT440|DECT500|Blinds|Contact|
|name|text|-|name of device|DECT2x0|DECT3x0|DECT400|DECT440|DECT500|Blinds|Contact|
|productname|text|-|product name|DECT2x0|DECT3x0|DECT400|DECT440|DECT500|Blinds|Contact|
|manufacturer|text|-|product manufacturer|DECT2x0|DECT3x0|DECT400|DECT440|DECT500|Blinds|Contact|
|fwversion|text|-|product FW version|DECT2x0|DECT3x0|DECT400|DECT440|DECT500|Blinds|Contact|
|mode|text|-|mode, manuell or auto|DECT2x0|DECT3x0| | | | | |
|present|boolean|-|true/false -> connected/not available|DECT2x0|DECT3x0|DECT400|DECT440|DECT500|Blinds|Contact|
|*txbusy*|boolean|-|true/false -> cmd sending active/not active|DECT2x0|DECT3x0|DECT400|DECT440|DECT500|Blinds|Contact|
|*batterylow*|boolean|-|battery status| |DECT3x0|DECT400|DECT440| | |Contact|
|*battery*|number|-|actual capacity in %| |DECT3x0|DECT400|DECT440| | |Contact|
|state|boolean|-/x|true/false |DECT2x0| | | |DECT500|Blinds|Contact|
|power|number|-|actual power in W|DECT2x0| | | | | | |
|energy|number|-|actual energy consumption in Wh|DECT2x0| | | | | | |
|*voltage*|number|-|actual voltage in V|DECT2x0| | | | | | |
|lock|boolean|-|UI/API lock|DECT2x0|DECT3x0| | | | | |
|devicelock|boolean|-|Button lock|DECT2x0|DECT3x0| | | | | |
|*celsius*|number|-|actual temperature in °C|DECT2x0|DECT3x0| |DECT440| | | |
|*offset*|number|-|offset temperature in °C|DECT2x0|DECT3x0| |DECT440| | | |
|*rel_humidity*|number|-|relative humidity %| | | |DECT440| | | |
|tist|number|-|actual temperature in °C| |DECT3x0| | | | | |
|tsoll|number|x|target temperature in °C| |DECT3x0| | | | | |
|komfort|number|-|comfort temperature in °C| |DECT3x0| | | | | |
|absenk|number|-|night temperature in °C| |DECT3x0| | | | | |
|**hkrmode**|array|x| 0=AUTO/1=OFF/2=ON state of thermostat| |DECT3x0| | | | | |
|**lasttarget**|number|-| last target temperature in °C| |DECT3x0| | | | | |
|errorcode|number|-|errorcode| |DECT3x0| | | | | |
|**operationList**|number-|list of possible modes| |DECT3x0| | | | | |
|**operationMode**|number|-|actual mode| |DECT3x0| | | | | |
|*windowopenendtime*|time|-|time when open window status ends| |DECT3x0| | | | | |
|*windowopenactiv*|boolean|x|status and cmd of window open detection| |DECT3x0| | | | | |
|**windowopenactivtime**|number|x|time (minutes) when activation of window open | |DECT3x0| | | | | |
|*boostactive*|boolean|x|boost mode active status and cmd| |DECT3x0| | | | | |
|*boostactiveendtime*|time|-|time when boost status ends| |DECT3x0| | | | | |
|**boostactivtime**|number|x|time (minutes) when activation of boost| |DECT3x0| | | | | |
|**setmodeauto**|number|x|set Auto| |DECT3x0| | | | | |
|**setmodeon**|number|x|set On| |DECT3x0| | | | | |
|**setmodeoff**|number|x|set Off| |DECT3x0| | | | | |
|*summeractive*|boolean|-|summer program status| |DECT3x0| | | | | |
|*holidayactive*|boolean|-|holiday program status| |DECT3x0| | | | | |
|*tchange*|number|-|temp with next change in °C| |DECT3x0| | | | | |
|*endperiod*|time|-|time when next change is active| |DECT3x0| | | | | |
|supported_modes|number|-|supported colormodes| | | | |DECT500| | |
|*fullcolorsupport*|boolean|-|fullcolorsupport| | | | |DECT500| | |
|*mapped*|boolean|-|indication mapped| | | | |DECT500| | |
|*unmapped_hue*|number|-|unmapped hue value| | | | |DECT500| | |
|*unmapped_saturation*|number|-|unmapped saturation value| | | | |DECT500| | |
|current_mode|number|-|actual colormode| | | | |DECT500| | |
|level|number|x|level 0-255 | | | | |DECT500|Blinds| |
|levelpercentage|number|x|level 0-100 % | | | | |DECT500|Blinds| |
|hue|number|x|color 0-359 | | | | |DECT500| | |
|saturation|number|x|saturation 0-100| | | | |DECT500| | |
|temperature|number|x|color temperature (white mode)| | | | |DECT500| | |
|lastpressedtimestamp|time|-|timestamp| | |DECT400|DECT440| | |Contact|
|**blindsopen**|booelan|x|target open| | | | | |Blinds| |
|**blindsclose**|boolean|x|target close| | | | | |Blinds| |
|**blindsstop**|boolean|x|target stop| | | | | |Blinds| |
|lastalertchgtimestamp|time|-|timestamp | | | | | |Blinds| |


### groups
|Object|Value|settable|Description|
|--------|-------|:-:|--------|
|masterdeviceid|text|-|internal id of group|
|members|text|-|member id's of group|
|masterdeviceid|boolean|-|cmd sending active |
|synchronized|boolean|-|devices of group are synchron |

### templates
|Object|Value|settable|Description|
|--------|-------|:-:|--------|
|toggle|boolean|x|toggle switch for template activation|
|lasttemplate|text|-|last confirmed template|


## API limitations
* too many login attempts to FB are refused by providing '00000000' as response
* Boost and WindowOpen can only be set for the next 24h. time=0 is cancelling the command
* updates to the thermostat are within a 15min range, depending on the previous communication of thermostat with fritzbox the next cycle is sooner or later, but definitely not imediately after an ioBroker intervention
* if a windowopenactiv is set on a thermostat, which is part of a group, then the whole group and its thermostats is set to windowopenactiv (function inside the FB)
* only a few color temperatures are accepted (mapped already be the API to valid ones)
* only the predefined colors are valid combinations (getcolordefaults)


## Known Adapter Limitations:
* Not all FW-versions of fritz.box support all objects.
* https (DEPTH_ZERO_SELF_SIGNED_CERT -> strictSSL: false necessary) see above

## TODO:
* map of data input from user to valid predefined colors (nearest match)
* blind alert state -> decode bit array
* improvement of thermostat mode to text representation (auto, off, boost, comfort, night), comfort and night are also auto mode, but preset to the parametrized value

## Changelog
### 2.1.14
* operationmode and hkrmode tracking also after commands
* extended blinds

### 2.1.13
* correction at group of switches (switchtype not recognized -> simpleonoff)
* functionbitmask 32768 moved to role: switches

### 2.1.12 (npm)
* new values for DECT500
* back to full unit testing

### 2.1.11 (npm)
* template for fritzfon

### 2.1.10
* comfort/night is AUTO but reintroduced as operationmode

### 2.1.9
* info to user after start of adapter

### 2.1.8
* simpleonoff plug as device/group/template (telekom)

### 2.1.7 (npm)
* boostactivetime/windowactivetime only value

### 2.1.6
* pbkdf2 hash correction in calculation

### 2.1.5
* pbkdf2 hash correction in output to fritzbox

### 2.1.4
* removed the dependency to vis

### 2.1.3
* presence=0 continue

### 2.1.2
* withoit info.connection

### 2.1.1
* error handling in msgbox

### 2.1.0
* more refactoring => adapter based on class, gitCI instead of travisCI
* new thromastat buttons (setmodeauto, setmodeon,setmodeoff)

### 2.0.0 Breaking Changes in datapoints and structures (npm)
* refactoring of the code
* new fritzapi to either used md5 or pbkf2 decryption, needed for fritzbox FW >7.24
* **usage of AHA API returned values as datapoint identifier**
* **grouping of buttons under the DECT440**
* DECT500 groups
* accepting blocktime from fritzbox
* announcing new detected datapoints delivered by fritzbox
* option strictSSL (experimental)


### 1.1.4 (npm)
* blinds control
* update testing

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

Copyright (c) 2018 - 2021 foxthefox <foxthefox@wysiwis.net>
