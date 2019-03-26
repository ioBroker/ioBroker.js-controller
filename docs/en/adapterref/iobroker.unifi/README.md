![Logo](admin/unifi.png)
# ioBroker.unifi

[![Build Status](https://travis-ci.org/jens-maus/ioBroker.unifi.svg?branch=master)](https://travis-ci.org/jens-maus/ioBroker.unifi)
[![Code Climate](https://codeclimate.com/github/jens-maus/ioBroker.unifi/badges/gpa.svg)](https://codeclimate.com/github/jens-maus/ioBroker.unifi)
[![bitHound Score](https://www.bithound.io/github/jens-maus/ioBroker.unifi/badges/score.svg)](https://www.bithound.io/github/jens-maus/ioBroker.unifi)
![Number of Installations](http://iobroker.live/badges/unifi-installed.svg) ![Number of Installations](http://iobroker.live/badges/unifi-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.unifi.svg)](https://www.npmjs.com/package/iobroker.unifi)
[![Downloads](https://img.shields.io/npm/dm/iobroker.unifi.svg)](https://www.npmjs.com/package/iobroker.unifi)
[![Github Issues](http://githubbadges.herokuapp.com/jens-maus/ioBroker.unifi/issues.svg)](https://github.com/jens-maus/ioBroker.unifi/issues)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RAQSDY9YNZVCL)

[![NPM](https://nodei.co/npm/iobroker.unifi.png?downloads=true)](https://nodei.co/npm/iobroker.unifi/)

This ioBroker adapter allows to control and monitor [UniFi devices](http://www.ubnt.com/), such as UniFi WiFi Access Points using the public UniFi Controller Web-API.

## ChangeLog

### 0.3.1
  (jens-maus) added support for multi-site environments.

### 0.3.0
  (jens-maus) added access device data query and moved the client devices to the 'clients' subtree instead

### 0.2.1
  (jens-maus) minor fixes

### 0.2.0
  (jens-maus) moved `lib/unifi.js` to dedicated node-unifi nodejs class and added it as a dependency.

### 0.1.0
  (jens-maus) implemented a first basically working version which can retrieve status information from a UniFi controller.

### 0.0.1
  (jens-maus) initial checkin of non-working development version

## References
This adapter uses functionality from the following third-party nodejs modules:

* [node-unifi](https://github.com/jens-maus/node-unifi)

## License
The MIT License (MIT)

Copyright (c) 2016-2017 Jens Maus &lt;mail@jens-maus.de&gt;

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
