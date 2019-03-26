---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.maxcul/edit/master//README.md
title: max! CUL
hash: 6XQo0gd7QRkRoylGdMHscKHQa5W4FB+ZhlyW12l65XA=
adapter: true
license: GPL-2.0
authors: bluefox <dogafox@gmail.com>
description: Control max! devices over CUL stick
keywords: cul, MAX!, 868, busware
readme: https://github.com/ioBroker/ioBroker.maxcul/blob/master/README.md
mode: daemon
materialize: true
compact: false
published: 2017-04-10T20:26:24.569Z
version: 1.0.0
BADGE-安装数量: http://iobroker.live/badges/maxcul-stable.svg
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.maxcul.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.maxcul.svg
BADGE-测试: https://travis-ci.org/ioBroker/ioBroker.maxcul.svg?branch=master
BADGE-NPM: https://nodei.co/npm/iobroker.maxcul.png?downloads=true
---
![商标](zh-cn/adapterref/iobroker.maxcul/../../../en/adapterref/iobroker.maxcul/admin/maxcul.png)


＃ioBroker.maxcul ==================================
ioBroker适配器控制Max！通过[CUL](http://busware.de/tiki-index.php?page=CUL)

适配器源自[pimatic-maxcul](https://github.com/fbeek/pimatic-maxcul)

##支持的设备
 - 恒温器
 - 门/窗传感器
 - 按钮
 -  Wallthermostat

##用法
在使用之前，您必须先与ioBroker配对。
例如。对于恒温器按下“加速”按钮，直到倒计时开始。

## Changelog
### 1.0.0 (2018-10-20)
* (Arne Stenmannsr) Wall thermostat was added

### 0.5.3 (2018-03-25)
* (skraw.iobroker) Optimize logic to send commands and scanning

### 0.5.1 (2018-03-07)
* (Apollon77) Further fixes

### 0.5.0 (2018-02-25)
* (Apollon77) Fix Serial data parsing
* (bluefox) Admin3 ready

### 0.4.1 (2018-02-15)
* (Apollon77) Upgrade dependencies

### 0.4.0 (2018-01-24)
* (Apollon77) Upgrade Serialport and cul library

### 0.3.0 (2017-06-21)
* (bowao) Fix control of thermostates

### 0.2.3 (2017-04-11)
* (bluefox) Fix calculation of serial number
* (bluefox) Add valve configuration

### 0.2.0 (2017-04-11)
* (bluefox) Activate thermostat scanner

### 0.1.1 (2017-04-10)
* (bluefox) intial commit

## License

[Licensed under GPLv2](LICENSE) Copyright (c) 2017-2018 bluefox