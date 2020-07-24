---
local: true
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tr-064/README.md
title: 的ioBroker.tr-064
hash: D59HzSVYkdStJaSDx6e91FA6u2/6TTOD7QeUisJd0X0=
---
![商标](../../../en/adapterref/iobroker.tr-064/media/tr-064.png)

＃ioBroker.tr-064
###信息
该适配器从AVM Fritz！Box读取主要信息，例如呼叫清单或应答机上的消息数。
基于此[AVM文档](https://avm.de/service/schnittstellen/)

###简单状态和功能
-打开/关闭2.4GHz和5GHz的wifi，
-打开/关闭访客wifi，
-重新启动Fritz！Box，
-开始WPS流程，
-重新连接互联网
-外部IP地址

###响铃（拨一个号码）
-当使用内部号码（例如** 610）时，振铃状态将使该内部电话振铃。

例如：** 610 [，超时]

-使用外部号码时，振铃状态会将您连接到该外部号码。

当拾起被叫电话时，FritzBox将呼叫外部号码，并且您的默认电话将响铃。
可以在FritsBox中配置默认电话，如下所示：Telefonie / Anrufe / [Tab] Wahlhilfe /Wählhilfeverwenden

### ToPauseState
-值：响铃，连接，结束
-可用于在来电（振铃）或拿起电话（连接）时暂停视频播放器。
-可以对最终值进行恢复。

###存在
您可以配置要收听的设备列表。
可以由mDNS触发。使用MDNS时，不需要轮询，而且速度更快

### AB-Anrufbeantworter（答录机）
可以打开/关闭。
可以将状态cbIndex设置为应答机的地址＃。

###通话监控
呼叫监视器将为每个入站和出站呼叫创建实时状态。
如果启用了电话簿（默认），则号码将解析为“名称”。还有一个状态，指示电话正在振铃。

＃＃＃ 电话簿
-电话簿（如果启用）将用于获取呼叫者电话号码的名称。
-此外，有三种状态可解析数字或名称。如果可用，您还将获得联系人的图像URL。

  例如：如果您设置状态电话簿。将所有3个状态都编号，则姓名，电话号码和图片将设置为找到的联系人。请注意，按名称搜索将首先比较完整名称，如果找不到，则使用其中的一部分。

###通话清单
输出格式：

-JSON
-HTML

呼叫清单是：

- 所有通话
- 未接来电
-来电
-外拨电话

通话计数：通话计数可以设置为0。下一个通话将增加1。

html输出可以通过模板配置

###命令和命令结果状态
使用命令状态，您可以从此[文件资料](https://avm.de/service/schnittstellen/)调用每个tr-064命令。
例如

```
command = {
    "service": "urn:dslforum-org:service:WLANConfiguration:1",
    "action": "X_AVM-DE_SetWPSConfig",
    "params": {
        "NewX_AVM-DE_WPSMode": "pbc",
        "NewX_AVM-DE_WPSClientPIN": ""
    }
};
```

应该将命令状态设置为以上各行的JSON。因此{...}（不包含命令=和换行符）调用的回调将设置commandResult状态。

###启用通话监控
要使用呼叫监控功能，必须首先在AVM Fritz！Box中启用它。
要启用呼叫监控器拨盘```#96*5*```，将打开TCP / IP端口1012。要关闭端口拨盘```#96*4*```。

###预发行版本
预发布版本可在npm处使用标签dev获得。
您无法使用以下命令从ioBroker根目录安装它们：

```
npm install iobroker.tr-064@dev
iobroker upload tr-064
```

## Changelog

### 4.0.9 (2020-07-01)
* (Apollon77) handle cases correctly when no hosts are existing on device (Sentry IOBROKER-TR-064-R)

### 4.0.8 (2020-06-20)
* (Apollon77) Make sure states are only subscribed if initialization is done (Sentry IOBROKER-TR-064-J)

### 4.0.7 (2020-06-09)
* (Apollon77) Fix Admin UI to allow setting poll Interval correctly again

### 4.0.4 (2020-06-05)
* (Apollon77) Make sure adapter do not crash of no calls were returned (Sentry IOBROKER-TR-064-D)
* (Apollon77) Make sure adapter do not crash when invalid parameter are provided (Sentry IOBROKER-TR-064-B)
* (Apollon77) https is not supported right now (Sentry IOBROKER-TR-064-E)

### 4.0.3 (2020-05-11)
* (Apollon77) Make sure adapter do not crash of no calls were returned (Sentry IOBROKER-TR-064-7)
* (Apollon77) Make sure adapter do not crash when providing a non string to "ring" state (Sentry IOBROKER-TR-064-8) 

### 4.0.1 (2020-04-23)
* (Apollon77) handle case where no Phone deflections are available (Sentry IOBROKER-TR-064-1/2)

### 4.0.0 (2020-04-12)
* (Apollon77) update dependencies, use auto decrypt features with js-controller 3.0
* (foxriver76) make callmonitor compatible with js-controller 3.0

### 3.1.4 (2020-01-26)
* (Apollon77) fix error and check some other code check comments
* (Apollon77) Add proper meta data for buttons

### 3.1.1 (2020-01-25)
* (bluefox) Configuration dialog was improved
* (bluefox) Soef library was removed

### 3.0.0 (2020-01-24)
* (Apollon77) Switch Name back to tr064 because ewe got it from npmjs
* (maeb3) Enhance call handling and fix wrong data for currently active calls 
* (Apollon77) Remove unused state phonebook.ringing

### 2.0.3 (2019-12-17)
* (Jey Cee) fix delete last device from list

### 2.0.2 (2019-12-16)
* __requires js-controller v2__
* (foxriver76) no longer use adapter.objects
* (Apollon77) several fixes, Call lists working again, Phonebook fixed and many more

### 1.1.0 (2019-11-10)
* (jey cee) added Admin v3 support

### 1.0.0 (2019-04-01)
* (ldittmar) first version for the community

## License
The MIT License (MIT)

Copyright (c) 2015-2020 soef <soef@gmx.net>

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