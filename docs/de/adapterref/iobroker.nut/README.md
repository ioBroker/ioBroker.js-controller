---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.nut/README.md
title: ioBroker.nut
hash: 4V5c4I6Vh/5cCcmu/zWPK9gorBweyRSZKnlLDbsUZkc=
---
![Logo](../../../en/adapterref/iobroker.nut/admin/nut.png)

![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/Apollon77/ioBroker.nut.svg)
![Anzahl der Installationen](http://iobroker.live/badges/nut-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.nut.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.nut.svg)
![Travis-CI](http://img.shields.io/travis/Apollon77/ioBroker.nut/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Apollon77/ioBroker.nut?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.nut.png?downloads=true)

# IoBroker.nut
[![Code Climate] (https://codeclimate.com/github/Apollon77/ioBroker.nut/badges/gpa.svg)](https://codeclimate.com/github/Apollon77/ioBroker.nut)

Dieser Adapter für ioBroker stellt eine Verbindung zu einem definierten NUT-Server her, um den Status und die Details einer verbundenen USV / USV in den Zuständen des ioRoker anzugeben, sodass sie dort verwendet werden können.

## Beschreibung der Parameter
### Host_ip
IP-Adresse des NUT-Servers. NUT muss im Servermodus ausgeführt werden und muss für den Computer zugänglich sein, auf dem der Iobroker NUT-Adapter ausgeführt wird. Überprüfen Sie daher die Firewall-Einstellungen, wenn Sie Probleme haben, und erlauben Sie den Zugriff. Wenn die USV lokal angeschlossen ist, können Sie auch 127.0.0.1 oder localhost verwenden.

### Host_port
Hafen von NUT. Der Standardport ist <b>3493</b>

### Ups_name
Name der USV, wie in der NUT-Konfiguration des NUT-Servers definiert. </ P> Hinweis: Wenn Sie eine Verbindung zu einer USV herstellen möchten, die an eine Synology-Diskstation angeschlossen ist, lautet der Name einfach "ups".

### Updateintervall
Intervall in Sekunden zum Aktualisieren der Daten. Der Standardwert ist 300s

## UPS-Monitor benachrichtigt
Enthalten ist ein kleines Linux-Shell-Skript bei scripts / nut-notify.sh, das in upsmon konfiguriert werden kann.

Das Skript benötigt Ausführungsrechte (chmod + x nut-notify.sh).

Es sollte zu /etc/nut/upsmon.conf hinzugefügt werden:

```
NOTIFYCMD "cd /opt/iobroker/;./nut-notify.sh"
```

Konfigurieren Sie zusätzlich alle relevanten Benachrichtigungsnachrichten wie:

```
NOTIFYFLAG ONLINE       SYSLOG+WALL+EXEC
NOTIFYFLAG ONBATT       SYSLOG+WALL+EXEC
NOTIFYFLAG LOWBATT      SYSLOG+WALL+EXEC
NOTIFYFLAG FSD          SYSLOG+WALL+EXEC
NOTIFYFLAG COMMOK       SYSLOG+WALL+EXEC
NOTIFYFLAG COMMBAD      SYSLOG+WALL+EXEC
NOTIFYFLAG SHUTDOWN     SYSLOG+WALL+EXEC
NOTIFYFLAG REPLBATT     SYSLOG+WALL+EXEC
NOTIFYFLAG NOCOMM       SYSLOG+WALL+EXEC
NOTIFYFLAG NOPARENT     SYSLOG+WALL+EXEC
```

Wichtig ist das hinzugefügte Flag "EXEC".

Ein einfaches Beispiel für ein nut-notify.sh-Skript ist:

```
#! /bin/sh
# NUT adapter notify script.

logger -t nut-notify "Notify iobroker $UPSNAME -> $NOTIFYTYPE"
/opt/iobroker/iobroker message nut notify "{\"upsname\":\"$UPSNAME\",\"notifytype\":\"$NOTIFYTYPE\"}"

```

## Fehlerbehebung
Wenn Sie Probleme haben und der Adapter die Daten nicht liefert, können Sie die beiden Skripts im Verzeichnis "test" der Adapterinstallation (normalerweise in node_modules / iobroker.nut / test relativ zu Ihrem iobroker-Installationsverzeichnis) zum Ausprobieren verwenden die Befehlszeile. Rufen Sie die Skripts mit "node Dateiname.js" auf, um die erwarteten Parameter anzuzeigen. </ P>

* **test_upslist.js** Stellt eine Verbindung zum NUT-Server her und gibt eine Liste der verfügbaren USV-Namen zurück
* **test_upsvars.js** Stellt eine Verbindung zu dem NUT-Server für eine definierte USV her und gibt eine Liste der verfügbaren USV-Variablen zurück

## Machen
* docs für die Webseite

## Changelog

### 1.1.3 (2018-04-13)
* Fix Admin

### 1.1.2 (2018-03-28)
* Fix status parsing

### 1.1.1
* Enhance error handling

### 1.1.0
* Add possibility to call commands on the UPS

### 1.0.0
* change mode from schedule to deamon
* implement message support to receive messages from upsmon
* add status.severity to get one status about the USV with values idle, operating, operating_critical, action_needed, unknown

### 0.3.0
* add better usable status states under "status" channel

### 0.2.1
* finalizied initial version

### 0.1.0
* initial release for testing

## License

The MIT License (MIT)

Copyright (c) 2016-2018 Apollon77 <ingo@fischer-ka.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.