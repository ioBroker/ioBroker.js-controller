---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.knmi-weather/README.md
title: ioBroker.knmi天气
hash: 71u/KS+jOB1jSbeq3AOMIt90NYMxyjUUUtsgMhayB/w=
---
![商标](../../../en/adapterref/iobroker.knmi-weather/admin/knmi-weather.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.knmi-weather.svg)
![下载](https://img.shields.io/npm/dm/iobroker.knmi-weather.svg)
![依赖状态](https://img.shields.io/david/iobroker-community-adapters/iobroker.knmi-weather.svg)
![已知的漏洞](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.knmi-weather/badge.svg)
![NPM](https://nodei.co/npm/iobroker.knmi-weather.png?downloads=true)
![特拉维斯-CI](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.knmi-weather/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/iobroker-community-adapters/ioBroker.knmi-weather?branch=master&svg=true)

＃ioBroker.knmi-weather
## KNMI- ioBroker的天气数据和警报
KNMI提供API，根据机构收集的所有传感器数据，每10分钟更新一次数据。
此适配器允许读取此API（需要注册！）并将所有相关值存储在用户友好状态中，以便在通知（例如：电报/推覆）或访问中进一步处理。

该API每天最多可免费使用300次，因此适配器每5分钟进行一次。

以下数据可用：

*目前的klimat条件
*今天，明天，后天预测
*天气警报

位置数据基于管理配置中存储的GPS坐标。

有关更多信息，请访问：http：//weerlive.nl/index.php在此获取免费的API密钥：http：//weerlive.nl/delen.php

## Changelog

### 0.1.0
* (DutchmanNL) initial release

## License
MIT License

Copyright (c) 2019 DutchmanNL

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