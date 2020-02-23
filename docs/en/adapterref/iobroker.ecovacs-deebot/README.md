![Logo](admin/ecovacs-deebot.png)
# Ecovacs Deebot adapter for ioBroker

[![NPM version](http://img.shields.io/npm/v/iobroker.ecovacs-deebot.svg)](https://www.npmjs.com/package/iobroker.ecovacs-deebot)
[![Downloads](https://img.shields.io/npm/dm/iobroker.ecovacs-deebot.svg)](https://www.npmjs.com/package/iobroker.ecovacs-deebot)
[![Travis-CI](https://travis-ci.org/mrbungle64/ioBroker.ecovacs-deebot.svg?branch=master)](https://travis-ci.org/mrbungle64/ioBroker.ecovacs-deebot)

This adapter uses the [ecovacs-deebot.js](https://github.com/mrbungle64/ecovacs-deebot.js) library.

## Models

So far, only devices that communicate with the **XMPP** protocol work properly. 
Devices that communicate with the **MQTT** protocol are experimental.

You can check this with the state value `info.communicationProtocol` after successful connection establishment (values: `XMPP`, `MQTT`).

### These models work to full extent
* Deebot Slim 2
* Deebot Ozmo 930

### These models work to almost full extent
* Deebot 601
* Deebot 710/711
* Deebot 900/901
* Deebot Ozmo 610
* Deebot Ozmo 950

### These models should work to (almost) full extent
* Deebot N79T
* Deebot 600/605
* Deebot Ozmo 960 (not tested)

### These models should work partially
* Deebot Ozmo 900

### Buttons and control

| model       | basic * | pause | spot  | spotArea | customArea ** | edge  | playSound | waterLevel |
|------------ |-------- |------ |------ |--------- |-------------- |------ |---------- |----------- |
| Slim 2      |   x     |  n/a  |   x   |   n/a    |     n/a       |   x   |    n/a    |    n/a     |
| 600/601/605 |   x     |       |   x   |   n/a    |     n/a       |   x   |           |            |
| 710/711     |   x     |       |   x   |   n/a    |     n/a       |   x   |     x     |    n/a     |
| 900/901     |   x     |   x   |  n/a  |    x     |      x        |  n/a  |           |    n/a     |
| Ozmo 610    |   x     |   x   |   x   |   n/a    |     n/a       |   x   |     X     |     x      |
| Ozmo 900    |   x     |   x   |  n/a  |    x     |      x        |  n/a  |     x     |     x      |
| Ozmo 930    |   x     |   x   |  n/a  |    x     |      x        |  n/a  |     x     |     x      |
| Ozmo 950    |   x     |   x   |  n/a  |    x     |      x        |  n/a  |     x     |     x      |

*) "basic" commands are `clean` (`auto`), `charge`, `stop`. They are not listed separately here.

**) incl. number of `cleanings`

### Info and status

| model       | battery | chargestatus | cleanstatus | waterLevel | waterbox | consumables |
|------------ |-------- |------------- |------------ |----------- |--------  |------------ |
| Slim 2      |    x    |      x       |      x      |     n/a    |    n/a   |      x      |
| 600/601/605 |    x    |      x       |      x      |            |          |             |
| 710/711     |    x    |      x       |      x      |     n/a    |    n/a   |             |
| 900/901     |    x    |      x       |      x      |     n/a    |    n/a   |             |
| Ozmo 610    |    x    |      x       |      x      |      x     |          |      x      |
| Ozmo 900    |    x    |              |             |            |          |             |
| Ozmo 930    |    x    |      x       |      x      |      x     |     x    |      x      |
| Ozmo 950    |    x    |              |      x      |            |          |             |

## Control

### Buttons

| name | description |
| --- | --- |
| charge | return to charging station |
| clean | start auto cleaning |
| edge | start edge cleaning |
| playSound | play a sound for locating the bot |
| spot | start spot cleaning |
| stop | stop the cleaning process |
| pause | pause the cleaning process |
| spotArea `0`-`9` | up to 9 buttons for the areas defined in the Ecovacs app |

### Area/zone cleaning

#### SpotArea

* spot areas are named with letters in the mobile app
    * in the adapter they are mapped to a number:
        * `A` = `0`
        * `B` = `1`
        * etc.
* `spotArea`: comma-separated list of numbers
    * starting by `0` (e.g. `1,3` = areas `B` and `D`) for areas to be cleaned
* the number of buttons (`spotArea_0-9`) can be configured in the Adapter Configuration

#### CustomArea

* comma-separated list of exactly 4 position values for `x1,y1,x2,y2` (e.g. `-3975,2280,-1930,4575`)
    * position `0,0,0,0` seems to be the position of the charging station
    * a value of `1000` seems to be the distance of approximately 1 meter

#### WaterLevel

* Control and display water level (`low`, `medium`, `high` and `max`)

## Consumable
| name | description |
| --- | --- |
| filter | Filter lifespan |
| main_brush | Main brush lifespan |
| side_brush | Side brush lifespan |

## Info

| name | description |
| --- | --- |
| battery | battery |
| chargestatus | status while charging |
| cleanstatus | status while cleaning |
| communicationProtocol | XMPP or MQTT |
| deviceClass | Deebot device class |
| deviceName | Name of the device defined in the Ecovacs app |
| deviceStatus | status of the device |
| error | Current error message |

## Adapter configuration

| name | description |
| --- | --- |
| Email | Email address used for your Ecovacs account |
| Password | Passsword used for your Ecovacs account |
| Country code (continent) | Selection of pre-defined country codes (incl. continent) |
| Device number | Selection for the current instance if you use multiple devices |
| Number of spot areas | Number of sport areas defined in the Ecovacs app (default `0`) |

## Changelog

### 0.4.2
   * Improved support for MQTT devices

### 0.3.10
   * (mrbungle64) Improved support for XML based MQTT devices
   
### 0.3.9
   * (mrbungle64) Improved support for XML based MQTT devices

### 0.3.8
   * (boriswerner) Improved support for Ozmo 950
   * (mrbungle64) Implemented waterbox info (XMPP based devices)

### 0.3.7
   * (mrbungle64) Bugfix
   
### 0.3.6
   * (boriswerner) Basic clean & charge working (Ozmo 950)

### 0.3.5
   * (mrbungle64) Improved support for MQTT devices
   * (boriswerner) Improved support for Ozmo 950 device

### 0.3.4
* (mrbungle64) Feature Release
   * Implemented handling water level
   * Preparing for latest repo

### 0.3.3
* (mrbungle64) Feature release
   * Implemented lifespan values of components
   
### 0.3.2
* (mrbungle64) Feature release
   * Implemented spotArea buttons
   
### 0.3.1
* (mrbungle64) Feature release (alpha)
   * Implemented spotArea command
   * Implemented customArea command
   * Implemented playSound command
   
### 0.3.0
* (mrbungle64) alpha release

### 0.2.0
* (mrbungle64) Pre-release (alpha)

### 0.1.0
* (mrbungle64) Initial release (pre-alpha)

### 0.0.1
* (mrbungle64) Initial development release

## Thanks and credits
* @joostth ([sucks.js](https://github.com/joostth/sucks.js))
* @wpietri ([sucks](https://github.com/wpietri/sucks))
* @bmartin5692 ([sucks](https://github.com/bmartin5692/sucks), [bumber](https://github.com/bmartin5692/bumper))
* @Ligio ([ozmo](https://github.com/Ligio/ozmo))

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
