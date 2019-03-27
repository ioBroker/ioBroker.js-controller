---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.yr/README.md
title: ioBroker.yr
hash: s+SkqMZbnSFY2acITgHvIqIIe9qKW6oTr0EU8TLj2nE=
---
![Logo](../../../en/adapterref/iobroker.yr/admin/yr.png)

![Anzahl der Installationen](http://iobroker.live/badges/yr-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.yr.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.yr.svg)
![Tests](https://travis-ci.org/ioBroker/ioBroker.yr.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.yr.png?downloads=true)

# IoBroker.yr
holt 48h Wettervorhersage von [yr.nr.](yr.no)

[yr.no] (yr.no) ist eine gemeinsame Dienstleistung des [Norwegian Meteorological Institute] (met.no) und der [Norwegian Broadcasting Corporation](nrk.no)

http://om.yr.no/verdata/free-weather-data/

** Hinweis ** - Wenn _ "Fehlende Übersetzungen an iobroker.net senden" _ aktiviert ist (Standardeinstellung), werden fehlende Übersetzungen an den iobroker.net-Server gesendet. Es werden keine IPS oder zusätzliche Informationen gespeichert oder analysiert. Nur die Übersetzung fehlt.

## Icons
Icons werden hier [https://github.com/YR/weather-symbols](https://github.com/YR/weather-symbols) entnommen und gehören zu yr.no.

## 1.0.4 [2016-07-06]
* (bluefox) Link zur Readme-Datei korrigieren

### 1.0.3 [2016-05-17]
* (bluefox) Liesmichpfad ändern

### 1.0.2 [2016-05-16]
* (bluefox) füge Übersetzungen hinzu

### 1.0.1 [2016-04-25]
* (bluefox) füge Übersetzungen hinzu

### 1.0.0 [2016-03-15]
* (bluefox) Parsing von Städten ändern

### 0.1.9 [2015-10-28]
* (bluefox) behebt Fehler bei Übersetzungen

### 0.1.8 [2015-10-27]
* (bluefox) übersetzungen
* (bluefox) lädt fehlende Übersetzungen automatisch zu iobroker.net hoch

### 0.1.7 [2015-07-10]
* (bluefox) macht Ihre Arbeit mit Metro-Widgets möglich

### 0.1.6 [2015-06-12]
* (bluefox) übersetzungen

### 0.1.5 [2015-03-26]
* (bluefox) übersetzungen

### 0.1.4 [2015-03-24]
* (bluefox) Einheit "%" für "Windrichtung" entfernen

### 0.1.3 [2015-03-22]
* (bluefox) behebt Fehler mit morgen und übermorgen

### 0.1.2 [2015-03-08]
* (bluefox) richtige Links zur Website yr.no

0.1.1
* (bluefox) fügt Übersetzungen für die Wetterzustände in anderen Sprachen hinzu

0,1,0
* (bluefox) aktualisiert Ihr neues Objektmodell

0,04
* (Hobbyquaker) "Prognose" voranstellen. IDs angeben

0.0.3
* (Hobbyquaker) Einstellungen der Benutzeroberfläche mit automatischer Vervollständigung der Position
* (Hobbyquaker) wurde in Prognose in yr_forecast umbenannt
* (Hobbyquaker) Kinderattribut hinzugefügt
* (Hobbyquaker) verringerte die Log-Ausführlichkeit
* (Hobbyquaker) Korrekturen

0,02
* (Hobbyquaker) Korrekturen

### 0.0.1
* (Hobbyquaker) erste Veröffentlichung

## Machen
* setState Forecast_object

## Changelog
### 2.0.3 [2018-10-10]
* (bluefox) add translations

### 2.0.2 [2018-08-01]
* (bluefox) Warning! Breaking changes! States are renamed.
* (bluefox) Refactoring of states and roles

### 1.0.6 [2017-05-27]
* (Andre) Update iconset

### 1.0.5 [2016-10-10]
* (bluefox) move weather widgets to this adapter

## License
The MIT License (MIT)

Copyright (c) 2014-2018 hobbyquaker <hq@ccu.io>

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