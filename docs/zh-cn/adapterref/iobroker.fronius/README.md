---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.fronius/README.md
title: ioBroker.fronius
hash: e4eLXLM1VVzjytY4m6uIjTUlmxeHzZYTDWCuyQ4Wcgk=
---
![商标](../../../en/adapterref/iobroker.fronius/admin/fronius.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.fronius.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.fronius.svg)
![安装数量（最新）](http://iobroker.live/badges/fronius-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/fronius-stable.svg)
![依赖状态](https://img.shields.io/david/ldittmar81/iobroker.fronius.svg)
![已知漏洞](https://snyk.io/test/github/ldittmar81/ioBroker.fronius/badge.svg)
![NPM](https://nodei.co/npm/iobroker.fronius.png?downloads=true)

＃ioBroker.fronius
**测试：**![测试与发布](https://github.com/ldittmar81/ioBroker.fronius/workflows/Test%20and%20Release/badge.svg)

##用于ioBroker的Fronius逆变器适配器
这是适用于Fronius PV逆变器的ioBroker适配器，具有版本2.0.4-1起的Fronius Datalogger Web，版本3.0.3-1起的Fronius Datamanager和Symo Gen24。

## Changelog

### 1.1.0 (2020-11-24)
* (nkleber78) Implementation change for support of SYMO GEN24
* (nkleber78) Fix issue with adapters connected state

### 1.0.5 (2019-01-18)
* (ldittmar) compact mode compatibility added
* (ldittmar) add chinese support

### 1.0.4
* (ldittmar) Fix assignment to constant variable error

### 1.0.3
* (ldittmar) Ready for Admin 3

### 1.0.2
* (tobintax) Bugfix - Inverter Query regarding PAC adjusted.

### 1.0.1
* (tobintax) Added more values from Smartmeter
* (tobintax) Added more Powerflow Values
* (tobintax) Removed Value "EnergyReal_WAC_Minus_Relative" . This Value had no result and is undocumented in the fronius api documentation.

### 1.0.0
* (ldittmar) Fixed little errors

### 0.0.5
* (ldittmar) Read storage data and error/status codes

### 0.0.4
* (ldittmar) Read more data

### 0.0.3
* (ldittmar) Improved installation routine

### 0.0.2
* (ldittmar) First data is read

### 0.0.1
* (ldittmar) initial commit

## License
The MIT License (MIT)

Copyright (c) 2020 ldittmar <iobroker@lmdsoft.de>

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