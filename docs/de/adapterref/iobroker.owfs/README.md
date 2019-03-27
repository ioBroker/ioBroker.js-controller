---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.owfs/README.md
title: ioBroker-OWFS-Adapter
hash: w4iaPF0/v9YW60yr3gLQaEQPm5p2VBWypsVIKvgvFQk=
---
![Logo](../../../en/adapterref/iobroker.owfs/admin/owfs.png)

![Anzahl der Installationen](http://iobroker.live/badges/owfs-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.owfs.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.owfs.svg)
![NPM](https://nodei.co/npm/iobroker.owfs.png?downloads=true)

# IoBroker OWFS-Adapter
## * Einadernes Dateisystemadapter für ioBroker.
Unterstützt

Dieser Adapter verwendet die owfs-Bibliothek von https://www.npmjs.com/package/owjs und erfordert dementsprechend einen owfs-Server.

## Installieren Sie OWFS Linux
```sudo apt-get install owfs```

Manchmal müssen Sie folgende Schritte schreiben:

- Starten des Servers zur Kommunikation über die serielle Schnittstelle mit 1-Draht-Sensoren

```
owserver -d "/dev/ttyUSB0" --nozero
```

* / dev / ttyUSB0 * ist der Name Ihres seriellen Geräts. Hier wurde ein USB-Stick verwendet.

Dieser Befehl startet den 1-Wire-Server am lokalen Port 4304.

- Um die Daten vom lokalen 1wire-Server im Dateisystem aufzurufen, rufen Sie den folgenden Befehl auf:

```
owfs -C -m /mnt/1wire --allow_other
```

Bevor Sie den Direktzug */ mnt / 1wire* mit dem Befehl `mkdir /mnt/1wire` erstellen müssen

## Installieren Sie OWFS-Fenster
http://sourceforge.net/projects/owfs/

## Installieren
```node iobroker.js add owfs```

## Aufbau

## Changelog
### 0.5.0 (2018-03-16)
* (bluefox) Ready for Admin3

### 0.4.1 (2017-05-29)
* (ausHaus) fix translations

### 0.4.0 (2017-02-26)
* (bluefox) support iButtons

### 0.3.4 (2016-08-28)
* (bluefox) filter out service entries by list

### 0.3.3 (2016-08-25)
* (bluefox) custom poll interval for every sensor

### 0.3.2 (2016-08-24)
* (bluefox) support of local OWFS via file system

### 0.2.2 (2016-07-29)
* (bluefox) add new datapoints: pressure, volts, ...

### 0.2.1 (2016-07-28)
* (bluefox) fixes of write

### 0.2.0 (2016-07-27)
* (bluefox) discover sensors
* (bluefox) use other npm library to fix write

### 0.1.1 (2016-07-25)
* (bluefox) check configuration

### 0.1.0 (2016-07-08)
* (bluefox) remove rooms
* (bluefox) fix creation of states
* (bluefox) convert states to numbers
* (bluefox) support of quality codes

### 0.0.1 (2014-11-02)
* (bluefox) support of server (actual no authentication)

## License

The MIT License (MIT)

Copyright (c) 2015-2018, bluefox

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.