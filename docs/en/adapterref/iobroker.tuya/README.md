![Logo](admin/tuya.png)
# ioBroker.tuya

[![Greenkeeper badge](https://badges.greenkeeper.io/Apollon77/ioBroker.tuya.svg)](https://greenkeeper.io/)

![Number of Installations](http://iobroker.live/badges/tuya-installed.svg) ![Number of Installations](http://iobroker.live/badges/tuya-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.tuya.svg)](https://www.npmjs.com/package/iobroker.tuya)
[![Downloads](https://img.shields.io/npm/dm/iobroker.tuya.svg)](https://www.npmjs.com/package/iobroker.tuya)

**Tests:** Linux/Mac/Windows: [![Travis-CI](http://img.shields.io/travis/Apollon77/ioBroker.tuya/master.svg)](https://travis-ci.org/Apollon77/ioBroker.tuya)
Windows: [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Apollon77/ioBroker.tuya?branch=master&svg=true)](https://ci.appveyor.com/project/Apollon77/ioBroker-daikin/)

[![NPM](https://nodei.co/npm/iobroker.tuya.png?downloads=true)](https://nodei.co/npm/iobroker.tuya/)

**This adapter uses the service [Sentry.io](https://sentry.io) to automatically report exceptions and code errors and new device schemas to me as the developer.**

ioBroker adapter to connect to several small and cheap Wifi devices that care connected to the Tuya Cloud and mostly use the Smartlife App/Alexa-Skill. The adapter supports reading real time status updates and controlling of those devices once synced with the respective mobile phone app.

Tuya devices are ESP8266MOD WiFi smart devices from Shenzhen Xenon.

Beside devices usable with the Smart Live App the use of the Jinvoo Smart App, Xenon Smart app, eFamilyCloud, io.e (Luminea or such) app should also be possible. Please report back if successfull.

The adapter is proofed to work very well with all devices that are "always in wifi". Devices that only come online when there is an event, send their data and go offline again are not supported.

One adapter instance can handle all devices in one network that routes UDP packages.

## How the adapter works

### Basic functionality

The adapter monitors the local network for UDP packets of Tuya (old firmware, so unencrypted only) devices. It is needed that the ioBroker host where the adapter runs on is placed in the same network segment as the devices and UDP multicasting needs to be supported by the router!

All detected devices are added to the adapter and as basis functionality the adapter requests data in the defined polling interval. Without a sync with the respective mobile app (see below) NO further functionality like real time updates or controlling is possible.

Newer encrypted devices will NOT show up before you do a device sync (see next ...)

### Advanced functionality after device sync

To get the full functionality of the adapter and also support devices with the new encrypted Firmware an encryption key needs to be known by the adapter.

The easiest way to receive this encryption key is to get them from the used mobile app. To do this the adapter provides a proxy to catch the communication of the app with the tuya servers and grab the needed information.

**Important Note for iOS Users:** The Proxy approach described here is not working anymore. As soon as you have Smart Life App version 3.10 or higher the communication from App is no longer visible to the proxy. But it still works with all Android App versions, so the best approach is an Androis Emulator as roughly described at https://forum.iobroker.net/topic/23431/aufruf-tuya-adapter-tests-verschl%C3%BCsselte-ger%C3%A4te/19

To do this first of all you need to add a custom Root-Certificate on your mobile device.
When you click "Start Proxy" in the adapter instance configuration the certificate is created for your system and shows a QR-Code to the download location. Ideally scan the QR Code with your mobile device and follow the process to add and trust this Root-Certificate.
If the QR code location is not reachable (may happen when use Docker or such) then open the "Proxy Web Info Port" in your browser and click on "Root-CA" in the navigation and you can download the CA File too.

Now make sure to close/kill the respective Tuya smart app.
After that add the Proxy-Port and the ioBroker host as "Manual" Proxy for your WLAN connection on your mobile phone.

Now open the respective Tuya Smart App and/or reload.

The Admin configuration will show a success message if the relevant data packet was received and will then turn the proxy off 10 seconds later. You can now remove the proxy from your phone and also untrust the certificate.

Directly after this the objects should be updated with more meaningful names and receive live updates from then on automatically and should be able to communicate.

The sync is only needed initially or after you added new devices to your App.

Some images for some mobile OS can be found at the [Proxy-Page](PROXY.md).

## Not for Battery powered devices
Battery powered devices are normally NOT supported by this adapter! The reason is that they are not online all the time to save power. Whenever they get a signal, thay go online, send the update to the the Tuya cloud servers and go offline again. They do not emit any UDP packages or are online long enough so that the adapter could connect to them. 
A soon as someone finds a way to directly fetch data from the Tuya cloud this may change.


## Credits
The work of the adapter would not had been possible without the great work of @codetheweb, @kueblc and @NorthernMan54 (https://github.com/codetheweb/tuyapi) and https://github.com/clach04/python-tuya and many more.

## Todo
* enhance testing: state checks and setState's
* enhance documentation

## Changelog

### 3.1.4 (2019-11-24)
* (Apollon77) New schemas added

### 3.1.3 (2019-11-24)
* (Apollon77) try to get rid of SSL errors with new proxies
* (Apollon77) Many new schemas added
* (Apollon77) Sentry added for error/exception/schema reporting
* (Apollon77) Compact Mode added

### 3.0.0 (2019-09-03)
* (Apollon77) Switch from AnyProxy to mitm ... hopefully get SSL-Proxy working again. Important: The Proxy is called "NodeMITMProxyCA"!

### 2.0.4 (2019-08-01)
* (Apollon77) New schemas added
* (Apollon77) removed a check so that also devices that use other message formats can be read

### 2.0.3 (2019-07-11)
* (Apollon77) New schemas added
* (Apollon77) removed a check so that also devices that use other message formats can be read

### 2.0.2 (2019-06-27)
* (Apollon77) New schemas added
* (Apollon77) Update all Dependencies
* (Apollon77) Nodejs 6.x no longer supported!
* (Apollon77) Support encrypted devices

### 1.0.8 (2019-03-08) [Unreleased]
* (Apollon77) New schemas added

### 1.0.7 (2018-11-23)
* (Apollon77) New schemas added, fixed one error

### 1.0.5 (2018-11-18)
* (Apollon77) preserve device name too, New schemas

### 1.0.4 (2018-11-16)
* (Apollon77) New schemas added

### 1.0.3
* (Apollon77) New schemas added

### 1.0.2
* (Apollon77) New schemas added
* (Apollon77) Data are requested from the device after controlling because sometimes not all data seems to be updated automatically

### 1.0.1
* (Apollon77) Automatically convert some value types like booleans better

### 1.0.0
* (Apollon77) Add several new schema definitions
* (Apollon77) Optimizations and bug fixes

### 0.1.3
* (Apollon77) Add several new schema definitions
* (Apollon77) Try to preserve names of objects. Sync with App via proxy will overwrite in any case!
* (Apollon77) Optimizations and bug fixes

### 0.1.2
* (BuZZy1337) Optimized Admin, thank you very much!

### 0.1.0/1
* (Apollon77) development and first tests

## License

The MIT License (MIT)

Copyright (c) 2018-2019 Apollon77 <iobroker@fischer-ka.de>

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
