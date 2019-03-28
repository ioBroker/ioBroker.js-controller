![Logo](admin/pollenflug.png)
# Pollen risk index

[![Travis CI Build Status](https://travis-ci.org/schmupu/ioBroker.pollenflug.svg?branch=master)](https://travis-ci.org/schmupu/ioBroker.pollenflug)
[![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.pollenflug?branch=master&svg=true)](https://ci.appveyor.com/project/schmupu/ioBroker-pollenflug/)
![Number of Installations](http://iobroker.live/badges/pollenflug-installed.svg) ![Number of Installations](http://iobroker.live/badges/pollenflug-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.pollenflug.svg)](https://www.npmjs.com/package/iobroker.pollenflug)
[![Downloads](https://img.shields.io/npm/dm/iobroker.pollenflug.svg)](https://www.npmjs.com/package/iobroker.pollenflug)

[![NPM](https://nodei.co/npm/iobroker.pollenflug.png?downloads=true)](https://nodei.co/npm/iobroker.pollenflug/)


![DWDLogo](docs/dwdlogo.png)

The German Weather Service DWD prepares daily forecasts of the pollen risk index.
The pollen species are predicted: hazel, alder, ash, birch, grass, rye, mugwort and
ambrosia for today and tomorrow, on Friday also for the day after tomorrow (Sunday).
Updated daily in the morning.
Information on the pollen counties can be found at: https://www.dwd.de/pollenflug
Copyright of used pollen data: © Deutscher Wetterdienst (Quelle: Deutscher Wetterdienst)

## Install & Configuration
Requires node.js 8.0 or higher and Admin v3! Select the county in the ioBroker adapter
configuration. You will get the pollen risk index for this county. The index will be updated 
once the day, around 11 o'clock.
In the objects info.today, info.tomorrow and info.dayaftertomorrow the validity period will be shown.
It can possible that for example today is friday but in the object info.today the day ist thursday. 
That is correct, because the DWD data are still from thursday and not updated till now. The update will be
at 11 o'clock normaly.  

Provided German counties:

* Schleswig-Holstein und Hamburg (region 11 and 12)
    * Inseln und Marschen (region 11)
    * Geest,Schleswig-Holstein und Hamburg (region 12)
* Mecklenburg-Vorpommern  (region 20)
* Niedersachsen und Bremen  (region 31 and 32)
    * Westl. Niedersachsen/Bremen (region 31)
    * Östl. Niedersachsen (region 32)
* Nordrhein-Westfalen (region 41, 42 and 43)
    * Rhein.-Westfäl. Tiefland (region 41)
    * Ostwestfalen (region 42)
    * Mittelgebirge NRW (region 43)
* Brandenburg und Berlin (region 50)
* Sachsen-Anhalt  (region 61 and 62)
    * Tiefland Sachsen-Anhalt (region 61)
    * Harz (region 62)
* Thüringen (region 71 and 72)
    * Tiefland Thüringen (region 71)
    * Mittelgebirge Thüringen (region 72)
* Sachsen  (region 81 and 82)
    * Tiefland Sachsen (region 81)
    * Mittelgebirge Sachsen (region 82)
* Hessen  (region 91 and 92)
    * Nordhessen und hess. Mittelgebirge (region 91)
    * Rhein-Main (region 92)
* Rheinland-Pfalz und Saarland  (region 101, 102 and 103)
    * Rhein, Pfalz, Nahe und Mosel (region 101)
    * Mittelgebirgsbereich Rheinland-Pfalz (region 102)
    * Saarland (region 103)
* Baden-Württemberg  (region 111, 112 and 113)
    * Oberrhein und unteres Neckartal (region 111)
    * Hohenlohe/mittlerer Neckar/Oberschwaben (region 112)
    * Mittelgebirge Baden-Württemberg (region 113)
* Bayern (region 121, 122, 123 and 124)
    * Allgäu/Oberbayern/Bay. Wald (region 121)
    * Donauniederungen (region 122)
    * Bayern nördl. der Donau, o. Bayr. Wald, o. Mainfranken (region 123)
    * Mainfranken (region 124)

![ioBroker1](docs/iobroker-pollenflug1.png)

The original DWD risk index 0, 0-1, 1, 1-2, 2, 2-3 and 3 are changed to 0, 1, 2, 3, 4, 5 and 6. 
This format can more simply used in ioBroker.  

| Index | DWD Index | description                      	  |
|-----	|---------- |------------------------------------ |
| -1   	| -1        | no data available                   |
| 0   	| 0         | none pollen concentration           | 
| 1 	| 0-1       | none to low pollen concentration    | 
| 2   	| 1         | low pollen concentration        	  | 
| 3 	| 1-2       | low to medium pollen concentration  | 
| 4   	| 2         | average pollen concentration        | 
| 5 	| 2-3       | medium to high pollen concentration | 
| 6   	| 3         | high pollen concentration           |

**Pollen flight example:**
![ioBroker2](docs/iobroker-pollenflug2.png)

![ioBroker3](docs/iobroker-pollenflug3.png)

URL addess of the pollen images from DWD

![ioBroker4](https://www.dwd.de/DWD/warnungen/medizin/pollen/pollen_1_0.png)

## Example
If new data from DWD arrived (the today date will change), the script will show the 
pollen risk index for Hasel and Erle. 

```
on({id: "pollenflug.0.info.today"/*Today*/, change: "ne"}, (obj) => {
    let hasel = getState("pollenflug.0.region#12.Hasel.text_today"/*today*/).val;
    let erle  = getState("pollenflug.0.region#12.Erle.text_today"/*today*/).val;
    console.log("Haselnuss Belastung " + hasel);
    console.log("Erle Belastung " + erle);
});
```

## Changelog

### 1.0.2 (12.03.2019)
* (Stübi) Bugfixing, of changing sepaation of entries in riskindex_x from ',' to ', '
* (Stübi) unnecessary states will be deleted

### 1.0.1 (11.03.2019)
* (Stübi) Delete all states for day after tommorrow 
* (Stübi) Changed type of object riskindex_x from number to string
* (Stübi) Changed sepaation of entries in riskindex_x from ',' to ', '
* (Stübi) Deleted in summary (json) alle -1 entries

### 1.0.0 (10.03.2019)
* (Stübi) Changed the pollen index for better use in VIS. Now you you values -1, 0, 1, 2, 3, 4, 5 ,6
* (Stübi) Add summary for today, tomorrow and the day after tomorrow in json format for every region

### 0.1.9 (25.02.2019)
* (Stübi) Link to DWD Image of pollen flight added

### 0.1.8 (24.02.2019)
* (Stübi) Bugfixing deleting object

### 0.1.6 (20.02.2019)
* (Stübi) First Version of pollen index adapter


## License
The MIT License (MIT)

Copyright (c) 2019 Thorsten Stueben <thorsten@stueben.de> / <https://github.com/schmupu>

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
