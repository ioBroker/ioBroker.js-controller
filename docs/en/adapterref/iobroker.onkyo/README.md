![Logo](admin/onkyo.png)
# ioBroker.onkyo

![Number of Installations](http://iobroker.live/badges/onkyo-installed.svg) ![Number of Installations](http://iobroker.live/badges/onkyo-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.onkyo.svg)](https://www.npmjs.com/package/iobroker.onkyo)
[![Downloads](https://img.shields.io/npm/dm/iobroker.onkyo.svg)](https://www.npmjs.com/package/iobroker.onkyo)
[![Travis-CI](https://travis-ci.org/ioBroker/ioBroker.onkyo.svg?branch=master)](https://www.travis-ci.org/ioBroker/ioBroker.onkyo)   
[![NPM](https://nodei.co/npm/iobroker.onkyo.png?downloads=true)](https://nodei.co/npm/iobroker.onkyo/)

### Major update!
Take care of this major update. Starting with 2.0 there are structure changes!   
If you update to this version, you have to change the variables in any other adapter like VIS or javascript!   
The new version supports Materials and cover arts. The media objects supports player widgets like sonso or winamp.
![VIS](admin/player.png)

This adapter allows control of Onkyo and Pioneer AVRs using the EISCP protocol.

It uses node-eiscp: https://github.com/tillbaks/node-eiscp

For sending commands, there is a special state "RAW". Writes to that state
trigger only RAW commands like the known EISCP Excel files
As example of an EISCP RAW command in the form of "PWR01".

Another special state maintained by the adapter is "connected". It's a boolean
showing whether node-eiscp is currently connected to a receiver.

Example of VIS view
![VIS](admin/onkyo-vis.png)     

## Tested Receivers
### Onkyo
* TX-NR 525   
* TX-NR 626   
* TX-NR 727

### Pioneer
* VXS-S520D  
* VSX-1131   

## ChangeLog   

### 2.0.3   
* (Eisbaeeer) now support zone3   
### 2.0.2
* (Eisbaeeer) fix double .js 

### 2.0.0
* (Eisbaeeer) Major update iobroker.onkyo

### 1.1.5
* (Eisbaeeer) Zones will be powered if tune preset selected   

### 1.1.4  
* (Eisbaeeer) Added direct tuning in zones (issue #2)

### 1.1.3
* (Eisbaeeer) Adding Navigation Items   

### 1.1.2
* (Eisbaeeer) Adding CoverArt

### 1.1.1
* (Eisbaeeer) Update zone 2 volume after power on. Adding Pioneer Receivers with eiscp support.

### 1.1.0
* (Eisbaeeer) Completely new structure (Zone1, Zone2, Device)

### 1.0.5
* (Eisbaeeer) Changed structure
* (Eisbaeeer) Added Object RAW to send own commands

### 1.0.4 (2018.07.24)
* (Eisbaeeer) Cleaned program
* (Eisbaeeer) Fix logging

### 1.0.2 (2018.02.28)
* (Eisbaeeer) Changed name of adapter
* (Eisbaeeer) Added testing of adapter in travis

### 1.0.0 (2017.11.28)
* (Eisbaeeer) Add max volume settings to zone1 and zone2.   
* (Eisbaeeer) changed objects to switch
* (Eisbaeeer) moved adapter to "multimedia"
* (Eisbaeeer) cleaned log outputs

### 0.1.20 (2016.03.29)
* (Eisbaeeer) Add checkbox in settings for VIS objects. Volumes can be set in
  decimal. Power states, mute states, etc. are now usable with VIS buttons.

### 0.1.12 (2016.02.25)
* (installator) Fix power state

### 0.1.11 (2016.01.13)
* (installator) Fix regexp error

### 0.1.10
* (installator) For command CTL sets Center Level -12 - 0 - +12

### 0.1.9
* (installator) change power to system-power

### 0.1.8
* (installator) fix values to control power and enable using of 1 and 0

### 0.1.7
* (bluefox) fix creation of specific states (twice)

### 0.1.6
* (bluefox) fix creation of specific states

### 0.1.5
* (bluefox) fix node-eiscp package

### 0.1.4
* (bluefox) add debug outputs

### 0.1.1
* (bluefox) replace git with tarball

### 0.1.0
* (bluefox) update adapter for new concept

### 0.0.4
* (owagner) use verify_commands=false, to be able to send high-level commands to unknown AVR models

### 0.0.3
* (owagner) allow setting of states other than "command". This will trigger a high level
  command with the state name being set to the new value. Note that this will fail for
  many newer models, as they are not yet properly represented in node-eiscp's
  command table. Use the raw command in that case
* send some initial queries upon connect to get basic state information from the AVR

### 0.0.2
* (owagner) support node-eiscp's Autodiscovery mechanism
* (owagner) updated README, notably removing bogus reference to single instancing

### 0.0.1
* (owagner) initial version

## License
The MIT License (MIT)
Copyright (c) 2019 Eisbaeeer <eisbaeeer@gmail.com>, owagner 
