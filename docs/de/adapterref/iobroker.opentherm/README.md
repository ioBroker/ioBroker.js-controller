---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.opentherm/README.md
title: ioBroker.opentherm
hash: TT07Q6Qq2KXWMzdu39Uyobzc+G9cSxBhxbb0CaseEWc=
---
![Logo](../../../en/adapterref/iobroker.opentherm/admin/opentherm.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.opentherm.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.opentherm.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/opentherm-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/opentherm-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/iobroker-community-adapters//iobroker.opentherm.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/iobroker-community-adapters//ioBroker.opentherm/badge.svg)
![NPM](https://nodei.co/npm/iobroker.opentherm.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/iobroker-community-adapters//ioBroker.opentherm/master.svg)

# IoBroker.opentherm
Dieser Adapter integriert alle Funktionen des opentherm-Gateways in ioBroker.
Opentherm ist ein Gateway-Protokoll, das von mehreren modernen Heizsystemen wie Remeha verwendet wird.

Weitere Informationen finden Sie unter http://otgw.tclcode.com/index.html#intro mit allen Credits an die Entwickler.

### Empfohlene Funktionalität im Endzustand:
* Stellen Sie einen TCP / IP-Relay-Server bereit, um die Verbindung anderer OpenTherm-Überwachungssoftware durch diese Instanz zu ermöglichen (wenn eine direkte USB-Verbindung verwendet wird).
* Passen Sie nach Möglichkeit die Werte in ioBroker an und senden Sie den Befehl an Opentherm
* Sie können gerne Funktionsanfragen hinzufügen

### Derzeit implementiert
* Stellen Sie über TCP / IP eine Verbindung zum OpenTherm Gateway her
* Stellen Sie eine direkte Verbindung zum OpenTherm Gateway über eine USB-Verbindung her

## Machen
* Stellen Sie eine direkte USB-Verbindung zu OpenTherm Gateway her
* Stellen Sie einen TCP / IP-Relay-Server bereit, um die Verbindung anderer OpenTherm-Überwachungssoftware durch diese Instanz zu ermöglichen (wenn eine direkte USB-Verbindung verwendet wird).
* Wo

## Unterstütze mich
Wenn Ihnen meine Arbeit gefällt, können Sie gerne eine persönliche Spende leisten (dies ist ein persönlicher Spendenlink für DutchmanNL, keine Beziehung zum ioBroker-Projekt!) [![Spenden] (https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Changelog

### 0.2.3
* Adapter fully rebuilded

### 0.2.2
* Fix read TCP/IP data (svenp)

### 0.2.1
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

Copyright (c) 2020 DutchmanNL <rdrozda86@gmail.com>

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