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

* [Changelog](CHANGELOG.md).
* Official Web-Site: http://www.iobroker.net
* Forum: http://forum.iobroker.net
* ioBroker wiki: https://github.com/ioBroker/ioBroker/wiki/Home-(English)
* Explanation of the concept: https://github.com/iobroker/iobroker

----------------------------------------------------------------------

## Usage

### Install Node.js

Example for a Debian based System ...

```
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install curl build-essential
sudo curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
sudo apt-get install -y nodejs
```

### Install ioBroker 

see https://github.com/ioBroker/ioBroker/wiki/Installation

After that the ioBroker should run and be available in browser under ```http://<ip>:8081/```

### Start ioBroker controller

#### ... on Linux

* run ```./iobroker start``` in the ioBroker directory to start the ioBroker controller in the background
* watch the logfile ```tail -f log/iobroker.<Date>.log```

or

* run ```node node_modules/iobroker.js-controller/controller.js``` to start the ioBroker controller in foreground and watch the log on console

### ... on windows

* run ```iobroker start``` in the ioBroker directory to start the ioBroker controller in the background console
* check the logfile ```node_modules/iobroker.js-controller/log/iobroker.log```

or

* run ```node node_modules/iobroker.js-controller/controller.js``` to start the ioBroker controller in foreground and watch the log on console

## Configuration

The main configuration is stored in iobroker-data/iobroker.json

## Feature Overview

### Admin UI
**Feature Status: Stable**

The admin adapter is installed automatically and starts a web-server that hosts the Admin UI. Default port is 8081, so just open http://&lt;iobroker-ip&gt;:8081/

If port 8081 is occupied, you can install second Admin UI on alternate port and change port for first admin UI:

* run ```./iobroker add admin --enabled --port 8090``` and go to the http://&lt;iobroker&gt;:8090/. Of course you can change port 8090 to an other one.

### Command Line Interface
**Feature Status: Stable**

The command line interface is described at https://www.iobroker.net/#de/documentation/config/cli.md

### Hostname
**Feature Status: Stable**

By default the hostname for the js-controller instance will be taken from the official hostname of the server the process runs on. The hostname should not change after the first start of ioBroker on this host.

If changes are needed there are CLI commands available to update the hostname. See https://www.iobroker.net/#de/documentation/config/cli.md for "iobroker host ..." commands

If you need to set a specific hostname before the first start of iobroker you can also edit the iobroker.json file:

```
{
  "system": {
    ...
    "hostname":"local",
    ...
  },
```

### Adapter Process Memory limitation
**Feature Status: Stable**

By default the memory management is done by Node.JS automatically. A Garbage Collector (GC) will clean up unused objects automatically from time to time.

If needed, especially for low memory situations the memory limit for all adapter processes can be set in iobroker.json. Only set this if really needed and you know what you are doing. Leave the value at 0 to not set a special memory limitation.

```
{
  "system": {
    ...
    "memoryLimitMB":0,
    ...
  },
```

### Statistics
**Feature Status: Stable**
 
The js-controller is collecting statistics for the host (system.host.hostname.*) and also for each adapter (system.adapter.adaptername.*).The data contain memory usage, free memory, number of events and also the event loop lag of the node.js process.

### Logging

#### Loglevels
**Feature Status: Stable**

The js-controller and each adapter has defined it's own loglevel. By default "info" is used. The following loglevels can be used:
* silly (most logging)
* debug
* info
* warn
* error (only errors are logged)

For the js-controller the loglevel is configured in iobroker.json in the logs section:

```
  ...
  "log": {
    "level": "info",
  ...
```

#### File based Logging
**Feature Status: Stable**

The default logging will log file based in the log directory inside the ioBroker directory. The Logfile will be stored with a name that contains the date and will be deleted after 7 days.

The logging is configured in the iobroker.json file and can be changed there:

```
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
  ...

```

The logfile will only contain the logs from this host.

#### Syslog Logging
**Feature Status: Stable**

ioBroker also supports logging to a Syslog server. The configuration is also stored in the iobroker.json configuration file. A section for syslog is pre-created but disabled by default.

```
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
  },
```

### Controlling and Monitoring of Adapter processes

#### Multiple Adapter instances
**Feature Status: Stable**

ioBroker allows to install multiple adapters on the sytem. For each adapter multiple instances can be created and started with an independent configuration.

#### Start Adapter instances as normal processes
**Feature Status: Stable**

