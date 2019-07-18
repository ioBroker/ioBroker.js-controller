---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.heytech/README.md
title: 无题
hash: kWMW8SJcOlPqPm10uyn7M99FbZkMx7i1pdGy2W4S3d0=
---
![NPM版本](http://img.shields.io/npm/v/iobroker.heytech.svg)
![下载](https://img.shields.io/npm/dm/iobroker.heytech.svg)
![依赖状态](https://img.shields.io/david/jey-cee/iobroker.heytech.svg)
![已知的漏洞](https://snyk.io/test/github/jey-cee/ioBroker.heytech/badge.svg)
![NPM](https://nodei.co/npm/iobroker.heytech.png?downloads=true)
![特拉维斯-CI](http://img.shields.io/travis/jey-cee/ioBroker.heytech/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/jey-cee/ioBroker.heytech?branch=master&svg=true)

<h1><img src="admin/heytech.png" width="64"/> ioBroker.heytech </h1>

适用于ioBroker的## HEYtech适配器
该适配器连接到HEYtech控制器获取自动数据并可以控制输出。

##手册
输入IP，端口，如果设置了PIN。
通常，您可以启用“自动检测”功能。如果这不起作用，您可以选择硬件手册。

##链接
[HEYTech](https://rolladensteuerung.de/index.htm)

## Changelog

### 0.1.5
* telnet connection will automaticly reconnect on refresh intervall to check weather and shutter status

### 0.1.4
* update lux calculation (Thanks to stefan)


### 0.1.3
* update calculation for brightness


### 0.1.2
* added LUX calculation


### 0.1.1
* added travis file


### 0.1.0
* ready for beta test


### 0.0.1
* (Author) initial release

## License
MIT License

Copyright (c) 2019 Jey Cee <jey-cee@live.com>

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