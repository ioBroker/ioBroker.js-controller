---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.netatmo/README.md
title: ioBroker.netatmo
hash: wUStXr7TvXEX/ihhR6zd6MFzoTMsrCpKc3NoBP/7LQk=
---
![Logo](../../../en/adapterref/iobroker.netatmo/admin/netatmo.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.netatmo.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.netatmo.svg)
![NPM](https://nodei.co/npm/iobroker.netatmo.png?downloads=true)

# IoBroker.netatmo
Netatmo-Adapter für ioBroker

## Installation
Geben Sie einfach Ihren Netatmo-Benutzernamen und Ihr Kennwort in den Adaptereinstellungen ein

Mit dem Befehl sendTo können Sie auch alle Personen als abwesend festlegen (z. B. bei Verwendung als Alarmsystem).

```
sendTo('netatmo.0', "setAway", {homeId: '1234567890abcdefg', personsId: []});
```

oder

```
sendTo('netatmo.0', "setAway");
```

Alle Personen für alle Kameras als abwesend markieren

Es ist auch möglich, eine oder mehrere bestimmte Personen als abwesend zu kennzeichnen

```
sendTo('netatmo.0', "setAway", {homeId: '1234567890abcdefg', personsId: ['123123123123123']});
```

Der Parameter homeId ist die Zeichenfolge, die hinter dem Namen Ihrer Kamera auf der Registerkarte Objekte aufgeführt ist (optional, wenn mehrere Kameras installiert sind), die Personen-ID ist die ID im Personenordner "Bekannte"

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