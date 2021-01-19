![Logo](admin/sma-em.png)
# ioBroker.sma-em
=================

![Number of Installations](http://iobroker.live/badges/sma-em-installed.svg) ![Number of Installations](http://iobroker.live/badges/sma-em-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.sma-em.svg)](https://www.npmjs.com/package/iobroker.sma-em)
[![Downloads](https://img.shields.io/npm/dm/iobroker.sma-em.svg)](https://www.npmjs.com/package/iobroker.sma-em)
[![Tests](https://travis-ci.org/CTJaeger/ioBroker.sma-em.svg?branch=master)](https://travis-ci.org/CTJaeger/ioBroker.sma-em)

[![NPM](https://nodei.co/npm/iobroker.sma-em.png?downloads=true)](https://nodei.co/npm/iobroker.sma-em/)

### Info
This adapter reads information from SMA Energy Meter and SMA Home Manager 2.

### States
- Total and Counter of active power, reactive power, apparent power
- cosphi, Total Harmonic Distortion, Voltage, Frequency
- Detailed Each of the 3 phases with regard of active power, reactive power, apparent power, cosphi, Amperage, Voltage
- Detailed Each of the 3 phases with surplus of active power, reactive power, apparent power, cosphi, Amperage, Voltage
- Detailed Each of the 3 phases counter
- Serial Number, Software Version, SUSyID of SMA Energy Meter

### Options
- Selection options over each individual phase L1 / L2 / L3
- Selection non-extended Mode for Total and Counter of active power
- Selection extended Mode for reactive power, apparent power, cosphi, Amperage, Voltage (requires more computing power)

### Folder-Structure

- L1 - Phase 1
- L2 - Phase 2
- L3 - Phase 3

### States-Structure

Example:  

          pregard P-active power / regard 
          qregard Q-reactive power / regard
          sregard S-apparent power / regard
         
          psurplus P-active power / surplus
          qsurplus Q-reaktive power /surplus
          ssurplus S-apparent power /surplus

<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
        
## Changelog

### 0.6.1-beta.0 (2021-01-18)
* (TGuybrush) Bug fixes
  * Software Version string, last part is the revision as character (e.g. R = release)
  * Potential Warning during the first start
  * Revised units to follow the SI standardization (DIN 1301)
* (TGuybrush) Top level hierarchy object description indicates if the device is a SMA Energy Meter or a SMA Home Manager 2.
* (DutchmanNL) Released to the latest repo, fixed some typo's + news and translations

### 0.6.0
* (TGuybrush) Fixed wrong status information 
  * Complete adapter core rewritten to extract the status values by their OBIS value instead of the absolute position in the received UDP message according to the SMA documentation.
  *  Improved compatibility to future new OBIS values
* (TGuybrush) Add additional status information
  * Power grid frequency
  * Time tick counter
  * SMA SUSy ID
  * Software Version
* Add a timestamp for each received status information

### 0.5.7
* (DutchmanNL) Solved incorrect stated ID type for JS-controller 3.x

### 0.5.4
* (Andiling) Adapter compatibility extended for Node 10 and higher

### 0.5.3
* (Marcolotti) Fix units 

### 0.5.2
* (Marcolotti) support of more than one energy meter 

### 0.5.1
* (Marcolotti) Add Option for extended Mode
* (Marcolotti) Remove Option for Poll
* (Marcolotti) several fixes

### 0.5.0
* (Bluefox) Optimize Performance

### 0.0.2
* (Marcolotti) Add options for detailed View of L1, L2, L3
* (Marcolotti) Bugfixes
* (Bluefox) Optimize Performance
* (Apollon77) Clean Template

### 0.0.1
* (Marcolotti) initial release

## License
The MIT License (MIT)

Copyright (c) 2021 IoBroker-Community

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
