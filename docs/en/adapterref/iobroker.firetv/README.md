![Logo](admin/firetv.png)

### ioBroker.firetv 
![Number of Installations](http://iobroker.live/badges/firetv-community-installed.svg) ![Stable Version](http://iobroker.live/badges/firetv-community-stable.svg) 
[![NPM version](https://img.shields.io/npm/v/iobroker.firetv.svg)](https://www.npmjs.com/package/iobroker.firetv)
[![Tests](https://img.shields.io/travis/soef/iobroker.firetv/master.svg)](https://travis-ci.org/soef/iobroker.firetv)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/soef/iobroker.firetv/blob/master/LICENSE)

<!--
[![NPM version](https://badge.fury.io/js/iobroker.firetv.svg)](https://www.npmjs.com/package/iobroker.firetv)
[![Build Status](https://secure.travis-ci.org/soef/iobroker.firetv.svg?branch=master)](https://travis-ci.org/soef/iobroker.firetv)
-->

With this adapter you can control some funtions of your Fire TV or Fire TV Stick.
E.g.: 
- On /Off
- Send key events
- Send text strings to input fields
- Start / Stop apps
- reboot
- excute shell commands

#### Some Infos
This adapter uses functions of the "Android Debug Bridge", known as "adb". Adb is part of the Android Developer SDK. Because Fire TV has an Android operating system, it can be controlled by adb.

#### Requirements

To use this adapter you have to install at least the adb packet of the Anroid SDK. In order not to install the complete Android SDK, you should install the 
- *Minimal ADB and Fastboot*

Search on google (Minimal ADB and Fastboot) for the latest download link.

Alternatively, you can use *adbLink* 

## Changelog
### 1.0.0 (2020-04-09)
* (foxriver76) compatibility for js-c 3

## License
The MIT License (MIT)

Copyright (c) 2016-2020 soef <soef@gmx.net>

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


