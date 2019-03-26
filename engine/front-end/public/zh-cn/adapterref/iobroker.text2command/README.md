---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.text2command/edit/master//README.md
title: Text to command
hash: v/62tWbiUamGI5neCCj9swtQFEsHpzk2pjuNLKp2nZM=
adapter: true
license: MIT
authors: bluefox <dogafox@gmail.com>
description: This adapter allows to convert text to commands
keywords: text, commands
readme: https://github.com/ioBroker/ioBroker.text2command/blob/master/README.md
mode: daemon
materialize: false
compact: true
published: 2016-02-09T22:46:16.344Z
version: 1.2.5
BADGE-安装数量: http://iobroker.live/badges/text2command-stable.svg
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.text2command.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.text2command.svg
BADGE-测试: https://travis-ci.org/ioBroker/ioBroker.text2command.svg?branch=master
BADGE-NPM: https://nodei.co/npm/iobroker.text2command.png?downloads=true
---
![商标](zh-cn/adapterref/iobroker.text2command/../../../en/adapterref/iobroker.text2command/admin/text2command.png)


#text2command =================
##说明
这个适配器可以转换普通的句子，比如*''在厨房开关灯'*'到特定命令，并将状态*'adapter.0.device.kitchenLight'*设置为** true **。

这个适配器无法独立激活。它应该与其他适配器一起使用，如电报或Android app **iobroker.vis**

##用法
要执行命令，请使用句子写入状态** text2command。<INSTANCE> .text **。您将始终在** text2命令中获得答案。<INSTANCE> .response **。

如果您定义** Answer to ID **，答案也会写在此ID中。这需要例如实现语音承认。

您可以通过javascript的消息框发送消息。答案将在消息中回复：

```
sendTo('text2command', 'Switch light in kitchen on', function (err, response) {
    console.log('Response is: ' + response);
});
```

可以使用正则表达式，例如：```/^light\son|^lamp\son/```。正则表达式始终不区分大小写。

要使用“按功能打开/关闭”，您应该关注功能。

关键字的工作如下：

 - 关键字按空格划分
 - 所有关键字必须出现在句子中以触发规则：例如关键字：```light on```将触发```开关灯亮```，```灯亮到处````并且不要触发'``开启```，```做光```。
 - 一个关键字可以有多种形式。关键字的变体必须除以“/”。例如。关键字：`````switch / make / do light on / true```将触发：```do light true```，```make please on on```。
 - 如果关键字可以出现在很多情况下（nom，gen，accusative，plural，......），它们都必须列为变体，例如：```switch light / lights on```。

以下功能将被解释为

enum.functions：

** enum.functions.light **（Licht |Свет）：

 - 角色 -  level.dimmer
 - 角色 -  switch.light

** enum.functions.backlight **（Beleuchtung |Подсветка）：

 - 角色 -  level.backlight
 - 角色 - 开关。背光

** enum.functions.blinds / shutter **（Rolladen |Жалюзи/окна）

 - 角色 -  level.blind
 - 角色 -  switch.blind

** enum.functions.curtain **（Vorhänge|Шторы）

 - 角色 - 等级
 - 角色 -  switch.curtain

** enum.functions.heating **（Heizung |Отопление/Подогрев）

 - 角色 -  level.temperature
 - 角色 -  switch.temperature

** enum.functions.music **（Musik |Музыка）

 - 角色 -  button.play
 - 角色 -  button.stop / button.pause

** enum.functions.alarm / security **（Alarmanlage / Alarm |Охрана）

 - 角色 -  switch.security

** enum.functions.lock **（Schloß/ Schloss |Замок）

 - 角色 -  switch.open
 - 角色 -  switch.lock

支持以下客房：

