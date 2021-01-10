![Logo](admin/weatherflow_udp.png)
# Weatherflow UDP



[![NPM version](http://img.shields.io/npm/v/iobroker.weatherflow_udp.svg)](https://www.npmjs.com/package/iobroker.weatherflow_udp)
[![Downloads](https://img.shields.io/npm/dm/iobroker.weatherflow_udp.svg)](https://www.npmjs.com/package/iobroker.weatherflow_udp)
![Number of Installations (latest)](http://iobroker.live/badges/weatherflow_udp-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/weatherflow_udp-stable.svg)
[![Dependency Status](https://img.shields.io/david/woessmich/iobroker.weatherflow_udp.svg)](https://david-dm.org/woessmich/iobroker.weatherflow_udp)
[![Known Vulnerabilities](https://snyk.io/test/github/woessmich/ioBroker.weatherflow_udp/badge.svg)](https://snyk.io/test/github/woessmich/ioBroker.weatherflow_udp)

[![NPM](https://nodei.co/npm/iobroker.weatherflow_udp.png?downloads=true)](https://nodei.co/npm/iobroker.weatherflow_udp/)

**Tests:**
[![Travis-CI](http://img.shields.io/travis/woessmich/ioBroker.weatherflow_udp/master.svg)](https://travis-ci.org/woessmich/ioBroker.weatherflow_udp)
Windows: [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/woessmich/ioBroker.weatherflow_udp?branch=master&svg=true)](https://ci.appveyor.com/project//woessmich/ioBroker.weatherflow_udp/)


## weatherflow_udp adapter for ioBroker

Weatherflow UDP receiver
Adapter to receive and parse [UDP messages](https://weatherflow.github.io/Tempest/api/udp/v143/) from [Weatherflow](www.weatherflow.com) smart weatherstations like [Weatherflow Tempest](https://weatherflow.com/tempest-weather-system/).
The adapter should be able to parse older stations like "Air" and "Sky" as well (but this is untested).
Standard port the adpater listens on is 50222 but can be changed in setup.

## Settings
The adapter provides a minimum set of setup options.
The listening port can be changed, which should not be required as the port the weatherstation hub is sending can not be changed, to my knowledge.

The station height in meters above sea level is used to calculate the reduced pressure from local pressure as is provided by the station. Just use the same height as entered in the App. There may be small differences compared to the reduced pressure in the app depending on the formula used. The adapter uses the formula the german weather service DWD is using (http://dk0te.ba-ravensburg.de/cgi-bin/navi?m=WX_BAROMETER; nur noch [hier](https://www.symcon.de/forum/threads/6480-Relativen-Luftdruck-aus-absoluten-Luftdruck-errechnen)).

When the debug checkbox is ticked, the adapter creates a lot of output in the log file. Should only be used for debugging.

## Data and states by weatherflow
The adapter provides all parameters that are sent over the UDP protocol.
States are in a tree below the hub and station ID. <b>Caution</b>: When sending data to databases for long term archiving, aliases for the states should be used to not lose the series if a unit needs replacement.
There are some differences to what the Tempest-App provides, as the App gets the already processed data back from weatherflow servers.
Given sufficient battery power, "device_status" and "obs_st" data and is updated every minute, "rapid_wind" is updated every 3 seconds.
"evt_precip" and "evt_strike" are only updated (and created) when they happen.
"hub_status" is updated every 10 seconds.
Values from the station and the adapter calculated (see below) values are only created when received or due for calculation. This means it might take up to 24h to see everything, except rain start and lightning strike events, which might take days, weeks, months to appear ;-)

## Adapter calculated states
In addition to the data provided by the system, the adapter calculates some additional data, which all have "adapter calculated" as a name suffix:
- Wind average, gust and lull in [beaufort](https://en.wikipedia.org/wiki/Beaufort_scale)
- dewpoint calculated from temperature and humidty
- feels like temperature calculated from temperature, humidity and average wind. Depending on temperature and wind or temperature or humidity either jsut the air temperature is displayed or [wind chill](https://en.wikipedia.org/wiki/Wind_chill) or [heat index](https://en.wikipedia.org/wiki/Heat_index) is calculated.
- Precipitation amount and duration as well as [sunshine duration](https://en.wikipedia.org/wiki/Sunshine_duration) (>= 120 W/m2) are provided for the current and past hour as well as today and yesterday. Using previous hour and yesterday allows for easily storing data into a database on changes of the values.
- Precipition intensity is provided according to this scale: none(0): 0 mm / hour; very light(1): > 0, < 0.25 mm / hour; light(2): ≥ 0.25, < 1.0 mm / hour; moderate(3): ≥ 1.0, < 4.0 mm / hour;  heavy(4): ≥ 4.0, < 16.0 mm / hour; very heavy(5): ≥ 16.0, < 50 mm/hour; extreme(6): > 50.0 mm / hour
- Raining is also shown as a boolean state (true, false) in precip_evt. It will be set to true if a precipiation event is received and if precipitation value is >0. After 3 minutes it is reset if it is no longer raining
- Sunshine is also shown as a boolean state true if >= 120 W/m2 and false if less 
- Wind direction in cardinal letters (NSWE) calculated from wind direction in degrees.
Further, the adapter provides a selection of useful minimum and maximum values of parameters for today and yesterday.
- sensor_status as text to easily see which sensor(s) failed if this happens.
- From sensor_status bits, the power mode is extracted (experimental)

## Lightning distance
The protocol sends a lightning distance of 0 when no lightning was detected. Values of 0 are modified to 999 to avoid the impression that lightning strikes are directly overhead.

## Changelog
### 0.0.13
(womi) Corrected precipitation duration (again); changed boolean raining behaviour
### 0.0.12
* (womi) Correction: Precipitation yesterday was not written
### 0.0.11
* (womi) Corrected more programming issues from review
### 0.0.10
* (womi) Corrected programming issues from review
### 0.0.9
* (womi) Assigned roles to states; fixes for status 'latest'
### 0.0.8
* (womi) Corrected rain accumulation/duration; added precipitation intensity; added experimental power mode; added raining and sunshine as boolean states
### 0.0.7
* (womi) Updated parts of adapter calculated data structure, added last message per message type instead of one for all; corrected calculation of feels like temperature
### 0.0.6
* (womi) initial release after testing with real tempest

## License
MIT License

Copyright (c) 2020 womi <woessmich@gmail.com>

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
