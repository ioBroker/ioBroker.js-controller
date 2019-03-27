---
BADGE-Build Status Travis: https://travis-ci.org/foxriver76/ioBroker.sonnen.svg?branch=master
BADGE-Build status: https://ci.appveyor.com/api/projects/status/9c3a9qlw4ut32hbu/branch/master?svg=true
BADGE-Number of Installations: http://iobroker.live/badges/sonnen-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.sonnen.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.sonnen.svg
BADGE-NPM: https://nodei.co/npm/iobroker.sonnen.png?downloads=true
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.sonnen/README.md
title: sun adapter
hash: lxJCrd7DQbd7wr05NwFGschEwXwRlMxnxcLgswKIwDg=
---
![logo](../../../de/adapterref/iobroker.sonnen/media/sonnen.png)

# Sun adapter
The sonnen adapter allows the integration of a sonnenBatterie in the ioBroker.

## Overview
### Sunbattery
With the sonnenBatterie self-generated energy from the solar system can be stored for personal use and used exactly when it is needed. This makes it possible to become independent of anonymous energy companies and even to become a self-sufficient power producer. Thanks to the integrated energy manager, the intelligent high-tech electricity storage unit ensures that the household is supplied with its own power in the best possible way.
This is not only cost effective, but also environmentally friendly! The sonnenBatterie is available in various and flexible memory models.

### Sun adapter
The sun adapter can monitor and control a solar battery in the network. The Discovery Adapter (TODO: Link) allows solar batteries to be found on the network automatically. <br/> The adapter creates states for monitoring and controlling the sun battery in the form of objects. A large part of the states only serves to monitor the battery, while describing some states, the battery can be additionally controlled.

## Prerequisites before installation
The prerequisite for operating a solar battery with the ioBroker is the successful installation of the battery by an electrician. Also, the battery must be in the same network as the ioBroker.

### Installation
An instance of the adapter is installed via the ioBroker Admin interface. The detailed instructions for the necessary installation steps can be found here (TODO: LINK). <br/><br/> After completing the installation of an adapter instance, a configuration window opens automatically.

## Configuration
### Main Settings Window
![Main Settings](../../../de/adapterref/iobroker.sonnen/media/mainSettings.png "main settings")

| Field | Description |
|:-------------|:-------------|
| IP address | Here, the IP address of the desired solar battery should be specified. |

### "Advanced Settings" window
![Advanced Settings](../../../de/adapterref/iobroker.sonnen/media/advancedSettings.png "Advanced settings")

| Field | Description |
|:-------------|:-------------|
| Query Interval | Here an alternative value in milliseconds can be set. In this interval, the states of the sun battery are updated |

After completing the configuration, the configuration dialog is quit with `SPEICHERN UND SCHLIEßEN`.
This will result in a subsequent restart of the adapter.

## Instances
The installation of the adapter has created an active instance of the sun adapter in the area `Objekte`. <br/><br/> ![instance](../../../de/adapterref/iobroker.sonnen/media/instance.png "instance") <span style="color:grey">* First instance *</span>

On a ioBroker server several sun adapter instances can be created. Conversely, a solar battery can also be operated with several ioBroker servers. If several devices are to be controlled by one ioBroker server, one instance should be created per battery. <br/><br/> Whether the adapter is activated or connected to the battery is indicated by the color of the status field of the instance. If the mouse pointer points to the symbol, further detailed information is displayed.

## Objects of the adapter
In the section `Objekte`, all devices and activities recognized by the adapter in the hub are listed in a tree structure. In addition, information is also provided as to whether the communication with the hub takes place smoothly.

![objects](../../../de/adapterref/iobroker.sonnen/media/objects.png "sunning objects") <span style="color:grey">* objects of the sun adapter *</span>

Subsequently, the objects are divided into states and buttons. Since there are two different APIs depending on the battery, only the states that are supported by the respective battery are created.
Each data point is associated with its associated data type and permissions.
Permissions can be read (R) as well as write (W). Each data point can at least be read (R) while others can also be described. To search for a specific data point, the search is recommended using the key combination "CTRL + F".

### States
#### Channel: info
* info.connection

|     | Data type | authorization |
|     |:---:|:---:|
|     | Boolean | R |

   * Read only Boolean value, which is true if the connection between ioBroker and battery is made. *

* info.lastSync

|     | Data type | authorization |
|     |:---:|:---:|
|     | Timestamp | R |

   * Read-only timestamp, updated every time the data is updated. *

#### Channel: status
* status.consumption

|     | Data type | authorization |
|     |:---:|:---:|
|     | Number | R |

   * Read only number value, which contains the current consumption of the house in Watt. *

* status.production

|     | Data type | authorization |
|     |:---:|:---:|
|     | Number | R |

   * Read only number value, which indicates how many watts are currently being produced by the PV system. *

* status.pacTotal

|     | Data type | authorization |
|     |:---:|:---:|
|     | Number | R |

* Read only number value, which indicates the inverter AC power.
If the value is greater than 0, the battery is discharged, with a value less than 0, charged. *

