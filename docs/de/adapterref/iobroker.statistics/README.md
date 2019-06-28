---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.statistics/README.md
title: ioBroker.statistics
hash: adIa0874RzAX7ME3y5k56uOLZbThzREl8C1ROlIdnd4=
---
![Logo](../../../en/adapterref/iobroker.statistics/admin/statistics.png)

![Anzahl der Installationen](http://iobroker.live/badges/statistics-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.statistics.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.statistics.svg)
![Build Status](https://travis-ci.org/foxthefox/ioBroker.statistics.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.statistics.png?downloads=true)

# IoBroker.statistics
## Beschreibung
Dieser Adapter erleichtert die Konfiguration von Statistiken.

`The adapter only reacts on state changes (state.ack=true), not on commands!`

Wählen Sie aus folgenden Einstellungen:

* Impulse zählen oder Ein- / Ausschalten (nur bei Binärwerten und positiver Flanke)
* Kosten aus den Zählwerten berechnen (Nur für Binärwerte)
* wie lange war der Status wahr / AN und wie lange falsch / AUS (nur für Binärwerte)
* Delta zwischen aufgezeichneten Analogwerten (nur für Analogwerte)
* Tägliches Maximum, Minimum und Durchschnitt (nicht für Delta-Berechnungen)
* min / max über das Jahr
* zählt innerhalb von 5 min und täglich max, min und Durchschnitt davon (nicht für Delta-Berechnungen)
* Summe der gruppierten Werte

Der Adapter abonniert die konfigurierten Objekte und erstellt seine eigenen Status in der Statistikstruktur.

Es werden 2 separate Bäume erstellt:

* statistics.0.save -> Endwerte des Zeitrahmens
* statistics.0.temp -> temporäre Werte bis zum Zeitpunkt der Übertragung zum Speichern, dann beginnt die Zeit erneut

Die Struktur des Staates ist: `statistics.0.{save|temp}.{kind of stat}.{original observed state}.{state of statistical value}`

Ein deutsches HowTo-Dokument finden Sie hier: [howto_de](./doc/howto_de.md)

## Die Einstellungen
* Geben Sie die relevanten Gruppen auf der Instanzkonfigurationsseite an (admin => instance => statistics config).
* geben Sie die Konfiguration in den Einstellungen des Status an (admin => objects)

## Changelog

### 0.2.1 [2019-06-15]
* (foxthefox) correction, timecount value was milliseconds instead seconds
* (foxthefox) other calculations with 2 decimal places after comma
* (foxthefox) min/max for day/week/month/quarter/year
* (foxthefox) set of daily min/max starting point from actual value
* (foxthefox) fixing the PR with dayMin 0 at 00:00
* (foxthefox) improvement for timecount when receiving status updates and no real status change

### 0.2.0 [2019-01-08]
* (foxthefox) compact mode

### 0.1.4 [2019-01-07]
* (foxthefox) license added in io-package.json
* (foxthefox) ReadMe updated
* (foxthefox) type = misc-data

### 0.1.3 [2019-01-06]
* first npm release
* (foxthefox) german doc added
* (foxthefox) error corrections
* (foxthefox) travis testing corrections

### 0.1.2 [2018-09-08]
* (bluefox) total refactoring

### 0.0.3
* admin3 implemented
* complete rewrite to have configuration through the settings of the individual states instead in admin page

### 0.0.2
* setup running

### 0.0.1
* initial release

## License

The MIT License (MIT)

Copyright (c) 2018 - 2019 foxthefox <foxthefox@wysiwis.net>,
                   bluefox <dogafox@gmail.com>