---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.meteoalarm/README.md
title: ioBroker.meteoalarm
hash: dUsld3yH2f1dAw2TT8qbx9+CnNQoHa33NCkdJM9WCSM=
---
![商标](../../../en/adapterref/iobroker.meteoalarm/admin/meteoalarm.png)

![Greenkeeper徽章](https://badges.greenkeeper.io/jack-blackson/ioBroker.meteoalarm.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.meteoalarm.svg)
![下载](https://img.shields.io/npm/dm/iobroker.meteoalarm.svg)
![安装数量](http://iobroker.live/badges/meteoalarm-stable.svg)
![NPM](https://nodei.co/npm/iobroker.meteoalarm.png?downloads=true)

＃ioBroker.meteoalarm
=================

meteoalarm适用于ioBroker的适配器---------------------------------------------- --------------------------------此适配器正在从meteoalarm.eu提取天气警报，其中包括风，雪，雨，高低温等。此信息以当地语言和详细地区提供。

＃＃ 如何使用它
请访问http://meteoalarm.eu并选择您所在的地区。然后转到右上角的RSS符号，右键单击并复制链接。这是您要添加到适配器设置的链接。

![商标](../../../en/adapterref/iobroker.meteoalarm/screenshot.png)

##可用字段
|字段名称|描述|
|:---:|:---:|
|上次更新|适配器上次接收数据的日期|
|链接|链接到RSS Feed |
|位置|报警位置|
|发布日期|发布日期根据网站的报警|
| HTMLToday |今天显示警报的HTML小部件 |
|今天/明天|这些数据点可用于今天和明天：|
|文本|报警文本以国家特定语言|
|从|报警开始日期|
|至|报警结束日期|
|输入|报警类型为编号|
| TypeText |报警类型为文本|
|级别|报警级别为数字|
| LevelText |报警级别为文本|
|颜色|小部件的报警颜色|
|图标|报警类型图标|

##报警类型
|报警类型|描述|
|:---:|:---:|
| 1 |风|
| 2 |冰/雪|
| 3 |雷霆和闪电|
| 4 |雾|
| 5 |高温|
| 6 |低温|
| 7 |海岸活动|
| 8 |福雷斯特火|
| 9 |雪崩|
| 10 |雨|
| 11 |未知|
| 12 |洪水|
| 13 |雨洪水|

##警报级别
|警报级别|描述|
|:---:|:---:|
|绿色|目前没有可用的警告 |
|黄色|天气有潜在危险。预测的天气现象并不罕见，但应加强对暴露于气象风险的活动的关注。让自己了解预期的气象条件，不要冒任何可避免的风险 |
|橙色|天气很危险。人们已经预测到了不寻常的气象现象。可能发生损坏和事故。要非常周到和细心，并及时了解预期的气象条件。 |
|红色|天气非常危险。预测到异常强烈的气象现象。极端的破坏和事故，通常是在大面积区域，威胁生命和财产。 |

##支持的国家/地区
*奥地利
* 克罗地亚
*芬兰人
*德国
*匈牙利
* 意大利
*荷兰
* Norwege
*西班牙

如果你找不到你的国家，请在github上创建一个问题，我很乐意添加它

##不可能是国家
*法国（没有RSS提要）
*葡萄牙（不分裂）
*斯洛文尼亚（没有RSS提要）

##要实现的功能
*一天处理多个警报

## 1.0.4（2019-09-11）
*（杰克 - 布莱克森）特拉维斯错误

## 1.0.3（2019-09-09）
*（jack-blackson）小错误修正，从“deamon”类型更改为“schedule”

## 1.0.2（2019-08-25）
*（jack-blackson）重新发布的信息

### 1.0.1（2019-08-18）
*（jack-blackson）修正无警报图标

### 1.0.0（2019-08-12）
*（jack-blackson）发行版

### 0.6.0（2019-08-05）
*（jack-blackson）在适配器中存储本地天气图标

### 0.5.0（2019-07-21）
*（jack-blackson）处理超时
*（jack-blackson）所有语言的翻译
*（jack-blackson）URL检查

### 0.4.0（2019-07-20）
*（jack-blackson）为NL，NO，HR，FI，ES添加了数据
*（jack-blackson）添加了类型文本，如果等级为1，则类型现在为空（无警告）
*（jack-blackson）调整后的颜色

### 0.3.0（2019-07-13）
*（jack-blackson）添加了HTML Widget
*（jack-blackson）Bugfix图标

### 0.2.0（2019-07-12）
*（jack-blackson）添加了“明天”数据

### 0.1.0（2019-07-11）
*（jack-blackson）初始版本

##学分
Bell图标由Freepik设计，来自www.flaticon.com

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