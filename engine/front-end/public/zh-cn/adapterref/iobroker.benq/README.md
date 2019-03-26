---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/instalator/iobroker.benq/edit/master//README.md
title: BenQ projector
hash: 2039cqFb9k988C4gt5gK+GzckJciWBfUOICU+P1JwsM=
adapter: true
license: MIT
authors: instalator
description: ioBroker BenQ projector Adapter
keywords: benq projector
readme: https://github.com/instalator/iobroker.benq/blob/master/README.md
mode: daemon
materialize: false
compact: false
published: 2017-07-20T16:42:10.650Z
version: 0.2.0
BADGE-安装数量: http://iobroker.live/badges/benq-stable.svg
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.benq.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.benq.svg
BADGE-测试: http://img.shields.io/travis/instalator/ioBroker.benq/master.svg
BADGE-NPM: https://nodei.co/npm/iobroker.benq.png?downloads=true
---
![商标](zh-cn/adapterref/iobroker.benq/../../../en/adapterref/iobroker.benq/admin/benq-logo.png)ioBrokerBenQ投影仪适配器=================


IoBroker BenQ投影仪适配器用于通过RS232与Etnernet网关一起控制BenQ投影机。
模型和命令列表包含在`admin/commands.json`文件中。

＃＃ 硬件
该驱动程序允许您通过RS232到以太网的[适配器](http://blog.instalator.ru/archives/744)连接到投影仪BenQ。

作为以太网的RS232网关，使用任何需要下载[这段代码](https://github.com/stepansnigirev/ArduinoSerialToEthernet)的Arduino兼容卡。
您还需要一个Ethernet Shield W5100或W5500以及一个RS232到TTL转换器。

##支持
支持型号：W1200，W1070，W1080待...