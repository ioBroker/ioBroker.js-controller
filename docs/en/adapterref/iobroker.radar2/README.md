# radar2 network and bloutooth availability

![Logo](admin/radar2.png)

[![NPM version](http://img.shields.io/npm/v/iobroker.radar2.svg)](https://www.npmjs.com/package/iobroker.radar2)
[![Downloads](https://img.shields.io/npm/dm/iobroker.radar2.svg)](https://www.npmjs.com/package/iobroker.radar2)
**Tests:** Linux/Mac/Windows: [![Travis-CI](http://img.shields.io/travis/frankjoke/ioBroker.radar2/master.svg)](https://travis-ci.org/frankjoke/ioBroker.radar2)

[![NPM](https://nodei.co/npm/iobroker.radar2.png?downloads=true)](https://nodei.co/npm/iobroker.radar2/)


[German manual - Deutsche Anleitung](README_DE.md)

## ioBroker radar2 visibility testing for network and bluetooth devices, HP printers, UWZ-warnungs and ECB-currencies

This adapter tries to find the devices specified on the network or with bluetooth. It also shows the current external IP of the network, can read ink status of HP printers and also Weather warnings from UWZ for several european countries. It also can read daily currency exchange rates from ECB.

It works by:
* Using arp-scan and ping to lookup devices on the network with IPv4 und IPv6!
* Listening to dhcp messages which announces new devices coming to the network.
* It works on multiple interfaces which mean iof your system has Wlan and lan on different networks it can see both lans.
* Normal Bluetooth and Bluetooth LE is supported
* HP-printer ink-status
* European central bank currency exchange for Euero
* UWZ Weather warnings for the area where ioBroker is set to
* Uses arp-scan and ping on network as only expernal programs, everything else is internal to nodejs.
* The adapter works also without root rights but some configuration actions are required before installation

If you put a `-` at the end of a name the device will not be counted in the _notHere or _isHere.

If IP-address starts with 'http' radar2 will interpret it as an URL/web address and tries to read a page from the server, this can be used to test availability of web servers (like for example http://iobroker.net). In case of https it can happen that the server is not accessible if he does not have updated security keys!

To use UWZ you need to have your location configured in ioBroker.Admin!
If the value of max messages is >0 the each warning will be written in a separate state, otherwisde they will be combined.
You can also set if you want to use long warning text but all info is available in short one as well.

European Central Bank currencies can be seen here: `https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml` 

## Differences to radar-Adapter

Radar2 sets devices which are seen immediately when they become visible, for new ip's even before the scan starts again.
Radar2 uses nodejs-libraries to find bluetooth devices but it can run now also in user space from iobroker and does not need to get root access (see below installation requirements).
You can configure more than one IP (now IPv4 AND IPv6) address or host address (not URL's) in same line which allows you to ping on multiple ways to devices.
`arp-scan` is used to look for mac adresses, it will run (if not specified differently in it's command line) on all network interfaces which has external IPv4, so it will not detect devices based on mac addresses on IPv6, but it will now detect devices on wireless and fixed networks at the same time!

Availability of devices is handled differently. Each device will get a `_lasthere` state updated with current date & time whenever it is seen. At the end of each scan the adapter check all lasthere entries if they are older than the current time - the configured minutes of absence. Devecies which never have been here will also not have a `_lasthere` state! 

Web URL's can better manage now https servers.
The mac address vendor resolution is now done internally and not via the web. Only on adapter start file lib/vendor.json is loaded, if this file gets older than 31 days then a new version is downloaded from web - ONLY at adapter start!

The bluetooth part have been updated in a way that you can define the bluetooth device to be used (0,1, ... default: -1=first). In this way you can use multiple BT sticks to run multiple adapters like BLE and radar2 on the same device (bluetooth LE drivers for one device cannot be accessed by multiple programs at the same time).

If ip addresses or bluetooth devices  are found which you did not specify in your device list they will be shown in unknown IP and BT lists and a state will be generated for each of them. In this way you can identify people loggingh into your network or ned devices which can be integrated.
If you do not want to get them listed as unknown put them into the respective known IP/BT lists in adapter config.

Also new is that intervals for HP-Printer, ECB-, UWZ- and normal scans can be defined separately.

## Installation

Before installing the adapter into ioBroker you need to install on linux `arp-scan` and `libcap2-bin` and some drivers which you can do by running below commands.
On Debian (Raspi-Stretch, Ubuntu, ...) it looks like:
```
sudo apt-get install libcap2-bin arp-scan bluetooth bluez libbluetooth-dev libudev-dev net-tools
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which arp-scan`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which node`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which arp`)
```

On Windows (and maybe osx) there is no arp-scan which means that only ping will be used but no IP-mac addresses can be scanned!

On Osx also bluetooth may not work at all!

After installation setup adapter config, you can remove the demo line items.

### Special information for arp-scan:
There is a standard command line `-lgq --retry=5 --timeout=400` defined which would scan on all IPv4 interfaces all 254 addresses if it won't answer within 400ms it would retry 5 times!
If you need to scan s specific interface only you can add for example ` --interface=br0` but normally bridge interfaces are used now rightfully, but still in docker environments iot might be necessary.The repeat=5 can be changed to 6 or 7 for better detection, above 7 I did not find improvement! The same is with the timeout, above 500 I could not find any improvement. 

### Tip for those moving from radar to radar2-adapter or from machine one to another machine

* If you move radar adapters you can easily copy whole device list or settings by
* - Go in admin to objects and enable expert mode
* - Look for an object tree which is called `system.adapter.radar.0` (where `0` is the instance, if you had multiple instgances select the right one)
* - On the very right of this line is a buttom with a pencil, click on it
* - On the window you get select NATIVE
* - you should see then the config fields, select the content of the 'devices' field and copy it to the clipboard
* - do the same on destination machine selecting `system.adapter.radar2.0` in Admin/objects and go here also to NATIVE.
* - Delete the text in the 'devices' field and past in the old ones from clipboard
* - save the changes

This methodology of moving settings is working also between systems but may not work if other adapter has different structure. The device list is the same for radar and radar2, the only difference is that in radar2 you can have multiple ip addresses/entry separated by ','.

## Important/Wichtig
* Adapter needs node >= v6.*!
* Adapter may not be available to use bluetooth and arp-scan on osx, only ping ror ip which cannot detect IP mac adresses!
* Adapter may have problems with bluetooth on windows as well, also arp-scan is not available on windows, will use only ping then which cannot detect IP mac adresses!.

## Changelog

### 1.0.3

* Added possibility to add more than one BT mac address for a device

### 1.0.2

* Corrected version which works with _lastHere and all new devices

### 1.0.0

* First public realease

## License

The MIT License (MIT)

Copyright (c) 2018-2019, frankjoke <frankjoke@hotmail.com>

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
