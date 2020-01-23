---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.maxcul/README.md
title: ioBroker.maxcul
hash: pIVFK6JHsxSuDkbtitePPG0bEpWGiXhgfr1cnYhEQI0=
---
![Logo](../../../en/adapterref/iobroker.maxcul/admin/maxcul.png)

![Anzahl der Installationen](http://iobroker.live/badges/maxcul-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.maxcul.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.maxcul.svg)
![Tests](https://travis-ci.org/ioBroker/ioBroker.maxcul.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.maxcul.png?downloads=true)

# IoBroker.maxcul
ioBroker Adapter zur Steuerung von Max! über [CUL](http://busware.de/tiki-index.php?page=CUL)

Adapter ist abgeleitet von [pimatic-maxcul](https://github.com/fbeek/pimatic-maxcul)

## Unterstützte Geräte
- Thermostat
- Tür- / Fenstersensor
- Druckknopf
- Wandthermostat

## Verwendung
Vor der Verwendung müssen Sie zuerst die Abweichungen mit ioBroker koppeln.
Z.B. Bei Thermostaten die Taste "Boost" länger drücken, bis der Countdown startet.

## Changelog
### 1.2.0 (2020-01-23)
* (bluefox) Refactoring

### 1.1.2 (2019-08-28)
* (Arne Stenmanns) user enabled paringmode
* (bowao) fixes for measured value of the wallthermostat

### 1.1.1 (2019-07-05)
* (bowao) fixes and optimizations

### 1.1.0 (2019-07-04)
* (bowao) support nodejs 10 and 12
* (bowao) add thermostat week profile
* (bowao) add thermostat vacation config
* (bowao) add new thermostat modes: manual eco; manual comfort; manual window
* (bowao) add poll timeout after 5 minutes of no response from thermostat
* (bowao) optimize error handling for incomplete packages

### 1.0.0 (2018-10-20)
* (Arne Stenmanns) Wall thermostat was added

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

[Licensed under GPLv2](LICENSE) Copyright (c) 2017-2020 bluefox <dogafox@gmail.com>