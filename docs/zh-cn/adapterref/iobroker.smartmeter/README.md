---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.smartmeter/README.md
title: ioBroker.smartmeter
hash: u0VoAof+ktuz2f0n+voNHIUbz1bXYea78AuxBNH4MKI=
---
![商标](../../../en/adapterref/iobroker.smartmeter/admin/smartmeter.png)

![保镖徽章](https://badges.greenkeeper.io/Apollon77/ioBroker.smartmeter.svg)
![安装数量](http://iobroker.live/badges/smartmeter-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.smartmeter.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.smartmeter.svg)
![特拉维斯](http://img.shields.io/travis/Apollon77/ioBroker.smartmeter/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Apollon77/ioBroker.smartmeter?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.smartmeter.png?downloads=true)

＃ioBroker.smartmeter
[![代码气候]（https://codeclimate.com/github/Apollon77/ioBroker.smartmeter/badges/gpa.svg）](https://codeclimate.com/github/Apollon77/ioBroker.smartmeter)

**此适配器使用Sentry库自动向开发人员报告异常和代码错误。**更多详细信息，请参见下文！

该ioBroker适配器允许读取和解析遵循OBIS编号逻辑的智能电表协议，以使其数据可用。

***适配器需要nodejs 4.x才能工作！***

***此适配器当前需要安装git才能安装！***

##参数说明
ioBroker-Forum-Thread：http://forum.iobroker.net/viewtopic.php?f=23&t=5047&p=54973

###数据协议
支持的协议：

* **SML** SML（SmartMeterLanguage）为二进制格式
* **D0** D0（基于IEC 62056-21：2002 / IEC 61107 / EN 61107）为ASCII格式（当前不支持二进制协议模式E）
* **Json-Efr** 来自EFR Smart Grid Hub的OBIS数据（JSON格式）

＃＃＃ 数据传输
* **串行接收**：通过串行推送数据接收（智能电表定期发送数据，而无需任何请求）。主要用于SML
* **双向双向通信**：模式A，B，C和D（当前不支持模式E！）的D0协议，带有Wakeup-，Signon-，pot。 ACK和数据消息以读取数据（到目前为止尚未实现编程/写入模式）
* **Http-Requests** 通过请求定义的URL通过HTTP读取数据
* **本地文件**：从本地文件读取数据

###数据请求间隔
等待下一个请求或暂停串行接收的秒数，值0可能在完成一条消息后立即重新启动，

默认值：300（= 5分钟）

###串行设备波特率
初始串行连接的波特率，如果未定义，则使用每种传输类型的默认值（SerialResponseTransprt为9600，SerialRequestResponseTransport为300）

### D0：SignOn-Message命令
登录消息命令，默认为“？”查询必填字段，其他值取决于设备。
示例：2WR5温度计使用“＃”查询更多数据（可选字段以及所有必填字段）

### D0：模式覆盖
适配器尝试确定规范中定义的D0协议模式。有些设备不符合规格，因此会带来问题。使用此选项可以覆盖确定的协议模式。

*模式A：无波特率转换，无确认消息
*模式B：波特率转换，无确认消息
*模式C：需要波特率转换和确认消息
*模式D：无波特率转换，波特率始终为2400
*模式E：需要波特率转换和确认消息，自定义协议，暂不支持！如果您有这样的智能电表，请与我联系

### D0：波特率-转换-覆盖
适配器尝试确定协议规范中定义的数据消息的波特率。但是，与“模式”一样，某些智能仪表在此处提供错误的数据。因此，您可以根据需要使用它来覆盖数据消息的波特率。保留为空以使用智能仪表定义的波特率转换。

##适配器已经过测试...
... 至少：

* Hager eHz电能表（例如eHZ-IW8E2A5L0EK2P，EHZ363W5等）
* EMH电能表
* EFR SmartGridHub
*西门子2WR5加热站读取器
* Elster AS1440
*伊斯克拉梅科MT174
*伊斯克拉梅科MT175
* Itron EM214 Typ 720
*兰迪斯＆吉尔E220
*使用DSRM协议的荷兰智能电表（使用“仅串行设备读取数据”和“ D0”作为协议）
* DZG DWS7412.1T
    * *重要*：似乎存在固件错误，有时当前的能源消耗为负！可以使用https://github.com/Apollon77/smartmeter-obis/issues/75#issuecomment-581650736*中的公式进行手动重新计算... ...还有更多

请向我发送有关您已成功使用该库的设备的信息，我将在此处添加它。

##特殊的智能电表和问题
### DZG DVS74
有时SML固件似乎有错误，并且SML消息中的值编码错误，但是消息本身是有效的。解决方案是使用Javascript对值进行后期处理。参见https://github.com/Apollon77/smartmeter-obis/issues/75#issuecomment-581650736

##如何报告问题和功能请求
请为此使用GitHub问题。

最好是将适配器设置为“调试日志”模式（“实例”->“专家模式”->“列日志级别”）。然后，请从磁盘中获取日志文件（ioBroker安装目录中的子目录“ log”，而不是Admin，因为Admin会打断行）。如果您不喜欢在GitHub问题中提供它，也可以通过电子邮件（iobroker@fischer-ka.de）将其发送给我。请添加对相关GitHub问题的引用，并描述我什么时候在日志中看到的内容。

##什么是Sentry，什么报告给服务器？
Sentry.io是开发人员从其应用程序中获得有关错误概述的一种方式。确切地说，这是在此适配器中实现的。

当适配器崩溃或发生其他代码错误时，此错误消息（也出现在ioBroker日志中）将提交给我们在德国托管的Sentry服务器。当您允许iobroker GmbH收集诊断数据时，还将包括您的安装ID（这是唯一ID，**没有**有关您，电子邮件，姓名等的任何其他信息）。这使Sentry可以对错误进行分组，并显示有多少唯一用户受此错误影响。所有这些都帮助我提供了基本不会崩溃的无错误适配器。

## Changelog

### 3.1.3 (2020-07-20)
* (Apollon77) update dependencies to prevent some crash cases

### 3.1.2 (2020-04-12)
* (Apollon77) catch errors when no memory is available anymore and stop processing

### 3.1.1 (2020-03-11)
* (Apollon77) fix admin when switching to TCPTransport
* (Apollon77) bugfixes and optimizations

### 3.1.0 (2020-03-08)
* (Apollon77) bugfixes and optimizations
* (Apollon77) experimental TCP support, please give feedback

### 3.0.10 (2020-02-05)
* (Apollon77) make sure HTTP based smartmeters are also polled frequently when responses are invalid
* (Apollon77) other optimizations
* (Apollon77) Switch Sentry to iobroker own instance hosted in germany

### 3.0.8 (2019-12-20)
* (Apollon77) errors prevented when stopping to process data

### 3.0.7 (2019-12-18)
* (Apollon77) errors prevented when stopping to process data

### 3.0.6 (2019-12-07)
* (Apollon77) serial port configuration further optimized
* (Apollon77) update smartmeter-obis lib to fix some edge case errors and serial close handling

### 3.0.3 (2019-11-30)
* (Apollon77) serial port configuration further optimized

### 3.0.2 (2019-11-29)
* (Apollon77) Fix use of "/dev/serial/by-id" paths on linux if available

### 3.0.1 (2019-11-27)
* (Apollon77) BREAKING CHANGE: Supports nodejs 8.x+ only, up to 12.x
* (Apollon77) support compact mode
* (Apollon77) update to latest library versions to fix problems and add special handling for some smart meters with broken firmware
* (Apollon77) Use "/dev/serial/by-id" paths on linux if available; add port selection to Admin
* (Apollon77) Add Sentry for error reporting

### 2.0.0 (2019-03-22)
* (Apollon77) BREAKING CHANGE: State names changed because * no longer supported. Is replaced by __ now because of possible collisions in state names with only one _

### 1.2.2 (2018-11-11)
* Update smartmeter library, fix HTTP-JSON-Transport

### 1.2.1 (2018-06-23)
* BREAKING CHANGE: State names changed because * no longer supported. Is replaced by _

### 1.1.3 (2018-04-13)
* Fix Admin

### 1.1.2 (26.03.2018)
* Add better support for devices with more then 16 values (OpenSML Library upgrade)

### 1.1.0 (31.01.2018)
* Allow multiple queries for D0 and Serial-Bidirectional communication
* a lot of bugfixing and Optimizations
* Switch to Serialport 6.0.4 to hopefully get more stable (less/no SIGSEGV/SIGABRT ...)

### 1.0.0 (25.08.2017)
* Update smartmeter library and fix some timing issues

### 0.5.12 (23.07.2017)
* update SML library

### 0.5.11 (21.06.2017)
* optimize D0 handling and add support for Dutch smartmeter using DSRM protocol.

### 0.5.8 (06.04.2017)
* optimize Serial handling on Windows (because pause and resume are not supported there)

### 0.5.6 (02.04.2017)
* update library

### 0.5.5 (19.03.2017)
* improved baudrate-changeover logic for D0 protocol (now hopefully finally)
* enhanced D0 protocol support for multiple values

### 0.5.0 (26.02.2017)
* maintenance update

### 0.4.2 (27.02.2017)
* one last try to fix the crashes SIGABRT/SIGSEGV

### 0.4.1 (24.02.2017)
* Fix potential hanging communication with D0 Serial

### 0.4.0 (23.02.2017)
* Optimize for D0 Message handling and baudrate changeovers

### 0.3.2 (22.02.2017)
* Optimize D0 protocol handling for mode E

### 0.3.1 (12.02.2017)
* Finalize Adapter config and added some informations

### 0.3.0 (11.02.2017)
* We now should be quiet stable

### 0.2.x
* Public release of Adapter after forum Tests
* remove all additional logging
* enhance Adapter config screenxw
* Add possibility to overwrite serial connections settings and also D0 Mode for devices that send a wrong identification
* update smartmeter-obis library for memory optimizations

### 0.1.1
* Update smartmeter-obis library to 0.2.5 to add Serial Timeout for Request/Response protocol

### 0.1.0
* Initial version for public testing

### 0.0.1
* Initial version for internal testing

## License

The MIT License (MIT)

Copyright (c) 2017-2020 Apollon77 <ingo@fischer-ka.de>

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