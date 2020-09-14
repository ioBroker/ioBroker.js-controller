---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.knx/README.md
title: ioBroker.knx
hash: a5XMy2RH028ypMZGZZKBxBTRMvIjemVroqfyQHtWmQM=
---
![商标](../../../en/adapterref/iobroker.knx/admin/knx.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.knx.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.knx.svg)
![NPM](https://nodei.co/npm/iobroker.knx.png?downloads=true)

＃ioBroker.knx
##说明
zh：该适配器允许从ETS导入knxproj文件。它会在KNX-groupaddress和ioBroker之间生成转换，并将设备放入房间（尤其是MobileUI）。

它连接到标准KNX / LAN网关。

开始之前：应该在ETS项目中设置com.Objects的每个DPT。每个设备都应分类到您的设施结构中。

＃＃ 特征：
*导入`knxproj`文件
*生成类似ETS的对象结构
*查找并组合行为渠道和状态渠道（启发式）
*在开始时更新所有状态
*在写入状态对象时发出对NX总线的读取
*整理房间的渠道

##适配器配置
安装此适配器后，打开适配器配置。填写：

### KNX网关IP
<IPv4格式的<KNX / Lan GW的IP>

＃＃＃ 港口
通常是3671端口。

###物理EIB地址
填写免费物理。与您的KNX体系结构相对应的地址，**但与您的KNX网关所拥有的地址不同！**

###调试级别
扩展适配器的输出级别以进行调试

###上传knxproj
您可以在此处以`knxproj`格式上传ETS导出。

成功导入后，将显示一个对话框，显示导入对象的数量。现在按“保存并关闭”，适配器应该启动。
启动适配器时，将读取所有带有read-Flag的groupAddresses。这可能需要一段时间，并且可能会在您的KNX总线上产生很高的负载。但是，您的可见值在启动后会更新。

###对象
这里是knx.0下的组地址树，就像您的ETS项目中一样。

###枚举
如果您的ETS中有带有相应设备的建筑结构，则会在此处显示。在“成员”下是该组中带有send-Flag的设备列出的组地址的名称。

###用法
如果适配器成功启动，您的数据点将可用于您想做的所有事情。

###数据点类型
根据KNX Association的“系统规范，互通，数据点类型”，所有DPT均可用。这意味着您可以得到2种信息类型：1）值或字符串2）逗号分隔的值或值数组（目前我还没有更好的处理方法）

例如，DPT5.001被编码为8位无符号整数。这给出一个值。 DPT3.007（控制调光）被编码为1Bit（布尔）+ 3Bit（无符号Int）。
结果是值如“ 0,5”，其中“ 0”表示“减少”，“ 5”表示间隔数。

## Wie werden死于Datenpunkte创始者
### 1）Auslesen aller Kommunikationsobjektreferenzen（im folgenden KOR）
ID的jeweilige DPT der KOR zugeordnet，Wen ervorhanden ist。属性写入=是和读取=否。 Alle darauf folgenden GAR ID的bekommen nur den DPT zugeordnet

### 2）Erzeugen der Gruppenadressstruktur（im folgenden GAS）
较高的级别是由GAS负责的，而GAR ID的建议是由DPT的zugeordnet负责的，而1月份之前是由负责人负责的。

### 3）Herausfinden der Schalt-和Statusaddressen
在ETS出口中，Schalt- und Statusadressen可能会提示。状态与州之间的联系方式。
Wird einPärchengefunden，dessenÄhnlichkeitmehr als，90％beträgt，Dann Wird angenommen，GA1，Schaltadresse和GA2或Statusadresse ist。 DabeierhältGA1 das write = true und read = false和GA2 das write = false und read = true。
APT的Ausserdem werden die DPT abgeglichen aus der jeweilig korrespondierenden GA。澳大利亚的Grund ist es schwierig律师事务所，Gruppenadressbeschriftungen律师事务所。

Weiterhin werden死在旗帜上。关于北威州的标志：

| KNX | | | iobroker | | |
|-------|-----------|------------|----------|----------|-------------------------------------------------|
|莱森|施瑞本| Übertragen|莱森|施瑞本| Erklärung|
| -| -| -| -| -| der wertüberGroupValueResponse aktualiesiert |
| x | -| -| x | x | ein触发器darauflöstGroupValueRead aus |
| -| x | -| -| x | Schreibt den angegeben Wert mit GroupValueWrite auf den KNX-Bus |
| -| -| x | x | -| der Wert wiberüberGroupValueResponse aktualisiert |
| x | -| x | x | x | ein触发器darauflöstGroupValueRead aus |

### 4）Erzeugen der Datenpunktpaaren（im folgenden DPP）
Ein DPP与erzeugt，GA，GAR和DPT有效结合。 Mit diesen DPP适配器适配器。 Fehlen还死于einer GA的DPT，即weil sie auf keiner der o。答：Wege gefunden werden konnte，所以我们很想知道GA维护DPP维护和维护。

Im Idealfall werden somitfüreinen Schaltkanal 2 DPP erzeugt。达斯特·达斯·沙尔滕。在疾病中，GAR ID des Status DPP提示者。状态DPP发生在Refenrenz。

## Beim Start des适配器
Lese-Flag markieren DPP律师事务所开始abgefragt。死于美国时刻了解Buslast和dauert einen时刻。 Im Anschluss罪恶了aktuellen Werteverfügbar。

##（隐藏）功能：
根据GroupValue的摘要，您可以在状态，地址，地址和地址等方面进行选择。

### Vermeidung von Problemen
1）Saubere ETS计划和Saubere ETS计划和Saubere ETS计划

* zuweisen der DPT ！！
* e-heinliitliche Beschriftung der GA-Namen（z.B“ EG Wohnen Decke Licht schalten”和“ EG Wohnen Decke Licht schalten身份”）
* Vermeidung von Sonderzeichen“，。/; \＆％$§[]”（Kans zu Problemen bei der Erzeugung der GASführen）

2）Prüfenob das KNX / LAN GW erreichbar ist。 Wenn es das nicht ist，Versucht der Adapter sich kontinuierlich zu verbinden。

3）Physikalische Adresse richtigwählen（wichtig beim Einsatz von Linienkopplern）。 !!! ACHTUNG：导致地址物理地址变高的地址是NIC Gateway地址和LAN网关地址以及地址0结束！

4）Der Port der LAN Schnittstelle ist i.d.R. 3671

5）状态服务器的状态更新：40秒钟后，代理服务器将关闭，网关网关将重新连接。

##计划中的功能
*将地址添加到对象描述（id）
*选择性导入knx-project
*要求节点版本> 8.9.4！

## Changelog
### 1.0.42 (2020_09_03)
* Fixed problem with missing index_m.html

### 1.0.41
* fixed bug on GroupValue_Response event
* corrected connection to Gira GW

### 1.0.40
* fixed some import errors for ETS 5.7.x
* fixed bug on GroupValue_Response event

### 1.0.39
* fixed import error

### 1.0.38
* fixed some bugs on import
* show warning if import-file ist password protected

### 1.0.37 (2010-01-31)
* update for ETS 5.7.3 import

### 1.0.36 (2019-10-16)
* some bugs fixed 

### 1.0.35 (2019-09-15)
* fixed permanent reconnects, if no traffic on knx-bus

### 1.0.34 (2019-09-15)
* changes on importer for detecting project-id

### 1.0.33 (2019-09-12)
* fixed bug while writing to bus
* added units to states
* fixed "read/write of undefined" error

### 1.0.32 (2019-09-03)
* updated importer for ETS V5.7.2, some changes in KNX-stack state-machine

### 1.0.31
* some fixes on ETS5.7.2 importer
* small changes in knx-stack statemachine
* added (again) phys address to admin config dialog

### 1.0.31
* fixed bug in deviceTree generation

### 1.0.30
* new Importer for ETS5.7.2 knxproj files
* extended accepted Data point types
* new adapter configuration menu
* implemented a switch for the user to decide to use "true" and "false" or "0" or "1" for binary values
* fixed bug in GroupValue_Read
* implemented a selector for local network interface for KNX to Gateway communication
* extended State Object for later features
* fixed some small other bugs

### 1.0.20
* fixed bug in handling KNX-data packages, which occurs periodical reconnects
* fixed bug in KNX-project file upload procedure

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
* on Startup read wait for response of State channel or timeout

### 1.0.13 (2018-07-04)
* elimination of special signs while importing
* small bug-fixes

### 1.0.12 (2018-06-19)
* reduced and sorted log output
* small bug-fixes
* NEW Feature: request State/Val of stateObject from KNX-Bus

### 1.0.11 (2018-05-27)
* fixed DPT1 correcting value problem
* fixed reconnect problem
* other small optimizations and fixes

### 1.0.10 (2018-05-04)
* closing local port in case of undefined connection state
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
* fixed empty objects, related to DPT1 (error message [object Object] unknown Input value)
* fixed path variable
* fixed bug with GA's containing a "/" in the name (on proj-import)
* start implementing crosswise property update on corresponding DPT (on proj-import)

### 1.0.4 (2018-02-27)
* schema update for room enumeration coming up with ETS 5.6

### 1.0.2 (2018-02-27)
* kleine Fehler beseitigt

### 1.0.1 (2018-02-26)
* fixed certificate error

### 1.0.0 (2018-02-25)
* substitution of used KNX-stack with own from scratch build stack
* implemented full scale of DPT according to "System Specifications, Interworking, Datapointtypes" from KNX Association
* hardening connection handling for tunneling connections
* upgrade Adapter-configuration Interface to be ready with Admin3
* removed "Delay Slider" because of the new knx-stack
* many other small changes
* fixed post-comma values to scale-value of DPT
* implemented "add" mode for knxproject upload (existing Objects stay as they are, only new Objects where added)

### 0.8.6 (2017-06-17)
* some small bug-fixes
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
* implemented generation of room list with device dependencies

### 0.7.2 (2016-11-20)
* (chefkoch009) added necessary dependencies

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

Copyright (c) 2016-2020 K.Ringmann <info@punktnetzwerk.net>

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