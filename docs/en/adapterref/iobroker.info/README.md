---
BADGE-Number of Installations: http://iobroker.live/badges/info-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.info.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.info.svg
BADGE-NPM: https://nodei.co/npm/iobroker.info.png?downloads=true
BADGE-Travis-CI: http://img.shields.io/travis/iobroker-community-adapters/ioBroker.info/master.svg
BADGE-Greenkeeper badge: https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.info.svg
BADGE-Dependency Status: https://img.shields.io/david/iobroker-community-adapters/iobroker.info.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/iobroker-community-adapters/ioBroker.info/badge.svg
---
# Admin

The Info Adapter was developed to provide various information about the system, about ioBroker and relevant topics to the user. The user should get an overview of all interesting and important data and the ioBroker team will be given the opportunity to contact the user even faster, if important information is available.

# Installation

<img height="80" align="left" src="img/install.png">
In order to see the info window in the Tab tab, you must first check it as Visible in the Admin after installation. To do this, click on the left-hand triangle in the upper left corner of the Admin window and select "Info" in the menu.

# Configuration

<p align="center">
    <img height="300" align="right" src="img/config.png">
</p>

* **Do not show clock** - To hide the clock at the top left.
* **Show adapter requests** - Displays the panel with the adapter requests.
    * **Adapter requests closed at startup** - The panel with the adapter requests is closed when the Info window starts.
* **View known errors** - Displays the panel with known errors and requests for installed adapters.
    * **Known errors at startup closed** - The panel with the known errors is closed when starting the info window.

* **Show News from iobroker.net** - Displays the panel with the official ioBroker news.
* **Show the latest forum entries** - Displays the panel with the last forum entries.
* **Feednami API Key** - If you call ioBroker using a host name, such as iobroker: 8081 or something like that, you need to sign up for free at Feednami to get an appropriate API key. This is not necessary for access via an IP address.

* **Show documentation** - Displays the button for the documentation.
    * **Select the required languages ​​for the documentation** - Selection of the languages ​​to be included in the documentation. (You may have to click on the name to the right to select what - default -> set language + english)

* **Search Github for Unknown Adapters (Experts)** - Displays the panel searching for unapproved adapters in the github.
    * **Sort Adapter by** - Sorts the result of the search by name, creation date or last update.
    * **reverse order** - reverses the order of the results.
    * **New adapters closed at startup** - The panel with the unknown adapters is closed when starting the info window.

* **Do not load current system data** - The current system data is not loaded cyclically.
    * **Load CPU data every x seconds** - The CPU data is cyclically loaded every 1 to 10 seconds. (0 is off - default 3)
    * **Load memory data every x seconds** - The memory data are loaded cyclically every 1 to 10 seconds. (0 is off - default 3)
    * **Load disk data every x seconds** - The hard disk data are loaded cyclically every 1 to 10 seconds. (0 is off - default 8)
    * **Load battery data every x seconds** - Load the battery data cyclically every 1 to 10 seconds. (0 is off - default 8)
    * **Load network data every x seconds** - Load network data cyclically every 1 to 10 seconds. (0 is off - default 3)
    * **Load process and user data every x seconds** - Process and user data are loaded cyclically every 1 to 10 seconds. (0 is off - default 8)

With Windows system, the cyclic loading of the system data should not happen too fast, because this causes a considerable load on the system. The default values have been selected to run without problems on most systems.

# Info Tab

The Info tab contains various information about your system and the ioBroker. The tab is divided into different blocks that can be customized. Almost all blocks can be opened or opened with one click on ![Expand / Expand Blocks](img/expand.png).

## Clock

<img height="50" align="left" src="img/clock.png">
The clock has no special function (but I have made an effort) and can be turned off at any time in the configuration.

## Messages

<img height="200" align="left" src="img/messages.png">
In order to quickly send important messages concerning ioBroker to the user, the possibility was created to create messages. These messages appear ONLY if certain conditions apply. So no messages are displayed over an adapter if it is not installed. This ensures that ONLY the users are warned, who are also affected by the problem.

The messages can be closed with one click, in the top right corner of ![Close message](img/close_message.png), but they appear again as soon as the info-tab is reloaded, as long as the problem persists.

### Messages (VIS-Widget)

<img height="100" align="left" src="img/vis.png">
For the messages a VIS widget was created, which also appears only if the messages concern the user. If there are no messages, nothing is displayed, so you do not need to extra space on the VIS surface for the messages, but simply it. in the middle of the screen.

## Documentation

<img height="150" align="left" src="img/documentation.png">
We have put together a list of important links. You can find this as a drop-down list by clicking on the button at the top right "Documentation". If the button is not visible, make sure that the corresponding item in the configuration is checked.

The individual links are stored in different categories: Community, Documentation, News, Blog, Video Playlist, Development and Others

For the correctness and completeness of external links no guarantee can be given. If links are missing or incorrect, please send us an e-mail.

## Updates

<img height="200" align="left" src="img/updates.png">
If new versions of an adapter are released and you also have it installed, it will appear in this list.

From here you can directly update with a click on ![Update Button](img/update_button.png).
When you mouse over ![Changelog Icon] (img/changelog.png), you'll see the most important changes since your release.
Click on ![Documentation](img/readme.png) to display the complete description of the adapter.

If the host - ie JS-Controller - is outdated, then an extra box appears below "New adapters" with the message that you should update the host.

## New adapters

<img height="200" align="right" src="img/new_adapters.png">
Here all new and officially released adapters of the last 60 days are displayed.

From here you can directly install the new adapter by clicking on ![Install Button](img/install_button.png).
Click on ![Documentation](img/readme.png) to display the complete description of the adapter.

<br>

## System information

