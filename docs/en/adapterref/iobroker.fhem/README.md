![Logo](admin/fhem.png)
# ioBroker.fhem
=================

![Number of Installations](http://iobroker.live/badges/fhem-installed.svg) ![Number of Installations](http://iobroker.live/badges/fhem-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.fhem.svg)](https://www.npmjs.com/package/iobroker.fhem)
[![Downloads](https://img.shields.io/npm/dm/iobroker.fhem.svg)](https://www.npmjs.com/package/iobroker.fhem)

[![NPM](https://nodei.co/npm/iobroker.fhem.png?downloads=true)](https://nodei.co/npm/iobroker.fhem/)


This adapter allows connect FHEM to ioBroker.

To enable the connection the telnet must be enabled in FHEM. To enable it (enabled by default) check following settings in fhen.cfg:

```
define telnetPort telnet 7072 global
```

Exactly same port and the IP address of FHEM host (or localhost if FHEM and ioBroker run on same PC) should be used for settings of adapter.

ioBroker sends at the start "jsonlist2" command to get all "Readings" from the list.

## Supported devices
Normally all devices are supported. But some of them are better integrated.

The problems appears especially by controlling of the states.
Because there is no clear attributes structure ioBroker tries to guess which "PossibleSets" fields can be used.
Actually only following attributes are supported:
- RGB: If RGB exists in *PossibleSets* and in *Readings* it will be combined into one state that can be read and written. Values like ```#234567``` will be automatically converted to ```234567```.
- on off state: If **on** and **off** exist in *PossibleSets* and **state** in *Readings*, it will be combined into on state under name **state**. It can be controlled with true and false and commands will be changed to ```set DEVICE on``` and ```set DEVICE off```.

## Features and Usage

* If room "ioBroker" exist in FHEM, only this objects will be synchronized
* After synchronization FHEM unused Objects will be automatically deleted.
* Internals like TYPE, NAME, PORT, manufacturername, modelid, swversion will be synchronized (role=value.xxx)
* Attributes like room, alias, disable, comment will be synchronized and it is possible to edit Attributes in ioBroker. (role=state.xxx)
* Set role and other during synchronization
  * Readings xxx with any PossibleSets will be set role=state.xxx
  * Readings xxx without PossibleSets will be set role=value.xxx
  * Readings xxx with PossibleSets "noArg" will be set role=button.xxx
  * Readings xxx with PossibleSets "slider" will be set role=level.xxx, min=slider(min), max=slider(max)
  * Readings "desired-temp" will be set role=level.temperature, min=5, max=35, unit=°C .
  * Readings "pct, brightness,dim" will be set role=level.dimmer, min=0, max=100, unit=%
  * Readings "Volume, volume, GroupVolume" will be set role=level.volume, min=0, max=100, unit=%
  * Readings "GroupVolume" will be set role=level.volume.group, min=0, max=100, unit=%
* SmartName for Cloud Adapter will be set automatically with alias or name (only fhem.0 and objects with role = level.temperature, level.dim, level.volume)


## Changelog
### 1.1.0 (2018-10-22)
* (LausiD) Big changes

### 1.0.0 (2018-10-15)
* (LausiD) Min/max were defined as number

### 0.5.6 (2018-09-09)
* (LausiD) Some roles were updated

### 0.5.5 (2018-08-22)
* (LausiD) Several fixes and changes
* (bluefox) Admin3

### 0.5.0 (2018-04-29)
* (LausiD) Several fixes and changes

### 0.4.2 (2018-04-15)
* (TonyBostonTB) Fix wordings

### 0.4.1 (2017-04-14)
* (bluefox) add link to FHEM im admin

### 0.4.0 (2017-03-12)
* (LausiD) fix some types
* (bluefox) define custom prompt

### 0.3.0 (2017-02-25)
 * (LausiD) fix some types
 * (bluefox) add password for telnet

### 0.2.2 (2016-06-17)
* (bluefox) implement On/Off state and fix RGB
* (bluefox) add debug output by control

### 0.2.1 (2016-06-12)
* (bluefox) support of RGB values for control

### 0.2.0
* (bluefox) implemented write
* (bluefox) try to read meta information if unknown event received

### 0.1.0
* (bluefox) initial release

## License
The MIT License (MIT)

Copyright (c) 2016-2018 bluefox <dogafox@gmail.com>

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
