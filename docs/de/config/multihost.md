---
title:       "Erweiterte Konfiguration - Multihost"
lastChanged: "13.09.2018"
editLink:    "https://github.com/ioBroker/ioBroker.docs/edit/master/docs/config/multihost.md"
---

# Der Multihost-Betrieb

ioBroker ist in der Lage, die Aufgaben von mehreren Servern erledigen zu lassen. Dadurch kann die Rechenlast auf mehrere Hosts verteilen werden. 
Man kann aber auch systemspezifische Erweiterungen eines Einplatinencomputers nutzen (GPIO von einem RaspberryPi, obwohl der „Hauptrechner“ 
ein leistungsfähigerer Intel NUC ist).

Nach Erstellung eines Multihost-Systems werden alle Konfigurationen zentral über den Admin des Masters durchgeführt. Der Admin des/der Slaves 
ist nicht mehr über deren Webinterface(s) erreichbar.

Es ist daher sinnvoll für einen Slave einen Host mit Minimalinstallation zu verwenden, also nur den js-controller und den admin.


##Installation

### Master Konfiguration
Auf dem Master folgendes Kommando ausführen:

**Dieser Schritt ist unbedingt nötig, falls Redis DB im Einsatz ist.**
In anderen Fällen kann man Ihn nutzen, wenn die automatische Methode (s.u.) fehlschlägt. Dann aber bitte f(ile) statt r(edis) auswählen!

über die Konsole bitte aufrufen:

1.  `iobroker setup custom`

Das nun erscheinende Menü wie folgt ausfüllen

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


### Slave Konfiguration

**Dieser Schritt ist unbedingt nötig, falls Redis DB im Einsatz ist.**

Über die Konsole auf dem Slave bitte eingeben
1. `sudo iobroker setup custom`


Das nun erscheinende Menü wie folgt ausfüllen

```
Type of objects DB [(f)ile, (c)ouch, (r)edis], default [file]: f
Host / Unix Socket of objects DB(file), default[127.0.0.1]: <MASTER-IP>
Port of objects DB(file), default[9001]:
Type of states DB [(f)file, (r)edis], default [file]: r
Host / Unix Socket of states DB (redis), default[<MASTER-IP>]:
Port of states DB (redis), default[6379]:
Host name of this machine [raspi-sub-1]:
```
zum Schluss erscheint die Info:
```
creating conf/iobroker.json
```


2. `iobroker multihost connect`

und die folgenden Dialoge entsprechend ausfüllen:
```
1 |       <MASTER-IP> |  host |       192.168.86.42 | "authentication required"
Please select host [1]: 1
Enter secret phrase for connection: *****

Config ok. Please restart ioBroker: "iobroker restart"
```

2. `sudo service iobroker restart`




Auf dem Hauptsystem erscheint danach unter Hosts auch der neu angelegte Host.

Sollte das nicht geschehen bitte beide Hosts rebooten. zuerst den Master, dann den Slave.


## Multihost mit verschiedenen Subnetzen

**Wenn beide ioBroker-Hosts in unterschiedlichen Subnetzen sind, …

Beispiel:**

* Normales LAN (für PC, Tablet, use.) = 192.168.178.0/24
* IoT LAN (für Shelly, Kameras, usw.) = 10.20.30.0/24

… geht die Multihost-Automatik (“sudo iobroker multihost enable” und “sudo iobroker multihost browse“) nicht, sondern nur der alte Weg (`iobroker setup custom`) siehe oben



## Multihost mit redis
Soll eine Multihost-Umgebung installiert werden, bei der die  States in redis gespeichert werden, muss noch einiges beachtet werden.

Die Datei redis.conf auf dem Host, auf dem die States gespeichert werden muss wie folgt geändert werden.

```
nano /etc/redis/redis.conf
```

Die darin enthaltene Zeile `bind 127.0.0.1` muss mit der IP des Netzwerkadapters ergänzt werden, damit der Redis-Server connects von extern zulässt. 

Also zB
```
bind 127.0.0.1 192.168.1.10
```

unter der Annahme, dass 192.168.1.10 die lokale IP des ioBroker Masters ist.

Diese Anpassung ist nur am Master nötig.

Alternativ geht auch

```
bind 0.0.0.0
```

Zum Schluss den Redis-Server oder Rechner neu starten. zB:

```
sudo service redis-server restart
```

## Aufgaben verteilen
Es gibt zwei Möglichkeiten, die Aufgaben auf die Hosts zu verteilen.

* Ist es eine Neuinstallation, wählt man im Reiter Adapter aus dem pulldown-Menü über der Adapterliste den Host aus, auf dem die Instanz des Adapters installiert werden soll. 
Anschließend fügt man dort die Instanz hinzu, indem man auf das (+) in der rechten Spalte klickt.
* Hat man bereits vorher viele Adapter auf einem Host installiert, kann man die Zuordnung der bereits installierten Instanzen nachträglich im Reiter Instanzen ändern.



## Host löschen
Zum Löschen eines Hosts im Admin-Reiter Objekte des Master den Experten-Modus aktivieren und in der Spalte Typ die Auswahl host aktivieren. Dann den gewünschten Host löschen.





## mögliche Probleme
manchmal erscheint noch eine Meldung, ähnlich wie:

```> ... bytes ... in strict mode```

Dann bitte die Datei in welcher das auftrit mit dem nano Editor bearbeiten. Direkt am Anfang steht `'use strict';` diese Zeile mit // einkommentieren und speichern.

```> IP Address of the host is 127.0.0.1. It accepts no connections. Please change.```

wenn man auf dem Master System ``` setup custom ```  nicht gemacht hat




