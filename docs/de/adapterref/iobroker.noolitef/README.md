---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.noolitef/README.md
title: kein Titel
hash: B5JnlYalarEEnghafNr5XCZmGG2xU8YxxnmSYwTu9H0=
---
![NPM-Version](http://img.shields.io/npm/v/iobroker.noolitef.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.noolitef.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/paveltsytovich/iobroker.noolitef.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/paveltsytovich/ioBroker.noolitef/badge.svg)
![NPM](https://nodei.co/npm/iobroker.noolitef.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/paveltsytovich/ioBroker.noolitef/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/paveltsytovich/ioBroker.noolitef?branch=master&svg=true)

<h1><img src="admin/noolitef.png" width="64"/> ioBroker.noolitef </h1>

## Noolitef Adapter für ioBroker
Dieser Adapter hat das Noolite-F-Gerät in iobroker integriert

## Verwendung
* Zur Installation lesen Sie bitte [Installationsanleitung] (/ docs / install.md)
* Um diesen Adapter mit ioBroker-Szenarien zu verwenden, lesen Sie bitte [Programmierhandbuch] (/ docs / Programmierung.md).

## Changelog

### 0.0.1
* (Pavel Tsytovich) initial release. Base function for Noolite-F protocol

### Known problem and TODO

* MQTT not supported yet
* Request and receive state from SUF device not supported yet
* In LED RGB state brigthness not used. It is bug. Fix in future versions
* Timeout between send Noolite command is fixed now. It is occur some problem in different situation
* In device list protocol must be Noolite-F constantly. Use Noolite protocol only for binding or unbinding operation. This problem will solve in near future version

## License
MIT License

Copyright (c) 2020 Pavel Tsytovich <pavel.tsytovich@gmail.com>

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