---
lastChanged: 09.01.2019
local: true
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.hm-rpc/README.md
title: HomeMatic RPC
hash: 1O7kQJdss1SQKcqoLSdzCOhUQWxAXD2BjOmS727c/E4=
---
![徽标](../../../de/adapterref/iobroker.hm-rpc/media/homematic.png)

#HomeMatic RPC
## Homematic
> Homematic是eQ-3的智能家居系统，可以对家庭或公寓中的各种场景（从简单到复杂）进行全面控制。

&gt;这些设备包括用于照明，卷帘和加热控制的产品，危险探测器，安全传感器和气象数据测量产品。无线电通信简化了改造。在新建筑物中，可以使用线路总线组件。 <a href="https://www.eq-3.de/produkte/homematic.html" title="制造商eQ3的主页">源</a>

##使用ioBroker管理和控制homematic组件
要使用ioBroker以最佳方式管理和控制主题组件，需要两个适配器：

### 1. Homematic ReGaHss
该适配器连接到本地逻辑层“ReGaHSS”（** Re **sidential** Gateway）。
它在Homematic和ioBroker之间同步真实姓名，系统变量，房间，交易和程序。

### 2. Homematic RPC
** R **示** P** rocedur **C** all，简称RPC是一种实现进程间通信的技术。该适配器提供与主题中央单元（CCU / CCU2 / CCU3 ...）的通信模块的连接。支持模块rfd（无线电），HMIP-rfd，hs485d（有线），CuxD（用于连接外部组件的附加软件，如EnOcean，FS20等）和Homegear（CCU替换）。

此图说明了结构和通信接口：

![](../../../de/adapterref/iobroker.hm-rpc/media/Homematic_Aufbau.png)

