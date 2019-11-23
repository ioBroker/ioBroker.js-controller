---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tuya/README.md
title: ioBroker.tuya
hash: ITcFjoWgbOVJgbLYwtz9JlPem9GwgnE7neC7mwnrJt4=
---
![商标](../../../en/adapterref/iobroker.tuya/admin/tuya.png)

![环保管理员徽章](https://badges.greenkeeper.io/Apollon77/ioBroker.tuya.svg)
![安装数量](http://iobroker.live/badges/tuya-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.tuya.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.tuya.svg)
![特拉维斯](http://img.shields.io/travis/Apollon77/ioBroker.tuya/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Apollon77/ioBroker.tuya?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.tuya.png?downloads=true)

＃ioBroker.tuya
**此适配器使用服务[哨兵](https://sentry.io)向开发人员自动向我报告异常和代码错误以及新设备架构。**

ioBroker适配器可连接到几个廉价的Wifi设备，这些设备关心连接到Tuya Cloud并主要使用Smartlife App / Alexa-Skill。该适配器支持读取实时状态更新并控制与相应手机应用程序同步的那些设备。

涂鸦手机是深圳氙气的ESP8266MOD WiFi智能设备。

除了可与Smart Live App一起使用的设备外，还应该可以使用Jinvoo Smart App，Xenon Smart应用程序，eFamilyCloud，io.e（Luminea等）应用程序。如果成功，请报告。

事实证明，该适配器可与“始终在wifi中”的所有设备配合使用。不支持仅在发生事件时才联机，发送数据并再次脱机的设备。

一个适配器实例可以处理一个路由UDP包的网络中的所有设备。

##适配器如何工作
###基本功能
适配器监视本地网络中Tuya（旧固件，因此仅未加密）设备的UDP数据包。需要将运行适配器的ioBroker主机放置在与设备相同的网段中，并且路由器需要UDP多播支持！

将所有检测到的设备添加到适配器，并且作为基本功能，适配器在定义的轮询间隔内请求数据。如果不与相应的移动应用程序同步（请参见下文），则无法实现其他功能，例如实时更新或控制。

进行设备同步之前，不会显示较新的加密设备（请参阅下一个...）

###设备同步后的高级功能
为了获得适配器的全部功能并支持具有新加密固件的设备，适配器需要知道加密密钥。

接收此加密密钥的最简单方法是从使用过的移动应用程序中获取它们。为此，适配器提供代理以捕获应用程序与tuya服务器的通信并获取所需的信息。

**对于iOS用户的重要说明：**此处描述的代理方法不再起作用。一旦有了Smart Life App版本3.10或更高版本，代理将不再可见来自App的通信。但它仍适用于所有Android App版本，因此最好的方法是Androis模拟器，如https://forum.iobroker.net/topic/23431/aufruf-tuya-adapter-tests-verschl%C3%BCsselte- ger％C3％A4te / 19

为此，首先需要在移动设备上添加自定义的根证书。
在适配器实例配置中单击“启动代理”时，将为您的系统创建证书，并在下载位置显示QR码。理想情况下，使用移动设备扫描QR码，并按照该过程添加并信任此根证书。
如果无法找到QR码位置（使用Docker等时可能发生），则在浏览器中打开“代理Web信息端口”，然后单击导航中的“ Root-CA”，您也可以下载CA文件。

现在，请确保关闭/杀死相应的Tuya智能应用程序。
之后，将代理端口和ioBroker主机添加为手机上WLAN连接的“手动”代理。

现在，打开相应的Tuya Smart App和/或重新加载。

如果收到相关数据包，则管理员配置将显示一条成功消息，然后在10秒后关闭代理。现在，您可以从手机中删除代理，也可以不信任证书。

此后，应该立即使用更有意义的名称更新对象，并从那时起自动接收实时更新，并且应该能够进行通信。

仅在开始时或将新设备添加到您的应用后才需要同步。

某些移动OS的某些映像可以在[代理页面](PROXY.md)中找到。

##不适用于电池供电的设备
此适配器通常不支持电池供电的设备！原因是他们并非一直在线以节省电量。每当他们收到信号时，就上网，将更新发送到Tuya云服务器，然后再次脱机。它们不会发出任何UDP程序包或在线时间足够长，以便适配器可以连接到它们。
一旦有人找到直接从Tuya云中获取数据的方法，这种情况可能会改变。

##学分
没有@ codetheweb，@ kueblc和@ NorthernMan54（https://github.com/codetheweb/tuyapi）和https://github.com/clach04/python-tuya的出色工作，就不可能实现适配器的工作。还有很多。

＃＃ 去做
*增强测试：状态检查和setState的
*增强文档

## Changelog

### 3.1.1 (2019-11-23)
* (Apollon77) try to get rid of SSL errors with new proxies
* (Apollon77) New schemas added
* (Apollon77) Sentry added for error reporting
* (Apollon77) Compact Mode added

### 3.0.0 (2019-09-03)
* (Apollon77) Switch from AnyProxy to mitm ... hopefully get SSL-Proxy working again. Important: The Proxy is called "NodeMITMProxyCA"!

### 2.0.4 (2019-08-01)
* (Apollon77) New schemas added
* (Apollon77) removed a check so that also devices that use other message formats can be read

### 2.0.3 (2019-07-11)
* (Apollon77) New schemas added
* (Apollon77) removed a check so that also devices that use other message formats can be read

### 2.0.2 (2019-06-27)
* (Apollon77) New schemas added
* (Apollon77) Update all Dependencies
* (Apollon77) Nodejs 6.x no longer supported!
* (Apollon77) Support encrypted devices

### 1.0.8 (2019-03-08) [Unreleased]
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

Copyright (c) 2018-2019 Apollon77 <iobroker@fischer-ka.de>

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