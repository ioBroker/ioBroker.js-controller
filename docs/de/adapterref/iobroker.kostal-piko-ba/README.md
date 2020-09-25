---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.kostal-piko-ba/README.md
title: ioBroker.kostal-piko-ba
hash: n4Ot9pfMU0UfRGYsADnc9pRw0XapMD0jittPQnQcxrQ=
---
![Logo](../../../en/adapterref/iobroker.kostal-piko-ba/admin/picoba.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.kostal-piko-ba.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.kostal-piko-ba.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/hombach/ioBroker.kostal-piko-ba.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/hombach/ioBroker.kostal-piko-ba/badge.svg)
![NPM](https://nodei.co/npm/iobroker.kostal-piko-ba.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/hombach/ioBroker.kostal-piko-ba/master.svg)

# IoBroker.kostal-piko-ba
![NPM-Version (stabil)](http://ioBroker.live/badges/kostal-piko-ba-stable.svg) ![Anzahl der Installationen (aktuell)](http://ioBroker.live/badges/kostal-piko-ba-installed.svg)

![Node.js CI](https://github.com/hombach/ioBroker.kostal-piko-ba/workflows/Node.js%20CI/badge.svg)

Dieser Adapter verwendet den Dienst Sentry.io, um Ausnahmen und Codefehler sowie neue Geräteschemata automatisch an mich als Entwickler zu melden. Weitere Details siehe unten!

## Adapter zum Lesen von Kostal Piko BA-Daten für iOBroker
Adapter zum Lesen von Kostal Piko BA-Daten. Der Adapter erstellt einige Status und aktualisiert sie nacheinander.

### Die Einstellungen
Um eine Verbindung zum Wechselrichter Kostal Pico BA herzustellen, geben Sie dessen IP-Adresse in die Konfiguration ein.

### Was ist Sentry.io und was wird den Servern dieses Unternehmens gemeldet?
Sentry.io ist ein Dienst für Entwickler, um einen Überblick über Fehler in ihren Anwendungen zu erhalten. Und genau das ist in diesem Adapter implementiert.
Wenn der Adapter abstürzt oder ein anderer Codefehler auftritt, wird diese Fehlermeldung, die auch im ioBroker-Protokoll angezeigt wird, an Sentry gesendet.
Wenn Sie der iobroker GmbH erlaubt haben, Diagnosedaten zu erfassen, ist auch Ihre Installations-ID enthalten.
Auf diese Weise kann Sentry Fehler gruppieren und anzeigen, wie viele eindeutige Benutzer von einem solchen Fehler betroffen sind.
All dies hilft mir, fehlerfreie Adapter bereitzustellen, die im Grunde nie abstürzen.

## Changelog
### 1.0.3 (23.09.2020)
* (HombachC) bumbed got; added battery.temperature

### 1.0.2 (23.09.2020)
* (HombachC) optimized object roles

### 1.0.1 (22.09.2020)
* (HombachC) bumped dependencies; added some clearing of timeouts

### 1.0.0 (11.09.2020)
* (HombachC) first public release for stable repo

### 0.8.5 (26.08.2020)
* (HombachC) bumped dependencies

### 0.8.2 (18.08.2020)
* (HombachC) changed scheduling code

### 0.8.0 (18.08.2020)
* (HombachC) seperate editable poll timer for statistics data

### 0.7.4 (03.07.2020)
* (HombachC) added sentry.io support

### 0.6.1 (28.06.2020)
* (HombachC) poll of statistics data separated

### 0.5.1 (22.06.2020)
* (HombachC) introduced editable poll interval 

### 0.1.0 (15.05.2020)
* (HombachC) initial working release

## License
MIT License

Copyright (c) 2020 HombachC

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