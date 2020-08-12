![Logo](admin/deconz.png)

ioBroker deConz dresden-elektronik Adapter
==============

![Number of Installations](http://iobroker.live/badges/deconz-installed.svg) ![Number of Installations](http://iobroker.live/badges/deconz-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.deconz.svg)](https://www.npmjs.com/package/iobroker.deconz)  [![Downloads](https://img.shields.io/npm/dm/iobroker.deconz.svg)](https://www.npmjs.com/package/iobroker.deconz) 

[![NPM](https://nodei.co/npm/iobroker.deconz.png?downloads=true)](https://nodei.co/npm/iobroker.deconz/)

## Notice
No Support for Beta/Pre-release Versions of deConz.

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

Required js-controller version >2.x.x, Required node.js >= 10.x.x

## English

Connects to deConz software developed by dresden-elektronik. This software aims to be a universal ZigBee Gateway solution, using hardware from dresden-elektronik the ConBee USB stick and RaspBee a modul for the Raspberry Pi.

### Setup
1. Read documentation of deConz/Phoscon, look at [links](https://github.com/iobroker-community-adapters/ioBroker.deconz#links) section.
2. Start adapter
3.  * Enter ip address for deConz 
    * Enter port number, standard is 80.
    * IP and port will be saved automaticaly
    * **Alternative:** Close configuration and open again.
    If deConz was found IP and port is shown now.
4. Click on "Create API key"
5.  * Enter username (Standard is delight)
    * Enter password (is set during first login on Phoscon APP)
    * **Alternative:** Open Phoscon APP -> Menu -> Settings -> Gateway -> Advanced -> Unlock Gateway
    
#### Send more than one command at the same time
For this purpose there is a object called "action".

Examples:

`"on": true, "xy": [0.6586,0.3138]`

`"on": true, "transitiontime": 5, "hue": 65500`

## German

Verbindet mit der von dresden-elektronik entwickelten deConz-Software. Diese Software soll eine universelle ZigBee Gateway-Lösung sein, die die Hardware von dresden-elektronik, ConBee USB-Stick und RaspBee, ein Modul für den Raspberry Pi, verwendet.

### Einrichten
1. Dokumentation von deConz/Phoscon lesen, Quellen siehe [Links](https://github.com/iobroker-community-adapters/ioBroker.deconz#links).
2.  Adapter starten
3.  * IP Adresse von deConz und
    * Port eingeben, Standard ist port 80
    * IP und Port wird Automatisch gespeichert
    * **Alterantiv:** Adpterkonfiguration schließen und erneut öffnen.
    Wurde deConz gefunden steht jetzt IP und Port schon in der Maske.
4.  "Erstelle API Key" Klicken
5.  * Buntzername (Standard ist delight) und
    * Passwort (wird beim ersten Anmelden in der Phoscon APP vergeben) eingeben
     * **Alterantiv:** Phoscon APP öffnen -> Menü -> Einstellungen -> Gateway -> Erweitert -> Auf "App verbinden" klicken
      
#### Mehr als einen Befehl senden
Dafür gibt es das Objekt "action".

Beispiele:

`"on": true, "xy": [0.6586,0.3138]`

`"on": true, "transitiontime": 5, "hue": 65500`

## Links
- [Phoscon APP](https://phoscon.de/)
- [Supported Devices](https://github.com/dresden-elektronik/deconz-rest-plugin/wiki/Supported-Devices)
- [deConz](https://www.dresden-elektronik.de/funktechnik/products/software/pc/deconz/)  
- [REST plugin on Github](https://github.com/dresden-elektronik/deconz-rest-plugin)  
- [Gateways (Hardware)](https://www.dresden-elektronik.de/funktechnik/solutions/wireless-light-control/gateways/)  

## [Sponsors](https://github.com/iobroker-community-adapters/ioBroker.deconz/blob/master/SPONSORS.MD)

## Changelog

### 2.0.3
* fix incoming rename event for sensors
* fix release_press is set to true at start
* added websocket port info to configuration
* added event types handling for websocket messages
* added backup, deConz update & firmware update states under Gateway_info
* added touchlink functions
* fix sensor handling for virtual devices (fsm and vpir)

### 2.0.2
* Bugfix

### 2.0.1
* Bugfixes

### 2.0.0
* changed id naming from id to mac (uniqueid)
* possibility to rename devices

Full changelog history can be found in CHANGELOG.md

## License
Apache-2.0

Copyright (c) 2017-2020 Jey Cee jey-cee@live.com



