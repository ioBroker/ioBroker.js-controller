---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mbus/README.md
title: ioBroker.mbus
hash: L2+Sd6JuHqmMmGofP6mrX99ZFTDO+b5dWyzWfWGPXCQ=
---
![Logo](../../../en/adapterref/iobroker.mbus/admin/mbus.png)

![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/Apollon77/ioBroker.mbus.svg)
![Anzahl der Installationen](http://iobroker.live/badges/mbus-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.mbus.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.mbus.svg)
![Travis-CI](http://img.shields.io/travis/Apollon77/ioBroker.mbus/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Apollon77/ioBroker.mbus?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.mbus.png?downloads=true)

# IoBroker.mbus
======================

[![Code Climate] (https://codeclimate.com/github/Apollon77/ioBroker.mbus/badges/gpa.svg)](https://codeclimate.com/github/Apollon77/ioBroker.mbus)

** Dieser Adapter verwendet den Dienst [Sentry.io](https://sentry.io), um Ausnahmen und Codefehler automatisch an mich als Entwickler zu melden. **

Dieser Adapter für ioBroker verbindet sich über TCP oder seriell mit einem M-Bus-Master, um den Status und die Details der angeschlossenen M-Bus-Geräte anzuzeigen.

## Beschreibung der Parameter
### Gateway IP / TCP Port
IP-Adresse und Port des M-Bus Masters / Gateways bei Verwendung von TCP.

### Serielle Schnittstelle / Baudrate
Serielle Schnittstelle und Baudrate von M-Bus Master / Gateway.

### Updateintervall
Intervall in Sekunden zum Aktualisieren der Daten. Die Standardeinstellung (falls leer) ist 3600s (1h). Überlegen Sie, wie die Geräte am M-Bus mit Strom versorgt werden, um ein Entladen der Batterien zu vermeiden. Wenn Sie das Intervall auf 0 setzen, wird das Gerät beim Adapterstart nur einmal gelesen, dann aber nicht mehr automatisch.

### Geräte-IDs
Sie können primäre (1-250) und sekundäre (16 Zeichen lange) M-Bus-IDs verwenden

## Wie lese ich das Gerät auf Anfrage?
In den erstellten Zuständen für jedes Gerät existiert ein Zustand mit dem Namen "updateNow". Wenn Sie dies auf true setzen (als Steueraktion mit ack = false), wird das Gerät sofort aktualisiert. Wenn ein Intervall konfiguriert ist, wird das Intervall neu gestartet, nachdem die Daten empfangen wurden.

## Machen
* verschlüsselte Nutzlastverarbeitung (falls von irgendjemandem benötigt)

## Changelog

### 2.1.0 (2019-12-18)
* add compact mode
* move to more flexible serial port configuration
* add Sentry for error reporting

### 2.0.0 (2019-10-16)
* (lvogt) **BREAKING CHANGE** better handling for values with changing scaling based on the value - maybe incompatible with old values!
* (lvogt) add setting to force kWh values for energy

### 1.1.1 (2018-12-10)
* (Apollon77) make sure adapter is not communicating too fast at the beginning

### 1.1.0 (2018-05-06)
* (bluefox) Error tolerance
* (apollon77) Fix Admin

### 0.1.8 (2018-04-03)
* (apollon77) fix config dialog

### 0.1.7 (2018-04-02)
* (apollon77) allow to set "0" as update interval that will cause in no automatic updates, so only manually using updateNow is possible.

### 0.1.6 (2018-03-26)
* (apollon77) disconnect/reconnect for each query

### 0.1.5 (2018-03-26)
* (apollon77) update to node-mbus 0.5 with shorter timeouts

### 0.1.4 (2018-03-26)
* (apollon77) add "updateNow" states to all devices to trigger manual update
* (apollon77) update to node-mbus 0.4.1 with shorter timeouts

### 0.1.2
* (apollon77) official released version

### 0.0.1
* (apollon77) initial release for testing

## License

The MIT License (MIT)

Copyright (c) 2018-2019 Apollon77 <ingo@fischer-ka.de>

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