---
BADGE-Number of Installations: http://iobroker.live/badges/info-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.info.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.info.svg
BADGE-NPM: https://nodei.co/npm/iobroker.info.png?downloads=true
BADGE-Travis-CI: http://img.shields.io/travis/iobroker-community-adapters/ioBroker.info/master.svg
BADGE-Dependency Status: https://img.shields.io/david/iobroker-community-adapters/iobroker.info.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/iobroker-community-adapters/ioBroker.info/badge.svg
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.info/README.md
title: Admin
hash: NmaBkM4/dUBUPYVrrD0VE3t1AkbDP5bDMCmQstBFB6o=
---
# Admin
The Info Adapter was developed to provide various information about the system, about ioBroker and relevant topics to the user. The user should get an overview of all interesting and important data and the ioBroker team will be given the opportunity to contact the user even faster, if important information is available.

# Installation
In order to see the info window in the Tab tab, you must first check it as Visible in the Admin after installation. To do this, click on the left-hand triangle in the upper left corner of the Admin window and select "Info" in the menu.

# Configuration
* Do not show clock - To hide the clock on the top left.
* Show adapter requests - Displays the panel with adapter requests.
    * Adapter requests closed at startup - The panel with the adapter requests is closed when the Info window starts.
* View known errors - Displays the panel with known errors and requests for installed adapters.
    * Known errors at startup closed - The panel with the known errors is closed when starting the info window.

* Show News from iobroker.net - Displays the panel with the official ioBroker news.
* Show the latest forum entries - Displays the panel with the last forum entries.
* Feednami API Key - If you call ioBroker using a host name, such as iobroker: 8081 or something like that, you need to sign up for free at Feednami to get an appropriate API key. This is not necessary for access via an IP address.

* Show documentation - Displays the button for the documentation.
    * Select the required languages for the documentation - Selection of the languages to be included in the documentation.

* Search Github for Unknown Adapters (Experts) - Displays the panel searching for unapproved adapters in the github.
    * Sort Adapter by - Sorts the result of the search by name, creation date or last update.
    * reverse order - reverses the order of the results.
    * New adapters closed at startup - The panel with the unknown adapters is closed when starting the info window.

* Do not load current system data - The current system data is not loaded cyclically.
    * Load CPU data every x seconds - The CPU data is cyclically loaded every 2 to 10 seconds. 0 is off.
    * Load memory data every x seconds - The memory data are loaded cyclically every 2 to 10 seconds. 0 is off.
    * Load hard disk data every x seconds - The memory data are loaded cyclically every 2 to 10 seconds. 0 is off.

# Info Tab
## Clock
The clock has no special function and can be switched off at any time in the configuration. <img height="200" src="img/clock.png">

## Messages
<img height="200" src="img/messages.png">

### Messages (VIS widget)
## Documentation
<img height="200" src="img/documentation.png">

## Updates
<img height="200" src="img/updates.png">

## New adapters
<img height="200" src="img/new_adapters.png">

## System information
<img height="200" src="img/systeminfo.png">

### System information (detailed view)
## Adapter requests
<img height="200" src="img/adapter_requests.png">

## Problems and mistakes
<img height="200" src="img/issues_bugs.png">

## IoBroker adapter on Github
<img height="200" src="img/adapter_search.png">

## News
<img height="200" src="img/news.png">

## Forum
<img height="200" src="img/forum.png">

## Changelog

### 1.3.x (2019-04-01)
* (ldittmar) better system information

### 1.2.7 (2019-03-17)
* (ldittmar) little fixes
* (ldittmar) unknow adapters search new design
* (ldittmar) better design for PC monitor
* (ldittmar) unknow adapters show more informations
* (ldittmar) stable version

### 1.2.5 (2019-03-14)
* (ldittmar) show adapter requests
* (ldittmar) show bugs and issues
* (ldittmar) diyplay important links
* (ldittmar) show important popup news
* (ldittmar) vis widget for popup news

### 1.1.3 (2019-01-03)
* (ldittmar) compact mode compatibility added
* (ldittmar) add chinese support
* (ldittmar) add new forum support
* (ldittmar) add chinese forum support
* (ldittmar) move to iobroker-community-adapters

### 1.0.2 (2018-11-30)
* (ldittmar) fixed problems with Node version info in multihost system

### 1.0.1 (2018-11-27)
* (ldittmar) search for new adapters on Github
* (ldittmar) check for Node.js update
* (ldittmar) https problems with news and forum data solved
* (ldittmar) polish added as language

### 1.0.0 (2018-11-25)
* (ldittmar) full compatibility to Admin 3.x
* (ldittmar) clock can be disabled

### 0.1.0 (2018-01-02)
* (ldittmar) compatibility to Admin 3.x / beta release

### 0.0.6 (2017-12-11)
* (ldittmar) some fixes / install and update implemented

### 0.0.4 (2017-12-08)
* (ldittmar) some fixes and design correction
* (ldittmar) show informations about adapters (update/new)
* (ldittmar) show system informations

### 0.0.1 (2017-11-23)
* (ldittmar) initial commit

## License
The MIT License (MIT)

Copyright (c) 2017 - 2019 ldittmar <iobroker@lmdsoft.de>

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