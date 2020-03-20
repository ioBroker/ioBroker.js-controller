---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.knmi-weather/README.md
title: ioBroker.knmi-Wetter
hash: KAKKSOXGMiMckWzpmH7ML4qcnA8KUcieYkmQXHc60mA=
---
![Logo](../../../en/adapterref/iobroker.knmi-weather/admin/knmi-weather.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.knmi-weather.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.knmi-weather.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/knmi-weather-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/knmi-weather-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/iobroker-community-adapters/iobroker.knmi-weather.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.knmi-weather/badge.svg)
![NPM](https://nodei.co/npm/iobroker.knmi-weather.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.knmi-weather/master.svg)

# IoBroker.knmi-Wetter
## KNMI-Wetterdaten und Alarme für ioBroker
KNMI bietet eine API, deren Daten alle 10 Minuten basierend auf allen Sensordaten aktualisiert werden, die das Institut sammelt.
Mit diesem Adapter können Sie diese API lesen (Registrierung erforderlich!) Und alle relevanten Werte in benutzerfreundlichen Zuständen speichern, um sie in Benachrichtigungen (Beispiel: Telegramm / Pushover) oder Visialisierungen weiterzuverarbeiten.

Die API kann bis zu 300 Attements pro Tag kostenlos verwendet werden, daher wird der Adapter alle 5 Minuten verschoben.

Folgende Daten sind verfügbar:

* Aktuelle klimat Bedingungen
* Prognose heute, morgen, übermorgen
* Wetteralarme

Die Standortdaten basieren auf GPS-Koordinaten, die in der Administratorkonfiguration gespeichert sind.

Weitere Informationen finden Sie unter: http://weerlive.nl/index.php Holen Sie sich Ihren kostenlosen API-Schlüssel hier: http://weerlive.nl/delen.php

## Changelog

### 0.2.0
* (DutchmanNL) improve propper adapter termination instead of guessing by timer
* (DutchmanNL) Release to stable repository

### 0.1.1
* (DutchmanNL) implement states for RainRadar

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