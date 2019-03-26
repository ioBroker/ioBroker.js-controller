---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.yamaha/README.md
title: 无题
hash: KWvAEhUWeT3Wbp3WUPKbBXlFPp9yVHn7joyGgOEnIlc=
---
![商标](../../../en/adapterref/iobroker.yamaha/admin/yamaha.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.yamaha.svg)
![测试](http://img.shields.io/travis/soef/ioBroker.yamaha/master.svg)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![建立状态](https://ci.appveyor.com/api/projects/status/t51976au5hcoo2mx?svg=true)

## IoBroker.yamaha
<!--
-->

####说明
适用于Yamaha AV接收器的适配器

####配置
目前没有自动发现，您必须输入接收器的IP

####安装
通过ioBroker管理员。

Otherweise在iobroker根目录中执行以下命令（例如在/ opt / iobroker中）``npm install iobroker.yamaha iobroker upload yamaha`

＃＃＃＃ 即时的
当它们产生时，将创建各州。即使用你的遥控器并改变一些东西，你会看到新的状态。
yamaha设备只接受一个连接。

＃＃＃＃ 要求
雅马哈Reciver

您必须在接收器的配置中启用“网络待机”功能

## Changelog
###0.3.19
* (soef) Changelog added to readme
###0.3.18
* (Apollon77) Update utils.js and usage, CI Testing and deps
###0.3.17
* (Apollon77) update basic package-file testing
###0.3.16
* (soef) node 0.12 removed from testing
###0.3.15
* (soef) Enhance CI testing
###0.3.14
* (soef) Possible exception in reconnect fixed
###0.3.12
* (soef) Version incr. for npm
###0.3.11
* (soef) reconnect overworked
###0.3.10
* (soef) realtime Ping now configurable
###0.3.8
* (soef) realtime states optimized
###0.3.7
* (soef) fix typo in creating realtime states
###0.3.6
* (soef) timeout to connect reduced

<!--

## License
The MIT License (MIT)

Copyright (c) 2015-2017 soef <soef@gmx.net>

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
-->