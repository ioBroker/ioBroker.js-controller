<h1>
	<img src="admin/moma.png" width="64"/>
	ioBroker.moma
</h1>

[![NPM version](http://img.shields.io/npm/v/iobroker.moma.svg)](https://www.npmjs.com/package/iobroker.moma)
[![Downloads](https://img.shields.io/npm/dm/iobroker.moma.svg)](https://www.npmjs.com/package/iobroker.moma)
[![Dependency Status](https://img.shields.io/david/AWhiteKnight/iobroker.moma.svg)](https://david-dm.org/AWhiteKnight/iobroker.moma)
[![Known Vulnerabilities](https://snyk.io/test/github/AWhiteKnight/ioBroker.moma/badge.svg)](https://snyk.io/test/github/AWhiteKnight/ioBroker.moma)

[![NPM](https://nodei.co/npm/iobroker.moma.png?downloads=true)](https://nodei.co/npm/iobroker.moma/)

**Tests:** Linux/Mac: [![Travis-CI](http://img.shields.io/travis/AWhiteKnight/ioBroker.moma/master.svg)](https://travis-ci.org/AWhiteKnight/ioBroker.moma)
Windows: [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/AWhiteKnight/ioBroker.moma?branch=master&svg=true)](https://ci.appveyor.com/project/AWhiteKnight/ioBroker-moma/)

## moma adapter for ioBroker

**MoMa** is an adapter for **Mo**nitoring and **Ma**intenance of an ioBroker based home automation installation.
**MoMa** aims at home (automation) installations which are a bit more complex than a single machine running all in one or a small number of machines doing some basic load balancing within one network.

It is not intended as a replacement for administration tools like **Puppet**, **Chef**, **Salt** or **Ansible**.
Those are for large environments with many computers and are capable of remote installation of packages. **MoMa** will only be able to remotely update existing installations, no remote installation and no remote configuration.


I am using it for monitoring my IT-Infrastructure at home (including home automation) and keeping it up to date.


MoMa uses the platform independant library 'systeminformation' (https://github.com/sebhildebrandt/systeminformation) to gather information about the computer. Many of the calls are exposed to be used in timer intervalls - see reference below.

MoMa needs at least nodejs version 8 / ES6.

## Changelog

### 0.1.1 (2019-04-26)
* (AWhiteKnight) First implementation of moma admin-tab. Be careful, the table line buttons are always active!!

### 0.1.0 (2019-04-18)
* (AWhiteKnight) First release for adapter list.

### 0.0.10 (2019-04-18)
* (AWhiteKnight) Reduction of footprint. Restructuring.

### 0.0.9 (2019-04-08)
* (AWhiteKnight) Systeminfolib upgraded to 4.1.1 and added some calls/variables. Testing (re)enabled. Merging to new adapter creation template part 2.

### 0.0.8 (2019-03-10)
* (AWhiteKnight) Started merging to new development method. Maintaining meta states.

### 0.0.7 (2018-10-29)
* (AWhiteKnight) Travis testing activated; Minor enhancements in meta data

### 0.0.6 (2018-10-27)
* (AWhiteKnight) UI text and translations; changed meta-path from moma.x to moma.meta

### 0.0.5 (2018-10-26)
* (AWhiteKnight) Checking for updates in interval 4

### 0.0.4 (2018-10-14)
* (AWhiteKnight) New intervals: 0 with high frequency, 4 daily. Extended configuration

### 0.0.3 (2018-10-02)
* (AWhiteKnight) Basic functions of 'systeminformation' implemented, some documentation

### 0.0.2 (2018-09-30)
* (AWhiteKnight) Library 'systeminformation' integrated. First set of calls implemented

### 0.0.1
* (AWhiteKnight) initial version

## Installation

Use "Adapter - Install from URL" with https://github.com/AWhiteKnight/ioBroker.moma

alternative

npm install iobroker.moma

Works also in multihost environments - ensure that the correct instance is selected before installation.

## Core Concept

still under construction - ideas, proposals, hints, ... are welcome!


Basic idea is to have 
+ a tree for each instance (moma.\<instance-id\>) containing all the informations of the machine the instance is running on. 
+ a common tree (moma.meta) below which every instance creates a device \<hostname\> containing a reference to the instance and some monitoring informations.

## Reference

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
* fsStats - File access statistics
* disksIO - IO statistics of block devices


Following functions of library systeminformation are called in interval 3 (default every hour):
* networkInterfaceDefault - Default network interface
* networkInterfaces - Avilable network interfaces
* graphics - Information about computers graphics cards and connected monitors


Following functions of library systeminformation are called in interval 4 (default every day):
* osInfo - Information about computers operating system
* uuid - UUID's of installation
* shell - Default system shell
* versions - Versions of installed software packages


Following functions of **MoMa** are called in interval 4 (default every day):
* updates - checks for pending updates and shows the amount of updates in moma.meta.\<hostname\>.updates (currently only Ubuntu, Debian, openSUSE, RedHat)
* checkBatteries - checks battery state variables (current implemented state names: LOWBAT, LOW_BAT)


## License
MIT License

Copyright (c) 2019 AWhiteKnight

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