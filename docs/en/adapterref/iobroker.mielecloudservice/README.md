![Logo](admin/mielecloudservice.svg)
# ioBroker.MieleCloudService
![Number of Installations](http://iobroker.live/badges/mielecloudservice-installed.svg)
![Number of Installations](http://iobroker.live/badges/mielecloudservice-stable.svg)
[![NPM version](https://img.shields.io/npm/v/iobroker.mielecloudservice.svg)](https://www.npmjs.com/package/iobroker.mielecloudservice)
[![Known Vulnerabilities](https://snyk.io/test/github/Grizzelbee/ioBroker.mielecloudservice/badge.svg?targetFile=package.json)](https://snyk.io/test/github/Grizzelbee/ioBroker.mielecloudservice?targetFile=package.json)
[![Travis-CI](http://img.shields.io/travis/Grizzelbee/ioBroker.mielecloudservice/master.svg)](https://travis-ci.com/Grizzelbee/ioBroker.mielecloudservice) 
[![NPM](https://nodei.co/npm/iobroker.mielecloudservice.png?downloads=true)](https://nodei.co/npm/iobroker.mielecloudservice/)

[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/grizzelbee/iobroker.mielecloudservice/blob/master/LICENSE) 
[![Downloads](https://img.shields.io/npm/dm/iobroker.mielecloudservice.svg)](https://www.npmjs.com/package/iobroker.mielecloudservice)

## Description
This adapter is for retrieving information about all your Miele@Home devices from the official Miele 3rd-party API. 
Regardless if they are connected directly via Wi-Fi or XGW3000 Gateway. It implements the **Miele 3rd Party API V1.0.4**

## Prerequisites
* Miele@Home User (Smartphone App)
* Miele@Home Password (Smartphone App)
* Miele Client_id (from https://www.miele.com/developer/)
* Miele Client_secret (from https://www.miele.com/developer/ )

## Installation 
To install, do the following:

1. Install via Admin using the 
 * stable Repo - to get the current stable version
 * latest Repo - to get the latest test version (maybe not stable)
 * via: https://github.com/Grizzelbee/ioBroker.mielecloudservice.git - to get the latest development version
2. create an App-Account for Miele@Home in the Miele Smartphone App
3. Create a developer account at https://www.miele.com/f/com/en/register_api.aspx 
4. Add your Miele-Devices to the App (if not added automatically)
6. Fill in the client_secret and client_id received from Miele-developer Team and account-id and password from the App.

## Controlling your devices
All currently supported and documented Actions for all devices are implemented (API V1.0.4).
> Please remember that Actions will only work if you put your device into the appropriate state (e.g. Mobile Control, powerOn, ...).
Please refer to [Miele-Documentation](#documentation) for more Information on actions.

## Known Issues
* none

## Documentation
Please mainly refer to the main API documentation published by Miele
* [General Documentation](https://www.miele.com/developer/swagger-ui/index.html)
* [Preconditions to perform an action on a device](https://www.miele.com/developer/swagger-ui/put_additional_info.html) 

There are some data points available in 2 kinds. As a human-readable text and as a number.
These numeric data fields belonging to a text field have the same name, but a "_raw" appended. 
Those fields which have a general meaning are listed below.
The fields which aren't listed vary in their meaning from device to device and are not documented by Miele.
If you need to refer in scripts to these fields, always use the _raw values. 
The text values may change in the future and also depend on the language.
Here is a list of what these raw values stand for: 

### DeviceTypes

 | Raw value | State|
 |----------|-------|
 |1 | WASHING MACHINE|
 |2 | TUMBLE DRYER|
 |7 | DISHWASHER|
 |8 | DISHWASHER SEMI-PROF|
 |12 | OVEN|
 |13 | OVEN MICROWAVE|
 |14 | HOB HIGHLIGHT|
 |15 | STEAM OVEN|
 |16 | MICROWAVE|
 |17 | COFFEE SYSTEM|
 |18 | HOOD|
 |19 | FRIDGE|
 |20 | FREEZER|
 |21 | FRIDGE-/FREEZER COMBINATION|
 |23 | VACUUM CLEANER, AUTOMATIC ROBOTIC VACUUM CLEANER|
 |24 | WASHER DRYER|
 |25 | DISH WARMER|
 |27 | HOB INDUCTION|
 |28 | HOB GAS|
 |31 | STEAM OVEN COMBINATION|
 |32 | WINE CABINET|
 |33 | WINE CONDITIONING UNIT|
 |34 | WINE STORAGE CONDITIONING UNIT|
 |39 | DOUBLE OVEN|
 |40 | DOUBLE STEAM OVEN|
 |41 | DOUBLE STEAM OVEN COMBINATION|
 |42 | DOUBLE MICROWAVE|
 |43 | DOUBLE MICROWAVE OVEN|
 |45 | STEAM OVEN MICROWAVE COMBINATION|
 |48 | VACUUM DRAWER|
 |67 | DIALOGOVEN|
 |68 | WINE CABINET FREEZER COMBINATION| 


### State/Status

 | Raw value | State|
 |----------|-------|
|1| OFF|
 |2|   STAND_BY|
 |3|   PROGRAMMED|
 |4|   PROGRAMMED_WAITING_TO_START|
 |5|   RUNNING|
 |6|   PAUSE|
 |7|   END_PROGRAMMED|
 |8|   FAILURE|
 |9|   PROGRAMME_INTERRUPTED|
 |10|  IDLE|
 |11|  RINSE_HOLD|
 |12|  SERVICE|
 |13|  SUPERFREEZING|
 |14|  SUPERCOOLING|
 |15|  SUPERHEATING|
 |144| DEFAULT|
 |145| LOCKED|
 |146| SUPERCOOLING_SUPERFREEZING|
 |255| Device offline|

### ProgramType/Programmart

| Raw value | State|
|----------|-------|
|0 | Normal operation mode  |
|1 | Own program            |
|2 | Automatic program      |
|3 | Cleaning-/Care program |

### dryingStep/Trockenstufe

 | Raw value | State|
 |----------|-------|
 |0 |   Extra dry|
 |1 |   Normal Plus|
 |2 |   Normal|
 |3 |   Slightly Dry|
 |4 |   Hand iron level 1|
 |5 |   Hand iron level 2|
 |6 |   Machine iron|

### ProgramBezeichnung

| Raw value | State| avaliable for |
|----------|-------|---------------|
|  1 | "Baumwolle" / "Cotton"  | Washing Machine |
| 23 | "Oberhemden" /  | Washing Machine |
| 27 | "Imprägnieren"  /     | Washing Machine |
| 48 | "Flusen ausspülen"| Washer Dryer |
| 50 | "Dunkle Wäsche" / | Washer Dryer |
| 122 | "Express 20" / | Washer Dryer |
| 123 | "Dunkles / Jeans"  |   Washing Machine |

### ProgramPhase

| Raw value | State| avaliable for |
|----------|-------|---------------|
|260 | "Waschen" / "Washing"  | Washing Machine |
|261 | "Spülen"  / "Rinse"    | Washing Machine |
|266 | "Schleudern" / "Spinning"| Washing Machine |
|267 | "Knitterschutz" / ""| Washing Machine |
|268 |  "Ende" / "End"| Most devices |
|256 | "Vorbügeln" | Washing Machine |
|514 | "Trocknen" | Washer Dryer |
|519 | "Abkühlen" | Washer Dryer |
|532 | "Flusen ausspülen" | Washer Dryer |

## Changelog
### 4.0.0 (2021-03-18) (Symphony of life)
> ***Hint:*** The adapter received a complete code refactoring! This means that most of the code has been changed and some parts are working now differently than ever before. Update with care and read the change log!
*  (grizzelbee) New: FULL support of Miele cloud API v1.0.4
*  (grizzelbee) Upd: [83](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/83) estimatedEndTime isn't shown anymore after the device has finished
*  (grizzelbee) Upd: [85](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/85) full code refactoring and split into multiple files. 
*  (grizzelbee) Upd: [86](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/86) every folder and device now gets a nice little icon
*  (grizzelbee) Upd: [89](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/89) Washer dryers are fully supported now
*  (grizzelbee) Upd: [90](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/90) implemented targetTemperature for fridges & freezers
*  (grizzelbee) Upd: Devices get fully created on startup and aren't modified afterwards - only updated
*  (grizzelbee) Upd: New folder ecoFeedback to group ecoFeedback states 
*  (grizzelbee) Upd: New folder IDENT to group ident states
*  (grizzelbee) Upd: Removed signalActionRequired - since there is no signalDoor for washing machines, dryers and dishwashers this approach doesn't work
*  (grizzelbee) Upd: All folders and states which are being created depend on the capabilities of their devices as described in [this Miele documentation](https://www.miele.com/developer/assets/API_V1.x.x_capabilities_by_device.pdf). So there shouldn't be useless states anymore caused by the generic Miele cloud API.

### 3.0.2 (2021-03-05)
*  (grizzelbee) Fix: [79](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/79) When a devices serial is missing, the identNumber is assigned instead.
*  (grizzelbee) Upd: Changed folder name cooktops to hobs since this is the more common name
*  (grizzelbee) Upd: added PowerOn/Off buttons for Coffee-systems & hoods
*  (grizzelbee) Upd: [74](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/74) testing actions better before sending to permit errors

### 3.0.1 (2021-02-25)
> *Hint:* Action_Information and Action_Status objects are created on first action execution and contain infos to the last executed action.
> Please take care of notes regarding [Controlling your devices](#Controlling your devices).
*  (grizzelbee) Upd: Improved logging in some parts - objects get stringified.
*  (grizzelbee) Fix: [74](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/74) Actions are working again
*  (grizzelbee) Upd: Actions are tested before sending whether they are permitted in current device state
*  (grizzelbee) Upd: estimatedEndTime doesn't show seconds anymore
*  (grizzelbee) Upd: Improved documentation
*  (grizzelbee) Upd: removed unused function decrypt
*  (grizzelbee) Upd: removed superfluent parameters


### 3.0.0 (2021-02-18)
> Hint: ecoFeedback objects are created on the first run of the device. This allows to only create them, when they contain data.
*  (grizzelbee) New: BREAKING CHANGE: Making use of build-in password de-/encryption. This raises the need to re-enter your passwords again, because the old ones can't be decrypted anymore.
*  (grizzelbee) New: [70](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/70) Implements Miele API 1.0.4
*  (grizzelbee) New: [64](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/64) Introduces data point estimatedFinishingTime
*  (grizzelbee) New: [54](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/54) Poll interval can now freely be selected in seconds and minutes
*  (grizzelbee) Upd: [73](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/73) BREAKING CHANGE: Removed white-spaces from any ID in device tree. This creates completely new device trees. So please delete the old ones.
*  (grizzelbee) Upd: removed david-dm badge
*  (grizzelbee) Upd: updated dependencies
*  (grizzelbee) Fix: added passwords to encryptedNative
*  (grizzelbee) Fix: added passwords to protectedNative
*  (grizzelbee) Fix: [63](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/63) added missing info.connection object to io-package
*  (grizzelbee) Fix: [63](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/63) Fixed new Warnings introduced with js-controller 3.2
*  (grizzelbee) Fix: [74](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/74) Light-Actions should work now

### 2.0.3 (2020-09-15)
* (grizzelbee) Upd: Updated country list in config dialog
* (grizzelbee) New: Some more debug code

### 2.0.2 (2020-09-15)
* (grizzelbee) New: Added some debug Code to find an Error
* (grizzelbee) Fix: fixed error on failed authentication preventing a valid error message

### 2.0.1 (2020-09-14)
* (grizzelbee) New: Added some debug Code to find an Error
* (grizzelbee) Fix: fixed error on logout while invalidating token

### 2.0.0 - Support for Miele API V1.0.3 (2020-08-25)
Some breaking changes in this release. Some data points changed their type. May require fixes in scripts. **Update with care!**
Due to the fix that data points with invalid values aren't created any longer, I recommend deleting all data points in Object view.
* (grizzelbee) Change: New Icon
* (grizzelbee) Fix: Number-data points are no longer created as strings due to their unit. They are correct numbers with units now.
* (grizzelbee) Fix: Unit °Celsius is now shown as °C - not longer °Celsius
* (grizzelbee) New: Introduced support for °Fahrenheit
* (grizzelbee) New: Introduced support for new Value "plateStep" for Hobs.
* (grizzelbee) New: Performing a LogOut from Miele API on shutdown to invalidate the Auth-Tokens.
* (grizzelbee) Fix: Data points with invalid values (null/-32768) are no longer created.

### 1.2.4 (2020-06-09)
* (grizzelbee) Fix: fixed No-Data Bug (introduced in V1.2.3)

### 1.2.3 (2020-06-07)
* (grizzelbee) Upd: fixed snyk badge
* (grizzelbee) Upd: Improved error handling

### 1.2.2 (2020-05-23)
* (grizzelbee) Upd: removed node 8 from testing on travis.com
* (grizzelbee) Fix: signalActionRequired should work better now
* (grizzelbee) Upd: Updated documentation
* (grizzelbee) Upd: Improved error handling in function APISendRequest
* (grizzelbee) Fix: Moved testing of Config to On(Ready) and fixed unit tests with this.

### 1.2.1 (2020-04-22)
* (grizzelbee) New: Introduced new boolean state (**signalActionRequired**) that indicates that the machine has finished running, but a human action, like putting the wet clothes to the dryer, ... is needed. State is cleared automatically when the door of the appliance is opened, or it is restarted. State is implemented for washing machines, tumble dryers, washer dryer and dishwashers. **Doesn't work perfectly currently.**
* (grizzelbee) Upd: Updated Documentation
* (grizzelbee) Fix: Fixed warnings with js-Controller >=3.0 (Issue #23)

### 1.2.0 (2020-04-18)
* (grizzelbee) New: Added new boolean state (**Connected**) that indicates whether the device is connected to WLAN or a gateway.
* (grizzelbee) New: Added new boolean state (**signalInUse**) that indicates whether the device is switched off (false) or in Use (true).
* (grizzelbee) Change: replaced the deprecated http-library **request** with **axios**
* (grizzelbee) Change: Made functions communicating with API asynchronous

### 1.1.0 (2020-03-07)
* (grizzelbee) New: Added Actions - Implemented all currently supported and documented Actions for all devices.
> Please remember that Actions will only work if you put your device into the appropriate state (e.g. Mobile Control)
please refer to [Miele-Documentation](#documentation) for more Information on actions.

### 1.0.5 (2020-02-14)
* (grizzelbee) removed node-schedule as a dependency
* (grizzelbee) implemented scheduling via setTimeout, which raises the opportunity
  to schedule with less than a minute in the future

### 1.0.4 (2020-02-12)
* (grizzelbee) removed unneeded setTimeout from main
* (grizzelbee) Clearing scheduler on unload of adapter
* (grizzelbee) Minor updates and fixed typos in Readme

### 1.0.3 (2020-02-06)
* (grizzelbee) removed an overseen logging of Passwords
* (grizzelbee) Fixed createTemperatureDatapoint to work with less than 3 values delivered from API
* (grizzelbee) Added some documentation
* (grizzelbee) Started implementation of DeviceActions


### 1.0.2 (2020-02-05)
* (grizzelbee) removed any logging of Passwords
* (grizzelbee) Fixed bug in config interface introduced during password encryption that config values aren't loaded properly

### 1.0.1 (2020-02-04)
* (grizzelbee) Fixes in environment for getting adapter into the Repo
* (grizzelbee) Passwords are stored encrypted now

### 1.0.0 (2020-02-03)
* (grizzelbee) renamed to MieleCloudService to get the ability to publish; the old Name is still blocked by hash99
* (grizzelbee) Rewritten adapter from scratch - therefore it's incompatible with prior versions and needs to be installed freshly.
* (grizzelbee) Fix: fixed all build-errors
* (grizzelbee) Fix: Fixed "NRefreshToken is not a function"-Bug
* (grizzelbee) Chg: removed Push-API checkbox (maybe introduced newly when API supports this)
* (grizzelbee) Chg: New Icon
* (grizzelbee) New: added support for non-german Miele-Accounts (ALL should be included)
* (grizzelbee) Complete new layout of data points
* (grizzelbee) Device types are grouped now

### 0.9.1 (2019-07-26)
* (grizzelbee) Fix: Fixed small bug introduced in V0.9.0 throwing an exception in debugging code

### 0.9.0 (2019-07-26)
* (grizzelbee) Upd: New versioning due to completeness and stability of the adapter (about 90%)
* (grizzelbee) New: make poll interval configurable  (currently 1,2,3,4,5,7,10,15 Minutes)
* (grizzelbee) Fix: fixed ESLint config
* (grizzelbee) Upd: Changed order of config fields in UI
* (grizzelbee) New: Set 5 Minutes poll interval and english response language as default to get initial values
* (grizzelbee) New: Parent-Datapoint of time values will be used to get a pretty readable time in the format h:mm. The deeper datapoints 0 and 1 will still be updated, but his will be removed in a future version to reduce workload.

### 0.0.5 (2019-07-25)
* (grizzelbee) Upd: some code maintenance
* (grizzelbee) New: added reply-language to config
  - Miele API is currently able to reply in German or English, now you can choose.
* (grizzelbee) New: created new Icon
* (grizzelbee) Fix: fixed translation issues and translated adapter UI using gulp
* (grizzelbee) Upd: Made changes to travis requested by apollon77

### 0.0.4
* (hash99) add devices configuration

### 0.0.3
* (hash99) adapter conform

### 0.0.1
* (hash99) initial release

## License
The MIT License (MIT)

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

## Copyright
Copyright (c) 2019, 2020 grizzelbee <hanjo@hingsen.de>