[源](http://www.wikimatic.de/wiki/Datei:Homematic_Aufbau.png)

## Adapter Homematic RPC
该适配器提供与主题中央单元（CCU / CCU2 / CCU3 ...）的通信模块的连接。适配器的实例负责准确的ON模块（rfd，有线等）。如果要并行支持多个模块，则必须为每个模块安装单独的实例。

适配器通过BIN-RPC或XML-RPC与相应的模块通信。由于使用了事件接口，因此正确的寻址非常重要。因此，事件自动传输到适配器，并且不需要循环轮询。

此外，适配器还具有循环监视与CCU连接的功能。

如果在CCU中示教新设备，则必须使用“Initiate devices new（once）”配置重新启动适配器。这会将信息从新的家庭设备传输到适配器。

##配置
###主要设置
### HomeMatic地址
运行Homematic BidCos服务的CCU或主机的IP地址。

### HomeMatic Port
端口的设置取决于所需的通信模块，在选择守护程序时自动输入，并且只有在端口偏离标准时才应更改。

默认情况下，提供以下端口：

|通讯模块|标准端口| HTTPS端口|
|---------------------|--------------|------------|
|无线电（RFD）| 2001 | 42001 |
|有线| 2000年| 42000 |
| CUxD | 8701 | \  -  |
| Homematic IP | 2010 | 42010 |

###守护进程
CCU / Homematic支持不同的设备类型（有线，无线，HMIP，CUxD）。对于每种类型，必须创建单独的实例。

###协议
为通信提供了两种协议：XML-RPC和BIN-RPC。

* CUxD需要BIN-RPC协议; HMIP和RFD XML-RPC协议。*

###再次同步设备（一次）
首次启动适配器时，将读取所有设备。如果稍后在CCU中进行更改（重命名设备，添加新设备等），请激活此选择并使用“保存并关闭”重新启动适配器。

###适配器地址
下拉菜单选择安装适配器的主机的IP。选择“0.0.0.0 Listen to all IPs”和“127.0.0.1”是为特殊情况保留的。

###适配器端口
默认情况下，此处设置端口“0”以自动选择ioBroker端口，并且只应在特殊情况下进行更改。

##其他设置
###适配器回调地址
如果ioBroker在路由器后运行（例如，在Docker容器中），则输入和输出地址可能不同。如果在此输入路由器的IP，则可以避免出现问题，因为转发到ioBroker将由路由器接管。

###连接检查间隔（秒）
在指定的时间间隔，ping请求被发送到CCU。

###重新连接间隔（秒）
开始新连接尝试的时间。

###不要删除设备
默认情况下，如果已在CCU中学习设备，则也会从对象列表中删除设备。要将这些设备保留在对象列表中，例如因为它们只是暂时删除，可以激活此选项。

###使用HTTPS
如果激活此选项，则建立安全连接。
仅适用于XML-RPC协议。

###用户名和密码
使用HTTPS或CCU的API需要身份验证时，必须在此处输入数据。

##实例
![例](../../../de/adapterref/iobroker.hm-rpc/media/10d34a2bc1518fa34233bdb04219e444.png)

在ioBroker的* Instances *下，您将找到已安装的适配器实例。在左侧，红绿灯系统可视化适配器是否已激活并连接到CCU。

如果将鼠标指针放在符号上，您将获得详细信息。

##适配器的对象
在“对象”区域中，CCU传输到适配器的所有值和信息都以树形结构显示。

显示的对象和值取决于设备（功能和通道）以及CCU内的结构。

控制面板标有ID BidCoS-RF（包括所有虚拟按键），设备在其序列号下创建，组标有INT000000 *x*

###频道0（所有设备）
按照简要概述，为每个设备创建此通道并包含功能数据：

| *数据点* | *含义* |
|--------------------------------|--------------------------------------------------------|
| AES_Key |加密激活激活/非活动|
|配置（待处理/待处理警报）|待配置|
| Dutycycle / Dutycycle Alarm | Airtime Homematic Devices |
| RSSI（设备/对等）|无线电强度（设备\ < - >中央）|
|低蝙蝠/低蝙蝠警报|电池电量低|
| Sticky unreach / unreach alarm |系统消息通信错误（发生故障）|
| Unreach / unreach警报|系统消息通信错误（当前状态）|

###频道1-6
这里列出了测量值，控制和状态数据;根据设备的功能，显示不同的数据。这是一个简短的摘录：

| *功能* | *频道* | *可能的值* |
|-------------------------|---------|-----------------------------------------------------------|
|传感器| 1 |温度，湿度，水平，开启条件等|
|加热恒温器| 4 |运行模式，设定值/实际温度，阀门位置等|
|执行器| 1 |水平（卷帘，调光），行进方向（卷帘）等
|具有测量功能的设备| 3 |状态|
| | 6 |消耗仪表，电压，功率等|

##常见问题

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

### 1.14.36 (2021-04-14)
* (foxriver76) error handling improved when deleting obsolete devices/channels
* (foxriver76) if no message id provided on `sendTo`, we do not send `undefined` params anymore (fixes #318)

### 1.14.35 (2021-02-13)
* (foxriver76) virtual devices now support ping, so use it, else it can be that instance won't register at CCU again (fixes #308)

### 1.14.34 (2021-02-11)
* (foxriver76) use async rpc calls for better error handling
* (foxriver76) now log error events received by XML-RPC
* (foxriver76) detect invalid params and log instead of crash

### 1.14.33 (2021-01-30)
* (foxriver76) fix problems with CuxD and HMIP (fixes #307)
* (foxriver76) more palces where we now log message on real errors instead of error object

### 1.14.32 (2021-01-29)
* (foxriver76) revert received messages with invalid command
* (foxriver76) log message on real errors instead of error object
* (foxriver76) fix for crashes on decrypt

### 1.14.31 (2021-01-15)
* (foxriver76) fixed default values of HMIP value list states

### 1.14.30 (2021-01-10)
* (foriver76) in general reject events of unregistered devices, see #298

### 1.14.29 (2021-01-09)
* (foxriver76) do not set PONG state anymore

### 1.14.26 (2021-01-05)
* (foxriver76) match clientId with namespace to find correct units

### 1.14.25 (2021-01-04)
* (foxriver76) we now use a unique id to connect for each client taking the hostname into account

### 1.14.24 (2020-10-15)
* (foxriver76) fixed error with some blinds if no adapter restart has been performed

### 1.14.23 (2020-09-03)
* (foxriver76) `value.temperature` will have unit °C no matter of delivered unit by CCU

### 1.14.21 (2020-08-18)
* (foxriver76) fixed virtual-devices objects being recreated on instance startage (#271)

### 1.14.20 (2020-08-17)
* (foxriver76) fix for % scaling of float numbers

### 1.14.19 (2020-08-16)
* (foxriver76) now logging exact command on error

### 1.14.18 (2020-08-08)
* (foxriver76) fix issue when CuxD listDevices does not deliver valid array
* (foxriver76) fix error with % scaling in some edge cases

### 1.14.15 (2020-07-21)
* (foxriver76) fix bug on forced reinitialization run

### 1.14.14 (2020-07-10)
* (bluefox) Added roles for presence sensor

### 1.14.13 (2020-07-07)
* (foxriver76) fix edge case on EPAPER command (IOBROKER-HM-RPC-5Z)
* (foxriver76) Catch error on `createDevices` if CCU does not deliver valid ADDRESS (IOBROKER-HM-RPC-5X)

### 1.14.12 (2020-07-03)
* (foxriver76) Continue execution if error on retrieving a paramset from CCU

### 1.14.11 (2020-06-21)
* (bluefox) Change name of Instance according to the role (RF, Wired, HMIP)

### 1.14.10 (2020-06-14)
* (foxriver76) removed meta data caching completely because meta data can be dynamic due to FW update or CuxD

### 1.14.6 (2020-06-05)
* (foxriver76) added some hmip roles for channel 0

### 1.14.5 (2020-05-29)
* (foxriver76) fixed edge case problem IOBROKER-HM-RPC-5E

### 1.14.4 (2020-05-28)
* (jens-maus) updated all device images to latest ones include hmip-wired ones

### 1.14.3 (2020-05-18)
* (foxriver76) catch edge case error if row.value has no native 

### 1.14.2 (2020-04-24)
* (foxriver76) catch errors on rpc client creation

### 1.14.1 (2020-04-23)
* (foxriver76) catch potential errors on createServer
* (foxriver76) new meta data approach: we only store meta data gathered by the user,
otherwise cached meta data can be very old and outdated, we have to monitor performance
of this approach (more requests to CCU on first setup)
* (foxriver76) add name and icon to meta folder
* (foxriver76) minor code improvements

### 1.13.0 (2020-04-02)
* (foxriver76) sentry plugin support

### 1.12.10 (2020-03-05)
* (foxriver76) fixed no 'dpType for ..' error in all cases

### 1.12.9 (2020-02-29)
* (foxriver76) replace DISPLAY_DATA_STRING by DIN_66003 encodings

### 1.12.8 (2020-02-26)
* (foxriver76) improved error handling on undefined methods

### 1.12.7 (2020-02-16)
* (foxriver76) if role "value.window" is a boolean it is now correctly a "sensor.window"

### 1.12.6 (2020-01-08)
* (foxriver76) make all LEVEL dps of unit % if they are w.o. unit and have min/max

### 1.12.5 (2020-01-06)
* (foxriver76) handle some meta data more abstract
* (foxriver76) make DIMMER_REAL.LEVEL of unit '%' even it is not by definition

### 1.12.2 (2019-12-19)
* (foxriver76) fix issue on https with less robust ccu emulations

### 1.12.1 (2019-12-06)
* (foxriver76) fixed problem with max values of value lists

### 1.12.0 (2019-12-05)
* (foxriver76) no longer use adapter.objects
* (foxriver76) js-controller v > 2 required

### 1.11.1 (2019-11-20)
* (foxriver76) LOCK.OPEN is now of type button to prevent misunderstandings

### 1.11.0 (2019-11-10)
* (foxriver76) make OFFSET and REPEATS of epaper configurable
* (foxriver76) EPAPER_SIGNAL is now type string

### 1.10.3 (2019-10-27)
* (foxriver76) fixed info channel

### 1.10.2 (2019-10-24)
* (foxriver76) replace min max values of hmip with correct numbers 

### 1.10.0 (2019-08-12)
* (foxriver76) new meta data handling procedure
* __js-controller >= 1.4.2 required__

### Older entries
[here](OLD_CHANGELOG.md)

## License

The MIT License (MIT)

Copyright (c) 2014-2020 bluefox <dogafox@gmail.com>

Copyright (c) 2014 hobbyquaker

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