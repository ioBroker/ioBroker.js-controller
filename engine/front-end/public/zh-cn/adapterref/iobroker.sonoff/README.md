---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.sonoff/edit/master//README.md
title: Sonoff
hash: RSDMeYvJdHdLRa0sQZfy3RIpl1BQYRnCBww693bWEvM=
adapter: true
license: MIT
authors: bluefox <dogafox@gmail.com>
description: This adapter allows to connect sonoff components via MQTT
keywords: ITEAD, MQTT, Sonoff, Tasmota
readme: https://github.com/ioBroker/ioBroker.sonoff/blob/master/README.md
mode: daemon
materialize: true
compact: true
published: 2017-10-05T18:49:38.731Z
version: 2.2.2
BADGE-安装数量: http://iobroker.live/badges/sonoff-stable.svg
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.sonoff.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.sonoff.svg
BADGE-测试: https://travis-ci.org/ioBroker/ioBroker.sonoff.svg?branch=master
BADGE-NPM: https://nodei.co/npm/iobroker.sonoff.png?downloads=true
---
![商标](zh-cn/adapterref/iobroker.sonoff/../../../en/adapterref/iobroker.sonoff/admin/sonoff.png)


#ioBroker Sonoff ==============
需要node.js 4.0或更高版本。

##用法
此适配器通过MQTT与具有Tasmota固件或ESP设备的Sonoff设备进行通信。

预计会有以下主题：

 -  tele / DeviceNAME / STATE
 -  tele / DeviceNAME / SENSOR
 -  tele / DeviceNAME / INFOx
 -  tele / DeviceNAME / ENERGY
 -  cmnd / DeviceNAME / POWERx
 -  stat / DeviceNAME / POWERx
 -  / DeviceNAME / BM280 /温度
 -  / DeviceNAME / BM280 /湿度
 -  / DeviceNAME / BM280 / Temperatur
 -  / DeviceNAME / BM280 / Feuchtigkeit
 -  / DeviceNAME / BM280 / Vcc
 -  / DeviceNAME / BM280 / VCC
 -  / DeviceNAME / BM280 / Laufzeit
 -  / DeviceNAME / BM280 / RSSI
 -  / DeviceNAME / BM280 / POWER
 -  / DeviceNAME / BM280 / POWER1
 -  / DeviceNAME / BM280 / POWER2
 -  / DeviceNAME / BM280 / POWER3
 -  / DeviceNAME / BM280 / POWER4
 -  / DeviceNAME / BM280 / Switch1
 -  / DeviceNAME / BM280 / Switch2
 -  / DeviceNAME / BM280 /总计
 -  / DeviceNAME / BM280 /今天
 -  / DeviceNAME / BM280 / heute
 -  / DeviceNAME / BM280 /昨天
 -  / DeviceNAME / BM280 / gestern
 -  / DeviceNAME / BM280 / Faktor
 -  / DeviceNAME / BM280 / Factor
 -  / DeviceNAME / BM280 / Power
 -  / DeviceNAME / BM280 / Leistung
 -  / DeviceNAME / BM280 /电压
 -  / DeviceNAME / BM280 / Spannung
 -  / DeviceNAME / BM280 /当前
 -  / DeviceNAME / BM280 / Strom
 -  / DeviceNAME / BM280 / Punkt
 -  / DeviceNAME / BM280 / Counter1
 -  / DeviceNAME / BM280 / Counter2
 -  / DeviceNAME / BM280 / Counter3
 -  / DeviceNAME / BM280 / Counter4
 -  / DeviceNAME / BM280 /压力
 -  / DeviceNAME / BM280 / SeaPressure
 -  / DeviceNAME / BM280 / Druck
 -  / DeviceNAME / BM280 /约。高度
 -  / DeviceNAME / BM280 / Module
 -  / DeviceNAME / BM280 /版本
 -  / DeviceNAME / BM280 /主机名
 -  / DeviceNAME / BM280 / IPAddress
 -  / DeviceNAME / BM280 / IPaddress
 -  / DeviceNAME / BM280 / RestartReason
 -  / DeviceNAME / BM280 / CarbonDioxide
 -  / DeviceNAME / DHT11 / Illuminance
 -  / DeviceNAME / SonoffSC / Light
 -  / DeviceNAME / SonoffSC / Noise
 -  / DeviceNAME / SonoffSC / AirQuality
 -  /DeviceNAME/SDS0X1/PM2.5
 -  / DeviceNAME / SDS0X1 / PM10
 -  / DeviceNAME / SDS0X1 / UvLevel
 -  / DeviceNAME / SDS0X1 /纬度
 -  / DeviceNAME / SDS0X1 /经度
 -  / DeviceNAME / SR04 /距离

