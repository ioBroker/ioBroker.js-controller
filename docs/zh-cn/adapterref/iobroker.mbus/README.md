---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mbus/README.md
title: ioBroker.mbus
hash: K3T4gDegiqOkuBf5INK7iJAGZJuZTqHs0QKJAt3TcoI=
---
![商标](../../../en/adapterref/iobroker.mbus/admin/mbus.png)

![安装数量](http://iobroker.live/badges/mbus-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.mbus.svg)
![下载](https://img.shields.io/npm/dm/iobroker.mbus.svg)
![特拉维斯-CI](http://img.shields.io/travis/Apollon77/ioBroker.mbus/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Apollon77/ioBroker.mbus?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.mbus.png?downloads=true)

＃ioBroker.mbus ======================
[![Greenkeeper徽章]（https://badges.greenkeeper.io/Apollon77/ioBroker.mbus.svg）](https://greenkeeper.io/)

[![代码气候]（https://codeclimate.com/github/Apollon77/ioBroker.mbus/badges/gpa.svg）](https://codeclimate.com/github/Apollon77/ioBroker.mbus)

此适配器用于ioBroker通过TCP或串行连接到M-Bus主站，以提供连接的M-Bus设备的状态和详细信息。

##参数说明
###网关IP / TCP端口
使用TCP时，M-Bus Master / Gateway的IP地址和端口。

###串口/波特率
M-Bus Master / Gateway的串口和波特率。

###更新间隔
以秒为单位的间隔更新数据。默认（如果为空）是3600s（1h）。考虑如何为M-Bus总线上的设备供电以防止电池耗尽。如果将间隔设置为0，则设备在适配器启动时只读取一次，但不再自动。

###设备ID
您可以使用主（1-250）和辅助（16个字符长）M-Bus ID

##如何根据要求阅读设备？
在每个设备的创建状态中，存在一个称为“updateNow”的状态。将此设置为true（作为ack = false的控制操作）时，设备会立即更新。如果配置了间隔，则在收到数据后重新开始。

＃＃ 去做
*加密的有效负载处理（如果需要，任何人）

## Changelog

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

Copyright (c) 2018 Apollon77 <ingo@fischer-ka.de>

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