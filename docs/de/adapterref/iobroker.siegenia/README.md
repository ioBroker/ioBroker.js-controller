---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.siegenia/README.md
title: ioBroker.siegenia
hash: 4S3fJKuQab8SA1AlpY1Ei5iRwPQxcS6KkamGo62zAro=
---
# IoBroker.siegenia

![NPM-Version](http://img.shields.io/npm/v/iobroker.siegenia.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.siegenia.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/Apollon77/iobroker.siegenia.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/Apollon77/ioBroker.siegenia/badge.svg)
![NPM](https://nodei.co/npm/iobroker.siegenia.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/Apollon77/ioBroker.siegenia/master.svg)

<img src="./admin/siegenia_logo.jpg"/>

** Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. ** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

Dieser Adapter bietet ioBroker-Unterstützung für Siegenia-Klima- und Luftsteuerungsgeräte (https://www.siegenia.com).

Der Adapter benötigt mindestens Nodejs 8.x.

## Featureset
Alle aktuellen Geräte werden von diesem Adapter unterstützt:

* AEROPAC
* AEROMAT VT
* DRIVE axxent DK / MH
* SENSOAIR
* AEROVITAL Ambiente
* MHS-Familie
* AEROTUBE
* Universalmodul

Der Adapter kann die Siegenia-Geräte im selben Netzwerk wie ioBroker automatisch erkennen und in der Admin-Oberfläche auflisten. Sie müssen den Benutzer und das Kennwort erst nach der Erkennung korrigieren. Sie können IP-Adressen und Anmeldedaten aber auch manuell eingeben.

Alle verfügbaren Datenfelder des erkannten Geräts werden in Objekten angezeigt und liefern aktuelle Daten und / oder ermöglichen das Ändern von Daten.

Timer und andere komplexere Daten werden vom Adapter angezeigt, können jedoch nur über die Siegenia-App geändert werden.

## Changelog

### 1.0.1 (2020-12-24)
* (Apollon77) update dependencies
* (Apollon77) disconnect device if authentication was not successful

### 1.0.0
* (Apollon77) initial release

## License
MIT License

Copyright (c) 2019 Apollon77

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