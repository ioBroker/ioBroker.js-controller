![Logo](admin/meteoalarm.png)
# ioBroker.meteoalarm

[![Greenkeeper badge](https://snyk.io/test/github/jack-blackson/ioBroker.meteoalarm/badge.svg)](https://snyk.io/test/github/jack-blackson/ioBroker.meteoalarm) [![NPM version](http://img.shields.io/npm/v/iobroker.meteoalarm.svg)](https://www.npmjs.com/package/iobroker.meteoalarm) [![Build Status Travis](https://travis-ci.com/jack-blackson/ioBroker.meteoalarm.svg?branch=master)](https://travis-ci.com/jack-blackson/ioBroker.meteoalarm) [![Downloads](https://img.shields.io/npm/dm/iobroker.meteoalarm.svg)](https://www.npmjs.com/package/iobroker.meteoalarm) ![Number of Installations](http://iobroker.live/badges/meteoalarm-installed.svg) ![Number of Installations](http://iobroker.live/badges/meteoalarm-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.meteoalarm.png?downloads=true)](https://nodei.co/npm/iobroker.meteoalarm.png?downloads=true/)

meteoalarm Adapter for ioBroker
------------------------------------------------------------------------------
This adapter is pulling weather alarms from meteoalarm.eu, which includes wind, snow, rain, high and low temperature,etc. This information is available in local language and for detailed regions.

## How to use it
There are two options how you can get the link to retrieve the meteoalarm information.

Option 1: Choose your country, then press "load region", and then choose the region. The xml is then filled automatically. Just press save and you are ready.

Option 2: Go to http://meteoalarm.eu and choose your region. Then go to the RSS symbol on the top right side, do a right click and copy the link. This is the link which you please add to the setup of the adapter.

![Logo](screenshot.png)


## Available fields
|Field Name|Description|                                                                       
|:---:|:---:|
|Last Update|Date when the adapter received data the last time|
|Link|Link to the RSS Feed|
|Location|Alarm Location|
|Publication Date|Publication Date of the alarm according to the website|
|HTMLToday|HTML Widget that displays Alarms for today|
|Weather Map Country|HTML Link to Weather Map of the Alarm Country|
|Today/Tomorrow|These datapoints are available for today and tomorrow:|
|   Text|Alarm Text in country specific language|
|   From|Alarm starting date|
|   To|Alarm ending date|
|   Type|Type of Alarm as number|
|   TypeText|Type of Alarm as text|
|   Level|Level of Alarm as number|
|   LevelText|Level of Alarm as text|
|   Color|Alarm color for widgets|
|   Icon|Alarm type icon|


## Alarm Types
|Alarm Type|Description|                                                                       
|:---:|:---:|
|1|Wind|
|2|Snow/Ice|
|3|Thunder & Lightning|
|4|Fog|
|5|High temperature|
|6|Low temperature|
|7|Coast Event|
|8|Forrest fire|
|9|Avalanche|
|10|Rain|
|11|Unknown|
|12|Flood|
|13|Rain-Flood|



## Alarm Levels
|Alarm Level|Description|                                                                       
|:---:|:---:|
|Green|There is no warning available at the moment.|
|Yellow|The weather is potentially dangerous. The predicted weather phenomena are not unusual, but increased attention should be paid to activities exposed to meteorological risks. Keep yourself informed about the meteorological conditions to be expected and do not take any avoidable risks.|
|Orange|The weather is dangerous. Unusual meteorological phenomena have been predicted. Damage and accidents are likely. Be very attentive and careful and keep up to date with the expected meteorological conditions. |
|Red|The weather is very dangerous. Unusually intense meteorological phenomena were predicted. Extreme damage and accidents, often over large areas, threaten life and property. |

## Supported countries
* Austria
* Croatia
* Czech Republic
* Finnland
* Germany
* Greece
* Hungary
* Ireland
* Israel
* Italy
* Latvia
* Lithuania
* Malta
* Moldova
* Montenegro
* Netherlands
* Norway
* Poland
* Romania
* Serbia
* Slovakia
* Spain
* Switzerland
* Sweden

If you don't find your country, please create an issue on github, and I will be happy to add it

## Not possible countries
* France (no rss feed available)
* Portugal (no splitting possible)
* Slovenia (no rss feed available)

## Features to implement
* Handle multiple alarms on one day


## Changelog
## 1.1.1 (2020-10-28)
* (jack-blackson) Bugfix HTML Data
## 1.1.0 (2020-03-29)
* (jack-blackson) Bugfix Germany
## 1.0.9 (2020-02-06)
* (jack-blackson) Bugfix Germany
## 1.0.8 (2019-11-15)
* (jack-blackson) Added Poland, Moldova, Greece, Romania
* (jack-blackson) Added new Datapoint to get Link to Weather Map
## 1.0.7 (2019-11-13)
* (jack-blackson) Added Czech Republic, Ireland, Israel, Lithuania, Latvia, Montenegro, Malta, Serbia, Sweden
## 1.0.6 (2019-10-19)
* (jack-blackson) Added Switzerland & Slowakia
## 1.0.5 (2019-09-22)
* (jack-blackson) Small logging adjustments
## 1.0.4 (2019-09-11)
* (jack-blackson) Travis error
## 1.0.3 (2019-09-09)
* (jack-blackson) Small bugfixes, change from type "deamon" to "schedule"
## 1.0.2 (2019-08-25)
* (jack-blackson) Reordered release infos
### 1.0.1 (2019-08-18)
* (jack-blackson) Bugfix no alarm icon
### 1.0.0 (2019-08-12)
* (jack-blackson) Release version
### 0.6.0 (2019-08-05)
* (jack-blackson) Store weather icons local in adapter
### 0.5.0 (2019-07-21)
* (jack-blackson) Handle Timeouts
* (jack-blackson) Translations for all languages
* (jack-blackson) URL checks
### 0.4.0 (2019-07-20)
* (jack-blackson) Added data for NL,NO,HR,FI,ES
* (jack-blackson) Added Type Text, Type is now empty if Level is 1 (No Warning)
* (jack-blackson) Adjusted colors
### 0.3.0 (2019-07-13)
* (jack-blackson) Added HTML Widget
* (jack-blackson) Bugfix icon
### 0.2.0 (2019-07-12)
* (jack-blackson) Added "Tomorrow" data
### 0.1.0 (2019-07-11)
* (jack-blackson) initial version

## Credits
Bell in icon designed by Freepik from www.flaticon.com


## License
The MIT License (MIT)

Copyright (c) 2019-2020 jack-blackson <blacksonj7@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.