![Logo](lib/img/iobroker.png)
# ioBroker.js-controller

![Number of Installations](http://iobroker.live/badges/js-controller-installed.svg)
![Number of Installations](http://iobroker.live/badges/js-controller-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.js-controller.svg)](https://www.npmjs.com/package/iobroker.js-controller)

![Test and Release](https://github.com/ioBroker/iobroker.js-controller/workflows/CI/badge.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.js-controller.svg)](https://www.npmjs.com/package/iobroker.js-controller)

The ioBroker.js-controller is the heart of any ioBroker installation. The controller is owning the central configuration of the ioBroker installation and controls and monitors all adapter processes for the current host.

**Please check the js-controller compatibility information below which version runs on your Node.js version**

## Compatibility
* js-controller 3.x works with Node.js 10.x, 12.x, 14.x and probably 16.x (first tests look good, NPM 7 still has some issues, so NPM6 is best)
* js-controller 2.x works with Node.js 8.x, 10.x , 12.x and probably 14.x (untested)
* js-controller 1.x works with Node.js 4.x, 6.x, 8.x and probably 10.x (untested)

Please try to stay current with your Node.js version because the support is limited in Time. As of now (April 2020) all Node.js versions below 10.x are no longer supported by Node.js and considered EOL (End Of Life).
To upgrade your Node.js version and ioBroker please follow https://forum.iobroker.net/topic/22867/how-to-node-js-f%C3%BCr-iobroker-richtig-updaten !

## Links

* [Changelog](CHANGELOG.md)
* Official web site: https://www.iobroker.net
* Forum: https://forum.iobroker.net
* Explanation of the concept: https://github.com/iobroker/iobroker

----------------------------------------------------------------------

## Usage

### Install `Node.js`

Example for a Debian based system:

```
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install curl build-essential
sudo curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
sudo apt-get install -y nodejs
```

### Install ioBroker
See [Linux instructions](https://www.iobroker.net/#en/documentation/install/linux.md),
[Windows instructions](https://www.iobroker.net/#en/documentation/install/windows.md) and

after that, ioBroker should be running and available in the browser under ```http://<ip>:8081/```.

### Start ioBroker controller
#### Linux
* run ```iobroker start``` to start the ioBroker controller in the background
* watch the logfile ```iobroker logs --watch```

or

* run ```node node_modules/iobroker.js-controller/controller.js``` in the ioBroker directory to start the ioBroker controller in foreground and watch the log on console.

### Windows

* run ```iobroker start``` in the ioBroker directory to start the ioBroker controller as service. The name of the service is "iobroker(<servicename>)"
* check the logfile ```log/iobroker.log```

or

* run ```node node_modules/iobroker.js-controller/controller.js``` in the ioBroker directory to start the ioBroker controller in foreground and watch the log on console

## Configuration

The main configuration is stored in `iobroker-data/iobroker.json`. Normally there is no need to edit this file because the ioBroker CLI commands cancontrol most of the settings.

## Feature Overview

### Admin UI
**Feature status:** stable

The admin adapter is installed automatically and starts a web-server that hosts the Admin UI. Default port is 8081, so just open `http://<iobroker-ip>:8081/`

If port 8081 is occupied, you can install a second Admin UI on an alternate port and change the port for the first admin UI. To do so, run ```iobroker add admin --enabled --port 8090``` and go to the `http://<iobroker-ip>:8090/`. Of course you can change port 8090 to a different one.

### Command Line Interface
**Feature status:** stable

The command line interface is described at https://www.iobroker.net/#de/documentation/config/cli.md

### Hostname
**Feature status:** stable

By default, the hostname for the js-controller instance will be taken from the official hostname of the server ioBroker is running on. The hostname should not be changed after the first start of ioBroker on this host.

If changes are needed there are CLI commands available to update the hostname. Look under https://www.iobroker.net/#de/documentation/config/cli.md for the `iobroker host ...` commands

If you need to set a specific hostname before the first start of iobroker you can also edit the iobroker.json file:

```
{
  "system": {
    ...
    "hostname":"local",
    ...
  },
```

### Adapter process memory limitation
**Feature status:** stable

By default the memory management is done by Node.js automatically. A Garbage Collector (GC) will clean up unused objects automatically from time to time.

If needed, especially for low memory situations the memory limit for all adapter processes can be set in `iobroker.json`. Only set this if really needed and you know what you are doing. Leave the value at 0 to not set a special memory limitation.

```
{
...
  "system": {
    ...
    "memoryLimitMB": 0,
    ...
  },
...
}
```

### Statistics
**Feature status:** stable

The js-controller is collecting statistics for the host (`system.host.hostname.*`), running compact groups (`system.host.hostname.compaczgroupX.*`) and for each adapter (`system.adapter.adaptername.*`). The data contains memory usage, free memory, number of events and also the event loop lag of the Node.js process.

### Error Reporting via ioBroker Sentry
**Feature status:** stable since js-controller 3.0.0

Sentry.io is a way for developers to get an overview about errors from their applications. The js-controller uses this method to make sure application crashes are reported to us. With this we can make sure to provide fixes for problems very fast.

Especially with the automatic restart behaviour of ioBroker some crashes happen and noone really realizes them. And so we also do not get bug reports for them. With this method the information are provided to us. 

When the js-controller crashes or an other Code error happens (and only then!), this error, that also appears in the ioBroker log, is submitted to our own Sentry server hosted in Germany. If you have allowed iobroker GmbH to collect diagnostic data then also your anonymous installation ID (this is just a unique ID **without** any additional infos about you, email, name or such) is included. This allows Sentry to group errors and show how many unique users are affected by such an error. IP adresses are not stored with the crash report! 

All of this helps me to provide an error free smart home system that basically never crashes.

If you want to disable the error reporting you can do this by setting the state "system.host.NAME.plugins.sentry.enabled" to false. You should see a log message stating that sentry was disabled. After disabling the plugin no crashes from your system are reported and so can not be fixed without reporting them by yourself manually!

### Notification System
**Feature status:** Technology preview since js-controller 3.2.0

The notification system in ioBroker allows to set, detect and store notifications per Host and allows to query the details.

Notifications need to be defined in the io-package.json of the adapter in the key "notifications". Notifications are grouped in "scopes" and contain "categories" of different notification types. Notifications can contain a regex for automatic detection in strings or adapter exception texts.
The definition also contain localized names and descriptions that can be used to display it to the users.

Registered notifications are stored per host and can be requested via messages to the host. They are also stored when the controller stops and loaded on next start.
Additionally a summary of the stored categories per scope with a number of stored notifications and the last added timestamp is available in the state `system.host.hostname.notifications.scopeid` as a JSON.

The js-controller defines in it's io-package the system scope together with all details. You can use this as an example.

#### How to register own notifications?
An adapter can use the method "registerNotification" to register own notifications to the system. To find out if the used controller version check if the method exists (or require at least js-controller 3.2.0).

This method takes the following parameters:
* scope: scope to be addressed
* category: category - to be addressed, if null message will be checked by regex of given scope
* message: message to be stored/checked

When a regex is defined then console.error output from the adapter is always checked by the regex and notifications are registered automatically when the regex matches! 

#### How to read notifications?
The host supports the message command "getNotifications" to query the stored notifications together with the localized names and descriptions.

The message needs to take the following parameters in the message object:
* scopeFilter - scope of notifications
* categoryFilter - category of notifications
* instanceFilter - instance of notifications

All three are optional and can be a string or null/undefined if ommited.

#### How to clear notifications?
The host supports the message command "clearNotifications" to clear specific notifications after they are handled.

**Please only clear notifications that really were handled and displayed to the user especially for "system" scope!**

The message needs to take the following parameters in the message object:
* scopeFilter - scope of notifications
* categoryFilter - category of notifications
* instanceFilter - instance of notifications

All three are optional and can be a string or null/undefined if ommited.

### Logging

#### Log levels
**Feature status:** stable

The js-controller and each adapter has defined it's own log level. By default, `info` is used. The following loglevels can be used:
* silly (most logging)
* debug
* info
* warn
* error (only errors are logged)

The log level for js-controller is configured in iobroker.json in the logs section:

```
{
  ...
  "log": {
    "level": "info",
    ...
  }
  ...
}
```

#### Dynamic Loglevel change
**Feature status:** stable since js-controller 2.0.0

The log level can be changed dynamically for adapter-instance and host (main controller and compact group controllers) after they have been started. Initially always the configured loglevel is used!

The states `system.adapter.xy.logLevel` and `system.host.hostname.logLevel` are updated on instance/controller start with the configured log level and can afterwards be used to change the loglevel during runtime. These changes are __not__ persisted, so the next restarts resets the loglevel to the configured one.

This possibility allows to better debug adapters also during runtime.

#### File based logging
**Feature status:** stable

The default logging will log file based in the log directory inside the ioBroker directory. The logfile will be stored with a name that contains the date and will be deleted after 7 days. It only contains the logs from the current host.

The logging is configured in the `iobroker.json` file and can be changed there:

```
{
  ...
  "log": {
    "level": "info",
    "maxDays": 7,
    "noStdout": true,
    "transport": {
      "file1": {
        "type": "file",
        "enabled": true,
        "filename": "log/iobroker",
        "fileext": ".log",
        "maxsize": null,
        "maxFiles": null
      },
    },
  ...
}
```

Since js-controller 3.0 Logfiles on non-Windows based systems are compressed on rotation, so that the older Files need less space on your storage. 

If you do not want to compress the files this behaviour can be deactivated by `iobroker.json`:

```
{
  ...
  "log": {
    ...
    "transport": {
      "file1": {
        ...
        "zippedArchive": false,
        ...
      },
    },
  ...
}
```


#### Syslog logging
**Feature status:** stable

ioBroker also supports logging to a syslog server. The configuration is also stored in the `iobroker.json` configuration file. A section for syslog is pre-created but disabled by default.

```
{
  ...
  "log": {
    ...
    "transport": {
      ...
      "syslog1": {
        "type": "syslog",
        "enabled": false,
        "host": "localhost",
        "host_comment": "The host running syslogd, defaults to localhost.",
        "port_comment": "The port on the host that syslog is running on, defaults to syslogd's default port(514/UDP).",
        "protocol": "udp4",
        "protocol_comment": "The network protocol to log over (e.g. tcp4, udp4, unix, unix-connect, etc).",
        "path_comment": "The path to the syslog dgram socket (i.e. /dev/log or /var/run/syslog for OS X).",
        "facility_comment": "Syslog facility to use (Default: local0).",
        "localhost": "iobroker",
        "localhost_comment": "Host to indicate that log messages are coming from (Default: localhost).",
        "sysLogType_comment": "The type of the syslog protocol to use (Default: BSD).",
        "app_name_comment": "The name of the application (Default: process.title).",
        "eol_comment": "The end of line character to be added to the end of the message (Default: Message without modifications)."
      }
    }
  }
  ...
}
```

#### Adapters allow to subscribe to logs
**Feature status:** stable

ioBroker allows adapters to subscribe to logs from the whole system. E.g. admin adapter is using this logic

More details for this feature can be found at https://github.com/ioBroker/ioBroker.js-controller/blob/master/doc/LOGGING.md

### Controlling and monitoring of adapter processes

The full definition for adapter settings can be found at https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#adapter

#### Multiple adapter instances
**Feature status:** stable

ioBroker allows to install multiple adapters on the system. For each adapter the JavaScript code is installed once.
For each adapter multiple instances can be created and started with independent configurations.

#### Adapter types
**Feature status:** stable

ioBroker supports multiple Adapter modes. These are:
* `deamon`:    The adapter is started and runs all the time. If the process gets killed it will be restarted automatically. This adapter type is mainly used for all situations where communications or actions are done continously. These adapters also supports a restart schedule where the controller restarts the insances. The adapter needs RAM and some CPU resources also when doing nothing.
* `schedule`:  The adapter is started based on a defined schedule (e.g. once per hour, once a day, all 10 minutes ...), then is doing it's work and is stopping itself when finished. The adapter is only using RAM and CPU when needed.
* `once`:      The adapter ist started only once after it's object got modified. No restarting happens after the adapter stops.
* `subscribe`: The adapter is started when a defined state ID gets set to true, and stopped when set to false
* `none`:      The adapter is officially not having any process, but could be a webExtension (so iis included by a web instance on the same host or is only running client side and so offering www files)

#### Start adapter instances as normal processes
**Feature status:** stable

By default adapters are started by the js-controller as separate Node.js processes. They connect to the state and object DBs to read and write their data and some statistical information.

The js-controller is monitoring the process ids of the started processes and also controls stopping or restarting these processes.

With this approach the whole iobroker system is very robust. A faulty adapter will only affect his own process and the js-controller and the other adapter processes are unaffected.

The downside is that more RAM is required because each Node.js process needs 20-30 MB RAM for the Node.js part of it. With this a 1GB system is usually limited to run approximately 10 to 15 adapter processes. Aside from using systems with more RAM, distributing adapters onto multiple hosts in a multihost environment is possible.

#### Start adapter instances in compact mode

The compact mode is developed especially for systems with low memory. All adapters configured to run in compact mode will run inside the same process as js-controller.

As a result, each adapter needs 20-30 MB less RAM because it does not need to have it's own Node.js process handling. This way, even a system with only 512MB RAM can run several adapter instances.

The downside is that as soon as one adapter is crashes or generates an unhandled error, the whole js-controller process will be restarted.

To minimize the risk adapter instances are run by default in compact group 1 which means that a second process is created for all adapters. A problem there would also not crash the js-controller itself. If you need less RAM usage you can manually change that and configure the instances to run on group 0 (=inside js-controller).

##### Compact mode
**Feature status:** Technology preview (since 2.0.0)

To enable compact mode for a js-controller instance, you can use the new "compact" CLI commands or you can manually change the `iobroker.json` configuration file

```
{
  ...
  "system": {
    ...
    "compact":true
  }
  ...
}
```
and restart the js-controller.

##### Compact groups
**Feature status:** Technology preview (since 2.0.0)

To be able to handle the risk of crashed controller processes affecting the whole system it is possible to assign the adapter instances to different compact groups. Each group will be run in their own process, only group 0 is handled directly by the main js-controller process.

Using several compact groups you can, by using a bit more memory, lower the risk of a crashing js-controller main process.

Compact groups can be configured for the respective instances using the compact CLI commands (see ìobroker compact ...`commands on https://www.iobroker.net/#de/documentation/config/cli.md).

##### Implementation details

https://forum.iobroker.net/topic/18338/experimentell-js-controller-compact-mode

##### Testing details for development

For testing, setup your js-controller to use compact mode and change the `io-package.json` and javascript files accordingly. Do not forget to ```iobroker upload adaptername``` after changing `io-package.json`.

Please check that your adapter starts and runs as expected also when compact mode is used.

For adapters running in compact mode, special care must be taken to clean up used resources without throwing errors. You need to make sure that **all** initialized connections, timers and intervals are closed and stopped in the `unload` handler.

#### Check available RAM before adapters are started
**Feature status:** stable, since js-controller 3.0

The js-controller checks the available RAM of the system before starting a new adapter process. If the available RAM is below 50/100MB by default an error/warn is logged. The limits can be configured in iobroker.json

```
    "system": {
        "memLimitWarn": 100,
        "memLimitWarnComment": "If the available RAM is below this threshold on adapter start, a warning will be logged.",
        "memLimitError": 50,
        "memLimitErrorComment": "If the available RAM is below this threshold on adapter start, an error will be logged."
    }
    ...
```

Later versions of js-controller might prevent start of a new adapter process if system resources are too low! 

#### Manually run adapter instances for debugging
**Feature status:** stable

For debugging reasons sometimes it is necessary to start an adapter instance via the command line to get more detailled logging.

To do so, manually execute the adapter's main javascript file, which is usually named `main.js` or `<adaptername>.js` (where "adaptername" is the name of the adapter):
```
node node_modules/iobroker.adaptername/main.js --force --logs
```
All log output will now be printed to the console.

### Multihost
**Feature status:** stable

When local interfaces are required or the host system is reaching its resource limits, the ioBroker system can be distributed to additional hosts. All hosts in a multihost environment are connected to the same states and objects databases and are thus synchronized with each other.

When the states and/or objects databases are provided by an js-controller process on one host, this "master" host needs to be configured so the databases are available on the local network. To do so, enter 0.0.0.0 as the address in ```iobroker setup custom``` instead of 127.0.0.1.

All other hosts are configured to connect to this master host.

For detailed setup instructions see https://www.iobroker.net/docu/index-24.htm?page_id=3068&lang=de

### TIERS: Start instances in an ordered manner
**Feature status:** Technology preview (since 3.3.0)

Starting from js-controller 3.3.0 you can define the `common.tier` attribute in the io-package.json.
Lower TIERS will start before higher TIERS. Currently, 3 TIER levels are supported.
Note, that the admin adapter as the central control platform will always be started first.

#### TIER 1
Logic and scripting engines, which should be able to act as fast as possible 
to work with states delivered by higher TIER adapters.

#### TIER 2
Adapters which deliver data from external APIs, which are important and can change at any time

#### TIER 3
Adapters which are not time critical like Visualization, Backup adapters and adapters whose information do 
not necessarily need to be up-to-date. These are often `schedule` adapters, whose information is always a bit delayed.

### Object and State Aliases
**Feature status:** stable (since 2.0.0)

**Feature Flag for detection: ALIAS, ALIAS_SEPARATE_READ_WRITE_ID**

The Alias Feature allows to define one object/state to be the "alias" of an other object/state.

All Aliases will be created in the Object namespace `alias.0`

Effectively an `alias` object will mirror the state value of the target object.
If allowed, both states can be changed and are synced automatically by the ioBroker core system.
Also both states can be used to subscribe in scripts and should behave exactly identical.

Additionally to defining the target ID the alias object can also define "read and write functions" to do easy value conversions, so e.g.
the target state could contain a power measurement value in Wh (because an adapter delivers the value that way)
and the alias could use the same value calculated as kWh.

Some devices have separate states for semantically one state. One to read the current status from and one to write to, to
control the device. You can combine these states into one alias by using a separate alias id to write to and  another to read from.

As of now (js-controller 2.0.0 release) there are no front-ends to configure alias.
To create an alias object simple create a new object with a own name in the `alias.0` namespace and add the alias definition in the common section (here for an alias with the id `"alias.0.aliasName"`):

```
{
    _id: "alias.0.aliasName",
    common: {
        name: 'Test AliasC',
        type: 'number',
        role: 'state',
        min: -10,
        max: 10,
        alias: {
            id: 'state.id.of.target',
            read: 'val * 10 + 1',
            write: '(val - 1) / 10'
        }
    },
    native: {},
    type: 'state'
}
```

or using different read and write ids (supported starting js-controller 3.0, check using feature flag ALIAS_SEPARATE_READ_WRITE_ID):

```
{
    _id: "alias.0.aliasName",
    common: {
        name: 'Test AliasC',
        type: 'number',
        role: 'state',
        min: -10,
        max: 10,
        alias: {
            id: {
                read: 'state.id.to.read.from',
                write: 'state.id.to.write.to'
            }
            read: 'val * 10 + 1',
            write: '(val - 1) / 10'
        }
    },
    native: {},
    type: 'state'
}
```

The following fields are allowed in the alias structure:

* `alias.id` contains the ID of the target object/state to mirror OR (since js-controller 3.0) represents an object with the following two properties:
    * `alias.id.write` contains the ID of the object which will be set when alias is written
    * `alias.id.read` contains the ID of the object which will be mirrored to the alias object/state   
* `alias.read` can optionally contain a read script (will be evaluated) to calculate the alias value when the target state changes
* `alias.write` can optionally contain a write script (will be evaluated) to calculate the target value if the alias value is changed

Note, that alias states will be automatically scaled if the following conditions match:

* target and source state are of type `number`
* either the alias state or (not both) the source state are of unit `%`
* no `read` or `write` function is defined
* the state which is not of unit `%` has a valid `min` and `max` property

To set the alias properties without a JavaScript or in adapter code you can also use the cli commands like:

```
iobroker object set alias.0.aliasName common.alias.id=state.id.of.target
iobroker object set alias.0.aliasName common.alias.read="read-func"
iobroker object set alias.0.aliasName common.alias.write="write-func"
```

Additional information about aliases could be found [here](https://www.iobroker.net/#en/documentation/dev/aliases.md).

### State and objects databases and files

ioBroker is storing three different type of data:
* **objects** contain the meta data, descriptions and configuration values for all objects and states stored by ioBroker. Objects are created initially and sometimes updated, but usually not changed very frequently
* **files** are all JSON, image and other files that are accessible for all ioBroker adapters. A meta.user object needs to exist for the adapter or instance to define allowed root directories. As example see sayit adapter io-package.
* **states** contain the real data from sensors, devices and objects which are updated frequently

#### ioBroker in-memory database with JSON file storage

By default the js-controller process is offering in-memory DBs at ports 9000 (for states) and 9001 (for objects/file). All adapter processes and js-controller processes from other hosts connect to these databases to read and store data.

The in-memory DBs for states and objects use JSON files to store the data. The files are stored after changes every 30 seconds and are backed up automatically. The files are stored in iobroker-data directory, the backups in a sub folder.

The in-memory DBs work well for up to 10000 objects and normal state update frequencies. When your system has more objects and states or its states are updated very often, it is a better idea to use Redis as the database engine. A good indicator for this if the js-controller process is using a lot of CPU and/or the system feels slow.

js-controller 1.x was using socket.io as the communication protocol between the adapters and the in-memory DBs. Starting with js-controller 2.0, the communication protocol was changed to be a lightweight Redis protocol. This simplifies the logic and shuld increase performance.

For the objects and states databases special additional logging of the redis protocol messages can be activated in iobroker.json

```
"objects": {
  ...
  "enhancedLogging": false
}
```

When not configured differently the file databases are persisted every 15s (15000ms) after data are changed. The interval in ms can be changed by configuration in iobroker.json starting js-controller 3.0.
**Note:** If you do that be aware that you may loose data when the js-controller crashes unexpectedly!

```
"objects": {
  ...
  "writeFileInterval": 60000
}
```


#### Redis as database

Redis is a well known industrial grade in-memory database optimized for speed and stability. It performs better then the ioBroker  In-Memory database which is written in JavaScript.

##### Install Redis
- Linux from here: https://redis.io/download
- Windows from here: [https://github.com/MSOpenTech/redis/releases](https://github.com/MSOpenTech/redis/releases)

e.g. for Linux:
https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-18-04

##### Configure Redis

###### Allow Network access
Ideally the Redis server should be installed on the same host as the js-controller process because as soon as Redis is configured to be used the ioBroker installation will not work without it.

If you plan to install Redis on a different host then the js-controller or use a mulit-host environment (see below), you must allow connections to redis from any address (the default only accepts connections from 127.0.0.1).
To do that edit the file `/etc/redis/redis.conf` (```sudo nano /etc/redis/redis.conf```) and replace ```bind 127.0.0.1``` with ```bind 0.0.0.0``` .
Don't forget to restart redis after that. (```sudo systemctl restart redis-server```)

###### Redis Slaves

If you have multiple hosts, you can install Redis to all of them and configure the other hosts to be slaves of the Master host. With this all data is available on all hosts, so even if one host crashes completely, you still have the database content from the other hosts.

More details can be found at https://redis.io/topics/replication#configuration and https://redis.io/commands/replicaof

Redis slaves will be not writable by default.

In case of a crash of the master you can reconfigure one of the slaves to be the new master and it will use the current content. After reconfiguring all slaves to sync with the new Master the redis database is functional again.

After reconfiguring Redis you also need to update all ioBroker states/objects DB settings to connect to the new Redis Master host.

###### Redis persistence

By default, Redis is a pure in-memory Database which means that it has no content when it starts. In the default configuration, the content of the redis DB is stored on disk after a certain amount of changed keys.

Depending on how many changes your system is doing it will update the data on disk roughly every 5 minutes by default.
Please consider this if your system runs from an SD card (like Raspberry Pi).

If you are not working on a SD card and want to have real up-to-date data on disk you can use the second persistence method called AOF. Else the latest dumped data are used, which could be some minutes old.

Please see https://redis.io/topics/persistence for details, differences and configuration information for both persistence options.

##### Using Redis as States-DB
**Feature status:** stable

There is a possibility to use Redis as states database. It is reasonable to do that for big installations or for systems with performance problems.
It is possible to switch anytime between Redis and in-memory Javascript DB.

**Note for js-controller <2.0**: After changing to Redis, all states must be updated by the adapters again (the previous values will be lost). Please especially note this for the state values from own JavaScript states! Objects and configuration are not affected.

To switch to Redis, execute the following on the console:

```
iobroker stop
iobroker setup custom
```

And then enter `redis` as the states DB type (line 4):

```
Type of objects DB [file, redis], default [file]:
Host of objects DB(file), default[127.0.0.1]:
Port of objects DB(file), default[9001]:
Type of states DB [file, redis], default [file]: redis
Host of states DB (redis), default[127.0.0.1]:
Port of states DB (redis), default[6379]:
Data directory (file), default[../../../iobroker-data/]:
Host name of this machine [FastPC]:
creating conf/iobroker.json
```

Now ioBroker can be started.
If it does not start, please check the log at `log/iobroker.*.log` in the ioBroker directory. Please also check the redis is running (use e.g. ```redis-cli```) and that the firewall set up correctly.

To switch back to file based states write the same commands again, just instead of **redis** in fourth line write nothing and press ENTER.

##### Using Redis as objects/File-DB
**Feature status:** New in 2.0.0

Starting with js-controller 2.0.0, objects and files can also be stored in Redis. Since Redis holds all data in the RAM, this setup uses much more RAM because uploaded files and image assets are also stored in Redis. Please think carefully about this step and make sure your system has enough RAM available!

The setup is comparable to the setup for states in Redis by using ```iobroker setup custom```, but enter **redis** as type of the objects database. You can use the same redis server for states and objects/files database.

##### Using Redis Sentinel as objects/File-DB
**Feature status:** New in 2.0.0

Redis Sentinel is an industry standard to achieve a highly available redis database. It is based on a Redis master-slave setup with at least three nodes. Additional so-called sentinel processes monitor all redis instances in the master-slave setup.

If the master is going offline, the sentinel processes react and coordinate to select a new master. After this is done, the master-slave cluster is reconfigured and the new master is taking over.

More details about the Redis sentinel can be found in the official documentation at https://redis.io/topics/sentinel .

ioBroker allows to use a Redis Sentinel system. For this you use ```iobroker custom``` like above, but provide a comma separated list of the sentinel hosts. For the sentinel ports you can either enter a comma separated list with the same number of entries, or a single one which is then used for all hosts.

With such a setup, ioBroker will connect to one of these sentinel processes to get the current Master Redis and then connect to it. When the connection to the Master is disconnected, all data updates are cached and transmitted as soon as a connection to the new master has been established.

##### Using Password for Redis Databases
**Feature status:** Stable



### Certificate Handling

... CLI
... Files vs PEM content
... TODO

#### Let's Encrypt support

... see web
... letsencrypt.js
... TODO

### js-controller Host Messages

... TODO
#### shell
... TODO

#### cmdExec
... TODO

#### getRepository
... TODO

#### getInstalled
... TODO

#### getInstalledAdapter
... TODO

#### getVersion
... TODO

#### getDiagData
... TODO

... TODO

#### getLocationOnDisk
... TODO

#### getDevList
... TODO

#### getLogs
... TODO

#### getHostInfo
... TODO

#### getHostInfoShort
... TODO

#### delLogs
... TODO

#### readDirAsZip
... TODO

#### writeDirAsZip
... TODO

#### readObjectsAsZip
... TODO

#### writeObjectsAsZip
... TODO

#### updateMultihost
... TODO

#### getInterfaces
... TODO

#### upload
... TODO

#### rebuildAdapter
... TODO

#### readBaseSettings
... TODO

#### writeBaseSettings
... TODO

### Adapter Development
**Feature status:** Stable

TODO: Link to Adapter Development docs

#### Automatically Encrypt/Decrypt configuration fields
**Feature status:** Stable, since js-controller 3.0

Since js-controller 3.0 the adapter developer can define an array or fieldnames in io-package.json as common.encryptedNative to define which fields should be automatically encrypted before being stored by Admin and decrypted when the adapter process starts.
The values are not decrypted when the object itself is read!

With this change and the Admin support for this soon the adapter developer do not need to struggle around with encryption or decryption of adapter values and can simply configure this.

To preserve backward compatibility you can check for the feature flag ADAPTER_AUTO_DECRYPT_NATIVE or add a global Admin dependency to the respective Admin (>=4.0.10) version. 

#### Protect free reading of adapter configuration fields
**Feature status:** Stable, since js-controller 2.0

Normally all objects can be read by any adapter using getObject or getForeignObject. To make sure sensible adapter configuration values are protected from that free reading they can be secured.

If an array with field names from native is defined in io-package.json as common.protectedNative the ioBroker system will sort these fields out when the object is read. Only the adapter itself is allowed to read the full object.

It is best practice to add the field names of encrypted fields to the protectedNative array too to make sure the fields stay protected (even if encrypted). Only let other adapters read your encrypted values if there is a need to (e.g. inter-adapter-operability)

#### Define Adapter dependencies to other adapters
**Feature status:** Stable

Dependencies are defined in array and can contain an adapter name of an object.

When using the object style you can define a semver version range for this adapter:
```
"dependencies": [
      {
        "js-controller": ">=2.0.0"
      }
    ],
```

If the version do not matter and just the adapter itself needs to be present you can also use:
```
"dependencies": [
      "web"
    ],
```

There are tow types of adapter dependencies that can be defined in io-package.json and will be checked on installation and adapter start.

**common.dependencies for Same Host dependencies**
With common.dependencies in io-package.json you can define if an adapter needs to be present on the same host and optionally in which version.
This is mainly used to define the needed "js-controller" version for yor adapter and can also be relevant e.g. for web extension adapters (adapters that can be plugged in into the web adapter, so the code needs to be on the same host).

**common.globalDependencies for Same Host dependencies**
With common.globalDependencies in io-package.json and starting with js-controller 3.0 you can define a global dependency that will be checked over all hosts. Irrelevant where on the system the referenced adapter is installed it needs to match the version and at least one instance needs to exist.
This can mainly be used for more loose dependencies where adapters are split over multiple hosts but still work together, e.g. Admin. 

#### Subscribe to Logs from other adapters
**Feature status:** Stable

The js-controller allows adapters to subscribe to log messages from other adapters and react on them.
For details see https://github.com/ioBroker/ioBroker.js-controller/blob/master/doc/LOGGING.md

#### Adapter Feature Detection
**Feature status:** Stable since js-controller 2.0.0

Since js-controller 2.0 there exists a dedicated method to detect if certain features exists for an adapter.

The preferred way to use it (also because of backward compatibility reasons) is:

```js
if (adapter.supportsFeature && adapter.supportsFeature('NAME')) {
    // ...
}
```

The following features can be checked using this method:

* **ALIAS**: checks if the Alias feature is existing (since js.controller 2.0)
* **ALIAS_SEPARATE_READ_WRITE_ID**: allows to specify separate ids for read and write (since js.controller 3.0)
* **ADAPTER_GETPORT_BIND**: the adapter.getPort method allows an optional second parameter to bind the port only on a special network interface  (since js.controller 2.0) 
* **ADAPTER_SET_OBJECT_SETS_DEFAULT_VALUE**: adapter.setObject(*) methods now sets the default value (def) after the object was created  (since js.controller 2.0)
* **ADAPTER_DEL_OBJECT_RECURSIVE**: adapter.delObjects supports options.recursive flag to delete whole object structures (since js-controller 2.2)
* **ADAPTER_AUTO_DECRYPT_NATIVE**: The Controller supports auto decryption of encrypted native properties (since js-controller 3.0)
* **PLUGINS**: Plugins are supported by this js-controller and adapters, see section below for more details (since js-controller 3.0)
* **CONTROLLER_NPM_AUTO_REBUILD**: Automatic rebuild when node version mismatch is detected (since js-controller 3.0)
* **CONTROLLER_READWRITE_BASE_SETTINGS**: Allow read and write of js-controller base settings file (iobroker.json) via host messages (since js-controller 3.0)

To check if certain adapter methods itself are existing please simply check for their existence like

```js
if (adapter.getObjectView) {
    // ...
}
```

or

```js
if (typeof adapter.getObjectView === 'function') {
    // ...
}
```

#### Plugin-System for Adapters and js-controller
**Feature status:** Stable since js-controller 3.0.0

Starting with js-controller 3.0 a flexible plugin system is available to the js-controller and also to adapters.
Plugins are custom modules that can be configured in io-package.json in a new "plugins" section and provide central functionality on the level of the adapter or js-controller process. The modules are automatically loaded and configured. Depending on the plugin they can be enabled or disabled by setting system.host or system.adapter states.

More details about plugins and their development can be found at the [Plugin-Base repository](https://github.com/ioBroker/plugin-base/blob/master/README.md). A simple implementation can be found at the [Sentry-Plugin](https://github.com/ioBroker/plugin-sentry/blob/master/README.md)

New Plugins should always be developed, reviewed and published by ioBroker Core developers! Contact @Apollon77 or @GermanBluefox for this.

Since js-controller 3.0 the sentry plugin is integrated and activated by default in js-controller. See information above.

#### Maintenance mode
There is a special maintenance mode. It is used by some special adapters, that will clean the objects and states from invalid entries.
Invalid entries could be: 
- has invalid ID (e.g. null, empty or with prohibited chars, very long IDs over 2000 chars),
- has empty object or with no object type.
- states, that have no according entry in object DB

To make possible to get such an entries, the maintenance mode was implemented.
To make a call in maintenance mode, you must provide `options` object with at least following attributes:
```
{
    user: 'system.user.admin',
    maintenance: true,
}
```    

Following adapter methods support maintenance mode:
```
- adapter.getForeignState
- adapter.getForeignObject
- adapter.setObjectWithDefaultValue
- adapter.setForeignObject
- adapter.setObjectNotExists
- adapter.delForeignObject

- adapter.getForeignState
- adapter.delForeignState
- adapter.setBinaryState
- adapter.getBinaryState
- adapter.delBinaryState
```

*** Do not use this mode for any other purposes except sanitizing/cleaning/repairing of existing DBs (Object and States)***

## Release cycle and Development process overview

The goal is to release an update for the js-controller roughly all 6 months (April/September). The main reasons for this are shorter iterations and fewer changes that can be problematic for the users (and getting fast feedback) and also trying to stay up-to-date with the dependencies.

For the dependencies we will use depend-a-bot. In general the goal is still to support a certain range of node.js LTS versions. Currently, js-controller 3.0 will start with nodes 10.x up to 12/14.x. If dependency updates would break that and would require a major-release, this will be discussed and decided on core developer level BEFORE merging such a dependency change!

For the planned changes we use a backlog approach. This means that out of the existing issues for the project the core developers select issues to put into a prioritized backlog in the project view. Other users also can propose tickets. All merged PRs (also when unplanned/not prioritized before) are included as finished tickets in the project (so project is assigned to them manually on merge).
When a ticket is contained in the backlog this does not mean that it will be done in the next version! But it helps if developers have some time to see what’s considered important. The current project will always get the name „Next Release“. All older projects will get the respective release version number to know the history.

Roughly at the end of each first/third quarter (so 31.3. and 30.9.) we will finalize the next release version, update change logs. A version branch for this version is created that will allow hotfixes. 1-2 weeks before that cut-off date no new feature PRs should be added. Changes are flagged as [Bugfix], [Feature] or [Breaking Change] in changelog (ideally also in PRs) and the version increase is depending on the type of the changes.

After this we will have a testing phase for this version. Once tests ended successfully it will be published to „latest“ repository to get feedback from community. After this it goes too stable. Depending on the problems, bugs and feedback the goal is to release the stable version roughly 1 - 1.5 month after cut-off date from the version.

All changes should be added via PRs that are reviewed and merged by the core developers. PRs are flagged as [Bugfix], [Feature] or [Breaking Change].

It is also allowed to introduce unfinished new features, as soon as they do not break the system. We will also start to introduce „testing quality features“ that only may be configured manually in JSON files or via CLI. They are then flagged as „Technology Preview“. This means we will not delay a new js-controller version because a new feature is not possible to configure via admin. The feature list and details in js-controller README needs to be updated as soon as the feature is ready in general (including "Technology preview"). Unfinished features are not included in the README even if existing partly in the code.

This new process and rules are introduced with js-controller 2.0 and updated to a 6 months cycle with js-controller 3.0.

## License

The MIT License (MIT)

Copyright (c) 2014-2020 bluefox <dogafox@gmail.com>,

Copyright (c) 2014      hobbyquaker
