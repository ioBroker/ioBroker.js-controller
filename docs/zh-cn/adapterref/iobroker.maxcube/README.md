---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.maxcube/README.md
title: ioBroker.maxcube
hash: QHOIZ10wpa1+8vkJ/NuVAfODNeN1o6wQrzoHrHMwPkE=
---
![商标](../../../en/adapterref/iobroker.maxcube/admin/maxcube.png)

![安装数量](http://iobroker.live/badges/maxcube-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.maxcube.svg)
![下载](https://img.shields.io/npm/dm/iobroker.maxcube.svg)
![测试](https://travis-ci.org/ioBroker/ioBroker.maxcube.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.maxcube.png?downloads=true)

＃ioBroker.maxcube ==================================
ioBroker适配器控制Max！通过立方体

##支持的设备
 - 恒温器
 - 门/窗传感器
 - 按钮（仅电池状态）

##用法
在使用之前，必须先将所有设备连接到MAX！立方体通过MAX！固件。

## Changelog
### 1.0.1 (2018-07-06)
* (stabilostick) initialization of working state
* (stabilostick) setpoint rounding to 0.5
* (stabilostick) upstream only changed states
* (stabilostick) stabilize state display for setpoint and mode values

### 1.0.0 (2018-05-24)
* (bluefox) refactoring
* (bluefox) added admin3

### 0.1.2 (2017-06-11)
* (paul53) Try to read wall thermostat

### 0.1.1 (2017-06-07)
* (bluefox) use local maxcube lib

### 0.1.0 (2017-06-05)
* (bluefox) intial commit

## License

MIT Copyright (c) 2017-2018 bluefox