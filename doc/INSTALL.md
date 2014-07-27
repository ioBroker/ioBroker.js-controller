## Installation


### ioBroker.nodejs Debian/Ubuntu Linux installation

...todo

### ioBroker.nodejs Mac OSX installation

...todo

###  ioBroker.nodejs Windows installation

...todo

### Manual install ioBroker.nodejs

#### Prerequisites

* a [Node.js](http://nodejs.org) installation (including npm)
* a [CouchDB](http://couchdb.apache.org/) installation
* a [Redis](http://redis.io/) installation

#### Download and Install

* Create and change to the directory under which you want to install ioBroker. On Raspbian f.e.: ```sudo mkdir /opt/iobroker ; sudo chown pi.pi /opt/iobroker ; cd /opt/iobroker```
* Clone the repository ```git clone https://github.com/ioBroker/ioBroker.nodejs```
* change execute rights ```chmod +x iobroker```
* Do initial database setup ```./iobroker setup```

    (if your CouchDB and/or Redis is not running on another host you can supply optional arguments --couch <host> --redis <host>

## Install base adapter

*   ```./iobroker add admin --enabled```
*   ```./iobroker add history --enabled```
*   ```./iobroker add javascript --enabled```

## Start ioBroker controller

* run ```./iobroker start``` to start iobroker.ctrl in the background
* watch the logfile ```tail -f log/iobroker.log```

or

* run ```node control.js``` to start iobroker.ctrl in foreground and watch the log on console


### admin-adapter

* watch the logfile for the line ```info: admin.0 http server listening on port ...``` and open http://&lt;ioBroker&gt;:&lt;port&gt

### Access Objects

Direct access to all ioBroker Objects via the CouchDB-Webinterface http://&lt;couch&gt;:5984/_utils/

### See Events

you can use redis_cli command ```PSUBSCRIBE *``` to watch all stateChange Events on the Console


## Install more adapters

* ```./iobroker add <adapter-name>```
* ```./iobroker add <adapter-url>```

After Installation of an Adapter you should edit it's configuration (futon view: system/instance):

* common.enabled - set to ```true``` to enable adapter
* common.host - bind adapter servers on this ip
* native.* - individual adapter config

