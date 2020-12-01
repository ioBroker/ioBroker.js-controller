---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.text2command/README.md
title: ioBroker.text2命令
hash: EJKyI8ZO0IeFIyxLvHk2Zt/zsWCaU+vR7TAxE2A0oaI=
---
![商标](../../../en/adapterref/iobroker.text2command/admin/text2command.png)

![安装数量](http://iobroker.live/badges/text2command-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.text2command.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.text2command.svg)
![测验](https://travis-ci.org/ioBroker/ioBroker.text2command.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.text2command.png?downloads=true)

＃ioBroker.text2command
##说明
此适配器可以将普通句子转换，例如*'打开厨房的灯'*到特定命令，并将状态*'adapter.0.device.kitchenLight'*设置为** true **。

单独激活该适配器没有意义。它应与其他适配器一起使用，例如电报或Android应用程序** iobroker.vis **。

##用法
要执行命令，请在语句中写入状态** text2command。<INSTANCE> .text **。您将始终在** text2command。<INSTANCE> .response **中获得答案。

如果您定义“对ID的答案”，答案也将写在该ID中。这对于例如实现语音确认。

您可以通过javascript中的`sendTo`发送消息。答案将在消息中返回：

```
sendTo('text2command', 'Switch light in kitchen on', function (err, response) {
    console.log('Response is: ' + response);
});
```

可以使用正则表达式，例如：```/^light\son|^lamp\son/```。正则表达式始终不区分大小写。

要使用“按功能打开/关闭”，您应该注意功能。

关键字的工作方式如下：

-关键字按空格划分
-所有关键字必须出现在句子中才能触发规则：例如关键字：“开灯”将在“开灯”上触发，“在所有地方开灯”而不会在“开灯”上触发，点亮''
-一个关键字可以有多种形式。关键字的变体必须除以“ /”。例如。关键字：“ switch / make / do light on / true”将触发：`“ do light true”，“ make please light on”。
-如果关键字在很多情况下都可以出现（名词，词根，宾格，复数等），则它们都必须以变体形式列出，例如：```lighting / lights on''`。

以下功能将被解释为

枚举函数：

** enum.functions.light **（Licht |Свет）：

-角色-level.dimmer
-角色-switch.light

**枚举。功能。背光**（Beleuchtung |Подсветка）：

-角色-level.backlight
-角色-switch.backlight

**函数功能。百叶窗/百叶窗**（Rolladen | |алюзи/окна）

-角色-level.blind
-角色-switch.blind

**枚举。功能。窗帘**（Vorhänge|Шторы）

-角色-level.curtain
-角色-switch.curtain

**枚举函数加热**（Heizung |Отопление/Подогрев）

-角色-水平温度
-角色-开关温度

** enum.functions.music **（Musik |Музыка）

-角色-button.play
-角色-button.stop / button.pause

**枚举功能，警报/安全**（警报/警报|Охрана）

-角色-switch.security

** enum.functions.lock **（Schloß/ Schloss |Замок）

-角色-switch.open
-角色-switch.lock

支持以下房间：

|短语中的关键字|英语中可能的enum.rooms |德语|俄语|
|-----------------------|---------------------------------|--------------------------|------------------------|
|无处不在无处不在-| -|
|生活|客厅| wohnzimmer | зал|
|卧室|卧室/卧室| schlafzimmer | спальня|
|浴|浴室/浴室| badezimmer /坏| ванная|
|工作/办公室|办公室arbeitszimmer | кабинет|
|儿童/儿童/托儿所|苗圃| kinderzimmer | детская|
|贵宾室/贵宾室| guestwc | gästewc| гостевойтуалет|
|厕所/壁橱| wc | wc | туалет|
|地板/进入|地板|死/帮派/暴动| коридор/прихожая|
|厨房|厨房| küche/ kueche | кухня|
|阳台/露台/露台|露台| balkon / terrasse | терасса/балкон|
|餐饮|饭厅| esszimmer | столовая|
|车库|车库|车库| гараж|
|楼梯|楼梯| trepe / treppenhaus | лестница|
|花园花园花园сад|
|法院/院子|法院霍夫двор|
|客房客房gästezimmer| гостевая|
|阁楼|阁楼|喷雾器| кладовка|
|屋顶屋顶dachstuhl | крыша|
|终端|终端|鹅掌| | сени|
|洗手间|洗手间| waschraum | прачечная|
|加热室|加热室|暖气室/ heizungsraum | котельная|
|小屋小屋schuppen / scheune | сарай|
|避暑别墅|凉亭| gartenhaus | теплица|

您可以在确认中使用模式：

-％s：值
-％u：单位
-％n：名称（已计划！）
-{objectId}：此objectID的状态将放置在此处

支持以下命令：

＃＃＃ 现在是几奌？
答：14：56（当前时间）

＃＃＃ 请问你贵姓大名？
答案是可定制的。默认值：```My name is Alpha```

###室外温度是多少？
用户必须指定状态ID，以读取外部温度。
答案是可定制的。默认值：```Outside temperature is %s %u```**％s **将替换为温度，四舍五入为整数。 **％u **将被此状态的单位或系统温度单位替换。

###内部温度是多少？
用户必须指定状态ID，以读取内部温度。
答案是可定制的。默认值：```Inside temperature is %s %u```**％s **将替换为温度，四舍五入为整数。 **％u **将被此状态的单位或系统温度单位替换。

###按功能打开/关闭
该命令从枚举中读取信息。它使用“枚举功能”查找设备类型（例如灯光，警报，音乐），并使用“枚举室”检测房间名称。

德语示例：![枚举](../../../en/adapterref/iobroker.text2command/img/enums.png)

要打开的关键字是：*打开*，例如```switch rear light in bath on```

要关闭的关键字是：*关闭*，例如```switch light in living room off```

如果需要，答案将自动生成：```Switch off %function% in %room%```，其中％function％和％room％将由找到的设备类型和位置替换。

命令也接受数值。它具有优先级，例如在§§JJJJJ_0_0§§命令中，灯光将设置为15％，并且不处于* off *状态。

您可以在[]中定义默认房间。例如```switch the light on[sleepingroom]```

###打开/关闭百叶窗
该命令从枚举中读取信息。它使用** enum.functions.blind **查找百叶窗或百叶窗类型，并使用** enum.rooms **检测房间名称。

向上移动百叶窗的关键词是：*向上盲目*，例如```set blinds up in sleeping room```

向下移动百叶窗的关键词是：*向下百叶窗*，例如```move blinds down in office```

您可以指定百分数的确切位置，例如```move blinds to 40 percent in office```

如果需要，将自动生成答案：``` in %room%```，其中％room％将替换为找到的设备类型和位置。

###开启/关闭某些功能
用户必须指定设备的状态ID（必须控制）和值（必须写入）。

您应该为每个位置创建规则（例如* on *和* off *）。

答案是可定制的。默认值：```Switched on```

例如。：

-```停用警报```，对象ID：```hm-rpc.0.alarm```，值：```false''`，答案：```警报已停用/停用'' 。在这种情况下，答案将在“警报已停用”和“警报已停用”之间随机分配。
-```激活警报```，对象ID：```hm-rpc.0.alarm```，值：```true''`，答案：```警报已激活/激活/完成` ``。在这种情况下，答案将在“警报已激活”，“已激活”和“完成”之间随机分配。

*停用*必须在列表中的第一位，因为它更长。

您可以在控制命令中使用浮点值。如果文本中有一些数字值，它将用作控制值，而预定义值将被忽略。

例如。对于规则：

-```Set light level''，对象ID：```hm-rpc.0.light.STATE`''，Value：```10''`，Answer：```Level设置为％s ％```。

如果命令类似于```Set light level to 50%```§，则在§§JJJJJ_1_1§§中将写入50，答案将为§§JJJJJ_2_2§§。

如果命令类似于```Set light level```§，则将在```hm-rpc.0.light.STATE```中写入10，答案将为```Level set to 10%```。

###询问一些事情
用户必须指定设备的状态ID，该值将被读取。
该模板将回答某些状态的信息。

例如。：

-Windows打开，对象ID：javascript.0.countOpenedWindows，确认：％s Windows实际打开
-```温度卧室''，对象ID：```hm-rpc.0.sleepingRoomSensor.TEMPERATURE''，确认：```卧室的实际温度为％s％u /％s％u ```。在这种情况下，答案将随机分布在*卧室的实际温度为％s％u *和*％s％u *之间。

###发送文字至状态
您可以将一些文本写入状态。用户必须指定状态ID才能在其中写入文本。

例如。规则：```email [to] wife```，对象ID：```javascript.0.emailToWife```，确认：```Email sent```文本：*发送电子邮件给我的妻子：我会迟到*。适配器从关键字（在本例中为* wife *）中查找最后一个单词，从下一个词中提取文本（在本例中为*我会迟到*），然后将此文本写入* javascript.0.emailToWife *。
单词* to *不需要触发规则，但是将从文本中删除。

###你很好（只是为了好玩）
答案是可定制的。默认值：```Thank you```或```You are welcome```§

###谢谢（很有趣）
答案是可定制的。默认值：```No problem```或```You are welcome```§

###创建答案
您可以在确认中使用绑定{objectId}生成答案。用于alexa。

例如。：

-打开窗口，确认：实际打开的{javascript.0.countOpenedWindows}窗口已打开。
-```temperature sleep room`''，Acknowledge：```卧室的实际温度为{t：hm-rpc.0.sleepingRoomSensor.TEMPERATURE; Math.round（t）} / {hm-rpc.0.sleepingRoomSensor.TEMPERATURE; round（1）}度在这种情况下，答案将随机分布在*卧室的实际温度为<VALUE> *和* <VALUE> *之间。

您可以在此处阅读有关绑定的更多信息：（对象的绑定）[https://github.com/ioBroker/ioBroker.vis#bindings-of-objects]

另外，您还可以通过{hm-rpc.0.light.STATE.lc; dateinterval}（每12分钟2分钟）或{hm-rpc.0.light.STATE.lc; dateinterval（true）}来获取到现在的时间（ 2分12秒**前**）

##使用javascript的外部规则
有可能使用javascript引擎来处理text2command中的命令。
为此，您必须在“处理器状态ID”（高级设置）中指定一些状态，并在某些JS或Blockly脚本中侦听此状态。
您可以在admin或脚本中手动创建一些状态。处理脚本如下所示：

```
createState("textProcessor", '', function () {
    // text2command writes the value with ack=false. Change "any" is important too, to process repeated commands.
    on({id: "javascript.0.textProcessor", ack: false, change: 'any'}, function (obj) {
         var task = JSON.parse(obj.state.val);
         // value looks like
         // {
         //     "command":      "text to process", // command that was received by text2command
         //     "language":     "en",              // language in command or system language
         //     "withLanguage": false              // indicator if language was defined in command (true) or used default language (false)
         // }
         // response to text2command with ack=true
         if (task.command === 'switch light on') {
            setState("hm-rpc.0.light", true);
            setState("javascript.0.textProcessor", 'light is on', true);
         } else {
            // let it process with predefined rules
            setState("javascript.0.textProcessor", '', true);
         }
    });
});
```

在text2command **Processor state ID** 设置中将其设置为* javascript.0.textProcessor *，以使此示例正常工作。

首先，将使用您的javascript处理该命令，如果javascript在预定义的时间内（默认为1秒）以''或不回答，则该命令将由规则处理。

###选项：通过每个命令写入响应
如果每个命令都激活了该命令（无论请求是通过状态发送还是通过sendTo发出），则`text2command.X.response`都会带有答案。

＃ 去做
-俄罗斯男性和女性答案。

<！-下一个版本的占位符（在该行的开头）：

### __正在进行的工程__->

## Changelog

### __WORK IN PROGRESS__
* (Apollon77) Prevent crash case (Sentry IOBROKER-TEXT2COMMAND-D, IOBROKER-TEXT2COMMAND-C)

### 2.0.5 (2020-09-5)
* (bluefox) Updated the select ID dialog.

### 2.0.3 (2020-07-14)
* (bluefox) Fixed GUI errors

### 2.0.2 (2020-07-13)
* (bluefox) Fixed GUI errors

### 2.0.1 (2020-07-08)
* (bluefox) Fixed select ID dialog

### 2.0.0 (2020-07-06)
* (bluefox) New GUI

### 1.3.1 (2019-07-18)
* (unltdnetworx) changed copyright year to 2019, according to issue #41
* (unltdnetworx) additional words for blinds and functions in english and german
* (unltdnetworx) fixed typo

### 1.3.0 (2019-07-18)
* (bluefox) Using the defined language by words

### 1.2.5 (2019-02-12)
* (unltdnetworx) description in german corrected
* (unltdnetworx) added percent to true/false rules

### 1.2.4 (2018-05-05)
* (Apollon77) Fix

### 1.2.3 (2018-05-01)
* (bluefox) Support of bindings in answer {objId}

### 1.2.0 (2018-04-23)
* (bluefox) Support of Admin3 (but not materialize style)

### 1.1.7 (2018-04-04)
* (bluefox) The parsing error was fixed

### 1.1.6 (2017-10-05)
* (bluefox) Check if units are undefined

### 1.1.5 (2017-08-14)
* (bluefox) Support of iobroker.pro

### 1.1.4 (2017-03-27)
* (bluefox) translations

### 1.1.3 (2016-08-30)
* (bluefox) russian translations

### 1.1.2 (2016-08-29)
* (bluefox) fix the russian temperature text
* (bluefox) extend rule "control device" with option 0/1
* (bluefox) use by control of devices min/max values if set

### 1.1.1 (2016-08-19)
* (bluefox) add additional info for external text processor

### 1.1.0 (2016-08-16)
* (bluefox) add text processor state ID

### 1.0.2 (2016-07-22)
* (bluefox) fix error with detection of numeric values

### 1.0.1 (2016-06-01)
* (bluefox) fix: send text command

### 1.0.0 (2016-05-05)
* (bluefox) replace special chars in input text: #'"$&/\!?.,;:(){}^

### 0.1.10 (2016-03-20)
* (bluefox) fix double pronunciation of some answers

### 0.1.9 (2016-03-20)
* (bluefox) ignore spaces

### 0.1.8 (2016-03-15)
* (bluefox) fix error with enums

### 0.1.7 (2016-03-12)
* (bluefox) implement "say something"

### 0.1.6 (2016-02-24)
* (bluefox) fix temperature

### 0.1.5 (2016-02-23)
* (bluefox) fix russian outputs

### 0.1.4 (2016-02-22)
* (bluefox) fix russian outputs

### 0.1.3 (2016-02-21)

* (bluefox) round temperature in answers

### 0.1.2 (2016-02-21)
* (bluefox) implement russian time

### 0.1.1 (2016-02-19)
* (bluefox) check invalid commands

### 0.1.0 (2016-02-19)
* (bluefox) fix problem with controlling of channels
* (bluefox) enable write JSON as argument

### 0.0.3 (2016-02-14)
* (bluefox) remove unused files

### 0.0.2 (2016-02-10)
* (bluefox) extend readme

### 0.0.1 (2016-02-09)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2014-2020, bluefox <dogafox@gmail.com>

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