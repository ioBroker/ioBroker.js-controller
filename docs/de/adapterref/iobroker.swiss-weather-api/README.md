---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.swiss-weather-api/README.md
title: ioBroker.swiss-weather-api
hash: pLbVrk1AXeOxB8SDnfr8FEkVce9i++LOGy0MotabGSg=
---
![Logo](../../../en/adapterref/iobroker.swiss-weather-api/admin/swiss-weather-api.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.swiss-weather-api.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.swiss-weather-api.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/swiss-weather-api-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/swiss-weather-api-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/baerengraben/iobroker.swiss-weather-api.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/baerengraben/ioBroker.swiss-weather-api/badge.svg)
![NPM](https://nodei.co/npm/iobroker.swiss-weather-api.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/baerengraben/ioBroker.swiss-weather-api/master.svg)

# IoBroker.swiss-weather-api
## Swiss-weather-api adapter für ioBroker
Stellt eine Verbindung zur großartigen SRG-SSR-Wetter-API her (https://developer.srgssr.ch/apis/srgssr-weather).

Mit der SRG-SSR-Wetter-REST-API können Sie Wettervorhersagen und -berichte von mehr als 25.000 Standorten in der ganzen Schweiz abrufen.

** Symbole **

Wettersymbole werden von https://erikflowers.github.io/weather-icons/ wiederverwendet.

Seit Version 0.1.8 bietet SRG-SSR sogar eigene Symbole. So können Sie auswählen, welches Icons-Set Sie verwenden möchten.

** Beachten Sie, dass dieser Adapter nur Standorte innerhalb der Schweiz unterstützt. **

### Fertig machen
1. Holen Sie sich ein kostenloses Konto unter https://developer.srgssr.ch/
1. Stellen Sie sicher, dass Sie das Produkt "SRG-SSR-PUBLIC-API-V2" verwenden, da dies das kostenlose Produkt ist
1. Gehen Sie zu "Meine Apps" und erstellen Sie eine neue App. Dadurch werden ein spezifischer ConsumerKey und ConsumerSecret erstellt
1. Ermitteln Sie den Längen- / Breitengrad (Dezimalgrad) des ausgewählten Standorts, für den eine Vorhersage erforderlich ist
1. Installieren Sie diesen Adapter auf ioBroker => Dies kann einige Minuten dauern (~ 7 Minuten auf einem Raspberry Pi 3).
1. Füllen Sie bei Adapterkonfiguration aus
   1. Name der App
   1. ConsumerKey der App
   1. ConsumerSecret der App
   1. Längen- / Breitengrad des gewählten Schweizer Standorts, für den eine Prognose erforderlich ist. => Bitte Dezimalgrad verwenden (zum Beispiel Zürich: 47.36667 / 8.5)
   1. Abfrageintervall in Minuten (standardmäßig 30 Minuten)

Die erste Abfrage erfolgt 10 Sekunden nach dem Start des Adapters. Nach dem ersten Start wird die Abfrage regelmäßig gemäß dem Zentrifugationsparameter (Abfrageintervall in Minuten) ausgeführt.

## Changelog

### 0.3.2
* (baerengraben)  Fix for https://github.com/baerengraben/iobroker.swiss-weather-api/issues/13.

### 0.3.1
* (baerengraben)  Adapter-Config attributes longitude & latitude is optional now. If no longitude/latitude is set, the adpater is getting the longitude/latitude from ioBroker System-Attributes (https://github.com/baerengraben/iobroker.swiss-weather-api/issues/6).

### 0.3.0
* (baerengraben)  Change from Scheduled Adapter to Deamon Adapter(https://github.com/baerengraben/iobroker.swiss-weather-api/issues/11). The query interval is now configurable by parameter. The first query is made 10s after the adapter was started. Attention: For installing this version, please delete the older adapter version completely and install it again.

### 0.2.3
* (baerengraben) Update Dependencies

### 0.2.2
* (baerengraben) Some bug fixing
* (baerengraben) Enhancement https://github.com/baerengraben/iobroker.swiss-weather-api/issues/10

### 0.2.0
* (baerengraben) Updates in order to commit to iobroker stable

### 0.1.9
* (baerengraben) Dependency- and Vulnerabilites-Updates

### 0.1.8
* (baerengraben) Added Icons provided by SRGSSR => Thank you!! :)
* (baerengraben) Added new Object icon-url-srgssr => Contains the url-link to the srgssr Icon

### 0.1.7
**Attention**: If you have already installed a previous Version of swiss-weather-api (<= 0.1.6) please remove the adapter and install it completely new. This makes shure you get the new Unit-Names for "fff" and "ffx3" which where corrected by SRG. 
* (baerengraben) Added Icon-Codes -17 to -30 => These are not yet confirmed by srf - but I beleave these are correct.  
* (baerengraben) SRG is now providing the correct unit-names for "fff" and "ffx3". Adaptet this in the swiss-weather-adapter. **Attention**: You have to reinstall the swiss-weather-api (remove and install new Version) to make shure the Object-Name gets this Update.

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