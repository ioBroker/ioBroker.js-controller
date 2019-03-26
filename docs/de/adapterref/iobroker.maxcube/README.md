---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.maxcube/README.md
title: ioBroker.maxcube
hash: QHOIZ10wpa1+8vkJ/NuVAfODNeN1o6wQrzoHrHMwPkE=
---
![Logo](../../../en/adapterref/iobroker.maxcube/admin/maxcube.png)

![Anzahl der Installationen](http://iobroker.live/badges/maxcube-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.maxcube.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.maxcube.svg)
![Tests](https://travis-ci.org/ioBroker/ioBroker.maxcube.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.maxcube.png?downloads=true)

# IoBroker.maxcube ===================================
ioBroker-Adapter zur Steuerung von Max! via Cube

## Unterstützte Geräte
- Thermostat
- Tür- / Fenstersensor
- Druckknopf (nur Batteriestatus)

## Verwendungszweck
Vor dem Einsatz müssen Sie zuerst alle Geräte an MAX anschließen! Würfel über MAX! Firmware.

## Changelog
### 1.0.1 (2018-07-06)
* (stabilostick) initialization of working state
* (stabilostick) setpoint rounding to 0.5
* (stabilostick) upstream only changed states
* (stabilostick) stabilize state display for setpoint and mode values

### 1.0.0 (2018-05-24)
* (bluefox) refactoring
* (bluefox) added admin3

### 0.1.2 (2017-06-11)
* (paul53) Try to read wall thermostat

### 0.1.1 (2017-06-07)
* (bluefox) use local maxcube lib

### 0.1.0 (2017-06-05)
* (bluefox) intial commit

## License

MIT Copyright (c) 2017-2018 bluefox