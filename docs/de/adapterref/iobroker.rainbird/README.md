---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.rainbird/README.md
title: ioBroker.rainbird
hash: KvmP8NrJCEwT8wxVoeV2M2i8GBVTL6MnskcixnV3WQY=
---
![Logo](../../../en/adapterref/iobroker.rainbird/admin/rainbird.png)

![Anzahl der Installationen](http://iobroker.live/badges/rainbird-installed.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.rainbird.svg)
![NPM](https://nodei.co/npm/iobroker.rainbird.png?downloads=true)
![Stabil](http://iobroker.live/badges/rainbird-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.rainbird.svg)
![Build-Status](https://travis-ci.org/StrathCole/ioBroker.rainbird.svg?branch=master)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

# IoBroker.rainbird
Ein ioBroker-Adapter für Rain Bird mit LNK-WLAN-Adapter. Dieses Projekt ist nicht mit Rain Bird verbunden.

Basierend auf der Python-Bibliothek "pyrainbird" von https://github.com/jbarrancos/pyrainbird und vollständig auf NodeJS portiert. Der Adapter stellt über eine WiFi-Verbindung eine direkte Verbindung zum Gerät her und verwendet den Rain Bird-Clouddienst nicht.

## Zustände
`rainbird.X.device.commands.advanceZone` - Wenn das aktuelle Programm ausgeführt wird, fahren Sie mit der nächsten Bewässerungszone fort und stoppen Sie die aktuelle.
`rainbird.X.device.commands.runProgram` - Führen Sie das angegebene Programm manuell (1 bis X) aus, wie zuvor im Gerät konfiguriert.
`rainbird.X.device.commands.stopIrrigation` - Bewässerung in allen Zonen sofort stoppen.

`rainbird.X.device.irrigation.active` - Die Bewässerung ist derzeit aktiv. Wenn false, kann dies bedeuten, dass Sie den Schalter am Gerät auf "Stop" stellen.
`rainbird.X.device.irrigation.station` - Nummer der Zone, die derzeit bewässert wird.

`rainbird.X.device.sensors.rain` - True, wenn ein Regensensor angeschlossen ist und Regen erkannt wird.

`rainbird.X.device.settings.rainDelay` - Die für das Gerät eingestellte aktuelle Bewässerungsverzögerung (in Tagen).
`rainbird.X.device.settings.seasonalAdjust` - Die aktuelle saisonale Anpassung an das Wasserbudget.

`rainbird.X.device.stations.Y.available` - True, wenn Zone Y im Gerät verfügbar ist.
`rainbird.X.device.stations.Y.irrigation` - True, wenn Zone Y derzeit bewässert wird.
`rainbird.X.device.stations.Y.remaining` - Verbleibende Bewässerungszeit in Sekunden `rainbird.X.device.stations.Y.runZone` - Bewässerung in Zone Y für die angegebene Anzahl von Minuten manuell durchführen.
`rainbird.X.device.stations.Y.testZone` - Testzone Y.

## Spenden
[![paypal] (https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SFLJ8HCW9T698&source=url)

## Changelog

### 0.2.3

-   Fixed problem with sensor data
-   Added seasonal water budget adjust information

### 0.2.2

-   Added fixes for adapter crashes on failed connection to controller

### 0.2.1

-   Added support for run times on different controller model
-   Less polling for some states to reduce requests to controller

### 0.2.0

-   Added remaining irrigation time of zone
-   Fixed bug in decoding responses

### 0.1.2

-   Fixed adapter stalling on connection timeout

### 0.1.1

-   Smaller fixes

### 0.1.0

-   First running Version

## License

The MIT License (MIT)

Copyright (c) 2020 Marius Burkard

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