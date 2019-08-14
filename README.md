![Logo](lib/img/iobroker.png)
# ioBroker.js-controller
==================

[![NPM version](http://img.shields.io/npm/v/iobroker.js-controller.svg)](https://www.npmjs.com/package/iobroker.js-controller)
[![Downloads](https://img.shields.io/npm/dm/iobroker.js-controller.svg)](https://www.npmjs.com/package/iobroker.js-controller)
[![Tests](http://img.shields.io/travis/ioBroker/ioBroker.js-controller/master.svg)](https://travis-ci.org/ioBroker/ioBroker.js-controller)
[![stable](http://iobroker.live/badges/js-controller-stable.svg)](http://iobroker.live/badges/js-controller-stable.svg)
[![installed](http://iobroker.live/badges/js-controller-installed.svg)](http://iobroker.live/badges/js-controller-installed.svg)

[![NPM](https://nodei.co/npm/iobroker.js-controller.png?downloads=true)](https://nodei.co/npm/iobroker.js-controller/)

The ioBroker.js-controller is the heart of any ioBroker installation. The controller is owning the central configuration of the ioBroker installation and controls and monitors all adapter processes for the current host. 

## Links

* [Changelog](CHANGELOG.md)
* Official web site: https://www.iobroker.net
* Forum: https://forum.iobroker.net
* ioBroker wiki: https://github.com/ioBroker/ioBroker/wiki/Home-(English)
* Explanation of the concept: https://github.com/iobroker/iobroker

----------------------------------------------------------------------

## Usage

### Install Node.js

Example for a Debian based system:

```
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install curl build-essential
sudo curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
sudo apt-get install -y nodejs
```

### Install ioBroker 

see https://github.com/ioBroker/ioBroker/wiki/Installation

After that, ioBroker should be running and available in the browser under ```http://<ip>:8081/```.

### Start ioBroker controller

#### Linux

* run ```iobroker start``` to start the ioBroker controller in the background
* watch the logfile ```tail -f log/iobroker.<Date>.log```

or

* run ```node node_modules/iobroker.js-controller/controller.js``` in the ioBroker directory to start the ioBroker controller in foreground and watch the log on console

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
 
The js-controller is collecting statistics for the host (`system.host.hostname.*`) and also for each adapter (`system.adapter.adaptername.*`). The data contains memory usage, free memory, number of events and also the event loop lag of the Node.js process.

### Logging

#### Log levels
**Feature status:** stable

The js-controller and each adapter has defined it's own loglevel. By default, `info` is used. The following loglevels can be used:
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

### Controlling and monitoring of adapter processes

#### Multiple adapter instances
**Feature status:** stable

ioBroker allows to install multiple adapters on the sytem. For each adapter multiple instances can be created and started with an independent configuration.

#### Start adapter instances as normal processes
**Feature status:** stable

By default adapters are started by the js-controller as separate Node.js processes. They connect to the state and object DBs to read and write their data and some statistical information.

The js-controller is monitoring the process ids of the started processes and also controls stopping or restarting these processes.

With this approach the whole iobroker system is very robust. A faulty adapter will only affect his own process and the js-controller and the other adapter processes are unaffected.

The downside is that more RAM is required because each Node.js process needs 20-30 MB RAM for the Node.js part of it. With this a 1GB system is usually limited to run approximately 10 to 15 adapter processes. Aside from using systems with more RAM, distributing adapters onto multiple hosts in a multihost environment is possible.

#### Start adapter instances in compact mode
**Feature status:** Technology preview (since 2.0.0)

The compact mode is developed especially for systems with low memery. All adapters configured to run in compact mode will run inside the same process as js-controller.

As a result, each adapter needs 20-30 MB less RAM because it does not need to have it's own Node.js process handling. This way, even a system with only 512MB RAM can run several adapter instances.

The downside is that as soon as one adapter is crashes or generates an unhandled error, the whole js-controller process will be restarted.

It is recommended to use this feature on slave systems but not for the ioBroker master host.

To enable compact mode for a js-controller instance, you need to manually change the `iobroker.json` configuration file

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
All adapters that can run in compact mode will now be started in compact mode.

##### Implementation details

https://forum.iobroker.net/topic/18338/experimentell-js-controller-compact-mode

##### Testing details for development

For testing, setup your js-controller to use compact mode and change the `io-package.json` and javascript files accordingly. Do not forget to ```iobroker upload adaptername``` after changing `io-package.json`.

Please check that your adapter starts and runs as expected also when compact mode is used.

For adapters running in compact mode, special care must be taken to clean up used resources without throwing errors. You need to make sure that **all** initialized connections, timers and intervals are closed and stopped in the `unload` handler.
 
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

When the states and/or objects databases are provided by an js-controller process on one host, this "master" host needs to be configured so the databases are available on the local network. TO do so, enter 0.0.0.0 as the address in ```iobroker setup custom``` instead of 127.0.0.1.

All other hosts are configured to connect to this master host.

For detailed setup instructions see https://www.iobroker.net/docu/index-24.htm?page_id=3068&lang=de


### State and objects databases and files

ioBroker is storing three different type of data:
* **objects** contain the meta data, descriptions and configuration values for all objects and states stored by ioBroker. Objects are created initially and sometimes updated, but usually not changed very frequently
* **files** are all JSON, image and other files that are accessible for all ioBroker adapters
* **states** contain the real data from sensors, devices and objects which are updated frequently

#### ioBroker in-memory database with JSON file storage

By default the js-controller process is offering in-memory DBs at ports 9000 (for states) and 9001 (for objects/file). All adapter processes and js-controller processes from other hosts connect to these databases to read and store data.

The in-memory DBs for states and objects use JSON files to store the data. The files are stored after changes every 30 seconds and are backed up automatically. The files are stored in iobroker-data directory, the backups in a sub folder.

The in-memory DBs work well for up to 10000 objects and normal state update frequencies. When your system has more objects and states or its states are updated very often, it is a better idea to use Redis as the database engine. A good indicator for this if the js-controller process is using a lot of CPU and/or the system feels slow.

js-controller 1.x was using socket.io as the communication protocol between the adapters and the in-memory DBs. Starting with js-controller 2.0, the communication protocol was changed to be a lightweight Redis protocol. This simplifies the logic and shuld increase performance.

For the objects and states databases special additional logging of the redis protocl messages can be activated in iobroker.json

```
"objects": {
  ...
  "enhancedLogging": false
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

If you plan to install Redis on a different host then the js-controller or use a mulithost environment (see below), you must allow connections to redis from any address (the default only accepts connections from 127.0.0.1).
To do that edit the file `/etc/redis/redis.conf` (```sudo nano /etc/redis/redis.conf```) and replace ```bind 127.0.0.1``` with ```bind 0.0.0.0``` .
Don't forget to restart redis after that. (```sudo systemctl restart redis-server```)

###### Redis Slaves

If you have multiple hosts, you can install Redis to all of them and configure the other hosts to be slaves of the Master host. With this all data is available on all hosts, so even if one host crashes completely, you still have the database content from the other hosts.

More details can be found at https://redis.io/topics/replication#configuration and https://redis.io/commands/replicaof

Redis slaves will be not writable by default.

In case of a crash of the master you can reconfigure one of the slaves to be the new master and it will use the current content. After reconfiguring all slaves to sync with the new Master the redis database is functional again.

After reconfiguring Redis you also need to update all ioBroker states/objects DB settings to connect to the new Redis Master host.

###### Redis persistence

By default Redis is a pure in-memory Database which means that it has no content when it starts. In the default configuration, the content of the redis DB is stored on disk after a certain amount of changed keys.

Depending on how many changes your system is doing it will update the data on disk roughly every 5 minutes by default.
Please consider this if your system runs from an SD card (like Raspberry Pi).

If you are not working on a SD card and want to have real up-to-date data on disk you can use the second persistance method called AOF. Else the latest dumped data are used, which could be some minutes old.

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
If it does not start, please check the log at `log/iobroker.*.log` in the ioBroker directory. Please also check that redis is running (use e.g. ```redis-cli```) and that the firewall is set up correctly.

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

## Release cycle and Development process overview

The goal is to release an update for the js-controller roughly all 3 months. The main reasons for this are shorter iterations and less changes that can be problematic for the users (and getting fast feedback) and also trying to stay up-to-date with the dependencies. 

For the dependencies we will use depend-a-bot. In general the goal is still to support a certain range of node.js LTS versions. Currently js-controller 2.0 will start with nodes 8.x up to 12.x. If dependency updates would break that and would require a major-release, this will be discussed and decided on core developer level BEFORE merging such a dependency change!

For the planned changes we use a backlog approach. This means that out of the existing issues for the project the core developers select issues to put into a prioritized backlog in the project view. Other users also can propose tickets. All merged PRs (also when unplanned/not prioritized before) are included as finished tickets in the project (so project is assigned to them manually on merge).
When a ticket is contained in the backlog this does not mean that it will be done in the next version! But it helps if developers have some time to see what’s considered important. The current project will always get the name „Next Release“. All older projects will get the respective release version number to know the history.

Roughly at the end of each quarter (so 31.3./30.6./30.9./31.12.) we will finalize the next release version, update changelogs. A version branch for this version is created that will allow hotfixes. 1-2 weeks before that cut-off date.no new feature PRs should be added. Changes are flagged as [Bugfix], [Feature] or [Breaking Change] in changelog (ideally also in PRs) and version increase is depending on the type of the changes.

After this we will have a testing phase for this version. Once tests ended successfully it will be published to „latest“ repository to get feedback from community. After this it goes too stable. Depending on the problems, bugs and feedback the goal is to release the stable version roughly 1 - 1.5 month after cut-off date from the version.

All changes should be added via PRs that are reviewed and merged by the core developers. PRs are flagged as [Bugfix], [Feature] or [Breaking Change].

It is also allowed to introduce unfinished new features, as soon as they do not break the system. We will also start to introduce „testing quality features“ that only may be configured manually in JSON files or via CLI. They are then flagged as „Technology Preview“. This means we will not delay a new js-controller version because a new feature is not possible to configure via admin. The feature list and details in js-controller README needs to be updated as soon as the feature is ready in general (including "Technology preview"). Unfinished features are not included in the README even if existing partly in the code.

This new process and rules are introduced with js-controller 2.0.0. The cut-off date will most likely be (different from described above) somewhere before end of September. Also the testing phase may be longer because of the size of the 2.0.0. W need to test this version carefully because it contains big rewrites and refactorings.

## License 

The MIT License (MIT)

Copyright (c) 2014-2019 bluefox <dogafox@gmail.com>,

Copyright (c) 2014      hobbyquaker
