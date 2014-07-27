


## Install ioBroker.nodejs (Debian/Ubuntu Linux)

## Install ioBroker.nodejs (OSX)

## Install ioBroker.nodejs (Windows)

## Manual install ioBroker.nodejs (Linux, OSX)

### Prerequisites

* a [Node.js](http://nodejs.org) installation (including npm).
* a [CouchDB](http://couchdb.apache.org/) installation
* a [Redis](http://redis.io/) installation

* Create and change to the directory under which you want to install ioBroker. F.e.:
    ```sudo mkdir /opt/iobroker; sudo chown pi.pi /opt/iobroker; cd /opt/iobroker```


    a) Clone the repository ```mkdir iobroker; cd iobroker; git clone https://github.com/ioBroker/ioBroker.nodejs/```

    or

    b) download and unzip the [zip-file](https://github.com/ioBroker/ioBroker.nodejs/archive/master.zip)
    ```wget https://github.com/ioBroker/ioBroker.nodejs/archive/master.zip; unzip master.zip; mv ioBroker.nodejs-master iobroker```

    or

    c) install via npm: ```npm install https://github.com/ioBroker/ioBroker.nodejs/tarball/master -g --prefix ./ --production```

* Do initial database setup ```node iobroker.js setup```

    (if your CouchDB and/or Redis is not running on localhost you can supply optional arguments --couch <host> --redis <host>

## Install base adapter

*   ```node iobroker.js add admin --enabled
    node iobroker.js add history --enabled
    node iobroker.js add javascript --enabled```

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