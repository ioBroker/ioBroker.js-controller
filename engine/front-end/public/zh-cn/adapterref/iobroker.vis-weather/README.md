---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/rg-engineering/ioBroker.vis-weather/edit/master//README.md
title: weather Widgets
hash: v9U5MmBKLZn7eNYWoMMIyxF03vU4izz5HZhNy4FbkYc=
adapter: true
license: MIT
authors: René G. <info@rg-engineering.eu>
description: general flot-based weather Widgets to be used with daswetter or weatherundergrund adapter
keywords: weather, vis, GUI, graphical, scada
readme: https://github.com/rg-engineering/ioBroker.vis-weather/blob/master/README.md
mode: once
materialize: true
compact: false
published: 2017-05-14T10:52:23.840Z
version: 2.2.2
BADGE-安装数量: http://iobroker.live/badges/vis-weather-stable.svg
BADGE-NPM版本: https://img.shields.io/npm/v/iobroker.vis-weather.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.vis-weather.svg
BADGE-测试: https://travis-ci.org/rg-engineering/ioBroker.vis-weather.svg?branch=master
BADGE-NPM: https://nodei.co/npm/iobroker.vis-weather.png?downloads=true
---
![商标](zh-cn/adapterref/iobroker.vis-weather/../../../en/adapterref/iobroker.vis-weather/admin/vis-weather.png)


＃ioBroker.vis-weather
这个vis-widget显示来自DasWetter.com或weatherunderground的天气预报数据你需要DasWetter-Adpater或weatherunderground-适配器运行...

在weatherunderground，您需要预测未来36小时启用。
在DasWetter.com中，您需要启用四种预测数据结构之一。您可以选择要显示的那个。

## Notes / wiki
###定义预测小时数
默认情况下，预测图显示40小时（DasWetter）或36小时（wunderground）。如果你愿意只显示例如预测10小时，只需在vis-edit中删除oid_groups下不必要的OID。

## Changelog

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
Copyright (C) <2017 - 2018>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.