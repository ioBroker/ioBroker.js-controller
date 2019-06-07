---
title: ioBroker is not working anymore
lastChanged: 06.06.2019
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/trouble/RunsNoMore.md
hash: 9iXRa+c7jhjaegwF7+nwMZvFDta9QSibRxA4R/7jyGk=
---
# IoBroker is not working anymore
It often comes in the forum that ioBroker is no longer running. But that is a statement that carries as much information as: my car does not drive.

You do not think that there can be 1000 reasons why a car does not drive: no fuel, no battery, flat tire and, and, and ...

ioBroker is very modular and you can repair any part pretty easily. The configuration files are taken out of the directory with Node.js packages and so long that this configuration directory is still complete, nothing serious has happened to the ioBroker installation.

First, you notice that ioBroker is not running when "admin" is not running. But there is more or less clear algorithm on how to check what is broken.
Check if js-controller is running:

** Linux **

````
Linux: ps -A | grep iobroker
````

** Windows: **

Check if node.exe process is in process explorer (show all processes)

Under linux something must be visible:

```
pi@pi:~$ ps -A | grep iobroker
1807 ? 13:59:22 iobroker.js-con
```

If it is not working, try ioBroker to start with

** Linux **

```
cd /opt/iobroker
iobroker start
```

or **Windows:**

```
cd C:\ioBroker
iobroker start
```

If it is still not running or error messages, then you can try to start the js-controller manually.

```
cd /opt/iobroker
node node_modules/iobroker.js-controller/controller.js --logs
```

If error messages occur, you can try updating "js-controller".

If the js-controller is running then TCP ports 9000 and 9001 must be used. This can be checked with the command:

```
netstat -n -a -p TCP
```

The following lines must be visible:

```
TCP 0.0.0.0:9000 0.0.0.0:0 LISTENING
TCP 0.0.0.0:9001 0.0.0.0:0 LISTENING
```

When using Redis it should look like this:

```
TCP 0.0.0.0:6379 0.0.0.0:0 LISTENING
TCP 0.0.0.0:9001 0.0.0.0:0 LISTENING
```

If nothing is visible (or only one), then probably the ports of other programs are occupied. You can change the ports to */ opt / iobroker / iobroker-data / iobroker.json* Or reconfigure another program.

## Reinstall an adapter or js controller
If an adapter or js-controller ran and after the update is no longer, then most likely in the update something went wrong. But you can easily install an adapter again. All you have to do is write in the console:

```
cd /opt/iobroker
iobroker stop adapterName
npm install iobroker.adapterName
iobroker upload adapterName
iobroker start adapterName
```

Or for the js-controller:

```
cd /opt/iobroker
iobroker stop
npm install iobroker.js-controller
iobroker start
```

## Check or node.js and npm are installed properly
If js-controller is not running then it could be that node.js is not installed at all.
It is recommended to use an 8.x version of node.js.

The Node.js Version 10.x is mostly checked (as of 06.05.2019), at 12.x there is no guarantee that it will work.

The commands

```
node -v
npm -v
```

must display the same version number. If it is not, then you should uninstall node.js and reinstall. Or check the search path.

Uninstalling and installing Node.js is done in the same way as manual ioBroker installation (Raspberry and other Linux systems).

The necessary steps are described in detail HERE.

And here you can find information about other systems ..
Check if admin adapter is running

First look, if admin is activated:

```
cd /opt/iobroker
iobroker list instances
```

there must be such a line:

```
system.adapter.admin.0 : admin - enabled, port: 8081, bind: 0.0.0.0, run as: admin
```

If there is "disabled" instead of "enabled", you can enable adapters like this:

```
iobroker start admin
```

If IP address is wrong, then write:

```
iobroker set admin.0 --bind 0.0.0.0
```

to allow at all IP addresses.

You can also change port:

```
iobroker set admin.0 --port 8081
```

or turn off SSL:

```
iobroker set admin.0 --ssl false
```

Then the instance must be visible on the port (default 8081).

With

```
netstat -n -a -p TCP
```

you can check if the line is to be found:

```
TCP 0.0.0.0:8081 0.0.0.0:0 LISTENING
```

If it still does not work, then you can start manually and see if there are any errors: cd / opt / iobroker node node_modules / iobroker.admin / admin.js --logs

It can also be something in the log. The log file can be found at ***/ opt / iobroker / log / iobroker.JJJJ-MM-TT.log*** .

You can with the command

```
cd /opt/iobroker
cat log/iobroker.JJJJ-MM-TT.log
```

show the file. Of course, YYYY-MM-DD must be replaced with the current date. ("Cat" is only possible under Linux)

## Install another instance of Admin
If the settings of the Admin console are blocked and you can not access the admin page, there is still the possibility to install a second admin instance.

Therefore:

```
iobroker add admin --port 8089
```

To run.

Here is 8089 a port that is certainly free. Then you can reach admin at http:// ip: 8089.

After the settings are ok, you should uninstall the new (second on port 8089) instance to save resources.

## Npm has disappeared
Due to a problem with npm it can happen that after an upgrade from Linux, which usually also nodejs within a skin version (4.x, 6.x, 8.x) is upgraded, suddenly nothing is working anymore.

Thus, e.g. Adapters are no longer installed, the error message is ***npm not found***

In cases please check in the console:

node -v npm -v

Usually the node version is now 8.11.1 (as of 30.7.2018) although node 6.x was installed before, and npm is not found.

The normal procedure of upgrading npm does not work because npm is not there. Therefore you have to uninstall node first and then reinstall:

```
sudo apt-get --purge remove node
sudo apt-get --purge remove nodejs
sudo apt-get autoremove
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
sudo npm install -g npm@4
npm -v
```

If another main version (not 8.x) of Node was installed before, the packages have to be compiled on node 8

```
cd /opt/iobroker
npm rebuild
```