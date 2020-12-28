---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.siegenia/README.md
title: iobroker.siegenia
hash: 4S3fJKuQab8SA1AlpY1Ei5iRwPQxcS6KkamGo62zAro=
---
![NPM版本](http://img.shields.io/npm/v/iobroker.siegenia.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.siegenia.svg)
![依赖状态](https://img.shields.io/david/Apollon77/iobroker.siegenia.svg)
![已知漏洞](https://snyk.io/test/github/Apollon77/ioBroker.siegenia/badge.svg)
![NPM](https://nodei.co/npm/iobroker.siegenia.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/Apollon77/ioBroker.siegenia/master.svg)

＃ioBroker.siegenia
<img src="./admin/siegenia_logo.jpg"/>

**此适配器使用Sentry库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参见[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！ Sentry报告从js-controller 3.0开始使用。

此适配器为Siegenia气候和空气控制设备（https://www.siegenia.com）提供ioBroker支持。

适配器需要最低Nodejs8.x。

##功能集
此适配器支持所有当前设备：

* AEROPAC
* AEROMAT VT
*驾驶axxent DK / MH
* SENSOAIR
*航空氛围
* MHS系列
*空气管
*通用模块

该适配器能够自动检测与ioBroker在同一网络中的Siegenia设备，并将其列在管理界面中。检测后，您只需要更正用户名和密码即可。但是，您也可以手动输入IP和登录数据。

被检测设备的所有可用数据字段均以对象显示，并提供当前数据和/或允许更改数据。

适配器显示了计时器和其他更复杂的数据，但只能通过Siegenia App进行更改。

## Changelog

### 1.0.1 (2020-12-24)
* (Apollon77) update dependencies
* (Apollon77) disconnect device if authentication was not successful

### 1.0.0
* (Apollon77) initial release

## License
MIT License

Copyright (c) 2019 Apollon77

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