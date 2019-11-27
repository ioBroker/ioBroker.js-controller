---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sonoff/README.md
title: ioBroker Sonoff
hash: 3M7Cln8xx5EW+3rn3GxwEqEFoWXbbzFAYRt/bvjJM2E=
---
![商标](../../../en/adapterref/iobroker.sonoff/admin/sonoff.png)

![安装数量](http://iobroker.live/badges/sonoff-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.sonoff.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.sonoff.svg)
![测验](https://travis-ci.org/ioBroker/ioBroker.sonoff.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.sonoff.png?downloads=true)

＃ioBroker Sonoff
##用法
此适配器通过MQTT与具有Tasmota固件的Sonoff设备或ESP设备通信。

预期以下主题：

-`tele / DeviceNAME / STATE`
-`ele / DeviceNAME / SENSOR`
-`ele / DeviceNAME / INFOx`
-`ele / DeviceNAME / ENERGY`
-`mnd / DeviceNAME / POWERx`
-`tat / DeviceNAME / POWERx`
-`/ DeviceNAME / BM280 / Temperature`
-`/ DeviceNAME / BM280 / Humidity`
-`/ DeviceNAME / BM280 / Temperatur`
-`/ DeviceNAME / BM280 / Feuchtigkeit`
-`/ DeviceNAME / BM280 / Vcc`
-`/ DeviceNAME / BM280 / VCC`
-`/ DeviceNAME / BM280 / Laufzeit`
-`/ DeviceNAME / BM280 / RSSI`
-`/ DeviceNAME / BM280 / POWER`
-`/ DeviceNAME / BM280 / POWER1`
-`/ DeviceNAME / BM280 / POWER2`
-`/ DeviceNAME / BM280 / POWER3`
-`/ DeviceNAME / BM280 / POWER4`
-`/ DeviceNAME / BM280 / Switch1`
-`/ DeviceNAME / BM280 / Switch2`
-`/ DeviceNAME / BM280 / Total`
-`/ DeviceNAME / BM280 / Today`
-`/ DeviceNAME / BM280 / heute`
-`/ DeviceNAME / BM280 /昨天`
-`/ DeviceNAME / BM280 / gestern`
-`/ DeviceNAME / BM280 / Faktor`
-`/ DeviceNAME / BM280 / Factor`
-`/ DeviceNAME / BM280 / Power`
-`/ DeviceNAME / BM280 / Leistung`
-`/ DeviceNAME / BM280 / Voltage`
-`/ DeviceNAME / BM280 / Spannung`
-`/ DeviceNAME / BM280 / Current`
-`/ DeviceNAME / BM280 / Strom`
-`/ DeviceNAME / BM280 / Punkt`
-`/ DeviceNAME / BM280 / Counter1`
-`/ DeviceNAME / BM280 / Counter2`
-`/ DeviceNAME / BM280 / Counter3`
-`/ DeviceNAME / BM280 / Counter4`
-`/ DeviceNAME / BM280 / Pressure`
-`/ DeviceNAME / BM280 / SeaPressure`
-`/ DeviceNAME / BM280 / Druck`
-`/ DeviceNAME / BM280 / Approx。海拔`
-`/ DeviceNAME / BM280 / Module`
-`/ DeviceNAME / BM280 / Version`
-`/ DeviceNAME / BM280 / Hostname`
-`/ DeviceNAME / BM280 / IPAddress`
-`/ DeviceNAME / BM280 / IPaddress`
-`/ DeviceNAME / BM280 / RestartReason`
-`/ DeviceNAME / BM280 / CarbonDioxide`
-`/ DeviceNAME / DHT11 / Illuminance`
-`/ DeviceNAME / SonoffSC / Light`
-`/ DeviceNAME / SonoffSC / Noise`
-`/ DeviceNAME / SonoffSC / AirQuality`
-`/ DeviceNAME / SDS0X1 / PM2.5`
-`/ DeviceNAME / SDS0X1 / PM10`
-`/ DeviceNAME / SDS0X1 / UvLevel`
-`/ DeviceNAME / SDS0X1 / Latitude`
-`/ DeviceNAME / SDS0X1 / Longitude`
-`/ DeviceNAME / SR04 / Distance`

**注意**：该列表可以轻松扩展。请发送`Pull Requests`或*调试数据*到未知状态给开发人员（通过发出）。

##自动创建对象
在Web配置中，您可以确定哪些MQTT报文创建不在默认数据点中的新对象

*`TELE_SENSOR`从`tele / xxx / SENSOR`电报创建对象
*`TELE_STATE`通过`tele / xxx / STATE`电报创建对象
*`STAT_RESULT`从`stat / xxx / RESULT`电报创建对象

通常，TELE_SENSOR对于大多数用户来说就足够了。

## LED控制器的标志
仅当设备具有以下状态之一时，才会创建模式状态：

-红色，绿色，蓝色，WW，CW，颜色，RGB_POWER，WW_POWER，CW_POWER，色相，饱和度

状态：

*`modeLedExor`-白色LED和彩色LED的exor =>如果打开白色LED，关闭彩色LED，反之亦然（默认为true）
*`modeReadColors`-允许从MQTT读取颜色（默认为false）

## Changelog

### 2.3.1 (2019-10-23)
* (bluefox) Fixed the password input in the configuration
* (bluefox) Allowed to set the IP interface for server
* (bluefox) Fixed tests for js-controller 2.0
* (bluefox) Fixed the monitoring of the client connection
* (bluefox) Changed "indicator.connected" to "indicator.reachable" for clients
* (bluefox) Supported `{POWERn: "true"}`
* (bluefox) Correct processing of `{temp: nan}`

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