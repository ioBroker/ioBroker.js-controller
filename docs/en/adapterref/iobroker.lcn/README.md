![Logo](admin/lcn.png)
# ioBroker.lcn
=================

[![NPM version](http://img.shields.io/npm/v/iobroker.lcn.svg)](https://www.npmjs.com/package/iobroker.lcn)
[![Downloads](https://img.shields.io/npm/dm/iobroker.lcn.svg)](https://www.npmjs.com/package/iobroker.lcn)

[![NPM](https://nodei.co/npm/iobroker.lcn.png?downloads=true)](https://nodei.co/npm/iobroker.lcn/)

This adapter allows to connect Local Control Network [LCN](https://www.lcn.eu/) to ioBroker.

## Supported Gateways
- LCN-PKE

![pke](img/lcn-pke.png)

- LCN-PKU with LCN-PCHK

![pke](img/lcn-pku.png)

**Don't forget, that ioBroker.lcn will block one LCN Connection License.**

The configuration and modules will be automatically detected by scan.

## Types
Following read and write groups are supported:
- Analog values (output/input)
- Relays (output)
- Sensors (input)
- LEDs (output / input)
- Variables (input)

## Variables
To apply the valid convert functions to variables, the variables must have valid roles. Following roles are supported:

- value.temperature - temperature in celsius
- value.brightness - Lux (I- input) in lux
- value.speed.wind - wind speed in m/s
- value.current - current in Volt
- value.power - power in Amper
-

## Changelog

### 0.3.0
* (bluefox) add variables support

### 0.2.1
* (bluefox) initial release

## License
CC-BY-NC-4.0

Copyright (c) 2018 bluefox <dogafox@gmail.com>

Up to 10 devices can be connected for free. If you need more devices, you must buy a commercial license.