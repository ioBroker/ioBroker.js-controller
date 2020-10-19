<h1>
	<img src="admin/moma.png" width="64"/>
	ioBroker.moma
</h1>

[![NPM version](http://img.shields.io/npm/v/iobroker.moma.svg)](https://www.npmjs.com/package/iobroker.moma)
[![Downloads](https://img.shields.io/npm/dm/iobroker.moma.svg)](https://www.npmjs.com/package/iobroker.moma)
![Number of Installations](http://iobroker.live/badges/moma-installed.svg) 
![Stable version](http://iobroker.live/badges/moma-stable.svg)
[![Dependency Status](https://img.shields.io/david/AWhiteKnight/iobroker.moma.svg)](https://david-dm.org/AWhiteKnight/iobroker.moma)
[![Known Vulnerabilities](https://snyk.io/test/github/AWhiteKnight/ioBroker.moma/badge.svg)](https://snyk.io/test/github/AWhiteKnight/ioBroker.moma)

[![NPM](https://nodei.co/npm/iobroker.moma.png?downloads=true)](https://nodei.co/npm/iobroker.moma/)

**Tests:** Linux/Mac/Windows: [![Travis-CI](http://img.shields.io/travis/AWhiteKnight/ioBroker.moma/master.svg)](https://travis-ci.org/AWhiteKnight/ioBroker.moma)

## moma adapter for ioBroker

**MoMa** is an adapter for **Mo**nitoring and **Ma**intenance of an ioBroker based home automation installation.
**MoMa** aims at home (automation) installations which are a bit more complex than a single machine running all in one or a small number of machines doing some basic load balancing within one network.

It is not intended as a replacement for administration tools like **Puppet**, **Chef**, **Salt** or **Ansible**.
Those are for large environments with many computers and are capable of remote installation of packages. **MoMa** will only be able to remotely update existing installations, no remote installation and no remote configuration.


**Attention:**

When using the JavaScript adapter set the "do not register all states on startup" flag to true when you get the error " RangeError: Maximum call stack size exceeded". <br>
When you register all states on startup, every state change event will generate an event to the JavaScript adapter too. Especially for Windows this larger amount of events may become a problem.<br>
Another solution is to increase the time value for interval0.   


MoMa uses the platform independant library 'systeminformation' (https://github.com/sebhildebrandt/systeminformation) to gather information about the computer. Many of the calls are exposed to be used in timer intervalls - see reference below.

MoMa needs at least nodejs version 8 / ES9 / ECMAScript2018.

## Changelog

### 1.2.7 (2020-10-18)
* (AWhiteKnight) remove leading i in names that are not a number, systeminformation lib 4.27.0 

### 1.2.6 (2020-04-27)
* (AWhiteKnight) fix typo, precise error location, systeminformation lib 4.23.6 

### 1.2.5 (2020-04-12)
* (AWhiteKnight) minor bugfixing, prepare stable release 

### 1.2.4 (2020-03-20)
* (AWhiteKnight) bugfixing: issues #45 #42 #24, controller update working again 

### 1.2.3 (2019-11-06)
* (AWhiteKnight) bugfixing, code cleanup 

### 1.2.2 (2019-09-12)
* (AWhiteKnight) ioBroker adapter/controller updates for windows, issue #24 

### 1.2.1 (2019-08-12)
* (AWhiteKnight) Bugfixing on 1.2.0 

### 1.2.0 (2019-07-26)
* (AWhiteKnight) Library 'systeminformation' version 4.14.4, 
                 check for update of Adapters and JS-Controller in Interval 4,
				 dockerInfo, dockerContainers in Interval 3,
				 moma admin-tab with update buttons for os, js-controller, adapters.

### 1.1.0 (2019-05-20)
* (AWhiteKnight) Performance optimization,
				 partial fix of Issu #24,
				 Check internet latency.

### 1.0.0 (2019-05-11)
* (AWhiteKnight) First release for adapter list 'stable'.

### 0.1.0 (2019-04-18)
* (AWhiteKnight) First release for adapter list 'latest'.

### 0.0.1
* (AWhiteKnight) initial version

## Installation

Available in ioBroker repository 'latest'

alternative:

npm install iobroker.moma

Works also in multihost environments - ensure that the correct instance is selected before installation.

**Attention:** Currently you need to install an instance of Admin-Adapter on every slave as workaround. 
The Admin-Adapter does not need to be active!

## Core Concept

still under construction - ideas, proposals, hints, ... are welcome!

Forum: https://forum.iobroker.net/topic/22026/neuer-adapter-iobroker-moma

GitHub: https://github.com/AWhiteKnight/ioBroker.moma

Basic idea is to have 
+ a tree for each instance (moma.\<instance-id\>) containing all the informations of the machine the instance is running on. 
+ a common tree (moma.meta) below which every instance creates a device \<hostname\> containing a reference to the instance and some monitoring informations.
+ an admin tab for maintenance (updates of operating system, js-controller, adapters)

## Reference

An admin tabMoMa is available to start updates or if necessary start a reboot.

Following functions of library systeminformation are called once on startup:
* baseboard - Information about computers motherboard
* chassis - Information about computers chassis
* bios - Information about computers BIOS
* system - Information about computers manufacturer
* cpu - Information about computers CPU
* cpuFlags - CPU flags available
* memLayout - Information about computers memory chips
* diskLayout - Information about computers harddisks


Following functions of library systeminformation are called in interval 0 (default every second):
* time - Actual time, timezone and uptime
* cpuCurrentSpeed - Actual cpu and core frequencies
* networkConnections - Actual network connections
* currentLoad - Actual cpu load
* processes - Process overview with process.list as HTML-table


Following functions of library systeminformation are called in interval 1 (default every 10 seconds):
* mem - Information about memory usage
* cpuTemperature - Temperatures of cpu and cores
* networkStats - Network statistics
* fullLoad - Average load since last boot


Following functions of library systeminformation are called in interval 2 (default every minute):
* battery - State of charge and information about battery
* users - Current user sessions
* fsSize - Information about computers file system
* blockDevices - Connected block devices
* fsStats - File access statistics - not supported with Windows
* disksIO - IO statistics of block devices - not supported with Windows


Following functions of library systeminformation are called in interval 3 (default every hour):
* networkInterfaceDefault - Default network interface
* networkInterfaces - Avilable network interfaces
* graphics - Information about computers graphics cards and connected monitors
* inetLatency - Check internet latency against 8.8.8.8
* dockerInfo - General information on docker - needs an "adduser iobroker docker" on the machine before it will work properly
* dockerContainers - List of all docker Containers - needs an "adduser iobroker docker" on the machine before it will work properly


Following functions of library systeminformation are called in interval 4 (default every day):
* osInfo - Information about computers operating system
* uuid - UUID's of installation
* shell - Default system shell - not supported with Windows
* versions - Versions of installed software packages


Following functions of **MoMa** are called in interval 4 (default every day):
* updates - checks for pending updates and shows the amount of updates in moma.meta.\<hostname\>.updates (currently only Ubuntu, Debian, openSUSE, RedHat)
* checkIob - checks all adapters and the js-controller for available updates 
* checkBatteries - checks battery state variables (current implemented state names: LOWBAT, LOW_BAT)



## License
MIT License

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

Copyright (c) 2020 AWhiteKnight
