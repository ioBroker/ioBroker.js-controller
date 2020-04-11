![Logo](admin/binance.png)
# ioBroker.binance

[![NPM version](http://img.shields.io/npm/v/iobroker.binance.svg)](https://www.npmjs.com/package/iobroker.binance)
[![Downloads](https://img.shields.io/npm/dm/iobroker.binance.svg)](https://www.npmjs.com/package/iobroker.binance)
![Number of Installations (latest)](http://iobroker.live/badges/binance-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/binance-stable.svg)
[![Dependency Status](https://img.shields.io/david/Kartax/iobroker.binance.svg)](https://david-dm.org/Kartax/iobroker.binance)
[![Known Vulnerabilities](https://snyk.io/test/github/Kartax/ioBroker.binance/badge.svg)](https://snyk.io/test/github/Kartax/ioBroker.binance)

[![NPM](https://nodei.co/npm/iobroker.binance.png?downloads=true)](https://nodei.co/npm/iobroker.binance/)


## Introduction
Adapter to communicate with the crypt trading platform binance

The adapter pulls prices of currencies in the configured update interval.
If you configure an API Key and the corresponding secret, it will pull account balances as well.
You may create an API Key on binance.com - i suggest to restrict it to "read-only".

![screenshot-1](screenshot-1.png) ![screenshot-2](screenshot-2.png)

## Changelog
### 1.0.4
- npmjs repackage
### 1.0.3
- enrypted storage of apiKeySecret
### 1.0.2
- added translations
- additonal timeout options
- Travis CI
### 1.0.1
- some loggin cleanup
- adjusted documentation
### 1.0.0
- first fully functional release (polling of prices and account balances)
- introduces cropty-js to accomplish binance quthentication requirements
- moved from type schedule to daemon with setTimeout

## License
MIT License

Copyright (c) 2020 Kartax

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
