---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/rg-engineering/ioBroker.sbfspot/edit/master//README.md
title: SMA inverter (sbfspot)
hash: qolVS84J624LluZQic5j5y11ebd6Q/iZPmPHFFia+rE=
adapter: true
license: MIT
authors: René G. <info@rg-engineering.eu>
description: SMA inverter (sbfspot) Adapter with vis widget
keywords: sbfspot
readme: https://github.com/rg-engineering/ioBroker.sbfspot/blob/master/README.md
mode: schedule
materialize: true
compact: true
published: 2017-06-03T14:49:48.110Z
version: 2.3.2
BADGE-安装数量: http://iobroker.live/badges/sbfspot-stable.svg
BADGE-NPM版本: https://img.shields.io/npm/v/iobroker.sbfspot.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.sbfspot.svg
BADGE-测试: https://travis-ci.org/rg-engineering/ioBroker.sbfspot.svg?branch=master
BADGE-NPM: https://nodei.co/npm/iobroker.sbfspot.png?downloads=true
---
![商标](zh-cn/adapterref/iobroker.sbfspot/../../../en/adapterref/iobroker.sbfspot/admin/sbfspot.png)


#ioBroker.sbfspot
该适配器使用sbfspot从SMA功率逆变器读取数据。
现在支持两种数据库类型（mySQL和sqlite）。
从版本0.2.3开始，有一个基于flot的自己的vis小部件可用于显示历史数据。

提示：

*使用来自https://github.com/SBFspot/SBFspot或https://github.com/rg-engineering/SBFspot的sbfspot的最新版本
*适配器，sbfspot和数据库（mySQL或sqlite）必须在同一系统上运行，例如覆盆子PI
*可以在https://github.com/SBFspot/SBFspot/wiki/Installation-Linux-SQLite或https://www.rg-engineering.eu/index下找到Raspberry Pi（或类似版本）上的sbfspot安装手册。 PHP / PRODUKTE /软件/插件，妇儿-iobroker-sbfspot
*对于Raspberry Pi，有一个半自动配置工具，可在https://github.com/SBFspot/sbfspot-config下找到

## Changelog

### 2.3.3 (2019-02-03)
* (René) due to install problems downgrade of sqlite3 package

### 2.3.1 (2019-02-02)
* (René) bug fix: with sqlite "today" data were not shown

### 2.3.0 (2019-01-20)
* (René) support of compact mode
* (René) add additional error information in log

### 2.2.5 (2018-11-26)
* (René) upgrade packages

### 2.2.5 (2018-11-04)
* (René) reset yield if no new value from today

### 2.2.4 (2018-08-19)
* (René) bugfix for ticks on X

### 2.2.3
* (René) the same as 2.2.2

### 2.2.2
* (René) add timestamp of last update

### 2.2.1
* (René) close of database connection after last query result is available (e.g. to support more than one inverter)

### 2.2.0
* (Nis) background color and border
* (René) bug fixes in admin3

### 2.1.0
* (René) Support MariaDB

### 2.0.1
* (René) Support of admin3

### 2.0.0
* (René) since we always use one graph per widget, only one is supported now
		Attention: widget is not compatible with version 1.x.x; just check settings in widget after installation!

### 1.1.0
* (René) autoscale of y axis
* (René) color for y axis 
* (René) adjustable date format 

### 1.0.1
* (René) bug fix for sqlite

### 1.0.0
* (René) first stable release

### 0.2.6
* (René) bug fix for android app > 1.0.6

### 0.2.5
* (René) use install date to calculate historical values

### 0.2.4
* (René) logo changed

### 0.2.3
* (René) adding historical data as datapoint (JSON)
* (René) new vis widget to show historical data

### 0.2.2
* (René) renamed to sbfspot

### 0.2.1
* (René) index.html updated

### 0.2.0
* (René) support of sqlite and license changed to MIT

### 0.1.1
* (René) UTF8 coding

### 0.1.0
* (René) first release

### 0.0.1
* (René) initial release

## License
Copyright (C) <2017-2019>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.