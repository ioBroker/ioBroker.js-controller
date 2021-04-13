---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.fb-checkpresence/README.md
title: 无题
hash: DMvFhWFPYeS5t66i2pAeuERPxhK73GromMQBTBGJUmE=
---
![安装数量](http://iobroker.live/badges/fb-checkpresence-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.fb-checkpresence.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.fb-checkpresence.svg)
![依赖状态](https://img.shields.io/david/afuerhoff/iobroker.fb-checkpresence.svg)
![已知漏洞](https://snyk.io/test/github/afuerhoff/ioBroker.fb-checkpresence/badge.svg)
![NPM](https://nodei.co/npm/iobroker.fb-checkpresence.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/afuerhoff/ioBroker.fb-checkpresence/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/afuerhoff/ioBroker.fb-checkpresence?branch=master&svg=true)

<h1><img src="admin/fb-checkpresence.png" width="64"/>ioBroker.fb-checkpresence</h1>

## IoBroker的fb-checkpresence适配器
适配器检查在炸弹箱上是否存在家庭成员。
您必须填写家庭成员的名称和所用设备的mac地址（或ip地址）。
注释是可选的，您可以启用或禁用家庭成员。
数据点基于成员名称。

###适配器前提条件
为了获得正确的功能，您必须安装历史记录适配器。您可以选择以下适配器之一：

* 历史
* SQL
* InfluxDB

##二手设备
对于此适配器，使用AVM Fritzbox。在这里，您可以找到有关Fritzbox的信息https://avm.de/produkte/fritzbox/。
fritzbox服务通过TR-064协议使用。

### Fritzbox条件
此处描述了来自炸弹箱的二手TR-064接口：https：//avm.de/service/schnittstellen/。
使用了以下TR-064服务和操作：

*主机：1-X_AVM-DE_GetHostListPath（自2017年1月9日以来受支持）
*主机：1-X_AVM-DE_GetMeshListPath
*主机：1-GetSpecificHostEntry
*主机：1-X_AVM-DE_GetSpecificHostEntryByIP（自2016年5月18日开始受支持）
* DeviceInfo：1-GetSecurityPort
* DeviceInfo：1-GetInfo
* WANPPPConnection：1-GetInfo
* WANIPConnection：1-GetInfo
* WLANConfiguration3-设置启用
* WLANConfiguration3-GetInfo
* WLANConfiguration3-GetSecurityKeys
* X_AVM-DE_HostFilter-DisallowWANAccessByIP
* X_AVM-DE_HostFilter-GetWANAccessByIP
* DeviceConfig：1-重新启动
* LANConfigSecurity1-X_AVM-DE_GetCurrentUser

默认情况下，TR-064接口未激活。但是，可以通过FritzBox Web界面轻松更改此设置。为此，请登录到FritzBox并确保激活了专家视图。
然后，您将在“家庭网络»家庭网络概述»网络设置”下面找到“允许访问应用程序”。在那里，您必须激活复选框，然后重新启动FritzBox。

提示：更改选项后，不要忘记重新启动Fritzbox！<img src="doc/access_settings_network.JPG"/>

##配置对话框
＃＃＃ 一般的
验证配置值，并且只能保存正确的值。否则，保存按钮将被禁用。

### Fritzbox IP地址，用户名和密码
要从fritzbox中获取设备数据，必须配置ip地址，用户名和密码。
因此，必须在fritzbox中创建一个用户。对于fritzbox的较新固件版本（> = 7.25），这是必需的。请参阅此处的有关信息：https://avm.de/fileadmin/user_upload/Global/Service/Schnittstellen/Empfehlungen%20zur%20Benutzerfu%CC%88hrung%20bei%20der%20Anmeldung%20an%20einer%20FRITZ%21Box_v1.1.pdf密码已加密，未以明文形式保存。用户名和密码最多可以包含32个字符。参见信息：https://service.avm.de/help/de/FRITZ-Box-Fon-WLAN-7490/014/hilfe_zeichen_fuer_kennwoerter#:~:text=Namen%20f%C3%BCr%20Benutzer,Kennwortfeld%20darf ％20nicht％20leer％20sein。

### Ssl选项
在某些情况下，适配器无法连接到fritzbox。禁用此选项可能会有所帮助。
在这种情况下，适配器尝试不使用https进行连接。

＃＃＃ 间隔
家庭成员和Fritzbox设备的间隔时间是分开的。
Fritzbox设备的间隔可以配置为1到59分钟。通常，1到5分钟之间的值是读取fritzbox数据的最佳间隔。家庭成员的配置时间可以从10秒到600秒。如果前一个周期结束，则每个新周期都会开始。

###过滤时间
如果筛选时间大于0s，则在状态更改为false时（在筛选时间之后）检查一次家庭成员的状态两次。如果状态为true，则立即设置状态。

###历史记录适配器
在历史记录适配器上，将计算一些值。如果使用历史记录，则可以选择sql或influxdb适配器进行此计算。历史记录适配器必须预先安装，然后可以在配置对话框中选择。
如果禁用历史记录配置，则无法实现某些值的计算。

＃＃＃ 日期格式
日期格式掩码选项在以下网页上进行了描述：https://www.npmjs.com/package/dateformat。
格式掩码用于格式化html和json表对象。

###创建FB设备
如果选中此选项，则会为Fritzbox设备列表中的每个设备创建对象。
如果禁用此选项，则还将禁用网格信息。

### FB设备对象的重新同步
如果选中此选项，则FB设备对象将与Fritzbox的设备列表重新同步。

###创建网格信息
如果允许创建FB设备，则可以选中此选项。如果选中此选项，则会为Fritzbox设备列表中的每个设备创建网格对象。

###客人信息
如果选中此选项，则会创建来宾的状态。

###二维码生成
如果选中此选项，则会生成来自来宾无线局域网的二维码。

###家庭成员设置
对于已配置的家庭成员，您应该输入成员名称，主机名，mac和ip地址，注释，然后可以启用或禁用该成员。组是可选的。如果将组保留为空，并将兼容性标志设置为true，则行为类似于旧版本的适配器。在将来的版本中，您必须使用家人的状态。使用兼容性复选框打开/关闭此行为：->兼容性= true：行为与具有空组的旧版本相同。
->兼容性=否：新行为。家庭成员文件夹下的所有州。
适配器为每个成员创建一个状态，并检查该成员是否存在。如果状态更改，则状态也会更改。您还可以为成员启用过滤。如果状态为true，则状态立即变为true。如果为假，则将在过滤时间之后再次检查该值。
如果两种情况下的状态均为假，则状态更改为假。否则它不会改变。
要获得对象中的速度信息，必须选择fb-devices选项。

###白名单设置
在白名单中，您可以插入每个已知的设备。黑名单对象中列出了所有未知设备。
如果您选中表格标题中的复选框，则会选中所有设备。

＃＃ 特征
### AVM支持检查
该功能检查已使用的fritzbox功能的可用性。可用性记录为信息。如果有问题，请查看所有功能是否都设置为true。如果访问权限不正确，还将检查用户的访问权限，并将功能设置为false。

###开启/关闭访客无线局域网
在guest虚拟机文件夹下，您可以将状态wlan设置为true或false，然后guest虚拟机wlan开启或关闭。

###访客无线局域网的QR码
来宾wlan的QR码保存在来宾文件夹中的状态wlanQR中。 QR代码可以在基本的Bool SVG小部件中可见显示。

###开启/关闭Fritzbox设备的互联网访问
在文件夹FB-devices下，您可以将禁用状态设置为true或false，并且该设备的Internet访问在Fritzbox中被阻止。

###吸引客人进入黑名单
在此功能中，检查是否有任何用户以访客身份登录。还检查是否有任何设备不在列出的白名单中。
该设备已添加到黑名单中。

###活跃起来
如果选择了历史记录适配器，则将为每个家庭成员计算在场，来临和去世日期以及其他一些信息，并将其保存在成员对象中。

###主机号，活动设备
设备的数量以及活动设备的数量可从fritzbox中获得。

##对象
###对象的存在
如果所有家庭成员都在场，则该对象为真。

###对象存在
如果存在一个家庭成员，则该对象为真。

###对象设备
这些都是fritzbox中列出的所有设备

###对象activeDevices
这些是fritzbox中所有活动设备的数量

###对象html，json
这些对象是表（json和html），其中包含所有家庭成员的来往信息。

###对象信息
以下是有关适配器的最新更新和连接状态的信息。

###对象来宾
以下列出了有关活动来宾和表对象（其中包含设备信息）数量的信息。

###对象黑名单
以下列出了有关未知设备数量和其中包含未知设备信息的表对象的信息。

###对象member.present
在这里，您将找到有关当日成员在场的信息以及自上次更改以来该成员的状态为真多久的信息。

###对象member.absent
在这里，您可以找到有关当日缺少成员以及该成员自上次更改以来一直处于错误状态的信息。

###对象member.comming，member.going
在这里，您将找到家人抵达或离开家时的信息。

###对象member.history，member.historyHtml
在这里，您将找到有关当天历史的信息。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ## __WORK IN PROGRESS__
    * Did some changes
    * Did some more changes
-->
### 1.1.3 (2021-03-31)
* (afuerhoff) family groups implemented
* (afuerhoff) compatability mode implemented
* (afuerhoff) dependencies updated
* (afuerhoff) configuration options added
* (afuerhoff) dialogboxes optimized
* (afuerhoff) translations updated
* (afuerhoff) general program structure optimized
* (afuerhoff) filter for family members implemeted
* (afuerhoff) password handling updated
* (afuerhoff) documentation updated

### 1.1.2 (2021-01-13)
* (afuerhoff) QR-Code implemented
* (afuerhoff) setState presence only if changed
* (afuerhoff) access rights implemented
* (afuerhoff) use name for presence
* (afuerhoff) active / inactive devices
* (afuerhoff) interval 10s bug fixed
* (afuerhoff) documentation edited 

### 1.1.1 (2020-12-27)
* (afuerhoff) Configuration optimized
* (afuerhoff) Bugfix dateformat pattern
* (afuerhoff) SSL (https) workaround implemented
* (afuerhoff) Connection check optimized
* (afuerhoff) Documentation added
* (afuerhoff) Mesh handling optimized 

### 1.1.0 (2020-10-24)
* (afuerhoff) second interval for family members implemented
* (afuerhoff) mesh info added
* (afuerhoff) configuration validation added
* (afuerhoff) switch on, off guest wlan
* (afuerhoff) switch on, off internet access of devices 
* (afuerhoff) structural changes
* (afuerhoff) code optimization

### 1.0.4 (2020-06-28)
* (afuerhoff) bugfix json list and guest handling, new object guest.presence

## License
MIT License

Copyright (c) 2019-2021 Achim Fürhoff <achim.fuerhoff@outlook.de>

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