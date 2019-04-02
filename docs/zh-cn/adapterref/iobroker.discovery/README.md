---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.discovery/README.md
title: ioBroker发现适配器
hash: 5qtPepHUCothQAwl8EMjz/QoKY96eI6kxi01+i7qpr4=
---
![商标](../../../en/adapterref/iobroker.discovery/admin/discovery.png)

![安装数量](http://iobroker.live/badges/discovery-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.discovery.svg)
![下载](https://img.shields.io/npm/dm/iobroker.discovery.svg)
![测试](https://travis-ci.org/ioBroker/ioBroker.discovery.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.discovery.png?downloads=true)

#ioBroker发现适配器
**使用所有已知方法检测设备。**

这是特殊的适配器，它试图找到可以从主机访问的所有可能的设备。
刚才它可以通过ping，UPnP（串行计划）检测到。

##实际上支持
###自动发现
 -  Bose Soundtouch
 -  Broadlink
 -  Chromecast
 - 大金气候控制
 -  deConz
 - 天龙/马兰士
 -  DoorBird
 -  ebus
 -  ekey
 -  energymanager（E.ON / Solarwatt）
 - 爱普生Stylus PX830
 -  Fakeroku
 -  FHEM
 -  FireTV
 - 弗罗尼乌斯
 -  G-Homa插头
 - 和谐
 - 家庭助理
 -  Homematic CCU（hm-rpc，hm-rega）
 -  Homepilot
 - 飞利浦HUE
 -  InfluxDB
 -  KLF-200
 -  KNX
 -  Landroid
 -  LGTV
 -  Lightify
 - 洛克森
 -  Lupusec
 -  MAX！立方体
 -  MegaD
 -  Miele
 -  Mi Home Smarthome
 -  MiLight桥（v6）
 -  Musiccast
 -  Mysensors USB / Serial（9600,38400,57600,115200）
 - 坚果
 -  OpenHAB
 - 平
 -  Proxmox
 -  RFLink（串行57600波特）
 - 三星电视
 -  Sonnen
 - 索诺斯
 -  Stiebel-Eltron / Tecalor ISG（加）
 -  SQL（MySQL，MSSQL，PostgreSQL）
 -  Squeezebox
 -  stiebel-isg
 -  TR-064
 - Trådfri
 -  UPnP
 -  Wifilight
 - 雅马哈
 -  Yeelight
 -  Z-wave USB（使用Aeon Labs测试）

###作为附加适配器提供
- 云
 - 历史记录（如果没有找到SQL或InfluxDB）
 -  flot（在历史适配器存在时提供）
 -  JavaScript
 - 信息
 - 移动
 - 可见
 - 网络

＃＃ 去做
 -  artnet？ （Bluefox）
 -  B-Control-Em？ （Bluefox）
 -  cul / maxcul（Bluefox）
 -  Foobar200（Instalator）
 -  fritzbox（ruhr70）
 -  km200（frankjoke）
 -  kodi（instalator）
 -  megaesp（ausHaus）
 -  modbus（Bluefox）
 -  mpd（instalator）
 -  mqtt / mqtt-client（Bluefox）
 -  onkyo（Bluefox）
 -  owfs（Bluefox）
 -  rpi2（如果ioBroker在Raspberry上运行）
 -  rwe-smarthome（PArns）
 -  s7（Bluefox）
 - 智能电表（Apollon77）
 -  unifi（jens-maus）
 - 狼（微笑杰克）
 -  xs1（frankjoke）

## Changelog
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