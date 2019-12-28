---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/objectsschema.md
title: TR: Core Concept
hash: 8Mh7hofRJIFbY6Z0z7qwfY1rz+sDJnaMTFOdfSuaqGg=
---
TR: # Core Concept
TR: There are two fundamentally different data-types in ioBroker. So called **states**(`states`) and **objects**.

TR: Objects represent rarely changing and larger data, like meta-data of your systems devices, configurations and additional files. Every Object has to have an attribute "type". See below for more information what object types are available and which mandatory attributes a object of a specific type needs. Functions like setObject, getObject, ... are provided to you by the adapter module.

TR: States represent often changing data in your system, like f.e. if a lamp is on or off, if a motion detector detected some motion, the temperature of your living room or if the button of a remote control is pressed. Contrary to objects states can be used to trigger actions and states can create history data. To work with states there are several functions in the adapter module like setState, getState and so on.

TR: For every state there also has to exist a corresponding object with `type=state`.

TR: The following chapters describe Database Schema.

TR: ## IDs
TR: ID is a string with a maximum length of 240 bytes, hierarchically structured, levels separated by dots.

TR: Following characters are prohibited to use in IDs: `[]*,;'"&#96;<>\\?`.

TR: It is not suggested to use `^$()/` too.

TR: The ID has different levels. Each level is determined by dot. Example: `system.adapter.admin.0`

TR: - `system` - is namespace for system objects
TR: - `adapter` - namespace for adapter configs
TR: - `admin` - adapter name
TR: - `0` - adapter instance

TR: Or other example `hm-rpc.1.ABC110022.2.VALUE`:

TR: - `hm-rpc` - is name of adapter
TR: - `1` - adapter instance
TR: - `ABC110022` - device address
TR: - `2` - channel name
TR: - `VALUE` - state name

TR: ## Namespaces
TR: * `system.`             - System objects and states
TR: * `system.host.`        - Controller processes
TR: * `system.config.`      - System settings, like default language
TR: * `system.meta.`        - System meta data
TR: * `system.user.`        - Users
TR: * `system.group.`       - Groups
TR: * `system.adapter.<adapter-name>` - default config of an adapter
TR: * `<adapter-name>.`     - objects for specific adapter.
TR: * `<adapter-name>.meta.` - common meta-data used by all instances of this adapter
TR: * `<adapter-name>.<instance-number>.` - An adapters instance namespace
TR: * `enum.`               - Enumerations
TR: * `history.`            - History Data
TR: * `scripts.`            - Script Engine Scripts
TR: * `scripts.js.`         - javascript Script Engine Scripts
TR: * `scripts.py.`         - python Script Engine Scripts (future)

TR: ### Namespace system.config.
```
{
    _id:   id,
    type: 'config',
    common: {
        language:     'en',         // Default language for adapters. Adapters can use different values.
        tempUnit:     '°C',         // Default temperature units.
        currency:     '€',          // Default currency sign.
        dateFormat:   'DD.MM.YYYY'  // Default date format.
        isFloatComma: true,         // Default float divider ('.' - false, ',' - true)
        "activeRepo": "online1",    // active repository
        "listRepo": {               // list of possible repositories
            "default": "conf/sources-dist.json",
            "online1": "https://raw.githubusercontent.com/ioBroker/ioBroker.nodejs/master/conf/sources-dist.json"
        }
    }
}
```

TR: ### Namespace system.host.&lt;hostname&gt;
```
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
```

TR: <a id="states"></a>

TR: ## States
TR: getState method and stateChange event delivers an object with all attributes except expire

TR: for `setState` method everything except `val` is optional, `from` is set automatically by the `setState` method. `ack` defaults to false, `ts` and `lc` are set as expected

TR: attributes for getState/stateChange/setState object:

