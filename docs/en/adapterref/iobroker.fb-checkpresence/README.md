<h1>
    <img src="admin/fb-checkpresence.png" width="64"/>
    ioBroker.fb-checkpresence
</h1>

![Number of Installations](http://iobroker.live/badges/fb-checkpresence-installed.svg) ![Number of Installations](http://iobroker.live/badges/fb-checkpresence-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.fb-checkpresence.svg)](https://www.npmjs.com/package/iobroker.fb-checkpresence)
[![Downloads](https://img.shields.io/npm/dm/iobroker.fb-checkpresence.svg)](https://www.npmjs.com/package/iobroker.fb-checkpresence)
[![Dependency Status](https://img.shields.io/david/afuerhoff/iobroker.fb-checkpresence.svg)](https://david-dm.org/afuerhoff/iobroker.fb-checkpresence)
[![Known Vulnerabilities](https://snyk.io/test/github/afuerhoff/ioBroker.fb-checkpresence/badge.svg)](https://snyk.io/test/github/afuerhoff/ioBroker.fb-checkpresence)

[![NPM](https://nodei.co/npm/iobroker.fb-checkpresence.png?downloads=true)](https://nodei.co/npm/iobroker.fb-checkpresence/)

**Tests:** Linux/Mac: [![Travis-CI](http://img.shields.io/travis/afuerhoff/ioBroker.fb-checkpresence/master.svg)](https://travis-ci.org/afuerhoff/ioBroker.fb-checkpresence)
Windows: [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/afuerhoff/ioBroker.fb-checkpresence?branch=master&svg=true)](https://ci.appveyor.com/project/afuerhoff/ioBroker-fb-checkpresence/)

## fb-checkpresence adapter for ioBroker

The adapter checks the presence of family members over the fritzbox. 
You must fill in the name of the family member and the mac-address (or ip-address) of the used device. 
The comment is optional and you can enable or disable the family member. 
The datapoint is based on the member name.

### Adapter pre conditions
For the correct function you have to install a history adapter. You can choose
one of the following adapters:
* History
* SQL
* InfluxDB 

## Used device
For this adapter the AVM Fritzbox is used. Here you can find informations about
the Fritzbox https://avm.de/produkte/fritzbox/.

### Fritzbox conditions

The used TR-064 interface to the fritzbox is described here: https://avm.de/service/schnittstellen/.
Following TR-064 functions are used:
* GetSpecificHostEntry 
* X_AVM-DE_GetSpecificHostEntryByIP (supported from 2016-05-18) -> is used to read the status of a member via the IP address
* GetHostNumberOfEntries
* X_AVM-DE_GetHostListPath (support from 2017-01-09) -> is used for member configuration
* GetSecurityPort

By default, the TR-064 interface is not activated. However, this can easily be changed via the 
FritzBox web interface. To do this log in into your FritzBox and ensure that the expert view is activated. 
Then you will find below "Home Network »Home Network Overview» Network Settings" the point 
"Allow access for applications". There you have to activate the checkbox and then restart the FritzBox once.
<img src="doc/access_settings_network.JPG"/>

## Configuration dialog

### Fritzbox IP-address, user and password
The configuration of ip-address, user and password is necessary to get the device data from the fritzbox. 
The password is encrypted and wasn't saved in clear text.

### Interval
The interval can be configured from 1 to 59 minutes. Normally a value of 1 to 5 minutes is an optimal interval 
to read the fritzbox data.

### History adapter
Over the history adapter some values are calculated. You can choose, if the history,  the sql or the influxdb adapter is used for this calculations. The history adapter must be installed preliminary. 

### Dateformat
The date format mask options are described on this web page: https://www.npmjs.com/package/dateformat.
The format mask is used for formatting the html and json table objects. 

### Family member settings
For a configured family member you must enter the Name, the mac- or ip-address, a comment and if the member is enabled for calculating. For every member the adapter creates data objects and checks if the member is present or absent. 

### Whitelist settings
In the white list you can insert every known device. Any unknown devices are listed in the blacklist object. 
If you check the checkbox in the headline of the table all devices are selected. 

## Features

### AVM support check
The function checks the availability of used fritzbox features. The availability is logged as info.

### Get guests, blacklist
In this function is checked if any user is logged in as guest. Also is checked if any device is not in the white list listed.
This devices are added to the blacklist.

### Get Active
For every family member the presence, the comming and going dates and several other infos are calculated and saved in the member object. 

### Host number, active devices
The amount of devices and how many are active are get from the fritzbox.

## Objects

### Object presenceAll
If all family members are present then the object is true.

### Object presence
If one family member ist present then the object is true.

### Object devices
These are all listed devices in the fritzbox

### Object activeDevices
These are the amount of all active devices in the fritzbox

### Object html, json
These objects are tables (json and html) with the comming and going information of all family members in it.

### Object info
Here are informations listed about the last update and the connection status from the adapter.

### Object guest
Here are informations listed about the amount of active guests and table objects with the device information in it.

### Object blacklist
Here are informations listed about the amount of unknown devices and table objects with the unknown device information in it.

### Object member.present
Here you will find information about the presence of a member on the current day and how long the member has been the status true since the last change. 
 
### Object member.absent
Here you will find information about the absence of a member on the current day and how long the member has been the status false since the last change.

### Object member.comming, member.going
Here you will find information when the family member arrives or leaving home.

### Object member.history, member.historyHtml
Here you will find information about the history of the current day. 

## Changelog 

### 0.0.1
* (Achim Fürhoff) initial release
### 0.0.2
* (Achim Fürhoff) optimized features
### 0.0.3
* (Achim Fürhoff) guest feature added
### 0.0.4
* (Achim Fürhoff) calculation error resolved
### 0.0.5
* (Achim Fürhoff) configuration optimized
### 0.0.6
* (Achim Fürhoff) bug in json and html table resolved
### 0.0.7
* (Achim Fürhoff) Fix bug invalid date. Add debug information.
### 0.1.0
* (Achim Fürhoff) Influxdb added, debug information added
### 0.2.0
* (Achim Fürhoff) debug and error information optimized, crypto dependency removed, service check and blacklist added   
### 0.2.1
* (Achim Fürhoff) getGuests issue resolved, lastVal function and debug information optimized   
### 0.2.2
* (Achim Fürhoff) outdated packages updated, documentation changed, 
  history dependency removed, onstate/objectChange removed, scheduler library removed,
  two fixes from publish review
 
## License
MIT License

Copyright (c) 2019-2020 Achim Fürhoff <achim.fuerhoff@outlook.de>

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