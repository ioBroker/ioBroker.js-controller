![Logo](media/mh-logo-schrift.png)
# ioBroker.alpha2
[![NPM version](http://img.shields.io/npm/v/iobroker.alpha2.svg)](https://www.npmjs.com/package/iobroker.alpha2)
[![Downloads](https://img.shields.io/npm/dm/iobroker.alpha2.svg)](https://www.npmjs.com/package/iobroker.alpha2)
[![Travis-CI](https://travis-ci.org/Eisbaeeer/ioBroker.alpha2.svg?branch=master)](https://www.travis-ci.org/Eisbaeeer/ioBroker.alpha2)   
[![NPM](https://nodei.co/npm/iobroker.alpha2.png?downloads=true)](https://nodei.co/npm/iobroker.alpha2/)

This adapter allows you to get and set values of the Moehlenhoff Alpha2 heating controller.
The adapter uses the XML-API of the Alpha2. If you are using more then one Alpha2 controller, you have to install a second instance of adapter.

## Installation
- Install the adapter
- fill in your ip-address or hostname of the Alpha2 controller
- fill in the polling interval to get states

## Usage
You can change the following objects in:
- For each HEATAREA (max 8 areas)    

| Description         | Object          | Values                    |   
|---------------------|-----------------|---------------------------|   
| Target Temperature  | T_TARGET        | Temp. in degrees Celsius  |   
| Target Temp. day    | T_HEAT_DAY      | Temp. in degrees Celsius  |   
| Target Temp. night  | T_HEAT_NIGHT    | Temp. in degrees Celsius  |   
| Mode of HeatArea    | HEATAREA_MODE   | 0=Auto, 1=Day, 2=Night    |   
| Program Weekdays    | PROGRAM_WEEK    | Program Nr. 0-3           |   
| Program Weekend     | PROGRAM_WEEKEND | Program Nr. 0-3           |   
   
- For each PROGRAM with max. 4 shifts for each program.    
- Steps of minutes are 15. Only allowed 00,15,30,45   
- Hours in 24 style   

| Description         | Object          | Values                        |   
|---------------------|-----------------|-------------------------------|   
| Start time          | START           | Time of program start [hh:mm] |   
| End time            | END             | Time of program end [hh:mm]   |   

- For Vacation   

| Description           | Object              | Values                   |   
|-----------------------|---------------------|--------------------------|   
| Begin of vacation     | VACATION.START_DATE | [YYYY-MM-DD]             |   
| End of vacation       | VACATION.END_DATE   | [YYYY-MM-DD]             |   
| Temp. during vacation | T_HEAT_VACATION     | Temp. in degrees Celsius |   

- All other objects are read-only   

## Examples
### Set the temperature of Room1
To set target temperature (only valid to next program start or end), set the object T_TARGET in the corrosponding Heatarea.
The adapter will use the XML-API to set the value in the heatarea.

### Set vacation
To set vacation, take care you defined the vacation target temp with the object T_HEAT_VACATION. You will find that object in DEVICE.
After that, set the both objects VACATION.START_DATE and VACATION.END_DATE. If you will deactivate the vacation settings, set both objects with dates before today.
You can check the object VACATION.STATE to check the status. If the status showing true, vacation is active.

## Known limitations
- no virtual rooms
- max 8 heatareas (there are Alpha2 base stations with 12 heatareas)
- no lock of room controllers (kids mode)

## Changelog

### 0.0.4
- (Eisbaeeer)   
Added refresh of states after setting states

### 0.0.3
- (Eisbaeeer)   
fixed issues #2

### 0.0.2
- (Eisbaeeer)   
fixed issues #1

### 0.0.1
- (Eisbaeeer) inital version of Alpha2

## License
The MIT License (MIT)
