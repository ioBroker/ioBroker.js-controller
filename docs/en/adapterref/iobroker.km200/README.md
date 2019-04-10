# ioBroker.km200

## for Buderus KM50/KM100/KM200/KM300 & Junkers/Bosch MB LANi

![Logo](admin/km200.png)

[![NPM version](http://img.shields.io/npm/v/iobroker.km200.svg)](https://www.npmjs.com/package/iobroker.km200)
[![Downloads](https://img.shields.io/npm/dm/iobroker.km200.svg)](https://www.npmjs.com/package/iobroker.km200)
[![Number of Installations](http://iobroker.live/badges/km200-installed.svg)](http://iobroker.live/badges/km200-installed.svg)
[![Travis-CI](http://img.shields.io/travis/frankjoke/ioBroker.km200/master.svg)](https://travis-ci.org/frankjoke/ioBroker.km200)
[![NPM](https://nodei.co/npm/iobroker.km200.png?downloads=true)](https://nodei.co/npm/iobroker.km200/)

[German manual](README_DE.md)

The adapter supports the following heating system:
  
* Buderus with the [network adapters](https://www.buderus.de/de/produkte/catalogue/alle-produkte/7719_gateway-logamatic-web-km200-km100-km50) KM50, KM100, KM200 and KM300
* Junkers with the [network adapter](https://www.bosch-smarthome.com/de/mblani) MB LANi
* Bosch with the [Network Adapter](https://www.bosch-smarthome.com/en/mblani) MB LANi


The heating system can be controlled via the Buderus website ([https://www.buderus-connect.de]) or by the 'EasyControl' app from your mobile phone. App and Buderus website also works with Junkers and Bosch heatings systems.

This has now succeeded in both directions and the adapter is already fully usable.

For this it is necessary to first install the app on a mobile phone and set a private password.
The app asks for the device password and the login name off the device. 

The adapter still needs the IP (or the network name, for example 'BuderusKM200.fritz.box')
and the port address (Port 80 on the device, but if you changed it via a router ...).

If you add an '!' at the end of the address the adapter will work in debug mode and provide a lot of information!

Since the adapter must query the data from the system I have defined an update interval,
This is set to a minimum of 5 minutes since every update requires a separate query.

My system (2 heating circuits and a hot water circuit) provides more than 180 data points where I can not use most and some are double.

That's why I introduced a black / push list to hide or show certain data.
This list consists of strings similar to RegExp (which they are conbverted to by the adapter) and the services in the heater are then filtered with them afterwards.

The syntax is that `+` at the very beginning means that this field should not be skiupped, even if another rule would block it.
A `-` is like nothing and caiuses the mathced state to be blocked.
each match is separated by `,` and can include `/` or `^` for the beginning, `*`which match everything and `$` at the end to match the end.
The strings are case sensitive!!! If you like to know which states are found switch on debug mode and remove all blockings, then you will find all stated created and can block some unneeded date with block list.
Examples: With `+*temp*` you can fade in everything that contains 'temp' and with `_Hourly$` you can block everything which has '_Hourly' at the end, both combined will block all _Hourly at end which do not have temp in their name.

Mye list looks like `/gateway*, /recordings*,*SwitchPrograms*,/HeatSource*, *HolidayModes*` And hides about 90 of ~ 180 records my plant off.

There are two other schedules available now, the fast (for states polled faster than every 30 minutes) and slow for states which are polled on hours or multihours cycles.
This allows you to track some  information like temperatures in 1-5 minute cycles and other items in normal 20 minute cycles. The ones which usually do not change wven within an hour (like _Daily$ or _Monthly$ and severyl other general data) do not need to be read even every 30 minutes because they will not change.
THis strategy helps to get faster readings for important data and slower readings for not so important.

The data for recording is (small) history data within the heating system. There are 3 different available: _Hourly, _Daily and Monthly.
Hourly covers noprmally the last 48 hours. _Daily the last 2 month and Monthly not more than a year, all from current time of readout. Some data points do show less data points.
You have to understand that the adapter collects the data from 3 individual calls for each recorded datapoint!  

`switchPrograms` can be reat and written now as well, it's a JSON-String which reflects an Array of weekdays, Please don't change format, just the numbers when uploading. It seems the numbers are minutes can be set only to 15 minutes increments!

Since V 1.1.2 the brackets and commas can be omitted and the blocked / pushed values ​​can only be written with comma!

The system works with services that are structured like a directory tree and this is replicated in the adapter.

### Important if km200 is updated from version 1.1.*

If you have entered the 64-character access-key you don't need the password, but it should not be left blank, just write in anything!

## Important
* Adapter requires node >= v6.1.* 

## Todo

* Additional language support and text translation

## Changelog

### 2.0.3

* Adapter config update
* Blacklist is working now for any combination
* Added option not to delete unsused states

### 1.9.9

* Beta for v2.0.0
* Implemented recordings for hourly, daily and monthly data
* Changed readout for 'mins' units to enable these fields for read/write
* Implemented 2 additional time schedule where you can define fast cycle (1-30 minutes), normal with 30-60 minutes and slow with 1-24 hours. You define the lists whjich go to fast or slow in a similar way than the blocklist.
* Blocklist syntax changed sligly. `/` or `^` first is for from beginning, `*` can now be everywhere and `$` can be the end
* `switchPrograms` are supported now for read and write!  

### 1.2.4

* Beta for next version, recordings supported

### 1.2.3 
* Implemented a correction to show also switchPrograms

### 1.2.2
* Adapter works also only with accesskey iin old 64 digit hex format without private passwort.

### 1.2.1 
* Adapter supports now compact mopde
* Adapter uses other module and removes need for mcrypt which makes it working on all platforms
* Adapter can now have debug mode set via '!' at end of address
* Adapter needs node >=v6


### 1.2.0
* Integrating Schupu's changes and also make the adapter ready for compact mode
* Update of adapter should continue to work with old settings

### 1.1.7
* (Schmupu) Supports Admin3
* (Schmupu) Only device password and own password needed. You do not have to get the access code anymore.

### 1.1.6
Adapter communication and retries more often to catch more errors.
* Writes are also retried
Added blocklist text in config screen

### 1.1.2
* Adapter handles better communication and retries if he got an error.
* you can set debug-mode by adding 'debug!' in front of host.
* Host port is not required and can be added to hostname with: xxx at end.
* Simpler blocklist handling, which does not ask for device which services are blocked

### 0.4.3
* Renamed repository to ioBroker.km200

### 0.4.3
Cleaning of objects / states for current adapters instance which are not part of scanned services anymore.

### 0.4.2
* Some small bug fixes and added some debug logs. Removed so dependency of 'request' and 'async' modules.

### 0.4.1
  Have only 'request' and 'async' with --save now also registered in the package.json ... Remember: Nuícht --save forget :(!

### 0.4.0
  Strings with allowedValues ​​are now converted to ioBroker states in both directions (read & write)

### 0.3.0
  Setting variables with numbers or strings now works.
  Thus, e.g. Target temperatures are changed.
  TODO: Enums and set tables

### 0.2.0
  Adapter now works with blacklist and in read-only mode.
  TODO: Implement setting values ​​in the heating system
  TODO: Implement variables with ENUMS (value lists)

### 0.1.0
  First test

## License
The MIT License (MIT)

Copyright (c) 2016-2019 Frank Joke <frankjoke@hotmail.com>

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
