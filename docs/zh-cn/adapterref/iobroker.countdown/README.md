---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.countdown/README.md
title: ioBroker.countdown
hash: fGTU+SIk/WT8113/GNv8Lzz/zMLM1jDhiNgxQPHmVCQ=
---
![商标](../../../en/adapterref/iobroker.countdown/admin/countdown.png)

![环保管理员徽章](https://badges.greenkeeper.io/jack-blackson/ioBroker.countdown.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.countdown.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.countdown.svg)
![安装数量](http://iobroker.live/badges/countdown-stable.svg)
![NPM](https://nodei.co/npm/iobroker.countdown.png?downloads=true)

＃ioBroker.countdown
=================

ioBroker倒计时适配器---------------------------------------------- --------------------------------

适配器的目标是使您可以为以后的事件（包括年，月，日，小时和分钟）运行倒计时。它将分别为您提供所有这些价位，以及两个带有日期的长短版本的字符串。

##显示倒计时
适配器会自动为您扩展一个json表。您只需要将其与json表一起使用即可。请在此处勾选“无标题”。可以显示短文本或长文本。
![商标](../../../en/adapterref/iobroker.countdown/admin/countdown_json.png)

##如何建立倒数
设置倒计时有两种方法：

*您可以在适配器设置的“创建倒数”选项卡中创建倒数。
*您可以在设备“设置”中创建手动状态。对象的名称是警报名称，值将是日期。日期必须采用“ DD.MM.YYYY HH：mm：ss”格式。
*您可以使用sendto创建警报。在那里，您可以发送组件（最少是年月日）或日期字符串。对于日期字符串，您可以在适配器的设置中调整格式。

![商标](../../../en/adapterref/iobroker.countdown/admin/countdown_blocky.png)

*您可以将日期，月份和年份与sendto添加到今天的日期。因此，请发送组件“名称”以及“ addminutes”，“ addhours”，“ adddays”，“ addmonths”或“ addyears”作为int值。

![商标](../../../en/adapterref/iobroker.countdown/admin/countdown_blocky_add.png)

##如何删除倒计时
您可以使用sendto删除倒数计时。因此，仅将带有sendto的名称发送到适配器，倒计时将自动删除。

##重复倒数
如果您希望倒计时在指定的时间段内重复进行（例如，您无法在每年的婚礼当天倒数），也可以使用此适配器进行。因此，或者在适配器的设置中填写“重复周期”字段，或者在创建类型为“日期”的倒计时时在日期之后添加周期。 sendTo类似于倒计时，应该在2020年4月1日结束并每年重复一次：

sendTo（“ countdown.0”，“ send”，{“ name”：'Wedding Day'，“ date”：'01 .04.2020 00：01 + 1Y'}）;

这里的参数是：

* Y：年
* M：月
* D：天
* H：小时
* m：分钟

##可用输出
|数据类型|描述|
|:---:|:---:|
|分钟|分钟，直到倒计时结束（不总计！）|
|小时|数到倒计时结束为止的小时数（不是总计！）|
|天|直到倒计时结束的天数（不总计！）|
|个月|直到倒计时结束的月数（不总计！）|
|年|倒计时结束为止的年数（总计！）|
|名称|倒数名称|
| endDate |倒计时的结束日期-格式如定义的设置|
| inWordsShort |分钟，小时，...的组合值-例如1年5M 4D |
| inWordsLong |分钟，小时，...的组合值-例如1年5个月4天|
| totalHours |截至结束日期的总小时数|
| totalDays |到结束日期的总天数|
| totalWeeks |到结束日期为止的总周数|
| reached |布尔值字段，定义是否达到结束日期|
| repeatEvery |在到达结束日期后的这段时间内重复倒计时|

##要添加的功能
*可以添加脚本作为参数并在倒计时结束时启动它
*可以在分钟中使用加号和减号，以及其他添加功能

## 1.1.0（2020-04-02）
*（jack-blackson）错误修正自述链接
*（杰克·布莱克森）错误修正重复循环

## 1.0.9（2020-03-31）
*（jack-blackson）错误修正日志消息

## 1.0.8（2020-03-31）
*（jack-blackson）在定义的时间段内（例如每年）重复倒数计时

## 1.0.7（2020-03-30）
*（jack-blackson）为设置添加了新的日期类型：YYYY-MM-DD
*（jack-blackson）直接在适配器设置中添加倒数计时

## 1.0.6（2020-03-20）
*（DutchmanNL）固定适配器类型

## 1.0.5（2020-02-05）
*（jack-blackson）修正了午夜警报->感谢@Lueghi

## 1.0.4（2019-08-25）
*（jack-blackson）重新排序了发布信息

## 1.0.3（2019-08-10）
*（jack-blackson）更改为紧凑模式
*（jack-blackson）各种错误修正
*（jack-blackson）现在可以具有多个adapater实例

## 1.0.2（2019-07-22）
*（jack-blackson）发行版本

## 0.7.0（2019-07-07）
*（杰克·布莱克森）错误修正
*（jack-blackson）现在也可以添加分钟和添加小时
*设置中的（jack-blackson）数据点现在可编辑
*（jack-blackson）添加了总数。数周

## 0.6.0（2019-07-06）
*（jack-blackson）可调日期格式，用于输入和输出
*（jack-blackson）使用sendto删除倒数计时
*（jack-blackson）可以按“从现在开始的天/月/周”添加倒计时

## 0.5.0（2019-07-04）
*（jack-blackson）调整表格中的数据
*（杰克·布莱克森）错误修正日期导入

### 0.4.0（2019-06-04）
*（jack-blackson）重组-现在可以使用sendto或使用datapoint手动创建警报

### 0.3.0（2019-05-24）
*（jack-blackson）增加的总天数和小时数

### 0.2.0（2019-05-21）
*（杰克·布莱克森）调整后的套餐

### 0.1.0（2019-04-29）
*（杰克·布莱克森）初始版本

## Changelog

## License
The MIT License (MIT)

Copyright (c) 2019-2020 jack-blackson <blacksonj7@gmail.com>

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