By default adapters are started by the js-controller as separate nodejs processes. They connect to the State and Objects DBs to read and write their data and some statistical information.

The js-controller is monitoring the process-id of the started process and also controls stopping or restarting these processes.

With this approach the whole iobroker system is very robust. A faulty adapter will only affect his own process and the js-controller and the other adapter processes are unaffected.

The downside of the approach is that more RAM is needed because each node.js process needs 20-30MB RAM for the Node.JS part of it. With this a 1GB system is usually limited to run approx 10 to max 15 adapter processes. Beside using systems with more RAM also splitting adapters on multiplte hosts in a multihost environment could be an idea.

#### Start Adapter instances in compact mode
**Feature Status: Technology Preview since 2.0.0**

The compact mode is developed especially for low memory systems. All adapters configured to run in compact mode will run inside the js-controller process.

The positive effect of this is that each adapter needs 20-30MB less RAM because it do not need to have it's own node.js process handling. With this also a 512MB RAM system can run several adapter instances.

The downside is that as soon as one adapter is reacting faulty and generate an unhandled error, the whole js-controller process will be restarted.

This means that this feature is especially good for slave systems but not for the ioBroker master process.

To enable compact mode for an js-controller instance you need to manually change the iobroker.json configuration file:

```
{
  "system": {
    ...
    "compact":true
  },
```

Then restart the js-controller.
All adapters that can run in compact mode will also be started in compact mode.

##### Implementation details

https://forum.iobroker.net/topic/18338/experimentell-js-controller-compact-mode

##### Testing details for Development

For testing setup your js.controller to use compact mode and change the io-package and javascript files accordingly. Do not forget to ```iobroker upload adaptername``` after changes to io-package.json.

One important part is starting the adapter. 

