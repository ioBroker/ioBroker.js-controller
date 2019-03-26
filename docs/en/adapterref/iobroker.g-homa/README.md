![Logo](admin/g-homa.png)
# ioBroker.g-homa
![Number of Installations](http://iobroker.live/badges/g-homa-installed.svg) ![Number of Installations](http://iobroker.live/badges/g-homa-stable.svg) =================

**Tests:** Linux/Mac: [![Build Status](https://travis-ci.org/AlCalzone/ioBroker.g-homa.svg?branch=master)](https://travis-ci.org/AlCalzone/ioBroker.g-homa) 
Windows: [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/AlCalzone/ioBroker.g-homa?branch=master&svg=true)](https://ci.appveyor.com/project/AlCalzone/ioBroker-g-homa/)

================

ioBroker adapter for G-Homa Wifi plugs. Provides a local command server so the plugs don't phone home anymore.
The inclusion of plugs has to be performed with the app for now, but will soon be supported over ioBroker on WiFi-enabled devices.

## Changelog

### 0.4.0 (2018-07-31)
* (AlCalzone) Avoid overwriting the name of existing objects

### 0.3.2 (2018-06-28)
* (AlCalzone) Check the existence of energy measurements instead of the plug type to determine if objects should be created.

### 0.3.1 (2018-06-19)
* (AlCalzone) Reduce rewriting of state objects. This limits log spam when a history adapter is active on this adapter's states.

### 0.3.0 (2018-01-28)
* (AlCalzone) Support for multiple network interfaces

### 0.2.0 (2018-01-11)
* (AlCalzone) Experimental support for plugs with energy measurement

### 0.1.2
* (AlCalzone) Fixed bug with inclusion in admin UI

### 0.1.1
* (AlCalzone) Fixed errors on NodeJS 4.x

### 0.1.0
* (AlCalzone) Added device management functions
* (AlCalzone) Fix alive/dead detection

### 0.0.4
* (AlCalzone) Fix reconnection of plugs after power loss

### 0.0.3
* (Apollon77) Updated adapter testing

### 0.0.2
* (AlCalzone) Improved support for older NodeJS versions

### 0.0.1
* (AlCalzone) initial release

## License
The MIT License (MIT)

Copyright (c) 2017 AlCalzone <d.griesel@gmx.net>

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
