![Logo](admin/lupusec.png)

# ioBroker.lupusec

[![Travis Build Status](https://travis-ci.org/schmupu/ioBroker.lupusec.svg?branch=master)](https://travis-ci.org/schmupu/ioBroker.lupusec)
[![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.lupusec?branch=master&svg=true)](https://ci.appveyor.com/project/schmupu/ioBroker-lupusec/)
![Stable Version](http://iobroker.live/badges/lupusec-stable.svg) 
![Number of Installations](http://iobroker.live/badges/lupusec-installed.svg) 
[![NPM version](http://img.shields.io/npm/v/iobroker.lupusec.svg)](https://www.npmjs.com/package/iobroker.lupusec) 
[![Downloads](https://img.shields.io/npm/dm/iobroker.lupusec.svg)](https://www.npmjs.com/package/iobroker.lupusec) 
[![NPM](https://nodei.co/npm/iobroker.lupusec.png?downloads=true)](https://nodei.co/npm/iobroker.lupusec/)

**Requires node.js 8.0 or higher and Admin v3!**

This adapter connects the Lupusec alarm system XT1 Plus, XT2, XT2 Plus and XT3 with ioBroker.
The XT1 (without Plus) will not be supported. You can read the status of the Lupusec sensors
like door, windows, water, smoke sensors and the status of the alarm system.
For example, you can turn on switches, control your shutter and arm/disarm the alarm system.

You can find detailed information here: [Lupus](https://www.lupus-electronics.de/en)

## Installation
1. Install the adapter
The easiest way is to configure the lupusec.iobroker adapter via the discovery adapter in ioBroker. The discovery adapter search for the right IP-address of the Lupusec alarm system. The other way is it, to configure it manually

2. Manually configuration of the adapter
Choose the IP-Address or hostname from the Lupusec alarm system. Choose https (recommended) if possible.
For only reading the status, select a user without write access. If you want to change the status
(for example, turn on/off the light or arm/disarm the alarm) pick a user with write access.      
![admin](docs/en/img/lupusec_admin.png)

By default all Lupusec devices will be on the ioBroker object tab  displayed.
Fully supported and individually adapted are following devices:

  - Door contact / window contact (Type 4)
  - Water sensor (Type 5)
  - Panic Button (Type 7)
  - Motion detector / 360 degree motion detector (Type 9)
  - CO sensor (Type 13)
  - Smoke Detector / Heat Detector (Type 14)
  - Siren inside (Type 21)
  - Status Indicator / Mini Indoor Siren (Type 22)
  - Power Switch (Type 24)
  - 1 channel relay with ZigBee repeater (Type 24)
  - 2 channel relay with ZigBee repeater (Type 24)
  - Keypad (Type 37)
  - Glass sensor (Type 39)
  - Siren outside (Type 48)
  - Power Switch Meter (Type 48)
  - Room sensor V1 (Type 54)
  - Heat detector (Type 58)
  - Dimmer (Type 66)
  - Light Switch V2 (Type 66)
  - Hue (Type 74)
  - Roller shutter relay V1 (Type 76)
  - Radiator thermostat (Type 79)
  - Radiator thermostat V2 (Type 79)
  - Light sensor (Type 78)
  - Scenario Switch V2 (Type 81)
  - Shock sensor (Type 93)


The two states apple_home_a1 and lupusec.0.status.apple_home_a2 for the Apple Homekit adapter yahka supported. You can turn in addition to the lupusec states the alarm system for area 1 and 2 on and off.  

If you own a device that is not listed in the list above, please contact me
at Thorsten Stueben <thorsten@stueben.de>.

## Objects
### Lupusec Status
ioBroker offers you the same status objects as in the Lupusec app does.
![lupusec_obj_status](docs/en/img/lupusec_obj_status.png)


### Lupusec Devices 
You find all supported Lupsec sensors and devices under 'devices'. If a device is missing, please contact me.
![lupusec_obj_status](docs/en/img/lupusec_obj_devices.png)
Detailed view of a sensor or device. In this example you see the CO sensor. On CO alarm the state 'alarm_status_ex' change to true and 'alarm_status' change to 'CO'.
![lupusec_obj_status](docs/en/img/lupusec_obj_devices_type09.png)

## Changelog

### 1.1.6 (01.05.2019)
* (Stübi) New feature: you can change the buttons for keypad
* (Stübi) New feature: add push notifications to sensors
* (Stübi) New feature: change switch from switch to push button 
* (Stübi) New feature: now you can change status for tamper, bypass and reporting for sensors

### 1.1.5 (24.04.2019)
* (Stübi) Add buttons for Scenario Switch V2 and Bugfixing

### 1.1.4 (13.04.2019)
* (Stübi) Add device outside alarm
* (Stübi) Add device inside alarm
* (Stübi) Add device PIR motions sensor V2
* (Stübi) Add device glass sensor

### 1.1.3 (10.04.2019)
* (Stübi) New Logo
* (Stübi) Add device Panic Button
* (Stübi) Add status indicator 
* (Stübi) Add sensor Heat detector
* (Stübi) Add shock sensor 
* (Stübi) Add Light Switch V2
 
### 1.1.2 (06.04.2019)
* (Stübi) Add light sensor 
* (Stübi) Add CO sensor
* (Stübi) Add water sensor V2
* (Stübi) Add Radiator thermostat V2
* (Stübi) Add 1 channel relay with ZigBee repeater (Type 24)
* (Stübi) Add 2 channel relay with ZigBee repeater (Type 24)
* (Stübi) If you change the sensor name in the Lupusec App, it will be change in ioBroker too 
* (Stübi) Bugfixing Radiator thermostat V1/V2
* (Stübi) Bugfixing Dimmer
* (Stübi) Bugfixing PD Status (Timer) for relay, power switch
* (Stübi) Bugfixing status switch for rollter/shutter device

### 1.1.1 (27.03.2019)
* (Stübi) Lupusec alarm online status added

### 1.1.0 (23.03.2019)
* (Stübi) Totally redesign of the Lupusec adapter. Node 8 or higher is now required

### 1.0.0 (22.12.2018)
* (Stübi) Support js-controller compact mode
* (Stübi) Changed core adapter
* (Stübi) Add Light sensor (type 78)
* (Stübi) Add Apple home alarm status
* (Stübi) Add dimmer / relais (type 66)
* (Stübi) Bugfixing and new status alarm_ex
* (Stübi) Bugfixing and changing of the polling mechanism
* (Stübi) password will be encrypted. Translation of configuration
* (Stübi) add debug messages
* (Stübi) Hue, room sensor, power switch added
* (Stübi) Fixing error update function
* (Stübi) Improvements and new add/del/update Object function
* (Stübi) Changes of roles and icons added to devices
* (Stübi) Wrong device description removed
* (Stübi) RSSI Status an Device shutter (type 76) supported
* (Stübi) Devices thermostat (type 79) and switch (type 48) supported
* (Stübi) Directory widged deleted
* (Stübi) Port can be added

## Planed
Following things are planed in the future:
* support more sensors / devices
* writing a documentation for every sensor / device

## License
The MIT License (MIT)

Copyright (c) 2018-2019 Thorsten Stueben <thorsten@stueben.de>

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
