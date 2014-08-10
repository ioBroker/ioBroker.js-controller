
# Core Concept

There are two fundamentally different data-types in ioBroker. So called **states** and **objects**.

Objects represent rarely changing and larger data, like meta-data of your systems devices, configurations and additional
files. Every Object has to have an attribute "type". See below for more information what object types are available and which
mandatory attributes a object of a specific type needs. Functions like setObject, getObject, ... are provided to you by
the adapter module.

States represent often changing data in your system, like f.e. if a lamp is on or off, if a motion detector detected
some motion, the temperature of your living room or if the button of a remotecontrol is pressed. Contrary to objects
states can be used to trigger actions and states can create history data. To work with states there are several functions
in the adapter module like setState, getState and so on.

For every state there also has to exist a corresponding object with type=state.

# Database Schema

## IDs

a string with a maximum length of 240 bytes, hierarchically structured, levels separated by dots.


### Namespaces

* system.
* system.host.        - Controller processes
* system.config.      - System settings, like default language
* system.meta.        - System meta data
* system.user.
* system.group.
* system.translations. - system wide translation objects
* system.adapter.     - Adapter
* system.adapter.&lt;adapter-name&gt; - default config of an adapter
* &lt;adapter-name&gt;.meta. - An adapters meta Data namespace
* &lt;adapter-name&gt;.&lt;instance-number&gt;. - An adapters instance namespace
* enum.               - Enumerations
* hist.               - History Data (only states, no objects)
* iofs.               - The ioBroker virtual filesystem
* scripts.            - Script Engine Scripts
* scripts.js.         - javascript Script Engine Scripts
* scripts.py.         - python Script Engine Scripts

#### Namespace system.config.
<pre>
{
    _id:   id,
    type: 'config',
    common: {
        language:     'en',         // Default language for adapters. Adapters can use different values.
        tempUnit:     '°C',         // Default temperature units.
        currency:     '€',          // Default currency sign.
        dateFormat:   'DD.MM.YYYY'  // Default date format.
        isFloatComma: true,         // Default float divider ('.' - false, ',' - true)
    }
}
</pre>

#### Namespace system.host.&lt;hostname&gt;
<pre>
{
    _id:   id,
    type: 'host',
    common: {
        name:       id,
        process:    title,           // iobroker.ctrl
        version:    version,         // Vx.xx.xx
        platform:   'javascript/Node.js',
        cmd:        process.argv[0] + ' ' + process.execArgv.join(' ') + ' ' + process.argv.slice(1).join(' '),
        hostname:   hostname,
        address:    ipArr,
        defaultIP:  ???
    },
    native: {
        process: {
            title:      process.title,
            pid:        process.pid,
            versions:   process.versions,
            env:        process.env
        },
        os: {
            hostname:   hostname,
            type:       os.type(),
            platform:   os.platform(),
            arch:       os.arch(),
            release:    os.release(),
            uptime:     os.uptime(),
            endianness: os.endianness(),
            tmpdir:     os.tmpdir()
        },
        hardware: {
            cpus:       os.cpus(),
            totalmem:   os.totalmem(),
            networkInterfaces: os.networkInterfaces()
        }
    }
};
</pre>


## States

getState method and stateChange event delivers an object with all attributes except expire

for "setState" method everything except "val" is optional, "from" is set automatically by the "setState" method. "ack" defaults to false, "ts" and "lc" are set as expected

attributes for getState/stateChange/setState object:

* val    - the actual value - can be any type that is JSON-encodable
* ack    - a boolean flag indicating if the target system has acknowledged the value
* ts     - a unix timestamp indicating the last update of the state
* lc     - a unix timestamp indicating the last change of the state's actual value
* from   - adapter instance that did the "setState"
* expire - a integer value that can be used to set states that expire after a given number of seconds. Can be used ony with setValue. After the value expires, it disappears from redisDB.


Every *state* has to be represented by an object of the type state containing Meta-Data for the state. see below.

## Objects

### Mandatory attributes

Following attributes have to exist in every object:

* _id
* type        - see below for possible values
* common      - includes an object with mandatory attributes for specific type
* common.name - the name of the object

### Optional attributes

* parent   - ID of parent object (see below)
* native   - includes an object with 1:1 attributes of the target system

### Tree structure

