# ioBroker.js-controller

For more information please visit [ioBroker wiki](https://github.com/ioBroker/ioBroker/wiki/Home-(English))

This is a Javascript/Node.js implementation of an ioBroker controller.

**see ioBroker Readme: https://github.com/iobroker/iobroker**

## Manual installation of ioBroker.js-controller on Debian based Linux (Raspbian, Ubuntu, ...)


### [Node.js](http://nodejs.org) (Node.js version >= 0.8, including npm)

* ```wget http://download.iobroker.org/nodejs_0.10.22-1_armhf.deb ; sudo dpkg -i nodejs_0.10.22-1_armhf.deb ; rm nodejs_0.10.22-1_armhf.deb```
#### x86/amd64 Linux, Windows, OSX
[http://nodejs.org/download/](http://nodejs.org/download/)

#### Debian package for ARM (Raspbian, Cubian, ...)
```wget http://ccu.io.mainskater.de/nodejs_0.10.22-1_armhf.deb
sudo dpkg -i nodejs_0.10.22-1_armhf.deb
rm nodejs_0.10.22-1_armhf.deb```

### Install js-controller on linux

* Create and change to the directory under which you want to install ioBroker.

    ```sudo mkdir /opt/iobroker ; sudo chown $USER.$USER /opt/iobroker ; cd /opt/iobroker```
* install npm packet

    ```npm install iobroker```

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

### Install more adapters

* ```./iobroker add <adapter-name>```
* ```./iobroker add <adapter-url>``` (todo)

After Installation of an Adapter you should edit it's configuration. Go to the tab "instances" in the Admin UI.
By clicking a adapter instance you can directly enable it by checking the enabled checkbox. Press enter to save or escape
to cancel.
To edit the adapters configuration mark the adapter row and click the note icon.
To enable or disable the adapter click on the pencil icon in the according row.



