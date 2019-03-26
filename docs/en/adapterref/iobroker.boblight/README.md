![Logo](admin/boblight.png)
# ioBroker Boblight Adapter
==============

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

There will be no further development on this adapter, because it's replaced by the hyperion adapter. 

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!




![Number of Installations](http://iobroker.live/badges/boblight-installed.svg) ![Number of Installations](http://iobroker.live/badges/boblight-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.boblight.svg)](https://www.npmjs.com/package/iobroker.boblight)
[![Downloads](https://img.shields.io/npm/dm/iobroker.boblight.svg)](https://www.npmjs.com/package/iobroker.boblight)

[![NPM](https://nodei.co/npm/iobroker.boblight.png?downloads=true)](https://nodei.co/npm/iobroker.boblight/)

Control a Boblightserver from ioBroker.


### 0.0.0 (2016-11-08)
Pre Release
Known Bugs and Issues:
This is only a prove of concept. It somehow works, but it´s far from complete...




## Install & Configuration

1st.)   Install Boblight and configure it. Test if all runs correctly.
2nd.)   Set Server and port in adapter configuration.
3rd.)   Populate the scenes directory with scenes in json format. pls look at the repositorie boblight_scene_creator
4rd.)   You can control which scene is running by setting "activescene" to the name of the scene. 
        this can be done by script or by pressing on a scene under scenes...
        
## Usage

## License

The MIT License (MIT)

Copyright (c) 2015-2017 ruhigundrelaxed

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
