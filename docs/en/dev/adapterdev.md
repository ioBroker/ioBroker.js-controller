---
lastChanged: 2019.01.13
---
# Guide for adapter developers

## Content
- [Data structure - Objects and states](#data-structure---objects-and-states)
- [Directory structure of adapter](#directory-structure-of-adapter)
- [File naming](#file-naming)
- [Structure of io-package.json](#structure-of-io-packagejson)
    - [Common fields](#common-fields)
    - [Object fields](#object-fields)
    - [Instance object fields](#instance-object-fields)
- [package.json](#packagejson)
- [Deploying](#deploying)
- [How to create own adapter](#how-to-create-own-adapter)
    - [Structure of main.js](#structure-of-mainjs)
    - [Options of adapter](#options-of-adapter)
    - [Attributes of adapter object](#attributes-of-adapter-object)
    - [Most important events](#most-important-events)
    - [Logging](#logging)
    - [Instance configuration](#instance-configuration)
    - [How to read state](#how-to-read-state)
    - [Commands and Statuses](#commands-and-statuses)
    - [How to write state](#how-to-write-state)
    - [Structure of state](#structure-of-state)
    - [Running modes of adapter](#running-modes-of-adapter)
    - [How to read object](#how-to-read-object)
    - [How to write object](#how-to-write-object)
    - [info.connection](#infoconnection)


- [Functions](#functions)
- [How to create instance](#how-to-create-instance)
- [How to debug](#how-to-debug)
- [admin.html](#adminhtml)
- [Best practice](#best-practice)

## Data structure - Objects and states

An adapter in ioBroker is an independent process, that reads and writes objects and states in a central data storage.
Data storage can be represented as database (redis/couchDB) or just text file, but the connection way is always the same - via API. That means, the developer should not care about what the database it is and how the data will be stored and delivered there.

There are two types of data in the storage:

- Objects
- States

Objects are static descriptions of some data point. States are the dynamic values of data points. So normally for every state there is a object with description. (But not vice versa).

Objects additionally describe:
- configuration of hosts
- description of adapters
- configuration of adapter instances
- content of configuration HTML files
- content of WEB files
- enumerations
- users
- hierarchies of states (channels and devices)

You can explore the objects and the current state values in admin adapter on the "Objects"-tab.

The name of object consists of different parts. Every part is divided by "." from each other.
There is a system objects (name starts with _ or "system.") and adapter objects (name starts with _adapterName_).

**Note:** here and forth **adapterName** is the name of the adapter that a developer wants to create.

The states can be grouped in channels and the channels in devices. Here is a example of Homematic groups and channels:

- hm-rpc.0.IEQ1234567 - device
  - hm-rpc.0.IEQ1234567.0 - channel
    - hm-rpc.0.IEQ1234567.0.INFO - state
    - hm-rpc.0.IEQ1234567.0.RSSI - state
  - hm-rpc.0.IEQ1234567.0 - channel
    - hm-rpc.0.IEQ1234567.0.STATE - state
    - hm-rpc.0.IEQ1234567.0.BATTERY - state

The state ID must always start with channel name and channel name with device name. E.g. in the state name **hm-rpc.0.IEQ1234567.0.INFO** above, the part **hm-rpc.0.IEQ1234567.0** is the channel name and **hm-rpc.0.IEQ1234567** is the device name.

It is used to build the coordination of device, channels and states in hierarchy.

**Note:** If adapter is not so complex, the devices and even channels can be omitted.

**Adapter** is just the package of files and placed in _node_modules_ directory.
For every adapter the description of this adapter can be found in object "_system.adapter.adapterName_". It is just the fields "common" and "native" from the io-package.json file. This entry is created automatically when _iobroker install adapterName_ or _iobroker add adapterName_ called. If the adapter was installed with _npm install iobroker.adapterName_ no entry will be created till first instance creation. But it is not so important. The required for "updates" information will be read from _io-package.json_ directly.
Full list of common settings for adapter can be found [here](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#adapter)

**Instance** is an instance of adapter. Depending on type of adapter more than one instance can be created , but for some adapters there is no use to create more than one instance. E.g. in case of vis or rickshaw only one instance can be created. This behavior is controlled by flags in _io-package.json_.

For each instance the configuration object can be found in the data storage under "_system.adapter.adapterName.X_" ID, where X is the adapter instance number. It contains the settings for this instance of the adapter. Normally it consist of "common" and "native" settings. Common settings are:

- enabled: true/false;
- host: host name where this instance must run;
- mode: none, daemon, subscribe, schedule, once;

Description can be found [here](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#instance)

"Native" settings consist of **specific** configurations for this adapter, e.g.: IP address of device, device settings and so on.

**Note:** Instances can run on different hosts (in multi-hosts systems) and the adapters can have different version on different hosts.

All adapter instance object IDs starts with _adapterName.X_, where X is number of adapter instance.

Objects have different [types](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#object-types) for different purposes.

For every adapter (not the instance) the following objects will be created automatically:

- system.adapter.adapterName: Description of adapter (like name, version number, ...)
- adapterName: Object that consists of HTML/JS/CSS files from "www" directory of adapter. This object will be created only if "www" directory is found in adapter package.
- adapterName.admin: Object that consists of HTML/JS/CSS files from "admin" directory of adapter package.


For every adapter instance 'X', the following objects will be created automatically:

- system.adapter.adapterName.X: configuration of adapter instance
- system.adapter.adapterName.X.alive: indication if instance alive (send messages every 30 seconds)
- system.adapter.adapterName.X.connected: indication if instance is connected to data storage, because it can be connected, but because of deadlock can not send alive messages.
- system.adapter.adapterName.X.memHeapTotal: memory usage
- system.adapter.adapterName.X.memHeapUsed: memory usage
- system.adapter.adapterName.X.memRss: memory usage
- system.adapter.adapterName.X.uptime: How many seconds adapter runs.

Explanation of memory states can be found [here](http://stackoverflow.com/questions/12023359/what-do-the-return-values-of-node-js-process-memoryusage-stand-for).

If adapter has mode 'none' or 'once', then alive, uptime, ... objects will not be created.

## Directory structure of adapter
Adapter package must have some mandatory directories and files:

- admin (mandatory directory)
    - index.html
    - xxx.png - optional, better if it has name adapterName.png (any image formats are supported: jpeg, jpg, svg, bmp, ...)
- www - (optional directory)
- lib - (mandatory directory, because of utils.js)
  - utils.js
- package.json - mandatory
- io-package.json - mandatory
- main.js - mandatory (can be adapterName.js)

**Note**: lib/utils.js is a common file for all adapters, used to detect the position of js-controller and accordingly path to iobroker.js-controller/lib/adapter.js. Most actual utils.js can be downloaded [here](https://github.com/ioBroker/ioBroker.build/blob/master/adapters/utils.js). _Do not change this file._

## File naming
Adapter must must follow some naming convention to be accepted and started by ioBroker controller.

1. On github (or somewhere else) it must have name _io**B**roker.adapterName_.
2. If the adapter will be available on npm it must have name _io**b**roker.adapterName_, because npm doe snot allow capital letters in package names. It can be defined in in _package.json_
3. GUI html file for configuration of adapter must have name admin/index.html. It can be more files in the "admin" directory, but index.html must exist.
3. The start file of adapter must have name _main.js_ or _adapterName.js_.
4. Name of adapter must be unique, lowercase, with no special characters and without spaces. "-", "_" are allowed in the name of adapter.

## Structure of io-package.json
io-package.json is used by js-controller to show information about adapter and to know how to treat it.
Complete description of all fields in common part can be found [here](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#adapter)

io-package.json will be read by "admin" to find out the online version of adapter.

### Common fields
Most important fields in **common** are:

- name: mandatory. Name of adapter without "ioBroker.", like adapterName and not "ioBroker.adapterName"
- version: mandatory. Must be same as in package.json.
- title: mandatory. Short name of adapter, like "Adapter name"
- desc: mandatory. Description of adapter. It can be a string like, "This adapter does this and that" or can be an object like:

```
{
   "en": "This adapter does this and that",
   "de": "Dieser Aadpter macht dies und jenes",
   "ru": "Этот драйвер делает то и это"
}
```
If no entry exists for the current language, the description in english will be shown.

- platform: mandatory. Actually only "Javascript/Node.js" is supported.
- mode: mandatory. The mode how the adapter will be started.
- enabled: optional. When set to true, the instance will be activated after addition.
- license": license name under what the adapter is licensed;
- loglevel": initial log level that will be set after creation of instance. Can be "debug", "info", "warn" or "error"
- readme": link to readme page in internet. Used by admin adapter to show the link if "?" button clicked.
- icon": icon name (not the path) of adapter icon. This icon must be in admin directory of adapter.
- extIcon: icon path in internet to show the icon for adapter if the adapter is not yet installed.
- keywords: key words as array to enable search in admin adapter.
- localLink: link to adapter "www" files (or adapter server). "http://192.168.0.100"
- type: following types are possible: hardware, social, storage, visual, api, scripting, weather, other, connection.
- messagebox: optional. Must be set to **true** if adapter should receive system messages.

**Note:** localLink can have special keys, that will be replaced by real values.

- %ip%: will be replaced with IP address defined in first "web" instance.
- %field%, where field is attribute from "native" part of configuration of adapter instance.

E.g. "http://%ip%:%port%" will be shown as "http://192.168.0.1:8080", where "192.168.0.1" is IP address from "web" adapter and 8080 is value from "system.adapter.adapterName.X => native.port".


### Object fields
objects - static objects for all instances of adapter (xxx.object)
By installation of adapter (not the instance creation) some predefined objects (normally that describe something) can be created automatically. These objects must not depend on some specific instance and are common for all instances of this adapter. For example [hm-rpc](https://github.com/ioBroker/ioBroker.hm-rpc/blob/master/io-package.json) adapter has the structure description of all HomeMatic devices.

Additionally the new views can be defined. In SQL they are called ["stored procedure"](http://en.wikipedia.org/wiki/Stored_procedure) and in couchDB - [views](http://guide.couchdb.org/editions/1/en/views.html).

**Note**: do not mix with "vis" views.

For view definitions the javascript language is used. Here is the sample:
```
{
	"_id": "_design/hm-rpc",
	"language": "javascript",
	"views": {
		"listDevices": {
			"map": "function(doc) {\n  if (doc._id.match(/^hm-rpc\\.[0-9]+\\.\\*?[A-Za-z0-9_-]+(\\.[0-9]+)?$/)) {\n   emit(doc._id, {ADDRESS:(doc.native?doc.native.ADDRESS:''),VERSION:(doc.native?doc.native.VERSION:'')});\n  }\n}"
		},
		"paramsetDescription": {
			"map": "function(doc) {\n  if (doc._id.match(/^hm-rpc\\.meta/) && doc.meta.type === 'paramsetDescription') {\n   emit(doc._id, doc);\n  }\n}"
		}
	}
}
```

Here are two views defined for hm-rpc adapter: "listDevices" and "paramsetDescription". They returns the set of filtered by view condition objects from data store. It can effective (if CouchDB used) request the specified list of objects.

To use view:

```
adapter.objects.getObjectView('hm-rpc', 'listDevices',
     {startkey: 'hm-rpc.' + adapter.instance + '.', endkey: 'hm-rpc.' + adapter.instance + '.\u9999'},
     function (err, doc) {
	if (doc && doc.rows) {
		for (var i = 0; i < doc.rows.length; i++) {
			 var id  = doc.rows[i].id;
			 var obj = doc.rows[i].value;
			 console.log('Found ' + id + ': ' + JSON.stringify(obj));
		}
                if (!doc.rows.length) console.log('No objects found.');
	} else {
		console.log('No objects found: ' + err);
	}
});
```

Usage of _startkey_ and _endkey_ can be found on the [same page](http://guide.couchdb.org/editions/1/en/views.html) too.

**Note:** usage of views is optional and demands from developer basic knowledge level about CouchDB.

### Instance object fields
Some specific objects or objects with type states can be defined in _instanceObjects_ of io-package.json.

For every created instance all entries from _instanceObjects_ field will be created.

For instance adapter _hm-rpc_ creates state "updated" for every instance to give a signal to other adapter, that some new devices are appeared in the data store and that they must be processed by hm-rega.
```
"instanceObjects": [
	{
		"_id": "updated",
		"type": "state",
		"common": {
			"name": "Some new devices added",
			"type": "bool",
			"read":  true,
			"write": true
		}
	}
]
```
There is no need to give the full path of object and it cannot be done, because adapter instance is unknown. You can use special word "%INSTANCE%" in _common.name_ to show the it in the name of object. For instance:

```
"name": "Some new devices added in hm-rpc.%INSTANCE%",
```

Will be expanded to

```
"name": "Some new devices added in hm-rpc.0,
```

by creation of first instance.

## package.json
package.json is the npm packet standart description file and the full description can be found under [https://docs.npmjs.com/files/package.json](https://docs.npmjs.com/files/package.json).

Short structure of package.json:
```
{
  "name": "iobroker.adapterName",
  "version": "0.0.1",
  "description": "Adapter XXX",
  "author": "myName<myemail@mail.com>"
  "homepage": "https://github.com/yourgit/ioBroker.adapterName",
  "readme": "https://github.com/yourgit/ioBroker.adapterName/blob/master/README.md",
  "keywords": ["ioBroker", "adapterName"],
  "repository": {
    "type": "git",
    "url": "https://github.com/yourgit/ioBroker.adapterName"
  },
  "dependencies": {
      "myPacket1": "~0.3.1",
      "myPacket2": "~2.1.0"
  },
  "devDependencies": {
    "grunt": "~0.4.4",
    "grunt-replace": "~0.7.6",
    "grunt-contrib-jshint": "~0.10.0",
    "grunt-jscs": "~0.6.1",
    "grunt-http": "~1.4.1",
    "grunt-contrib-clean": "~0.5.0",
    "grunt-contrib-compress": "~0.8.0",
    "grunt-contrib-copy": "~0.5.0",
    "grunt-exec": "~0.4.5"
  },
  "bugs": {
    "url": "https://github.com/yourgit/ioBroker.adapterName/issues"
  },
  "main": "main.js",
  "license": "MIT"
}
```
- All fields are mandatory. devDependencies should be inside too to enable the grunt tasks.

### Deploying
It is suggested to have the code on github. After the code is stable and lets to install adapter you can share you adapter to other user by asking them to install adapter as follow:

```
npm install https://github.com/yourName/iobroker.adapterName/tarball/master/
```
If everything is OK and you have got positive feedback from users you can publish adapter on npm. It would be good if before publishing you will create realease on github.

Publishing can be done with following command:

```
npm publish
```

Call it in the adapter directory. Be sure, that you deleted all other files except required (e.g. .idea) or add them to ".gitignore" file.

Of course you must first create the account on [npm](https://www.npmjs.com/signup)

**Note:** you cannot publish twice the code with the same version. Increase version in package.json and io-package.json before publishing.

After the adapter is tested and other users find it useful, it can be taken into common repository, so it can be installed via "admin" adapter.

## How to create own adapter
Please check [https://github.com/ioBroker/ioBroker.template](https://github.com/ioBroker/ioBroker.template) for a template of your own adapter.

If you want to create a widget or an adapter with a widget please check [ioBroker.vis-template]https://github.com/ioBroker/ioBroker.vis-template) for a template of your own adapter.

## Structure of main.js
```
var utils = require(__dirname + '/lib/utils'); // Get common adapter utils - mandatory
```
This line loads module lib/utils.js. It has common for all adapters function to find the root of iobroker.js-controller. Because adapter can be installed in three different paths:

- .../iobroker/node_modules/iobroker.adapterName - this is standard path and suggested to use
- .../iobroker.js-controller/node_modules/iobroker.adapterName - used by debugging
- .../iobroker.js-controller/adapter/adapterName - old style (deprecated)

utils.js do nothing except looks for _iobroker.js-controller/lib/adapter.js_ file and loads it.


```
var adapter = utils.adapter('adapterName'); // - mandatory
```
This line creates the object "Adapter" with name "adapterName". It loads all configuration for adapterName.X instance where X is the instance number of adapter.

js-controller starts adapter as fork of own process with two parameters: instance and log level; like:


```
child_process.fork('pathToAdapter/main.js', '0 info');
```

It is all will be automatically processed in adapter.js and developer of the adapter must not care about it.

Adapter supports 3 other start flags:
- --install - Starts adapter even if no configuration exists. Used by adapter to execute some install procedure by installation of adapter.
- --force - Starts adapter even if it is disabled in configuration
- --logs - Show logs in the console, if they shown only in log table.

```
var myPacket1= require('myPacket1'); // add own module
```
Then you can load all other modules that required in adapter, like 'fs', 'require' and so on. Just do not forget to declare them in package.json.

### Options of adapter
You can create adapter object with just by name, like ```utils.adapter('adapterName')``` or with additional parameters, like:

```
var adapter = utils.adapter({
    name: 'adapterName',  // mandatory - name of adapter
    dirname: '',          // optional - path to adapter (experts only)
    systemConfig: false,  // optional - if system global config must be included in object
                          // (content of iobroker-data/iobroker.json)
    config: null,         // optional - alternate global configuration for adapter (experts only)
    instance: null,       // optional - instance of the adapter
    useFormatDate: false, // optional - if adapter wants format date according to global settings.
                          // if true (some libs must be preloaded) adapter can use "formatDate" function.
    logTransporter: false,// optional - if adapter collects logs from all adapters (experts only)

    objectChange: null,   // optional - handler for subscribed objects changes
    message: null,        // optional - handler for messages for this adapter
    stateChange: null,    // optional - handler for subscribed states changes
    ready: null,          // optional - will be called when adapter is initialized
    unload: null,         // optional - will be called by adapter termination
    noNamespace: false    // optional - if true, stateChange will be called with id that has no namespace. Instead "adapter.0.state" => "state"
});
```
All handlers can be simulated by events (see below), like:

```
adapter.on('ready', function () {
    main();
});
```

### Attributes of adapter object
As you created "Adapter" object with

```
var adapter = utils.adapter('adapterName');
```
following attributes will be created in this object instance:
- *name* - Name of adapter, e.g "adapterName"
- *host* - Host name, where the adapter instance runs
- *instance* - instance number of this adapter instance
- *namespace* - Namespace of adapter objects, e.g "adapterName.0"
- *config* - native part of adapter settings
- *common* - common part of adapter settings
- *systemConfig* - content of _iobroker-data/iobroker.json_ (only if options.systemConfig = true)
- *adapterDir* - path to the adapter folder
- *ioPack* - content of io-package.json
- *pack*   - content of package.json
- *log* - logger object
- *version* - adapter version
- *states* - (experts only)
- *objects* - (experts only)
- *connected* - if adapter connected to host


#### Most important events
```
adapter.on('objectChange', function (id, obj) {
    adapter.log.info('objectChange ' + id + ' ' + JSON.stringify(obj));
});
```

```
adapter.on('stateChange', function (id, state) {
    adapter.log.info('stateChange ' + id + ' ' + JSON.stringify(state));

    // you can use the ack flag to detect if state is command(false) or status(true)
    if (!state.ack) {
        adapter.log.info('ack is not set!');
    }
});
```

- *Entry point*. Make all initialisations in main, because before "ready" there is no configuration.

```
adapter.on('ready', function () {
    main();
});
```
#### Logging
It is very important to have the ability to log the events for debug and controlling purposes. Following functions can be used to log the events:

```
    adapter.log.debug("debug message"); // log message with debug level
    adapter.log.info("info message");   // log message with info level (enabled by default for all adapters)
    adapter.log.warn("warning");        // log message with info warn
    adapter.log.error("error");         // log message with info error
```
There is no need to indicate the origin or time of the message. These attributes will be added automatically, e.g.:

```admin-0	2015-07-10 17:35:52	info	successful connection to socket.io from xx.yy.17.17```

Of course console.log, console.debug or console.error could be used too, but these messages will be visible only if adapter started manually in console or programming IDE.

#### Instance configuration
There is an attribute of adapter object to read the configuration of the instance: "adapter.config".
This object consist of "**native**" part of object "system.adapter.adapterName.X".
E.g. if **io-package.json** looks like:

```
{
    "common": {
        "name": "adapterName"
    },
    "native": {
        "location": "Stuttgart",
        "language": ""
    }
}
```

So the adapter.config is equal to:
```
{
    "location": "Stuttgart",
    "language": ""
}
```
and has the data entered by user in configuration dialog.
You can access the **common **part of instance configuration with attribute "common" of object "adapter".
E.g. for the shown io-package.json "adapter.common" will be:

```
{
   "name": "adapterName"
}
```

To access the **ioBroker configuration** (stored in file iobroker-data/iobroker.json) set the adapter option systemConfig to true.

```
var adapter = utils.adapter({
    name:          'adapterName',  // adapter name
    systemConfig:  true            // load ioBroker configuration into systemConfig
});
```

To get the global date format the option "**useFormatDate**" must be set to true:

```
var adapter = utils.adapter({
    name:          'adapterName',  // adapter name
    useFormatDate:  true           // load from system.config the global date format
});
```
Date format will be available under ```adapter.dateFormat```.

All other configurations can be read manually with ```getForeignObject``` function.

#### How to read state
There are two modes to read states in ioBroker adapter:
- event subscription (suggested)
- polling

To **subscribe** on own events the following command must be called:
```
adapter.subscribeStates('*'); // subscribe on all variables of this adapter instance with pattern "adapterName.X.*"
adapter.subscribeStates('memory*'); // subscribe on all variables of this adapter instance with pattern "adapterName.X.memory*"
```

To subscribe on other events:
```
adapter.subscribeForeignStates('yr.*.forecast.html'); // subscribe on variable "forecast.html" of all adapter instances "yr".
```
Wildcard "*" can be used in both functions.

After that you will get the event ["stateChange"](#most-important-events) and can do something with this value.
After subscription you will not get the actual state, because events will come only on change. To get the initial state you should perform "poll" one time at start (normally in "ready" event).

**Polling**
To read own states at start or to read the values with interval use function ```adapter.getState```, like here:
```
adapter.getState('myState', function (err, state) {

    adapter.log.info(
          'State ' + adapter.namespace + '.myState -' +
          '  Value: '        + state.val +
          ', ack: '          + state.ack +
          ', time stamp: '   + state.ts  +
          ', last changed: ' + state.lc
    );

});
```
Pay attention, that result will be returned asynchronous.

To read states of other adapters you should use ```adapter.getForeignState``` function. No wildcards are supported.

#### Commands and Statuses
We should distinguish between commands and statuses, when we are talking about states.
"Command" has **ack** flag as _false_ and will be sent by user (over vis, javascript-adapter, admin) to control the devices or specific adapter. Normally adapters (e.g. homematic) are subscribed on all own changes and if some state changes with _ack=false_, they will try to execute this command (e.g. light on).

"Status" has "ack" flag as _true_ and indicate that it is from device or service. E.g. if the weather adapter got new weather forecast, it will be published with _ack=true_ or if **homematic** thermometer measures new temperature, it will be published with _ack=true_ too. Even if the user physically will switch the light on, the new state will be published with ack=true.

_Ack=false_ will be normally overwritten by execution after the response from device.

E.g. if the user in "vis" has pressed the button and sent command _"hm-rpc.0.kitchen.light"=ON_. The **Socketio** adapter will send to the _hm-rpc.0_ instance the new state with _"kitchen.light" = {val: 1, ack: false}_.

Homematic adapter is subscribed for all states of _hm-rpc.0_ and if the new state will be received with _ack=false_, it sends the new value to the physical switch.

Physical switch executes the command and sends to _hm-rpc_ adapter the new own state **ON**. The _hm-rpc.0_ adapter publishes the new status of state _"hm-rpc.0.kitchen.light"={val: 1, ack: true}_ (with time stamps).

This change will not be executed by _hm-rpc_ adapter, because **ack** is _true_. And this is an acknowledgment from physical device.

#### How to write state
States can be written as commands or as statuses. For that ```adapter.setState``` and ```adapter.setForeignState``` must be used:

```
adapter.setForeignState('otherAdapter.X.someState', 1); // Control other adapter (there is no need to control own state, we can do it directly)
adapter.setState('myState', 1, true); // indicate new status of own state
adapter.setState('myState', {val: 1, ack: true}); // the same as above

adapter.setState('myState', 1, true, function (err) {
     // analyse if the state could be set (because of permissions)
     if (err) adapter.log.error(err);
});
```

**Note**: Following commands are identical

```
adapter.setState('myState', 1, false);
adapter.setState('myState', 1);
```

#### Structure of state
State is a javascript object with following attributes:
- **val**: Value of state (desired value or actual value)
- **ack**: direction flag. **false** for desired value and **true** for actual value. Default: false (command)
- **ts**: time stamp as the number of milliseconds between midnight of January 1, 1970 and the specified date. Result of method getTime() of Javascript object Date. Default: actual time.
- **lc**: last change time stamp. Same format as **ts**, but the time stamp of value change. It can be so that the value will be updated, but the value will stay the same. In this case **lc** will not be changed.
- **from**: name of the adapter instance, that set the value, e.g. "system.adapter.web.0" (In case of vis)
- **expire**: (optional) there is a possibility to set the expire timeout in seconds. After this period of time the variable will be set to "null". It will be used e.g. by "active" states of the adapter instances. If adapter instance will not trigger "active" state in 30 seconds it will be marked as **down**. To set state with expiration use following code ```setState('variable', {val: true, expire: 30})```
- **q**: (optional) Quality. See [here](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) the description

#### Running modes of adapter
 Adapter can run in different [modes](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#adapterinstance-commonmode). The mode for adapter can me defined over ```common.mode``` attribute.

- **none** - this adapter will not be started.
- **daemon** - always running process (will be restarted if process exits)
- **subscribe** - is started when state system.adapter.<adapter-name>.<instance-number>.alive changes to true. Is killed when .alive changes to false and sets .alive to false if process exits (will not be restarted when process exits)
- **schedule** - is started by schedule found in system.adapter.<adapter-name>.<instance-number>.common.schedule - reacts on changes of .schedule by rescheduling with new state
- **once** - this adapter will be started every time the system.adapter.<adapter-name>.<instance-number> object changed. **It will not be restarted after termination.**

If you change the mode of a adapter after release, you need to remove all instances and add them again after the update. If you want to handle this automatically in your adapter, look at this as an example: https://github.com/Apollon77/ioBroker.nut/blob/master/nut.js#L95

Normally adapters should use mode **daemon**.

If adapter just checks something every X minutes it should use mode "schedule" and define cron schedule in common.schedule (e.g. "1 * * * *" - every hour)

#### How to read object
Objects can be read with getObject or getForeignObject command:

```
adapter.getForeignObject('otherAdapter.X.someState', function (err, obj) {
    if (err) {
        adapter.log.error(err);
    } else {
        adapter.log.info(JSON.stringify(obj));
    }
});

adapter.getObject('myObject', function (err, obj) {

});
```

Functions are always asynchronous.

Objects of adapter must be organized in devices, channels and states.

See: getForeignObjects, findForeignObject, getForeignObject, getDevices, getChannels, getStatesOf

#### How to write object
To write the objects generally two functions can be used: setObject, setForeignObject.
But there are many help functions to modify objects:

- extendObject, extendForeignObject,
- delObject, delForeignObject,
- setObjectNotExists, setForeignObjectNotExists
- createDevice, deleteDevice
- createChannel, deleteChannel,
- createState, deleteState
- addStateToEnum, deleteStateFromEnum

extendObject is just reads object, merges with given one and write object back.

Difference between xxxObject and xxxForeignObject is that xxxObject automatically extends the object id with "adapter.instance." text.

Functions are always asynchronous.

```
adapter.getForeignObject('otherAdapter.X.someState', function (err, obj) {
    if (err) {
        adapter.log.error(err);
    } else {
        adapter.log.info(JSON.stringify(obj));
        obj.native = {}; // modify object
        adapter.setForeignObject(obj._id, obj, function (err) {
            if (err) adapter.log.error(err);
        });
    }
});
```

#### info.connection
If the adapter establishes and monitors some connection (e.g. to controlled device), it should create and maintenance **info.connection** variable.

If it happens, the status of connection will be shown in the instance's list in "admin" and if desired, the quality of states will be set up depends on the connection status.

## Functions

- setObject = function setObject(id, obj, callback)
- extendObject = function extendObject(id, obj, callback)
- setForeignObject = function setForeignObject(id, obj, callback)
- extendForeignObject = function extendForeignObject(id, obj, callback)
- getEnum = function getEnum(_enum, callback)
- getEnums = function getEnums(_enumList, callback)
- getForeignObjects = function getForeignObjects(pattern, type, enums, callback)
- findForeignObject = function findForeignState(id, type, callback)
- getForeignObject = function getForeignObject(id, callback)
- delObject = function delObject(id, callback)
- delForeignObject = function delForeignObject(id, callback)
- subscribeObjects = function subscribeObjects(pattern)
- subscribeForeignObjects = function subscribeObjects(pattern)
- setObjectNotExists = function setObjectNotExists(id, object, callback)
- setForeignObjectNotExists = function setForeignObjectNotExists(id, obj, callback)
- createDevice = function createDevice(deviceName, common, _native, callback)
- createChannel = function createChannel(parentDevice, channelName, roleOrCommon, _native, callback)
- createState = function createState(parentDevice, parentChannel, stateName, roleOrCommon, _native, callback)
- deleteDevice = function deleteDevice(deviceName, callback)
- addChannelToEnum = function addChannelToEnum(enumName, addTo, parentDevice, channelName, callback)
- deleteChannelFromEnum = function deleteChannelFromEnum(enumName, parentDevice, channelName, callback)
- deleteChannel = function deleteChannel(parentDevice, channelName, callback)
- deleteState = function deleteState(parentDevice, parentChannel, stateName, callback)
- deleteStateFromEnum('', parentDevice, parentChannel, stateName);
- getDevices = function getDevices(callback)
- getChannelsOf = function getChannelsOf(parentDevice, callback)
- getStatesOf = function getStatesOf(parentDevice, parentChannel, callback)
- addStateToEnum = function addStateToEnum(enumName, addTo, parentDevice, parentChannel, stateName, callback)
- deleteStateFromEnum = function deleteStateFromEnum(enumName, parentDevice, parentChannel, stateName, callback)
- rmDir = function rmDir(path, callback)
- mkDir = function mkDir(path, mode, callback)
- readDir = function readDir(adapter, path, callback)
- unlink = function unlink(adapter, name, callback)
- rename = function rename(adapter, oldName, newName, callback)
- mkdir = function mkdir(adapter, dirname, callback)
- readFile = function readFile(adapter, filename, options, callback)
- writeFile = function writeFile(adapter, filename, data, mimeType, callback)
- formatDate = function formatDate(dateObj, isSeconds, _format)
- sendTo = function sendTo(objName, command, message, callback)
- sendToHost = function sendToHost(objName, command, message, callback)
- setState = function setState(id, state, callback)
- setForeignState = function setForeignState(id, state, callback)
- getState = function getState(id, callback)
- getStateHistory = function getStateHistory(id, start, end, callback)
- getForeignStateHistory = function getStateHistory(id, start, end, callback)
- idToDCS = function idToDCS(id)
- getForeignState = function getForeignState(id, callback)
- delForeignState = function delForeignState(id, callback)
- delState = function delState(id, callback)
- getStates = function getStates(pattern, callback)
- getForeignStates = function getForeignStates(pattern, callback)
- subscribeForeignStates = function subscribeForeignStates(pattern)
- unsubscribeForeignStates = function unsubscribeForeignStates(pattern)
- subscribeStates = function subscribeStates(pattern)
- pushFifo = function pushFifo(id, state, callback)
- trimFifo = function trimFifo(id, start, end, callback)
- getFifoRange = function getFifoRange(id, start, end, callback)
- getFifo = function getFifo(id, callback)
- lenFifo = function lenFifo(id, callback)
- subscribeFifo = function subscribeFifo(pattern)
- getSession = function getSession(id, callback)
- setSession = function setSession(id, ttl, data, callback)
- destroySession = function destroySession(id, callback)
- getMessage = function getMessage(callback)
- lenMessage = function lenMessage(callback)
- setBinaryState = function setBinaryState(id, binary, callback)
- getBinaryState = function getBinaryState(id, callback)
- getPort = function adapterGetPort(port, callback)
- checkPassword = function checkPassword(user, pw, callback)
- setPassword = function setPassword(user, pw, callback)
- checkGroup = function checkGroup(user, group, callback)
- stop   (common.mode: subscribe, schedule, once)
- log.debug(msg)
- log.info(msg)
- log.warn(msg)
- log.error(msg)

EVENTS:
- ready
- objectChange(id, obj) (Warning obj can be null if deleted)
- message(obj)
- stateChange(id, state) (Warning state can be null if deleted)
- unload

## How to create instance
Before published to npm: copy into ioBroker/node_modules, go to "admin" and add instance
After published at npm: go to ioBroker/ and write "npm install iobroker.xxx --production", go to "admin" and add instance

## How to debug
- Start ioBroker
- Add instance of adapter
- Disable instance of adapter
- Start WebStorm
- Create Configuration for Debug with node.js
- Flags for application: --force, instance, log level (you can start the adapter as "node xxx.js 1 debug --force", 1 is instance index (by default 0, debug is log level and --force means ignore "enabled: false" settings)

## admin.html

- function showMessage(message, title, icon)
- function getObject(id, callback)
- function getState(id, callback)
- function getEnums(_enum, callback)
- function getIPs(host, callback)
- function fillSelectIPs(id, actualAddr, noIPv4, noIPv6)
- function sendTo(_adapter_instance, command, message, callback)
- function sendToHost(host, command, message, callback)
- function fillSelectCertificates(id, type, actualValued)
- function getAdapterInstances(_adapter, callback)
- function getIsAdapterAlive(_adapter, callback)
- function addToTable(tabId, value, $grid, _isInitial)
- function enumName2Id(enums, name)
- function editTable(tabId, cols, values, top, onChange)
- function getTableResult(tabId, cols)


## Best practice
...