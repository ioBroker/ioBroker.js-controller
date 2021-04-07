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

### Firmware check

Once a day adapter will check if a newer firmware is available at KEBA website. This information will be printed to log as warning.

### Passive Mode

Activate this option if you wnat to control your wallbox by your own and yu do not wish this adapter to do some automatics. In this case all subsequent options regarding PV automatics and power limitation will be ignored.

### Load charging sessions

You can check this option to periodically download the latest charging sessions (30) from your wall box.
ATTENTION for users from version v1.1.1 and below: you have to check this option to still receive for charging sessions!

### Refresh Interval

This is the interval in seconds how often the wallbox should be queried for new values. Normally it is not needed (set to 0).
The wallbox continually sends broadcasts that are absolutely sufficient to keep data up to date.

The default value is 30 seconds which is a good balance between the load for the KeConnect and having up-to-date information in ioBroker.

### PV automatics

To charge your vehicle accordingly to a surplus (e.g. by photovoltaics) you can also define states which represent surplus and regard of main power. These value are used to calculate amperage which can be used for charging. By additional values you can define
* a different mimimum amperage than the default 6 A (only needed for e.g. Renault Zoe)
* a value of regard power that may be used to start charging (that means charging will start even if not enough surplus is available - suggested 0 W for 1 phases charging, 500 W to 2000 W for 3 phases charging)
* an increment for amperage (suggested 500 mA)
* a value of regard that may be temporarily used to uphold charging session (that means charging will stop later even if enough surplus is no longer available - starting regard will be added - suggested 500 W)
* minimum duration of charging session (even if surplus is no longer sufficient, a charging session wil llast at least this time - suggested 300 sec)

### power limitation

You can also limit max. power of your wallbox to limit main power. E.g. when running night-storage heaters you might have to respect a maximum power limitation.
If you enter a value, your wallbox will be limited continously to not pass your power limit.
Up to three states of energy meters can be specified for limitation. All values will be added to calculate current consumption.
An extra checkbox is used to specified whether wallbox power is included (in this case wallbox power will be subtracted from the state values).

## Changelog

### 1.1.2 (2021-04-02)
* (Sneak-L8) default state of photovoltaics automatic set to true for new users
* (Sneak-L8) new option to select whether charging sessions list should be downloaded and be saved in states or not, do so only once an hour
             ATTENTION for users from version v1.1.1 and below: you have to check this option to still receive for charging sessions!
* (Sneak-L8) firmware version check
* (Sneak-L8) expanded readme

### 1.1.1 (2021-02-25)
* (Sneak-L8) internal state update prevented recognition of state change

### 1.1.0 (2021-02-20)
* (Sneak-L8) intermediate results saved as states values
* (Sneak-L8) additional power for charging session as state

### 1.0.3 (2021-02-08)
* (Sneak-L8) new options for minimal amerage (e.g. Renault Zoe) and permanent regard value

### 1.0.2
* Added readout of last 30 Charging Sessions from Wallbox; Enabled 'setenergy' State to send and set Charging Goal in Wh to Wallbox

### 1.0.1 (2020-08-20)
* (Sneak-L8) add missing german translation for IP address setting

### 1.0.0 (2020-08-20)
* (UncleSam) change settings layout to material design, first offical version

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
