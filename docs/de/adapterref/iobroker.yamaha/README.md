---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.yamaha/README.md
title: kein Titel
hash: lXGOOhOdLLITEXW7oIwVl9BUiIyU7vTFrTiTPlvTwIc=
---
![Logo](../../../en/adapterref/iobroker.yamaha/admin/yamaha.png)

![Anzahl der Installationen](http://iobroker.live/badges/yamaha-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.yamaha.svg)
![Tests](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.yamaha/master.svg)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

## IoBroker.yamaha
#### Beschreibung
Adapter für Yamaha AV-Receiver

### Ersterstellung
Dieser Adapter wurde ursprünglich von @soef unter https://github.com/soef/ioBroker.yamaha erstellt, aber nicht mehr gewartet. Deshalb haben wir ihn in die iobroker-Community verschoben, damit Fehler behoben werden können. danke @soef für seine arbeit.

#### Aufbau
Derzeit ohne automatische Erkennung müssen Sie die IP Ihres Empfängers eingeben

#### Installation
über ioBroker Admin.

Andernfalls führen Sie den folgenden Befehl im Stammverzeichnis von iobroker aus (z. B. in / opt / iobroker). `` Npm install iobroker.yamaha iobroker upload yamaha ``

#### Echtzeit
Die Zustände werden erstellt, wenn sie genau sind. Das heißt, Verwenden Sie Ihre IR-Fernbedienung und ändern Sie etwas, und Sie werden die neuen Zustände sehen.
Nur eine Verbindung wird von Yamaha-Geräten akzeptiert.

#### Bedarf
Yamaha Reciver

Sie müssen die "Netzwerk-Standby" -Funktion in der Konfiguration Ihres Empfängers aktivieren

## Changelog
### 0.3.21
* (Garfonso) added admin 3 compatibility and more meta-data stuff.
* (Garfonso) added compact mode support.
### 0.3.20
* (Garfonso) adjusted local copy of soef.js to js-controller 3.0
* (Garfonso) updated meta information (links etc) to iobroker-community-adapters
### 0.3.19
* (soef) Changelog added to readme
### 0.3.18
* (Apollon77) Update utils.js and usage, CI Testing and deps
### 0.3.17
* (Apollon77) update basic package-file testing
### 0.3.16
* (soef) node 0.12 removed from testing
### 0.3.15
* (soef) Enhance CI testing
### 0.3.14
* (soef) Possible exception in reconnect fixed
### 0.3.12
* (soef) Version incr. for npm
### 0.3.11
* (soef) reconnect overworked
### 0.3.10
* (soef) realtime Ping now configurable
### 0.3.8
* (soef) realtime states optimized
### 0.3.7
* (soef) fix typo in creating realtime states
### 0.3.6
* (soef) timeout to connect reduced

<!--

## License
The MIT License (MIT)

Copyright (c) 2015-2020 soef <soef@gmx.net>

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
-->