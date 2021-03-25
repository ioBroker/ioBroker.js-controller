---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.multicast/README.md
title: ioBroker的Multicast-APi适配器
hash: BMajt41V8iwGH+aqDL/L/f3MZJja6m62+jbpW80vWiM=
---
![NPM版本](http://img.shields.io/npm/v/iobroker.multicast.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.multicast.svg)
![安装数量（最新）](http://iobroker.live/badges/multicast-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/multicast-stable.svg)
![依赖状态](https://img.shields.io/david/DrozmotiX/ioBroker.multicast.svg)
![已知漏洞](https://snyk.io/test/github/DrozmotiX/ioBroker.multicast/badge.svg)
![NPM](https://nodei.co/npm/ioBroker.multicast.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/DrozmotiX/ioBroker.multicast/master.svg)

<h1>

<img  src="admin/multicast.png"  width="64" alt=""/>ioBroker。多播

</ h1>

＃用于ioBroker的Multicast-APi适配器
该适配器提供基于多播通信协议的API，以使用自定义固件向设备发送和接收状态。

该适配器的目的是：

*提供http帖子和MQTT协议的替代方法
*具有基于多播通信和JSON格式的数据传输的统一API
*配备零接触适配器，以集成任何以太网设备（例如：基于ESP的主板eq Wemos D1 mini），例如Vansware / Gosound智能插头或其他自定义构建自动化。

###零接触？
APi的构建不需要在适配器本身或要使用的设备中使用最终用户的任何其他配置。
如果使用Wi-Fi转换，则仅必须提供Wi-Fi凭据（基于LAN的设备将被完全自动处理）。
这需要二进制文件的开发人员将其刷新到相关芯片组（如基于ESP的芯片组）上。

当固件遵循APi的所有规则（请参阅下文）时，通信将按以下方式处理：

*设备通过UDP多播发送状态值
*适配器识别此消息，并检查ioBroker中是否存在该设备的状态

####新设备
根据先前的消息，适配器指示未找到设备，将处理以下例程：

* ioBroker发送广播消息以初始化设备
*设备将Alle状态和相关结构发送到ioBroker
* ioBroker创建新设备和所有必需的状态
*创建所有状态后，ioBroker会向设备“准备接收数据”发送握手
*设备开始按时间间隔或通过更改（根据固件配置定义）发送其状态

####现有设备重新连接
根据先前的消息，适配器指示的设备已经存在，将处理以下例程：

* ioBroker检查配置是否设置为“恢复”
*激活还原后，ioBroker会将所有状态（信息状态除外）发送到设备
*当接收到所有状态时，de设备将向ioBroker发送“准备接收数据”的握手
* ioBroker确认
*设备开始按时间间隔或通过更改（根据固件配置定义）发送其状态

####状态更改
适配器被构建为最多发送5次重试，以确保设备接收到所有状态更改。此过程按以下方式处理：

* ioBroker中的状态已更改
*适配器识别值更改，并将新值发送到设备
*设备必须在500毫秒内确认消息
*如果未确认消息，适配器将再次重新发送该值
*这将最多处理5次重试，此后将出现错误消息，指示通信丢失

### APi结构和文档
{待完成/进行中}

##待办事项：
* []实现排队，在状态更改后等待20毫秒以获取设备，并发送具有所有状态更新的数组
* []通过API实现过期值
* [x]优化状态重试，每排队500ms不会触发
* [x]如果接收到Harbert并且与设备的连接为FALSE，则发送恢复数据
* [x]实施状态（值列表的功能）
* [x]正确处理主机名和主机名更改

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

### 0.1.6 (2021-03-23)
* (DutchmanNL) Dependency updates

### 0.1.5
* (Dutchman & Andiling) Stable-Release candidate

### 0.1.4
* (DutchmanNL) Fix Device Name
* (DutchmanNL) improved way of handling info channel values compatible with old firmware

### 0.1.3
* (Dutchman) Optimise state retry, don't fire every 500ms more queuing
* (Dutchman) Send recovery data if Harbeat is received and connection to device is FALSE
* (Dutchman) Implement states (capability for value list)

### 0.1.2
* (Dutchman) Optimise state retry, don't fire every 500ms more queuing
* (Dutchman) Correct handling of hostname and hostname changes

### 0.1.1
* (Dutchman) Send recovery data if Harbeat is received and connection to device is FALSE
* (Dutchman) Implement states (capability for value list)

### 0.1.0

* (Dutchman & Andiling) initial release

## License

MIT License

Copyright (c) 2021 Dutchman & Andiling

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