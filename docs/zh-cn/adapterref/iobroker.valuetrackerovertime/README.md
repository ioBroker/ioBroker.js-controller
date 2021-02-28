---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.valuetrackerovertime/README.md
title: ioBroker.valuetrackerovertime
hash: bR/4DaqaDwejQvgP5BIKrDAMdi+lFoYoip5W2O5eqUI=
---
![标识](../../../en/adapterref/iobroker.valuetrackerovertime/admin/ValueTrackerOverTime_Logo.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.valuetrackerovertime.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.valuetrackerovertime.svg)
![安装数量（最新）](http://iobroker.live/badges/valuetrackerovertime-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/valuetrackerovertime-stable.svg)
![依赖状态](https://img.shields.io/david/Omega236/iobroker.valuetrackerovertime.svg)
![已知漏洞](https://snyk.io/test/github/Omega236/ioBroker.valuetrackerovertime/badge.svg)
![NPM](https://nodei.co/npm/iobroker.valuetrackerovertime.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/Omega236/ioBroker.valuetrackerovertime/master.svg)

＃ioBroker.valuetrackerovertime
[![构建状态]（https://travis-ci.com/Omega236/ioBroker.valuetrackerovertime.svg?branch=master）](https://travis-ci.com/Omega236/ioBroker.valuetrackerovertime)

ioBroker的## valuetrackerovertime适配器
跟踪所有数字及其增加/减少。然后，该数据将用于构建有关变化率的统计信息，并以小时，天，周，月，季度和年等时间显示。收集的数据可用于可视化，即图表中的功耗。

##设置
ValueTrackerOverTime的设置将在两个地方完成。默认设置将在适配器本身的实例中处理，单个数据点的设置将在包含要跟踪的数据的数据点中完成。

＃＃＃ 默认设置
![阴谋](../../../en/adapterref/iobroker.valuetrackerovertime/admin/DefaultSettings.png)这些是默认设置，每当您在数据点上激活ValueTrackerOverTime时，系统都会提示它们。对于每个数据点，可以自定义这些值，但在此处将最常用的初始值设置为默认值，因此以后不必进行许多修改。

####详细的历史记录
在“详细历史记录”部分中，将选择要创建的数据点。您想收集每个人的数据吗？

* 天
* 星期
* 月
*季度（一年）
* 年

####当前/以前的数据
在“当前/先前数据”部分中，您可以选择要为每个时间范围生成的每个ValueTrackerOverTime-datapoint保留收集的数据多长时间。
有意义的是，一旦数据结束在另一个数据点中就停止收集（例如：7天后，可以在一周之内找到该数据。4周后，该数据将在一个月内找到自己...）

####计数器重置检测
此值应始终启用并设置为1。在重置原始数据点中的值之后，它有助于ValueTrackerOverTime进行正确的读数。

###数据点设置
![阴谋](../../../en/adapterref/iobroker.valuetrackerovertime/admin/DatapointSettings.png)在此设置中，您必须指定一个nema，它将用作此选择节点的数据点名称。此外，您还必须提供要用于收集数据的单位。
因此，如果要测量降雨量，可以添加单位l /m²，或者要以瓦特小时（kWh）的形式测量消耗的Enerry。
如果数据点本身使用不同的单位（即Wh），则可以在此处添加一个乘数（即60或1/60）以将数据转换为所需的单位。

其余设置将覆盖适配器实例中设置的默认设置。

＃＃ 数据点
根据要收集的选定时间范围，适配器将为您要跟踪的每个数据点创建其自己的数据点。

图片中提供了三个示例。由于屏幕截图是在1月3日（新年/月初）拍摄的，因此请原谅数据不是那么丰富多彩，而且多样化。

*今天您看到的是0.3 l /m²的雨量计数器（再生），整周都没有变化。
*在这个冬季的一周中，阳光根本没有照耀（对于我的较弱的气象站来说，这意味着它每天没有比4,500lm更高的亮度）
*然而，能源消耗将向您显示计算机的当前日期设置为0.351kWh，星期设置为1.909 kWh，年份设置为1.393 kWh（这是因为今天是星期天，而一周已经是7天，但它也是1月3日，因此该年份仅三天了。

## Changelog
### 0.6.0 (18.02.2021)
* (Omega236) add function to store history-Data to current-DP history"
### 0.5.4
* (Omega236) optimize RAM-Usage (Remove .toLocaleString)
### 0.5.3
* (Omega236) bugfix startvalue not used after SQL read out
### 0.5.2
* (Omega236) bugfix _getObjectAsync not worked
### 0.5.1
* (Omega236) optimizations, HistoryAnalyse extended and CurrentHistory added
### 0.4.1
* (Omega236) bugfix DetailedYear not saved, bugfix HistoryDetailed not used Multi
### 0.4.0
* (Omega236) HistoryAnalyseDetailed Added, Bugfix KW
### 0.3.5
* (Omega236) reset Detection optimize and bugfix only ack
### 0.3.4
* (Omega236) Check for duplicate Alias and reduce recalcs on start-value changed
### 0.3.3
* (Omega236) bugfix date object changed
### 0.3.2
* (Omega236) reemove selectID.js from index_m.html
### 0.3.1
* (Omega236) first public
### 0.0.1
* (Omega236) initial release

## License
MIT License

Copyright (c) 2021 Omega236 <general.of.omega@googlemail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.