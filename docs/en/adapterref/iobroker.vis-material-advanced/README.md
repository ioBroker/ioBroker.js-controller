![Logo](admin/vis-material-advanced.png)
# ioBroker.vis-material-advanced

[![NPM version](http://img.shields.io/npm/v/iobroker.vis-material-advanced.svg)](https://www.npmjs.com/package/iobroker.vis-material-advanced)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vis-material-advanced.svg)](https://www.npmjs.com/package/iobroker.vis-material-advanced)
![Number of Installations (latest)](http://iobroker.live/badges/vis-material-advanced-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/vis-material-advanced-stable.svg)
[![Dependency Status](https://img.shields.io/david/EdgarM73/iobroker.vis-material-advanced.svg)](https://david-dm.org/iobroker-community-adapters/iobroker.vis-material-advanced)
[![Known Vulnerabilities](https://snyk.io/test/github/EdgarM73/ioBroker.vis-material-advanced/badge.svg)](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.vis-material-advanced)

[![NPM](https://nodei.co/npm/iobroker.vis-material-advanced.png?downloads=true)](https://nodei.co/npm/iobroker.vis-material-advanced/)

## vis-material-advanced adapter for ioBroker

This Adapter provides standardized Widgets for vis in ioBroker. Lots of different predifined widgets

the basics of this adapter has been created by :
* (nisio) https://github.com/iobroker-community-adapters/ioBroker.vis-material
* (pix---) https://github.com/Pix---/ioBroker.vis-material

but rewritten in 90% 

Several bugfixes and lots of new widgets added 


## following widgets are present right now:

### current
 - Door
 - Window
 - Temperature
 - Humidity
 - Pressure
 - Temp&Humidity
 - Occupancy
 - Light
 - Dimmer
 - Light-temperature
 - Shutter
 - Volume
 - Thermostat
 - Boolean
 - Number
 - Text
 - Valve
 
### in progress
not yet final:
 - Garagedoor
 - Radiostation 


 lot of widgets still in plan

## Options
    following options are available in most of the widgets:
    
    - text-color
    - cardIcon ( does not yet make sense everywhere, e.g. dimmer )
    - opacity color ( the standard opacity color )
    - colorizeByValue ( depending on some values the opacity color can be changed e.g. if it is too hot make it red, to cold blue )
    - below,above, min, max ( the values for colorizeByValue )
    - color-low/high,medium... ( the color to use if border is raised)
    - read-only ( some widgets can be set to read only mode for display only)
    - border-radius to enable and change the round corner
    - valueAlign Align the Value field left,center or right
    - value-vetical Align the Value field top,botton or middle
    - borderColor Color of the Border if activated


### Getting started

install the Adapter and start VIS in Edit mode.
On left side choose vis-material-adapter and than all widgets are shown in preview.

............. lots of docu missing ......................

**this is example2.png, import it and see it live**
![](widgets/door_example.png)



**you can import the example.json file into vis**
thanks to @sigi234

## Changelog
<!--
    Placeholder
    ### __WORK IN PROGRESS__
* 
-->

### 1.6.0 (2021-04-01)
* new Temperature widget with ONLY an icon from blue to red depending on temperature setting

### 1.5.1 (2021-03-28)
* replaced presence images with smaller ones


### 1.5.0 (2021-03-26)
* new widget Presence

### 1.4.7 (2021-03-26)
* removed unit test 


### 1.4.6 (2021-03-26)
* removed lint 

## License
MIT License

Copyright (c) 2020 EdgarM73 <edgar.miller@gmail.com>

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