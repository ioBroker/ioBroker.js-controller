---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/SMundt/iobroker.lgtv2011/edit/master//README.md
title: LG 2011 SmartTV
hash: fUNqRBv5qACrw27zBNd33tLdtC19BbCGNUAOTk6m4MA=
adapter: true
license: MIT
authors: SebastianSchultz <mail@sebastian-schultz.de>
description: Controls 2011 LG SmartTVs
keywords: lgtv, 2011, Smart, TV, LG
readme: https://github.com/SMundt/iobroker.lgtv2011/blob/master/README.md
mode: daemon
materialize: true
compact: true
published: 2018-04-16T21:15:50.327Z
version: 1.0.5
BADGE-安装数量: http://iobroker.live/badges/lgtv11-stable.svg
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.lgtv11.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.lgtv11.svg
BADGE-NPM: https://nodei.co/npm/iobroker.lgtv11.png?downloads=true
BADGE-特拉维斯-CI: https://travis-ci.org/SebastianSchultz/ioBroker.lgtv11.svg?branch=master
BADGE-AppVeyor: https://ci.appveyor.com/api/projects/status/fwlpfd33mafbivcm/branch/master?svg=true
---
![商标](zh-cn/adapterref/iobroker.lgtv11/../../../en/adapterref/iobroker.lgtv11/admin/lgtv2011.png)


＃ioBroker.lgtv11 =================
适用于ioBroker的LG WebOS SmartTV适配器

从[ioBroker](https://www.iobroker.net)远程控制LG WebOS SmartTV（2011年型号到WebOS）。

---

##用法：
1.）通过ioBroker管理界面安装适配器。

2.）在适配器配置中输入LG WebOS TV的ip地址。

3.）启动适配器

4.）打开适配器配置，单击“请求配对密钥”

5.）在适配器配置中插入电视屏幕上显示的配对键

6.）重新启动适配器。

＃＃ 一些例子：
```setState('lgtv.0.turnOff', true);```

关掉电视。

```setState('lgtv.0.back', true);```

回去。

```setState('lgtv.0.mute', true);```

将电视静音。

```setState('lgtv.0.mute', false);```

取消电视静音。

```setState('lgtv.0.volumeUp', true);```

这将增加电视的音量。

```setState('lgtv.0.volumeDown', true);```

减少电视的音量。

```setState('lgtv.0.channelUp', true);```

增加当前的电视频道。

```setState('lgtv.0.channelDown', true);```

减少当前的电视频道。

```setState('lgtv.0.3Dmode', true);```

在电视上激活3D模式

```setState('lgtv.0.3Dmode', false);```

取消激活电视上的3D模式。

```setState('lgtv.0.input', true);```

打开输入列表切换到。

---

## Changelog

### 1.0.5 (2019-01-21)
* (SebastianSchultz) Added compact mode

### 1.0.4 (2018-05-08)
* (SebastianSchultz) Added "back" command/state

### 1.0.3 (2018-04-27)
* (SebastianSchultz) Fixed a bug in Admin interface that no pairing key could be requested

### 1.0.2 (2018-04-18)
* (SebastianSchultz) Renamed from ioBroker.lgtv2011 to ioBroker.lgtv11

### 1.0.1 (2018-04-17)
* (SebastianSchultz) Code clean up

### 1.0.0 (2018-04-15)
* (SebastianSchultz) Initial Release


---

## License

The MIT License (MIT)

Copyright (c) 2019 Sebastian Schultz.

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