<p align="center">
  <img src="admin/sureflap.png" />
</p>

# ioBroker.sureflap

[![NPM version](http://img.shields.io/npm/v/iobroker.sureflap.svg)](https://www.npmjs.com/package/iobroker.sureflap)
[![Downloads](https://img.shields.io/npm/dm/iobroker.sureflap.svg)](https://www.npmjs.com/package/iobroker.sureflap)
![Number of Installations (latest)](http://iobroker.live/badges/sureflap-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/sureflap-stable.svg)
[![Dependency Status](https://img.shields.io/david/Sickboy78/iobroker.sureflap.svg)](https://david-dm.org/Sickboy78/iobroker.sureflap)
[![Known Vulnerabilities](https://snyk.io/test/github/Sickboy78/ioBroker.sureflap/badge.svg)](https://snyk.io/test/github/Sickboy78/ioBroker.sureflap)

![Test and Release](https://github.com/Sickboy78/ioBroker.sureflap/workflows/Test%20and%20Release/badge.svg) Linux/Mac/Windows: [![Travis-CI](http://img.shields.io/travis/Sickboy78/ioBroker.sureflap/master.svg)](https://travis-ci.com/Sickboy78/ioBroker.sureflap) Windows: [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Sickboy78/ioBroker.sureflap?branch=master&svg=true)](https://ci.appveyor.com/project/Sickboy78/ioBroker.sureflap/)

[![NPM](https://nodei.co/npm/iobroker.sureflap.png?downloads=true)](https://nodei.co/npm/iobroker.sureflap/)

## Adpater for SureFlap® cat and pet flaps from Sure Petcare®
<p align="center">
  <img src="/admin/SureFlap_Pet_Door_Connect_Hub_Phone.png" />
</p>

## Configuration

Add username and password from your Sure Petcare® account on the adapter configuration page.

## Description

The adapter provides information about the settings and status of your cat flap.

It also shows the location of your pets.

### Changeable Values

The following states can be changed and will take effect on your device respectively will be reflected in your Sure Petcare® app.

| state | description | allowed values |
|-------|-------------|----------------|
| household_name.hub_name.flap_name.control.curfew | enables or disables the configured curfew<br>(curfew must be configured via app) | **true** or **false** |
| household_name.hub_name.flap_name.control.lockmode | sets the lockmode | **0** - open<br>**1** - lock in<br>**2** - lock out<br>**3** - closed (lock in and out) |
| household_name.pets.pet_name.inside | sets whether your pet is inside | **true** or **false** |

### Structure

The adapter creates the following hierarchical structure:

adapter<br>
├ household_name<br>
│ ├ hub_name<br>
│ │ ├ led_mode<br>
│ │ ├ online<br>
│ │ └ flap_name<br>
│ │ &nbsp;&nbsp;&nbsp; ├ battery<br>
│ │ &nbsp;&nbsp;&nbsp; ├ battery_percentage<br>
│ │ &nbsp;&nbsp;&nbsp; ├ curfew_active<br>
│ │ &nbsp;&nbsp;&nbsp; ├ online<br>
│ │ &nbsp;&nbsp;&nbsp; ├ control<br>
│ │ &nbsp;&nbsp;&nbsp; │ ├ curfew<br>
│ │ &nbsp;&nbsp;&nbsp; │ └ lockmode<br>
│ │ &nbsp;&nbsp;&nbsp; ├ curfew<br>
│ │ &nbsp;&nbsp;&nbsp; │ └ 0..i<br>
│ │ &nbsp;&nbsp;&nbsp; │ &nbsp;&nbsp;&nbsp; ├ enabled<br>
│ │ &nbsp;&nbsp;&nbsp; │ &nbsp;&nbsp;&nbsp; ├ lock_time<br>
│ │ &nbsp;&nbsp;&nbsp; │ &nbsp;&nbsp;&nbsp; └unlock_time<br>
│ │ &nbsp;&nbsp;&nbsp; └ last_curfew<br>
│ │ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; └ 0..i<br>
│ │ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ├ enabled<br>
│ │ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ├ lock_time<br>
│ │ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; └ unlock_time<br>
│ └ pets<br>
│ &nbsp;&nbsp;&nbsp; └ pet_name<br>
│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ├ name<br>
│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ├ inside<br>
│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; └ since<br>
└ info<br>
&nbsp;&nbsp;&nbsp; ├ all_devices_online<br>
&nbsp;&nbsp;&nbsp; └ connection<br>

## Notes

SureFlap® and Sure Petcare® are registered trademarks of [SureFlap Ltd.](https://www.surepetcare.com/)

The picture of the cat flap, hub and smartphone app is provided free to use from [Sure Petcare®](https://www.surepetcare.com/en-us/press).

## Changelog

### 1.0.4 (2021-03-07)
* (Sickboy78) added state curfew_active for pet flap devices
* (Sickboy78) fixed normalization of device names
* (Sickboy78) fixed changeable values not resetting when change fails

### 1.0.3 (2021-02-28)
* (Sickboy78) code improvements from review
* (Sickboy78) fixed timezone bug

### 1.0.2 (2021-02-25)
* (Sickboy78) fixed bug setting lockmode and inside values

### 1.0.1 (2021-02-19)
* (Sickboy78) initial release

## License

MIT License

Copyright (c) 2021 Sickboy78 <asmoday_666@gmx.de>

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
