---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.shelly/README.md
title: ioBroker.shelly
hash: iTZ24wv7VPSFx9I1I0uKeEtbGYOylVSdzg+T+Q3pdF4=
---
![Logo](../../../en/adapterref/iobroker.shelly/admin/shelly.png)

![Build-Status](https://travis-ci.org/schmupu/ioBroker.shelly.svg?branch=master)
![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.shelly?branch=master&svg=true)
![Anzahl der Installationen](http://iobroker.live/badges/shelly-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.shelly.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.shelly.svg)
![NPM](https://nodei.co/npm/iobroker.shelly.png?downloads=true)

# IoBroker.shelly ===================
Benötigt node.js 6.0 oder höher und Admin v3!

Der Adapter kommuniziert mit Shelly-Geräten von REST api und dem CoAP-Protokoll mit der Standard-Shelly-Firmware (kein Flashen der Firmware erforderlich!).
Da CoAP Multicast-UDP-Pakete verwendet, müssen sich die Shelly-Geräte im selben Subnetz wie ioBroker befinden.
Wenn Sie ioBroker in einem Docker-Container verwenden, muss der Container im Host- oder Macvlan-Modus ausgeführt werden.

Weitere und detaillierte Informationen zum Gerät finden Sie hier: [Shelly](https://shelly.cloud/)

## Installation
1. Installieren Sie den Adapter
2. Keine Konfiguration erforderlich. Shelly-Geräte werden automatisch erkannt und hinzugefügt. Manchmal müssen Sie das shelly-Gerät neu starten oder es einmal über die App steuern, bevor es in ioBroker angezeigt wird.

## Unterstützte Geräte
* Shelly1 (SHSW-1, verifiziert)
* Shelly2 (SHSW-21 / SHSW-22, Verified)
* ShellyRGBW (SHRGBWW-01, Verified)
* ShellyRGBW2 (SHRGBW2-01, nicht verifiziert und getestet)
* Shelly4Pro (SHSW-44, nicht verifiziert und getestet)
* ShellyPlug (SHPLG-1, nicht verifiziert und getestet)
* ShellyRGBW (SHRGBWW-01, Verified)
* Shelly H & T (SHHT-1, verifiziert)
* Shelly Smoke (SHSM-01, verifiziert)

## Weitere Details zur Implementierung (Debug-Protokoll)
* ShellySense (SHSEN-1)
* ShellyBulb (SHBLB-1d)
* Shelly2LED (SH2LED-1)

## Changelog

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

### 2.0.2 (22.12.2018)
* Add Shelly H&T. 

### 2.0.1 (22.12.2018)
* Major update because of problems with CoAP messages. 

### 1.0.2 (17.12.2018)
* Work around for showing states in shutter/roller modus

### 1.0.1 (07.12.2018)
* Add shutter/roller position

### 1.0.0 (10.11.2018)
* Optimizations and Online status fixed

### 0.2.6 (31.10.2018)
* Two new datapoints (AutoTimerOn and AutoTimerOn) for Shelly 1/2

### 0.2.5 (13.10.2018)
* Hostname instead of ip address will be shown

### 0.2.4 (10.10.2018)
* Channel name can be overwrite with own name

### 0.2.3 (01.10.2018)
* Bugfixing, shutter status display

### 0.2.2 (30.09.2018)
* Bugfixing, on start default value of timer and duration of relay and shutter will be 0 sec

### 0.2.1 (28.09.2018)
* Username/Password supported

### 0.2.0 (28.09.2018)
* Roller / Shutter for Shelly2 supported

### 0.1.1 (21.09.2018)
* Bugfixing

### 0.1.0 (20.09.2018)
* First Version. Supports all Shelly switches like Shelly 1, Shelly 2, Shelly 4 and the power sockets.

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