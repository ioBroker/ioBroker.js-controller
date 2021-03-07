![Logo](admin/mercury.png)
# ioBroker.mercury

![Number of Installations](http://iobroker.live/badges/mercury-installed.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.mercury.svg)](https://www.npmjs.com/package/iobroker.mercury)
[![NPM version](http://img.shields.io/npm/v/iobroker.mercury.svg)](https://www.npmjs.com/package/iobroker.mercury)
![Stable](http://iobroker.live/badges/mercury-stable.svg) 
[![Tests](https://github.com/instalator/iobroker.mercury/workflows/Test%20and%20Release/badge.svg)](https://github.com/instalator/ioBroker.mercury/actions/)

[![NPM](https://nodei.co/npm/iobroker.mercury.png?downloads=true)](https://nodei.co/npm/iobroker.mercury/)

[![Donate](https://img.shields.io/badge/Donate-YooMoney-green)](https://sobe.ru/na/instalator)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PFUALWTR2CTPY)

## Mercury adapter for ioBroker

Receiving data from electricity meters Mercury.
Supports TCP / IP and Serial connections.

The following electricity meters are supported:
* Mercury-200
* Mercury-201
* Mercury-206
* Mercury-203
* Mercury-203.2TD
* Mercury-204
* Mercury-208
* Mercury-230
* Mercury-231
* Mercury-233
* Mercury-234
* Mercury-236
* Mercury-238

## Objects
**RAW** - sending a  RAW command and receiving a response.  
Command without address and CRC, bytes separated by space. Expample:  
For 1 phase counter - Reading energy for the current month
```
32 0F
```
Returns a buffer as a string    
```"{"type":"Buffer","data":[0,14,31,155,50,7,0,99,0,255,255,255,255,255,255,255,255,255,255,255,255,127,86]}"```

## Changelog

### 0.1.5
* (instalator) fixed a bug with polling multiple counters

### 0.1.4
* (instalator) added frequency for 1 fase
* (instalator) added powerQTotal for 1 fase
* (instalator) added powerSTotal for 1 fase
* (instalator) added cosfTotal for 1 fase
* (instalator) change recconect

### 0.1.3
* (instalator) fixed error [issues 11](https://github.com/instalator/ioBroker.mercury/issues/11)
* (instalator) fixed warn [issues 8](https://github.com/instalator/ioBroker.mercury/issues/8)

### 0.1.2
* (instalator) fixed error serial memory

### 0.1.1
* (instalator) fixed Unsigned value current
* (instalator) fix for serial number > 240
* (instalator) change recconect SerialPort
* (instalator) refactoring

### 0.1.0
* (instalator) beta

### 0.0.15
* (instalator) fixed error Power

### 0.0.13
* (SanSanysch) translate
* (instalator) added translate
* (instalator) added temperature, frequency, full power
* (instalator) fix error

### 0.0.11
* (instalator) added translate function (PLEASE HELP WITH THE TRANSLATION)
* (instalator) fix error

### 0.0.10
* (instalator) Added setting Polling period main parameters
* (instalator) Added setting Polling period of non-main parameters
* (instalator) Refactoring and fix error

### 0.0.8
* (instalator) fixed error

### 0.0.4
* (instalator) added unit for state

### 0.0.3
* (instalator) added object send RAW command
* (instalator) refactor and fix error

### 0.0.2
* (instalator) added serial connect
* (instalator) fixed many error

### 0.0.1
* (instalator) initial release

## License
The MIT License (MIT)

Copyright (c) 2020 instalator <vvvalt@mail.ru>

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
