---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ecovacs-deebot/README.md
title: Ecovacs Deebot Adapter für ioBroker
hash: 6eD1dGnNSHyhz413axLSCBw9FiD2595ttBvL5dfTrus=
---
![Logo](../../../en/adapterref/iobroker.ecovacs-deebot/admin/ecovacs-deebot.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.ecovacs-deebot.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ecovacs-deebot.svg)
![Travis-CI](https://travis-ci.org/mrbungle64/ioBroker.ecovacs-deebot.svg?branch=master)

# Ecovacs Deebot Adapter für ioBroker
Dieser Adapter verwendet die Bibliothek [ecovacs-deebot.js](https://github.com/mrbungle64/ecovacs-deebot.js).

## Modelle
### Unterstützte Modelle
* Deebot Slim 2
* Deebot Ozmo 930
* Deebot Ozmo 950

### Diese Modelle funktionieren bekanntermaßen
* Deebot 601
* Deebot 710/711
* Deebot 900/901
* Deebot Ozmo 610
* Deebot Ozmo 900

### Diese Modelle sollten funktionieren
* Deebot N79T
* Deebot M88
* Deebot 600/605

## Installation
Dieser Adapter verwendet die Canvas-Bibliothek, für die möglicherweise zusätzliche Installationen erforderlich sind. Andernfalls kann die Installation in iobroker zu einem Fehler führen:

```
npm ERR! canvas@2.6.1 install: node-pre-gyp install --fallback-to-build npm ERR! Exit status 1
```

Für Linux-basierte Systeme sollten die folgenden Befehle ausgeführt werden (ein Neustart kann nach der zweiten Zeile erforderlich sein):

```
sudo apt-get update
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
sudo npm install canvas --unsafe-perm=true
```

Anweisungen für andere Systeme finden Sie unter https://www.npmjs.com/package/canvas#compiling

## Verwendungszweck
* Informationen zur Verwendung dieses Adapters finden Sie [hier] (https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki)

## Bekannte Probleme
* Für den Deebot Ozmo 930 wird empfohlen, einmal täglich [einen Neustart zu planen] (https://www.iobroker.net/#en/documentation/admin/instances.md#The%20page%20content), da [ einige Berichte] (https://github.com/mrbungle64/ioBroker.ecovacs-deebot/issues/24), dass die Verbindung nach ca. 24 Stunden
* Es gibt einige Berichte ([1] (https://github.com/mrbungle64/ioBroker.ecovacs-deebot/issues/23), [2] (https://github.com/mrbungle64/ioBroker.ecovacs-deebot / Issues / 34)) über seltsames Verhalten des Batteriewerts bei Deebot 900/901

## FAQ
* Häufig gestellte Fragen finden Sie [hier] (https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/FAQ)

## Danke und Credits
* @joostth ([saugt.js] (https://github.com/joostth/sucks.js))
* @wpietri ([saugt] (https://github.com/wpietri/sucks))
* @ bmartin5692 ([saugt] (https://github.com/bmartin5692/sucks), [bumber] (https://github.com/bmartin5692/bumper))
* @Ligio ([ozmo] (https://github.com/Ligio/ozmo))

## Changelog

### 0.5.8
   * Several enhancements and fixes

### 0.5.7
   * Using library version 0.3.8
   
### 0.5.6
   * Using library version 0.3.7

### 0.5.5
   * Using library version 0.3.6

### 0.5.4
   * Using library version 0.3.5

### 0.5.3
   * Using library version 0.3.4

### 0.5.2
   * Bugfixes (MQTT/XML)
   * Start implement NetInfo (XMPP)

### 0.5.1
   * Using version 0.3.2 of ecovacs-deebot.js module
     * (boriswerner) Added Features for Ozmo 950
     * (mrbungle64) Some improvements for non Ozmo 950
   
### 0.5.0
   * Using version 0.3.x of ecovacs-deebot.js module (ng library)

### 0.4.2
   * Improved support for MQTT devices

### 0.3.10
   * (mrbungle64) Improved support for XML based MQTT devices
   
### 0.3.9
   * (mrbungle64) Improved support for XML based MQTT devices

### 0.3.8
   * (boriswerner) Improved support for Ozmo 950
   * (mrbungle64) Implemented waterbox info (XMPP based devices)

### 0.3.7
   * (mrbungle64) Bugfix
   
### 0.3.6
   * (boriswerner) Basic clean & charge working (Ozmo 950)

### 0.3.5
   * (mrbungle64) Improved support for MQTT devices
   * (boriswerner) Improved support for Ozmo 950 device

### 0.3.4
* (mrbungle64) Feature Release
   * Implemented handling water level
   * Preparing for latest repo

### 0.3.3
* (mrbungle64) Feature release
   * Implemented lifespan values of components
   
### 0.3.2
* (mrbungle64) Feature release
   * Implemented spotArea buttons
   
### 0.3.1
* (mrbungle64) Feature release (alpha)
   * Implemented spotArea command
   * Implemented customArea command
   * Implemented playSound command
   
### 0.3.0
* (mrbungle64) alpha release

### 0.2.0
* (mrbungle64) Pre-release (alpha)

### 0.1.0
* (mrbungle64) Initial release (pre-alpha)

### 0.0.1
* (mrbungle64) Initial development release

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