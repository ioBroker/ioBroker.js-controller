---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sonoff/README.md
title: ioBroker Sonoff
hash: RSDMeYvJdHdLRa0sQZfy3RIpl1BQYRnCBww693bWEvM=
---
![Logo](../../../en/adapterref/iobroker.sonoff/admin/sonoff.png)

![Anzahl der Installationen](http://iobroker.live/badges/sonoff-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.sonoff.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sonoff.svg)
![Tests](https://travis-ci.org/ioBroker/ioBroker.sonoff.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.sonoff.png?downloads=true)

# IoBroker Sonoff ===============
Benötigt node.js 4.0 oder höher.

## Verwendungszweck
Dieser Adapter kommuniziert mit Sonoff-Geräten mit Tasmota-Firmware oder ESP-Geräten über MQTT.

Folgende Themen werden erwartet:

- tele / Gerätename / ZUSTAND
- tele / Gerätename / SENSOR
- tele / DeviceNAME / INFOx
- tele / DeviceNAME / ENERGY
- cmnd / DeviceNAME / POWERx
- stat / DeviceNAME / POWERx
- / Gerätename / BM280 / Temperatur
- / DeviceNAME / BM280 / Luftfeuchtigkeit
- / DeviceNAME / BM280 / Temperatur
- / DeviceNAME / BM280 / Feuchtigkeit
- / Gerätename / BM280 / Vcc
- / Gerätename / BM280 / VCC
- / DeviceNAME / BM280 / Laufzeit
- / Gerätename / BM280 / RSSI
- / Gerätename / BM280 / POWER
- / Gerätename / BM280 / POWER1
- / Gerätename / BM280 / POWER2
- / Gerätename / BM280 / POWER3
- / Gerätename / BM280 / POWER4
- / DeviceNAME / BM280 / Switch1
- / DeviceNAME / BM280 / Switch2
- / DeviceNAME / BM280 / Gesamt
- / DeviceNAME / BM280 / Today
- / DeviceNAME / BM280 / heute
- / DeviceNAME / BM280 / Gestern
- / DeviceNAME / BM280 / gestern
- / DeviceNAME / BM280 / Faktor
- / DeviceNAME / BM280 / Factor
- / DeviceNAME / BM280 / Power
- / DeviceNAME / BM280 / Leistung
- / DeviceNAME / BM280 / Spannung
- / DeviceNAME / BM280 / Spannung
- / DeviceNAME / BM280 / Current
- / DeviceNAME / BM280 / Strom
- / DeviceNAME / BM280 / Punkt
- / DeviceNAME / BM280 / Counter1
- / DeviceNAME / BM280 / Counter2
- / DeviceNAME / BM280 / Counter3
- / DeviceNAME / BM280 / Counter4
- / DeviceNAME / BM280 / Druck
- / DeviceNAME / BM280 / SeaPressure
- / DeviceNAME / BM280 / Druck
- / DeviceNAME / BM280 / Ca. Höhe
- / DeviceNAME / BM280 / Modul
- / DeviceNAME / BM280 / Version
- / DeviceNAME / BM280 / Hostname
- / DeviceNAME / BM280 / IPAddress
- / DeviceNAME / BM280 / IP-Adresse
- / DeviceNAME / BM280 / RestartReason
- / DeviceNAME / BM280 / Kohlendioxid
- / DeviceNAME / DHT11 / Beleuchtungsstärke
- / DeviceNAME / SonoffSC / Light
- / DeviceNAME / SonoffSC / Noise
- / DeviceNAME / SonoffSC / AirQuality
- /DeviceNAME/SDS0X1/PM2.5
- / Gerätename / SDS0X1 / PM10
- / Gerätename / SDS0X1 / UvLevel
- / Gerätename / SDS0X1 / Latitude
- / Gerätename / SDS0X1 / Längengrad
- / Gerätename / SR04 / Entfernung

** Hinweis **: Die Liste kann leicht erweitert werden. Bitte senden Sie *Pull Requests* oder *Debug-Daten* für unbekannte Zustände an den Entwickler (über ein Problem).

## Automatische Erstellung von Objekten
In der Web-Konfiguration können Sie feststellen, welche MQTT-Telegramme die neuen Objekte anlegen, die nicht in Standard-Datenpunkten liegen

* TELE_SENSOR erzeugt Objekte aus Tele / xxx / SENSOR-Telegrammen
* TELE_STATE erstellt Objekte aus Tele / xxx / STATE-Telegrammen
* STAT_RESULT erzeugt Objekte aus stat / xxx / RESULT-Telegrammen

Normalerweise sollte TELE_SENSOR für die meisten Benutzer ausreichen.

## Flags für LED-Controller
Die Moduszustände werden nur erstellt, wenn das Gerät einen der folgenden Zustände hat:

- 'Rot', 'Grün', 'Blau', 'WW', 'CW', 'Farbe', 'RGB_POWER', 'WW_POWER', 'CW_POWER', 'Hue', 'Saturation'

Zustände:

* modeLedExor - Exor für weiße LEDs und Farbleds => wenn die weißen LEDs eingeschaltet sind, werden die Farb-LEDs ausgeschaltet und umgekehrt (Standardeinstellung ist true)
* modeReadColors - erlaubt das Lesen von Farben aus MQTT (Standardwert false)

## Changelog

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