---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.daswetter/README.md
title: ioBroker.DasWetter.
hash: 44CyV5g3E0YiBrmL0XqYnV9wGegPocPi9FMLu641cH8=
---
![Logo](../../../en/adapterref/iobroker.daswetter/admin/daswettercom.png)

![Anzahl der Installationen](http://iobroker.live/badges/daswetter-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.daswetter.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.daswetter.svg)
![Tests](https://travis-ci.org/rg-engineering/ioBroker.daswetter.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.daswetter.png?downloads=true)

# IoBroker.DasWetter.
Dieser Adapter liest Wettervorhersagedaten von DasWetter.com.

Sie benötigen ein Konto bei DasWetter.com. Registrieren Sie sich unter https://www.daswetter.com/api/#/login. Das Konto ist unter bestimmten Bedingungen kostenlos.

In Ihrem Konto finden Sie drei URLs für vier verschiedene Datenmodelle:

* Prognose für die nächsten 7 Tage und allgemeine Informationen des Tages: Hoch und Tief, Wind (Symbol und Beschreibung), Tagessymbol und Wetterbedingungen
* detaillierte Informationen für 5 Tage und alle 3 Stunden: Die allgemeinen täglichen Informationen sind folgende: Peak, Tiefs, Wind, Böen, Niederschlag, relative Luftfeuchtigkeit,

Luftdruck des Meeresspiegels, Schneegrenze, Sonnenaufgang und Sonnenuntergang, Monddaten, Ortszeit

* Vorschau mit detaillierten Daten jede Stunde (nur für die ersten 2 Tage, dann alle 3 Stunden)
* Vorhersage für 5 Tage und alle 3 Stunden (im JSON-Format)

Alle vier Modelle sind implementiert und eines sollte mindestens verwendet werden.
In den Einstellungen muss eine URL wie http://api.daswetter.com/index.php?api_lang=de&localidad=xxxx verwendet werden. Kopieren Sie einfach die vollständige URL aus Ihrem Konto.

## Hints
### Icons in vis verwendet
* Zugriff auf Symbole wie "http:// ip: 8082 / adapter / daswetter / icons / tiempo-weather / galeria1 / 1.png".
* in galerie6 sind die ursprünglichen symbole im svg-format. Vis-App hat möglicherweise Probleme bei der Visualisierung. Es sind also konvertierte PNGs verfügbar. Verwenden Sie einfach die Option "use png".
* in galerie5 sind die ursprünglichen symbole im svg- und png-format. Daneben sind auch Farb- und Weißversionen erhältlich

### "current" in NextHours_Day1:
* DasWetter.com liefert keine echten aktuellen Wetterwerte
* Aber manchmal ist es hilfreich, die Vorhersage der aktuellen Stunde zur Verfügung zu haben
* also haben wir "current" hinzugefügt, was nur eine Kopie der zugehörigen Stundenwerte ist
* Rufen Sie den Adapter mindestens einmal pro Stunde an, um sicherzustellen, dass "current" gut aktualisiert wird
* siehe auch Github-Funktionsanforderung [issue24] (https://github.com/rg-engineering/ioBroker.daswetter/issues/24)

### Pfad 4
* Im Moment sendet DasWetter.com Daten, die von ihren eigenen Spezifikationen abweichen.

Jetzt haben wir eine "Autoreparatur" implementiert, die ihre Struktur in eine dokumentierte Form ändert.

## Bekannte Probleme
siehe github-problemliste

## Changelog

### 2.8.0 (2019-03-19)
* (René) moon and wind icon set added in admin !!path to wind icons changed!!
* (René) path to customized icon set added 
* (René) exit code changed

### 2.7.3 (2019-02-24)
* (René) bug fix: some values are number instead of string

### 2.7.2 (2019-02-14)
* (bluefox) Serialization of the objects deletion

### 2.6.1 (2019-02-10)
* (René) update dependencies

### 2.6.0 (2019-01-20)
* (René) support of compact mode
* (René) new icons for galeria5 (color or white; svg or png) selectable in admin
* (René) auto-repair for path4

### 2.5.0 (2018-11-30)
* (René) since app has problems with svg we can use png instead. svg's are converted to png. In admin a new option is available to use original svg's or converted png's 
* (René) max. 500 datapoints are deleted per call to reduce work load, so it might take a few calls until all old data points are removed

### 2.4.0 (2018-11-26)
* (René) sunshine duration added
* (René) current in NextHours_Day1 and NextHours2_Day1 added

### 2.3.1 (2018-11-04)
* (René) clean up code

### 2.3.0 (2018-08-23)
* (René) support of 4. path (json)

### 2.2.0 (2018-08-20)
* (René) delete unused data structure

### 2.1.3 (2018-08-17)
* (René) typo fixed
* (René) missing Icon-URL's added

### 2.1.2 (2018-08-14)
* (bluefox) Configuration dialog was fixed

### 2.1.1 (2018-08-04)
* (René) parse timeout added
* (René) missing roles and states added
* (René) using of units from data structure

### 2.1.0 (2018-07-30)
* (bluefox) Added URLs to icons
* (bluefox) Added the roles and the names to states
* (bluefox) Icons moved to admin directory



### 2.0.0
* (René) new datastructure !not compatible to version 1.x!
now parsing all data from xml and store them in datapoints
for compatibility: in configuration old data structure can be enabled 
needs also 2.x of vis-weather-widget

## License
Copyright (C) <2017 - 2019>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.