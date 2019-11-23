![Logo](admin/zoneminder.png)
# ioBroker.zoneminder
[![Number of Installations](http://iobroker.live/badges/zoneminder-installed.svg)](http://iobroker.live/badges/zoneminder-installed.svg)
[![Stable version](http://iobroker.live/badges/zoneminder-stable.svg)](http://iobroker.live/badges/zoneminder-stable.svg)

[![NPM version](http://img.shields.io/npm/v/iobroker.zoneminder.svg)](https://www.npmjs.com/package/iobroker.zoneminder)
[![Downloads](https://img.shields.io/npm/dm/iobroker.zoneminder.svg)](https://www.npmjs.com/package/iobroker.zoneminder)
[![Dependency Status](https://img.shields.io/david/iobroker-community-adapters/iobroker.zoneminder.svg)](https://david-dm.org/iobroker-community-adapters/iobroker.zoneminder)


[![NPM](https://nodei.co/npm/iobroker.zoneminder.png?downloads=true)](https://nodei.co/npm/iobroker.zoneminder/)

**Tests:**: [![Travis-CI](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.zoneminder/master.svg)](https://travis-ci.org/iobroker-community-adapters/ioBroker.zoneminder)

## zoneminder adapter for ioBroker

Connection to your Zoneminder.

## Getting started
Type in your host e.g. 'http://zoneminder/zm' unchanged user and password is 'admin' if you dont have any authentification do not change user or password.

The device intervall is for checking new cameras and some basic information. The value is in seconds.
The monitor intervall is for checking alerts it is also in seconds.

If you want to get alert informations please install zmEventNotification to your zoneminder and enable it in the iobroker settings.

### Zoneminder-Settings
To get camera-url link work with user and pw you have to deselect AUTH_HASH_IPS in Settings

![Logo](admin/auth_hash_ips.png)

## Changelog
### 0.3.3 (12.11.2019)
* (MeisterTR) error fixes, fix login error, fixes for latest
* (MeisterTR) add ZmEvents
* (MeisterTR) Select moniorfunction and disable/enable monitor
### 0.2.1
* (MeisterTR) add info states
* (MeisterTR) add camera-link with auth-key
* (MeisterTR) cange video link
### 0.1.0
* (MeisterTR) First running version
### 0.0.1
* (MeisterTR) initial release

## License
MIT License

Copyright (c) 2019 MeisterTR <meistertr.smarthome@gmail.com>

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
