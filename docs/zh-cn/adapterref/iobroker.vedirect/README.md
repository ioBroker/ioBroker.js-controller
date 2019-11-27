---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vedirect/README.md
title: ioBroker.vedirect
hash: xB+rOCOuY6hia3dBJqbIlFGSYKosLiHFRDaoB3jYDSg=
---
![商标](../../../en/adapterref/iobroker.vedirect/admin/vedirect.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.vedirect.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.vedirect.svg)
![依赖状态](https://img.shields.io/david/iobroker-community-adapters/iobroker.vedirect.svg)
![已知漏洞](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.vedirect/badge.svg)
![NPM](https://nodei.co/npm/iobroker.vedirect.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.vedirect/master.svg)

＃ioBroker.vedirect
## IoBroker的vedirect适配器
通过USB <->串行连接从具有vedirect连接器的Victron设备读取VE.direct数据。

###配置
在适配器配置中设置适当的设备（例如/ dev / ttyUSB0）。

## Changelog

### 0.1.0
* (Andiling) error in device modes corrected

### 0.0.9
* (Andiling) improve state attributes

### 0.0.8
* (DutchmanNL) set connection state to false when no data received for 10 seconds
* (DutchmanNL & Andiling) reconnect to USB when connection lost
* (DutchmanNL & Andiling) Update state attributes

### 0.0.7
* (DutchmanNL & Andiling) Alpha release

## License
MIT License

Copyright (c) 2019 DutchmanNL <rdrozda@hotmail.com>

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