![Logo](admin/ebus.png)
# ioBroker.ebus
![Number of Installations](http://iobroker.live/badges/ebus-installed.svg) ![Number of Installations](http://iobroker.live/badges/ebus-stable.svg) 

[![NPM version](https://img.shields.io/npm/v/iobroker.ebus.svg)](https://www.npmjs.com/package/iobroker.ebus)
[![Downloads](https://img.shields.io/npm/dm/iobroker.ebus.svg)](https://www.npmjs.com/package/iobroker.ebus)
[![Tests](https://travis-ci.org/rg-engineering/ioBroker.ebus.svg?branch=master)](https://travis-ci.org/rg-engineering/ioBroker.ebus)

[![NPM](https://nodei.co/npm/iobroker.ebus.png?downloads=true)](https://nodei.co/npm/iobroker.ebus/)

This adapter reads
- data from ebusd using html
In this case ebusd must run and must be able to send data to e.g. explorer via http://IP:port/data (http://192.168.0.123:8889/data)
Current version of ebusd incl. configuration files can be copied from https://github.com/john30/ebusd
All fields with data, lastup and from global section are parsed. All others are ignored at the moment. 

There is a possibillity to poll data which are not polled by ebusd directly. Command 'read -f' is used to force reading over ebus.  

Another feature is to send any command to ebusd and receive answer to work with e.g. scripts.

current supported ebusd-version: 3.3

## known issues
* please create issues at [github](https://github.com/rg-engineering/ioBroker.ebus/issues) if you find bugs or whish new features
   
## Changelog

## 0.8.1 (2019-10-31)
* (René) update flot to version 3.0

### 0.8.0 (2019-02-24)
* (René) hcmode2 value 5 = EVU Sperrzeit

### 0.7.0 (2019-01-28)
* (René) add adjustable timeout

### 0.6.0 (2019-01-06)
* (René) support of compact mode

### 0.5.5 (2018-11-04)
* (René) code clean up

### 0.5.4
* (René) arduino support removed

### 0.5.3
* (René) add error information

### 0.5.2
* (René) bug fix: in vis 1.x some values are not stored

### 0.5.1
* (René) bug fix: if nothing to poll then skip telnet connection

### 0.5.0
* (René) write date over TCP to ebusd

### 0.4.2
* (René) bug fix for admin V3 

### 0.4.1 
* (René) logo changed 

### 0.4.0 
* (René) reading data from ebusd 

### 0.3.0 
* (René) support of ebusd 
* (René) admin3 support

### 0.2.0
* (René) add history as JSON for vis
* (René) add flot based widget to display temperatur, status and power graph

### 0.1.0
* (René) scheduled adapter instead of deamon

### 0.0.3
* (René) UTF8 coding

### 0.0.2
* (René) initial release

## License
Copyright (C) <2017 - 2019>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.





