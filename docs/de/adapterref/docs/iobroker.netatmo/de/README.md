![Logo](media/netatmo.png)
# ioBroker.netatmo

[![NPM version](http://img.shields.io/npm/v/iobroker.netatmo.svg)](https://www.npmjs.com/package/iobroker.netatmo)
[![Downloads](https://img.shields.io/npm/dm/iobroker.netatmo.svg)](https://www.npmjs.com/package/iobroker.netatmo)

[![NPM](https://nodei.co/npm/iobroker.netatmo.png?downloads=true)](https://nodei.co/npm/iobroker.netatmo/)

Netatmo adapter for ioBroker

## Installation
Just enter your Netatmo username & password within the adapter settings

You can also use the sendTo command to set all persons as away (for example if in use as alarm system)
```
sendTo('netatmo.0', "setAway", {homeId: '1234567890abcdefg', personsId: []});
```
or
```
sendTo('netatmo.0', "setAway");
```
to mark all persons as away for all cameras

it's also possible to mark one or more specific persons as away
```
sendTo('netatmo.0', "setAway", {homeId: '1234567890abcdefg', personsId: ['123123123123123']});
```

The parameter homeId is the string listed behind the name of your Camera within the Objects tab (optional, if multiple cameras are installed),
the personsId is the id within the "Known" persons folder

## Changelog

### 1.3.1
* (PArns) Fixed event cleanup crash

### 1.3.0
* (HMeyer) Added Netatmo Coach

### 1.2.2
* (PArns) Updated meta info

### 1.2.0
* (PArns) Fixed camera picture for events
* (PArns) Added camera vignette for events
* (PArns) Added camera video for events
* (PArns) Added new sub event type (human, vehicle, animal, unknown)
* (PArns) Added LastEventID within the LastEventData section

### 1.1.7
* (PArns) Added missing lib dependencies

### 1.1.6
* (PArns) Removed GIT requirement and included netatmo lib directly

### 1.1.5
* (PArns) Removed 502 error output if API has backend problems

### 1.1.4
* (PArns) Added support for unnamed modules

### 1.1.1
* (PArns) Simplified setAway

### 1.1.0
* (PArns) Added setAway function (Welcome only) to mark all or specific persons as away (requires your own API key!)

### 1.0.1
* (PArns) Fixed scope problems for presence & welcome (requires your own API key!)

### 1.0.0
* (PArns) Added live camera picture & stream for presence & welcome
* (PArns) Fixed known & unknown face image url for presence & welcome

### 0.6.2
* (PArns) Added name of last seen known face

### 0.6.1
* (PArns) Changed realtime server to use new general realtime server
* (PArns) Changed enums to channels to avoid enum creation
* (PArns) Simplified detection for movement-, known- & unknown- face events

### 0.6.0
* (PArns) Rewritten realtime updates to not need a local server any longer! Realtime updates are now turned on by default if a Welcome or Present cam is available

### 0.5.1
* (PArns) Optimized realtime updates to avoid updates if only movement was detected

### 0.5.0
* (PArns) Added realtime events for Netatmo Welcome

### 0.4.1
* (PArns) Removed log warnings for Wind sensor

### 0.4.0
* (PArns) Added absolute humidity
* (PArns) Added dewpoint

### 0.3.1
* (PArns) Reuse of preconfigured OAuth Client data
* (PArns) Added backward compatibility with existing installations

### 0.3.0
* (wep4you) Initial implementation of Netatmo welcome camera

### 0.2.2
* (PArns) Fixed SumRain24MaxDate & SumRain24Max which won't update in some rare cases

#### 0.2.1
* (PArns) Corrected DateTime values & object types

#### 0.2.0
* (PArns) Added SumRain1Max/SumRain1MaxDate & SumRain24Max/SumRain24MaxDate to get overall rain max since adapter installation

#### 0.1.1
* (PArns) Fixed TemperatureAbsoluteMin/TemperatureAbsoluteMax

#### 0.1.0
* (PArns) Fixed CO2 calibrating status
* (PArns) Added last update for devices
* (PArns) Added TemperatureAbsoluteMin/TemperatureAbsoluteMax to get overall temperature min/max since adapter installation

#### 0.0.4
* (PArns) Fixed typo/missing parameter in GustStrength

#### 0.0.3
* (PArns) Added error handling to prevent exceptions for missing parameters

#### 0.0.2
* (PArns) Fixed rain sensor

#### 0.0.1
* (PArns) Initial release

## License
MIT

Copyright (c) 2016-2017 Patrick Arns <iobroker@patrick-arns.de>