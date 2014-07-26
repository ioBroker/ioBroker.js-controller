
## Installation prerequisites

* a [Node.js](http://nodejs.org) installation including npm
* a [CouchDB](http://couchdb.apache.org/) installation
* a [Redis](http://redis.io/) installation

## Install ioBroker.nodejs

* Clone the repository or download and unzip the [zip-file]()
* Change to the iobroker root directory
* run ```npm install --production``` to install dependencies
* if CouchDB and/or Redis aren't running on localhost you need to edit conf/iobroker.json according to your needs
* start ioBroker.ctrl for a first time to setup the database ```node control.js``` - end with ctrl-c when database setup is done

## Install admin adapter

* run ```node iobroker.js add admin```

## Start ioBroker.ctrl

* run ```node iobroker.js start``` to start iobroker.ctrl in the background
* watch the logfile ```tail -f log/iobroker.log```

or

* run ```node control.js``` to start iobroker.ctrl in foreground and watch the log on console

## Activate the admin adapter

* open Futon (the CouchDB-Webinterface) on http://&lt;couch&gt;:5984/_utils/ and set attribute *enabled* true in object system.adapter.admin.0
* watch the logfile for the line ```info: admin.0 http server listening on port ...```
* open http://&lt;host&gt;:&lt;port&gt;/admin


## Install Homematic Adapters

* run ```node iobroker.js add hm-rpc``` (run multiple times if you have more than one interface, f.e. rf and wired)
* open Futon and edit adapter config(s): system.adapter.hm-rpc.0, ...
* the rpc adapter needs some time after first connect to retrieve the devices "paramsets". Be patient until this is done (watch logfile)
* if you have a Homematic "CCU" you can (after hm-rpc init is done) additionally install the hm-rega Adapter for starting CCU-programs, sync of CCU-variables, Names, Rooms, ...