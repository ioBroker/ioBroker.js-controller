![Logo](admin/vw-connect.png)

# ioBroker.vw-connect

[![NPM version](http://img.shields.io/npm/v/iobroker.vw-connect.svg)](https://www.npmjs.com/package/iobroker.vw-connect)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vw-connect.svg)](https://www.npmjs.com/package/iobroker.vw-connect)
[![Dependency Status](https://img.shields.io/david/ta2k/iobroker.vw-connect.svg)](https://david-dm.org/ta2k/iobroker.vw-connect)
[![Known Vulnerabilities](https://snyk.io/test/github/ta2k/ioBroker.vw-connect/badge.svg)](https://snyk.io/test/github/ta2k/ioBroker.vw-connect)

[![NPM](https://nodei.co/npm/iobroker.vw-connect.png?downloads=true)](https://nodei.co/npm/iobroker.vw-connect/)

**Tests:**: [![Travis-CI](http://img.shields.io/travis/ta2k/ioBroker.vw-connect/master.svg)](https://travis-ci.org/ta2k/ioBroker.vw-connect)

## vw-connect adapter for ioBroker

Adapter for VW We Connect, We Connect ID, We Charge, myAudi, Skoda Connect, Seat Connect and We Connect Go

Please update your system on Node 10.
<https://forum.iobroker.net/topic/22867/how-to-node-js-f%C3%BCr-iobroker-richtig-updaten>

## Usage

Use the state under remote control to control your car remotely.

## Status fields Explanation

Door and window states:

- open: 1
- locked: 2
- closed: 3

### List of entries

```
"1MAINTENANCE_INTERVAL_DISTANCE_TO_OIL_CHANGE", 0, "0x0203010001"); // 0x0203FFFFFF.0x0203010001, oilInspectionData_km
"2MAINTENANCE_INTERVAL_TIME_TO_OIL_CHANGE",     1, "0x0203010002"); // 0x0203FFFFFF.0x0203010002, oilInspectionData_days
"3MAINTENANCE_INTERVAL_DISTANCE_TO_INSPECTION", 2, "0x0203010003"); // 0x0203FFFFFF.0x0203010003, serviceInspectionData_km
"4MAINTENANCE_INTERVAL_TIME_TO_INSPECTION",     3, "0x0203010004"); // 0x0203FFFFFF.0x0203010004, serviceInspectionData_days
"5WARNING_OIL_CHANGE",                          4, "0x0203010005");
"6MAINTENANCE_INTERVAL_ALARM_INSPECTION",       5, "0x0203010006");
"7MAINTENANCE_INTERVAL_MONTHLY_MILEAGE",        6, "0x0203010007");
"8MAINTENANCE_INTERVAL_AD_BLUE_RANGE",          7, "0x02040C0001"); // 0x0204FFFFFF.0x02040C0001, adBlueInspectionData_km
"9OIL_LEVEL_AMOUNT_IN_LITERS",                  8, "0x0204040001");
"10OIL_LEVEL_MINIMUM_WARNING",                  9, "0x0204040002");
"11OIL_LEVEL_DIPSTICK_PERCENTAGE",             10, "0x0204040003");
"12LIGHT_STATUS",                              11, "0x0301010001"); // 0x030101FFFF.0x0301010001, status_parking_light_off
"13TOTAL_RANGE",                               12, "0x0301030005"); // 0x030103FFFF.0x0301030005, hybrid_range - erst ab Modelljahr 2018
"14FUEL_LEVEL_IN_PERCENTAGE",                  13, "0x030103000A"); // 0x030103FFFF.0x030103000A, fuel level
"15CNG_LEVEL_IN_PERCENTAGE",                   14, "0x030103000D");
"16LOCK_STATE_LEFT_FRONT_DOOR",                15, "0x0301040001"); // 0x030104FFFF.0x0301040001, door1 - front/left
"17OPEN_STATE_LEFT_FRONT_DOOR",                16, "0x0301040002");
"18SAFETY_STATE_LEFT_FRONT_DOOR",              17, "0x0301040003");
"19LOCK_STATE_LEFT_REAR_DOOR",                 18, "0x0301040004"); // 0x030104FFFF.0x0301040004, door2 - rear/left
"20OPEN_STATE_LEFT_REAR_DOOR",                 19, "0x0301040005");
"21SAFETY_STATE_LEFT_REAR_DOOR",               20, "0x0301040006");
"22LOCK_STATE_RIGHT_FRONT_DOOR",               21, "0x0301040007"); // 0x030104FFFF.0x0301040007, door3 - front/right
"23OPEN_STATE_RIGHT_FRONT_DOOR",               22, "0x0301040008");
"24SAFETY_STATE_RIGHT_FRONT_DOOR",             23, "0x0301040009");
"25LOCK_STATE_RIGHT_REAR_DOOR",                24, "0x030104000A"); // 0x030104FFFF.0x030104000A, door4 - rear/right
"26OPEN_STATE_RIGHT_REAR_DOOR",                25, "0x030104000B");
"27SAFETY_STATE_RIGHT_REAR_DOOR",              26, "0x030104000C");
"28LOCK_STATE_TRUNK_LID",                      27, "0x030104000D"); // 0x030104FFFF.0x030104000D, door5 - rear
"29OPEN_STATE_TRUNK_LID",                      28, "0x030104000E");
"30SAFETY_STATE_TRUNK_LID",                    29, "0x030104000F");
"31LOCK_STATE_HOOD",                           30, "0x0301040010"); // 0x030104FFFF.0x0301040010, door6 - hood
"32OPEN_STATE_HOOD",                           31, "0x0301040011");
"33SAFETY_STATE_HOOD",                         32, "0x0301040012");
"34STATE_LEFT_FRONT_WINDOW",                   33, "0x0301050001"); // 0x030105FFFF.0x0301050001, window1 - front/left
"35POSITION_LEFT_FRONT_WINDOW",                34, "0x0301050002");
"36STATE_LEFT_REAR_WINDOW",                    35, "0x0301050003"); // 0x030105FFFF.0x0301050003, window2 - rear/left
"37POSITION_LEFT_REAR_WINDOW",                 36, "0x0301050004");
"38STATE_RIGHT_FRONT_WINDOW",                  37, "0x0301050005"); // 0x030105FFFF.0x0301050005, window3 - front/right
"39POSITION_RIGHT_FRONT_WINDOW",               38, "0x0301050006");
"40STATE_RIGHT_REAR_WINDOW",                   39, "0x0301050007"); // 0x030105FFFF.0x0301050007, window4 - rear/right
"41POSITION_RIGHT_REAR_WINDOW",                40, "0x0301050008");
"42STATE_CONVERTIBLE_TOP",                     41, "0x0301050009");
"43POSITION_CONVERTIBLE_TOP",                  42, "0x030105000A");
"44STATE_SUN_ROOF_MOTOR_COVER",                43, "0x030105000B"); //0x030105FFFF.0x030105000B, window4 - roof window
"45POSITION_SUN_ROOF_MOTOR_COVER",             44, "0x030105000C");
"46STATE_SUN_ROOF_REAR_MOTOR_COVER_3",         45, "0x030105000D");
"47POSITION_SUN_ROOF_REAR_MOTOR_COVER_3",      46, "0x030105000E");
"48STATE_SERVICE_FLAP",                        47, "0x030105000F");
"49POSITION_SERVICE_FLAP",                     48, "0x0301050010");
"50STATE_SPOILER",                             49, "0x0301050011");
"51POSITION_SPOILER",                          50, "0x0301050012");
"52UTC_TIME_STATUS",                           51, "0x0101010001");
"53KILOMETER_STATUS",                          52, "0x0101010002"); // 0x0101010002.0x0101010002, distanceCovered
"54PRIMARY_RANGE",                             53, "0x0301030006"); // 0x030103FFFF.0x0301030006, fuel range
"55PRIMARY_DRIVE",                             54, "0x0301030007"); // 0x030103FFFF.0x0301030007, fuel type
"56SECONDARY_RANGE",                           55, "0x0301030008"); // 0x030103FFFF.0x0301030008, secondary_range - erst ab Modelljahr 2018
"57SECONDARY_DRIVE",                           56, "0x0301030009"); // 0x030103FFFF.0x0301030009, secondary_typ - erst ab Modelljahr 2018
"58STATE_OF_CHARGE",                           57, "0x0301030002"); // 0x030103FFFF.0x0301030002, soc_ok
"59TEMPERATURE_OUTSIDE",                       58, "0x0301020001");
"60PARKING_BRAKE",                             59, "0x0301030001"); // 0x030103FFFF.0x0301030001, parking brake
"61TYRE_PRESSURE_LEFT_FRONT_CURRENT_VALUE",    60, "0x0301060001");
"62TYRE_PRESSURE_LEFT_FRONT_DESIRED_VALUE",    61, "0x0301060002");
"63TYRE_PRESSURE_LEFT_REAR_CURRENT_VALUE",     62, "0x0301060003");
"64TYRE_PRESSURE_LEFT_REAR_DESIRED_VALUE",     63, "0x0301060004");
"65TYRE_PRESSURE_RIGHT_FRONT_CURRENT_VALUE",   64, "0x0301060005");
"66TYRE_PRESSURE_RIGHT_FRONT_DESIRED_VALUE",   65, "0x0301060006");
"67TYRE_PRESSURE_RIGHT_REAR_CURRENT_VALUE",    66, "0x0301060007");
"68TYRE_PRESSURE_RIGHT_REAR_DESIRED_VALUE",    67, "0x0301060008");
"69TYRE_PRESSURE_SPARE_TYRE_CURRENT_VALUE",    68, "0x0301060009");
"70TYRE_PRESSURE_SPARE_TYRE_DESIRED_VALUE",    69, "0x030106000A");
"71TYRE_PRESSURE_LEFT_FRONT_TYRE_DIFFERENCE",  70, "0x030106000B");
"72TYRE_PRESSURE_LEFT_REAR_TYRE_DIFFERENCE",   71, "0x030106000C");
"73TYRE_PRESSURE_RIGHT_FRONT_TYRE_DIFFERENCE", 72, "0x030106000D");
"74TYRE_PRESSURE_RIGHT_REAR_TYRE_DIFFERENCE",  73, "0x030106000E");
"75TYRE_PRESSURE_SPARE_TYRE_DIFFERENCE",       74, "0x030106000F");
```

## Changelog

### 0.0.25

- add we charge 

### 0.0.24

- add remote state update

### 0.0.23

- add Seat and new climatisation v2

### 0.0.22

- calculate outside temperatur in °C also for Skoda and Audi

### 0.0.21

- add remotes for id

### 0.0.20

- fix audi login, add ID login

### 0.0.19

- save status objects in state by id instead of consecutive numbers

### 0.0.18

- fix battery status for 2020 models

### 0.0.17

- add support for 2020 models

### 0.0.16

- fix js.controller 3 problems

### 0.0.11

- fix audi bug with multiple vehicles
- hide status update error if feature is not available

### 0.0.9

- set default trip type to none

### 0.0.7

- add we connect go and remote standheizung and lock/unlock

### 0.0.6

- add audi

### 0.0.5

- add honk and flash, fix address format

### 0.0.4

- add Skoda support

### 0.0.3

- (ta2k) add more information
- (ta2k) add remote controls

### 0.0.2

- (ta2k) add car status capturing

### 0.0.1

- (ta2k) initial release

## License

MIT License

Copyright (c) 2019 ta2k <tombox2020@gmail.com>

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
