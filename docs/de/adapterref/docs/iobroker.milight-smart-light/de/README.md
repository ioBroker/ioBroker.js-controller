![milight-smart-light Logo](media/lib/images/milight-smart-light-md.png)

# ioBroker.milight-smart-light

**Tests:** Linux/Mac:
[![Travis-CI](http://img.shields.io/travis/Steiger04/ioBroker.milight-smart-light/master.svg)](https://travis-ci.org/Steiger04/ioBroker.milight-smart-light)
Windows:
[![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Steiger04/ioBroker.milight-smart-light?branch=master&svg=true)](https://ci.appveyor.com/project/Steiger04/ioBroker-milight-smart-light/)


This adapter for ioBroker controls Milight LED bulbs and LED strips and
based on the node module from mwittig.

mwittig / [node-milight-promise](https://github.com/mwittig/node-milight-promise)

With adapter you can use both: **v6 Bridge** and **Legacy Bridge**.

**v6 Bridge:**

- bridge (only iBox1)
- white
- rgb(w)
- fullColor


**Legacy Bridge:**
- white
- rgb(w)

### Versions

- **Node.js**: use v. 6.00 or higher
- **iobroker.admin**: use v. 1.8.2 or higher


### 0.1.9 (2018-03-13)
- (steiger04): Adaption for js-controller > v.1.2.5

### 0.1.8 (2018-01-21)
- (steiger04): some optimizations for Alexa

### 0.1.7 (2018-01-12)
- (steiger04): optimized: create states

### 0.1.6 (2018-01-08)
- (steiger04): Bug fix: rgbToHsv(...)

### 0.1.5 (2018-01-05)
- (steiger04): Info about required fields in tab Zones inserted

### 0.1.4 (2017-11-05)
- (steiger04): Set configuration option fullSync to false in milight instance

### 0.1.3 (2017-11-04)
- (steiger04): Added start image

### 0.1.2 (2017-11-04)
- (steiger04): Bug fix: socketio

### 0.1.1 (2017-11-02)
- (steiger04): Bug fix: Fixed EffectMode for Legacy

### 0.1.0 (2017-11-01)
- (steiger04): Added Small FE for milight-smart-light

### 0.0.6 (2017-10-18)
- (steiger04): Bug fix: All four zones can be created for the instance (via iobroker.admin) and remain after a reload. There are no more problems with umlauts.
- (steiger04): The types "RGB + White" and "RGB" were combined in the type "RGB (W)"

### 0.0.5 (2017-08-02)
- (bluefox): Added russian translation

### 0.0.4 (2017-07-28)
- (steiger04): Added basis-testing


### 0.0.3 (2017-07-24)
- (steiger04): on- /off- /onoff-states optimized for vis widgets

### 0.0.2 (2017-07-23)
- (steiger04): Bug fix: added parameter in effectMode(...)

### 0.0.1 (2017-07-16)
- (steiger04): Initial Version

## License

The MIT License (MIT)

Copyright (c) 2017 Steiger04 <steiger04@posteo.de>

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