TR: * `val`    - the actual value - can be any type that is JSON-"encodable"
TR: * `ack`    - a boolean flag indicating if the target system has acknowledged the value
TR: * `ts`     - a unix timestamp indicating the last update of the state (in milliseconds)
TR: * `lc`     - a unix timestamp indicating the last change of the state's actual value (in milliseconds)
TR: * `from`   - adapter instance that did the `setState`
TR: * `user`   - user name, that set the value
TR: * `expire` - a integer value that can be used to set states that expire after a given number of seconds. Can be used ony with `setValue`. After the value expires, it disappears from redisDB.
TR: * `c`      - comment for this state change.
TR: * `q`      - quality. Number with following states:

```
  0x00 - 00000000 - good (can be undefined or null)
  0x01 - 00000001 - general bad, general problem
  0x02 - 00000010 - no connection problem

  0x10 - 00010000 - substitute value from controller
  0x40 - 00100000 - substitute value from device or instance
  0x80 - 01000000 - substitute value from sensor

  0x11 - 01000001 - general problem by instance
  0x41 - 01000001 - general problem by device
  0x81 - 10000001 - general problem by sensor

  0x12 - 00010010 - instance not connected
  0x42 - 01000010 - device not connected
  0x82 - 10000010 - sensor not connected

  0x44 - 01000100 - device reports error
  0x84 - 10000100 - sensor reports error
```

TR: Every *state* has to be represented by an object of the type state containing Meta-Data for the state. See below.

TR: ## Objects
TR: ### Mandatory attributes
TR: Following attributes have to exist in every object:

TR: * `_id`
TR: * `type`        - see below for possible values
TR: * `common`      - an object containing ioBroker specific abstraction properties
TR: * `native`      - an object containing congruent properties of the target system

TR: ### Optional attributes
TR: * `common.name` - the name of the object (optional but strictly suggested to fill it)

TR: ### Tree structure
TR: The tree structure is assembled automatically by names. E.g. ```system.adapter.0.admin``` is parent for `system.adapter.0.admin.uptime`. Use this name convention with point ".", as divider of levels.

TR: ### Object types
TR: * `state`    - parent should be of type channel, device, instance or host
TR: * `channel`  - object to group one or more states. Parent should be device.
TR: * `device`   - object to group one or more channels or state. Should have no parent except adapter instance namespace.
TR: * `enum`     - objects holding a array in common.members that points to states, channels, devices or files. enums can have a parent enum (tree-structure possible)
TR: * `host`     - a host that runs a controller process
TR: * `adapter`  - the default config of an adapter. presence also indicates that the adapter is successfully installed. (suggestion: should have an attribute holding an array of the hosts where it is installed)
TR: * `instance` - instance of adapter. Parent has to be of type adapter
TR: * `meta`     - rarely changing meta information that a adapter or his instances needs
TR: * `config`   - configurations
TR: * `script`   - scripts
TR: * `user`     - users
TR: * `group`    - groups
TR: * `chart`    - charts

TR: #### Attributes for specific object types
TR: ##### State
TR: attributes:

