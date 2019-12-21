---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mbus/README.md
title: ioBroker.mbus
hash: L2+Sd6JuHqmMmGofP6mrX99ZFTDO+b5dWyzWfWGPXCQ=
---
![商标](../../../en/adapterref/iobroker.mbus/admin/mbus.png)

![环保管理员徽章](https://badges.greenkeeper.io/Apollon77/ioBroker.mbus.svg)
![安装数量](http://iobroker.live/badges/mbus-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.mbus.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.mbus.svg)
![特拉维斯](http://img.shields.io/travis/Apollon77/ioBroker.mbus/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Apollon77/ioBroker.mbus?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.mbus.png?downloads=true)

＃ioBroker.mbus
======================

[![代码气候]（https://codeclimate.com/github/Apollon77/ioBroker.mbus/badges/gpa.svg）](https://codeclimate.com/github/Apollon77/ioBroker.mbus)

**此适配器使用服务[哨兵](https://sentry.io)向开发人员自动向我报告异常和代码错误。**

该ioBroker适配器通过TCP或串行连接到M-Bus主站，以提供所连接M-Bus设备的状态和详细信息。

##参数说明
###网关IP / TCP端口
使用TCP时，M-Bus主站/网关的IP地址和端口。

###串口/波特率
M-Bus主站/网关的串行端口和波特率。

###更新间隔
间隔以秒为单位更新数据。默认值（如果为空）是3600s（1h）。考虑如何为M-Bus总线上的设备供电，以防止电池耗尽。如果将时间间隔设置为0，则设备在适配器启动时仅读取一次，但不再自动读取。

###设备ID
您可以使用主要（1-250）和次要（16个字符长）的M-Bus ID

##如何根据要求读取设备？
在为每个设备创建的状态中，存在一个称为“ updateNow”的状态。当您将其设置为true（作为带有ack = false的控制操作）时，设备将立即更新。如果配置了间隔，则间隔在接收到数据后重新开始。

＃＃ 去做
*加密的有效载荷处理（如果任何人需要）

## Changelog

### 2.1.0 (2019-12-18)
* add compact mode
* move to more flexible serial port configuration
* add Sentry for error reporting

### 2.0.0 (2019-10-16)
* (lvogt) **BREAKING CHANGE** better handling for values with changing scaling based on the value - maybe incompatible with old values!
* (lvogt) add setting to force kWh values for energy

### 1.1.1 (2018-12-10)
* (Apollon77) make sure adapter is not communicating too fast at the beginning

### 1.1.0 (2018-05-06)
* (bluefox) Error tolerance
* (apollon77) Fix Admin

### 0.1.8 (2018-04-03)
* (apollon77) fix config dialog

### 0.1.7 (2018-04-02)
* (apollon77) allow to set "0" as update interval that will cause in no automatic updates, so only manually using updateNow is possible.

### 0.1.6 (2018-03-26)
* (apollon77) disconnect/reconnect for each query

### 0.1.5 (2018-03-26)
* (apollon77) update to node-mbus 0.5 with shorter timeouts

### 0.1.4 (2018-03-26)
* (apollon77) add "updateNow" states to all devices to trigger manual update
* (apollon77) update to node-mbus 0.4.1 with shorter timeouts

### 0.1.2
* (apollon77) official released version

### 0.0.1
* (apollon77) initial release for testing

## License

The MIT License (MIT)

Copyright (c) 2018-2019 Apollon77 <ingo@fischer-ka.de>

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