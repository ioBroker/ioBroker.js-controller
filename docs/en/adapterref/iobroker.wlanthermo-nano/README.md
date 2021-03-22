![Logo](admin/wlanthermo-nano.png)
# ioBroker.wlanthermo-nano

[![NPM version](http://img.shields.io/npm/v/iobroker.wlanthermo-nano.svg)](https://www.npmjs.com/package/iobroker.wlanthermo-nano)
[![Downloads](https://img.shields.io/npm/dm/iobroker.wlanthermo-nano.svg)](https://www.npmjs.com/package/iobroker.wlanthermo-nano)
[![Dependency Status](https://img.shields.io/david/DrozmotiX/iobroker.wlanthermo-nano.svg)](https://david-dm.org/DrozmotiX/iobroker.wlanthermo-nano)
![Number of Installations](http://iobroker.live/badges/wlanthermo-nano-installed.svg) ![Number of Installations](http://iobroker.live/badges/wlanthermo-nano-stable.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/DrozmotiX/ioBroker.wlanthermo-nano/badge.svg)](https://snyk.io/test/github/DrozmotiX/ioBroker.wlanthermo-nano)

[![NPM](https://nodei.co/npm/iobroker.wlanthermo-nano.png?downloads=true)](https://nodei.co/npm/iobroker.wlanthermo-nano/)

**Tests:**: [![Travis-CI](http://img.shields.io/travis/DrozmotiX/ioBroker.wlanthermo-nano/master.svg)](https://travis-ci.org/DrozmotiX/ioBroker.wlanthermo-nano)

## wlanthermo-nano adapter for ioBroker

[WLANThermo Nano](https://github.com/WLANThermo-nano/WLANThermo_nano_Software/wiki "WLANThermo Nano"), the digital advantage for your barbecue sport

## Configuration

The adapter can be installed and configured within the admin interface.
Please enter IP-adress, username and password in the instance configuration.

## To-Do

* [ ] Optimize pitmaster settings, make states only writable in related modus otherwise read only
* [ ] Implement auto device detect
* [ ] Implement device online state
* [x] allow multiple devices
* [ ] code cleanup

## Join the Discord server to discuss everything about ioBroker-WlanThermo integration!

<a href="https://discord.gg/cNAeGjJ"><img src="https://discordapp.com/api/guilds/743167951875604501/widget.png?style=banner2" width="25%"></a>

## Support me
If you like my work, please feel free to provide a personal donation  
(this is an personal Donate link for DutchmanNL, no relation to the ioBroker Project !)  
[![Donate](https://raw.githubusercontent.com/DrozmotiX/ioBroker.wled/master/admin/button.png)](http://paypal.me/DutchmanNL)


## Changelog

### 0.1.2
* (DutchmanNL) Support multiple devices

### 0.1.1
* (DutchmanNL) Code optimalisation
* (DutchmanNL) Implement state_attr.js to handle state options outside of source code
* (DutchmanNL) Optimised state creation in 1 function
* (DutchmanNL) Small cleanups

### 0.1.0
* (DutchmanNL) remove color settngs from pitmaster

### 0.0.9
* (DutchmanNL) optimize pid profile setting

### 0.0.8
* (DutchmanNL) fix post command for pitmaster

### 0.0.7
* (DutchmanNL) State unit fixes
* (DutchmanNL) start integration of pidmaster
* (DutchmanNL) rename  type  to modus for pitmaster

### 0.0.6
* (DutchmanNL) make type and alarm selectable with dropdown

### 0.0.5
* (DutchmanNL) add  capability to change sensors

### 0.0.4
* (DutchmanNL) Fix issue with password set
* (DutchmanNL) Implemented new states for config (reboot/update/checkupdate)
* (DutchmanNL) Change  configuration (way of ip-adress, also dyndns now supported)

### 0.0.3
* (DutchmanNL) implement secure storage of login credentials (required to enable setting changes later)

### 0.0.2
* (DutchmanNL) initial release

## License
MIT License

Copyright (c) 2019 DutchmanNL <rdrozda86@gmail.com>

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
