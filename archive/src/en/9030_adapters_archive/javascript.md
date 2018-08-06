##

## [](https://github.com/ioBroker/ioBroker.javascript#global-functions)Global functions

You can define the global scripts in the "global" folder. All global scripts are available on all instances. If global script is disabled, it will not be used. Global script will be just prepend to the normal script and compiled, so you cannot share data between scripts via global scrips. Use states for it.

#### [](https://github.com/ioBroker/ioBroker.javascript#best-practice)Best practice:

Create two instances of javascript adapter: one "test" and one "production". After the script is tested in the "test" instance, it can be moved to "production". By that you can restart the "test" instance as you want.

## [](https://github.com/ioBroker/ioBroker.javascript#following-functions-can-be-used-in-scripts)Following functions can be used in scripts:

### [](https://github.com/ioBroker/ioBroker.javascript#require---load-some-module)require - load some module

var mod = require('module_name');

Following modules are pre-loaded: fs, crypto, wake_on_lan, request, suncalc, util, path, os, net, events, dns. To use other modules go to iobroker/adapter/javascript folder and run in console npm install . After npm successfully finished it can be used in script engine.

### [](https://github.com/ioBroker/ioBroker.javascript#buffer)Buffer

Buffer - Node.js Buffer, read here [http://nodejs.org/api/buffer.html](http://nodejs.org/api/buffer.html)

### [](https://github.com/ioBroker/ioBroker.javascript#log---gives-out-the-message-into-log)log - Gives out the message into log

log(msg, sev)

Message is a string and sev is one of the following: 'debug', 'info', 'warn', 'error'. Default severity is **_'info'_**

### [](https://github.com/ioBroker/ioBroker.javascript#exec---execute-some-os-command-like-cp-file1-file2)exec - execute some OS command, like "cp file1 file2"

exec (cmd, callback)

Execute system command and get the outputs.

// reboot linux system :)
exec('reboot');

// Get the list of files and directories in /var/log
exec('ls /var/log', function (error, stdout, stderr) {
console.log('stdout: ' + stdout);
});

### [](https://github.com/ioBroker/ioBroker.javascript#on---subscribe-on-changes-or-updates-of-some-state)on - Subscribe on changes or updates of some state

on(pattern, callbackOrId, value)

The callback function will return the object as parameter with following content:

{
'_id' : 'javascript.0.myplayer',
'type' : 'state',
'common' : {
'def' :    '0',
'min'  :   '0',
'max'  :   '6',
'type' :   'number',
'read' :   'true',
'write' :  'true',
'states' : '0:stop;1:play;2:pause;3:next;4:previous;5:mute;6:unmute',
'role' :   'media.state',
'desc' :   'Player handling',
'name' :   'MyPlayer'
},
'native' : {},
'channelId' :   'channelID',
'channelName' : 'channelName',
'deviceId' :    'deviceID',
'deviceName' :  'deviceName',
'enumIds' : [],
'enumNames' : [],
'state' : {
'val' :  'new state',
'ts' :   1416149118,
'ack' :  true,
'lc' :   1416149118,
'from' : 'system.adapter.sonos.0'
},
'oldState' : {
'val' :  'old state',
'ts' :   1416148233,
'ack' :  true,
'lc' :   1416145154,
'from' : 'system.adapter.sonos.0'
}
}

**Note:** early was _newState_ instead of _state_. It is still working. Example:

var timer;

// Create state "javascript.0.counter"
createState('counter', 0);

// On change
on('adapter.0.device.channel.sensor', function (obj) {
// But not ofter than 30 seconds
if (!timer) {
timer = setTimeout(function () {
timer = null;
}, 30000);

// Set acknowledged value
setState('counter', 1 + getState('counter'), true/*ack*/);

// Or to set unacknowledged command
setState('adapter.0.device.channel.actor', true);
}
});

You can use following parameters to specify the trigger:

<table>

<thead>

<tr>

<th>parameter</th>

<th>type/value</th>

<th>description</th>

</tr>

</thead>

<tbody>

<tr>

<td>logic</td>

<td>string</td>

<td>"and" or "or" logic to combine the conditions (default: "and")</td>

</tr>

<tr>

<td></td>

<td></td>

<td></td>

</tr>

<tr>

<td>id</td>

<td>string</td>

<td>name ist equal to given one</td>

</tr>

<tr>

<td></td>

<td>RegExp</td>

<td>name matched to regular expression</td>

</tr>

<tr>

<td></td>

<td></td>

<td></td>

</tr>

<tr>

<td>name</td>

<td>string</td>

<td>name ist equal to given one</td>

</tr>

<tr>

<td></td>

<td>RegExp</td>

<td>name matched to regular expression</td>

</tr>

<tr>

<td></td>

<td></td>

<td></td>

</tr>

<tr>

<td>change</td>

<td>string</td>

<td>"eq", "ne", "gt", "ge", "lt", "le", "any"</td>

</tr>

<tr>

<td></td>

<td>"eq"</td>

<td>(equal) New value must be equal to old one (state.val == oldState.val)</td>

</tr>

<tr>

<td></td>

<td>"ne"</td>

<td>(not equal) New value must be not equal to the old one (state.val != oldState.val) **If pattern is id-string this value is used by default**</td>

</tr>

<tr>

<td></td>

<td>"gt"</td>

<td>(greater) New value must be greater than old value (state.val > oldState.val)</td>

</tr>

<tr>

<td></td>

<td>"ge"</td>

<td>(greater or equal) New value must be greater or equal to old one (state.val >= oldState.val)</td>

</tr>

<tr>

<td></td>

<td>"lt"</td>

<td>(smaller) New value must be smaller than old one (state.val < oldState.val)</td>

</tr>

<tr>

<td></td>

<td>"le"</td>

<td>(smaller or equal) New value must be smaller or equal to old value (state.val <= oldState.val)</td>

</tr>

<tr>

<td></td>

<td>"any"</td>

<td>Trigger will be raised if just the new value comes</td>

</tr>

<tr>

<td></td>

<td></td>

<td></td>

</tr>

<tr>

<td>val</td>

<td>mixed</td>

<td>New value must be equal to given one</td>

</tr>

<tr>

<td>valNe</td>

<td>mixed</td>

<td>New value must be not equal to given one</td>

</tr>

<tr>

<td>valGt</td>

<td>mixed</td>

<td>New value must be greater than given one</td>

</tr>

<tr>

<td>valGe</td>

<td>mixed</td>

<td>New value must be greater or equal to given one</td>

</tr>

<tr>

<td>valLt</td>

<td>mixed</td>

<td>New value must be smaller than given one</td>

</tr>

<tr>

<td>valLe</td>

<td>mixed</td>

<td>New value must be smaller or equal to given one</td>

</tr>

<tr>

<td></td>

<td></td>

<td></td>

</tr>

<tr>

<td>ack</td>

<td>boolean</td>

<td>Acknowledged state of new value is equal to given one</td>

</tr>

<tr>

<td></td>

<td></td>

<td></td>

</tr>

<tr>

<td>oldVal</td>

<td>mixed</td>

<td>Previous value must be equal to given one</td>

</tr>

<tr>

<td>oldValNe</td>

<td>mixed</td>

<td>Previous value must be not equal to given one</td>

</tr>

<tr>

<td>oldValGt</td>

<td>mixed</td>

<td>Previous value must be greater than given one</td>

</tr>

<tr>

<td>oldValGe</td>

<td>mixed</td>

<td>Previous value must be greater or equal to given one</td>

</tr>

<tr>

<td>oldValLt</td>

<td>mixed</td>

<td>Previous value must be smaller than given one</td>

</tr>

<tr>

<td>oldValLe</td>

<td>mixed</td>

<td>Previous value must be smaller or equal to given one</td>

</tr>

<tr>

<td></td>

<td></td>

<td></td>

</tr>

<tr>

<td>oldAck</td>

<td>bool</td>

<td>Acknowledged state of previous value is equal to given one</td>

</tr>

<tr>

<td></td>

<td></td>

<td></td>

</tr>

<tr>

<td>ts</td>

<td>string</td>

<td>New value time stamp must be equal to given one (state.ts == ts)</td>

</tr>

<tr>

<td>tsGt</td>

<td>string</td>

<td>New value time stamp must be not equal to the given one (state.ts != ts)</td>

</tr>

<tr>

<td>tsGe</td>

<td>string</td>

<td>New value time stamp must be greater than given value (state.ts > ts)</td>

</tr>

<tr>

<td>tsLt</td>

<td>string</td>

<td>New value time stamp must be greater or equal to given one (state.ts >= ts)</td>

</tr>

<tr>

<td>tsLe</td>

<td>string</td>

<td>New value time stamp must be smaller than given one (state.ts < ts)</td>

</tr>

<tr>

<td></td>

<td></td>

<td></td>

</tr>

<tr>

<td>oldTs</td>

<td>string</td>

<td>Previous time stamp must be equal to given one (oldState.ts == ts)</td>

</tr>

<tr>

<td>oldTsGt</td>

<td>string</td>

<td>Previous time stamp must be not equal to the given one (oldState.ts != ts)</td>

</tr>

<tr>

<td>oldTsGe</td>

<td>string</td>

<td>Previous time stamp must be greater than given value (oldState.ts > ts)</td>

</tr>

<tr>

<td>oldTsLt</td>

<td>string</td>

<td>Previous time stamp must be greater or equal to given one (oldState.ts >= ts)</td>

</tr>

<tr>

<td>oldTsLe</td>

<td>string</td>

<td>Previous time stamp must be smaller than given one (oldState.ts < ts)</td>

</tr>

<tr>

<td></td>

<td></td>

<td></td>

</tr>

<tr>

<td>lc</td>

<td>string</td>

<td>Last change time stamp must be equal to given one (state.lc == lc)</td>

</tr>

<tr>

<td>lcGt</td>

<td>string</td>

<td>Last change time stamp must be not equal to the given one (state.lc != lc)</td>

</tr>

<tr>

<td>lcGe</td>

<td>string</td>

<td>Last change time stamp must be greater than given value (state.lc > lc)</td>

</tr>

<tr>

<td>lcLt</td>

<td>string</td>

<td>Last change time stamp must be greater or equal to given one (state.lc >= lc)</td>

</tr>

<tr>

<td>lcLe</td>

<td>string</td>

<td>Last change time stamp must be smaller than given one (state.lc < lc)</td>

</tr>

<tr>

<td></td>

<td></td>

<td></td>

</tr>

<tr>

<td>oldLc</td>

<td>string</td>

<td>Previous last change time stamp must be equal to given one (oldState.lc == lc)</td>

</tr>

<tr>

<td>oldLcGt</td>

<td>string</td>

<td>Previous last change time stamp must be not equal to the given one (oldState.lc != lc)</td>

</tr>

<tr>

<td>oldLcGe</td>

<td>string</td>

<td>Previous last change time stamp must be greater than given value (oldState.lc > lc)</td>

</tr>

<tr>

<td>oldLcLt</td>

<td>string</td>

<td>Previous last change time stamp must be greater or equal to given one (oldState.lc >= lc)</td>

</tr>

<tr>

<td>oldLcLe</td>

<td>string</td>

<td>Previous last change time stamp must be smaller than given one (oldState.lc < lc)</td>

</tr>

<tr>

<td></td>

<td></td>

<td></td>

</tr>

<tr>

<td>channelId</td>

<td>string</td>

<td>Channel ID must be equal to given one</td>

</tr>

<tr>

<td></td>

<td>RegExp</td>

<td>Channel ID matched to regular expression</td>

</tr>

<tr>

<td></td>

<td></td>

<td></td>

</tr>

<tr>

<td>channelName</td>

<td>string</td>

<td>Channel name must be equal to given one</td>

</tr>

<tr>

<td></td>

<td>RegExp</td>

<td>Channel name matched to regular expression</td>

</tr>

<tr>

<td></td>

<td></td>

<td></td>

</tr>

<tr>

<td>deviceId</td>

<td>string</td>

<td>Device ID must be equal to given one</td>

</tr>

<tr>

<td></td>

<td>RegExp</td>

<td>Device ID matched to regular expression</td>

</tr>

<tr>

<td></td>

<td></td>

<td></td>

</tr>

<tr>

<td>deviceName</td>

<td>string</td>

<td>Device name must be equal to given one</td>

</tr>

<tr>

<td></td>

<td>RegExp</td>

<td>Device name matched to regular expression</td>

</tr>

<tr>

<td></td>

<td></td>

<td></td>

</tr>

<tr>

<td>enumId</td>

<td>string</td>

<td>State belongs to given enum</td>

</tr>

<tr>

<td></td>

<td>RegExp</td>

<td>One enum ID of state satisfy the given regular expression</td>

</tr>

<tr>

<td></td>

<td></td>

<td></td>

</tr>

<tr>

<td>enumName</td>

<td>string</td>

<td>State belongs to given enum</td>

</tr>

<tr>

<td></td>

<td>RegExp</td>

<td>One enum name of state satisfy the given regular expression</td>

</tr>

<tr>

<td></td>

<td></td>

<td></td>

</tr>

<tr>

<td>from</td>

<td>string</td>

<td>New value is from defined adapter</td>

</tr>

<tr>

<td>fromNe</td>

<td>string</td>

<td>New value is not from defined adapter</td>

</tr>

<tr>

<td>oldFrom</td>

<td>string</td>

<td>Old value is from defined adapter</td>

</tr>

<tr>

<td>oldFromNe</td>

<td>string</td>

<td>Old value is not from defined adapter</td>

</tr>

</tbody>

</table>

Examples: Trigger on all states with ID '*.STATE' if they are acknowledged and have new value "true".

{
id: /\.STATE$/,
val: true,
ack: true,
logic: "and"
}

**Note:** you can use RegExp directly:

on(/^system\.adapter\..*\.\d+\.memRss$/, function (obj) {
});

// same as
on({id: /^system\.adapter\..*\.\d+\.memRss$/, change: "ne"}, function (obj) {
});

To simply connect two states with each other, write:

on('stateId1', 'stateId2');

All changes of _stateId1_ will be written to _stateId2_. Please note, that by default "change" is equal to "any", except when only id as string is set (like `on("id", function (){});`). In last case change will be set to "ne". Function "on" returns handler back. This handler can be used by unsubscribe.

### [](https://github.com/ioBroker/ioBroker.javascript#subscribe---same-as-on)subscribe - same as **[on](https://github.com/ioBroker/ioBroker.javascript#on---subscribe-on-changes-or-updates-of-some-state)**

### [](https://github.com/ioBroker/ioBroker.javascript#unsubscribe)unsubscribe

unsubscribe(id or handler)

Remove all subscriptions for given object ID or for given handler.

// By handler
var mySubscription = on({id: "javascript.0.myState", change: 'any'}, function (data) {
// unsubscribe after first trigger
if (unsubscribe(mySubscription)) {
log('Subscription deleted');
}
});

// by Object ID
on({id: "javascript.0.myState1", change: 'ne'}, function (data) {
log('Some event');
});

on({id: "javascript.0.myState1", change: 'any'}, function (data) {
// unsubscribe
if (unsubscribe("javascript.0.myState1")) {
log('All subscriptions deleted');
}
});

### [](https://github.com/ioBroker/ioBroker.javascript#getsubscriptions)getSubscriptions

Get the list of subscriptions. Example of result:

{
"megad.0.dataPointName" : [
{
"name" : "script.js.NameOfScript",
"pattern" : {
"id" : "megad.0.dataPointName",
"change" : "ne"
}
}
]
}

### [](https://github.com/ioBroker/ioBroker.javascript#schedule)schedule

schedule (pattern, callback)

Time scheduler with astro-funktion.

#### [](https://github.com/ioBroker/ioBroker.javascript#time-schedule)Time schedule

Pattern can be a string with [Cron-Syntax](http://en.wikipedia.org/wiki/Cron), e.G.:

# *  *  * *  *  command to execute
# │ │ │ │ │
# │ │ │ │ │
# │ │ │ │ └───── day of week (0 - 6) (0 to 6 are Sunday to Saturday, or use names; 7 is Sunday, the same as 0)
# │ │ │ └────────── month (1 - 12)
# │ │ └─────────────── day of month (1 - 31)
# │ └──────────────────── hour (0 - 23)
# └───────────────────────── min (0 - 59)

schedule("*/2 * * * *", function () {
log("Will be triggered every 2 minutes!");
});

Pattern can be an object, it is used especially if seconds are required:

schedule({second: [20, 25]}, function () {
log("Will be triggered at xx:xx:20 and xx:xx:25 of every minute!");
});

schedule({hour: 12, minute: 30}, function () {
log("Will be triggered at 12:30!");
});

Pattern can be a Javascript Date object (some specific time point) - in this case only it will be triggered only one time. **Note:** the newest version of schedule supports seconds too, so you can specify:

schedule("*/2 * * * * *", function () {
log("Will be triggered every 2 seconds!");
});

to trigger every second second.

#### [](https://github.com/ioBroker/ioBroker.javascript#astro--function)Astro- function

Astro-function can be used via "astro" attribute:

schedule({astro: "sunrise"}, function () {
log("Sunrise!");
});

schedule({astro: "sunset", shift: 10}, function () {
log("10 minutes after sunset!");
});

The attribute "shift" is the offset in minutes. It can be negative too, to define time before astro event. Following values can be used as attribute in astro-function:

*   sunrise: sunrise (top edge of the sun appears on the horizon)
*   sunriseEnd: sunrise ends (bottom edge of the sun touches the horizon)
*   goldenHourEnd: morning golden hour (soft light, best time for photography) ends
*   solarNoon: solar noon (sun is in the highest position)
*   goldenHour: evening golden hour starts
*   sunsetStart: sunset starts (bottom edge of the sun touches the horizon)
*   sunset: sunset (sun disappears below the horizon, evening civil twilight starts)
*   dusk: dusk (evening nautical twilight starts)
*   nauticalDusk: nautical dusk (evening astronomical twilight starts)
*   night: night starts (dark enough for astronomical observations)
*   nightEnd: night ends (morning astronomical twilight starts)
*   nauticalDawn: nautical dawn (morning nautical twilight starts)
*   dawn: dawn (morning nautical twilight ends, morning civil twilight starts)
*   nadir: nadir (darkest moment of the night, sun is in the lowest position)

**Note:** to use "astro"-function the "latitude" and "longitude" must be defined in javascript adapter settings. **Note:** you can use "on" function for schedule with small modification:

on({time: "*/2 * * * *"}, function () {
log((new Date()).toString() + " - Will be triggered every 2 minutes!");
});

on({time: {hour: 12, minute: 30}}, function () {
log((new Date()).toString() + " - Will be triggered at 12:30!");
});

on({astro: "sunset", shift: 10}, function () {
log((new Date()).toString() + " - 10 minutes after sunset!");
});

### [](https://github.com/ioBroker/ioBroker.javascript#clearschedule)clearSchedule

If **no** "astro" function used you can cancel the schedule later. To allow this the schedule object must be saved:

var sch = schedule("*/2 * * * *", function () {...});

clearSchedule(sch);

### [](https://github.com/ioBroker/ioBroker.javascript#getastrodate)getAstroDate

getAstroDate (pattern, date)

Returns a javascript Date object for the specified pattern. For valid pattern values see the [Astro](https://github.com/ioBroker/ioBroker.javascript#astro--function) section in the _schedule_ function. The returned Date object is calculated for the passed _date_. If no date is provided, the current day is used.

var sunriseEnd = getAstroDate("sunriseEnd");
log("Sunrise ends today at " + sunriseEnd.toLocaleTimeString());

var today = new Date();
var tomorrow = today.setDate(today.getDate() + 1);
var tomorrowNigh = getAstroDate("night", tomorrow);

### [](https://github.com/ioBroker/ioBroker.javascript#isastroday)isAstroDay

isAstroDay ()

Returns true if the current time is between the astro sunrise and sunset.

### [](https://github.com/ioBroker/ioBroker.javascript#comparetime)compareTime

compareTime (startTime, endTime, operation, timeToCompare)

Compares given time with limits. If timeToCompare is not given, so the actual time will be used. Following operations are possible:

*   > - if given time is greater as startTime
*   >= - if given time is greater or equal to startTime
*   < - if given time is less as startTime
*   <= - if given time is less or equal to startTime
*   == - if given time is equal to startTime
*   <> - if given time is not equal to startTime
*   between - if given time is between startTime and endTime
*   not between - if given time is not between startTime and endTime

Time can be Date object or Date with time or just time.

### [](https://github.com/ioBroker/ioBroker.javascript#setstate)setState

setState (id, state, ack, callback)

Please refer to [https://github.com/ioBroker/ioBroker/wiki/Adapter-Development-Documentation#commands-and-statuses](https://github.com/ioBroker/ioBroker/wiki/Adapter-Development-Documentation#commands-and-statuses)for usage of "ack". Short:

*   ack = false : Script wants to send a command to be executed by the target device/adapter
*   ack = true : Command was successfully executed and state is updated as positive result

### [](https://github.com/ioBroker/ioBroker.javascript#setstatedelayed)setStateDelayed

setStateDelayed (id, state, isAck, delay, clearRunning, callback)

Same as setState but with delay in milliseconds. You can clear all running delay for this ID (by default). E.g.

setStateDelayed('Kitchen.Light.Lamp', true,  1000);// Switch ON the light in the kitchen in one second
setStateDelayed('Kitchen.Light.Lamp', false, 5000, false, function () { // Switch OFF the light in the kitchen in 5 seconds and let first timeout run.
log('Lamp is OFF');
});

This function returns handler of the timer and this timer can be individually stopped by clearStateDelayed

### [](https://github.com/ioBroker/ioBroker.javascript#clearstatedelayed)clearStateDelayed

clearStateDelayed (id)

Clears all delayed tasks for specified state ID or some specific delayed task.

setStateDelayed('Kitchen.Light.Lamp', false,  10000); // Switch OFF the light in the kitchen in ten second
var timer = setStateDelayed('Kitchen.Light.Lamp', true,  5000, false); // Switch ON the light in the kitchen in five second
clearStateDelayed('Kitchen.Light.Lamp', timer); // Nothing will be switched on
clearStateDelayed('Kitchen.Light.Lamp'); // Clear all running delayed tasks for this ID

### [](https://github.com/ioBroker/ioBroker.javascript#getstate)getState

getState (id)

Returns state of id in form `{val: value, ack: true/false, ts: timestamp, lc: lastchanged, from: origin}` . If state does not exist, it will be returned following object: `{val: null, notExist: true}`

### [](https://github.com/ioBroker/ioBroker.javascript#getobject)getObject

getObject (id, enumName)

Get description of object id as stored in system. You can specify the enumeration name. If this is defined, two additional attributes will be added to result: enumIds and enumNames. These arrays has all enumerations, where ID is member of. E.g: `getObject ('adapter.N.objectName', 'rooms')` gives back in enumIds all rooms, where the requested object is a member. You can define "true" as enumName to get back _all_ enumerations.

### [](https://github.com/ioBroker/ioBroker.javascript#setobject)setObject

setObject(id, obj, callback)

Write object into DB. This command can be disabled in adapter's settings. Use this function carefully, while the global settings can be damaged. Use it like this:

var obj = getObject ('adapter.N.objectName');
obj.native.settings = 1;
setObject('adapter.N.objectName', obj, function (err) {
if (err) log('Cannot write object: ' + err);
});

### [](https://github.com/ioBroker/ioBroker.javascript#extendobject)extendObject

extendObject(id, obj, callback)

It is almost the same as setObject, but first it reads the object and tries to merge all settings together. Use it like this:

// Stop instance
extendObject('system.adapter.sayit.0', {common: {enabled: false}});

### [](https://github.com/ioBroker/ioBroker.javascript#getidbyname)getIdByName

getIdByName(name, alwaysArray)

returns id of the object with given name. If there are more than one object with this name the result will be an array. If _alwaysArray_ flag is set, the result will be always an array if some ID found.

### [](https://github.com/ioBroker/ioBroker.javascript#getenums)getEnums

getEnums(enumName)

Get the list of existing enumerations with members, like:

getEnums('rooms') =>
[
{
"id":"enum.rooms.LivingRoom",
"members":["hm-rpc.0.JEQ0024123.1","hm-rpc.0.BidCoS-RF.4"],
"name": "Living room"
},
{
"id":"enum.rooms.Bath",
"members":["hm-rpc.0.JEQ0024124.1","hm-rpc.0.BidCoS-RF.5"],
"name": "Bath"
}
]

### [](https://github.com/ioBroker/ioBroker.javascript#createstate)createState

createState(name, initialValue, forceCreation, common, native, callback)

Create state and object in javascript space if does not exist, e.g. "javascript.0.mystate".

#### [](https://github.com/ioBroker/ioBroker.javascript#parameters)Parameters:

*   **name**: name of the state without namespace, e.g. "mystate"
*   **initialValue**: variable can be initialized after created. Value "undefined" means do not initialize value.
*   **forceCreation**: create state independent of if state yet exists or not.
*   **common**: common description of object see description [here](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state)
*   **native**: native description of object. Any specific information.
*   **callback**: called after state is created and initialized.

It is possible short type of createState:

*   _createState('myVariable')_ - simply create variable if does not exist
*   _createState('myVariable', 1)_ - create variable if does not exist and initialize it with value 1
*   _createState('myVariable', {name: 'My own variable', unit: '°C'}, function () {log('created');});_
*   _createState('myVariable', 1, {name: 'My own variable', unit: '°C'})_ - create variable if does not exist with specific name and units

### [](https://github.com/ioBroker/ioBroker.javascript#deletestate)deleteState

deleteState(name, callback)
Delete state and object in javascript space, e.g. "javascript.0.mystate".

`deleteState('myVariable')_ - simply delete variable if exists`

### [](https://github.com/ioBroker/ioBroker.javascript#sendto)sendTo:

sendTo (adapter, cmd, msg, callback)

### [](https://github.com/ioBroker/ioBroker.javascript#setinterval)setInterval

setInterval (callback, ms, arg1, arg2, arg3, arg4)

Same as javascript **_setInterval_**.

### [](https://github.com/ioBroker/ioBroker.javascript#clearinterval)clearInterval

clearInterval (id)

Same as javascript **_clearInterval_**.

### [](https://github.com/ioBroker/ioBroker.javascript#settimeout)setTimeout

setTimeout (callback, ms, arg1, arg2, arg3, arg4)

Same as javascript **_setTimeout_**.

### [](https://github.com/ioBroker/ioBroker.javascript#cleartimeout)clearTimeout

clearTimeout (id)

Same as javascript **_clearTimeout_**.

### [](https://github.com/ioBroker/ioBroker.javascript#formatdate)formatDate

formatDate (millisecondsOrDate, format)

#### [](https://github.com/ioBroker/ioBroker.javascript#parameters-1)Parameters:

*   **date**: number of milliseconds from state.ts or state.lc (Number milliseconds from 1970.01.01 00:00:00) or javascript _new Date()_ object or number of milliseconds from _(new Date().getTime())_
*   **format**: Can be "null", so the system time format will be used, elsewise
*   YYYY, JJJJ, ГГГГ - full year, e.g 2015
*   YY, JJ, ГГ - short year, e.g 15
*   MM, ММ(cyrillic) - full month, e.g. 01
*   M, М(cyrillic) - short month, e.g. 1
*   DD, TT, ДД - full day, e.g. 02
*   D, T, Д - short day, e.g. 2
*   hh, SS, чч - full hours, e.g. 03
*   h, S, ч - short hours, e.g. 3
*   mm, мм(cyrillic) - full minutes, e.g. 04
*   m, м(cyrillic) - short minutes, e.g. 4
*   ss, сс(cyrillic) - full seconds, e.g. 05
*   s, с(cyrillic) - short seconds, e.g. 5
*   sss, ссс(cyrillic) - milliseconds
*   WW, НН(cyrillic) - full week day as text
*   W, Н(cyrillic) - short week day as text
*   OO, ОО(cyrillic) - full month as text
*   O, О(cyrillic) - short month as text

#### [](https://github.com/ioBroker/ioBroker.javascript#example)Example

formatDate(new Date(), "YYYY-MM-DD") => Date "2015-02-24" formatDate(new Date(), "hh:mm") => Hours and minutes "17:41" formatDate(state.ts) => "24.02.2015" formatDate(state.ts, "JJJJ.MM.TT SS:mm:ss.sss) => "2015.02.15 17:41:98.123" formatDate(new Date(), "WW") => Day of week "Tuesday" formatDate(new Date(), "W") => Day of week "Tu"

### [](https://github.com/ioBroker/ioBroker.javascript#getdateobject)getDateObject

getDateObject (stringOrNumber)

Converts string or number to Date object. If only hours are given it will add current date to it and will try to convert. getDateObject("20:00") => "Tue Aug 09 2016 20:00:00 GMT+0200"

### [](https://github.com/ioBroker/ioBroker.javascript#formatvalue)formatValue

formatValue (value, decimals, format)

Formats any value (strings too) to number. Replaces point with comma if configured in system. Decimals specify digits after comma. Default value is 2\. Format is optional:

*   '.,': 1234.567 => 1.234,56
*   ',.': 1234.567 => 1,234.56
*   ' .': 1234.567 => 1 234.56

### [](https://github.com/ioBroker/ioBroker.javascript#adaptersubscribe)adapterSubscribe

adapterSubscribe(id)

Sends to adapter message "subscribe" to inform adapter. If adapter has common flag "subscribable" in case of function "subscribe" this function will be called automatically.

### [](https://github.com/ioBroker/ioBroker.javascript#adapterunsubscribe)adapterUnsubscribe

adapterUnsubscribe(id)

Sends to adapter message "unsubscribe" to inform adapter to not poll the values.

### [](https://github.com/ioBroker/ioBroker.javascript#---selector)$ - Selector

$(selector).on(function(obj) {});
$(selector).each(function(id, i) {});
$(selector).setState(value, ack);
$(selector).getState();

Format of selector: '''name[commonAttr=something1](enumName=something2){nativeName=something3}[id=idfilter][state.id=idfilter]''' name can be: state, channel or device "idfilter" can have wildcards '*' Prefixes **_(not implemented - should be discussed)_** : # - take by name and not by id . - filter by role § - filter by room **_Example_**:

*   $('state[id=_.STATE]') or $('state[state.id=_.STATE]') or $('*.STATE') - select all states where id ends with ".STATE".
*   $('state[id='hm-rpc.0._]') or $('hm-rpc.0._') - returns all states of adapter instance hm-rpc.0
*   $('channel(rooms=Living room)') - all states in room "Living room"
*   $('channel{TYPE=BLIND}[state.id=*.LEVEL]') - Get all shutter of Homematic
*   $('channel[role=switch](rooms=Living room)[state.id=*.STATE]').setState(false) - Switch all states with .STATE of channels with role "switch" in "Living room" to false
*   $('channel[state.id=*.STATE](functions=Windows)').each(function (id, i) {log(id);}); - print all states of enum "windows" in log
*   $('.switch §"Living room") - Take states with all switches in 'Living room' **_(not implemented - should be discussed)_**
*   $('channel .switch §"Living room") - Take states with all switches in 'Living room' **_(not implemented - should be discussed)_**

*** Explanation *** Lets take a look at:

$('channel[role=switch][state.id=*.STATE](rooms=Wohnzimmer)').on(function (obj) {
log('New state ' + obj.id + ' = ' + obj.state.val);
}

This code searches in channels. Find all channels with common.role="switch" and belongs to enum.rooms.Wohnzimmer. Take all their states, where id ends with ".STATE and make subscription on all these states. If some of these states changes the callback will be called like for "on" function. Following functions are possible, setValue, getValue (only from first), on, each

// Switch on all switches in "Wohnzimmer"
$('channel[role=switch][state.id=*.STATE](rooms=Wohnzimmer)').setValue(true);

You can interrupt the "each" loop by returning the false value, like:

// print two first IDs of on all switches in "Wohnzimmer"
$('channel[role=switch][state.id=*.STATE](rooms=Wohnzimmer)').each(function (id, i) {
console.log(id);
if (i == 1) return false;
});

### [](https://github.com/ioBroker/ioBroker.javascript#readfile)readFile

readFile (adapter, fileName, function (error, bytes) {})

The result will be given in callback. Read file from DB from folder "javascript".

### [](https://github.com/ioBroker/ioBroker.javascript#writefile)writeFile

writeFile (adapter, fileName, bytes, function (error) {})

The optional error code will be given in callback. fileName is the name of file in DB. All files are stored in folder "javascript". if you want to write to other folders, e.g. to "/vis.0/" use setFile for that. The file that looks like '/subfolder/file.txt' will be stored under "/javascript/subfolder/file.txt" and can be accessed over web server with `http://ip:8082/javascript/subfolder/file.txt`

// store screenshot in DB
var fs = require('fs');
var data = fs.readFileSync('/tmp/screenshot.png');
writeFile(null, '/screenshots/1.png', data, function (error) {
console.log('file written');
});

// store file in '/vis.0' in DB
var fs = require('fs');
var data = fs.readFileSync('/tmp/screenshot.png');
writeFile('vis.0', '/screenshots/1.png', data, function (error) {
console.log('file written');
});

### [](https://github.com/ioBroker/ioBroker.javascript#delfile)delFile

delFile (adapter, fileName, function (error) {})

Delete file or directory. fileName is the name of file or directory in DB. This function is alias for _unlink_.

### [](https://github.com/ioBroker/ioBroker.javascript#onstop)onStop

onStop (function(){}, timeout);

Install callback, that will be called if script stopped. Used e.g. to stop communication or to close connections.

// establish connection
var conn = require('net')....;

// close connection if script stopped
onStop(function (callback) {
if (conn) {
// close connection
conn.destory();
}
callback();
}, 2000 /*ms*/);

_timeout_ is default 1000ms.

### [](https://github.com/ioBroker/ioBroker.javascript#gethistory)getHistory

getHistory (instance, options, function (error, result, options, instance) {});

Read history from specified instance. if no instance specified the system default history instance will be taken.

// Read history of 'system.adapter.admin.0.memRss' from sql driver
var end = new Date().getTime();
getHistory('sql.0', {
id:         'system.adapter.admin.0.memRss',
start:      end - 3600000,
end:        end,
aggregate:  'm4',
timeout:    2000
}, function (err, result) {
if (err) console.error(err);
if (result) {
for (var i = 0; i < result.length; i++) {
console.log(result[i].id + ' ' + new Date(result[i].ts).toISOString());
}
}
});

Possible options you can find [here](https://github.com/ioBroker/ioBroker.history#access-values-from-javascript-adapter). Additionally to these parameters you must specify "id" and you may specify timeout (default: 20000ms). One more example:

// Get last 50 entries from default history instance with no aggregation:
getHistory({
id:         'system.adapter.admin.0.alive',
aggregate:  'none',
count:      50
}, function (err, result) {
if (err) console.error(err);
if (result) {
for (var i = 0; i < result.length; i++) {
console.log(result[i].id + ' ' + new Date(result[i].ts).toISOString());
}
}
});

*_Note: *_ of course history must be first enabled for selected ID in admin.

### [](https://github.com/ioBroker/ioBroker.javascript#runscript)runScript

runScript('scriptName')

Starts or stops other scripts (and itself too) by name. There is a second parameter

// stop script
runScript('groupName.scriptName1', false);

// start script
runScript('scriptName2')

### [](https://github.com/ioBroker/ioBroker.javascript#startscript)startScript

startScript('scriptName')

Same as

runScript('scriptName', true);

### [](https://github.com/ioBroker/ioBroker.javascript#stopscript)stopScript

stopScript('scriptName')

Same as `runScript('scriptName', false);` If stopScript is called without arguments, it will stop itself:

stopScript();

### [](https://github.com/ioBroker/ioBroker.javascript#isscriptactive)isScriptActive

isScriptActive('scriptName')

Returns if script enabled or disabled. Please note, that that does not give back if the script now running or not. Script can be finished, but still activated.

### [](https://github.com/ioBroker/ioBroker.javascript#name)name

log('Script ' + name + ' started!')

It is not a function. It is a variable with script name, that is visible in script's scope.

### [](https://github.com/ioBroker/ioBroker.javascript#instance)instance

log('Script ' + name + ' started by ' + instance + '!')

It is not a function. It is a variable with javascript instance, that is visible in script's scope.

## [](https://github.com/ioBroker/ioBroker.javascript#option---do-not-subscribe-all-states-on-start)Option - "Do not subscribe all states on start"

There are two modes of subscribe on states:

*   Adapter subscribes on all changes at start and receives all changes of all states (it is easy to use getStates(id), but required more CPU and RAM):

console.log(getState('someID').val);

*   Adapter subscribes every time on specified ID if "on/subscribe" called. In this mode the adapter receives only updates for desired states. It is very perform and RAM efficiency, but you cannot access states directly in getState. You must use callback to get the result of state:

getState('someID', function (error, state) {
console.log(state.val);
});

It is because the adapter does not have the value of state in RAM and must ask central DB for the value.

## [](https://github.com/ioBroker/ioBroker.javascript#scripts-activity)Scripts activity

There is a possibility to enabled and disable scripts via states. For every script the state will be created with name **javascript.INSTANCE.scriptEnabled.SCRIPT_NAME**. Scripts can be activated and deactivated by controlling of this state with ack=false.

## Note

If in the script some modules or functions are used with callbacks or cyclic calls, except setTimeout/setInterval, so they will be called again and again even if the new version of script exists or script is deleted. For example the following script:

var http = require('http');
// Read www.google.com page
http.request('www.google.com', function(res) {
res.setEncoding('utf8');
res.on('data', function (chunk) {
log('BODY: ' + chunk);
});
}).on('error', function(e) {
log('problem with request: ' + e.message, 'error');
});

was deleted by user before callback returns. The callback will be executed anyway. To fix this feature **restart** the javascript adapter. You can use "cb" function to wrap you callback, like this

http.request('www.google.com', cb(function(res) {
res.setEncoding('utf8');
res.on('data', function (chunk) {
log('BODY: ' + chunk);
}));
}).on('error', cb(function(e) {
log('problem with request: ' + e.message, 'error');
}));

to be sure, that no callback will be called if script is deleted or modified.