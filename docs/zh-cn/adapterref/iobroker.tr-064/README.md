---
local: true
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tr-064/README.md
title: ioBroker.tr-064
hash: gQb6+lw6ghlkjZdyw4RE6KoR3pbJ2ScyXASA/1CoXQ0=
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

```javascript
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
### 0.4.18
* (soef) IP and MAC-address added to device object
### 0.4.17
* (soef) readme updated
### 0.4.16
* (soef) terminating adapter, if init fails, so that the adapter will be restarted",
### 0.4.15
* (soef) callmonitor: new toPauseState with extension
### 0.4.14
* (soef) Errorhandling of connecting to FritzBox extended
### 0.4.12
* (soef) Errorhandling of deflections fixed
### 0.4.11
* (Apollon77) Update utils.js and usage, CI Testing and deps
### 0.4.10 (2017-11-23)
* (soef) readme changelog extended
### 0.4.9
* (soef) fix tag error in io-package.json
### 0.4.8
* (soef) fix posible timeout on getting WLAN-Infos
### 0.4.6
* (soef) fix posible exception in deflections
### 0.4.5
* (apollon77) update basic package-file testing
### 0.4.4
* (soef) states of call forwarding will now be updated in the configured interval
### 0.4.3
* (soef) Call forwarding now configurable
### 0.4.2
* (soef) fixed exception in deflections
### 0.4.1
* (soef) fix changing forwarding state
### 0.4.0
* (soef) enable/disable call forwarding added
### 0.3.24
* (soef) States from the callmonitor are renewed, even if no change
### 0.3.23
* (soef) node 0.12 removed from testing
### 0.3.22
* (soef) Enhance CI testing
### 0.3.21
* (soef) using soef 0.4.6 to fix adapter load
### 0.3.20
* (soef) adapter type changed to media
### 0.3.19
* (soef) error message removed
### 0.3.18
* (soef) clear caller/callee before next call
### 0.3.17
* (soef) Only active will be shone in configuration
### 0.3.16
* (soef) Some extensions in onMessage discovery
### 0.3.15
* (soef) toPauseState added. Values: ring, connect, end
### 0.3.14
* (soef) callee name added
### 0.3.12 (2017-03-15)
* (bluefox) phone book for repeater excluded
* (bluefox) readme extended
### 0.3.11 (2017-03-07)
* (soef) external property adde to call list
### 0.3.10 (2017-03-07)
* (soef) Error message in configuration, if an older admin adapter is installed
### 0.3.7 (2017-03-06)
* (soef) Fixed imageurl for external phone book again. E.g. google
### 0.3.6 (2017-03-06)
* (soef) Fixed imageurl for external phone book. e.g. google
### 0.3.5 (2017-03-06)
* (soef) Json device list added
### 0.3.3 (2017-03-01)
* (soef) phonebook functions/states added
### 0.3.1 (2017-02-28)
* (soef) some bug fixes
* (soef) releasing call lists
### 0.3.0 (2017-02-25)
* (bluefox) use new table for configuration dialog

### 0.2.0 (2016)
* (soef) initial commit