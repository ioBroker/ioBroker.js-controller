---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis-weather/README.md
title: ioBroker.vis天气
hash: 9kdqDhi+btPZ0neZoDFdB8A77uv3pxdmCKw5C04ENzk=
---
![标识](../../../en/adapterref/iobroker.vis-weather/admin/vis-weather.png)

![安装数量](http://iobroker.live/badges/vis-weather-stable.svg)
![NPM版本](https://img.shields.io/npm/v/iobroker.vis-weather.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.vis-weather.svg)
![测验](https://travis-ci.org/rg-engineering/ioBroker.vis-weather.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.vis-weather.png?downloads=true)

＃ioBroker.vis-天气
**如果您愿意，请考虑捐赠：**

[![贝宝（https://www.paypalobjects.com/zh_CN/DK/i/btn/btn_donateCC_LG.gif）](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YBAZTEBT9SYC2&source=url)

该可视组件显示来自DasWetter.com或weatherunderground的天气预报数据。您还需要运行DasWetter-Adpater或weatherunderground-Adapter ...

在地下天气中，您需要启用接下来的36小时的预测。
在DasWetter.com中，您需要启用四个预测数据结构之一。您可以选择要显示的那个。

##注释/ Wiki
###定义预报时间
默认情况下，预测图显示40小时（DaSWetter）或36小时（地下）。如果您只想显示例如预测10小时，只需在vis-edit中删除oid_groups下不必要的OID。

使用DasWetter时不会自动创建### OID
通常，当您选择实例或数据结构时，会自动创建OID。当您收到“没有可用的OID”时，请检查是否在DasWetter中使用“ NextDaysDetailed”。
您可能需要启用“ NextDaysDetailed”。

＃＃ 已知的问题
*如果发现错误或有新功能，请在[github]（https://github.com/rg-engineering/ioBroker.vis-weather/issues）上创建问题

## Changelog

### 2.5.3 (2021-03-21)
* (René) dependencies updated

### 2.5.2 (2019-12-12)
* (René) some changes to make it compatible with widgets in sbfspot and ebus

### 2.5.1 (2019-12-08)
* (René) alignment of bars with marking
* (René) position of tick labels of Y axis changed

### 2.5.0 (2019-12-07)
* (René) see issue #20: scaling problem solved 
* (René) see issue #22: bugfix colors for axis labeling 
* (René) color adjustment for axis and tick lables 
* (René) more adjustments for ticks on Y axis
* (René) see issue #23: names for legend adjustable

### 2.4.0 (2019-10-31)
* (René) legend added

### 2.3.2 (2019-10-24)
* (René) add logs for issue #20
* (René) update flot to version 3.0

### 2.3.1 (2019-07-13)
* (René) bug fix: missing timer added

### 2.3.0 (2019-03-25)
* (René) markings added

### 2.2.2 (2018-12-30)
* (René) bug fix: If oid_date is not set when using weatherunderground, an unnecessary error message was issued and the plot was not shown

### 2.2.1 (2018-12-23)
* (René) bug fix issue #12: unnecessary code removed

### 2.2.0 (2018-08-25)
* (René) OID's for different data structures (only DasWetter 2.x)

### 2.1.1 (2018-08-24)
* (René) bug fixes

### 2.1.0 (2018-08-18)
* (René) support of 2.x of weatherundergruond

### 2.0.0
* (René) support of 2.x of daswetter.com

### 1.2.0
* (René) background color and border

### 1.1.2
* (René) Support of admin3

### 1.1.1
* (René) Y axis with units

### 1.1.0
* (René) logs auskommentiert
* (René) Berechnung min / max für Temperaturgraph optimiert
* (René) Y-Achse automatisch ausblenden, wenn Graph nicht dargestellt wird
* (gitbock) konfigurierbare Y-Achsen je Graph (anzeigen/nicht anzeigen)
* (gitbock) Y-Achsen Beschriftung in der Farbe des Graphen
* (gitbock) Max.-/Min Werte für Temperatur Y-Achse
* (gitbock) konfigurierbares Datumsformat für X-Achse

### 1.0.0
* (René) first stable version

### 0.0.7
* (René) bug fix for android app > 1.0.6
* (René) color adjustment for ticks and tick lable (from sbfspot)

### 0.0.6
* (René) css removed

### 0.0.5
* (René) number of labels on X axis adjustable

### 0.0.4
* (René) bug fixes

### 0.0.3
* (René) support of DasWetter.com and weatherunderground

### 0.0.2
* (René) bug fixes
	- in live mode nothing was shown

### 0.0.1
* (René) initial release

## License
Copyright (C) <2017 - 2021>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.