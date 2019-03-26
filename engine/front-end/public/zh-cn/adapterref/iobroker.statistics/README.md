---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/foxthefox/ioBroker.statistics/edit/master//README.md
title: statistics
hash: 2MeHd4l9oZh38uXGd/qfbyA/wmfX2B4yvi9N/vaTpfk=
adapter: true
license: MIT
authors: foxthefox <foxthefox@wysiwis.net>, bluefox <dogafox@gmail.com>
description: Calculate statistics: day minimum, day maximum, day average, delta and so on for defined states
keywords: statistics, sum, daily value
readme: https://github.com/foxthefox/ioBroker.statistics/blob/master/README.md
mode: daemon
materialize: true
compact: true
published: 2019-01-06T21:33:35.419Z
version: 0.2.0
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.statistics.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.statistics.svg
BADGE-建立状态: https://travis-ci.org/foxthefox/ioBroker.statistics.svg?branch=master
BADGE-NPM: https://nodei.co/npm/iobroker.statistics.png?downloads=true
---
![商标](zh-cn/adapterref/iobroker.statistics/../../../en/adapterref/iobroker.statistics/admin/statistics.png)


＃ioBroker.statistics
##说明
此适配器将使统计信息的配置更加容易。

`The adapter only reacts on state changes (state.ack=true), not on commands!`

从以下设置中选择：

*计数脉冲或开/关变化（仅适用于二进制值和上升沿）
*从计算值计算成本（仅适用于二进制值）
*状态为真/开多长时间以及假/关多长时间（仅限二进制值）
*记录的模拟值之间的差值（仅适用于模拟值）
*每日最大值，最小值和平均值（不用于增量计算）
*计数在5分钟内，每日最大值，最小值和平均值（不用于增量计算）
*分组值的总和

适配器订阅已配置的对象，并在统计信息树中创建自己的状态。

创建了2个单独的树：

* statistics.0.save  - >时间范围的最终值
* statistics.0.temp  - >临时值直到传输保存的时刻，然后temp再次启动

该州的结构是：`statistics.0.{save|temp}.{kind of stat}.{original observed state}.{state of statistical value}`

德语HowTo文档可在此处获得：[howto_de](./doc/howto_de.md)

##设置
*在实例配置页面中指定相关组（admin => instances => statistics config）
*在状态设置中指定配置（admin => objects）

## Changelog
### 0.2.0 [2019-01-08]
* (foxthefox) compact mode

### 0.1.4 [2019-01-07]
* (foxthefox) license added in io-package.json
* (foxthefox) ReadMe updated
* (foxthefox) type = misc-data

### 0.1.3 [2019-01-06]
* first npm release
* (foxthefox) german doc added
* (foxthefox) error corrections
* (foxthefox) travis testing corrections

### 0.1.2 [2018-09-08]
* (bluefox) total refactoring

### 0.0.3
* admin3 implemented
* complete rewrite to have configuration through the settings of the individual states instead in admin page

### 0.0.2
* setup running

### 0.0.1
* initial release

## License

The MIT License (MIT)

Copyright (c) 2018 foxthefox <foxthefox@wysiwis.net>,
                   bluefox <dogafox@gmail.com>