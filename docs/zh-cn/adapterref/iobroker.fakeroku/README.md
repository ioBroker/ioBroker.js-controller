---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.fakeroku/README.md
title: ioBroker.fakeroku
hash: PhCqlWB3YX4j4bvXMQXbutCelfuftGo/QGBDhbRX2Kg=
---
![商标](../../../en/adapterref/iobroker.fakeroku/admin/fakeroku.png)

![建立状态](https://travis-ci.org/Pmant/ioBroker.fakeroku.svg?branch=master)
![安装数量](http://iobroker.live/badges/fakeroku-stable.svg)

#ioBroker.fakeroku此ioBroker适配器模拟Roku，其唯一目的是将ioBroker连接到Logitech Harmony Hub。
它也可以与其他可以控制Roku的设备一起使用。
##安装
ioBroker管理中的Intall适配器

##用法
### IoBroker管理员中的配置：
 - ***LAN-IP*** 需要是您的ioBroker设备的网络IP
 -  ***多播IP ***只有在你知道自己在做什么的情况下才会改变它
 -  *** Roku设备***添加/更改/删除设备进行模拟

### Harmony APP和软件中的配置
按照本指南添加Roku 3设备：https：//support.myharmony.com/en-us/harmony-experience-with-roku您可以在Harmony上重命名设备。

＃＃＃ 状态
当fakeRoku第一次收到密钥时，会自动创建状态。

## Changelog

### 0.2.1
  (Pmant) fix jQuery error in admin
  (ykuendig) add translations

### 0.2.0
  (Pmant) run multiple fakeroku's in one instance

### 0.1.1
  (Pmant) fix package.json

### 0.1.0
  (Pmant) initial release

## License
The MIT License (MIT)

Copyright (c) 2017 Pmant

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