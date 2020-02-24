---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.wled/README.md
title: ioBroker.wled
hash: JlfMTIl0oYXy1Blq5/3T6Uz/DHavUfRYnn7wB2ZZ4/A=
---
![Logo](../../../en/adapterref/iobroker.wled/admin/wled_large.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.wled.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.wled.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/wled-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/wled-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/iobroker-community-adapters/iobroker.wled.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.wled/badge.svg)
![NPM](https://nodei.co/npm/iobroker.wled.png?downloads=true)

# IoBroker.wled
## Wled Adapter für ioBroker
Eine schnelle und funktionsreiche Implementierung eines ESP8266 / ESP32-Webservers zur Steuerung von NeoPixel-LEDs (WS2812B, WS2811, SK6812, APA102)!

[WLED - Github-Projekt](https://github.com/Aircoookie/WLED) von @Aircoookie

## Anleitung
Der Adapter versucht automatisch, WLED-Geräte in Ihrem Netzwerk mithilfe von Bonjour-Diensten zu finden.
Bekannte Probleme: Netzwerke mit VLAN-Trennung leiten den Broadcast-Verkehr meist nicht weiter, was bedeutet, dass die automatische Erkennung fehlschlägt. (siehe To-Do)

1) Stellen Sie sicher, dass Ihr WLED-Gerät läuft und über das Netzwerk erreichbar ist. 2) Installieren Sie den Adapter. 3) Konfigurieren Sie die Intervallzeiten für die Datenabfrage und die automatische Erkennung des Zyklus. 4) Starten Sie den Adapter. Die Geräte sollten automatisch erkannt werden Daten alle x Sekunden (konfigurierbar)

## Machen
* [] konfigurierbare Geräte (derzeit nur automatische Erkennung durch Bonjour)
* [] untersuchen eine bessere Art der Ankündigung von Aufenthaltsänderungen, die derzeit von Polly unterstützt werden
* [x] Spezialbefehle, die nicht in rest-api enthalten sind (wie Voreinstellungen speichern)
* [x] Kontrollsegmente
* [x] Farbänderungen

## Unterstütze mich
Wenn Ihnen meine Arbeit gefällt, können Sie gerne eine persönliche Spende leisten (dies ist ein persönlicher Spendenlink für DutchmanNL, keine Beziehung zum ioBroker-Projekt!) [![Spenden] (https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Changelog
### 0.1.4
- (DutchmanNL) Implement drop down menu for color pallets
- (DutchmanNL) New configuration page

### 0.1.2
- (DutchmanNL) Implement drop down menu for effects

### 0.1.1
* (DutchmanNL) Implemented states hidden from JSON-API : tt / psave / nn / time
* (DutchmanNL) Improve logging issue

### 0.1.0
* (DutchmanNL) initial release

## License
MIT License

Copyright (c) 2020 DutchmanNL <rdrozda86@gmail.com>

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