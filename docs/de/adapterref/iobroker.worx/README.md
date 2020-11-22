---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.worx/README.md
title: ioBroker.worx
hash: nlEB+RIKLMo+NbCzZJ59gkbuM+xcucJL4s4qgN8eT2c=
---
![Anzahl der Installationen](http://iobroker.live/badges/worx-installed.svg)
![stabile Version](http://iobroker.live/badges/worx-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.worx.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.worx.svg)

[![TESTS] (https://github.com/iobroker-community-adapters/ioBroker.worx/workflows/Test%20and%20Release/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.worx/commits/master)

![Logo](../../../en/adapterref/iobroker.worx/admin/worx.png)

# IoBroker.worx
## Worx-Adapter (Kress und Landxcape) für ioBroker
Steuerung über Cloud und mqtt

Dieser Adapter verbindet ioBroker über Cloud mit Ihrem Landroid Kress- oder Landxcape-Mäher.
Temperaturen, Mähzeiten, Batteriestand und verschiedene andere Daten werden vom Mäher ausgelesen.
Der Adapter kann den Mäher steuern und Sie können Konfigurationsparameter wie Mähzeiten ändern.

<img src="admin/worx_ada2.png" alt="Zeichnung" width="100%"/>

## Die Einstellungen
- Um eine Verbindung zum Mäher herzustellen, geben Sie E-Mail und Passwort von Ihrem Worx-Konto in der Konfiguration ein.
- Verzögerung für Kantenschnitt: Wenn der Kantenschnitt in einer Kurve oder Biegung beginnt, kann der Rasenmäher den Draht verlieren und mit einem Fehler anhalten, oder die Messer drehen sich möglicherweise nicht. Zu diesem Zweck kann der Startpunkt eingestellt werden, an dem sich die Klingen zu drehen beginnen.

## Changelog
### 1.2.4 (15.11.2020)
* (MeisterTR) Bugfix (error type of sc...)
* (MeisterTR) change Testing to git
### 1.2.3 (29.08.2020)
* (MeisterTR) add option to crate a Json Obj to set mowtime with scripts 
* (MeisterTR) add option to disable weather
* (MeisterTR) add double Shedule, oneTimeShedule, PartyMode
* (MeisterTR) fix setIntervall => setTimeout
* (MeisterTR) fix error with Meter and Min. in Config
* (MeisterTR) add Kress and Landxcape
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

Copyright (c) 2020 MeisterTR

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