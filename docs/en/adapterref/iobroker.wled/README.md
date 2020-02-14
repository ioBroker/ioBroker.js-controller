![Logo](admin/wled_large.png)
# ioBroker.wled

[![NPM version](http://img.shields.io/npm/v/iobroker.wled.svg)](https://www.npmjs.com/package/iobroker.wled)
[![Downloads](https://img.shields.io/npm/dm/iobroker.wled.svg)](https://www.npmjs.com/package/iobroker.wled)
![Number of Installations (latest)](http://iobroker.live/badges/wled-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/wled-stable.svg)
[![Dependency Status](https://img.shields.io/david/iobroker-community-adapters/iobroker.wled.svg)](https://david-dm.org/iobroker-community-adapters/iobroker.wled)
[![Known Vulnerabilities](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.wled/badge.svg)](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.wled)

[![NPM](https://nodei.co/npm/iobroker.wled.png?downloads=true)](https://nodei.co/npm/iobroker.wled/)

## wled adapter for ioBroker

A fast and feature-rich implementation of an ESP8266/ESP32 webserver to control NeoPixel (WS2812B, WS2811, SK6812, APA102) LEDs!

[WLED - Github Project](https://github.com/Aircoookie/WLED) by @Aircoookie

## Instructions

The adapter automatically try's to find WLED devices in your network using Bonjour services.  
Known issues : Networks with VLAN seperation mostly don't route broadcast traffic, meaning autodetect will fail. (see To-Do)

1) Ensure your WLED device is runnning and reachable by network
2) Install the adapter
3) Configure intervall times for data polling and auto-detect cyclus
4) Start the adapter, devices should be detected automatically
5) Adapter will send changes immediatly and polls data every x seconds (configurable)

## To-Do

* [ ] configurable devices (currenly only autodetect by bonjour)
* [ ] investigate better way of stay change announcement, currentl polly supported
* [x] special commands not included in rest-api (like save presets)
* [x] control segments
* [x] color changes

## Support me
If you like my work, please feel free to provide a personal donation  
(this is an personal Donate link for DutchmanNL, no relation to the ioBroker Project !)  
[![Donate](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)](http://paypal.me/DutchmanNL)


## Changelog
### 0.1.4
- (DutchmanNL) Implement drop down menu for color pallets
- (DutchmanNL) New configuration page

### 0.1.2
- (DutchmanNL) Implement drop down menu for effects

### 0.1.1
* (DutchmanNL) Implemented states hidden from JSON-API : tt / psave / nn / time
* (DutchmanNL) Improve logging issue

### 0.1.0
* (DutchmanNL) initial release

## License
MIT License

Copyright (c) 2020 DutchmanNL <rdrozda86@gmail.com>

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
