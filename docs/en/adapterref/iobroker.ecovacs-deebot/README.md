![Logo](admin/ecovacs-deebot.png)
# Ecovacs Deebot adapter for ioBroker

[![NPM version](http://img.shields.io/npm/v/iobroker.ecovacs-deebot.svg)](https://www.npmjs.com/package/iobroker.ecovacs-deebot)
[![Downloads](https://img.shields.io/npm/dm/iobroker.ecovacs-deebot.svg)](https://www.npmjs.com/package/iobroker.ecovacs-deebot)
[![npm](https://img.shields.io/npm/dt/iobroker.ecovacs-deebot.svg)](https://www.npmjs.com/package/iobroker.ecovacs-deebot)
[![Travis-CI](https://travis-ci.org/mrbungle64/ioBroker.ecovacs-deebot.svg?branch=master)](https://travis-ci.org/mrbungle64/ioBroker.ecovacs-deebot)

This adapter uses the [ecovacs-deebot.js](https://github.com/mrbungle64/ecovacs-deebot.js) library.

## Models

### Supported models
* Deebot 900/901
* Deebot Ozmo 920
* Deebot Ozmo 930
* Deebot Ozmo 950

### These models are known to work
* Deebot Slim 2
* Deebot N79 series
* Deebot 601
* Deebot 710/711
* Deebot U2
* Deebot Ozmo 610
* Deebot Ozmo 900
* Deebot Ozmo T8 AIVI
* Deebot Ozmo T8 (+)

### These models should work
* Deebot M88
* Deebot 600/605
* Deebot Ozmo Slim 10
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

## Known issues

* For the Deebot Ozmo 930 it is recommended to [schedule a restart](https://www.iobroker.net/#en/documentation/admin/instances.md#The%20page%20content) once a day because there are some reports that the connection is lost after approx. 24 hours.
* There's a strange behavior of the battery value on Deebot 900/901. It's very likely that this is a firmware bug.
  * You can use the corresponding option in the adapter config as a workaround.
* The "pause" button does not work with Deebot 710/711.
* The "stop" button does not work with Deebot 711s.

## FAQ

* Frequently asked questions can be found [here](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/FAQ)

## Changelog

### 1.0.8 (alpha)
* Using library version 0.5.2 (0.5.2-alpha.5)
* Added available virtualBoundaries channel for Deebot 900/901 and Ozmo 930 (read only)
* Added "volume" for 950 type models (920/950/T8)
* Added some experimental features (for a few models only)
* Bump some dependencies
* Several enhancements and fixes

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

### 1.0.2 - 1.0.3
* Added support for Ozmo T8 AIVI

### 1.0.1
   * Compact mode support
   * New features:
     * button to save the last used custom area values
     * buttons to rerun saved custom areas
   * Some enhancements and fixes

### 1.0.0
   * Stable Release

### 0.6.3 - 0.6.5
   * Using library version 0.4.13
   * Set flag for compact mode to false
   * Some minor fixes
   * Some translations added

### 0.6.2
   * Using library version 0.4.12
   * (boriswerner) Alternative API call for last clean log info (920/950)
   * (mrbungle64) Periodically polling of CleanLogs

### 0.6.0 - 0.6.1
   * Using library version 0.4.10/11
   * Several enhancements and fixes

### 0.0.1 - 0.5.9
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
