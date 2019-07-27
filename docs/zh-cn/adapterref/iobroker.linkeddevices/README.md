---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.linkeddevices/README.md
title: 无题
hash: 5iPnnZJG/j2E5kYMQgXXzJCv7PFT9Oyp9RSMOwddB/w=
---
![NPM版本](http://img.shields.io/npm/v/iobroker.linkeddevices.svg)
![下载](https://img.shields.io/npm/dm/iobroker.linkeddevices.svg)
![安装数量](http://iobroker.live/badges/linkeddevices-installed.svg)
![依赖状态](https://img.shields.io/david/Scrounger/iobroker.linkeddevices.svg)
![已知的漏洞](https://snyk.io/test/github/Scrounger/ioBroker.linkeddevices/badge.svg)
![NPM](https://nodei.co/npm/iobroker.linkeddevices.png?downloads=true)
![特拉维斯-CI](http://img.shields.io/travis/Scrounger/ioBroker.linkeddevices/master.svg)

<h1><img src="admin/linkeddevices.png" width="32"/> ioBroker.linkeddevices </h1>

适用于ioBroker的## linkeddevices适配器
[![贝宝（https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif）](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YHPPW474N5CKQ&source=url)

linkeddevices创建具有自定义结构的设备的链接对象（数据点）。这使得可以在ioBroker中创建一个结构，其中所有对象都是集中的，例如，用于vis视图或脚本。这提供了例如以下优点：通过硬件交换，仅必须重新创建链接对象并且所有可见视图和脚本再次起作用。

使用适配器，您还可以转换对象或将其转换为其他类型（尚未完全实现）。

![Strukture](../../../en/adapterref/iobroker.linkeddevices/screenshots/structure.png)

此适配器的灵感来自[Pman的虚拟设备脚本](https://forum.iobroker.net/topic/7751/virtual-devices)。

##配置
* [英文描述]（doc / en / README.md）
* [deutsche Beschreibung]（doc / de / README.md）

## Changelog

### 0.3.0
* (Scrounger) linked devices overview added to adapter configuration
* (Scrounger) bug fixes

### 0.2.1
* (Scrounger) boolean to string converter added
* (Scrounger) bug fixes

### 0.2.0
* (Scrounger) number to boolean converter added
* (Scrounger) number expert settings for min, max added
* (Scrounger) bug fixes

### 0.1.5
* (Scrounger) expert settings properties renamed -> you must recreate your expert settings for all parent objects !!!
* (Scrounger) custom dialog prepared for convert to other type
* (Scrounger) bug fixes

### 0.1.0
* (Scrounger) custom dialog layout changed
* (Scrounger) conversion bug fixes
* (Scrounger) change unit bug fixes

### 0.0.4
* (Scrounger) main function added
* (Scrounger) change unit for linked objects
* (Scrounger) set number of decimal places for linked objects
* (Scrounger) set conversion for read only linked objects

### 0.0.1
* (Scrounger) initial release

## License
MIT License

Copyright (c) 2019 Scrounger

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