---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.fb-checkpresence/README.md
title: 无题
hash: W3a3b6e6cA34+u0NlNaRWYzKCxwgJbsPlTwrQt6446M=
---
![安装数量](http://iobroker.live/badges/fb-checkpresence-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.fb-checkpresence.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.fb-checkpresence.svg)
![依赖状态](https://img.shields.io/david/afuerhoff/iobroker.fb-checkpresence.svg)
![已知漏洞](https://snyk.io/test/github/afuerhoff/ioBroker.fb-checkpresence/badge.svg)
![NPM](https://nodei.co/npm/iobroker.fb-checkpresence.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/afuerhoff/ioBroker.fb-checkpresence/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/afuerhoff/ioBroker.fb-checkpresence?branch=master&svg=true)

<h1><img src="admin/fb-checkpresence.png" width="64"/> ioBroker.fb-checkpresence </h1>

## IoBroker的fb-checkpresence适配器
适配器检查在炸框上是否存在家庭成员。
您必须填写家庭成员的名称和所用设备的mac地址（或ip地址）。
注释是可选的，您可以启用或禁用家庭成员。
数据点基于成员名称。

###适配器前提条件
为了获得正确的功能，您必须安装历史记录适配器。您可以选择以下适配器之一：

*历史
* SQL
* InfluxDB

##二手设备
对于此适配器，使用AVM Fritzbox。在这里您可以找到有关Fritzbox的信息https://avm.de/produkte/fritzbox/。
fritzbox服务通过TR-064协议使用。

### Fritzbox条件
此处描述了来自炸弹箱的二手TR-064接口：https：//avm.de/service/schnittstellen/。
使用了以下TR-064服务和操作：

*主机：1-X_AVM-DE_GetHostListPath（从2017-01-09开始支持）
*主机：1-GetSpecificHostEntry
*主机：1-X_AVM-DE_GetSpecificHostEntryByIP（从2016-05-18开始支持）
* DeviceInfo：1-GetSecurityPort
* WANPPPConnection：1-GetInfo
* WANIPConnection：1-GetInfo
* DeviceInfo：1-GetInfo

默认情况下，TR-064接口未激活。但是，可以通过FritzBox Web界面轻松更改此设置。为此，请登录到FritzBox并确保激活了专家视图。
然后，您将在“家庭网络»家庭网络概述»网络设置”下面找到“允许访问应用程序”。在那里，您必须激活复选框，然后重新启动FritzBox。

提示：更改选项后，不要忘记重新启动Fritzbox！ <img src="doc/access_settings_network.JPG"/>

##配置对话框
### Fritzbox IP地址，用户名和密码
要从fritzbox中获取设备数据，必须配置ip地址，用户名和密码。
密码已加密，未以明文形式保存。

###时间间隔
间隔可以配置为1到59分钟。通常，1到5分钟的值是读取fritzbox数据的最佳间隔。

###历史记录适配器
在历史记录适配器上，将计算一些值。如果使用历史记录，则可以选择sql或influxdb适配器进行此计算。历史记录适配器必须预先安装。

＃＃＃ 日期格式
日期格式掩码选项在以下网页上描述：https：//www.npmjs.com/package/dateformat。
格式掩码用于格式化html和json表对象。

###家庭成员设置
对于已配置的家庭成员，您必须输入名称，mac或ip地址，注释，以及是否允许该成员进行计算。适配器为每个成员创建数据对象，并检查该成员是否存在。

###白名单设置
在白名单中，您可以插入每个已知设备。黑名单对象中列出了所有未知设备。
如果您选中表格标题中的复选框，则会选中所有设备。

＃＃ 特征
### AVM支持检查
该功能检查使用的fritzbox功能的可用性。可用性记录为信息。

###吸引客人进入黑名单
在此功能中，检查是否有任何用户以访客身份登录。还检查是否有任何设备不在列出的白名单中。
该设备已添加到黑名单中。

###活跃起来
对于每个家庭成员，其存在，到来日期和其他一些信息都会被计算并保存在成员对象中。

###主机号，活动设备
设备的数量以及活动设备的数量可从fritzbox获得。

##对象
###对象的存在
如果所有家庭成员都在场，则该对象为真。

###对象存在
如果一个家庭成员存在，则该对象为真。

###对象设备
这些都是fritzbox中列出的所有设备

###对象activeDevices
这些是fritzbox中所有活动设备的数量

###对象html，json
这些对象是表（json和html），其中包含所有家庭成员的来往信息。

###对象信息
这里列出了有关最后一次更新和适配器的连接状态的信息。

###对象来宾
以下列出了有关活动来宾和表对象（其中包含设备信息）数量的信息。

###对象黑名单
以下列出了有关未知设备数量和其中包含未知设备信息的表对象的信息。

###对象member.present
在这里，您将找到有关当日成员在场的信息以及该成员自上次更改以来一直为真状态的时间。

###对象member.absent
在这里，您可以找到有关当日缺少成员以及该成员自上次更改以来一直处于错误状态的信息。

###对象member.comming，member.going
在这里，您将找到家人抵达或离开家时的信息。

###对象member.history，member.historyHtml
在这里，您将找到有关当天历史的信息。

## Changelog

### 1.0.4 (2020-06-28)
* (afuerhoff) bugfix json list and guest handling, new object guest.presence

### 1.0.3 (2020-05-26)
* (afuerhoff) bugfix checking mac or ip

### 1.0.2 (2020-05-24)
* (afuerhoff) error handling optimized
* (afuerhoff) external ip implemented
* (afuerhoff) check if mac or ip are listed in fritzbox

### 1.0.1 (2020-04-12)
* (afuerhoff) error handling optimized
* (afuerhoff) history configuration optimized
* (afuerhoff) re-synchronisation of fb-devices implemented

### 1.0.0 (2020-03-30)
* (afuerhoff) Configuration dialog optimized
* (afuerhoff) fbdevice speed added
* (afuerhoff) present-, absentMembers inserted
* (afuerhoff) Ip address handling optimized
* (afuerhoff) iobroker functions changed to async
* (afuerhoff) instance.0 dependency fixed
* (afuerhoff) depricated request changed to axios

### 0.3.0
* (afuerhoff) Documentation optimized
* (afuerhoff) LastVal error fixed
* (afuerhoff) Json table failure fixed
* (afuerhoff) Connection type added
* (afuerhoff) Ipaddress default value changed
* (afuerhoff) New feature fb-devices added
* (afuerhoff) Error messages optimized
* (afuerhoff) Dateformat default value changed
* (afuerhoff) Debug info added
* (afuerhoff) GetDeviceInfo failure fixed
* (afuerhoff) Update testing

### 0.2.2
* (afuerhoff) outdated packages updated, documentation changed, 
  history dependency removed, onstate/objectChange removed, scheduler library removed,
  two fixes from publish review

### 0.2.1
* (afuerhoff) getGuests issue resolved, lastVal function and debug information optimized   

### 0.2.0
* (afuerhoff) debug and error information optimized, crypto dependency removed, service check and blacklist added   

### 0.1.0
* (afuerhoff) Influxdb added, debug information added

### 0.0.7
* (afuerhoff) Fix bug invalid date. Add debug information.

### 0.0.6
* (afuerhoff) bug in json and html table resolved

### 0.0.5
* (afuerhoff) configuration optimized

### 0.0.4
* (afuerhoff) calculation error resolved

### 0.0.3
* (afuerhoff) guest feature added

### 0.0.2
* (afuerhoff) optimized features

### 0.0.1
* (afuerhoff) initial release

## License
MIT License

Copyright (c) 2019-2020 Achim Fürhoff <achim.fuerhoff@outlook.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.