* status.relativeSoc

|     | Data type | authorization |
|     |:---:|:---:|
|     | Number | R |

   * Read only number value representing the current battery level. *

* status.userSoc

|     | Data type | authorization |
|     |:---:|:---:|
|     | Number | R |

   * Read only number value representing the current battery level. *

* status.acFrequency

|     | Data type | authorization |
|     |:---:|:---:|
|     | Number | R |

   * Read only number value, which represents the AC frequency in Hertz. *

* status.acVoltage

|     | Data type | authorization |
|     |:---:|:---:|
|     | Number | R |

   * Read only number value, which represents the current AC (AC) current voltage of the inverter. *

* status.batteryVoltage

|     | Data type | authorization |
|     |:---:|:---:|
|     | Number | R |

   * Read only number value, which represents the current DC (DC) voltage of the battery. *

* status.systemTime

|     | Data type | authorization |
|     |:---:|:---:|
|     | Date | R |

   * Read only ISO date representing the system time of the battery. *

* status.systemInstalled

|     | Data type | authorization |
|     |:---:|:---:|
|     | Boolean | R |

   * Read only Boolean value, which is true if the system is installed correctly. *

* status.batteryCharging

|     | Data type | authorization |
|     |:---:|:---:|
|     | Boolean | R |

   * Read only Boolean value. This is true if the sun battery is currently charging. *

* status.flowConsumptionBattery

|     | Data type | authorization |
|     |:---:|:---:|
|     | Boolean | R |

   * Read only Boolean value. This is true if the battery is currently being discharged. *

* status.flowConsumptionGrid

|     | Data type | authorization |
|     |:---:|:---:|
|     | Boolean | R |

   * Read only Boolean value, which is true if power is currently sourced from the grid. *

* status.flowConsumptionProduction

|     | Data type | authorization |
|     |:---:|:---:|
|     | Boolean | R |

   * Read only Boolean value. This is true if power is currently consumed directly from the PV system. *

* status.flowGridBattery

|     | Data type | authorization |
|     |:---:|:---:|
|     | Boolean | R |

   * Read-only Boolean indicator, which is true if the battery is currently being charged through the network. *

* status.flowProductionBattery

|     | Data type | authorization |
|     |:---:|:---:|
|     | Boolean | R |

   * Read only Boolean value, which is true if the battery is currently being charged directly through the PV system. *

* status.flowProductionGrid

|     | Data type | authorization |
|     |:---:|:---:|
|     | Boolean | R |

   * Read only Boolean value, which is true if the generated power is currently being fed into the grid. *

* status.gridFeedIn

|     | Data type | authorization |
|     |:---:|:---:|
|     | Number | R |

* Read only number value, which represents the amount of power in watts currently being fed into the grid.
If the value is positive, it is currently being fed into the grid; if it is negative, the amount of electricity will be drawn from the grid. *

#### Channel: control
* control.charge

|     | Data type | authorization |
|     |:---:|:---:|
|     | Number | R / W |

   * Number value, which allows to set the maximum discharge of the battery in watts. *

* Note: If an invalid value is set, it will be confirmed anyway. The confirmation (Acknowledge) of the value only means that the command has been transmitted to the battery. *

   * Example: *

```javascript
setState('sonnen.0.control.charge', 1250); // Die Batterie wird mit maximal 1250 Watt geladen
```

* control.discharge

|     | Data type | authorization |
|     |:---:|:---:|
|     | Number | R / W |

   * Number Value, which allows to set the maximum charge of the battery in watts. *

* Note: If an invalid value is set, it will be confirmed anyway. The confirmation (Acknowledge) of the value only means that the command has been transmitted to the battery. *

   * Example: *

```javascript
setState('sonnen.0.control.discharge', 1250); // Die Batterie wird maximal mit 1250 Watt entladen
```

## Changelog
### 1.2.0
* (foxriver76) support of another sonnen api

### 1.1.2
* (foxriver76) bugfix for control states

### 1.1.1
* (foxriver76) add compact mode compatibility

### 1.0.2
* (foxriver76) use adapter-core module

### 1.0.1
* (foxriver76) take timezone offset into account on time states

### 1.0.0
* (foxriver76) formal version increment

### 0.0.8
* (foxriver76) Enhanced debug logging
* (foxriver76) Prevent crashing when a return code is received

### 0.0.7
* (foxriver76) Only set info.connection on change

### 0.0.6
* (foxriver76) Only set states if request was successfull --> prevents adapter crash

### 0.0.5
* (foxriver76) translations on index_m.html
* (foxriver76) use 7000 as interval if poll interval is undefined

### 0.0.3
* (foxriver76) fixed links to bugs, repo etc

### 0.0.2
* (foxriver76) bugfixes on control states
* (foxriver76) big readme update
* (foxriver76) addded more states
* (foxriver76) added advanced settings

### 0.0.1
* (foxriver76) initial release

## License
The MIT License (MIT)

Copyright (c) 2018-2019 Moritz Heusinger <moritz.heusinger@gmail.com>

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