---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.solarviewdatareader/README.md
title: ioBroker.solarviewdatareader
hash: N2WdT+EmCQqXeNw1uSS9qyLsRAmJtIdcT7DfxuwaPkk=
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

##配置
### IP地址，端口
要从数据记录器获取数据，您必须输入ip地址和端口。标准端口是15000。请参考Solarview文档。

### D0转换器
如果将D0转换器连接到Solarview数据记录器，则可以启用此选项。

###自用电表1至5
如果您有S0表，则可以启用此选项。

###逆变器1至4
您可以分别启用每个逆变器。

###间隔，间隔开始，间隔结束
您可以在此处配置时间范围和间隔。

###设置系统变量CCU，系统变量
这是Homematic CCU的一项特殊功能。您可以在CCU中定义系统变量。
在此系统变量中，将存储实际的PAC值。

## Changelog

### 0.2.0
* (Achim Fürhoff) Error handling optimized, self consumption meter implemented
### 0.1.0
* (Achim Fürhoff) optimizations for adding to latest repository
### 0.0.5
* (Achim Fürhoff) Code optimized, unload optimized, documentation added 
### 0.0.4
* (Achim Fürhoff) Objects, Telnet client and checksum calculation changed
### 0.0.3
* (Achim Fürhoff) inverter selection added
### 0.0.2
* (Achim Fürhoff) test version
### 0.0.1
* (Achim Fürhoff) initial release

## License
MIT License

Copyright (c) 2020 Achim Fürhoff <achim.fuerhoff@outlook.de>
Copyright (c) 2019 Achim Fürhoff

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