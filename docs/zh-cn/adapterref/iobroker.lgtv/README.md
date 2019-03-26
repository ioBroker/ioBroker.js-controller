---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lgtv/README.md
title: ioBroker.lgtv
hash: 9PTarqLZmBfNEPK/Fa5CvxUzVwaHGZYD/EpD21P4SO0=
---
![商标](../../../en/adapterref/iobroker.lgtv/admin/lgtv.png)

![安装数量](http://iobroker.live/badges/lgtv-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.lgtv.svg)
![下载](https://img.shields.io/npm/dm/iobroker.lgtv.svg)
![NPM](https://nodei.co/npm/iobroker.lgtv.png?downloads=true)
![特拉维斯-CI](https://travis-ci.org/SebastianSchultz/ioBroker.lgtv.svg?branch=master)
![AppVeyor](https://ci.appveyor.com/api/projects/status/xx55hgsuff4fas47/branch/master?svg=true)

#ioBroker.lgtv =================
适用于ioBroker的LG WebOS SmartTV适配器

从[ioBroker](https://www.iobroker.net)远程控制LG WebOS SmartTV（2013模型及更高版本）。

---

##用法：
通过ioBroker管理界面安装适配器。
在适配器配置中输入您的LG WebOS电视的IP地址。
首次连接时，您将在电视屏幕上收到配对提示，您应该允许连接。

＃＃ 一些例子：
```setState('lgtv.0.states.popup', 'Some text!');```

这将显示一个带有文字“Some text！”的弹出窗口。在电视上。
您可以在文本中使用HTML换行符（br）。

```setState('lgtv.0.states.turnOff', true);```

关掉电视。

```setState('lgtv.0.states.mute', true);```

将电视静音。

```setState('lgtv.0.states.mute', false);```

取消电视静音。

```setState('lgtv.0.states.volumeUp', true);```

这将增加电视的音量。

```setState('lgtv.0.states.volumeDown', true);```

减少电视的音量。

```setState('lgtv.0.states.channelUp', true);```

增加当前的电视频道。

```setState('lgtv.0.states.channelDown', true);```

减少当前的电视频道。

```setState('lgtv.0.states.3Dmode', true);```

在电视上激活3D模式

```setState('lgtv.0.states.3Dmode', false);```

取消激活电视上的3D模式。

```setState('lgtv.0.states.channel', 7);```

将直播电视切换到频道编号7。

```setState('lgtv.0.states.launch', 'livetv');```

切换到直播电视模式。

```setState('lgtv.0.states.launch', 'smartshare');```

在电视上打开SmartShare应用程序。

```setState('lgtv.0.states.launch', 'tvuserguide');```

在电视上运行电视用户指南应用程序。

```setState('lgtv.0.states.launch', 'netflix');```

在电视上打开Netflix应用程序。

```setState('lgtv.0.states.launch', 'youtube');```

在电视上打开Youtube应用程序。

```setState('lgtv.0.states.launch', 'prime');```

在电视上打开亚马逊Prime应用程序。

```setState('lgtv.0.states.launch', 'amazon');```

在某些电视上，此命令会打开Amazon Prime应用程序。

```setState('lgtv.0.states.openURL', 'http://www.iobroker.net');```

在电视上打开Web浏览器并导航到www.iobroker.net。
也可用于打开图像或视频（在浏览器中）。

```setState('lgtv.0.states.input', 'AV_1');```

将输入和电视切换到AV1。

```setState('lgtv.0.states.input', 'SCART_1');```

将输入和电视切换到Scart。

```setState('lgtv.0.states.input', 'COMP_1');```

将输入和电视切换到组件。

```setState('lgtv.0.states.input', 'HDMI_1');```

将输入和电视切换到HDMI 1。

```setState('lgtv.0.states.input', 'HDMI_2');```

将输入和电视切换到HDMI 2。

```setState('lgtv.0.states.input', 'HDMI_3');```

将输入和电视切换到HDMI 3。

---

＃＃ 状态
渠道

持有当前渠道

体积

保持当前音量水平并可以改变音量

上

电视开启时为真，电视关闭时为假

---

## Changelog

### 1.0.8 (2019-03-15)
* (SebastianSchultz) general NPM update

### 1.0.7 (2019-01-28)
* (SebastianSchultz) grouping of all states/objects under a device

### 1.0.6 (2019-01-21)
* (SebastianSchultz) added compact mode

### 1.0.5 (2018-04-15)
* (SebastianSchultz) added Travis-CI and AppVeyor tests

### 1.0.4 (2018-04-07)
* (SebastianSchultz) added support for increasing (channelUp) or decreasing (channelDown) the current TV channelDown
* (SebastianSchultz) added the state "volume" which holds the current volume level

### 1.0.3 (2018-01-11)
* (SebastianSchultz) added support for launching Amazon Prime app via "amazon" (used on some TV's instead of "prime")
* (SebastianSchultz) fixed issue that state "on" was not set when in an app on TV

### 1.0.2 (2017-05-23)
* (SebastianSchultz) added support for launching Amazon Prime app

### 1.0.0 (2016-09-26)
* (SebastianSchultz) added channel polling
* (SebastianSchultz) added switching input

### 0.0.4 (2016-09-12)
* (SebastianSchultz) solved saving IP address within adapter configuration

### 0.0.3 (2016-09-05)
* (SebastianSchultz) added volumeUp true|false
* (SebastianSchultz) added volumeDown true|false
* (SebastianSchultz) added 3Dmode true|false
* (SebastianSchultz) added launch livetv|smartshare|tvuserguide|netflix|youtube|<URL>
* (SebastianSchultz) added channel <channelNumber>
* (SebastianSchultz) some code cleaned

### 0.0.2 (2016-09-02)
* (SebastianSchultz) removed reconnect function, not used
* (SebastianSchultz) improved error handling and logging

### 0.0.1 (2016-08-31)
* (SebastianSchultz) initial commit


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