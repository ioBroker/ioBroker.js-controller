---
BADGE-Build Status: https://travis-ci.org/dkleber89/ioBroker.beckhoff.svg?branch=master
BADGE-Build status: https://ci.appveyor.com/api/projects/status/laebb0pq4pd4d08x/branch/master?svg=true
BADGE-npm: https://img.shields.io/npm/v/iobroker.beckhoff.svg
BADGE-Number of Installations: http://iobroker.live/badges/beckhoff-installed.svg
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/dkleber89/ioBroker.beckhoff/edit/master//README.md
title: 面广告实时传递到自动化控制系统中。
hash: S29NCZ8nEb3vlwEpYsnmZdwhh1H2xueGjmH9n6pgfAc=
adapter: true
license: MIT
authors: dkleber89 <dkleber89@gmail.com>
description: ioBroker面实时传递到自动化控制系统中。器的广告通信方面的自动化系统
keywords: beckhoff, ads, plc, sps, steuerung, twincat
readme: https://github.com/dkleber89/ioBroker.beckhoff/blob/master/README.md
mode: daemon
materialize: true
compact: false
published: 2018-11-01T17:44:00.917Z
version: 1.0.0
---
![徽标](zh-cn/adapterref/iobroker.beckhoff/../../../de/adapterref/iobroker.beckhoff/img/beckhoff.png)

＃ioBroker.beckhoff
该ioBroker适配器通过ADS协议实现与Beckhof控制器（Twincat 2或3）的通信。
ADS协议在每个Beckhoff控制器中实现，无需许可即可使用。

该项目与Beckhoff公司没有关系

## Description
###要求
* Beckhoff网络连接挂在ioBroker可以访问的网络中
    *必须为控制器分配固定的IP地址
    *控制器必须可由ioBroker ping
    * TwinCat 2 **除BC **（所需符号信息未存储在BC运行时环境中）或TwinCat 3

###控制器的配置
1.在项目中，必须激活ADS。为此，请转到控制项目中的任务配置并激活复选框`Symbole erzeugen`。然后将配置下载到控制器并重新启动它。只有在使用TwinCat 2时才需要重启。

    ![创建符号](zh-cn/adapterref/iobroker.beckhoff/../../../de/adapterref/iobroker.beckhoff/img/createSymbols.png)

2.必须在控制器中创建静态路由。路由必须与ioBroker（IP地址和AMS网络ID）匹配。

    以下是将路径直接添加到控制器时的示例。也可以通过Engineer计算器添加路线。

    ![创建符号](zh-cn/adapterref/iobroker.beckhoff/../../../de/adapterref/iobroker.beckhoff/img/addRoute.png)

    有关TwinCat路由器和控制器的更多信息，请参见[Beckhoff信息系统](https://infosys.beckhoff.com/ "Beckhoff Information System")。

3.对于TwinCat 2，仍必须在控制器中创建结构。然后将结构添加到全局变量表中。然后可以在此处创建所有必需的变量。然后由ADS和适配器独立地执行数据交换。

    #####目前支持的数据类型：BOOL，BYTE，WORD，DWORD，SINT，USINT，INT，UINT，DINT，UDINT，REAL
    可选：可以直接在变量表中创建变量，而无需使用精确名称嵌套 - > ioBrokerResync（大小写和数据类型无关紧要） - >每次此值更改时，都会再次读入ioBroker中的变量表。

3.对于TwinCat 3，仍必须在控制器中创建全局变量表。然后可以在此处创建所有必需的变量。然后由ADS和适配器独立地执行数据交换。

    #####目前支持的数据类型：BOOL，BYTE，WORD，DWORD，SINT，USINT，INT，UINT，DINT，UDINT，REAL
    可选：可以直接在变量表中创建变量，而无需使用精确名称嵌套 - > ioBrokerResync（大小写和数据类型无关紧要） - >每次此值更改时，都会再次读入ioBroker中的变量表。

###适配器设置
1.选择运行时版本
2.输入IP地址和AMS Net ID目标。
3.对于TwinCat 2，从全局变量表中输入结构的实例名称。
4.对于TwinCat 3，输入正确的变量表名称。
5.其余的点通常不需要更改。

###数据交换
*一旦控件中的变量发生变化，该值就会自动转移到ioBroker中的相应状态。
*如果更改了ioBroker中的值（重要：ACK必须为FALSE !!），它将自动传输到控制器。如果控制器接受该值，则ACK设置为TRUE。

###重要
1. TwinCAT AMS路由器不允许来自同一主机的多个TCP连接。如果同一主机将两个实例设置为同一个TwinCat路由器，则路由器会自动关闭第一个连接，并仅回复最新的连接。
2.适配器自动同步ioBroker中的所有变量。可以通过多种方式触发重新同步：
    *如果Resyc变量的值发生变化（参见[这里](#Konfiguration-der-Steuerung)）
    *如果控制器未处于RUN模式长于重新连接间隔 - >，则当控制器进入RUN模式时，变量表将重新同步。
    *项目加载到控制器上时。例外 - > OnlineChange
    *重新启动适配器时。
3.“同步”或“读入”并不意味着变量的值交换，而是变量本身的同步以及在ioBroker中创建或删除这些变量

## Changelog
### 1.0.0 (2019-03-23)
* (dkleber 89) Stable Release, Update Gulp, add new Translations

### 0.3.0 (2019-03-09)
* (Appollon77) Core Files/Testing Update and introduce adapter-core
* (dkleber89) Fix Problem 'write after End'

### 0.2.2 (2019-02-11)
* (dkleber89) DEBUG Version -> Still Problems with 'write after end'

### 0.2.1 (2018-12-30)
* (dkleber89) Add IE 11 and Mobile Support

### 0.2.0 (2018-11-24)
* (dkleber89) Code cleanup and second Beta Release

### 0.1.4 (2018-11-21)
* (dkleber89) Fixing Dataexchange on TwinCat 2 Runtime

### 0.1.3 (2018-11-11)
* (dkleber89) Bugfix on ending Processes

### 0.1.2 (2018-11-05)
* (dkleber89) Bugfix in Adapter Unload

### 0.1.1 (2018-11-04)
* (dkleber89) Bugfix in Connection handling

### 0.1.0 (2018-11-01)
* (dkleber89) First Beta Release

### 0.0.2 (2018-10-20)
* (dkleber89) Milestone Connection and Sync, no Release yet

### 0.0.1 (2018-08-17)
* (dkleber89) Development, no Release yet

## License
The MIT License (MIT)

Copyright (c) 2018-2019 dkleber89 <dkleber89@gmail.com>

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