|关键词短语|可能的英语enum.rooms |在德国|俄语|
|-----------------------|---------------------------------|--------------------------|------------------------|
|到处都是到处都是 -  | -  |
|生活|客厅| wohnzimmer | зал|
|卧室|卧室/卧室| schlafzimmer | спальня|
|洗澡|浴室/浴室| badezimmer /坏| ванная|
|工作/办公室|办公室| arbeitszimmer | кабинет|
|孩子/儿童/托儿所|托儿所| kinderzimmer | детская|
| guets wc / guest closet | guestwc | gästewc| гостевойтуалет|
| wc / closet | wc | wc | туалет|
|楼层/进入|地板| diele / gang / flur | коридор/прихожая|
|厨房|厨房| küche/ kueche | кухня|
|阳台/露台/露台|露台| balkon / terrasse | терасса/балкон|
|用餐| dinningroom | esszimmer | столовая|
|车库|车库|车库| гараж|
|楼梯|楼梯| trepe / treppenhaus | лестница|
|花园|花园|加藤| сад|
|法院/院子|法庭| hof | двор|
|客房|客房| gästezimmer| гостевая|
|阁楼|阁楼| speicher | кладовка|
|屋顶|屋顶| dachstuhl | крыша|
|终端|终端| anschlussraum | сени|
|洗手间|洗手间| waschraum | прачечная|
|加热室| heatroom |加热室/ heizungsraum | котельная|
|小屋|小屋| schuppen / scheune | сарай|
|避暑别墅| summerhouse | gartenhaus | теплица|

您可以在确认中使用模式：

 - ％s：值
 - ％u：单位
 - ％n：名字（计划好了！）
 -  {objectId}：此objectID的状态将放在此处

支持以下命令：

＃＃＃ 现在是几奌？
答案：14：56（当前时间）

＃＃＃ 你叫什么名字？
答案是可定制的。默认值：```My name is Alpha```

###室外温度是多少？
用户必须指定状态ID，在何处读取外部温度。
答案是可定制的。默认值：```Outside temperature is %s %u```**％s **将被温度替换，四舍五入为整数。 **％u **将被此状态的单位或系统温度单位替换。

###什么是内部温度？
用户必须指定状态ID，在哪里读取内部温度。
答案是可定制的。默认值：```Inside temperature is %s %u```**％s **将被温度替换，四舍五入为整数。 **％u **将被此状态的单位或系统温度单位替换。

###按功能打开/关闭
此命令从枚举中读取信息。它使用** enum.functions **来查找设备类型（例如灯光，闹钟，音乐）和** enum.rooms **来检测房间名称。

德语示例：![枚举](zh-cn/adapterref/iobroker.text2command/../../../en/adapterref/iobroker.text2command/img/enums.png)

关键词是打开：*打开*，例如```switch rear light in bath on```

关闭的关键词是：*关闭*，例如```switch light in living room off```

如果需要，将自动生成答案：```Switch off %function% in %room%```，其中％function％和％room％将被找到的设备类型和位置替换。

命令也接受数值。它具有优先权，例如在命令```switch light off in living room on 15%```中，灯将设置为15％而不是* off *状态。

您可以在[]中定义默认房间。 E.g```switch the light on[sleepingroom]```

###打开/关闭百叶窗
此命令从枚举中读取信息。它使用** enum.functions.blind **来查找类型百叶窗或快门和** enum.rooms **来检测房间名称。

移动百叶窗的关键词是：*盲目*，例如```set blinds up in sleeping room```

将百叶窗向下移动的关键词是：*向下遮挡*，例如```move blinds down in office```

您可以以百分比的形式指定盲目的确切位置，例如```move blinds to 40 percent in office```

如果需要，将自动生成答案：``` in %room%```，其中％room％将被找到的设备类型和位置替换。

###打开/关闭一些东西
用户必须指定必须被控制的设备的状态ID和必须写入的值。

您应该为每个位置创建规则（例如，* on *和for * off *）。

答案是可定制的。默认值：```Switched on```

