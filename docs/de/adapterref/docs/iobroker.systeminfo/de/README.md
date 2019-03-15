![Logo](./admin/systeminfo.png) Reads (and writes) informationen from System(s)
---
[![NPM version](http://img.shields.io/npm/v/iobroker.systeminfo.svg)](https://www.npmjs.com/package/iobroker.systeminfo)
[![Downloads](https://img.shields.io/npm/dm/iobroker.systeminfo.svg)](https://www.npmjs.com/package/iobroker.systeminfo)
**Tests:** Linux/Mac: [![Travis-CI Build Status](https://travis-ci.org/frankjoke/ioBroker.systeminfo.svg?branch=master)](https://travis-ci.org/frankjoke/ioBroker.systeminfo)
Windows: [![AppVeyor Build status](https://ci.appveyor.com/api/projects/status/pil6266rrtw6l5c0?svg=true)](https://ci.appveyor.com/project/frankjoke/iobroker-systeminfo)
[![NPM](https://nodei.co/npm/iobroker.systeminfo.png?downloads=true)](https://nodei.co/npm/iobroker.systeminfo/)

## Adapter handles (system) information from own or other systems and web sources

It generates states from the information it finds via different methods
* Commands executed in operating system
* Files to be read on local or connected systems
* Results from web pages or API's 
* Nodejs tools commands

* Commands and files work also in both directions whichj means that you can also write information to the system.
* This allows for accessing and writing the GPIO pins on Raspi or OrangePi or also to control the gren or red leds on Raspi/Opi
* It alos allows to get/set some system information accessed via /sys in Lunux
* There is a 'systeminformation' part used which works on Windows & Linux for 

It handles text, HTML, json and XML data types wizh special query mechanisms.

### Note
* I wanted to express my thank you to some modules on the web which I used or implemented with my own code. The Adapter uses some external modules like [cheerio](https://github.com/cheeriojs/cheerio), [systeminformation](https://github.com/sebhildebrandt/systeminformation) and [node-schedule](https://github.com/node-schedule/node-schedule) as they are. It was also inspired by  code from [JSONPath](http://goessner.net/articles/JsonPath/index.html#e2) and [scrape-it](https://github.com/IonicaBizau/scrape-it) but their code was not used directly but reimplemented for the different need. 

## Configuration
* Configure in adapter config (enlarge the page)
* I stored a picture of an example config [here](./admin/Systeminfo.Config.jpg)
    * The first item is a command list which will be executed (line by line) on startup of adapter. It can be used to setup GPIO ports used.
    * Lines starting with  '`#`' are not executed
    * If the first text is '`debug!`' it sets the adapter to debug-mode which displays a lot more information what he tries to pull and receives.
* After the startup confirguration comes the configuration list for each data source consisting of
    * Name field which can include also 
        * If a name starts with '`-`' the line will be ignored (switched off), the same like if there is no schedule
        * `[*]`, `[name, ...]`, `[name/(value)]` syntax
        * without any of the above the name is used to create a state as it is.
        * If `[]` is used somewhere names are inserted here with different methods
            * `[*]` if multiple elements are returned they are inserted as numbers. Example: `Meldung[]` would generate `Meldung0`-`Meldung(n)` if (n) elements are returned
            * `[name1,name2, ...]`creates exactly these names (example `System.Memory_[used, free, available]` would create three states named `System.Memory_used, System.Memory_free, System.Memory_available`)
            * `[name/value]` takes the name from the object property `name`  (could be  different) and the value from the property `value`. Any property or value name can be used.
            * `[name/]` without a value would take the name from `name` and create sub-states for all other properties found in this object (example `System.Network.[iface/]`)

    * The `type` and `source` of the information source which can be
        * `file`: The `source` field describes a filename which is read
        * `exec`: The `source` field describes a single line command which is executed
        * `info`: The `source` field describes a single line `systeminfo` command function
        * `web`: The `source` field describes a web URL which is read (or object describing the access, this will need to be documented later!). 
        * The requests are cached if at the same time multiple entries with the same type/source content are requested! This mean if you schedule every minute to execue a command and take two different data items out of the same command it is run only once and only the data filter are applied multiple times.
        * This helps not to download multiple times the same page if you want to retreive more items.

    * The `regexp/filter``is used to describe how to filter the received text either with
        * `Regexp`  statement where the indovidual items need to be sorrounded with `()`. 
        Example: `/lic\s+(\d+)K\s+(\d+)K\s+(\d+)/m` would look for the text `lic` followed by spaces and then numbers ending with `K` in all lines, it would return the 3 numbers. THis is used in the `df -BK` command of Linux to show me the size of a mounted NFS share ending with 'lic' in the name.
        * `JsonPath` statement. I created a special version of JsonPath to select data out of Json or any javascript objects.
            * It's syntax consist of a row of selectors which can be
            * `name` an property name
            * `*` any item in this object, this can be all properties or if the object is an array it is all array items
            * `[(...)]` evaluate `...` to get the property name which will be selected. `@` will be used as placeholder for the current object and can be used in the eval statement.
            * `[?(...)]` Filter the elements of this item by ..., 
            Example: `list[?(@.user == 'pi')]` would first select the property `list` (which is an array) and fileter then the list by selecting only these list items what have `.user`set to `pi`. 
            * `[!(...)]` Returns the evaluated value as new item. In this way you can calculate your own data out of the objects found.
            * `[name1,name2,name3]` would select only those property names
            * `[0]` would select only select the 'first' (or n'th) element or property
            * `[start:end:step]` would take the elements startiing from `start` and `<end` using `step`. All need to be numbers, or left empty. `start` and `end` can be negative which would mean they cound from end. Example: `[1:-1:2]` would take every second element from the second one until but not including the last one. The last one would be `[-1::]`, the first 3 would be `[:3:]` and the last 3 would be `[-3::]`
            * `..` is a recurseive descent selector which means that `..name` would select the property name in 'any dept' of the object!  
        * `html WebObject query` In case html is parsed I created a special query tool to select items from web paqges similar to jQuery. This tool creates an object which is the finally parsed with `JsonPath`. **Documentaion to follow**
         
    * The `convert` entry either can be
        * `json` for json data to be parsed, on Web entries this means that the received text will be handled as json directly and the regexp/filter will be a `JsonParse` statement/filter.
        * `xml` for XML-data, this means that the received data will be converted from XML to json and handled as above
        * `html` Would generate a `cheerio` object which is then searched with the special WebObject query
        * `number` or `boolean`  would try to convert the value to numbers or booleans wheras on booleans numbers>0 are true, but also strings like **on** or **ein** and **true** evaluate to true.
        *  `...` anything else like `!parseInt(@)` would be evaluated and in this case return **true** if the value is `0` or **false** if the value is a bigger integer.

    *  `role/type` field describes the ioBroker field ty and can name olso a unit. The normal field type is text or the value seen in convert. 
        *  `json` means that the field property is taken from the obnject
        *  `number|MB` would define a number field with unit MB (Megabytes) 

    *  `Write Command` fiel describes statements or evals which will be used to write back to the item. It works at the moment only for '`exec`' or '`file`' types. 
        *  For `exec` it is an command line which can include `@(...)` statements which would be evaluated. Example: `gpio write 1 @(@ ?  '0' : '1')` would translate to `gpio write 1 0` if the state is true and to `gpio write 1 1` if it is false. THis controls my IR led's which light up if the GPIO pin is 'low' (0).
        *  For `file` it is a simple eval expression which is executed and written to the file. Example: `@ ? '1' : '0' ` would write '1' if value is true and '0' if it is false.

    *  The last is the `schedule`. If it is empty the ite is not executed at all! All schedules which share the exact same value will be executed together with the same cache.
        *  `cron-syntax` you can use the same 'cron'-syntax like oBroker is using inJavascript schedules which is described in [node-schedule](https://github.com/node-schedule/node-schedule)
        * `time-syntax` I created a special time syntax `?:?(:?)` which makes it easier
            * `*:16` would request this data on minute 15 of every hour
            * `*/2:1:1` would request every second hour on 1st minute and 1 second.
            * `?s`, `?m`, `?h ` with ? being digits >0 would run the request every ?seconds, monites or hours, you cannot specify multiple items at once!
        * Schedules are grouped to the same time, if you omit the seconds like in the first example above it will be assigned to some number trying to avoid same second for all items. This is done not to run too many commands at the same time.

## Known-Issues
* Beta test, no writes to web pages implemented 

## Important/Wichtig
* Requires node >=v4.5

## Changelog
### 0.3.0
* Added save and load config in admin screen

### 0.2.2
* First public beta includes jsonParse and WebQuery parse, jsonParse syntax mistake corrected for selectors
* New icon to separate it from info-Adapter

### 0.2.0
* First public beta includes jsonParse and WebQuery parse

### Todo for later revisions
* Allow import/export of configs to easily add new functions
* Allow access of web pages with authentication and also writing/postng web content

## Installation

Mit ioBroker admin, npm install iobroker.systeminfo oder von <https://github.com/frankjoke/ioBroker.systeminfo> 

## License

The MIT License (MIT)

Copyright (c) 2017, frankjoke <frankjoke@hotmail.com>

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
