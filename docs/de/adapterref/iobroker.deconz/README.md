---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.deconz/README.md
title: kein Titel
hash: q3KR5mKvtQHOYZ6IQR961zO2zHamS9OUjsrQaKqZK/4=
---
![Logo](../../../en/adapterref/iobroker.deconz/admin/deconz.png)

![Anzahl der Installationen](http://iobroker.live/badges/deconz-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.deconz.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.deconz.svg)
![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.deconz.svg)
![NPM](https://nodei.co/npm/iobroker.deconz.png?downloads=true)

ioBroker deConz dresden-elektronik Adapter

==============

Englisch -------------------- Verbindet mit der von dresden-elektronik entwickelten deConz-Software. Diese Software soll eine universelle ZigBee-Gateway-Lösung sein, die Hardware von dresden-elektronik, den ConBee-USB-Stick und RaspBee, ein Modul für den Raspberry Pi, verwendet.

Sie müssen zuerst einen Link zu deConz erstellen.

1. a) Geben Sie die IP-Adresse für deConz ein

    b) Geben Sie den Port ein, wenn Sie ihn geändert haben, andernfalls lassen Sie ihn leer.

2. Nachdem die IP-Adresse und der Port eingegeben und gespeichert wurden, klicken Sie auf die Schaltfläche "Create API Key" (API-Schlüssel erstellen). Jetzt können Sie die Anmeldeinformationen für deConz eingeben oder zur Phoscon APP gehen und ioBroker als Drittanbieter-APP registrieren.

## Links
[deConz](https://www.dresden-elektronik.de/funktechnik/products/software/pc/deconz/) [REST-Plugin](https://github.com/dresden-elektronik/deconz-rest-plugin) [Gateways (Hardware)](https://www.dresden-elektronik.de/funktechnik/solutions/wireless-light-control/gateways/)

## Beachten
### Keine Unterstützung für Beta-Versionen von deConz
### Erforderliche js-controller Version> 2.x.x
Erforderlich node.js> = 10.x.x

## [Sponsoren](https://github.com/iobroker-community-adapters/ioBroker.deconz/blob/master/SPONSORS.MD)

## Changelog

### 1.2.4
* dynamicly add boolean states for button events
* added new object definitions
* (mobilutz) remove ip overwrite
* (njeisecke) add transitiontime for bri_inc (dim step)


### 1.2.3
* fix expire time for alive 
* add object for open zigbee network to add new devices without admin config
* removed input for opne network time
* fix device list in admin config

### 1.2.2
* adapter configuration handling rewritten
* fix lastupdated UTC to locale time

### 1.2.1
* convert lastupdated time to locale
* object creation refactored
* fix adapter config update
* add auto detect deConz
* include ssdp discovery to repo

### 1.2.0
* fix adapter crash when deConz is not reachable
* show connection state as adapter state
* add auto reconnect to deconz
* add new objects for thermostat support and others

### 1.1.3
* Changed default port to 80
* (mplogas) fixed config save 
* (mplogas) added config.delay to set up presence sensor cooldown

### 1.1.2
* fix button objects
*  changed buttonpressed from boolean to number

### 1.1.0
*  added objects for "tiltangle", "vibration", "vibrationstrength" and "orientation"
*  (asgothian) added object "buttonpressd"
*  some fixes


### 1.0.2
* fix set bri for groups


### 1.0.1
* small fixes


### 1.0.0
*  (thewhobox) skip helper groups
*  (thewhobox) added channels for lights, groups and sensors
*  (thewhobox) skip unusable sensors
*  (thewhobox/KristianHeider) turn light/groups on when changing brightness
*  (jey-cee) added object group for remotes
*  (jey-cee) stop overwrite objects on adapter start
*  (jey-cee) prepared for compact mode
*  (jey-cee) new possible to change offset (if the device accept it)
*  (jey-cee) new possible to change duration (if the device accept it)
*  (jey-cee) get API key with credentials


### 0.4.0
* (asgothian) Fix for hue change
* (halloamt)  Added support for dimming lights and groups
* (halloamt)  Added support for custom actions

### 0.3.1
* Fixing hue from range 0-65535 to 0-360


### 0.3.0
* Added scene support
*  Drop nodejs 4 support


### 0.2.5
* Fix/Change handling create objects during running Adapter

### 0.2.4
* Fix create objects during running adapter

### 0.2.3
* Create objects during runing adapter

### 0.2.2
*  Changed id naming
*  Use websocket messages instead polling afterwards

### 0.2.1
* (Jey-Cee) Added new elements to config
* (Jey-Cee) Changed som small things

### 0.2.0
* (Jey-Cee) next Try with Xiaomi Sensors
* (Jey-Cee) Added "pressure" sensor
* (Jey-Cee) Added create group to adapter config

### 0.1.7

* (Jey-Cee) add possibility to delete devices from deConz
* (Jey-Cee) fix issue on getAll... functions when there are is nothing

### 0.1.6

* (Jey-Cee) fix Xiaomi Sensors recognition

### 0.1.5

* (Jey-Cee) Try to fix Sensors

### 0.1.4

* (Jey-Cee) Added support for Admin v3
* (Jey-Cee) Create API Key without use of WebApp/Phoscon (only with deConz standard password)

### 0.1.3

* (Jey-Cee) Stop Spam in log
* (Jey-Cee) Added filter for name to id conversation

### 0.1.2

* (Jey-Cee) Added new datapoints for sensors (experimental)

### 0.1.1

* (Jey-Cee) Adapter complete rewritten

### 0.1.0

* (Jey-Cee) first release

## License
Apache-2.0

Copyright (c) 2017-2019 Jey Cee jey-cee@live.com