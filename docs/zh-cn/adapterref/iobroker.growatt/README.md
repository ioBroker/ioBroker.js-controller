---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.growatt/README.md
title: ioBroker.growatt
hash: tXmagMsqudjCn/PupKABd7yRlnTk1g53bn8Uk5R9HuE=
---
![商标](../../../en/adapterref/iobroker.growatt/admin/glogo.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.growatt.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.growatt.svg)
![安装数量（最新）](http://iobroker.live/badges/growatt-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/growatt-stable.svg)
![依赖状态](https://img.shields.io/david/PLCHome/ioBroker.growatt.svg)
![已知漏洞](https://snyk.io/test/github/PLCHome/ioBroker.growatt/badge.svg)
![NPM](https://nodei.co/npm/iobroker.growatt.png?downloads=true)

＃ioBroker.growatt
## IoBroker的growatt适配器
ioBroker Growatt适配器可与Growatt Shine Server通信。
我没有关系。
通常，每5分钟将数据从数据记录器发送到云端。
该软件每30秒查询一次服务器，以使偏移量不会太大。

并非所有工厂类型都已实现。

当前只能读取数据，无法写入参数或更改参数。

##管理页面
###用户和密码
请输入您在Shine应用程序或Web门户中也使用的名称和密码。

###使用共享密钥登录
在Growatt网站上的能源，工厂管理，操作工具下，您可以通过电子邮件向自己发送密钥。

###读取工厂数据
该数据记录包含存储的主数据

###读取状态数据
这些数据不适用于所有工厂（不是INV / MAX / TLX）。该数据集包含实时数据。

###读取图表的最后数据
这些数据仅适用于没有读取状态数据（INV / MAX / TLX）的工厂。搜索当天的最后有效数据。

###读取图表数据
这些数据仅适用于没有读取状态数据的工厂，并且需要读取图表的最后数据（INV / MAX / TLX）。数据被写入并存储为JSON字符串。

###读取总数据
该数据记录包含聚合数据。

###读取设备数据
该数据记录包含来自设备的一些数据。其他类别中也有一些数据。

###阅读天气
该数据集包含天气预报。

## Changelog
### 0.0.12 (27.11.2020)
* (PLCHome) wrong initialization for shared key: string instead of boolean

### 0.0.11 (27.11.2020)
* (PLCHome) Read me

### 0.0.10 (26.11.2020)
* (PLCHome) Shared key login
* (PLCHome) Last value of the graph if there are no live data.
* (PLCHome) Change of the polling interval

### 0.0.9 (05.10.2020)
* (PLCHome) fix no feature 'ADAPTER_AUTO_DECRYPT_NATIVE'

### 0.0.8 (05.10.2020)
* (PLCHome) fix io-package

### 0.0.7 (05.10.2020)
* (PLCHome) with "@iobroker/adapter-core": "^2.4.0", the js-controller dep needs to be >=2.0.0!
* (PLCHome) io-package native defined 5 values, admin sets 7
* (PLCHome) store password encrypted

### 0.0.6 (31.08.2020)
* (PLCHome) translation with ioBroker tool.

### 0.0.5
* (PLCHome) initial release.

### 0.0.1
* (PLCHome) initial release.

## License
MIT License

Copyright (c) 2020 PLCHome <https://github.com/PLCHome>

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