---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.meross/README.md
title: ioBroker.meross
hash: 5iNCBlSzyWs/t91v7Ie04Ag2rsNq8nXT9tXBisGyGr0=
---
![商标](../../../en/adapterref/iobroker.meross/admin/meross-logo.png)

![安装数量](http://iobroker.live/badges/meross-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.meross.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.meross.svg)

＃ioBroker.meross
![测试与发布](https://github.com/Apollon77/iobroker.meross/workflows/Test%20and%20Release/badge.svg)[![翻译状态]（https://weblate.iobroker.net/widgets/adapters/-/meross/svg-badge.svg）](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用Sentry库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参见[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！ Sentry报告从js-controller 3.0开始使用。

＃＃ 描述
该适配器允许通过连接到Meross云服务器来控制Meross设备。

您需要提供您的Cloud登录凭据。适配器连接到您的云帐户，并通过MQTT订阅所有设备数据。因此，设备需要连接到其云。当前，尚无本地控制设备的方法。

一个适配器实例将显示一个Meross Cloud帐户中的所有设备，并允许对其进行控制。

##已知的工作设备
* mss425e
* mss310
* MSS620欧盟/英国

如果有更多设备可用（或不能运行），请通过打开GitHub问题进行报告。

##如何报告问题和功能请求
请为此使用GitHub问题。

最好是将适配器设置为“调试日志”模式（“实例”->“专家模式”->“列日志级别”）。然后，请从磁盘中获取日志文件（ioBroker安装目录中的子目录“ log”，而不是Admin，因为Admin会删掉行）。如果您不喜欢在GitHub问题中提供它，也可以通过电子邮件（iobroker@fischer-ka.de）将其发送给我。请添加对相关GitHub问题的引用，并描述我什么时候在日志中看到的内容。

## Changelog

### 1.6.1 (2021-04-23)
* (Apollon77) prevent crash case (Sentry IOBROKER-MEROSS-Z)

### 1.6.0 (2021-04-18)
* (Apollon77) add MOD100 Diffuser Spray device

### 1.5.1 (2020-12-05)
* (Apollon77) generate an unique uuid for each connection, fixes the "Server not available"

### 1.5.0 (2020-06-25)
* (Apollon77) Prevent crash cases (Sentry IOBROKER-MEROSS-G, IOBROKER-MEROSS-F)
* (Apollon77) Add warning about poll interval and cloud deactivation and reset poll interval to 30s for now

### 1.4.1 (2020-06-12)
* (Apollon77) Fix Admin finally

### 1.4.0 (2020-06-12)
* (Apollon77) Fix Admin
* (Apollon77) Remove the automatic cutting of passwords to 15 characters, but log info message

### 1.3.13 (2020.04.12)
* (Apollon77) add auto decryption handling with js-controller 3.0
* (Apollon77) update meross library to prevent some crash cases

### 1.3.12 (2020.03.08)
* (Apollon77) update dependencies

### 1.3.11 (2020.02.05)
* (Apollon77) optimize error handling
* (Apollon77) Switch Sentry to iobroker own instance hosted in germany

### 1.3.9 (2019.12.18)
* (Apollon77) Prevent some error cases on disconnects

### 1.3.8 (2019.12.07)
* (Apollon77) update dependencies

### 1.3.7 (2019.12.01)
* (Apollon77) Prevent some error cases on disconnects

### 1.3.6 (2019.11.28)
* (Apollon77) Prevent some error cases on disconnects

### 1.3.5 (2019.11.28)
* (Apollon77) Prevent some error cases on disconnects

### 1.3.4 (2019.11.26)
* (Apollon77) Add Temperature/Humidity support for MTS100

### 1.3.1 (2019.11.25)
* (Apollon77) Add names to hub sub devices

### 1.3.0 (2019.11.25)
* (Apollon77) Add msg100 with Garage Door Reed contact
* (Apollon77) Add reconnection handling
* (Apollon77) Add light support (e.g. MSL120 RGB bulb)
* (Apollon77) Add units and roles for electricity
* (Apollon77) Add support for MSXH0 (Air Purifyer)
* (Apollon77) Add support for Hub and Thermostates
* (Apollon77) Allow to control DND mode (LED) - be aware then if controlled via meross app it my get out of sync!
* (Apollon77) Integrate sentry.io for automated error/exception reporting
* (Apollon77) Add support for mts100v3
* (Apollon77) add Compact mode
* (Apollon77) add control option for (rgb) lights

### 1.0.0 (2018.12.16)
* (Apollon77) finalize and move to 1.0.0

### 0.4.1 (2018.11.26)
* (Apollon77) finalize version and allow electricity polling interval to be configured

### 0.3.0 (2018.11.16)
* (Apollon77) add support for mss310 devices

### 0.1.0 (2018.11.14)
* (Apollon77) First release to support ToggleX devices

## License
The MIT License (MIT)

Copyright (c) 2018-2020 Apollon77 <iobroker@fischer-ka.de>

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