**注意**：列表可以很容易地扩展。请向开发人员发送* Pull Requests ** debug data* for unknown states（通过问题）。

##自动创建对象
在Web配置中，您可以确定哪些MQTT报文创建的新对象不在默认数据点中

* TELE_SENSOR从tele / xxx / SENSOR报文创建对象
* TELE_STATE从tele / xxx / STATE电报创建对象
* STAT_RESULT从stat / xxx / RESULT报文创建对象

通常TELE_SENSOR应该足以满足大多数用户的需求。

## LED控制器的标志
仅当设备具有以下状态之一时，才会创建模式状态：

 - '红色'，'绿色'，'蓝色'，'WW'，'CW'，'颜色'，'RGB_POWER'，'WW_POWER'，'CW_POWER'，'Hue'，'饱和度'

状态：

* modeLedExor  - 白色LED指示灯和彩色指示灯=>如果白色指示灯亮起，彩色指示灯熄灭，反之亦然（默认为真）
* modeReadColors  - 允许从MQTT读取颜色（默认为false）

## Changelog

### 2.2.3 (2019-01-10)
* (simatec) Support for comapct mode

### 2.2.2 (2018-06-22)
* (bluefox) Configuration was fixed

### 2.2.1 (2018-06-20)
* (bluefox) '-' in names was allowed again

### 2.2.0 (2018-05-22)
* (gemu2015) auto generate objects, support for arrays (channel), ledcontrollers improved

### 2.1.3 (2018-05-08)
* (bluefox) Added HC-SR04 Ultrasonic Sensor

### 2.1.2 (2018-04-23)
* (bluefox) Added support of UvLight, Longitude and Latitude

### 2.1.1 (2018-04-13)
* (bluefox) Support of the particle concentration sensor

### 2.1.0 (2018-03-30)
* (gemu2015) Support of the devices control (many thanks :)
* (gemu2015) Support of many new values 
* (modmax) Update alive status of the clients
* (modmax) Added POWER5-8 and Switch3-4

### 2.0.2 (2018-03-19)
* (modmax) Fixing reconnection of clients
* (bluefox) Add SeaPressure

### 2.0.1 (2018-03-17)
* (bluefox) Replace stream handler
* (bluefox) Add timeout for clients
* (bluefox) Add Light/Noise/AirQuality
* (bluefox) Do not send pingresp for invalid clients

### 1.0.3 (2018-03-03)
* (bluefox) Add Analog0/1/2/3 sensor

### 1.0.2 (2018-02-17)
* (Apollon77) Add Illuminance sensor

### 1.0.1 (2018-02-05)
* (bluefox) Ready for admin3
* (bluefox) Added CO2 sensor

### 1.0.0 (2017-11-27)
* (AlZiBa) typo @ alive
* (AlZiBa) add Todays power consumption for Sonoff POW
* (AlZiBa) unit of power consumption is kWh

### 0.3.3 (2017-11-03)
* (bluefox) Add counters

### 0.3.2 (2017-10-22)
* (Tan-DE) Small change for Switch1. Switch2 and additional IPaddress added.

### 0.3.1 (2017-10-12)
* (bluefox) Fix tests and LWT

### 0.3.0 (2017-10-06)
* (bluefox) Add INFO and ESP

### 0.2.0 (2017-10-05)
* (bluefox) Add ENERGY and DS18x20

### 0.1.0 (2017-10-01)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2017-2019, bluefox <dogafox@gmail.com>

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