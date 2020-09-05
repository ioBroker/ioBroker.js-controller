---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.knmi-weather/README.md
title: ioBroker.knmi-天气
hash: 4K7lhE2g1x8O5srmOl0lvYJjZ3JU/YvYk+pXG7jB20w=
---
![商标](../../../en/adapterref/iobroker.knmi-weather/admin/knmi-weather.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.knmi-weather.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.knmi-weather.svg)
![安装数量（最新）](http://iobroker.live/badges/knmi-weather-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/knmi-weather-stable.svg)
![依赖状态](https://img.shields.io/david/iobroker-community-adapters/ioBroker.knmi-weather.svg)
![已知漏洞](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.knmi-weather/badge.svg)
![NPM](https://nodei.co/npm/ioBroker.knmi-weather.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/iobroker-community-adapters/iobroker.knmi-weather/master.svg)

＃ioBroker.knmi-天气
## KNMI天气数据和ioBroker警报
KNMI提供了一个API，该API根据机构收集的所有传感器数据每10分钟更新一次数据。
该适配器允许读取此API（需要注册！），并以用户友好的状态存储所有相关值，以便在通知（例如：电报/推送）或可视化中进一步处理。

该API每天最多可免费使用300次attement，因此每5分钟放置一次适配器。

以下数据可用：

*当前的气候条件
*今天，明天，后天的天气预报
*天气警报

位置数据基于存储在管理员配置中的GPS坐标。

有关更多信息，请访问：http://weerlive.nl/index.php在此处获取免费的API密钥：http://weerlive.nl/delen.php

＃＃ 支持我
如果您喜欢我的作品，请随时提供个人捐款（这是DutchmanNL的个人捐款链接，与ioBroker项目无关！）[![捐赠]（https://raw.githubusercontent.com/iobroker-community-adapters/knmi-weather/master/admin/button.png）](http://paypal.me/DutchmanNL)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

### 0.2.2-beta.0 (2020-08-30)
* (DutchmanNL) Updated dependency's
* (DutchmanNL) Bugfixes

### 0.2.1
* (DutchmanNL) Updated dependencys
* (DutchmanNL) Release to stable repository
* (DutchmanNL) Bugfix : Solve incorrect Latitude/Longtitude configuration

### 0.2.0
* (DutchmanNL) improve propper adapter termination instead of guessing by timer
* (DutchmanNL) Release to stable repository

### 0.1.1
* (DutchmanNL) implement states for RainRadar

### 0.1.0
* (DutchmanNL) initial release

## License
MIT License

Copyright (c) 2020 DutchmanNL <rdrozda86@gmail.com>

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