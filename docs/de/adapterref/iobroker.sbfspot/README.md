---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sbfspot/README.md
title: ioBroker.sbfspot
hash: qolVS84J624LluZQic5j5y11ebd6Q/iZPmPHFFia+rE=
---
![Logo](../../../en/adapterref/iobroker.sbfspot/admin/sbfspot.png)

![Anzahl der Installationen](http://iobroker.live/badges/sbfspot-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.sbfspot.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sbfspot.svg)
![Tests](https://travis-ci.org/rg-engineering/ioBroker.sbfspot.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.sbfspot.png?downloads=true)

# IoBroker.sbfspot
Dieser Adapter liest Daten von SMA-Wechselrichtern mit sbfspot.
Jetzt werden beide Datenbanktypen (mySQL und sqlite) unterstützt.
Seit Version 0.2.3 steht ein eigenes vis-Widget zur Verfügung, um historische Daten anzuzeigen.

Hinweise:

* Verwenden Sie die neueste Version von sbfspot von https://github.com/SBFspot/SBFspot oder von https://github.com/rg-engineering/SBFspot
* Adapter, sbfspot und Datenbanken (mySQL oder sqlite) müssen auf demselben System ausgeführt werden, z. Himbeer-PI
* Das Installationshandbuch für sbfspot auf Raspberry Pi (oder ähnliches) finden Sie unter https://github.com/SBFspot/SBFspot/wiki/Installation-Linux-SQLite oder https://www.rg-engineering.eu/index. php / produkte / software / plugin-fuer-iobroker-sbfspot
* Für Raspberry Pi gibt es ein halbautomatisiertes Konfigurationstool, das unter https://github.com/SBFspot/sbfspot-config verfügbar ist

## Changelog

### 2.3.3 (2019-02-03)
* (René) due to install problems downgrade of sqlite3 package

### 2.3.1 (2019-02-02)
* (René) bug fix: with sqlite "today" data were not shown

### 2.3.0 (2019-01-20)
* (René) support of compact mode
* (René) add additional error information in log

### 2.2.5 (2018-11-26)
* (René) upgrade packages

### 2.2.5 (2018-11-04)
* (René) reset yield if no new value from today

### 2.2.4 (2018-08-19)
* (René) bugfix for ticks on X

### 2.2.3
* (René) the same as 2.2.2

### 2.2.2
* (René) add timestamp of last update

### 2.2.1
* (René) close of database connection after last query result is available (e.g. to support more than one inverter)

### 2.2.0
* (Nis) background color and border
* (René) bug fixes in admin3

### 2.1.0
* (René) Support MariaDB

### 2.0.1
* (René) Support of admin3

### 2.0.0
* (René) since we always use one graph per widget, only one is supported now
		Attention: widget is not compatible with version 1.x.x; just check settings in widget after installation!

### 1.1.0
* (René) autoscale of y axis
* (René) color for y axis 
* (René) adjustable date format 

### 1.0.1
* (René) bug fix for sqlite

### 1.0.0
* (René) first stable release

### 0.2.6
* (René) bug fix for android app > 1.0.6

### 0.2.5
* (René) use install date to calculate historical values

### 0.2.4
* (René) logo changed

### 0.2.3
* (René) adding historical data as datapoint (JSON)
* (René) new vis widget to show historical data

### 0.2.2
* (René) renamed to sbfspot

### 0.2.1
* (René) index.html updated

### 0.2.0
* (René) support of sqlite and license changed to MIT

### 0.1.1
* (René) UTF8 coding

### 0.1.0
* (René) first release

### 0.0.1
* (René) initial release

## License
Copyright (C) <2017-2019>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.