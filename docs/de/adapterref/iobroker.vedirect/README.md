---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vedirect/README.md
title: ioBroker.vedirect
hash: xB+rOCOuY6hia3dBJqbIlFGSYKosLiHFRDaoB3jYDSg=
---
![Logo](../../../en/adapterref/iobroker.vedirect/admin/vedirect.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.vedirect.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vedirect.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/iobroker-community-adapters/iobroker.vedirect.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.vedirect/badge.svg)
![NPM](https://nodei.co/npm/iobroker.vedirect.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.vedirect/master.svg)

# IoBroker.vedirect
## Vedirekter Adapter für ioBroker
Lesen Sie VE.direct-Daten von einem Victron-Gerät mit vedirect-Anschluss über eine serielle USB-Verbindung <->.

### Aufbau
Stellen Sie das richtige Gerät (Beispiel / dev / ttyUSB0) in der Adapterkonfiguration ein.

## Changelog

### 0.1.0
* (Andiling) error in device modes corrected

### 0.0.9
* (Andiling) improve state attributes

### 0.0.8
* (DutchmanNL) set connection state to false when no data received for 10 seconds
* (DutchmanNL & Andiling) reconnect to USB when connection lost
* (DutchmanNL & Andiling) Update state attributes

### 0.0.7
* (DutchmanNL & Andiling) Alpha release

## License
MIT License

Copyright (c) 2019 DutchmanNL <rdrozda@hotmail.com>

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