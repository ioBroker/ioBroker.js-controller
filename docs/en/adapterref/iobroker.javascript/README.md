---
BADGE-Number of Installations: http://iobroker.live/badges/javascript-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.javascript.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.javascript.svg
BADGE-Tests: https://travis-ci.org/ioBroker/ioBroker.javascript.svg?branch=master
BADGE-NPM: https://nodei.co/npm/iobroker.javascript.png?downloads=true
chapters: {"pages":{"de/adapterref/iobroker.javascript/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.javascript/README.md"},"de/adapterref/iobroker.javascript/blockly.md":{"title":{"de":"Inhalt"},"content":"de/adapterref/iobroker.javascript/blockly.md"}}}
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.javascript/README.md
title: no title
hash: 5W14HpUieIRGZnOboj1ymbUuSrVhwKc1726J97hsB8M=
---
The javascript adapter is used to comfortably create, edit and manage scripts.

## [](https://github.com/ioBroker/ioBroker/wiki/ioBroker-Adapter-javascript#konfiguration)Configuration
![Settings menu Javascript Adapter](../../../de/adapterref/iobroker.javascript/img/javascript_Einstellungen-Javascript.png) The actual configuration consists of entering additional npm modules (separated by commas) as well as the geo-coordinates to be used for various calculations. To obtain the coordinates, one can e.g. _google maps_ zoom in quite a bit and click on the desired location. The coordinates are then displayed. After saving, the adapter must still be activated via the red play button.

* * *

## Service
During installation, another tab _Scripte_ is shown in the _Admin_ interface. Here, a new folder is created by clicking on the (+) in the toolbar (red circle). A new script is created via the "blank sheet" icon to the left. A window opens and asks for the name and location in the folder structure.
![Javascript adapter](../../../de/adapterref/iobroker.javascript/img/javascript_Javascript-Adapter.png)

### Folder and File List
The folder structure can be created as you wish. The location does not affect the functionality of the script. There is a list view next to the tree structure. A search field makes it easier to retrieve scripts. For a script to run, it must be activated in the folder structure on the left by clicking on the red _Play_ button. To stop, press the green _Pause_ button. For each script, a new object is created. It has the script name with the addition `_enabled` and is located in the folder `javascript.Instanz.ScriptEnabled`. The object indicates with (`true/false`) whether the script is running. The state can also be set to turn the script on / off. Scripts stored in the _global_ folder are global scripts. These are copied internally before any other script, ie processed beforehand. Thus, global functions can be applied to multiple scripts. Variables in global scripts can be used in other scripts. But beware: every script has its own variable space. You can not use variables in global scripts to exchange values between scripts. For this purpose, objects (states) must be used.

