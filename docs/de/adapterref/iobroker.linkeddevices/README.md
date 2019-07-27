---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.linkeddevices/README.md
title: kein Titel
hash: 5iPnnZJG/j2E5kYMQgXXzJCv7PFT9Oyp9RSMOwddB/w=
---
![NPM-Version](http://img.shields.io/npm/v/iobroker.linkeddevices.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.linkeddevices.svg)
![Anzahl der Installationen](http://iobroker.live/badges/linkeddevices-installed.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/Scrounger/iobroker.linkeddevices.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/Scrounger/ioBroker.linkeddevices/badge.svg)
![NPM](https://nodei.co/npm/iobroker.linkeddevices.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/Scrounger/ioBroker.linkeddevices/master.svg)

<h1><img src="admin/linkeddevices.png" width="32"/> ioBroker.linkeddevices </h1>

## Linkeddevices adapter für ioBroker
[![paypal] (https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YHPPW474N5CKQ&source=url)

linkeddevices erzeugt verknüpfte Objekte (Datenpunkte) von Geräten mit einer selbst definierten Struktur. Dadurch ist es möglich, in ioBroker eine Struktur zu erstellen, in der alle Objekte zentralisiert sind, z. zur Verwendung in vis-Ansichten oder Skripten. Dies bietet beispielsweise den Vorteil, dass beim Hardware-Austausch nur die verknüpften Objekte neu erstellt werden müssen und alle vis-Ansichten und Skripte wieder funktionieren.

Mit dem Adapter können Sie auch Objekte konvertieren oder in andere Typen konvertieren (noch nicht vollständig implementiert).

![Struktur](../../../en/adapterref/iobroker.linkeddevices/screenshots/structure.png)

Dieser Adapter ist inspiriert von [Skript für virtuelle Geräte von Pman](https://forum.iobroker.net/topic/7751/virtual-devices).

## Aufbau
* [Englische Beschreibung] (doc / en / README.md)
* [english description] (doc / de / README.md)

## Changelog

### 0.3.0
* (Scrounger) linked devices overview added to adapter configuration
* (Scrounger) bug fixes

### 0.2.1
* (Scrounger) boolean to string converter added
* (Scrounger) bug fixes

### 0.2.0
* (Scrounger) number to boolean converter added
* (Scrounger) number expert settings for min, max added
* (Scrounger) bug fixes

### 0.1.5
* (Scrounger) expert settings properties renamed -> you must recreate your expert settings for all parent objects !!!
* (Scrounger) custom dialog prepared for convert to other type
* (Scrounger) bug fixes

### 0.1.0
* (Scrounger) custom dialog layout changed
* (Scrounger) conversion bug fixes
* (Scrounger) change unit bug fixes

### 0.0.4
* (Scrounger) main function added
* (Scrounger) change unit for linked objects
* (Scrounger) set number of decimal places for linked objects
* (Scrounger) set conversion for read only linked objects

### 0.0.1
* (Scrounger) initial release

## License
MIT License

Copyright (c) 2019 Scrounger

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