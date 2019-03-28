---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.geofency/README.md
title: ioBroker.geofency
hash: /Hr5Dz3mNY4oC17SdjVrA3/ev+RnM3cakDuPwTgkyFk=
---
![Logo](../../../en/adapterref/iobroker.geofency/admin/geofency.png)

![Anzahl der Installationen](http://iobroker.live/badges/geofency-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.geofency.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.geofency.svg)
![NPM](https://nodei.co/npm/iobroker.geofency.png?downloads=true)

# IoBroker.geofency =====================
Dieser Adapter kann Ereignisse nach [Geofency](http://www.geofency.com/) empfangen, wenn er mit seinem Mobilgerät einen bestimmten Bereich betritt oder verlässt.
Alle Werte des Geofency-Webhooks der Anfrage werden unter dem Namen des Standorts im ioBroker gespeichert.

## Konfiguration auf dem mobilen Gerät:
* für jeden Standort -> Eigenschaften -> Webhook-Einstellungen:
 * URL für Einreise und Ausfahrt: & lt; Ihre ioBroker-Domäne & gt;: & lt; konfigurierter Port & gt; / & lt; beliebiger Standortname & gt;
 * Post-Format: JSON-codiert: aktiviert
 * Authentifizierung: Legen Sie den Benutzer / das Kennwort aus der iobroker.geofency-Konfiguration fest

## Im ioBroker Forum
http://forum.iobroker.net/viewtopic.php?f=20&t=2076

## Sicherheitshinweis:
Es wird nicht empfohlen, diesen Adapter dem öffentlichen Internet zugänglich zu machen.
Eine Art WAF / Proxy / Entry-Server sollte vor dem ioBroker abgelegt werden. (z. B. ist nginx schön und einfach zu konfigurieren).

## Changelog
### 0.3.2 (2018-03-07)
* (Apollon77) Fix Authentication

### 0.3.0 (2017-10-04)
* (Apollon77) BREAKING!!! Make sure 'entry' is really a boolean as defined in object

### 0.2.0 (2017-06-09)
* (Apollon77) Add missing authentication check
* (Apollon77) Add option to send in data as Message when received over other ways
* (Apollon77) Add option not to start a webserver for cases where data are received using messages

### 0.1.5 (2016-09-19)
* (soef) support of certificates

### 0.1.4 (2016-03-29)
* (dschaedl) replaced geofency Icon (on request of bluefox)

### 0.1.3 (2016-03-29)
* (soef) fixed atHome and atHomeCount state creation

### 0.1.2 (2016-02-13)
* (soef) Dots in location name will be replaced by an underscore

### 0.1.1 (2016-02-01)
* (Pmant) Fix config page

### 0.1.0 (2016-01-26)
* (soef) Fix error with "at home" settings

### 0.0.4 (2016-01-24)
* (soef) Added some new states

### 0.0.3 (2016-01-21)
* (soef) Some modifications
* (bluefox) change type

### 0.0.2
* (dschaedl) moved to iobroker/iobroker.geofency

### 0.0.1
* (dschaedl) initial release

## License

The MIT License (MIT)

Copyright (c) 2015 dschaedl <daniel.schaedler@gmail.com>

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