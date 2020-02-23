---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.blink4home/README.md
title: ioBroker.blink4home
hash: nf+u7efakk/V7wc9aS0bpufLq6b22PRSfytvROuqj9c=
---
![Logo](../../../en/adapterref/iobroker.blink4home/admin/blinkbanner.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.blink4home.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.blink4home.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/Flashy-GER/iobroker.blink4home.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/Flashy-GER/ioBroker.blink4home/badge.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/blink4home-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/blink4home-stable.svg)
![NPM](https://nodei.co/npm/iobroker.blink4home.png?downloads=true)

# IoBroker.blink4home
[![Build Status] (https://travis-ci.com/Flashy-GER/ioBroker.blink4home.svg?branch=master)](https://travis-ci.com/Flashy-GER/ioBroker.blink4home)

## Blink4home Adapter für ioBroker
Adapter für das Sicherheitssystem Amazon Blink Kamera.
der Adapter muss alle Werte in Datenpunkte dar.
Arm / Disarm kann über Blockly oder JS werden werden.

## Handbuch
Benutzername und Passwort des Blink-Cloud-Kontos auf der Adapterkonfigurationsseite eintragen.
Den Polling Intervall wurde nicht unter 5 Sek.
Wenn arm / entwaffnen über auch manuell über Datenpunktzahlen werden sollen, einfach selbständig Schreibrechte erhalten.
für Script Ablehnung Steuerung ist das nicht gehört.

## ToDos
* Bedienfeld überarbeiten (Anzeige von letztenen Foto, Abrufen der Videos, Arm / Disarm, Kamerabezogene Motion Detection u.a.)

## Changelog

### 0.1.1
* (Alex.0) add Control Site (under Construction)
* (Alex.0) some fixes
### 0.1.0
* (Alex.0) Beta Release 1
### 0.0.1 Inital Release
* (Alex.0) initial release

## License
MIT License

Copyright (c) 2020 Alex.0 <flashy@openuav.de>

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