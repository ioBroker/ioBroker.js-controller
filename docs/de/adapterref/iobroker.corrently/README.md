---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.corrently/README.md
title: kein Titel
hash: vLf/DFEb+l/Lw5hXqMQ2J8upM/DHdFPC/PMWc8WeFPg=
---
![NPM-Version](http://img.shields.io/npm/v/iobroker.corrently.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.corrently.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/GermanBluefox/iobroker.corrently.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/GermanBluefox/ioBroker.corrently/badge.svg)
![NPM](https://nodei.co/npm/iobroker.corrently.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/GermanBluefox/ioBroker.corrently/master.svg)

<h1><img src="admin/corrently.png" width="64"/> ioBroker.corrently </h1>

## Korrespondierender Adapter für ioBroker
Lesen Sie den Ökostromindex aus [https://www.corrently.de/gsi/PLZ](https://www.corrently.de/gsi/80999).
Folgende Daten werden zur Verfügung gestellt:

 - *data.json* - JSON-Tabelle für die nächsten 36 Stunden mit grünem Index
 - *data.start* - Startzeitstempel der nächsten oder aktuellen Periode mit grüner Energie 0 - 24
 - *data.duration* - Dauer der nächsten oder aktuellen Periode mit grüner Energie 0 - 24
 - *data.green* - ist jetzt grüne Energie oder nicht
 - *data.price* - grüner Preis für den aktuellen Moment

## Aufbau
Der Adapter wird stündlich ausgeführt (kann beispielsweise als Zeitplan festgelegt werden), und der Benutzer muss den Post-Index in der Konfiguration eingeben.

## Korrently Adapter für ioBroker
Lesen Sie den Index der grünen Energie von [https://www.corrently.de/gsi/PLZ] (https://www.corrently.de/gsi/80999).
Folgende Daten werden zur Verfügung gestellt:

- *data.json* - JSON-Tabelle für die nächsten 36 Stunden mit grünem Index
- *data.start* - Startzeitstempel der nächsten oder aktuellen Periode mit grüner Energie 0 - 24
- *data.duration* - Dauer der nächsten oder aktuellen Periode mit grüner Energie 0 - 24
- *data.green* - ist jetzt grüne Energie oder nicht
- *data.price* - grüner Preis für den aktuellen Moment

## Einstellungen
Der Adapter wird stündlich ausgeführt, und der Benutzer muss den Post-Index in der Konfiguration eingeben.

## Changelog

### 0.0.2
* (bluefox) CRON schedule was changed to "1 * * * *"

### 0.0.1
* (bluefox) initial release

## License
MIT License

Copyright (c) 2019 bluefox

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