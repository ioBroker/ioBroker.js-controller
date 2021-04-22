---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mqtt-client/README.md
title: ioBroker.mqtt-客户端
hash: GV9yQNtkLUyfuDFH9uo5frFCfqrBm6d4DIke/mXo0NA=
---
![商标](../../../en/adapterref/iobroker.mqtt-client/admin/mqtt-client.png)

![安装数量](http://iobroker.live/badges/mqtt-client-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.mqtt-client.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.mqtt-client.svg)
![NPM](https://nodei.co/npm/iobroker.mqtt-client.png?downloads=true)

＃ioBroker.mqtt-client
##适配器设置
![适配器](../../../en/adapterref/iobroker.mqtt-client/img/settings.png)

###关于连接主题和消息
每次客户端连接或重新连接到服务器时，```on connect message```都会发布到```on connect topic```中。

###最后将主题和消息
每次客户端连接或重新连接到服务器时，```last will message```都会发布到```last will topic```中。
当客户端断开连接时，服务器将存储此消息并将其发送给其订阅者。

###订阅
以逗号分隔的现有状态未涵盖的主题列表。
收到的消息将转换为适配器名称空间（例如mqtt.0）内的状态并进行订阅。
创建所有状态后，您可以删除主题。

###发布前缀
发布时，此主题将附加在所有主题之前。
默认为空（无前缀）。

###订阅前缀
订阅时，将在所有主题之前进行。
默认为空（无前缀）。

##状态设定
![状态](../../../en/adapterref/iobroker.mqtt-client/img/dialog.png)

###已启用
启用或禁用此状态的mqtt-client功能。
禁用将从该状态删除任何mqtt-client设置。

＃＃＃ 话题
此状态发布到并订阅的主题。
默认值：状态ID转换为mqtt主题。

###发布
*```enable''状态将被发布
*仅更改状态将仅在其值更改时发布
*```as object```整个状态将作为对象发布
*```qos```参见<http://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels>
*```retain''`参见<http://www.hivemq.com/blog/mqtt-essentials-part-8-retained-messages>

＃＃＃ 订阅
*```enable''主题将被订阅并且状态将被相应地更新
*```仅更改''状态只会在值更改时写入
*```as object```消息将被解释为对象
*```qos```参见<http://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels>
*状态中的```ack''`更新了ack标志将被相应地设置

＃＃＃＃ 笔记
*当ack设置为true时，它将覆盖对象ack，请参见“作为对象”
*以防止消息循环，如果同时启用了发布和订阅，则“仅更改”始终处于订阅状态

＃＃ 去做
*测试前缀
*无需干净的会话即可连接/重新连接

<！-下一个版本的占位符（在该行的开头）：

### __正在进行的工程__->

## Changelog
### 1.3.2 (2021-04-19)
* (bluefox) Added support of admin5

### 1.3.1 (2020-03-17)
* (bluefox) mqtt package moved back to 2.x

### 1.3.0 (2020-03-11)
* (bluefox) mqtt package was updated
* (bluefox) Fixed the error with "custom" view

### 1.2.1 (2019-10-17)
* (algar42) Fix adapter restarting
* (algar42) Fix mqtt issues

### 1.2.0 (2019-10-14)
* (bluefox) Support of js-controller 2.0 was added

### 1.1.1 (2018-01-30)
* (bluefox) small fixes

### 1.1.0 (2017-12-30)
* (bluefox) Translations
* (bluefox) Udpate of MQTT module

### 1.0.1 (2017-11-16)

### 1.0.0 (2017-11-16)
* (bluefox) Update io-package.json

### 0.3.2 (2016-11-18)
* (Pmant) fix initial object parsing
* (Pmant) fix objects view

### 0.3.1 (2016-11-16)
* (Pmant) fix crash

### 0.3.0 (2016-09-08)
* (Pmant) add optional publish and subscribe prefixes

### 0.2.5 (2016-09-08)
* (Pmant) reduce logging -> debug

### 0.2.0 (2016-09-08)
* (Pmant) use new custom settings

### 0.1.1 (2016-06-09)
* (Pmant) fix possible loop

### 0.1.0 (2016-06-08)
* (Pmant) initial commit

## License
The MIT License (MIT)

Copyright (c) 2016-2020 Pmant

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