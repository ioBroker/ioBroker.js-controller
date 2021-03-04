---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.divera247/README.md
title: ioBroker.divera247
hash: JjgBOR1CmUpmMJgMG123gCGZca7XbSGcKClNlpMf7HQ=
---
![Logo](../../../en/adapterref/iobroker.divera247/admin/divera247_long.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.divera247.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.divera247.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/divera247-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/divera247-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/TKnpl/iobroker.divera247.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/TKnpl/ioBroker.divera247/badge.svg)
![NPM](https://nodei.co/npm/iobroker.divera247.png?downloads=true)

# IoBroker.divera247
** Tests: ** ![Testen und freigeben](https://github.com/TKnpl/ioBroker.divera247/workflows/Test%20and%20Release/badge.svg)

## Divera247 Adapter für ioBroker
Adapter für den Alarmierungsdienst "Divera 24/7"

## Bedarf
Für die vollständige Verwendbarkeit dieses Adapters muss Ihre Organisation den "Alarm" -Plan der Divera 24/7-Dienste abonnieren

## Konfiguration dieses Adapters
Sie müssen den API-Schlüssel "Divera 24/7" Ihrer Organisation für diesen Adapter eingeben.
Um den API-Schlüssel herauszufinden, gehen Sie zu den offiziellen [Divera 24/7 Webseite](https://www.divera247.com/) und navigieren Sie zu Administration -> Einstellungen -> Schnittstellen -> API. Hier finden Sie das Token im Bereich "Autorisierung".

Darüber hinaus können Sie die Alarme auf bestimmte Benutzer beschränken.
Dazu müssen Sie die Divera-Benutzer-IDs auf der Admin-Seite dieses Adapters eingeben. Mehrere Benutzer-IDs können durch Komma (,) angegeben werden.
Um die Benutzer-ID herauszufinden, gehen Sie zu den offiziellen [Divera 24/7 Webseite](https://www.divera247.com/) und navigieren Sie zu Benutzerprofil -> Einstellungen -> Debug -> "Aktuelle ID".

Um **alle Alarme** zu abonnieren, lassen Sie einfach das entsprechende Feld leer.

Bitte wählen Sie auch ein Aktualisierungsintervall für den Aufruf des API-Servers. 30 Sekunden werden empfohlen. Das Minimum beträgt 10 Sekunden.

## Changelog

### 0.0.10
* (TKnpl) bug in info.connection fixed and handling of user ids expanded

### 0.0.9
* (TKnpl) added default values for admin page

### 0.0.8
* (TKnpl) Changed API call from intervall to timeout, added states 'group' and 'foreign_id'

### 0.0.7
* (TKnpl) added object 'priority' and 'alarm' object updates only in case of an new alarm or when an alarm was closed

### 0.0.6
* (TKnpl) state handling while active alarm and connection check improved, fixed object types

### 0.0.5
* (TKnpl) fixed io-package news issue

### 0.0.4
* (TKnpl) Connection check to api improved, added timestamp of latest alert

### 0.0.3
* (TKnpl) added title, text, address, latitude, longitude, general formatting

### 0.0.2
* (TKnpl) adjusted translation

### 0.0.1
* (TKnpl) initial commit

## License
MIT License

Copyright (c) 2021 TKnpl <dev@t-concepts.de>

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