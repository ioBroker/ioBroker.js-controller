---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.wled/README.md
title: ioBroker.wled
hash: OuR8MefMR0W8HD0uepODxQyPj1gkE6QIp5bvy0IVcTE=
---
![标识](../../../en/adapterref/iobroker.wled/admin/wled_large.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.wled.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.wled.svg)
![安装数量（最新）](http://iobroker.live/badges/wled-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/wled-stable.svg)
![依赖状态](https://img.shields.io/david/DrozmotiX/iobroker.wled.svg)
![已知漏洞](https://snyk.io/test/github/DrozmotiX/ioBroker.wled/badge.svg)
![NPM](https://nodei.co/npm/iobroker.wled.png?downloads=true)

＃ioBroker.wled
![测试与发布](https://github.com/DrozmotiX/ioBroker.wled/workflows/Test%20and%20Release/badge.svg)

**此适配器使用服务[哨兵](https://sentry.io)向开发人员自动向我报告异常和代码错误以及新设备架构。**更多详细信息，请参见下文！

##用于ioBroker的wled适配器
ESP8266 / ESP32 Web服务器的快速且功能丰富的实现，用于控制NeoPixel（WS2812B，WS2811，SK6812，APA102）LED或WS2801等基于SPI的芯片组！

@Aircoookie的[WLED-Github项目](https://github.com/Aircoookie/WLED)§

＃＃ 指示
适配器会使用Bonjour服务自动尝试在网络中查找WLED设备。
已知问题：具有VLAN分隔的网络通常不会路由广播流量，这意味着自动检测将失败。

不用担心，在这种情况下，您可以通过IP地址手动添加设备。

1）确保WLED设备正在运行并且可以通过网络访问2）安装适配器3）配置数据轮询和自动检测周期的间隔时间4-A）启动适配器，应自动检测设备4-B）如果A失败，使用添加设备按钮并提供设备IP地址5）适配器将立即发送更改并每x秒轮询一次数据（可配置）

＃＃ 去做
* []将轮询切换到套接字连接，等待WLED固件实施

＃＃ 支持我
如果您喜欢我的作品，请随时提供个人捐款（这是DutchmanNL的个人捐款链接，与ioBroker项目无关！）[![捐赠]（https://raw.githubusercontent.com/DrozmotiX/ioBroker.wled/master/admin/button.png）](http://paypal.me/DutchmanNL)

##什么是Sentry.io，什么报告给该公司的服务器？
Sentry.io是一项服务，供开发人员从其应用程序中获取有关错误的概述。正是在此适配器中实现了这一点。

当适配器崩溃或发生其他代码错误时，此错误消息（也出现在ioBroker日志中）将提交给Sentry。当您允许iobroker GmbH收集诊断数据时，还将包括您的安装ID（这是唯一ID，**没有**有关您的任何其他信息，电子邮件，姓名等）。这使Sentry可以对错误进行分组，并显示有多少唯一用户受此错误影响。所有这些都帮助我提供了基本上不会崩溃的无错误适配器。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

### 0.5.6 (2021-01-03)
* (DutchmanNL) Bugfix : State type definition for time and pmt

### 0.5.5 (2021-01-03)
* (DutchmanNL) add development option to disable sentry
* (DutchmanNL) split API calls, avoid not needed query's
* (DutchmanNL) Bugfix : issue with boolean attributes #40
* (DutchmanNL) add new state definition for WLED version 0.11
* (DutchmanNL) Bugfix : You are assigning a string to the state "wled.0.xxxx.seg.0.col.0

### 0.5.4 (2020-09-02)
* (DutchmanNL) Support WLED 0.10.2, new state definitions implemented
* (DutchmanNL) Update state definitions
* (DutchmanNL) Remove log messages for missing states (Sentry report only)
* (DutchmanNL) Bugfix : 0.5.3 decommissioned, update to 0.5.4 !

### 0.5.2 (2020-08-29)
* (DutchmanNL) Bugfix : Add missing Attributes with WLED 0.10.0

### 0.5.1 (20-04-2020) Avoid writing objects unnecessarily, Sentry implemented
* (DutchmanNL) Implement Sentry
* (DutchmanNL) Bugfix : Devicename
* (DutchmanNL) Bugfix : Warning with JS Controler 3.0.7
* (DutchmanNL) Bugfix : Avoid writing objects unnecessarily

### 0.5.0 Stable release
* (DutchmanNL) Added translations
* (DutchmanNL) Release to stable repository, beta testing finished

### 0.3.0 Bugfix : Correct handling of polling timer
* (DutchmanNL  & Jey-Cee) Bugfix : Polling timer not saved
* (DutchmanNL) Bugfix : Correct handling of "online" state
* (DutchmanNL) Bugfix : Polling timer (offline devices did not reconnect)

### 0.2.6 Bugfix : Hex state value change
* (DutchmanNL) Bugfix : Hex state value change

### 0.2.5 Stable release candidate
* (DutchmanNL) Code cleanup
* (DutchmanNL) Improved logging information
* (DutchmanNL) Make polling timer configurable
* (DutchmanNL) Correct handling of device online state
* (DutchmanNL) Show online state in instance configuration

### 0.2.0 Possibility to add devices by IP-adress
* (DutchmanNL) Bugfix io-package
* (DutchmanNL) Improved logging at adapter start
* (DutchmanNL) Possibility to add devices by IP-adress implemented. (Needed for situations were autoscan fails)
* (DutchmanNL) Ensure known devices get connected immediatly after adapter start instead of waiting for network scan

### 0.1.9 Code improvements
* (DutchmanNL) Code cleanup and optimalisation
* (DutchmanNL) FIX memory leak by proper handling of bonjour service

### 0.1.8 Bugfix
* (DutchmanNL) Solved incorrect formated API call at state changes causing warning message

### 0.1.7 Bugfix
* (DutchmanNL) Fixed error when API call fails (write warning to log and retry at intervall time)

### 0.1.6 HEX color states implemented
* (DutchmanNL) HEX color states implemented

### 0.1.5 Stable Beta release

### 0.1.2
* (DutchmanNL) Implement drop down menu for effects

### 0.1.1
* (DutchmanNL) Implemented states hidden from JSON-API : tt / psave / nn / time
* (DutchmanNL) Improve logging issue

### 0.1.0
* (DutchmanNL) initial release

## License
MIT License

Copyright (c) 2020 DutchmanNL <rdrozda86@gmail.com>

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