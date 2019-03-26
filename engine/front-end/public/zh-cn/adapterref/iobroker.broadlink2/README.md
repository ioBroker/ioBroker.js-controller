---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/frankjoke/ioBroker.broadlink2/edit/master//README.md
title: Broadlink2 (RM++, SP++, A1) for multiple Broadlink-protocol W-Lan devices
hash: ojXJVWaPDij5W3jYFX3qBu8GsySY/rPG3ElGnBuLIqE=
adapter: true
license: MIT
authors: Frank Joke <frankjoke@hotmail.com>
description: Broadlink2 Adapter for multiple BroadLink wireless devices (RM++, SP++, A1)
keywords: Broadlink, W-Lan, IR/RF, Remote, Switch, A1, RM2, RM3, SP1, SP2
readme: https://github.com/frankjoke/ioBroker.broadlink2/blob/master/README.md
mode: daemon
materialize: true
compact: false
published: 2017-07-27T12:44:47.864Z
version: 1.9.1
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.broadlink2.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.broadlink2.svg
BADGE-Travis-CI构建状态: https://travis-ci.org/frankjoke/ioBroker.broadlink2.svg?branch=master
BADGE-AppVeyor构建状态: https://ci.appveyor.com/api/projects/status/d2wwp0f02t512wp8?svg=true
BADGE-NPM: https://nodei.co/npm/iobroker.broadlink2.png?downloads=true
---
＃![商标](zh-cn/adapterref/iobroker.broadlink2/../../../en/adapterref/iobroker.broadlink2/./admin/broadlink.png)SteuertBroadLink IR / RF-Remotes和Schaltsteckdosen
##AdaplerfürverschiedeneBroadlink WLan-Geräte（RM ++，SP ++，A1）
这是适用于多个Broadlink交换机的ioBroker适配器，如RM2，SP1，SP2，SP3，Honeywell SP2，SPMini，SPMini2，SPMiniPlus以及来自它们的一些OEM产品。
还支持遥控器，如RM2，RM Mini，RM Pro Phicomm，RM2 Home Plus，RM2 Home Plus GDT，RM2 Pro Plus，RM2 Pro Plus2和RM2 Pro Plus BL。多个控制器将生成自己的条目，需要单独进行培训。
它扫描网络以查找兼容设备并安装它们（目前只有交换机类型SP？）。

如果你学习了RM *的状态，然后重命名他们的名字，那么状态ID也会改为新名字！

如果你使用'code'+你的代码作为值（在代码之前使用'CODE_'或甚至更好（因为如果你重命名状态它将会保留）添加字段'代码，你也可以在LearnedStates中创建自己的新命令'使用admin.object铅笔生成本机并将十六进制代码放在那里（没有'CODE_'！）。

适配器具有固定状态以从RM设备发送代码或了解它们它还可以发送单个场景（多个设备上的操作）。

如果再次找不到在某个IP上配置的设备，则会标记为“notReachable”！如果它们再次连接，它们将正常使用。

如果设备连续2次未应答，则设置为无法访问。 ***notReachable*** 设备每50次扫描会发出一条日志警告信息。在10次扫描之后，适配器将尝试在之前的同一IP上再次找到它们。如果您更改了IP，请进行重新扫描。

如果您永久删除设备或在路由器中重命名设备，请从admin.objects中删除设备！

＃＃＃ 注意
无法轮询SP1设备。

*此适配器基于此处的原始Broadlink适配器v0.1.1：<https://github.com/hieblmedia/ioBroker.broadlink>

##配置
*在配置中输入网络地址的前缀，生成设备名称时应将其删除
*输入民意调查之间的秒数。在每次轮询时，将询问所有指向SP1的SP *设备的开关状态。可以通过将轮询延迟设置为0来禁用此功能。在某些具有温度读数的RM设备上，温度也将更新。

##如何学习代码
*在ioBroker的对象中，您可以找到“broadlink2。[devicename] .Learn或LearnRF for”+“类型的设备”。
*对于RM（x）+（Plus）设备，您还可以获得一个特殊的RS-sweep-lear按钮，它可以学习比正常433MHz更多的设备。
*将此对象设置为true。 （您可以单击对象视图中的按钮）
*现在在30秒内按遥控器上的某个按钮。
*一个新的对象现在应该出现在对象“broadlink。[n]。[devicename] .LearnedState”中，名称为“>>>重命名学习@YYYYMMDDTHHmmSS”
*您可以单击对象视图中的按钮发送代码。
*要重命名项目，请单击名称（以`>>>`开头）并更改名称。它不应该包括`，`，`.`或`;`

