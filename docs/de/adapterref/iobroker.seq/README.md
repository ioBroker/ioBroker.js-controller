---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.seq/README.md
title: ioBroker.seq
hash: GWOm6qik6DBmClBZTVf0rDvxim11t2phQTWTJ97SKFk=
---
![Logo](../../../en/adapterref/iobroker.seq/admin/seq.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.seq.svg?dummy=unused)
![Downloads](https://img.shields.io/npm/dm/iobroker.seq.svg?dummy=unused)
![Anzahl der Installationen (spätestens)](https://iobroker.live/badges/seq-installed.svg?dummy=0.2.7)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/seq-stable.svg?dummy=0.2.7)
![Abhängigkeitsstatus](https://img.shields.io/david/o0shojo0o/iobroker.seq.svg)
![NPM](https://nodei.co/npm/iobroker.seq.png?downloads=true)

# IoBroker.seq
[![Übersetzungsstatus] (https://weblate.iobroker.net/widgets/adapters/-/seq/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## Seq Adapter für ioBroker
Mit diesem Adapter können Sie Ihr ioBroker-Protokoll in das System von [Seq](https://datalust.co/seq) verschieben.
Es ist auch möglich, einen Filter auf die Protokollebenen und auch auf die Adapter anzuwenden.

## Aufbau
1. Erstellen Sie eine neue Instanz des Adapters
2. Geben Sie die URL / IP und den Port der Instanz [Seq] (https://datalust.co/seq) ein
3. Geben Sie an, welche Protokollereignisse Sie an [Seq] senden möchten (https://datalust.co/seq).
4. Speichern Sie die Einstellungen

## Changelog

<!--
 https://github.com/AlCalzone/release-script#usage
    npm run release minor -- --all 0.9.8 -> 0.10.0
    npm run release patch -- --all 0.9.8 -> 0.9.9
    npm run release prerelease beta -- --all v0.2.1 -> v0.2.2-beta.0
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

### **WORK IN PROGRESS**

- (o0shojo0o) Add adapter to TIER 1

### 0.2.10 (2021-04-15)

- (o0shojo0o) Check log message of undefine

### 0.2.9 (2021-02-05)

- (o0shojo0o) Bugfix 'Cannot read property common of null'

### 0.2.8 (2021-01-30)

- (o0shojo0o) Bugfix NullPointerException

### 0.2.7 (2021-01-24)

- (o0shojo0o) Add overview card

### 0.2.6 (2021-01-21)

- (bluefox) Refactoring
- (bluefox) Better translations

### 0.2.5 (2021-01-20)

- (o0shojo0o) no real change only the description for the admin

### 0.2.4 (2021-01-16)

- (o0shojo0o) bugfix display of the filter options
- (o0shojo0o) bugfix display of template parameters
- (o0shojo0o) add parameter logging Arch
- (o0shojo0o) add parameter logging JsController
- (o0shojo0o) add parameter logging Node
- (o0shojo0o) add parameter logging Platform
- (o0shojo0o) add parameter logging SourceVersion

### 0.2.3 (2021-01-15)

- (o0shojo0o) if the server address ends with "/", this must be removed. …

### 0.2.2 (2021-01-10)

- (o0shojo0o) handle uncomplete log message

### 0.2.1 (2020-10-01)

- (o0shojo0o) added forgetting native...

### 0.2.0 (2020-10-01)

- (o0shojo0o) optional selective logging on adapter basis

### 0.1.0 (2020-09-26)

- (o0shojo0o) API key is no longer not displayed in clear text
- (o0shojo0o) API key is now stored encrypted
  - **_Attention: The API key will be lost and must be set again!_**
- (o0shojo0o) higher dependencies of the js-controller (>=3.1.0)

### 0.0.5 (2020-09-23)

- (o0shojo0o) add param SystemName for display in Seq

### 0.0.4 (2020-09-23)

- (o0shojo0o) bugfix at the server address check

### 0.0.3 (2020-09-22)

- (o0shojo0o) fix minimum js.controller version

### 0.0.2 (2020-09-17)

- (o0shojo0o) new release for npm...

### 0.0.2-beta.0 (2020-09-16)

- (o0shojo0o) initial release

### 0.0.1

- (o0shojo0o) initial push

## License

MIT License

Copyright (c) 2021 Dennis Rathjen <info@bastelbunker.de>

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