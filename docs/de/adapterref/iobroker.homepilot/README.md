---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.homepilot/README.md
title: ioBroker.homepilot
hash: xMYZBXTOwQJk/YHoaY54tHLKepzY0e9jhhDcxHhdtQ8=
---
![Logo](../../../en/adapterref/iobroker.homepilot/admin/homepilot.png)

![Anzahl der Installationen](http://iobroker.live/badges/homepilot-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.homepilot.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.homepilot.svg)
![Offene Punkte](http://githubbadges.herokuapp.com/Pix---/ioBroker.homepilot/issues.svg)
![NPM](https://nodei.co/npm/iobroker.homepilot.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/Pix---/ioBroker.homepilot/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Pix---/ioBroker.homepilot?branch=master&svg=true)

# IoBroker.homepilot
[![Codacy Badge] (https://api.codacy.com/project/badge/Grade/41e0e541711c47b996f11a2439a6663c)](https://www.codacy.com/app/Pix---/ioBroker.homepilot?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Pix---/ioBroker.homepilot&amp;utm_campaign=Badge_Grade)

: de: [Dokumentation](/docs/de/doc_homepilot_de.md)

: uk: [Dokumentation](/docs/en/doc_homepilot_en.md)

: ru: [Документация](/docs/en/doc_homepilot_en.md)

: portugal: [Documentação](/docs/en/doc_homepilot_en.md)

: niederlande: [Dokumentation](/docs/en/doc_homepilot_en.md)

: fr: [Dokumentation](/docs/en/doc_homepilot_en.md)

: it: [Documentazione](/docs/en/doc_homepilot_en.md)

: es: [Documentación](/docs/en/doc_homepilot_en.md)

: polen: [Dokumentacja](/docs/en/doc_homepilot_en.md)

## Roadmap
* 1.1.0 Materialisierung des Adaptereinstellungsfensters in admin
* 1.4.0 Eine Liste aller installierten Duofern-Produkte in Ihrem Netzwerk erhalten Sie im Einstellungsfenster
* 1.5.0 Objektbaum in "homepilot.0.device.channel.state" umordnen
* 2.0.0 erhalten Live-Daten von der Homepilot-Station (zwave)

## Changelog
### 1.1.1 (2019-01-09)
+ (homecineplexx) Added new device "Troll Comfort DuoFern"

### 1.1.0 (2018-11-18)
+ (homecineplexx) Improved integration of thermostats

### 1.0.4 (2018-11-11)
+ (pix) fixed typo in main.js

### 1.0.3 (2018-08-03)
+ (pix) design improvements settings window

### 1.0.2 (2018-04-22)
+ (pix) New design for settings window

### 1.0.1 (2018-04-20)
+ (pix) Readme/Documentation structure

### 1.0.0 (2018-04-20)
+ (pix) Admin 3 support, Translations to de, ru, pt, nl, fr, it, es and pl language

### 0.3.1 (2017-10-18)
+ (pix) new documentation structure

### 0.3.0 (2017-10-16)
+ (mikepa1) Support for more z-wave actuators
+ (pix) iobroker.discovery integration

### 0.2.9 (2017-10-15)
+ (pix) Minimum nodejs 4 is required

### 0.2.8 (2017-10-15)
+ (mikepa1) Fixed issues with Heizkörperstellantrieb Z-Wave

### 0.2.7 (2017-08-26)
+ (pix) Added support for Heizkörperstellantrieb Z-Wave

### 0.2.6 (2017-02-03)
+ (pix) Product "Dimmer" integrated (duofern id 48)

### 0.2.5 (2017-02-03)
+ (pix) CID datapoint now accepts input of 'true' or 'false' and translates it to command 10 or 11.

### 0.2.4 (2017-01-27)
* (pix) converted serial to duofern code

### 0.2.3 (2017-01-25)
* (pix) fixed regexp issue within level datapoints for input of value 0
* (pix) new datapoint serial number of duofern product

### 0.2.2 (2017-01-24)
* (pix) fixed state datapoint updates

### 0.2.1 (2017-01-23)
* (pix) Device recognition by serial number optimized

### 0.2.0 (2017-01-15)
* (pix) removed parent from setObjects

### 0.1.1 (2017-01-15)
* (pix) Roles added

### 0.1.0 (2017-01-05)
* (pix) Travis CI supported

### 0.0.7 (2016-06-21)
* (pix) fixed RegEx and log

### 0.0.6 (2016-06-20)
* (pix) fixed switch control "false" by command id (cid)
* (pix) names of datapoints

### 0.0.5 (2016-06-19)
* (pix) user can choose sync time in settings
* (pix) switch control by command id (cid)

### 0.0.4 (2016-06-18)
* (pix) datapoint "level_interted" added for Homematic like appearance
* (pix) productNumber 46 added to switches

### 0.0.3 (2016-06-18)
* (pix) datapoint "state" added for switches (incl. productNumber #43)

### 0.0.2 (2016-06-16)
* (pix) error fixed

### 0.0.1 (2016-06-15)
* (pix) adapter created

## License

The MIT License (MIT)

Copyright (c) 2018 pix

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