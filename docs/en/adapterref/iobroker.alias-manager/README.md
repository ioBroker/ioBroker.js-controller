![Logo](admin/alias-manager.png)
# ioBroker.alias-manager

[![NPM version](http://img.shields.io/npm/v/iobroker.alias-manager.svg)](https://www.npmjs.com/package/iobroker.alias-manager)
[![Downloads](https://img.shields.io/npm/dm/iobroker.alias-manager.svg)](https://www.npmjs.com/package/iobroker.alias-manager)
![Number of Installations (latest)](http://iobroker.live/badges/alias-manager-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/alias-manager-stable.svg)
[![Dependency Status](https://img.shields.io/david/sbormann/iobroker.alias-manager.svg)](https://david-dm.org/sbormann/iobroker.alias-manager)
[![Known Vulnerabilities](https://snyk.io/test/github/sbormann/ioBroker.alias-manager/badge.svg)](https://snyk.io/test/github/sbormann/ioBroker.alias-manager)

[![NPM](https://nodei.co/npm/iobroker.alias-manager.png?downloads=true)](https://nodei.co/npm/iobroker.alias-manager/)

**Tests:**: [![Travis-CI](http://img.shields.io/travis/sbormann/ioBroker.alias-manager/master.svg)](https://travis-ci.org/sbormann/ioBroker.alias-manager)

## alias-manager adapter for ioBroker

Manages and creates aliases.

## Quick Intro

### Manage aliases

![Screenshot](img/manual_screenshot_1.png)

* (1) Klick on 'MANAGE ALIASES'
* (2) To create a new alias, klick on 'NEW ALIAS' or
* (3) Select an existing alias to edit

![Screenshot](img/manual_screenshot_2b.png)
* (1) You will then find an area with general settings of this alias, like the name or the common role
* (2) Below you will find a list with all the datapoints of the alias
* (3) You can add alias-datapoints to this list either by adding an empty one or by selecting an existing iobroker-datapoint and copy its settings to a new alias-datapoint
* (4) You can delete datapoints by clicking on the garbage-icon
* Every datapoint has several fields to configure it:
    * In the grey area you may set the name or delete the datapoint
    * In the blue area you can configure the role, the type and - optional - the unit
	* In the green area you can set optional min and max, and determine if the datapoint should be readonly (common.write is off) and if its value can be accessed (common.read is on - which will be the right setting for most cases)
	* In the red area you can: 
	    * (5) Configure the original ioBroker-datapoint, this alias-datapoint is linked to. Both (the original datapoint and the alias-datapoint) well be kept in sync.
		* (6) Furthermore you can configure conversion-functions for read and write. 
		    * Example: If you set ``val / 10`` as "Read-Function", the value of the aias-datapoint will always be 10 percent of the original datapoint. 
			* In most cases you would then like to configure ``val * 10`` as "Write-Function", to also keep this ratio, when writing to the alias-datapoint.
		* Please read more about that in the ioBroker-documenation about aliases under https://www.iobroker.net/#en/documentation/dev/aliases.md

![Screenshot](img/manual_screenshot_3.png)
* (1) When clicking on 'COPY ALIAS' to copy or
* (2) on 'RENAME ALIAS' to rename the alias, the following dialog field will open:

![Screenshot](img/manual_screenshot_4.png)
\
Here you can:
* (1) Set a new id and
* (2) Set a new common name for the alias
* (3) By clicking on 'ADD REPLACEMENT' you can add lines to the following list, where you can:
    * (4) Enter a string, that will be searched for, and replaced by (5) this string
	* With this funcion, you can quickly change the original ioBroker-datapoints, your alias-datapoints are linked to
	* Example: 
	    * You have a fan with several datapoints like ``SET``, ``ERROR`` and ``UNREACH``
		* These alias-datapoints are linked to original datapoints like ``hm-rpc.0.JEQ0698034.1.STATE``, ``hm-rpc.0.JEQ0698034.0.ERROR`` and ``hm-rpc.0.JEQ0698034.0.UNREACH``
		* Now, if your device is broken and has to be replaced by a new one, its serial number will change, lets say, for example to ASDF1234
		* To update all the links in all you alias-datapoints in one go you can search for ``hm-rpc.0.JEQ0698034`` and replace it by ``hm-rpc.0.ASDF1234``
		* This is also useful, when creating new aliases, that are similar to an old one. Just copy the alias, set a new id and name and use the replacement-function, to adjust the linked datapoints

![Screenshot](img/manual_screenshot_5.png)
* After changing settings, you can:
* (1) Save all changed alias-datapoints in one go by clicking on 'SAVE ALL CHANGES' or
* (2) Save only one datapoint by clicking on 'SAVE CHANGES'
* (3) Finally you can delete the entire Alias by clicking on 'DELETE ALIAS'

### Autocreate Alias

![Screenshot](img/manual_screenshot_6b.png)

* (1) Klick on 'AUTOCREATE ALIASE'

![Screenshot](img/manual_screenshot_7b.png)
* (1) First select an ID of a device from the ioBroker object tree
* (2) Then click on 'TRY TO CREATE ALIAS FROM THIS DEVICE'
* (3) Afterwards you will find the determined settings for the Alias and
* (4) A list of all datapoints of the selected device
    * All automatically recognized datapoints will be checked (only checked lines will be saved)
	* If automatically recognized, the datapoint will have an 'Destination ID' set. This will be the corresponding datapoint of the alias (the original datapoint will be linked to this new alias-datapoint). The autocreate-function tries to match to stanardized datapoint-ids, depending on the type of device that was recognized. However, you can change the settings as you like, but every 'Destination ID' has to be unique.
	* And finally you can enter a name for the destination alias-datapoint
	* All NOT automatically recognized datapoints appear in the list unchecked. You can manually adjust the settings and activate the checkbox.
	* (5) You can also manually add other datapoints to this list or clear the complete list
* (6) You can then save the new alias with all the checked(!) datapoints (unchecked datapoints will be discarded)
* Afterwards you will be automatically transfered to the 'MANAGE ALIASES' tab and the new alias will be opend, to adjust its settings as needed


## Changelog

### 0.1.4 (2021-03-30)
* (sbormann) Updated dependencies.
* (sbormann) Removed bottom-border if used as tab.

### 0.1.3 (2021-03-29)
* (sbormann) Changed admin tab to singleton mode.

### 0.1.2 (2021-03-29)
* (sbormann) Fixed link to admin tab.
* (sbormann) Added translations.

### 0.1.1 (2021-03-28)
* (sbormann) Added alias-manager as tab to the ioBroker side menu.
* (sbormann) Added list of aliases to main tab.
* (sbormann) Enhanced open all / close all function for collapsibles.
* (sbormann) Added translations.

### 0.1.0 (2021-03-27)
* (sbormann) Alias-ID can now be an object with seperate datapoints for read and write.
* (sbormann) Alias-Datapoints can now be collapsed.
* (sbormann) Added Autocreate Alias function.

### 0.0.8 (2021-03-22)
* (sbormann) Added ability to create alias-datapoint from existing datapoint.

### 0.0.7 (2021-03-21)
* (sbormann) Fixed typos.
* (sbormann) Changed the way ioBroker-Objects are fetched (much faster).
* (sbormann) Added copy-button to datapoints.
* (sbormann) Empty fields are now removed (before they were set to null).
* (sbormann) Changed mode to onlyWWW.

### 0.0.6 (2021-01-18)
* (sbormann) Added delete datapoint.
* (sbormann) Some fixes .

### 0.0.1
* (sbormann) Initial release.

## License
MIT License

Copyright (c) 2021 Sebastian Bormann <sebastian@bormann.net>

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