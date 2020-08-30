![Logo](admin/mielecloudservice.svg)
# ioBroker.MieleCloudService
![Number of Installations](http://iobroker.live/badges/mielecloudservice-installed.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.mielecloudservice.svg)](https://www.npmjs.com/package/iobroker.mielecloudservice)
![Number of Installations](http://iobroker.live/badges/mielecloudservice-stable.svg)
[![NPM version](https://img.shields.io/npm/v/iobroker.mielecloudservice.svg)](https://www.npmjs.com/package/iobroker.mielecloudservice)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/grizzelbee/iobroker.mielecloudservice/blob/master/LICENSE) 
[![Dependency Status](https://img.shields.io/david/Grizzelbee/iobroker.mielecloudservice.svg)](https://david-dm.org/Grizzelbee/iobroker.mielecloudservice)
[![Known Vulnerabilities](https://snyk.io/test/github/Grizzelbee/ioBroker.mielecloudservice/badge.svg?targetFile=package.json)](https://snyk.io/test/github/Grizzelbee/ioBroker.mielecloudservice?targetFile=package.json)
[![Travis-CI](http://img.shields.io/travis/Grizzelbee/ioBroker.mielecloudservice/master.svg)](https://travis-ci.com/Grizzelbee/ioBroker.mielecloudservice) 
[![NPM](https://nodei.co/npm/iobroker.mielecloudservice.png?downloads=true)](https://nodei.co/npm/iobroker.mielecloudservice/)

## Description
This adapter is for retrieving information about all your Miele@Home devices from the official Miele 3rd-party API. 
Regardless if they are connected directly via WiFi or XGW3000 Gateway. It implements the **Miele 3rd Party API V1.0.3**

## Prerequisites
* Miele@Home User (Smartphone App)
* Miele@Home Password (Smartphone App)
* Miele Client_id (from https://www.miele.com/developer/)
* Miele Client_secret (from https://www.miele.com/developer/ )

## Installation 
To install, do the following:

1. Install via Admin using the 
 * stable Repo - to get the current stable version
 * latest Repo - to get the latest test version (may be not stable)
 * via: https://github.com/Grizzelbee/ioBroker.mielecloudservice.git - to get the latest development version
2. create an App-Account for Miele@Home in the Miele Smartphone App
3. Create a developer account at https://www.miele.com/f/com/en/register_api.aspx 
4. Add your Miele-Devices to the App (if not added automatically)
6. Fill in the client_secret and client_id received from Miele-developer Team and account-id and password from the App.

## Next Steps
* New: (longer) poll interval when no device is active
* New: Sleeptime for complete inactivity (e.g. at night)

## Changelog
### 2.0.0 - Support for Miele API V1.0.3 (2020-08-25)
Some breaking changes in this release. Some datapoints changed their type. May require fixes in scripts. **Update with care!**
Due to the fix that datapoints with invalid values aren't created any longer, I recommend deleting all datapoints in Object view.
* (grizzelbee) Change: New Icon
* (grizzelbee) Fix: Number-datapoints are no longer created as strings due to their unit. They are correct numbers with units now.
* (grizzelbee) Fix: Unit °Celsius is now shown as °C - not longer °Celsius
* (grizzelbee) New: Introduced support for °Fahrenheit
* (grizzelbee) New: Introduced support for new Value "plateStep" for Hobs.
* (grizzelbee) New: Performing a LogOut from Miele API on shutdown to invalidate the Auth-Tokens. 
* (grizzelbee) Fix: Datapoints with invalid values (null/-32768) are no longer created.

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
* (grizzelbee) New: Introduced new boolean state (**signalActionRequired**) that indicates that the machine has finished running, but a human action, like putting the wet clothes to the dryer, ... is needed. State is cleared automatically when the door of the appliance is opened, or it is restarted. State is implemented for washing machines, tumbledryers, washer dryer and dishwashers. **Dosen't work perfectly currently.**  
* (grizzelbee) Upd: Updated Documentation 
* (grizzelbee) Fix: Fixed warnings with js-Controller >=3.0 (Issue #23)

### 1.2.0 (2020-04-18)
* (grizzelbee) New: Added new boolean state (**Connected**) that indicates whether the device is connected to WLAN or a gateway.
* (grizzelbee) New: Added new boolean state (**signalInUse**) that indicates whether the device is switched off (false) or in Use (true).
* (grizzelbee) Change: replaced the deprecated http-library **request** with **axios** 
* (grizzelbee) Change: Made functions communicating with API asynchronus 
  
### 1.1.0 (2020-03-07)
* (grizzelbee) New: Added Actions - Implemented all currently supported and documented Actions for all devices
               Please remember that Actions will only work if you put your device into the appropiate state (e.g. Mobile Control)
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
* (grizzelbee) Fixes in environment for getting Adapater into the Repo
* (grizzelbee) Passwords are stored encyrpted now

### 1.0.0 (2020-02-03)
* (grizzelbee) renamed to MieleCloudService to get the ability to publish; the old Name is still blocked by hash99
* (grizzelbee) Rewritten adapter from scratch - therefor it's incompatible with prior versions and needs to be installed freshly. 
* (grizzelbee) Fix: fixed all build-errors
* (grizzelbee) Fix: Fixed "NRefreshToken is not a function"-Bug 
* (grizzelbee) Chg: removed Push-API checkbox (may be introduced newly when API supports this)
* (grizzelbee) Chg: New Icon
* (grizzelbee) New: added support for Non german Miele-Accounts (ALL should be included)
* (grizzelbee) Completely new layout of datapoints
* (grizzelbee) Devicetypes are grouped now 

### 0.9.1 (2019-07-26)
* (grizzelbee) Fix: Fixed small bug introduced in V0.9.0 throwing an exception in debugging code

### 0.9.0 (2019-07-26)
* (grizzelbee) Upd: New versioning due to completeness and stability of the adapter (about 90%)
* (grizzelbee) New: make poll interval configurable  (currently 1,2,3,4,5,7,10,15 Minutes)
* (grizzelbee) Fix: fixed ESLint config
* (grizzelbee) Upd: Changed order of config fields in UI
* (grizzelbee) New: Set 5 Minutes poll interval and english response language as default to get initial values 
* (grizzelbee) New: Parent-Datapoint of timevalues will be used to get a pretty readable time in the format h:mm. The deeper datapoints 0 and 1 will still be updated, but his will be removed in a future version to reduce workload.  

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

## Documentation
Please mainly refer to the main API documentation published by Miele
* [General Documentation](https://www.miele.com/developer/swagger-ui/index.html)
* [Preconditions to perform an action on a device](https://www.miele.com/developer/swagger-ui/put_additional_info.html) 

There are some datapoints avaliable in 2 kinds. As a human readable text and as a number.
These numeric datafields belonging to a textfield have the same name but a "_raw" appended. 
Those fields which have a general meaning are listed below.
The fields which aren't listed vary in their meaning from device to device and aren't decumented by Miele.
If you need to refer in scripts to these fields, always use the _raw values. 
The textvalues may change in the future and also depend on the language.
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
| 27 | "Imprägnieren"  /     | Washing Machine |
| 48 | "Flusen ausspülen"| Washer Dryer |
| 50 | "Dunkle Wäsche"/ | Washer Dryer |
|123 | "Dunkles / Jeans"  |   Washing Machine |

### ProgramPhase

| Raw value | State| avaliable for |
|----------|-------|---------------|
|260 | "Waschen" / "Washing"  | Washing Machine |
|261 | "Spülen"  / "Rinse"    | Washing Machine |
|266 | "Schleudern" / "Spinning"| Washing Machine |
|267 | "Knitterschutz" / ""| Washing Machine |
|268 |  "Ende" / "End"| Most devices |
|256 | "" | | |
|514 | "Trocknen" | Washer Dryer |
|519 | "Abkühlen" | Washer Dryer |
|532 | "Flusen ausspülen" | Washer Dryer |

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
