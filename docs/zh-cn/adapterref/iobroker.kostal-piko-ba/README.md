---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.kostal-piko-ba/README.md
title: ioBroker.kostal-皮科巴
hash: F7w0+SsGPU+Ue1vOL2ZMjRGagdqFvH/kPUnUD8tR5UM=
---
![商标](../../../en/adapterref/iobroker.kostal-piko-ba/admin/picoba.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.kostal-piko-ba.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.kostal-piko-ba.svg)
![依赖状态](https://img.shields.io/david/hombach/ioBroker.kostal-piko-ba.svg)
![已知漏洞](https://snyk.io/test/github/hombach/ioBroker.kostal-piko-ba/badge.svg)
![NPM](https://nodei.co/npm/iobroker.kostal-piko-ba.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/hombach/ioBroker.kostal-piko-ba/master.svg)

＃ioBroker.kostal-piko-ba
![NPM版本（稳定）](http://ioBroker.live/badges/kostal-piko-ba-stable.svg)![安装数量（最新）](http://ioBroker.live/badges/kostal-piko-ba-installed.svg)

![Node.js CI](https://github.com/hombach/ioBroker.kostal-piko-ba/workflows/Node.js%20CI/badge.svg)

##用于读取iOBroker的Kostal Piko BA数据的适配器
用于读取Kostal Piko BA数据的适配器。适配器创建一些状态并顺序更新它们。
适配器还可以与Kostal Piko 15逆变器一起使用。
如果您验证其他逆变器的功能并向我发送注释，将不胜感激。

##设置
要连接到Kostal Pico BA逆变器，必须将其IP地址记入配置。
您还可以编辑实时，每日和实时数据的更新频率。

##注意
该适配器使用Sentry库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参见[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！ Sentry报告从js-controller 3.0开始使用。

## Changelog
### 1.1.2 (26.10.2020)
* (HombachC) bumped dependencies

### 1.1.1 (09.10.2020) stable
* (HombachC) minor documentation tweaks; DC current accuracy changed to mA

### 1.1.0 (09.10.2020)
* (tobstare) added DC1-3 Current, Voltage and Power
* (HombachC) added battery.ChargeCycles
* (HombachC) bumped dependencies; added battery.temperature

### 1.0.2 (23.09.2020) stable
* (HombachC) public release for stable repo

### 0.8.0 (18.08.2020)
* (HombachC) seperate editable poll timer for statistics data

### 0.7.4 (03.07.2020)
* (HombachC) added sentry.io support

### 0.6.1 (28.06.2020)
* (HombachC) poll of statistics data separated

### 0.5.1 (22.06.2020)
* (HombachC) introduced editable poll interval 

### 0.1.0 (15.05.2020)
* (HombachC) initial working release

## License
MIT License

Copyright (c) 2020 HombachC

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