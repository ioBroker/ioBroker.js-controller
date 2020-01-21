![Logo](admin/digitalstrom.png)
# ioBroker.digitalstrom

[![NPM version](http://img.shields.io/npm/v/iobroker.digitalstrom.svg)](https://www.npmjs.com/package/iobroker.digitalstrom)
[![Downloads](https://img.shields.io/npm/dm/iobroker.digitalstrom.svg)](https://www.npmjs.com/package/iobroker.digitalstrom)
![Number of Installations (latest)](http://iobroker.live/badges/digitalstrom-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/digitalstrom-stable.svg)
[![Dependency Status](https://img.shields.io/david/Apollon77/iobroker.digitalstrom.svg)](https://david-dm.org/Apollon77/iobroker.digitalstrom)
[![Known Vulnerabilities](https://snyk.io/test/github/Apollon77/ioBroker.digitalstrom/badge.svg)](https://snyk.io/test/github/Apollon77/ioBroker.digitalstrom)

[![NPM](https://nodei.co/npm/iobroker.digitalstrom.png?downloads=true)](https://nodei.co/npm/iobroker.digitalstrom/)

**Tests:**: [![Travis-CI](http://img.shields.io/travis/Apollon77/ioBroker.digitalstrom/master.svg)](https://travis-ci.org/Apollon77/ioBroker.digitalstrom)

**This adapter uses the service [Sentry.io](https://sentry.io) to automatically report exceptions and code errors and new device schemas to me as the developer.** More details see below!

## Digitalstrom adapter for ioBroker

Support for Digitalstrom devices via DSS

## Installation

Please install the adapter via Admin UI as usual.

As soon as the adapter is officially released he will be in the repo and simply selectable.

During test phase, or for testing of newer versions (see relevant forum threads) you can also install the adapter directly from GitHub using https://github.com/ioBroker/ioBroker.digitalstrom as URL. Please use the Admin "Custom Install" option for this.

## Usage

After installing the adapter and creating an instance the admin dialog will appear.
First of all you need to enter your DSS IP/Hostname. Then you can choose if you already have manually created an App Token in the DSS Web-Interface or not.
If you do not have an App-Token simply enter your Username and Password to retrieve an App Token automatically.

Additionally to the Authentication settings (see above) you can edit the following settings to your needs:
* **Data Polling Interval**: This is the interval the "Energy Meter" data are requested from your DSM devices. Default 60s. You can set 0 if you do not want to poll the Engerymeter data.
* **Use Scene Preset Values**: The Digitalstrom system is not really designed to have the real output values of the devices available all the time and works most with Scenes. For Light and Shader/Blinds some output values are defined for many of the available Scenes. The adapter knows them and when this setting is active the adapter will try to lookup these values when a scene gets triggered and set those values to the states directly. The real values are requested with a delay. This method might deliver wrong values when local priorities are set/used!
* **Request Device Output values actively**: The adapter initializes all device output values on start and also after scenes that are effective for a device. There are delay but in fact all those messages will go over the Digitalstrom bus. If this is problematic for you you can try to deactivate this feature. 

After providing an App token and saving the settings the adapter will restart automatically.

When data are correct the adapter read out the apartment and devices structure and create them as ioBroker Objects. This can take some time (depending on the number of devices and floors/zones/groups and the performance of your system several seconds). Please be patient. And I really mean it that way ... Several thousand objects are easy to reach here! Give the adapter time please!

After this the adapter subscribes to several DSS Events to get notified about actions in the system.

The adapter status light will get green and you will see "Subscribed to states ..." as info log. After this everything is ready and you can e.g.:
* set/undo scenes for apartment, zones, groups or devices
* read state and sensor values; for zones it is also possible to push sensor values
* see the values for Binary inputs, Sensors, Buttons and Outputs

## State and Object structure

The adapter provides two data structures. The Apartment structure with Floors, Zones (Rooms) and Groups and additionally the structure of Circuits/dSMs and the connected devices with their detail data.

In the structures several "types" of data are included:
* Scenes: Scenes are implemented as switches. Setting the value tro "true" will send a "callScene" command for this scene. A value of "false" will send an "undoScene" command for this scene - it is up the the DSS server to decide if "undo" is a valid command! When a callScene or undoScene is triggered as event from the DSS server the relevant scene is set to "true" or "false" with ack=true
* States: States from the system and user defined states via the addon are shown and are read only
* Sensor values are updated when triggered by an event and can partially also bet changed - changes are send a "pushSensorValue" to the server and it is up to the server if the value is accepted! This is mainly relevant for Temperature or Humidity values
* 

### Apartment object and states
![Apartment Objects](img/dss-apartment.png)

For the Apartment a structure with "floor"."zone" is created with the following substructures inside this:
* per device group a sub folder is created including the available group scenes
* scenes for this zone
* states for this zone
* sensor values for this zone

On Apartment level all device groups are available with it's scenes.

On Apartment level also Sensors (also outdoor values), States and user states are included.

### Devices objects and states
![Devices Objects](img/dss-devices.png)

The devices are structured with "circuit/dSM"."deviceID" and the subsctructure inside includes:
* Device Scenes, will be triggered for this device only
* Device Sensors, when reported from the system. So values might be empty
* Output values (e.g. state/brightness for Lights and position/angle for Shades/Blinds) are located directly below the device. Only Lights and Shades/Blinds will have a defined functionality for now.
* Buttons and Binary Inputs will also be represented by states and are read only

## Known Issues / System design effects
* The DSS system mainly works using scenes and not via real device values and also getting the real values is very slow because needs to be fetched via the bus. 
* Values might be empty when they were not reported by the system
* Binary inputs were implemented "Blind" right know because I do not have such a devices. So I'm happy to get some logs/reports with binary input devices :-)
* Meaningful output value reading and writing is only implemented for Ligh (Yellow) and Shade/Blind (Gray) devices.
* I had no chance so far checking how the system behaves with vDCs. So I need logs and details here to add it
* Ventilation and Temperature management/devices are also not fully implemented ... what makes sense here?

## How to report issues and feature requests

Please use GitHub issues for this.

Best is to set the adapter to Debug log mode (Instances -> Expert mode -> Column Log level). Then please get the logfile from disk (subdirectory "log" in ioBroker installation directory and not from Admin because Admin cuts the lines). If you do not like providing it in GitHub issue you can also send it to me via email (iobroker@fischer-ka.de). Please add a refernce to the relevant GitHub issue AND also describe what I see in the log at which time.

## What is Sentry.io and what is reported to the servers of that company?
Sentry.io is a service for developers to get an overview about errors from their applications. And exactly this is implemented in this adapter.

When the adapter crashes or an other Code error happens, this error message that also appears in the ioBroker log is submitted to Sentry. When you allowed iobroker GmbH to collect diagnostic data then also your installation ID (this is just a unique ID **without** any additional infos about you, email, name or such) is included. This allows Sentry to group errors and show how many unique users are affected by such an error. All of this helps me to provide error free adapters that basically never crashs.  


## Changelog

### 0.5.0 (2020-01-19)
* (Apollon77) add buttons for more device types (also vDC) and try to detect button triggers

### 0.4.10 (2020-01-19)
* (Apollon77) state changes added
* (Apollon77) Fixed shade position control

### 0.4.9 (2020-01-18)
* (Apollon77) add unknown weather sensor "windgust"
* (Apollon77) change handling of Input types
* (Apollon77) Fix controlling of shaders 

### 0.4.7 (2020-01-17)
* (Apollon77) fix error when writing vdc output values

### 0.4.6 (2020-01-17)
* (Apollon77) fix missing datatypes for some states (mainly sensors and output values)

### 0.4.5 (2020-01-17)
* (Apollon77) fix error in sentry reporting

### 0.4.4 (2020-01-17)
* (Apollon77) fix error (Sentry IOBROKER-DIGITALSTROM-7)

### 0.4.2 (2020-01-16)
* (Apollon77) fix wrong scene state updates if same scene is triggered twice
* (Apollon77) also trigger scene update for all groups if scene was called on zone or to all zones and groups when done on apartment

### 0.4.1 (2020-01-16)
* (Apollon77) also add basic scenes to room groups

### 0.4.0 (2020-01-15)
* (Apollon77) add userActions as states and allow to trigger the actions

### 0.3.3 (2020-01-15)
* (Apollon77) fixes for scene lists
* (Apollon77) add some special szenes to more groups 

### 0.3.2 (2020-01-14)
* (Apollon77) fixes for adapter start

### 0.3.1 (2020-01-14)
* (Apollon77) fixes
* (Apollon77) make sure to initialize scenes, states and sensors really on startup - values will be overwritten if delivered with ack=true!
* (Apollon77) add all Presets (0-44) to Room/Zone and Group states 
* (Apollon77) also for unknown device types try to initialize output value IF only one is there (assuming it is offset/index 0!) Please check and report back!
* (Apollon77) make some initial processing async to block eventLoop less

### 0.3.0 (2020-01-14)
* (Apollon77) further optimize (lower) delays and timeouts, please give feedback!
* (Apollon77) add "stateId" State for each scenes folder with the scene number. This is updated with the scenes and also controllable.
* (Apollon77) scenes will not be cleared at the beginning and initialized with the "lastSceneId" returned from DSS; initialization may take some seconds longer!
* (Apollon77) update dependencies
* (Apollon77) increase loglevel of some "invalid cases" to warn to better see if they happen
* (Apollon77) fix handling of binaryInput events

### 0.2.2 (2020-01-13)
* (Apollon77) optimize event subscription logic and timeouts (should prevent "error 500 cases", now tries to resubscribe)

### 0.2.1 (2020-01-13)
* (Apollon77) optimize brightness handling
* (Apollon77) optimize error and reconnection handling

### 0.2.0 (2020-01-12)
* (Apollon77) initial official testing release (still GitHub)

### 0.1.x
* (Apollon77) initial release and finalization

## License
MIT License

Copyright (c) 2020 Apollon77 <iobroker@fischer-ka.de>

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