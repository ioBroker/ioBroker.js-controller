![Logo](admin/iobroker-procon-ip.png)
# ioBroker.procon-ip

[![NPM version](http://img.shields.io/npm/v/iobroker.procon-ip.svg)](https://www.npmjs.com/package/iobroker.procon-ip)
[![Downloads](https://img.shields.io/npm/dm/iobroker.procon-ip.svg)](https://www.npmjs.com/package/iobroker.procon-ip)
[![Installations](http://iobroker.live/badges/procon-ip-installed.svg)](http://iobroker.live/badges/procon-ip-installed.svg)
[![Dependency Status](https://img.shields.io/david/ylabonte/iobroker.procon-ip.svg)](https://david-dm.org/ylabonte/iobroker.procon-ip)
[![Known Vulnerabilities](https://snyk.io/test/github/ylabonte/ioBroker.procon-ip/badge.svg)](https://snyk.io/test/github/ylabonte/ioBroker.procon-ip)
[![Travis-CI](http://img.shields.io/travis/ylabonte/ioBroker.procon-ip/master.svg)](https://travis-ci.org/ylabonte/ioBroker.procon-ip)

[![NPM](https://nodei.co/npm/iobroker.procon-ip.png?downloads=true)](https://nodei.co/npm/iobroker.procon-ip/)


## ProCon.IP pool control adapter for ioBroker
ioBroker adapter for basic support of the ProCon.IP swimming pool control
unit. It is intended for integration with your ioBroker home automation, eg.
to build logic that involves other devices or simply to be paired with your
favorit voice assistant(s):
* You can use the [_cloud_](https://github.com/ioBroker/ioBroker.cloud) or
  [_IoT_](https://github.com/ioBroker/ioBroker.iot) adapter for Alexa
  (and also Google Home, I think) and
* [_yahka_](https://github.com/jensweigele/ioBroker.yahka) as bridge to the
  Apple HomeKit to be reached by Siri or
* use the [_javascript_](https://github.com/ioBroker/ioBroker.javascript) to
  build your own custom logic.

See the [wiki](https://github.com/ylabonte/ioBroker.procon-ip/wiki) for more information.


### What is the ProCon.IP pool control?
![Picture from pooldigital.de](https://www.pooldigital.de/shop/media/image/66/47/a5/ProConIP1_720x600.png)

The ProCon.IP pool control is a low budget network attached control unit for
home swimming pools. With its software switched relays, it can control
multiple pumps (for the pool filter and different dosage aspects) either
simply planned per time schedule or depending on a reading/value from one of
its many input channels for measurements (eg. i/o flow sensors, Dallas 1-Wire
termometers, redox and pH electrodes). At least there is also the option to
switch these relays on demand, which makes them also applicable for switching
lights (or anything else you want) on/off.
Not all of its functionality is reachable via API. In fact there is one
documented API for reading (polling) values as CSV (`/GetState.csv`). In my
memories there was another one for switching the relays on/off and on with
timer. But I cannot find the second one anymore. So not even pretty, but
functional: The ProCon.IP has two native web interfaces, which can be
analyzed, to some kind of reverse engineer a given functionality (like
switching the relays).

For more information see the following link (sorry it's only in german;
haven't found an english documentation/information so far):
* [pooldigital.de webshop](https://www.pooldigital.de/shop/poolsteuerungen/procon.ip/35/procon.ip-webbasierte-poolsteuerung-/-dosieranlage)
* [pooldigital.de forum](http://forum.pooldigital.de/)

**Just to be clear: I have nothing to do with the development, sellings,
marketing or support of the pool control unit. I just developed a solution
to integrate such with ioBroker to make my parent's home a bit smarter.**


### Details on the adapter
The adapter uses the `/GetState.csv` API of the ProCon.IP to poll its values
and another - not documented - API, that operates with bitwise commands to
switch the relays. The second one is also used by the original web interfaces
of the ProCon.IP. So there might be future firmware upgrades, that brake
compatibilty with this adapter or at least it functionality of switching the
relays. 

#### Compatiblity
For now the adapter has been tested and developed in combination with the
ProCon.IP firmware **revision 1.7.0.c**.


## Roadmap

### 1.0.0
**Stable release:**  
This should become the release candidate for the official ioBroker adapter
repository. So as this is literally a milestone for this project, I have
created such for the relevant issues to keep track of the progress and make
this more transparent for you.

* Fix all open [milestone issues](https://github.com/ylabonte/ioBroker.procon-ip/milestone/1)
  regarding the ones resulted from the [adapter review](https://github.com/ioBroker/ioBroker.repositories/pull/756#issuecomment-646988248))
* ~~Add documentation (make the github wiki useful/helpful)~~
* ~~Show connection status including last refresh timestamp and sys info of
  the ProCon.IP in tab view (can be activated by activating the corresponding
  menu entry in the admin adapter)~~
* ~~Automated tests regarding the functionality of the adapter (eg. unit
  tests)~~

**What happened the points above which are now striked through?**  
Well, the documentation was already improved. Now it's up to you to extend the
wiki or request me using issues to extend the wiki or README.md regarding a
specific content.  
The tab view thing seems rather interesting to me. If you would appreciate
such a feature, just let me know...  
The absence of automated tests regarding the functionality of the controller
is quite unpleasant, but the focus is now clearly on becoming stable and
writing good and useful tests for all of the existing code will cost a lot
of time (in relation to the use regarding the complexity and target group of
this software project) and might end in further refactoring. So it will be
something for the future, but not anymore relevant for the 1.0.0 release.


## Development and participation
Feel free to contact me, if you wish to participate in development or
documentation of this adapter.

Useful links for the approach will be
* the [TypeScript adapter template](https://github.com/ioBroker/ioBroker.template/tree/master/TypeScript)
  I had started from and
* the [guide for adapter developers](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md).


## Changelog

### 0.4.1
Bugfix release:
* Fix write actions to the appropriate states of external relays  
  _This will add auto-recognition on whether the external relays are activated or not
  and therefore decide on how to handle write actions to the corresponding relay state._

### 0.4.0
Public release version:
* Add encryption for configuration settings stored in ioBroker's internal db
* Improve http request/connection error handling
* Reduce logging output
* Remove the unused admin tab

### 0.3.1
Functional and security update:
* Update dependencies including some reported as vulnerable
* Add connection status indication for iobroker's instance tab
* Add form validation for the configuration settings

### 0.2.0
Minor update:
* Update npm dependencies
* Group admin settings input fields in rows

### 0.1.1
Security update:
* Update vulnerable eslint-utils

### 0.1.0
Functional update and minor fixes:
* Fix object attributes regarding the cloud adapter
* Optimization for the cloud adapter
    * Pre-defined `smartName` attributes for active relays and temperature sensors
    * Recognize relays with 'light', 'licht' or 'leucht' in its name as `smartType` _LIGHT_ 

### 0.0.4
Security update:
* Update `lodash` (pinning version `4.17.14`)
* Update other indirect and direct dependencies

### 0.0.3
Bugfix release:
* Fix missing `value` states
* Reduce logging output

### 0.0.2
Bugfix release:
* Fix sys info state values

### 0.0.1
Initial release with following features:
* All information from `GetState.csv` as readonly states
* Writable states for all relays to toggle auto/manual
* Writable states for relays not configured for dosage control to toggle on/off


## License
MIT License

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

Copyright (c) 2020 Yannic Labonte <yannic.labonte@gmail.com>