Objects can have a *parent* attribute containing the *id* of their parent to build a tree structure. This should be
limited to 3 levels (except for objects of type path and enum)

### Object types

* state    - parent should be of type channel, device, instance or host
* channel  - object to group one or more states. parent should be device
* device   - object to group one or more channels or state. should have no parent.
* enum     - objects holding a array in common.members that points to states, channels, devices or files. enums can have a parent enum (tree-structure possible)
* host     - a host that runs a controller process
* adapter  - the default config of an adapter. presence also indicates that the adapter is successfully installed. (suggestion: should have an attribute holding an array of the hosts where it is installed)
* instance - instance of adapter. Parent has to be of type adapter
* meta     - rarely changing meta information that a adapter or his instances needs
* config   - configurations
* vfs      - a virtual path. parent has to be of type vfs.
* script
* user
* group


### Attributes for specific types

#### state

attributes:

* common.type  (optional - default is mixed==any type) (possible values: number, string, boolean, array, object, mixed)
* common.min   (optional)
* common.max   (optional)
* common.unit  (optional)
* common.def   (optional - the default value)
* common.desc  (optional, string)
* common.read  (boolean, mandatory) - true if state is readable
* common.write (boolean, mandatory) - true if state is writeable
* common.role  (string, mandatory) - role of the state (see below)


##### state common.history

History function needs the history adapter

fifo length is reduced to min when max is hit. set to null or leave undefined to use defaults

for a list of transports see history adapter README

* common.history (optional)
* common.history.changesOnly (optional, boolean, if true only value changes are logged)
* common.history.fifo (optional, high speed history storage)
* common.history.fifo.enabled (boolean)
* common.history.fifo.min (integer, min fifo length)
* common.history.fifo.max (integer, max fifo length)
* common.history.fifo.transports (array of strings, log-transports data should be sent to after leaving the fifo)
* common.history.direct.enabled (boolean)
* common.history.direct.transports (array of strings, log-transports data should be sent on change)

* common.role (indicates how this state should be represented in user interfaces)

##### state common.role

possible values:

* text (common.type = string)
* html (common.type = string)
* json (common.type = string)
* list (common.type = array)
* list.horizontal
* ...

* value             (common.type=number, common.oper.write=false)
* value.temperature (common.type=number, common.oper.write=false, common.unit='°C' or '°F' or 'K')
* value.humidity    (common.type=number, common.oper.write=false)
* value.brightness  (common.type=number, common.oper.write=false)
* value.min         (common.type=number, common.oper.write=false)
* value.max         (common.type=number, common.oper.write=false)
* value.default     (common.type=number, common.oper.write=false)
* ...
* value.power.consumption or power.consumption ?

* direction   (common.type=number or string, indicates up/down, left/right, 4-way switches, wind-direction, ... )

* button (common.type=boolean)
* button.long
* button.stop
* button.play
* button.next
* button.prev
* button.pause
* button.forward
* button.reverse
* button.fastforward
* button.fastreverse
* ...

* indicator             (common.type=boolean)
* indicator.working     (common.type=boolean, indicates that something the target systems is doing changes on the parent channel)
* indicator.reachable
* indicator.connected
* indicator.maintenance (common.type=boolean, indicates system warnings/errors, alarms, service messages, battery empty or stuff like that)
* indicator.maintenance.lowbat (description texts for stuff like that can be stored in adapter- or system-metadata)
* indicator.maintenance.unreach
* indicator.maintenance.alarm

* level                 (common.type=number, common.oper.write=true)
* level.dimmer
* level.blind
* level.temperature
* level.color.red
* level.color.green
* level.color.blue
* level.color.hue
* level.color.saturation
* level.color.luminance
* level.color.temperature
* ...

* switch (common.type=boolean, common.oper.write=true)
* ...
* text.phone_number


#### channel

Additional to mandatory object attributes:

* common.children - (mandatory) Array with children IDs (children should be objects of type state)
* common.parent  - (optional, but welcome) Parent device ID


##### channel common.role - (HQ: Is it mandatory? I think no.)

suggestion: the channel-objects common.role should/could imply a set of mandatory and/or optional state-child-objects

possible values:

* info          - Currency or shares rate, fuel prices, post box insertion and stuff like that
* calendar      -
* forecast      - weather forecast

