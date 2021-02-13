![Logo](admin/haier_admin.png)
# ioBroker Haier air conditioning adapter
=================

![Number of Installations](http://iobroker.live/badges/haier-installed.svg) 
![Number of Installations](http://iobroker.live/badges/haier-stable.svg) 
[![NPM version](http://img.shields.io/npm/v/iobroker.haier.svg)](https://www.npmjs.com/package/iobroker.haier)
[![Downloads](https://img.shields.io/npm/dm/iobroker.haier.svg)](https://www.npmjs.com/package/iobroker.haier)
[![Tests](https://github.com/instalator/iobroker.haier/workflows/Test%20and%20Release/badge.svg)](https://github.com/instalator/ioBroker.haier/actions/)  
 
[![NPM](https://nodei.co/npm/iobroker.haier.png?downloads=true)](https://nodei.co/npm/iobroker.haier/)

[![Donate](https://img.shields.io/badge/Donate-YooMoney-green)](https://sobe.ru/na/instalator)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PFUALWTR2CTPY)

IoBroker Haier adapter is used to control your Haier air conditioning via UART in conjunction with the TCP to Serial Gateway.
The work is checked on the air conditioner of the 'Lightera' series.

## Hardware
As a TCP to Serial gateway, I use this [code](https://github.com/instalator/ESP8266.TelnetToSerial) and this [device](https://blog.instalator.ru/archives/433).

## Using

### power
Switching the air conditioner on and off. (true/false)

### temp
Сurrent indications of room temperature.(°C)

### settemp
Setting the temperature. (16 - 30 °C)

### mode
* **auto**  or **0** - One key can give you a comfortable room! The air conditioning unit can judge the indoor temperature and humidity, and make the adjustment accordingly.
* **cool**  or **1** - Cooling room.
* **heat**  or **2** - Room heating.
* **fan**   or **3** - Only fan.
* **dry**   or **4** - Air dehumidification.
* **off**   or **5** - Power off AC.

### fanspeed
* **min**  or **2** - Fan speed
* **mid**  or **1** - Fan speed
* **max**  or **0** - Fan speed
* **auto** or **3** - Fan speed

### swing
* **ud**    or **1**  - Auto UP/Down.
* **lr**    or **2**  - Auto Left/Right.
* **both**  or **3**  - Both directions.
* **false** or **0**  or **off**  - Off.

### health
(true/false)
The water-ion generator in the airconditioner can generate a lot of anion effectively balance the quantity of position and anion in the air and also to kill bacteria and speed up the dust sediment in the room and finally clean the air in the room.

### lockremote
Lock IR remote (true/false)

### compressor
If the compressor is on

### fresh
(true/false)
Exhaust the vitiated air from the room, and inhale fresh air.
(This function is unavailable on some models.)

### raw
Send RAW HEX code without starting bytes and checksum
example: power on - **0A000000000001014D02**


## Changelog

### 1.0.4
   (instalator) change test

### 1.0.3
   (instalator) support admin3
   (instalator) support compact mode
   (instalator) change smart to auto
   (instalator) added role for state

### 1.0.2
   (instalator) fix error

### 1.0.1
   (instalator) fix error parse packets

### 1.0.0
   (instalator) Up to stable

### 0.1.1
   (instalator) fix reconnect error

### 0.1.0
   (instalator) beta version

### 0.0.4
  (instalator) change level log
  (instalator) fix send command
  (instalator) change for test file setup.js
  (instalator) fix error
  (instalator) added object for send raw code
  
### 0.0.3
  (instalator) alfa version adapter

### 0.0.1
  (instalator) initial
  
## License
The MIT License (MIT)

Copyright (c) 2021 instalator <vvvalt@mail.ru>

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
