---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.rflink/README.md
title: ioBroker.rflink
hash: fOLV3hxnf3yiy6S2DVszj9dhcNECmsFlSXR8tJTeMu4=
---
![Logo](../../../en/adapterref/iobroker.rflink/admin/rflink.png)

![Anzahl der Installationen](http://iobroker.live/badges/rflink-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.rflink.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.rflink.svg)
![Tests](https://travis-ci.org/ioBroker/ioBroker.rflink.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.rflink.png?downloads=true)

# IoBroker.rflink ===================
Dieser Adapter kommuniziert mit [rflink](http://www.nemcon.nl/blog2/), die auf Arduino Mega- und RFC 433MHz / 866MHz / 2,6Gz-Kommunikation aufbauen.
Dient zum Empfangen der Daten von Wettersensoren und drahtlosen Leistungsschaltern.

## Voraussetzungen
Um die serielle Schnittstelle unter Windows verwenden zu können, muss VS die Binärdatei erstellen.
Um die serielle Schnittstelle unter Linux verwenden zu können, ist der Build-Essential erforderlich. Um es zu installieren, schreiben Sie einfach:

```
sudo apt-get update
sudo apt-get install build-essential -y
```

## Verwendungszweck
Um das Lernen von Sensoren zu ermöglichen, müssen Sie "Inclusion Mode" aktivieren. Der Einschlussmodus ist standardmäßig für 5 Minuten (300000 ms) aktiviert und wird nach 5 Minuten automatisch deaktiviert.

Um den Einschlussmodus für immer zu aktivieren, setzen Sie "Einschluss-Timeout" einfach auf 0.

## Paar
Die Geräte erhalten die neue Adresse bei jedem Batteriewechsel.

Nach dem Batteriewechsel muss also neu gelernt werden.

Drücken Sie dazu vor dem Einlegen der Batterie die Pair-Taste und das Gerät wird mit der neuen Adresse eingelernt.

## Automatisches Pairing
Wenn Sie nicht so viele Sensoren in der Nähe haben, können Sie die automatische erneute Kopplung aktivieren.

Dies ist nur möglich, wenn das Gerät eindeutig identifiziert werden kann.

Das bedeutet, dass nur ein Gerät mit dieser Marke und diesem Typ vorhanden ist. (ZB nur ein Temperatursensor einer Marke)

Wenn das System mehr als ein Gerät mit einem solchen Parameter erkennt, wird der automatische Kopplungsmodus automatisch deaktiviert und problematische Sensoren werden mit Blitzlicht angezeigt.

## Rohbefehle senden
Der Benutzer hat die Möglichkeit, rohe Befehle an das Gerät zu senden. Schreiben Sie einfach Ihren Befehl in das in [Hier](http://www.nemcon.nl/blog2/protref) beschriebene Formular.

E.g: ```10;AB400D;00004d;1;OFF;```. Bitte lesen Sie die Dokumentation, um die Befehle zu verstehen.

## Changelog
### 1.2.0 (2018-01-23)
* (Apollon77) Upgrade Serialport Library

### 1.1.6 (2017-10-08)
* (Apollon77) Fix parsing for Wind-Direction

### 1.1.5 (2017-05-23)
* (Apollon77) Upgrade Serialport Library for compatibility to node 6.x

### 1.1.4 (2017-04-15)
* (bluefox) Fix the rain calculation

### 1.1.3 (2017-04-11)
* (bluefox) Allow flash on node.js < 5

### 1.1.2 (2017-04-10)
* (bluefox) Fix the wind gist calculation

### 1.1.0 (2017-02-03)
* (bluefox) Add stop for blinds

### 1.0.8 (2017-01-20)
* (bluefox) fix KWATT calculation for Oregon CM180

### 1.0.6 (2016-12-15)
* (bluefox) Support of raw commands
* (bluefox) Support MiLightv1 commands
* (Apollon77) update serialport library for node 6.x compatibility

### 1.0.5 (2016-11-11)
* (bluefox) Read newest sketch from web

### 1.0.2 (2016-10-23)
* (bluefox) Flashing of sketch into arduino
* (bluefox) Set_level from 1 to 15
* (bluefox) show version of sketch

### 0.2.1 (2016-10-19)
* (bluefox) Fix for SET_LEVEL

### 0.2.0 (2016-10-18)
* (bluefox) Fix write of commands

### 0.1.4 (2016-10-18)
* (bluefox) Fix the last changed time indication

### 0.1.3 (2016-10-17)
* (bluefox) initial commit