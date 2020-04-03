<img src="admin/ble.png" height="48" /> ioBroker.ble
=================

![Build Status](https://action-badges.now.sh/AlCalzone/ioBroker.tradfri)

Monitor Bluetooth Low Energy (BLE) beacons and record their information. 
Currently, only recording *advertised* service data is supported. You can monitor which services are advertised by using the nRF Connect app (service data UUIDs).
Connecting and reading/writing service chararcteristics will be supported in a future version.

## Installation
![Number of Installations](http://iobroker.live/badges/ble-installed.svg?break_cache=1) ![Number of Installations](http://iobroker.live/badges/ble-stable.svg?break_cache=1)

This adapter needs additional libraries to compile. See https://github.com/sandeepmistry/noble#prerequisites for detailed instructions.
On Raspberry Pi and similar, this should do it: `sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev libcap2-bin`

If the adapter starts but won't connect to your bluetooth hardware, please check the `info.driverState` state in ioBroker. If it is `unauthorized`, you need to give `node` additional permissions. For Linux, this is as simple as
```bash
sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)
```
which requires `libcap2-bin` to be installed.

## Configuration
If you have multiple bluetooth devices on your system, select the one to use from the dropdown.
In the textbox below, enter all UUIDs of the advertised services you want to record (as found in the nRF Connect app).

## Plugin system
The adapter supports extension via plugins. Those define which advertised services should be listened to and how to translate the data. The plugin structure is defined in https://github.com/AlCalzone/ioBroker.ble/blob/master/src/plugins/plugin.ts and an example of a working plugin is defined here https://github.com/AlCalzone/ioBroker.ble/blob/master/src/plugins/_default.ts

If you have any device transmitting specially encoded information via advertisements, feel free to create a PR with a new plugin for that.

### Supported plugins
* `"xiaomi"`: All xiaomi bluetooth sensors, including 
  * [Flower Care plant sensor](https://xiaomi-mi.com/sockets-and-sensors/xiaomi-huahuacaocao-flower-care-smart-monitor/)
  * [Mijia Temperature and Humidity sensor](https://www.banggood.com/Xiaomi-Mijia-Bluetooth-Thermometer-Hygrometer-with-LCD-Screen-Magnetic-Suction-Wall-Stickers-p-1232396.html?cur_warehouse=USA)
  * [Mosquito Repellent](https://www.aliexpress.com/item/32883859984.html)
* `"mi-flora"`: Original plugin for the flower care plant sensor, now aliased to `"xiaomi"`
* `"ruuvi-tag"`: [Ruuvi Tag](https://tag.ruuvi.com/) multisensor with firmware versions v1 and v2. **Untested, please give feedback!** 

## Changelog
<!--
	Placeholder for next release:
	### __WORK IN PROGRESS__
-->

### 0.11.0 (2020-03-25)
* (AlCalzone) Removed compact support. `noble` sometimes throws errors in callbacks that cannot be handled and would bring the whole compact group down.
* (AlCalzone) Added support for the Xiaomi Kettle
* (AlCalzone) Encrypted packets are no longer decoded (for now) to avoid creating thousands of `unknown (0xabcd)` states

### 0.10.1 (2019-10-13)
* (AlCalzone) Fixed crash in JS-Controller 2.0

### 0.10.0 (2019-09-26)
* (AlCalzone) `xiaomi` plugin: test the received data instead of relying on MAC prefixes

### 0.9.2 (2019-09-26)
* (AlCalzone) Add `e7:2e:00` as an alternative mac prefix for MiTemperature

### 0.9.1 (2019-09-22)
* (AlCalzone) Fix compact mode crashes

### 0.9.0 (2019-09-04)
* (AlCalzone) Devices without service data but with manufacturer data are no longer treated as empty
* (AlCalzone) `_default` plugin: Create states for manufacturer data
* (AlCalzone) `ruuvi-tag` plugin: Set `"Ruuvi Tag"` as the default name for the device object

### 0.8.4 (2019-09-03)
* (AlCalzone) `ruuvi-tag` plugin: Fix parsing of data format 3 and 5

### 0.8.3 (2019-08-26)
* (AlCalzone) Add `80:ea:ca` as an alternative mac prefix for FlowerCare

### 0.8.2 (2019-08-14)
* (AlCalzone) Add `3f:5b:7d` as an alternative mac prefix for the Xiaomi watch

### 0.8.1 (2019-07-26)
* (AlCalzone) Added support for the Xiaomi Mosquito Repellent (read-only!)

### 0.7.4 (2019-07-03)
* (AlCalzone) Removed dependency to admin instance on slaves
* (AlCalzone) Several dependency updates

### 0.7.3 (2019-04-05)
* (AlCalzone) Add MiTemperature watch with E-Ink display

### 0.7.2 (2019-04-05)
* (AlCalzone) Add `58:2d:34` as an alternative mac prefix for MiTemperature

### 0.7.0 (2019-02-05)
* (AlCalzone) Support MaterializeCSS (Admin v3)
* (AlCalzone) Support compact mode
* (AlCalzone) Use @iobroker/testing for tests

### 0.6.0 (2018-12-23)
* (AlCalzone) Add NodeJS 10 support
* (AlCalzone) Add an option to disallow new devices

### 0.5.5 (2018-11-29)
* (AlCalzone) Bugfix: Preserving object properties works again

### 0.5.3 (2018-11-23)
* (AlCalzone) Cache objects for a short while instead of retrieving them from ioBroker all the time
* (AlCalzone) Support negative temperatures from Xiaomi devices

### 0.5.2 (2018-03-28)
* (AlCalzone) Fixed `isHandling` for the `ruuvi-tag` plugin

### 0.5.1 (2018-03-28)
* (AlCalzone) Restored accidentally deleted `mi-flora` plugin.

### 0.5.0 (2018-03-27)
* (JonasR & AlCalzone) Added support for the Ruuvi Tag with the `ruuvi-tag` plugin

### 0.4.2 (2018-03-27)
* (AlCalzone) Fixed the parsing of temperature+humidity packets from the Xiaomi temperature sensor

### 0.4.1 (2018-03-24)
* (AlCalzone) Forgot to load legacy `mi-flora` plugin
* (AlCalzone) Fixed an error when a plugin defines no objects

### 0.4.0 (2018-03-24)
* (zuvielx9 & AlCalzone) Support for all Xiaomi bluetooth sensors using the `xiaomi` plugin
* (AlCalzone) reworked plugin system slightly

### 0.3.5 (2018-03-18)
* (AlCalzone) Bugfix: Next attempt at preserving object properties like history and name

### 0.3.4 (2018-01-01)
* (AlCalzone) Bugfix: Keep `history` settings by not overriding existing objects
* (AlCalzone) Bugfix: When plugins return `undefined`, ignore the packet

### 0.3.3 (2017-11-24)
* (AlCalzone) Enable logging of RSSI

### 0.3.2 (2017-09-27)
* (AlCalzone) Add * wildcard for "all services"

### 0.3.1 (2017-09-27)
* (AlCalzone) Bugfix: don't throw error when RSSI state doens't exist

### 0.3.0 (2017-09-27)
* (AlCalzone) Support throttling of RSSI updates

### 0.2.2 (2017-09-27)
* (AlCalzone) Bugfix: Only monitor services from _enabled_ plugins

### 0.2.1 (2017-09-27)
* (AlCalzone) Bugfix: last patch broke the service filtering

### 0.2.0 (2017-09-26)
* (AlCalzone) Modularized the adapter code into a plugin system
* (AlCalzone) Added Mi-Flora plugin

### 0.1.0 (2017-09-06)
* (AlCalzone) Support selection of bluetooth devices

### 0.0.2 (2017-09-06)
* (AlCalzone) Store more information, improved object structure.

### 0.0.1
* (AlCalzone) initial release

## License
The MIT License (MIT)

Copyright (c) 2017-2020 AlCalzone <d.griesel@gmx.net>

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
