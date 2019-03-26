---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.fritzdect.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.fritzdect.svg
BADGE-Build Status: https://travis-ci.org/foxthefox/ioBroker.fritzdect.svg?branch=master
BADGE-NPM: https://nodei.co/npm/iobroker.fritzdect.png?downloads=true
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/foxthefox/ioBroker.fritzdect/edit/master//README.md
title: fritzbox dect适配器
hash: lGaWT1nRwOi9PZbQFpJ0OKapX9z2FxtoOlSKxYorj5Q=
adapter: true
license: MIT
authors: foxthefox <foxthefox@wysiwis.net>
description: 将DECT ULE设备（fritzdect）连接到ioBroker
keywords: smart home, DECT200, COMET, fritzbox
readme: https://github.com/foxthefox/ioBroker.fritzdect/blob/master/README.md
mode: daemon
materialize: true
compact: true
published: 2017-01-21T22:19:40.633Z
version: 0.2.1
---
![徽标](zh-cn/adapterref/iobroker.fritzdect/../../../de/adapterref/iobroker.fritzdect/../../admin/fritzdect_logo.png)

＃安装说明
## FritzBox设置
必须创建有权访问DECT对象的用户

![fritzbox](zh-cn/adapterref/iobroker.fritzdect/../../../de/adapterref/iobroker.fritzdect/fritzdect_einstellung.PNG)

如果已创建特殊用户（即i不是admin用于iobroker），则必须设置权限，并且必须将仅管理员登录的默认值更改为用户。

![fritzbox](zh-cn/adapterref/iobroker.fritzdect/../../../de/adapterref/iobroker.fritzdect/fritz_iobroker_user.PNG)

![fritzbox](zh-cn/adapterref/iobroker.fritzdect/../../../de/adapterref/iobroker.fritzdect/fritz_user.PNG)

##适配器设置
*输入前缀为“http：//”的IP
*轮询间隔可以任意选择（默认5分钟= 300秒）。这对于在ioBroker之外进行跟踪是必要的，因为FritzBox不提供自动更新。

![管理](zh-cn/adapterref/iobroker.fritzdect/../../../de/adapterref/iobroker.fritzdect/fritzdect_admin.PNG)

##适配器启动
随着适配器的启动，完成以下操作：

* FW Fritzbox被查询并写入日志中（有些Fritz框没有回答，这会产生错误）。
*为设备创建数据点（对象）
*创建组的数据点（对象）
*为对象提供数据

以下对象在启动时仅写入一次：

* id
* fwversion
*制造商
*产品名称
* masterdviceid
*成员

##恒温器功能
恒温器可以在自动模式（温度控制）下运行，并控制在设定点温度。
设定点温度可以是舒适温度，回退温度或自选温度。

此外，阀门可以完全关闭，并且它对应于OFF状态。
另一个方向也可以选择ON，并且对应于BOOST或桑拿模式（不要忘记再次修复;-)）。

在数据点模式下，这些当前的3种操作模式可以预先选择0,1或2。
通过预选0-AUTO，选择最后一个设定点温度。

###带偏移的温度
可以校正FritzBox中的测量温度，这是测量的温度并且存在偏移。数据点.temp会考虑此偏移量。在这里，您可以获得内部温度测量。
散热器控制器内部使用的实际温度（actualtemp）也会因偏移而改变。那HKR内部监管更正后的价值。
因此，目标/ Istverlaufs的比较是atualtemp和targettemp。

##疑难解答
建议查看日志，如果没有意义或太少的信息是在实例的专家设置上选择调试模式。

## Changelog
### 0.2.1
* gulp added
* correction for DECT100 without temperature (caused a stop in creation of objects)
* template creation corrected
* my templates added in admin page

### 0.2.0
* compact mode

### 0.1.5
* reading and activation of templates added
* correction of actual temperature in DECT200 and COMET (now offset recognized)
* password now hidden typed and encrypted
* new datapoint actualtemp for Comet
* fritzapi 0.10.5

### 0.1.4
* button added, only send the timestamp of last click
* fritzapi 0.10.4

### 0.1.3
* windowopenactiv added to thermostat

### 0.1.2
* errorcode string->number
* batterylow -> boolean
* switch in admin for non native API call for battery charge in % (shall prevent 403 message logs)

### 0.1.1
* switch for GuestWLAN when no access is granted and polling creates an error
* check for devices in admin page for better access to the xml/json stream from fritzbox
* admin v3 implemented

### 0.1.0
* major code change to use the xml stream instead the dedicated API-commands for the dedicated values
* creation of objects according the feedback from fritzbox
* support of groups
* still usage of non-universal object names
* more objects

### 0.0.14
* correction of temp offset influence

### 0.0.13
* DECT200 voltage new object
* DECT200 mode/lock value polling
* Comet mode as number and not array
* ADMIN v3

### 0.0.12
* changed state to  mode AUTO/OFF/ON for thermostat (including datapoint lasttarget when going back to AUTO)
* added name state for thermostat
* DECT100 temperature reading
* Contact reading

### 0.0.11
* added state OFF/ON for thermostat

### 0.0.10
* change to object oriented interface
* getOSversion when starting for log

### 0.0.9
* values '1' accepted for ON
* values '0' accepted for OFF

### 0.0.8
* messages info-> debug
* values 1/true/on/ON accepted for ON
* values 0/false/off/OFF accepted for OFF

### 0.0.7
* current temp of Comet/DECT300
* cyclic polling GuestWLAN

### 0.0.6
* correction targettemp in DECT200 section

### 0.0.5
* setTemp on COMET
* GuestWlan corrected

### 0.0.4
* cyclic status polling

### 0.0.3
* user now configurable

### 0.0.2
* metro widget for Dect200
* smartfritz-promise->fritzapi
* running version, tested with 1x DECT200 and Fritzbox FW=6.51 on Win10 with 4.5.0 and raspberry 4.7.0

### 0.0.1
* running version, tested with 1x DECT200 and Fritzbox FW=6.30

## License

The MIT License (MIT)

Copyright (c) 2018 foxthefox <foxthefox@wysiwis.net>