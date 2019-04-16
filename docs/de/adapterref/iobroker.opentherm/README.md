---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.opentherm/README.md
title: Opentherm Integration ioBroker
hash: a1i87p1mgoR34nXnuxf08RnAdUZkk3ydYZkPxDmiDw8=
---
![Alt-Text](https://raw.githubusercontent.com/DutchmanNL/ioBroker.opentherm/master/admin/opentherm_large.png)

![Alt-Text](https://travis-ci.org/iobroker-community-adapters/ioBroker.opentherm.svg?branch=master)
![Anzahl der Installationen](http://iobroker.live/badges/opentherm-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.opentherm.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.opentherm.svg)
![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.opentherm.svg)

# Opentherm-Integration ioBroker
Dieser Adapter integriert alle Funktionen des opentherm Gateways in ioBroker.
Opentherm ist ein Gateway-Protokoll, das von mehreren modernen Heizungssystemen wie Remeha verwendet wird.

Weitere Informationen finden Sie unter http://otgw.tclcode.com/index.html#intro mit allen Credits an die Entwickler.

### Featured Funktionalität im Endzustand:
* Stellen Sie einen TCP / IP-Relay-Server bereit, um die Verbindung anderer OpenTherm-Monitorsoftware durch diese Instanz zu ermöglichen (wenn eine direkte USB-Verbindung verwendet wird).
* Passen Sie nach Möglichkeit Werte in ioBroker an und senden Sie den Befehl an Opentherm
* Bitte zögern Sie nicht, Funktionsanfragen hinzuzufügen

Derzeit implementiert
* Stellen Sie über TCP / IP eine Verbindung zu OpenTherm Gateway her
* Stellen Sie über eine USB-Verbindung eine direkte Verbindung zum OpenTherm Gateway her

## Machen
* Verbinden Sie sich über eine USB-Verbindung direkt mit dem OpenTherm Gateway
* Stellen Sie einen TCP / IP-Relay-Server bereit, um die Verbindung anderer OpenTherm-Monitorsoftware durch diese Instanz zu ermöglichen (wenn eine direkte USB-Verbindung verwendet wird).
* Woher

## Changelog
### 0.2.0
* Fix translations

### 0.1.9
* Implemented direct connection by USB
* added configuration options to adapter settings
* Fixed issue for incorrect logging

### 0.1.8
* Fixed issue for incorrect object type (boolean/number/string)
* Implemented rounding states to 1 digit after comma

### 0.1.7
* implemented Developer mode (all states for all message types will be created in _Dev
* Implemented Developer Logging mode (if not activated no information is written to log !)
* Several small backend fixes

### 0.1.6
* Creation of logical channels
* creation of states
* reduced logging, all received messages still in log during beta for data gathering
* creation of definition file (please feel free to provide input)

### 0.1.0
* Data reading by TCP connection to logfile 

### 0.0.1
* (Dutchman) initial commit

## License
MIT License

Copyright (c) 2019 DutchmanNL

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