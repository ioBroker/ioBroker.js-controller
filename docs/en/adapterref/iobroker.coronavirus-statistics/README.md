!(logo)[admin/coronavirus-statistics.png]
# ioBroker.coronavirus-statistics

[![NPM version](http://img.shields.io/npm/v/iobroker.coronavirus-statistics.svg)](https://www.npmjs.com/package/iobroker.coronavirus-statistics)
[![Downloads](https://img.shields.io/npm/dm/iobroker.coronavirus-statistics.svg)](https://www.npmjs.com/package/iobroker.coronavirus-statistics)
![Number of Installations (latest)](http://iobroker.live/badges/coronavirus-statistics-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/coronavirus-statistics-stable.svg)
[![Dependency Status](https://img.shields.io/david/iobroker-community-adapters/iobroker.coronavirus-statistics.svg)](https://david-dm.org/iobroker-community-adapters/iobroker.coronavirus-statistics)
[![Known Vulnerabilities](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.coronavirus-statistics/badge.svg)](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.coronavirus-statistics)

[![NPM](https://nodei.co/npm/iobroker.coronavirus-statistics.png?downloads=true)](https://nodei.co/npm/iobroker.coronavirus-statistics/)

**Tests:**: [![Travis-CI](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.coronavirus-statistics/master.svg)](https://travis-ci.org/iobroker-community-adapters/ioBroker.coronavirus-statistics)

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
| critical | Amount of critical situation (Hospitalized) |
| deaths | Amount of current registered deaths |
| recovered | Amount of totally known recovered cases |
| todayCases | New Cases by Today |
| todayDeaths | Amount of totally known people died today |


Please be aware this adapter uses as much as possible up-to-date information but there can be an delay of several hours depending on the country's report.
Source : https://coronavirus-19-api.herokuapp.com

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
