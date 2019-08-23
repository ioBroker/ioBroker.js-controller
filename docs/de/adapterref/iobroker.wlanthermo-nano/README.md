---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.wlanthermo-nano/README.md
title: ioBroker.wlanthermo-nano
hash: 7PaDGgC1a8xJz51Pnob9s7EItyBZ6R+SG8c4g97UNIs=
---
![Logo](../../../en/adapterref/iobroker.wlanthermo-nano/admin/wlanthermo-nano.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.wlanthermo-nano.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.wlanthermo-nano.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/iobroker-community-adapters/iobroker.wlanthermo-nano.svg)
![Anzahl der Installationen](http://iobroker.live/badges/wlanthermo-nano-stable.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.wlanthermo-nano/badge.svg)
![NPM](https://nodei.co/npm/iobroker.wlanthermo-nano.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.wlanthermo-nano/master.svg)

# IoBroker.wlanthermo-nano
## Wlanthermo-nano Adapter für ioBroker
[WLANThermo Nano](https://github.com/WLANThermo-nano/WLANThermo_nano_Software/wiki "WLANThermo Nano"), der digitale Vorteil für Ihren Grillsport

## Aufbau
Der Adapter kann über die Administrationsoberfläche installiert und konfiguriert werden.
Bitte geben Sie in der Instanzkonfiguration IP-Adresse, Benutzername und Passwort ein.

1 Gerät wird unterstützt, wenn Sie ein sekodiertes Gerät überwachen möchten, verwenden Sie bitte die zweite Instanz.
(In zukünftigen Versionen werden mehrere Geräte von 1 Adapter unterstützt).

# Vorerst nicht von Github aus installieren, sondern nur vom ioBroker-Administrator! (Änderung im Repository)
## Machen
* [] Pitmaster-Einstellungen optimieren, Zustände nur im verwandten Modus beschreibbar machen, ansonsten nur lesbar
* [] erlauben mehrere Geräte
* [] Code-Bereinigung

## Changelog

### 0.1.2  (in progress, not released !)
* (DutchmanNL) Support multiple devices

### 0.1.1
* (DutchmanNL) Code optimalisation
* (DutchmanNL) Implement state_attr.js to handle state options outside of source code
* (DutchmanNL) Optimised state creation in 1 function
* (DutchmanNL) Small cleanups

### 0.1.0
* (DutchmanNL) remove color settngs from pitmaster

### 0.0.9
* (DutchmanNL) optimize pid profile setting

### 0.0.8
* (DutchmanNL) fix post command for pitmaster

### 0.0.7
* (DutchmanNL) State unit fixes
* (DutchmanNL) start integration of pidmaster
* (DutchmanNL) rename  type  to modus for pitmaster

### 0.0.6
* (DutchmanNL) make type and alarm selectable with dropdown

### 0.0.5
* (DutchmanNL) add  capability to change sensors

### 0.0.4
* (DutchmanNL) Fix issue with password set
* (DutchmanNL) Implemented new states for config (reboot/update/checkupdate)
* (DutchmanNL) Change  configuration (way of ip-adress, also dyndns now supported)

### 0.0.3
* (DutchmanNL) implement secure storage of login credentials (required to enable setting changes later)

### 0.0.2
* (DutchmanNL) initial release

## License
MIT License

Copyright (c) 2019 DutchmanNL <rdrozda86@gmail.com>

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