例如。：

 - ```Deactivate alarm```，对象ID：```hm-rpc.0.alarm```，值：```false```，答案：```闹钟停用/取消激活``` 。在这种情况下，答案将在*警报已停用*和*已停用*之间随机化。
 - ```激活闹钟```，对象ID：```hm-rpc.0.alarm```，值：```true```，答案：```闹钟激活/激活/完成``。在这种情况下，答案将在*警报激活*，*激活*和*完成*之间随机化。

*取消激活*必须是列表中的第一个，因为它更长。

您可以在控制命令中使用浮点值。如果文本中有一些数值，它将用作控制值，并且将忽略预定义的值。

例如。规则的规则：

 - ```设置灯光级别```，对象ID：````hm-rpc.0.light.STATE```，值：```10```，答案：```级别设置为％s ％```。

如果命令类似于```Set light level to 50%```，那么进入```hm-rpc.0.light.STATE```将写成50并且答案将是```Level set to 50%```。

如果命令类似于```Set light level```，那么进入```hm-rpc.0.light.STATE```将写入10并且答案将是```Level set to 10%```。

###询问一些事情
用户必须指定设备的状态ID，将读取哪个值。
该模板将回答来自某个州的信息。

例如。：

 - ```windows opened```，对象ID：```javascript.0.countOpenedWindows```，Acknowledge：```实际％s windows打开```
 - ```温度睡房```，对象ID：```hm-rpc.0.sleepingRoomSensor.TEMPERATURE```，Acknowledge：```卧室的实际温度是％s％u /％s％u ```。在这种情况下，答案将在*睡眠室的实际温度为％s％u *和*％s％u *之间随机化。

###发送文本到州
你可以写一些文字到州。用户必须指定状态ID才能将文本写入其中。

例如。规则：```email [to] wife```，对象ID：```javascript.0.emailToWife```，Acknowledge：```Email sent```文字：*发送电子邮件给我的妻子：我会迟到*。适配器从关键字（在这种情况下是* wife *中查找最后一个单词，从下一个单词中提取文本（在这种情况下*我将会迟到*）并将此文本写入* javascript.0.emailToWife* Word *to* 是触发规则所必需的，但会从文本中删除。

###你很好（只为了好玩）
答案是可定制的。默认值：```Thank you```或```You are welcome```

###谢谢（只为了好玩）
答案是可定制的。默认值：```No problem```或```You are welcome```

###创建答案
您可以在确认中使用绑定{objectId}生成答案。用于alexa。

例如。：

 - ```windows opened```，Acknowledge：````实际{javascript.0.countOpenedWindows} windows打开```
 - ```温度睡房```，Acknowledge：```卧室的实际温度是{t：hm-rpc.0.sleepingRoomSensor.TEMPERATURE; Math.round（T）} / {HM-rpc.0.sleepingRoomSensor.TEMPERATURE; round（1）} degree```。在这种情况下，答案将在*睡房中的实际温度<VALUE> *和* <VALUE> *之间随机化。

你可以在这里阅读更多关于绑定的内容:(对象的绑定）[https://github.com/ioBroker/ioBroker.vis#bindings-of-objects]

另外你可以通过{hm-rpc.0.light.STATE.lc; dateinterval}（2分12秒）或{hm-rpc.light.STATE.lc; dateinterval（true）}来获得时间： 2分12秒**前**）

##使用javascript的外部规则
有可能使用javascript引擎来处理text2command中的命令。
为此，您必须在“处理器状态ID”（高级设置）中指定一些状态，并在某些JS或Blockly脚本中侦听此状态。
您可以在管理员或脚本中手动创建一些状态。处理脚本可能如下所示：

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

在text2command **处理器状态ID **的设置中设置为* javascript.0.textProcessor *以使此示例有效。

首先，命令将使用您的javascript进行处理，如果javascript将在预定义的时间（默认为1秒）内回答''或未回答，则命令将由规则处理。

＃ 去做
 - 俄罗斯男性和女性的答案。

##安装
```iobroker add text2command```

## Changelog
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

Copyright (c) 2014-2018, bluefox<dogafox@gmail.com>

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