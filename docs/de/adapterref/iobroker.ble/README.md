---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ble/README.md
title: kein Titel
hash: YNZ2fo31kVKfBzn0EfVaziHuYIosuCcYilF2oxY/Kbo=
---
![Build Status](https://travis-ci.org/AlCalzone/ioBroker.ble.svg?branch=master)
![Anzahl der Installationen](http://iobroker.live/badges/ble-stable.svg?break_cache=1)

<img src="admin/ble.png" height="48" /> ioBroker.ble

=================

================

Überwachen Sie BLE-Beacons (Bluetooth Low Energy) und zeichnen Sie deren Informationen auf.
Derzeit wird nur die Aufzeichnung von *beworbenen* Dienstdaten unterstützt. Sie können mithilfe der nRF Connect-App (Dienstdaten-UUIDs) überwachen, welche Dienste angekündigt werden.
Merkmale des Verbindungs- und Lese- / Schreibdienstes werden in einer zukünftigen Version unterstützt.

## Installation
Dieser Adapter benötigt zusätzliche Bibliotheken zum Kompilieren. Ausführliche Anweisungen finden Sie unter https://github.com/sandeepmistry/noble#prerequisites.
Auf Raspberry Pi und ähnlichem sollte dies so aussehen: `sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev libcap2-bin`

Wenn der Adapter startet, sich aber nicht mit Ihrer Bluetooth-Hardware verbindet, überprüfen Sie bitte den Status von `info.driverState` in ioBroker. Wenn es sich um §§SSSSS_1§ handelt, müssen Sie `node` zusätzliche Berechtigungen erteilen. Für Linux ist dies so einfach wie

```bash
sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)
```

Hierfür muss `libcap2-bin` installiert sein.

## Aufbau
Wenn Sie mehrere Bluetooth-Geräte in Ihrem System haben, wählen Sie das zu verwendende aus der Dropdown-Liste aus.
Geben Sie in das Textfeld unten alle UUIDs der angekündigten Dienste ein, die Sie aufzeichnen möchten (wie in der nRF Connect-App angegeben).

## Plugin-System
Der Adapter unterstützt die Erweiterung über Plugins. Diese definieren, welche beworbenen Dienste abgehört werden sollen und wie die Daten übersetzt werden sollen. Die Plugin-Struktur ist in https://github.com/AlCalzone/ioBroker.ble/blob/master/src/plugins/plugin.ts definiert. Ein Beispiel für ein funktionierendes Plugin finden Sie hier https://github.com/AlCalzone /ioBroker.ble/blob/master/src/plugins/_default.ts

Wenn Sie ein Gerät haben, das speziell codierte Informationen über Werbung überträgt, können Sie eine PR mit einem neuen Plug-In für diese erstellen.

### Unterstützte Plugins
* "xiaomi": Alle xiaomi Bluetooth-Sensoren, einschließlich
  * [Flower Care Pflanzensensor] (https://xiaomi-mi.com/sockets-and-sensors/xiaomi-huahuacaocao-flower-care-smart-monitor/)
  * [Mijia-Temperatur- und Feuchtigkeitssensor] = USA)
* "mi-flora": Original Plugin für den Flower Care Plant Sensor, jetzt mit dem Alias "xiaomi"
* `` "ruuvi-tag" `: [Ruuvi Tag] (https://tag.ruuvi.com/) Multisensor mit Firmware-Versionen v1 und v2. **Ungetestet, bitte Feedback geben!**

## Changelog

### 0.7.4 (2019-07-03)
* (AlCalzone) Removed dependency to admin instance on slaves
* (AlCalzone) Several dependency updates

### 0.7.3 (2019-04-05)
* (AlCalzone) Add MiTemperature watch with E-Ink display

### 0.7.2 (2019-04-05)
* (AlCalzone) Add `58:2d:34` as an alternative mac prefix for MiTemperature

### 0.7.0 (2019-02-05)
* (AlCalzone) Support MaterializeCSS (Admin v3)
* (AlCalzone) Support compact mode
* (AlCalzone) Use @iobroker/testing for tests

### 0.6.0 (2018-12-23)
* (AlCalzone) Add NodeJS 10 support
* (AlCalzone) Add an option to disallow new devices

### 0.5.5 (2018-11-29)
* (AlCalzone) Bugfix: Preserving object properties works again

### 0.5.3 (2018-11-23)
* (AlCalzone) Cache objects for a short while instead of retrieving them from ioBroker all the time
* (AlCalzone) Support negative temperatures from Xiaomi devices

### 0.5.2 (2018-03-28)
* (AlCalzone) Fixed `isHandling` for the `ruuvi-tag` plugin

### 0.5.1 (2018-03-28)
* (AlCalzone) Restored accidentally deleted `mi-flora` plugin.

### 0.5.0 (2018-03-27)
* (JonasR & AlCalzone) Added support for the Ruuvi Tag with the `ruuvi-tag` plugin

### 0.4.2 (2018-03-27)
* (AlCalzone) Fixed the parsing of temperature+humidity packets from the Xiaomi temperature sensor

### 0.4.1 (2018-03-24)
* (AlCalzone) Forgot to load legacy `mi-flora` plugin
* (AlCalzone) Fixed an error when a plugin defines no objects

### 0.4.0 (2018-03-24)
* (zuvielx9 & AlCalzone) Support for all Xiaomi bluetooth sensors using the `xiaomi` plugin
* (AlCalzone) reworked plugin system slightly

### 0.3.5 (2018-03-18)
* (AlCalzone) Bugfix: Next attempt at preserving object properties like history and name

### 0.3.4 (2018-01-01)
* (AlCalzone) Bugfix: Keep `history` settings by not overriding existing objects
* (AlCalzone) Bugfix: When plugins return `undefined`, ignore the packet

### 0.3.3 (2017-11-24)
* (AlCalzone) Enable logging of RSSI

### 0.3.2 (2017-09-27)
* (AlCalzone) Add * wildcard for "all services"

### 0.3.1 (2017-09-27)
* (AlCalzone) Bugfix: don't throw error when RSSI state doens't exist

### 0.3.0 (2017-09-27)
* (AlCalzone) Support throttling of RSSI updates

### 0.2.2 (2017-09-27)
* (AlCalzone) Bugfix: Only monitor services from _enabled_ plugins

### 0.2.1 (2017-09-27)
* (AlCalzone) Bugfix: last patch broke the service filtering

### 0.2.0 (2017-09-26)
* (AlCalzone) Modularized the adapter code into a plugin system
* (AlCalzone) Added Mi-Flora plugin

### 0.1.0 (2017-09-06)
* (AlCalzone) Support selection of bluetooth devices

### 0.0.2 (2017-09-06)
* (AlCalzone) Store more information, improved object structure.

### 0.0.1
* (AlCalzone) initial release

## License
The MIT License (MIT)

Copyright (c) 2017-2019 AlCalzone <d.griesel@gmx.net>

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