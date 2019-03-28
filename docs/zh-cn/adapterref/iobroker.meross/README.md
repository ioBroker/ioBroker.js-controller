---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.meross/README.md
title: ioBroker.meross
hash: IZzDVhySIYj4MFKy7j4fG3/jRnl/U0Nb1tlmfVb40so=
---
![商标](../../../en/adapterref/iobroker.meross/admin/meross-logo.png)

![Greenkeeper徽章](https://badges.greenkeeper.io/Apollon77/ioBroker.meross.svg)
![安装数量](http://iobroker.live/badges/meross-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.meross.svg)
![下载](https://img.shields.io/npm/dm/iobroker.meross.svg)
![特拉维斯-CI](http://img.shields.io/travis/Apollon77/ioBroker.meross/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Apollon77/ioBroker.meross?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.meross.png?downloads=true)

＃ioBroker.meross
##说明
此适配器允许通过连接到Meross云服务器来控制Meross设备。

您需要提供您的Cloud登录凭据。适配器连接到您的云帐户并通过MQTT订阅所有设备数据。因此，设备需要连接到他们的云。目前还没有办法在本地控制设备。

一个Adapter实例将显示来自一个Meross Cloud帐户的所有设备，并允许控制它们。

##已知的工作设备
* mss425e
* mss310

如果有更多设备工作（或者也没有），请通过打开GitHub问题报告。

## Changelog

### 1.0.0 (2018.12.16)
* (Apollon77) finalize and move to 1.0.0

### 0.4.1 (2018.11.26)
* (Apollon77) finalize version and allow electricity polling interval to be configured

### 0.3.0 (2018.11.16)
* (Apollon77) add support for mss310 devices

### 0.1.0 (2018.11.14)
* (Apollon77) First release to support ToggleX devices

## License
The MIT License (MIT)

Copyright (c) 2018 Apollon77 <iobroker@fischer-ka.de>

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