# Moved to https://github.com/iobroker-community-adapters/ioBroker.openhab
![Number of Installations](http://iobroker.live/badges/openhab-installed.svg) ![Number of Installations](http://iobroker.live/badges/openhab-stable.svg) 
![Logo](admin/openhab.png)
# ioBroker.openhab
=================

This adapter connects ioBroker with [openhab](http://openhab.org/).

It exports devices and groups from openhab and then monitors updates of variables.

## Todo
- New devices detect synonymous without adapter restart?
- At the moment only items view / switchable, can also the "things" be read
- Items deleted from OpenHab do not disappear in ioBroker

## Changelog
### 1.1.0 (2019.02.12)
* (Schluesselmeister) Add first support for new OH type definition

### 1.0.0 (2018.12.29)
* (Schluesselmeister) New type quantity was added

### 0.3.0 (2018.08.12)
* (Schluesselmeister) Many fixes
* (bluefox) Admin3

### 0.2.1 (2017.11.30)
* (bluefox) Fix decimal types

### 0.2.0 (2017.10.14)
* (bluefox) Fix small error by the connection closing

### 0.1.5 (2017.08.15)
* (bluefox) changed the value types for openHAB

### 0.1.4 (2017.07.16)
* (bluefox) allow control of dimmer

### 0.1.3 (2017.05.22)
* (bluefox) change settings

### 0.1.0 (2017.05.09)
* (bluefox) initial release

## License
The MIT License (MIT)

Copyright (c) 2017-2018 bluefox <dogafox@gmail.com>

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
