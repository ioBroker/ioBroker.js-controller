![Logo](lib/img/iobroker.png)
# ioBroker.js-controller
==================

[![NPM version](http://img.shields.io/npm/v/iobroker.js-controller.svg)](https://www.npmjs.com/package/iobroker.js-controller)
[![Downloads](https://img.shields.io/npm/dm/iobroker.js-controller.svg)](https://www.npmjs.com/package/iobroker.js-controller)
[![Tests](http://img.shields.io/travis/ioBroker/ioBroker.js-controller/master.svg)](https://travis-ci.org/ioBroker/ioBroker.js-controller)

[![NPM](https://nodei.co/npm/iobroker.js-controller.png?downloads=true)](https://nodei.co/npm/iobroker.js-controller/)

Here you can find change [log](CHANGELOG.md).

This is a main controller, that starts all other ioBroker adapters.

Official Web-Site: http://iobroker.net

Forum: http://forum.iobroker.net

Trello: https://trello.com/b/q0SZKdfW/iobroker-whiteboard

ioBroker wiki: https://github.com/ioBroker/ioBroker/wiki/Home-(English)

Explanation of the concept: https://github.com/iobroker/iobroker

----------------------------------------------------------------------

This is a Javascript/Node.js implementation of an ioBroker controller.

## Manual installation of ioBroker.js-controller on Debian based Linux (Raspbian, Ubuntu, ...)

### Install Node.js

```
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install curl build-essential
sudo curl -sL https://deb.nodesource.com/setup_6.x | sudo bash -
sudo apt-get install -y nodejs
```

### Install ioBroker on linux

```
sudo mkdir /opt/iobroker
sudo cd /opt/iobroker
sudo chmod 777 /opt/iobroker
sudo npm install iobroker --unsafe-perm
```

After that the ioBroker should run and be available in browser under ```http://<ip>:8081/```

### Start ioBroker controller on linux

* run ```./iobroker start``` in the ioBroker directory to start the ioBroker controller in the background
* watch the logfile ```tail -f log/iobroker.log```

or

* run ```node node_modules/iobroker.js-controller/controller.js``` to start the ioBroker controller in foreground and watch the log on console

### Install js-controller on windows

* Create and change to the directory under which you want to install ioBroker.

    ```mkdir C:/iobroker```
    ```cd C:/iobroker```

* install npm packet from created directory

    ```npm install iobroker```

### Start ioBroker controller on windows

* run ```iobroker start``` in the ioBroker directory to start the ioBroker controller in the background console
* check the logfile ```node_modules/iobroker.js-controller/log/iobroker.log```

or

* run ```node node_modules/iobroker.js-controller/controller.js``` to start the ioBroker controller in foreground and watch the log on console

### Admin UI

The admin adapter starts a web-server that hosts the Admin UI. Default port is 8081, so just open http://&lt;iobroker&gt;:8081/
If port 8081 is occupied, you can install second Admin UI on alternate port and change port for first admin UI:

* run ```./iobroker add admin --enabled --port 8090``` and go to the http://&lt;iobroker&gt;:8090/. Of course you can change port 8090 to other one.

## Using REDIS as States-DB
There is a possibility to use REDIS as states database. It is reasonable to do that for big installations or for systems with performance problems.
It is possible to switch anytime between REDIS and In-Memory Javascript DB. The only problem, that all states must be updated by adapters again (values will be lost).
Objects and configuration are not affected.

To install REDIS on linux/debuan just write: ```apt-get install redis-server``` .

If you plan to use mulithost installation you must allow connections to redis from any address (default only 127.0.0.1).
To do that edit file */etc/redis/redis.conf* (```sudo nano /etc/redis/redis.conf```) and replace ```bind 127.0.0.1``` with ```bind 0.0.0.0``` .
Don't forget to restart redis after that. (```sudo /etc/init.d/redis-server restart```)

To install on windows download latest release here [https://github.com/MSOpenTech/redis/releases](https://github.com/MSOpenTech/redis/releases).

To switch to REDIS write in the console following:

```
>iobroker stop
>iobroker setup custom
```

And then:

```
Type of objects DB [file, couch, redis], default [file]:
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
Of course redis must be first installed and firewall rules must be checked.

To switch back to JS States write the same commands again, just instead of **redis** in fourth line write nothing and press ENTER.

## License 

The MIT License (MIT)

Copyright (c) 2014-2018 bluefox <dogafox@gmail.com>,

Copyright (c) 2014      hobbyquaker
