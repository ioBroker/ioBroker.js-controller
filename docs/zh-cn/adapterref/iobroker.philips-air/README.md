---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.philips-air/README.md
title: ioBroker.philips-air
hash: zYfc3wAURPeQ5XU+DF2XdcWICEq5gT8ZMhvZO62Px8A=
---
![商标](../../../en/adapterref/iobroker.philips-air/admin/philips-air.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.philips-air.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.philips-air.svg)
![安装数量（最新）](http://iobroker.live/badges/philips-air-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/philips-air-stable.svg)
![依赖状态](https://img.shields.io/david/iobroker-community-adapters/iobroker.philips-air.svg)
![已知漏洞](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.philips-air/badge.svg)
![NPM](https://nodei.co/npm/iobroker.philips-air.png?downloads=true)

＃ioBroker.philips-air
##飞利浦ioBroker空气净化器适配器
将飞利浦空气净化器与ioBroker连接。
**仅通过AC2729测试**，但应与通过COAP进行加密通信的新净化器一起使用。
![AC2729](../../../en/adapterref/iobroker.philips-air/img/device.png)

[链接到philips网站](https://www.philips.de/c-m-ho/luftreiniger-und-luftbefeuchter/kombi)

##用法
只需要设备的IP地址。在您的路由器中找到它（例如`MiCO`）。
可能发生的情况是，某些设备没有所有变量，它们将不填充在对象树中。

![对象](../../../en/adapterref/iobroker.philips-air/img/objects.png)

## Changelog

### 0.1.1 (2020-10-14)
* (ioBroker) initial release

## License
MIT License

Copyright (c) 2020 ioBroker <dogafox@gmail.com>

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