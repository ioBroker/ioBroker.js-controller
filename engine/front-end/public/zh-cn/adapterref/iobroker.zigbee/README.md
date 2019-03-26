---
BADGE-Number of Installations: http://iobroker.live/badges/zigbee-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.zigbee.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.zigbee.svg
BADGE-Tests: https://travis-ci.org/ioBroker/ioBroker.zigbee.svg?branch=master
BADGE-NPM: https://nodei.co/npm/iobroker.zigbee.png?downloads=true
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.zigbee/edit/master//README.md
title: Zigbee
hash: bY1ThHcJ6EOoAgCt5rpSEeLhfvB6vMOAp2UpPdfu9Us=
adapter: true
license: MIT
authors: Kirov Ilya<kirovilya@gmail.com>
description: 适用于小米（和其他）设备的Zigbee适配器，通过TI cc2531 / cc2530
keywords: zigbee, xiaomi, cc2531, cc2530
readme: https://github.com/ioBroker/ioBroker.zigbee/blob/master/README.md
mode: daemon
materialize: true
compact: false
published: 2018-06-08T19:33:19.576Z
version: 0.10.2
---
#ioBroker适用于Zigbee设备的适配器
<img src="zh-cn/adapterref/iobroker.zigbee/../../admin/zigbee.png"  width="64">

