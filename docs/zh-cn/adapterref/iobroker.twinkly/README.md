---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.twinkly/README.md
title: ioBroker.twinkly
hash: hldAZkmyW8gb0j+l0H2YzXZmhkZQE2diQeEA+IatQy8=
---
![商标](../../../en/adapterref/iobroker.twinkly/admin/twinkly.png)

![安装数量（最新）](http://iobroker.live/badges/twinkly-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/twinkly-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.twinkly.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.twinkly.svg)
![依赖状态](https://img.shields.io/david/patrickbs96/iobroker.twinkly.svg)
![已知漏洞](https://snyk.io/test/github/patrickbs96/ioBroker.twinkly/badge.svg)
![NPM](https://nodei.co/npm/iobroker.twinkly.png?downloads=true)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/patrickbs96/ioBroker.twinkly?branch=master&svg=true)

＃ioBroker.twinkly
**测试：** Linux / Mac：[![Travis-CI]（https://travis-ci.com/patrickbs96/ioBroker.twinkly.svg）](https://travis-ci.com/github/patrickbs96/ioBroker.twinkly)]

##用于ioBroker的twinkly适配器
与[闪烁的灯光](https://www.twinkly.com/)通信的适配器。

**此适配器使用Sentry库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参见[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！ Sentry报告从js-controller 3.0开始使用。

##设置
可以使用以下设置：![admin.png](../../../en/adapterref/iobroker.twinkly/img/admin.png)

在表中，您可以添加要控制的所有Twinkly灯。

|专栏描述 |
| ------------ | ---------------------------------- |
| `Enabled`|是否应访问此连接|
| `IP Address`|闪烁灯的IP地址|
| IP地址|闪烁灯的IP地址|

选中后，将为每个设备创建以下附加状态：

*设备信息（已读）
*网络状态（已读）
* MQTT（读/写）

[私人API信息] [https://xled-docs.readthedocs.io/en/latest/）[PavolBabinčák](https://github.com/scrool)

＃＃ 去做
*选中“扩展JSON”开关后，不会创建频道（**重启解决了atm错误**）
*网络状态（写）
*状态为开：选中其“模式”播放列表/电影的复选框

## Changelog

### 0.1.x
* 8 - (patrickbs96) Changes from the Review
* 6 - (patrickbs96) Update dependencies
* 5 - (patrickbs96) Prevent Crash Case at HTTP Error (Sentry IOBROKER-TWINKLY-3)
* 4 - (patrickbs96) Temporary removing Reset as API path not exists
* 1 - (patrickbs96) Prevent Crash Case at HTTP Error (Sentry IOBROKER-TWINKLY-3)

### 0.0.x
* 10 - (patrickbs96) Restructured CreateStates (dynamic)
*  9 - (patrickbs96) Network-Status (read)
*  8 - (patrickbs96) Transform JSON into states: Details, MQTT and Timer
*  7 - (patrickbs96) Moved Twinkly Connection into own library
*  6 - (patrickbs96) Implemented Ping to check if Twinkly is connected. `Connected State` is no longer needed.
*  3 - (patrickbs96) finalized Admin and Coding
*  1 - (patrickbs96) initial release

## License
MIT License

Copyright (c) 2021 patrickbs96 <patrickbsimon96@gmail.com>

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