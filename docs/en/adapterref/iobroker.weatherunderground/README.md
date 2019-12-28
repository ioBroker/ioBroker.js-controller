![Logo](admin/wu.png)
# ioBroker.weatherunderground

![Number of Installations](http://iobroker.live/badges/weatherunderground-installed.svg) ![Number of Installations](http://iobroker.live/badges/weatherunderground-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.weatherunderground.svg)](https://www.npmjs.com/package/iobroker.weatherunderground)
[![Downloads](https://img.shields.io/npm/dm/iobroker.weatherunderground.svg)](https://www.npmjs.com/package/iobroker.weatherunderground)

[![NPM](https://nodei.co/npm/iobroker.weatherunderground.png?downloads=true)](https://nodei.co/npm/iobroker.weatherunderground/)

ioBroker Adapter to load 24h weather forecast for your location from [Weather Underground](http://www.wunderground.com/).
The adapter loads all 15min (default) daily and hourly forecast data.

## Notes
You can use this adapter with providing an official "PWS owner" API-key or leave API key empty to use keys extracted out of the WU webpage.

## Icon Sets

There are some different Icon Sets available when using "Legacy API", see below. For the usabe with the new API the image names have changed (see https://docs.google.com/document/d/1dNCf6nF6cjm4oOxQxjtqNuAvG_iEe5f9MQH1xlCeV4s/edit) and are now number based ... they can be downloaded from e.g. https://drive.google.com/drive/folders/0B6fWQWXuE09OOWtBOXJNX190TDQ and could be used as custom set (see below). 

In Adapter settings change "Custom Icon-Base-URL" to one of the available Icon Set on Weatherunderground:
(source: https://www.wunderground.com/weather/api/d/docs?d=resources/icon-sets )

|    Icon Set   |     		URL	 	   |       Example	 	|
| ------------- | -------------------------------- | --------------------- 	|
|	1	|  https://icons.wxug.com/i/c/a/   |		![alt text](https://icons.wxug.com/i/c/a/partlycloudy.gif) 	|
|	2	|  https://icons.wxug.com/i/c/b/   |		![alt text](https://icons.wxug.com/i/c/b/partlycloudy.gif)	|
|	3	|  https://icons.wxug.com/i/c/c/   |		![alt text](https://icons.wxug.com/i/c/c/partlycloudy.gif)	|
|	4	|  https://icons.wxug.com/i/c/d/   |		![alt text](https://icons.wxug.com/i/c/d/partlycloudy.gif)	|
|	5	|  https://icons.wxug.com/i/c/e/   |		![alt text](https://icons.wxug.com/i/c/e/partlycloudy.gif)	|
|	6	|  https://icons.wxug.com/i/c/f/   |		![alt text](https://icons.wxug.com/i/c/f/partlycloudy.gif)	|
|	7	|  https://icons.wxug.com/i/c/g/   |		![alt text](https://icons.wxug.com/i/c/g/partlycloudy.gif)	|
|	8	|  https://icons.wxug.com/i/c/h/   |		![alt text](https://icons.wxug.com/i/c/h/partlycloudy.gif)	|
|	9	|  https://icons.wxug.com/i/c/i/   |		![alt text](https://icons.wxug.com/i/c/i/partlycloudy.gif)	|
|	10	|  https://icons.wxug.com/i/c/j/   |		![alt text](https://icons.wxug.com/i/c/j/partlycloudy.gif)	|
|	11	|  https://icons.wxug.com/i/c/k/   |		![alt text](https://icons.wxug.com/i/c/k/partlycloudy.gif)	|

Or you can aso use your own "custom" icons, for this purpose the following gif-files must be provided within an Base-URL directory  :

|	Icon for Day		|	Icon for night		|
| -----------------------------	| ----------------------------- |
|	chanceflurries.gif	|	nt_chanceflurries.gif	|
|	chancerain.gif		|	nt_chancerain.gif	|
|	chancesleet.gif		|	nt_chancesleet.gif	|
|	chancesleet.gif		|	nt_chancesleet.gif	|
|	chancesnow.gif		|	nt_chancesnow.gif	|
|	chancetstorms.gif	|	nt_chancetstorms.gif	|
|	chancetstorms.gif	|	nt_chancetstorms.gif	|
|	clear.gif		|	nt_clear.gif		|
|	cloudy.gif		|	nt_cloudy.gif		|
|	flurries.gif		|	nt_flurries.gif		|
|	fog.gif			|	nt_fog.gif		|
|	hazy.gif		|	nt_hazy.gif		|
|	mostlycloudy.gif	|	nt_mostlycloudy.gif	|
|	mostlysunny.gif		|	nt_mostlysunny.gif	|
|	partlycloudy.gif	|	nt_partlycloudy.gif	|
|	partlysunny.gif		|	nt_partlysunny.gif	|
|	sleet.gif		|	nt_sleet.gif		|
|	rain.gif		|	nt_rain.gif		|
|	sleet.gif		|	nt_sleet.gif		|
|	partlycloudy.gif	|	nt_partlycloudy.gif	|
|	sunny.gif		|	nt_sunny.gif		|
|	tstorms.gif		|	nt_tstorms.gif		|
|	cloudy.gif 		|	nt_cloudy.gif 		|

## in ioBroker Forum (German)
http://forum.iobroker.org/viewtopic.php?f=20&t=2042&sid=a863d19838bc49439759bef89fcad1c3

## ToDo
There is a still a problem with encoding. The addresses with "äüöß" will be shown wrong.

## Changelog

### 3.2.0 (2019-12-28)
* (StrathCole) fix forecast expiry time
* (StrathCole) add visibility index to objects on hourly forecast

### 3.1.6 (2019-10-16)
* (Bjoern3003) adjust to WU changes, now v3 API for hourly data
* (Apollon77) run once after installation/update
 
### 3.1.3
* (Apollon77) text correction
 
### 3.1.2 (2019-07-27)
* (Apollon77) use new parameters to get decimal precision values
 
### 3.1.1 (2019-07-14)
* (Apollon77) add windDirection as string calculated based on degrees
 
### 3.1.0 (2019-07-12)
* (Apollon77) remove option for legacy API because disabled by WU
 
### 3.0.14 (2019-07-11)
* (Apollon77) optimize checking of pws station id
 
### 3.0.13 (2019-07-10)
* (Apollon77) Fix error in image url handling
 
### 3.0.11/12 (2019-07-09)
* (Apollon77) Re-Fetch PWS station key on Error 401
 
### 3.0.10 (2019-05-27)
* (Apollon77) Adopt logic to WU changes
 
### 3.0.8 (2019-03-23)
* (Apollon77) Add additional guidance when location is not found by WU
 
### 3.0.7 (2019-03-22)
* (Apollon77) implement to extract used "legacy" API keys out of WU website to allow restore of functionality for now
* (Apollon77) Also extract API keys for newer API version from website to be usable together with real "PWS owner keys" in future
* (Apollon77) optionally get data using the New APIs (as well as the officially available PWS-Owner APIs as also additional ones to restore functionality)
* (Apollon77) Admin 2 support removed and adapted the Admin 3 texts as needed for now

### 2.0.4 (2018-08-19)
* (René) some typos
* (bluefox) Write only numbers and not strings

### 2.0.3 (2018-07-30)
* (bluefox) Warning! Breaking changes! States are renamed.
* (bluefox) Refactoring of states and roles

### 1.1.2 (2017-11-24)
* (Apollon77) Add option to specify image format for custom image urls

### 1.1.1 (2017-11-08)
* (Apollon77) Optimize API usage by getting all data with one call instead of two
* (Apollon77) Add support for multiple API-Keys

### 1.1.0 (2017-10-30)
* (Apollon77) Add option to overwrite Icon Base URL

### 1.0.8 (2017-07-12)
* (DeepCoreSystem) add 2 current observation values, fixes of some datapoint caps.

### 1.0.7 (2017-06-19)
* (Dutchman) add Dutch language suppport

### 1.0.6 (2017-05-16)
* (Rene) bug fixing
	+ all 4 sets are enabled as default
	+ change of checkbox enables saves button

### 1.0.5 (2017-05-14)
* (Rene) hourly forecast extend to 36h

### 1.0.4 (2017-04-09)
* (Rene) parse much more data
   + today's 24 h
   + next 4 days / nights as text
   + next 4 days
   + current values
   each can be enabled or disabled

### 1.0.3 (2016-11-01)
* (bluefox) Catch parse errors

### 1.0.2 (2016-10-29)
* (Apollon77) make sure precip values are always integers

### 1.0.1 (2016-07-21)
* (jens-maus) conversion from feet to meter for observation_location

### 1.0.0 (2016-07-12)
* (Apollon77) add daily rain level forecast

### 0.2.0 (2016-07-01)
* (Apollon77) Add Error handling and station-usage for forcasts

### 0.1.1 (2016-06-07)
* (ploebb) Fix forecast api URL

### 0.1.0 (2016-05-07)
* (bluefox) convert text to floats
* (bluefox) support languages

### 0.0.5
corrected humidity value within current weather info (slice + unit)

### 0.0.4
checking for spaces in location
added current conditions

### 0.0.3
bugfix in summed pop-value.

### 0.0.2
config dialog fixed

### 0.0.1
initial release with all basics to load WU-forecast data

## License

The MIT License (MIT)

Copyright (c) 2015-2019 dschaedl <daniel.schaedler@gmail.com>

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
