---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.solarviewdatareader/README.md
title: ioBroker.solarviewdatareader
hash: 05N10yWtxS1P7K3+raksbc/gr4OudAtGI2km5AIX8jw=
---
![商标](../../../en/adapterref/iobroker.solarviewdatareader/admin/solarviewdatareader.png)

![安装数量](http://iobroker.live/badges/solarviewdatareader-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.solarviewdatareader.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.solarviewdatareader.svg)
![依赖状态](https://img.shields.io/david/afuerhoff/iobroker.solarviewdatareader.svg)
![已知漏洞](https://snyk.io/test/github/afuerhoff/ioBroker.solarviewdatareader/badge.svg)
![NPM](https://nodei.co/npm/iobroker.solarviewdatareader.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/afuerhoff/ioBroker.solarviewdatareader/master.svg)

＃ioBroker.solarviewdatareader
##用于ioBroker的solarviewdatareader适配器
适配器从Solarview数据记录器读取数据。
在这里您可以找到有关Solarview的其他信息：https://www.solarview.info/solarlogger.aspx

＃＃ 配置
### IP地址，端口
要从数据记录器获取数据，您必须输入solarview TCP服务器的ip地址和端口。
标准端口是15000。请参考Solarview文档https://www.solarview.info/solarlogger.aspx。

### D0转换器
如果您将D0转换器连接到Solarview数据记录器，则可以启用此选项。
如有疑问，请参阅Solarview文档。

###自我消费表总和和1到4
如果您有S0表，则可以启用此选项。
您最多可以有4个自用电表以及所有电表的总和。
如有疑问，请参阅Solarview文档。

###逆变器1至4
您可以分别启用的每个逆变器。
如有疑问，请参阅Solarview文档。

###间隔，间隔开始，间隔结束
您可以在此处配置时间范围和间隔。 24h的时间范围是00:00到23:59。
不是从00:00到00:00。

###设置系统变量CCU，系统变量
这是Homematic CCU的一项特殊功能。您可以在CCU中定义系统变量。
在此系统变量中，将保存实际的PAC值。
您必须为该系统变量-> **填写ioBroker状态。 “ hm-rega.0.12345” **

###创建状态
#### Pvig，pvi1..4，d0供应，d0消耗
每日=每日发电量（kWh）每月=每月发电量（kWh）每年=全年发电量（kWh）总=总发电量（kWh）电流=以W UDC，UDCB，UDCC，UDCD为单位的发电机功率=以MPP-Tracker为单位的发电机电压（伏特） IDC，IDCB，IDCC，IDCD =每个MPP跟踪器UL1的发电机电流（安培），IL1 =电源电压，电源相位1 UL2，IL2 =电源电压，电源相位2 UL3，IL3 =电源电压，电源相位3 TKK =温度逆变器

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
* (afuerhoff) dependencies updated
* (afuerhoff) documentation changed

### 0.2.1
* (afuerhoff) self consumption meter optimized
### 0.2.0
* (afuerhoff) Error handling optimized, self consumption meter implemented
### 0.1.0
* (afuerhoff) optimizations for adding to latest repository
### 0.0.5
* (afuerhoff) Code optimized, unload optimized, documentation added 
### 0.0.4
* (afuerhoff) Objects, Telnet client and checksum calculation changed
### 0.0.3
* (afuerhoff) inverter selection added
### 0.0.2
* (afuerhoff) test version
### 0.0.1
* (afuerhoff) initial release

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