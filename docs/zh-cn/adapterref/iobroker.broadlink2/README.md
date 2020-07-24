---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.broadlink2/README.md
title: ！[Logo]（./ admin / broadlink2.png）控制BroadLink兼容设备
hash: u1N/CSfQr6AUa2Dkx1T4WerTCF0AhA0ORYCcGBT8RSU=
---
![NPM版本](http://img.shields.io/npm/v/iobroker.broadlink2.svg)
![已安装](http://iobroker.live/badges/broadlink2-installed.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.broadlink2.svg)
![特拉维斯](http://img.shields.io/travis/frankjoke/ioBroker.broadlink2/master.svg)

＃![商标](../../../en/adapterref/iobroker.broadlink2/./admin/broadlink2.png)控制BroadLink兼容设备
[Deutsche Anleitung由Google翻译](https://translate.google.com/translate?sl=en&tl=de&u=https%3A%2F%2Fgithub.com%2Ffrankjoke%2FioBroker.broadlink2%2Fblob%2Fmaster%2FREADME.md)

[Русские инструкции переведены с гуглом](https://translate.google.com/translate?sl=en&tl=ru&u=https%3A%2F%2Fgithub.com%2Ffrankjoke%2FioBroker.broadlink2%2Fblob%2Fmaster%2FREADME.md)

##用于不同Broadlink兼容WLan设备（RM ++，SP ++，A1，Floureon，S1C，LB1）的适配器
这是一个ioBroker适配器，用于多个Broadlink交换机，例如RM2，RM3，RM Plus，SP1，SP2，SP3，霍尼韦尔SP2，SPMini，SPMini2，SPMiniPlus以及其中的一些OEM产品。
还支持其他遥控器，例如RM2，RM Mini，RM Pro Phicomm，RM2 Home Plus，RM2 Home Plus GDT，RM2 Pro Plus，RM2 Pro Plus2和RM2 Pro Plus BL。多个控制器将生成自己的条目，并且需要分别进行培训。
它扫描网络以找到兼容的设备并安装它们（当前仅SP类型的交换机？）。

如果您了解了RM *的状态，然后重命名了它们的名称，则状态ID也将更改为新名称！

如果您使用'code'+您的代码作为值（在代码之前使用'CODE_'甚至更好（因为如果重命名该状态将保留它），则您还可以在LearnedStates中创建自己的新命令，并添加字段'code以使用admin.object铅笔进行本地处理，然后在其中放入十六进制代码（不带“ CODE_”！）。

适配器具有固定状态，可以从RM设备发送代码或学习它们，它也可以发送单个场景（在多个设备上的动作）。

如果再次找不到在特定IP上配置的设备，则将其标记为“ notReachable”！如果再次连接，它们将可以正常使用。

如果设备连续5分钟未应答，则将其设置为无法访问。 ***notReachable*** 设备每次x扫描都会发出一条日志警告消息。经过一些扫描后，适配器将尝试再次在相同的Mac地址上再次找到它们。

如果要永久删除旧设备或在路由器中将其重命名，请从admin.objects中删除旧设备！

适配器首先尝试通过名称查找设备，然后再通过mac地址查找设备。例如，如果名称由于IP地址的更改而更改，而mac地址保持不变，则设备将继续使用旧名称。如果设备更改为具有新Mac的新设备，则可以在config中使用重命名设备来使用旧设备名称。

###关于轮询的注意事项
* SP1设备无法轮询。
*如果仅使用RM设备，则可以将轮询设置为2分钟（120秒），但不应设置为更高，否则可能无法重新授权
*如果使用可以手动切换的开关，则塑形应为30s-1分钟，以反映一分钟内的变化。

##配置
*在配置中输入网络地址的前缀，生成设备名称时应将其删除
*输入两次轮询之间的秒数。在每次轮询中，将询问所有包含SP1的SP *设备。可以通过将轮询延迟设置为0来禁用此功能。在某些具有温度读数的RM设备上，温度也会被更新。
*您现在可以添加要查找/包含的设备的ip地址，这些设备也位于适配器网络之外的其他网络上。在这种情况下，您需要通过内部或外部路由表确保适配器在其上运行kno0ws的计算机如何连接到该其他网络。
*可以将“使用IP接口”选项设置为使用指定的接口地址，如果在运行iobroker的系统上具有lan和wlan，并且您不想在第一个接口上进行扫描，而仅在wlan上进行扫描，则可能会有所帮助在某些docker或VM环境中，如果本地接口与外部接口也不相同。您需要输入要用作源地址的接口的IPv4地址，否则适配器将使用0.0.0.0并仅侦听所有本地接口。

##如何在RM上学习代码
*在ioBroker的对象中，您可以找到“ broadlink2。[devicename] .Learn或LearnRF用于'+'类型的设备”。
*对于RM（x）+（Plus）设备，您还会获得一个特殊的RS扫描学习按钮（_LearnRF），该按钮可以学习比正常433MHz上更多的设备。
*将此对象设置为true。 （您可以在对象视图中单击按钮）
*现在在30秒内按一下遥控器上的某个按钮。在正常模式下，短按一下它们，直到学习为止。
*在射频扫描学习中，您需要先长按此按钮约10-20秒，然后释放它并等待2-3秒，然后再重新按下它很短的时间。
*现在，应在对象“ broadlink。[n]。[设备名称] .LearnedState”中显示一个新对象，名称为“ >>>重命名为@ YYYYMMDDTHHmmSS
*您可以在对象视图中单击按钮以发送代码。
*要重命名项目，请单击名称（以“ _Rename_learned_”开头）并更改名称。它不应包含`，`，`.`或`;`以及其他一些字符，它们将由'_'代替；

也可以使用[RM桥](http://rm-bridge.fun2code.de/)中的代码。
只需创建一个带有值的对象（状态，类型按钮），然后在该值之前加上“ CODE_”或本机条目`code`而没有任何“ CODE_”即可。

##关于新RM4 / LB1器件的注意事项
*几个新的Broadlink-Devices支持新的Broadlink-Cloud协议，当您使用较新的Broadlink应用程序将设备引入wifi网络时，该协议会自动选择。该新的Broadlink协议与broadlink2-Adapter不兼容，并且您不能使用使用该新协议的设备。
*为避免此问题，请使用较旧的Broadlink应用（例如“ e smart home”或“ e-control”）将设备连接到网络中，并确保您的电话位于您要插入的同一2.4GHz wifi网络上！
*此更新的设备还需要每5-10分钟重新验证一次适配器自动进行的身份验证。

##使用场景
*场景可以包含ID或名称以及以`，`分隔的数字。通常，将以100毫秒的时差执行/发送ID，但如果您需要更长的暂停时间，则可以输入一个数字，该数字反映了要等待的毫秒数。例如，“ SP：dose = 1、1000，RM：your.L.StereoEin，1000，RM：your.L.TVEin”会打开名为“ SP：dose”的无线插头，然后等待一秒钟（实际上是1.1秒） ），打开立体声，然后再等待一秒钟。您还可以切换其他适配器的设备，例如hm-rpc.0.MEQ1435726.1.STATE = true可以打开此Homematic设备！ Boolsche状态可以使用'= 1 / = on / = true / = ein'进行切换，如果不使用'='则将使用true。要关闭设备，请以“ = 0 / = false / = aus / = off”结尾，必须将其关闭！

##使用状态
*您还可以为设备创建状态，将打开和关闭命令组合为一个状态，该状态可以像其他任何设备一样进行切换。
*您需要在单独的列中列出用于打开和关闭状态的命令，这些命令可以是多个命令，因此状态可以知道何时通过任何一个打开/关闭设备
*如果您将状态设置为开或关，则会发送第一个开/关命令
*如果仅存在打开命令，则开关将以数值1发送相应的命令，这意味着如果接收到“ 0”，它将发送第一个命令，如果接收到“ 1”，它将发送第二个命令。这样，您可以在一个状态中模拟多个状态。
*如果仅使用“ +”作为关闭命令，则需要提供10个以“'”分隔的开启命令，这些命令在遥控器上反映为数字“ 0-9”。您可以发送状态，然后发送一个数字，例如“ 123”（最大为9999），它将发送“ 1”，“ 2”和“ 3”，它们之间的延迟为1/3秒！这样，如果状态名称为TVchannel，则只需写“ TVchannel = 33”，即可将TV上的频道设置为“ 33”。
*如果您将`-number`作为关闭命令（如`-17`）使用，则可以将数字存储到要减去17的状态，并发送处于打开状态的第（x-17）个项目。这样，您可以为每个温度具有不同代码的设备设置不同的固定温度。

##使用发送消息到适配器
适配器也可以理解“ sendTo”命令。

*`debug`：`sendTo（'broadlink2.0'，'debug'，'on'）`（也为0,1，on，off，ein，aus，true，false）将打开调试模式。
*`get`：`sendTo（'broadlink2.0'，'get'，'RM2：RMPROPLUS.Temperature'`可以从设备中请求数据，例如{{val：29.9，ack：true，ts：1505839335870，q：0，摘自：“ system.adapter.broadlink2.0”，lc：1505839335870}`zurück
*`switch`：可以打开或关闭插头：`sendTo（'broadlink2.0'，'switch'，'SP：your device id = on'）`
*`switch_on` /`switch_off`：sendTo（'broadlink2.0'，'switch_on'，'SP：您的设备ID'）`
*`send`：`sendTo（'broadlink2.0'，'send'，'RM：yourdev._Learn'）`将开始学习，而`sendTo（'broadlink2.0'，'send'，'RM：yourdev.L .yourid'）`将发送代码。
*`send_scene`：`sendTo（'broadlink2.0'，'send_scene'，'scene xxx'）`würdeden als message angegebenen Text als Szeneausführen
*`send_code`：`sendTo（'broadlink2.0'，'send_code'，'RM：your remote.CODE_xxxxx'）`CODE_xxxx vom R：您的名字senden。

## Floureon或Beok313温控器
*可以设置大多数数据，可以通过将任何内容写入_setTime来设置时间，在这种情况下，设备的时间将设置为ioBroker系统时间。在adpter启动时也将自动完成此操作。

##配置其他dnew设备
*您可以添加具有相同协议的新设备，方法是将它们添加到设备ID（以十六进制或十进制表示）和设备类别（悬挂在此处（类别= A1，MP1，RM，RMP，S1C，SP1，SP2，SP3P， T1）。因此，您可以将一个新的远程适配器添加到RM列表中，该远程适配器仅将适配器作为十六进制ID为0x1234的未知设备查找到RM列表（0x01234 = RMP）。

##重命名设备
*设备通常会收到其网络主机名，或设备类型，ID和mac地址的组合作为其名称，其类型的前2个字母前面带有'：'。您可以使用“ T1：BroadLink-OEM-T1-fa-83-7c = Beok313”重命名此类设备，在这种情况下，将不使用原始名称，但使用的新名称将为“ Beok313”。

＃＃ 调试模式
*如果在添加的新设备列表的末尾添加一个“！”（即使它为空），则可以将适配器设置为调试模式，即使该适配器未设置为“，它也会记录很多其他信息”。管理员”中的“信息”模式。

＃＃ 已知的问题
*如果您多次学习相同的信号，则代码每次都可能不同。这是无法更改的。
*如果某些设备不响应搜索，则有时找不到设备。重新扫描或重新启动适配器以重新启动新实例。

##重要/ Wichtig
*要求节点> = V6

##安装
使用ioBroker管理员，npm安装iobroker.broadlink2或从<https://github.com/frankjoke/ioBroker.broadlink2>安装

## Changelog

### 2.1.5

* beta to try to make 0x5f36 working

### 2.1.4

* bug corrections for RM4 temperatures & Humidity

### 2.1.2

* bug corrections for States and Scenes
* Names are now taken from DNS end which mean you may rename devices in router and set their fixed IP address there

### 2.1.0

* Added RM4 protocol for newest RM4 and RM3-Minis 
* Added LB1 Wifi bulb device support
* Added finding of devices if name or ip changes according to mac address
* Added support of devices in other netword with IP address
* Changed learning and device communication for all RM devices
* Re-write of 70% nof the code for new js-controllers and nodejs versions.

### 2.0.3

* changed to new myAdapter to support js-controller 2.0 and 3.0

### 2.0.1

* Can handle Floureon/Beko thermostats (now with MQTT)
* Can handle S1C security devices
* Names device after their name or with their mac to reduce possibility of renaming
* Can rename devices
* Support compact mode
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

Copyright (c) 2014-2020, frankjoke <frankjoke@hotmail.com>

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