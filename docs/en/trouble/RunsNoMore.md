---
title: ioBroker has stopped working
lastChanged: 06.06.2019
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/trouble/RunsNoMore.md
hash: UsV8EdQdT5BLeSXWa+Fxes2caK4VGm5HBv3MblYRwjI=
---
# IoBroker has stopped working
It often happens in the forum that ioBroker is no longer running. But this is a statement that carries as much information as: my car does not drive.

You don't think that there can be 1000 reasons why a car doesn't drive: no fuel, empty battery, flat tires and, and, and ...

ioBroker is very modular and you can repair any part pretty easily. The configuration files have been removed from the directory with Node.js packages and as long as this configuration directory is still complete, nothing serious has happened to the ioBroker installation.

The first thing you notice is that ioBroker will not run if “admin” is not running. But there is a more or less clear algorithm how to check what is broken.
Check whether js controller is running:

** Linux: **

````
Linux: ps -A | grep iobroker
````

** Windows: **

Check whether node.exe process is there in Process Explorer (show all processes)

Something must be visible under linux:

```
pi@pi:~$ ps -A | grep iobroker
1807 ? 13:59:22 iobroker.js-con
```

If it doesn't work, try ioBroker to start with

** Linux: **

```
cd /opt/iobroker
iobroker start
```

or **Windows:**

```
cd C:\ioBroker
iobroker start
```

If it is still not running or there are error messages, you can try to start the js controller manually.

```
cd /opt/iobroker
node node_modules/iobroker.js-controller/controller.js --logs
```

If there are any error messages, you can try to update “js-controller”.

When the js controller is running, the TCP ports 9000 and 9001 must be occupied. You can check this with the command:

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

If nothing is visible (or only one), then the ports are probably occupied by other programs. You can change the ports in */ opt / iobroker / iobroker-data / iobroker.json* Or reconfigure another program.

## Reinstall an adapter or js controller
If an adapter or js controller ran and no longer worked after the update, then most likely something went wrong with the update. But you can very easily install an adapter again. All you have to do is write in the console:

```
cd /opt/iobroker
iobroker stop adapterName
npm install iobroker.adapterName
iobroker upload adapterName
iobroker start adapterName
```

Or for the js controller:

```
cd /opt/iobroker
iobroker stop
npm install iobroker.js-controller
iobroker start
```

## Check or node.js and npm are installed correctly
If js-controller is not running, then it could also be that node.js is not installed at all.
It is recommended to use an 8.x version of node.js.

The Node.js version 10.x has been largely tested (as of May 6th, 2019), with 12.x there is no guarantee that it will work.

The commands

```
node -v
npm -v
```

must show the same version number. If it is not, then you should uninstall and reinstall node.js. Or check the search path.

Node.js is uninstalled and installed in the same way as for the manual ioBroker installation (for Raspberry and other Linux systems).

The necessary steps are described in detail HERE.

And here you can find information about other systems ..
Check whether the admin adapter is running

First check whether admin is activated:

```
cd /opt/iobroker
iobroker list instances
```

there must be a line like this:

```
system.adapter.admin.0 : admin - enabled, port: 8081, bind: 0.0.0.0, run as: admin
```

If there is "disabled" instead of "enabled", you can activate the adapter as follows:

```
iobroker start admin
```

If the IP address is not correct, then write:

```
iobroker set admin.0 --bind 0.0.0.0
```

to allow at all IP addresses.

You can also change the port:

```
iobroker set admin.0 --port 8081
```

or turn off SSL:

```
iobroker set admin.0 --secure false
```

Then the instance at the port (default 8081) must be visible.

With

```
netstat -n -a -p TCP
```

you can check whether the line can be found:

```
TCP 0.0.0.0:8081 0.0.0.0:0 LISTENING
```

If it is still not running, you can start it manually and see if there are any errors: cd / opt / iobroker node node_modules / iobroker.admin / admin.js --logs

There may also be something in the log. The log file can be found under ***/ opt / iobroker / log / iobroker.JJJJ-MM-DD.log*** .

You can with the command

```
cd /opt/iobroker
cat log/iobroker.JJJJ-MM-TT.log
```

view the file. Of course, YYYY-MM-DD must be replaced with the current date. (“Cat” is only possible under Linux)

## Install another instance of the admin
If the settings are changed from the admin console and you can no longer access the admin page, there is still the option of installing a second admin instance.

Therefore:

```
iobroker add admin --port 8089
```

To run.

Here, 8089 is a port that is certainly free. Then you can reach Admin at http:// ip: 8089.

After the settings are OK again, you should uninstall the new (second on port 8089) instance to save resources.

## Npm has disappeared
>! Something like that is currently happening at Debian (Raspbian) Buster

Due to a problem with npm it can happen that after an upgrade from Linux, in which nodejs is usually also upgraded within a skin version (6.x; 8.x, 10.x), nothing suddenly works.

For example, Adapter is no longer installed, the error message is ***npm not found***

In such cases, please check in the console:

node -v npm -v

Usually (as of July 30th, 2019) the node version 8.15.0 and npm is not found.

The normal procedure of upgrading npm does not work because npm is not there. Therefore, you must first uninstall node and then reinstall it:

```
sudo apt-get --purge remove node
sudo apt-get --purge remove nodejs
sudo apt-get autoremove
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
npm -v
```

Now normally npm 6.x should be installed.

If another main version (not 10.x) of Node was previously installed, the packages must be compiled on node 10

```
cd /opt/iobroker
npm rebuild
```