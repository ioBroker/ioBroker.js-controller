![Logo](admin/net-tools.png)
# Net Tools

![Number of Installations](http://iobroker.live/badges/net-tools-installed.svg) ![Number of Installations](http://iobroker.live/badges/net-tools-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.net-tools.svg)](https://www.npmjs.com/package/iobroker.net-tools)
[![Downloads](https://img.shields.io/npm/dm/iobroker.net-tools.svg)](https://www.npmjs.com/package/iobroker.net-tools)
[![Tests](https://travis-ci.org/jey-cee/ioBroker.net-tools.svg?branch=master)](https://travis-ci.org/ioBroker/ioBroker.net-tools)

[![NPM](https://nodei.co/npm/iobroker.net-tools.png?downloads=true)](https://nodei.co/npm/iobroker.net-tools/)





| [Sponsors](https://github.com/iobroker-community-adapters/ioBroker.net-tools/blob/master/SPONSORS.md) | |
|---|---|
| If you like my work, please feel free to provide a personal donation (this is an personal Donate link for Jey Cee, no relation to the ioBroker Project !)   |  Join the Discord server to discuss everything about net-tools integration!|
| [![Donate](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=95YZN2LR59Q64&source=url) | <a href="https://discord.gg/33w6jUh"><img src="https://discordapp.com/api/guilds/743167951875604501/widget.png?style=banner2"></a> | 




### Discover devices on the network

Set discover object to true to discover devices on your network, this process takes while. 
This feature is provided by discovery adapter, which means discovery will be installed if is not and it has to run.

Remark: This feature is limited to the subnet of the ioBroker host.

### Pings configured IP addresses

Pings specified IP addresses in defined interval and monitors the results. (alive, rps, time)

### Wake-on-LAN

Set the wol object to true and 3 WOL packages are sent, with a pasue of 750ms, to your device. 


### Port scan

Set scan to true, this will scan for all open ports in a range of 0-65535. This process takes a while. 
The result will be written to object ports.

---

## For Developers

#### Get mac for specific device

`sendToAsync('net-tools.X, 'getMac', 'IP ADDRESS')`

Remark: This feature is limited to the subnet of the ioBroker host.

#### Ping specific IP address

`sendToAsync('net-tools.X, 'ping', 'IP ADDRESS')`

#### Wake-on-LAN

`sendToAsync('net-tools.x', 'wake', 'MAC ADDRESS')`

---

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Changelog

### 0.1.4
* fixes for js-controller 3.3

### 0.1.3
* fixes for js-controller 3.3

### 0.1.2
* added device discovery to configuration page
* start discovery if it is not started and stop it afterwards


### 0.1.1 
* initial release


## License

The MIT License (MIT)

Copyright (c) 2020-2021, Jey Cee <jey-cee@live.com>

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
