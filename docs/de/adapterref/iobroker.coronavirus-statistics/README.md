---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.coronavirus-statistics/README.md
title: ioBroker.coronavirus-Statistik
hash: oTIhUDP9XRjsxpNs7s5q8OIxCSwDQeG2kZFHzz6bpk4=
---
![NPM-Version](http://img.shields.io/npm/v/iobroker.coronavirus-statistics.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.coronavirus-statistics.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/coronavirus-statistics-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/coronavirus-statistics-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/iobroker-community-adapters/iobroker.coronavirus-statistics.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.coronavirus-statistics/badge.svg)
![NPM](https://nodei.co/npm/iobroker.coronavirus-statistics.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.coronavirus-statistics/master.svg)

! (Logo) [admin / coronavirus-statistics.png]

# IoBroker.coronavirus-statistics
## Coronavirus Live Statistics-Adapter für ioBroker
Adapter zur Anzeige von Informationen zum globalen Corona-Virus und aktuellen Berichten

Es ist keine Konfiguration erforderlich. Nach der Installation wird Folgendes ausgeführt:

- Erhalten Sie globale Informationen weltweit und schreiben Sie sie in "global_totals"
- Erstellen Sie für jedes Land einen Ordner mit allen relevanten Informationen zu COVID-19
- Aktualisieren Sie die Informationen alle 15 Minuten

Folgende Informationen sind verfügbar:

| Datenpunkt | Details |
|--|--|
| aktiv | Anzahl der aktuell infizierten Personen |
| Fälle | Anzahl der völlig bekannten Fälle |
| kritisch | Menge der kritischen Situation (Krankenhausaufenthalt) |
| Todesfälle | Anzahl der aktuell registrierten Todesfälle |
| wiederhergestellt | Anzahl der vollständig bekannten wiederhergestellten Fälle |
| todayCases | Neue Fälle bis heute |
| todayDeaths | Zahl der völlig bekannten Menschen ist heute gestorben |

Bitte beachten Sie, dass dieser Adapter so viele aktuelle Informationen wie möglich verwendet. Je nach Bericht des Landes kann es jedoch zu einer Verzögerung von mehreren Stunden kommen.
Quelle: https://coronavirus-19-api.herokuapp.com

## Fehlende Länder hinzufügen
Es kann vorkommen, dass Länder nicht korrekt erkannt werden, da die API einige Ländernamen liefert, die nicht ISO-konform sind. In einem solchen Fall erhalten Sie eine Warnmeldung im Protokoll, die so aussieht

```
coronavirus-statistics.0	2020-03-21 09:05:31.328	warn	(22937) Timor-Leste not found in lib! Must be added to the country name translator.
```

Mit dem Datenpunkt `coronavirus-statistics.0.countryTranslator` können Sie selbst ein Land zuordnen. Suchen Sie hier nach dem Namen des entsprechenden Landes:

[Liste mit Ländernamen](https://github.com/i-rocky/country-list-js/blob/master/data/names.json)

Mit dem ausgewählten Ländernamen müssen Sie eine JSON-Zeichenfolge erstellen und in den Datenpunkt `coronavirus-statistics.0.countryTranslator` eingeben.
Die JSON-Zeichenfolge sieht dann folgendermaßen aus:

```
{
	"Cabo_Verde": "Cape Verde",
	"Timor-Leste": "East Timor"
}
```

Als erster Wert muss der Name aus der Warnmeldung aus dem Protokoll entnommen werden. Dem wird dann der Name des Landes aus den [Liste mit Ländernamen](https://github.com/i-rocky/country-list-js/blob/master/data/names.json) zugeordnet.

## Changelog

### 0.3.3
* (DutchmanNL) Improved configuration page
* (DutchmanNL) Make country list in configuration variable	
* (DutchmanNL) Implement choice if non-selected countrys should be deleted from states (if already there, default No!) 

### 0.3.1
* (DutchmanNL) Enable configuration

### 0.3.0 (2020-03-22)
* (bluefox) The number of data points was reduced by selection of countries
 
### 0.2.5 
* (Scrounger) Bugfix : Cabo_Verde not found in lib! Must be added to the country name translator

### 0.2.4
* (Scrounger) Grouping by continents implemented

### 0.2.3
* (DutchmanNL) Error message for new attribute solved

### 0.2.2
* (GermanBluefox) fixed widget countries

### 0.2.1
* (DutchmanNL) Fixed error "State attribute definition missing"
* (DutchmanNL) Moved "_Laste_Update" to updated within global_totals tree
* (GermanBluefox) fix logo size

### 0.2.0 Code optimized & released
* (DutchmanNL) Stable release
* (DutchmanNL) Added retry if API does not provide correct information
* (DutchmanNL) Added last time stamp of data collection
* (AlCalzone) Code optimized

### 0.1.6 Adapter renamed
* (@DutchmanNL) Adapter renamed

### 0.1.2 Widgets added & code improvements
* (DutchmanNL) code improvements
* (GermanBluefox) add widgets

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