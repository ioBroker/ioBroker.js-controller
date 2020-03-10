---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.accuweather/README.md
title: ioBroker.accuweather
hash: VYnLWsiroZZg/hSDQE8NOSwkUUQWCHdk2F1inf/Tpk0=
---
![Logo](../../../en/adapterref/iobroker.accuweather/admin/accuweather.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.accuweather.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.accuweather.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/algar42/iobroker.accuweather.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/algar42/ioBroker.accuweather/badge.svg)
![NPM](https://nodei.co/npm/iobroker.accuweather.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/algar42/ioBroker.accuweather/master.svg)
![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.accuweather.svg)

# IoBroker.accuweather
## Accuweather Adapter für ioBroker
Wettervorhersage mit AccuWeather API

Der Adapter empfängt die aktuellen Bedingungen (stündlich aktualisiert), eine tägliche 5-Tage-Vorhersage (einmal täglich um ca. 7 Uhr morgens aktualisiert) und eine 12-Stunden-Vorhersage (alle sechs Stunden um 12 Uhr, 6 Uhr, 12 Uhr und 18 Uhr aktualisiert).

## Fertig machen
### API-Schlüssel abrufen
Um den API-Schlüssel zu erhalten, registrieren Sie sich unter https://developer.accuweather.com/ und erstellen Sie eine Anwendung im Menü "Meine Apps". Nach der Erstellung der Anwendung wird der API-Schlüssel generiert.
Zur kostenlosen Nutzung können pro Tag 50 Anfragen an die API gestellt werden.

### Standortschlüssel abrufen
Um den Standortschlüssel zu erhalten, gehen Sie zu https://www.accuweather.com/ und geben Sie Ihren Städtenamen ein oder versuchen Sie, Ihre Koordinaten (Breite, Länge) so einzugeben, wie Sie sie haben, z. in den ioBroker-Einstellungen.
Ihr Standortschlüssel ist die Nummer am Ende der URL der Prognose.

### Verwendung in der Lovelace-Visualisierung (ab Version 1.1.0)
Der Zusammenfassungskanal enthält aktuelle und Tagesprognosen mit Rollen / Arten von Zuständen, die vom Typdetektor unterstützt werden.
Die neue Funktion kann verwendet werden, um die Wettervorhersage in der Lovelace-Benutzeroberfläche anzuzeigen.
Zur besseren Ansicht wird eine benutzerdefinierte Liebeskarte erstellt - siehe https://github.com/algar42/IoB.lovelace.accuweather-card

## Changelog

### 1.1.3
* (algar42) Minor updates for compact mode

### 1.1.0
* (algar42) Summary channel added to support type-detector and automatic weather device creation

### 1.0.2
* (algar42) Production Release

## License
MIT License

Copyright (c) 2020 algar42 <igor.aleschenkov@gmail.com>

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