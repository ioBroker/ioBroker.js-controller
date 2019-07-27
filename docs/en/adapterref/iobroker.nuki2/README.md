![Logo](admin/nuki-logo.png)
# ioBroker.nuki2
This ioBroker adapter allows to control and monitor the [Nuki Smart Lock](https://nuki.io/de/) by using both the [Nuki Bridge API (v1.8.0,  06.03.2019)](https://developer.nuki.io/page/nuki-bridge-http-api-170/4/#heading--introduction) and the [Nuki Web API (v1.1.1, 30.08.2018)](https://developer.nuki.io/page/nuki-web-api-111/3/).

![Number of Installations](http://iobroker.live/badges/nuki2-installed.svg) ![Stable Version](http://iobroker.live/badges/nuki2-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.nuki2.svg)](https://www.npmjs.com/package/iobroker.nuki2)
[![Travis CI](https://travis-ci.org/Zefau/ioBroker.nuki2.svg?branch=master)](https://travis-ci.org/Zefau/ioBroker.nuki2)
[![Downloads](https://img.shields.io/npm/dm/iobroker.nuki2.svg)](https://www.npmjs.com/package/iobroker.nuki2)
[![Greenkeeper badge](https://badges.greenkeeper.io/Zefau/ioBroker.nuki2.svg)](https://greenkeeper.io/)

[![NPM](https://nodei.co/npm/iobroker.nuki2.png?downloads=true)](https://nodei.co/npm/iobroker.nuki2/)


**Table of contents**
1. [Installation](#installation)
   1. [Get a API token](#get-a-api-token)
   2. [Callback function](#callback-function)
   3. [States](#states)
2. [Smart Home / Alexa integration using ioBroker.javascript](#smart-home--alexa-integration-using-iobrokerjavascript)
   1. [Lock door at 10pm in the evening](#lock-door-at-10pm-in-the-evening)
   2. [Let Alexa inform you about lock changes](#let-alexa-inform-you-about-lock-changes)
   3. [Let Telegram inform you about lock changes](#let-telegram-inform-you-about-lock-changes)
3. [Changelog](#changelog)
4. [Credits](#credits)
5. [Licence](#license)


## Installation
### Get a API token
How to get your bridges token:

1. Call ```http://<bridge_ip>:<bridge_port>/auth``` from any browser in your network
2. The bridge turns on its LED
2. Press the button of the bridge within 30 seconds
3. Result of the browser call should be something like this: ```
    {
    "token": “token123”,
    "success": true
    }```

### Callback function
If the callback function is being used, the adapter will try to automatically set the callback on the Nuki bridge when the instance is being saved. Respective Nuki states ([see below](#locks-with-nuki-bridge-api)) will be kept up-to-date by the Nuki bridge while callback is activated.
Callbacks can also be set and removed manually from any browser with following URLs:

* set Callback: ```http://<bridge_ip>:<bridge_port>/callback/add?url=http%3A%2F%2F<host_ip>%3A<host_port>%2Fnuki-api-bridge&token=<bridgeToken>```
* remove Callback: ```http://<bridge_ip>:<bridge_port>/callback/remove?id=<callback_id>&token=<bridgeToken>```
* list all Callbacks: ```http://<bridge_ip>:<bridge_port>/callback/list?token=<bridgeToken>```

### States
If you successfully setup ioBroker.nuki2, the following channels and states are created:

#### Bridges (with Nuki Bridge API)
A bridge will be created as device with the name pattern ```bridge__<name of bridge>```. The following channels / states will be created in each bridge:

| Channel | State | Description |
|:------- |:----- |:----------- |
| - | \_connected | Flag indicating whether or not the bridge is connected to the Nuki server |
| - | bridgeId | ID of the bridge / server |
| - | bridgeIp | IP address of the bridge |
| - | bridgePort | Port of the bridge |
| - | bridgeType | Type of bridge |
| - | hardwareId | ID of the hardware bridge (hardware bridge only) |
| - | refreshed | Timestamp of last update |
| - | uptime | Uptime of the bridge in seconds |
| - | versFirmware | Version of the bridges firmware (hardware bridge only) |
| - | versWifi | Version of the WiFi modules firmware (hardware bridge only) |
| - | versApp | Version of the bridge app (software bridge only) |

#### Locks (with Nuki Bridge API)
A lock will be created as device with the name pattern ```door__<name of door>```. The following channels / states will be created in each lock (when using the Nuki Bridge API):

| Channel | State | Description |
|:------- |:----- |:----------- |
| - | action | Trigger an action on the lock |
| - | bridge | Bridge of the Nuki |
| - | id | ID of the Nuki |
| - | name | Name of the Nuki |
| status | - | Current status of the lock |
| status | batteryCritical** | States critical battery level |
| status | lockState** | Current lock-state of the Nuki |
| status | locked** | Indication if door is locked |
| status | refreshed** | Timestamp of last update |

_** marked states will be updated on a Nuki action if callback is set_

#### Locks (with Nuki Web API)
A lock will be created as device with the name pattern ```door__<name of door>```. The following channels / states will be created in each lock (when using the Nuki Web API):

| Channel | State | Description (possbile Values) |
|:------- |:----- |:----------------------------- |
| - | action | Trigger an action on the lock |
| - | id | ID of the Nuki |
| - | name | Name of the Nuki |
| status | - | Current status of the lock |
| status | batteryCritical | States critical battery level |
| status | closed | Indication if door is closed (boolean of doorState) |
| status | doorState | Current door-state of the Nuki |
| status | lastAction | Last triggered action |
| status | lockState | Current lock-state of the Nuki |
| status | locked | Indication if door is locked |
| status | mode | The smartlock mode<br>`{"0": 'UNINITIALIZED', "1": 'PAIRING', "2": 'NORMAL', "3": 'UNKNOWN', "4": 'MAINTENANCE'}` |
| status | refreshed | Timestamp of last update |
| status | trigger | The state trigger<br>`{"0": 'SYSTEM', "1": 'MANUAL', "2": 'BUTTON', "3": 'AUTOMATIC', "4": 'WEB', "5": 'APP'}` |
| config | - | Configuration of the lock |
| config | gpsLatitude | Latitude |
| config | gpsLongitude | Longitude |
| config | autoUnlatch | True if the door should be unlatched on unlocking (knob) |
| config | pairingEnabled | True if the pairing is allowed via the smartlock button |
| config | buttonEnabled | True if the button on the smartlock is enabled |
| config | ledEnabled | True if the LED on the smartlock is enabled |
| config | ledBrightness | The brightness of the LED: 0 (off) to 5 (max) |
| config | fobPaired | True if a fob is paired with the smartlock |
| config | fobAction1 | The fob action if button is pressed once<br>`{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| config | fobAction2 | The fob action if button is pressed twice<br>`{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| config | fobAction3 | The fob action if button is pressed 3 times<br>`{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| config | singleLock | True if the smartlock should only lock once (instead of twice) |
| config | advertisingMode | The advertising mode (battery saving)<br>`{"0": 'AUTOMATIC', "1": 'NORMAL', "2": 'SLOW', "3": 'SLOWEST'}` |
| config | keypadPaired | True if a keypad is paired with the smartlock |
| config | homekitState | The homekit state<br>`{"0": 'UNAVAILABLE', "1": 'DISABLED', "2": 'ENABLED', "3": 'ENABLED & PAIRED'}` |
| config | timezoneId | The timezone id |
| config.advanced | - | Advanced Configuration of the lock |
| config.advanced | totalDegrees | The absolute total position in degrees that has been reached during calibration |
| config.advanced | unlockedPositionOffsetDegrees | Offset that alters the unlocked position |
| config.advanced | lockedPositionOffsetDegrees | Offset that alters the locked position |
| config.advanced | singleLockedPositionOffsetDegrees | Offset that alters the single locked position |
| config.advanced | unlockedToLockedTransitionOffsetDegrees | Offset that alters the position where transition from unlocked to locked happens |
| config.advanced | lngTimeout | Timeout in seconds for lock ‘n’ go |
| config.advanced | singleButtonPressAction | The desired action, if the button is pressed once<br>`{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}` |
| config.advanced | doubleButtonPressAction | The desired action, if the button is pressed twice<br>`{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}` |
| config.advanced | detachedCylinder | Flag that indicates that the inner side of the used cylinder is detached from the outer side |
| config.advanced | batteryType | The type of the batteries present in the smart lock<br>`{"0": 'ALKALI', "1": 'ACCUMULATOR', "2": 'LITHIUM'}` |
| config.advanced | automaticBatteryTypeDetection | Flag that indicates if the automatic detection of the battery type is enabled |
| config.advanced | unlatchDuration | Duration in seconds for holding the latch in unlatched position |
| config.advanced | autoLockTimeout | Seconds until the smart lock relocks itself after it has been unlocked. No auto relock if value is 0. |
| users | - | Users of the lock |
| users._userName_ | - | User _userName_ |
| users._userName_ | name | Name of user |
| users._userName_ | type | The type of the authorization<br>`{"0": 'APP', "1": 'BRIDGE', "2": 'FOB', "3": 'KEYPAD', "13": 'KEYPAD CODE', "14": 'Z-KEY', "15": 'VIRTUAL'}` |
| users._userName_ | id | The unique id of user |
| users._userName_ | authId | The smartlock authorization id |
| users._userName_ | enabled | True if the user is enabled |
| users._userName_ | remoteAllowed | True if the auth has remote access |
| users._userName_ | lockCount | The lock count |
| users._userName_ | dateLastActive | The last active date |
| users._userName_ | dateCreated | The creation date |
| users._userName_ | dateUpdated | The update date |
| users._userName_ | allowedFromDate | The allowed from date |
| users._userName_ | allowedUntilDate | The allowed until date |
| users._userName_ | allowedWeekDays | The allowed weekdays<br>`{64: 'Monday', 32: 'Tuesday', 16: 'Wednesday', 8: 'Thursday', 4: 'Friday', 2: 'Saturday', 1: 'Sunday'}` |
| users._userName_ | allowedFromTime | The allowed from time (in minutes from midnight) |
| users._userName_ | allowedUntilTime | The allowed until time (in minutes from midnight) |


## Smart Home / Alexa integration using ioBroker.javascript
Some examples of a possible integration within your smart home.

### Lock door at 10pm in the evening
```javascript
var states = {
    "0": "uncalibrated",
    "1": "locked",
    "2": "unlocking",
    "3": "unlocked",
    "4": "locking",
    "5": "unlatched",
    "6": "unlocked (lock n go)",
    "7": "unlatching",
    "254": "motor blocked",
    "255": "undefined"
};

schedule('0 22 * * *', function()
{
    var status = (getState('nuki2.0.door__home_door.status.lockState').val);
    var msg = 'Main Door door is ' + (states[status]) + '. ';

    if (status == '3')
    {
        setState('nuki2.0.door__home_door.action', 2);
        msg += 'Locking door..'
    }
    else
        msg += 'No action taken.'

    log(msg, {m: 'Nuki', o: ['msg']});
});
```

__Replace `nuki2.0.door__home_door.status.lockState` with the lockState of your lock!__ You may also customize the message via `msg`.

### Let Alexa inform you about lock changes
This requires the ioBroker adapter ioBroker.alexa2 (https://github.com/Apollon77/ioBroker.alexa2).

In order to use the voice output of Alexa we define a function ```say```. Place the following function in a script in the "global" folder of ioBroker.javascript. IMPORTANT: Replace #YOUR ALEXA ID# (also replace #) with your Alexa ID. You may find the Alexa ID in the Objects tree of ioBroker ```alexa2.0.Echo-Devices```.

```javascript
/**
 * Say something with Alexa.
 * 
 * @param       {string}        message         Message to say
 * @param       {string|array}  alexas          Alexa Device to say the voice message
 * @return      void
 * 
 */
function say(message, alexas = '#YOUR ALEXA ID#') // use alexas = ['#YOUR ALEXA ID 1#', '#YOUR ALEXA ID 2#'] for default voice output from multiple devices (also replace #)
{
    alexas = typeof alexas === 'string' ? [alexas] : alexas;
    alexas.forEach(function(alexa)
    {
        setState('alexa2.0.Echo-Devices.' + alexa + '.Commands.speak', message);
    });
}
```
You can use this function within ioBroker.javascript to say a phrase using Alexa ```say('Hello World')``` or ```say('Hello World', ['#YOUR ALEXA ID 1#', '#YOUR ALEXA ID 2#'])``` for voice output from multiple devices.

Create a script in the "common" folder of ioBroker.javascript and add the following listener to it. IMPORTANT: Replace #LOCK STATE ID# (also replace #) with the state holding the lock status (e.g. ```nuki2.0.door__home_door.status.lockState```):

```javascript
const DOOR_STATES = {
    "0": "uncalibrated",
    "1": "locked",
    "2": "unlocking",
    "3": "unlocked",
    "4": "locking",
    "5": "unlatched",
    "6": "unlocked (lock n go)",
    "7": "unlatching",
    "254": "motor blocked",
    "255": "undefined"
};

/*
 * LISTEN TO CHANGES TO LOCK STATE
 * 
 */
on({id: '#LOCK STATE ID#', change: 'any'}, function(obj)
{
    if (obj !== undefined && obj.state !== undefined)
      say('Door is ' + DOOR_STATES[obj.state.val] + '!')
});
```

### Let Telegram inform you about lock changes
This requires the ioBroker adapter ioBroker.telegram (https://github.com/iobroker-community-adapters/ioBroker.telegram).

In order to use the message output of Telegram we define a function ```msg``` and ```messenger```. Place the following function in a script in the "global" folder of ioBroker.javascript:

```javascript
/**
 * Send something via telegram.
 * 
 * @param       {string}        message         Message to print
 * @param       {string|array}  receiver        Users to send the message to
 * @return      void
 * 
 */
function msg(message, receiver = 'ALL')
{
    if (receiver == 'ALL')
        messenger(message);
    
    else
    {
        receiver = typeof receiver == 'string' ? [receiver] : receiver;
        receiver.forEach(function(user)
        {
            messenger(message, user);
        });
    }
}
```

```javascript
/**
 * Sends a message / text.
 * 
 * @param   {string}            content         Message to send
 * @param   {string}            user            (optional) Specific user to send the message to (defaults to all registered users)
 * @return  void
 * 
 */
function messenger(content, user = '')
{
    var config = {
        text: content,
        parse_mode: 'HTML',
        reply_markup: {
            resize_keyboard: true,
            one_time_keyboard: false
        }
    };
    
    sendTo('telegram', user ? Object.assign({user: user}, config) : config);
}
```
You can use this function within ioBroker.javascript to send anything to Telegram via ```msg('Hello World')``` (to all users) or ```msg('Hello World', 'Zefau')``` (to specific users).

Create a script in the "common" folder of ioBroker.javascript and add the following listener to it. IMPORTANT: Replace #LOCK STATE ID# (also replace #) with the state holding the lock status (e.g. ```nuki2.0.door__home_door.status.lockState```):

```javascript
const DOOR_STATES = {
    "0": "uncalibrated",
    "1": "locked",
    "2": "unlocking",
    "3": "unlocked",
    "4": "locking",
    "5": "unlatched",
    "6": "unlocked (lock n go)",
    "7": "unlatching",
    "254": "motor blocked",
    "255": "undefined"
};

/*
 * LISTEN TO CHANGES TO LOCK STATE
 * 
 */
on({id: '#LOCK STATE ID#', change: 'any'}, function(obj)
{
    if (obj !== undefined && obj.state !== undefined)
      msg('Door is ' + DOOR_STATES[obj.state.val] + '!')
});
```

NOTE: If you are using both the Alexa and the Telegram script, you may only define one listener for both actions:
```javascript
const DOOR_STATES = {
    "0": "uncalibrated",
    "1": "locked",
    "2": "unlocking",
    "3": "unlocked",
    "4": "locking",
    "5": "unlatched",
    "6": "unlocked (lock n go)",
    "7": "unlatching",
    "254": "motor blocked",
    "255": "undefined"
};

/*
 * LISTEN TO CHANGES TO LOCK STATE
 * 
 */
on({id: '#LOCK STATE ID#', change: 'any'}, function(obj)
{
    if (obj !== undefined && obj.state !== undefined)
    {
      say('Door is ' + DOOR_STATES[obj.state.val] + '!')
      msg('Door is ' + DOOR_STATES[obj.state.val] + '!')
    }
});
```



## Changelog

### 1.0.0 (2019-05-xx) [IN DEVELOPMENT]
- (Zefau) support for hashed token for hardware bridges (see https://developer.nuki.io/page/nuki-bridge-http-api-180/4/#heading--token) in the [nuki-bridge-api](https://github.com/Mik13/nuki-bridge-api/pull/9)
- (Zefau) bump to stable release

### 0.9.13 (2019-07-20)
- (Zefau) updated dependencies to fix security vulnerabilities in depending packages

### 0.9.12 (2019-05-16)
- (Zefau) fixed an issue causing the same callback set multiple times (see [#9](https://github.com/Zefau/ioBroker.nuki2/issues/9#issuecomment-493148883))

### 0.9.11 (2019-05-13)
- (Zefau) added info-message when setting refresh rate to less than 10 seconds

### 0.9.10 (2019-05-10)
- (Zefau) added states to reflect current callbacks set on the Nuki Bridge as well as action to delete the callbacks
- (Zefau) updated dependency of `nuki-bridge-api` to v1.5.0

### 0.9.9 (2019-05-05)
- (Zefau) updated dependency of `nuki-bridge-api` to v1.4.0

### 0.9.8 (2019-05-05)
Thanks to [@systemofapwne](https://github.com/systemofapwne) for testing and identifying quite a few bugs.

- (Zefau) added delay between requests / actions applied on the Nuki Bridge (to prevent overload, see [#9](https://github.com/Zefau/ioBroker.nuki2/issues/9))
- (Zefau) fixed an issue causing the adapter to crash when polling was enabled, but Web API is not used (see [#10](https://github.com/Zefau/ioBroker.nuki2/issues/10))

### 0.9.7 (2019-05-05)
- (Zefau) added verification if callback URL is already added on Nuki Bridge (see [#9](https://github.com/Zefau/ioBroker.nuki2/issues/9))

### 0.9.6 (2019-05-03)
- (Zefau) added Web Adapter as dependency
- (Zefau) add warning when opening web / log view but Nuki Web API has not been setup
- (Zefau) removed empty folders when Nuki Web API has not been setup 
- (Zefau) fixed an issue with Webhook when time for refreshing all settings was set ([#9](https://github.com/Zefau/ioBroker.nuki2/issues/9))

### 0.9.4 / 0.9.5 (2019-03-22)
- (Zefau) Useless versions to fix incorrect configuration in `io-package.json`

### 0.9.3 (2019-03-22)
- (Zefau) Limited log retrieval to 1000 entries

### 0.9.2 (2019-02-11)
- (Zefau) Updated dependency

### 0.9.1 (2019-02-10)
- (Zefau) Added Web Interface to view logs

### 0.9.0 (2019-02-09)
- (Zefau) Using both Bridge API and Web API
- (Zefau) Support for multiple bridges
- (Zefau) Support for discovery within admin panel
- (Zefau) Additional states for bridges and better separation between software / hardware bridge
  - retrieve the basic and advanced configuration from your lock
  - retrieve all users having access to your lock


## Credits
Thanks to [@Mik13](https://github.com/Mik13) for the [Nuki Bridge API implementation](https://github.com/Mik13/nuki-bridge-api#nuki-bridge-api).

Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> ([Essential Set](https://www.flaticon.com/packs/essential-set-2)) and <a href="https://www.freepik.com/" title="Freepik">Freepik</a> ([Doors](https://www.flaticon.com/packs/doors)) from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>


## License
The MIT License (MIT)

Copyright (c) 2019 Zefau <zefau@mailbox.org>

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
