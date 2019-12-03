---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.worx/README.md
title: ioBroker.worx
hash: Ivpn1zre1xc7fA6qtZmIA7xfvR3u8CW+qSHXYCvy6Ug=
---
![Logo](../../../en/adapterref/iobroker.worx/admin/worx.png)

![Anzahl der Installationen](http://iobroker.live/badges/worx-installed.svg)
![stabile Version](http://iobroker.live/badges/worx-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.worx.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.worx.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/iobroker-community-adapter/ioBroker.worx/badge.svg)
![NPM](https://nodei.co/npm/iobroker.worx.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/iobroker-community-adapter/ioBroker.worx/master.svg)

# IoBroker.worx
[![Abhängigkeiten Status] (https://david-dm.org/iobroker-community-adapter/iobroker.worx/status.svg)](https://david-dm.org/iobroker-community-adapter/iobroker.worx)

## Worx Adapter für ioBroker
Steuerung über Cloud und MQTT

Dieser Adapter verbindet ioBroker über die Cloud mit Ihrem Landroid S / M / L.
Temperaturen, Mähzeiten, Batteriestand und verschiedene andere Daten werden vom Mäher ausgelesen. Der Adapter kann den Mäher steuern und Sie können Konfigurationsparameter wie Mähzeiten ändern.

<img src="admin/worx_ada2.png" alt="Zeichnung" width="100%"/>

## Die Einstellungen
- Um sich mit dem Mäher zu verbinden, geben Sie E-Mail und Passwort von Ihrem worx-Konto in der Konfiguration ein.
- Verzögerung für Kantenschnitt: Wenn der Kantenschnitt in einer Kurve oder Kurve beginnt, kann der Rasenmäher den Draht verlieren und mit einem Fehler anhalten, oder die Messer drehen sich möglicherweise nicht. Zu diesem Zweck kann der Startpunkt eingestellt werden, an dem sich die Schaufeln zu drehen beginnen.

## Changelog
### 1.0.0 (03.12.2019)
* (MeisterTR) bump Version
* (MeisterTR) transfer to community
### 0.4.0 (03.08.2019)
* (MeisterTR) fix multimower
* (MeisterTR) change loglevel
* (MeisterTR) fix online Status

### 0.3.1 (12.06.2019)
* (MeisterTR) add delay for edgecut in config
* (MeisterTR) fix mowtime error

### 0.2.0 (01.06.2019)
* (MeisterTR) add border
* (MeisterTR) fix small errors
* (MeisterTR) code cleanup
### 0.0.1
* (MeisterTR) initial release

## License
MIT License

Copyright (c) 2019 MeisterTR

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