* media         - common media channel
* media.music   - media player, like SONOS, YAMAHA and so on
* media.tv      - TV 
* media...

* thermo        - Monitor or control the temperature, humidity and so on
* thermo.heat 
* thermo.cool
*
* blind             - Window blind control

* light
* light.dimmer      - Light dimmer
* light.switch      - Light switch.
* light.color       - Light control with ability of color changing
* light.color.rgb   - Set color in RGB
* light.color.rgbw  - Set color in RGBW
* light.color.hsl   - Set color in Hue/Saturation/Luminance (Hue color light - LivingColors...)
* light.color.hslct - Set color in Hue/Saturation/Luminance or Color Temperature (Hue extended color light)
* light.color.ct    - color temperature K 

* sensor            - E.g. window or door contact, water leak sensor, fire sensor
* sensor.door       - open, close
* sensor.door.lock  - open, close, locked
* sensor.window     - open, close
* sensor.window.3   - open, tilt, close
* sensor.water      - true(alarm), false (no alarm)
* sensor.fire       - true(alarm), false (no alarm)
* sensor.CO2        - true(alarm), false (no alarm)

* phone             - fritz box, speedport and so on

* button            - like wall switch or TV remote, where every button is a state like .play, .stop, .pause
* remote            - TV or other remotes with state is string with pressed values, e.g. "PLAY", "STOP", "PAUSE"

* ...


#### Channel descriptions
~~The names of the attributes can be free defined by adapter, except ones written with **bold** font.~~

"W" - common.oper.write=true

"M" - Mandatory

##### Optional states for every channel/device

```javascript
// state-working (optional)
{
   "_id": "adapter.instance.channelName.stateName-working", // e.g. "hm-rpc.0.JEQ0205612:1.WORKING"
   "type": "state",
   "parent": "channel or device",       // e.g. "hm-rpc.0.JEQ0205612:1"
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   false,                  // optional,  default false
       "type":  "boolean",              // optional,  default "boolean"
       "read":  true,                   // mandatory, default true
       "write": false,                  // mandatory, default false
       "min":   false,                  // optional,  default false
       "max":   true,                   // optional,  default true
       "role":  "indicator.working"     // mandatory
       "desc":  ""                      // optional,  default undefined
   }
}
,
// state-direction (optional). The state can have following states: "up"/"down"/""
{
   "_id": "adapter.instance.channelName.stateName-direction", // e.g. "hm-rpc.0.JEQ0205612:1.DIRECTION"
   "type": "state",
   "parent": "channel or device",       // e.g. "hm-rpc.0.JEQ0205612:1"
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   "",                     // optional,  default ""
       "type":  "string",               // optional,  default "string"
       "read":  true,                   // mandatory, default true
       "write": false,                  // mandatory, default false
       "role":  "direction"             // mandatory
       "desc":  ""                      // optional,  default undefined
   }
}
,
// state-maintenance (optional).
{
   "_id": "adapter.instance.channelName.stateName-maintenance", //e.g. "hm-rpc.0.JEQ0205612:1.MAINTENANCE"
   "type": "state",
   "parent": "channel or device",       // e.g. "hm-rpc.0.JEQ0205612:1"
   "common": {
       "name":  'Name of state",        // mandatory, default _id ??
       "def":   false,                  // optional,  default false
       "type":  "boolean",              // optional,  default "boolean"
       "read":  true,                   // mandatory, default true
       "write": false,                  // mandatory, default false
       "min":   false,                  // optional,  default false
       "max":   true,                   // optional,  default true
       "role":  "indicator.maintenance" // mandatory
       "desc":  'Problem description'   // optional,  default undefined
   }
}
,
// state-maintenance-unreach (optional).
{
   "_id": "adapter.instance.channelName.stateName-maintenance-unreach", //e.g. "hm-rpc.0.JEQ0205612:0.UNREACH"
   "type": "state",
   "parent": "channel or device",       // e.g. "hm-rpc.0.JEQ0205612:1"
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   false,                  // optional,  default false
       "type":  "boolean",              // optional,  default "boolean"
       "read":  true,                   // mandatory, default true
       "write": false,                  // mandatory, default false
       "min":   false,                  // optional,  default false
       "max":   true,                   // optional,  default true
       "role":  "indicator.maintenance.unreach" // mandatory
       "desc":  "Device unreachable"    // optional,  default 'Device unreachable'
   }
}
```

