---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.energymanager/README.md
title: ioBroker.energymanager
hash: WTqq0e1QzSRYhsNLC5/e2Ce7fWnER5M+2ZIGv9gQuQk=
---
![Logo](../../../en/adapterref/iobroker.energymanager/admin/energymanager.png)

![Anzahl der Installationen](http://iobroker.live/badges/energymanager-stable.svg)
![Build-Status](https://api.travis-ci.org/unltdnetworx/ioBroker.energymanager.svg?branch=master)
![NPM-Version](https://img.shields.io/npm/v/iobroker.energymanager.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.energymanager.svg)
![NPM](https://nodei.co/npm/iobroker.energymanager.png?downloads=true)

# IoBroker.energymanager
Dieser Adapter dient zum Lesen von Werten von Geräten, die vom Kiwigrid-Netzwerk wie dem E.ON Energymanager mit Strom versorgt werden, in ioBroker. Ebenfalls bestätigt ist der Solarwatt-Manager. Es ist möglich, dass andere Geräte mit diesem Adapter arbeiten, möglicherweise Innogy oder Enviam.

Hilfe oder Hinweise sind willkommen.

## Schritte
1. Installieren Sie den Adapter

2. Holen Sie sich die Werte aus Ihrem Energiemanger. [X] -Objekt.

## Bedarf
* E.ON Aura energymanger, Solarwatt MyReserve energymanger oder ein anderes Gerät mit Kiwigrid-Antrieb

## Changelog

### 1.2.1
* Core Files/Testing Update and introduce adapter-core

### 1.2.0
* support for compact-mode added

### 1.1.4
* value rounding is now optional. Wh -> kWh

### 1.1.3
* code cleanup

### 1.1.2
* bugfixes for converters

### 1.1.1
* support for multiple converters on one energymanager

### 1.1.0
* support for multiple powerplants on one energymanager

### 1.0.1
* bugfix for hardware reboot

### 1.0.0
* confirmed stable release

### 0.2.0
* hardware reboot button intalled. release candidate for stable 1.0.0

### 0.1.3
* adaptertype changed to daemon.

### 0.1.2
* units for values added.

### 0.1.1
* dropdown for the managertype was deleted, because it also works with solarwatt without special configuration.

### 0.1.0
* bugfix in translationfiles, deleted from npmignore.
* more translations added, to refresh states delete energymanager object with all values. will be created new.

### 0.0.5
* more translations added, to refresh states delete energymanager object with all values. will be created new.

### 0.0.4
* translation for objectnames integrated, translations will be extended

### 0.0.3
* roles of objects are now more detailed

### 0.0.2
* code validation for ioBroker project

### 0.0.1
* initial release

## License
The MIT License (MIT)

Copyright (c) 2018-2019 Michael Schuster <development@unltd-networx.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.