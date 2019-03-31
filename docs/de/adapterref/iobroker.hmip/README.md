---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.hmip/README.md
title: ioBroker HomeMatic IP-Cloud-AccessPoint-Adapter
hash: fS8rqMEwf/UAtQcMWUi7uOElSKwPS3muB8UHLj9b3I4=
---
![Logo](../../../en/adapterref/iobroker.hmip/admin/homematic.png)

![Anzahl der Installationen](http://iobroker.live/badges/hmip-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.hmip.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.hmip.svg)
![Build-Status](https://travis-ci.org/iobroker-community-adapters/ioBroker.hmip.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.hmip.png?downloads=true)
![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.hmip.svg)

# IoBroker HomeMatic IP Cloud AccessPoint Adapter
## Beschreibung
Dieser Adapter ermöglicht die Kommunikation mit einem HomematicIP CloudAccessPoint über die Rest-API der Homematic IP Cloud

## Installation
Dieser Adapter benötigt Node-js in Version> = 8.6

## Info
Die meisten Homematic IP-Geräte arbeiten bereits mit der neuesten Adapterversion.

Ich werde es ständig verbessern, aber es wird Zeit brauchen. Jede Hilfe von der Community durch z. Pull Request wäre sehr dankbar.

Für nicht funktionierende HmIP-Geräte legen Sie bitte ein Problem mit dieser Information an (bitte eines pro Gerät und wenn möglich den technischen Namen im Betreff).
Wechseln Sie die Adapterprotokollierung in ioBroker in den Silly-Modus und fügen Sie den Json des Geräts hinzu, der in der Protokolldatei in der Ausgabe gedruckt wird.
Ich brauche vielleicht auch einen Json einer Zustandsänderung.

Vielen Dank

## Wichtige Informationen, was mit diesem Adapter gemacht werden kann
!!! Sie können mit diesem Adapter nur Ereignisse auslösen, die über die ursprüngliche IP-App von Homematic ausgelöst werden können.
Beispielsweise haben direkte Verbindungen zwischen Geräten keine Ereignisse in der App und können auch nicht durch diesen Adapter ausgelöst werden !!!

## Die Einstellungen
* Geben Sie Ihre SGTIN (Rückseite des Zugangspunkts) und die PIN (falls zuvor festgelegt) ein, und bestätigen Sie die Daten durch Drücken der blauen LED-Taste. Dadurch wird ein Authentifizierungstoken erstellt.

## Vielen Dank
zu coreGreenberet für seine Python-Bibliothek (https://github.com/coreGreenberet/homematicip-rest-api)

## Diskussion im ioBroker Forum
https://forum.iobroker.net/viewtopic.php?f=36&t=21000#p220517

## Adapter Request auf GitHub
https://github.com/ioBroker/AdapterRequests/issues/62

## Changelog

### 0.0.10
* (jogibear9988) added ping/pong, enable setBoots, more units, more hardware

### 0.0.9
* (jogibear9988) fullrx and operationlock channel

### 0.0.8
* (jogibear9988) fixes a few devices

### 0.0.7
* (jogibear9988) fixes wrong state handling

### 0.0.6
* (jogibear9988) fixes for more devices, alarm handling

### 0.0.5
* (jogibear9988) more devices and big refactoring (switched from DeviceType to FunctionalChannelType)

### 0.0.4
* (jogibear9988) more devices, bugfixes. thanks to TobiasF1986, steckenpferd and Ma-ster77

### 0.0.3
* (jogibear9988) bugfixes and more devices 

### 0.0.2
* (jogibear9988) bugfixes, more devices and initial support of groups

### 0.0.1
* (jogibear9988) initial release

## License
The MIT License (MIT)

Copyright (c) 2018-2019 jogibear9988 <jochen.kuehner@gmx.de>

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