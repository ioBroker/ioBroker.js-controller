---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/Apollon77/ioBroker.tuya/edit/master//README.md
title: Tuya
hash: 4JKNgyT51t9U/W5Rn7obRXVV7XvGZCz1MW4H7EI0xYw=
adapter: true
license: MIT
authors: Apollon77 <iobroker@fischer-ka.de>
description: Tuya Adapter
keywords: Tuya, switch, smarthome, iobroker
readme: https://github.com/Apollon77/ioBroker.tuya/blob/master/README.md
mode: daemon
materialize: true
compact: false
published: 2018-10-30T07:46:53.906Z
version: 1.0.7
BADGE-安装数量: http://iobroker.live/badges/tuya-stable.svg
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.tuya.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.tuya.svg
BADGE-特拉维斯-CI: http://img.shields.io/travis/Apollon77/ioBroker.tuya/master.svg
BADGE-AppVeyor: https://ci.appveyor.com/api/projects/status/github/Apollon77/ioBroker.tuya?branch=master&svg=true
BADGE-NPM: https://nodei.co/npm/iobroker.tuya.png?downloads=true
---
![商标](zh-cn/adapterref/iobroker.tuya/../../../en/adapterref/iobroker.tuya/admin/tuya.png)


＃ioBroker.tuya
[![Greenkeeper徽章]（https://badges.greenkeeper.io/Apollon77/ioBroker.tuya.svg）](https://greenkeeper.io/)

ioBroker适配器连接到几个小而便宜的Wifi设备，这些设备与Tuya Cloud相连，主要使用Smartlife App / Alexa-Skill。适配器支持在与相应的移动电话应用程序同步后读取实时状态更新和控制这些设备。

图雅设备是来自深圳氙气灯的ESP8266MOD WiFi智能设备。

除了可与Smart Live App一起使用的设备外，还应该可以使用Jinvoo智能应用程序，Xenon Smart应用程序，eFamilyCloud，io.e（Luminea等）应用程序。如果成功请报告。

适配器经证明可与所有“始终处于wifi”的设备配合使用。不支持仅在发生事件时联机，发送数据并再次脱机的设备。

一个适配器实例可以处理一个网络中路由UDP包的所有设备。

##适配器的工作原理
###基本功能
适配器监视本地网络以查找Tuya设备的UDP数据包。需要将运行适配器的ioBroker主机放置在与设备相同的网段中，并且路由器需要支持UDP多播！

所有检测到的设备都将添加到适配器中，并且作为基本功能，适配器在定义的轮询间隔中请求数据。如果没有与相应的移动应用程序同步（见下文），则无法进行实时更新或控制等其他功能。

###设备同步后的高级功能
要获得适配器的完整功能，适配器需要知道加密密钥。

接收此加密密钥的最简单方法是从使用过的移动应用程序中获取它们。为此，适配器提供代理以捕获应用程序与tuya服务器的通信并获取所需信息。

首先，您需要在移动设备上添加自定义Root证书。
当您在适配器实例配置中单击“启动代理”时，将为您的系统创建证书，并向下载位置显示QR码。理想情况下，使用移动设备扫描QR码，然后按照流程添加并信任此根证书。
如果无法访问QR代码位置（可能在使用Docker等时发生），则在浏览器中打开“代理Web信息端口”，然后单击导航中的“Root-CA”，也可以下载CA文件。

现在请务必关闭/杀死相应的Tuya智能应用程序。
之后，在您的手机上为您的WLAN连接添加代理端口和ioBroker主机作为“手动”代理。

现在打开相应的Tuya智能应用程序和/或重新加载。

如果收到相关数据包，Admin配置将显示成功消息，然后在10秒后关闭代理。您现在可以从手机中删除代理，也可以取消信任证书。

在此之后，应该使用更有意义的名称更新对象，然后自动接收实时更新，并且应该能够进行通信。

仅在最初或在您的应用程序中添加新设备后才需要同步。

某些移动操作系统的某些图像可以在[代理页](PROXY.md)中找到。

##学分
如果没有@codetheweb和@ NorthernMan54（https://github.com/codetheweb/tuyapi）和https://github.com/clach04/python-tuya以及更多的工作，那么适配器的工作是不可能的。 。

＃＃ 去做
*增强测试：状态检查和setState
*增强文档

## Changelog

### 1.0.8 (2019-03-08)
* (Apollon77) New schemas added

### 1.0.7 (2018-11-23)
* (Apollon77) New schemas added, fixed one error

### 1.0.5 (2018-11-18)
* (Apollon77) preserve device name too, New schemas

### 1.0.4 (2018-11-16)
* (Apollon77) New schemas added

### 1.0.3
* (Apollon77) New schemas added

### 1.0.2
* (Apollon77) New schemas added
* (Apollon77) Data are requested from the device after controlling because sometimes not all data seems to be updated automatically

### 1.0.1
* (Apollon77) Automatically convert some value types like booleans better

### 1.0.0
* (Apollon77) Add several new schema definitions
* (Apollon77) Optimizations and bug fixes

### 0.1.3
* (Apollon77) Add several new schema definitions
* (Apollon77) Try to preserve names of objects. Sync with App via proxy will overwrite in any case!
* (Apollon77) Optimizations and bug fixes

### 0.1.2
* (BuZZy1337) Optimized Admin, thank you very much!

### 0.1.0/1
* (Apollon77) development and first tests

## License

The MIT License (MIT)

Copyright (c) 2018 Apollon77 <iobroker@fischer-ka.de>

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