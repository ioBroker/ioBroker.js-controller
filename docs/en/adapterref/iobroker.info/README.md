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
hash: xQZlmob1ntYjDypLjfDHHF6VpmbxHwyIwAlH6qmampA=
---
# Admin
The Info Adapter was developed to provide various information about the system, about ioBroker and relevant topics to the user. The user should get an overview of all interesting and important data and the ioBroker team will be given the opportunity to contact the user even faster, if important information is available.

# Installation
<img height="80" align="left" src="img/install.png"> In order to see the info window in the Tab tab, you must first check it as Visible in the Admin after installation. To do this, click on the left-hand triangle in the upper left corner of the Admin window and select &quot;Info&quot; in the menu.

# Configuration
<p align="center"> <img height="300" align="right" src="img/config.png"> </p>

* **Do not show clock** - To hide the clock at the top left.
* **Show Adapter Requests** - Displays the adapter request panel.
  * **Adapter requests closed at startup** - The panel with adapter requests is closed when the Info window starts.
* **Display known errors** - Displays the panel with known errors and requests for installed adapters.
  * **Known errors at startup closed** - The panel with the known errors is closed at the start of the info window.

* **Show news from iobroker.net** - Displays the panel with the official ioBroker news.
* **Show the latest forum entries** - Displays the panel with recent forum entries.
* **Feednami API Key** - If you call ioBroker using a host name, such as: iobroker: 8081 or something like that, you need to sign up for free at Feednami to get an appropriate API key. This is not necessary for access via an IP address.

* **Display documentation** - Displays the button for the documentation.
  * **Select the required languages for the documentation** - Selection of the languages to be included in the documentation. (You may have to click on the name to the right to select what - default -> set language + english)

* **Search Github for Unknown Adapters (Experts)** - Shows the panel searching for unauthorized adapters in the github.
  * **Sort Adapters to** - Sorts the result of the search by name, creation date or last update.
  * **reverse order** - reverses the order of the results.
  * **New adapters closed at startup** - The panel with the unknown adapters is closed when starting the info window.

* **Do not load current system data** - The current system data is not loaded cyclically.
  * **Load CPU data every x seconds** - The CPU data are loaded cyclically every 1 to 10 seconds. (0 is off - default 3)
  * **Load memory data every x seconds** - The memory data are loaded cyclically every 1 to 10 seconds. (0 is off - default 3)
  * **Load hard disk data every x seconds** - The hard disk data is loaded cyclically every 1 to 10 seconds. (0 is off - default 8)
  * **Charge battery data every x seconds** - The battery data is loaded cyclically every 1 to 10 seconds. (0 is off - default 8)
  * **Load network data every x seconds** - The network data is loaded cyclically every 1 to 10 seconds. (0 is off - default 3)
  * **Loading process and user data every x seconds** - The process and user data are loaded cyclically every 1 to 10 seconds. (0 is off - default 8)

With Windows system, the cyclic loading of the system data should not happen too fast, because this causes a considerable load on the system. The default values have been selected to run without problems on most systems.

# Info Tab
Almost all blocks can be opened or closed by clicking on ![Open / unfold blocks](../../../de/adapterref/iobroker.info/img/expand.png).

## Clock
<img height="50" align="left" src="img/clock.png"> The clock has no special function (but I have made an effort) and can be turned off at any time in the configuration.

<br><br>

## Messages
<img height="200" align="left" src="img/messages.png"> In order to quickly send important messages concerning ioBroker to the user, the possibility was created to create messages. These messages appear ONLY if certain conditions apply. So no messages are displayed over an adapter if it is not installed. This ensures that ONLY the users are warned, who are also affected by the problem.

The messages can be closed with one click, in the upper right corner of ![Close the message](../../../de/adapterref/iobroker.info/img/close_message.png), but reappear as soon as the Info-Tab is reloaded as long as the problem persists.

### Messages (VIS widget)
<img height="100" align="left" src="img/vis.png"> For the messages a VIS widget was created, which also appears only if the messages concern the user. If there are no messages, nothing is displayed, so you do not need to extra space on the VIS surface for the messages, but just place it eg in the middle of the screen.

## Documentation
<img height="150" align="left" src="img/documentation.png"> We have put together a list of important links. You can find this as a drop-down list by clicking on the button at the top right &quot;Documentation&quot;. If the button is not visible, make sure that the corresponding item in the configuration is checked.

The individual links are stored in different categories: Community, Documentation, News, Blog, Video Playlist, Development and Others

For the correctness and completeness of external links no guarantee can be given. If links are missing or incorrect, please send us an e-mail.

