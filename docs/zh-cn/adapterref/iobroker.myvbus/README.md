---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.myvbus/README.md
title: ioBroker.myvbus
hash: yxVtgxq/SxahbvABi0FHjG+ybv/RSx9gFAvbDwQ53fU=
---
![NPM版本](http://img.shields.io/npm/v/iobroker.myvbus.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.myvbus.svg)
![安装数量（最新）](http://iobroker.live/badges/myvbus-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/myvbus-stable.svg)
![依赖状态](https://img.shields.io/david/iobroker-community-adapters/iobroker.myvbus.svg)
![已知漏洞](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.myvbus/badge.svg)
![NPM](https://nodei.co/npm/iobroker.myvbus.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.myvbus/master.svg)
![环保管理员徽章](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.myvbus.svg)

＃ioBroker.myvbus
![商标](../../../en/adapterref/iobroker.myvbus/admin/myvbus.png)

##用于Resol VBus的ioBroker适配器
该ioBroker适配器通过resol-vbus连接到各种基于VBus的设备，resol-vbus是一个JavaScript库，用于处理Daniel Wippermann提供的RESOL VBus数据。
<https://github.com/danielwippermann/resol-vbus> <https://www.npmjs.com/package/resol-vbus>

＃＃ 特征
*使用DL3或DL2数据记录器，KM2通信模块，VBus / LAN接口适配器或本地TCP / IP上的串行/ LAN网关，可以访问各种RESOL（R）VBus（R）设备。还支持通过VBus.net（R）使用VBus / USB接口适配器或DLx / KMx进行设备访问。
*处理实时VBus数据流，并将其作为ioBroker状态提供。
*值以可配置的周期时间更新。

＃＃ 法律声明
RESOL，VBus，VBus.net，DeltaSol等是RESOL-Elektronische Regelungen GmbH的商标或注册商标。
<https://www.resol.de/en>所有其他商标均为其各自所有者的财产。

## Changelog

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