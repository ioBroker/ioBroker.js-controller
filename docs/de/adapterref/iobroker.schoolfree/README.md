---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.schoolfree/README.md
title: ioBroker.schoolfree
hash: uzju6TA2Nd+imMw4P3aGsSgS0hBAeyPIQshsOhieXkI=
---
![Logo](../../../en/adapterref/iobroker.schoolfree/admin/schoolfree.png)

![Anzahl der Installationen](http://iobroker.live/badges/schoolfree-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.schoolfree.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.schoolfree.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/simatec/iobroker.schoolfree.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/simatec/ioBroker.schoolfree/badge.svg)
![Travis-CI](http://img.shields.io/travis/simatec/ioBroker.schoolfree/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/simatec/ioBroker.schoolfree?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.schoolfree.png?downloads=true)

# IoBroker.schoolfree
Dieser Adapter verwendet den Dienst Sentry.io, um Ausnahmen und Codefehler sowie neue Geräteschemata automatisch an mich als Entwickler zu melden. Weitere Details siehe unten!

## Schulfreier Adapter für ioBroker
** Wenn es Ihnen gefällt, ziehen Sie bitte eine Spende in Betracht: **

[![paypal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=Q4EEXQ6U96ZTQ&source=url)

### Deutsche Beschreibung:
Schulfrei ist ein Adapter für iobroker Installationen.
Mit dem Adapter lassen sich die Schulferien auswerten und in Datenpunkte erstellen.
Die Datenpunkte können somit für weitere Funktionen wie Heizungssteuerungen, Rolladen- und Besitzssteuerungen werden.

Der aktuelle Bezug von Terminen für die Schulferien gehört über die API von https://www.mehr-schulferien.de

Aktuell werden die Schulferien und freien Tage für Deutschland geführt.

Folgende Datenpunkte stehen mit Schoolfree für die weitere Behandlung zur Verfügung:

* info.current.end: Datum für das Ende der möglichen Ferien
* info.current.name: Bezeichnung der politischen Schulferien
* info.current.start: Startdatum der zukünftigen Ferien
* info.next.end: Datum für das Ende der regionalen Ferien
* info.next.name: Bezeichnung der politischen Schulferien
* info.next.start: Startdatum der regionalen Ferien
* info.today: Schalter für den aktuellen Status heute (wahr / falsch)
* info.tomorrow: Schalter für den betreffenden Status morgen (wahr / falsch)

*************************************************************************************************************************************

### Englische Beschreibung:
Schoolfree ist ein Adapter für iobroker-Installationen.
Mit dem Adapter können die Schulferien ausgewertet und auf Datenpunkte übertragen werden.
Die Datenpunkte können somit für andere Funktionen wie Heizungssteuerungen, Verschluss- und Anwesenheitssteuerungen ausgewertet und verarbeitet werden.

Das aktuelle Abonnement für die Schulferien erfolgt über die API von https://www.mehr-schulferien.de

Derzeit werden die Schulferien und freien Tage für Deutschland unterstützt.

Die folgenden Datenpunkte stehen für die weitere Verarbeitung mit Schoolfree zur Verfügung:

* info.current.end: Datum für das Ende der aktuellen Feiertage
* info.current.name: Name der aktuellen Schulferien
* info.current.start: Startdatum des aktuellen Feiertags
* info.next.end: Datum für das Ende der nächsten Feiertage
* info.next.name: Name der nächsten Schulferien
* info.next.start: Startdatum des nächsten Feiertags
* info.today: Wechseln Sie heute zum aktuellen Status (wahr / falsch)
* info.tomorrow: morgen auf den aktuellen Status umschalten (true / false)

### Was ist Sentry.io und was wird den Servern dieses Unternehmens gemeldet?
Sentry.io ist ein Dienst, mit dem Entwickler einen Überblick über Fehler in ihren Anwendungen erhalten. Und genau das ist in diesem Adapter implementiert.

Wenn der Adapter abstürzt oder ein anderer Codefehler auftritt, wird diese Fehlermeldung, die auch im ioBroker-Protokoll angezeigt wird, an Sentry gesendet. Wenn Sie der iobroker GmbH erlaubt haben, Diagnosedaten zu sammeln, ist auch Ihre Installations-ID (dies ist nur eine eindeutige ID **ohne** zusätzliche Informationen über Sie, E-Mail, Name oder dergleichen) enthalten. Auf diese Weise kann Sentry Fehler gruppieren und anzeigen, wie viele eindeutige Benutzer von einem solchen Fehler betroffen sind. All dies hilft mir, fehlerfreie Adapter bereitzustellen, die im Grunde nie abstürzen.

*************************************************************************************************************************************

## Changelog

### 0.6.0 (04.05.2020)
* (simatec) added new features
* (simatec) Bugfix next day schoolfree
* (simatec) added sentry.io
* (simatec) added translations
* (simatec) added error handling

### 0.5.1 (25.03.2020)
* (simatec) added new features

### 0.5.0 (23.03.2020)
* (simatec) added public holidays
* (simatec) Bugfix next schoolfree for API 2.0
* (simatec) Bugfix schoolfree-name for API 2.0

### 0.4.1 (22.03.2020)
* (simatec) new query as adaptation to API v2.0
* (simatec) Adjustment of the federal state IDs"
* (simatec) Code fix for autochecker
* (simatec) update Dependencies

### 0.4.0 (21.03.2020)
* (simatec) added new api v2.0 from www.mehr-schulferien.de

### 0.3.1 (28.10.2019)
* (simatec) Fix start after install

### 0.3.0 (18.10.2019)
* (simatec) end of node 6 support
* (simatec) changed dateformat

### 0.2.2 (04.06.2019)
* (simatec)new object structure

### 0.2.1 (14.05.2019)
* (simatec) fix travis and appveyor

### 0.2.0 (13.05.2019)
* (simatec) Add Objects for next school holiday
* (simatec) cleaned code

### 0.1.0 (10.05.2019)
* (simatec) First Beta

### 0.0.1 (08.05.2019)
* (simatec) initial release

*************************************************************************************************************************************

## License
MIT License

Copyright (c) 2019 - 2020 simatec

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