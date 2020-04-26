---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lgtv-rs/README.md
title: ioBroker LG TV RS232适配器
hash: ggSIdOhu8GvDjjGhpesEpxaNFGX5g/UMCGsvDjQZnXM=
---
![商标](../../../en/adapterref/iobroker.lgtv-rs/admin/lg_admin.png)

![安装数量](http://iobroker.live/badges/lgtv-rs-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.lgtv-rs.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.lgtv-rs.svg)
![测验](http://img.shields.io/travis/instalator/ioBroker.lgtv-rs/master.svg)
![NPM](https://nodei.co/npm/iobroker.lgtv-rs.png?downloads=true)
![捐](https://img.shields.io/badge/Donate-PayPal-green.svg)

＃ioBroker LG TV RS232适配器
ioBroker LG TV RS232适配器用于与Etnernet网关一起通过RS232控制LG TV。
模型和命令的列表包含在`admin/commands.json`文件中。

＃＃ 硬件
该驱动程序允许您通过[适配器](http://blog.instalator.ru/archives/744)RS232到以太网连接LG TV。

作为到以太网的RS232网关，使用了需要下载[此代码](https://github.com/stepansnigirev/ArduinoSerialToEthernet)的任何Arduino兼容卡。
您还将需要以太网Shield W5100或W5500和RS232到TTL转换器。

##支持
支持的型号：LD750是...

## Changelog
### 0.0.4
  (instalator) fix error

### 0.0.3
  (instalator) alfa

### 0.0.1
  (instalator) initial

## License
The MIT License (MIT)

Copyright (c) 2020 instalator <vvvalt@mail.ru>

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