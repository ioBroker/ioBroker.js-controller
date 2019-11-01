![Logo](admin/tino.png)
# ioBroker.tino

[![NPM version](http://img.shields.io/npm/v/iobroker.tino.svg)](https://www.npmjs.com/package/iobroker.tino)
[![Downloads](https://img.shields.io/npm/dm/iobroker.tino.svg)](https://www.npmjs.com/package/iobroker.tino)
[![Dependency Status](https://img.shields.io/david/bowao/iobroker.tino.svg)](https://david-dm.org/bowao/iobroker.tino)
[![Known Vulnerabilities](https://snyk.io/test/github/bowao/ioBroker.tino/badge.svg)](https://snyk.io/test/github/bowao/ioBroker.tino)

[![NPM](https://nodei.co/npm/iobroker.tino.png?downloads=true)](https://nodei.co/npm/iobroker.tino/)

**Tests:**: [![Travis-CI](http://img.shields.io/travis/bowao/ioBroker.tino/master.svg)](https://travis-ci.org/bowao/ioBroker.tino)

## TiNo adapter for ioBroker
(German version see below)

Read wireless sensordata received via TiNo Version 1.01

The wireless transceiver and receiver TiNo were developed by nurazur.

Project-page: https://nurazur.wordpress.com/

Github: https://github.com/nurazur/TiNo

The TiNo is the logical and consistent evolution of the TinyTX4/TinyRX4 wireless sensors.

* optimized battery life (5 years or more with a CR2032 battery)
* optimized range
* optimized safety
* optimized simplicity
* optimized reliability

The sensors are automatically created with their node-id after the first message reception. 
In addition, the associated offset data points are created under "config", so that the sensor values can be corrected if necessary.

The following data points would be created:

* NodeId
* RSSI
* Battery voltage
* Message Counter
* Temperature
* Offset Temperture (Correction value if necessary)
* Humidity
* Offset Humidity (Correction value if necessary)
* Flags
* FEI
* RFM69 Temperature
* Biterrors



-------------------------------------------------------------------------------------------

## TiNo adapter für ioBroker

Einlesen der vom TiNo Version 1.01 empfangenen Funksensordaten

Der Funksender und -empfänger TiNo wurden von nurazur entwickelt.

Projekt-Seite: https://nurazur.wordpress.com/

Github: https://github.com/nurazur/TiNo

Der TiNo ist die logische und konsequente Weiterentwicklung der TinyTX4/TinyRX4 Funksensoren.

* optimierte Batterielebensdauer (5 Jahre oder mehr mit einer CR2032 Batterie)
* optimierte Reichweite
* optimierte Sicherheit
* optimierte Einfachheit
* optimierte Zuverlässigkeit

Die Sensoren werden nach dem ersten Nachrichten-Empfang automatisch mit ihrer Node-Id angelegt.
Zusätzlich werden unter "config" die zugehörigen offset Datenpunkte erstellt, damit die Sensorwerte bei Bedarf korrigiert werden können.

Folgende Datenpunkte werden angelegt:

* NodeId
* RSSI
* Batteriespannung
* Nachrichtenzähler
* Temperatur
* Offset Temperatur (Korrekturwert bei Bedarf)     
* Feuchte
* Offset Feuchte (Korrekturwert bei Bedarf)
* Flags
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
