---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker-community-adapters/ioBroker.opi/edit/master//README.md
title: OPI-监控
hash: qCQ8fHk1aPPvId/F6XawZRmekkuZrbj6rhVN3lwc9ZI=
adapter: true
license: MIT
authors: Christian Baumgartner, husky-koglhof <husky.koglhof@icloud.com>, Johnny Schneider, Johann Schneider <johann.schneider1@googlemail.com>
description: 适用于ioBroker的OPi-Monitor
keywords: ioBroker, monitoring, orangepi
readme: https://github.com/ioBroker-community-adapters/ioBroker.opi/blob/master/README.md
mode: daemon
materialize: true
compact: false
published: 2018-01-22T21:44:32.139Z
version: 0.1.1
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.opi.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.opi.svg
BADGE-NPM: https://nodei.co/npm/iobroker.opi.png?downloads=true
---
![商标](zh-cn/adapterref/iobroker.opi/../../../en/adapterref/iobroker.opi/admin/opi.png)


＃ioBroker.opi ===================
用于集成到ioBroker的OPI-Monitor实现。

###重要信息
测试硬件：OrangePi plus2 H3

###选择后可以使用以下对象：
＃＃ *中央处理器*
 -  cpu_frequency
 -  load1
 -  load5
 -  load15

## *内存*
 -  memory_available
 -  memory_free
 -  memory_total

## *网络（eth0）*
 -  net_received
 -  net_send

## *eMMC*
 -  emmc_root_total
 -  emmc_root_used

## *交换*
 -  swap_total
 -  swap_used

## *温度*
 -  soc_temp

## *正常运行时间*
 - 正常运行时间

## *WLAN*
 -  wifi_received
 -  wifi_send

###配置
在配置页面上，您可以选择以下模块：

- 中央处理器
 - 记忆
 - 网络
 -  eMMC
 - 交换
 - 温度
 - 正常运行时间
 -  WLAN

## 0.1.1（2018-01-27）
 - 更新index_m.html。
 - 更新index.html。
 - 更新代码。

## 0.1.0（2018-01-24）
 -  Admin3支持。

## 0.0.6（2017-08-01）
 - 稳定释放。

## 0.0.2（2017-06-01）
- 初始发行。测试版。

## Changelog

## License
Modified for OrangePi by Johnny Schneider <johann.schneider1@googlemail.com>

Copyright (c) 2015-2016 husky-koglhof <husky.koglhof@icloud.com>

MIT License