TR: * `common.type`   (optional - (default is mixed==any type) (possible values: number, string, boolean, array, object, mixed, file). As exception the objects with type `meta` could have `common.type=meta.user` or `meta.folder`
TR: * `common.min`    (optional)
TR: * `common.max`    (optional)
TR: * `common.step`   (optional) - increase/decrease interval. E.g. 0.5 for thermostat
TR: * `common.unit`   (optional)
TR: * `common.def`    (optional - the default value)
TR: * `common.defAck` (optional - if common.def is set this value is used as ack flag, js-controller 2.0.0+)
TR: * `common.desc`   (optional, string)
TR: * `common.read`   (boolean, mandatory) - true if state is readable
TR: * `common.write`  (boolean, mandatory) - true if state is writable
TR: * `common.role`   (string,  mandatory) - role of the state (used in user interfaces to indicate which widget to choose, see below)
TR: * `common.states` (optional) attribute of type number with object of possible states {'value': 'valueName', 'value2': 'valueName2', 0: 'OFF', 1: 'ON'}
TR: * `common.workingID` (string, optional) - if this state has helper state WORKING. Here must be written the full name or just the last part if the first parts are the same with actual. Used for HM.LEVEL and normally has value "WORKING"

TR: ##### State `common.history`
TR: History function needs the history adapter or any other storage adapter of type history

TR: fifo length is reduced to min when max is hit. set to null or leave undefined to use defaults

TR: for a list of transports see history adapter README

TR: * `common.history` (optional)
TR: * `common.history.<HISTORY-INSTANCE>.changesOnly` (optional, boolean, if true only value changes are logged)
TR: * `common.history.<HISTORY-INSTANCE>.enabled` (boolean)

TR: ##### State `common.role`
TR: * `common.role` (indicates how this state should be represented in user interfaces)

[TR: possible values](stateroles.md)

TR: #### Channel
TR: ##### Channel `common.role` (optional)
TR: suggestion: the channel-objects common.role should/could imply a set of mandatory and/or optional state-child-objects

TR: possible values:

TR: * `info`          - Currency or shares rate, fuel prices, post box insertion and stuff like that
TR: * `calendar`      -
TR: * `forecast`      - weather forecast

TR: * `media         - common media channel
TR: * `media.music`   - media player, like SONOS, YAMAHA and so on
TR: * `media.tv`      - TV
TR: * `media.tts`     - text to speech

TR: * `thermo`        - Monitor or control the temperature, humidity and so on
TR: * `thermo.heat`
TR: * `thermo.cool`

TR: * `blind`             - Window blind control

TR: * `light`
TR: * `light.dimmer`      - Light dimmer
TR: * `light.switch`      - Light switch.
TR: * `light.color`       - Light control with ability of color changing
TR: * `light.color.rgb`   - Set color in RGB
TR: * `light.color.rgbw`  - Set color in RGBW
TR: * `light.color.hsl`   - Set color in Hue/Saturation/Luminance (Hue color light - LivingColors...)
TR: * `light.color.hslct` - Set color in Hue/Saturation/Luminance or Color Temperature (Hue extended color light)
TR: * `light.color.ct`    - color temperature K

TR: * `switch`            - Some generic switch

TR: * `sensor`            - E.g. window or door contact, water leak sensor, fire sensor
TR: * `sensor.door`       - open, close
TR: * `sensor.door.lock`  - open, close, locked
TR: * `sensor.window`     - open, close
TR: * `sensor.window.3`   - open, tilt, close
TR: * `sensor.water`      - true(alarm), false (no alarm)
TR: * `sensor.fire`       - true(alarm), false (no alarm)
TR: * `sensor.CO2`        - true(alarm), false (no alarm)

*

TR: * `alarm`             - some alarm

TR: * `phone`             - fritz box, speedport and so on

TR: * `button`            - like wall switch or TV remote, where every button is a state like .play, .stop, .pause
TR: * `remote`            - TV or other remotes with state is string with pressed values, e.g. "PLAY", "STOP", "PAUSE"

TR: * `meta`              - Information about device
TR: * `meta.version`      - device version
TR: * `meta.config`       - configuration from device
* ...

TR: #### Channel descriptions
TR: ~~The names of the attributes can be free defined by adapter, except ones written with **bold** font.~~

TR: "W" - common.write=true

TR: "M" - Mandatory

TR: ##### Optional states for every channel/device
```javascript
// state-working (optional)
{
   "_id": "adapter.instance.channelName.stateName-working", // e.g. "hm-rpc.0.JEQ0205612:1.WORKING"
   "type": "state",
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
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   false,                  // optional,  default false
       "type":  "boolean",              // optional,  default "boolean"
       "read":  true,                   // mandatory, default true
       "write": false,                  // mandatory, default false
       "min":   false,                  // optional,  default false
       "max":   true,                   // optional,  default true
       "role":  "indicator.maintenance" // mandatory
       "desc":  "Problem description"   // optional,  default undefined
   }
}
,
// state-maintenance-unreach (optional).
{
   "_id": "adapter.instance.channelName.stateName-maintenance-unreach", //e.g. "hm-rpc.0.JEQ0205612:0.UNREACH"
   "type": "state",
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

TR: ##### `light.switch` - Attributes description
TR: | **Name**      | **common.role**           | **M** | **W** | **common.type** | **Description** | ------------- |:--------------------------|:-----:|:-----:|-----------------|---

| TR: | state         | switch                    |   X   |   X   | boolean         |
| TR: | description   | text.description          |       |       |                 |
| mmm           | indicator.maintenance.mmm |       |       |                 | mmm = lowbat or unreach or whatever |

```
// SWITCH CHANNEL
{
   "_id": "adapter.instance.channelName", // e.g. "hm-rpc.0.JEQ0205614:1"
   "type": "channel",
   "common": {
       "name":  "Name of channel",      // mandatory, default _id ??
       "role":  "light.switch"          // optional   default undefined
       "desc":  ""                      // optional,  default undefined
   }
},
// SWITCH STATES
{
   "_id": "adapter.instance.channelName.state-switch", // e.g. "hm-rpc.0.JEQ0205614:1.STATE"
   "type": "state",
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

TR: ##### `light.dimmer` - Attributes description
```
// DIMMER CHANNEL
{
   "_id": "adapter.instance.channelName", // e.g. "hm-rpc.0.JEQ0205612:1"
   "type": "channel",
   "common": {
       "name":  "Name of channel",      // mandatory, default _id ??
       "role":  "light.dimmer"          // optional   default undefined
       "desc":  ""                      // optional,  default undefined
   }
},
// DIMMER STATES
{
   "_id": "adapter.instance.channelName.state-level", // e.g. "hm-rpc.0.JEQ0205612:1.LEVEL"
   "type": "state",
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

TR: ##### `blind` - Attributes description
```
// BLIND CHANNEL
{
   "_id": "adapter.instance.channelName", // e.g. "hm-rpc.0.JEQ0205615:1"
   "type": "channel",
   "common": {
       "name":  "Name of channel",      // mandatory, default _id ??
      "role":  "blind"                 // optional   default undefined
       "desc":  ""                      // optional,  default undefined
   }
},
// BLIND STATES
// Important: 0% - blind is fully closed, 100% blind is fully opened
{
   "_id": "adapter.instance.channelName.state-level", // e.g. "hm-rpc.0.JEQ0205615:1.LEVEL"
   "type": "state",
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
```

TR: ##### `phone` - Attributes description
TR: | **Name**         | **common.role**          | **M** | **W** | **common.type** | **Description** | `ringing_number` | `text.phone_number`      |       |       | `string`        |

| TR: | `ringing`        | `indicator`              |       |       | `boolean`       |
| TR: | `ringing`        | `indicator`              |       |       | `boolean`       |

...

TR: #### Device
TR: #### Enum
TR: * `common.members` - (optional) array of enum member IDs

TR: #### Meta
TR: id

TR:  * `*&lt;adapter-name&gt;.&lt;instance-number&gt;.meta.&lt;meta-name&gt;*`
TR:  * `*&lt;adapter-name&gt;.meta.&lt;meta-name&gt;*`
TR:  * `system.*meta.&lt;meta-name&gt;*`

TR: #### Adapter
TR: id `system.adapter.<adapter.name>`

TR: *Notice:* all flags are optional except special marked as **mandatory**.

TR: * `common.name`               - **mandatory** name of adapter without "ioBroker."
TR: * `common.title`              - (deprecated) longer name of adapter to show in admin
TR: * `common.titleLang`          - **mandatory** longer name of adapter in all supported languages like {en: 'Adapter', de: 'adapter', ru: 'Драйвер'}
TR: * `common.mode`               - **mandatory** possible values see below
TR: * `common.version`            - **mandatory** available version
TR: * `common.installedVersion`   - **mandatory** installed version
TR: * `common.enabled`            - **mandatory** [true/false] value should be false so new instances are disabled by default
TR: * `common.platform`           - **mandatory** possible values: Javascript/Node.js, more coming
TR: * `common.webservers`         - array of web server's instances that should serve content from the adapters www folder
TR: * `common.noRepository`       - [true/false] if adapter delivered with initial installation or has own repository
TR: * `common.messagebox`         - true if message box supported. If yes, the object system.adapter.&lt;adapter.name&gt&lt;adapter.instance&gt.messagebox will be created to send messges to adapter (used for email, pushover,...;
TR: * `common.subscribe`          - name of variable, that is subscribed automatically
TR: * `common.subscribable`       - variables of this adapter must be subscribed with sendTo to enable updates
TR: * `common.wakeup`             -
TR: * `common.availableModes`     - values for common.mode if more than one mode is possible
TR: * `common.localLink`          - link to the web service of this adapter. E.g to http://localhost:5984/_utils for futon from admin
TR: * `common.logTransporter`     - if this adapter receives logs from other hosts and adapters (e.g. to strore them somewhere)
TR: * `common.nondeletable`       - [true/false] this adapter cannot be deleted or updated. It will be updated together with controller.
TR: * `common.icon`               - name of the local icon (should be located in subdirectory "admin")
TR: * `common.extIcon`            - link to external icon for uninstalled adapters. Normally on github.
TR: * `common.logLevel`           - debug, info, warn or error
TR: * `common.supportStopInstance`- [true/false] if adapter supports signal stopInstance (**messagebox** required). The signal will be sent before stop to the adapter. (used if the problems occured with SIGTERM)
TR: * `common.allowInit`          - [true/false] allow for "scheduled" adapter to be called "not in the time schedule", if settings changed or adapter started.
TR: * `common.onlyWWW`            - [true/false] say to controller, that adapter has only html files and no main.js, like rickshaw
TR: * `common.singleton`          - adapter can be installed only once in whole system
TR: * `common.singletonHost`      - adapter can be installed only once on one host
TR: * `common.allowInit`          - [true/false] allow scheduled adapter start once after configuration changed and then by schedule
TR: * `common.config.width`       - default width for configuration dialog (deprecated - valid only for admin2)
TR: * `common.config.height`      - default height for configuration dialog (deprecated - valid only for admin2)
TR: * `common.config.minWidth`    - minimal width for configuration dialog (deprecated - valid only for admin2)
TR: * `common.config.minHeight`   - minimal height for configuration dialog (deprecated - valid only for admin2)
TR: * `common.os`                 - string or array of supported operation systems, e.g ["linux", "darwin"]
TR: * `common.stopBeforeUpdate`   - [true/false] if adapter must be stopped before update
TR: * `common.adminTab.singleton` - [true/false] if adapter has TAB for admin. Only one TAB for all instances will be shown.
TR: * `common.adminTab.name`      - name of TAB in admin
TR: * `common.adminTab.link`      - link for iframe in the TAB. You can use parameters replacement like this: "http://%ip%:%port%". IP will be replaced with host IP. "port" will be extracted from native.port.
TR: * `common.adminTab.ignoreConfigUpdate` - do not update config TAB if configuration changed (to enable configure settings in TAB)
TR: * `common.restartAdapters`    - array with names of adapter that must be restarted after this adapter is installed, e.g. ["vis"]
TR: * `common.preserveSettings`   - string (or array) with names of attributes in common of instance, which will not be deleted. E.g. "history", so by setState('system.adapter.mqtt.0", {..}) the field common.history will not be deleted even if new object does not have this field. To delete the attribute it must be explicitly done with ```common:{history: null}```.
TR: * `common.noConfig`           - [true/false] do not show configuration dialog for instance
TR: * `common.stopTimeout`        - timeout in ms to wait, till adapter shut down. Default 500ms.
TR: * `common.unsafePerm`         - [true/false] if the package must be installed with "npm --unsafe-perm" parameter
TR: * `common.supportCustoms`     - [true/false] if the adapter support settings for every state. It has to have custom.html file in admin. Sample can be found in ioBroker.history
TR: * `common.getHistory`         - [true/false] if adapter supports getHistory message
TR: * `common.blockly`            - [true/false] if adapter has custom blocks for blockly. (admin/blockly.js required)
TR: * `common.webExtendable`      - [true/false] if web server in this adapter can be extended with plugin/extensions like proxy, simple-api
TR: * `common.webExtension`       - relative filename to connect the web extension. E.g. in simple-api "lib/simpleapi.js" relative to the adapter root directory. Additionally is native.webInstance required to say where this extension will be included. Empty means, it must run as own web service. "*" means every web server must include it.
TR: * `common.welcomeScreen`      - array of pages, that should be shown on the "web" index.html page. ["vis/edit.html", "vis/index.html"] or [{"link": "vis/edit.html", "name": "Vis editor", "img": "vis/img/edit.png", "color": "blue"}, "vis/index.html"]
TR: * `common.unchanged`          - (system) please do not use this flag. It is a flag to inform the system, that configuration dialog must be shown in admin.
TR: * `common.serviceStates`      - [true/false or path] if adapter can deliver additional states. If yes, the path adapter/lib/states.js will be called and it give following parameters function (objects, states, instance, config, callback). The function must deliver the array of points with values like function (err, result) { result = [{id: 'id1', val: 1}, {id: 'id2', val: 2}]}
TR: * `common.nogit`              - if true, no install from github directly is possible
TR: * `common.materialize`        - if adapter supports > admin3 (materialize style)
TR: * `common.materializeTab`     - if adapter supports > admin3  for tab (materialize style)
TR: * `common.dataFolder`         - folder relative to iobroker-data where the adapter stores the data. This folder will be backed up and restored automatically. You can use variable '%INSTANCE%' in it.
TR: * `common.webPreSettings`     - list of parameters that must be included into info.js by webServer adapter. (Example material)
TR: * `common.libs`               - list of debian/centos packages, that required for this adapter (of course only OS with apt, apt-get, yum as package managers)
TR: * `common.eraseOnUpload`      - erase all previous data in the directory before upload
TR: * `common.webByVersion`       - show version as prefix in web adapter (usually - ip:port/material, webByVersion - ip:port/1.2.3/material)
TR: * `common.noIntro`            - never show instances of this adapter on Intro/Overview screen in admin (like icons, widgets)
TR: * `common.expert`             - show this object only in expert mode in admin
TR: * `common.compact`            - says to controller that this adapter can be started in the same process if desired

TR: #### instance
TR: id *system.adapter.&lt;adapter.name&gt;.&lt;instance-number&gt;*

TR: *`common.host`    - (mandatory) host where the adapter should be started at - object* ystem.host.&lt;host&gt;* must exist
TR: * `common.enabled`    - (mandatory)
TR: * `common.mode`       - (mandatory) possible values see below

TR: ##### adapter/instance common.mode
TR: * `none`        - this adapter doesn't start a process
TR: * `daemon`      - always running process (will be restarted if process exits)
TR: * `subscribe`   - is started when state *system.adapter.&lt;adapter-name&gt;.&lt;instance-number&gt;.alive* changes to *true*. Is killed when *.alive* changes to *false* and sets *.alive* to *false* if process exits (will **not** be restarted when process exits)
TR: * `schedule`    - is started by schedule found in *system.adapter.&lt;adapter-name&gt;.&lt;instance-number&gt;.schedule* - reacts on changes of *.schedule* by rescheduling with new state
TR: * `once`        - this adapter will be started every time the system.adapter.yyy.x object changed. It will not be restarted after termination.

TR: #### host
TR: id `system.host.<host>`

TR: * `common.name`       - f.e. `system.host.banana`
TR: * `common.process`
TR: * `common.version`
TR: * `common.platform`
TR: * `common.cmd`
TR: * `common.hostname`   - f.e. `banana`
TR: * `common.address`    - array of ip address strings

TR: #### config
TR: #### script
TR: * `common.platform`   - (mandatory) possible Values `Javascript/Node.js` (more to come)
TR: * `common.enabled`    - (mandatory) is script activated or not
TR: * `common.source`     - (mandatory) the script source
TR: *`common.engine`   - (optional)* cript engine* instance that should run this script (f.e. 'javascript.0') - if omitted engine is automatically selected

TR: #### user
TR: * `common.name`       - (mandatory) Name of user (Case sensitive)
TR: * `common.password`   - (mandatory) MD5 Hash of password

TR: #### group
TR: * `common.name`       - (mandatory) name of the group
TR: * `common.members`    - (mandatory) array of user-object IDs
TR: * `common.desc`       - (optional) group purpose description