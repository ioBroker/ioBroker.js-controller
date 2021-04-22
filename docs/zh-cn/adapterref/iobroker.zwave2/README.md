---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.zwave2/README.md
title: ioBroker.zwave2
hash: pFVHu19SUzQKPAYVMpHE3EKVsRvwEfyB0JZgKbmka8E=
---
![商标](../../../en/adapterref/iobroker.zwave2/admin/zwave2.svg)

![节点](https://img.shields.io/node/v/iobroker.zwave2.svg)
![npm](https://img.shields.io/npm/v/iobroker.zwave2.svg)
![变更日志](https://img.shields.io/badge/read-Changelog-informational)
![安装数量](http://iobroker.live/badges/zwave2-stable.svg)
![语言等级：JavaScript](https://img.shields.io/lgtm/grade/javascript/g/AlCalzone/ioBroker.zwave2.svg?logo=lgtm&logoWidth=18)

＃ioBroker.zwave2
![测试与发布](https://github.com/AlCalzone/iobroker.zwave2/workflows/Test%20and%20Release/badge.svg)[![翻译状态]（https://weblate.iobroker.net/widgets/adapters/-/zwave2/svg-badge.svg）](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

<h2 align="center">ioBroker的Z-Wave。但是更好。</h3>

Z-Wave 2是用于ioBroker的全新Z-Wave实现。它基于[`zwave-js`](https://github.com/AlCalzone/node-zwave-js)，它是为您的利益而写的。

除非[ioBroker.zwave](https://github.com/ioBroker/ioBroker.zwave/)，它不需要`OpenZWave`。这意味着安装和更新速度很快，并且不需要编译静态库和其他复杂的步骤。

此外，某些设备在原始适配器中无法正常工作，例如Fibaro卷帘门3。

在整个开发过程中，始终牢记在ioBroker中易于使用。例如，某些设备重用配置参数来配置许多不同的东西。在此适配器中，它们中的大多数都分为单独的状态，并且不需要复杂的数学运算：

| ioBroker.zwave2中的配置参数| vs | ioBroker.zwave中的配置参数|
| ![]（docs / de / images / config-params.png）| vs | ！[](../../../en/adapterref/iobroker.zwave2/docs/de/images/config-params-legacy.png) |
| ！[]（docs / de / images / config-params.png）| vs | ！[]（docs / de / images / config-params-legacy.png）|

---

##文档和用法
* [FAQ]（docs / zh / FAQ.md）
* [故障排除]（docs / en / troubleshooting.md）·[贝问题]（docs / de / bei-problemen.md）

---

## Changelog
[Older changes](CHANGELOG_OLD.md)
<!--
	Placeholder for next versions:
	### __WORK IN PROGRESS__
-->
### 1.9.3 (2021-04-10)
* Restored the old behavior for devices that report their values via the root endpoint
* Some minor config file changes

### 1.9.2 (2021-04-05)
Upgraded to `zwave-js` version `7.1.0`. Notable changes include:
* Added reporting of usage statistics. For details, refer to the `node-zwave-js` documentation.
* Better support for 700-series Z-Wave sticks
* Notification values are no longer auto-reset to idle after 5 minutes by default. This behavior can now be enabled per device if necessary.
* Several stability improvements

For a full list of changes, check out https://github.com/zwave-js/node-zwave-js/blob/master/CHANGELOG.md

### 1.9.0 (2021-03-16)
* Upgraded to `zwave-js` version 7
* Nodes with a completed interview are no longer queried for all their values when restarting. As a result the adapter is now ready much much faster after a restart, but you'll see many yellow values until the devices have sent updated data.
* The device list in the configuration dialog now displays a better type for the devices, for example `Wall Controller` instead of `Routing Slave`
* Network heal no longer times out early in large networks
* Fixed a crash: `supportedCCs is not iterable`. If this happens to you, re-interview affected devices.
* Relaxed the checks when a report gets mapped from the root endpoint to higher endpoints
* Some encrypted messages that were previously dropped are now accepted
* Prevent the interview of sleeping nodes to get stuck until a re-interview under certain circumstances
* After a restart, sleeping nodes have their status correctly determined even if they weren't interviewed completely before
* Notification variables are now auto-idled after 5 minutes as it was intended, not after 5 hours
* The `deltaTime` and `previousValue` values for the Meter CC are now hidden
* Fixed a crash that could happen after node inclusion
* Tons of new and improved device configuration files

### 1.8.12 (2021-02-23)
* Implemented `Scene Actuator Configuration CC` and `Scene Controller Configuration CC`
* Fixed an issue where sleeping nodes could block the send queue when it is not yet known whether they support `Wake Up CC`
* Fixed a crash that could happen while logging a message while the driver is not ready yet
* Fixed a crash that could happen while trying to bootstrap a device that does not respond after inclusion
* The state value in `Thermostat Fan Mode CC` is now readonly
* Configuration parameters may now have a unit
* Tons of new and improved device configuration files
* Unsolicited reports are no longer incorrectly mapped to all endpoints

### 1.8.11 (2021-02-14)
* Implemented `Thermostat Fan Mode CC` and `Thermostat Fan State CC`
* Fixed several sources of crashes
* Fixed incorrect detection of secure nodes
* Certain `.hex` firmware files are now parsed correctly
* Added support for `.bin` firmware files
* Avoid an infinite interview loop when devices don't advertise the end of the parameter list correctly
* Sleeping nodes are now immediately marked as ready when restarting from cache
* Unsolicited reports are no longer mapped from the root endpoint to endpoint 1 if that endpoint does not support the CC
* Tons of new and improved device configuration files

## License

MIT License

Copyright (c) 2019-2021 AlCalzone

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