[![Build Status](https://travis-ci.org/thovid/ioBroker.viessmannapi.svg?branch=master)](https://travis-ci.org/thovid/ioBroker.viessmannapi)
![Number of Installations](http://iobroker.live/badges/viessmannapi-installed.svg)

![Logo](admin/viessmannapi.png)

# ioBroker.viessmannapi
 =================
 ** Note that as of March 2020, Viessmann has implemented some rate limiting for their API. Currently, the limits are 120 calls for a time window of 10 minutes and 1450 calls for a time window of 24 hours (see https://www.viessmann-community.com/t5/Experten-fragen/Q-amp-A-Viessmann-API/qaq-p/127660/comment-id/117660#M117660). For this reason, the poll intervall is set to 900 seconds. You can change it via the adpater configuration at your own risk. If too many calls are made in a short timeframe, your viessmann account is blocked for some time. This prevents access via the official Viessmann App as well! **

This adapter connects your ioBroker system to your Viessmann central heating via the Viessmann API. It requires your heating system to be connected to the Viessmann Server via a Vitoconnect or similar device. All enabled information provided by the API is polled periodically (every 60 sec) and written into states.

Note that this is a private project, so use at your own risk. It is not supported or endorsed by Viessmann!

## Installation
As this adapter is in an early development stage, installation can be done via the ioBroker 'latest' repository. On adapter settings, enter user name and password of your Viessmann account. If everything goes well, you should see states appear under `viessmannapi.X`. First values should arrive after 60 seconds.

## States
The specific states may depend on your installation. Examples are
- `viessmannapi.0.heating.boiler.sensors.temperature.main.value` - boiler temperature
- `viessmannapi.0.heating.circuits.0.heating.curve.shift` and `slope` - shift and slope determining the heating curve
- `viessmannapi.0.heating.circuits.0.operating.modes.active.value` - current operating mode; for example `dhw` means hot water only, `dhwAndHeating` means hot water and heating
- `viessmannapi.0.heating.sensors.temperature.outside.value` - outside temperature measured by the external sensor

## Actions
Some features provide *actions* to change some property. An action can be invoked via the `sendTo` method. The syntax looks like this:
```javascript
sendTo('viessmannapi.0', 'action', {
    feature: 'heating.circuits.0.operating.programs.comfort',
    action: 'setTemperature',
    payload: {targetTemperature: 20}
});
```
Above call would set the target temperature for the comfort program to 20°C. 

### Supported Actions
Below is a list of supported actions (note, that depending on your heating installation, some actions may not be available, or other actions are available but not documented here).

| Feature                                           | Action               | Field                                                                                       | Notes                                                                            |
|---------------------------------------------------|----------------------|---------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------|
| **heating.circuits.X.circulation.schedule**       |                      |                                                                                             |                                                                                  |
|                                                   | setSchedule          |                                                                                             | sets the schedule for the circulation of circuit 'X'                             |
|                                                   |                      | `newSchedule` (type:Schedule, see below, modes: 'on', default: 'off')                       | see description of Schedule type below                                           |
| **heating.circuits.X.heating.curve**              |                      |                                                                                             |                                                                                  |
|                                                   | setCurve             |                                                                                             | sets parameters of the heating curve for circuit 'X'; all fields required        |
|                                                   |                      | `slope` (number, min: 0.2, max: 3.5, stepping: 0.1)                                         |                                                                                  |
|                                                   |                      | `shift` (number, min: -13, max": 40, stepping: 1)                                           |                                                                                  |
| **heating.circuits.X.heating.schedule**           |                      |                                                                                             |                                                                                  |
|                                                   | setSchedule          |                                                                                             | sets the heating schedule for circuit 'X'                                        |
|                                                   |                      | `newSchedule` (type: Schedule, see below, modes: 'normal', default: 'reduced'               | see description of Schedule type below                                           |
| **heating.circuits.X.operating.modes.active**     |                      |                                                                                             |                                                                                  |
|                                                   | setMode              |                                                                                             | sets the active mode for circuit 'X'                                             |
|                                                   |                      | `mode` (string, enum: ["standby", "dhw", "dhwAndHeating", "forcedReduced", "forcedNormal"]) | required                                                                         |
| **heating.circuits.X.operating.programs.comfort** |                      |                                                                                             |                                                                                  |
|                                                   | setTemperature       |                                                                                             | sets temperature for comfort mode of circuit 'X'                                 |
|                                                   |                      | `targetTemperature` (number, min: 4, max: 37, stepping: 1)                                  | required                                                                         |
|                                                   | activate             |                                                                                             | No fields (send empty object), activates comfort mode                            |
|                                                   | deactivate           |                                                                                             | No fields (send empty object), deactivates comfort mode                          |
| **heating.circuits.X.operating.programs.eco**     |                      |                                                                                             |                                                                                  |
|                                                   | activate             |                                                                                             | activates eco mode for circuit 'X' with optional temperature                     |
|                                                   |                      | `temperature` (number, min: 3, max: 37, stepping: 1)                                        | optional                                                                         |
|                                                   | deactivate           |                                                                                             | No fields (send empty object), deactivates eco mode                              |
| **heating.circuits.X.operating.programs.holiday** |                      |                                                                                             |                                                                                  |
|                                                   | schedule             |                                                                                             | Schedules holiday program for circuit 'X'                                        |
|                                                   |                      | `start` (string)                                                                            | required, unknown format (probably some form of date string?)                    |
|                                                   |                      | `end` (string)                                                                              | required, unknown format (probably some form of date string?)                    |
|                                                   | unschedule           |                                                                                             | No fields (send empty object), deactivates holiday program                       |
| **heating.circuits.X.operating.programs.normal**  |                      |                                                                                             |                                                                                  |
|                                                   | setTemperature       |                                                                                             | Sets target temperature for normal mode of circuit 'X'                           |
|                                                   |                      | `targetTemperature` (number, min: 3, max: 37, stepping: 1)                                  | required                                                                         |
| **heating.circuits.X.operating.programs.reduced** |                      |                                                                                             |                                                                                  |
|                                                   | setTemperature       |                                                                                             | Sets target temperature for reduced mode of circuit 'X'                          |
|                                                   |                      | `targetTemperature` (number, min: 3, max: 37, stepping: 1)                                  | required                                                                         |
| **heating.dhw.oneTimeCharge**                     |                      |                                                                                             |                                                                                  |
|                                                   | activate             |                                                                                             | No fields (send empty object). Activates one time charge of hot water storage.   |
|                                                   | deactivate           |                                                                                             | No fields (send empty object). Deactivates one time charge of hot water storage. |
| **heating.dhw.temperature**                       |                      |                                                                                             |                                                                                  |
|                                                   | setTargetTemperature |                                                                                             | Sets target temperature of hot water storage.                                    |
|                                                   |                      | `temperature` (number, min: 10, max: 60, stepping: 1)                                       | required                                                                         |
| **heating.dhw.schedule**                          |                      |                                                                                             |                                                                                  |
|                                                   | setSchedule          |                                                                                             | sets the schedule for hot water perparation                                      |
|                                                   |                      | `newSchedule` (type: Schedule, see below, modes: 'on', default: 'off')                      | See description of Schedule type below                                           |

### Schedule Type
Most actions use simple data types (numbers, strings). Some actions allow setting schedules. A schedule looks like this:
```javascript
{
   "mon":[
      {
         "start":"05:30",
         "end":"10:00",
         "mode":"on",
         "position":0
      },
      {
          "start":"11:00",
          "end":"12:30",
          "mode":"on",
          "position":1
      },
      /* ... */
   ],
   "tue":[ /* ... */ ],
   "wed":[ /* ... */ ],
   "thu":[ /* ... */ ],
   "fri":[ /* ... */ ],
   "sat":[ /* ... */ ],
   "sun":[ /* ... */ ]
}
```

For each day, an array must be provided containing the "schedules" for this day. A single entry consists of start and end time, the scheduled "mode" and the position. The supported modes depend on what is scheduled, see table of supported features above. Outside of the scheduled elements, the default mode is used, see the table above. In the example above, something is scheduled to be "on" on monday between 5:30 and 10:00 and betwenn 11:00 and 12:30. Outside of these time intervals, the default mode ("off") is scheduled.

### Querying all features
To get a list of all available features with all available actions, simply send the message `describe` to a running adapter instance. The result is an array of all available features, that for example can be printed as JSON string via `JSON.stringify()`.

*Example:*
```javascript
sendTo('viessmannapi.0', 'describe', {}, (result) => {
    const features = JSON.stringify(result.result);
    log(features);
});
```
This script queries all available features and prints them into the log.

## Notes
- This adpater is in early development! Expect bugs, and feel free to report bugs here on github (https://github.com/thovid/ioBroker.viessmannapi/issues").

## Changelog
### 1.3.3 (2020/03/23)
* (thovid) Updated dependencies, set default poll intervall to 900 s due to rate limiting of the viessmann api
### 1.3.2 (2019/02/10)
* (thovid) Fixed a bug preventing the adapter to start
### 1.3.1 (2019/02/05)
* (thovid) reduced package size by removing unused stuff
### 1.3.0 (2019/02/05)
* (thovid) impoved action execution: validation of payload improved, schedule payload now supported
* (thovid) added support for compact mode
* (thovid) added configuration for poll interval
### 1.2.0 (2018/12/18)
* (thovid) added experimental support to execute actions on a feature via the `sendTo` function
### 1.1.2 (2018/12/10)
* (thovid) fixed bug that prevented email and password to be removed after initial authentication 
### 1.1.1 (2018/12/10)
* (thovid) fixed a bug that prevented certain properties from beeing exposed as states (for example `heating.burner`)
### 1.1.0 (2018/12/10)
* (thovid) Deletes email and password after sucessful connection, further connections are done via refresh token
* (thovid) Uses npm released version of client lib, so no longer requires git upon installation
### 1.0.0 (2018/12/07)
* (thovid) Initial adapter

## Legal
- Viessmann and Vitoconnect are registered Trademarks of the Viessmann Werke GmbH & Co. KG. 

- This project is a private project and is *not* offically supported or endorsed by the Viessmann Werke GmbH & Co. KG, use at your own risk.

- In case you have any questions, please contact me via github!

## License
The MIT License (MIT)

Copyright (c) 2018 Thomas Vidic

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
