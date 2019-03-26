---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.smartmeter/README.md
title: ioBroker.smartmeter
hash: BQomfImdqLTMv7RTxOxAV4JOyXcA1kC0gplk6fkISb4=
---
![商标](../../../en/adapterref/iobroker.smartmeter/admin/smartmeter.png)

![安装数量](http://iobroker.live/badges/smartmeter-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.smartmeter.svg)
![下载](https://img.shields.io/npm/dm/iobroker.smartmeter.svg)
![特拉维斯-CI](http://img.shields.io/travis/Apollon77/ioBroker.smartmeter/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Apollon77/ioBroker.smartmeter?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.smartmeter.png?downloads=true)

＃ioBroker.smartmeter
[![Greenkeeper徽章]（https://badges.greenkeeper.io/Apollon77/ioBroker.smartmeter.svg）](https://greenkeeper.io/)

[![代码气候]（https://codeclimate.com/github/Apollon77/ioBroker.smartmeter/badges/gpa.svg）](https://codeclimate.com/github/Apollon77/ioBroker.smartmeter)

这个适用于ioBroker的适配器允许读取和解析遵循OBIS编号逻辑的智能电表协议，以使其数据可用。

***适配器需要nodejs 4.x才能工作！***

***此适配器需要安装git才能安装！***

##目前已知的问题
*此适配器使用Serialport Library。如果需要编译，这可能意味着更长的安装时间
*似乎内存处理有时不是最理想的，并且在读取数据时可能导致SIGABRT或SIGSEGV崩溃。 iobroker Controller将自动重启适配器，因此2-3个对数线是唯一的效果:-)

##参数说明
ioBroker-Forum-Thread：http：//forum.iobroker.net/viewtopic.php？f = 23＆t = 5047＆p = 54973

###数据协议
支持的协议：

* **Sml** SML（SmartMeterLanguage）为二进制格式
* **D0** D0（基于IEC 62056-21：2002 / IEC 61107 / EN 61107）为ASCII格式（目前不支持二进制协议模式E）
* **Json-Efr** 来自EFR智能电网中心的OBIS数据（JSON格式）

＃＃＃ 数据传输
* **串行接收**：通过串行推送数据接收（智能电表无需定期发送任何请求即可发送数据）。主要用于SML
* **串行双向通信**：模式A，B，C和D中的D0协议（模式E不支持！），具有唤醒，登录，电位。用于读出数据的ACK和数据消息（目前尚未实现编程/写入模式）
* **Http-Requests** 通过请求定义的URL，通过HTTP读取数据
* **本地文件**：从本地文件中读取数据

###数据请求间隔
等待下一个请求或暂停串行接收的秒数，值0可以在完成一条消息后直接重启，

默认值：是300（= 5分钟）

###串行设备波特率
初始串行连接的波特率，如果未定义，则使用每种传输类型的默认值（对于SerialResponseTransprt为9600，对于SerialRequestResponseTransport为300）

### D0：SignOn-Message命令
SignIn-Message命令，默认为“？”查询必填字段，其他值取决于设备。
示例：2WR5热表使用“＃”查询更多数据（可选字段和所有必填字段）

### D0：模式覆盖
适配器尝试确定规范中定义的D0协议模式。有些设备不符合规范，因此会带来问题。使用此选项可以覆盖确定的协议模式。

*模式A：没有波特率转换，没有Ack-Message
*模式B：波特率转换，无Ack-Message
*模式C：需要波特率转换和Ack-Message
*模式D：无波特率转换，波特率始终为2400
*模式E：需要波特率转换和Ack-Message，自定义协议，目前不支持!!如果您有这样的智能电表，请与我联系

### D0：Baudrate-Changeover-Overwrite
适配器尝试确定协议规范中定义的数据消息的波特率。但与模式一样，某些智能电表在这里提供了错误的数据。因此，您可以根据需要使用它来覆盖数据消息的波特率。留空以使用智能电表定义的波特率转换。

##适配器已经过测试...
... 至少：

* Hager eHz Energy Meter（多个，例如eHZ-IW8E2A5L0EK2P，EHZ363W5，）
* EMH能量计
* EFR SmartGridHub
*来自加热站的西门子2WR5读卡器
* Elster AS1440
* Iskraemeco MT174
* Iskraemeco MT175
* Itron EM214 Typ 720
*荷兰智能电表使用DSRM协议（使用“仅串行设备读取数据”和“D0”作为协议）

请将有关您已成功使用该库的设备的信息发送给我，我将在此处添加。

＃＃ 去做
*将Sml支持更新为1.0.4（如果需要）
*网页文档

## Changelog

### 2.0.0 (2019-03-22)
* BREAKING CHANGE: State names changed because * no longer supported. Is replaced by __ now because of possible collisions in state names with only one _

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

Copyright (c) 2015-2018 Apollon77 <ingo@fischer-ka.de>

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