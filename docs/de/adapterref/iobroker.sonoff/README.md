---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sonoff/README.md
title: ioBroker Sonoff
hash: 3sJtUS1rjlgVC9EW6ImdUqJPd9fS0yVC1S2ABMdysCw=
---
![Logo](../../../en/adapterref/iobroker.sonoff/admin/sonoff.png)

![Anzahl der Installationen](http://iobroker.live/badges/sonoff-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.sonoff.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sonoff.svg)
![Tests](https://travis-ci.org/ioBroker/ioBroker.sonoff.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.sonoff.png?downloads=true)

# IoBroker Sonoff
## Verwendung
Dieser Adapter kommuniziert mit Sonoff-Geräten mit Tasmota-Firmware oder ESP-Geräten über MQTT.

Folgende Themen werden erwartet:

- `tele / DeviceNAME / STATE`
- `tele / DeviceNAME / SENSOR`
- `tele / DeviceNAME / INFOx`
- `tele / DeviceNAME / ENERGY`
- `cmnd / DeviceNAME / POWERx`
- `stat / DeviceNAME / POWERx`
- `/ DeviceNAME / BM280 / Temperature`
- `/ DeviceNAME / BM280 / Humidity`
- `/ DeviceNAME / BM280 / Temperatur`
- `/ DeviceNAME / BM280 / Verletzungen`
- `/ DeviceNAME / BM280 / Vcc`
- `/ DeviceNAME / BM280 / VCC`
- `/ DeviceNAME / BM280 / Runden`
- `/ DeviceNAME / BM280 / RSSI`
- `/ DeviceNAME / BM280 / POWER`
- `/ DeviceNAME / BM280 / POWER1`
- `/ DeviceNAME / BM280 / POWER2`
- `/ DeviceNAME / BM280 / POWER3`
- `/ DeviceNAME / BM280 / POWER4`
- `/ DeviceNAME / BM280 / Switch1`
- `/ DeviceNAME / BM280 / Switch2`
- `/ DeviceNAME / BM280 / Total`
- `/ DeviceNAME / BM280 / Today`
- `/ DeviceNAME / BM280 / heute`
- `/ DeviceNAME / BM280 / Yesterday`
- `/ DeviceNAME / BM280 / gestern`
- `/ DeviceNAME / BM280 / Faktor`
- `/ DeviceNAME / BM280 / Factor`
- `/ DeviceNAME / BM280 / Power`
- `/ DeviceNAME / BM280 / Leistung`
- `/ DeviceNAME / BM280 / Voltage`
- `/ DeviceNAME / BM280 / Spannung`
- `/ DeviceNAME / BM280 / Current`
- `/ DeviceNAME / BM280 / Strom`
- `/ DeviceNAME / BM280 / Punkt`
- `/ DeviceNAME / BM280 / Counter1`
- `/ DeviceNAME / BM280 / Counter2`
- `/ DeviceNAME / BM280 / Counter3`
- `/ DeviceNAME / BM280 / Counter4`
- `/ DeviceNAME / BM280 / Pressure`
- `/ DeviceNAME / BM280 / SeaPressure`
- `/ DeviceNAME / BM280 / Druck`
- `/ DeviceNAME / BM280 / Ca. Höhe`
- `/ DeviceNAME / BM280 / Module`
- `/ DeviceNAME / BM280 / Version`
- `/ DeviceNAME / BM280 / Hostname`
- `/ DeviceNAME / BM280 / IPAddress`
- `/ DeviceNAME / BM280 / IPaddress`
- `/ DeviceNAME / BM280 / RestartReason`
- `/ DeviceNAME / BM280 / CarbonDioxide`
- `/ DeviceNAME / DHT11 / Illuminance`
- `/ DeviceNAME / SonoffSC / Light`
- `/ DeviceNAME / SonoffSC / Noise`
- `/ DeviceNAME / SonoffSC / AirQuality`
- `/ DeviceNAME / SDS0X1 / PM2.5`
- `/ DeviceNAME / SDS0X1 / PM10`
- `/ DeviceNAME / SDS0X1 / UvLevel`
- `/ DeviceNAME / SDS0X1 / Latitude`
- `/ DeviceNAME / SDS0X1 / Longitude`
- `/ DeviceNAME / SR04 / Distance`

** Hinweis **: Die Liste kann leicht erweitert werden. Bitte senden Sie `Pull Requests` oder *Debug-Daten* für unbekannte Zustände an den Entwickler (per Ausgabe).

## Automatische Erstellung von Objekten
In der Webkonfiguration können Sie festlegen, welche MQTT-Telegramme die neuen Objekte erstellen, die sich nicht in Standarddatenpunkten befinden

* `TELE_SENSOR` erstellt Objekte aus` tele / xxx / SENSOR` Telegrammen
* `TELE_STATE` erstellt Objekte aus` tele / xxx / STATE` Telegrammen
* `STAT_RESULT` erstellt Objekte aus` stat / xxx / RESULT` Telegrammen

Normalerweise sollte TELE_SENSOR für die meisten Benutzer ausreichend sein.

* `Objektbaum erstellen` erstellt Objekte als Baumstruktur

** Warnung! ** Diese Option bringt Ihren Sonoff-Objektbaum durcheinander! Sie müssen alle Einstellungen für die Speicherung wiederholen ...
Speichern Sie die Objektstruktur als JSON-Datei, damit Sie Ihre alte Struktur neu erstellen können.
Am besten stoppen Sie den Adapter, löschen alle Objekte unter sonoff und starten den Adapter erneut.

## Flags für LED-Controller
Die Moduszustände werden nur erstellt, wenn das Gerät einen der folgenden Zustände hat:

- "Rot", "Grün", "Blau", "WW", "CW", "Farbe", "RGB_POWER", "WW_POWER", "CW_POWER", "Farbton", "Sättigung"

Zustände:

* `modeLedExor` - Exor für weiße LEDs und Farb-LEDs => Wenn die weißen LEDs eingeschaltet sind, werden die Farb-LEDs ausgeschaltet und umgekehrt (Standard wahr)
* `modeReadColors` - Ermöglicht das Lesen von Farben aus MQTT (Standardwert false)

## Changelog

### __WORK IN PRGRESS__
* (anwa) add several datapoints
* (anwa) Fix tranlation for 'ignorePings'
* (anwa) Fix wrong unit for humidity
* (anwa) Config option to create a complete object tree instead of a flat structure
* (anwa) Change Action type to string
* (Apollon77) js-controller 2.0 is required at least

### 2.3.3 (2019-11-27)
* (bluefox) Error with empty packet was caught

### 2.3.2 (2019-10-23)
* (bluefox) Fixed the password input in the configuration
* (bluefox) Allowed to set the IP interface for server
* (bluefox) Fixed tests for js-controller 2.0
* (bluefox) Fixed the monitoring of the client connection
* (bluefox) Changed "indicator.connected" to "indicator.reachable" for clients
* (bluefox) Supported `{POWERn: "true"}`
* (bluefox) Correct processing of `{temp: nan}`

### 2.2.3 (2019-01-10)
* (simatec) Support for comapct mode

### 2.2.2 (2018-06-22)
* (bluefox) Configuration was fixed

### 2.2.1 (2018-06-20)
* (bluefox) '-' in names was allowed again

### 2.2.0 (2018-05-22)
* (gemu2015) auto generate objects, support for arrays (channel), ledcontrollers improved

### 2.1.3 (2018-05-08)
* (bluefox) Added HC-SR04 Ultrasonic Sensor

### 2.1.2 (2018-04-23)
* (bluefox) Added support of UvLight, Longitude and Latitude

### 2.1.1 (2018-04-13)
* (bluefox) Support of the particle concentration sensor

### 2.1.0 (2018-03-30)
* (gemu2015) Support of the devices control (many thanks :)
* (gemu2015) Support of many new values
* (modmax) Update alive status of the clients
* (modmax) Added POWER5-8 and Switch3-4

### 2.0.2 (2018-03-19)
* (modmax) Fixing reconnection of clients
* (bluefox) Add SeaPressure

### 2.0.1 (2018-03-17)
* (bluefox) Replace stream handler
* (bluefox) Add timeout for clients
* (bluefox) Add Light/Noise/AirQuality
* (bluefox) Do not send pingresp for invalid clients

### 1.0.3 (2018-03-03)
* (bluefox) Add Analog0/1/2/3 sensor

### 1.0.2 (2018-02-17)
* (Apollon77) Add Illuminance sensor

### 1.0.1 (2018-02-05)
* (bluefox) Ready for admin3
* (bluefox) Added CO2 sensor

### 1.0.0 (2017-11-27)
* (AlZiBa) typo @ alive
* (AlZiBa) add Todays power consumption for Sonoff POW
* (AlZiBa) unit of power consumption is kWh

### 0.3.3 (2017-11-03)
* (bluefox) Add counters

### 0.3.2 (2017-10-22)
* (Tan-DE) Small change for Switch1. Switch2 and additional IPaddress added.

### 0.3.1 (2017-10-12)
* (bluefox) Fix tests and LWT

### 0.3.0 (2017-10-06)
* (bluefox) Add INFO and ESP

### 0.2.0 (2017-10-05)
* (bluefox) Add ENERGY and DS18x20

### 0.1.0 (2017-10-01)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2017-2019, bluefox <dogafox@gmail.com>

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