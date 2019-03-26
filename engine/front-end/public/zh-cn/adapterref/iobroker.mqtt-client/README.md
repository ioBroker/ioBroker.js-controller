---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/Pmant/ioBroker.mqtt-client/edit/master//README.md
title: MQTT client
hash: 6qFhuG22DX3ZziD5rAKORxAIVJLyjGaQEtw6IgmNcKo=
adapter: true
license: MIT
authors: Pmant <patrickmo@gmx.de>
description: Syncing with MQTT Brokers
keywords: mqtt, syncing, data
readme: https://github.com/Pmant/ioBroker.mqtt-client/blob/master/README.md
mode: daemon
materialize: true
compact: false
published: 2016-06-19T20:44:36.935Z
version: 1.1.1
BADGE-安装数量: http://iobroker.live/badges/mqtt-client-stable.svg
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.mqtt-client.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.mqtt-client.svg
BADGE-NPM: https://nodei.co/npm/iobroker.mqtt-client.png?downloads=true
---
![商标](zh-cn/adapterref/iobroker.mqtt-client/../../../en/adapterref/iobroker.mqtt-client/admin/mqtt-client.png)


#ioBroker.mqtt-client ===================
##适配器设置
![适配器](zh-cn/adapterref/iobroker.mqtt-client/../../../en/adapterref/iobroker.mqtt-client/settings.png)

关于连接主题和消息的###
每次客户端连接或重新连接到服务器时，```on connect message```都会发布到```on connect topic```。

###最后将主题和消息
每次客户端连接或重新连接到服务器时，```last will message```都会发布到```last will topic```。
当客户端断开连接时，服务器将存储此消息并将其发送给其订户。

###订阅
逗号分隔的现有状态未涵盖的主题列表。
接收的消息将转换为适配器命名空间（例如mqtt.0）中的状态并进行订阅。
您可以在创建所有状态后删除主题。

###发布前缀
发布时，将在所有主题之前添加。
默认为空（无前缀）。

###订阅前缀
订阅时，这将包含在所有主题之前。
默认为空（无前缀）。

##状态设置
![州](zh-cn/adapterref/iobroker.mqtt-client/../../../en/adapterref/iobroker.mqtt-client/dialog.png)

###已启用
启用或禁用此状态的mqtt-client功能。
禁用将从此状态删除任何mqtt-client设置。

＃＃＃ 话题
此状态发布到并订阅的主题。
default：state-ID转换为mqtt主题。

###发布
*```enable```状态将被发布
*``仅更改```状态只会在其值发生变化时发布
*```as object```整个州将作为对象发布
*```qos```参见<http://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels>
*```保留```见<http://www.hivemq.com/blog/mqtt-essentials-part-8-retained-messages>

###订阅
*```enable```主题将被订阅，状态将相应更新
*``仅更改```状态只会在值改变时写入
*```as object```消息将被解释为对象
*```qos```参见<http://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels>
*```ack```在状态更新时，将相应地设置ack标志

＃＃＃＃ 注意
*当ack设置为true时，它将覆盖对象ack，参见```as object```
*以防止消息循环，如果启用了发布和订阅，则```仅更改```始终打开以进行订阅

＃＃ 去做
*测试前缀
*连接/重新连接没有干净的会话

## Changelog
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