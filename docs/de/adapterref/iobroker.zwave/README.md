![Logo](media/zwave.png)
# ioBroker zwave Adapter
==============

[![NPM version](http://img.shields.io/npm/v/iobroker.zwave.svg)](https://www.npmjs.com/package/iobroker.zwave)
[![Downloads](https://img.shields.io/npm/dm/iobroker.zwave.svg)](https://www.npmjs.com/package/iobroker.zwave)

[![NPM](https://nodei.co/npm/iobroker.zwave.png?downloads=true)](https://nodei.co/npm/iobroker.zwave/)

Zwave support with openzwave.

For this adapter is used rather good supported npm module: https://github.com/OpenZWave/node-openzwave-shared
You should find out what the name has USB port of the Z-Wave stick and setup it in the adapter settings.

## Important Information
- On first run, the Adapter needs some time, to calculate all Objects within iobroker.
- If you add a Device, let the adapter do it's job and wait a little bit.
- If a Device is not visible within the included Admistration Site, it's not fully imported into ioBroker.

## Installation
First of all, Implementation is tested only on ARM Linux (e.g. Raspberry Pi (2)).
You need a fully Development Environment (gcc, make,...)

### Install additional packages
On some systems it will be necessary to install additional packages. Therefore run the following on the console before installing the adapter:
```bash
apt-get install pkg-config libudev-dev build-essential curl unzip
```

### Raspberry Pi3 only: Activate GPIO UART
On Raspberry Pi 3, the UART is by default occupied by the bluetooth module. To activate it for use with a GPIO module, follow these steps:

1. `sudo nano /boot/cmdline.txt`
	1. remove `console=serial0,115200`
	1. save the file and close it

2. `sudo nano /boot/config.txt`  
Look for each of the following lines. If they are commented out with a `#`, remove that. If they don't exist, add them to the end of the file:
	* `dtoverlay=pi3-miniuart-bt`
	* `enable_uart=1`
	* `force_turbo=1`

3. reboot

### First start
The GPIO module usually has an address like `/dev/ttyAMA0` or `/dev/ttyACM0`.
The USB stick can be found under `/dev/ttyUSB0` or `/dev/ttyUSB1`.

- Go into iobroker admin and add the Zwave Adapter (the installation is rather long, be patient)
- Start the new zwave Adapter instance and select the controller device's address from the dropdown in the admin UI.
- If your device is not detected, check it or try to manually enter its address when the adapter is turned off.
- Wait until the indicator in the "Instances" tab turns green or the message "zwave.0 Scan completed" is found in the iobroker log.

### Known issues
If you get the following (or similar) error after starting the adapter
```
libopenzwave.so.1.4: cannot open shared object file: No such file or directory
```

you can fix it by running
```
sudo ldconfig
```
or
```
sudo ldconfig /usr/local
```
or
```
sudo ldconfig /usr/local/lib64
```

If all of those commands don't work, the following process might:
1. `sudo nano /etc/ld.so.conf.d/zwave.conf`
	1. enter `/usr/local/lib64`
	1. quit the editor with `CTRL+X`, confirm with `Y` to save the changes
	
1. `sudo ldconfig`

## Configuration
Within Admin Settings you can set following Attributes

- Force objects re-init (ReInitialize all Objects within ioBroker)
- USB name (the USB Port of your Z-Wave stick)
- Logging (enable logging to OZW_Log.txt)
- Console Output (copy logging to the console, Logs all to ioBroker.log)
- Save Config (write an XML network layout create a /zwcfg_<HOMEID>.xml on linux)
- Driver Attempts (try this many times before giving up)
- Poll Interval (interval between polls in milliseconds)
- Suppress Refresh (do not send updates if nothing changed)

![admin-settings](img/admin-settings.png)

## Logfiles / Configuration Settings
If you have installed iobroker into default Folder:

 - Logfile: /opt/iobroker/node_modules/iobroker.zwave/node_modules/openzwave-shared/OZW_Log.txt on linux
 - Configuration: /opt/iobroker/node_modules/iobroker.zwave/node_modules/zwcfg_<HOMEID>.xml on linux

## Device add or remove
If you add or remove a device, it takes 60 seconds. Then the page is automatically reloaded.

If you change the Name or Location, it takes 5 seconds. Then the page is automatically reloaded.

## Features
Within OpenZWave Configurator you can see all Nodes and their classes.

Following Actions are current supported (only with context menu):

- Set Name and Set Location for Node itself
- Change Value of a class

Following global Actions are current supported:

- Add Nodes
- Remove Nodes
- Refresh Nodes (Refresh Nodes from ioBroker Communication)

## Todo
### ZWave Specific

- Scenes
- Group Management
- Polling
- Controller Commands
- Configuration Commands

### Global

- Test more Hardware
- Move config and logfile into iobroker default path (/opt/iobroker/log, /opt/iobroker/data/files/zwave)
- Language Support (English, German, Russian)

## Tested Hardware
### ZWave

- ZME_UZB1 USB Stick
- RazBerry GPIO Board for RaspBerry (1/2)

### Fibaro

- FGBS001 Universal Binary Sensor
- FGS222 Double Relay Switch 2x1.5kW
- FGWPE Wall Plug
- FGSS001 Smoke Sensor
- FGMS001 Motion Sensor
- FGS-223 Double Switch 2
- FGR-222 Roller Shutter 2
- FGDW-002 Door/Window Sensor 2

### Danfoss

- Danfoss Living Connect Room Thermostat (type 0003, id 8010)
- Danfoss Z Thermostat 014G0013

## Changelog

### 1.2.0 (2018-07-25)
* (AlCalzone) Forbidden chars in state IDs are replaced

### 1.1.0 (2018-05-01)
* (AlCalzone) Use new OZW version for compatibility with NodeJS 10

### 1.0.0 (2018-01-31)
* (AlCalzone) Simplified resolving the location of the JS-Controller

### 0.9.0 (2017-10-28)
* (AlCalzone) Fixed lifeline detection in admin UI
* (AlCalzone) Updated buttons to match their behaviour in OZW
* (AlCalzone) Only set adapter status to green after OZW is done initializing
* (AlCalzone) Fixed hard reset: also delete all nodes from ioBroker
* (Pmant/AlCalzone) Parse decimal values into floats, not strings

### 0.8.0 (2017-07-12)
* (Apollon77) Update to Openzwave-shared 1.4

### 0.7.0 (2017-07-12)
* (Pmant/AlCalzone) Several fixes and add association ui

### 0.6.0 (2017-05-01)
* (Pmant) Support secure devices

### 0.5.2 (2017-04-05)
* (AlCalzone) improved handling of instance status objects

### 0.5.0 (2017-01-08)
* (bluefox) Update openzwave-shared
* (ekarak) Change install process

### 0.4.4 (2016-11-27)
* (AlCalzone) Fix enumeration values

### 0.4.3 (2016-11-26)
* (bluefox) add state "info.scanCompleted"

### 0.4.2 (2016-11-15)
* (AlCalzone) Read devices from dev and not from serialport

### 0.4.1 (2016-11-14)
* (AlCalzone) Allow set of parameters

### 0.4.0 (2016-11-01)
* (bluefox) Rewrite adapter completely

### 0.2.5 (2015-12-21)
 - (husky-koglhof) Object tree build now on change/added/ready from zwave
 - Default Role/Type/State (needed for history)
 - openzwave-shared 1.1.6
 - last openzwave from github
 - OpenZWave Security

### 0.2.4 (2015-12-05)
 - (husky-koglhof) fixed hardcoded values
   Admin Page can Add / Remove ZWave Devices

### 0.2.3 (2015-11-11)
 - (bluefox) try to fix io-package.json

### 0.2.2 (2015-09-28)
 - (ekarak) API changes for openzwave-shared 1.0.8+

### 0.2.3 (2015-11-11)
 - (bluefox) try to fix io-package.json

### 0.2.2 (2015-09-28)
 - (ekarak) API changes for openzwave-shared 1.0.8+

### 0.2.1 (2015-08-24)
 - (husky-koglhof) Fixed Errors with Config save at OpenZwave Configurator

### 0.2.0 (2015-08-05)
 - (husky-koglhof) Added OpenZWave Configurator, changed Dependency from openzwave to openzwave-shared, Implemented stateChange, objectChange Functions, Implemented extended Settings

### 0.1.0 (2015-01-03)
 - enable npm install.

### 0.0.9 (2014-11-22)
 - Support of new naming concept.

### 0.0.8 (2014-10-31)
 - Fix names of classes.

### 0.0.6 (2014-10-30)
 - Show in config found tty ports.

### 0.0.3 (2014-10-30)
 - Classify channels.

### 0.0.2 (2014-10-28)
 - Initial commit. Still non-functional.

## License

Copyright (c) 2014-2018 bluefox <dogafox@gmail.com>, husky-koglhof <husky.koglhof@icloud.com>

SOFTWARE NOTICE AND LICENSE

OpenZWave is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published
by the Free Software Foundation, either version 3 of the License,
or (at your option) any later version.

OpenZWave is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with OpenZWave.  If not, see <http://www.gnu.org/licenses/>.
