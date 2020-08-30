![Logo](admin/nuki-extended.png)
# ioBroker.nuki-extended
This ioBroker adapter (formerly ioBroker.Nuki2) allows to control and monitor the [Nuki Smart Lock](https://nuki.io/de/smart-lock/) and / or the [Nuki Opener](https://nuki.io/de/opener/) by using both the [Nuki Bridge API (v1.9.0, 06.05.2019)](https://developer.nuki.io/page/nuki-bridge-http-api-170/4/#heading--introduction) and the [Nuki Web API (v1.2.0, 31.05.2019)](https://developer.nuki.io/page/nuki-web-api-111/3/).

[![Paypal Donation](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)](https://paypal.me/chvoelkel)

![Number of Installations](http://iobroker.live/badges/nuki-extended-installed.svg)
![Stable Version](http://iobroker.live/badges/nuki-extended-stable.svg)
[![NPM Version](http://img.shields.io/npm/v/iobroker.nuki-extended.svg)](https://www.npmjs.com/package/iobroker.nuki-extended)
[![Commits since last release](https://img.shields.io/github/commits-since/Zefau/ioBroker.nuki-extended/latest.svg)](https://github.com/Zefau/ioBroker.nuki-extended/releases/latest)
[![Travis CI](https://travis-ci.com/Zefau/ioBroker.nuki-extended.svg?branch=master)](https://travis-ci.com/Zefau/ioBroker.nuki-extended)
[![Downloads](https://img.shields.io/npm/dm/iobroker.nuki-extended.svg)](https://www.npmjs.com/package/iobroker.nuki-extended)

[![NPM](https://nodei.co/npm/iobroker.nuki-extended.png?downloads=true)](https://nodei.co/npm/iobroker.nuki-extended/)


**Table of contents**
1. [Features](#features)
2. [Installation](#installation)
   1. [Nuki Bridge API](#nuki-bridge-api)
   2. [Nuki Web API](#nuki-web-api)
3. [Channels & States](#channels--states)
4. [Smart Home / Alexa integration using ioBroker.javascript](#smart-home--alexa-integration-using-iobrokerjavascript)
   1. [Lock door at 10pm in the evening](#lock-door-at-10pm-in-the-evening)
   2. [Let Alexa inform you about lock changes](#let-alexa-inform-you-about-lock-changes)
   3. [Let Telegram inform you about lock changes](#let-telegram-inform-you-about-lock-changes)
   4. [Let Alexa and Telegram inform you about somebody ringing via Opener](#let-telegram-and-alexa-inform-you-about-somebody-ringing-via-opener)
5. [Changelog](#changelog)
6. [Credits](#credits)
7. [Licence](#license)


## Features
- Support for Nuki Smartlock and Nuki Opener
- Support for both Nuki Bridge API and Nuki Web API
- ~~Support for hashed token on hardware bridges (see https://developer.nuki.io/page/nuki-bridge-http-api-190/4#heading--token)~~
- Fallback to Nuki Web API in case applied actions on Nuki Bridge API fail, e.g. due to bridge error 503 (see https://developer.nuki.io/t/random-http-503-unavailable/909/85?u=zefau)
- Retry in case applied actions on Nuki Bridge API fail (when Nuki Web API is not used)
- Option to regularly synchronise instead of using Bridge API callback (which may be delayed due to Hardware Bridge)
- Refreshing all states of Nuki Web API when callback is received via Nuki Bridge API
- Retrieve authorised users for Nuki Smartlock and Nuki Opener (see below [Channels & States](#general-information))
- Retrieve the configuration for Nuki Smartlock and Nuki Opener (see below [Channels & States](#general-config))
- Retrieve setup Nuki Notifications (see below [Channels & States](#users))
- Web Interface that shows the recent events from your Nuki Smartlock and Nuki Opener:
  ![Nuki Extended Web Interface](img/screenshot_adapter-interface.png)


## Installation
### Nuki Bridge API
How to get your hardware bridge token (does not work for software bridges):

1. Call ```http://<bridge_ip>:<bridge_port>/auth``` from any browser in your network. The bridge turns on its LED.
2. Press the button of the bridge within 30 seconds.
3. Result of the browser call should be something like this:
   ```
   {
      "token":"token123",
      "success":true
   }
   ```
4. Use the generated token in the nuki-extended adapter.

### Nuki Web API
Do the following, to use the Nuki Web API:

1. Retrieve a token at https://web.nuki.io/de/#/admin/web-api
2. Use this token in the nuki-extended adapter
3. Make sure your nuki devices are published on the Nuki Web API (use the Smartphone App via Settings `Activate Nuki Web`)


## Channels & States
If you successfully setup ioBroker.nuki-extended, the following channels and states are created:

### Bridges (with Nuki Bridge API)
A bridge will be created as device with the name pattern ```bridge__<name of bridge>```. The following channels / states will be created in each bridge:

| Channel | State | Description |
|:------- |:----- |:----------- |
| - | \_connected | Flag indicating whether or not the bridge is connected to the Nuki server |
| - | name | Name of the bridge / server |
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
| callbacks | - | Callbacks of the Bridge |
| callbacks | list | List of callbacks |
| callbacks._callbackId_ | \_delete | Delete the callback |
| callbacks._callbackId_ | url | URL of the callback |

### General Information

| Channel | State | Description |
|:------- |:----- |:----------- |
| - | connection | Adapter Connection Status |
| - | bridgeApiSync | Indicates whether syncing via Bridge API is activated |
| - | bridgeApiLast | Timestamp of last Bridge API sync |
| - | webApiSync | Indicates whether syncing via Web API is activated |
| - | webApiLast | Timestamp of last Web API sync |
| notifications | - | Notifications |
| notifications._notificationIndex_ | - | - |
| notifications._notificationIndex_.settings | - | Notification Settings |
| notifications._notificationIndex_.settings._settingsIndex_ | - | - |
| notifications._notificationIndex_.settings._settingsIndex_ | authIds | A set of auth IDs to filter push notifications to certain users or keypads. If no entry push notifications are triggered for all users and keypads |
| notifications._notificationIndex_.settings._settingsIndex_ | smartlockId | The smartlock ID, if not set all Smart Locks of the account are enabled for push notifications |
| notifications._notificationIndex_.settings._settingsIndex_ | triggerEvents | A set on which push notifications should be triggered: lock, unlock, unlatch, lockngo, open, ring, doorsensor, warnings, smartlock |
| notifications._notificationIndex_ | language | The language of push messages |
| notifications._notificationIndex_ | lastActiveDate | The last active date |
| notifications._notificationIndex_ | notificationId | The unique notificationId for the notification |
| notifications._notificationIndex_ | os | The operating system<br>`{"0": 'Android', "1": 'iOS', "2": 'Webhook'}` |
| notifications._notificationIndex_ | pushId | The push ID or the POST URL for a webhook |
| notifications._notificationIndex_ | referenceId | The reference ID, an ID to identify a foreign system |
| notifications._notificationIndex_ | secret | The 40 byte hex string to sign the checksumof the POST payload if the notification is webhook (os=2) |
| notifications._notificationIndex_ | status | Current activation state<br>`{"0": 'INIT', "1": 'ACTIVE', "2": 'FAILED'}` |

### Smartlocks and Opener (with Nuki Bridge API)
A lock will be created as device with the name pattern ```door__<name of door>```. The following channels / states will be created in each lock (when using the Nuki Bridge API):

| Channel | State | Description |
|:------- |:----- |:----------- |
| - | \_ACTION | Trigger an action on the lock |
| - | id | ID of the Nuki |
| - | name | Name of the Nuki |
| - | type | Type of device |
| - | bridgeId | Bridge ID of the Nuki |
| status | - | Current status of the lock |
| status | batteryCritical** | States critical battery level |
| status | lockState** | Current lock-state of the Nuki |
| status | locked** | Indication if door is locked |
| status | refreshed** | Timestamp of last update |

_** marked states will be updated on a Nuki action if callback is set_

### Smartlocks and Opener (with Nuki Web API)
A lock will be created as device with the name pattern ```door__<name of door>```. The following channels / states will be created in each lock (when using the Nuki Web API):

| Channel | State | Description (possbile Values) |
|:------- |:----- |:----------------------------- |
| - | \_ACTION | Trigger an action on the lock |
| - | id | ID of the Nuki |
| - | name | Name of the Nuki |
| - | type | Type of device |
| - | logs | Logs / History of Nuki |
| - | bridgeId | Bridge ID of the Nuki |

#### Information

| Channel | State | Description (possbile Values) |
|:------- |:----- |:----------------------------- |
| info | - | Additional Information |
| info | accountId | The account ID |
| info | authId | The authorization ID |
| info | favorite | The favorite flag |
| info | firmwareVersion | The firmware version |
| info | hardwareVersion | The hardware version |
| info | operationId | The operation id - if set the device is locked for another operation |
| info | serverState | The server state<br>`{"0": 'OK', "1": 'UNREGISTERED', "2": 'AUTH UUID INVALID', "3": 'AUTH INVALID', "4": 'OFFLINE'}` |
| info | adminPinState | The admin pin state<br>`{"0": 'OK', "1": 'MISSING', "2": 'INVALID'}` |
| info | virtualDevice | The flag indicating a virtual Smart Lock |
| info | dateCreated | The creation date |
| info | dateUpdated | The update date |
	
#### State

| Channel | State | Description (possbile Values) |
|:------- |:----- |:----------------------------- |
| state | - | Current status of the lock |
| state | batteryCritical | States critical battery level |
| state | closed | Indication if door is closed (boolean of doorState) |
| state | doorState | Current door-state of the Nuki |
| state | lastAction | Last triggered action |
| state | lockState | Current lock-state of the Nuki |
| state | locked | Indication if door is locked |
| state | mode | The smartlock mode<br>`{"0": 'UNINITIALIZED', "1": 'PAIRING', "2": 'NORMAL', "3": 'UNKNOWN', "4": 'MAINTENANCE'}` |
| state | ringToOpenTimer | Remaining ring to open time |
| state | refreshed | Timestamp of last update |
| state | trigger | The state trigger<br>`{"0": 'SYSTEM', "1": 'MANUAL', "2": 'BUTTON', "3": 'AUTOMATIC', "4": 'WEB', "5": 'APP'}` |

#### General Config

| Channel | State | Description (possbile Values) |
|:------- |:----- |:----------------------------- |
| config | - | Configuration |
| config | advertisingMode | The advertising mode (battery saving)<br>`{"0": 'AUTOMATIC', "1": 'NORMAL', "2": 'SLOW', "3": 'SLOWEST'}` |
| config | autoUnlatch | True if the door should be unlatched on unlocking (knob) |
| config | buttonEnabled | True if the button on the smartlock is enabled |
| config | capabilities | The capabilities indicate whether door opening is possible via App, RTO or both |
| config | daylightSavingMode | The daylight saving mode |
| config | fobAction1 | The fob action if button is pressed once<br>`{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| config | fobAction2 | The fob action if button is pressed twice<br>`{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| config | fobAction3 | The fob action if button is pressed 3 times<br>`{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| config | fobPaired | True if a fob is paired with the smartlock |
| config | gpsLatitude | Latitude |
| config | gpsLongitude | Longitude |
| config | homekitState | The homekit state<br>`{"0": 'UNAVAILABLE', "1": 'DISABLED', "2": 'ENABLED', "3": 'ENABLED & PAIRED'}` |
| config | keypadPaired | True if a keypad is paired with the smartlock |
| config | ledBrightness | The brightness of the LED: 0 (off) to 5 (max) |
| config | ledEnabled | True if the LED on the smartlock is enabled |
| config | name | The name of the smartlock for new users |
| config | operatingMode | The operating mode of the opener |
| config | pairingEnabled | True if the pairing is allowed via the smartlock button |
| config | singleLock | True if the smartlock should only lock once (instead of twice) |
| config | timezoneId | The timezone id |
| config | timezoneOffset | The timezone offset (in minutes) |

#### Advanced Config

| Channel | State | Description (possbile Values) |
|:------- |:----- |:----------------------------- |
| advancedConfig | - | Advanced Configuration |
| advancedConfig | autoLockTimeout | Seconds until the smart lock relocks itself after it has been unlocked. No auto relock if value is 0. |
| advancedConfig | automaticBatteryTypeDetection | Flag that indicates if the automatic detection of the battery type is enabled |
| advancedConfig | batteryType | The type of the batteries present in the smart lock<br>`{"0": 'ALKALI', "1": 'ACCUMULATOR', "2": 'LITHIUM'}` |
| advancedConfig | detachedCylinder | Flag that indicates that the inner side of the used cylinder is detached from the outer side |
| advancedConfig | doubleButtonPressAction | The desired action, if the button is pressed twice<br>`{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}` |
| advancedConfig | lngTimeout | Timeout in seconds for lock ‘n’ go |
| advancedConfig | lockedPositionOffsetDegrees | Offset that alters the locked position |
| advancedConfig | singleButtonPressAction | The desired action, if the button is pressed once<br>`{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}` |
| advancedConfig | singleLockedPositionOffsetDegrees | Offset that alters the single locked position |
| advancedConfig | totalDegrees | The absolute total position in degrees that has been reached during calibration |
| advancedConfig | unlatchDuration | Duration in seconds for holding the latch in unlatched position |
| advancedConfig | unlockedPositionOffsetDegrees | Offset that alters the unlocked position |
| advancedConfig | unlockedToLockedTransitionOffsetDegrees | Offset that alters the position where transition from unlocked to locked happens |

#### Opener Advanced Config

| Channel | State | Description (possbile Values) |
|:------- |:----- |:----------------------------- |
| openerAdvancedConfig | - | Opener Configuration |
| openerAdvancedConfig | intercomId | The database ID of the connected intercom |
| openerAdvancedConfig | busModeSwitch | Method to switch between data and analogue mode<br>`{"0": 'DATA MODE', "1": 'ANALOGUE MODE'}` |
| openerAdvancedConfig | shortCircuitDuration | Duration of the short circuit for BUS mode switching in ms |
| openerAdvancedConfig | electricStrikeDelay | Delay of electric strike activation in ms (after lock action 3 -electric strike actuation-) |
| openerAdvancedConfig | randomElectricStrikeDelay | Random electricStrikeDelay (range 3000 - 7000 ms) in order to simulate a person inside actuating the electric strike |
| openerAdvancedConfig | electricStrikeDuration | Duration in ms of electric strike actuation (lock action 3 -electric strike actuation-) |
| openerAdvancedConfig | disableRtoAfterRing | Flag to disable RTO after ring |
| openerAdvancedConfig | rtoTimeout | After this period of time in minutes, RTO gets deactivated automatically |
| openerAdvancedConfig | doorbellSuppression | The doorbell supression mode<br>`{"0": 'NEVER', "1": 'ALWAYS', "2": 'RTO', "3": 'CONTINUOUS', "4": 'CONTINUOUS + RTO'}` |
| openerAdvancedConfig | doorbellSuppressionDuration | Duration in ms of doorbell suppression (only in Operating mode 2 -digital Intercom-) |
| openerAdvancedConfig | soundRing | The sound for ring |
| openerAdvancedConfig | soundOpen | The sound for open |
| openerAdvancedConfig | soundRto | The sound for RTO |
| openerAdvancedConfig | soundCm | The sound for CM |
| openerAdvancedConfig | soundConfirmation | The sound confirmation |
| openerAdvancedConfig | soundLevel | The sound level |
| openerAdvancedConfig | singleButtonPressAction | The desired action, if the button is pressed once |
| openerAdvancedConfig | doubleButtonPressAction | The desired action, if the button is pressed twice |
| openerAdvancedConfig | batteryType | The type of the batteries present in the smart lock<br>`{"0": 'ALKALI', "1": 'ACCUMULATOR', "2": 'LITHIUM'}` |
| openerAdvancedConfig | automaticBatteryTypeDetection | Flag that indicates if the automatic detection of the battery type is enabled |
| openerAdvancedConfig | operationId | The operation id - if set device is locked for another operation |

#### Users

| Channel | State | Description (possbile Values) |
|:------- |:----- |:----------------------------- |
| users | - | Users of the lock |
| users._userName_ | - | User _userName_ |
| users._userName_ | allowedFromDate | The allowed from date |
| users._userName_ | allowedUntilDate | The allowed until date |
| users._userName_ | allowedWeekDays | The allowed weekdays<br>`{64: 'Monday', 32: 'Tuesday', 16: 'Wednesday', 8: 'Thursday', 4: 'Friday', 2: 'Saturday', 1: 'Sunday'}` |
| users._userName_ | allowedFromTime | The allowed from time (in minutes from midnight) |
| users._userName_ | allowedUntilTime | The allowed until time (in minutes from midnight) |
| users._userName_ | authId | The smartlock authorization id |
| users._userName_ | dateCreated | The creation date |
| users._userName_ | dateUpdated | The update date |
| users._userName_ | dateLastActive | The last active date |
| users._userName_ | enabled | True if the user is enabled |
| users._userName_ | id | The unique id of user |
| users._userName_ | lockCount | The lock count |
| users._userName_ | name | Name of user |
| users._userName_ | remoteAllowed | True if the auth has remote access |
| users._userName_ | smartlockId | The Nuki ID |
| users._userName_ | type | The type of the authorization<br>`{"0": 'APP', "1": 'BRIDGE', "2": 'FOB', "3": 'KEYPAD', "13": 'KEYPAD CODE', "14": 'Z-KEY', "15": 'VIRTUAL'}` |


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
    var status = (getState('nuki-extended.0.smartlocks.home_door.state.lockState').val);
    var msg = 'Main Door door is ' + (states[status]) + '. ';

    if (status == '3')
    {
        setState('nuki-extended.0.smartlocks.home_door._ACTION', 2);
        msg += 'Locking door..'
    }
    else
        msg += 'No action taken.'

    log(msg, {m: 'Nuki', o: ['msg']});
});
```

__Replace `nuki-extended.0.door__home_door.status.lockState` with the lockState of your lock!__ You may also customize the message via `msg`.

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

Create a script in the "common" folder of ioBroker.javascript and add the following listener to it. IMPORTANT: Replace #LOCK STATE ID# (also replace #) with the state holding the lock status (e.g. ```nuki-extended.0.door__home_door.status.lockState```):

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
on({id: 'nuki-extended.0.smartlocks.home_door.state.lockState', change: 'any'}, function(obj)
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

Create a script in the "common" folder of ioBroker.javascript and add the following listener to it. IMPORTANT: Replace #LOCK STATE ID# (also replace #) with the state holding the lock status (e.g. ```nuki-extended.0.door__home_door.status.lockState```):

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
on({id: 'nuki-extended.0.smartlocks.home_door.state.lockState', change: 'any'}, function(obj)
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
on({id: 'nuki-extended.0.smartlocks.home_door.state.lockState', change: 'any'}, function(obj)
{
    if (obj !== undefined && obj.state !== undefined)
    {
      say('Door is ' + DOOR_STATES[obj.state.val] + '!')
      msg('Door is ' + DOOR_STATES[obj.state.val] + '!')
    }
});
```

### Let Telegram and Alexa inform you about somebody ringing via Opener
This requires the ioBroker adapter ioBroker.telegram (https://github.com/iobroker-community-adapters/ioBroker.telegram) and the ioBroker adapter ioBroker.alexa2 (https://github.com/Apollon77/ioBroker.alexa2).

```javascript
/*
 * Alexa and Telegram to notify on Opener Ringing state
 *
 */
let phrase = 'Somebody is ringing the doorbell.'; // Es hat an der Tür geklingelt
on({id: 'nuki-extended.0.openers.opener.state.ringStateUpdate', change: "any", ack: true}, function (s) {
  let state= s && s.state;

  if (state.val === true) {
    setState("alexa2.0.Echo-Devices.#YOUR ALEXA ID#.Commands.speak"/*speak*/, phrase);
    sendTo("telegram", "send", { text: phrase });
  }
});
```


## Changelog

Please see [release page](https://github.com/Zefau/ioBroker.nuki-extended/releases) for changelog and detailed information.

### v2.3.0 (2020-08-10)
- (Zefau) added support for the door sensor of the Nuki Smartlock ([introduced with Bridge firmware 2.6.0 / 1.16.0](https://developer.nuki.io/t/bridge-beta-fw-2-6-0-1-16-0-with-door-sensor-state/6159))
- (Zefau) added support for the ring bell action of the Nuki Opener ([introduced with Bridge firmware 2.7.0 / 1.17.0](https://developer.nuki.io/t/bridge-beta-fw-2-7-0-1-17-0/6792))

### v2.2.6 (2020-07-14)
- (Zefau) fixed Web API not refreshing correctly (see [#59](https://github.com/Zefau/ioBroker.nuki-extended/issues/59))
- (Zefau) updated dependencies

### v2.2.5 (2020-03-19)
- (Zefau) fixed incorrect versioning

### v2.2.4 (2020-03-18)
- (Zefau) fixed incorrect dates of version history (see [#60](https://github.com/Zefau/ioBroker.nuki-extended/issues/60))

### v2.2.3 (2020-03-04)
- (Zefau) added refresh of configuration (via Nuki Web API) when any config item has been changed in ioBroker

### v2.2.2 (2020-03-04)
- (Zefau) fixed incorrect error message `Error triggering action via Nuki Bridge API: No Nuki Hex ID given!`
- (Zefau) added new error message if too many callbacks are already attached to Nuki Bridge (`Callback not attached because too many Callbacks attached to the Nuki Bridge already! Please delete a callback!`)

### v2.2.1 (2020-03-03)
- (Zefau) fixed incorrect state mapping of state `openerAdvancedConfig.doorbellSuppression`

  **Note:** Please delete the state `openerAdvancedConfig.doorbellSuppression` once manually and restart the adapter to take affect!
  
- (Zefau) updated dependencies

### v2.2.0 (2020-02-16)
- (Zefau) added possibility to change configuration of Nuki Smartlock or Nuki Opener (when using Web API)
- (Zefau) updated dependencies

### v2.1.0 (2020-02-03)
- (Zefau) added (optional) callback IP for Bridge API events (e.g. when ioBroker is run in docker; see [#51](https://github.com/Zefau/ioBroker.nuki-extended/issues/51))
- (Zefau) added dedicated buttons for each lock / opener action
- (Zefau) replaced `state.timestamp` with `state.lastDataUpdate` (indicates last data refresh from the APIs) and `state.lastStateUpdate` (indicates the last actual state change)

### v2.0.3 (2019-10-31)
- (Zefau) reintroduced support for hashed token on hardware bridges (see https://developer.nuki.io/page/nuki-bridge-http-api-190/4#heading--token)

### v2.0.2 (2019-10-31)
- (Zefau) added support for newly introduced nightmode (see https://nuki.io/de/blog/nuki-news-de/nuki-update-2019-der-winter-naht-sei-vorbereitet/)
- (Zefau) fixed incorrect behavior when bridges are defined insufficiently (no name, ip or token provided)

### v2.0.1 (2019-10-26)
- (Zefau) fixed missing `bridge_name`

### v2.0.0 (2019-10-24)
- (Zefau) added support for new Nuki Opener
- (Zefau) added support for hashed token on hardware bridges (see https://developer.nuki.io/page/nuki-bridge-http-api-190/4#heading--token)
- (Zefau) added fallback to Nuki Web API in case applied actions on Nuki Bridge API fail, e.g. due to bridge error 503 (see https://developer.nuki.io/t/random-http-503-unavailable/909/85?u=zefau)
- (Zefau) added retry in case applied actions on Nuki Bridge API fail (when Nuki Web API is not used)
- (Zefau) added option to regularly synchronise instead of using Bridge API callback
- (Zefau) added refreshing all states of Nuki Web API when callback is received via Nuki Bridge API
- (Zefau) added states for Nuki Notifications
- (Zefau) added support for multiple devices (including Nuki Opener) on adapter web interface
- (Zefau) added option to not retrieve all information (by deselecting `config` or `users`) via Nuki Web API


## Credits
Thanks to [@Mik13](https://github.com/Mik13) for the [Nuki Bridge API implementation](https://github.com/Mik13/nuki-bridge-api#nuki-bridge-api).

Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> ([Essential Set](https://www.flaticon.com/packs/essential-set-2)) and <a href="https://www.freepik.com/" title="Freepik">Freepik</a> ([Doors](https://www.flaticon.com/packs/doors)) from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>


## License
The MIT License (MIT)

Copyright (c) 2019-2020 Zefau <zefau@mailbox.org>

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
