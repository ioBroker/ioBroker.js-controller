---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ham/README.md
title: ioBroker Homebridge Zubehörmanager
hash: GXblfm8LZgTzMcAAaBLkqRMDAApWKCYG+LGhtLBXsNw=
---
![Logo](../../../en/adapterref/iobroker.ham/admin/ham.png)

![Anzahl der Installationen](http://iobroker.live/badges/ham-stable.svg)
![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/ioBroker/ioBroker.ham.svg)

# IoBroker Homebridge Zubehörmanager
=================

Verwenden Sie Homebridge-Plugins in ioBroker oder führen Sie einen global installierten Homebridge als ioBroker-Adapter aus.
Alle Staaten von Homebridge werden auch in ioBroker verfügbar sein und können dort auch kontrolliert werden.

## Beschreibung
Dieser Adapter bietet zwei verschiedene Modi:

### Standardmodus (Wrapper)
Im Standardmodus ermöglicht der Adapter die direkte Verwendung von Homebridge-Plugin-Modulen.
Sie können alle verfügbaren Plugins auf der NPM-Website unter [Suche nach dem Stichwort "homebridge-plugin"](https://www.npmjs.com/search?q=homebridge-plugin) erkunden.

Sie fügen einfach die Liste der Module zur Adapter-Konfiguration hinzu und geben die Konfiguration im JSON-Editor an (siehe Plugin-Beschreibungen).
Danach werden auch alle Homebridge-Objekte in ioBroker erstellt und auch alle beschreibbaren Objekte können geändert werden.

Einen Link zu erfolgreich getesteten Plugins mit Beispielen finden Sie hier: https://forum.iobroker.net/viewtopic.php?f=20&t=15021

### Global-Homebridge-Modus
Wenn Sie bereits Homebridge (Apple OpenSource SmartHome) zur Steuerung Ihrer Geräte verwenden, können Sie diese vorhandene Homebridge-Installation verwenden und diese Homebridge-Installation als ioBroker-Prozess starten. In diesem Fall wird der Homebridge-Server von ioBroker gestartet.
Zusätzlich sind alle Zustände von Homebridge als Zustände in ioBroker verfügbar und können von ioBroker aus gesteuert werden.

Damit dies funktioniert, müssen Sie den Speicherort des globalen Node-Modules-Ordners des Systems angeben. Für diesen Aufruf **npm root -g** Darüber hinaus müssen Sie den Pfad des Homebridge-Konfigurationsverzeichnisses (normalerweise .homebridge im Benutzerordner) festlegen.

## Folgende Adapter wurden im Standardmodus getestet
* homebridge-chamberlain v1.0.1 - Plugin für Chamberlain-Garagentorantriebe mit MyQ
* homebridge-doorbird v0.0.4 - Plugin für Doorbird
* homebridge-dyson-link v2.2.2 - Dyson Link-Geräte
* homebridge-edomoticz v2.1.11 - Ein voll aktuelles Plugin für Domoticz
* homebridge-Fibaro-HC2 v2.1.5 - Integration von Fibaro HomeCenter
* homebridge-homee v0.2.4 - Ein voll aktuelles Plugin für Homee
* homebridge-ikea-tradfri-gateway v1.0.26 - Tradfri
* homebridge-noolite v0.0.29 - Noolite über USB-Module MTRF-64 oder МТRF-64
* homebridge-platform-wemo v1.0.1 - Belkin WeMo Platform-Plugin
* homebridge-seasons v1.0.1 - Ein Plugin zur Anzeige der aktuellen Jahreszeit.
* homebridge-vera v0.8.2 - VeraLink ist eine Anwendung für Z-Wave-Zubehör von Vera (Node.js 8.11.3).

## MACHEN
* Tests
* Weitere Dokumentation ?!

## Changelog

### 1.0.1 (2019-01-16)
* (SchumyHao) Add Chinese support

### 1.0.0 (WIP)
* (Apollon77) add polling interval to global mode
* (Apollon77) add option to use insecure flag in wrapper mode

### 0.4.5 (2018.08.21)
* (Apollon77) issues fixed

### 0.4.4 (2018.08.07)
* (Apollon77) corrected automatic role determination and bugs fixed

### 0.4.2 (2018.06.25)
* (Apollon77) Fix for global mode

### 0.4.1 (2018.06.21)
* (Apollon77) option to poll values from the plugins added and other optimizations

### 0.3.1 (2018.06.20)
* (kirovilya) Fixed a bug in global mode that values were not reported back to iOS devices

### 0.3.0 (2018.06.20)
* (bluefox) Support of ham plugins was added

### 0.2.6 (2018.06.19)
* (Apollon77) Updates for Homebridge-Wrapper

### 0.2.5 (2018.06.18)
* (Apollon77) Catch all console logs from Homegridge and make available as debug log

### 0.2.4 (2018.06.18)
* (Apollon77) Updates for Homebridge-Wrapper

### 0.2.3 (2018.06.17)
* (Apollon77) Updates for Homebridge-Wrapper

### 0.2.2 (2018.06.17)
* (Bluefox) Fixes for JSON editor in Firefox and Chrome

### 0.2.0/0.2.1 (2018.06.17)
* (Apollon77) Public test version with both modes
* (Bluefox) Admin3

### 0.1.0 (2018.06.09)
* (Apollon77) Update for working mode 1

### 0.0.1 (2018.03.24)
* (kirovilya) initial commit

## License
The MIT License (MIT)

Copyright (c) 2018 Apollon77 <ingo@fischer-ka.de>

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