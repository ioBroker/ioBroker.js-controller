---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.countdown/README.md
title: ioBroker.countdown
hash: Zev4uVyABT0yxwZxD5Oz+mujy9UL8xc4M5AO6iz8v3A=
---
![商标](../../../en/adapterref/iobroker.countdown/admin/countdown.png)

![Greenkeeper徽章](https://badges.greenkeeper.io/jack-blackson/ioBroker.countdown.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.countdown.svg)
![下载](https://img.shields.io/npm/dm/iobroker.countdown.svg)
![安装数量](http://iobroker.live/badges/countdown-stable.svg)
![NPM](https://nodei.co/npm/iobroker.countdown.png?downloads=true)

＃ioBroker.countdown
=================

ioBroker的倒计时适配器---------------------------------------------- --------------------------------

适配器的目标是为您提供对未来事件进行倒计时的可能性，包括年，月，日，小时和分钟。它将分别为您提供每个valies，以及两个带有短期和长期日期的字符串。

##显示倒计时
适配器会自动为您提供json表。你只需要将它与json表widged一起使用。请在那里勾选“No Header”。可以显示短文本或长文本。
![商标](../../../en/adapterref/iobroker.countdown/admin/countdown_json.png)

##如何创建倒计时
设置倒计时有两种方法：

*您可以在设备“设置”中创建手动状态。对象的名称是警报名称，值将是日期。 neets的格式为“DD.MM.YYYY HH：mm：ss”。
*您可以使用sendto创建警报。在那里，您可以发送组件（最小为年月日期）或日期字符串。对于日期字符串，您可以调整适配器设置中的格式。

![商标](../../../en/adapterref/iobroker.countdown/admin/countdown_blocky.png)

*您可以将sendto添加到今天的日期，月份和年份。因此，请将组件“name”和“addminutes”，“addhours”，“adddays”，“addmonths”或“addyears”作为int值发送。

![商标](../../../en/adapterref/iobroker.countdown/admin/countdown_blocky_add.png)

##如何删除倒计时
您可以使用sendto删除倒计时。因此，只需将带有sendto的名称发送到适配器，倒计时将自动删除。

##可用输出
|数据类型|描述|
|:---:|:---:|
|分钟|倒数结束前的分钟（不是全部！）|
|小时|倒数结束前的小时数（不是全部！）|
|天|倒计时结束的天数（不是全部！）|
|月|倒计时结束的月份（不是全部！）|
|年|倒计时结束的年份（不是全部！）|
|名称|倒计时名称|
| endDate |倒计时结束日期 - 在设置定义中格式化 |
| inWordsShort |分钟，小时，...的组合值 - 例如1Y 5M 4D |
| inWordsLong |分钟，小时，...的组合值 - 例如1年5个月4天|
| totalHours |结束日期前的总小时数|
| totalDays |截至结束日期的总天数|
| totalWeeks |截至结束日期的总周数|
| reach |定义是否到达结束日期的布尔字段 |

##要添加的功能
*可以添加脚本作为参数，并在倒计时结束时启动它
*可以在addminutes和其他添加功能中使用加号和减号

## 0.5.0（2019-07-04）
*（jack-blackson）调整表格中的数据
*（jack-blackson）错误修正日期导入

## 0.6.0（2019-07-06）
*（jack-blackson）可调日期格式，用于输入和输出
*（jack-blackson）用sendto删除倒计时
*（jack-blackson）从现在开始按天/月/周添加倒计时的能力

## 0.7.0（2019-07-07）
*（jack-blackson）错误修正
*（jack-blackson）addminutes和addhours现在也是可能的
设置中的*（jack-blackson）数据点现在可以编辑
*（杰克 - 布莱克森）增加了总数。几个星期

## 1.0.2（2019-07-22）
*（jack-blackson）发行版

## 1.0.3（2019-08-10）
*（jack-blackson）紧凑模式的变化
*（jack-blackson）各种错误修正
*（jack-blackson）现在可以使用适配器的多个实例

## Changelog
### 0.1.0 (2019-04-29)
* (jack-blackson) initial version

### 0.2.0 (2019-05-21)
* (jack-blackson) adjusted packages

### 0.3.0 (2019-05-24)
* (jack-blackson) added total No. of days and hours

### 0.4.0 (2019-06-04)
* (jack-blackson) restructuring - creation of alarms with sendto or manually with datapoint is now possible

## License
The MIT License (MIT)

Copyright (c) 2019 jack-blackson <blacksonj7@gmail.com>

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