##### light.switch - Attributes description
| **Name**      | **common.role**           | **M** | **W** | **common.type** | **Description**
| ------------- |:--------------------------|:-----:|:-----:|-----------------|---
| state         | switch                    |   X   |   X   | boolean         |
| description   | text.description          |       |       |                 |
| mmm           | indicator.maintenance.mmm |       |       |                 | mmm = lowbat or unreach or whatever
```javascript
// SWITCH CHANNEL
{
   "_id": "adapter.instance.channelName", // e.g. "hm-rpc.0.JEQ0205614:1"
   "type": "channel",
   "parent": "device or empty",         // e.g. "hm-rpc.0.JEQ0205614"
   "common": {
       "name":  "Name of channel",      // mandatory, default _id ??
       "members": [
            "adapter.instance.channelName.state-switch",              // mandatory
            "adapter.instance.channelName.state-maintenance"          // optional
            "adapter.instance.channelName.state-maintenance-unreach"  // optional
       ],
       "role":  "light.switch"          // optional   default undefined
       "desc":  ""                      // optional,  default undefined
   }
},
// SWITCH STATES
{
   "_id": "adapter.instance.channelName.state-switch", // e.g. "hm-rpc.0.JEQ0205614:1.STATE"
   "type": "state",
   "parent": "channel or device",       // e.g. "hm-rpc.0.JEQ0205614:1"
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   false,                  // optional,  default false
       "type":  "boolean",              // optional,  default "boolean"
       "read":  true,                   // mandatory, default true
       "write": true,                   // mandatory, default true
       "role":  "switch"                // mandatory
       "desc":  ""                      // optional,  default undefined
   }
}
// see "Optional states for every channel/device" for description of optional states
//            "adapter.instance.channelName.state-maintenance"          // optional
//            "adapter.instance.channelName.state-maintenance-unreach"  // optional

```

##### light.dimmer - Attributes description
```javascript
// DIMMER CHANNEL
{
   "_id": "adapter.instance.channelName", // e.g. "hm-rpc.0.JEQ0205612:1"
   "type": "channel",
   "parent": "device or empty",         // e.g. "hm-rpc.0.JEQ0205612"
   "common": {
       "name":  "Name of channel",      // mandatory, default _id ??
       "members": [
            "adapter.instance.channelName.state-level",               // mandatory
            "adapter.instance.channelName.state-working",             // optional
            "adapter.instance.channelName.state-direction",           // optional
            "adapter.instance.channelName.state-maintenance"          // optional
            "adapter.instance.channelName.state-maintenance-unreach"  // optional
       ],
       "role":  "light.dimmer"          // optional   default undefined
       "desc":  ""                      // optional,  default undefined
   }
},
// DIMMER STATES
{
   "_id": "adapter.instance.channelName.state-level", // e.g. "hm-rpc.0.JEQ0205612:1.LEVEL"
   "type": "state",
   "parent": "channel or device",       // e.g. "hm-rpc.0.JEQ0205612:1"
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   0,                      // optional,  default 0
       "type":  "number",               // optional,  default "number"
       "read":  true,                   // mandatory, default true
       "write": true,                   // mandatory, default true
       "min":   0,                      // optional,  default 0
       "max":   100,                    // optional,  default 100
       "unit":  "%",                    // optional,  default %
       "role":  "level.dimmer"          // mandatory
       "desc":  ""                      // optional,  default undefined
   }
}
// see "Optional states for every channel/device" for description of optional states
//            "adapter.instance.channelName.state-working",             // optional
//            "adapter.instance.channelName.state-direction",           // optional
//            "adapter.instance.channelName.state-maintenance"          // optional
//            "adapter.instance.channelName.state-maintenance-unreach"  // optional

```


##### blind - Attributes description

