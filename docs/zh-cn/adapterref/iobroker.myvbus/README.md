---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.myvbus/README.md
title: ioBroker.myvbus
hash: igha4uGR5ydtqy+g0mS9tuSe8we5tcsGrBSFBo+4UqU=
---
![NPM版本](http://img.shields.io/npm/v/iobroker.myvbus.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.myvbus.svg)
![安装数量（最新）](http://iobroker.live/badges/myvbus-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/myvbus-stable.svg)
![依赖状态](https://img.shields.io/david/iobroker-community-adapters/iobroker.myvbus.svg)
![已知漏洞](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.myvbus/badge.svg)
![NPM](https://nodei.co/npm/iobroker.myvbus.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.myvbus/master.svg)

＃ioBroker.myvbus
![商标](../../../en/adapterref/iobroker.myvbus/admin/myvbus.png)

##用于Resol VBus的ioBroker适配器
此适配器使用resol-vbus（由Daniel Wippermann提供的JavaScript库，用于获取RESOL VBus数据）将ioBroker连接到各种基于VBus的设备。

<https://github.com/danielwippermann/resol-vbus>

<https://www.npmjs.com/package/resol-vbus>

＃＃ 特征
*能够使用DL3或DL2数据记录器KM2从各种RESOL®VBus®设备-最好是DeltaSol®系列的太阳能和系统控制器（包括内置热量表（HQM））读取测量数据通信模块，VBus / LAN接口适配器或通过TCP / IP本地的串行/ LAN网关。
*还支持使用VBus / USB串行接口适配器或使用DLx / KMx的VBus.net（R）进行设备访问。
*处理实时VBus数据流，并使它们可作为ioBroker状态使用。
*值以可配置的周期时间更新。
*不支持读取或设置VBus设备配置参数。为此应使用Resol提供的工具，例如通过VBus.net或参数化工具RPT。
*由于DL3接口的限制，不支持读取DL3通道0（直接连接到DL3设备的传感器）。

##配置提示
*连接类型的默认设置为VBus / LAN，但是即使对于VBus / LAN，也必须明确选择它，否则将不会建立连接。
*用于VBus / LAN，DL3，DL2，KM2的直接LAN访问的正确设置是：
  *连接类型：VBus / LAN或KM2或DL2或DL3
  *连接标识符：IP地址（例如192.168.178.188）或FullyQualifiedHostName（例如host1.example.com）
  * VBus密码：YourVBusPassword（默认值：vbus）
  *连接端口：不应更改默认设置7053
  * DL3通道：仅与DL3相关（值1-6，无法读取通道0）
  *更新间隔：更新测量值之间的时间（默认为30秒）
*通过VBus.net访问DL3，DL2，KM2的正确设置是：
  *连接类型：DL3或DL2或KM2
  *连接标识符：vbus.net（或vbus.io）-都没有http：//和Via标识符！
  *连接端口：不应更改默认设置7053
  * VBus密码：YourVBusPassword（默认值：vbus）
  * DL3通道：仅与DL3相关（值：1-6，无法读取通道0）
  *通过标识符：YourViaIdentifier（例如d1234567890）-前没有http：//或后有.vbus.io
  *更新间隔：更新测量值之间的时间（默认为30s）

＃＃ 法律声明
RESOL，VBus，VBus.net，DeltaSol等是RESOL的商标或注册商标-Elektronische Regelungen GmbH <https://www.resol.de/en>

所有其他商标均为其各自所有者的财产。

## Changelog

### 0.0.6

* (pdbjjens) alpha 6 release updated dependencies

### 0.0.5

* (pdbjjens) alpha 5 release improved type and role mapping of adapter values

### 0.0.4

* (pdbjjens) alpha 4 release updated dependency on resol-vbus library to 0.21.0

### 0.0.3

* (pdbjjens) alpha 3 release tested with DL3 over local LAN and VBus.net and DeltaSol SLT (0x1001) incl. HQM (0x1011)

### 0.0.2

* (pdbjjens) alpha 2 release tested with VBus/LAN, KM2, VBus.net and DeltaSol E (0x7721 & 0x7722), DeltaSol M (0x7311 & 0x716), DeltaSol CS Plus (0x2211), Oventrop RQXXL (0x7541)

### 0.0.1

* (pdbjjens) initial release tested only with VBus/USB (Serial) and DeltaSol(R) BS2009 (0x427B)

## License

MIT License

Copyright (c) 2020 Jens-Peter Jensen <jjensen@t-online.de>

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