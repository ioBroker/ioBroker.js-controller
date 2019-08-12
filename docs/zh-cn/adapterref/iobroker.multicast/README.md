---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.multicast/README.md
title: 适用于ioBroker的Multicast-APi适配器
hash: Aj0Fnll16PmyET1sMTJI9oGXEoXGyLHdAJzfGUwjc5o=
---
![NPM版本](http://img.shields.io/npm/v/iobroker.multicast.svg)
![下载](https://img.shields.io/npm/dm/iobroker.multicast.svg)
![依赖状态](https://img.shields.io/david/iobroker-community-adapters/iobroker.multicast.svg)
![已知的漏洞](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.multicast/badge.svg)
![NPM](https://nodei.co/npm/iobroker.multicast.png?downloads=true)
![特拉维斯-CI](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.multicast/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/iobroker-community-adapters/ioBroker.multicast?branch=master&svg=true)

<h1>

<img  src="https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.multicast/master/admin/multicast.png"  width="64"/> ioBroker.multicast

</ H1>

#iubBroker的Multicast-APi适配器
此适配器提供基于多播通信协议的API，以向具有自定义固件的设备发送和接收状态。

这个适配器的目的是：

*提供http post和MQTT protokoll的替代方案
*基于多播通信和JSON格式的数据传输，提供统一的API
*有一个零接触适配器来集成任何以太网设备（例如：基于ESP的板eq Wemos D1 mini），如Vansware / Gosound smadmin / multicast.pngart插件或其他自定义构建自动化。

###零接触？
APi的构建方式不需要在适配器本身或要使用的设备中使用最终用户的额外配置。
我使用wifi传输，只能提供wifi凭证（基于lan的设备将自动处理）。
这需要二进制文件的开发者在相关芯片组（如基于ESP的芯片组）上闪现的努力。

当固件遵循APi的所有规则时（请参见下文），通信将按如下方式处理：

*设备通过UDP多播发送状态值
*适配器识别此消息并检查ioBroker中是否存在此设备的状态

####新设备
从上一条消息开始，适配器指示未找到任何设备，以下例程将被处理：

* ioBroker发送广播消息以初始化设备
*设备向ioBroker发送alle状态和相关结构
* ioBroker创建新设备和所有必需的状态
*创建所有状态后，ioBroker会向设备发送握手“准备接收数据”
*设备开始间隔或通过更改发送状态（由设备开发人员编程）

####现有设备重新连接
从上一条消息开始，适配器指示设备已经存在，以下例程将被处理：

* ioBroker检查配置是否设置为“恢复”
*激活恢复后，ioBroker会将所有状态（exept信息状态）发送到设备
*当收到所有状态时，de设备向ioBroker发送握手“准备接收数据”
* ioBroker证实
*设备开始间隔或通过更改发送状态（由设备开发人员编程）

####状态变化
构建适配器以发送最多5次重试，以确保设备接收到所有状态更改。此过程按如下方式处理：

* ioBroker中的状态已更改
*适配器识别值更改并将新值发送到设备
*设备必须在500ms内确认消息
*如果未确认消息，适配器将再次重新发送该值
*这将最多处理5次重试，之后错误消息将指示通信丢失

### APi结构和文档
{待完成/正在进行中}

## Changelog

### 0.1.0

* (Dutchman & Andiling) initial release

## License

MIT License

Copyright (c) 2019 Dutchman & Andiling

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