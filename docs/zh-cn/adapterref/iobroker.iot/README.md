---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.iot/README.md
title: ioBroker物联网适配器
hash: gi1jrml4CUm7XcuVnQ/8DKvQ7P1q6GrV+U56CoZ4EuQ=
---
![商标](../../../en/adapterref/iobroker.iot/admin/iot.png)

![安装数量](http://iobroker.live/badges/iot-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.iot.svg)
![下载](https://img.shields.io/npm/dm/iobroker.iot.svg)
![NPM](https://nodei.co/npm/iobroker.iot.png?downloads=true)

＃ioBroker物联网适配器
此适配器仅用于与Amazon Alexa通信。
它不适用于远程访问您的ioBroker实例。使用ioBroker.cloud适配器。

##设置
要使用云适配器，您应首先在ioBroker云上注册[https://iobroker.pro](https://iobroker.pro)。

![介绍](../../../en/adapterref/iobroker.iot/img/intro.png)

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
稍后当新的“ON”命令到来时，适配器将把调光器切换到100％而不是内存级别。

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
![组态](../../../en/adapterref/iobroker.iot/img/configuration.png)

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
If you call ```[POST]https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>``` und value as payload.

```

curl --data“myString”https://service.iobroker.in/v1/iotService?service=custom_ <NAME>＆key = <XXX>＆user = <USER_EMAIL>

```

or

```[GET]https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>&data=myString```

如果在设置中将“服务的白名单”字段设置为名称* custom_test *，并使用“custom_test”作为服务名称进行调用，则状态** cloud.0.services.custom_test **将设置为* myString *。

您可以在白名单中写“*”，并允许所有服务。

在这里，您可以找到如何将其与[塔斯克](doc/tasker.md)一起使用的说明。

仅当设置了IFTTT键时才允许IFTTT服务。

保留名称为“ifttt”，“text2command”，“simpleApi”，“swagger”。必须在没有```"custom_"```前缀的情况下使用它们。

### Text2command
您可以在白名单中编写“text2command”，您可以将POST请求发送到```https://service.iobroker.in/v1/iotService?service=text2command&key=<user-app-key>&user=<USER_EMAIL>```，以将数据写入* text2command.X.text *变量。

您也可以使用GET方法```https://service.iobroker.in/v1/iotService?service=text2command&key=<user-app-key>&user=<USER_EMAIL>&data=<MY COMMAND>```

可以通过“使用text2command instance”选项在设置中定义“X”。

##自定义技能
自定义技能的答案可以通过两种方式处理：

 -  text2command
 -  javascript

### Text2command
if *text2command* instance在配置对话框中定义，因此问题将发送到实例。

* text2command *必须配置为解析预期的短语并返回答案。

### Javascript
有可能直接用脚本处理问题。如果未选择* text2command *实例，则默认激活它。

如果定义了* text2command *实例，那么此实例必须提供答案，并且将忽略来自* script *的答案。

适配器将提供具有不同细节级别的两种状态的详细信息

* **smart.lastCommand** 含收到的文本，包括查询类型信息（意图）。示例：“askDeviceStatusRasenmäher”
* ** smart.lastCommandObj ***包含一个JSON字符串，可以解析为包含以下信息的对象
  * **单词**包含数组中收到的单词
 * **intent** 含查询类型。目前可能的值是“askDevice”，“controlDevice”，“actionStart”，“actionEnd”，“askWhen”，“askWhere”，“askWho”
 * **deviceId** 含一个deviceId，用于标识由亚马逊发送的请求发送到的设备，如果未提供，则为空字符串
 * **sessionId** 含技能会话的sessionId，如果说亚马逊提供的多个命令，则应该是相同的，如果没有提供，则为空字符串
 * **userId** 含来自设备所有者的userId（或者可能是以后与该技能交互的用户），由亚马逊提供，如果没有提供，将为空字符串

 有关如何检测单词以及Alexa Custom Skill区分的查询类型的更多详细信息，请查看https://forum.iobroker.net/viewtopic.php?f=37&t=17452。

**通过smart.lastResponse状态返回结果**

响应需要在“smart.lastResponse”状态下在200ms内发送，并且可以是简单的文本字符串或JSON对象。
如果是文本字符串，则此文本将作为对技能的响应发送。
如果文本是JSON对象，则可以使用以下键：

* **responseText** 要包含返回亚马逊的文本
* **shouldEndSession** 一个布尔值，用于控制会话在发出响应后是否会关闭，或者保持打开以接受另一个语音输入。

**通过消息将结果返回给iot实例**

iot实例还接受一个名为“alexaCustomResponse”的消息，其中包含一个对象“响应”，该对象可以包含如上所述的键** responseText **和** shouldEndSession **。
iot实例对消息没有响应！

**使用文本的脚本示例**

```
// important, that ack=true
on({id: 'iot.0.smart.lastCommand', ack: true, change: 'any'}, obj => {
    // you have 200ms to prepare the answer and to write it into iot.X.smart.lastResponse
    setState('iot.0.smart.lastResponse', 'Received phrase is: ' + obj.state.val); // important, that ack=false (default)
});
```

**使用JSON对象的脚本示例**

```
// important, that ack=true
on({id: 'iot.0.smart.lastCommandObj', ack: true, change: 'any'}, obj => {
    // you have 200ms to prepare the answer and to write it into iot.X.smart.lastResponse
    const request = JSON.parse(obj.state.val);
    const response = {
        'responseText': 'Received phrase is: ' + request.words.join(' ') + '. Bye',
        'shouldEndSession': true
    };

    // Return response via state
    setState('iot.0.smart.lastResponse', JSON.stringify(response)); // important, that ack=false (default)

    // or alternatively return as message
    sendTo('iot.0', response);
});
```

###私有云
如果您使用私人技能/操作/навык与`Alexa/Google Home/Алиса`进行通信，那么您可以使用IoT实例处理来自它的请求。

例如。对于`yandex alice`：

```
const OBJECT_FROM_ALISA_SERVICE = {}; // object from alisa service or empty object
OBJECT_FROM_ALISA_SERVICE.alisa = '/path/v1.0/user/devices'; // called URL, 'path' could be any text, but it must be there
sendTo('iot.0', 'private', {type: 'alisa', request: OBJECT_FROM_ALISA_SERVICE}, response => {
    // Send this response back to alisa service
    console.log(JSON.stringify(response));
});
```

支持以下类型：

 - `alexa`  - 与亚马逊Alexa或亚马逊自定义技能合作
 - “ghome” - 通过Google Home与Google Actions合作
 - `alisa`  - 与YandexАлиса合作
 - `ifttt`  - 表现得像IFTTT（实际上不是必需的，但是用于测试目的）

## Changelog
### 1.0.3 (2019-07-30)
* (bluefox) Fixed language issues for google home and yandex alice

### 1.0.1 (2019-07-26)
* (bluefox) Support of private skills/actions was added.

### 1.0.0 (2019-07-14)
* (TA2k) Google Home list was added 

### 0.5.0 (2019-06-29)
* (bluefox) tried to add yandex Alisa 

### 0.4.3 (2019-04-14)
* (Apollon77) Change enable/disable of Amazon Alexa and of Google Home from configuration to be really "active if selected". 

### 0.4.2 (2019-03-10)
* (bluefox) Allowed the enable and disable of Amazon Alexa and of Google Home from configuration. 

### 0.4.1 (2019-02-19)
* (bluefox) Add version check to google home

### 0.3.1 (2019-01-13)
* (bluefox) Blockly was fixed

### 0.3.0 (2018-12-30)
* (bluefox) Detection of google devices was fixed

### 0.2.2 (2018-12-21)
* (bluefox) Generation of new URL key was added

### 0.2.0 (2018-12-18)
* (bluefox) Change the name of adapter

### 0.1.8 (2018-10-21)
* (bluefox) Added extended diagnostics

### 0.1.7 (2018-10-14)
* (bluefox) The configuration dialog was corrected
* (bluefox) The possibility to create the answer with script for the custom skill was implemented.

### 0.1.4 (2018-09-26)
* (bluefox) Initial commit

## License
The MIT License (MIT)

Copyright (c) 2018-2109 bluefox <dogafox@gmail.com>

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