![Logo](admin/tesla-motors.png)
# ioBroker.tesla-motors
[![NPM version](http://img.shields.io/npm/v/iobroker.tesla-motors.svg)](https://www.npmjs.com/package/iobroker.tesla-motors)
[![Downloads](https://img.shields.io/npm/dm/iobroker.tesla-motors.svg)](https://www.npmjs.com/package/iobroker.tesla-motors)
[![installed](http://iobroker.live/badges/tesla-motors-installed.svg)](http://iobroker.live/badges/tesla-motors-installed.svg)
[![Dependency Status](https://img.shields.io/david/dbweb-ch/iobroker.tesla-motors.svg)](https://david-dm.org/dbweb-ch/iobroker.tesla-motors)
[![Known Vulnerabilities](https://snyk.io/test/github/dbweb-ch/ioBroker.tesla-motors/badge.svg)](https://snyk.io/test/github/dbweb-ch/ioBroker.tesla-motors)
[![Build Status](http://img.shields.io/travis/dbweb-ch/ioBroker.tesla-motors.svg)](https://travis-ci.org/dbweb-ch/ioBroker.tesla-motors)

[![NPM](https://nodei.co/npm/iobroker.tesla-motors.png?downloads=true)](https://nodei.co/npm/iobroker.tesla-motors/)

## tesla motors adapter for ioBroker

This Adapter adds control over your tesla car to ioBroker.

## Configuration
1. Create a new instance of the adapter, each car needs its own instance.
2. Select your prefered refresh Rate (See [Refresh Rate](#refreshRate))
2. Enter your Tesla Username and Tesla Password. 
3. Click "get Token" to request a Token and a Refresh Token from Tesla.
4. Choose your car in the dropdown.

### <a name="refreshRate"></a>Refresh Rate
To save battery, the car goes to sleep mode afer a certain time of no activity.<br />
Getting information from the car can only be done when the car is awake.<br />
Users reported, that the car can consume up to 10km of Range per day if it does not go to sleep state.<br />
To prevent from that, you can choose your desired Refresh Rate:
* **Off** - The adapter does not wake up the car on its own. It only wakes up the car upon request (If you set a State).
<br />If the car woke up on its own, the adapter will request car data once.
* **Temperate** - The Adapter will wake up the car once per hour to get his state.
* **Aggressive** - The Adapter will wake up the car once per minute.
* **Smart** - The Adapter tries to be smart. It will observe the car sleep state. When the car wakes up,
it assumes that someone might be driving soon and requests the state every minute for 10 minutes.
If nothing happend (no Climate, no Driving, no Charging) the adapter stops requesting for 15 minutes
to let the car fall asleep. In any case, it will wake up the car and get data after 12 hours.

## Using the adapter
The Adapter creates several states. The are group by their topics:
* **chargeState** - about charging, battery and range.
* **climateState** - Temperatures and window states.
* **driveState** - Position and speed
* **softwareUpdate** - Information about pending software updates
* **vehicle** - Information about your vehicle

There is a special group called **command** where you can find all commands to control your car.
Some of them are working both ways, for example the climate state will change when 
climate is turned off by the car. You can see this in the "Send / Recieve" column.

Name | Description | **S**end / **R**ecieve
-------------- | -------------- | --------------
ChargePort | Open / Close charge Port | SR
UnlockChargePort | Unlocks the charge Port | S
Charging | Start / Stop Charging | SR
Climate | Start / Stop Climate | SR
RemoteStart | Activate / Deactivate remote start | SR
SentryMode | Activate / Deactivate sentry mode | SR
SetChargeLimit | Set charge Limit in % | SR
SetTemperature | Set Target Temperature. Don't forget to turn on climate! | SR
SpeedLimit | Activate Speed Limit | SR
SpeedLimitValue | Speed Limit value | SR
StartSoftwareUpdate | Start Software Update | SR
SunRoofVent | Sun Roof Vent | SR
ValetMode | Valet Mode | SR
ValetPin | Valet Pin | SR
standby | If car is in standby (Set this to wake up manually) | SR
doorLock | Locks / Opens the door | SR
flashLights | Flash the lights | S
honkHorn | Honk the horn | S
openFrunk | Open Frunk (No recieve) | S
openTrunk | Open Trunk (No recieve) | S
seat_heater_left | Seat Heater Left level (0-3) | SR
seat_heater_rear_center | Rear center seat heater (0-3) | SR
seat_heater_rear_left | Rear left seat heater (0-3) | SR
seat_heater_rear_right | Rear right seat heater (0-3) | SR
seat_heater_right | Seat Heater Right level (0-3) | SR
steering_wheel_heater | Steering wheel heater | SR
windowVent | Window Vent | SR

## Security &amp; Credentials
The Tesla API uses a Token-Based security approach.<br />
The Token will expire (currently after 45 days) but the system can retrieve a new Token using the 
Refresh Token.<br />
Your credentials do not have to be stored for the Adapter to work, but if you are getting problems 
with refreshing the token this could make it more stable as the adapter can get a complete new token any time.<br />
<aside class="warning">
Warning:<br />
With your Tesla credentials you can control the while car including open Windows and even driving around. 
Keep your credentials save! <br />To reject all Tokens, change your Tesla account Password!
</aside>

## Contributors
* dbweb-ch
* Apollon77

## Changelog
###
* (dbweb-ch) Use decrypt from ioBrokerTools, fix issue with selecting car
### 0.2.1
* (dbweb-ch) Fix bug with odomoter, refactor object creation, fix issues with compact mode
### 0.2.0
* (dbweb-ch) Included testing
* (dbweb-ch) Encrypt passwords
### 0.1.2
* (dbweb-ch) Added Roles, refactor states. 
* Attention: "awake" replaced by "standby" and inverted!
* Attention: Door lock is inverted.
### 0.1.1
* (dbweb-ch) Fix for Wakeup plan "smart"
### 0.1.0
* (dbweb-ch) Small fixes for Beta-Version release
### 0.0.3
* (dbweb-ch) control all state, added wakeup strategy
### 0.0.2
* (dbweb-ch) added all states
### 0.0.1
* (dbweb-ch) initial release

## License
MIT License

Copyright (c) 2020 Dominic Blattmann <nick@dbweb.ch>

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