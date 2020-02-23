![Logo](admin/roomba.png)
# ioBroker.roomba
Connect your iRobot Roomba to ioBroker.

Based on the dorita980 library https://github.com/koalazak/dorita980#readme

[![Number of Installations](http://iobroker.live/badges/roomba-installed.svg)](http://iobroker.live/badges/roomba-installed.svg)
[![Stable Version](http://iobroker.live/badges/roomba-stable.svg)](http://iobroker.live/badges/roomba-stable.svg)
[![NPM Version](http://img.shields.io/npm/v/iobroker.roomba.svg)](https://www.npmjs.com/package/iobroker.roomba)
[![Commits since last release](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.roomba/latest.svg)](https://github.com/iobroker-community-adapters/ioBroker.roomba/releases/latest)
[![Travis CI](https://travis-ci.com/iobroker-community-adapters/ioBroker.roomba.svg?branch=master)](https://travis-ci.com/iobroker-community-adapters/ioBroker.roomba)
[![Downloads](https://img.shields.io/npm/dm/iobroker.roomba.svg)](https://www.npmjs.com/package/iobroker.roomba)

[![NPM](https://nodei.co/npm/iobroker.roomba.png?downloads=true)](https://nodei.co/npm/iobroker.roomba/)

**Table of contents**
1. [Features](#features)
2. [Installation](#installation)
3. [Setup instructions](#setup-instructions)
4. [Supported Roomba's / Firmware versions](#supported-roombas--firmware-versions)
5. [Channels & States](#channels--states)
6. [Description of Preferences (incomplete)](#description-of-preferences-incomplete)
7. [Smart Home / Alexa integration using ioBroker.javascript](#smart-home--alexa-integration-using-iobrokerjavascript)
8. [Changelog](#changelog)
9. [Credits](#credits)
10. [Licence](#license)


## Features
The following features come with this adapter:
- __Send commands__ (`start`, `stop`, `resume`, `pause`, `dock`) to your Roomba
- Retrieve __device states__, such as battery, docked, full / inserted bin (see [Channels & States](#channels--states) for full list)
- Retrieve __device configuration__, such as preferences, network or schedule settings (see [Channels & States](#channels--states) for full list)
- Retrieve __device statistics__, such as total missions, hours on docking station, etc. (see [Channels & States](#channels--states) for full list)
- Retrieve information about __current mission__ (when your Roomba is cleaning), such as start and end time, total runtime, sqm cleaned, etc. (only on supported Roomba\'s see [Supported Roomba's / Firmware versions](#supported-roombas--firmware-versions))
- __Draw map based on the mission data__ received (only on supported Roomba\'s)
- __Web Interface__ that shows the status and map of the current as well as previous / archived missions: 
  ![Roomba Interface](img/roomba.interface.png)


## Installation
ioBroker.roomba needs [canvas](https://www.npmjs.com/package/canvas) in order to draw maps of the Roomba missions. ioBroker will try to install this dependency with ioBroker.roomba installation.

Though, you probably have to install package dependencies of canvas (and canvas itself) with the following command:

### Linux
```
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

Furthermore, run the following command __in the ioBroker.roomba directory__ (`/opt/iobroker/node_modules/iobroker.roomba`):

```
sudo npm install canvas --unsafe-perm=true
```

### Windows
1. Make sure you have `node-gyp` installed via
   ```
   npm install -g node-gyp
   ```
   
2. Make sure you have build essentials installed via
   ```
   npm install --global --production windows-build-tools
   ```
   
3. Download GTK 2 (for [Win32](http://ftp.gnome.org/pub/GNOME/binaries/win32/gtk+/2.24/gtk+-bundle_2.24.10-20120208_win32.zip) or [Win64](http://ftp.gnome.org/pub/GNOME/binaries/win64/gtk+/2.22/gtk+-bundle_2.22.1-20101229_win64.zip)) and unzip it (e.g. to `C:\path\to\GTK2`)
4. Run 
   ```
   node-gyp rebuild --GTK_Root=C:\path\to\GTK2
   ```
5. Install canvas from within the iobroker.roomba folder
   ```
   cd C:\path\to\iobroker\node_modules\iobroker.roomba
   npm install canvas
   ```

For details, see https://github.com/Automattic/node-canvas/wiki/Installation:-Windows.


## Setup instructions
### Automated setup
To automatically setup ioBroker.roomba following the instructions in the admin panel of ioBroker.roomba.

**ATTENTION**: The authentication credentials are not the same as you are using in the smartphone app!

1. Make sure the ioBroker.roomba adapter is started.
2. Make sure your robot is on the Home Base and powered on (green lights on).
3. Then press and hold the HOME button on your robot until it plays a series of tones (about 2 seconds).
4. Release the button and your robot will flash WIFI light.
5. Then come back here press the button to retrieve IP and credentials.

If the automated process fails retrieving your credentials, please use the manual setup.

### Manual setup
For manual setup see https://github.com/koalazak/dorita980#how-to-get-your-usernameblid-and-password.


## Supported Roomba's / Firmware versions
### Supported Firmware versions
| Software-Version | Firmware Info | Supported |
| ---------------- | ------------- | --------- |
| v1.4 | [Release Notes](https://homesupport.irobot.com/app/answers/detail/a_id/19549#rn_PageTitle) | ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) **supported (![#c5f015](https://placehold.it/15/c5f015/000000?text=+) incl. map)** |
| v2.4.6-x | [Release Notes](https://homesupport.irobot.com/app/answers/detail/a_id/529#rn_PageTitle) | ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) **supported (![#c5f015](https://placehold.it/15/c5f015/000000?text=+) incl. map)** |
| v3.2.xx | [Release Notes](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle)  | ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) **supported** (![#f03c15](https://placehold.it/15/f03c15/000000?text=+) NO map) |

### Supported Roomba's

| Serie | Models _(incomplete)_ | Software-Version | Firmware Info | Supported |
| ----- | --------------------- | ---------------- | ------------- | --------- |
| Roomba® 6xx | 605, 606, 612, 616, 671, 676, 680, 696 | v3.2.40 | [Release Notes](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle)  | (most likely) |
| Roomba® 6xx | 675, [690](https://github.com/koalazak/dorita980/issues/71#issuecomment-513043465) | v3.2.40 | [Release Notes](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle)  | ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) **supported** (![#f03c15](https://placehold.it/15/f03c15/000000?text=+) NO map) |
| Roomba® 7xx | 774, 785, | - | | ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) _Model does not offer Wifi connectivity, thus no support_ |
| Roomba® 8xx | 880, 886, 891, 896 | - | [Release Notes](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle) | (most likely) |
| Roomba® 8xx | [895]((https://forum.iobroker.net/post/245274)) | v3.2.10 / 40 / 69 | [Release Notes](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle) | ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) **supported** (![#f03c15](https://placehold.it/15/f03c15/000000?text=+) NO map) |
| Roomba® 9xx | 965, 981 | - | [Release Notes](https://homesupport.irobot.com/app/answers/detail/a_id/529#rn_PageTitle) | (most likely) |
| Roomba® 9xx | [960](https://forum.iobroker.net/user/jb_sullivan), [966](https://forum.iobroker.net/user/thomaslpz), 980 | v2.4.6-3 | [Release Notes](https://homesupport.irobot.com/app/answers/detail/a_id/529#rn_PageTitle) | ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) **supported (incl. map)** |
| Roomba® i | [i7 (7150)](https://forum.iobroker.net/post/240589), i7+ (7550) | v1.4 | [Release Notes](https://homesupport.irobot.com/app/answers/detail/a_id/19549#rn_PageTitle) | ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) **supported (incl. map)** |
| Roomba® e5 | [e5](https://forum.iobroker.net/topic/7657/irobot-roomba-adapter/158) | v3.4.42 | [Release Notes](https://homesupport.irobot.com/app/answers/detail/a_id/6345#rn_PageTitle) | ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) **supported** (![#f03c15](https://placehold.it/15/f03c15/000000?text=+) NO map) |
| Roomba® s | [S9+](https://github.com/Zefau/ioBroker.roomba/issues/34) | v3.2.4 | [Release Notes](https://homesupport.irobot.com/app/answers/detail/a_id/26887/kw/s9%2B#rn_PageTitle) | ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) **supported (incl. map)** |

Please help us regarding the supported devices and let me [know via an issue](https://github.com/iobroker-community-adapters/ioBroker.roomba/issues), whether your Roomba model is supported!


## Channels & States
After sucessful setup the following channels and states will be created:

| Channel | Folder | State | Description |
| ------- | ------ | ----- | ----------- |
| cleaning | - | - | Commands and information regarding cleaning process |
| cleaning | last | - | Last commands sent to robot |
| cleaning | last | command | Last command sent to robot |
| cleaning | last | timestamp | Timestamp last command was sent |
| cleaning | last | datetime | DateTime last command was sent |
| cleaning | last | initiator | Initiator of last command |
| cleaning | last | cycle | Cycle |
| cleaning | last | phase | Phase |
| cleaning | last | error | Indicates an error during last mission |
| cleaning | schedule | - | Schedule information |
| cleaning | schedule | cycle | Schedule cycle (Sunday to Saturday) |
| cleaning | schedule | hours | Hour to start cycle (Sunday to Saturday) |
| cleaning | schedule | minutes | Minute to start cycle (Sunday to Saturday) |
| cleaning | - | dock | Send the robot to the docking station |
| cleaning | - | pause | Pause the current cleaning process |
| cleaning | - | resume | Resume the current cleaning process |
| cleaning | - | start | Start a cleaning process |
| cleaning | - | stop | Stop the current cleaning process |
| device | - | - | Device information |
| device | network | - | Network information |
| device | network | dhcp | State whether DHCP is activated |
| device | network | router | Mac address of router |
| device | network | ip | IP address |
| device | network | subnet | Subnet adress |
| device | network | gateway | Gateway address |
| device | network | dns1 | Primary DNS address |
| device | network | dns2 | Secondary DNS address |
| device | preferences | - | Set preferences |
| device | preferences | binPause | **UNKNOWN** |
| device | preferences | carpetBoostAuto | Automatic: Roomba will automatically boost its vacuum power to deep clean carpets. |
| device | preferences | carpetBoostHigh |Performance Mode: Roomba will always boost its vacuum to maximise cleaning performance on all floor surfaces. |
| device | preferences | ecoCharge | **UNKNOWN** |
| device | preferences | noAutoPasses | One Pass: Roomba will cover all areas with a single cleaning pass. |
| device | preferences | noPP | **UNKNOWN** |
| device | preferences | openOnly | **UNKNOWN** |
| device | preferences | schedHold | **UNKNOWN** |
| device | preferences | twoPass | Roomba will cover all areas a second time. This may be helpful in homes with pets or for occasional deep cleaning. |
| device | versions | - | Version information |
| device | versions | hardwareRev | Hardware Revision |
| device | versions | batteryType | Battery Type |
| device | versions | soundVer | **UNKNOWN** |
| device | versions | uiSwVer | **UNKNOWN** |
| device | versions | navSwVer | **UNKNOWN** |
| device | versions | wifiSwVer | **UNKNOWN** |
| device | versions | mobilityVer | **UNKNOWN** |
| device | versions | bootloaderVer | Bootloader Version |
| device | versions | umiVer | **UNKNOWN** |
| device | versions | softwareVer | Software Version |
| device | - | \_rawData | Raw preferences data as json |
| device | - | mac | Mac address of the robot |
| device | - | name | Name of the robot |
| device | - | type | Type of the robot |
| states | - | - | Status information |
| states | - | \_connected | Connection state |
| states | - | battery | Battery level of the robot |
| states | - | binFull | State whether bin status is full |
| states | - | binInserted | State whether bin is inserted |
| states | - | docked | State whether robot is docked |
| states | - | signal | Signal strength |
| states | - | status | Current status of the robot |
| statistics | - | - | Statistic Information |
| statistics | missions | - | Mission Statistics |
| statistics | missions | failed | Number of failed cleaning jobs |
| statistics | missions | succeed | Number of successful cleaning jobs |
| statistics | missions | total | Number of cleaning jobs |
| statistics | time | - | Time Statistics |
| statistics | time | avgMin | **UNKNOWN** |
| statistics | time | hOnDock | **UNKNOWN** |
| statistics | time | nAvail | **UNKNOWN** |
| statistics | time | estCap | **UNKNOWN** |
| statistics | time | nLithChrg | **UNKNOWN** |
| statistics | time | nNimhChrg | **UNKNOWN** |
| statistics | time | nDocks | **UNKNOWN** |
| - | - | refreshedDateTime | DateTime of last update |
| - | - | refreshedTimestamp | Timestamp of last update |


## Description of Preferences _(incomplete)_
The following payload will be received when calling ```getPreferences()``` (see https://github.com/koalazak/dorita980#getpreferences):

| Object | Index | Type | Description | ioBroker State |
| ------ | ----- | ---- | ----------- | -------------- |
| netinfo | - | object | Network Information of the Roomba connection | - |
| netinfo | .dhcp | boolean | State whether DHCP is activated | device.network.dhcp |
| netinfo | .addr | ip | IP address | device.network.ip |
| netinfo | .mask | ip | Subnet adress | device.network.subnet |
| netinfo | .gw | ip | Gateway address | device.network.gateway |
| netinfo | .dns1 | ip | Primary DNS address | device.network.dns1 |
| netinfo | .dns2 | ip | Secondary DNS address | device.network.dns2 |
| netinfo | .bssid | mac | Mac address of router | device.network.router |
| netinfo | .sec | integer | Unknown | _(not mapped)_ |
| wifistat | - | object | Unknown | - |
| wifistat | .wifi | integer | Unknown | _(not mapped)_ |
| wifistat | .uap | boolean | Unknown | _(not mapped)_ |
| wifistat | .cloud | integer | Unknown | _(not mapped)_ |
| wlcfg | - | object | Unknown | - |
| wlcfg | .sec | integer | Unknown | _(not mapped)_ |
| wlcfg | .ssid | string | Unknown | _(not mapped)_ |
| mac | - | mac | Mac address of Roomba | - |
| country | - | string | Unknown | - |
| cloudEnv | - | string | Unknown | - |
| svcEndpoints | .svcDeplId | string | Unknown | - |
| mapUploadAllowed | - | boolean | Unknown | - |
| localtimeoffset | - | integer | Unknown | - |
| ... | - | ... | ... | - |

Please help us regarding the description of the preferences. If you know the meaning of preferences stated as unknown in the table, let me [know their meaning via an issue](https://github.com/iobroker-community-adapters/ioBroker.roomba/issues)!


## Smart Home / Alexa integration using ioBroker.javascript
### Send Map via Telegram when mission is finished
This requires the ioBroker adapter ioBroker.telegram to be installed (https://github.com/ioBroker/ioBroker.telegram).

Create a script in the "common" folder of ioBroker.javascript and add the following listener to it:

```javascript
var _fs = require('fs');

/*
 * MISSION END: Send map
 * 
 */
var message = "%device.name% finished at %missions.current.endedDateTime% cleaning %missions.current.sqm% sqm in %missions.current.runtime% seconds (%missions.current.error% errors).";
var ns = 'roomba.0';
var imagePath = 'tmp/';

on({id: ns + '.missions.current.ended', change: 'any'}, function(obj)
{
    if (!obj.state || !obj.state.val) return;
    
    // replace variables with state values
    var pos, variable, state, value;
    while (message.indexOf('%') > -1)
    {
        pos = message.indexOf('%');
        variable = message.substring(pos, message.indexOf('%', pos+1)+1);
        state = getState(ns + '.' + variable.replace(/%/g, ''));
        
        if (state !== null && state.val !== null)
            value = state.val
        else
        {
            log('State ' + variable.replace(/%/g, '') + ' not found!', 'warn');
            value =  '';
        }

        if (typeof value === "boolean") value = value === true ? 'with' : 'no';
        message = message.replace(RegExp(variable, 'gi'), value);
    }
    
    // console
    log(message);
    
    // get image
    var img = getState(ns + '.missions.current.mapImage').val;

    if (img !== null && img.indexOf('data:image/png;base64,') > -1)
    {
        _fs.writeFile(imagePath + 'image.png', img.replace(/^data:image\/png;base64,/, ''), 'base64', function(err)
        {
            if (err !== null)
                log(err.message, 'warn');
            else
                sendTo('telegram', {text: imagePath + 'image.png', message: message});
        });
    }
});
```

_2019-05-04 fixed error that prevented sending the map_ 

You may edit the variable ```message``` to any notification you would like to receive with the map. You may use ```%name-of-state%``` to retrieve the value of a state within the ioBroker.roomba object tree.


## Changelog

### 1.1.1 (2020-02-16)
- (Zefau) moved development to Community Repository

### 1.1.0 (2020-02-06)
- (Zefau) added support to change schedule (see [#36](https://github.com/Zefau/ioBroker.roomba/issues/36))
- (Zefau) fixed bug with state `commands.last.dateTime` having incorrect value `NaN`
- (Zefau) fixed error message shown when robot is on a mission but map is not given

### 1.1.0 (2020-02-06)
- (Zefau) acknowledged support for S9+ (see [#34](https://github.com/Zefau/ioBroker.roomba/issues/34))

### 1.0.7 (2019-09-03)
- (Zefau) fixed bugs occurring when Roomba is on a mission
- (Zefau) added additional debug logging

### 1.0.6 (2019-08-19)
- (Zefau) added loading screen to web interface

### 1.0.5 (2019-08-18)
- (Zefau) fixed failing secure connection
- (Zefau) fixed broken credential retrieval
- (Zefau) fixed broken refresh

### 1.0.4 (2019-08-15)
- (Zefau) fixed password retrieval
- (Zefau) fixed German translations
- (Zefau) added donations button
- (Zefau) updated `dorita980` dependency to v3.1.3
- (Zefau) updated `canvas` dependency to v2.6.0

### 1.0.3 (2019-07-23)
- (Zefau) fixed bug _uncaught exception: Cannot read property 'x' of undefined_

### 1.0.2 (2019-07-20)
- (Zefau) reworked placing home icon ([#23](https://github.com/Zefau/ioBroker.roomba/issues/23))
- (Zefau) updated dependencies to fix security vulnerabilities in depending packages

### 1.0.1 (2019-05-15)
- (Zefau) fixed display error in Chrome ([#19](https://github.com/Zefau/ioBroker.roomba/issues/19#issuecomment-492963244))
- ([@Apollon77](https://github.com/Apollon77)) updated testing for Node.js v12 ([#18](https://github.com/Zefau/ioBroker.roomba/pull/18))
- (Zefau) updated dependencies

### 1.0.0 (2019-05-04)
- (zefau) No changes, only bump to stable release

### 0.5.0 (2019-04-21)
- (zefau) Added command buttons to map page / web interface ([#17](https://github.com/Zefau/ioBroker.roomba/issues/17))
- (zefau) Removed button to end mission manually ```missions.current._endMission```
- (zefau) Run ```stop``` command in the background when ```dock``` command is received ([#14](https://github.com/Zefau/ioBroker.roomba/issues/14))
- (zefau) Added Web Adapter as dependency

### 0.4.5 (2019-03-20)
- Zefau) Refactored retrieval of preferences and added debug mode

### 0.4.4 (2019-03-15)
- ([@Apollon77](https://github.com/Apollon77)) Core Files/Testing Update and introduce adapter-core ([#8](https://github.com/Zefau/ioBroker.roomba/pull/8))

### 0.4.3 (2019-02-10)
- (zefau) Improved compatibility for series 600

### 0.4.2 (2019-02-09)
- (zefau) Bug fixing

### 0.4.1 (2019-02-03)
- (zefau) Support for Compact Mode
- (zefau) Bug fixing

### 0.4.0 (2019-01-08)
- (zefau) Support for e5 and 600 series (due to support by [dorita980](https://github.com/koalazak/dorita980#readme))

### 0.3.x (2019-01-06)
- (zefau) Bug fixed (```Mission saved``` loop)

### 0.3.0 (2019-01-06)
- (zefau) Image / Map of the current cleaning mission will be created
- (zefau) Removed encryption of password

### 0.2.3 (2018-12-03)
- (zefau) Fixed an issue encrypting the password when entered by user (no automated retrieval)

### 0.2.2 (2018-12-02)
- (zefau) Password will now be stored encrypted

Note: If you are coming from an earlier version, you have to (1) empty your settings, (2) save, (3) restart the adapter and (4) enter / fetch credentials again (duo to the fact that password will be stored encrypted now)

### 0.2.1 (2018-11-25)
- (zefau) Fixed / improved automatically retrieving of authentication credentials

### 0.2.0 (2018-11-18)
- (zefau) improved admin interface to automatically retrieve authentication credentials

### 0.1.0 (2018-11-04)
- (zefau) initial version


## Credits
### unofficial API
Thanks to [@koalazak](https://github.com/koalazak) for the [unofficial iRobot Roomba 980 node.js library (SDK)](https://github.com/koalazak/dorita980#readme).

### Icons
Icons made by <a href="https://www.flaticon.com/authors/iconnice" title="Iconnice">Iconnice</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>


## License
The MIT License (MIT)

Copyright (c) 2018-2020 Zefau <zefau@mailbox.org>

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