Stopping the adapter and making sure that no data are updated anymore and no error are thrown is also very important. Please make sure that in ``on('unload')``` really all initialized communications, timers and intervals are stopped and cleaned best possible.
 
#### Manually Run Adapter instances for debugging
**Feature Status: Stable**

For debugging reasons sometimes it is needed to start an adapter instance via the command line to get more detailled logging.

You need to directly execute the main adapter javascript file (can be namens main.js or adaptername.js) where "adaptername" is the name of the adapter.

```
node node_modules/iobroker.adaptername/main.js --force --logs
```

The logging will be looged to the console

### Multihost
**Feature Status: Stable**

When local interfaces are needed or the ressources are all used the ioBroker system can be extended by additional hosts. They all connect to the same states and objects databases and are so synced with each other.

When the states and/or objects databases are provided by an js-controller process on one host this process need to be configured for these dstabases to bind to port 0.0.0.0 (enter this in ```iobroker setup custom```) instead of 127.0.0.1

All other hosts are configured to connect to this master host.

For detailed setup instructions see https://www.iobroker.net/docu/index-24.htm?page_id=3068&lang=de


### State and Objects Databases and Files

ioBroker is storing three different type of data:
* **Objects** contain the meta data, descriptions and configuration values for all objects and states stored by ioBroker. Objects are created initially and sometimes updated, but more or less not changed that often
* **Files** are all JSON-, Image- and other files that are accessible for all ioBroker adapters
* **States** contain the real data from sensors, devices and objects which are updated often

#### ioBroker In-Memory Database with JSON-File Storage

By default the js-controller process is offering In-Memory-DBs at ports 9000 (for states) and 9001 (for objects/file). All adapter processes and other js-controller processes connect to these databases to read and store data.

The In-Memory-DBs for States and Objects use JSON files to store the data. The files are stored after changes every 30 seconds and are backed up automatically. The files are stored in iobroker-data directory, the backups in a sub folder.

The In-Memory-DBs work well for up to 10.000 Objects and normal State update frequencies. As soon as you have more Objects and States or you have states that are updated very often it is a better idea to use Redis as Database engine. You can detect this if js-controller process is using more and more CPU and/or the system feels slow.

js-controller 1.x was using socket.io as communication protocol between the adapters and the In-Memory-DBs. Starting with js-controller 2.0 the communication protocol was changed to be a lightweight Redis protocol. 

For the objects and states databases special additional logging of the redis protocl messages can be activated in iobroker.json

```
"objects": {
  ...
  "enhancedLogging": false
}
``` 


#### Redis as Database

Redis is a well known industry In-Memory database which is optimized for speed and stability.

##### Install Redis
- Linux from here: https://redis.io/download
- Windows from here: [https://github.com/MSOpenTech/redis/releases](https://github.com/MSOpenTech/redis/releases)

e.g. for Linux:
```apt-get install redis-server``` .


##### Configure Redis

###### Allow Network access
Ideally the Redis server should be installed on the same host as the js-controller process because as soon as Redis is configured to be used the ioBroker installation will not work without it.

If you plan to install Redis on a different host then the js-controller or use mulithost environment (see below) you must allow connections to redis from any address (default only 127.0.0.1).
To do that edit file */etc/redis/redis.conf* (```sudo nano /etc/redis/redis.conf```) and replace ```bind 127.0.0.1``` with ```bind 0.0.0.0``` .
Don't forget to restart redis after that. (```sudo systemctl restart redis-server```)

###### Redis Slaves

If you have multiple hosts you can install Redis to all of them and configure the other hosts to be slaves of the Master host. With this all data are available on all hosts, so even if one host crashs completely you still have the database content from the other hosts.

More details can be found at https://redis.io/topics/replication#configuration and https://redis.io/commands/replicaof

Redis slaves will be not writable by default.

In case of a crash of the master you can reconfigure one of the slaves to be the new master and it will use the current content. Reconfigure all Slaves to sync with the new Master and the logic is restored.

After reconfiguring Redis you also need to update all ioBroker states/objects DB settings to connect to the new Redis Master host.

###### Redis persistence

By default Redis is a pure In-memory Database which means that it has no content on start. In the default configuration the content of the redis DB is stored on disk after a certain amount of changed keys.

Depending on how many changes your system is doing it will update the data on disk roughly every 5 minutes by default.
Please consider this if you run on a SD card.

If you are not working on a SD card and want to have real up-to-date data you can use the second persistance method called AOF.

Please see https://redis.io/topics/persistence for details, differences and configuration information for both persistence options.

##### Using REDIS as States-DB
**Feature Status: Stable**

There is a possibility to use REDIS as states database. It is reasonable to do that for big installations or for systems with performance problems.
It is possible to switch anytime between REDIS and In-Memory Javascript DB. 

**Note for js-controller <2.0**: After changing to Redis all states must be updated by the adapters again (values will be lost). Please especially note this for own JavaScript objects! Objects and configuration are not affected.

To switch to REDIS write in the console following:

```
>iobroker stop
>iobroker setup custom
```

And then:

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

Note that in fourth line it was entered **redis**.

Now ioBroker can be started.
If ioBroker does not start please check the log at log/iobroker.*.log in ioBroker directory. Please also check that redis is running (use e.g. ```redis-cli```) and that the firewall is set up correctly

To switch back to JS States write the same commands again, just instead of **redis** in fourth line write nothing and press ENTER.

##### Using REDIS as Objects/File-DB
**Feature Status: New since 2.0.0**

Starting with js-controller 2.0.0 also objects and files can be stored in Redis. Please note that this uses much more RAM because beside object definitions also uploaded files and image assets are also stored in redis. Redis holds all data in RAM. Please think carefull about this step and make sure your system has enough RAM available!

The setup is comparable to the setup for States in Redis by using ```iobroker setup custom```, but enter **redis** as type of the objects database. You can use the same redis server for states and objects/files database.

##### Using REDIS Sentinel as Objects/File-DB
**Feature Status: New since 2.0.0**

Redis Sentinel is an industry standard to allow a high available redis databases. It is based on a Redis master-slave setup with at least three nodes! Additional so called sentinel processes monitor all this redis instances in the master-slave setup. 

If the Master is going offline the sentinel processes react and coordinate to select a new master. After this is done the master-slave cluster is reconfigured and the new master is taking over.

More details about the Redis sentinel can be found in the official documentation at https://redis.io/topics/sentinel .

ioBroker allows to use a Redis Sentinel system. For this you use ``ìobroker custom```as seen above, but provide a comma separated list of the sentinel hosts. Also for the sentinel ports you can enter a comma separated list with the same number of entries, or only one which is then used for all hosts.

When such a list is configured ioBroker will connect to one of these sentinel processes to get the current Master Redis and then connect to this Redis. When the connection to the Master is disconnected all data updates are cached and sent as soon as a connection to the new master has been established.

## License 

The MIT License (MIT)

Copyright (c) 2014-2019 bluefox <dogafox@gmail.com>,

Copyright (c) 2014      hobbyquaker
