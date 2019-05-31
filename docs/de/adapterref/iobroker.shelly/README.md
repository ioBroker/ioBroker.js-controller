---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.shelly/README.md
title: ioBroker.shelly
hash: iHKYNFAzLU1k+oLLXj5UuarauihwDx++jGkxZ3HPs/c=
---
![Logo](../../../en/adapterref/iobroker.shelly/admin/shelly.png)

![Build Status](https://travis-ci.org/schmupu/ioBroker.shelly.svg?branch=master)
![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.shelly?branch=master&svg=true)
![Anzahl der Installationen](http://iobroker.live/badges/shelly-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.shelly.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.shelly.svg)
![NPM](https://nodei.co/npm/iobroker.shelly.png?downloads=true)

# IoBroker.shelly
Benötigt node.js 8.0 oder höher und Admin v3!

Der Adapter kommuniziert mit Shelly-Geräten über REST-API und das CoAP- oder MQTT-Protokoll.
Standardmäßig Shelly-Firmware (kein Flashen der Firmware erforderlich!). Weitere und detaillierte Informationen zum Gerät finden Sie hier: [Shelly](https://shelly.cloud/)

## Installation
Eine ausführliche Installationsdokumentation finden Sie hier: [Installationsdokumentation](./docs/EN/INSTALL.md)

## Unterstützte Geräte
| Shelly Device | Standard (CoAP) | MQTT |
|-------------|--------------|----|
| Shelly1 (SHSW-1) | verifiziert | verifiziert |
| Shelly2 (SHSW-21 / SHSW-22) | verifiziert | verifiziert |
| ShellyBulb (SHBLB) | verifiziert | verifiziert |
| Shelly H & T (SHHT-1) | verifiziert | verifiziert |
| Shelly Smoke (SHSM-01) | verifiziert | verifiziert |
| Shelly 1 1PM (SHSW-PM) | verifiziert | verifiziert |
| Shelly 2.5 (SHSW-25) | verifiziert | verifiziert |
| ShellyRGBW (SHRGBWW-01) | verifiziert | verifiziert |
| ShellyRGBW2 (SHRGBW2) | verifiziert | verifiziert |
| Shelly2LED (SH2LED) | verifiziert | verifiziert |
| ShellyPlug (SHPLG-1) | verifiziert | verifiziert |
| ShellyPlug S (SHPLG-1) | verifiziert | nicht verifiziert |
| ShellySense (SHSEN-1) | verifiziert | nicht verifiziert |
| Shelly4Pro (SHSW-44) | verifiziert | nicht verifiziert |

## Changelog

### 3.0.2 (29.05.2019)
* (Stübi) - Support of MQTT QoS 1 and 2 

### 3.0.2 (25.05.2019)
* (Stübi) - Bugfixing and longpush and input states for Shelly 1, 2, 1pm, 2.5 and Shelly RGBWW2 added. Add state temperature to Shelly 1pm, 2.5 and Plug S.  

### 3.0.1 (21.05.2019)
* (Stübi) - Redesign of the adapter. You can choose now between CoAP and MQTT protocol. The Shellys use this protocolls to send there state changes to ioBroker in realtime. Out of the Box the Shelly works with the CoAP protocol. You do not have to configure anything. The Shelly will be found by the Shelly Adapter itself. If you want to use MQTT, you have configure all your Shelly devices. You find a detailed installing documentation here: [Installation Documentation](./docs/EN/INSTALL.md). If you have problems with the version 3.0.1 please change back to 2.2.0 and leave an Issue (bug report) here: [GitHub Issues](https://github.com/schmupu/ioBroker.shelly/issues). 

### 2.2.0 (13.04.2019)
* Add devices Shelly 2.5 and Shelly 1 PM 

### 2.1.9 (31.03.2019)
* Add status 'firmware update' for Shelly RGBW, RGBW2 and Bulb

### 2.1.8 (19.03.2019)
* Consider roller (shutter) position in CoAP message 
* Support of Shelly Sensor

### 2.1.7 (15.03.2019)
* Changing all RGBWW2 colors at the same time
* new RGBWW2 State color.rgbw with the format #RRGGBBWW

### 2.1.6 (08.03.2019)
* Shelly RGBWW2 bug fixing (whit did not work in color mode)

### 2.1.5 (05.03.2019)
* Shelly Smoke Support

### 2.1.4 (20.02.2019)
* Bugfixing of Shelly RGBW2 Support. If you have installed version 2.1.3, please delete all RGBW2 objects first, because the objects will be renamed from lights to color and white in version 2.1.4.   

### 2.1.3 (16.02.2019)
* Support of Shelly RGBW2

### 2.1.0 (09.02.2019)
* New Status 'new firmware available' for Shely1, Shelly2, Shelly4Pro and ShellyPlug 

### 2.0.8 (31.01.2019)
* Bugfixing, polling new Shelly status must be at least 1 sec ago 

### 2.0.7 (21.01.2019)
* Bugfixing for objects AutoTimerOn and AutoTimeroff

### 2.0.6 (12.01.2019)
* Getting faster online status for Shelly devices, excluded H&T. Fix of power status for Shelly Plug.

### 2.0.5 (07.01.2019)
* Fixing an error if Shelly device is not reachable (offline)

### 2.0.4 (04.01.2018)
* Support of js-controller compact mode and performance optimizing. Relay status changes will be shown much faster in ioBroker for Shelly 1, 2 and 4Pro

### 2.0.3 (02.01.2018)
* Shows RSSI Status for Shelly 1 & 2. You need Firmware 1.4.4

## License
The MIT License (MIT)

Copyright (c) 2018-2019 Thorsten Stueben <thorsten@stueben.de>, Apollon77 <iobroker@fischer-ka.de>

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