### Editor
After creating, the editor for _Javascript_ opens on the right. Some example scripts can be found in [here](http://www.iobroker.net/docu/?page_id=2786&lang=de).

#### Surname
If you have previously given a name, this will be displayed here and can be changed.

#### Location
This dropdown displays all created folders. Currently they are sorted in the chronological order of their creation.

#### Engines type
Here you can choose to work with the _javascript_ or the _coffeescript_ engine.

#### Log
Bottom right is the log window for the output of all logs concerning the selected script. The logs are displayed after the script has been saved / restarted.

* * *

## Tips
### Backup
To restore scripts in case of doubt, backup via _Copy & Paste_ is recommended.

### Test instance
It has proven useful to test new scripts, create another javascript instance and start the script in this instance.
Behind the script name, the desired instance can be set by dropdown.
If there is a fatal error in the script, only this additional test instance terminates, not the productive instance.

![Select Instance Javascript Adapter](../../../de/adapterref/iobroker.javascript/img/screen.jpg)

## Changelog
### 4.1.12 (2019-03-07)
* (bluefox) Schedule was corrected

### 4.1.8 (2019-02-03)
* (jkuehner) Updated the blockly to the latest code
* (bleufox) scriptEnabled variables not only for experts
* (bleufox) fixed one error with "cannot extract blockly"
* (bluefox) GUI fixes
* (bluefox) show problem scripts as yellow pause icon

### 4.0.12 (2019-01-20)
* (Apollon77/AlCalzone) fixes unwanted changes in last version
* (SchumyHao) Add Chinese support

### 4.0.11 (2019-01-14)
* (bluefox) add set/getBinaryState

### 4.0.7 (2018-12-25) Breaking changes - no IE support anymore
* (bluefox) Material UI
* (AlCalzone) monaco javascript editor

### 3.7.0 (2018-05-05)
* (bluefox) Used VM2 as sandbox. The script errors will be caught.
* (bluefox) refactoring: split into many modules
* (AlCalzone) Change TypeScript version range to include TS 3.0+

### 3.6.5 (2019-02-13)
* (bluefox) Error with formatDate was fixed

### 3.6.4 (2018-02-05)
* (bluefox) Pattern error is fixed

### 3.6.3 (2018-01-31)
* (bluefox) Fixing the CSS for CRON dialog
* (bluefox) Fixing the reorder of scripts

### 3.6.1 (2018-01-23)
* (bluefox) Pattern error is fixed

### 3.6.0 (2017-12-28)
* (bluefox) more translations are added
* (bluefox) update blockly engine

### 3.5.1 (2017-11-14)
* (bluefox) fixed: sometimes MSG is not defined
* (AlCalzone) TypeScript support (preparations)
* (bluefox) add sendToHost call
* (bluefox) protect exec call
* (bluefox) add getStateDelayed function

### 3.4.4 (2017-09-12)
* (soef) typo error in line number correction fixed

### 3.4.1 (2017-08-12)
* (soef) patternMatching optimized

### 3.4.0 (2017-08-06)
* (bluefox) Support of new admin

### 3.3.12 (2017-07-24)
* (bluefox) file and line info added to log outputs

### 3.3.11 (2017-07-18)
* (bluefox) fix build CRON block

### 3.3.9 (2017-06-18)
* (bluefox) Add the toggle blockly block

### 3.3.8 (2017-05-22)
* (Apollon77/bluefox) Accept for subscribes arrays of IDs

### 3.3.6 (2017-05-17)
* (bluefox) add the genitive month for formatDate

### 3.3.4 (2017-04-01)
* (bluefox) Catch error by request if host unavailable
* (bluefox) add "request" to script namespace

### 3.3.3 (2017-03-27)
* (bluefox)Fix stopScript

### 3.3.2 (2017-03-18)
* (bluefox) Support of system coordinates

### 3.3.1 (2017-03-15)
 * (bluefox) fix error if no scripts exists

### 3.3.0 (2017-03-14)
* (bluefox) all callbacks in try/catch

### 3.2.8 (2017-03-08)
* (bluefox) Translations

### 3.2.7 (2017-03-03)
* (bluefox) allow creation of states for other javascript instances

### 3.2.6 (2017-02-14)
* (bluefox) Fix import of scripts
* (bluefox) Ask to save before start the script

### 3.2.5 (2017-01-23)
* (bluefox) Extend compareTime function with astro features

### 3.2.4 (2017-01-13)
* (bluefox) fix stopScript

### 3.2.3 (2017-01-05)
* (bluefox) Try to fix error with sayit

### 3.2.2 (2016-12-17)
* (bluefox) Allow with stopScript() to stop itself

### 3.2.1 (2016-11-24)
* (bluefox) Fix error with subscribe for only required states

### 3.2.0 (2016-11-14)
* (bluefox) Fix error with of blocks in adapters
* (bluefox) Support of subscribe for only required states
* (bluefox) add delFile
* (bluefox) fix error with names

### 3.1.0 (2016-10-12)
* (bluefox) Support of blocks in adapters
* (bluefox) Move sendTo blocks into adapters

### 3.0.10 (2016-09-30)
* (bluefox) New blocks: compare time, write state
* (bluefox) Documentation

### 3.0.9 (2016-09-20)
* (bluefox) Bugfixing of blockly

### 3.0.7 (2016-09-09)
* (bluefox) add ack for trigger in blockly
* (bluefox) add block to get info about trigger
* (bluefox) start description of blockly
* (bluefox) add runScript functions
* (bluefox) disable zoom on wheel in blockly
* (bluefox) fix block: time compare

### 3.0.6 (2016-09-07)
* (bluefox) add extendObject function
* (bluefox) add custom sendTo block
* (bluefox) add multiple trigger block

### 3.0.5 (2016-09-03)
* (bluefox) Fix sendTo blocks

### 3.0.4 (2016-09-01)
* (bluefox) Support of convert day of week into text in blockly

### 3.0.3 (2016-08-29)
* (bluefox) Fixed the convert date block

### 3.0.2 (2016-08-28)
* (bluefox) Change name of sandbox debug variable

### 3.0.1 (2016-08-27)
* (bluefox) Fix disabling of script

### 3.0.0 (2016-08-27)
* (bluefox) Beta Release with Blockly

## License

The MIT License (MIT)

Copyright (c) 2014-2019 bluefox <dogafox@gmail.com>,

Copyright (c) 2014      hobbyquaker