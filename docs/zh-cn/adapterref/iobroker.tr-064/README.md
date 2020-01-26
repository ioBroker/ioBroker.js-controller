---
local: true
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tr-064/README.md
title: ioBroker.tr-064
hash: D59HzSVYkdStJaSDx6e91FA6u2/6TTOD7QeUisJd0X0=
---
![商标](../../../en/adapterref/iobroker.tr-064/media/tr-064.png)

＃ioBroker.tr-064
###信息
此适配器从AVM Fritz！Box读取主要信息，如呼叫列表或应答机上的消息数。
基于此[AVM文件](https://avm.de/service/schnittstellen/)

###简单的状态和功能
 - 打开/关闭2.4GHz和5GHz的wifi，
 - 打开/关闭客人wifi，
 - 重启Fritz！Box，
 - 启动WPS流程，
 - 重新连接互联网
 - 外部IP地址

### Ring（拨打号码）
 - 当使用内部号码（如** 610）时，响铃状态将响铃内部电话。

例如：** 610 [，超时]

 - 使用外部号码时，振铃状态会将您连接到外部号码。

当被叫电话被拿起时，FritzBox将拨打外部号码，您的默认电话将响铃。
可以在FritsBox下配置默认手机：Telefonie / Anrufe / [Tab] Wahlhilfe /Wählhilfeverwenden

### ToPauseState
 - 值：响铃，连接，结束
 - 可用于在接听电话（振铃）或接听电话（连接）时暂停视频播放器。
 - 可以对结束值进行恢复。

###存在
您可以配置要侦听的设备列表。
可以是mDNS的triggert。使用MDNS时，不需要轮询，而且速度更快

### AB  -  Anrufbeantworter（电话答录机）
可以打开/关闭。
可以设置状态cbIndex，以解决answerig机器的＃。

###呼叫监控
callmonitor将为每个入站和出站呼叫创建实时状态。
如果电话簿已启用（默认），则号码将被解析为姓名还有一个状态表示电话铃声。

＃＃＃ 电话簿
 - 电话簿（如果已启用）将用于获取呼叫者电话号码的名称。
 - 此外，有三种状态可以解决数字或名称。如果可用，您还将获得联系人的图像URL。

  例如：如果您设置状态phonebook.number所有3个状态，名称，数字和图像将设置为找到的联系人。注意，按名称搜索将首先比较完整名称，如果未找到，则使用部分名称。

###通话清单
输出格式：

 - 杰森
 -  HTML

通话清单是：

- 所有通话
- 未接来电
 - 入站电话
 - 外拨电话

呼叫计数：呼叫计数可以设置为0.下一个呼叫将输入1。

可以通过模板配置html输出

### Command＆commandResult state
使用命令状态，您可以从此[文件](https://avm.de/service/schnittstellen/)调用每个tr-064命令。
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

命令状态应设置为上述行的JSON。所以{...}（没有命令=和换行符）调用的回调将设置commandResult状态。

###启用呼叫监控器
要使用呼叫监视器功能，必须首先在AVM Fritz！Box中启用它。
要启用呼叫监控拨号```#96*5*```，将打开TCP / IP端口1012。关闭端口拨号```#96*4*```。

###预发布版本
预发布版本可在npm使用标签dev。
您可以使用以下命令从ioBroker根目录安装它们：

```
npm install iobroker.tr-064@dev
iobroker upload tr-064
```

## Changelog
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