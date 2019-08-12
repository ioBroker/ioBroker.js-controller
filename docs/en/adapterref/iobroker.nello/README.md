![Logo](admin/nello.png)
# ioBroker.nello
nello one connects your intercom with your smartphone and Wi-Fi. This adapter connects your nello one to ioBroker using the official API (https://nellopublicapi.docs.apiary.io/).

Developers may find the javascript implementation of the nello.io API via https://github.com/Zefau/nello.io.

![Number of Installations](http://iobroker.live/badges/nello-installed.svg)
![Stable version](http://iobroker.live/badges/nello-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.nello.svg)](https://www.npmjs.com/package/iobroker.nello)
[![Travis CI](https://travis-ci.org/Zefau/ioBroker.nello.svg?branch=master)](https://travis-ci.org/Zefau/ioBroker.nello)
[![Downloads](https://img.shields.io/npm/dm/iobroker.nello.svg)](https://www.npmjs.com/package/iobroker.nello)
[![Greenkeeper badge](https://badges.greenkeeper.io/Zefau/ioBroker.nello.svg)](https://greenkeeper.io/)

[![NPM](https://nodei.co/npm/iobroker.nello.png?downloads=true)](https://nodei.co/npm/iobroker.nello/) 

## [German Readme / Deutsche Anleitung](https://github.com/Zefau/ioBroker.nello/blob/master/README.de.md)

**Table of contents**
1. [Setup instructions (Quick Setup)](#quick-setup)
2. [Setup instructions (Advanced Setup)](#advanced-setup)
3. [Usage / Actions](#usage--actions)
   1. [Open Door](#open-door)
   2. [Adding a Time Window](#adding-a-new-time-window)
   3. [Deleting a Time Window](#deleting-a-time-window) 
4. [Smart Home / Alexa integration using ioBroker.javascript](#smart-home--alexa-integration-using-iobrokerjavascript)
   1. [Open door using Alexa](#open-door-using-alexa)
   2. [Let Alexa inform you about door ring](#let-alexa-inform-you-about-door-ring)
   3. [Let colored lamps inform you about door ring](#let-colored-lamps-inform-you-about-door-ring)
5. [Credits](#credits)
6. [Changelog](#changelog)
7. [Licence](#license)


## Setup instructions
### Quick Setup
The nello auth API is responsible for authentication of all nello client apps. This service follows OAuth2 as an authentication scheme to authenticate an app/user. For further information about the OAuth2 standard, please check here: https://oauth.net/2/.
To use this service, client credentials must be obtained from the nello auth admin UI located at: https://auth.nello.io/admin. Please not that for the time being you can only get one pair of client_id and client_secret. They consist of a client_id and a client_secret.

1. Generate Client ID and Client Secret on https://auth.nello.io/admin
2. In the ioBroker.nello adapter settings, fill in both Client ID / Client Secret
3. Press the button "Get Token" to generate a token
4. Save and enjoy the adapter

This quick setup will retrieve your locations (all available doors) from the nello API including the respective address. Furthermore, the assigned time windows of the locations will be retrieved. Additionally, you may open the door with this basic setup.
To receive events (door bell rings), you have to follow the advanced setup.

#### Log
If you successfully quick-setup ioBroker.nello, you will find the following in the ioBroker Log:
```
nello.0	2018-11-24 21:29:48.132	info	Updating time windows of location XXXXX.
nello.0	2018-11-24 21:29:47.905	info	Updating location: {"location_id":"XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX","address":{"number":"X","country":"XXXXX","street":"XXXXX ","zip":"XXXXX","city":"XXXXX","state":""}}
nello.0	2018-11-24 21:29:47.342	info	starting. Version X.X.X in /opt/iobroker/node_modules/iobroker.nello, node: vX.XX.X
```

#### States
If you successfully quick-setup ioBroker.nello, you will find yours doors as devices within "**nello.0.**". The format of a door is _xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx_. Within each device, the following channels and states are created:

| Channel | State | Description |
|:------- |:----- |:------------- |
| address | - | Address data of the location |
| address | address | Full address of the location |
| address | city | City of the location |
| address | country | Country of the location |
| address | state | State  of the location |
| address | street | Street with number of the location |
| address | streetName | Street name of the location |
| address | streetNumber | Street number of the location |
| address | zip | ZIP code of the location |
| timeWindows | - | Time Windows of the location |
| timeWindows | indexedTimeWindows | Index of all time windows |
| timeWindows | deleteAllTimeWindows | Deletion of all time windows |
| timeWindows | **createTimeWindow**\* | JSON object for creating a new timewindow ([Documentation](#adding-a-new-time-window)) |
| timeWindows.0000000000000000000 | - | Time Window: Description of the time window |
| timeWindows.0000000000000000000 | enabled | State whether time window is enabled |
| timeWindows.0000000000000000000 | icalObj | JSON object of the calendar data |
| timeWindows.0000000000000000000 | icalRaw | Text of the calendar data in iCal format |
| timeWindows.0000000000000000000 | id | ID of the time window |
| timeWindows.0000000000000000000 | image | (not in used) |
| timeWindows.0000000000000000000 | name | Name of the time window |
| timeWindows.0000000000000000000 | state | State |
| timeWindows.0000000000000000000 | **deleteTimeWindow**\* | Delete this timewindow |
| - | **&#95;openDoor**\* | Open door of location XXXXX |
| - | id | ID of location XXXXX |
| - | refreshedDateTime | Last update (DateTime) of location XXXXX |
| - | refreshedTimestamp | Last update (Timestamp) of location XXXXX |

\* _highlighted states will trigger / perform an action when changed_

**Remark: You will _only_ see those states if you have successfully quick-setup ioBroker.nello!**


### Advanced Setup
#### Option 1: ioBroker.cloud / ioBroker.iot Custom URL (recommended)
To receive events (door bell rings) it is recommended to use either ioBroker.cloud or ioBroker.iot adapter.
The ioBroker.cloud / ioBroker.iot adpater will receive the event from nello and write it in a state, which is then readable by the ioBroker.nello adapter.

##### ioBroker.iot
1. Go to the adapter settings of ioBroker.iot and navigate to the _Services and IFTTT_ Tab.
2. Add the term "_nello_" to the "_White list for services_" and copy the link for the custom services ("_Use following link for custom service_"), which looks like ```https://service.iobroker.in/v1/iotService?service=custom_<SERVICE_NAME>&key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx&user=email@domain.com&data=<SOME_TEXT>```.
   ![Step 2](screenshots/step-2.jpg)
3. Replace ```custom_<SERVICE_NAME>``` with the service name ```custom_nello``` (make sure that the term appended to ```custom_``` matches the whitelisted word in step #2). Futhermore, remove ```&data=<SOME_TEXT>``` because it is not necessary.
4. Go to the **nello adapter configuration** and paste the link into "_ioBroker.iot Service URL_" (in Option 1).
   ![Step 4](screenshots/step-4.jpg)
5. Save the nello Adapter settings and wait until the Adapter has (re)started. Then, ring at your door and verify the state has been created by ioBroker.iot. You will find the state called ```custom_nello``` within the ioBroker objects via ```iot.0.services```.
   ![Step 6](screenshots/step-6.jpg)
6. Once the state has been created successfully, restart the nello Adapter once more to be sure that the nello Adapter subscribes this newly created iot state

##### ioBroker.cloud
1. Go to the adapter settings of ioBroker.cloud and navigate to the _Services and IFTTT_ Tab.
2. Add the term "_nello_" to the "_White list for services_" and copy the link for the custom services ("_Use following link for custom service_"), which looks like ```https://iobroker.net/service/```.
3. Add ```custom_nello``` (make sure that the term appended to ```custom_``` matches the whitelisted word in step #2).
4. Add your API key, so the URL eventually looks like ```https://iobroker.net/service/custom_nello/xxxxxx```.
5. Go to the **nello adapter configuration** and paste the link into "_ioBroker.iot Service URL_" (in Option 1).
6. Save the nello Adapter settings and wait until the Adapter has (re)started. Then, ring at your door and verify the state has been created by ioBroker.cloud. You will find the state called ```custom_nello``` within the ioBroker objects via ```cloud.0.services```.
7. Once the state has been created successfully, restart the nello Adapter once more to be sure that the nello Adapter subscribes this newly created cloud state

#### Option 2: DynDNS URL
To receive events (door bell rings) you may alternatively provide an external URL (with port) in the ioBroker.nello adapter settings.
This URL (incl. port) is sent to the nello API and registered. In case a door bell ring is registered by the API, the API will push this information to the provided URL. Please refer to https://en.wikipedia.org/wiki/Webhook for more information.
If you no DynDNS address and no idea what the shit I'm talking about, please refer to https://www.howtogeek.com/66438/how-to-easily-access-your-home-network-from-anywhere-with-ddns/.

1. Place the external DynDNS address including a port of your choice in the ioBroker.nello adapter settings
2. Open the port of your choice in your router and route it to the ioBroker
3. Done. You will now have additional states in your nello tree within the channel "events" and all events are written to a state named "feed".

#### Log
Independently of the option you chose, if you successfully advanced-setup ioBroker.nello, you will additionally find the following in the ioBroker Log:
```
nello.0	2018-11-24 21:29:48.220	info	Listener attached to uri https://XXXX.XXXXX.XX:YYYY.
```

In case an event has been recognized by the webook listener, you will find any of those entries in the ioBroker Log:
```
nello.0	2018-11-24 21:38:48.322	info	Received data from the webhook listener (action -deny-).
```
**deny**: When nello detects a bell ring, but neither a Time Window nor a Homezone Event caused the door to be opened.

```
nello.0	2018-11-24 21:38:48.322	info	Received data from the webhook listener (action -swipe-).
```
**swipe**: When the door opens by an authorized user.

```
nello.0	2018-11-24 21:38:48.322	info	Received data from the webhook listener (action -geo-).
```
**geo**: When the door is opened because of the Homezone Unlock feature (with a bell ring).

```
nello.0	2018-11-24 21:38:48.322	info	Received data from the webhook listener (action -tw-).
```
**tw**: When the door is opened because of a Time indow (with a bell ring).

#### States
If you successfully advanced-setup ioBroker.nello, the following additional channels and states are created:

| Channel | State | Description |
|:------- |:----- |:------------- |
| events | - | Events of the location |
| events | feed | Activity feed / Event history |
| events | refreshedDateTime | DateTime of the last event |
| events | refreshedTimestamp | Timestamp of the last event |

**Remark: You will _only_ see those states if you have successfully advanced-setup ioBroker.nello AND a first event as been recognized (someone rang on your)!**

The "feed" state will provide a JSON of all events registered by the webhook. This will be an array of objects, where each object provides the following indizes (for details see https://nellopublicapi.docs.apiary.io/#reference/0/locations-collection/add-/-update-webhook):
- **action**: deny, swipe, tw or geo
- **data**:
    - location_id
    - timestamp
    - user_id (only actions swipe, tw or geo)
    - name (only actions swipe, tw or geo)


## Usage / Actions
### Open Door
To open the door of your nello, press the button of the state ```_openDoor```.
### Adding a new Time Window
For adding a new time window, paste the contents to the state ```timeWindows.createTimeWindow```. The following format is expected:

```
{"name":"<NAME>","ical":"<iCal-String>"}
```
The format of the iCal-String can be found in the Nello API documentation (https://nellopublicapi.docs.apiary.io/#reference/0/locations-collection/create-a-new-time-window). **It is important to separate the individual elements with ```\r\n```**.

Example of a timewindow:
```
{"name":"Cleaner","ical":"BEGIN:VCALENDAR\r\nBEGIN:VEVENT\r\nDTSTART:20190101T163000Z\r\nDTEND:20190101T170000Z\r\nSUMMARY:Cleaner\r\nEND:VEVENT\r\nEND:VCALENDAR"}
```

### Deleting a Time Window
To delete a time window, press the button within the object tree of the respective time window.


## Smart Home / Alexa integration using ioBroker.javascript
Some examples of a possible integration within your smart home.

### Open door using Alexa
This requires the ioBroker adapter ioBroker.cloud (https://github.com/ioBroker/ioBroker.cloud).

Save the following function within a script in the "global" folder in the "Scripts" tab of ioBroker:

```javascript
/**
 * Register node in Cloud Adapter
 * 
 * @param   {string}    node        Node to be published
 * @param   {string}    label       Name / label of the node within Cloud Adapter
 * @param   {object}    settings    (optional) Extra settings
 * @param   {string}    type        (optional) Type of node, e.g. LIGHT, SWITCH, THERMOSTAT, ACTIVITY_TRIGGER, SCENE_TRIGGER, SMARTPLUG, SMARTLOCK, CAMERA
 * @param   {string}    byOn        (optional) Default when turning on
 * @return  void
 */
function cloud(node, label, settings = {})
{
    log('Published '+node+' as '+label+' in Cloud Adapter.');
    
    settings = typeof settings === 'string' ? {type: settings} : settings;
    extendObject(node, {common: {smartName: {en: label, smartType: settings.type || 'SWITCH', byON: settings.byON || ''}}});
}
```
_(updated on 2018-11-22 and fixed incorrect empty settings)_

You can use this function for every state within ioBroker Object tree to register the state in the ioBroker.cloud adapter and use it within Alexa.
**IMPORTANT**: Go into adapter settings of ioBroker.javascript and check the box "Enable command setObject"!

Now create a new script in the "common" folder using the function:
```javascript
cloud('nello.0.#YOUR DOOR ID#._openDoor', 'Tür öffnen');
```
Replace **#YOUR DOOR ID#** (also replace #) with the ID of the door you want to open. You find the ID in the ioBroker.nello state tree ("Objects" tab of ioBroker).

Eventually, search / discover new devices in your Alexa app and create a routine in the Alexa app (e.g. "Alexa, open door") and assign the newly discovered state to it. Finished! Now you may tell Alexa to open your door for you.

### Let Alexa inform you about door ring
This requires the ioBroker adapter ioBroker.alexa2 (https://github.com/Apollon77/ioBroker.alexa2).

In order to use the voice output of Alexa we define a function ```say```. Place the following function in a script in the "global" folder of ioBroker.javascript (you may place it in the same one as above). **IMPORTANT**: Replace #YOUR ALEXA ID# (also replace #) with your Alexa ID. You may find the Alexa ID in the Objects tree of ioBroker ```alexa2.0.Echo-Devices```.

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
_(updated on 2018-11-18 to support voice output from multiple alexa devices at a time)_

You can use this function within ioBroker.javascript to say a phrase using Alexa  ```say('Hello World')``` or ```say('Hello World', ['#YOUR ALEXA ID 1#', '#YOUR ALEXA ID 2#'])``` for voice output from multiple devices.

Create a script in the "common" folder of ioBroker.javascript (or use the one you created above) and add the following listener to it:

```javascript
var L = {
   'actionRingUnknown': 'Es hat geklingelt',
   'actionOpenName': '%name% hat die Tür geöffnet',
   'actionOpenGeo': '%name% hat das Haus betreten',
   'actionOpen': 'Die Haustür wurde geöffnet'
};

on({id: 'nello.0.ID.events.feed', change: 'any'}, function(obj)
{
   var events = JSON.parse(obj.state.val);
   if (events.length === 0) return;

   var event = events[events.length-1];
   if (event.action == 'deny')
      say(L.actionRingUnknown);

   else if (event.action == 'swipe')
      say(L.actionOpenName.replace(/%name%/gi, event.data.name));

   else if (event.action == 'geo')
      say(L.actionOpenGeo.replace(/%name%/gi, event.data.name));

   else
      say(L.actionOpen);
});
```
_(updated on 2019-01-02 to also reflect geo option with specific Alexa phrase)_

Based on the action of the event, Alexa will inform you about the door being opened or the door bell being recognized.
**IMPORTANT**: Replace #YOUR DOOR ID# (also replace #) with your nello door ID.

### Let colored lamps inform you about door ring
This functionality requires an adapter which can set colored / rgb lamps, e.g. ioBroker.hue (https://github.com/ioBroker/ioBroker.hue).

In order to use the colored lamps, the functions ```color``` und ```colors``` have to be defined. Place the following functions in a script in the "global" folder of ioBroker.javascript (you may place it in the same one as above):

```javascript
/**
 * Visualize a message using a color / hue.
 * 
 * @param       {string|array}  devices         Device(s) the color shall be set
 * @param       {object}        hue             Color code to bet set
 * @param       {integer}       hue.r           (optional) Red part of the color to be set
 * @param       {integer}       hue.g           (optional) Green part of the color to be set
 * @param       {integer}       hue.b           (optional) Blue part of the color to be set
 * @param       {integer}       hue.w           (optional) White part of the color to be set
 * @param       {integer}       hue.bri         (optional) Brightness part of the color to be set
 * @param       {integer}       hue.rgb         (optional) All RGB parts of the color to be set
 * @return      void
 * 
 */
function color(devices, hue)
{
    devices = typeof devices === 'string' ? [devices] : devices;
    devices.forEach(function(device)
    {
	    ['b', 'g', 'w', 'r', 'bri', 'rgb'].forEach(function(key)
    	{
    		if (hue[key] !== undefined)
    			setState(device + '.' + key, hue[key]);
    	});
    });
}
```

```javascript
/**
 * Append multiple messages using a delay to create a light sequence.
 * 
 * @param       {string|array}  devices         Device(s) the color shall be set
 * @param       {array}         hues            Color code to bet set
 * @param       {number}        delay           (optional) Delay between steps
 * @param       {number}        start           (optional) Delayed start
 * @return      {number}                        Total delay used
 * 
 */
function colors(devices, hues, delay = 3000, start = 0)
{
    var delayed = start;
    devices = typeof devices === 'string' ? [devices] : devices;
    devices.forEach(function(device)
    {
        // get initial state and colors
        var defaults = {};
        ['on', 'xy', 'bri'].forEach(function(initial) {defaults[initial] = getState(device + '.' + initial).val});

        // turn lights on if currently off
        if (defaults.on !== true)
        {
            setState(device + '.on', true);
            delayed += 800;
        }

        // loop through colors
        hues.forEach(function(hue, i)
    	{
            delayed += delay;
            setTimeout(function()
            {
                color(device, hue);
            }, delayed);
    	});
        
        // restore initial states
        delayed += 1000;
        setTimeout(function()
        {
            setState(device + '.xy', defaults['xy']);
            if (defaults['on'] === true)
                setState(device + '.bri', defaults['bri']);
        }, delayed);

        // turn off again (if it was off)
        if (defaults['on'] === false)
        {
            delayed += 2000;
            setTimeout(function() {setState(device + '.on', false)}, delayed); // delayed so colors is set before turned off
        }
    });

    return delayed;
}
```
_(updated on 2019-01-20 to fix issue [#11](https://github.com/Zefau/ioBroker.nello/issues/11))_


You can use these functions within ioBroker.javascript to color any lamp, e.g. by ```color('hue.0.Philips_hue.Lamp', {'r': 0, 'g': 255, 'b': 0})``` (color green) or ```color(['hue.0.Philips_hue.Lamp1', 'hue.0.Philips_hue.Lamp2'], {'r': 0, 'g': 255, 'b': 0})```, to color multiple devices.

Create a script in the "common" folder of ioBroker.javascript (or use the one you created above) and add the following listener to it:

```javascript
var lamp = '#YOUR LAMP#'; // e.g. hue.0.Philips_hue.Lamp
var rgb = {
   'actionRingUnknown': {'r': 255, 'g': 0, 'b': 0, 'bri': 255},
   'actionOpenName': {'r': 0, 'g': 255, 'b': 0, 'bri': 255},
   'actionOpenGeo': {'r': 0, 'g': 255, 'b': 0, 'bri': 255},
   'actionOpen': {'r': 0, 'g': 255, 'b': 0, 'bri': 255},
   'reset': {'r': 255, 'g': 255, 'b': 255, 'bri': 255},
};

on({id: 'nello.0.#YOUR DOOR ID#.events.feed', change: 'any'}, function(obj)
{
    var events = JSON.parse(obj.state.val);
    if (events.length === 0) return;
    
    var event = events[events.length-1];
    if (event.action == 'deny')
        colors(lamp, [
            rgb.actionRingUnknown,
            {'bri': 50}, {'bri': 255}, {'bri': 50}, {'bri': 255}, {'bri': 50}, {'bri': 255}
        ], 500);
    
    else if (event.action == 'swipe')
        colors(lamp, [
            rgb.actionOpenName,
            {'bri': 50}, {'bri': 255}, {'bri': 50}, {'bri': 255}, {'bri': 50}, {'bri': 255}
        ], 500);
    
    else if (event.action == 'geo')
        colors(lamp, [
            rgb.actionOpenGeo,
            {'bri': 50}, {'bri': 255}, {'bri': 50}, {'bri': 255}, {'bri': 50}, {'bri': 255}
        ], 500);
        
    else
        colors(lamp, [
            rgb.actionOpen,
            {'bri': 50}, {'bri': 255}, {'bri': 50}, {'bri': 255}, {'bri': 50}, {'bri': 255}
        ], 500);
});
```

Based on the action of the event, the lamps will be colored with the defined values.
**IMPORTANT**: Replace **#YOUR LAMP#** (also replace #) with the state of the lamp you would like to color. Replace **#YOUR DOOR ID#** (also replace #) with your nello door ID.


## Credits
Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>


## Changelog

### 2.0.8 (2019-08-11)
- (Zefau) Fixed Error `State not properly defined`

### 2.0.7 (2019-08-10)
- (Zefau) Performance improvements

### 2.0.6 (2019-07-20)
- (Zefau) updated dependencies to fix security vulnerabilities in depending packages

### 2.0.5 (2019-05-15)
- ([@Apollon77](https://github.com/Apollon77)) updated testing for Node.js v12 ([#25](https://github.com/Zefau/ioBroker.nello/pull/25))
- (Zefau) updated dependencies

### 2.0.4 (2019-03-15)
- ([@Apollon77](https://github.com/Apollon77)) Core Files/Testing Update and introduce adapter-core ([#17](https://github.com/Zefau/ioBroker.nello/pull/17)) and Update CI testing ([#19](https://github.com/Zefau/ioBroker.nello/pull/19))

### 2.0.3 (2019-03-03)
- (Zefau) added folder `.events.latest` with states `action`, `twName`, `userId` and `userName` reflecting the information of the latest event

### 2.0.2 (2019-02-09)
- (Zefau) fixed error incorrectly stating a missing token

### 2.0.1 (2019-02-01)
- (Zefau) added error stack trace in log debug output
- ([@ldittmar81](https://github.com/ldittmar81)) added support for gulp

### 2.0.0 (2019-01-27)
- (Zefau) added visual timeline of nello events
- (Zefau) support for [ioBroker compact mode](https://forum.iobroker.net/viewtopic.php?f=24&t=20387#p213466)
- (Zefau) updated API dependency

### 1.x.x
For earlier release, [please see Github branch for v1](https://github.com/Zefau/ioBroker.nello/tree/v1#changelog).


## License
The MIT License (MIT)

Copyright (c) 2018-2019 Zefau <zefau@mailbox.org>

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
