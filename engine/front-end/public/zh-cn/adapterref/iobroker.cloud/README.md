---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.cloud/edit/master//README.md
title: 云连接
hash: EYfY5wDUK2BuMkI34L5pvxHGhym23Qv7P5OrUELenJE=
adapter: true
license: MIT
authors: bluefox <dogafox@gmail.com>
description: 连接你的ioBroker服务器的ioBroker云
keywords: web, Cloud, communication
readme: https://github.com/ioBroker/ioBroker.cloud/blob/master/README.md
mode: daemon
materialize: true
compact: true
published: 2016-06-24T18:36:32.658Z
version: 2.6.2
BADGE-安装数量: http://iobroker.live/badges/cloud-stable.svg
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.cloud.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.cloud.svg
BADGE-NPM: https://nodei.co/npm/iobroker.cloud.png?downloads=true
---
![商标](zh-cn/adapterref/iobroker.cloud/../../../en/adapterref/iobroker.cloud/admin/cloud.png)


#ioBroker云适配器=================
此适配器允许从Internet通过ioBroker云连接到ioBroker的本地安装。

##设置
### APP-KEY
要使用云适配器，您应首先获得[https://iobroker.net](https://iobroker.net)上的APP-Key。

这是用户可以访问[https://iobroker.net](https://iobroker.net)站点的应用程序密钥。请在那里拿到钥匙并在此处输入。

![介绍](zh-cn/adapterref/iobroker.cloud/../../../en/adapterref/iobroker.cloud/img/intro.png)

###实例
来自云适配器的所有请求都将路由到某个WEB实例。用户必须在此处指定WEB实例，该实例将在用户登录https://iobroker.net网站时显示。

###允许自签名证书
如果您使用标准的iobroker.net云，则可以将其停用。此选项仅在使用自己的云时才重要。

＃＃＃ 语言
如果选择“默认”语言，则不会翻译设备和枚举的智能名称。如果某些语言指定所有已知名称将被翻译成该语言。
为了演示目的，可以在多种语言之间快速切换。

###首先将函数放在名称中
更改自生成名称中的函数和角色的顺序：

 - 如果错误：“房间功能”，例如“客厅调光器”
 - 如果为真：“功能室”，例如“调光客厅”

###连接单词
您可以定义将放置在功能和房间之间的单词。例如。 “in”和“Dimmer living room”将是“客厅中的调光器”。

但是不建议这样做，因为识别引擎必须再分析一个单词，这可能会导致误解。

###关闭开关的级别
一些组由混合设备组成：调光器和开关。允许用“ON”和“OFF”命令以及百分比来控制它们。
如果命令为“设置为30％”且* OFF级别为“30％”，则开关将打开。通过命令“设置为25％”，所有开关将关闭。

此外，如果命令为“OFF”，那么如果实际值大于或等于“30％”，则适配器将记住当前的调光器级别。
稍后当新的“ON”命令到来时，适配器将调光器切换到100％但不是内存级别。

例：

 - 假设* OFF级*为30％。
 - 虚拟设备“Light”有两个物理设备：* switch *和* dimmer *。
 - 命令：“将灯光设置为40％”。适配器将记住* dimmer *的此值，将其设置为“dimmer”并将*开关*打开。
 - 命令：“关灯”。适配器将*调光器*设置为0％并关闭*开关*。
 - 命令：“打开灯”。 * dimmer * => 40％，* switch * => ON。
 - 命令：“将灯光设置为20％”。 *调光器* => 20％，*开关* =>关闭。调光器的值不会被记住，因为它低于* OFF级别*。
 - 命令：“打开灯”。 * dimmer * => 40％，* switch * => ON。

ON ###
您可以选择ON命令的行为来为数字状态。可以选择特定值，或者使用最后的非零值。

###写回复
对于每个命令，将生成文本响应。您可以在此处定义必须写入此文本的对象ID。例如。 *sayit.0.tts.text*

###颜色
刚才英语alexa支持颜色控制。
该频道必须具有以下角色的4种状态：

 -  level.color.saturation（检测通道所需），
 -  level.color.hue，
 -  level.dimmer，
 - 开关（可选）

```
Alexa, set the "device name" to "color"
Alexa, turn the light fuschia
Alexa, set the bedroom light to red
Alexa, change the kitchen to the color chocolate
```

###锁定
为了能够锁定锁，状态必须具有“switch.lock”角色并具有native.LOCK_VALUE以确定锁定状态。

```
Alexa, is "lock name" locked/unlocked
Alexa, lock the "lock name"
```

##如何生成名称
适配器尝试生成用于智能家居控制的虚拟设备（例如，Amazon Alexa或Google Home）。

这是两个重要的枚举：房间和功能。

客房如：起居室，浴室，卧室。
功能如：光，盲，加热。

必须满足以下条件才能在自动生成的列表中获取状态：

 - 状态必须在某个“函数”枚举中。
 - 如果不直接包含在“函数”中，则状态必须具有角色（“状态”，“切换”或“级别。*”，例如level.dimmer）。

可能是频道处于“功能”中，但状态本身不是。

 - 状态必须是可写的：common.write = true
 - 状态调光器必须具有common.type作为'数字'
 - 状态加热必须具有common.unit为'°C'，'°F'或'°K'，而common.type为'number'

如果状态仅在“功能”中而不在任何“房间”中，则将使用状态名称。

状态名称将从功能和房间生成。例如。 *起居室*中的所有*灯*将被收集在虚拟设备*客厅灯*中。
用户无法更改此名称，因为它是自动生成的。
但是，如果枚举名称更改，则此名称也将更改。 （例如功能“灯”改为“灯”，所以*客厅灯*将改为*客厅灯*）

如果状态具有common.smartName，则将忽略所有规则。在这种情况下，只使用智能名称。

如果* common.smartName *为** false **，则状态或枚举不会包含在列表生成中。

配置对话框可以轻松删除单个状态并将其添加到虚拟组或单个设备。
![组态](zh-cn/adapterref/iobroker.cloud/../../../en/adapterref/iobroker.cloud/img/configuration.png)

如果该组只有一个状态，则可以重命名，因此将使用状态的smartName。
如果该组具有多个状态，则必须通过枚举的名称重命名该组。

要创建自己的组，用户可以在Javascript适配器中安装“场景”适配器或创建“脚本”。

###取代
您可以指定可在设备名称中自动替换的字符串。例如，如果您设置替换为：

```.STATE,.LEVEL```, so all ".STATE" and ".LEVEL" will be deleted from names. Be careful with spaces.
If you will set ```.STATE, .LEVEL```, so ".STATE" and " .LEVEL" will be replaced and not ".LEVEL".

## Helper states
- **smart.lastObjectID**: This state will be set if only one device was controlled by home skill (alexa, google home).
- **smart.lastFunction**: Function name (if exists) for which last command was executed.
- **smart.lastRoom**:     Room name (if exists) for which last command was executed.
- **smart.lastCommand**:  Last executed command. Command can be: true(ON), false(OFF), number(%), -X(decrease at x), +X(increase at X)
- **smart.lastResponse**: Textual response on command. It can be sent to some text2speech (sayit) engine.

## IFTTT
[instructions](doc/ifttt.md)

## Services
There is a possibility to send messages to cloud adapter.
If you call ```[POST]https://iobroker.net/service/custom_<NAME>/<user-app-key>``` und value as payload.

```

curl --data“myString”https://iobroker.net/service/custom_test/ <user-app-key>

```

If you set in the settings the field "White list for services" the name *custom_test*, and call with "custom_test" as the service name, the state **cloud.0.services.custom_test** will be set to *myString*.

You may write "*" in white list and all services will be allowed.

From version 2.0.5 you can use GET request in form ```[GET]https://iobroker.net/service/custom_<NAME>/<user-app-key>/<data>``` to place the **\<data\>** into **cloud.0.services.custom_\<NAME\>**.

Here you can find instructions how to use it with [tasker](doc/tasker.md).

IFTTT service is allowed only if IFTTT key is set.

Reserved names are "ifttt", "text2command", "simpleApi", "swagger". These must be used without the ```"custom_"``` prefix.

### text2command
You may write "text2command" in white list, you can send POST request to ```https://iobroker.net/service/text2command/<user-app-key>``` to write data into *text2command.X.text* variable.

"X" can be defined in settings by the "Use text2command instance" option.

### simpleApi
*to do*

## Changelog
### 2.7.1 (2018-09-07)
* (Apollon77) Enhancements for Custom Skill

### 2.7.0 (2018-06-18)
* (bluefox) Multilingual names were corrected

### 2.6.2 (2018-06-18)
* (Apollon77/AlCalzone/Bluefox) Several fixes

### 2.6.1 (2018-05-04)
* (bluefox) Support of custom alexa skill

### 2.5.0 (2018-03-17)
* (bluefox) Added actions on commands from server: wait, stop, redirect; to control load of the server by start.

### 2.4.7 (2018-02-09)
* (bluefox) Small changes in the configuration dialog
* (bluefox) add information about the expiring of remote access

### 2.4.6 (2018-02-09)
* (bluefox) Adding of new devices is fixed

### 2.4.5 (2018-01-29)
* (bluefox) Changes for Admin 3

### 2.4.4 (2018-01-20)
* (bluefox) The errors by controlling of temperature are caught now

### 2.4.2 (2018-01-20)
* (bluefox) Do not subscribe all objects

### 2.2.0 (2017-12-22)
* (bluefox) Better update of the devices in configuration dialog

### 2.1.1 (2017-12-11)
* (bluefox) Add settings for the ping timeout
* (grimneko) corrected some spelling mistakes
* (grimneko) update readme for IFTTT

### 2.1.0 (2017-12-06)
* (bluefox) Allow to disable alexa service by state

### 2.0.8 (2017-11-28)
* (bluefox / Philipp Beckers) Translations

### 2.0.7 (2017-10-29)
* (bluefox) Changes for socket-io

### 2.0.6 (2017-10-26)
* (bluefox) Fix small error in configuration
* (bluefox) Send uuid to cloud for authentication

### 2.0.5 (2017-09-26)
* (bluefox) The small custom service reaction improvement

### 2.0.4 (2017-09-12)
* (bluefox) Allow access to admin via iobroker.pro
* (c-klinger) Add settings for the connection timeout

### 1.0.8 (2017-07-13)
* (bluefox) Allow control light colors

### 1.0.7 (2017-06-26)
* (bluefox) AI deactivated
* (bluefox) change ping interval from 10 to 30 seconds
* (bluefox) fix double auth on connect

### 1.0.3 (2017-05-23)
* (bluefox) Rename some german words

### 1.0.2 (2017-05-23)
* (bluefox) Support of IFTTT

### 1.0.0 (2017-05-22)
* (bluefox) Catch an error if the invalid smart name set

### 0.8.2 (2017-04-24)
* (bluefox) controls of colors (english only)
* (bluefox) request temperature (target temperature and sensor temperature, english only)
* (bluefox) support of double names

### 0.7.1 (2017-04-05)
* (bluefox) Fixed reconnection

### 0.7.0 (2017-04-01)
* (bluefox) Try to fix reconnection

### 0.6.12 (2017-03-26)
* (bluefox) Try to fix error with names

### 0.6.11 (2017-03-20)
* (bluefox) Fixed scrollbar in configuration

### 0.6.10 (2017-03-03)
* (bluefox) Add tooltips in config
* (bluefox) Add workaround for alexa reconnection

### 0.6.9 (2017-02-17)
* (bluefox) Allow to use more than one smart name

### 0.6.8 (2017-02-16)
* (bluefox) Fix deactivation of enums

### 0.6.7 (2017-02-14)
* (bluefox) allow buttons to be controller with alexa

### 0.6.5 (2017-02-06)
* (bluefox) print warnings for invalid states

### 0.6.3 (2017-01-28)
* (bluefox) fix enum names
* (bluefox) add helper states and response text

### 0.6.2 (2017-01-25)
* (bluefox) add option "Place function in names first"

### 0.6.1 (2017-01-24)
* (bluefox) fix reconnect
* (bluefox) change smartName structure

### 0.5.0 (2017-01-20)
* (bluefox) add value by ON

### 0.4.2 (2017-01-12)
* (bluefox) add daily restart

### 0.4.1 (2017-01-06)
* (bluefox) use devices with ":" symbols in the names
* (bluefox) add debug outputs

### 0.4.0 (2017-01-06)
* (bluefox) Support of english language
* (bluefox) Use rooms of channel and not only states

### 0.3.3 (2017-01-02)
* (bluefox) Fix error with smartNames
* (bluefox) Take the superset of actions for group and not the last one
* (bluefox) if group has switches and dimmers, turn devices OFF if the percent level is less than 30%
* (bluefox) Remember ON level for dimmers to switch it later ON

### 0.3.0 (2016-12-29)
* (bluefox) Implement Heating profile for Alexa

### 0.2.0 (2016-12-13)
* (bluefox) support of amazon alexa

### 0.1.2 (2016-11-17)
* (bluefox) update socket.io

### 0.1.1 (2016-10-23)
* (bluefox) update some packages

### 0.1.0 (2016-08-01)
* (bluefox) support of read/write files