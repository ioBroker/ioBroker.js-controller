---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.maxcul/README.md
title: ioBroker.maxcul
hash: 6XQo0gd7QRkRoylGdMHscKHQa5W4FB+ZhlyW12l65XA=
---
![Logo](../../../en/adapterref/iobroker.maxcul/admin/maxcul.png)

![Anzahl der Installationen](http://iobroker.live/badges/maxcul-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.maxcul.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.maxcul.svg)
![Tests](https://travis-ci.org/ioBroker/ioBroker.maxcul.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.maxcul.png?downloads=true)

# IoBroker.maxcul ===================================
ioBroker-Adapter zur Steuerung von Max! über [CUL](http://busware.de/tiki-index.php?page=CUL)

Adapter wird abgeleitet von [pimatic-maxcul](https://github.com/fbeek/pimatic-maxcul)

## Unterstützte Geräte
- Thermostat
- Tür- / Fenstersensor
- Druckknopf
- Wandthermostat

## Verwendungszweck
Vor der Verwendung müssen Sie die Geräte mit dem ioBroker koppeln.
Z.B. Bei Thermostaten länger die "Boost" - Taste drücken, bis der Countdown beginnt.

## Changelog
### 1.0.0 (2018-10-20)
* (Arne Stenmannsr) Wall thermostat was added

### 0.5.3 (2018-03-25)
* (skraw.iobroker) Optimize logic to send commands and scanning

### 0.5.1 (2018-03-07)
* (Apollon77) Further fixes

### 0.5.0 (2018-02-25)
* (Apollon77) Fix Serial data parsing
* (bluefox) Admin3 ready

### 0.4.1 (2018-02-15)
* (Apollon77) Upgrade dependencies

### 0.4.0 (2018-01-24)
* (Apollon77) Upgrade Serialport and cul library

### 0.3.0 (2017-06-21)
* (bowao) Fix control of thermostates

### 0.2.3 (2017-04-11)
* (bluefox) Fix calculation of serial number
* (bluefox) Add valve configuration

### 0.2.0 (2017-04-11)
* (bluefox) Activate thermostat scanner

### 0.1.1 (2017-04-10)
* (bluefox) intial commit

## License

[Licensed under GPLv2](LICENSE) Copyright (c) 2017-2018 bluefox