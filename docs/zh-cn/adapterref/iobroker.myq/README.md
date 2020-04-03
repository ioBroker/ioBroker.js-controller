---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.myq/README.md
title: ioBroker.myq
hash: XtssCpy2gfrIRfH+ncNkDuStqrBBsrN1gXDNYL16Ryw=
---
![商标](../../../en/adapterref/iobroker.myq/admin/myq.png)

![安装数量](http://iobroker.live/badges/myq-installed.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.myq.svg)
![NPM](https://nodei.co/npm/iobroker.myq.png?downloads=true)
![稳定](http://iobroker.live/badges/myq-stable.svg)
![NPM版本](https://img.shields.io/npm/v/iobroker.myq.svg)
![建立状态](https://travis-ci.org/StrathCole/ioBroker.myq.svg?branch=master)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

＃ioBroker.myq
用于MyQ的ioBroker适配器（Chamberlain / Liftmaster）。该项目与上述公司没有任何隶属关系。
要开始使用适配器，请添加一个实例，然后在配置屏幕上输入您的myQ用户名和密码。

＃＃ 状态
并非所有状态都适用于所有类型的设备。

`myq.0.devices.<id>.info.MyQDeviceTypeId`-数字形式的设备类型`myq.0.devices.<id>.info.MyQDeviceTypeName`-设备的人类可读类型，例如网关或GarageDoorOpener`myq.0.devices.<id>.info.SerialNumber`-设备的序列号`myq.0.devices.<id>.info.desc`-用户提供的设备名称`myq.0.devices.<id>.info.fwver`-设备的当前固件版本`myq.0.devices.<id>.info.name`-内部设备名称（不是用户提供的名称）`myq.0.devices.<id>.info.numdevices`-（网关）此网关的已连接设备数`myq.0.devices.<id>.info.online`-设备当前已连接到云并且可访问`myq.0.devices.<id>.states.IsFirmwareCurrent`-§ §SSSSS_9§§，如果设备固件是最新的`myq.0.devices.<id>.states.ishomekitactive`-`true`，如果该设备的Homekit使用处于活动状态`myq.0.devices.<id>.states.ishomekitcapable`-`true`，如果设备是homekit有能力`myq.0.devices.<id>.states.doorstate`-（车库门）门的状态（请参阅门状态）`myq.0.devices.<id>.states.moving`-`true`（如果当前正在移动门）

###门状态
 -1：门打开
 -2：门关闭
 -3：门停了
 -4：门正在打开
 -5：门正在关闭
 -8：门正在移动
 -9：门处于未定义状态（未关闭）

##命令
`myq.0.devices.<id>.commands.close`-关门`myq.0.devices.<id>.commands.open`-开门

##捐赠
[![贝宝]（https://www.paypalobjects.com/zh_CN/i/btn/btn_donateCC_LG.gif）](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SFLJ8HCW9T698&source=url)

## Changelog

### 0.1.1

-  Code rework and several bugs fixed

### 0.1.0

-   First running Version

## License

The MIT License (MIT)

Copyright (c) 2020 Marius Burkard

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