<img src="./admin/coronavirus-statistics.png" width="50" height="50">

# ioBroker.coronavirus-statistics

[![NPM version](http://img.shields.io/npm/v/iobroker.coronavirus-statistics.svg)](https://www.npmjs.com/package/iobroker.coronavirus-statistics)
[![Downloads](https://img.shields.io/npm/dm/iobroker.coronavirus-statistics.svg)](https://www.npmjs.com/package/iobroker.coronavirus-statistics)
![Number of Installations (latest)](http://iobroker.live/badges/coronavirus-statistics-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/coronavirus-statistics-stable.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.coronavirus-statistics/badge.svg)](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.coronavirus-statistics)

[![NPM](https://nodei.co/npm/iobroker.coronavirus-statistics.png?downloads=true)](https://nodei.co/npm/ioBroker.coronavirus-statistics/)

![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.coronavirus-statistics/workflows/Test%20and%20Release/badge.svg)
[![Dependency Status](https://img.shields.io/david/iobroker-community-adapters/ioBroker.coronavirus-statistics.svg)](https://david-dm.org/iobroker-community-adapters/ioBroker.coronavirus-statistics)
## Coronavirus Live Statistics adapter for ioBroker

Adapter to show Global Corona Virus information and current reports

There is no configuration required, after installation it will : 

- Receive global information world-wide and write it to "global_totals"
- Create a folder for each country with all relevant information regarding COVID-19
- Update the information every 15 minutes

The following information is available : 

| Datapoint | Details |
|--|--|
| active | Amount of current infected people |
| cases | Amount of totally known cases |
| casesPerOneMillion | Amount of totally known cases per million citizen |
| critical | Amount of critical situation (Hospitalized) |
| deaths | Amount of current registered deaths |
| deathsPerOneMillion | Amount of current registered deaths per million citizen |
| flag | Country flag, link to github location |
| recovered | Amount of totally known recovered cases |
| todayCases | New Cases by Today |
| todayDeaths | Amount of totally known people died today |
| test | Total number of covid-19 tests taken globally |
| tests per one  million counties | Total number of covid-19 tests taken globally per one  million |

Please be aware this adapter uses as much as possible up-to-date information but there can be an delay of several hours depending on the country's report.  
German Federal States : https://npgeo-corona-npgeo-de.hub.arcgis.com/  s
Generic Source : https://coronavirus-19-api.herokuapp.com

## Advanced settings
| Option | Description |
|--|--|
| All Countries | Get data for all countries World-Wide (Default: false) |
| Continents | Group total amounts by continent in seperate state (Default: false) |
| Delete unused States | Delete data when countries are deselected (Default: false) |

## For Germany only
| Option | Description |
|--|--|
| Federal states| Get federal state data for Germany (Selected only, Default false) |
| counties | Get data for Germany counties (Selected only, Default false) |
| Cities | Get data for Germany cities (Selected only, Default false) |
| All federal states | All Germany federal states  (Default false) |
| All cities | All Germany cities (Default false) |
| All counties | All Germany counties (Default false) |

It's possible to get data for federal states (Bundesländer), cities (Städte) counties (Landeskreise).
You can choose to recieve all data or just select specific regions in advanced settings.

## Add missing countries
It may happen that countries are not recognized correctly because the API delivers some country names not ISO conform. In such a case you will get a warning message in the log, which looks like this

```
coronavirus-statistics.0	2020-03-21 09:05:31.328	warn	(22937) Timor-Leste not found in lib! Must be added to the country name translator.
```

Using the datapoint `coronavirus-statistics.0.countryTranslator` you can assign a country yourself. Look for the name of the corresponding country here:

[List with country names](https://github.com/i-rocky/country-list-js/blob/master/data/names.json)

With the selected country name you have to create a JSON string and enter it in the datapoint `coronavirus-statistics.0.countryTranslator`.
The JSON string then looks like this, for example:

```
{
	"Cabo_Verde": "Cape Verde",
	"Timor-Leste": "East Timor"
}
```

As first value the name from the warning message must be taken from the log. The name of the country from the [List with country names](https://github.com/i-rocky/country-list-js/blob/master/data/names.json) is then assigned to this.

## Changelog

<!--
	### __WORK IN PROGRESS__
	* (DutchmanNL) xxxx
-->

### 0.6.4 (2020-12-29)
* (DutchmanNL) change API from V2 to V3
* (DutchmanNL) Add Last_Updated for city's/counties

### 0.6.3 (2020-11-04)
* (DutchmanNL) Bugfix : Error warnings to wrong type in states
* (DutchmanNL) Bugfix : Error values.features is not iterable solved

### 0.6.2 (2020-11-02)
* (stan23) 
add "Cases per 100k" in total & during the last 7 days for Germany's Bundesländer

### 0.6.1 (2020-09-25)
* (stan23) Added cases per 100k during the last 7 days for Germany

### 0.6.0 (2020-08-28)
* (DutchmanNL) Replaced module request with axios
* (DutchmanNL) Bugfix : Proper error handling of failing API calls (if api not reachable)
* (Kampfratte) Bugfix : API-Abfrage geändert

### 0.5.7 (2020-04-17) Continent state attribute information added and warn messages reduced
* (DutchmanNL) Bugfix : Add continent state attribute definition
* (DutchmanNL) Bugfix : Reduce warn messages if error occurs to 1 per message

### 0.5.6 (2020-04-17) Bugfix : API changed
* (Kampfratte) Bugfix : API changed

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
