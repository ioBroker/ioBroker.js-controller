---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.twinkly/README.md
title: ioBroker.twinkly
hash: hldAZkmyW8gb0j+l0H2YzXZmhkZQE2diQeEA+IatQy8=
---
![Logo](../../../en/adapterref/iobroker.twinkly/admin/twinkly.png)

![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/twinkly-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/twinkly-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.twinkly.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.twinkly.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/patrickbs96/iobroker.twinkly.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/patrickbs96/ioBroker.twinkly/badge.svg)
![NPM](https://nodei.co/npm/iobroker.twinkly.png?downloads=true)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/patrickbs96/ioBroker.twinkly?branch=master&svg=true)

# IoBroker.twinkly
** Tests: ** Linux / Mac: [![Travis-CI] (https://travis-ci.com/patrickbs96/ioBroker.twinkly.svg)](https://travis-ci.com/github/patrickbs96/ioBroker.twinkly)

## Twinkly Adapter für ioBroker
Adapter zur Kommunikation mit den [Funkelnde Lichter](https://www.twinkly.com/).

** Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. ** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Die Einstellungen
Folgende Einstellungen stehen zur Verfügung: ![admin.png](../../../en/adapterref/iobroker.twinkly/img/admin.png)

In der Tabelle können Sie alle Twinkly-Lichter hinzufügen, die Sie steuern möchten.

| Spalte | Beschreibung |
| ------------ | ---------------------------------- |
| `Enabled` | Soll auf diese Verbindung zugegriffen werden? |
| `IP Address` | IP-Adresse zu den Twinkly Lights |
| `IP Address` | IP-Adresse zu den Twinkly Lights |

Die folgenden zusätzlichen Status werden pro Gerät erstellt, wenn diese Option aktiviert ist:

* Geräteinfo (lesen)
* Netzwerkstatus (gelesen)
* MQTT (Lesen / Schreiben)

[Private API-Informationen] (https://xled-docs.readthedocs.io/en/latest/) von [Pavol Babinčák](https://github.com/scrool)

## MACHEN
* Nachdem der Schalter "JSON erweitern" aktiviert ist, werden keine Kanäle erstellt (** Neustart behebt diesen Fehler atm **)
* Netzwerkstatus (schreiben)
* Status Ein: Kontrollkästchen für welche Wiedergabeliste / welchen Film im EIN-Modus

## Changelog

### 0.1.x
* 8 - (patrickbs96) Changes from the Review
* 6 - (patrickbs96) Update dependencies
* 5 - (patrickbs96) Prevent Crash Case at HTTP Error (Sentry IOBROKER-TWINKLY-3)
* 4 - (patrickbs96) Temporary removing Reset as API path not exists
* 1 - (patrickbs96) Prevent Crash Case at HTTP Error (Sentry IOBROKER-TWINKLY-3)

### 0.0.x
* 10 - (patrickbs96) Restructured CreateStates (dynamic)
*  9 - (patrickbs96) Network-Status (read)
*  8 - (patrickbs96) Transform JSON into states: Details, MQTT and Timer
*  7 - (patrickbs96) Moved Twinkly Connection into own library
*  6 - (patrickbs96) Implemented Ping to check if Twinkly is connected. `Connected State` is no longer needed.
*  3 - (patrickbs96) finalized Admin and Coding
*  1 - (patrickbs96) initial release

## License
MIT License

Copyright (c) 2021 patrickbs96 <patrickbsimon96@gmail.com>

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