也可以使用[RM-桥](http://rm-bridge.fun2code.de/)中的代码。
只需创建一个对象（状态，类型按钮），其值为“CODE_”或本地条目`code`，不带任何“CODE_”。

##使用场景
* Szenen bestehen aus ID's Zahlen mit`，`aneinandergereiht。正常的werden sie einfach im Abstand von 100mshintereinanderausgelöst。 Wird eine Zahl gefunden wird dort so viele ms gewartet biszumnächstenAuslösen。另外`，SP：dose1，RM：your.L.StereoEin，1000，RM：your.L.TVEin`würdedieSteckdose einschalten，dann den Fernseher 1100ms nachher die Stereoanlage。 Man kann auch Werte bei anderen（auch fremde）国家durch Angabe des kompletten id's schalten：`hm-rpc.0.MEQ1435726.1.STATE`würddeieseneinschalten！ Übrigens，Bei boolschen Stateskann kann beim Einschalten das'= 1 / = on / = true / = ein'weggelassen werden da true der default-Wert ist。 BeimAusschaltenwärein'= 0 / = false / = aus / = off'undbedingt notwendig！

##使用状态
*Siekönnen陈述anlegen welche mittels gelernten Signale ein-oder ausgeschaltet werden。
* Damit geben sie den State-Namen an und die Signale（listem mit'，'getrennt）diedasGeräteinschaltenund auch solche die es ausschalten。
* Bei boolschen States Wird nur der erste Wert gesendet aber beim Senden von allen Werten wird der State gesetzt。 Das ist von Vorteil wenn mehrere TasteneinGeräteinschalten（奥德沙尔滕）
*EskännenzumAusschalten auch keine Signale gelistet werden dann werden die zum Einschalten verwendeten Werte in einer Liste
* wird als Aus-Signal nur'+'angegeben werden die Werte im Ein-Bereich（hoffentlich 10 Signale）als Zehnertastatur verwendet die Wete bis zu 9999 senden kann。 Wenn dann der State mit Wert 123 beschrieben wird wird dann'1'，'2'和dann'3'mit jeweils nach 1/3SekundeVerzögerunggesendet！

Die Liste muss mit dem 0-Befehl beginnen und mit dem 9-Befehl enden！

##使用发送消息到适配器
Der Adapter versteht jetzt auch'sendTo'Kommandos。

*`debug`：`sendTo（'broadlink2.0'，'debug'，'on'）`（es geht auch 0,1，on，off，ein，aus，true，false）würdedebugein-oder ausschalten。
*`get`：`sendTo（'broadlink2.0'，'get'，'RM2：RMPROPLUS.Temperature'`kann der state von Werten abgefragt werden，man bekommt zB` {val：29.9，ack：true，ts：1505839335870 ，q：0，from：'system.adapter.broadlink2.0'，lc：1505839335870}`zurück
*`switch`：schaltet Steckdose ein / aus je nach文字：`sendTo（'broadlink2.0'，'switch'，'SP：你的设备id = on'）`
*`switch_on` /`switch_off`：sendTo（'broadlink2.0'，'switch_on'，'SP：你的设备ID'）`
*`send`：`sendTo（'broadlink2.0'，'send'，'RM：yourdev.Learn'）`würdelernenstarten und`sendTo（'broadlink2.0'，'send'，'RM：yourdev.L .yourid'）`würdedencode（oder eine Scene）senden。
*`send_scene`：`sendTo（'broadlink2.0'，'send_scene'，'scene xxx'）`würdedenals message angegebenen Text alsSzeneausführen
*`send_code`：`sendTo（'broadlink2.0'，'send_code'，'RM：your remote.CODE_xxxxx'）`würdedenCODE_xxxx vom R：你的名字森。

＃＃ 已知的问题
*如果您多次学习相同的信号，则代码可能每次都不同。这不能改变。
*有时如果他们不回复搜索，则找不到设备。执行重新扫描或重新启动适配器以重新启动新实例。

##重要/ Wichtig
*需要节点> = v4.2

##安装
Mit ioBroker admin，npm install iobroker.broadlink2 oder von <https://github.com/frankjoke/ioBroker.broadlink2>

## Changelog

### 1.9.1
* added anothe RM Mini code

### 1.8.1
* Changed util.js and tests and added new devices

### 1.7.0

* Changed and corrected states which are created by A1-devices

### 1.6.0

* Added RF learning for RM-Plus devices
* Changed Learn states to LearnRF and LearnIR to differentiate
* a lot of code change to improve error handling and renaming

### 1.5.3

* Added ***notReachable*** states to devices which can return values (SP,RM,A1)
* Added info when SP's are switched manually
* devices which are disconnected will be stated as such and reconeccted automatically

### 1.5.0

* Added ***Scenes*** um mehrere Befehle hintereinander auszuführen. Diese können aud Adapter.config angelegtr werden.
* Adapter verwendet kürzere Namen
* Adapter kann codes oder Szenen direkt als Befehl senden
* Adapter verwendet keine 'strings' mehr als button type

### 1.1.1

* Added ***NewDeviceScan***-Button um einen neuen scan zu veranlassen ohne den Adapter zu starten.
* Adapter lest sofort die Werte der Devices ein
* Problem solved which occured when multiple IP names were resolved by reverse-dns.

### 1.1.0

* Support for A1 devices added (thanks a lot to **blackrozes**)
* bug fix for SP?
* Receive and execute message from sendTo to broadlink2 implemented

### 1.0.3

* Renamed to ioBroker.broadlink2 on Git
* Bug fix on 1.0.1

### 1.0.0

* Added learned state renaming, just rename the name and the ID will be renamed as well.
* Added debugging with 'debug!' at beginning of IP suffix and you will see debug messages without setting Adapter to debug.

### 0.2.0

* Implemented SP2 switches and they are working to set them!
* Currently ONLY SP1 && SP2 (SP3?) are working, please test!
* Disabled RM? devices, no test available, ordered one for later re-implementation

### Todo for later revisions

## License

The MIT License (MIT)

Copyright (c) 2014-2019, frankjoke <frankjoke@hotmail.com>

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