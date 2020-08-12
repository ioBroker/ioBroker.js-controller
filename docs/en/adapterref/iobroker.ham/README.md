![Logo](admin/ham.png)
# ioBroker Homebridge accessories manager
![Number of Installations](http://iobroker.live/badges/ham-installed.svg) ![Number of Installations](http://iobroker.live/badges/ham-stable.svg) 
[![Greenkeeper badge](https://badges.greenkeeper.io/ioBroker/ioBroker.ham.svg)](https://greenkeeper.io/)

=================

Use Homebridge plugins in ioBroker or run a global installed Homebridge as ioBroker adapter.
All States from Homebridge will be available in ioBroker too and can also be controlled there.

## Description
This adapter provides two different modes:

### Default (Wrapper) Mode
In the default mode the adapter allows you to use homebridge Plugin Modules directly.
You can explore all available plugins at the NPM website by [searching for the keyword `homebridge-plugin`](https://www.npmjs.com/search?q=homebridge-plugin).

You simply add the list of modules to the Adapter configuration and provide the configuration
in the JSON-editor (see Plugin descriptions).
After this all Homebridge objects will be created in ioBroker too and all writable objects can
be changed too.

A link of successfully tried plugins with examples can be found here: https://forum.iobroker.net/viewtopic.php?f=20&t=15021

### Global-Homebridge-Mode
If you already use Homebridge (Apple OpenSource SmartHome) to control your devices
then you can use this existing Homebridge installation and start this Homebridge
installation as ioBroker process. In this case the Homebridge server is started by ioBroker.
Additionally all states from Homebridge are available as states in ioBroker and allows to
control from ioBroker.

For this to work you need to provide the location of the systems global node-modules folder. For this call **npm root -g**. Additionally you need to privide the path of the homebridge configuration directory (usually .homebridge in the users folder).

## Following adapters were tested in Default mode

* homebridge-chamberlain v1.0.1 - plugin for Chamberlain garage door openers with MyQ
* homebridge-doorbird v0.0.4 - Plugin for Doorbird
* homebridge-dyson-link v2.2.2 - Dyson Link devices
* homebridge-edomoticz v2.1.11 - A fully-fledged up-to-date Plugin for Domoticz
* homebridge-Fibaro-HC2 v2.1.5 - Fibaro HomeCenter integration
* homebridge-homee v0.2.4 - A fully-fledged up-to--date Plugin for Homee
* homebridge-ikea-tradfri-gateway v1.0.26 - Tradfri
* homebridge-noolite v0.0.29 - Noolite via USB MTRF-64 or МТRF-64 modules
* homebridge-platform-wemo v1.0.1 - Belkin WeMo Platform plugin
* homebridge-seasons v1.0.1  - A plugin to display the current season of the year.
* homebridge-vera v0.8.2 - VeraLink is an application for Z-Wave accessories from Vera (Node.js 8.11.3)


## TODO
* Tests
* More documentation?!

## Changelog

### 3.0.1 (2020-08-08)
* (Apollon77) set a very high limit (again) on allowed accessories and services because irrelevant 

### 3.0.0 (2020-08-04)
* (Apollon77) BREAKING: ONLY WORKS WITH HOMEBRIDGE 1.1.x+ AND Node JS >=10.17.0!! Make sure plugins support it AND homebridge is updated to 1.1.x when you use the Global Mode!

### 1.1.2 (2019-07-08)
* (Apollon77) Allow more then 149 accessories in wrapper mode

### 1.1.1 (2019-07-05)
* (Apollon77) Add option to update NPM modules in Admin. Reinstall will happen after saving settings
* (Apollon77) Enhance NPM installation handling
* (Apollon77) Allow to specify special version of homebridge NPM packages using name@version
* (Apollon77) Allow to specify homebridge command line options. They will be added to the command line arguments (Some plugins need that or special features are only available with it)
* (Apollon77) Add "Local" mode that installs an own homebridge and run it as bridge

### 1.0.1 (2019-01-16)
* (SchumyHao) Add Chinese support

### 1.0.0 (WIP)
* (Apollon77) add polling interval to global mode
* (Apollon77) add option to use insecure flag in wrapper mode

### 0.4.5 (2018.08.21)
* (Apollon77) issues fixed

### 0.4.4 (2018.08.07)
* (Apollon77) corrected automatic role determination and bugs fixed

### 0.4.2 (2018.06.25)
* (Apollon77) Fix for global mode

### 0.4.1 (2018.06.21)
* (Apollon77) option to poll values from the plugins added and other optimizations

### 0.3.1 (2018.06.20)
* (kirovilya) Fixed a bug in global mode that values were not reported back to iOS devices

### 0.3.0 (2018.06.20)
* (bluefox) Support of ham plugins was added

### 0.2.6 (2018.06.19)
* (Apollon77) Updates for Homebridge-Wrapper

### 0.2.5 (2018.06.18)
* (Apollon77) Catch all console logs from Homegridge and make available as debug log

### 0.2.4 (2018.06.18)
* (Apollon77) Updates for Homebridge-Wrapper

### 0.2.3 (2018.06.17)
* (Apollon77) Updates for Homebridge-Wrapper

### 0.2.2 (2018.06.17)
* (Bluefox) Fixes for JSON editor in Firefox and Chrome

### 0.2.0/0.2.1 (2018.06.17)
* (Apollon77) Public test version with both modes
* (Bluefox) Admin3

### 0.1.0 (2018.06.09)
* (Apollon77) Update for working mode 1

### 0.0.1 (2018.03.24)
* (kirovilya) initial commit

## License
The MIT License (MIT)

Copyright (c) 2018-2020 Apollon77 <ingo@fischer-ka.de>

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
