---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.benq/README.md
title: ioBroker BenQ Projektoradapter
hash: YfmCWWyypsOuFfAS5vkeXbUOvtycDdAEiBM8nkinyGM=
---
![Logo](../../../en/adapterref/iobroker.benq/admin/benq-logo.png)

![Anzahl der Installationen](http://iobroker.live/badges/benq-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.benq.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.benq.svg)
![NPM](https://nodei.co/npm/iobroker.benq.png?downloads=true)
![Spenden](https://img.shields.io/badge/Donate-PayPal-green.svg)

# IoBroker BenQ Projektoradapter
[![Tests] (https://github.com/instalator/iobroker.benq/workflows/Test%20and%20Release/badge.svg)](https://github.com/instalator/ioBroker.benq/actions/)

Der ioBroker BenQ Projector-Adapter dient zur Steuerung Ihres BenQ-Projektors über RS232 in Verbindung mit dem Etnernet Gateway.
Die Liste der Modelle und Befehle ist in der Datei `admin/commands.json` enthalten.

## Hardware
Mit dem Treiber können Sie über die [Adapter](http://blog.instalator.ru/archives/744) RS232 zu Ethernet eine Verbindung zu den Projektoren BenQ herstellen.

Als RS232-Gateway zu Ethernet wird jede Arduino-kompatible Karte verwendet, auf die Sie [dieser Code](https://github.com/stepansnigirev/ArduinoSerialToEthernet) herunterladen müssen.
Sie benötigen außerdem einen Ethernet Shield W5100 oder W5500 und einen RS232-TTL-Konverter.

## Unterstützung
Unterstützte Modelle: W1200, W1070, W1080 werden ...

## Changelog

### 0.2.3
 * (instalator) change test

### 0.2.2
 * (instalator) fixed clearTimeout

### 0.2.1
 * (instalator) support compact mode
 * (instalator) support admin3
 * (instalator) refactoring

### 0.0.6
  (instalator) initial

## License
The MIT License (MIT)

Copyright (c) 2021 instalator <vvvalt@mail.ru>

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