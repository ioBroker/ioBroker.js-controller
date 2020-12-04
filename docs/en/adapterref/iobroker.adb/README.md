![Logo](admin/adb.png)
# ioBroker.adb

[![NPM version](http://img.shields.io/npm/v/iobroker.adb.svg)](https://www.npmjs.com/package/iobroker.adb)
[![Downloads](https://img.shields.io/npm/dm/iobroker.adb.svg)](https://www.npmjs.com/package/iobroker.adb)
[![Dependency Status](https://img.shields.io/david/om2804/iobroker.adb.svg)](https://david-dm.org/om2804/iobroker.adb)
[![Known Vulnerabilities](https://snyk.io/test/github/om2804/ioBroker.adb/badge.svg)](https://snyk.io/test/github/om2804/ioBroker.adb)

[![NPM](https://nodei.co/npm/iobroker.adb.png?downloads=true)](https://nodei.co/npm/iobroker.adb/)

**Tests:**: [![Travis-CI](http://img.shields.io/travis/om2804/ioBroker.adb/master.svg)](https://travis-ci.org/om2804/ioBroker.adb)

## adb adapter for ioBroker

With this adapter you can control some functions of your android devices through Android Debug Bridge:
- custom shell command
- start/stop an application
- reboot
- take screenshot

### Custom shell command

To execute shell command, write command to state **shell**. You will always get the answer in state **result**.

Example:
Press POWER key **input keyevent POWER** or **shell input keyevent POWER**

### Start/Stop an application

Start an application. Specify the component name with package name prefix to create an explicit intent.
To start an application, write intent (*com.example.app/.ExampleActivity*.) to state **startApp**. 

Example:  For KODI starting write **org.xbmc.kodi/.Splash**

Stop an application. Force stop everything associated with package (the app's package name).
To stop an application, write package name to state **stopApp**. 

Example: For KODI stopping write **org.xbmc.kodi**

### Reboot device

Reboots the device. Write any value to state **reboot**.

### Take screenshot

Take screenshot and save to folder of adapter. Write any value to state **screencap**.
  
## Info

Android Debug Bridge (adb) is a versatile command-line tool that lets you communicate with a device. The adb command facilitates a variety of device actions, such as installing and debugging apps, and it provides access to a Unix shell that you can use to run a variety of commands on a device.

adb is included in the Android SDK Platform-Tools package. You can download this package with the SDK Manager, which installs it at android_sdk/platform-tools/. In order not to install the complete Android SDK, you can install the  Minimal ADB and Fastboot or use adbLink

For use adapter need start adb server.
**adb start-server**

### More info

[Android Debug Bridge Docs](https://developer.android.com/studio/command-line/adb?hl=ru)

## Changelog

### 0.0.5
* (om2804) js-controller dependency upgraded to > 2.0.0

### 0.0.3
* (om2804) fixes ater review

### 0.0.2
* (om2804) start/stop application
* (om2804) reboot device
* (om2804) take screenshot

### 0.0.1
* (om2804) initial release

## License
MIT License

Copyright (c) 2020 om2804 <om2804@mail.ru>

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
