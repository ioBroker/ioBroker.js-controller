---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.luftdaten/README.md
title: ioBroker.luftdaten
hash: xVdeyCQIZ18NQX8QFGf5y8NLoKX1+aLSr0BZIvU3WR0=
---
![Logo](../../../en/adapterref/iobroker.luftdaten/admin/luftdaten.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.luftdaten.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.luftdaten.svg)
![Stabil](http://iobroker.live/badges/luftdaten-stable.svg)
![Eingerichtet](http://iobroker.live/badges/luftdaten-installed.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/klein0r/iobroker.luftdaten.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/klein0r/ioBroker.luftdaten/badge.svg)
![Build-Status](http://img.shields.io/travis/klein0r/ioBroker.luftdaten.svg)
![NPM](https://nodei.co/npm/iobroker.luftdaten.png?downloads=true)

# IoBroker.luftdaten
Dieser Adapter fügt Ihrer ioBroker-Installation Sensordaten "luftdaten.info" hinzu.
Sie können entscheiden, ob Sie einen lokalen Sensor per IP hinzufügen möchten oder ob Sie nur die API von lufdaten.info verwenden möchten, um die Daten eines anderen Sensors abzurufen.

## Aufbau
### Lokal
1. Erstellen Sie Ihren eigenen Adapter und fügen Sie ihn Ihrem lokalen WLAN-Netzwerk hinzu
2. Erstellen Sie eine neue Instanz des Adapters
3. Wählen Sie als Typ "Lokal"
4. Geben Sie die IP oder den Hostnamen des Sensors in den zweiten Eingang ein
5. Wählen Sie einen Namen und speichern Sie die Einstellungen

Warten Sie einige Minuten, bis der Cronjob die Daten zum ersten Mal sammelt.

*Sie können die Zeitplaneinstellungen auf der Registerkarte "Instanzen" ändern (Standard ist alle 15 Minuten).*

### Fernbedienung
1. Wählen Sie einen der Sensoren auf der Online-Karte: [deutschland.maps.luftdaten.info] (https://deutschland.maps.luftdaten.info/)
2. Klicken Sie auf den Sensor und kopieren Sie die ID (#XXXXX).
3. Erstellen Sie eine neue Instanz des Adapters
4. Wählen Sie als Typ "Remote"
5. Geben Sie die ID des Sensors in den zweiten Eingang ein (ohne #).
6. Wählen Sie einen Namen und speichern Sie die Einstellungen

Warten Sie einige Minuten, bis der Cronjob die Daten zum ersten Mal sammelt.

*Sie können die Zeitplaneinstellungen auf der Registerkarte "Instanzen" ändern (Standard ist alle 15 Minuten).*

## Mitwirkende
- klein0r
- pix
- GermanBluefox
- Apollon77
- Dominik-Lienemann

## Changelog

### 1.0.3

* (klein0r) Remove non-numeric characters from sensor id

### 1.0.2

* (klein0r) Fixed async object creation

### 1.0.1

* (klein0r) Added iobroker sentry

### 1.0.0

* (klein0r) First stable release

### 0.0.18

* (klein0r) Added units for pressure and noise

### 0.0.17

* (klein0r) Added link to sensor map

### 0.0.16

* (klein0r) Minor bugfixes

### 0.0.15

* (klein0r) setTimeout found in main.js, but no clearTimeout detected

### 0.0.14

* (klein0r) Fixed sensor data check issue

### 0.0.13

* (klein0r) Added missing translations

### 0.0.12

* (klein0r) Minor bugfixes
* (dominik-lienemann) Added timestamp of last sensor update

### 0.0.11

* (klein0r) fixed units of states

### 0.0.10

* (klein0r) changed API url

### 0.0.9

* (klein0r) minor bugfixes

### 0.0.9

* (klein0r) improved logging

### 0.0.8

* (klein0r) added response time and units

### 0.0.7

* (klein0r) merged pull requests - thanks a lot for contribution

### 0.0.6

* (klein0r) changed type to weather

### 0.0.5

* (klein0r) fixed issues when sensor is not available
* (klein0r) added location information for remote sensors

### 0.0.4

* (pix) path is IP if sensor is local

### 0.0.3

* (pix) path and sensor name added

### 0.0.1

* (klein0r) initial release

## License

The MIT License (MIT)

Copyright (c) 2021 Matthias Kleine <info@haus-automatisierung.com>

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