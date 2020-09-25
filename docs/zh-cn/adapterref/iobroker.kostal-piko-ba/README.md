---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.kostal-piko-ba/README.md
title: ioBroker.kostal-皮科巴
hash: n4Ot9pfMU0UfRGYsADnc9pRw0XapMD0jittPQnQcxrQ=
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

该适配器使用服务Sentry.io向开发人员自动向我报告异常和代码错误以及新设备架构。详情请见下文！

##用于读取iOBroker的Kostal Piko BA数据的适配器
用于读取Kostal Piko BA数据的适配器。适配器创建一些状态并顺序更新。

###设置
要连接到Kostal Pico BA逆变器，请在配置中输入其IP地址。

###什么是Sentry.io，什么报告给该公司的服务器？
Sentry.io是一项服务，供开发人员从其应用程序中获取有关错误的概述。确切地说，这是在此适配器中实现的。
当适配器崩溃或发生其他代码错误时，此错误消息（也出现在ioBroker日志中）将提交给Sentry。
当您允许iobroker GmbH收集诊断数据时，还将包括您的安装ID。
这使Sentry可以对错误进行分组，并显示有多少唯一用户受此错误影响。
所有这些都帮助我提供了基本不会崩溃的无错误适配器。

## Changelog
### 1.0.3 (23.09.2020)
* (HombachC) bumbed got; added battery.temperature

### 1.0.2 (23.09.2020)
* (HombachC) optimized object roles

### 1.0.1 (22.09.2020)
* (HombachC) bumped dependencies; added some clearing of timeouts

### 1.0.0 (11.09.2020)
* (HombachC) first public release for stable repo

### 0.8.5 (26.08.2020)
* (HombachC) bumped dependencies

### 0.8.2 (18.08.2020)
* (HombachC) changed scheduling code

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