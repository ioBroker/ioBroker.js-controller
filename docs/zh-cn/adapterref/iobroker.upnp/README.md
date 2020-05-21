---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.upnp/README.md
title: ioBroker.upnp
hash: slDPN+9S20LO6Q421lT1Dgn21NMFIPI8ygvsNf8xHtw=
---
![商标](../../../en/adapterref/iobroker.upnp/admin/upnp-discovery.png)

![安装数量](http://iobroker.live/badges/upnp-stable.svg)
![商标](http://img.shields.io/npm/v/iobroker.upnp.svg)
![图片](https://travis-ci.org/Jey-Cee/ioBroker.upnp.svg?branch=master)

＃ioBroker.upnp
***需要节点4.x +！***

1. [Deutsch]（＃german_description）
* [是否是UPnP？]（＃was-ist-upnp）
* [Funktionsbeschreibung]（＃funktionsbeschreibung）
* [Objektstruktur]（＃objektstruktur）
* [Allgemeine Objekte]（＃allgemeine-objekte）
* [Upnp对象]（＃upnp-objekte）
* [Steuerung]（＃steuerung）
* [Geräte/ Dienst Spezifische Besonderheiten]（＃gerätedienst-spezifische-besonderheiten）

2. [英语]（＃english_description）
* [什么是UPnP？]（＃what-is-upnp）
* [功能说明]（＃functional-description）
* [对象结构]（＃object-structure）
* [通用对象]（＃general-objects）
* [Upnp对象]（＃object-structure）
* [Control]（＃control）
* [设备/服务特定功能]（＃devices服务特定功能）

3. [变更日志]（＃changelog）

##德语说明
### Verwendungszweck
UPnP-FähigenGeräten的通讯与交互技术系。

#### Ist UPnP吗？
UPnP =通用即插即用。国家标准化委员会在网络上发表的论文。
Dazu生成了“ Schemas”，以einer xml Datei dargestellt的形式删除了werden。有关信息和软件的信息，请联系我们。戴米特·迪恩斯（Dimitte）死于迪恩斯特（Dienste）和努兹巴（Nutzbar）罪过，威斯汀（Eine Beschreibung zu Jedem Dienst mitgeliefert）。 Diese的Diest Beschreibung主题Diest的主题Schema，dadurchkönnenschnell Informationen和Befehle ausgetauscht werden ohne das esnötigist zu wissen um welches Modell oder von erchem hersteller dasGerät。在世界范围内，标准化和软件技术都得到了认可。最佳时机与“物联网–物联网”联盟的最佳伙伴关系得到了极大的认可。
达祖世界大战2016年是“开放连接基金会”的成立日，在UPnP论坛上是übernimmt，在UPnP-FähigenGeräten上则是Zertifizierung，而标准则是帽子。

#### Funktionsbeschreibung
从头开始启动适配器，然后从头到尾开始广播。 Die Antworten Enthalten den链接到XML Dateien der Dienste。 ioBroker erzeugt和mit allenverfügbaren中的Anhand der xml Dateien werden die Objekte。

Zeitverzögert与Dienst gestartet der auf Nachrichten vonGeräten/ Diensten疣死者之间的亲密关系Neu erkannteGeräte/ Dienste werden automatisch zu den vorhandenenhinzugefügt。法国人和德国人自动贩卖机，德国人和阿邦尼埃特人身分证明书。

#### Objektstruktur
JedesGerätoder软件广播公司广播电视广播。 Unterhalb使Objekts死于Möglichkeiten。 DieMöglichkeitenwerden in 3 Kategorien（Rolle / role）eingeteilt：indicator.state，action和argument。

**州– **州可变地契（Objekts）/达因彭特（Datenpunkts）于杰拉特（Dienst darstellt）。 Jeder indicator.state hat einen bestimmten类型wie数字，字符串，布尔值等。 Darüberhinaus ist auch genau festgelegt welchen Wert oder Wertebereich der inidcator.state哈本·坎恩（Haben Kann），安格斯·辛格（Angeben Objekts hinterlegt）。
Bisher Implementierte本地人：

-sendEvents = Bedeutung bis jetzt Unbekannt。
-allowedValues =字符串死于Akzeptiert werden。
-最小值= Gibt den niedrigsten Zahlen饱受Akzeptiert迷惑。
-最大值= Gibt denhöchstenZahlen饱受Akzeptiert迷惑。
-步骤=在welsch Schritten ein Wertverändertwerden kann中的Gibt an。

**按钮– **“请求”由Befehl der an dasGerät/ den Dienst geschickt werden kann和von diesem Aktzeptiert wird设计。 Dieses Objekt hat im Regelfall ein Unterobjekt，争论不休。

**论点– ** ist Unterobjekt von einer Aktion-Channel。 Der Type ist“ gemischt” da nicht vorgegeben wird。在本国人的《对象报》中，有《论证》和《论证》。
Bisher bekannte本地人：

-方向=信息情报统计专家小组在Richtung中犯下的罪行。

“在”中体现了威特·基恩
“ Out”代表着我们的热情。

-relatedStateVariable = Gibt den indicator.state an derfürden Austausch der Daten

Zuständig主义者。

-argumentsNumber =操作后的参数。

### Allgemeine Objekte
吉尔特人的历史发现/杰德·迪恩斯特与沃登·祖尔·瓦尼通·本尼迪格。可以在杰拉特/杰明里根州的杰克逊·贝桑德石油公司建立UPnP标准。

**活着– ** wird vomGerät/ Dienst auf“ true” gesetzt和vom适配器nach x Sekunden auf“ null” gesetzt，wenn dasGerät/ Dienst diesen nicht wieder auf“ true” setzt。活着的信号最大的生命是最大的本笃会时代。 Wenn einGerät身份不明身份。 Es istmöglich死于Skript auf的“真正”祖籍，das sollte jedoch nur gemacht werden wenn man sicher ist dass das Gerst / Dienst erreichbar主义者。 Wenn Alive manuell auf“真”的gesetzt wurde解决了manuell auf“ false”的gesetzt werden wenn nicht mehrnötig，以及daenernfalls Fehler auftretenkönnen。

** Sid – **订阅中的方向识别。 Diese sid wird jedesmal vom主持人erzeugt wenn eine订阅von einem客户angefordert wird。主持人definierten Zeit ab和daher wird sie immer wieder Aktualisiert。 Sie gilt nurfüreinen bestimmten Dienst。

** request – ** sendet einen SOAP request mit den gegebenen Optionen

### UPnP对象
可以在UPnP标准版和标准版中找到。 Es handelt sich hier nicht um eineVollständigeliste aller Objekte，死于Auswahl和Objekten stellt lediglichhäufigvorkommende Objekte dar。

**（A_ARG_TYPE_）InstanceID – **实例实例ID是由Instanz eines Dienstes angibt der angesprochen werden造成的。在实例ID中，InstanceID =0。事件ID与事件消息von einem Dienst和jedem Befehl der einen Dienst gesendet wird，米特·伯格伯格。

**（A_ARG_TYPE_）Channel（*）– **频道频道发现音频和视频的数量。 Ein Channel muss zum Beispiel angwerben werden wenn dieLautstärkeverändertwerden soll。 MöglicheWertekönnenBeispielsweise“大师”，“ LF”或“ RF”系列。在贝斯皮尔（Beispiel）指挥大师“ AllgemeineLautstärke”中，“ LF”链接了vorne和“ RF” for rechts vorne。 Wenn jetzt dieLautstärkenur rechts vorneverändertwerden soll，频道第RF的“ RF”人

**（设置/获取）音量（*）– **音量对象发现音频/视频的数量。劳特斯塔克的安特根根·恩斯特内特·劳特斯塔克·恩斯泰根·恩斯特莱特。 Dieses Objekt的帽子浸没在Mindestwert和eminen中，但在0到100的范围内。

### Steuerung
**按钮– **“请求” Eine Action发言，einen Befehl dar，der an dasGerät/ den Dienst geschickt werden kann。 Zu jeder Actiongehörenauch Argumente，死于Zwingend angegeben werdenmüssen。 Action的错误人物，Roll / role，侵权行为“ action”。 Beschreibt man die wi der to be发送“发送”与der Befehl an dasGerät/ den Dienst gesendet。

** state.argument.x – ** Muss zwingend bei einer行动Angegeben werden，温特·罗尔（Rolle）“ state.argument.in” ist。 MöglicheWerte在“相关状态变量”中与Angdenben werdenkönnen/Müssen发现了关系。 Der名称为“相关状态变量”，其名称为“本机”->“ relatedStateVariable”提示。 Die Argumentemüssenin einer bestimmten Reihenfolge angegeben werden，hierzu gibt es“ native”-> Argument_No。 Ein Argument犯错误的人可能是围捕者Rolle / role，侵权行为“ argument”。曼彻斯特语录中的“Müssenmit einem”字符串。 Es kann nicht pauschal beantwortet werden wann das der Fall ist，aber bei komplexen字符串wie zum Beispiel URL的kann das der Fall sein。 hilft nur ausprobieren。将在einem论据übergebenmuss man“＆quot; verwenden中的” man man ein“。

**（相关状态）变量– **可用的变量。在Den Native的der Variablen中，发现了verschiedene Informationen：

-allowvalues = gibt Auskunftüberdiemöglichen吸入变量或变量arg mit einer Action gesendet werden kann。
-最小值=变数变暖焓值变量参量数动作参量werden值。
-最大值=变数焓变变量引数动作gesendet werden kann。
-步骤=在welsch Schritten ein Wert angegeben wird中绑定。
-sendEvents =？ MöglicheWerte表示“是”或“否”。 Es ist abervölligunklar是das zu bedeuten的帽子。 Annahme dass die Wertefürdiese Variable nur dann von einemGerät/ Dienst automatisch gesendet werden wenn“是”，sendEvents表示最佳。

贝斯皮尔（Beispiel），一个男人死于Werte花粉kann：

```
// get every 10 seconds the values from device
schedule("*/10 * * * * *",  function () {
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetCommonLinkProperties.request"/*GetCommonLinkProperties*/, true);
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetAddonInfos.request"/*GetAddonInfos*/, true);
});
```

Es gibt可能因“请求” Objekt das Polling im Admin einzustellen而死亡。 DafürKlickt man auf dasSchraubenschlüsselSymbol bei dem Objekt。

###Geräte/ Dienst Spezifische Besonderheiten
** Sonos：**FürQPlay ist es nichtmöglicheine Subscription zu erstellen。社会主义的强化

** Phillips Hue Bridge 2：**在UP HuP 2中通过UPnP解释器在hue Bridge 2和Fehlerhaft中实施UPnP标准。

** Yamaha：** Verwendet eine auf dem UPnP标准basierende API，仅用于本征特征码Datenformat verwendet。 Derzeit wird das vom UPnP适配器不适用。

** Sony：** Verwendet eine ScalarWebApi genannte Schnittstelle die UPber UPnP ansprechbar ist jedoch ein eigenes Daten Format verwendet。 Derzeit wird das vom UPnP适配器不适用。

** Amazon Kindle：** Stellt einen UPnP Dienst bereit，Jedoch wird keine UPnP-Dienstbeschreibung geliefert和kann daher nichtzt werden。

##英文说明
***通过https://www.deepl.com/translator翻译***

＃＃＃ 有可能的使用
用于与所有支持UPnP的设备进行通信和交互。

####什么是UPnP？
UPnP =通用即插即用。尝试标准化网络上设备之间的通信。为此，存在所谓的“方案”，它们以xml文件的形式显示。它们包含有关其提供的设备或软件及其服务的所有信息。为了确保也可以使用这些服务，提供了每个服务的描述。该描述遵循为服务定义的方案，允许在不知道设备或软件是哪个型号或制造商的情况下快速交换信息和命令。过去，这种标准化主要用于媒体设备和软件。一段时间以来，还一直在努力通过这种标准化来标准化“ IoT-物联网”的通信。为此，“开放连接基金会”成立于2016年，负责UPnP论坛的任务，该论坛已对支持UPnP的设备进行认证并制定了标准。

＃＃＃＃ 功能说明
适配器在第一次启动时广播并评估响应。答案包含指向服务xml文件的链接。 xml文件用于在ioBroker中创建对象，并用所有可用信息填充它们。

延迟时间启动服务，该服务等待来自已登录或注销的设备/服务的消息。新检测到的设备/服务会自动添加到现有设备/服务中。第二个服务登录到每个可用设备并订阅状态消息，以便ioBroker会自动收到有关设备（或发送到）设备/服务的任何更改的通知。

####对象结构
对广播做出反应的每个设备或软件都被创建为一个单独的对象。在此对象下，您将找到所有可用服务及其功能。可能性分为3类（角色/角色）：指标。状态，动作和论点。

状态-**是代表设备/服务中对象/数据点当前状态的变量。每个indicator.state都有特定的类型，例如数字，字符串，布尔值，.....。此外，还明确指定了inidcator的值或值范围。状态可以具有，这些详细信息存储在对象的“本机”中。先前实现的native的：

-sendEvents =到目前为止的含义未知。
-allowedValues =可接受的字符串。
-最小值=给出接受该值的最小值。
-最大值=给出接受的最高值。
-step =指定可以更改值的步骤。

**按钮-**“ reuqest”是可以发送到设备/服务并由设备/服务接受的命令。这个对象通常有一个子对象，即参数。

** argument-**是动作的子对象。未指定类型为“混合”。对象的本机对象包含不同的信息，每个参数的参数可能不同。先前已知的本机：

-direction =指示信息流发生的方向。 In“表示未返回任何值。Out”表示已返回一个值。
-relatedStateVariable =返回指标。负责数据交换的状态。
-argumentsNumber =返回其操作的参数数量。

###常规对象
为每个设备/服务找到以下对象，并且是管理所必需的。它们不是UPnP标准或相应设备的设备/说明手册的一部分。

如果设备/服务没有再次将其设置为“ true”，则设备/服务将其设置为“ true”，并在x秒后由适配器将其设置为“ null”。到期时间取决于设备给定的Alive信号的最大寿命。设备注销后，状态将设置为“ false”。可以通过手工或脚本将此对象设置为“ true”，但是只有在确定设备/服务可以访问时，才应该这样做。如果已将Alive手动设置为“ true”，则在不再需要时也应将其手动设置为“ false”，否则可能会发生错误。

** Sid-**用作订阅的标识。每次客户端请求订阅时，主机都会创建此页面。 sid在主机定义的时间后运行，因此它一次又一次地更新。仅对特定服务有效。

### UPnP对象
此处列出的对象可以在UPnP标准和/或设备/目标描述中找到。这不是所有对象的完整列表，对象的选择仅表示经常出现的对象。

**（A_ARG_TYPE_）InstanceID-** instanceID是最常见的并且是必需的，因为它指定了要寻址的服务的实例。在大多数情况下，instanceID = =0。此ID与服务以及发送给服务的每个命令一起传递给每个事件消息。

**（A_ARG_TYPE_）Channel（*）-**通道对象与音频/视频服务关联。例如，如果要更改音量，必须指定一个通道。可能的值可以是例如“ Master”，“ LF”或“ RF”。在此示例中，“ Master”代表常规音量，“ LF”代表左前，“ RF”代表右前。如果只想在右前面板上更改音量，则必须在“通道”中指定“ RF”。

**（设置/获取）音量（*）-**音量对象与音频/视频服务关联。根据发生的位置，它用于显示音量或调整音量。该对象始终具有可以指定的最小值和最大值，在大多数情况下，值的范围在0到100之间。步长通常为1，这意味着只能输入偶数。

＃＃＃ 控制
**按钮-**“请求”操作是可以发送到设备/服务的命令。每个操作还包括必须指定为强制性的参数。动作可以通过其角色/角色来识别，即“动作”。如果使用“发送”描述操作，则命令将发送到设备/服务。

** state.argument.x-**如果角色为“ state.argument.in”，则必须执行操作。可以/必须指定的可能值可以在“相关状态变量”中找到。此“相关状态变量”的名称存储在对象中的“本地”->“ relatedStateVariable”下。必须以一定顺序给出参数，为此，必须使用“本地”-> Argument_No。一个参数可以通过其角色/角色来识别，并在其中说“参数”。有些字符串必须在数据点中写有““”“。不可能以统一的价格回答这个问题，但是对于复杂的字符串（如URL），情况就是如此。它只会帮助您尝试一下。如果要在参数中传递“”，则必须使用“”。

**（相关状态）变量-**这些是用于数据交换的变量。在变量的本机变量中，有一些信息：

-allowedValues =给出有关变量可能内容或可作为参数与操作一起发送的内容的信息。
-最小值=变量可以包含或作为操作的参数发送的最小值。
-maximum =变量可以包含或作为操作的参数发送的最大值。
-step =指示在哪个步骤中指定值。
-sendEvents =？可能的值为“是”或“否”。但这还不清楚。如果在sendEvents上设置为“是”，则仅由设备/服务自动发送该变量的值的假设尚未得到确认。

示例如何轮询值：

```
// get every 10 seconds the values from device
schedule("*/10 * * * * *",  function () {
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetCommonLinkProperties.request"/*GetCommonLinkProperties*/, true);
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetAddonInfos.request"/*GetAddonInfos*/, true);
});
```

您可以通过对象配置在管理员中启用轮询。

###设备/服务特定功能
** Sonos：**无法为QPlay创建订阅。这可能需要身份验证。

** Phillips Hue Bridge 2：**在Hue Bridge 2中UPnP标准的实现是错误的，这就是为什么找到Hue Bridge 2但无法通过UPnP对其进行访问的原因。

** Yamaha：**使用基于UPnP标准的API，但使用其自己的数据格式。当前，UPnP适配器不支持此功能。

** Sony：**使用称为UPnP可寻址的ScalarWebApi接口，但使用其自己的数据格式。当前，UPnP适配器不支持此功能。

** Amazon Kindle：**提供UPnP服务，但未提供UPnP服务描述，因此无法使用。

## Changelog

### 1.0.16 (2020-04-27)
* fixes for js-controller 3

### 1.0.15 (2019-08-27)
* (jey-cee) make control of devices work again (including player controls)

### 1.0.14 (2019-08-04)
* (bluefox) Tried to fix error with player

### 1.0.11 (2019-03-07)
* (bluefox) Invalid characters in XML will be replaced

### 1.0.7 (2019-03-01)
Breaking change: naming was changed and command to poll has another name - "request"
* (bluefox) refactoring
* (bluefox) scheduling per action configurable from admin

### 0.3.9
* fix auto discover

### 0.3.8
* (jey-cee) changes for object name's
* (jey-cee) fix for empty USN
* (jey-cee) added simple media player controls

### 0.3.7
* (jey-cee) fixed auto discover

### 0.3.6
*(jey-cee) fixed problem with settings

### 0.3.5
* (jey-cee) added option in settings for disable auto discover

### 0.3.4
* (jey-cee) added Travis-CI Tests

### 0.3.3
* (jey-cee) try to fix bug that cause to crash the adapter when sending actions
* (jey-cee) added unsubscribe on subscription error
* (jey-cee) added sync between Arguments and the related State Variable
* (jey-cee) fixed bug when sending an action and there comes no answer

### 0.3.2
* (jey-cee) updated version number from 0.2.4 to 0.3.2

### 0.3.0
* (jey-cee) added native Argument_No for object type argument
* (jey-cee) changed state update handling for event messages, fix for A_ARG_TYPE states
* (jey-cee) added possibility for controling UPnP devices

### 0.2.4
* (jey-cee) updated npm package node-upnp-subscriptions to resolve max handler problem
* (jey-cee) added support for 2nd stage deviceList
* (jey-cee) bugfix: iobroker stops while updating a lot of objects
* (jey-cee) added handling for initial messages from devices

## Changelog
### 0.2.3
* (jey-cee) fixed Dead message handler
* (jey-cee) added Subscription to service (only event message handling)
* (jey-cee) when adapter stops Alive state is set to false and sid(subscription id) is cleared

## Changelog
### 0.2.2
* (jey-cee) added listener for Alive/Dead messages from devices
* (jey-cee) if new devices joining the network they will added automatically
* (jey-cee) replace whitespace chars in device id's on creation, because objects and sub-object with whitespace chars wasn't usable


### 0.2.1
* (jey-cee) bug fixing: corrected creation of native's and smaller Bugs


#### 0.2.0
* (jey-cee) getting all xml data from UPnP devices

#### 0.1.0
* (jey-cee) initial release

## License
The MIT License (MIT)

Copyright (c) 2016-2020 Jey Cee <jey-cee@live.com>

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