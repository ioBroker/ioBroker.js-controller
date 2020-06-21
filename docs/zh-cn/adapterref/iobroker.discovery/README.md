---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.discovery/README.md
title: ioBroker发现适配器
hash: mo/DXV4ctxkpQk1ww63C9u20hQTlban7deTAEGe+iWM=
---
![商标](../../../en/adapterref/iobroker.discovery/admin/discovery.png)

![安装数量](http://iobroker.live/badges/discovery-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.discovery.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.discovery.svg)
![测验](https://travis-ci.org/ioBroker/ioBroker.discovery.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.discovery.png?downloads=true)

＃ioBroker发现适配器
**使用所有已知方法检测设备。**

这是特殊的适配器，它尝试查找主机可以访问的所有可能的设备。
到目前为止，它可以通过ping UPnP（串行计划）进行检测。

**此适配器使用Sentry库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参见[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！ Sentry报告从js-controller 3.0开始使用。

##实际支持
###自动发现
-Beckhoff PLC
-博世智能家居
-Bose Soundtouch
-Broadlink
-Chromecast
-大金气候控制
-deConz
-天龙/马兰士
-门鸟
-巴士
-钥匙
-能源经理（E.ON / Solarwatt）
-enet（Jung）
-爱普生Stylus PX830
-Fakeroku（和声）
-FHEM
-消防电视
-Fritzdect
-Fronius
-G-Homa插头
-和谐
-家庭助理
-Homematic CCU（hm-rpc，hm-rega）
-飞行员
-HP-lio
-飞利浦HUE
-Plex
-InfluxDB
-KLF-200
-KNX（实际上已禁用）
-科迪
-Landroid
-LGTV
-轻巧
-Loxone
-狼疮
-MAX！立方体
-McLighting
-MegaD
-Miele
-Mi Home智能家居
-Mikrotik
-MiLight桥（v6）
-MPD
-音乐广播
-myDlink
-Mysensors USB /串行（9600、38400、57600、115200）
-纳米叶灯板/帆布
-Nuki2
-坚果
-安桥
-OpenHAB
-平
-Plex
-Proxmox
-RFLink（序列号57600baud）
-三星电视
-Smappee
-Solarlog
-索南
-索诺斯
-Stiebel-Eltron / Tecalor ISG（加号）
-SQL（MySQL，MSSQL，PostgreSQL）
-挤压盒
-SqueezeboxRPC
-Synology
-TR-064
-Trådfri
-UPnP
-Wifilight
-雅马哈
-Yeelight
-Z-wave USB（已通过Aeon Labs测试）

###作为附加适配器提供
- 云
-历史记录（如果未找到SQL或InfluxDB）
-flot（存在历史记录适配器时提供）
-JavaScript
-信息
-手机
-可见
-网页

＃＃ 去做
-artnet？ （蓝狐）
-B-Control-Em？ （蓝狐）
-cul / maxcul（Bluefox）
-Foobar200（安装程序）
-fritzbox（ruhr70）
-km200（弗兰克·乔克）
-megaesp（ausHaus）
-modbus（蓝狐）
-mqtt / mqtt-client（Bluefox）
-owfs（Bluefox）
-rpi2（如果ioBroker在Raspberry上运行）
-rwe-smarthome（PArns）
-s7（Bluefox）
-智能电表（Apollon77）
-统一（jens-maus）
-狼（微笑杰克）
-xs1（frankjoke）

## Changelog

### 2.3.7 (2020-06-11)
* (Apollon) Add error handling for Synology detection (Sentry IOBROKER-DISCOVERY-E)

### 2.3.6 (2020-05-02)
* (Garfonso) add mydlink adapter
* (haba1234) New adapter added: Onvif
* (Apollon77) serial device discovery fixed

### 2.3.4 (2020-04-30)
* (Apollon77) make sure to check if initialization was done when ending (Sentry IOBROKER-DISCOVERY-8) 
* (APollon77) fix megad discovery error

### 2.3.3 (2020-04-23)
* (Apollon77) correct access to wrong variable (Sentry IOBROKER-DISCOVERY-3)
* (Apollon77) catch http errors better (Sentry IOBROKER-DISCOVERY-2)

### 2.3.2 (2020-04-18)
* (Apollon77) Fix potential crash in knx discovery

### 2.3.1 (2020-04-16)
* (instalator) Add Synology, Onkyo, Mpd, Mikrotik
* (instalator) Fixed eKey, Mihome, Broadlink2, Plex
* (instalator) Several optimizations and fixing of crash causes
* (Apollon77) Add Sentry Crash Reporting for js-controller 3.0
* (bluefox) Refactoring

### 2.2.2 (2020-02-13)
* (dkleber89) Add discovery for Beckhoff PLC
* (forelleblau) Add discovery for Solarlog
* (oweitman) Add discovery for SqueezeboxRPC

### 2.1.0 (2020-01-21)
* (foxriver76) no longer use adapter.objects
* __js-controller > 2.0.0 required__

### 2.0.0 (2019-05-15)
* (thewhobox) Code refactoring
* (thewhobox) add emby detection
* (frankjoke) boradlink => broadlink2
* (bluefox) Small fixes
* (Apollon77) Support for nodejs 12 added, nodejs 4 is no longer supported!

### 1.3.0 (2019-01-04)
* (bluefox) Support of compact mode
* (ldittmar) info Adapter added

### 1.2.4 (2018-09-22)
* (bluefox) Small GUI update was made
* (rg-engineering) Added ebus

### 1.2.3 (2018-09-13)
* (bluefox) Proxmox was fixed
* (unltdnetworx) solarwatt
* (Michael Schroeder) klf200
* (bluefox) Use OpenStreetMap
* (MeisterTR) yeelight
* (unltdnetworx) stiebel-isg
* (BuZZy1337) doorbird

### 1.2.1 (2018-07-28)
* (bluefox) New adapter added: DENON

### 1.1.1 (2018-03-27)
* (bluefox) New adapter added: ekey, Home Assistant, FHEM

### 1.1.0 (2018-01-23)
* (Apollon77) Upgrade Serialport Library

### 1.0.2 (2018-01-13)
* (bluefox) ready for admin3

### 1.0.1 (2017-12-28)
* Fix Epson Stylus PX830
* Add Bose Soundtouch

### 1.0.0 (2017-10-18)
* (pix) Add Epson Stylus PX830
* (pix) Add Homepilot
* (Samuel Weibel) Loxone

### 0.4.5 (2017-08-25)
* (Apollon77) Fixes in mihome

### 0.4.4 (2017-06-01)
* (bluefox) Add lgtv
* (bluefox) disable serial by default. It must be explicit enabled every time
* (bluefox) add mihome

### 0.4.2 (2017-05-17)
* (bluefox) Add discovery methods selection

### 0.4.0 (2017-05-01)
* (soef) add SamsungTV, Lightify, Miele and yamaha
* (soef) add new discovery method mDNS
* (bluefox) add openhab, Broadlink

### 0.3.3 (2017-04-15)
* (bluefox) add philips HUE

### 0.3.2 (2017-04-12)
* (bluefox) Add mysensors USB/Serial

### 0.3.1 (2017-04-01)
* (apollon77) Add Daikin climate control

### 0.3.0 (2017-03-27)
* (bluefox) Fixed serial discovery

### 0.2.3 (2017-03-18)
* (bluefox) fix license dialog
* (bluefox) add zwave
* (bluefox) add sqllite and flot
* (bluefox) ack => ignore
* (bluefox) add megad
* (apollon77) add history
* (apollon77) enhance/fix sql-sqlite
* (apollon77) add InfluxDB
* (ykuendig) german translation updated

### 0.2.2 (2017-03-18)
* (bluefox) Fix typo

### 0.2.1 (2017-03-15)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2017-2020, Bluefox <dogafox@gmail.com>

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