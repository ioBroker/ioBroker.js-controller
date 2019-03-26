![Logo](admin/wifilight.png)

#### ioBroker.wifilight 

[![NPM version](http://img.shields.io/npm/v/iobroker.wifilight.svg)](https://www.npmjs.com/package/iobroker.wifilight)
[![Tests](http://img.shields.io/travis/soef/ioBroker.wifilight/master.svg)](https://travis-ci.org/soef/ioBroker.wifilight)
[![Build status](https://ci.appveyor.com/api/projects/status/2hvs4fvfms7xhmnw?svg=true)](https://ci.appveyor.com/project/soef/iobroker-wifilight)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/soef/iobroker.wifilight/blob/master/LICENSE)

#### Description

ioBroker Adapter for WiFi Light

#### Info
Supports LW12, LD382 and LD382A.
Support for Mi-Light/LimitlessLED RGBW added.

###### How to use the command state:
+ Possible identifiers are: ``red, r, green, g, blue, b, bri, sat, transition, on, off``
+ The string can be a JSON with or without parentheses. 
+ You can also assign a value by =
+ Range of colors: ```0..255``` 
+ Range of bri: ``0..100`` 

Some Examples:
```
r = 100; g = 250, b = 100
r: 0, g: 0, b = 255
red: 200, green: 0, blue: 0
{r:100, b: 200, transition: 20}
off
on
{on:0}
```
To change the color you do not have to use all three vallues.
For example, ``` red = 0 ```, blue and green will stay unchanged.

###### r, g, b, w States:
+ Values 0..255
+ \#rrggbb[ww]

#### Installation
Execute the following command in the iobroker root directory (e.g. in /opt/iobroker)
```
npm install iobroker.wifilight 
```
<!--
### License
The MIT License (MIT)

Copyright (c) 2016 soef <soef@gmx.net>

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
-->