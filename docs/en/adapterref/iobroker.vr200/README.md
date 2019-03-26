![Logo](admin/VR200.png)
# ioBroker.vr200
![Number of Installations](http://iobroker.live/badges/vr200-installed.svg) ![Number of Installations](http://iobroker.live/badges/vr200-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.vr200.svg)](https://www.npmjs.com/package/iobroker.vr200)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vr200.svg)](https://www.npmjs.com/package/iobroker.vr200)
[![Travis-CI](https://travis-ci.org/Eisbaeeer/ioBroker.vr200.svg?branch=master)](https://www.travis-ci.org/Eisbaeeer/ioBroker.vr200)   
[![NPM](https://nodei.co/npm/iobroker.vr200.png?downloads=true)](https://nodei.co/npm/iobroker.vr200/)

This is a full fork of botvac adapter. Only difference is to use the corrosponding node-kobold module from nicoh88.
Im not the author of the adapter. I only changed some things to get the VR200 running as adapter.   
The full respect is giving to Pmant and nicoh88.

## Installation
- Install the adapter
- fill in your Vorwerk user credentials
- if needed change the poll interval (60 is minimum)

## Usage
- use the states in the commands channel to control your VR200
- use the can* states in the status channel to see which commands are valid
- all states in the status channel are read-only

## Examples
### clean in eco mode
- check if status.canStart is ```true```
- set commands.eco to ```true```
- set commands.clean to ```true```

### clean a 150cm * 150cm spot
- place the VR200 in front of the desired location
- check if status.canStart is ```true```
- set commands.spotHeight and commands.spotWidth to ```150``` 
- set commands.cleanSpot to ```true```

### return to base
- status.dockHasBeenSeen has to be ```true```
- VR200 has to be in paused or stopped state (commands.stop / commands.pause)
- set commands.goToBase to ```true```

## Changelog

### 0.1.0
- (Eisbaeeer) inital commit from Pmant�s adapter
### 0.2.0
- (Eisbaeeer) added Travis testing - no changes in code
### 0.3.0
- (Eisbaeeer) fixed issue #1 (status reachable)
### 1.0.0
- no changes. Went to stable release.

## License
The MIT License (MIT)
