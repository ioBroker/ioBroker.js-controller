![Logo](admin/innogy-smarthome.png)
# ioBroker.Innogy-SmartHome
![Number of Installations](http://iobroker.live/badges/innogy-smarthome-installed.svg) ![Number of Installations](http://iobroker.live/badges/innogy-smarthome-stable.svg) 
[![Build](https://travis-ci.org/PArns/ioBroker.innogy-smarthome.svg?branch=master)](https://travis-ci.org/PArns/ioBroker.innogy-smarthome)

This adapter is used to connect the Innogy smarthome devices to ioBroker. You can read more about Innogy [here](https://www.innogy.com).

###Requires Node > 6.x

## HELP WANTED!

As this project is developed during my spare time, I*m actively looking for help to maintain and extend this lib! If you're willing to help, drop me a line!

## Changelog

### 0.3.1
    Added PowerControl
    Added SHC 2.0 quota states

### 0.3.0
    Added support for SHC 2.0 (and API 1.1)

### 0.2.11
    Reverted changes from yesterday, as RW states are not correctly maintained by innogy

### 0.2.10
    Respecting RW state of Capabilities. Please don't try to write to read only states!

### 0.2.9
    Fixed a problem with timer updates updating device states too often. Please update ASAP

### 0.2.8
    Fixed a config parsing crash
    Added a lot of new device descriptors to speed up inital boot
    Increased request limit from 2 to 6 req/sec

### 0.2.7 
    Added handler for non local SHC access and 403 responses (outdated mobile access scenarios)
    Added handler for broken push connection
    
### 0.2.6
    Fixed an exception once the Innogy API closes the status socket connection

### 0.2.5
    Implemented throttling changes required by the Innogy API

### 0.2.4
    Fixed Travis CI build errors

### 0.2.3
    Updated underlying libs
    Changed update timer from 5 mins to 30 mins + 0-30 mins

### 0.2.2
    Fixed reauth problems
    Fixed initial auth problems
    Optimized API errors
    Optimized caching of descriptor files

### 0.2.1
    Fixed reauth problems

### 0.2.0
    Removed external OAuth2 lib
    Authorization optimization

### 0.1.22
    Fixed initial reauth problem V3

### 0.1.21
    Fixed initial reauth problem next try
    Added Netatmo Wind Sensor

### 0.1.20
    Fixed initial reauth problem

### 0.1.19
    Fixed an underlying auth problem

### 0.1.18
    Updated innogy lib
    Updated adapter category
    Updated adapter tests

### 0.1.17
    Updated innogy lib

### 0.1.16
    Fixed a lot of stuff

### 0.1.11
    Added Dimmer

### 0.1.9
    Added a better reconnect handling for internal websocket connection to the API
    Better error handling

### 0.1.8
    Added a workaround for corrupted API function which causes a problem during reconnection phase

### 0.1.7
    Added the ability to detect connection problems with auto reconnect
    Better error handling

### 0.1.6
    More Innogy API error handling with general reconnect on API error
    Added connected state (yellow state)

### 0.1.5
    Added new device discovery
    Added auto connect retry for "remote access not allowed"
    Fixed exception if device was not found
    Fixed setState for RST OperationMode

### 0.1.4
    Fixed Shutter in underlying lib
    Fixed WebSocket reconnect error in underlying lib

### 0.1.3
    Added Shutter

### 0.1.2
    Optimized reconnect handling

### 0.1.1
    Fixed storing of wrong auth data & handling of wrong auth data

### 0.1.0
    Associate rooms with correct values
    Update underlying lib to handle offline crashes for Innogy API

### 0.0.11
    Corrected roles for a lot of devices

### 0.0.10
    Corrected roles for a lot of devices
    Corrected rw states for a lot of devices

### 0.0.9
    Fixed initialization sequence in underlying lib
    Fixed bootstrap sequence in underlying lib
    Fixed token refresh in underlying lib
    Removed unneeded error messages

### 0.0.8
    Improved error output once again

### 0.0.7
    Improved error output

### 0.0.6
    Removed no longer needed log errors
    Added unload method
    Optimized session refreshing

### 0.0.5
    Fixed parsing errors

### 0.0.4
    Added Netatmo Weatherstation

### 0.0.3
    Added a lot of devices
    Updated lib to reestablish Websocket connection
    Added debug event if Websocket connection is lost

### 0.0.2
    Added "Virtual" as default location for devices which doesn't have a location

### 0.0.1
    Initial commit

## License
MIT

Copyright (c) 2017 Patrick Arns <iobroker@patrick-arns.de>