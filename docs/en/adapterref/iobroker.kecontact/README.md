![Adapter Logo](admin/charger.png)

# ioBroker adapter for KEBA KeContact wallbox

![Number of Installations](http://iobroker.live/badges/kecontact-installed.svg) ![Number of Installations](http://iobroker.live/badges/kecontact-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.kecontact.svg)](https://www.npmjs.com/package/iobroker.kecontact) [![Downloads](https://img.shields.io/npm/dm/iobroker.kecontact.svg)](https://www.npmjs.com/package/iobroker.kecontact) [![Travis](https://img.shields.io/travis/iobroker-community-adapters/ioBroker.kecontact.svg)](https://travis-ci.org/iobroker-community-adapters/ioBroker.kecontact/) [![GitHub issues](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.kecontact.svg)](https://github.com/iobroker-community-adapters/ioBroker.kecontact/issues)

Provides information about the current state of a KEBA KeContact wallbox using its UDP protocol.

## Install

Install this adapter via ioBroker Admin:
1. Open instance config dialog
2. Enter the IP address of your KEBA KeContact wallbox
3. Adjust the refresh interval if needed
4. Save the configuration
5. Start the adapter

## Configuration

### KeContact IP Address

This is the IP address of your KEBA KeContact wallbox.

### Refresh Interval

This is the interval in seconds how often the wallbox should be queried for new values.

The default value is 30 seconds which is a good balance between the load for the KeConnect and having up-to-date information in ioBroker.

### other options

You can also define states for PV optimized charging of car or limiting max. power of main power.

## Changelog
### 0.3.2 (2020-08-04)
* (Sneak-L8) in PV automatics mode wallbox will be disabled as long as no vehicle is plugged

### 0.3.1 (2020-07-23)
* (Sneak-L8) do not start charging when vehicle is plugged even if current is too low for photovoltaics automation

### 0.3.0 (2020-07-21)
* (Sneak-L8) regulate wallbox by PV automatics independant from state curr user

### 0.2.6 (2020-07-20)
* (Sneak-L8) try again to regulate wallbox by currtime instead of curr as suggested

### 0.2.3 (2020-05-24)
* (Sneak-L8) fix call to display PV automatics after vehicle is plugged, fix object in energy meter states

### 0.2.2 (2020-05-13)
* (Sneak-L8) display information about photovoltaics automatic also at begin of charging
* (Sneak-L8) delayed display of photovoltaics automatic when vehicle is plugged (8 sec)

### 0.2.1 (2019-11-14)
* (Sneak-L8) handle values of undefined in getStates
* (Sneak-L8) better recognition of max power function

### 0.2.0 (2019-02-05)
* (Sneak-L8) added automatic regulation by output photovoltaics unit
* (Sneak-L8) added possibility to limit wallbox to keep total power below a limit
* (Sneak-L8) added state to display text on wallbox

### 0.1.0 (2019-01-12)
* (Apollon77) Updated CI testing, update basic files

### 0.0.3 (2017-07-04)
* (UncleSamSwiss) Improved UDP datagram sending
* (UncleSamSwiss) Added all known writable states

### 0.0.2 (2017-06-25)
* (UncleSamSwiss) Improved UDP socket handling (thanks to ehome)
* (UncleSamSwiss) Added reading all known states

### 0.0.1 (2017-06-11)
* (UncleSamSwiss) Initial version

## License

Copyright 2020 UncleSamSwiss

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

## Legal

This project is not affiliated directly or indirectly with the company KEBA AG.

KeConnect is a registered trademark of KEBA AG.
