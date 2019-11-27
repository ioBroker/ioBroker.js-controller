---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.cloud/README.md
title: ioBroker云适配器
hash: IBLnz1jbRRIpQ9d9ohaj94qCGQu1cVDgmgYxxzcIW1g=
---
![商标](../../../en/adapterref/iobroker.cloud/admin/cloud.png)

![安装数量](http://iobroker.live/badges/cloud-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.cloud.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.cloud.svg)
![NPM](https://nodei.co/npm/iobroker.cloud.png?downloads=true)

＃ioBroker云适配器
该适配器允许从互联网通过ioBroker云连接到ioBroker的本地安装。

##设置
### APP-KEY
要使用云适配器，您应该首先在[https://iobroker.net](https://iobroker.net)上获得APP-Key。

这是用户可以在[https://iobroker.net](https://iobroker.net)站点上获得的应用程序密钥。请在那里获取密钥并在此处输入。

![介绍](../../../en/adapterref/iobroker.cloud/img/intro.png)

###实例
来自云适配器的所有请求将被路由到某些WEB实例。用户必须在此处指定登录到https://iobroker.net站点时将显示给用户的WEB实例。

###允许自签名证书
如果您使用标准的iobroker.net云，则可以将其停用。仅当使用自己的云时，此选项才重要。

＃＃＃ 语言
如果选择“默认”语言，则不会翻译设备和枚举的智能名称。如果指定了某种语言，则所有已知名称都将翻译成该语言。
出于演示目的，可以在多种语言之间快速切换。

###首先将函数放在名称中
更改自我生成名称中的功能和角色的顺序：

-如果为假：“客房功能”，例如“客厅调光器”
-如果为true：“多功能厅”，例如“调光客厅”

###将单词与
您可以定义将在功能和房间之间放置的单词。例如。 “在调光器起居室中”和“在调光器起居室中”将是“调光器起居室”。

但不建议这样做，因为识别引擎必须再分析一个单词，否则可能导致误解。

###开关的OFF等级
某些组由混合设备组成：调光器和开关。允许使用“ ON”和“ OFF”命令以及百分数来控制它们。
如果命令为“设置为30％”，而* OFF级别为“ 30％”，则开关将打开。通过命令“设置为25％”，所有开关将关闭。

另外，如果命令为“ OFF”，那么如果实际值大于或等于“ 30％”，则适配器将记住当前的调光器级别。
稍后，当出现新的“ ON”命令时，适配器会将调光器切换到内存中的电平而不是100％。

例：

-假设* OFF等级*为30％。
-虚拟设备“ Light”具有两个物理设备：* switch *和* dimmer *。
-命令：“将灯光设置为40％”。适配器将记住* dimmer *的该值，将其设置为“ dimmer”并打开* switch *。
-命令：“关灯”。适配器会将* dimmer *设置为0％，并关闭* switch *。
-命令：“开灯”。 *调光器* => 40％，*开关* =>开。
-命令：“将灯光设置为20％”。 *调光器* => 20％，*开关* => OFF。调光器的值低于* OFF电平*，因此不会记住。
-命令：“开灯”。 *调光器* => 40％，*开关* =>开。

###由ON
您可以选择将ON命令的行为显示为数字状态。可以选择特定值，或者将使用最后一个非零值。

###写入回应
对于每个命令，都会生成文本响应。您可以在此处定义对象ID，此文本必须写入其中。例如。 *sayit.0.tts.text*

###颜色
到目前为止，只有英语alexa支持颜色控制。
通道必须具有以下四个角色的状态：

-level.color.saturation（检测通道所需），
-level.color.hue，
-level.dimmer，
-开关（可选）

```
Alexa, set the "device name" to "color"
Alexa, turn the light fuschia
Alexa, set the bedroom light to red
Alexa, change the kitchen to the color chocolate
```

###锁
为了能够锁定锁，该状态必须具有角色“ switch.lock”并具有native.LOCK_VALUE才能确定锁定状态。

```
Alexa, is "lock name" locked/unlocked
Alexa, lock the "lock name"
```

##如何生成名称
适配器尝试生成用于智能家居控制的虚拟设备（例如Amazon Alexa或Google Home）。

这是两个重要的枚举：房间和功能。

房间就像：客厅，浴室，卧室。
功能如：灯光，窗帘，暖气。

必须满足以下条件才能在自动生成的列表中获得状态：

-状态必须处于某些“功能”枚举中。
-如果状态未直接包含在“功能”中，则该状态必须具有角色（“状态”，“开关”或“ level。*”，例如level.dimmer）。

可能是通道在“功能”中，但未声明自身。

-状态必须是可写的：common.write = true
-状态调光器必须具有common.type作为'number'
-状态加热必须具有common.unit为'°C'，'°F'或'°K'，并且common.type为'number'

如果状态仅在“功能”中而不在任何“房间”中，则将使用状态名称。

状态名称将从功能和房间生成。例如。 “起居室”中的所有“灯”都将收集在虚拟设备“起居室的灯”中。
用户无法更改此名称，因为它是自动生成的。
但是，如果枚举名称更改，该名称也将更改。 （例如，“照明”功能更改为“照明”，因此“起居室照明”将更改为“起居室照明*”）

如果状态具有common.smartName，则将忽略所有规则。在这种情况下，将仅使用智能名称。

如果* common.smartName *为** false **，则状态或枚举将不包含在列表生成中。

通过配置对话框，可以轻松删除单个状态并将其添加到虚拟组或作为单个设备。
![组态](../../../en/adapterref/iobroker.cloud/img/configuration.png)

如果该组只有一个状态，则可以重命名，为此将使用状态的smartName。
如果该组具有多个状态，则必须通过枚举名称重命名该组。

要创建自己的组，用户可以安装“场景”适配器或在Javascript适配器中创建“脚本”。

###替换
您可以指定字符串，可以在设备名称中自动替换它们。例如，如果您将替换设置为：

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

curl --data“ myString” https://iobroker.net/service/custom_test/ <用户应用键>

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
### 2.8.0 (2019-11-13)
* (bluefox) Connects your ioBroker server to the ioBroker cloud

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

## License
The MIT License (MIT)

Copyright (c) 2016-2019 bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.