![Logo](admin/iot.png)
# ioBroker IoT Adapter

![Number of Installations](http://iobroker.live/badges/iot-installed.svg) ![Number of Installations](http://iobroker.live/badges/iot-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.iot.svg)](https://www.npmjs.com/package/iobroker.iot)
[![Downloads](https://img.shields.io/npm/dm/iobroker.iot.svg)](https://www.npmjs.com/package/iobroker.iot)

[![NPM](https://nodei.co/npm/iobroker.iot.png?downloads=true)](https://nodei.co/npm/iobroker.iot/)

This adapter is ONLY for communication with Amazon Alexa, Google Home and Nightscout.
It is not for remote access to your ioBroker instance. Use ioBroker.cloud adapter for that.

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Settings
To use cloud adapter you should first to register on the ioBroker cloud [https://iobroker.pro](https://iobroker.pro).

[Reference to google API type settings](https://developers.google.com/actions/smarthome/guides/)

![Intro](img/intro.png)

### Language
If you select "default" language the smart names of devices and of enumerations will not be translated. If some language specified all known names will be translated into this language.
It is done to switch fast between many languages for demonstration purposes.

### Place function in names first
Change the order of function and roles in self generated names:

- if false: "Room function", e.g. "Living room dimmer"
- if true: "Function room", e.g. "Dimmer living room"

### Concatenate words with
You can define the word which will be placed between function and room. E.g. "in" and from "Dimmer living room" will be "Dimmer in living room".

But is not suggested to do so, because recognition engine must analyse one more word and it can lead to misunderstandings.

### OFF level for switches
Some groups consist of mixed devices: dimmers and switches. It is allowed to control them with "ON" and "OFF" commands and with percents.
If command is "Set to 30%" and the *OFF level" is "30%" so the switches will be turned on. By command "Set to 25%" all switches will be turned OFF.

Additionally if the command is "OFF", so the adapter will remember the current dimmer level if the actual value is over or equal to the "30%".
Later when the new "ON" command will come the adapter will switch the dimmer not to 100% but to the level in memory.

Example:

- Assume, that *OFF level* is 30%.
- Virtual device "Light" has two physical devices: *switch* and *dimmer*.
- Command: "set the light to 40%". The adapter will remember this value for *dimmer*, will set it for "dimmer" and will turn the *switch* ON.
- Command: "turn the light off". The adapter will set the *dimmer* to 0% and will turn off the *switch*.
- Command: "turn on the light". *dimmer* => 40%, *switch* => ON.
- Command: "set the light to 20%". *dimmer* => 20%, *switch* => OFF. The value for dimmer will not be remembered, because it is bellow *OFF level*.
- Command: "turn on the light". *dimmer* => 40%, *switch* => ON.

### by ON
You can select the behaviour of ON command will come for the number state. The specific value can be selected or last non zero value will be used.

### Write response to
For every command the text response will be generated. You can define here the Object ID , where this text must be written to. E.g. *sayit.0.tts.text*.

### Colors
Just now only english alexa supports the color control.
The channel must have 4 states with following roles:

- level.color.saturation (required for detection of the channel),
- level.color.hue,
- level.dimmer,
- switch (optional)

```
Alexa, set the "device name" to "color"
Alexa, turn the light fuschia
Alexa, set the bedroom light to red
Alexa, change the kitchen to the color chocolate
```

### Lock
To have the possibility to lock the locks, the state must have the role "switch.lock" and have "native.LOCK_VALUE" to determine the lock state. If you need a seperate Value to control the Lock you can use "native.CONTROL VALUE".

```
Alexa, is "lock name" locked/unlocked
Alexa, lock the "lock name"
```

## How names will be generated
The adapter tries to generate virtual devices for smart home control (e.g. Amazon Alexa or Google Home).

The are two important enumerations for that: rooms and functions.

Rooms are like: living room, bath room, sleeping room.
Functions are like: light, blind, heating.

Following conditions must be met to get the state in the automatically generated list:

- the state must be in some "function" enumeration.
- the state must have role ("state", "switch" or "level.*", e.g. level.dimmer) if not directly included into "functions".
It can be that the channel is in the "functions", but state itself not.
- the state must be writable: common.write = true
- the state dimmer must have common.type as 'number'
- the state heating must have common.unit as '°C', '°F' or '°K' and common.type as 'number'

If the state is only in "functions" and not in any "room", the name of state will be used.

The state names will be generated from function and room. E.g. all *lights* in the *living room* will be collected in the virtual device *living room light*.
The user cannot change this name, because it is generated automatically.
But if the enumeration name changes, this name will be changed too. (e.g. function "light" changed to "lights", so the *living room light* will be changed to *living room lights*)

All the rules will be ignored if the state has common.smartName. In this case just the smart name will be used.

if *common.smartName* is **false**, the state or enumeration will not be included into the list generation.

The configuration dialog lets comfortable remove and add the single states to virtual groups or as single device.
![Configuration](img/configuration.png)

If the group has only one state it can be renamed, as for this the state's smartName will be used.
If the group has more than one state, the group must be renamed via the enumeration's names.

To create own groups the user can install "scenes" adapter or create "script" in Javascript adapter.

### Replaces
You can specify strings, that could be automatically replaced in the devices names. E.g if you set replaces to:
```.STATE,.LEVEL```, so all ".STATE" and ".LEVEL" will be deleted from names. Be careful with spaces.
If you will set ```.STATE, .LEVEL```, so ".STATE" and " .LEVEL" will be replaced and not ".LEVEL".

## Helper states
- **smart.lastObjectID**: This state will be set if only one device was controlled by home skill (alexa, google home).
- **smart.lastFunction**: Function name (if exists) for which last command was executed.
- **smart.lastRoom**:     Room name (if exists) for which last command was executed.
- **smart.lastCommand**:  Last executed command. Command can be: true(ON), false(OFF), number(%), -X(decrease at x), +X(increase at X)
- **smart.lastResponse**: Textual response on command. It can be sent to some text2speech (sayit) engine.

## IFTTT
[instructions](doc/ifttt.md)

## Services
There is a possibility to send messages to cloud adapter.
If you call ```[POST]https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>``` und value as payload.

```
curl --data "myString" https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>
```

or

```[GET]https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>&data=myString```

If you set in the settings the field "White list for services" the name *custom_test*, and call with "custom_test" as the service name, the state **cloud.0.services.custom_test** will be set to *myString*.

You may write "*" in white list and all services will be allowed.

Here you can find instructions how to use it with [tasker](doc/tasker.md).

IFTTT service is allowed only if IFTTT key is set.

Reserved names are "ifttt", "text2command", "simpleApi", "swagger". These must be used without the ```"custom_"``` prefix.

### text2command
You may write "text2command" in white list, you can send POST request to ```https://service.iobroker.in/v1/iotService?service=text2command&key=<user-app-key>&user=<USER_EMAIL>``` to write data into *text2command.X.text* variable.

You can use GET method too ```https://service.iobroker.in/v1/iotService?service=text2command&key=<user-app-key>&user=<USER_EMAIL>&data=<MY COMMAND>```

"X" can be defined in settings by the "Use text2command instance" option.

## Custom skill
The answers for custom skill can be processed in two ways:
- text2command
- javascript

### text2command
if *text2command* instance is defined in the configuration dialog, so the question will be sent to the instance.

*text2command* must be configured that the expected phrase will be parsed and the answer will be given back.

### Javascript
There is a possibility to process the question directly with script. It is activated by default if no *text2command* instance is selected.

If *text2command* instance is defined, so this instance must provide the answer and the answer from *script* will be ignored.

The adapter will provide the details in two states with different detail level
* **smart.lastCommand** contains the received text including an info on type of query (intent). Example: "askDevice Status Rasenmäher"
* **smart.lastCommandObj*** contains an JSON string that can be parsed to an object containing the following information
  * **words** contains the received words in an array
  * **intent** contains the type of query. Possible values currently are "askDevice", "controlDevice", "actionStart", "actionEnd", "askWhen", "askWhere", "askWho"
  * **deviceId** contains a deviceId identifying the device the request was send to, delivered by Amazon, will be empty string if not provided
  * **sessionId** contains a sessionId of the Skill session, should be the same if multiple commands were spoken, delivered by Amazon, will be empty string if not provided
  * **userId** contains a userId from the device owner (or maybe later the user that was interacting with the skill), delivered by Amazon, will be empty string if not provided

 More details on how the words are detected and what type of queries the Alexa Custom Skill differentiates please check https://forum.iobroker.net/viewtopic.php?f=37&t=17452 .

**Return result via smart.lastResponse state**

The response needs to be send within 200ms in the state "smart.lastResponse" and can be a simple text string or a JSON object.
If it is a text string then this text will be send as response to the skill.
if the text is a JSON object then the following keys can be used:
* **responseText** needs to contain the text to return to Amazon
* **shouldEndSession** is a boolean and controls if the session will be closed after the response was spoken or stays open to accept another voice input.

**Return result via message to iot instance**

The iot instance also accepts a message with the name "alexaCustomResponse" containing the key "response" with an object that can contain the keys **responseText** and **shouldEndSession** as described above.
There will be no response from the iot instance to the message!

**Example of a script that uses texts**
```
// important, that ack=true
on({id: 'iot.0.smart.lastCommand', ack: true, change: 'any'}, obj => {
    // you have 200ms to prepare the answer and to write it into iot.X.smart.lastResponse
    setState('iot.0.smart.lastResponse', 'Received phrase is: ' + obj.state.val); // important, that ack=false (default)
});
```

**Example of a script that uses JSON objects**
```
// important, that ack=true
on({id: 'iot.0.smart.lastCommandObj', ack: true, change: 'any'}, obj => {
    // you have 200ms to prepare the answer and to write it into iot.X.smart.lastResponse
    const request = JSON.parse(obj.state.val);
    const response = {
        'responseText': 'Received phrase is: ' + request.words.join(' ') + '. Bye',
        'shouldEndSession': true
    };

    // Return response via state
    setState('iot.0.smart.lastResponse', JSON.stringify(response)); // important, that ack=false (default)

    // or alternatively return as message
    sendTo('iot.0', response);
});
```


### Private cloud
If you use private skill/action/навык for communication with `Alexa/Google Home/Алиса` so you have the possibility to use IoT instance to process the requests from it.

E.g. for `yandex alice`:

```
const OBJECT_FROM_ALISA_SERVICE = {}; // object from alisa service or empty object
OBJECT_FROM_ALISA_SERVICE.alisa = '/path/v1.0/user/devices'; // called URL, 'path' could be any text, but it must be there
sendTo('iot.0', 'private', {type: 'alisa', request: OBJECT_FROM_ALISA_SERVICE}, response => {
    // Send this response back to alisa service
    console.log(JSON.stringify(response));
});
```

Following types are supported:
- `alexa` - acting with Amazon Alexa or Amazon Custom Skill
- `ghome` - acting with Google Actions via Google Home
- `alisa` - acting with Yandex Алиса
- `ifttt` - acting like IFTTT (actually not required, but for tests purposes)

## Yandex Алиса
[instructions](doc/alisa.md)

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

## Changelog
### 1.8.4 (2020-11-18)
* (bluefox) Corrected the configuration table for google home

### 1.8.3 (2020-11-16)
* (bluefox) Trying to fix the set to false at start for google home

### 1.8.2 (2020-11-15)
* (bluefox) Added the debug outputs for google home

### 1.8.1 (2020-11-13)
* (bluefox) The deletion of google home devices was corrected

### 1.8.0 (2020-11-12)
* (bluefox) The google home table was rewritten

### 1.7.15 (2020-11-05)
* (Morluktom) Corrected the request for temperature

### 1.7.14 (2020-11-05)
* (bluefox) Updated the select ID dialog.

#### 1.7.13 (2020-10-30)
* (foxriver76) add eraseOnUpload flag for js-controller 3.2+

### 1.7.12 (2020-09-25)
* (bluefox) Updated the select ID dialog.

### 1.7.9 (2020-09-17)
* (bluefox) Updated GUI for config.

### 1.7.7 (2020-09-02)
* (bluefox) Added information about changed linking process.

### 1.7.6 (2020-08-25)
* (bluefox) Some colors were changed in dark mode.

### 1.7.5 (2020-08-21)
* (Apollon77) Crash prevented (Sentry IOBROKER-IOT-W)
* (bluefox) Values for modes will be converted to numbers in Alisa

### 1.7.3 (2020-08-16)
* (bluefox) Added vacuum cleaner to Alisa

### 1.7.1 (2020-08-16)
* (bluefox) Added blinds, lock and thermostat to Alisa

### 1.6.4 (2020-08-06)
* (Apollon77) crash prevented (Sentry IOBROKER-IOT-V)

### 1.6.3 (2020-08-04)
* (bluefox) Added french letters to allowed symbols

### 1.6.1 (2020-07-10)
* (bluefox) Used new SelectID Dialog in GUI

### 1.5.3 (2020-05-28)
* (bluefox) Small change for nightscout

### 1.5.2 (2020-05-21)
* (bluefox) Changed requirements for password
* (bluefox) Do not try load the "sharp" if blood sugar not enabled

### 1.4.18 (2020-05-11)
* (Apollon77) Make sure that invalid configured states or values without timestamp do not crash adapter (Sentry IOBROKER-IOT-8)
* (Apollon77) Make sure publishes after disconnect to not break adapter (Sentry IOBROKER-IOT-A)

### 1.4.17 (2020-05-11)
* (bluefox) Better error output is implemented

### 1.4.14 (2020-05-01)
* (bluefox) Fixed the problem if admin is not on 8081 port

### 1.4.12 (2020-04-30)
* (Apollon77) error case handled where system.config objects does not exist (Sentry IOBROKER-IOT-5)

### 1.4.11 (2020-04-26)
* (bluefox) fixed IOBROKER-IOT-REACT-F

### 1.4.10 (2020-04-24)
* (bluefox) Fixed crashes reported by sentry

### 1.4.7 (2020-04-23)
* fix iot crash when timeouts in communications to Google happens (Sentry IOBROKER-IOT-2)
* fix iot crash when google answers without customData (Sentry IOBROKER-IOT-1)

### 1.4.6 (2020-04-18)
* (Apollon77) Add Sentry error reporting to React Frontend

### 1.4.4 (2020-04-14)
* (Apollon77) remove js-controller 3.0 warnings and replace adapter.objects access
* (Apollon77) add linux dependencies for canvas library
* (Apollon77) add sentry configuration

### 1.4.2 (2020-04-08)
* (TA2k) Fix updateState for Google Home

### 1.4.1 (2020-04-04)
* (bluefox) The blood glucose request supported now

### 1.3.4 (2020-02-26)
* (TA2k) Fixed deconz issues in Google Home

### 1.3.3 (2020-02-12)
* (Apollon77) fix alisa error with invalid smartName attributes

### 1.3.2 (2020-02-10)
* (Apollon77) usage with all kinds of admin ports and reverse proxies optimized

### 1.3.1 (2020-02-09)
* (Apollon77) Dependency updates
* (APollon77) Make compatible with Admin > 4.0 because of updated socket.io

### 1.2.1 (2020-01-18)
* (bluefox) Fixed problem if the port of admin is not 8081

### 1.2.0 (2020-01-04)
* (TA2k) Google Home handling and visualization improved.

### 1.1.10 (2020-01-03)
* (bluefox) Now is allowed to selected the temperature values as alexa states
* (bluefox) Allowed to set type immediately after insertion of new state

### 1.1.9 (2019-11-27)
* (bluefox) Fixed: sometimes the configuration could not be loaded

### 1.1.8 (2019-09-12)
* (bluefox) Optimization of googe home communication was done

### 1.1.7 (2019-09-11)
* (bluefox) The sending rate to google home is limited now

### 1.1.6 (2019-09-11)
* (TA2k) Room fix for Google Home and LinkedDevices

### 1.1.4 (2019-09-10)
* (bluefox) decreased keepalive value to fix issue with disconnect

### 1.1.3 (2019-09-09)
* (TA2k) Google Home problem fixed with LinkedDevices

### 1.1.0 (2019-09-06)
* (bluefox) Added support of aliases

### 1.0.8 (2019-09-03)
* (TA2k) Improved support for Google Home
* (TA2k) Added auto detection for RGB, RGBSingle, Hue, CT, MediaDevice, Switch, Info, Socket, Light, Dimmer, Thermostat, WindowTilt, Blinds, Slider
* (TA2k) Added support for manualy adding states as devices
* (TA2k) Fix update state after Sync
* (TA2k) Added typical Google Home devices and traits/actions
* (TA2k) Fix only process update message when Alexa is checked in the options

### 1.0.4 (2019-08-01)
* (bluefox) Fixed password encoding. Please enter password anew!

### 1.0.3 (2019-07-30)
* (bluefox) Fixed language issues for google home and yandex alice

### 1.0.1 (2019-07-26)
* (bluefox) Support of private skills/actions was added.

### 1.0.0 (2019-07-14)
* (TA2k) Google Home list was added

### 0.5.0 (2019-06-29)
* (bluefox) tried to add yandex Alisa

### 0.4.3 (2019-04-14)
* (Apollon77) Change enable/disable of Amazon Alexa and of Google Home from configuration to be really "active if selected".

### 0.4.2 (2019-03-10)
* (bluefox) Allowed the enable and disable of Amazon Alexa and of Google Home from configuration.

### 0.4.1 (2019-02-19)
* (bluefox) Add version check to google home

### 0.3.1 (2019-01-13)
* (bluefox) Blockly was fixed

### 0.3.0 (2018-12-30)
* (bluefox) Detection of google devices was fixed

### 0.2.2 (2018-12-21)
* (bluefox) Generation of new URL key was added

### 0.2.0 (2018-12-18)
* (bluefox) Change the name of adapter

### 0.1.8 (2018-10-21)
* (bluefox) Added extended diagnostics

### 0.1.7 (2018-10-14)
* (bluefox) The configuration dialog was corrected
* (bluefox) The possibility to create the answer with script for the custom skill was implemented.

### 0.1.4 (2018-09-26)
* (bluefox) Initial commit

## License
The MIT License (MIT)

Copyright (c) 2018-2020 bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

