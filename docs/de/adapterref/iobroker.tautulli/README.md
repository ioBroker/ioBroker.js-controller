---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tautulli/README.md
title: ioBroker.tautulli
hash: dgxUGRa7DjpHaUslLIRWE/MNUZH4dY5z1fGAyOH2/XA=
---
![Logo](https://raw.githubusercontent.com/Zefau/ioBroker.tautulli/master/admin/tautulli.jpeg)

![Anzahl der Installationen](http://iobroker.live/badges/tautulli-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.tautulli.svg)
![Travis CI](https://travis-ci.org/Zefau/ioBroker.tautulli.svg?branch=master)
![Downloads](https://img.shields.io/npm/dm/iobroker.tautulli.svg)
![NPM](https://nodei.co/npm/iobroker.tautulli.png?downloads=true)

# IoBroker.tautulli [Tautulli ist eine Anwendung von Drittanbietern](https://tautulli.com/#about), die Sie neben Ihrem Plex Media Server ausführen können, um die Aktivität zu überwachen und verschiedene Statistiken zu verfolgen. Diese Statistiken enthalten vor allem das, was beobachtet wurde, wer es gesehen hat, wann und wo es gesehen wurde und wie es beobachtet wurde. Alle Statistiken werden in einer übersichtlichen und sauberen Benutzeroberfläche mit vielen Tabellen und Diagrammen dargestellt, sodass Sie Ihren Server mit allen anderen prahlen können.
Dieser Adapter stellt eine Verbindung zu [Tautulli-API](https://github.com/Tautulli/Tautulli/blob/master/API.md) her und empfängt Webhook-Ereignisse sowohl von Tautulli als auch von Plex (letzteres erfordert Plex Pass).

**Inhaltsverzeichnis**

1. Anweisungen zum Einrichten
   1. API-Einstellungen
2. tbd
3. Änderungsprotokoll
4. Lizenz

## Anweisungen zum Einrichten
Schauen Sie sich bei Interesse nach [Tautulli Preview] (https://tautulli.com/#preview) und [installieren Sie es auf Ihrem bevorzugten System](https://github.com/Tautulli/Tautulli-Wiki/wiki/Installation) um.

### API-Einstellungen
Öffnen Sie nach der Installation von Tautulli die Seite _Settings_ im Tautulli-Dashboard und navigieren Sie zu _Web Interface_. Blättern Sie nach unten zum Abschnitt _API_ und stellen Sie sicher, dass ```Enable API``` markiert ist. Kopieren Sie die ```API key``` und geben Sie sie in den Einstellungen von ioBroker.tautulli ein. Fügen Sie außerdem die Tautulli-IP-Adresse und den Port hinzu, um die API-Kommunikation zu ermöglichen.

## Changelog

### 0.2.0 (2019-02-01)
* (zefau) added support for Compact Mode
* (zefau) added support for gulp

### 0.1.0 (2019-01-03)
* (zefau) initial release

## License
The MIT License (MIT)

Copyright (c) 2018-2019 Zefau <zefau@mailbox.org>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.