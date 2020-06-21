---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.minuvis/README.md
title: ioBroker.minuvis
hash: PtKdcBxFW6bAM9g5DLZ2h08X+3N4W7T1cYrUKRtLNsU=
---
![Logo](../../../en/adapterref/iobroker.minuvis/admin/minuvis.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.minuvis.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.minuvis.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/minuvis-installed.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/minukodu/iobroker.minuvis.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/minukodu/ioBroker.minuvis/badge.svg)
![Build-Status](https://travis-ci.org/minukodu/ioBroker.minuvis.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.minuvis.png?downloads=true)

# IoBroker.minuvis
## Minuvis Adapter für ioBroker
Visualisierung für alle Geräte

## Anleitung
- Adapter wie gewohnt installieren
- Instanz von Minuvis erstellen (nur 1 möglich)
- aktiviere socket.io-Instance bei web-Instance

![socket.io@web](https://minukodu.de/githubimg/web_instance_socket_io.jpg)

- Minuvis-Instanz öffnen

![Minuvis-Instanz](https://minukodu.de/githubimg/minuvis_instance.jpg)

- Stellen Sie eine Verbindung zum socket.io-Port des Webs oder Ihrer eigenen socket.io-Instanz her

![verbinden](https://minukodu.de/githubimg/minuvis_connect.jpg)

- Neue Seite hinzufügen

![Seite hinzufügen](https://minukodu.de/githubimg/minuvis_addpage.jpg)

- Widget hinzufügen

![Widget hinzufügen](https://minukodu.de/githubimg/minuvis_addwidget.jpg)

- Status bearbeiten

![Staat wählen](https://minukodu.de/githubimg/minuvis_selectstate.jpg)

- Vorschau Ihrer neuen App

![Vorschau](https://minukodu.de/githubimg/minuvis_preview.jpg)

Weitere Informationen finden Sie unter https://minukodu.de/en oder unter youtube https://youtu.be/dtHUBOEc4js

## Changelog
### 0.0.5 (2020-05-14)
* adaptions for iobroker.repositories
### 0.0.4 (2020-05-13)
* updated README.md
### 0.0.3 (2020-05-11)
* updated builder and app to V1.0.4
### 0.0.2 (2020-05-10)
* updated builder and app to V1.0.2
### 0.0.1 (2020-05-02)
* (svallant) initial release

## License
MIT License

Copyright (c) 2020 svallant <svallant@gmx.eu>

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