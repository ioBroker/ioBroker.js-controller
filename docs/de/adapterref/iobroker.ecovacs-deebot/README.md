---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ecovacs-deebot/README.md
title: Ecovacs Deebot Adapter für ioBroker
hash: qGBFk0sikuR2Igv7BtHEhdAvWdw4uA6V9wigza4kd+M=
---
![Logo](../../../en/adapterref/iobroker.ecovacs-deebot/admin/ecovacs-deebot.png)

![stabile Version](http://iobroker.live/badges/ecovacs-deebot-stable.svg)
![Letzte Version](http://img.shields.io/npm/v/iobroker.ecovacs-deebot.svg)
![Anzahl der Installationen](http://iobroker.live/badges/ecovacs-deebot-installed.svg)
![Anzahl der Downloads](https://img.shields.io/npm/dm/iobroker.ecovacs-deebot.svg)
![npm](https://img.shields.io/npm/dt/iobroker.ecovacs-deebot.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/mrbungle64/iobroker.ecovacs-deebot.svg)
![Travis-CI](https://travis-ci.org/mrbungle64/ioBroker.ecovacs-deebot.svg?branch=master)

# Ecovacs Deebot Adapter für ioBroker
Dieser Adapter verwendet die Bibliothek [ecovacs-deebot.js](https://github.com/mrbungle64/ecovacs-deebot.js).

## Eigenschaften
Einige bemerkenswerte Merkmale sind:

* Informationen abrufen (z. B. Batterie, Reinigungsprotokoll, Verbrauchsmaterial, Reinigungs- und Ladestatus)
* Senden Sie saubere Befehle (z. B. Auto, Spot-Bereich, benutzerdefinierter Bereich).
* Senden Sie einige andere Befehle (z. B. Sound abspielen, Verbrauchsmaterialien zurücksetzen, verschieben)
* Speichern Sie benutzerdefinierte Bereiche und führen Sie sie erneut aus
* Einstellung der Vakuumleistung (Reinigungsgeschwindigkeit) und des Wasserstandes
* Informationen zu den Karten abrufen inkl. Spotbereiche und virtuelle Grenzen
* Informationen während der Reinigung abrufen (z. B. aktuelle Position, Karte und Gebiet)
* Virtuelle Grenzen löschen, speichern und neu erstellen *)

*) Experimentell

Bitte beachten Sie: Einige Funktionen sind nur für einige Modelle verfügbar

## Modelle
### Unterstützte Modelle
* Deebot 900/901
* Deebot OZMO 930
* Deebot OZMO 920/950

Die aufgeführten Modelle sind diejenigen, die ich selbst in Gebrauch habe oder die technisch mit diesen identisch sind.

### Diese Modelle sollten ordnungsgemäß oder zumindest teilweise funktionieren
* Deebot Slim 2
* Deebot N79-Serie
* Deebot M88
* Deebot 600/601/605
* Deebot 710/711/711s
* Deebot OZMO 610
* Deebot OZMO 900/905
* Deebot OZMO T5
* Deebot OZMO T8-Serie
* Deebot OZMO Slim 10
* Deebot N3 MAX
* Deebot N7
* Deebot N8-Serie
* Deebot U2-Serie

Die aufgeführten Modelle funktionieren entweder bereits oder sind diesen Modellen technisch ähnlich.
Trotzdem kann die Funktionalität teilweise eingeschränkt sein.

Ich versuche, ein breites Spektrum an Funktionen zu erreichen, entscheide dies jedoch von Fall zu Fall in Abhängigkeit von der Komplexität und verschiedenen anderen Kriterien.
Es besteht natürlich kein Anspruch auf volle Funktionalität.

## Installation
Es wird empfohlen, Version 10.x, 12.x oder 14.x von Node.js zu verwenden. Die mindestens erforderliche Version ist 10.x.

Dieser Adapter verwendet die Bibliothek [Node-Canvas](https://www.npmjs.com/package/canvas) für einige kartenbezogene Funktionen, für die möglicherweise einige zusätzliche Pakete installiert werden müssen.
Dies ist optional und für Modelle ohne Kartenfunktionalität nicht erforderlich. Für den vollen Funktionsumfang installieren Sie bitte die folgenden Pakete.

Für Debian-basierte Linux-Systeme sollten die folgenden Befehle ausgeführt werden:

```bash
sudo apt-get update
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

Anweisungen für andere Systeme finden Sie unter https://www.npmjs.com/package/canvas#compiling

## Verwendung
* Informationen zur Verwendung dieses Adapters finden Sie [hier] (https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki)

### Zustände
* Informationen zu den Bundesstaaten finden Sie [hier] (https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/States-%28EN%29) (Englisch) und [hier] (https:// github .com / mrbungle64 / ioBroker.ecovacs-deebot / wiki / Datenpunkte-% 28DE% 29)

## FAQ
* Häufig gestellte Fragen finden Sie [hier] (https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/FAQ)

## Bekannte Probleme
* Für einige Modelle (z. B. Deebot OZMO 930) wird empfohlen, einmal täglich [einen Neustart zu planen] (https://www.iobroker.net/#en/documentation/admin/instances.md#The%20page%20content) da es einige Berichte gibt, dass die Verbindung nach ca. 24 Stunden
* Einige Reinigungsfunktionen funktionieren möglicherweise nicht mit Deebot 710/711 / 711s. Bitte verwenden Sie vorerst Version 0.5.8.
* Die "Kanten" -Funktion funktioniert nicht mit Deebot U2 (startet stattdessen die automatische Reinigung)

## Haftungsausschluss
Ich bin in keiner Weise mit ECOVACS verbunden.

## Changelog

### 1.1.2 (alpha)
* Using library version 0.6.0-beta.0
* Added experimental functions for deleting, saving and to recreate saved virtual boundaries (920,950,T8)
* Added option to control clean speed and water level separately for each spot area
* Quite a lot of improvements for processing map data, spot areas and virtual boundaries
* Move some states from "info" channel to sub channels "info.library" and "info.network"
* Added some cleaning log values
* Some improvements and fixes

### 1.1.1
* Using library version 0.6.0-alpha.3
  * Updated login process
  * Support for Chinese server login
* Initial support for some models (e.g. N3, N7 and N8 series)

### 1.1.0
* Stable release

### 1.0.13
* Using library version 0.5.6
* Some improvements and fixes

### 1.0.12
* Using library version 0.5.5
* Added some more T8 models
* Several improvements and fixes

### 1.0.11
* Enabled some features for OZMO 900
* Several minor improvements

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

### 1.0.1 - 1.0.3
* Added support for Ozmo T8 AIVI
* Compact mode support
* Added a button to save the last used custom area values
* Added buttons to rerun saved custom areas
* Some enhancements and fixes

### 1.0.0
* Stable release

### 0.0.1 - 0.6.5
* [Changelog archive](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/Changelog-(archive)#059)

## License

MIT License

Copyright (c) 2021 Sascha Hölzel <mrb1232@posteo.de>

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