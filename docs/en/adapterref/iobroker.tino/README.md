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

Read wireless sensordata received via TiNo Protocol Version 1.01 and TiNo Protocol Version 2.0.
The corresponding protocol version is automatically detected on the basis of the received data.

The wireless transceiver and receiver TiNo were developed by nurazur.

Project-page: https://nurazur.wordpress.com/

Github: https://github.com/nurazur/TiNo

"**TI**ny **NO**de": battery powered wireless sensor or wireless actor. Target of the project is the development of small size , cost effective battery powered wireless sensors. The sensors communicate with gateways, like a raspberry pi. The targets are:

* low cost (BOM under 5 Euro)
* very small size (matchbox)
* ultra low sleep current
* long battery life time: 5 years and more on a CR2032 cell
* long range (what ever this means :-), but its realy long)
* simple to build up
* communication security
* Plug&Play Firmware

Sensors can be almost any, like temperature, relative humidity, air pressure, altitude meter, light intensity, UV Index, movement detectors, Reed switches, etc.

In the adapter configuration, the serial interface and the associated baud rate can be set.
When the learning mode has been activated, the sensors are automatically created with their node-id and all recognized data points after the first message reception.
The learning mode ends automatically after 10 minutes and can be reactivated for another 10 minutes under "info" via datapoint "learningMode".
The associated offset data points are created under "config", so that the sensor values can be corrected if necessary.
The calculated data points humidity absolute and dew point are created under "calculated", but only if the sensor supplies the values temperature and relative humidity.

The following data points would be created for receiver protocol Version 1.01:

* NodeId
* RSSI
* Battery voltage
* Message Counter
* Temperature
* Humidity
* Heartbeat (Only in Protocol Version 1.01)
* Interupt 1, 2 and 3
* Frequency error indicator (Only in Protocol Version 1.01)
* RFM69 Temperature (Only in Protocol Version 1.01)
* Bit errors

In addition, the following data points are created for the receiver protocol version 2.0 (if available).

* Interrupt 4 to 8
* synchronized
* Link quality Indicator
* Frequency offset
* Distance (Only with distance sensor installed)
* Height (Only with height sensor installed)
* Air pressure (Only with air pressure sensor installed)
* Contact (Only with reed contact installed)


-------------------------------------------------------------------------------------------

## TiNo adapter für ioBroker

Einlesen der vom TiNo Version 1.01 und TiNo Version 2.0 empfangenen Funksensordaten.
Die entsprechende Protokoll-Version wird automatisch anhand der empfangen Daten erkannt. 

Der Funksender und -empfänger TiNo wurden von nurazur entwickelt.

Projekt-Seite: https://nurazur.wordpress.com/

Github: https://github.com/nurazur/TiNo

"**TI**ny **NO**de" : Batteriebetriebener Funksensor oder Funk-Aktor. Ziel dieses Projekts ist die Entwicklung schnurloser Funk Sensoren, die über Batterien versorgt werden und z.B. mit dem Raspberry Pi kommunizieren. Die Entwicklung hat zum Ziel:

* minimale Kosten (Stückkosten unter 5 EUR)
* minimale Grösse (Streichholzschachtel)
* minimaler Stromverbrauch
* maximale Batterielebensdauer (5 Jahre oder mehr)
* maximale Reichweite
* maximal einfach nachzubauen
* Plug&Play Firmware

Als Sensor kann man so ziemlich alles verwenden, ob Temperatur, Luftfeuchtigkeit, Luftdruck, Höhenmesser, Lichtintensität, UV Index, Anwesenheitssensoren, Magnetschalter, Erschütterungs-Sensoren, Feuchtigkeitsmesser usw also im Prinzip alle Arten von Sensoren.

In der Adapter Konfiguration lässt sich die Serielle Schnittstelle und die zugehörige Baudrate einstellen.
Wenn der Anlermodus aktiviert ist, werden die Sensoren nach dem ersten Nachrichten-Empfang automatisch mit ihrer Node-Id und allen erkannten Datenpunkten angelegt.
Der Anlernmodus wird nach 10min. automatisch beendet und kann unter "info" über den Datenpunkt "learningMode" für weitere 10min. erneut aktiviert werden.
Unter "config" werden die zugehörigen offset Datenpunkte erstellt, damit die Sensorwerte bei Bedarf korrigiert werden können.
Unter "calculated" werden die erechneten Datenpunkte Feuchte absolut und Taupunkt angelegt, jedoch nur wenn der Sensor die Werte Temperatur und relative Feuchte liefert.

Folgende Datenpunkte werden für das Empfänger-Protokoll Version 1.01 angelegt:

* NodeId
* Signalstärke (RSSI)
* Batteriespannung
* Nachrichtenzähler
* Temperatur
* Feuchte
* Heartbeat (Nur in Protokoll Version 1.01)
* Interrupts 1 bis 3
* Frequenzfehler Indikator (Nur in Protokoll Version 1.01)
* RFM69 Temperatur (Nur in Protokoll Version 1.01)
* Bitfehler

zusätzlich werden für das Empfänger-Protokoll Version 2.0 folgende Datenpunkte angelegt (wenn vorhanden).

* Interrupt 4 bis 8
* Synchronisation
* Kanalgüte
* Frequenzversatz
* Entfernung (Nur bei installiertem Entfernungssensor)
* Höhe (Nur bei installiertem Höhensensor)
* Luftdruck (Nur bei installiertem Luftdrucksensor)
* Reed-Kontakt (Nur bei installiertem Reed-Kontakt)


## Changelog
### 1.0.0
- Update dependencies
- BREAKING CHANGE: Drop node 8 support, requires node 10 or above
- BREAKING CHANGE: js-controller v2.4.0 or above required

### 0.1.3
- Update travis.yml, License, Readme

### 0.1.2
- (bowao) learningMode set to true if not defined

### 0.1.1
- (bowao) New learning mode with 10min. auto-timeout

### 0.1.0
- (bowao) Add tino protocol V2.0 support
- (bowao) Add option to search new data points on already created sensors
- (bowao) Add calculated data points humidity_absolute and dew point

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

Copyright (c) 2020 bowao <cryolab@web.de>

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
