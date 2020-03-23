---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.robonect/README.md
title: ioBroker.robonect
hash: 2g+4CkiBh7gPjDcSVR5f3KIb1fznPovNq5EAee0reqs=
---
![Logo](../../../en/adapterref/iobroker.robonect/admin/robonect.png)

![Build-Status](https://ci.appveyor.com/api/projects/status/yl79oamamifjvqrq?svg=true)
![Anzahl der Installationen](http://iobroker.live/badges/robonect-stable.svg)

# IoBroker.robonect
Dies ist ein ioBroker-Adapter für Ihren Robonect HX-fähigen Rasenmäher. Es wurde mit Robonect v1.1b (mit ZeroConf v1.4) und einem Gardena R70Li getestet.

## Die Einstellungen
* Es ist erforderlich, die IP-Adresse des Robonect-Moduls einzugeben. Falls Benutzername und Passwort festgelegt sind, sind diese ebenfalls erforderlich.
* ioBroker.robonect fragt Daten in verschiedenen Intervallen ab: Standardmäßig werden Statusinformationen alle 60 Sekunden (1 Minute) und andere Informationen alle 900 Sekunden (15 Minuten) abgefragt.
* Für jede API-Anfrage kann das Abfrageintervall (Status oder Info) ausgewählt oder überhaupt nicht abgefragt werden.

## Steuerung
### Modus
Der Modus des Rasenmähers kann durch Ändern von robonect.0.status.mode gesteuert werden. Mögliche Modi sind "Auto", "Home", "Manuell", "Tagesende" und "Job" (derzeit nicht vollständig implementiert).

### Erweiterungen
Es ist möglich, die Erweiterungen GPIO 1, GPIO 2, OUT 1 und OUT 2 des Robonect-Moduls zu steuern. Voraussetzung ist, dass der Modus der Erweiterung über die Robonect Web-UI als "API" konfiguriert ist. Wenn beispielsweise LEDs an OUT1 angeschlossen sind, können Sie diese nachts ein- und morgens ausschalten, indem Sie Robonect.0.extension.out1.status auf "true" oder "false" setzen.

## Changelog
### 0.0.9
* (braindead1) adapter improvements

### 0.0.8
* (braindead1) fixed some issues caused by different configurations

### 0.0.7
* (braindead1) prepared adapter for latest repository

### 0.0.6
* (braindead1) fixed minor issues

### 0.0.5
* (braindead1) updated to work with Robonect HX version 1.1b

### 0.0.4
* (braindead1) updated to work with Robonect HX version 1.0 Beta5

### 0.0.3
* (braindead1) support of Admin3

### 0.0.2
* (braindead1) updated to work with Robonect HX version 1.0 Beta2

### 0.0.1
* (StefSign) initial commit

## License
The MIT License (MIT)

Copyright (c) 2020 braindead1

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