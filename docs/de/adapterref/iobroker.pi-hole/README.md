---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.pi-hole/README.md
title: ioBroker.pi-hole! [Logo] (admin / pi-hole.png)
hash: YHXftTF474VCdIoX89RtsNFKij62dWoKVxjY6IQEolQ=
---
# IoBroker.pi-hole ![Logo](../../../en/adapterref/iobroker.pi-hole/admin/pi-hole.png)

![Anzahl der Installationen](http://iobroker.live/badges/pi-hole-stable.svg)
![Build Status](https://api.travis-ci.org/unltdnetworx/ioBroker.pi-hole.svg?branch=master)
![NPM-Version](https://img.shields.io/npm/v/iobroker.pi-hole.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.pi-hole.svg)
![NPM](https://nodei.co/npm/iobroker.pi-hole.png?downloads=true)

=================

Dieser Adapter dient zum Auslesen von Werten aus einem laufenden Pi-Hole und zur Steuerung des Geräts (Start / Stopp).

BENUTZUNG AUF EIGENE GEFAHR!!! ABSOLUT KEINE GARANTIE FÜR SCHÄDEN, ETC. !!!

Hilfe oder Hinweise sind willkommen.

## Schritte
1. Installieren Sie den Adpater

2. Füllen Sie die Felder des Adapter-Administrators aus. Die IP-Adresse des Pi-Hole-Geräts, das API-Token, das Sie über das Admin-Webinterface des Pi-Hole-Geräts (Einstellungen / API / Token abrufen) abrufen können, und das Intervall zur Erneuerung der Werte von Das Pi-Loch (Statistik in iobroker erneuern)

3. Einige der Objekte sind Json-Tabellen, die Sie in vis verwenden können.

4. Aktivieren Sie den Filter, indem Sie auf die Schaltfläche "Pi-Hole aktivieren" klicken. Deaktivieren Sie den Filter, indem Sie den Wert für "Pi-Hole deaktivieren" ändern (0 für permanent, Anzahl für Anzahl Sekunden).

## Bedarf
* Running Pi-Hole-Gerät

## Changelog

### 1.2.0

* (unltdnetworx) datapoint for available update

### 1.1.0

* (unltdnetworx) support for ssl-connection

### 1.0.1

* (unltdnetworx) bugfixes

### 1.0.0

* (unltdnetworx) rise of version-number - stable version

### 0.2.1

* (unltdnetworx) small bugfix for storage

### 0.2.0

* (unltdnetworx) cleanup and bugfix for restart and storage

### 0.1.0

* (unltdnetworx) fully working release for LTE_API

### 0.0.1

* (unltdnetworx) initial release

## License

MIT License

Copyright (c) 2019 Michael Schuster

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