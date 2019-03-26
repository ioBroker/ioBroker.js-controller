![Logo](admin/haier_admin.png)
# ioBroker Haier air conditioning adapter
=================
![Number of Installations](http://iobroker.live/badges/haier-installed.svg) ![Number of Installations](http://iobroker.live/badges/haier-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.haier.svg)](https://www.npmjs.com/package/iobroker.haier)
[![Downloads](https://img.shields.io/npm/dm/iobroker.haier.svg)](https://www.npmjs.com/package/iobroker.haier)
[![Tests](http://img.shields.io/travis/instalator/ioBroker.haier/master.svg)](https://travis-ci.org/instalator/ioBroker.haier)

[![NPM](https://nodei.co/npm/iobroker.haier.png?downloads=true)](https://nodei.co/npm/iobroker.haier/)

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
* **smart** or **0** - One key can give you a comfortable room! The air conditioning unit can judge the indoor temperature and humidity, and make the adjustment accordingly.
* **cool**  or **1** - Cooling room.
* **heat**  or **2** - Room heating.
* **fan**   or **3** - Only fan.
* **dry**   or **4** - Air dehumidification.

### fanspeed
* **min**  or **2**
* **mid**  or **1**
* **max**  or **0**
* **auto** or **3**

### swing
* **ud**    or **1**  - Auto UP/Down.
* **lr**    or **2**  - Auto Left/Right.
* **both**  or **3**  - Both directions.
* **false** or **0**  - Off.

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
