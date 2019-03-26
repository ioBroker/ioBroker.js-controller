---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.homee/README.md
title: ioBroker homee适配器
hash: 9vcI7FKhF9O/zUxisnOnNIvDoBqzWG1bNE4Gj9G3eHY=
---
![商标](../../../en/adapterref/iobroker.homee/admin/homee.png)

![安装数量](http://iobroker.live/badges/homee-stable.svg)

＃ioBroker homee Adapter [![Greenkeeper徽章]（https://badges.greenkeeper.io/Apollon77/ioBroker.homee.svg）](https://greenkeeper.io/)
=================

##说明
此适配器将ioBroker连接到homee，并提供以下功能：

*允许通过IP或家庭ID和用户名/密码连接
*读取所有设备（节点）和状态（属性）并显示其值，包括ioBroker中的更新
*允许更改ioBroker中的值并将它们发送回家中以控制设备
*充当ioBroker历史记录提供商，用于在家中启用历史记录的所有州设备。这意味着您可以使用存储在homee中的历史值来使用flot，Admin或JavaScript（包括数据级别上的所有聚合）在ioBroker中显示，例如从历史适配器

此适配器基于[stfnhmplr]（http://twitter.com/stfnhmplr）和他的[homee-api](https://github.com/stfnhmplr/homee-api)的出色工作。

＃＃ 已知的问题
*在js-controller <1.5.0上，在某些角色上启用其他历史记录提供程序时可能会产生奇怪的影响（例如“切换”）
* nodejs 10因为Homee-API-Library中的Websocket库太旧而无法工作

## Changelog

### 0.3.2 (2018.08.07)
* (Apollon77) corrected automatic role determination and added playing state for homeegrams

### 0.3.1 (2018.07.27)
* (Apollon77) Special handling for RGB values (delete objects and restart adapter)
* (Apollon77) Also allow enabling/disabling of Homeegrams (best delete objects unter Homee-0.Homeegrams!)
* (Apollon77) Optimize some roles, more Role feedback via Github issues please!

### 0.2.0 (2018.07.04)
* (Apollon77) Fix History logic (try) and add Homeegram support

### 0.1.1 (2018.07.04)
* (Apollon77) initial version

## License
The MIT License (MIT)

Copyright (c) 2018 Apollon77 <ingo@fischer-ka.de>

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