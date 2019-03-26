---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.statistics/README.md
title: ioBroker.statistics
hash: 2MeHd4l9oZh38uXGd/qfbyA/wmfX2B4yvi9N/vaTpfk=
---
![Logo](../../../en/adapterref/iobroker.statistics/admin/statistics.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.statistics.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.statistics.svg)
![Build-Status](https://travis-ci.org/foxthefox/ioBroker.statistics.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.statistics.png?downloads=true)

# IoBroker.statistics
## Beschreibung
Dieser Adapter erleichtert die Konfiguration von Statistiken.

`The adapter only reacts on state changes (state.ack=true), not on commands!`

Wählen Sie aus den folgenden Einstellungen:

* Zählimpulse oder Ein / Aus-Änderungen (nur für binäre Werte und positive Flanke)
* Kosten aus den gezählten Werten berechnen (nur für binäre Werte)
* wie lange war der Status true / ON und wie lange false / OFF (nur für binäre Werte)
* Delta zwischen protokollierten Analogwerten (nur für Analogwerte)
* Max, Min und Durchschnitt des Tages (nicht für Delta-Berechnungen)
* zählt innerhalb von 5 min und täglich max, min und Durchschnitt (nicht für Delta-Berechnungen)
* Zusammenfassung der gruppierten Werte

Der Adapter abonniert die konfigurierten Objekte und erstellt seine eigenen Zustände im Statistikbaum.

Es werden 2 separate Bäume erstellt:

* statistics.0.save -> Endwerte des Zeitrahmens
* statistics.0.temp -> temporäre Werte bis zum Zeitpunkt der Übertragung zum Speichern, danach beginnt die Temperatur von neuem

Die Struktur des Staates ist: `statistics.0.{save|temp}.{kind of stat}.{original observed state}.{state of statistical value}`

Ein deutsches HowTo-Dokument ist hier verfügbar: [howto_de](./doc/howto_de.md)

## Die Einstellungen
* Geben Sie die relevanten Gruppen auf der Instanzkonfigurationsseite an (admin => Instanzen => Statistikkonfiguration).
* spezifizieren Sie die Konfiguration in den Einstellungen des Zustands (admin => Objekte)

## Changelog
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

Copyright (c) 2018 foxthefox <foxthefox@wysiwis.net>,
                   bluefox <dogafox@gmail.com>