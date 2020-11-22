---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.worx/README.md
title: ioBroker.worx
hash: nlEB+RIKLMo+NbCzZJ59gkbuM+xcucJL4s4qgN8eT2c=
---
![安装数量](http://iobroker.live/badges/worx-installed.svg)
![稳定版](http://iobroker.live/badges/worx-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.worx.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.worx.svg)

[![测试]（https://github.com/iobroker-community-adapters/ioBroker.worx/workflows/Test%20and%20Release/badge.svg）](https://github.com/iobroker-community-adapters/ioBroker.worx/commits/master)

![商标](../../../en/adapterref/iobroker.worx/admin/worx.png)

＃ioBroker.worx
##适用于ioBroker的Worx（Kress和Landxcape）适配器
通过云和mqtt控制

该适配器通过Cloud将ioBroker与您的Landroid Kress或Landxcape割草机相连。
从割草机中读取温度，割草时间，电池电量和其他各种数据。
适配器可以控制割草机，并且您可以更改配置参数，例如割草时间。

<img src="admin/worx_ada2.png" alt="画画" width="100%"/>

##设置
-要连接到割草机，请从您在Config中的worx帐户输入电子邮件和密码。
-切边的延迟：如果切边以弯曲或弯曲开始，则割草机可能会掉线并因故障而停止，或者刀片可能无法旋转。为此，可以设置叶片开始旋转的起始点。

## Changelog
### 1.2.4 (15.11.2020)
* (MeisterTR) Bugfix (error type of sc...)
* (MeisterTR) change Testing to git
### 1.2.3 (29.08.2020)
* (MeisterTR) add option to crate a Json Obj to set mowtime with scripts 
* (MeisterTR) add option to disable weather
* (MeisterTR) add double Shedule, oneTimeShedule, PartyMode
* (MeisterTR) fix setIntervall => setTimeout
* (MeisterTR) fix error with Meter and Min. in Config
* (MeisterTR) add Kress and Landxcape
### 1.0.0 (03.12.2019)
* (MeisterTR) bump Version
* (MeisterTR) transfer to community
### 0.4.0 (03.08.2019)
* (MeisterTR) fix multimower
* (MeisterTR) change loglevel
* (MeisterTR) fix online Status

### 0.3.1 (12.06.2019)
* (MeisterTR) add delay for edgecut in config
* (MeisterTR) fix mowtime error

### 0.2.0 (01.06.2019)
* (MeisterTR) add border
* (MeisterTR) fix small errors
* (MeisterTR) code cleanup
### 0.0.1
* (MeisterTR) initial release

## License
MIT License

Copyright (c) 2020 MeisterTR

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