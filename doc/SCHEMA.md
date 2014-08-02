
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
* system.config.      - System settings, like default language (HQ: We need to define default host IP address, so by the adapter activation this IP will be taken)
* system.meta.        - System meta data
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
| **Name**      | **common.type** | **Description**
| ------------- |:----------------|---
| language      | string          | Default language for the system: "en", "de", "ru".
| hostIP        | string          | Default host ip. Can be IPv4 or IPv6 (It can be of course in system.host.defaultIP)

#### Namespace system.host.&lt;hostname&gt;
| **Name**        |  **Description or Value**
| -------------   |:---
| type            |  host
| common.name     |  system.host.&lt;hostname&gt
| common.process  |  iobroker.ctrl
| common.version  |  Vx.xx.xx
| common.platform |  "javascript/Node.js" or something else
| common.cmd      |  "node controller.js"
| common.hostname |  &lt;hostname&gt
| common.address  |  { "**First Network Adapter**":  <br>[ { address: '::1', family: 'IPv6', internal: true },<br>{ address: 'fe80::1',family: 'IPv6', internal: true },<br>{ address: '127.0.0.1', family: 'IPv4', internal: true } ],<br>"**Second Network Adapter**": <br>[ { address: 'fe80::cabc:c8ff:feef:f996', family: 'IPv6', internal: false },<br>{ address: '10.0.1.123', family: 'IPv4', internal: false } ]// **Example**
| native          | 
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
            address:    ipArr
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

* val  - the actual value - can be any type that is JSON-encodable
* ack  - a boolean flag indicating if the target system has acknowledged the value
* ts   - a unix timestamp indicating the last update of the state
* lc   - a unix timestamp indicating the last change of the state's actual value
* from - adapter instance that did the "setState"
* expire - a integer value that can be used to set states that expire after a given number of seconds. Can be used ony with setValue. After the value expires, it disappears from redisDB.





Every *state* has to be represented by an object of the type state containing Meta-Data for the state. see below.



## Objects

### Mandatory attributes

Following attributes have to exist in every object:

* _id
* type (see below for possible values)
* common (includes an object with mandatory attributes for specific type)
* common.name (the name of the object)
* native (includes an object with 1:1 attributes of the target system)

### Optional attributes

* parent   - ID of parent object (see below)

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


### Attributes for specific types

#### state

attributes:

* common.type (optional - default is mixed==any type) (possible values: number, string, boolean, array, object, mixed)
* common.min  (optional)
* common.max  (optional)
* common.unit (optional)
* common.def  (optional - the default value)
* common.desc (optional, string)
* common.read  (boolean, mandatory) - true if state is readable
* common.write (boolean, mandatory) - true if state is writeable


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

* (QUESTION) WHERE is the normal state? (common.type=boolean) - What do you mean by normal state? Simple value (ro) / switch (rw)?

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

##### channel common.role

suggestion: the channel-objects common.role should/could imply a set of mandatory and/or optional state-child-objects

possible values:

* info          - (QUESTION) Currency or shares rate? What else? - f.e. sprit prices, post box insertion and stuff like that
* calendar      -
* forecast      - weather forecast

* media         - common media channel
* media.music   - media player, like sonos, yamaha and so on
* media.tv      - TV 
* media...

* thermo        - Monitor or control the temperature, humidity and so on
* thermo.heat 
* thermo.cool
*
* blind         - Window blind control  

* light
* light.dimmer      - Light dimmer
* light.switch      - Light switch.
* light.color       - Light control with ability of color changing
* light.color.rgb   - Set color in RGB
* light.color.rgbw  - Set color in RGBW
* light.color.hsl   - Set color in Hue/Saturation/Luminance (Hue color light - LivingColors...)
* light.color.hslct - Set color in Hue/Saturation/Luminance or Color Temperature (Hue extended color light)
* light.color.ct    - color temperature K 

* sensor           - E.g. window or door contact, water leak sensor, fire sensor
* sensor.door      - open, close
* sensor.door.lock - open, close, locked
* sensor.window    - open, close
* sensor.window.3  - open, tilt, close
* sensor.water
* sensor.fire
* sensor.CO2

* phone         - fritz box, speedport and so on

* button
* remote        - (QUESTION) ??? Button on the wall? Remote with buttons? (Possible names: keyPad, buttons, remote, keySwitch, switch - if other switch will be "relay")

* ...


#### Channel descriptions
"W" - common.oper.write=true

"M" - Mandatory

@bluefox - I would not standardize names. This is why we have the role attribute so we don't need to rely on names.

##### light.switch - Attributes description
| **Name**      | **common.role**           | **M** | **W** | **common.type** | **Description**
| ------------- |:--------------------------|:-----:|:-----:|-----------------|---
| state         | switch                    |   X   |   X   | boolean         |
| description   | text.description          |       |       |                 |
| mmm           | indicator.maintenance.mmm |       |       |                 | mmm = lowbat or unreach or whatever


##### light.dimmer - Attributes description
| **Name**      | **common.role**           | **M** | **W** | **common.type** | **Description**
| ------------- |:--------------------------|:-----:|:-----:|-----------------|---
| level         | level.dimmer              |   X   |   X   | number          |
| value         | value                     |       |       | number          | "level" to control and "value" to read state? - I would prefer to combine. If level is present value is not necessary
| ~~min~~       | value.min                 |   X   |       | number          | @bluefox - let's talk via phone
| ~~max~~       | value.max                 |   X   |       | number          |
| working       | indicator.working         |       |       | boolean         | If light now changes
| default       | value.default             |       |       | number          |
| direction     | direction                 |       |       | string          | "up"/"down"/""
| description   | text.description          |       |       | string          |
| mmm           | indicator.maintenance.mmm |       |       | string          | mmm = lowbat or unreach or whatever

##### blind - Attributes description
| **Name**      | **common.role**           | **M** | **W** | **common.type** | **Description**
| ------------- |:--------------------------|:-----:|:-----:|-----------------|---
| level         | level.dimmer              |   X   |   X   | number          |
| value         | value                     |       |       | number          | "level" to control and "value" to read state ? - see above
| min           | value.min                 |   X   |       | number          |
| max           | value.max                 |   X   |       | number          |
| working       | indicator.working         |       |       | boolean         | If blind moves now
| default       | value.default             |       |       | number          |
| direction     | direction                 |       |       | string          | "up"/"down"/""
| description   | text.description          |       |       | string          |
| mmm           | indicator.maintenance.mmm |       |       | string          | mmm = lowbat or unreach or whatever

##### phone - Attributes description
| **Name**       | **common.role**          | **M** | **W** | **common.type** | **Description**
| -------------- |:-------------------------|:-----:|:-----:|-----------------|---
| ringing_number | text.phone_number        |       |       | string          |
| ringing        | indicator                |       |       | boolean         |

...


#### device

#### enum

* common.members - optional array of member IDs


#### meta

id

 * *&lt;adapter-name&gt;.&lt;instance-number&gt;.meta.&lt;meta-name&gt;*
 * *&lt;adapter-name&gt;.meta.&lt;meta-name&gt;*
 * system.*meta.&lt;meta-name&gt;*



#### adapter

id *system.adapter.&lt;adapter.name&gt;*

* common.mode
* common.enabled (value should be false so new instances are disabled by default)
* common.language (possible values: javascript, other)


#### instance

id *system.adapter.&lt;adapter.name&gt;.&lt;instance-number&gt;*

* common.host (host where the adapter should be started at - object *system.host.&lt;host&gt;* must exist
* common.enabled
* common.mode (possible values see below)

##### instance common.mode

* **daemon** - always running process (will be restarted if process exits)
* **subscribe** - is started when state *system.adapter.&lt;adapter-name&gt;.&lt;instance-number&gt;.alive* changes to *true*. Is killed when *.alive* changes to *false* and sets *.alive* to *false* if process exits (will **not** be restarted when process exits)
* **schedule** - is started by schedule found in *system.adapter.&lt;adapter-name&gt;.&lt;instance-number&gt;.schedule* - reacts on changes of *.schedule* by rescheduling with new state



#### host

id *system.host.&lt;host&gt;*

#### config

#### path (better name it dir?)

id *system.vfs.&lt;name&gt;

* common.name (name of the directory)
* common.children (better name it common.subdirs?) (array of child objects with type path)
* common.files (array of child objects with type file)

#### file

* parent (id of a path object)
* common.size (size in kBytes)
* common.mine (mime-type)

one CouchDB-Attachment - the file itself

#### script

* common.platform   - possible Values 'Javascript/Node.js' (more to come)
* common.enabled
* common.source     - the script source
* common.engine     - scriptengine instance that should run this script (f.e. 'javascript.0')