<img height="200" align="left" src="img/systeminfo.png">
The system information of the ioBroker system is displayed here. In the case of multi-host systems, of course, the information of the other hosts is also displayed. These data come from the JS-Controller.

The following information (per host) is provided as info:

- Operating system (linux, win32, darwin, android, aix, freebsd, openbsd or sunos)
- Architecture (arm, arm64, ia32, mips, mipsel, ppc, ppc64, s390, s90x, x32 and x64)
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
If any information is missing, then a recent version of the JS-Controller should be installed.
This is the dataset of the JS-Controller v1.5.7.
```

Clicking on ![System Details Detail View](img/sysinfo_detail_button.png) displays detailed information about the main system.

### System information (detailed view)

![System information](img/systeminfo_detail.png)

Here a lot of information about the house system is displayed and stored as an object. These can then be used by you quite comfortably. Most of the data is only read and saved when the adapter is first charged, as these do not change so easily.

Some data is also updated cyclically. How often this happens can be set in the configuration.

Keep in mind that not all information is available in every operating system, which may result in some information not being displayed.

#### System

Here the hardware data is displayed - motherboard, bios, case etc ...

#### Software

Software includes data about the operating system, installed software, running processes and logged in users.

#### Central processor

Here you can find data all about the CPU like speed, load and temperature.

**Problems with Windows:** wmic is used to detect the temperature of a Windows system. In some cases, wmic needs to be run with administrator privileges. So, if you do not get any values, try running it again with the appropriate permissions. If you still do not get any values, your system may not support this feature.

**Problems with Linux:** In some cases you need to install the Linux sensor package to measure the temperature, e.g. on DEBIAN-based systems by running:

```
$ sudo apt-get install lm-sensors
```

#### Main memory

Here is all the data to the main memory like free memory or data to the RAM bar.

#### Hard disks

All data on hard drives, partitions, raids and ROMs.

**Problems with Linux:** To be able to use the S.M.A.R.T. To see Linux status, you need to install the smartmontools. On DEBIAN-based Linux distributions, you can install it by doing the following:

```
$ sudo apt-get install smartmontools
```

#### Graphic

Data about the controller or monitor is displayed here, if available / supported.

#### Network

All data about the network connections.

#### Battery

All data about the battery, if one exists.

**Problems with Windows:** wmic is used to detect the battery status of a Windows system. In some cases, wmic needs to be run with administrator privileges. So, if you do not get any values, try running it again with the appropriate permissions. If you still do not get any values, your system may not support this feature.

## Adapter requests

<img height="200" align="left" src="img/adapter_requests.png">
All adapter requests were included in the github as an issue. Anyone who wishes for something, can enter his wish here and anyone can develop, can then pick an issue and develop an adapter from it.

In this listing a title will be displayed and by clicking on ![Expand / Expand Blocks](img/expand.png), more detailed information will be visible. Above links when the wish was created, right the current status and below a detailed description. If a developer has chosen the request, it will be listed here as "assined to".

By clicking on ![Link Button](img/link.png), you come directly to Github and can add your own wishes there.
If you click on the title of a wish, you land directly on the request of Github and may vote for it. Wishes with many votes are of course preferred.

The "Adapter requests" panel can be hidden in the configuration or displayed in the closed state when loading.

## Issues and bugs

<img height="200" align="left" src="img/issues_bugs.png">
Of course, no adapters are error-free and some users may also have expansion ideas. Everything that is known about the installed adapters is collected here. You can also use this list to find out if a bug you just found is also known to the developer, because only known bugs can be fixed.

Click on ![Expand / Expand Blocks](img/expand.png), to the right of the adapter name, will open the list of known problems / requests. These can also be opened, where you will then find a detailed description.

If you click on the name of the adapter, you can go directly to the Issues list on Github and can possibly enter a new error or wish to expand.
If you click on the title of an issue, you end up directly with the message on Github and can optionally provide the developer more information, leave as a comment.

The "Problems and errors" panel can be hidden in the configuration or displayed in the closed state when loading.

## ioBroker adapter on Github

<img height="200" align="left" src="img/adapter_search.png">
The number of official adapters for ioBroker is already considerable. Of course, there are many more adapters available on the net. These are searched and displayed here.

If you open the panel with a click on ![Expand / expand blocks](img/expand.png), the complete description of the adapter is displayed here.

The "ioBroker adapter on Github" panel can be hidden in the configuration or displayed in the closed state when loading. You can also adjust the order of sorting.

```
WATCH OUT!!! These adapters may be in a very early stage of development.
These should not be installed on a production system.
Each installation is at your own risk!
```

## News

<img height="200" align="left" src="img/news.png">
Every now and then, official news from the ioBroker team will be published. Here they will be displayed.

Click on ![Link](img/link.png) to get directly to the official ioBroker page.

The news is displayed without any problems when accessing ioBroker via IP or localhost:8081. But if you use a hostname like meinhaus.de:8081, you have to get a free API key at Feednami. To register, click [here](https://toolkit.sekando.com/docs/en/setup/hostnames) and follow the instructions.

## Forum

<img height="200" align="right" src="img/forum.png">
Here the latest entries of the forum are displayed in the selected language. If there is no forum in the language, then data will be displayed on the English forum.

Click on ![Link](img/link.png) to get directly to the forum.

Forum entries will be displayed without problems when accessing ioBroker via IP or localhost:8081. But if you use a hostname like meinhaus.de:8081, you have to get a free API key at Feednami. To register, click [here](https://toolkit.sekando.com/docs/en/setup/hostnames) and follow the instructions.

## Changelog

### 1.3.0 (2019-03-29)
* (ldittmar) better system information
* (ldittmar) documentation in all languages
* (ldittmar) some fixes

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