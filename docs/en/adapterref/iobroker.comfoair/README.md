![Logo](admin/comfoair.png)

# ioBroker.comfoair

![Number of Installations](http://iobroker.live/badges/comfoair-installed.svg) ![Number of Installations](http://iobroker.live/badges/comfoair-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.comfoair.svg)](https://www.npmjs.com/package/iobroker.comfoair)
[![Downloads](https://img.shields.io/npm/dm/iobroker.comfoair.svg)](https://www.npmjs.com/package/iobroker.comfoair)

[![NPM](https://nodei.co/npm/iobroker.comfoair.png?downloads=true)](https://nodei.co/npm/iobroker.comfoair/)

An ioBroker adapter for Zehnder Comfoair  'CA' -ventilations (i.e. ComfoAir CA350, NOT ComfoAir Q350...).

## Connection

### By IP / LAN

Use a RS232 to LAN oder WiFi Converter to connect ioBroker with your Zehnder Comfoair.
Install hardware for TCP - connection to comfoair: i.e. RS232 to LAN adapter to the serial interface of the comfoair. Connect Pins 2, 3 and 5 only (should work also with TX, RX and GND - contacts of the cc-Ease connection too).

### Serial CONNECTION

Connect the serial inferface of you comfoair to a serial interface of the device ioBroker is running on. I.e use a RS232toUSB cable or RS232toTTL adapter to connect to the Raspberry Pis UART - pins.

## Config

Choose your preferred connection mode (IP or serial), set comfoair - IP-address and port or specify your serial device, define a (RS232) comfoair connection mode (see 'Adapter & CC Ease') and define a polling - intervall.

## Adapter & CC Ease

In general it is not recommended to send data form 2 transmitters to one receiver in RS232 serial communication. The parallel use of CCEase and adapter can result in errors or, worst case, in damage to your comfoair-control! Therefore, when you start the ComfoAir - adapter your CC Ease should be disconnected or will be shut down.
The comfoair itself knows 4 different rs232-modes: CCEaseonly, PConly, PCMaster, PCLogmode. In PConly and PCMaster, CC-Ease is off.
In the instance - config you can choose one of the following connection - modes. Please tick only one of these! Once the adapter is running in the adapter only or the parallel mode, you're able to switch the rs232-mode of the comfoair (what is not recommended because a specific connection mode needs a specific rs232-mode!).

### Adapter only

CC Ease is disconnected (recommended) or will be shut down when the adapter starts, you can control your comfoair only with ioBroker (rs232mode is PCMaster). This mode is
 default & recommended.

### Listening only

The adapter catches the data sent from the comfoair or the CC Ease. CC Ease is running, no commands can be sent from the adapter. In this mode you get only a basic set of values (temperatures, ventilation states). In this mode, there is also no risk for communication errors/damages, because there is no communication from the adapter to the comfoair.

### Parallel Mode

CC Ease and adapter are running. comfoiar rs232mode is set to 'PCLogmode'. The adapter is 'listening' for basic values (temperatures, ventilation levels) and polling for others (errors, filter timer). Set an extended polling interval to reduce the risk of communication errors. You can control your ComfoAir with ioBroker and with the CC Ease unit. Before a command is sent (polling included) the rs232-mode is switched to PC Master. With every command sent, also a polling is done. Tests have shown errorless - running in parallel for a longer period of time. But: You run this mode on your own risk.

### Parallel Mode in constant PC-logmode

Some users made positive experiences with running the comfoair constantly in PC-Logmode. This mode has the same functionalities as the Adapter only mode but with a running CC Ease. But: You run this mode on your own risk.

## Using the adapter

Values of your comfoair should be visible in the 'status' and the 'temperatures' channel. Please refresh the objects - view after changing the connection mode.

By setting/changing values in the 'control' - channel, you control your comfoair ventilation. All values in the 'control' - channel have to be set with ACK=false to be recognized as commands for the adapter.

Tested on comfoair CA350.

## Changelog

### 1.1.2

-   adapter - internal filter-h counter added

### 1.1.1

-   Periodical self-test with restart in case of fail added

### 1.1.0

-   displays now working hours of different ventilation levels, preheating, bypass and frost-protection.

### 1.0.0

-   offers now the possibility of a direct serial connection besides the connection over IP/LAN.

### 0.3.2

-   Bypass - error bug fixed.

### 0.3.1

-   new connection mode: parallel in constant PC-Logmode.

### 0.3.0

-   new connection modes, i.e. 'listening only', selftest-function and setting filter-timer added.

### 0.2.1

-   smaller bugfixes.

### 0.2.0

-   New rs232 - Modes, reading enthalpie-values, handling connection-errors.

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

-   bugfix set vent levels.

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

Copyright (c) 2021 forelleblau marceladam@gmx.ch

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
