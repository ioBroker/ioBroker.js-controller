![Logo](admin/solarwetter.png)
# ioBroker.solarwetter

![Number of Installations](http://iobroker.live/badges/solarwetter-installed.svg) ![Number of Installations](http://iobroker.live/badges/solarwetter-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.solarwetter.svg)](https://www.npmjs.com/package/iobroker.solarwetter)
[![Downloads](https://img.shields.io/npm/dm/iobroker.solarwetter.svg)](https://www.npmjs.com/package/iobroker.solarwetter)

[![NPM](https://nodei.co/npm/iobroker.solarwetter.png?downloads=true)](https://nodei.co/npm/iobroker.solarwetter/)

**Tests:** Linux/Mac: [![Travis-CI](http://img.shields.io/travis/Pix---/ioBroker.solarwetter/master.svg)](https://travis-ci.org/Pix---/ioBroker.solarwetter)
Windows: [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Pix---/ioBroker.solarwetter?branch=master&svg=true)](https://ci.appveyor.com/project/Pix---/ioBroker-solarwetter/)

## Beschreibung / Description
:de: Dieser Adapter liefert den prognostizierten Solarstrom Tagesertrag für eine bestimmte Region. Die Daten kommen von [http://www.auswahl-plz-bereich.solar-wetter.com](http://solar-wetter.com).
Bei Eingabe der Leistung der eigenen Solaranlage errechnet der Adapter auch die zu erwartende Energieabgabe der Anlage.

:uk: This adapter delivers a forecast of the daily amount of solar power for a specific region from supplier [http://www.auswahl-plz-bereich.solar-wetter.com](http://solar-wetter.com). 
Translate!!!!

## Einstellungen / Configuration
### User / Passwort
Seit 2017 ist die Authentifizierung beim Anbieter nötig. Dazu muss kostenpflichtig beim Anbieter ein Zugang erstanden werden. Die Login-Daten können nun hier im Adapter hinterlegt werden.

Since 2017 the provider is charging for its service. A personal login can be obtained on solar-wetter.com. username and password will be stored here.

### Standort / Location
Örtlichkeit durch Auswahl des Postleitzahlenbereichs bestimmen
Gesamtleistung der eigenen Solaranlage zur Berechnung der Energieerzeugung

Choose your region by selecting from the list of post codes.
Type in power of your solar plant to calculate energy output.

### Solaranlage / Solar plant
Hier kann die Gesamtleistung der eigenen Solaranlage zur Bechnung der vorraussichtlich erzeugten Energiemenge eingegeben werden (auch Dezimalzahlen möglich).

Put in the total power of your solar plant to calculate the daily forecast for energy production (decimal separators possible)

### 4-Tage-Prognose / 4-day-forecast
Wählen Sie hier eine Stadt. Der Adapter erzeugt einen Link zu einem Chart mit der 4-Tage-Prognose (Datenpunkt solarwetter.0.forecast.chart.__url__ ).

Choose a city to have the adapter build a link to a 4-day-forecast chart (datapoint solarwetter.0.forecast.chart.__url__ ).

![alt text](img/solarwetterSettingScreenshot.jpg "Screenshot Settings")

## Aktivierung / Schedule
Der Adapter startet einmal täglich.

The adapter starts once a day.

##  Datenpunkte / Datapoints

solarwetter.0.forecast.__clearSky__ (*value*)

solarwetter.0.forecast.__realSky_min__(*value*)

solarwetter.0.forecast.__realSky_max__ (*value*)

solarwetter.0.forecast.__Datum__  (*string, no timestamp*)

solarwetter.0.forecast.__Region__ (*value*)

solarwetter.0.forecast.home.__clearSky__ (*value*)

solarwetter.0.forecast.home.__realSky_min__(*value*)

solarwetter.0.forecast.home.__realSky_max__ (*value*)

solarwetter.0.forecast.home.__Leistung__ (*value*)

solarwetter.0.forecast.chart.__city__ (*value*)

solarwetter.0.forecast.chart.__url__ (*value*)



## Changelog
### 1.0.0 (2017-10-15)
* (pix) End of beta, Nodejs 4 or higher required

### 0.3.0 (2017-05-28)
* (pix) Login with website password & username  

### 0.2.0 (2017-01-05)
* (pix) Travis CI testing added

### 0.1.2 (2016-06-21)
* (pix) city selection fixed

### 0.1.1 (2016-06-20)
* (pix) 4-Day-Forecast Chart

### 0.1.0 (2016-06-12)
* (pix) publish on npm

### 0.0.6 (2016-06-09)
* (pix) Adapter.stop() fixed

### 0.0.5 (2016-05-14)
* (pix) Settings now show correct location if already defined

### 0.0.4 (2016-05-13)
* (pix) Appearance of settings window

### 0.0.3 (2016-05-13)
* (pix) Calculates power of own solar plant

### 0.0.2 (2016-05-13)
* (pix) Post code area selectable

### 0.0.1 (2016-05-12)
* (pix) first release

## ToDo
* Translation of Datapoints
* Russian translation of settings window

## License

The MIT License (MIT)

Copyright (c) 2019 pix

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

---
*Logo is partly crafted by CHALLENGER* :+1: 
