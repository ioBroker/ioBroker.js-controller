---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.firetv/README.md
title: 无题
hash: CovZUdv+x4gbupj11lkb3U6+4IVmRfxlLmRx36rxneY=
---
![商标](../../../en/adapterref/iobroker.firetv/admin/firetv.png)

![安装数量](http://iobroker.live/badges/firetv-community-installed.svg)
![稳定版](http://iobroker.live/badges/firetv-community-stable.svg)
![NPM版本](https://img.shields.io/npm/v/iobroker.firetv.svg)
![测验](https://img.shields.io/travis/soef/iobroker.firetv/master.svg)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![建立状态](https://secure.travis-ci.org/soef/iobroker.firetv.svg?branch=master)

### IoBroker.firetv
<!--
[![NPM版本]（https://badge.fury.io/js/iobroker.firetv.svg）](https://www.npmjs.com/package/iobroker.firetv)
-->

使用此适配器，您可以控制Fire TV或Fire TV Stick的某些功能。
例如。：

- 开关
-发送关键事件
-将文本字符串发送到输入字段
-启动/停止应用
- 重启
-执行shell命令

####一些信息
该适配器使用“ Android调试桥”的功能，称为“ adb”。 Adb是Android Developer SDK的一部分。由于Fire TV具有Android操作系统，因此可以由adb控制。

＃＃＃＃ 要求
要使用此适配器，您必须至少安装Anroid SDK的adb数据包。为了不安装完整的Android SDK，您应该安装

-*最少的ADB和Fastboot *

在Google（最小的ADB和Fastboot）上搜索最新的下载链接。

或者，您可以使用* adbLink *

## Changelog
### 1.0.0 (2020-04-09)
* (foxriver76) compatibility for js-c 3

## License
The MIT License (MIT)

Copyright (c) 2016-2020 soef <soef@gmx.net>

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