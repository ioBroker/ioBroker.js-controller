![Logo](admin/sma-em.png)
# ioBroker.sma-em

![Number of Installations](http://iobroker.live/badges/sma-em-installed.svg) ![Number of Installations](http://iobroker.live/badges/sma-em-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.sma-em.svg)](https://www.npmjs.com/package/iobroker.sma-em)
[![Downloads](https://img.shields.io/npm/dm/iobroker.sma-em.svg)](https://www.npmjs.com/package/iobroker.sma-em)
[![Tests](https://travis-ci.org/CTJaeger/ioBroker.sma-em.svg?branch=master)](https://travis-ci.org/CTJaeger/ioBroker.sma-em)

[![NPM](https://nodei.co/npm/iobroker.sma-em.png?downloads=true)](https://nodei.co/npm/iobroker.sma-em/)

### Info
This adapter reads information from SMA Energy Meter and Sunny Home Manager 2.
It supports the SMA-EMETER-protocol-2.

SMA Energy Meter and Sunny Home Manager 2 multicast datagrams with their energy measurement data to the network every second.
The SMA Energy Meter Adapter receives these multicast messages and stores them as iobroker states.
A single instance of the SMA Energy Meter Adapter detects all SMA Energy Meters and Sunny Home Managers in all connected networks.


![States](docs/en/img/overview.png)

### States in non-extended mode
- Instantaneous values of total active power consumption (pregard) and active power feed-in (psurplus)
- Energy meter values of total active power consumption (pregardcounter) and active power feed-in (psurpluscounter)
- SMA Time Tick counter, Timestamp of last Message received, 
- Serial Number, SUSyID, Software Version of SMA Energy Meter and Sunny Home Manager
- Detailed values for each of the individual phases L1 / L2 / L3 (optional):
  - Instantaneous values of active power consumption (pregard) and active power feed-in (psurplus) per phase
  - Energy meter values of active power consumption (pregardcounter) and active power feed-in (psurpluscounter) per phase
  
### States in extended mode
In addition to the states in non-extended mode, the following values are available in extended mode
- Instantaneous values of total reactive power consumption (qregard) and reactive power feed-in (qsurplus)
- Energy meter values of total reactive power consumption (qregardcounter) and reactive power feed-in (qsurpluscounter)
- Instantaneous values of total apparent power consumption (sregard) and apparent power feed-in (ssurplus)
- Energy meter values of total apparent power consumption (sregardcounter) and apparent power feed-in (ssurpluscounter)
- cosphi (power factor)
- grid frequency (only available with Sunny Home Manager 2, SMA Energy Meter currently does not provide any grid frequency values)
- Detailed for each of the individual phases L1 / L2 / L3 (optional):
  - Instantaneous values of reactive and apparent power consumption/feed-in per phase
  - Energy meter values of reactive and apparent power consumption/feed-in per phase
  - Voltage and Amperage per phase

### Configuration Options

![Settings](docs/en/img/adminpage.png)

- Multicast IP: The default setting is 239.12.255.254. 
- Multicast Port: The default setting for the UDP port is 9522.
  (Both should not be changed, as SMA devices always use this IP address and port)
- Details L1 - L3: These selection options can be used to display details of each phase.
- Extended Mode: Provides more detailed information such as reactive power, apparent power, cosphi, grid frequency, voltage, amperage
  (Do not configure Details L1-L3 and Extended Mode simultaneously since this puts a high load on the ioBroker system)


<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
        
## Changelog
### 0.6.4 (2021-04-14)
* (TGuybrush) Bug fixes
  * Prevent warnings regarding non-existent objects upon adapter instance creation and start-up under js-controller 3.2.x
  * Improved check of SMA Energy Meter multicast messages to prevent ghost devices and warnings regarding unknown OBIS values.

### 0.6.3 (2021-03-04)
* (TGuybrush) The adapter binds now to all external IPv4 addresses.

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

## Legal Notices
SMA and Sunny Home Manager are registered trademarks of SMA Solar Technology AG <https://www.sma.de/en.html>

All other trademarks are the property of their respective owners.

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
