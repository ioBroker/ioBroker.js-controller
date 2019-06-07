---
title: Advanced Configuration - Multihost
lastChanged: 13.09.2018
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/config/multihost.md
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
hash: iUsdZPlFyCP1nI00DzyDR5xXg4WMHHyxGpZNnUP+j04=
---
# The multihost operation
@@ The description for what is good, is yet to come.

## Master configuration
Execute the following command on the master:

** This step is only necessary if Redis DB is in use. **

1. (only with Redis) `iobroker setup custom`

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

## Slave configuration
Then execute the following command on the slave:

** This step is only necessary if Redis DB is in use. **

1. (only with Redis) `sudo iobroker setup custom`

```
Type of objects DB [(f)ile, (c)ouch, (r)edis], default [file]: f
Host / Unix Socket of objects DB(file), default[127.0.0.1]: <MASTER-IP>
Port of objects DB(file), default[9001]:
Type of states DB [(f)file, (r)edis], default [file]: r
Host / Unix Socket of states DB (redis), default[<MASTER-IP>]:
Port of states DB (redis), default[6379]:
Host name of this machine [raspi-sub-1]:
creating conf/iobroker.json
```

2. `iobroker multihost connect`

```
1 |       <MASTER-IP> |  host |       192.168.86.42 | "authentication required"
Please select host [1]: 1
Enter secret phrase for connection: *****

Config ok. Please restart ioBroker: "iobroker restart"
```

2. `sudo service iobroker restart`

## Problems
sometimes something like:

```> ... bytes ... in strict mode```

simply edit the file in which the event with nano editor. Right at the beginning, `'use strict';` comment in and comment on this line.

```> IP Address of the host is 127.0.0.1. It accepts no connections. Please change.```

if on the master system it was not made ``` setup custom ```