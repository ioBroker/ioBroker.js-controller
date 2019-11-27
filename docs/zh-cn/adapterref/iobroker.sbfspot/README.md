---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sbfspot/README.md
title: ioBroker.sbfspot
hash: H35jC6h/n9Gh+hmU2Jqe7BvaNZe8+id1JmRgM0alWGg=
---
![商标](../../../en/adapterref/iobroker.sbfspot/admin/sbfspot.png)

![安装数量](http://iobroker.live/badges/sbfspot-stable.svg)
![NPM版本](https://img.shields.io/npm/v/iobroker.sbfspot.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.sbfspot.svg)
![测验](https://travis-ci.org/rg-engineering/ioBroker.sbfspot.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.sbfspot.png?downloads=true)

＃ioBroker.sbfspot
该适配器使用sbfspot从SMA电源逆变器读取数据。
现在支持两种数据库类型（mySQL和sqlite）。
从0.2.3版开始，有一个基于flo的vis小部件可用于显示历史数据。

##提示
*从https://github.com/SBFspot/SBFspot或https://github.com/rg-engineering/SBFspot使用sbfspot的最新版本
*适配器，sbfspot和数据库（mySQL或sqlite）必须在同一系统上运行，例如树莓派
*可在https://github.com/SBFspot/SBFspot/wiki/Installation-Linux-SQLite或https://www.rg-engineering.eu/index下找到Raspberry Pi（或类似版本）上sbfspot的安装手册。 php / produkte / software / plugin-fuer-iobroker-sbfspot
*对于Raspberry Pi，在https://github.com/SBFspot/sbfspot-config下提供了一个半自动配置工具

＃＃ 已知的问题
*如果发现错误或有新功能，请在[github]（https://github.com/rg-engineering/ioBroker.sbfspot/issues）中创建问题

## 2.3.4（2019-10-31）
*（René）将flot更新到3.0版

### 2.3.3（2019-02-03）
*（René）由于安装问题而将sqlite3软件包降级

### 2.3.1（2019-02-02）
*（René）错误修复：使用sqlite的“今天”数据未显示

### 2.3.0（2019-01-20）
*（René）支持紧凑模式
*（René）在日志中添加其他错误信息

### 2.2.5（2018-11-26）
*（René）升级包

### 2.2.5（2018-11-04）
*（René）如果今天没有新值可重置收益

### 2.2.4（2018-08-19）
*（René）错误修正X

### 2.2.3
*（René）与2.2.2相同

### 2.2.2
*（René）添加上次更新的时间戳

### 2.2.1
*（René）在获得最后一个查询结果后关闭数据库连接（例如，支持多个逆变器）

### 2.2.0
*（Nis）背景颜色和边框
* admin3中的（René）错误修复

### 2.1.0
*（René）支持MariaDB

### 2.0.1
*（René）支持admin3

### 2.0.0
*（René），因为我们每个小部件始终使用一个图形，所以现在仅支持一个图形

注意：小部件与1.x.x版本不兼容；安装后只需检查小部件中的设置即可！

### 1.1.0
*（René）y轴的自动缩放
* y轴的（René）颜色
*（René）可调日期格式

### 1.0.1
*（René）修复SQLite的错误

### 1.0.0
*（René）首次稳定发行

### 0.2.6
*（René）bug修复android app> 1.0.6

### 0.2.5
*（René）使用安装日期来计算历史值

### 0.2.4
*（René）徽标已更改

### 0.2.3
*（René）添加历史数据作为数据点（JSON）
*（René）新的vis小部件可显示历史数据

### 0.2.2
*（René）重命名为sbfspot

### 0.2.1
*（René）index.html更新

### 0.2.0
*（René）对sqlite和许可证的支持已更改为MIT

### 0.1.1
*（René）UTF8编码

### 0.1.0
*（René）第一版

### 0.0.1
*（René）初始版本

## Changelog

## License
Copyright (C) <2017-2019>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.