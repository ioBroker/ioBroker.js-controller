![Logo](admin/luxtronik1.png)

# ioBroker.luxtronik1

![Number of Installations](http://iobroker.live/badges/luxtronik1-installed.svg) ![Number of Installations](http://iobroker.live/badges/luxtronik1-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.luxtronik1.svg)](https://www.npmjs.com/package/iobroker.luxtronik1)
[![Downloads](https://img.shields.io/npm/dm/iobroker.luxtronik1.svg)](https://www.npmjs.com/package/iobroker.luxtronik1)

[![NPM](https://nodei.co/npm/iobroker.luxtronik1.png?downloads=true)](https://nodei.co/npm/iobroker.luxtronik1/)

An ioBroker adapter for Luxtronik 1 - heatpump - controllers (i.e. Alpha Innotec, Siemens...)

Install adapter, create instance.
Install hardware: i.e. RS232 to LAN adapter to the serial interface (RS232) of the heatpumps mainbord.
Specs: serial cabe: link PINS 2, 3 and 5  (if it does not work, change pins 2 and 3)
RS232 to LAN converter: USR TCP232 – 302.
Settings serial interface : 57600/8/N/1 , Mode :TCP-Server
Reset Timeout:0

Set comfoair - IP-adress, port and polling - intervall

Tested on luxtronik 1 and AlphaInnotec heatpump

Reads different values and stats of your heatpump (temperatures, errors, running time,...).
Planned: control functions (set temperatures, heating-curve, mode).

## Changelog

### 0.0.4

-   error - handling optimized

### 0.0.3

-   Reads mode heating, water and heating-curve

### 0.0.2

-   First published version

### 0.0.1

-   In development stage

## License

The MIT License (MIT)

Copyright (c) 2018-2019 forelleblau marceladam@gmx.ch

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