在Zigbee网络协调员的帮助下，基于德州仪器SoC cc253x（及其他），将创建自己的网络，可以加入其他Zigbee设备。由于与协调器的直接交互，Zigbee适配器允许控制设备，而无需制造商的任何网关/桥接器（Xiaomi / Tradfri / Hue）。关于Zigbee网络的功能可以[在这里阅读（英文）](https://github.com/Koenkk/zigbee2mqtt/wiki/ZigBee-network)。

##硬件
对于其中一个枚举设备/棒的实现，使用了特殊的ZNP固件：[cc2530，cc2530，cc2530 + RF。](https://github.com/Koenkk/zigbee2mqtt/wiki/Supported-sniffer-devices#zigbee-coordinator)

<span><img src="https://ae01.alicdn.com/kf/HTB1Httue3vD8KJjSsplq6yIEFXaJ/Wireless-Zigbee-CC2531-Sniffer-Bare-Board-Packet-Protocol-Analyzer-Module-USB-Interface-Dongle-Capture-Packet.jpg_640x640.jpg" width="100"></span> <span><img src="http://img.dxcdn.com/productimages/sku_429478_2.jpg" width="100"></span> <span><img src="http://img.dxcdn.com/productimages/sku_429601_2.jpg" width="100"></span> <span><img src="https://ae01.alicdn.com/kf/HTB1zAA5QVXXXXahapXXq6xXFXXXu/RF-TO-USB-CC2530-CC2591-RF-switch-USB-transparent-serial-data-transmission-equipment.jpg_640x640.jpg" width="100"></span>

所需的闪存/编程器和准备过程在[这里（英文）]（https://github.com/Koenkk/zigbee2mqtt/wiki/Getting-started）或[这里（俄罗斯）](https://github.com/kirovilya/ioBroker.zigbee/wiki/%D0%9F%D1%80%D0%BE%D1%88%D0%B8%D0%B2%D0%BA%D0%B0)中描述。

连接到Zigbee网络的设备将其状态传输给协调器，并通知它们事件（按钮，运动检测，温度变化）。此信息显示在相应对象下的适配器中。此外，可以将一些事件/状态发送回Zigbee设备（状态更改插座和指示灯，颜色和亮度设置）。

##设置和配对
![](https://raw.githubusercontent.com/kirovilya/files/master/config.PNG)

首先，必须指定cc253x所连接的USB端口。如何识别这个[这里描述（俄语）](https://github.com/kirovilya/ioBroker.zigbee/wiki#%D0%9D%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B0-%D0%B0%D0%B4%D0%B0%D0%BF%D1%82%D0%B5%D1%80%D0%B0)

要连接设备，请通过单击适配器中的绿色按钮将Zigbee网络协调器置于配对模式。配对模式现在有效60秒。要连接设备，在正常情况下按下要连接的设备上的按钮就足够了。但也有“特殊”设备。如何连接它们描述[这里英文]（https://github.com/Koenkk/zigbee2mqtt/wiki/Pairing-devices）[或俄文](https://github.com/kirovilya/ioBroker.zigbee/wiki#%D0%9F%D0%BE%D0%B4%D0%B4%D0%B5%D1%80%D0%B6%D0%B8%D0%B2%D0%B0%D0%B5%D0%BC%D1%8B%D0%B5-%D1%83%D1%81%D1%82%D1%80%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%B0)。

配对成功后，设备将显示在适配器中。如果设备（来自列表）的名称为“未定义”，则尝试删除它并再次配对。如果它仍然不起作用，请写一个问题。
不在列表中的Zigbee设备可以配对，但适配器无法与它们通信。

##其他信息
还有一个[友谊项目](https://github.com/koenkk/zigbee2mqtt)具有相同的功能和相同的技术，它们通过MQTT协议与相同的设备通信。如果Zigbee2MQTT项目中包含任何改进或新支持的设备，那么这些设备也可以添加到此项目中。如果您发现任何差异，请写一个问题，我们会照顾它

## Changelog

### 0.10.2 (2019-03-15)
* some fixes
* (allofmex) Visualize mesh newtwork map, "available" state, configuration requests
* (Apollon77) Update test framework
* (sonntam) Tint remote
* (arteck) OSRAM Lightify Switch Mini, rwl021 dimmer
* (asgothian) TRADFRI signal repeater, Innr SP 120, Xiaomi Gas detector

### 0.9.2 (2019-02-25)
No support of node.js 4 any more
* (bluefox) Xiaomi Lock was added
* (nisiode) Some fixes
* (sonntam) Some fixes
* (arteck) Heiman SmokeSensor
* (asgothian, allofmex) Eurotronic support

### 0.9.1 (2019-01-29)
* Groups and new Developer tab were added

### 0.9.0 (2019-01-28)
* (arteck) Many new devices
* (allofmex) Developer tab
* (modmax) Reading attributes
* (kirovilya) Groups support

### 0.8.0 (2018-11-29)

**BREAKING CHANGES**:
* (kirovilya) Rename state "isopen" to "opened".
* (kirovilya) Change brightness interval from 0..254 to 0..100 

Other changes:
* (kirovilya) Fix for admin2
* (kirovilya) + Gledopto
* (kirovilya) + Mijia vibration sensor
* (kirovilya) Common state "link_quality"
* (arteck) + Philips LLC010, LLC011, LLC012, LTW001, LTW004, LTW010, LTW012, LTC001, LCT024
* (arteck) + Osram PAR 16 50 RGBW - LIGHTIFY
* (arteck) + Innr RS 128 T, RS 185 C
* (arteck) + DE FLS-PP3
* (arteck) + Ilux LEColorLight
* (kirovilya) Light state "transition_time" for brightness, color, colortemp


### 0.7.7 (2018-10-21)
* (arteck) Fix 'is open' state

### 0.7.6 (2018-10-19)
* (kirovilya, arteck) New models and devices

### 0.7.5 (2018-10-02)
* (kirovilya) Support zigbee-shepherd-converters 4.*

### 0.7.4 (2018-10-01)
* (kirovilya) Allow enter port without selector

### 0.7.3 (2018-09-27)
* (arteck) Bugfix and new devices: Classic A60 W clear - LIGHTIFY and Surface Light TW
* (kirovilya) Occupancy timeout state for motion sensor
* (kirovilya) Serialport selector

### 0.7.1 (2018-08-14)
* (kirovilya) Network map feature
* (kirovilya) Allow pairing through router
* (kirovilya) Change battery percent interval to 2700..3200
* (arteck) New devices: Hue LTW010, Osram Flex RGBW
* (kirovilya) Triple and quadruple clicks for WXKG11LM
* (kirovilya) isopen - magnet state, in contrast to contact
* (kirovilya) Option "Disable LED for cc2531"

### 0.6.0 (2018-07-05)
* (kirovilya) More new devices from zigbee-shepherd-converters
* (kirovilya) Some layout fixes in admin
* (kirovilya) Fix battery for smoke sensor

### 0.5.9 (2018-06-27)
* (arteck) New devices: Osram LED PAR16, Osram Smart+ plug, Philips Hue bulb
* (kirovilya) Turn on/off lights when change brightness > 0 and = 0

### 0.5.8 (2018-06-26)
* (kirovilya) Allow backup/restore zigbee-database for js-controller 1.5.0
* (kirovilya) New device - Jiawen bulb
* (kirovilya) Allow remove device with setup key
* (from zigbee-shepherd-converters) Change battery percent interval to 3000-2700

### 0.5.7 (2018-06-19)
* (kirovilya) Update states on adapter start (for restored shepherd.db)
* (kirovilya) Brightness - not percent - range 0..255

### 0.5.6 (2018-06-14)
* (kirovilya) Configuration panID (zigbee network identifier)
* (kirovilya) Moved to ioBroker organization

### 0.5.5 (2018-06-11)
* (kirovilya) Return runing on NodeJS 4.*

### 0.5.4 (2018-06-10)
* (kirovilya) Public version

### 0.5.0 (2018-06-06)
* (kirovilya) All refactored

### 0.0.1 (2018-02-07)
* (kirovilya) First version

## License
The MIT License (MIT)

Copyright (c) 2018-2019 Kirov Ilya <kirovilya@gmail.com>

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