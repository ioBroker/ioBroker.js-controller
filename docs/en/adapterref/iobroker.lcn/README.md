![Logo](admin/lcn.png)
# ioBroker.lcn

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

The configuration and modules will be automatically detected by scan, that must be triggered manually from the configuration dialog and can be repeated any time again.

## Types
Following read and write groups are supported:
- Analog values (output/input)
- Relays (output)
- Sensors (input)
- LEDs (output / input)
- Variables (input)

## Variables
To apply the valid convert functions to variables, the variables must have the valid roles. Following roles are supported:

- **value.temperature** - temperature in celsius
- **value.brightness** - Lux (I- input) in lux
- **value.speed.wind** - wind speed in m/s
- **value.voltage** - voltage in Volt
- **value.current** - current in Ampere
- **value.sun.azimuth** - sun azimuth
- **value.sun.elevation** - sun elevation

## Settings
- Reconnect interval(sec) - how often adapters tries to connect. Default ever 30 seconds. 
- Connect timeout(ms) - how long adapter waits for connection response inclusive authentication. Default 6 seconds. 
- Scan response timeout(ms) - how long adapter waits for answers by scan of modules.
- Response timeout(ms) - timeout for control commands
- Ping Interval(sec) - how often adapter sends ping requests 
- Ping response timeout(ms) - timeout for ping requests
- IN/OUT Relays are the same - if the "out" and "in" relays are the same thing or if these relays are different ones. 
```
// =====================  Same relays =============================
//                                    +-------+
// ----------------- OUT -----------> |       |
//                                    | Relay |
// <----------------- IN ------------ |       |
//                                    +-------+
// 
// 
// ======================  Different relays =======================
//                                    +-------+
//                                    |       |
// ----------------- OUT -----------> | Relay |
//                                    |       |
//                                    +-------+
// 
//                                    +--------+
//                                    | Sensor |
// <----------------- IN ------------ |   or   |
//                                    | Relay  |
//                                    +--------+
```

## How to use
After the first start the devices must be scanned. It can be done in the configuration dialog with scan button

![scan](img/scanButton.png)

## ToDO
- Configuration dialog to define type of variables.

## Changelog
### 0.6.3 (2019-12-18)
* (bluefox) General relays mode implemented

### 0.6.2 (2019-12-07)
* (bluefox) Detected delayed responses
* (bluefox) Dynamical creation of states is implemented

### 0.5.5 (2019-12-05)
* (bluefox) Relay inputs were corrected

### 0.5.4 (2019-12-04)
* (bluefox) Connection indication was corrected

### 0.5.1 (2019-11-29)
* (bluefox) Finger scanner supported
* (bluefox) Added possibility to set the analog mode
* (bluefox) Relay outputs are supported now

### 0.4.4 (2019-11-26)
* (bluefox) Fixed error by parsing of acknowledgement

### 0.4.2 (2019-06-12)
* (bluefox) Support of old measure values was added

### 0.3.2 (2018-11-19)
* (bluefox) add variables support

### 0.2.1
* (bluefox) initial release

## License
CC-BY-NC-4.0

Copyright (c) 2018-2019 bluefox <dogafox@gmail.com>

Up to 10 devices can be connected for free. If you need more devices, you must buy a commercial license.