---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/schmupu/ioBroker.ring/edit/master//README.md
title: Ring
hash: o3ElFNuF53MNsHtyLEEpzVj1oCXP6yO9LfjM4Ri29+I=
adapter: true
license: MIT
authors: Thorsten Stueben <thorsten@stueben.de>
description: Ring Adapter
keywords: ring
readme: https://github.com/schmupu/ioBroker.ring/blob/master/README.md
mode: daemon
materialize: true
compact: true
published: 2018-12-14T13:36:22.039Z
version: 1.0.3
BADGE-Travis CI构建状态: https://travis-ci.org/schmupu/ioBroker.ring.svg?branch=master
BADGE-AppVeyor构建状态: https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.ring?branch=master&svg=true
BADGE-安装数量: http://iobroker.live/badges/ring-stable.svg
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.ring.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.ring.svg
BADGE-NPM: https://nodei.co/npm/iobroker.ring.png?downloads=true
---
![商标](zh-cn/adapterref/iobroker.ring/../../../en/adapterref/iobroker.ring/admin/ring.png)


#Ring适配器
需要node.js 8.0或更高版本以及Admin v3！

环形适配器可与环形视频门铃和环形凸轮等环形设备配合使用，并显示是否有人敲响了门铃或是否检测到动作。如果检测到运动或门铃，则环形视频门铃或凸轮不发送视频流。而是将提供SIP视频会议的SIP信息。
您可以在[http://icanblink.com/](http://icanblink.com/)上使用例如Blink SIP客户端。要使视频工作进入Blink的首选项并在“帐户”下，将标签切换为“媒体”并取消选择“加密音频和视频”在“RTP选项”下。小心SIP信息在几秒钟后过期！希望我能尽快支持视频流。不幸的是，[ring.com](https://ring.com)没有支持此功能的官方API。
如果按livestreamrequest按钮，则会获得用于构建SIP视频呼叫会话的新SIP信息。如果您使用的是[ring.com](https://ring.com)云，则可以在历史记录中找到指向上一个动作/门铃录制视频的http链接。

##安装和配置
安装适配器后，您必须输入[ring.com](https://ring.com)帐户的电子邮件和密码。

如果检测到运动或门环，则获取更改的示例：

```
on({id: "ring.0.doorbell_4711.kind"/*Kind*/},  (obj) => {
  if(obj.state.val == 'ding')   console.log("Someone is at the door");
  if(obj.state.val == 'motion') console.log("Motion detected");
});
```

## Changelog

### 1.0.3 (09.03.2019)
* (Stübi) Major change! I had to change the used ring.com API to an other API. The old one did not work anymore. For this reason, a lot has to be redesigned.  

### 1.0.2 (01.02.2019)
* (Stübi) More debug information 

### 1.0.1 (05.01.2019)
* (Stübi) Support js-controller compact mode 

### 1.0.0 (04.01.2018)
* (Stübi) Add camera device. For this reason, the device name changed from doorbot to doorbell.

### 0.1.3 (20.12.2018)
* (Stübi) Update error handling

### 0.1.2 (17.12.2018)
* (Stübi) Update error handling

### 0.1.1 (15.12.2018)
* (Stübi) Improvements

### 0.1.0 (14.12.2018)
* (Stübi) First Version

## License
The MIT License (MIT)

Copyright (c) 2018 Thorsten <thorsten@stueben.de> / <https://github.com/schmupu>

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