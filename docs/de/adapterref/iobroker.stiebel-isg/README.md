---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.stiebel-isg/README.md
title: ioBroker.stiebel-isg
hash: lXdJlkV8IJ5DfqLggZqwn29A+sUXKi9YJHCVe6vafmQ=
---
![Logo](../../../en/adapterref/iobroker.stiebel-isg/admin/stiebel-isg.png)

![Anzahl der Installationen](http://iobroker.live/badges/stiebel-isg-stable.svg)
![Build Status](https://api.travis-ci.org/unltdnetworx/ioBroker.stiebel-isg.svg?branch=master)
![NPM-Version](https://img.shields.io/npm/v/iobroker.stiebel-isg.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.stiebel-isg.svg)
![NPM](https://nodei.co/npm/iobroker.stiebel-isg.png?downloads=true)

# IoBroker.stiebel-isg
=================

Dieser Adapter dient zum Lesen von Werten von ISG (Internet Service Gateways) von stiebel-eltron / tecalor und zur Steuerung des Geräts.

BENUTZUNG AUF EIGENE GEFAHR!!! ABSOLUT KEINE GARANTIE FÜR SCHÄDEN, ETC. !!!

Hilfe oder Hinweise sind willkommen.

## Schritte
1. Installieren Sie den Adapter

2. Holen Sie sich die Werte aus Ihrem stiebel-isg. [X] -Objekt.

## Bedarf
* Internet-Gateway (ISG) von stiebel-eltron / tecalor

## Changelog
### 1.4.2
* Timeout of 10 seconds for pulling settings after multiple commands to reduce the load of the ISG

### 1.4.1
* Core Files/Testing Update and introduce adapter-core

### 1.4.0
* expert-values can be pulled/written

### 1.3.2
* bugfix: 0 is now recognized

### 1.3.1
* reboot-option added

### 1.3.0
* support for compact-mode added

### 1.2.4
* bug repaired: unnecessary space characters in units removed 

### 1.2.3
* bug repaired: ignore hidden fields in some heatings

### 1.2.2
* additional values available, like filter-lifetime

### 1.2.1
* according to a problem with the history-adapter, umlauts can now be deactivated

### 1.2.0
* status for photovoltaik and device included

### 1.1.1
* bugfix for controls-menu

### 1.1.0
* Energymanagment added (ISG plus required)

### 1.0.3
* bugfix in version number

### 1.0.2
* code cleanup

### 1.0.1
* added two new groups for controls, roomtemp 1 and 2

### 1.0.0
* confirmed stable release

### 0.1.0
* release candidate for stable
* additional controles added

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