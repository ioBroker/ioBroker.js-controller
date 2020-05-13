---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.hmip/README.md
title: ioBroker HomeMatic IP Cloud AccessPoint-Adapter
hash: imIQYuotL4N4nhDankZmeV6Bqio97DpYIi1pbbS4MAE=
---
![Logo](../../../en/adapterref/iobroker.hmip/admin/homematic.png)

![Anzahl der Installationen](http://iobroker.live/badges/hmip-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.hmip.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.hmip.svg)
![Build-Status](https://travis-ci.org/iobroker-community-adapters/ioBroker.hmip.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.hmip.png?downloads=true)
![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.hmip.svg)

# IoBroker HomeMatic IP Cloud AccessPoint-Adapter
** Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. ** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Beschreibung
Dieser Adapter ermöglicht die Kommunikation mit einem HomematicIP CloudAccessPoint über die Rest-API der Homematic IP Cloud

## Installation
Dieser Adapter benötigt Node-Js in Version> = 8.6

Hier ein schrittweises Installationsvideo auf YouTube https://youtu.be/kXWfJRUYJIA

## Die Info
Die meisten Homematic IP-Geräte arbeiten bereits mit der neuesten Adapterversion.

Ich werde es ständig verbessern, aber es wird einige Zeit dauern. Jede Hilfe von der Community durch z. Pull Request wäre sehr dankbar.

Wenn Sie nicht mit HmIP-Geräten arbeiten, erstellen Sie bitte ein Problem mit diesen Informationen (bitte eines pro Gerät und wenn möglich den technischen Namen im Betreff).
Schalten Sie die Adapterprotokollierung in ioBroker in den dummen Modus und fügen Sie den json des Geräts, das gedruckt wird, dem Protokoll in der Ausgabe hinzu.
Möglicherweise brauche ich auch einen Statuswechsel.

Vielen Dank

## Wichtige Informationen, was mit diesem Adapter gemacht werden kann
!!! Mit diesem Adapater können Sie nur Ereignisse auslösen, die über die ursprüngliche Homematic IP-App ausgelöst werden können.
Zum Beispiel haben direkte Verbindungen zwischen Geräten keine Ereignisse in der App und können auch nicht über diesen Adapter ausgelöst werden !!!

## Die Einstellungen
* Geben Sie Ihre SGTIN (Rückseite des Access Points) und die PIN (falls zuvor festgelegt) ein und validieren Sie die Daten durch Drücken der blauen LED-Taste. Dadurch wird ein Authentifizierungstoken erstellt.

## Vielen Dank
an coreGreenberet für seine Python-Bibliothek (https://github.com/coreGreenberet/homematicip-rest-api)

## Diskussion im ioBroker Forum
https://forum.iobroker.net/topic/27532/homematic-ip-cloud-access-point-adapter

## Adapter Request auf GitHub
https://github.com/ioBroker/AdapterRequests/issues/62

## Changelog

### 1.0.0 (2020-05-12)
* (Apollon77) Add Sentry for error/crash reporting
* (Apollon77) multiple fixes and optimizations
* (Apollon77) prevent adapter crashes in some places
* (Apollon77) 
* (ApolloSK) add vaporAmount for WeatherSensorPro
* (ApolloSK) fix HmIP-SWO-PR wrong DataType actualTemperature
* (marcus0303) Added DEVICE_GLOBAL_PUMP_CONTROL, FLOOR_TERMINAL_BLOCK_LOCAL_PUMP_CHANNEL and DEVICE_INCORRECT_POSITIONED, Fixed role in _createWaterSensorChannel and function call in _createWeatherSensorPlusChannel
* (marcus0303) Added CONTACT_INTERFACE_CHANNEL for HmIP-SCI (see Issue #70 ), Added FLOOR_TERMINAL_BLOCK_CHANNEL, HEAT_DEMAND_CHANNEL, DEHUMIDIFIER_DEMAND_CHANNEL, CHANGE_OVER_CHANNEL, but without functionality, because it's not implemented in REST-API. Only to supress Warnings in Log.

### 0.0.12
* (jogibear9988) multiple fixes

### 0.0.11
* (jogibear9988) multiple fixes

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