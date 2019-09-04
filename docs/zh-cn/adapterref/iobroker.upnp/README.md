---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.upnp/README.md
title: ioBroker.upnp
hash: fLFkntZ34BVfHeFIN9BgSFM5pbg/hJ7cZwTZSm8/U00=
---
![商标](../../../en/adapterref/iobroker.upnp/admin/upnp-discovery.png)

![Greenkeeper徽章](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.upnp.svg)
![安装数量](http://iobroker.live/badges/upnp-stable.svg)
![商标](http://img.shields.io/npm/v/iobroker.upnp.svg)
![图片](https://travis-ci.org/Jey-Cee/ioBroker.upnp.svg?branch=master)

＃ioBroker.upnp
***节点4.x +需要！***

1. [Deutsch]（＃german_description）
* [是不是UPnP？]（＃was-ist-upnp）
* [Funktionsbeschreibung]（＃funktionsbeschreibung）
* [Objektstruktur]（＃objektstruktur）
* [Allgemeine Objekte]（＃allgemeine-objekte）
* [Upnp Objekte]（＃upnp-objekte）
* [Steuerung]（＃steuerung）
* [Geräte/ Dienst Spezifische Besonderheiten]（＃gerätedienst-spezifische-besonderheiten）

2. [英文]（＃english_description）
* [什么是UPnP？]（＃what-is-upnp）
* [功能描述]（#function-description）
* [对象结构]（＃object-structure）
* [一般对象]（#gene-objects）
* [Upnp Objects]（＃object-structure）
* [控制]（＃控制）
* [设备/服务特定功能]（＃devicesservice-specific-features）

3. [更改日志]（#changelog）

##德语描述
### Verwendungszweck
Dient der Kommunikation und Interaktion mit allen UPnP-FähigenGeräten。

####是不是UPnP？
UPnP =通用即插即用。 Ist der versuch eine Standardisierung der KommunikationzwischenGerätenimNetzwerk herzustellen。
Dazu gibt es sogenannte“Schemas”，diese werden in form einer xml Datei dargestellt。 Sie enthalten alle信息überdasGerätoderdie Software und deren Dienste die sie bereit stellen。 Damit diese Dienste auch Nutzbar sind，wird auch eine Beschreibung zu jedem Dienst mitgeliefert。 Diese Beschreibung folgtdemfürdenDienst festgelegten Schema，dadurchkönnenschnellInformationen und Befehle ausgetauscht werden ohne das esnötigthetzu wissen um welches Modell oder von welchem HerstellerdasGerätoderdie Software ist。 In Vergangenheit wurde diese Standardisierung vorallemfürMediengeräteundSoftware genutzt。 Seit einiger Zeit gibt es Bestrebungen auch die Kommunikation des“IoT  - 物联网”mit dieser Standardisierung zu vereinheitlichen。
Dazu wurde 2016死于“Open connectivity Foundation”gegründet，dieseübernimmtdieAufgaben des UPnP-Forums，welches die Zertifizierung von UPnP-FähigenGerätendurchgeführtundStandards erstellt hat。

#### Funktionsbeschreibung
DerAdapterführtbeimersten启动einen Broadcast durch und Wertet die Antworten aus。 Die Antworten enthalten den Link zu den xml Dateien der Dienste。 Anhand der xml Dateien werden die objekte in ioBroker erzeugt und mitallenverfügbarenInformationenbefüllt。

Zeitverzögertwirdein Dienst gestartet der auf NachrichtenvonGeräten/ Diensten wartet die sich an-oder abmelden。 NeuerkannteGeräte/ Dienste werden automatisch zu denvorhandenenhinzugefügt。 Ein zweiter Dienst meldet sich beijedemverfügbarenGerätanund Abonniert Statusmeldungen，damit bekommt ioBrokerjedeÄnderung（die gesendet wird）desGerätes/ Dienstes automatisch mitgeteilt。

#### Objektstruktur
JedesGerätoderSoftware die auf den Broadcast reagiert wirdalseyigenständigesObjektangelegt。 Unterhalb dieses Objekts befinden sich alle bereitgestellten Dienste mitihrenMöglichkeiten。 DieMöglichkeitenWerdenin 3 Kategorien（Rolle / role）eingeteilt：indicator.state，action and argument。

** state - ** ist eine Variable die den den Aktuellen zustand eines Objekts / DatenpunktsimGerät/ Dienst darstellt。 Jeder indicator.state hat einen bestimmten输入wie number，string，boolean，.... Darüberhinausist auch genau festgelegt welchen Wert oder Wertebereich der inidcator.state haben kann，diese Angaben sind im“native”eines Objekts hinterlegt。
Bisher implementierte native's：

 -  sendEvents = Bedeutung bis jetzt Unbekannt。
 -  allowedValues =字符串死于Akzeptiert werden。
 -  minimum = Gibt den niedrigsten Zahlen wert an der Akzeptiert wird。
 -  maximum = GibtdenhöchstenZahlenwert an der Akzeptiert wird。
 -  step = Gibt an in welchen Schritten einWertverändertwerdenkann。

**按钮 -  **“请求”ist ein Befehl der andasGerät/ den Dienst geschickt werden kann und von diesem Aktzeptiert wird。 Dieses Objekt hat im Regelfall ein Unterobjekt，das argument。

**论点 - ** ist ein Unterobjekt von einer Aktion-Channel。 Der Type ist“gemischt”da er nicht vorgegeben wird。在den native's des Objekts finden sich verschiedene Informationen，siekönnenvonargument zu argument anders sein。
Bisher bekannte native's：

 -  direction = Gibt die Richtung an in der Informationsfluss statt findet。

“在”bedeutet es wird keinWertzurückgeliefert。
“out”bedeutet es wird einWertzurückgeliefert。

 -  relatedStateVariable = Gibt den indicator.state anderfürdenAustausch der Daten

Zuständig是的。

 -  argumentNumber = Gibt an das wievielte Argument der Action es ist。

### Allgemeine Objekte
Die folgenden Objekte findensichfürjedesGerät/ jeden Dienst und werden zurVerwaltungbenötigt。 Sie sind nicht Bestandteil des UPnP Standards oderderGeräte-/ Dienstbeschreibung desjeweiligenGerätes。

**活着 - ** wirdvomGerät/ Dienst auf“true”gesetzt und vom Adapter nach x Sekunden auf“null”gesetzt，wenndasGerät/ Dienst diesen nicht wieder auf“true”setzt。 Die Ablauf zeitistabhängigdavonwelche maximal LebensdauervomGerätfürdasAlive信号mitgeteilt wurde。 WenneinGerätsichabmeldet wird der Status auf“false gesetzt。 EsistmöglichdiesesObjekt von Hand oder per Skript auf“true”zu setzen，das sollte jedoch nur gemacht werden wenn man sicher ist dassdasGerät/ Dienst erreichbar ist。 Wenn Alive manuell auf“true”gesetzt wurde sollte es auch manuell auf“false”gesetzt wern wenn nichtmehrnötig，da andernfalls Fehlerauftretenkönnen。

** Sid - ** Dient als identifikation der Subscription。 Diese sid wird jedesmal vom host erzeugt wenn eine Subscription von einem client angefordert wird。 Diesidläuftnacheiner vom host definierten Zeit ab，daher wird sie immer wieder Aktualisiert。 Sie giltnurfüreinenbenstimmten Dienst。

**请求 - ** sendet einen SOAP request mit den gegebenen Optionen

### UPnP Objekte
Die hier auf gelisteten Objekte finden sich im UPnP Standard und / oderdenGeräte-/ Dinestbeschreibungen。 Es handelt sich hier nicht umeineVollständige聆听过敏Objekte，diese Auswahl an Objekten stelltlediglichhäufigorkommendeObjekte dar。

**（A_ARG_TYPE_）InstanceID - ** Die InstanceID istamHäufigstenzufinden und wirdzwingendbenötigtadsie die Instanz eines Dienstes angibt der angesprochen werden soll。 In denmeistenfällenistdie InstanceID = 0.Diese ID wird bei jeder事件消息von einem Dienst und jedem Befehl der an einen Dienst gesendet wird，mitübergeben。

**（A_ARG_TYPE_）频道（*） - ** Das频道Objekt findet sich im Zusammenhang mit Audio / Video Diensten。 Ein Channel muss zum Beispiel angegeben werden wenndieLautstärkeverändertwerdensoll。 MöglicheWertekönnenBeispielsweise“Master”，“LF”或“RF”sein。在Diesem Beispiel steht“Master”fürdieAllgemeineLautstärke，“LF”fürlinks vorne und“RF”fürrechtsvorne。 Wenn jetzt dieLautstärkenurrechtsvorneverändertwerdensoll，gibt man“RF”bei Channel an。

**（设置/获取）音量（*） - ** Das Volume Objekt findet sich im Zusammenhang mit Audio / Video Diensten。 Je nachdem wo es vorkommt wird es zum AnzeigenderLautstärkegenutztoder zum einstellenderLautstärke。 Dieses Objekt hat immer einen Mindestwert und einen Maximalwert den man angeben kann，in denmeistenfällenliegtder Wertebereich zwischen 0 und 100. Die Schrittweite liegt normal bei 1，das bedeuteteskönnennurglatte Zahlen angegeben werden。

### Steuerung
**按钮 -  **“请求”Eine Action stellt einen Befehl dar，der andasGerät/ den Dienst geschickt werden kann。 Zu jederActiongehörenauchArgumente，die Zwingend angegebenwerdenmüssen。行动的erkennt man ihrer Rolle / role，dort steht“action”。 Beschreibt man die Action mit“发送”wird der Befehl和dasGerät/ den Dienst gesendet。

** state.argument.x - ** Muss zwingend bei einer Action angegeben werden，wenn unter Rolle“state.argument.in”ist。 MöglicheWertedie angegebenwerdenkönnen/müssenfindetman in der“Related State Variable”。 Der name dieser“Related State Variable”ist im Objekt unter“native” - >“relatedStateVariable”hinterlegt。 DieArgumentemüssenineiner bestimmten Reihenfolge angegeben werden，hierzu gibt es“native” - > Argument_No。 Ein Argument erkennt man in seiner Rolle / role，dort steht“argument”。 Manche stringsmüssenmiteinem“”“in den Datenpunkt geschrieben werden。 Es kann nicht pauschal beantwortet werden wann das der Fall ist，aber bei komplexen strings wie zum Beispiel URL's kann das der Fall sein。 Hier hilft nur ausprobieren。男人会在“einemArgumentübergebenmussman”中说“”verwenden。

**（相关国家）变量 - ** Es handelt sich um VariablendiefürdenDatenaustausch genutzt werden。在天然的变种finden sich verschiedene Informationen：

 -  allowedValues = gibtAuskunftüberdiemöglichenInhalteder Variable oder is als Argument mit einer Action gesendet werden kann。
 -  minimum = der niedrigste Wert den die变量enthalten kann oder als Argument mit einer Action gesendet werden kann。
 -  maximum =derhöchsteWertden die变量enthalten kann oder als Argument mit einer Action gesendet werden kann。
 -  step = gibt an in welchen Schritten ein Wert angegeben wird。
 -  sendEvents =？ MöglicheWerte说“是”或“不”。 Es istabervölligunklar是das zu bedeuten hat。 Die Annahme dass dieWertefürdiese变量nur dann voneinemGerät/ Dienst automatisch gesendet wern wenn“yes”bei sendEvents steht hat sichnichtbestätigt。

Beispiel，wie man die Werte pollen kann：

```
// get every 10 seconds the values from device
schedule("*/10 * * * * *",  function () {
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetCommonLinkProperties.request"/*GetCommonLinkProperties*/, true);
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetAddonInfos.request"/*GetAddonInfos*/, true);
});
```

Es gibt auchdieMöglichkeitbeidem“request”Objekt das Polling im Admin einzustellen。 DafürKlicktman aufdasSchraubenschlüsselNaturebei dem Objekt。

###Geräte/ Dienst Spezifische Besonderheiten
** Sonos：**FürQPlayist esnichtmöglicheineSubscription zu erstellen。 MöglicherweiseisthierfüreineAutentifikation notwendig

** Phillips Hue Bridge 2：** Dieierung des des UPnP标准在der Hue Bridge 2 ist Fehlerhaft，weshalb die Hue Bridge 2 zwar gefunden wird jedoch nicht via UPnP ansprechbar ist。

**雅马哈：** Verwendet eine auf dem UPnP Standard basierende API，die jedoch ein eigenes Datenformat verwendet。 Derzeit wird das vom UPnP Adapternichtunterstützt。

**索尼：** Verwendet eine ScalarWebApi genannte SchnittstelledieüberUPnPansprechbar ist jedoch ein eigenes Daten Format verwendet。 Derzeit wird das vom UPnP Adapternichtunterstützt。

**亚马逊Kindle：** Stellt einen UPnP Dienst bereit，jedoch wird keine UPnP-Dienstbeschreibung geliefert und kann daher nicht genutzt werden。

##英文说明
***翻译：https：//www.deepl.com/translator***

＃＃＃ 有可能的使用
用于与所有支持UPnP的设备进行通信和交互。

####什么是UPnP？
UPnP =通用即插即用。尝试标准化网络上设备之间的通信。为此，存在所谓的“模式”，其以xml文件的形式显示。它们包含有关设备或软件及其提供的服务的所有信息。为了确保也可以使用这些服务，提供了每种服务的描述。此描述遵循为服务定义的方案，允许快速交换信息和命令，而无需知道设备或软件是哪个型号或制造商。过去，这种标准化主要用于媒体设备和软件。一段时间以来，人们也在努力使“物联网 - 物联网”的通信标准化。为此，“开放连接基金会”成立于2016年，它接管了UPnP论坛的任务，该论坛已经开展了UPnP功能设备的认证并创建了标准。

＃＃＃＃ 功能说明
适配器在第一次启动时广播并评估响应。答案包含指向服务的xml文件的链接。 xml文件用于在ioBroker中创建对象，并使用所有可用信息填充它们。

延迟服务启动时间等待来自或登录或关闭的设备/服务的消息。新检测到的设备/服务会自动添加到现有设备/服务中。第二个服务登录到每个可用设备并订阅状态消息，以便自动通知ioBroker对设备/服务的任何更改（已发送）。

####对象结构
响应广播的每个设备或软件都作为单独的对象创建。在此对象下方，您将找到所有可用服务及其功能。可能性分为3类（角色/角色）：指标。国家，行动和论点。

** state  -  **是表示设备/服务中对象/数据点的当前状态的变量。每个indicator.state都有一个类型，如数字，字符串，布尔值，.....另外，它还指定了inidcator的值或值的范围。状态可以，这些细节存储在对象的“本机”中。以前实现的原生：

 -  sendEvents =含义直到现在未知。
 -  allowedValues =接受的字符串。
 -  minimum =给出接受该值的最低值。
 -  maximum =给出接受的最高值。
 -  step =指定可以在哪些步骤中更改值。

**按钮 -  **“reuqest”是可以发送到设备/服务并由设备/服务接受的命令。这个对象通常有一个子对象，即参数。

**参数 -  **是动作的子对象。该类型是“混合”的，因为它没有指定。对象的原生包含不同的信息，它们可以与参数不同。以前知道的本地人：

 -  direction =指示信息流发生的方向。在“表示没有返回任何值。Out”表示返回一个值。
 -  relatedStateVariable =返回指标。数据交换负责的状态。
 -  argumentNumber =返回动作的参数个数。

###一般对象
为每个设备/服务找到以下对象，并且这些对象是管理所必需的。它们不是UPnP标准或相应设备的设备/说明手册的一部分。

** Alive  -  **设备/服务设置为“true”，如果设备/服务未再次将其设置为“true”，则在x秒后由适配器设置为“null”。到期时间取决于设备给出的Alive信号的最大寿命。设备注销时，状态设置为“false”。可以通过手动或脚本将此对象设置为“true”，但只有在确定设备/服务可访问时才应执行此操作。如果已将Alive手动设置为“true”，则如果不再需要，也应手动将其设置为“false”，否则可能会发生错误。

** Sid  -  **用作订阅的标识。每次从客户端请求订阅时，主机都会创建此页面。 sid在主机定义的时间之后运行，因此它会一次又一次地更新。它仅对特定服务有效。

### UPnP对象
此处列出的对象可以在UPnP标准和/或device / dinest描述中找到。这不是所有对象的完整列表，此对象选择仅表示频繁出现的对象。

**（A_ARG_TYPE_）InstanceID - ** instanceID是最常见的并且是必需的，因为它指定要寻址的服务的实例。在大多数情况下，instanceID为= 0.此ID与服务以及发送到服务的每个命令的每个事件消息一起传递。

**（A_ARG_TYPE_）频道（*） -  **频道对象与音频/视频服务相关联。例如，如果要更改音量，则必须指定通道。可能的值可以是例如“Master”，“LF”或“RF”。在这个例子中，“Master”代表一般音量，“LF”代表左前方，“RF”代表右前方。如果只想在右前面板上更改音量，则必须在Channel中指定“RF”。

**（设置/获取）音量（*） -  **音量对象与音频/视频服务相关联。根据发生的位置，它用于显示音量或调节音量。此对象始终具有可指定的最小值和最大值，在大多数情况下，值的范围介于0和100之间。步长通常为1，这意味着只能输入偶数。

＃＃＃ 控制
**按钮 -  **“请求”操作是可以发送到设备/服务的命令。每个操作还包括必须指定为必需的参数。行动可以通过其角色/角色来识别，角色/角色表示“行动”。如果使用“发送”描述操作，则将命令发送到设备/服务。

** state.argument.x  -  **如果角色为“state.argument.in”，则对某个操作必须提供。可以/必须指定的可能值可以在“相关状态变量”中找到。此“相关状态变量”的名称存储在“native” - >“relatedStateVariable”下的对象中。参数必须按特定顺序给出，因为这里有“native” - > Argument_No。参数可以通过其角色/角色来识别，其中它表示“参数”。某些字符串必须在数据点中用“”“”写入。不可能以统一的方式回答这个问题，但是对于像URL这样复杂的字符串，情况就是如此。它只会帮助你尝试一下。如果你想传递一个“在论证中你必须使用”“”。

**（相关状态）变量 -  **这些是用于数据交换的变量。在变量的Native中，有一些信息：

 -  allowedValues =提供有关变量的可能内容的信息，或者可以作为带有操作的参数发送的内容。
 -  minimum =变量可以包含的最低值，或者作为带动作的参数发送。
 -  maximum =变量可以包含的最高值，或者作为带有操作的参数发送。
 -  step =表示指定值的步骤。
 -  sendEvents =？可能的值为“是”或“否”。但目前还不清楚这意味着什么。如果在sendEvents中设置为“yes”，则此变量的值仅由设备/服务自动发送的假设尚未确认。

示例如何轮询值：

```
// get every 10 seconds the values from device
schedule("*/10 * * * * *",  function () {
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetCommonLinkProperties.request"/*GetCommonLinkProperties*/, true);
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetAddonInfos.request"/*GetAddonInfos*/, true);
});
```

您可以通过对象配置在管理中启用轮询。

###设备/服务特定功能
** Sonos：**无法为QPlay创建订阅。这可能需要身份验证。

** Phillips Hue Bridge 2：** Hue Bridge 2中UPnP标准的实施是错误的，这就是找到Hue Bridge 2但无法通过UPnP访问的原因。

** Yamaha：**使用基于UPnP标准的API，但使用自己的数据格式。目前，UPnP适配器不支持此功能。

** Sony：**使用称为UPnP可寻址的ScalarWebApi接口，但使用自己的数据格式。目前，UPnP适配器不支持此功能。

**亚马逊Kindle：**提供UPnP服务，但未提供UPnP服务说明，因此无法使用。

## Changelog

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

Copyright (c) 2016-2019 Jey Cee <jey-cee@live.com>

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