---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.knx/README.md
title: ioBroker.knx
hash: dd89TC8+mUVZyhj0EwZ7Du9fDTn0IgeGmiVSl27FBOc=
---
![商标](../../../en/adapterref/iobroker.knx/admin/knx.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.knx.svg)
![下载](https://img.shields.io/npm/dm/iobroker.knx.svg)
![NPM](https://nodei.co/npm/iobroker.knx.png?downloads=true)

＃ioBroker.knx
=================

##说明
EN：此适配器允许从ETS导入knxproj文件。它生成KNX-groupaddresses和ioBroker之间的转换，并将设备放入房间（尤其是MobileUI）。

它连接到标准KNX / LAN网关。

开始之前：应该在您的ETS项目中设置com.Objects的每个DPT。每个设备都应该分类到您的设施结构中。

＃＃ 特征：
*导入knxproj文件
*生成类似ETS的对象结构
*寻找和组合行为渠道和国家渠道（启发式）
*开始时更新所有州
*在写入状态对象时向KNX-Bus发送READ
*分拣到房间的渠道

##适配器配置
安装此适配器后，打开适配器配置。填写：

### KNX网关IP
使用ipv4格式的<KNX / Lan GW的IP>

＃＃＃ 港口
这通常是3671端口

### Phys。 EIB地址
填写免费的物理。与您的KNX架构对应的地址，!!!但是不像你的KNX网关那样！

### Debug-Level
扩展适配器的输出级别以进行调试

###上传knxproj
在这里，您可以以“knxproj”格式上传您的ETS导出。

导入成功后，对话框将显示导入对象的数量。现在按“保存并关闭”，应该启动适配器。
启动适配器时会读取带有read-Flag的所有groupAdresses。这可能需要一段时间，并且可能会在您的KNX总线上产生高负载。但是你的vis中的值是在启动后更新的。

###对象
这是在你的ETS项目中的knx.0下的组地址树。

###枚举
如果您的ETS中有相应设备的建筑结构，则会在此处显示。 “members”下是从该组中带有send-Flag的设备列出的组地址的名称。

###用法
如果适配器成功启动，您的数据点将可用于您想要执行的所有操作。

###数据点类型
根据KNX协会的“系统规格，互通，数据点型”，所有DPT都可以使用。这意味着您可以获得两种类型的信息：1）值或字符串2）逗号分隔值或值数组（目前我没有更好的处理方式）

例如，DPT5.001被编码为具有8位的无符号整数。这给出了一个单一的价值。 DPT3.007（控制调光）编码为1Bit（布尔）+ 3Bit（无符号Int）。
这导致f.e.其值为“0,5”，其中“0”表示“减少”，“5”表示数字间隔。

## Wie werden die Datenpunkte generiert
### 1）Auslesen aller Kommunikationsobjektreferenzen（im folgenden KOR）
Dabei werden den Gruppenaddressreferenz（im folgenden GAR）ID's der jeweilige DPT der KOR zugeordnet，wenn er vorhanden ist。 Ausserdem bekommt der erste Eintrag die属性write = yes und read = no。 Alle darauf folgenden GAR ID的bekommen nur den DPT zugeordnet

### 2）Erzeugen der Gruppenadressstruktur（im folgenden GAS）
Hier wird死于GAS anhand der GAR ID的erzeugt und ebenfalls死于DPT的zugeordnet，坠落死亡1）noch nicht geschehen ist。

### 3）Herausfinden der Schalt- und Statusaddressen
在dem ETS Export sind die Schalt- und Statusadressen nicht hinterlegt。 SomitführeicheineÄhnlichkeitsprüfungransupGruppenadressnamen durch mit der Auswertung auf status und state。
WirdeinPärchengefunden，dessenÄhnlichkeitmehrals 90％beträgt，dann wird angenommen，das die GA1 die Schaltadresse und GA2 die Statusadresse ist。 DabeiehältGA1das write = true und read = false und GA2 das write = false und read = true。
Ausserdem werden die DPT abgeglichen aus der jeweilig korrespondierenden GA。 Aus diesem Grund ist es schwierig，Pärchenzufinden，wenn die Gruppenadressbeschriftungen nicht konsistent sind。

Weiterhin werden die dendenGerätekonfigurationenbetrachtet。 Dabei werden die Flags wie folgt umgesetzt：

| KNX ||| iobroker |||
|莱森| Schreiben | Übertragen| Lesen | Schreiben | Erklärung|
|-----------------------------------------------------------|
| -  | -  | -  | -  | -  | der wertwirdüberGroupValueResponseaktualiesiert |
| x | -  | -  | x | x | ein TriggerdarauflöstGroupValueReadaus |
| -  | x | -  | -  | x | Schreibt den angegeben Wert mit GroupValueWrite auf den KNX-Bus |
| -  | -  | x | x | -  | der WertwirdüberGroupValueResponseaktualisiert |
| x | -  | x | x | x | ein TriggerdarauflöstGroupValueReadaus |

### 4）Erzeugen der Datenpunktpaaren（im folgenden DPP）
Ein DPP wird erzeugt，wenn die GA，GAR und der DPT .....ind。 Mit diesen DPP arbeitet der Adapter。 Fehlen也死于DPT的einer GA，weil sie auf keiner der o。 A. Wege gefunden werden konnte，所以w w f f f f GA GA DP DP DP DP DP DP DP DP DP DP DP DP DP DP B.::::::::::::::::::::::::::::::::::::

Im Idealfall werdensomitfüreinenSchaltkanal 2 DPP erzeugt。 Das erste ist das Schalten。在diesem ist die GAR ID des Status DPP hinterlegt。 Das zweite ist dann das Status DPP ohne weitere Refenrenz。

## Beim Start des Adapters
Alle mit dem Lesen-Flag markieren DPP werden beim Start abgefragt。死亡verursacht u.U. einehöhereBuslastund dauert einen Moment。 Im Anschluss sind aber alle aktuellenWerteverfügbar。

##（隐藏）功能：
Durch senden eines Wertes auf eine Statusadresse werden die Kommunikationsobjekte innerhalb dieser Gruppenadresse per GroupValueRead abgefragt。

### Vermeidung von Problemsmen
1）saubere ETS Programmierung und saubere ETS Programmierung und saubere ETS Programmierung

* zuweisen der DPT !!
* einheitliche Beschriftung der GA-Namen（z.B“EG Wohnen Decke Licht schalten”und“EG Wohnen Decke Licht schalten status”）
* Vermeidung von Sonderzeichen“，。/; \＆％$§[]”（kann zu Problemen bei der Erzeugung derGASführen）

2）Prüfenobdas KNX / LAN GW erreichbar ist。 Wenn es das nicht ist，versucht der Adapter sich kontinuierlich zu verbinden。

3）Physikalische Adresserichtigwählen（wichtig beim Einsatz von Linienkopplern）。 ！ ACHTUNG：die hier eingetragene physikalische Adresse ist NICHT die Adresse des LAN Gateways und darf nicht auf 0 enden !!!

4）Der Port der LAN Schnittstelle ist i.d.R. 3671

5）DurchdieMöglichkeitderStatusabfrage ist eines zu beachten：Es ist sicherzustellen das nicht mehr als 40 Anfragen pro Sekunde vom ioBroker generiert werden，denndiesekönnenhannphysikalisch bedingt nicht mehr durch den Adapter an das Gateway weitergereicht werden。

##计划功能
*将对象添加到对象描述（id）
*选择性导入knx项目
*需要节点版本> 8.9.4！

## Changelog
### 1.0.33 (2019-09-12)
* fixed bug while writing to bus
* added units to states
* fixed "read/write of undefined" error

### 1.0.32 (2019-09-03)
* updated importer for ETS V5.7.2, some changes in KNX-stack statemachine

### 1.0.31
* some fixes on ETS5.7.2 importer
* small changes in knx-stack statemachine
* added (again) phys address to admin config dialog

### 1.0.31
* fixed bug in deviceTree generation

### 1.0.30
* new Importer for ETS5.7.2 knxproj files
* extended accepted Datapointtypes
* new adapter configuration menu
* implemented a switch for the user to decide to use "true" and "false" or "0" or "1" for binary values
* fixed bug in GroupValue_Read
* implemented a selector for local network interface for KNX to Gateway communiction
* extended State Object for later features
* fixed some small other bugs

### 1.0.20
* fixed bug in handling KNX-data packages, which occures periodical reconnects
* fixed bug in KNX-projectfile upload procedure

### 1.0.19
* reverted to true/false handling for DPT1.x

### 1.0.18
* fixed upload issue with ETS5.6.x project files
* switched values for "boolean" from 1 and 0 to true false 
* fixed recognition of role set for DPT1.x to switch
* fixed DPT16.xxx writing to KNX-Bus with values < 14Byte

### 1.0.17 (2018-08-16)
* Better state processing
* Add configurable package rate
* corrected Bug in "import only new objects"

### 1.0.15 (2018-07-18)
* change ChID on reconnect
* on Startup read wait for response of Statechannel or timeout

### 1.0.13 (2018-07-04)
* elemination of special signs while importing
* small bugfixes

### 1.0.12 (2018-06-19)
* reduced and sorted log output
* small bugfixes
* NEW Feature: request State/Val of stateObject from KNX-Bus

### 1.0.11 (2018-05-27)
* fixed DPT1 correcting value problem
* fixed reconnect problem
* other small optimizations and fixes

### 1.0.10 (2018-05-04)
* closing local port in case of undefinded connection state
* added advanced debug-level via adapter-config
* many fixes

### 1.0.9 (2018-04-29)
* changed to state-wise processing
* fixed "disconnect-request"
* changed connection handling with knxd
* many small fixes

### 1.0.8 (2018-04-04)
* modified package queue
* fixed ACK if sending to KNX-Bus
* many small fixes

### 1.0.7 (2018-03-16)
* fixed Adapter-lock while uploading projects

### 1.0.6 (2018-03-11)
* fixed connection problem
* corrected package counter

### 1.0.5 (2018-03-01)
* fixed empty objects, related to DPT1 (error message [object Object] unkown Inputvalue)
* fixed path variable
* fixed bug with GA's containing a "/" in the name (on proj-import)
* start implementing crosswise propery update on corresponding DPT (on proj-import)

### 1.0.4 (2018-02-27)
* schema update for room enumeration coming up with ETS 5.6

### 1.0.2 (2018-02-27)
* kleine Fehler beseitigt

### 1.0.1 (2018-02-26)
* fixed certifate error

### 1.0.0 (2018-02-25)
* substitution of used KNX-stack with own from scratch build stack
* implemented full scale of DPT according to "System Specifications, Interworking, Datapointtypes" from KNX Association
* hardening connection handling for tunneling connections
* upgrade Adapterconfiguration Interface to be ready with Admin3
* removed "Delay Slider" because of the new knx-stack
* many other small changes
* fixed postcomma values to scale-value of DPT
* implemented "add" mode for knxproject upload (existing Objects stay as they are, only new Objects where added)

### 0.8.6 (2017-06-17)
* some small bugfixes
* insert slider to set a sendDelay for slow KNX/LAN Gateways to prevent connection loss

### 0.8.5 (2017-06-05)
* project loader rebuild, dpt13-fix

### 0.8.3 (2017-04-24)
* added act channel update of corresponding state
* fix bug in state-vis update
* optimized knxproj upload

### 0.8.2 (2017-02-26)
* implemented device-config parsing from knxproj
* better choice of state/val of DP objects

### 0.8.1 (2017-02-06)
* fixed DPT1 switch problem

### 0.8.0 (2017-02-xx) comming soon

### 0.7.3 (2016-12-22)
* (chefkoch009) more DPT's are supported
* faster Startup
* implemented generation of room list with device dependicies

### 0.7.2 (2016-11-20)
* (chefkoch009) added necessary dependicies

### 0.7.1 (2016-11-19)
* (chefkoch009) Support standard KNX/LAN Gateways.

### 0.7.0 (2016-10-13)
* (chefkoch009) Support of project export

### 0.6.0 (2016-07-20)
* (chefkoch009) redesign

### 0.5.0
  (vegetto) include vis widget

#### 0.4.0
* (bluefox) fix errors with grunt

#### 0.2.0
* (bluefox) initial release

## License
The CC-NC-BY License (CC-NC-BY)

Copyright (c) 2016-2018 K.Ringmann <info@punktnetzwerk.net>

THE WORK IS PROVIDED UNDER THE TERMS OF THIS CREATIVE
COMMONS PUBLIC LICENSE ("CCPL" OR "LICENSE"). THE WORK IS PROTECTED BY
COPYRIGHT AND/OR OTHER APPLICABLE LAW. ANY USE OF THE WORK OTHER THAN AS
AUTHORIZED UNDER THIS LICENSE OR COPYRIGHT LAW IS PROHIBITED.

BY EXERCISING ANY RIGHTS TO THE WORK PROVIDED HERE, YOU ACCEPT AND AGREE
TO BE BOUND BY THE TERMS OF THIS LICENSE. TO THE EXTENT THIS LICENSE MAY
BE CONSIDERED TO BE A CONTRACT, THE LICENSOR GRANTS YOU THE RIGHTS
CONTAINED HERE IN CONSIDERATION OF YOUR ACCEPTANCE OF SUCH TERMS AND
CONDITIONS.

Read full license text in [LICENSE](LICENSE)