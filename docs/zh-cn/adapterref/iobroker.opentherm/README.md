---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.opentherm/README.md
title: Opentherm集成ioBroker
hash: a1i87p1mgoR34nXnuxf08RnAdUZkk3ydYZkPxDmiDw8=
---
![替代文字](https://raw.githubusercontent.com/DutchmanNL/ioBroker.opentherm/master/admin/opentherm_large.png)

![替代文字](https://travis-ci.org/iobroker-community-adapters/ioBroker.opentherm.svg?branch=master)
![安装数量](http://iobroker.live/badges/opentherm-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.opentherm.svg)
![下载](https://img.shields.io/npm/dm/iobroker.opentherm.svg)
![Greenkeeper徽章](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.opentherm.svg)

#openntherm集成ioBroker
此适配器将opentherm网关的所有功能集成到ioBroker中。
Opentherm是几种现代加热系统（如Remeha）使用的网关协议。

有关更多信息，请访问http://otgw.tclcode.com/index.html#intro，并向开发人员提供所有信用。

###最终状态的特色功能：
*提供TCP / IP中继服务器以允许此实例的其他OpenTherm监控软件连接（当使用直接USB连接时）
*尽可能调整ioBroker中的值并将命令发送给Opentherm
*请随时添加功能请求

###目前已实施
*通过TCP / IP连接到OpenTherm网关
*通过USB连接直接连接到OpenTherm网关

＃＃ 去做
*通过USB连接直接连接到OpenTherm网关
*提供TCP / IP中继服务器以允许此实例的其他OpenTherm监控软件连接（当使用直接USB连接时）
*哪里

## Changelog
### 0.2.0
* Fix translations

### 0.1.9
* Implemented direct connection by USB
* added configuration options to adapter settings
* Fixed issue for incorrect logging

### 0.1.8
* Fixed issue for incorrect object type (boolean/number/string)
* Implemented rounding states to 1 digit after comma

### 0.1.7
* implemented Developer mode (all states for all message types will be created in _Dev
* Implemented Developer Logging mode (if not activated no information is written to log !)
* Several small backend fixes

### 0.1.6
* Creation of logical channels
* creation of states
* reduced logging, all received messages still in log during beta for data gathering
* creation of definition file (please feel free to provide input)

### 0.1.0
* Data reading by TCP connection to logfile 

### 0.0.1
* (Dutchman) initial commit

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