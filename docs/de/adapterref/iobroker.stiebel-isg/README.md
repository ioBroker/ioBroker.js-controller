---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.stiebel-isg/README.md
title: ioBroker.stiebel-isg
hash: iyF0ZWK88/WwUlksouiJrRJoAU/ZMAs2UqiVj+jo/Co=
---
![Logo](../../../en/adapterref/iobroker.stiebel-isg/admin/stiebel-isg.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.stiebel-isg.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.stiebel-isg.svg)
![Anzahl der Installationen (spätestens)](https://iobroker.live/badges/stiebel-isg-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/stiebel-isg-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/unltdnetworx/iobroker.stiebel-isg.svg)
![NPM](https://nodei.co/npm/iobroker.stiebel-isg.png?downloads=true)

# IoBroker.stiebel-isg
** Tests: ** ![Testen und freigeben](https://github.com/unltdnetworx/ioBroker.stiebel-isg/workflows/Test%20and%20Release/badge.svg)

## Stiebel-isg Adapter für ioBroker
Dieser Adapter dient zum Lesen von Werten von Internetdienst-Gateways (ISG) von stiebel-eltron / tecalor und zum Steuern des Geräts.

BENUTZUNG AUF EIGENE GEFAHR!!! ABSOLUT KEINE GARANTIE FÜR SCHÄDEN, ETC. !!!

Hilfe oder Hinweise sind willkommen.

## Spenden
Kaffee ausgeben / Kaffee servieren <https://paypal.me/unltdnetworx>

## Schritte
1. Installieren Sie den Adpater

2. Nehmen Sie die Werte aus Ihrem stiebel-isg. [X] -Objekt.

## Bedarf
* Internetdienst-Gateway von stiebel-eltron / tecalor (ISG)

## Changelog

### 1.7.0

* new adapter structure, bugfixes for new js-controller

### 1.6.0

* new values for isg-version 12 implemented

### 1.6.1

* isg-sites to read values from, can now be select by the user

### 1.5.3

* bugfix for latest_value added in statistics for database

### 1.5.2

* latest_value added in statistics for database

### 1.5.1

* new adapter testing and security update

### 1.5.0

* support for cooling values and startpage graphs

### 1.4.11

* support for further heatingtyp WPL25A

## License
MIT License

Copyright (c) 2018-2021 Michael Schuster <development@unltd-networx.de>

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