## Updates
<img height="200" align="left" src="img/updates.png"> If new versions of an adapter are released and you also have it installed, it will appear in this list.

From here you can directly update with a click on ![Update Button](../../../de/adapterref/iobroker.info/img/update_button.png).
If you move your mouse over ![Changelog icon](../../../de/adapterref/iobroker.info/img/changelog.png), you will see the most important changes since your version.
By clicking on ![documentation](../../../de/adapterref/iobroker.info/img/readme.png), the complete description of the adapter is displayed.

<br>

## New adapters
<img height="200" align="right" src="img/new_adapters.png"> Here all new and officially released adapters of the last 60 days are displayed.

From here you can install the new adapter directly by clicking on ![Install button](../../../de/adapterref/iobroker.info/img/install_button.png).
By clicking on ![documentation](../../../de/adapterref/iobroker.info/img/readme.png), the complete description of the adapter is displayed.

<br>

## System information
<img height="200" align="left" src="img/systeminfo.png"> The system information of the ioBroker system is displayed here. In the case of multi-host systems, of course, the information of the other hosts is also displayed. These data come from the js controller.

The following information (per host) is provided as info:

- Operating system (linux, win32, darwin, android, aix, freebsd, openbsd or sunos)
- Architecture (poor, arm64, ia32, mips, mipsel, ppc, ppc64, s390, s90x, x32 and x64)
- CPUs (number of cores)
- Speed (processor speed)
- Model (processor model)
- RAM (approximate total memory)
- System operating time (how long has the system been running)
- Node.js (The Node.js version - if it's a newer one or your version is outdated, this information is also here)
- NPM (NPM version)
- Hard disk size (size of the hard disk where ioBroker is located)
- Hard disk free (how much space is still available)
- number of adapters (how many adapters have been released for ioBroker so far)
- Operating time (how long does the ioBroker run without a restart)
- Active instances (how many adapter instances are currently running on this host)
- host name (name of the host)

```
Sollten Informationen fehlen, dann sollte eine aktuelle Version des JS-Controllers installiert werden.
Das ist der Datenbestand des JS-Controllers v1.5.7.
```

By clicking on ![System info Detail view](../../../de/adapterref/iobroker.info/img/sysinfo_detail_button.png) detailed information about the main system is displayed.

### System information (detailed view)
Here a lot of information about the house system is displayed and stored as an object. These can then be used by you quite comfortably. Most of the data is only read and saved when the adapter is first charged, as these do not change so easily.

Some data is also updated cyclically. How often this happens can be set in the configuration.

Keep in mind that not all information is available in every operating system, which may result in some information not being displayed.

#### System
Here the hardware data is displayed - motherboard, bios, case etc ...

#### Software
Software includes data about the operating system, installed software, running processes and logged in users.

#### Central processor
Here you can find data all about the CPU like speed, load and temperature.

Problems with Windows: wmic is used to detect the temperature of a Windows system. In some cases, wmic needs to be run with administrator privileges. So, if you do not get any values, try running it again with the appropriate permissions. If you still do not get any values, your system may not support this feature.

Problems with Linux: In some cases you need to install the Linux sensor package to measure the temperature, e.g. on DEBIAN-based systems by running:

```
$ sudo apt-get install lm-sensors
```

#### Main memory
Here is all the main memory data like free memory or data to the RAM bar.

#### Hard disks
All data on hard drives, partitions, raids and ROMs.

Problems with Linux: To be able to use the S.M.A.R.T. To see Linux status, you need to install the smartmontools. On DEBIAN-based Linux distributions, you can install it by doing the following:

```
$ sudo apt-get install smartmontools
```

#### Graphic
Data about the controller or monitor is displayed here, if available / supported.

#### Network
All data about the network connections.

#### Battery
All data about the battery, if one exists.

Problems with Windows: wmic is used to detect the battery status of a Windows system. In some cases, wmic needs to be run with administrator privileges. So, if you do not get any values, try running it again with the appropriate permissions. If you still do not get any values, your system may not support this feature.

## Adapter requests
<img height="200" src="img/adapter_requests.png">

The "Adapter requests" panel can be hidden in the configuration or displayed in the closed state when loading.

## Problems and mistakes
<img height="200" src="img/issues_bugs.png">

The "Problems and errors" panel can be hidden in the configuration or displayed in the closed state when loading.

## IoBroker adapter on Github
<img height="200" src="img/adapter_search.png">

The "ioBroker adapter on Github" panel can be hidden in the configuration or displayed in the closed state when loading.

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