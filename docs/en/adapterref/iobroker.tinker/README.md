![Logo](admin/tinker.png)
# ioBroker.tinker
===================

![Number of Installations](http://iobroker.live/badges/tinker-installed.svg) ![Number of Installations](http://iobroker.live/badges/tinker-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.tinker.svg)](https://www.npmjs.com/package/iobroker.tinker)
[![Downloads](https://img.shields.io/npm/dm/iobroker.tinker.svg)](https://www.npmjs.com/package/iobroker.tinker)

[![NPM](https://nodei.co/npm/iobroker.tinker.png?downloads=true)](https://nodei.co/npm/iobroker.tinker/)

Tinker Board Monitor adapter is Modified Version of Raspberry PI Monitor adapter and OrangePi Monitor adapter for ioBroker

### Important Information

tested Hardware: Asus Tinker Board


### Following Objects are available after selection:

## *CPU*
- cpu_frequency
- load1
- load5
- load15

## *Memory*
- memory_available
- memory_free
- memory_total

## *Network (eth0)*
- net_received
- net_send

## *sdcard*
- sdcard_root_total
- sdcard_root_used

## *Swap*
- swap_total
- swap_used

## *Temperature*
- soc_temp

## *Uptime*
- uptime

## *WLAN*
- wifi_received
- wifi_send

## Configuration
On configuration page you can select following modules:

- CPU
- Memory
- Network
- sdcard
- Swap
- Temperature
- Uptime
- WLAN

## Changelog

### 0.1.3 (2019-03-14)
* (simatec) Ready for latest

### 0.1.1 (2019-01-08)
* Fix for new iobroker Installer

### 0.1.0 (2018-07-03)
* First Beta

### 0.0.1 (2018-07-03)
* initial Version



## License

The MIT License (MIT)

Copyright (c) 2019 simatec <nais@gmx.net>

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
