![Logo](admin/schwoerer-ventcube.png)
# ioBroker.schwoerer-ventcube

[![NPM version](http://img.shields.io/npm/v/iobroker.schwoerer-ventcube.svg)](https://www.npmjs.com/package/iobroker.schwoerer-ventcube)
[![Downloads](https://img.shields.io/npm/dm/iobroker.schwoerer-ventcube.svg)](https://www.npmjs.com/package/iobroker.schwoerer-ventcube)
[![Dependency Status](https://img.shields.io/david/Excodibur/iobroker.schwoerer-ventcube.svg)](https://david-dm.org/Excodibur/iobroker.schwoerer-ventcube)

![Number of Installations (latest)](http://iobroker.live/badges/schwoerer-ventcube-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/schwoerer-ventcube-stable.svg)

[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/Excodibur/ioBroker.schwoerer-ventcube.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Excodibur/ioBroker.schwoerer-ventcube/context:javascript)
![Github release status](https://github.com/Excodibur/iobroker.schwoerer-ventcube/workflows/Build%2C%20Test%20and%20Release/badge.svg)
[![Travis-CI](http://img.shields.io/travis/excodibur/ioBroker.schwoerer-ventcube/master.svg)](https://travis-ci.org/Excodibur/ioBroker.schwoerer-ventcube)

[![NPM](https://nodei.co/npm/iobroker.schwoerer-ventcube.png?downloads=true)](https://nodei.co/npm/iobroker.schwoerer-ventcube/)

## schwoerer-ventcube adapter for ioBroker

Adapter for Schwoererhaus Ventcube system. More information about Ventcube Fresh can be found [here](https://www.bauinfocenter.de/lueftung/lueftungsanlagen/).

**Disclaimer**: This adapter is neither developed nor officially supported by the company [Schwoererhaus KG](https://www.schwoererhaus.de/) which distributes the Ventcube system. Instructions should be followed with care and at your own risk.

### Preconditions
In order to access the network-interface of Ventcube the following (known) preconditions need to be met:
- The Ventcube needs to be connected to your internal network (usually via network-cable)
- Modbus TCP interface needs to be supported (Control-Panel: >= V1.05, VentCube: >= V02.11) and often has to be enabled manually first
    * On Control Panel login to "Service" section (use standard password from docs)
	* In Basic Settings check that Network Connection is established and "9. Network Interface" and "10. Modbus TCP" are both active.
	* If the last two settings are not active, activate them and restart the Ventcube (e.g. by cutting the power temporarily)

### Configuration parameters
Depending on the building-specific Ventcube setup not all parameters that can be retrieved from or changed via the Ventcube interface will be used. Each parameter in the "parameters" folder goes side-by-side with an entry in the "lastUpdate" folder that indicates the last fetch timestamp for each parameter.

All parameters mentioned in the specification referenced below were added to the adapter and can be accessed via ***Advanced Functions*** option that is configurable during adapter deployment. Enabling this option will cause the adapter to periodically retrieve data for 100+ parameters, of which most might not be used in common households. Test scope was limited to ***Basic Functions*** (enabled by default).

The following default config-values likely will need to be changed during adapter deployment for it to connect to Ventcube properly:
| Parameter   | Default Value | **Should be** | Explanation |
|-------------|---------------|---------------|-------------|
| `Server`    | localhost | ***HERMES-LT*** or ***local network IP of Ventcube*** | Default value is used for tests and definitely needs to be changed! |
| `Port`      | 10502 | ***502*** | Default value is used for tests and definitely needs to be changed! |
| `Interval`  | 30 | 30 | After how many seconds should metrics be refreshed from server |
| `Request Timeout` | 5000 | 5000 | How many milliseconds to wait until requests to Ventcube time out |
| `Reconnection Attempts` | 10 | 10 | In case connection is lost to Ventcube, how many times a reconnect should be attempted |
| `Delay between reconnection attempts` | 10000 | 10000 | How long to wait between reconnection attempts (in milliseconds) |
| `Advanced Functions` | &#10003; | | While basic functions might be sufficient if Ventcube is just used for air ventilation, advanced functions should be activated if heating/cooling functions, or system metrics (error codes, fan details) are needed. |

#### Interesting functions (to start with)
- ***Betriebsart***, changeable
- ***Stoßlüftung*** (30 minute level 4 air burst), changeable
- ***Ist Temp Raum 1*** (temperature inside house)
- ***T10 Außentemperatur***

### Reference system
The ioBroker adapter was tested sucessfully with:

| Control Panel | Ventcube | Modbus specification              |
|---------------|----------|-----------------------------------|
| V01.10        | V02.26   | Parameterliste_Modbus_TCP_03.2020 |

## License
MIT License

Copyright (c) 2020 Excodibur <non@existant.com>

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