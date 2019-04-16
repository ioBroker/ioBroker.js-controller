![Logo](admin/wiffi-wz.png)
ioBroker adapter for Wiffi-wz, Weatherman, Wiffi-pump, Rainyman and maybe others 
=================
![Number of Installations](http://iobroker.live/badges/wiffi-wz-installed.svg) ![Number of Installations](http://iobroker.live/badges/wiffi-wz-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.wiffi-wz.svg)](https://www.npmjs.com/package/iobroker.wiffi-wz)
[![Downloads](https://img.shields.io/npm/dm/iobroker.wiffi-wz.svg)](https://www.npmjs.com/package/iobroker.wiffi-wz)

[![NPM](https://nodei.co/npm/iobroker.wiffi-wz.png?downloads=true)](https://nodei.co/npm/iobroker.wiffi-wz/)

[![Build Status](https://travis-ci.org/t4qjXH8N/ioBroker.wiffi-wz.svg?branch=master)](https://travis-ci.org/t4qjXH8N/ioBroker.wiffi-wz)
[![Build status](https://ci.appveyor.com/api/projects/status/58b8ygy9slf4oygx/branch/master?svg=true)](https://ci.appveyor.com/project/t4qjXH8N/iobroker-wiffi-wz/branch/master)

This is an [ioBroker](https://github.com/ioBroker/ioBroker) Adapter to retrieve sensor data from Wiffi devices see [Stall.biz](http://www.stall.biz) for more info. 

Typical examples for devices from Stall.biz are the [Wiffi-wz](http://www.stall.biz/project/der-wiffi-wz-2-0-der-wohnzimmersensor), the [Weatherman](https://www.stall.biz/project/weatherman-die-perfekte-wetterstation-fuer-die-hausautomation) and the [Rainyman](https://www.stall.biz/project/rainyman-der-perfekte-sensor-fuer-regen-sonne-klima-bodenfeuchte-und-mehr). Multiple Wiffis are supported at the same time. 

Due to the very low latency of the adapter (typically < 3s) it is possible to use the IR motion sensors to trigger an action like switching the lights on or off. 

In the following some devices from Stall.biz are described in more detail: 
The Wiffi-wz is a device that combines eight sensors in a single unit. Currently the following sensors are available:

- two orthogonally aligned IR motion sensors
- temperature sensor (can be [DHT22](https://www.sparkfun.com/datasheets/Sensors/Temperature/DHT22.pdf), or [BME280](https://ae-bst.resource.bosch.com/media/_tech/media/datasheets/BST-BME280_DS001-11.pdf))
- air humidity sensor (can be [DHT22](https://www.sparkfun.com/datasheets/Sensors/Temperature/DHT22.pdf), or [BME280](https://ae-bst.resource.bosch.com/media/_tech/media/datasheets/BST-BME280_DS001-11.pdf))
- atmospheric pressure (can be [BMP180](https://cdn-shop.adafruit.com/datasheets/BST-BMP180-DS000-09.pdf), [BMP280](https://ae-bst.resource.bosch.com/media/_tech/media/datasheets/BST-BMP280-DS001-12.pdf) or [BME280](https://ae-bst.resource.bosch.com/media/_tech/media/datasheets/BST-BME280_DS001-11.pdf))
- noise sensor with adjustable sensitivity
- luxmeter ([BH1750](http://rohmfs.rohm.com/en/products/databook/datasheet/ic/sensor/light/bh1750fvi-e.pdf))
- air quality sensor ([MQ135](https://www.olimex.com/Products/Components/Sensors/SNS-MQ135/resources/SNS-MQ135.pdf))
- beeper

The Weatherman can be equipped with many sensors, see [homepage](https://www.stall.biz/project/weatherman-die-perfekte-wetterstation-fuer-die-hausautomation) for more details. 

The Rainyman is a somehow reduced version of the Weatherman, see [homepage](https://www.stall.biz/project/rainyman-der-perfekte-sensor-fuer-regen-sonne-klima-bodenfeuchte-und-mehr) for more details. 

## How it works
Usually the Wiffi-wz sends sensors data to a Homematic CCU. The Homematic CCU receives homematic script (or better JSON) on port 8181. The admin page of this adapter reconfigures the Wiffi-wz to send sensor data directly to ioBroker. The sensor data is encoded in [JSON](https://en.wikipedia.org/wiki/JSON) format. Therefore a local socket on port 8181 is opened on the ioBroker machine. Note that the socket **must not** be exposed to the internet due to security reasons. 

## Setup
1. Set ioBroker as the recipient for the sensor data by retrieving the url

    http://[wiffi ip]/?ccu:[io-broker's ip]:

2. and set the port to 8181 by   

    http://[wiffi ip]/?param:12:8181
    
3. Tell wiffi-wz that it has to send data in JSON format without HTML header (Note that the weatherman may use a different parameter number)

	http://[wiffi ip]/?param:27:1

If any error occurs, please set the adapter loglevel to debug and send me the data telegram via email.

## Donation
If this project helped you to reduce developing time, you can give me a cup of coffee or a bottle of beer via PayPal(chvorholt@gmail.com) :-)  

## Changelog
#### 2.1.0 (14-Apr-2019)
- support for compact mode

#### 2.0.1 (08-Jan-2019)
- fixed "could not find ip" bug

#### 2.0.0 (03-Oct-2018)
- wiffi type does not need to be specified in the config anymore
- states are created and deleted by examining the received datagram
- some minor changes concerning the logging
- the buzzer of the wiffi can be activated (it may work for other actors as well, but it is untested at the moment)

#### 1.3.1 (01-Sep-2018)
- fixed npm installation problems

#### 1.3.0 (31-Aug-2018)
- support for Wiffi-pump

#### 1.2.6 (31-Aug-2018)
- fixed "adapter already running error"

#### 1.2.5 (31-Aug-2018)
- solved error when the adapter shuts down

#### 1.2.4 (16-Aug-2018)
- hotfix for wiffi-wz

#### 1.2.3 (15-Aug-2018)
- necessary modifications for publishing the adapter (fixing package.json, etc ...)

#### 1.2.2 (14-Aug-2018)
- necessary modifications for publishing the adapter (fixing roles, etc ...)

#### 1.2.1 (14-Aug-2018)
- fixed datagram evaluation

#### 1.2.0 (10-Aug-2018)
- added support for Rainyman (many thanks to Strobelix from [ioBroker forum](https://forum.iobroker.net) for testing)

#### 1.1.0 (26-Jul-2018)
- added support for Weatherman (many thanks to smartboart from [ioBroker forum](https://forum.iobroker.net) for testing)

#### 1.0.0 (17-Jul-2018)
- added support for Admin3

#### 0.3.3 (13-Dec-2017)
- corrected typos
- cleaner code

#### 0.3.2 (13-Dec-2017)
- added license file

#### 0.3.1 (10-Dec-2017)
- support for wiffi-wz, WEATHERMAN, and Rainymans, firmware should be greater or equal to _83
- some bugfixes

#### 0.2.1 (5-Dec-2017)
Bugfixes:
- JSON format sent by the Wiffi had been changed since Wiffi firmware wiffi_software_53. JSON data interpretation fixed.

#### 0.2.0 (10-Feb-2017)
Features:
- Added support for multiple Wiffis.

Changes:
- Removed expert functions from the admin interface.

#### 0.1.0 (12-Jan-2017)
Features:
- Mandatory settings can be done on the admin page.
- The wiffi-wz can be configured from the admin page (there are some problems, see known issues of this release).

#### 0.0.1 (12-Jan-2017)
Features:
- The sensor data is send to the ioBroker and saved as corresponding states. 

## License
The MIT License (MIT)

Copyright (c) 2014-2019 Christian Vorholt <chvorholt@gmail.com>

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
