---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/instalator/ioBroker.lgtv-rs/edit/master//README.md
title: ioBroker LG TV Adapter with RS-232 to Ethernet gate
hash: aU2EFF00up1mJbFDbOSomkMGg90c+SxURGk6KC5dX3o=
adapter: true
license: MIT
authors: instalator
description: Controls LG TV over RS232 interface
keywords: lg, rs232, tv
readme: https://github.com/instalator/ioBroker.lgtv-rs/blob/master/README.md
mode: daemon
materialize: false
compact: false
published: 2017-09-07T14:22:57.452Z
version: 0.0.4
BADGE-安装数量: http://iobroker.live/badges/lgtv-rs-stable.svg
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.lgtv-rs.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.lgtv-rs.svg
BADGE-测试: http://img.shields.io/travis/instalator/ioBroker.lgtv-rs/master.svg
BADGE-NPM: https://nodei.co/npm/iobroker.lgtv-rs.png?downloads=true
---
![商标](zh-cn/adapterref/iobroker.lgtv-rs/../../../en/adapterref/iobroker.lgtv-rs/admin/lg_admin.png)ioBrokerLG电视RS232适配器=================


IoBroker LG TV RS232适配器用于通过RS232与Etnernet网关一起控制LG电视。
模型和命令列表包含在`admin/commands.json`文件中。

＃＃ 硬件
驱动程序允许您通过[适配器](http://blog.instalator.ru/archives/744)RS232连接到LG电视到以太网。

作为以太网的RS232网关，使用任何需要下载[这段代码](https://github.com/stepansnigirev/ArduinoSerialToEthernet)的Arduino兼容卡。
您还需要一个Ethernet Shield W5100或W5500以及一个RS232到TTL转换器。

##支持
支持型号：LD750待...

### 0.0.4
  （instalator）修复错误

### 0.0.3
  （instalator）阿尔法

### 0.0.1
  （instalator）最初