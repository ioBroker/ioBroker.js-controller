<h1>
	<img src="admin/linkeddevices.png" width="32"/>
	ioBroker.linkeddevices
</h1>

[![NPM version](http://img.shields.io/npm/v/iobroker.linkeddevices.svg)](https://www.npmjs.com/package/iobroker.linkeddevices)
[![Downloads](https://img.shields.io/npm/dm/iobroker.linkeddevices.svg)](https://www.npmjs.com/package/iobroker.linkeddevices)
[![Number of Installations](http://iobroker.live/badges/linkeddevices-installed.svg)](https://www.npmjs.com/package/iobroker.linkeddevices)
[![Dependency Status](https://img.shields.io/david/Scrounger/iobroker.linkeddevices.svg)](https://david-dm.org/Scrounger/iobroker.linkeddevices)
[![Known Vulnerabilities](https://snyk.io/test/github/Scrounger/ioBroker.linkeddevices/badge.svg)](https://snyk.io/test/github/Scrounger/ioBroker.linkeddevices)

[![NPM](https://nodei.co/npm/iobroker.linkeddevices.png?downloads=true)](https://nodei.co/npm/iobroker.linkeddevices/)

**Tests:**: [![Travis-CI](http://img.shields.io/travis/Scrounger/ioBroker.linkeddevices/master.svg)](https://travis-ci.org/Scrounger/ioBroker.linkeddevices)

## linkeddevices adapter for ioBroker
[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YHPPW474N5CKQ&source=url)

Create linked objects (datapoints) of your devices with a self-defined structure. This makes it possible to create a structure in ioBroker, where all objects are centralized, e.g. to be used in the vis or scripts. This offers the advantage, for example, that in a hardware exchange, only the linked objects must be recreated and all vis and scripts work again.

With the adapter you can convert objects or convert them to other types (not yet fully implemented).

This adapter is inspired at [virtual devices script by Pman](https://forum.iobroker.net/topic/7751/virtual-devices).

## Changelog

### 0.2.1
* (Scrounger) boolean to string converter added
* (Scrounger) bug fixes

### 0.2.0
* (Scrounger) number to boolean converter added
* (Scrounger) number expert settings for min, max added
* (Scrounger) bug fixes

### 0.1.5
* (Scrounger) expert settings properties renamed -> you must recreate your expert settings for all parent objects !!!
* (Scrounger) custom dialog prepared for convert to other type
* (Scrounger) bug fixes

### 0.1.0
* (Scrounger) custom dialog layout changed
* (Scrounger) conversion bug fixes
* (Scrounger) change unit bug fixes

### 0.0.4
* (Scrounger) main function added
* (Scrounger) change unit for linked objects
* (Scrounger) set number of decimal places for linked objects
* (Scrounger) set conversion for read only linked objects

### 0.0.1
* (Scrounger) initial release

## License
MIT License

Copyright (c) 2019 Scrounger

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