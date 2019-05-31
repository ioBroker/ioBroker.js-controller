---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.rflink/README.md
title: ioBroker.rflink
hash: DJ9qlecqsdcEAcK9qiln1yd3axtyxD/PSo0UE8mUJbY=
---
![商标](../../../en/adapterref/iobroker.rflink/admin/rflink.png)

![安装数量](http://iobroker.live/badges/rflink-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.rflink.svg)
![下载](https://img.shields.io/npm/dm/iobroker.rflink.svg)
![测试](https://travis-ci.org/ioBroker/ioBroker.rflink.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.rflink.png?downloads=true)

#ioBroker.rflink
=================

此适配器与基于arduino mega和RFC 433MHz / 866MHz / 2.6Gz通信的[rflink](http://www.nemcon.nl/blog2/)进行通信。
用于接收天气传感器和无线电源开关的数据。

##预先要求
要在Windows上使用串行端口，需要VS来构建二进制文件。
要在linux上使用串口，它是构建必需的。要安装它只需写：

```
sudo apt-get update
sudo apt-get install build-essential -y
```

##用法
要启用传感器学习，您必须激活“包含模式”。默认情况下，包含模式将启用5分钟（300000毫秒），5分钟后将自动禁用。

要永久启用包含模式，只需将“包含超时”设置为0。

##对
每次电池更换时，设备都会获得新地址。

因此，电池更换后必须重新学习。

为此，在插入电池之前按下对按钮，将使用新地址学习设备。

##自动配对
如果您附近没有那么多传感器，您可以激活自动重新配对。

只有在可以明确识别设备的情况下才有可能。

这意味着只有一个具有此品牌和类型的设备存在。 （例如，一个品牌只有一个温度传感器）

如果系统检测到具有此类参数的多个设备，它将自动停用自动重新配对模式并指示带闪光灯的问题传感器。

##发送原始命令
用户可以将原始命令发送到设备。只需以[这里](http://www.nemcon.nl/blog2/protref)描述的形式编写命令即可。

例如：```10;AB400D;00004d;1;OFF;```。请阅读文档以了解命令。

## Changelog

### 2.0.0 (2019-05-15)
* (Apollon77) Support for nodejs 12 added, nodejs 4 is no longer supported!

### 1.2.0 (2018-01-23)
* (Apollon77) Upgrade Serialport Library

### 1.1.6 (2017-10-08)
* (Apollon77) Fix parsing for Wind-Direction

### 1.1.5 (2017-05-23)
* (Apollon77) Upgrade Serialport Library for compatibility to node 6.x

### 1.1.4 (2017-04-15)
* (bluefox) Fix the rain calculation

### 1.1.3 (2017-04-11)
* (bluefox) Allow flash on node.js < 5

### 1.1.2 (2017-04-10)
* (bluefox) Fix the wind gist calculation

### 1.1.0 (2017-02-03)
* (bluefox) Add stop for blinds

### 1.0.8 (2017-01-20)
* (bluefox) fix KWATT calculation for Oregon CM180

### 1.0.6 (2016-12-15)
* (bluefox) Support of raw commands
* (bluefox) Support MiLightv1 commands
* (Apollon77) update serialport library for node 6.x compatibility

### 1.0.5 (2016-11-11)
* (bluefox) Read newest sketch from web

### 1.0.2 (2016-10-23)
* (bluefox) Flashing of sketch into arduino
* (bluefox) Set_level from 1 to 15
* (bluefox) show version of sketch

### 0.2.1 (2016-10-19)
* (bluefox) Fix for SET_LEVEL

### 0.2.0 (2016-10-18)
* (bluefox) Fix write of commands

### 0.1.4 (2016-10-18)
* (bluefox) Fix the last changed time indication

### 0.1.3 (2016-10-17)
* (bluefox) initial commit