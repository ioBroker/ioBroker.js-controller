---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tino/README.md
title: ioBroker.tino
hash: Jsy7pGbLgbQrUXPWGCOXwH9kDfkuCeYCNcl/OjDrB3c=
---
![Logo](../../../en/adapterref/iobroker.tino/admin/tino.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.tino.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tino.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/bowao/iobroker.tino.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/bowao/ioBroker.tino/badge.svg)
![NPM](https://nodei.co/npm/iobroker.tino.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/bowao/ioBroker.tino/master.svg)

# IoBroker.tino
## TiNo Adapter für ioBroker
(Deutsche Version siehe unten)

Liest drahtlose Sensordaten, die über TiNo Version 1.01 empfangen wurden

Der drahtlose Transceiver und Empfänger TiNo wurden von nurazur entwickelt.

Projektseite: https://nurazur.wordpress.com/

Github: https://github.com/nurazur/TiNo

Der TiNo ist die logische und konsequente Weiterentwicklung der drahtlosen TinyTX4 / TinyRX4-Sensoren.

* Optimierte Batterielebensdauer (5 Jahre oder mehr mit einer CR2032-Batterie)
* Optimierte Reichweite
* optimierte Sicherheit
* Optimierte Einfachheit
* Optimierte Zuverlässigkeit

Die Sensoren werden nach dem ersten Nachrichtenempfang automatisch mit ihrer Node-ID angelegt.
Zusätzlich werden die zugehörigen Offsetdatenpunkte unter "config" angelegt, damit die Sensorwerte bei Bedarf korrigiert werden können.

Die folgenden Datenpunkte würden erstellt:

* NodeId
* RSSI
* Batteriespannung
* Nachrichtenzähler
* Temperatur
* Offset Temperture (Korrekturwert falls erforderlich)
* Feuchtigkeit
* Offset-Luftfeuchtigkeit (Korrekturwert falls erforderlich)
* Flaggen
* FEI
* RFM69-Temperatur
* Biterrors

-------------------------------------------------------------------------------------------

## TiNo Adapter für ioBroker
Einlesen der vom TiNo Version 1.01 empfangenen Funksensordaten

Der Funksender und -empfänger TiNo wurden von nurazur entwickelt.

Projekt-Seite: https://nurazur.wordpress.com/

Github: https://github.com/nurazur/TiNo

Der TiNo ist die logische und konsequente Weiterentwicklung der TinyTX4 / TinyRX4 Funksensoren.

* optimierte Batterielebensdauer (5 Jahre oder mehr mit einer CR2032 Batterie)
* optimierte Reichweite
* optimierte Sicherheit
* optimierte Einfachheit
* optimierte Zuverlässigkeit

Die Sensoren werden nach dem ersten Nachrichten-Empfang automatisch mit ihrer Node-Id angelegt.
Zusätzlich werden unter "config" die zugehörigen Offset-Datenpunkte erstellt, damit die Sensorwerte bei Bedarf korrigiert werden können.

Folgende Datenpunkte werden angelegt:

* NodeId
* RSSI
* Batteriespannung
* Nachrichtenzähler
* Temperatur
* Offset Temperatur (Korrekturwert bei Bedarf)
* Feuchte
* Offset Feuchte (Korrekturwert bei Bedarf)
* Flaggen
* FEI
* RFM69 Temperatur
* Biterrors

## Changelog

### 0.0.5
- (bowao) Add datapoints interrupt an heartbeat
- (bowao) Set default baudrate to 38400
- (bowao) Close serialport on unload and cleanup

### 0.0.4
- (bowao) Resize logo

### 0.0.3
- (bowao) Update readme

### 0.0.2
- (nurazur) Add logo

### 0.0.1
- (bowao) initial release

## License
MIT License

Copyright (c) 2019 bowao

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