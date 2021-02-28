---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/config/redis.md
title: The Redis database for ioBroker
hash: SoqEQqV0IZ/uxETDM3MSFvy9Bkrk4fp/cwvrsetbZjQ=
---
# The Redis database for ioBroker
Redis is an open source in-memory database.
More information can be found at https://redis.io/

The big advantage of Redis:

Compared to the internal ioBroker databases, Redis offers advantages in the areas of data access speed, IO management in the file system and better use of CPU resources.
The js controller is relieved. A previously sluggish system can become faster again.
However, it is important that enough RAM is available, as Redis keeps all data in RAM. Depending on what exactly is stored in Redis, the RAM requirement is a few MB (e.g. if only states are in Redis) up to over 200 MB (if e.g. objects and files are also stored there).

## Redis FAQ
1. Do I need Redis for my ioBroker or not?

For all common installations, ioBroker's own databases are usually sufficient! Only when the js-controller permanently needs 50-70% or more CPU and the system feels sluggish at the same time, it can make sense to deal with the topic of Redis.
Alternatively, it becomes necessary if you are aiming for a highly available ioBroker system, but a few more things are necessary.

2. How do I find out whether I am using Redis or not?

Since ioBroker's own databases also use the Redis protocol for communication, it can sometimes be confusing to read something from Redis in the log. As long as port 9000/9001 is mentioned, this indicates the internal database and has nothing to do with the external Redis database.
A call to `iobroker status` shows which database type is used for the states and objects databases.
"file" means that ioBroker's own databases are used. "redis" means that a Redis is in use.

A detailed explanation on the topic of Redis with further information can be found in [Forum](https://forum.iobroker.net/topic/26327/redis-in-iobroker-%C3%BCberblick)

## Redis persistence
Typically, Redis is an "in-memory database". So the data is stored in RAM. When Redis exits, these are gone.
However, to enable updates, Redis supports two types of data storage on hard drive.
The RDB and AOF persistence.

** RDB ** is active by default, this method saves the entire content in an RDB file. The storage interval can be configured and should be adapted to your own needs! To configure this, a mixture of data security (how much data can you cope with losing in a crash) and write load for the storage medium, since the entire content is always written (if objects are also in Redis, this may be several hundred MB!).

However, **AOF** ensures that the data is completely up-to-date.
For this purpose, a so-called AOF file is continuously written, where all changes are always appended. This file is then consolidated at regular intervals and thus reduced in size again. How the final write load is exactly, and whether the whole thing is good for SD cards or not, depends on which data is saved. If objects and files are also in Redis, appending and consolidating infrequently is significantly more "economical" than regularly storing large amounts of data.
As mentioned above, this means that more ram is required. If this RAM is not available, everything continues - depending on the settings - without any problems.
A backup of the data is then not created! Corresponding messages are only available in the log file.

More details on persistence can be found at https://redis.io/topics/persistence

** Redis Slaves **, i.e. a second Redis server, is another way of always having current data as a backup.
If the computer with the master Redis is defective, the data still exists on the slave in almost real time.
You can use this to create a dump to set up the master again, or as a quick solution you can make the slave the master and change the database IPs in the ioBroker and you are almost up to date again online. This can also be found in more detail in [Forum](https://forum.iobroker.net/topic/26327/redis-in-iobroker-%C3%BCberblick) or at https://raw.githubusercontent.com/antirez/redis/5.0/redis.conf

** However, a slave does not protect against accidental deletion of data, as these are deleted on the slave immediately afterwards. Only backups help here. **

## Installation of Redis
Redis must be installed and configured as a separate service and the data should also be taken into account during the backup.
The persistent databases are saved in the form of JSON files in the "iobroker-data" folder.
The installation takes place on the command line for

** Debian **

```sh
sudo apt update
sudo apt install redis
```

** Ubuntu **

```sh
sudo add-apt-repository ppa:chris-lea/redis-server
sudo apt-get update
sudo apt-get install redis-server
```

** Warning **: There are no official Redis builds for Windows.

## Set up Redis
You can check with `sudo systemctl status redis-server`.
If it does not restart automatically after a reboot, a `sudo systemctl enable redis-server` helps.
Redis uses port 6379 by default and also has a command line tool for accessing the database: `redis-cli` opens a shell.
The command `info` shows some information about the system, memory usage and the stored data ("keyspace"), which of course is currently empty.

If you operate a single host system or ioBroker runs on the same host, then that's about it.

If other hosts should also access this Redis server (slaves or something), then this must still be allowed.
To do this, /etc/redis/redis.conf must be edited and the line **bind 127.0.0.1** changed to **bind 0.0.0.0** and the **protected_mode** set to **no** directly below it become.

Then `sudo systemctl restart redis-server` restarts the server with the updated configuration.

For more details see [Multihost](https://www.iobroker.net/#de/documentation/config/multihost.md)

## Convert ioBroker database to Redis
Most changes and data queries are made with the States database. All data changes arrive here and are then distributed again to adapters when they have registered for certain data.
Switching the states to Redis has by far the greatest and most noticeable performance effect.
If you only convert the States database, you should ideally install the Redis server on the same host as the ioBroker master.

The changeover of the "States" then takes place via:

```sh
iobroker stop
iobroker setup custom
```

For the "Objects" confirm the current settings ("file" as type, IP, port 9001) and for "States" now as type "redis", the IP of the Redis host server (or 127.0.01 if on the same host ) and set 6379 as port.
So that you do not lose all state data, it is advisable to migrate the data, which is what the next questions in the configuration ask.
After the migration, ioBroker can be restarted with **iobroker start** If slave systems are also used, the same settings must be made everywhere via **iobroker setup custom** However, the question about migration must be answered in the negative!

If you also want to change "Objects", proceed exactly and select the type "redis", enter the IP and port of the Redis host and migrate the data if necessary, which, depending on the size, can take a while.

** States and objects in the same or separate Redis processes? **

It is of course easiest to have states and objects saved together in a Redis process.
However, this also means that only all data can be backed up together.
With the ioBroker File-DB, states, objects and files were separated and could thus be backed up selectively.
The write load is also higher if everything is stored in a Redis because the database is larger.
In order to separate the often changing states and not so often changed objects and files with a Redis setup, you can simply use two Redis processes per host.
Instructions are available at https://gist.github.com/inecmc/f40ca0ee622e86999d9aa016c1b15e8c, for example.

With `iobroker setup custom` the respective different ports for states or objects / files are simply specified.

For states it is recommended to use an RDB persistence which then backs up the data every 5-15 minutes depending on the number of changes. For objects / files, the AOF persistence is more suitable to minimize the write load.

## Backup
Redis usually saves its files in / var / lib / redis. The dump.rdb or appendonly.aof located there (depending on the selected persistence) can be saved. You can also use `redis-cli BGSAVE` to generate a dump.rdb directly before the backup and then save it away.