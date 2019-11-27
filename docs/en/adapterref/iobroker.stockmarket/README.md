![Logo](admin/stockmarket.png)
# ioBroker.stockmarket

[![NPM version](http://img.shields.io/npm/v/iobroker.stockmarket.svg)](https://www.npmjs.com/package/iobroker.stockmarket)
[![Downloads](https://img.shields.io/npm/dm/iobroker.stockmarket.svg)](https://www.npmjs.com/package/iobroker.stockmarket)
[![Dependency Status](https://img.shields.io/david/waoler/iobroker.stockmarket.svg)](https://david-dm.org/waoler/iobroker.stockmarket)
[![Known Vulnerabilities](https://snyk.io/test/github/waoler/ioBroker.stockmarket/badge.svg)](https://snyk.io/test/github/waoler/ioBroker.stockmarket)

[![NPM](https://nodei.co/npm/iobroker.stockmarket.png?downloads=true)](https://nodei.co/npm/iobroker.stockmarket/)

**Tests:**: [![Travis-CI](http://img.shields.io/travis/waoler/ioBroker.stockmarket/master.svg)](https://travis-ci.org/waoler/ioBroker.stockmarket)

## Stockmarket adapter for ioBroker

This ioBroker Adapter integrates the stock market in ioBroker. You can choose which stock you want to watch.

### Configuration
1. Get your own API Key from https://www.alphavantage.co/support/#api-key
2. Put your generated Key in the adapter config 
3. Insert your desired stockssymbols in the adapter config (comma seperated)
4. (optional) To find the desired stocksymbols you can check them with the following URL: https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=STOCKNAME&apikey=YOUR_API_KEY
Replace STOCKNAME with the Stock you searching for and YOUR_API_KEY with your Api Key :)
Then use find your stock an use the shown SYMBOL for your adapter config.
5. Save the settings

You can change the schedule settings if you like (default every 15 minutes).

## Changelog

### 0.0.2
* (waoler) fixed error handling
* (waoler) fixed "instance already running "-Error

### 0.0.1
* (waoler) initial release

## License
MIT License

Copyright (c) 2019 waoler <waoler@web.de>

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
