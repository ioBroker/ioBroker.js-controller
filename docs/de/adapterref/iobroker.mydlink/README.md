---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mydlink/README.md
title: ioBroker.mydlink
hash: Tx0RggrpUy6Edc2CQQDri98x8JiWjf19dZvAb9iZutk=
---
![Logo](../../../en/adapterref/iobroker.mydlink/admin/mydlink.png)

![Anzahl der Installationen](http://iobroker.live/badges/mydlink-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.mydlink.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.mydlink.svg)
![Tests](https://travis-ci.org/arteck/ioBroker.mydlink.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.mydlink.png?downloads=true)
![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.mydlink.svg)

# IoBroker.mydlink
MyDlink Adapter für ioBroker.
-------------------------------------------------- ----------------------------

Ermöglicht die Steuerung von Steckdosen oder Bewegungsmeldern über [D-Link](https://eu.dlink.com/uk/en/for-home/smart-home) in ioBroker.

** Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. ** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.
Dies hilft auch bei der Unterstützung neuer Geräte.

Derzeit getestete Geräte:

| Modell | Geben Sie | ein Bild |
| :---: | :---: | :---: |
| [DSP-W215](https://eu.dlink.com/uk/en/products/dsp-w215-smart-plug) | Buchse (Buchse, Temperatur, Strom) | ![Bild](../../../en/adapterref/iobroker.mydlink/admin/DSP_W215.png) |
| [DCH-S150] (https://eu.dlink.com/uk/en/products/dch-s150-motion-sensor) | Bewegungsmelder (letzte erkannte Bewegung) | ! [Bild] (admin / DCH_S150.png) |

Der Adapter muss die Geräte abfragen. So werden Sensorwerte und Bewegungserkennung um das Abfrageintervall verzögert (kann in der Konfiguration eingestellt werden).

#### Aufbau:
* globales Abfrageintervall - Der Adapter fragt alle Geräte in diesem Intervall ab, wenn für sie kein bestimmtes Intervall festgelegt wurde. Zum Deaktivieren auf 0 setzen.
* Liste der Geräte, jedes Gerät mit folgenden Einstellungen:

<table><tr><td> Name </td><td> hier einen Namen setzen, muss eindeutig sein (für mydlink Geräte) </td></tr><tr><td> IP </td><td> Geben Sie hier die IP-Adresse ein, der Hostname sollte auch funktionieren </td></tr><tr><td> STIFT </td><td> Die PIN befindet sich auf einem Aufkleber auf dem Gerät, wahrscheinlich unten </td></tr><tr><td> Abfrageintervall </td><td> Lassen Sie das Gerät pro Abfrageintervall leer, um das globale Abfrageintervall zu verwenden. <br /> Setzen Sie 0, um die Abfrage zu deaktivieren. <br /> <b>Empfehlung:</b> Legen Sie ein schnelles Abfrageintervall für Sensoren und ein längeres für Stecker fest. </td></tr><tr><td> aktivieren </td><td> Wenn nicht aktiviert, wird nicht abgefragt oder gesteuert. <br /> Geräte, die nicht angeschlossen sind, können deaktiviert werden, um Fehlermeldungen im Protokoll zu vermeiden. </td></tr></table>

Der Adapter stört die Nutzung der App nicht.

## Changelog

### 0.0.7
* (Garfonso) added info.connection state
* (Garfonso) suppressed repeated error messages during polling.

### 0.0.6
* (Garfonso) prevent removement of custom details in objects.

### 0.0.5
* (Garfonso) fixed config files for release in latest repository.

### 0.0.4
* (Garfonso) polling interval can now be configured on per device basis (if not configured for a device global poll intervall will be used.) Recommendation: Use high global poll interval and a smaller one for motion detectors.
* (Garfonso) added no_motion state for motion detectors, contains number of seconds since last motion.

### 0.0.3
* (Garfonso) use setStateChanged instead of polling state before writing.
* (Garfonso) minor clean ups.

### 0.0.2
* (Garfonso) move to ioborker-community-adapters

### 0.0.1
* (Garfonso) initial release

## License
MIT License

Copyright (c) 2020 Garfonso <garfonso@mobo.info>

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