---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ecovacs-deebot/README.md
title: Ecovacs Deebot Adapter für ioBroker
hash: zUljsVn9bmg0WDjV5SXHpjOiRt3wgOxcrj42DJZTndw=
---
![Logo](../../../en/adapterref/iobroker.ecovacs-deebot/admin/ecovacs-deebot.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.ecovacs-deebot.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ecovacs-deebot.svg)
![npm](https://img.shields.io/npm/dt/iobroker.ecovacs-deebot.svg)
![Travis-CI](https://travis-ci.org/mrbungle64/ioBroker.ecovacs-deebot.svg?branch=master)

# Ecovacs Deebot Adapter für ioBroker
Dieser Adapter verwendet die Bibliothek [ecovacs-deebot.js](https://github.com/mrbungle64/ecovacs-deebot.js).

## Modelle
### Unterstützte Modelle
* Deebot 900/901
* Deebot Ozmo 920
* Deebot Ozmo 930
* Deebot Ozmo 950

### Diese Modelle funktionieren bekanntermaßen
* Deebot Slim 2
* Deebot N79-Serie
* Deebot 601
* Deebot 710/711 (siehe "Bekannte Probleme")
* Deebot U2
* Deebot Ozmo 610
* Deebot Ozmo 900
* Deebot Ozmo T8 AIVI
* Deebot Ozmo T8 (+)

### Diese Modelle sollten funktionieren
* Deebot M88
* Deebot 600/605
* Deebot Ozmo Slim 10
* Deebot U2 Pro / Power

## Installation
Es wird empfohlen, Version 10 von Node.js oder eine neuere Version zu verwenden.

Dieser Adapter verwendet die Canvas-Bibliothek, für die möglicherweise zusätzliche Installationen erforderlich sind.
Für den vollen Funktionsumfang installieren Sie bitte die folgenden Pakete.

Für Debian-basierte Linux-Systeme sollten die folgenden Befehle ausgeführt werden:

```bash
sudo apt-get update
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

Anweisungen für andere Systeme finden Sie unter https://www.npmjs.com/package/canvas#compiling

## Verwendung
* Informationen zur Verwendung dieses Adapters finden Sie [hier] (https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki)

## Bekannte Probleme
* Für den Deebot Ozmo 930 wird empfohlen, einmal täglich [einen Neustart zu planen] (https://www.iobroker.net/#en/documentation/admin/instances.md#The%20page%20content), da es einige gibt meldet, dass die Verbindung nach ca. 24 Stunden
* Einige Reinigungsfunktionen funktionieren möglicherweise nicht mit 710/711. Bitte verwenden Sie vorerst Version 0.5.8.
* Die "Kanten" -Funktion funktioniert nicht mit Deebot U2 (startet stattdessen die automatische Reinigung)

## FAQ
* Häufig gestellte Fragen finden Sie [hier] (https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/FAQ)

## Haftungsausschluss
Ich bin in keiner Weise mit ECOVACS verbunden.

## Changelog

### 1.0.11
* Enable some features for OZMO 900
* Several improvements and fixes

### 1.0.10
* Using library version 0.5.4
* Several improvements and fixes
* Added available spot area boundaries to "map" channel (read only)

### 1.0.9
* Using library version 0.5.3
* Added some experimental features (for a few models only)
* Added option for virtual boundaries and some further improvements to adapter config
* Some improvements for js-controller 3.2.x

### 1.0.8
* Using library version 0.5.2 (0.5.2-beta.1)
* Added available virtualBoundaries channel for Deebot 900/901 and Ozmo 930 (read only)
* Added "volume" and buttons for resetting consumable values for 950 type models (920/950/T8)
* Improved synchronization of spot area buttons
* Add option for setting the language for spot area names
* Added some experimental features (for a few models only)
* Several enhancements and fixes
* Bump some dependencies

### 1.0.7
* Using library version 0.5.1 (0.5.1-beta.3)
* Initial support for Deebot U2 series
* Improved support for Ozmo T8 models
* (boriswerner) Fixed cleaning log for 950 type models (920/950/T8)
* (boriswerner) Added available virtualBoundaries to "map" channel (currently read only)
* Improved handling of device classes
* Several enhancements and fixes

### 1.0.6
* Using library version 0.5.0-beta.0
* Fix for running multiple devices
* Support for additional Ozmo T8 models
* Add option to synchronize spotArea buttons
* Set state value for triggered buttons to false
* Add option to suppress "unknown" value for "map.deebotPositionCurrentSpotAreaID" state
* Further enhancements and fixes

### 1.0.5
* Bump library to 0.4.25
* Initial support for Ozmo T8 and T8+
* Implement buttons for resetting consumable values (currently Deebot 900/901 and Ozmo 930 only)
* Several enhancements and fixes

### 1.0.4
* Bump library to 0.4.21
* Remove canvas from dependencies
* Several bugfixes and improvements (especially for N79 series)
* Possibility to specify the number of reruns for a spot area
* Spot areas in the "control" channel are now created automatically
* Remove number of spot areas from adapter settings
* Some refactoring
* Bump dependencies

### 1.0.2 - 1.0.3
* Added support for Ozmo T8 AIVI

### 1.0.1
* Compact mode support
* Added a button to save the last used custom area values
* Added buttons to rerun saved custom areas
* Some enhancements and fixes

### 1.0.0
* Stable Release

### 0.6.3 - 0.6.5
* Using library version 0.4.13
* Set flag for compact mode to false
* Some minor fixes
* Some translations added

### 0.6.2
* Using library version 0.4.12
* (boriswerner) Alternative API call for last clean log info (920/950)
* (mrbungle64) Periodically polling of CleanLogs

### 0.6.0 - 0.6.1
* Using library version 0.4.10/11
* Several enhancements and fixes

### 0.0.1 - 0.5.9
* [Changelog archive](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/Changelog-(archive)#059)

## License

MIT License

Copyright (c) 2020 Sascha Hölzel <mrb1232@posteo.de>

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