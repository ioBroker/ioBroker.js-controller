---
BADGE-Number of Installations: http://iobroker.live/badges/tankerkoenig-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.tankerkoenig.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.tankerkoenig.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/Pix---/ioBroker.tankerkoenig/badge.svg?targetFile=package.json
BADGE-NPM: https://nodei.co/npm/iobroker.tankerkoenig.png?downloads=true
BADGE-Travis-CI: http://img.shields.io/travis/Pix---/ioBroker.tankerkoenig/master.svg
BADGE-AppVeyor: https://ci.appveyor.com/api/projects/status/github/Pix---/ioBroker.tankerkoenig?branch=master&svg=true
---
![Logo](../../admin/tankerkoenig.png)
# ioBroker.tankerkoenig

[![NPM version](http://img.shields.io/npm/v/iobroker.tankerkoenig.svg)](https://www.npmjs.com/package/iobroker.tankerkoenig)
[![Downloads](https://img.shields.io/npm/dm/iobroker.tankerkoenig.svg)](https://www.npmjs.com/package/iobroker.tankerkoenig)

[![NPM](https://nodei.co/npm/iobroker.tankerkoenig.png?downloads=true)](https://nodei.co/npm/iobroker.tankerkoenig/)

**Tests:** Linux/Mac: [![Travis-CI](http://img.shields.io/travis/Pix---/ioBroker.tankerkoenig/master.svg)](https://travis-ci.org/Pix---/ioBroker.tankerkoenig)
Windows: [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Pix---/ioBroker.tankerkoenig?branch=master&svg=true)](https://ci.appveyor.com/project/Pix---/ioBroker-tankerkoenig/)


## Description
This adapter returns fuel prices for up to ten different station through a JSON feed of the web service [tankerkoenig.de](https://creativecommons.tankerkoenig.de/#about). All data is stored in objects to be used and displayed in [ioBroker.vis](https://github.com/ioBroker/ioBroker.vis).
The adapter uses the site prices.php which reduces the amount of data to be transfered when updating compared to list.php and detail.php (bulk). The adapter creates datapoints for the station that sells the cheapest E5, E10 and diesel.

## Configuration
### API key
The API key can be obtained at [website Tankerkönig](https://creativecommons.tankerkoenig.de/#about). It is a 36 digit code that has to be entered in this field.

### Stations
Up to ten different stations can be defined. Therefore the specific station ID can be obtained on tankerkoenig.de. It has 36 digits too. This ID has to be entered in the list. A corresponding name is optional.
![alt text](img/tankerkoenigSettingsScreenshot.jpg "Screenshot Settings")

### Write null
In case of a disconnect this option prevents the adapter to store old values. It helps to produce a smoother history chart.

### Minimize log
To reduce log writing (e.g. on SD cards) this option can be selected.

## Activation
The adapter runs as a daemon (not in schedule mode) and starts regularly every five minutes. The data of the source feed are updated by the server at tankerkoenig.de only every 4 minutes, therefore a more frequent query of the data makes no sense and causes only superfluous data traffic and costs resources. Larger intervals can be set at any time.

##  Datapoints
Each of the ten ten stations have a channel for each fuel type (E5, E10 and diesel) and furthermore each of them has another four datapoints.
* `feed` (price with three decimals; type number)
* `short` (price with two decimals; type string)
* `3rd` (third decimal cann be writen as superscript in VIS)
* `combined` (ready to use HTML formatted price with a superscripted third decimal and info, whether station is open ["closed"/"not found"] to be displayed in a VIS HTML Widget)
![alt text](img/tankerkoenigDP.jpg "Datapoints")

Three more datapoints are stored
* `status` (sation open/closed)
* `name` (user given name of the station)
* `station_id` (Tankerkönig ID of that station)

Additionally the cheapest stations for each fule type are stored
* `cheapest.E5`
* `chepest.E10`
* `cheapest.diesel`

Within these channels the station with the lowest price for each fule type are stored. In case multiple stations offer the same lowest price, stations a sorted in the order that has been used in the configuration.

181 datapoints are created.

## VIS 
The datapoint 'combined' can be displayed easily in this VIS widget
```
[{"tpl":"tplHtml","data":{"visibility-cond":"==","visibility-val":1,"refreshInterval":"0","gestures-offsetX":0,"gestures-offsetY":0,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"html":"<span style=\"font-size: 80%; padding: 0 20px 0 5px;\">Diesel</span>{tankerkoenig.0.stations.0.diesel.combined}"},"style":{"left":"634px","top":"745px","z-index":"20","width":"228px","height":"36px","background-color":"","color":"rgba(225,225,225,1)","font-size":"30px","text-align":"center","background":"rgba(250,0,0,0.1)"},"widgetSet":"basic"}]
```
The value of the datapoint `combined` deliveres a css class. These classes are `station_open`, `station_closed` and `station_notfound`. Through CSS definitions in the CSS editor in VIS now distinguished designs can be achieved (like red font color for a closed station).
```
.station_open {
    color: blue; 
}
.station_closed {
    color: red !important; /* !important kann ggf. weggelassen werden */
}
.station_notfound {
    color: yellow !important; /* !important kann ggf. weggelassen werden */
}

/* € sign */
.station_combined_euro {
    font-family: Times;
    font-size: 80%;
}
```

## Compact Mode
This adapter is ready for iobroker's compact mode.

## Changelog
### 2.0.9 (2020-04-21)
* (pix) NodeJS 10 or higher required

### 2.0.8 (2020-03-27)
* (Zwer2k) 2.0.8 Catch error if station status reports _no data_

### 2.0.7 (2020-03-25)
* (pix) 2.0.7 Catch error if station status reports _no stations_

### 2.0.6 (2019-04-17)
* (Zwer2k) implementation of utils corrected
* (Zwer2k) fixed error occured when all stations were closed

### 2.0.5 (2019-02-22)
* (jens-maus) fixes to prevent _request()_ floodings

### 2.0.3 (2019-02-21)
* (pix) fixed issue with too short sync interval
* (pix) removed datapoint __price__ which was created for debug only

### 2.0.1 (2019-02-20)
* (pix) fixed scrollbar issue in firefox

### 2.0.0 (2019-02-18)
* (pix) admin3 ready

### 1.3.1 (2019-02-05)
* (arteck, pix) request issues fixed

### 1.3.0 (2019-02-05)
* (pix) Compact mode added

### 1.2.1 (2018-11-25)
* (pix) fixed issue __station_id__ and __status__ mixed up

### 1.2.0 (2018-11-25)
* (pix) new datapoint station ID added

### 1.1.0 (2018-05-12)
* (bluefox) prices as number to allow logging were added

### 1.0.5 (2018-02-07)
* (pix) Log entry opt out

### 1.0.4 (2017-03-21)
* (pix) position of _adapter.stop()_ optimized

### 1.0.3 (2017-01-05)
* (pix) Appveyor testing added

### 1.0.2 (2017-01-04)
* (apollon77) TravisCI testing added

### 1.0.1 (2016-12-20)
* (pix) reset to zero issue fixed

### 1.0.0 (2016-10-08)
* (pix) reset values to zero before each refresh now can be ticked off.

### 0.1.2 (2016-07-05)
* (pix,jens-maus) whitespaces between price and € sign

### 0.1.1 (2016-07-05)
* (pix) € appearance in datapoints __combined__ is customizable through css now (thanx jens-maus)

### 0.1.0 (2016-06-12)
* (pix) first version for npm
* (pix) settings window

### 0.0.8 (2016-06-09)
* (pix) Adapter.stop() fixed

### 0.0.7 (2016-06-09)
* (pix) New channels and values for cheapest station created

### 0.0.6 (2016-06-08)
* (pix) Short prices now string

### 0.0.5 (2016-06-08)
* (pix) Channels added for stations 2 to 10
* (pix) Readme corrected (CSS code example)
* (pix) no more log.warn if station is closed
* (pix) scheduled starting improved

### 0.0.4 (2016-06-01)
* (pix) HTML Code in Datapoint __combined__ corrected

### 0.0.3 (2016-06-01)
* (pix) Datapoint __combined__ with CSS class for status

### 0.0.2 (2016-06-01)
* (pix) Datapoint __combined__

### 0.0.1 (2016-05-31)
* (pix) Adapter created

## License

The MIT License (MIT)

Copyright (c) 2016-2020 pix

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