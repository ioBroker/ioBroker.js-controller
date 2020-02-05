---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.swiss-weather-api/README.md
title: ioBroker.swiss-weather-api
hash: dwHJH2a0hJRlWd4Df+0d0Zwd0KLYpTsoEi0/X6YwBnY=
---
![Logo](../../../en/adapterref/iobroker.swiss-weather-api/admin/swiss-weather-api.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.swiss-weather-api.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.swiss-weather-api.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/swiss-weather-api-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/swiss-weather-api-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/baerengraben/iobroker.swiss-weather-api.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/baerengraben/ioBroker.swiss-weather-api/badge.svg)
![NPM](https://nodei.co/npm/iobroker.swiss-weather-api.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/baerengraben/ioBroker.swiss-weather-api/master.svg)

# IoBroker.swiss-weather-api
## Swiss-weather-api adapter für ioBroker
Stellt eine Verbindung zur großartigen SRG-SSR-Wetter-API her (https://developer.srgssr.ch/apis/srgssr-weather).
Wetter-Icons werden von https://erikflowers.github.io/weather-icons/ wiederverwendet

Mit der Wetter-REST-API der SRG-SSR können Sie Wettervorhersagen und -berichte von mehr als 25.000 Standorten in der ganzen Schweiz abrufen.

** Beachten Sie, dass dieser Adapter nur Standorte innerhalb der Schweiz unterstützt. **

### Fertig machen
1. Holen Sie sich einen kostenlosen Account auf https://developer.srgssr.ch/
1. Gehen Sie zu "Meine Apps" und erstellen Sie eine neue App. Dadurch werden ein bestimmter ConsumerKey und ConsumerSecret erstellt
1. Ermitteln Sie den Längengrad / Breitengrad (Dezimalgrad) des ausgewählten Ortes, für den die Vorhersage erforderlich ist
1. Installiere diesen Adapter auf ioBroker => Dies kann einige Minuten dauern (~ 7min auf einem Raspberry Pi 3)
1. Geben Sie in der Adapterkonfiguration Folgendes ein
   1. ConsumerKey von App
   1. ConsumerSecret von App
   1. Längen- / Breitengrad des ausgewählten Schweizer Standortes, für den eine Vorhersage erforderlich ist. => Bitte verwenden Sie Dezimalgrade (zB Zürich: 47.36667 / 8.5)

Dies ist ein geplanter Adapter. Es wird alle 30 Minuten geplant und liest die Prognose-API von SRG-SSR. Sie können dieses Intervall in der Instanzansicht (Schedule) ändern. Ein niedrigeres Intervall wird nicht empfohlen, da die minimale Prognose 1 Stunde beträgt.
** Denken Sie also daran, dass es nach der Installation 30 Minuten dauern wird, bis die Prognosedaten zum ersten Mal geliefert werden und die Datenobjekte in der Datenansicht erstellt werden. **

Bei der ersten Installation möchten Sie möglicherweise überprüfen, ob alles ordnungsgemäß funktioniert, und nicht 30 Minuten warten. In diesem Fall können Sie den Scheduler auf 1min ändern. => Funktioniert alles einwandfrei, **bitte auf 30min zurückstellen**

## Changelog

### 0.1.6
* (baerengraben) Some fixes based on Feedback of forum.iobroker.net

### 0.1.5
* (baerengraben) Some fixes based on Feedback of forum.iobroker.net

### 0.1.4
* (baerengraben) Added Travis CI testing

### 0.1.3
* (baerengraben) Role-Definitions updated and added attribute 'icon-name'.

### 0.1.2
* (baerengraben) Some fixes.

### 0.1.0
* (baerengraben) Running version. Reads the complete weather forecast from https://api.srgssr.ch

### 0.0.2
* (baerengraben) first running version. Reads Current Forecast (https://api.srgssr.ch/forecasts/v1.0/weather/current)

### 0.0.1
* (baerengraben) initial release

## License
MIT License

Copyright (c) 2020 baerengraben <baerengraben@intelli.ch>

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