```javascript
// BLIND CHANNEL
{
   "_id": "adapter.instance.channelName", // e.g. "hm-rpc.0.JEQ0205615:1"
   "type": "channel",
   "parent": "device or empty",         // e.g. "hm-rpc.0.JEQ0205615"
   "common": {
       "name":  "Name of channel",      // mandatory, default _id ??
       "members": [
            "adapter.instance.channelName.state-level",               // mandatory
            "adapter.instance.channelName.state-working",             // optional
            "adapter.instance.channelName.state-direction",           // optional
            "adapter.instance.channelName.state-maintenance"          // optional
            "adapter.instance.channelName.state-maintenance-unreach"  // optional
       ],
       "role":  "blind"                 // optional   default undefined
       "desc":  ""                      // optional,  default undefined
   }
},
// BLIND STATES
// Important: 0% - blind is fully closed, 100% blind is fully opened
{
   "_id": "adapter.instance.channelName.state-level", // e.g. "hm-rpc.0.JEQ0205615:1.LEVEL"
   "type": "state",
   "parent": "channel or device",       // e.g. "hm-rpc.0.JEQ0205615:1"
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   0,                      // optional,  default 0
       "type":  "number",               // optional,  default "number"
       "read":  true,                   // mandatory, default true
       "write": true,                   // mandatory, default true
       "min":   0,                      // optional,  default 0
       "max":   100,                    // optional,  default 100
       "unit":  "%",                    // optional,  default %
       "role":  "level.blind"           // mandatory
       "desc":  ""                      // optional,  default undefined
   }
}
// see "Optional states for every channel/device" for description of optional states
//            "adapter.instance.channelName.state-working",             // optional
//            "adapter.instance.channelName.state-direction",           // optional
//            "adapter.instance.channelName.state-maintenance"          // optional
//            "adapter.instance.channelName.state-maintenance-unreach"  // optional

```


##### phone - Attributes description
| **Name**       | **common.role**          | **M** | **W** | **common.type** | **Description**
| -------------- |:-------------------------|:-----:|:-----:|-----------------|---
| ringing_number | text.phone_number        |       |       | string          |
| ringing        | indicator                |       |       | boolean         |

...


#### device

* common.children - (mandatory) array of children IDs (children should be objects of type channel or state)

#### enum

* common.children - (optional) array of children IDs (children have to be objects of type enum)
* common.members - (optional) array of member IDs (members should be objects of type device, channel or state)


#### meta

id

 * *&lt;adapter-name&gt;.&lt;instance-number&gt;.meta.&lt;meta-name&gt;*
 * *&lt;adapter-name&gt;.meta.&lt;meta-name&gt;*
 * system.*meta.&lt;meta-name&gt;*



#### adapter

id *system.adapter.&lt;adapter.name&gt;*

* common.mode
* common.enabled  - value should be false so new instances are disabled by default
* common.language - possible values: javascript, other


#### instance

id *system.adapter.&lt;adapter.name&gt;.&lt;instance-number&gt;*

* common.host     - host where the adapter should be started at - object *system.host.&lt;host&gt;* must exist
* common.enabled  - 
* common.mode     - possible values see below

##### instance common.mode

* **daemon**      - always running process (will be restarted if process exits)
* **subscribe**   - is started when state *system.adapter.&lt;adapter-name&gt;.&lt;instance-number&gt;.alive* changes to *true*. Is killed when *.alive* changes to *false* and sets *.alive* to *false* if process exits (will **not** be restarted when process exits)
* **schedule**    - is started by schedule found in *system.adapter.&lt;adapter-name&gt;.&lt;instance-number&gt;.schedule* - reacts on changes of *.schedule* by rescheduling with new state



#### host

id *system.host.&lt;host&gt;*

#### config

#### vfs

id *system.vfs.&lt;name&gt;

* common.name (name of the directory)
* common.children (better name it common.subdirs?> (Bluefox: May be members, like all others?)) (array of child objects with type path)

Files: CouchDB-Attachments


#### script

* common.platform   - (mandatory) possible Values 'Javascript/Node.js' (more to come)
* common.enabled    - (mandatory) is script activated or not
* common.source     - (mandatory) the script source
* common.engine     - (@HQ: optional or mandatory?) scriptengine instance that should run this script (f.e. 'javascript.0')

#### user

* common.name       - (mandatory) Name of user (@HQ: Case insensitive ?) 
* common.password   - (mandatory) MD5 Hash of password

#### group

* common.name       - (mandatory) name of the group
* common.members    - (mandatory) array of user-object IDs
* common.desc       - (optional) group purpose description
