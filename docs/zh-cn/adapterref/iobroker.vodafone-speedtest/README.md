---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vodafone-speedtest/README.md
title: ioBroker.vodafone速度测试
hash: +IOdcWrUCNgyMOAXgoIEkc0/nKCJtzsE0iXB29hapt0=
---
![商标](../../../en/adapterref/iobroker.vodafone-speedtest/admin/vodafone-speedtest.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.vodafone-speedtest.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.vodafone-speedtest.svg)
![安装数量（最新）](http://iobroker.live/badges/vodafone-speedtest-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/vodafone-speedtest-stable.svg)
![依赖状态](https://img.shields.io/david/peterbaumert/iobroker.vodafone-speedtest.svg)
![已知漏洞](https://snyk.io/test/github/peterbaumert/ioBroker.vodafone-speedtest/badge.svg)
![NPM](https://nodei.co/npm/iobroker.vodafone-speedtest.png?downloads=true)

＃ioBroker.vodafone-speedtest
**此适配器使用服务[哨兵](https://sentry.io)向开发人员自动向我报告异常和代码错误以及新设备架构。**更多详细信息，请参见下文！

##适用于ioBroker的vodafone-speedtest适配器
Vodafone.de的测速

实施与https://speedtest.vodafone.de相同的技术

##什么是Sentry.io，什么报告给该公司的服务器？
Sentry.io是一项服务，供开发人员从其应用程序中获取有关错误的概述。确切地说，这是在此适配器中实现的。

当适配器崩溃或发生其他代码错误时，此错误消息（也出现在ioBroker日志中）将提交给Sentry。当您允许iobroker GmbH收集诊断数据时，还将包括您的安装ID（这是唯一的ID，**没有**有关您的任何其他信息，电子邮件，姓名等）。这使Sentry可以对错误进行分组，并显示有多少唯一用户受此错误影响。所有这些都帮助我提供了基本不会崩溃的无错误适配器。

## Changelog

### 0.0.6 (2021-01-21)
* Added Sentry.io Integration

### 0.0.5 (2020-05-26)
* Added ping results
* Added calculated values by actual raw data

### 0.0.4 (2020-04-30)
* Changed Adapter start type to scheduled (reinstallation might be needed)
* Bug fixes and feedback implementation

### 0.0.3 (2020-04-24)
* Implemented feedback from Forum and github issue

### 0.0.2 (2020-04-19)
* Added actual settings in Admin interface
* first version ready for testing

### 0.0.1 (2020-04-18)
* (Peter Baumert) initial release

## License
MIT License

Copyright (c) 2020 Peter Baumert <ioBroker.vodafone-speedtest@outlook.com>

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