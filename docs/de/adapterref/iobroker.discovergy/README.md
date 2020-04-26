---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.discovergy/README.md
title: ioBroker.discovergy
hash: 9qw5IcAtLdQhB/lSZQfA5dd/4lUQ27QrcxZY8eSsPNI=
---
![Alt-Text](https://raw.githubusercontent.com/DutchmanNL/ioBroker.discovergy/master/admin/Discovergy_logo.png)

![Alt-Text](https://travis-ci.org/iobroker-community-adapters/ioBroker.discovergy.svg?branch=master)
![Anzahl der Installationen](http://iobroker.live/badges/discovergy-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.discovergy.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.discovergy.svg)

# IoBroker.discovergy
Dies ist ein ioBroker-Adapter für Ihr Discovergy Power-Messgerät.
Es verwendet die Discovergy-API, um Daten Ihrer Zähler zu lesen und die aktuellen Werte mit ioBroker zu synchronisieren.

https://api.discovergy.com/docs/

Bitte zögern Sie nicht, ein Problem für Ihre gewünschte Funktionalität oder Probleme hinzuzufügen, damit ich es mir ansehen kann!

Anmerkung: Ich habe nicht alle möglichen Geräte und auch das Demo-Konto bietet nicht alle vorhandenen Werte, die Geräte bereitstellen können.
Wenn Sie die folgende Fehlermeldung erhalten:

Von Discovergy empfangene Informationen, die noch nicht Teil dieses Adapters sind "" Senden Sie diese Informationen an den Entwickler: xxxxx

Bitte gehen Sie zu Ihrer Protokolldatei und laden Sie sie herunter. Erstellen Sie hier auf github ein Problem mit den angegebenen Werten.
Nicht aus dem Admin-Webinterface kopieren und einfügen, hier fehlen Informationen, die ich brauche!

Sie können diesen Adapter testen, indem Sie die Demo-Anmeldeinformationen von Discovery (oder mit Ihren eigenen :-)) verwenden: Benutzername = demo@discovergy.com pass = demo

## Unterstütze mich
Wenn Ihnen meine Arbeit gefällt, können Sie gerne eine persönliche Spende leisten (dies ist ein persönlicher Spendenlink für DutchmanNL, keine Beziehung zum ioBroker-Projekt!) [![Spenden] (https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Mitwirkende
* AlCalzone
* zoernert

## Changelog

### 0.5.4 (19-04-2020) Bugfix : Wrong Unit
* (Dutchman) Bugfix : Wrong Unit

### 0.5.3 (19-04-2020) Bugfix : change root back to SerialNumber
* (Dutchman) Bugfix : Change root of information back to SerialNumber instead of MeterId

### 0.5.2 (18-04-2020) Code improvements
* (Dutchman) Optimize and simplify code
* (Dutchman) Set calculation factors in attribute definition
* (Dutchman) Send information about missing state attribute definitions to sentry

### 0.5.1 (17-04-2020) Avoid writing objects unnecessarily
* (Dutchman) Implement Sentry
* (Dutchman) Bugfix : Avoid writing objects unnecessarily
* (Dutchman) Ensure propper handling of await instead of fire and forget

### 0.5.0 
* (Dutchman) Rebuild complete logic of data pulling
* (Dutchman) Rewrite adapter to class and support JS-Controller 2.0 with compact mode
* (Dutchman) For new Devices : Write error for unknwon states but create device with basic information
* (Dutchman) Variable JSON-Array scan for attributes, if Discovergy adds new devices they will be visible immidiatly

### 0.4.9 Fix wrong readings and make intervall adjustable
* (Dutchman) code cleanup
* (Dutchman) update attr library
* (Dutchman) make state names configurable
* (Dutchman) Implemented adjustable intervall
* (Dutchman) Fix "-" values for power delivery
* (Dutchman) implement adjustable timing intervall
* (Dutchman) Ensure propper reset to 0 of power values

### 0.4.4 ALPHA version of rebuilded adapter
* (Dutchman) Rebuild complete logic of data pullin
* (Dutchman) make state attributes configurable in library
* (Dutchman) ensure split values for consumption and delivery
* (Dutchman) implement data pulling (needs improvement to avoid block by provider)
* (Dutchman) Rewrite adapter to class and support JS-Controller 2.0 with compact mode
* (Dutchman) For new Devices : Write error for unknwon states but create device with basic information
* (Dutchman) Variable JSON-Array scan for attributes, if Discovergy adds new devices they will be visible immidiatly

### 0.4.0 Stable Release
* small code fixes
* updated dependecys
* release for stable repository

### 0.3.2
* Improved logging
* Seperate supported object definitions from hard code main.js to configuration file "/lib/supported_objects.js"

### 0.3.1
* Stop adapter when username/password is empty and write error message
* Fixed incorrectly created states, time-stamps are also correctly shown now

### 0.3.0
* Implemented encrypted password storage
* Correct error message in LOG when credentials are missing
* Fixed issue with polling of states (this should fix "connection failed" of version 0.2.9)

### 0.2.9
* Small code fixes
* Pull intervall can be configured in Adapter settings
* implemented intervall short and long, only relevant information (current consumption) is pulled short alle other (totals) on interval Long
* Implemented additional datapoints for Power, Power_x_Consumption and Power_x_Delivery, the power value can have a positive and negative number depending of if u consumer or produce for the network. Seperate - and + values to seperated datapoints.

### 0.2.6
* (Dutchman) new version published on NPM
* (AlCalzone) code reviewd, several fixes
* (AlCalzone) fixed dependency with package request
* (Dutchman) installation now possible by ioBroker Admin

### 0.2.5
* (Dutchman) Reduced logging
* (Dutchman) Implemented multiple meter support
* (Dutchman) implemented "info" object which provides basic information of the device
* (Dutchman) Implemented all values which are available by demo-account of discovergy
* (Dutchman) Please remove all current objects within tree discoververgy.x, version 0.2.5 introduce device creation by serial number !
* (Dutchman) Changed object tree of device from meterId to sererialnumber, please not this means all vallue are now in a different tree
* (Dutchman) Remark : not all possbile devices are in the demo, if a device cannot be handled you will get an error message i need that information to implement !


### 0.2.2
* (Dutchman) add support for values power1, power2
* (Dutchman) add support for values voltage1, voltage1 & voltage3

### 0.2.0
* (Dutchman) reduced logging from every 3 seconds to only error if values are received which cannot be handled
* (Dutchman) last time step of syncronisation added, currenlty unix time needs to be converted in next release

### 0.1.0
* (Dutchman) first working release, data is received every 3 seconds

### 0.0.3
* (Dutchman) initial release

## License
MIT License

Copyright (c) 2020 Dutchman

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