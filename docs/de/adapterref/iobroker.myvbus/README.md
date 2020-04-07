---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.myvbus/README.md
title: ioBroker.myvbus
hash: yxVtgxq/SxahbvABi0FHjG+ybv/RSx9gFAvbDwQ53fU=
---
# IoBroker.myvbus
![Logo](../../../en/adapterref/iobroker.myvbus/admin/myvbus.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.myvbus.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.myvbus.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/myvbus-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/myvbus-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/iobroker-community-adapters/iobroker.myvbus.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.myvbus/badge.svg)
![NPM](https://nodei.co/npm/iobroker.myvbus.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.myvbus/master.svg)
![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.myvbus.svg)

## IoBroker Adapter für Resol VBus
Dieser ioBroker-Adapter stellt über resol-vbus, eine JavaScript-Bibliothek zur Verarbeitung von RESOL VBus-Daten von Daniel Wippermann, eine Verbindung zu verschiedenen VBus-basierten Geräten her.
<https://github.com/danielwippermann/resol-vbus> <https://www.npmjs.com/package/resol-vbus>

## Eigenschaften
* Ermöglicht den Zugriff auf verschiedene RESOL (R) VBus (R) -Geräte mithilfe von DL3- oder DL2-Datenloggern, KM2-Kommunikationsmodul, VBus / LAN-Schnittstellenadapter oder Serial / LAN-Gateways lokal über TCP / IP. Der Gerätezugriff über den VBus / USB-Schnittstellenadapter oder DLx / KMx über VBus.net (R) wird ebenfalls unterstützt.
* Verarbeitet Live-VBus-Datenströme und stellt sie als ioBroker-Status zur Verfügung.
* Die Werte werden mit einer konfigurierbaren Zykluszeit aktualisiert.

## Rechtliche Hinweise
RESOL, VBus, VBus.net, DeltaSol und andere sind Marken oder eingetragene Marken der RESOL - Elektronische Regelungen GmbH.
<https://www.resol.de/de> Alle anderen Marken sind Eigentum ihrer jeweiligen Inhaber.

## Changelog

### 0.0.1

* (pdbjjens) initial release tested only with VBus/USB (Serial) and DeltaSol(R) BS2009 (0x427B)

## License

MIT License

Copyright (c) 2020 Jens-Peter Jensen <jjensen@t-online.de>

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