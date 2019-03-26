---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/iobroker-community-adapters/ioBroker.deconz/edit/master//README.md
title: deConz ZigBee
hash: rFoxZkqrp24KrsTgFzZZ2FeLSIQv57k4WEscPDQ9i5w=
adapter: true
license: Apache 2.0
authors: Jey Cee <jey-cee@live.com>
description: Connects to the deConz Software that is an gateway solution for ZigBee. deConz works with ConBee USB stick and RaspBee modul for Raspberry Pi which is also from Dresden-Elektronik.
keywords: deconz, philips, tradfri, lightify, dresden-elektronik, hue, led, rgb, smartlink, zigbee
readme: https://github.com/iobroker-community-adapters/ioBroker.deconz/blob/master/README.md
mode: daemon
materialize: true
compact: false
published: 2018-01-02T18:51:20.942Z
version: 0.3.0
BADGE-安装数量: http://iobroker.live/badges/deconz-stable.svg
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.deconz.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.deconz.svg
BADGE-NPM: https://nodei.co/npm/iobroker.deconz.png?downloads=true
---
![商标](zh-cn/adapterref/iobroker.deconz/../../../en/adapterref/iobroker.deconz/admin/deconz.png)


＃ioBroker deConz dresden-elektronik适配器==============
English --------------------连接到dresden-elektronik开发的deConz软件。该软件旨在成为一个通用的ZigBee网关解决方案，使用来自德累斯顿电子硬件的ConBee USB棒和RaspBee的硬件，用于Raspberry Pi。

您必须先链接到deConz。

1. a）首先按“查找deConz”按钮找到IP地址。仅在未输入IP地址时启用。

    b）如果“Find deConz”找不到你的deConz安装，你必须输入ip地址。

2.找到IP地址后，必须创建USER。为此，按“创建用户”按钮，然后按HUE桥上的“链接”按钮。仅当未输入USER时，才会启用“创建用户”按钮

＃＃ 注意
###不支持deConz的Beta版本
必需的node.js> = 0.12。

## Changelog

### 0.4.0
* (asgothian) Fix for hue change
* (halloamt)  Added support for dimming lights and groups
* (halloamt)  Added support for custom actions

### 0.3.1
* Fixing hue from range 0-65535 to 0-360


### 0.3.0
* Added scene support
*  Drop nodejs 4 support


### 0.2.5
* Fix/Change handling create objects during running Adapter

### 0.2.4
* Fix create objects during running adapter

### 0.2.3
* Create objects during runing adapter

### 0.2.2
*  Changed id naming
*  Use websocket messages instead polling afterwards

### 0.2.1
* (Jey-Cee) Added new elements to config
* (Jey-Cee) Changed som small things

### 0.2.0
* (Jey-Cee) next Try with Xiaomi Sensors
* (Jey-Cee) Added "pressure" sensor
* (Jey-Cee) Added create group to adapter config

### 0.1.7

* (Jey-Cee) add possibility to delete devices from deConz
* (Jey-Cee) fix issue on getAll... functions when there are is nothing

### 0.1.6

* (Jey-Cee) fix Xiaomi Sensors recognition

### 0.1.5

* (Jey-Cee) Try to fix Sensors

### 0.1.4

* (Jey-Cee) Added support for Admin v3
* (Jey-Cee) Create API Key without use of WebApp/Phoscon (only with deConz standard password)

### 0.1.3

* (Jey-Cee) Stop Spam in log
* (Jey-Cee) Added filter for name to id conversation

### 0.1.2

* (Jey-Cee) Added new datapoints for sensors (experimental)

### 0.1.1

* (Jey-Cee) Adapter complete rewritten

### 0.1.0

* (Jey-Cee) first release

## License

Apache 2.0

Copyright (c) 2017 Jey Cee <jey-cee@live.com>
Copyright (c) 2017 Bluefox <dogafox@gmail.com>
Copyright (c) 2014-2016 hobbyquaker