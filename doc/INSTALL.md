## Installation


### ioBroker.nodejs Debian/Ubuntu Linux installation

...todo

### ioBroker.nodejs Mac OSX installation

...todo

###  ioBroker.nodejs Windows installation

...todo

### Manual install ioBroker.nodejs on Linux/OSX

#### Prerequisites

* git command line client
* [Node.js](http://nodejs.org) (including npm)
* [CouchDB](http://couchdb.apache.org/)
* [Redis](http://redis.io/)

#### Download and Install

* Create and change to the directory under which you want to install ioBroker. On Raspbian f.e.: ```sudo mkdir /opt/iobroker ; sudo chown pi.pi /opt/iobroker ; cd /opt/iobroker```
* Clone the repository ```git clone https://github.com/ioBroker/ioBroker.nodejs```
* Grant execute rights ```chmod +x iobroker```
* Do initial database setup ```./iobroker setup```

    (if your CouchDB and/or Redis is not running on localhost you can supply optional arguments --couch <host> --redis <host>)

## Install admin adapter

This adapter is needed to do basic system administration

*   ```./iobroker add admin --enabled```

## Start ioBroker controller

* run ```./iobroker start``` to start iobroker.ctrl in the background
* watch the logfile ```tail -f log/iobroker.log```

or

* run ```node control.js``` to start iobroker.ctrl in foreground and watch the log on console


### Admin UI

The admin adapter starts a webserver that hosts the Admin UI

* watch the logfile for the line ```info: admin.0 http server listening on port ...``` and open http://&lt;ioBroker&gt;:&lt;port&gt;

### Access Objects

Direct access to all ioBroker Objects via the CouchDB-Webinterface "Futon" http://&lt;couch&gt;:5984/_utils/

### See Events

you can use redis_cli command ```PSUBSCRIBE *``` to watch all stateChange Events on the Console


## Install more adapters

* ```./iobroker add <adapter-name>```
* ```./iobroker add <adapter-url>``` (todo)

After Installation of an Adapter you should edit it's configuration. Go to the tab "instances" in the Admin UI.
By clicking a adapter instance you can directly enable it by checking the enabled checkbox. Press enter to save or escape
to cancel.
To edit the adapters configuration mark the adapter row and click the pencil icon (lower left).

## Currently available adapters:

* admin
* scripts (a Javascript script engine)
* history (manages state history)
* hm-rpc (Homematic RPC Adapter)
* hm-rega (Homematic CCU/ReGaHSS Adapter)
* hue (Philips Hue Adapter)
* yr (48h weather forecast from yr.no)


