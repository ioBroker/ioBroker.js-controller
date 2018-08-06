![Logo](media/sma-em.png)
# ioBroker.sma-em
=================

[![NPM version](http://img.shields.io/npm/v/iobroker.sma-em.svg)](https://www.npmjs.com/package/iobroker.sma-em)
[![Downloads](https://img.shields.io/npm/dm/iobroker.sma-em.svg)](https://www.npmjs.com/package/iobroker.sma-em)
[![Tests](https://travis-ci.org/CTJaeger/ioBroker.sma-em.svg?branch=master)](https://travis-ci.org/CTJaeger/ioBroker.sma-em)

[![NPM](https://nodei.co/npm/iobroker.sma-em.png?downloads=true)](https://nodei.co/npm/iobroker.sma-em/)

### Info
This adapter reads information from SMA Energy Meter and SMA Home Manager 2.

### States
- Total and Counter of active power, reactive power, apparent power
- cosphi, Total Harmonic Distortion, Voltage
- Detailed Each of the 3 phases with regard of active power, reactive power, apparent power, cosphi, Total Harmonic Distortion, Voltage
- Detailed Each of the 3 phases with surplus of active power, reactive power, apparent power, cosphi, Total Harmonic Distortion, Voltage
- Detailed Each of the 3 phases counter
- Serial Number of SMA Energy Meter

### Options
- Selection options over each individual phase L1 / L2 / L3
- Selection non-extended Mode for Total and Counter of active power
- Selection extended Mode for reactive power, apparent power, cosphi, Total Harmonic Distortion, Voltage (requires more computing power)

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
        
## Changelog

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

Copyright (c) 2017 Marcolotti <info@ct-j.de>

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
