![Logo](admin/ecovacs-deebot.png)
# Ecovacs Deebot adapter for ioBroker

[![NPM version](http://img.shields.io/npm/v/iobroker.ecovacs-deebot.svg)](https://www.npmjs.com/package/iobroker.ecovacs-deebot)
[![Downloads](https://img.shields.io/npm/dm/iobroker.ecovacs-deebot.svg)](https://www.npmjs.com/package/iobroker.ecovacs-deebot)
[![npm](https://img.shields.io/npm/dt/iobroker.ecovacs-deebot.svg)](https://www.npmjs.com/package/iobroker.ecovacs-deebot)
[![Travis-CI](https://travis-ci.org/mrbungle64/ioBroker.ecovacs-deebot.svg?branch=master)](https://travis-ci.org/mrbungle64/ioBroker.ecovacs-deebot)

This adapter uses the [ecovacs-deebot.js](https://github.com/mrbungle64/ecovacs-deebot.js) library.

## Models

### Supported models
* Deebot 901
* Deebot OZMO 920
* Deebot OZMO 930
* Deebot OZMO 950

### These models are known to work
* Deebot Slim 2
* Deebot N79 series
* Deebot 601
* Deebot 710/711 (see "Known issues")
* Deebot 900
* Deebot U2
* Deebot OZMO 610
* Deebot OZMO 900
* Deebot OZMO T8 series

### These models should work
* Deebot M88
* Deebot 600/605
* Deebot OZMO T5
* Deebot OZMO Slim 10
* Deebot U2 Pro/Power

## Installation

It is recommended to use version 10 of Node.js or a newer version.

This adapter uses the canvas library which might require additional installations.
For the full functional range please install the following packages.

For Debian-based Linux systems the following commands should be executed:
```bash
sudo apt-get update
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

For instructions for other systems visit https://www.npmjs.com/package/canvas#compiling

## Usage

* Information on how to use this adapter can be found [here](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki)

### States

* Information about the states can be found [here](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/States-%28EN%29) (English) and [here](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/Datenpunkte-%28DE%29) (German)

## Known issues

* For the Deebot Ozmo 930 it is recommended to [schedule a restart](https://www.iobroker.net/#en/documentation/admin/instances.md#The%20page%20content) once a day because there are some reports that the connection is lost after approx. 24 hours
* Some cleaning functions may not work with 710/711. Please use version 0.5.8 for now.
* The "edge" function does not work with Deebot U2 (starts auto clean instead)

## FAQ

* Frequently asked questions can be found [here](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/FAQ)

## Changelog

### 1.1.0
* Stable release

### 1.0.13
* Using library version 0.5.6
* Some improvements and fixes

### 1.0.12
* Using library version 0.5.5
* Added some more T8 models
* Several improvements and fixes

### 1.0.11
* Enabled some features for OZMO 900
* Several minor improvements

### 1.0.10
* Using library version 0.5.4
* Several improvements and fixes
* Added available spot area boundaries to "map" channel (read only)

### 1.0.9
* Using library version 0.5.3
* Added some experimental features (for a few models only)
* Added option for virtual boundaries and some further improvements to adapter config
* Some improvements for js-controller 3.2.x

### 1.0.8
* Using library version 0.5.2 (0.5.2-beta.1)
* Added available virtualBoundaries channel for Deebot 900/901 and Ozmo 930 (read only)
* Added "volume" and buttons for resetting consumable values for 950 type models (920/950/T8)
* Improved synchronization of spot area buttons
* Add option for setting the language for spot area names
* Added some experimental features (for a few models only)
* Several enhancements and fixes
* Bump some dependencies

### 1.0.7
* Using library version 0.5.1 (0.5.1-beta.3)
* Initial support for Deebot U2 series
* Improved support for Ozmo T8 models
* (boriswerner) Fixed cleaning log for 950 type models (920/950/T8)
* (boriswerner) Added available virtualBoundaries to "map" channel (currently read only)
* Improved handling of device classes
* Several enhancements and fixes

### 1.0.6
* Using library version 0.5.0-beta.0
* Fix for running multiple devices
* Support for additional Ozmo T8 models
* Add option to synchronize spotArea buttons
* Set state value for triggered buttons to false
* Add option to suppress "unknown" value for "map.deebotPositionCurrentSpotAreaID" state
* Further enhancements and fixes

### 1.0.5
* Bump library to 0.4.25
* Initial support for Ozmo T8 and T8+
* Implement buttons for resetting consumable values (currently Deebot 900/901 and Ozmo 930 only)
* Several enhancements and fixes

### 1.0.4
* Bump library to 0.4.21
* Remove canvas from dependencies
* Several bugfixes and improvements (especially for N79 series)
* Possibility to specify the number of reruns for a spot area
* Spot areas in the "control" channel are now created automatically
* Remove number of spot areas from adapter settings
* Some refactoring
* Bump dependencies

### 1.0.1 - 1.0.3
* Added support for Ozmo T8 AIVI
* Compact mode support
* Added a button to save the last used custom area values
* Added buttons to rerun saved custom areas
* Some enhancements and fixes

### 1.0.0
* Stable release

### 0.0.1 - 0.6.5
* [Changelog archive](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/Changelog-(archive)#059)

## Disclaimer

I am in no way affiliated with ECOVACS.

## License

MIT License

Copyright (c) 2020 Sascha Hölzel <mrb1232@posteo.de>

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
