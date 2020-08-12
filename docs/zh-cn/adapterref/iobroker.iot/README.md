---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.iot/README.md
title: ioBroker物联网适配器
hash: nQ78rpnrcY2c7CIE4NRRm0x4wnpm0YzYP8+/agUS/po=
---
![商标](../../../en/adapterref/iobroker.iot/admin/iot.png)

![安装数量](http://iobroker.live/badges/iot-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.iot.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.iot.svg)
![NPM](https://nodei.co/npm/iobroker.iot.png?downloads=true)

＃ioBroker物联网适配器
该适配器仅用于与Amazon Alexa，Google Home和Nightscout通信。
它不是用于远程访问ioBroker实例。为此使用ioBroker.cloud适配器。

**此适配器使用Sentry库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参见[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！ Sentry报告从js-controller 3.0开始使用。

##设置
要使用云适配器，您应该首先在ioBroker云[https://iobroker.pro](https://iobroker.pro)中注册。

[引用Google API类型设置](https://developers.google.com/actions/smarthome/guides/)

![介绍](../../../en/adapterref/iobroker.iot/img/intro.png)

＃＃＃ 语言
如果选择“默认”语言，则不会翻译设备和枚举的智能名称。如果指定了某种语言，则所有已知名称都将翻译成该语言。
出于演示目的，可以在多种语言之间快速切换。

###首先将函数放在名称中
更改自我生成名称中的功能和角色的顺序：

-如果为假：“客房功能”，例如“客厅调光器”
-如果为true：“多功能厅”，例如“调光客厅”

###将单词与
您可以定义将在功能和房间之间放置的单词。例如。 “在”中和从“调光器客厅”起，将是“调光器在客厅”。

但不建议这样做，因为识别引擎必须再分析一个单词，否则可能导致误解。

###开关的OFF等级
某些组由混合设备组成：调光器和开关。允许使用“ ON”和“ OFF”命令以及百分比来控制它们。
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
为了能够锁定锁，状态必须具有角色“ switch.lock”和“ native.LOCK_VALUE”才能确定锁定状态。如果需要单独的值来控制锁，则可以使用“ native.CONTROL VALUE”。

```
Alexa, is "lock name" locked/unlocked
Alexa, lock the "lock name"
```

##名称的产生方式
适配器尝试生成用于智能家居控制的虚拟设备（例如Amazon Alexa或Google Home）。

这是两个重要的枚举：房间和功能。

房间就像：客厅，浴室，卧室。
功能如：灯光，窗帘，暖气。

要自动生成列表中的状态，必须满足以下条件：

-状态必须处于某些“功能”枚举中。
-如果未直接包含在“功能”中，则状态必须具有角色（“状态”，“开关”或“ level。*”，例如level.dimmer）。

可能是通道在“功能”中，但未声明其状态。

-状态必须是可写的：common.write = true
-状态调光器必须具有common.type作为'number'
-状态加热必须具有common.unit为'°C'，'°F'或'°K'，并且common.type为'number'

如果状态仅在“功能”中而不在任何“房间”中，则将使用状态名称。

状态名称将从功能和房间生成。例如。 “起居室”中的所有“灯”都将收集在虚拟设备“起居室的灯”中。
用户无法更改此名称，因为它是自动生成的。
但是，如果枚举名称更改，该名称也将更改。 （例如，“灯光”功能更改为“灯光”，因此“起居室灯光”将更改为“起居室灯光*”）

如果状态具有common.smartName，则将忽略所有规则。在这种情况下，将仅使用智能名称。

如果* common.smartName *为** false **，则状态或枚举将不包括在列表生成中。

通过配置对话框，可以轻松删除单个状态并将其添加到虚拟组或作为单个设备。
![组态](../../../en/adapterref/iobroker.iot/img/configuration.png)

如果该组只有一个状态，则可以重命名，因为将使用该状态的smartName。
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
If you call ```[POST]https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>``` und value as payload.

```

curl --data“ myString” https://service.iobroker.in/v1/iotService?service=custom_ <NAME>＆key = <XXX>＆user = <USER_EMAIL>

```

or

```[GET]https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>&data=myString```

如果您在设置中将“服务白名单”字段设置为名称* custom_test *，并使用“ custom_test”作为服务名称进行调用，则状态** cloud.0.services.custom_test **将设置为* myString *。

您可以在白名单中写上“ *”，然后将允许所有服务。

在这里，您可以找到有关如何与[任务者](doc/tasker.md)一起使用的说明。

仅当设置了IFTTT密钥时，才允许IFTTT服务。

保留名称为“ ifttt”，“ text2command”，“ simpleApi”，“ swagger”。必须在没有```"custom_"```前缀的情况下使用它们。

### Text2command
您可以在白名单中写入“ text2command”，可以将POST请求发送到```https://service.iobroker.in/v1/iotService?service=text2command&key=<user-app-key>&user=<USER_EMAIL>```以将数据写入* text2command.X.text *变量。

您也可以使用GET方法```https://service.iobroker.in/v1/iotService?service=text2command&key=<user-app-key>&user=<USER_EMAIL>&data=<MY COMMAND>```

可以通过“使用text2command实例”选项在设置中定义“ X”。

##自定义技能
定制技能的答案可以通过两种方式处理：

-text2command
-JavaScript

### Text2command
如果在配置对话框中定义了* text2command *实例，那么问题将发送到该实例。

必须配置* text2command *，以便解析期望的短语并给出答案。

### Javascript
有可能直接使用脚本处理问题。如果未选择* text2command *实例，则默认情况下将其激活。

如果定义了* text2command *实例，那么此实例必须提供答案，而来自* script *的答案将被忽略。

适配器将在两种状态下提供具有不同详细信息级别的详细信息

* **smart.lastCommand** 含接收的文本，包括有关查询类型（意图）的信息。示例：“ askDevice StatusRasenmäher”
* ** smart.lastCommandObj ***包含一个JSON字符串，可以将其解析为包含以下信息的对象
  * **单词**将接收到的单词包含在数组中
  * **意图**包含查询的类型。当前可能的值是“ askDevice”，“ controlDevice”，“ actionStart”，“ actionEnd”，“ askWhen”，“ askWhere”，“ askWho”
 * **deviceId** 含一个设备ID，用于标识由Amazon交付的请求发送到的设备，如果未提供，则为空字符串
 * **sessionId** 含Skill会话的sessionId，如果亚马逊说了多个命令，则应该相同，如果未提供，则为空字符串
 * **userId** 含来自设备所有者（或稍后与该技能进行交互的用户）的AmazonId，由Amazon提供，如果未提供，则为空字符串

 有关如何检测单词以及Alexa自定义技能区分哪些类型的查询的更多详细信息，请检查https://forum.iobroker.net/viewtopic.php?f=37&t=17452。

**通过smart.lastResponse状态返回结果**

响应需要在状态为“ smart.lastResponse”的200毫秒内发送，并且可以是简单的文本字符串或JSON对象。
如果它是一个文本字符串，那么此文本将作为对技能的响应而发送。
如果文本是JSON对象，则可以使用以下键：

* **responseText** 要包含要返回亚马逊的文本
*** shouldEndSession **是一个布尔值，用于控制在说出响应后会话将关闭还是保持打开状态以接受其他语音输入。

**通过消息返回结果到物联网实例**

物联网实例还接受名称为“ alexaCustomResponse”的消息，其中包含键“ response”，并且对象可以包含键** responseText **和** shouldEndSession **，如上所述。
物联网实例将不会对消息做出任何响应！

**使用文字的脚本示例**

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
如果您使用私人技能/动作/方法与`Alexa/Google Home/Алиса`进行通信，则可以使用IoT实例来处理来自它的请求。

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

-`alexa`-使用Amazon Alexa或Amazon Custom Skill进行操作
-`ghome`-通过Google Home与Google Actions互动
-`alisa`-与YandexАлиса合作
-`ifttt`-类似于IFTTT（实际上不是必需的，但出于测试目的）

<！-下一个版本的占位符（在该行的开头）：

### __进展中__->

## Changelog

### 1.6.4 (2020-08-06)
* (Apollon77) crash prevented (Sentry IOBROKER-IOT-V)

### 1.6.3 (2020-08-04)
* (bluefox) Added french letters to allowed symbols

### 1.6.1 (2020-07-10)
* (bluefox) Used new SelectID Dialog in GUI

### 1.5.3 (2020-05-28)
* (bluefox) Small change for nightscout

### 1.5.2 (2020-05-21)
* (bluefox) Changed requirements for password
* (bluefox) Do not try load the "sharp" if blood sugar not enabled

### 1.4.18 (2020-05-11)
* (Apollon77) Make sure that invalid configured states or values without timestamp do not crash adapter (Sentry IOBROKER-IOT-8)
* (Apollon77) Make sure publishes after disconnect to not break adapter (Sentry IOBROKER-IOT-A)

### 1.4.17 (2020-05-11)
* (bluefox) Better error output is implemented

### 1.4.14 (2020-05-01)
* (bluefox) Fixed the problem if admin is not on 8081 port

### 1.4.12 (2020-04-30)
* (Apollon77) error case handled where system.config objects does not exist (Sentry IOBROKER-IOT-5)

### 1.4.11 (2020-04-26)
* (bluefox) fixed IOBROKER-IOT-REACT-F

### 1.4.10 (2020-04-24)
* (bluefox) Fixed crashes reported by sentry

### 1.4.7 (2020-04-23)
* fix iot crash when timeouts in communications to Google happens (Sentry IOBROKER-IOT-2)
* fix iot crash when google answers without customData (Sentry IOBROKER-IOT-1)

### 1.4.6 (2020-04-18)
* (Apollon77) Add Sentry error reporting to React Frontend

### 1.4.4 (2020-04-14)
* (Apollon77) remove js-controller 3.0 warnings and replace adapter.objects access
* (Apollon77) add linux dependencies for canvas library
* (Apollon77) add sentry configuration

### 1.4.2 (2020-04-08)
* (TA2k) Fix updateState for Google Home

### 1.4.1 (2020-04-04)
* (bluefox) The blood glucose request supported now

### 1.3.4 (2020-02-26)
* (TA2k) Fixed deconz issues in Google Home

### 1.3.3 (2020-02-12)
* (Apollon77) fix alisa error with invalid smartName attributes

### 1.3.2 (2020-02-10)
* (Apollon77) usage with all kinds of admin ports and reverse proxies optimized

### 1.3.1 (2020-02-09)
* (Apollon77) Dependency updates
* (APollon77) Make compatible with Admin > 4.0 because of updated socket.io

### 1.2.1 (2020-01-18)
* (bluefox) Fixed problem if the port of admin is not 8081

### 1.2.0 (2020-01-04)
* (TA2k) Google Home handling and visualization improved.

### 1.1.10 (2020-01-03)
* (bluefox) Now is allowed to selected the temperature values as alexa states
* (bluefox) Allowed to set type immediately after insertion of new state

### 1.1.9 (2019-11-27)
* (bluefox) Fixed: sometimes the configuration could not be loaded

### 1.1.8 (2019-09-12)
* (bluefox) Optimization of googe home communication was done

### 1.1.7 (2019-09-11)
* (bluefox) The sending rate to google home is limited now

### 1.1.6 (2019-09-11)
* (TA2k) Room fix for Google Home and LinkedDevices

### 1.1.4 (2019-09-10)
* (bluefox) decreased keepalive value to fix issue with disconnect

### 1.1.3 (2019-09-09)
* (TA2k) Google Home problem fixed with LinkedDevices

### 1.1.0 (2019-09-06)
* (bluefox) Added support of aliases

### 1.0.8 (2019-09-03)
* (TA2k) Improved support for Google Home
* (TA2k) Added auto detection for RGB, RGBSingle, Hue, CT, MediaDevice, Switch, Info, Socket, Light, Dimmer, Thermostat, WindowTilt, Blinds, Slider
* (TA2k) Added support for manualy adding states as devices
* (TA2k) Fix update state after Sync
* (TA2k) Added typical Google Home devices and traits/actions
* (TA2k) Fix only process update message when Alexa is checked in the options

### 1.0.4 (2019-08-01)
* (bluefox) Fixed password encoding. Please enter password anew!

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

Copyright (c) 2018-2020 bluefox <dogafox@gmail.com>

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