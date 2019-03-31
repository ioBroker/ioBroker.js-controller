---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.hmip/README.md
title: ioBroker HomeMatic IP云AccessPoint适配器
hash: fS8rqMEwf/UAtQcMWUi7uOElSKwPS3muB8UHLj9b3I4=
---
![商标](../../../en/adapterref/iobroker.hmip/admin/homematic.png)

![安装数量](http://iobroker.live/badges/hmip-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.hmip.svg)
![下载](https://img.shields.io/npm/dm/iobroker.hmip.svg)
![建立状态](https://travis-ci.org/iobroker-community-adapters/ioBroker.hmip.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.hmip.png?downloads=true)
![Greenkeeper徽章](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.hmip.svg)

＃ioBroker HomeMatic IP Cloud AccessPoint适配器
##说明
此适配器允许通过Homematic IP Cloud的Rest API与HomematicIP CloudAccessPoint进行通信

##安装
此适配器需要版本> = 8.6的node-js

##信息
大多数Homematic IP设备已经在使用最新的适配器版本。

我会不断改进它，但这需要时间。通过例如社区提供的任何帮助Pull Request将受到高度赞赏。

如果没有使用HmIP设备，请使用此信息创建一个问题（请为每个设备提供一个问题，如果可能，请在主题中提供技术名称）。
将ioBroker中的适配器登录切换到愚蠢模式，并将打印到设备的json添加到问题中的日志中。
我可能还需要一个状态变化的json。

谢谢

##重要信息可以使用此适配器完成的任务
！您只能使用此适配器触发事件，可通过原始Homematic IP应用程序触发。
例如，设备之间的直接连接在应用程序中没有事件，也不能通过此适配器触发！

##设置
*输入您的SGTIN（接入点后面）和PIN（如果之前设置），并通过按下蓝色LED按钮验证数据。这将创建一个身份验证令牌。

＃＃ 谢谢
到coreGreenberet为他的python lib（https://github.com/coreGreenberet/homematicip-rest-api）

## Diskussion in ioBroker Forum
https://forum.iobroker.net/viewtopic.php?f=36&t=21000#p220517

## Adapter Request auf GitHub
https://github.com/ioBroker/AdapterRequests/issues/62

## Changelog

### 0.0.10
* (jogibear9988) added ping/pong, enable setBoots, more units, more hardware

### 0.0.9
* (jogibear9988) fullrx and operationlock channel

### 0.0.8
* (jogibear9988) fixes a few devices

### 0.0.7
* (jogibear9988) fixes wrong state handling

### 0.0.6
* (jogibear9988) fixes for more devices, alarm handling

### 0.0.5
* (jogibear9988) more devices and big refactoring (switched from DeviceType to FunctionalChannelType)

### 0.0.4
* (jogibear9988) more devices, bugfixes. thanks to TobiasF1986, steckenpferd and Ma-ster77

### 0.0.3
* (jogibear9988) bugfixes and more devices 

### 0.0.2
* (jogibear9988) bugfixes, more devices and initial support of groups

### 0.0.1
* (jogibear9988) initial release

## License
The MIT License (MIT)

Copyright (c) 2018-2019 jogibear9988 <jochen.kuehner@gmx.de>

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