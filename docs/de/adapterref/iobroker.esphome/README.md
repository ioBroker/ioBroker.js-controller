---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.esphome/README.md
title: ioBroker.esphome
hash: i0jIzhp5OlhVc4b6frxgJYvg1A4EbqdBspOSUAQwCHI=
---
![Logo](../../../en/adapterref/iobroker.esphome/admin/esphome.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.esphome.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.esphome.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/esphome-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/esphome-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/DrozmotiX/iobroker.esphome.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/DrozmotiX/ioBroker.esphome/badge.svg)
![NPM](https://nodei.co/npm/iobroker.esphome.png?downloads=true)

# IoBroker.esphome
** Tests: ** ![Testen und freigeben](https://github.com/DrozmotiX/ioBroker.esphome/workflows/Test%20and%20Release/badge.svg)

## ESPHome-Adapter für ioBroker
Steuern Sie Ihren ESP8266 / ESP32 mit einfachen, aber leistungsstarken Konfigurationsdateien, die von ESPHome erstellt und verwaltet werden.
Der Adapter stellt über seine native API eine Verbindung zum von ESPHome verwalteten Gerät her und stellt sicher, dass alle Daten synchronisiert sind (Live-Ereignisbehandlung, keine Datenabfrage! :)

Dieser Adapter verwendet die [esphome-native-api](https://github.com/Nafaya/esphome-native-api#readme) mit allen Credits an @Nafaya, danke!

## [Dokumentation](https://DrozmotiX.github.io/languages/en/ESPHome/)
Alle unsere Adapterdokumentationen finden Sie unter [Die DrozmotiX Docu Seite](https://DrozmotiX.github.io)

## Voraussetzungen
Sie sollten mit der Verwendung von ESPHome vertraut sein und der YAML-Datei Geräte / Sensoren hinzufügen.
Stellen Sie sicher, dass die API aktiviert ist, da der Adapter über die native ESPHome-API interagiert. Sie können bei Bedarf ein Kennwort definieren. [Siehe ESPHome-API-Referenz](https://esphome.io/components/api.html?highlight=api)

```
api:
  password: 'MyPassword'
```

Beispielkonfiguration, weitere Beispiele siehe [Die DrozmotiX Docu-Seite] (https://DrozmotiX.github.io) oder [ESPHome-Dokumentation](https://esphome.io/index.html)

```
esphome:
  name: sensor_badkamer
  platform: ESP32
  board: esp-wrover-kit

wifi:
  use_address: 192.168.10.122
  ssid: "xxxxx"
  password: "xxxxxx"

# Enable ESPHome API
api:
    password: 'MyPassword'
# Activate i2c bus
i2c:
  sda: 21
  scl: 22
  scan: True
  id: bus_a

# Example configuration for bh1750
sensor:
  - platform: bh1750
    name: "Hal_Illuminance"
    address: 0x23
    measurement_time: 69
    update_interval: 10s

# Example configuration for an GPIO output
output:
  - platform: gpio
    pin: 12
    inverted: true
    id: gpio_12

# Example configuration linking a switch to the previous defined output
switch:
  - platform: output
    name: "Generic Output"
    output: 'gpio_12'

```

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

### 0.1.5 (2021-03-21)
* (DutchmanNL) Add Translations

### 0.1.4 (2021-03-19)
* (DutchmanNL) Implemented RGBW
* (DutchmanNL) Ensure correct encryption and storage of passwords
* (DutchmanNL) Proper value ranges for type light (255 instead 100)
* (DutchmanNL) Implemented hex color state for type light (if RGB is available)

### 0.1.2 (2021-03-02)
* (DutchmanNL) Type Fan added
* (DutchmanNL) Type Light added
* (DutchmanNL) Error messages optimized
* (DutchmanNL) Device reconnect handling improved
* (DutchmanNL) [Breaking!] Change state name to default "state" for type BinarySensor / Climate / Sensor / TextSensor & Switch  
* (DutchmanNL) Autodiscovery improved, non-ESPHome devices excluded

### 0.1.0 (2021-02-27)
* (DutchmanNL) Autodiscovery implemented
* (DutchmanNL) Type Climat added
* (DutchmanNL) Type TextSensor added
* (DutchmanNL) Solved reconnection issues
* (DutchmanNL) Optimized error messages for unknown types
* (DutchmanNL & @xXBJXx) Adapter configuration page optimized

### 0.0.1
* (DutchmanNL) initial release

## License
MIT License

Copyright (c) 2021 DutchmanNL <rdrozda86@gmail.com>

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