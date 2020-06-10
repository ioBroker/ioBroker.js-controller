---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.zwave2/README.md
title: ioBroker.zwave2
hash: ScxiaH6V105foLuihyc7QRNT1MgDNTXgZGY3R/bL/MA=
---
![商标](../../../en/adapterref/iobroker.zwave2/admin/zwave2.svg)

![节点](https://img.shields.io/node/v/iobroker.zwave2.svg)
![npm](https://img.shields.io/npm/v/iobroker.zwave2.svg)
![变更日志](https://img.shields.io/badge/read-Changelog-informational)
![安装数量](http://iobroker.live/badges/zwave2-stable.svg)
![语言等级：JavaScript](https://img.shields.io/lgtm/grade/javascript/g/AlCalzone/ioBroker.zwave2.svg?logo=lgtm&logoWidth=18)

＃ioBroker.zwave2
![测试与发布](https://github.com/AlCalzone/iobroker.zwave2/workflows/Test%20and%20Release/badge.svg)

<h2 align="center"> ioBroker的Z-Wave。但是更好。 </h3>

Z-Wave 2是用于ioBroker的全新Z-Wave实现。它基于[`zwave-js`](https://github.com/AlCalzone/node-zwave-js)，它是为您的利益而写的。

除非[ioBroker.zwave](https://github.com/ioBroker/ioBroker.zwave/)，它不需要`OpenZWave`。这意味着安装和更新速度很快，无需编译静态库和其他复杂步骤。

此外，某些设备无法在原始适配器中使用，例如Fibaro卷帘门3。

在整个开发过程中，始终牢记在ioBroker中易于使用。例如，某些设备重用配置参数来配置许多不同的东西。在此适配器中，它们中的大多数都分为单独的状态，不需要复杂的数学运算：

| ioBroker.zwave2中的配置参数| vs | ioBroker.zwave中的配置参数|
| ![]（docs / de / images / config-params.png）| vs | ！[](../../../en/adapterref/iobroker.zwave2/docs/de/images/config-params-legacy.png) |
| ！[]（docs / de / images / config-params.png）| vs | ！[]（docs / de / images / config-params-legacy.png）|

## Changelog
[Older changes](CHANGELOG_OLD.md)
<!--
	Placeholder for next versions:
	### __WORK IN PROGRESS__
-->

### 1.0.0 (2020-06-04)
* Changed the compatibility config queries for Danfoss thermostats, so queued setpoint changes are not overwritten

### 0.14.9 (2020-06-03)
* Placeholder object names (e.g. `Node 003`) for non-reachable nodes are now overwritten with the correct name when the nodes are interviewed.

### 0.14.8 (2020-06-03)
* Fixed an issue where secure sleeping nodes could block all communication with other nodes

### 0.14.7 (2020-06-03)
* Fixed an issue where interviews could get stuck for sleeping nodes
* Fixed a crash that happened when decoding a secure message with an unsupported payload

### 0.14.6 (2020-06-02)
* Added support for `Protection CC`
* Fixed several bugs in `Security CC`
* Updates from a node that span multiple messages are now correctly decoded
* During the startup, device objects are created for asleep and dead nodes. This allows removing failed devices from the network even after the cache was cleared.

## License

MIT License

Copyright (c) 2019-2020 AlCalzone

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