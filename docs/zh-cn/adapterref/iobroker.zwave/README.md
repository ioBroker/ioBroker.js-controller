---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.zwave/README.md
title: TR: ioBroker zwave Adapter
hash: DFbRqkOUZcuOYRUedUea+lMPrIkDEvq95drsHf88jTg=
---
![TR: Logo](../../../en/adapterref/iobroker.zwave/admin/zwave.png)

![TR: Number of Installations](http://iobroker.live/badges/zwave-stable.svg)
![TR: NPM version](http://img.shields.io/npm/v/iobroker.zwave.svg)
![TR: Downloads](https://img.shields.io/npm/dm/iobroker.zwave.svg)
![TR: NPM](https://nodei.co/npm/iobroker.zwave.png?downloads=true)

TR: # ioBroker zwave Adapter
TR: Zwave support with openzwave.

TR: For this adapter is used rather good supported npm module: https://github.com/OpenZWave/node-openzwave-shared You should find out what the name has USB port of the Z-Wave stick and setup it in the adapter settings.

TR: ## Important Information
TR: - On first run, the Adapter needs some time, to calculate all Objects within iobroker.
TR: - If you add a Device, let the adapter do it's job and wait a little bit.
TR: - If a Device is not visible within the included Admistration Site, it's not fully imported into ioBroker.

TR: ## Installation
TR: First of all, Implementation is tested only on ARM Linux (e.g. Raspberry Pi (2)).
You need a fully Development Environment (gcc, make,...)

TR: ### Install additional packages
TR: On some systems it will be necessary to install additional packages. Therefore run the following on the console before installing the adapter:

```bash
apt-get install pkg-config libudev-dev build-essential curl unzip
```

TR: ### Raspberry Pi3 only: Activate GPIO UART
TR: On Raspberry Pi 3, the UART is by default occupied by the bluetooth module. To activate it for use with a GPIO module, follow these steps:

TR: 1. `sudo nano /boot/cmdline.txt`
TR: 	1. remove `console=serial0,115200`
TR: 	1. save the file and close it

TR: 2. `sudo nano /boot/config.txt`

TR: Look for each of the following lines. If they are commented out with a `#`, remove that. If they don't exist, add them to the end of the file:

TR: 	* `dtoverlay=pi3-miniuart-bt`
TR: 	* `enable_uart=1`
TR: 	* `force_turbo=1`

TR: 3. reboot

TR: ### First start
TR: The GPIO module usually has an address like `/dev/ttyAMA0` or `/dev/ttyACM0`.
The USB stick can be found under `/dev/ttyUSB0` or `/dev/ttyUSB1`.

TR: - Go into iobroker admin and add the Zwave Adapter (the installation is rather long, be patient)
TR: - Start the new zwave Adapter instance and select the controller device's address from the dropdown in the admin UI.
TR: - If your device is not detected, check it or try to manually enter its address when the adapter is turned off.
TR: - Wait until the indicator in the "Instances" tab turns green or the message "zwave.0 Scan completed" is found in the iobroker log.

TR: ### Known issues
TR: If you get the following (or similar) error after starting the adapter

```
libopenzwave.so.1.4: cannot open shared object file: No such file or directory
```

TR: you can fix it by running

```
sudo ldconfig
```

TR: or

```
sudo ldconfig /usr/local
```

TR: or

```
sudo ldconfig /usr/local/lib64
```

TR: If all of those commands don't work, the following process might:

TR: 1. `sudo nano /etc/ld.so.conf.d/zwave.conf`
TR: 	1. enter `/usr/local/lib64`
TR: 	1. quit the editor with `CTRL+X`, confirm with `Y` to save the changes

TR: 1. `sudo ldconfig`

TR: ## Configuration
TR: Within Admin Settings you can set following Attributes

TR: - USB name (the USB Port of your Z-Wave stick)
TR: - Logging (enable logging to OZW_Log.txt)
TR: - Console Output (copy logging to the console, Logs all to ioBroker.log)
TR: - Save Config (write an XML network layout create a /zwcfg_<HOMEID>.xml on linux)
TR: - Driver Attempts (try this many times before giving up)
TR: - Poll Interval (interval between polls in milliseconds)
TR: - Suppress Refresh (do not send updates if nothing changed)

![TR: admin-settings](../../../en/adapterref/iobroker.zwave/img/admin-settings.png)

TR: ## Logfiles / Configuration Settings
TR: If you have installed iobroker into default Folder:

TR:  - Logfile: /opt/iobroker/node_modules/iobroker.zwave/node_modules/openzwave-shared/OZW_Log.txt on linux
TR:  - Configuration: /opt/iobroker/node_modules/iobroker.zwave/node_modules/zwcfg_<HOMEID>.xml on linux

TR: ## Device add or remove
TR: If you add or remove a device, it takes 60 seconds. Then the page is automatically reloaded.

TR: If you change the Name or Location, it takes 5 seconds. Then the page is automatically reloaded.

TR: ## Features
TR: Within OpenZWave Configurator you can see all Nodes and their classes.

TR: Following Actions are current supported (only with context menu):

TR: - Set Name and Set Location for Node itself
TR: - Change Value of a class

TR: Following global Actions are current supported:

TR: - Add Nodes
TR: - Remove Nodes
TR: - Refresh Nodes (Refresh Nodes from ioBroker Communication)

TR: ## Todo
TR: ### ZWave Specific
TR: - Scenes
TR: - Group Management
TR: - Polling
TR: - Controller Commands
TR: - Configuration Commands

TR: ### Global
TR: - Test more Hardware
TR: - Move config and logfile into iobroker default path (/opt/iobroker/log, /opt/iobroker/data/files/zwave)
TR: - Language Support (English, German, Russian)

TR: ## Tested Hardware
TR: ### ZWave
TR: - ZME_UZB1 USB Stick
TR: - RazBerry GPIO Board for RaspBerry (1/2)

TR: ### Fibaro
TR: - FGBS001 Universal Binary Sensor
TR: - FGS222 Double Relay Switch 2x1.5kW
TR: - FGWPE Wall Plug
TR: - FGSS001 Smoke Sensor
TR: - FGMS001 Motion Sensor
TR: - FGS-223 Double Switch 2
TR: - FGR-222 Roller Shutter 2
TR: - FGDW-002 Door/Window Sensor 2

TR: ### Danfoss
TR: - Danfoss Living Connect Room Thermostat (type 0003, id 8010)
TR: - Danfoss Z Thermostat 014G0013

## Changelog

### 2.0.0
* (cburghardt) Added ldconfig to installation and upgraded openzwave. Fixes #99. If this causes issues, please run the ioBroker fixer first!

### 1.7.2
* (cburghardt) Fixed a crash

### 1.7.1
* (cburghardt) Updated openzwave

### 1.7.0
* (cburghardt) Added multi-instance associations

### 1.6.3
* (cburghardt) Update openzwave version
* (cburghardt) Verify that the correct version of openzwave is installed by checking the manufacturer revision
* (cburghardt) Don't refresh the association menu directly after adding or removing for sleeping devices as it is not updated
* (cburghardt) Add `removeFailedNode` command

### 1.6.1
* (cburghardt) Fix issues 75 and 76

### 1.6.0
* (cburghardt) Cleanup obsolete states on startup
* (cburghardt) Added confirmation dialog for hard reset
* (cburghardt) Translation fixes
* (cburghardt) Removed non-existing `getNeighbors` function
* (cburghardt) Display network map
* (cburghardt) Allow manual input of a serial port together with the selection
* (cburghardt) Suppress permission denied warnings during installation

### 1.5.1
* (cburghardt) The *refresh node* command no longer excludes the node

### 1.5.0
* (AlCalzone) Update OpenZWave dependency to version 1.6

### 1.4.2
* (AlCalzone) Also escape spaces in state IDs.

### 1.4.1
* (AlCalzone) Pinned version of OpenZWave to 1.4 because 1.6 is not compatible yet

### 1.4.0
* (AlCalzone) Fixed breaks with OpenZWave 1.6
* (AlCalzone) Switched to new testing
* (AlCalzone) Support for compact mode

### 1.3.2 (2018-11-28)
* (AlCalzone) Replace all chars in state IDs that are forbidden in JS-Controller 1.5+
* (AlCalzone) Include @types/iobroker and strongly type adapter config properties

### 1.3.0
* (AlCalzone) Experimental support for CentralScene

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

Copyright (c) 2014-2019 bluefox <dogafox@gmail.com>, husky-koglhof <husky.koglhof@icloud.com>

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