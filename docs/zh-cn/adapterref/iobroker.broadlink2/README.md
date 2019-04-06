---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.broadlink2/README.md
title: ！[Logo]（./ admin / broadlink2.png）控制BroadLink兼容设备
hash: WTYq/WXAyxAsoH6tiIsBCs4yCcfe2WO0lK+6ud+WRQg=
---
![NPM版本](http://img.shields.io/npm/v/iobroker.broadlink2.svg)
![安装](http://iobroker.live/badges/broadlink2-installed.svg)
![下载](https://img.shields.io/npm/dm/iobroker.broadlink2.svg)
![特拉维斯-CI](http://img.shields.io/travis/frankjoke/ioBroker.broadlink2/master.svg)

＃![商标](../../../en/adapterref/iobroker.broadlink2/./admin/broadlink2.png)控制BroadLink兼容设备
[德语手册 -  Deutsche Anleitung](README_DE.md)

##适用于不同Broadlink兼容的WLan设备（RM ++，SP ++，A1，Floureon，S1C）
这是适用于多个Broadlink交换机的ioBroker适配器，如RM2，RM3，RM Plus，SP1，SP2，SP3，Honeywell SP2，SPMini，SPMini2，SPMiniPlus以及来自它们的一些OEM产品。
还支持遥控器，如RM2，RM Mini，RM Pro Phicomm，RM2 Home Plus，RM2 Home Plus GDT，RM2 Pro Plus，RM2 Pro Plus2和RM2 Pro Plus BL。多个控制器将生成自己的条目，需要单独进行培训。
它扫描网络以查找兼容设备并安装它们（目前只有交换机类型SP？）。

如果你学习了RM *的状态，然后重命名他们的名字，那么状态ID也会改为新名字！

如果你使用'code'+你的代码作为值（在代码之前使用'CODE_'或甚至更好（因为如果你重命名状态它将会保留）添加字段'代码，你也可以在LearnedStates中创建自己的新命令'使用admin.object铅笔生成本机并将十六进制代码放在那里（没有'CODE_'！）。

适配器具有固定状态以从RM设备发送代码或了解它们它还可以发送单个场景（多个设备上的操作）。

如果再次找不到在某个IP上配置的设备，则会标记为“notReachable”！如果它们再次连接，它们将正常使用。

如果设备连续5分钟未应答，则设置为无法访问。 ***notReachable*** 设备将每x次扫描发出一条日志警告消息。经过一些扫描后，适配器将尝试在之前的同一个mac地址上再次找到它们。

请从admin.objects中删除旧设备，以防您永久删除它们或在路由器中重命名它们！

＃＃＃ 注意
无法轮询SP1设备。

##配置
*在配置中输入网络地址的前缀，生成设备名称时应将其删除
*输入民意调查之间的秒数。在每次轮询时，将询问所有指向SP1的SP *设备的开关状态。可以通过将轮询延迟设置为0来禁用此功能。在某些具有温度读数的RM设备上，温度也将更新。

##如何学习代码
*在ioBroker的对象中，您可以找到“broadlink2。[devicename] .Learn或LearnRF for”+“类型的设备”。
*对于RM（x）+（Plus）设备，您还可以获得一个特殊的RS-sweep-lear按钮，它可以学习比正常433MHz更多的设备。
*将此对象设置为true。 （您可以单击对象视图中的按钮）
*现在在30秒内按遥控器上的某个按钮。在正常模式下，他们很快会按下它们，直到学会了。
*在射频扫描中学习你需要先按下按钮约10秒钟，然后释放它然后按下它会短时间。
*一个新的对象现在应该出现在对象“broadlink。[n]。[devicename] .LearnedState”中，名称为“>>>重命名学习@YYYYMMDDTHHmmSS”
*您可以单击对象视图中的按钮发送代码。
*要重命名项目，请单击名称（以`_Rename_learned_`开头）并更改名称。它不应该包括`，`，`.`或`;`以及其他一些字符，它们将被'_'替换;

也可以使用[RM-桥](http://rm-bridge.fun2code.de/)中的代码。
只需创建一个对象（状态，类型按钮），其值为“CODE_”或本地条目`code`，不带任何“CODE_”。

##使用场景
*场景可以包含ID或名称以及由`，`分隔的数字。通常，ID将以100ms的时差执行/发送，但如果您需要更长的暂停，则可以写入反映毫秒等待的数字。例如`SP：dose = 1,1000，RM：your.L.StereoEin，1000，RM：your.L.TVEin`将打开名为'SP：dose'的无线插头，然后等待一秒钟（实际上是1.1秒） ），打开stero，然后再打开电视。你也可以切换其他适配器的设备，比如`hm-rpc.0.MEQ1435726.1.STATE = true`会打开这个Homematic设备！ Boolsche状态可以用'= 1 / = on / = true / = ein'切换，如果你不使用`=`而不是使用true。要关闭设备，请使用'= 0 / = false / = aus / = off'结束设备，这是必须关闭的！

##使用状态
*您可以为您的设备创建状态，它将On和Off命令组合到一个可以像任何其他设备一样切换的状态。
*您需要在单独的列中列出用于打开和关闭状态的命令，这些命令可以是多个，因此状态知道您的设备何时被其中任何一个打开/关闭
*如果您将状态设置为打开或关闭，则将发送第一个开/关命令
*如果仅存在命令，则交换机将在数字值-1上发送相应的命令，意味着如果收到“0”则发送第一个命令，如果收到“1”，则发送第二个命令。通过这种方式，您可以在一个状态内模拟多个状态。
*如果仅使用'+'作为关闭命令，则需要提供10个用'，'分隔的命令，它们反映遥控器上的数字“0-9”。你可以发送sstate然后一个数字，比如`123`（最大值是9999），它会发送`1`，`2`和`3`，它们之间有1/3秒的延迟！通过这种方式，如果状态名称为TVchannel，您可以通过只写“TVchannel = 33”将电视频道设置为“33”。

##使用发送消息到适配器
适配器也理解'sendTo'命令。

*`debug`：`sendTo（'broadlink2.0'，'debug'，'on'）`（也是0,1，on，off，ein，aus，true，false）将打开调试模式。
*`get`：`sendTo（'broadlink2.0'，'get'，'RM2：RMPROPLUS.Temperature'`可以从设备请求数据，如`{val：29.9，确认：真，ts：1505839335870，q：0，来自：'system.adapter.broadlink2.0'，lc：1505839335870}`zurück
*`switch`：可以打开或关闭插头：`sendTo（'broadlink2.0'，'switch'，'SP：你的设备id = on'）`
*`switch_on` /`switch_off`：sendTo（'broadlink2.0'，'switch_on'，'SP：你的设备ID'）`
*`send`：`sendTo（'broadlink2.0'，'send'，'RM：yourdev._Learn'）`将开始学习和`sendTo（'broadlink2.0'，'send'，'RM：yourdev.L .yourid'）`会发送代码。
*`send_scene`：`sendTo（'broadlink2.0'，'send_scene'，'scene xxx'）`würdedenals message angegebenen Text alsSzeneausführen
*`send_code`：`sendTo（'broadlink2.0'，'send_code'，'RM：your remote.CODE_xxxxx'）`würdedenCODE_xxxx vom R：你的名字森。

## Floureon或Beok313恒温器
*可以设置大多数数据，可以通过向`_setTime`写入任何内容来设置时间，在这种情况下，设备的时间将设置为ioBroker系统时间。这也将在adpter start上自动完成。

##配置其他新设备
*您可以添加使用相同协议的新设备，方法是添加设备ID（十六进制或十进制）和设备类（在那里使用）（类= A1，MP1，RM，RMP，S1C，SP1，SP2，SP3P， T1）。因此，你可以添加一个新的遥控器，适配器只能将其作为未知设备找到，其中十六进制ID为0x1234到RM列表中的0x01234 = RMP。

##重命名设备
*设备通常接收其网络主机名，或设备类型，ID和mac地址的组合作为其名称，前两个字母前面带有“：”。您可以使用`T1：BroadLink-OEM-T1-fa-83-7c = Beok313`重命名此类设备，在这种情况下，将不使用原始名称，但使用的新名称将为“Beok313”。

＃＃ 调试模式
*如果你在添加的新设备列表的末尾添加一个`！`（即使它是空的）你可以将适配器设置为调试模式，它会记录很多其他信息，即使它没有设置为'管理员中的信息模式。

＃＃ 已知的问题
*如果您多次学习相同的信号，则代码可能每次都不同。这不能改变。
*有时如果他们不回复搜索，则找不到设备。执行重新扫描或重新启动适配器以重新启动新实例。

##重要/ Wichtig
*需要节点> = V6

##安装
与ioBroker管理员，npm安装iobroker.broadlink2或从<https://github.com/frankjoke/ioBroker.broadlink2>

## Changelog

### 2.0.0
* Can handle Floureon/Beko thermostats (now with MQTT)
* Can handle S1C security devices
* Names device after their name or with their mac to reduce possibility of renaming
* Can rename devices
* Can add device Id's/Types for new devices
* New communication routines to find & re-find devices
* New communication protocoll with devices which do not allow that devices can get commands from 2 sources intermixed


### 1.9.1

* added anothe RM Mini code

### 1.8.1

* Changed util.js and tests and added new devices

### 1.7.0

* Changed and corrected states which are created by A1-devices

### Todo for later revisions

* config of devices and codes in separate config tool

## License

The MIT License (MIT)

<<<<<<< HEAD
Copyright (c) 2014-2019, frankjoke <frankjoke@hotmail.com>
=======
Copyright (c) 2014-2019 Frank Joke <frankjoke@hotmail.com>
>>>>>>> 7aa61304cbc5059e752952ce3a494629cd151962

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