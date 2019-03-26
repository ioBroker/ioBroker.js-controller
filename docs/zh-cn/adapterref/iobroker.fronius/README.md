---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.fronius/README.md
title: 无题
hash: wpEf6EX6FKAn1iJFf8THR4Aw/wXOYtvmFDLyHNZYQfQ=
---
![安装数量](http://iobroker.live/badges/fronius-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.fronius.svg)
![下载](https://img.shields.io/npm/dm/iobroker.fronius.svg)
![依赖状态](https://img.shields.io/david/iobroker-community-adapters/iobroker.fronius.svg)
![已知的漏洞](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.fronius/badge.svg)
![NPM](https://nodei.co/npm/iobroker.fronius.png?downloads=true)
![特拉维斯-CI](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.fronius/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/iobroker-community-adapters/ioBroker.fronius?branch=master&svg=true)

<h1><img src="https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.fronius/master/admin/fronius.png" width="64"/> ioBroker.fronius </h1>

[![Greenkeeper徽章]（https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.fronius.svg）](https://greenkeeper.io/)

##用于ioBroker的Fronius逆变器适配器
这是适用于Fronius PV逆变器的ioBroker适配器，带有Fronius Datalogger Web 2.0.4-1版本或Fronius Datamanager 3.0.3-1版本。

## Changelog

### 1.0.5
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

Copyright (c) 2018 ldittmar <iobroker@lmdsoft.de>

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