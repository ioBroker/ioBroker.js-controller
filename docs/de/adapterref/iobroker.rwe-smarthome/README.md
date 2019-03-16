![Logo](media/rwe-smarthome.png)
# ioBroker.rwe-smarthome
=================

This adapter can be used to add the RWE Smarthome central to ioBroker

## Changelog

## 0.1.11
    Added ability to interpret integers as booleans for switches

## 0.1.10
    Added ability to interpret integers as booleans for switches

## 0.1.9
    Added nice descriptions for states
    Fixed GenericActuator types
    Fixed initial device state

## 0.1.8
    Added debug info for unknown devices

## 0.1.7
    Corrected device types for several sensors

## 0.1.6
    Added LuminanceSensor & RoomTemperatureActuator

## 0.1.5
    Backport for NodeJS 0.10

## 0.1.4
    minor communication fixes

### 0.1.3
    updated underlying SmartHome lib
    
### 0.1.2
    Fixed triggering of events during state change
    
### 0.1.0
    Added shutdown event to clean the connection to the central during unload event
    Updated underlaying lib to keep connection to the central alive
    
### 0.0.3
    Fixed some underlaying communication problems
    Added debug events
    
### 0.0.2
    Added AlarmActuator
    Added RollerShutterActuator
    Added RoomHumiditySensor
    Added RoomTemperatureSensor
    Added WindowDoorSensor

### 0.0.1
    Initial commit, at the moment only GenericActuator and SwitchActuator works
        
## License
GPL V2

Copyright (c) 2016 Patrick Arns <iobroker@patrick-arns.de>