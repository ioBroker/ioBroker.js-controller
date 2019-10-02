---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.meteoalarm/README.md
title: ioBroker.meteoalarm
hash: /UuqRf0fQOLjTNWpl4OG3gv7l+6zCiWKQ3xcZQ2NpEc=
---
![商标](../../../en/adapterref/iobroker.meteoalarm/admin/meteoalarm.png)

![环保管理员徽章](https://badges.greenkeeper.io/jack-blackson/ioBroker.meteoalarm.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.meteoalarm.svg)
![下载](https://img.shields.io/npm/dm/iobroker.meteoalarm.svg)
![安装数量](http://iobroker.live/badges/meteoalarm-stable.svg)
![NPM](https://nodei.co/npm/iobroker.meteoalarm.png?downloads=true)

＃ioBroker.meteoalarm
=================

ioBroker的meteoalarm适配器---------------------------------------------- --------------------------------此适配器从meteoalarm.eu获取天气警报，包括风，雪，雨，高温和低温等。此信息以本地语言和详细区域提供。

＃＃ 如何使用它
请访问http://meteoalarm.eu并选择您的地区。然后转到右上角的RSS符号，右键单击并复制链接。这是您需要添加到适配器设置的链接。

![商标](../../../en/adapterref/iobroker.meteoalarm/screenshot.png)

##可用字段
|字段名称|描述|
|:---:|:---:|
|最后更新|适配器上次接收数据的日期|
|链接|链接到RSS源|
|位置|警报位置|
|发布日期|根据网站的警报发布日期|
| HTMLToday |显示今日警报的HTML小部件|
|今天/明天|这些数据点可用于今天和明天：|
|文字|使用特定国家/地区语言的警报文字|
|发件人|报警开始日期|
|收件人|报警结束日期|
|类型|警报类型作为编号|
| TypeText |警报的类型为文本|
|级别|警报级别为数字|
| LevelText |警报级别为文本|
|颜色|小部件的警报颜色|
|图标|报警类型图标|

##警报类型
|警报类型|描述|
|:---:|:---:|
| 1 |风|
| 2 |冰/雪|
| 3 |雷电|
| 4 |雾|
| 5 |高温|
| 6 |低温|
| 7 |海岸事件|
| 8 |阿甘之火|
| 9 |雪崩|
| 10 |雨|
| 11 |未知|
| 12 |洪水|
| 13 |雨洪水|

##警报级别
|警报级别|描述|
|:---:|:---:|
|绿色|当前无警告。 |
|黄色|天气潜在危险。预计的天气现象并不罕见，但应更加重视面临气象风险的活动。使自己了解预期的气象状况，并且不要承担任何可避免的风险。 |
|橙色|天气很危险。已经预测到异常的气象现象。可能会造成损坏和事故。要非常细心和小心，并与预期的气象条件保持同步。 |
|红色|天气非常危险。可以预料到异常强烈的气象现象。经常在大面积上发生的极端损坏和事故危及生命和财产。 |

##支持的国家
*奥地利
* 克罗地亚
*芬兰
*德国
*匈牙利
* 意大利
*荷兰
*挪威
*西班牙

如果找不到您的国家，请在github上创建一个问题，我很乐意添加

##不可能的国家
*法国（无RSS提要）
*葡萄牙（不可分裂）
*斯洛文尼亚（没有RSS提要）

##要实现的功能
*一天处理多个警报

## 1.0.5（2019-09-22）
*（jack-blackson）较小的日志调整

## 1.0.4（2019-09-11）
*（杰克·布莱克森）特拉维斯错误

## 1.0.3（2019-09-09）
*（jack-blackson）的一些小错误修正，从“恶魔”类型更改为“时间表”

## 1.0.2（2019-08-25）
*（jack-blackson）重新排序了发布信息

### 1.0.1（2019-08-18）
*（jack-blackson）错误修正没有警报图标

### 1.0.0（2019-08-12）
*（jack-blackson）发行版本

### 0.6.0（2019-08-05）
*（jack-blackson）将天气图标存储在适配器本地

### 0.5.0（2019-07-21）
*（jack-blackson）处理超时
*（jack-blackson）所有语言的翻译
*（jack-blackson）URL检查

### 0.4.0（2019-07-20）
*（jack-blackson）添加了NL，NO，HR，FI，ES的数据
*（jack-blackson）添加了Type文本，如果Level为1，Type现在为空（无警告）
*（杰克·布莱克森）调整后的颜色

### 0.3.0（2019-07-13）
*（jack-blackson）添加了HTML小部件
*（jack-blackson）错误修正图标

### 0.2.0（2019-07-12）
*（jack-blackson）添加了“明天”数据

### 0.1.0（2019-07-11）
*（杰克·布莱克森）初始版本

##学分
钟声由Freepik从www.flaticon.com设计

## Changelog

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