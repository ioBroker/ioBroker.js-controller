---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.haier/README.md
title: ioBroker Haier空调适配器
hash: ROuNUa5/rOhtGEF6rozSiVNfEYVPA01f94d2z8ozq4U=
---
![标识](../../../en/adapterref/iobroker.haier/admin/haier_admin.png)

![安装数量](http://iobroker.live/badges/haier-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.haier.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.haier.svg)
![NPM](https://nodei.co/npm/iobroker.haier.png?downloads=true)
![捐](https://img.shields.io/badge/Donate-PayPal-green.svg)

＃ioBroker Haier空调适配器
=================

[![测试]（https://github.com/instalator/iobroker.haier/workflows/Test%20and%20Release/badge.svg）](https://github.com/instalator/ioBroker.haier/actions/)

ioBroker Haier适配器用于通过UART与TCP到串行网关的结合来控制Haier空调。
在“ Lightera”系列的空调上检查工作。

＃＃ 硬件
作为TCP到串行网关，我使用此[代码]（https://github.com/instalator/ESP8266.TelnetToSerial）和此[device](https://blog.instalator.ru/archives/433)。

＃＃ 使用
＃＃＃ 力量
打开和关闭空调。 （真假）

###临时
室温的当前指示。°C

### Settemp
设定温度。 （16-30°C）

＃＃＃ 模式
* **自动**或** 0 **-一键即可为您提供舒适的房间！空调单元可以判断室内温度和湿度，并据此进行调整。
* **凉**或** 1 **-冷藏室。
* **加热**或** 2 **-室内暖气。
* **风扇**或** 3 **-仅风扇。
* **干燥**或** 4 **-空气除湿。
* **关闭**或** 5 **-关闭交流电源。

＃＃＃ 风扇转速
* ** min **或** 2 **-风扇速度
* **中**或** 1 **-风扇速度
* **最大**或** 0 **-风扇速度
* **自动**或** 3 **-风扇速度

＃＃＃ 摇摆
* ** ud **或** 1 **-自动上/下。
* ** lr **或** 2 **-自动向左/向右。
* **两个**或** 3 **-双向。
* **假**或** 0 **或**关闭**-关闭。

＃＃＃ 健康
（是/否）空调中的水离子发生器可以产生大量阴离子，从而有效平衡空气中的位置和阴离子数量，还可以杀死细菌并加快房间中的灰尘沉积，最终净化室内的空气。房间。

### Lockremote
锁定红外遥控器（对/错）

###压缩机
如果压缩机开启

＃＃＃ 新鲜的
（是/否）从房间中排出通风的空气，并吸入新鲜空气。
（此功能在某些型号上不可用。）

＃＃＃ 生的
发送没有起始字节和校验和示例的RAW HEX代码：开机-** 0A000000000001014D02 **

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