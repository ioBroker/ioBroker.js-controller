---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.coronavirus-statistics/README.md
title: ioBroker.coronavirus-Statistik
hash: aNCB9lKKNnKhn3FeSBkx1l77wYLxDUsCYRm3gAkx4FE=
---
![NPM-Version](http://img.shields.io/npm/v/iobroker.coronavirus-statistics.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.coronavirus-statistics.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/coronavirus-statistics-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/coronavirus-statistics-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/iobroker-community-adapters/iobroker.coronavirus-statistics.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.coronavirus-statistics/badge.svg)
![NPM](https://nodei.co/npm/iobroker.coronavirus-statistics.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.coronavirus-statistics/master.svg)

<img src="./admin/coronavirus-statistics.png" width="50" height="50">

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
| FällePerOneMillion | Anzahl der völlig bekannten Fälle pro Million Einwohner |
| kritisch | Menge der kritischen Situation (Krankenhausaufenthalt) |
| Todesfälle | Anzahl der aktuell registrierten Todesfälle |
| TodesfällePerOneMillion | Anzahl der aktuell registrierten Todesfälle pro Million Einwohner |
| flag | Länderflagge, Link zum Github-Standort |
| wiederhergestellt | Anzahl der vollständig bekannten wiederhergestellten Fälle |
| todayCases | Neue Fälle bis heute |
| todayDeaths | Zahl der völlig bekannten Menschen ist heute gestorben |
| test | Gesamtzahl der weltweit durchgeführten Covid-19-Tests |
| Tests pro eine Million Landkreise Gesamtzahl der weltweit durchgeführten Covid-19-Tests pro Million |

Bitte beachten Sie, dass dieser Adapter so viele aktuelle Informationen wie möglich verwendet. Je nach Bericht des Landes kann es jedoch zu einer Verzögerung von mehreren Stunden kommen.
Bundesländer: https://npgeo-corona-npgeo-de.hub.arcgis.com/ s Generische Quelle: https://coronavirus-19-api.herokuapp.com

## Erweiterte Einstellungen
| Option | Beschreibung |
|--|--|
| Alle Länder | Daten für alle Länder weltweit abrufen (Standard: false) |
| Kontinente | Gruppieren Sie die Gesamtbeträge nach Kontinent in einem separaten Status (Standard: false) |
| Nicht verwendete Zustände löschen | Daten löschen, wenn Länder abgewählt sind (Standard: false) |

## Nur für Deutschland
| Option | Beschreibung |
|--|--|
| Bundesländer | Bundeslanddaten für Deutschland abrufen (nur ausgewählt, Standard falsch) |
| Landkreise | Daten für Deutschland abrufen (nur ausgewählt, Standard falsch) |
| Städte | Daten für deutsche Städte abrufen (nur ausgewählt, Standard falsch) |
| Alle Bundesländer | Alle Bundesländer (Standard falsch) |
| Alle Städte | Alle deutschen Städte (Standard falsch) |
| Alle Landkreise | Alle Bundesländer (Standard falsch) |

Es ist möglich, Daten für Bundesländer und Städtekreise abzurufen.
Sie können wählen, ob alle Daten empfangen werden sollen, oder nur bestimmte Regionen in den erweiterten Einstellungen auswählen.

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


### 0.5.5 (2020-04-07) Bugfixes, see changelog for details
* (DutchmanNL) Bugfix : Remove test-states
* (DutchmanNL) Bugfix : Selected items not shown in tables
* (DutchmanNL) Bugfix : Remove incorrect countryInfo state
* (Scrounger)  Bugfix : Timestamp for continents calculation
* (Scrounger)  Bugfix : Replace " , " in country name causing errors
* (DutchmanNL) Bugfix : Saint Pierre Miquelon (iso2: null, iso3: null) not found in lib!
* (DutchmanNL) Implemented Total number of covid-19 tests taken globally.  
 It reflects the Total Tests column in the table at https://www.worldometers.info/coronavirus/.

### 0.5.1 (2020-03-31) BugFix : State attribute definition missing for + affectedCountries
* (DutchmanNL) BugFix : State attribute definition missing for + affectedCountries
* (DutchmanNL) BugFix : Ensure name changes are propagated

### 0.5.0 (2020-03-31) For Germany : federal states, counties and cities added
* (DutchmanNL) Update production release from 0.4.0 to 0.5.0
* (DutchmanNL) BugFix : Do not write objects unneeded

### 0.4.9 Fixed issues in country names, added counties and cities for germany
* (DutchmanNL  & AlCalzone) Code optimations 
* (DutchmanNL) Cities for germany added
* (DutchmanNL) counties for germany added
* (DutchmanNL) Hiding tables if "all" is selected
* (DutchmanNL) Hiding unused tables in advanced settings
* (Kampfratte) BugFix : Country top 5
* (GermanBluefox) BugFix : hidden numbers
* (DutchmanNL) BugFix : Several translations
* (DutchmanNL) BugFix : Issues with integration testing
* (Scrounger)  Bugfix : Country names by ISO format (could result in new datapoints !)
* (DutchmanNL) BugFix : Deletion of unselected federal states and counties (Germany)
* (DutchmanNL) BugFix : Button only respond when clicking on lable (not all browser)
* (DutchmanNL) BugFix : Ensure incorrect created states for "countryInfo" are removed

### 0.4.5 Countries for Germany added
* (DutchmanNL) Countries for Germany added
* (DutchmanNL) added selection for federal states and country's
* (DutchmanNL) BugFix : State attribute definition missing for + deathsPerOneMillion

### 0.4.2 Federal States for Germany implemented
* (DutchmanNL) Configuration redesigned, moved options to "Advanced Settings" tab
* (DutchmanNL) Federal States for Germany implemented, thanks to : https://npgeo-corona-npgeo-de.hub.arcgis.com/ 

### 0.4.0 Data-points added for Top 5 of countries with most cases
* (KLVN) BugFix : German (and some other) translations corrected
* (DutchmanNL) Add gulp i18n translation structure


### 0.3.5 Data-points added for Top 5 of countries with most cases
* (DutchmanNL) Data-points added for Top 5 of countries with most cases
* (DutchmanNL) BugFix : Flag datapoints are not deleted

### 0.3.4 Add button to read "All Countrys"
* (DutchmanNL) Add button to read "All Countrys"
* (DutchmanNL) Add state for link to flag for each country on github
* (DutchmanNL) BugFix : State attribute definition missing for + countryInfo
* (DutchmanNL) BugFix : Turks_and_Caicos not found in lib! Must be added to the country name translator.

### 0.3.3 Improved configuration page
* (DutchmanNL) Improved configuration page
* (DutchmanNL) Make country list in configuration variable	
* (DutchmanNL) Implement choice if non-selected countrys should be deleted from states (if already there, default No!) 

### 0.3.1
* (DutchmanNL) Enable configuration

### 0.3.0 (2020-03-22)
* (GermanBluefox) The number of data points was reduced by selection of countries
 
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