![Logo](admin/lg-ess-home.png)
# ioBroker.lg-ess-home

[![NPM version](http://img.shields.io/npm/v/iobroker.lg-ess-home.svg)](https://www.npmjs.com/package/iobroker.lg-ess-home)
[![Downloads](https://img.shields.io/npm/dm/iobroker.lg-ess-home.svg)](https://www.npmjs.com/package/iobroker.lg-ess-home)
![Number of Installations (latest)](http://iobroker.live/badges/lg-ess-home-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/lg-ess-home-stable.svg)
[![Dependency Status](https://img.shields.io/david/Morluktom/iobroker.lg-ess-home.svg)](https://david-dm.org/Morluktom/iobroker.lg-ess-home)
[![Known Vulnerabilities](https://snyk.io/test/github/Morluktom/ioBroker.lg-ess-home/badge.svg)](https://snyk.io/test/github/Morluktom/ioBroker.lg-ess-home)

[![NPM](https://nodei.co/npm/iobroker.lg-ess-home.png?downloads=true)](https://nodei.co/npm/iobroker.lg-ess-home/)

**Tests:** ![Test and Release](https://github.com/Morluktom/ioBroker.lg-ess-home/workflows/Test%20and%20Release/badge.svg)

## LG ESS Home adapter for ioBroker

An iobroker adapter for a LG ESS hybrid inverter. With this adapter, the status of the inverter can be read. It is also possible to operate the inverter.

## Configuration

### Getting the password

1. Download the file [LG_Ess_Password.exe](https://github.com/Morluktom/ioBroker.lg-ess-home/tree/master/tools)
1. Connect the computer to the WLAN of the LG_ESS system. (WLAN password is on the type plate)
1. Start LG_Ess_Password.exe (At least .Net Framework 4.5 required)
1. Make a note of your password

For those, who don't like exe: (Thanks grex1975)\
you can use any REST Client to get the password:
1. connect to the WLAN of the LG_ESS
1. Execute a GET request\
	Url: https://192.168.23.1/v1/user/setting/read/password \
	Headers: "Charset": "UTF-8", "Content-Type": "application/json"\
	Body: "key": "lgepmsuser!@#"
	
This should give you the password and a status in return.

## Changelog

### 0.0.8 (2021-02-06)
* (Morluktom) Code cleanup

### 0.0.7 (2021-02-01)
* (Morluktom) Code cleanup

### 0.0.6 (2020-12-23)
* (Morluktom) Data type recognition fixed

### 0.0.5 (2020-12-15)
* (Morluktom) ScalingFactor moved to nativ
* password encryption => auto encryption (Maybe you have to set the password new)

### 0.0.4
* (Morluktom) W => kW, values confirmed

### 0.0.3
* (Morluktom) Structure of the channel and states changed

### 0.0.2
* (Morluktom) Separate Intervall for Common and Home

### 0.0.1
* (Morluktom) initial release

## License
MIT License

Copyright (c) 2020 - 2021 Morluktom <strassertom@gmx.de>

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