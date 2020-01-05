---
BADGE-Build Status: https://travis-ci.org/dkleber89/ioBroker.beckhoff.svg?branch=master
BADGE-Build status: https://ci.appveyor.com/api/projects/status/tpqe657lqrir3kew/branch/master?svg=true
BADGE-npm: https://img.shields.io/npm/v/iobroker.beckhoff.svg
BADGE-Number of Installations: http://iobroker.live/badges/beckhoff-installed.svg
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.beckhoff/README.md
title: ioBroker.beckhoff
hash: nsTJDR3Hq3eUizABKih+ky7zMz59zxZXq/T8sT+JJLY=
---
![徽标](../../../de/adapterref/iobroker.beckhoff/img/beckhoff.png)

![建造状态](https://ci.appveyor.com/api/projects/status/tpqe657lqrir3kew/branch/master?svg=true)
![NPM](https://img.shields.io/npm/v/iobroker.beckhoff.svg)
![安装数量](http://iobroker.live/badges/beckhoff-installed.svg)

＃ioBroker.beckhoff
该ioBroker适配器通过ADS协议实现与Beckhof控制器（Twincat 2或3）的通信。
ADS协议在每个Beckhoff控制器中都已实现，并且无需许可证即可使用。

该项目与Beckhoff公司无关

##说明
###要求
* Beckhoff具有网络连接，该网络连接挂在ioBroker可以访问的网络中
    *必须为控制器分配一个固定的IP地址
    *控件必须可从ioBroker ping通
  * TwinCat 2 ** BC控件**或TwinCat 3除外

###控制配置
1.必须在项目中激活ADS。为此，请转到控制项目中的任务配置，然后激活“生成符号”复选框。然后将配置加载到控制器上并重新启动它。仅在使用TwinCat 2时才需要重新启动。

    ![创建符号](../../../de/adapterref/iobroker.beckhoff/img/createSymbols.png)

2.必须在控制器中创建一条静态路由。该路由必须与ioBroker匹配（IP地址和AMS-Net-ID）。

    这是路由直接添加到控制器时的示例。也可以通过工程计算器添加路线。

    ![创建符号](../../../de/adapterref/iobroker.beckhoff/img/addRoute.png)

    有关TwinCat路由器和控制器的一般信息，请参见[Beckhoff信息系统](https://infosys.beckhoff.com/ "Beckhoff Information System")。

3.对于TwinCat 2，必须在控件中创建另一个结构。然后将结构添加到全局变量表中。然后可以在此处创建所有必需的变量。然后，数据交换由ADS和适配器独立进行。

    #####当前支持的数据类型：BOOL，BYTE，WORD，DWORD，SINT，USINT，INT，UINT，DINT，UDINT，REAL，STRING（80）
    可选：可以直接在变量表中创建变量，而无需使用确切名称嵌套-> ioBrokerResync（区分大小写和数据类型无关）->每次更改此值时，都会在ioBroker中再次读取变量表。

3.对于TwinCat 3，必须在控制器中创建全局变量表。然后可以在此处创建所有必需的变量。然后，数据交换由ADS和适配器独立进行。

    #####当前支持的数据类型：BOOL，BYTE，WORD，DWORD，SINT，USINT，INT，UINT，DINT，UDINT，REAL，STRING（80）
    可选：可以直接在变量表中创建变量，而无需使用确切名称嵌套-> ioBrokerResync（区分大小写和数据类型无关）->每次更改此值时，都会在ioBroker中再次读取变量表。

###适配器设置
#### Twincat 3和Twincat 2
1.选择运行时版本
2.输入目标IP地址和AMS网络ID。
3.对于TwinCat 2，从全局变量表中输入结构的实例名称。
4.输入TwinCat 3的正确变量表名称。
5.其余的点通常不需要更改。

#### Twincat 2 <= v2.11.2240
PLC项目中的* .tpy文件必须上载。 ->每当负责与ioBroker进行通信的结构上的任何更改时，都必须再次上载此文件。

###数据交换
-控制器中的变量一旦更改，该值就会自动传送到ioBroker中的相应状态。
-如果在ioBroker中更改了一个值（重要：ACK必须为FALSE !!），则该值将自动传输到控件中。如果该值由控制器接管，则ACK设置为TRUE。

###重要
1. TwinCAT AMS路由器不允许来自同一主机的多个TCP连接。如果从同一主机到同一TwinCat路由器设置了两个实例，则该路由器将自动关闭第一个连接，并仅关闭最新的答案。
2.适配器自动同步ioBroker中的所有变量。有几种触发重新同步的方式：
    -如果Resyc变量的值更改（请参见[here]（控制器的＃配置））
    -如果控制器不处于RUN模式的时间超过重新连接间隔->的时间，则当控制器切换到RUN模式时，变量表将重新同步。
    -将项目加载到控制器上时。例外-> OnlineChange
    -重新启动适配器时。
3.“同步”或“读取”并不意味着变量值的交换，而是变量本身的同步以及在ioBroker中创建或删除变量

## Changelog
### 1.2.0 (2020-01-02)

- (dkleber89) Add Support for Strings with fixed length to 80 Chars 

### 1.1.0 (2019-11-12)

- (dkleber89) Add Support for older TwinCat2 Systems with no autosync

### 1.0.7 (2019-10-25)

- (dkleber89) Add Support for Compact Mode -> JS Controller >= 2.0.0

### 1.0.6 (2019-08-11)

-   (dkleber89) Add check change of Datatype on resync

### 1.0.5 (2019-08-10)

-   (dkleber89) Eslint, Prettier with Airbnb Codestyle, CI adopted, little random changes in Project Structure

### 1.0.4 (2019-08-01)

-   (dkleber89) Increase depth of LOG details, Update dependency versions

### 1.0.2 (2019-05-18)

-   (Appollon77) Update testing for Node.js v12 in Appveyor und Travis

### 1.0.1 (2019-04-06)

-   (dkleber89) Random Bugfixes, Add some monitoring that States get correct Ack

### 1.0.0 (2019-03-23)

-   (dkleber 89) Stable Release, Update Gulp, add new Translations

### 0.3.0 (2019-03-09)

-   (Appollon77) Core Files/Testing Update and introduce adapter-core
-   (dkleber89) Fix Problem 'write after End'

### 0.2.2 (2019-02-11)

-   (dkleber89) DEBUG Version -> Still Problems with 'write after end'

### 0.2.1 (2018-12-30)

-   (dkleber89) Add IE 11 and Mobile Support

### 0.2.0 (2018-11-24)

-   (dkleber89) Code cleanup and second Beta Release

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