![Logo](admin/comfoair.png)

# ioBroker.comfoair

![Number of Installations](http://iobroker.live/badges/comfoair-installed.svg) ![Number of Installations](http://iobroker.live/badges/comfoair-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.comfoair.svg)](https://www.npmjs.com/package/iobroker.comfoair)
[![Downloads](https://img.shields.io/npm/dm/iobroker.comfoair.svg)](https://www.npmjs.com/package/iobroker.comfoair)

[![NPM](https://nodei.co/npm/iobroker.comfoair.png?downloads=true)](https://nodei.co/npm/iobroker.comfoair/)

An ioBroker adapter for Zehnder Comfoair  'CA' -ventilations (i.e. ComfoAir CA350, NOT ComfoAir Q350...)

To use this adapter, you need a RS232 to LAN oder WiFi Converter to connect ioBroker with your Zehnder Comfoair.
Install hardware for TCP - connection to comfoair: i.e. RS232 to LAN adapter to the serial interface of the comfoair. Connect Pins 2, 3 and 5 only (should work also with TX, RX and GND - contacts of the cc-Ease connection too).
Actually this adapter works only with a LAN-Connection. A direct link based on a direct serial connection is in development.

Install adapter, create instance.

## CCEase and use of the RS232-interface

The comfoair knows 5 different RS232 modes: End/without connection, PC only, CCEase only, PC Master, PC logmode. Default is CCEase only.
The parallel use of CCEase and RS232 results in errors! It is higly recommended to disconnect the CCEase cotrol panel while you're using this adapter or to switch in PC Master mode, what will disabel CCEase too.
A hardware based solution for a data - traffic - switch is in evaluation, support is welcome.

## Config

Set comfoair - IP-adress, port and polling - intervall.

### RS-232 Manual Mode

In this mode you get a rs232mode object in the 'control' and in the 'state' - channel. In the 'control' - channel you can set the RS232 - mode PCMaster and PCLogmode. In PCMaster mode, your CCEase's display will be off an there is no data traffic between the comfoair and the CCEase.
To swicht back to CCEase only mode you have to 'hard-reset' your comfoair (power off - power on).

## Using the adapter

Values of your comfoair should be visible in the 'status' and the 'temperatures' channel.

By setting/changeing values in the 'control' - channel, you control your comfoair ventilation.

Tested on comfoair CA350.

## Changelog

### 0.1.4

-   README-Update 'NO PARALLEL USE', discard 'Safe-Mode'.

### 0.1.3

-   RS - 232 interface: manual- or safe - mode possible.

### 0.1.2

-   ReadME updated, minor bugfixes.

### 0.1.1

-   bugfix ventlevels, reading errors

### 0.1.0

-   ReadME Update

### 0.0.7

-   Core Files/Testing Update and introduce adapter-core

### 0.0.6

-   Filter - change - indicator.

### 0.0.5

-   bugfig set vent levels.

### 0.0.4

-   gets & sets vent levels, gets filter-timer.

### 0.0.3

-   minor bugfixes, sets comfort-temperature and resets filter-hours.

### 0.0.2

-   First running Version. Gets temp, vent, bypass and filter states, sets fan level.

### 0.0.1

-   In development stage, contributions welcome

## License

The MIT License (MIT)

Copyright (c) 2019 forelleblau marceladam@gmx.ch

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
