---
title:       "Erweiterte Konfiguration - Multihost"
lastChanged: "13.09.2018"
editLink:    "https://github.com/ioBroker/ioBroker.docs/edit/master/docs/config/multihost.md"
---

# Der Multihost-Betrieb
@@ Die Beschreibung wofür das gut ist, kommt noch.

## Master Konfiguration
Auf dem Master folgendes Kommando ausführen:

**Diese Schritt ist nur nötig, falls Redis DB im Einsatz ist.**

1. (nur mit Redis) `iobroker setup custom`
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

## Slave Konfiguration
Auf dem Slave danach folgendes Kommando ausführen:

**Diese Schritt ist nur nötig, falls Redis DB im Einsatz ist.**
1. (nur mit Redis) `sudo iobroker setup custom`

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

## Probleme
manchmal kommt etwas wie:

```> ... bytes ... in strict mode```

dafuer einfach die Datei in welcher das auftrit mit nano Editor bearbeiten. Direkt am Anfang steht `'use strict';` diese Zeile mit // einkommentieren und speichern.

```> IP Address of the host is 127.0.0.1. It accepts no connections. Please change.```

wenn man auf dem Master System ``` setup custom ```  nicht gemacht hat
