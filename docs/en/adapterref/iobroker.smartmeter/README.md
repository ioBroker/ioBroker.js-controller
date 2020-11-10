![Logo](admin/smartmeter.png)
# ioBroker.smartmeter

[![Greenkeeper badge](https://badges.greenkeeper.io/Apollon77/ioBroker.smartmeter.svg)](https://greenkeeper.io/)

![Number of Installations](http://iobroker.live/badges/smartmeter-installed.svg) ![Number of Installations](http://iobroker.live/badges/smartmeter-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.smartmeter.svg)](https://www.npmjs.com/package/iobroker.smartmeter)
[![Downloads](https://img.shields.io/npm/dm/iobroker.smartmeter.svg)](https://www.npmjs.com/package/iobroker.smartmeter)
[![Code Climate](https://codeclimate.com/github/Apollon77/ioBroker.smartmeter/badges/gpa.svg)](https://codeclimate.com/github/Apollon77/ioBroker.smartmeter)

**Tests:** Linux/Mac: [![Travis-CI](http://img.shields.io/travis/Apollon77/ioBroker.smartmeter/master.svg)](https://travis-ci.org/Apollon77/ioBroker.smartmeter)
Windows: [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Apollon77/ioBroker.smartmeter?branch=master&svg=true)](https://ci.appveyor.com/project/Apollon77/ioBroker-smartmeter/)

[![NPM](https://nodei.co/npm/iobroker.smartmeter.png?downloads=true)](https://nodei.co/npm/iobroker.smartmeter/)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to me as the developer.** More details see below!

This adapter for ioBroker allows the reading and parsing of smartmeter protocols that follow the OBIS number logic to make their data available.

***The Adapter needs nodejs 8.x+ to work!***

***This Adapter needs to have git installed currently for installing!***

## Description of parameters

ioBroker-Forum-Thread: http://forum.iobroker.net/viewtopic.php?f=23&t=5047&p=54973

### Data Protocol
Supported Protocols:
* **Sml**: SML (Smart Message Language) as binary format
* **D0**: D0 (based on IEC 62056-21:2002/IEC 61107/EN 61107) as ASCII format (binary protocol mode E not supported currently)
* **Json-Efr**: OBIS data from EFR Smart Grid Hub (JSON format)

### Data Transfer
* **Serial Receiving**: receive through serial push data (smartmeter send data without any request on regular intervals). Mostly used for SML
* **Serial Bi-Directional Communication**: D0 protocol in modes A, B, C and D (mode E curently NOT supported!) with Wakeup-, Signon-, pot. ACK- and Data-messages to read out data (programing/write mode not implemented so far)
* **Http-Requests**: Read data via HTTP by requesting an defined URL
* **Local Files**: Read data from a local file

### Data request interval
Number of seconds to wait for next request or pause serial receiving, value 0 possible to restart directly after finishing one message,

Default: is 300 (=5 Minutes)

### Serial Device Baudrate
baudrate for initial serial connection, if not defined default values per Transport type are used (9600 for SerialResponseTransprt and 300 for SerialRequestResponseTransport)

### D0: SignOn-Message Command
Command for SignIn-Message, default "?" to query mandatory fields, other values depending on device.
Example: The 2WR5 Heatmeter uses "#" to query a lot more data (optional fields together with all mandatory)

### D0: Mode-Overwrite
The Adapter tries to determine the D0 Protocol mode as defined in the specifications. There are some devices that do not comply to the specifications and so bring problems. Using this option you can overwrite the determined protocol mode.
* Mode A: no baudrate changeover, no Ack-Message
* Mode B: baudrate changeover, no Ack-Message
* Mode C: baudrate changeover and Ack-Message needed
* Mode D: No baudrate changeover, baudrate always 2400
* Mode E: baudrate changeover and Ack-Message needed, Custom protocols, not Supported currectly!! Contact me if you have such an smartmeter

### D0: Baudrate-Changeover-Overwrite
The adapter tries to determine the Baudrate for the data messages as defined in the protocol specifications. But as with the Mode some smartmeter provide wrong data here. SO you can use this to overwrite the baudrate for the data message as needed. Leave empty to use the baudrate changeover as defined by the smart meter.

## Adapter is tested with ...
... at least:
* Hager eHz Energy Meter (multiple, e.g. eHZ-IW8E2A5L0EK2P, EHZ363W5, )
* EMH Energy Meter
* EFR SmartGridHub
* Siemens 2WR5 reader from an heat station
* Elster AS1440
* Iskraemeco MT174
* Iskraemeco MT175
* Itron EM214 Typ 720
* Landis & Gyr E220
* Dutch smart meter using DSRM protocol (use "Serial Device reading data only" and "D0" as protocol)
* DZG DWS7412.1T
    * *IMPORTANT*: There seems to be a Firmware bug and sometimes the current energy consumptions becomes negative! Manual recalculation possible using formular from https://github.com/Apollon77/smartmeter-obis/issues/75#issuecomment-581650736* ... and many many more

Please send me an info on devices where you have used the library successfully and I will add it here.

## Special Smartmeters and problems

### DZG DVS74
It seems to be an error in the SML firmware sometimes and values are wrongly encoded in the SML message, but the message itself is valid. Solution is to post process the value using a Javascript. See https://github.com/Apollon77/smartmeter-obis/issues/75#issuecomment-581650736

## How to report issues and feature requests

Please use GitHub issues for this.

Best is to set the adapter to Debug log mode (Instances -> Expert mode -> Column Log level). Then please get the logfile from disk (subdirectory "log" in ioBroker installation directory and not from Admin because Admin cuts the lines). If you do not like providing it in GitHub issue you can also send it to me via email (iobroker@fischer-ka.de). Please add a reference to the relevant GitHub issue AND also describe what I see in the log at which time.

## What is Sentry and what is reported to the servers?
Sentry.io is a way for developers to get an overview about errors from their applications. And exactly this is implemented in this adapter.

When the adapter crashes or an other Code error happens, this error message that also appears in the ioBroker log is submitted to our own Sentry server hosted in germany. When you allowed iobroker GmbH to collect diagnostic data then also your installation ID (this is just a unique ID **without** any additional infos about you, email, name or such) is included. This allows Sentry to group errors and show how many unique users are affected by such an error. All of this helps me to provide error free adapters that basically never crashs.  


## Changelog

### 3.1.5 (2020-09-21)
* (Apollon77) update dependencies to prevent some crash cases and optimize tcp mode

### 3.1.3 (2020-07-20)
* (Apollon77) update dependencies to prevent some crash cases

### 3.1.2 (2020-04-12)
* (Apollon77) catch errors when no memory is available anymore and stop processing

### 3.1.1 (2020-03-11)
* (Apollon77) fix admin when switching to TCPTransport
* (Apollon77) bugfixes and optimizations

### 3.1.0 (2020-03-08)
* (Apollon77) bugfixes and optimizations
* (Apollon77) experimental TCP support, please give feedback

### 3.0.10 (2020-02-05)
* (Apollon77) make sure HTTP based smartmeters are also polled frequently when responses are invalid
* (Apollon77) other optimizations
* (Apollon77) Switch Sentry to iobroker own instance hosted in germany

### 3.0.8 (2019-12-20)
* (Apollon77) errors prevented when stopping to process data

### 3.0.7 (2019-12-18)
* (Apollon77) errors prevented when stopping to process data

### 3.0.6 (2019-12-07)
* (Apollon77) serial port configuration further optimized
* (Apollon77) update smartmeter-obis lib to fix some edge case errors and serial close handling

### 3.0.3 (2019-11-30)
* (Apollon77) serial port configuration further optimized

### 3.0.2 (2019-11-29)
* (Apollon77) Fix use of "/dev/serial/by-id" paths on linux if available

### 3.0.1 (2019-11-27)
* (Apollon77) BREAKING CHANGE: Supports nodejs 8.x+ only, up to 12.x
* (Apollon77) support compact mode
* (Apollon77) update to latest library versions to fix problems and add special handling for some smart meters with broken firmware
* (Apollon77) Use "/dev/serial/by-id" paths on linux if available; add port selection to Admin
* (Apollon77) Add Sentry for error reporting

### 2.0.0 (2019-03-22)
* (Apollon77) BREAKING CHANGE: State names changed because * no longer supported. Is replaced by __ now because of possible collisions in state names with only one _

### 1.2.2 (2018-11-11)
* Update smartmeter library, fix HTTP-JSON-Transport

### 1.2.1 (2018-06-23)
* BREAKING CHANGE: State names changed because * no longer supported. Is replaced by _

### 1.1.3 (2018-04-13)
* Fix Admin

### 1.1.2 (26.03.2018)
* Add better support for devices with more then 16 values (OpenSML Library upgrade)

### 1.1.0 (31.01.2018)
* Allow multiple queries for D0 and Serial-Bidirectional communication
* a lot of bugfixing and Optimizations
* Switch to Serialport 6.0.4 to hopefully get more stable (less/no SIGSEGV/SIGABRT ...)

### 1.0.0 (25.08.2017)
* Update smartmeter library and fix some timing issues

### 0.5.12 (23.07.2017)
* update SML library

### 0.5.11 (21.06.2017)
* optimize D0 handling and add support for Dutch smartmeter using DSRM protocol.

### 0.5.8 (06.04.2017)
* optimize Serial handling on Windows (because pause and resume are not supported there)

### 0.5.6 (02.04.2017)
* update library

### 0.5.5 (19.03.2017)
* improved baudrate-changeover logic for D0 protocol (now hopefully finally)
* enhanced D0 protocol support for multiple values

### 0.5.0 (26.02.2017)
* maintenance update

### 0.4.2 (27.02.2017)
* one last try to fix the crashes SIGABRT/SIGSEGV

### 0.4.1 (24.02.2017)
* Fix potential hanging communication with D0 Serial

### 0.4.0 (23.02.2017)
* Optimize for D0 Message handling and baudrate changeovers

### 0.3.2 (22.02.2017)
* Optimize D0 protocol handling for mode E

### 0.3.1 (12.02.2017)
* Finalize Adapter config and added some informations

### 0.3.0 (11.02.2017)
* We now should be quiet stable

### 0.2.x
* Public release of Adapter after forum Tests
* remove all additional logging
* enhance Adapter config screenxw
* Add possibility to overwrite serial connections settings and also D0 Mode for devices that send a wrong identification
* update smartmeter-obis library for memory optimizations

### 0.1.1
* Update smartmeter-obis library to 0.2.5 to add Serial Timeout for Request/Response protocol

### 0.1.0
* Initial version for public testing

### 0.0.1
* Initial version for internal testing


## License

The MIT License (MIT)

Copyright (c) 2017-2020 Apollon77 <ingo@fischer-ka.de>

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
