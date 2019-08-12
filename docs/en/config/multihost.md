---
title: Advanced Configuration - Multihost
lastChanged: 13.09.2018
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/config/multihost.md
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
hash: bn0CAoBAN5DPBn11696x47c991NbZ42OEAQayrrozEY=
---
# The multihost operation
ioBroker is able to handle the tasks of several servers. This allows the workload to be distributed among multiple hosts.
But you can also use system-specific extensions of a single-board computer (GPIO from a RaspberryPi, although the "mainframe" is a more powerful Intel NUC).

After creating a multi-host system, all configurations are performed centrally via the admin of the master. The admin of the slaves is no longer accessible via their web interface (s).

It is therefore useful for a slave to use a host with minimal installation, so only the js-controller and the admin.

##Installation
### Master configuration
Execute the following command on the master:

** This step is absolutely necessary if Redis DB is in use. ** In other cases you can use it if the automatic method (s.u.) fails. But then choose f (ile) instead of r (edis)!

please call via the console:

1. `iobroker setup custom`

Fill in the menu that appears as follows

```
Type of objects DB [(f)ile, (c)ouch, (r)edis], default [file]: f
Host / Unix Socket of objects DB(file), default[0.0.0.0]:
Port of objects DB(file), default[9001]:
Type of states DB [(f)file, (r)edis], default [file]: r
Host / Unix Socket of states DB (redis), default[127.0.0.1]: 0.0.0.0
Port of states DB (redis), default[6379]:
Data directory (file), default[../../../iobroker-data/]: /opt/iobroker/iobroker-data/
Host name of this machine [ioBroker-RasPi]:
```

2. `iobroker multihost enable`

``` enter pass phrase```

3. `sudo service iobroker restart`

### Slave configuration
** This step is absolutely necessary if Redis DB is in use. **

Please enter via the console on the slave

1. `sudo iobroker setup custom`

Fill in the menu that appears as follows

```
Type of objects DB [(f)ile, (c)ouch, (r)edis], default [file]: f
Host / Unix Socket of objects DB(file), default[127.0.0.1]: <MASTER-IP>
Port of objects DB(file), default[9001]:
Type of states DB [(f)file, (r)edis], default [file]: r
Host / Unix Socket of states DB (redis), default[<MASTER-IP>]:
Port of states DB (redis), default[6379]:
Host name of this machine [raspi-sub-1]:
```

Finally, the info appears:

```
creating conf/iobroker.json
```

2. `iobroker multihost connect`

and fill out the following dialogs accordingly:

```
1 |       <MASTER-IP> |  host |       192.168.86.42 | "authentication required"
Please select host [1]: 1
Enter secret phrase for connection: *****

Config ok. Please restart ioBroker: "iobroker restart"
```

2. `sudo service iobroker restart`

On the main system, the newly created host then appears under Hosts.

If that does not happen please reboot both hosts. first the master, then the slave.

## Multihost with different subnets
** If both ioBroker hosts are on different subnets, ...

Example:**

* Normal LAN (for PC, Tablet, use.) = 192.168.178.0/24
* IoT LAN (for Shelly, Cameras, etc) = 10.20.30.0/24

... the multihost automatic ("sudo iobroker multihost enable" and "sudo iobroker multihost browse") does not work, but only the old path (`iobroker setup custom`) see above

## Multihost with redis
If a multi-host environment is to be installed, where the states are stored in redis, a lot of attention needs to be paid.

The file redis.conf on the host where the states are stored must be changed as follows.

```
nano /etc/redis/redis.conf
```

The line contained therein `bind 127.0.0.1` must be supplemented with the IP of the network adapter so that the Redis server connects externally.

Eg

```
bind 127.0.0.1 192.168.1.10
```

assuming that 192.168.1.10 is the local IP of the ioBroker master.

This adjustment is only necessary at the master.

Alternatively, it works

```
bind 0.0.0.0
```

Finally, restart the Redis server or machine. eg:

```
sudo service redis-server restart
```

## Distribute tasks
There are two ways to distribute the tasks to the hosts.

* If it is a new installation, select in the Adapter tab from the pulldown menu above the adapter list the host on which the instance of the adapter is to be installed.

Then add the instance there by clicking on the (+) in the right column.

* If you have previously installed many adapters on a host, you can subsequently change the assignment of already installed instances in the Instances tab.

## Delete host
To delete a host, activate Expert mode in the Admin tab Objects of the master and activate host in the column Type. Then delete the desired host.

## Possible problems
sometimes another message appears, similar to:

```> ... bytes ... in strict mode```

Then please edit the file in which the occurrence with the nano editor. Right at the beginning, `'use strict';` comment in and comment on this line.

```> IP Address of the host is 127.0.0.1. It accepts no connections. Please change.```

if on the master system it was not made ``` setup custom ```