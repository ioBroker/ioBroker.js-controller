---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.devices/README.md
title: ioBroker.devices
hash: Y04evJLVzOEM5HChNnb2Dvb8OVXBXmMD5qJ/0gxhE88=
---
![Logo](../../../en/adapterref/iobroker.devices/admin/devices.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.devices.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.devices.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/ioBroker/iobroker.devices.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/ioBroker/ioBroker.devices/badge.svg)
![NPM](https://nodei.co/npm/iobroker.devices.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/ioBroker/ioBroker.devices/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/ioBroker/ioBroker.devices?branch=master&svg=true)

# IoBroker.devices
## Geräteadapter für ioBroker
Verwalten und erstellen Sie Geräte für die Verwendung in anderen Adaptern wie Material, iot, ...

** Wichtig: Registerkarte im Administrator aktivieren, z. B. Protokoll und Skripte **

![Bildschirm](../../../en/adapterref/iobroker.devices/img/screen.png)

** Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. **

## Machen
- Fügen Sie Symbole für alle Zustände von Kanälen hinzu
- Beschreibungen für Zustände hinzufügen
- Fehler für Google / Alisa / Alexa anzeigen
- Klonen Sie ein vorhandenes Gerät in linkeddevices / alias / javascript
- Erkennen, ob js-controller 2.0 installiert ist

## Changelog

### 0.3.6 (2020-04-17)
* (Apollon77) Added Sentry error reporting for Frontend/React

### 0.3.5 (2020-04-17)
* (Apollon77) Fixed typo

### 0.3.4 (2020-03-24)
* (bluefox) Fixed error by device creation

### 0.3.2 (2020-02-09)
* (Apollon77) usage with all kinds of admin ports and reverse proxies optimized

### 0.3.1 (2020-02-09)
* (Apollon77) compatibility with Admin >4.0.0 added

### 0.2.0 (2019-12-20)
* (bluefox) Backend was removed

### 0.1.8 (2019-11-13)
* (bluefox) Allowed the clone of devices

### 0.1.7 (2019-09-15)
* (bluefox) work in progress

### 0.1.2 (2019-09-04)
* (bluefox) work in progress

### 0.1.0 (2019-08-31)
* (bluefox) initial release

## License
MIT License

Copyright (c) 2019 bluefox <dogafox@gmail.com>

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