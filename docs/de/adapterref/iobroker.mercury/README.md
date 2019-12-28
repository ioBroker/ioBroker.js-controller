---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mercury/README.md
title: ioBroker.quecksilber
hash: ikSSUb3TbTOnUW3NBRQWuJcu+dMe5mQdW8suNuSSWgo=
---
![Logo](../../../en/adapterref/iobroker.mercury/admin/mercury.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.mercury.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.mercury.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/instalator/iobroker.mercury.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/instalator/ioBroker.mercury/badge.svg)
![NPM](https://nodei.co/npm/iobroker.mercury.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/instalator/ioBroker.mercury/master.svg)

# IoBroker.mercury
## Mercury Adapter für ioBroker
Empfangen von Daten von Stromzählern Quecksilber.
Unterstützt TCP / IP und serielle Verbindungen.

Folgende Stromzähler werden unterstützt:

* Quecksilber-200
* Mercury-201
* Mercury-206
* Mercury-203
* Mercury-203.2TD
* Mercury-204
* Mercury-208
* Mercury-230
* Mercury-231
* Mercury-233
* Mercury-234
* Mercury-236
* Mercury-238

## Objekte
** RAW ** - Senden eines RAW-Befehls und Empfangen einer Antwort.
Befehl ohne Adresse und CRC, durch Leerzeichen getrennte Bytes. Beispiel: Für 1 Phasenzähler - Lesen der Energie für den aktuellen Monat

```
32 0F
```

Gibt einen Puffer als String zurück

```"{"type":"Buffer","data":[0,14,31,155,50,7,0,99,0,255,255,255,255,255,255,255,255,255,255,255,255,127,86]}"```

## Changelog

### 0.0.5
* (instalator) fixed error

### 0.0.4
* (instalator) added unit for state

### 0.0.3
* (instalator) added object send RAW command
* (instalator) refactor and fix error

### 0.0.2
* (instalator) added serial connect
* (instalator) fixed many error

### 0.0.1
* (instalator) initial release

## License
The MIT License (MIT)

Copyright (c) 2019 instalator <vvvalt@mail.ru>

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