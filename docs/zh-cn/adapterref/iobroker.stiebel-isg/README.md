---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.stiebel-isg/README.md
title: ioBroker.stiebel-ISG
hash: lXdJlkV8IJ5DfqLggZqwn29A+sUXKi9YJHCVe6vafmQ=
---
![商标](../../../en/adapterref/iobroker.stiebel-isg/admin/stiebel-isg.png)

![安装数量](http://iobroker.live/badges/stiebel-isg-stable.svg)
![建立状态](https://api.travis-ci.org/unltdnetworx/ioBroker.stiebel-isg.svg?branch=master)
![NPM版本](https://img.shields.io/npm/v/iobroker.stiebel-isg.svg)
![下载](https://img.shields.io/npm/dm/iobroker.stiebel-isg.svg)
![NPM](https://nodei.co/npm/iobroker.stiebel-isg.png?downloads=true)

＃ioBroker.stiebel-isg
=================

此适配器用于从stiebel-eltron / tecalor互联网服务网关（ISG）读取值并控制设备。

使用自己承担风险！绝对不保证损害等等。

欢迎提供帮助或提示。

＃＃ 脚步
1.安装adpater

2.从你的stiebel-isg。[x]  - 对象中获取值。

＃＃ 要求
* stiebel-eltron / tecalor互联网服务网关（ISG）

## Changelog
### 1.4.2
* Timeout of 10 seconds for pulling settings after multiple commands to reduce the load of the ISG

### 1.4.1
* Core Files/Testing Update and introduce adapter-core

### 1.4.0
* expert-values can be pulled/written

### 1.3.2
* bugfix: 0 is now recognized

### 1.3.1
* reboot-option added

### 1.3.0
* support for compact-mode added

### 1.2.4
* bug repaired: unnecessary space characters in units removed 

### 1.2.3
* bug repaired: ignore hidden fields in some heatings

### 1.2.2
* additional values available, like filter-lifetime

### 1.2.1
* according to a problem with the history-adapter, umlauts can now be deactivated

### 1.2.0
* status for photovoltaik and device included

### 1.1.1
* bugfix for controls-menu

### 1.1.0
* Energymanagment added (ISG plus required)

### 1.0.3
* bugfix in version number

### 1.0.2
* code cleanup

### 1.0.1
* added two new groups for controls, roomtemp 1 and 2

### 1.0.0
* confirmed stable release

### 0.1.0
* release candidate for stable
* additional controles added

### 0.0.1
* initial release

## License
The MIT License (MIT)

Copyright (c) 2018-2019 Michael Schuster <development@unltd-networx.de>

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