---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.owntracks/README.md
title: 已移至https://github.com/iobroker-community-adapters/ioBroker.owntracks
hash: IWfeYjtdT3DDyKV4cYon2vDhXbQJh+qDAbqzQqcKwlw=
---
![安装数量](http://iobroker.live/badges/owntracks-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.owntracks.svg)
![下载](https://img.shields.io/npm/dm/iobroker.owntracks.svg)
![NPM](https://nodei.co/npm/iobroker.owntracks.png?downloads=true)

＃已移至https://github.com/iobroker-community-adapters/ioBroker.owntracks
![商标](../../../en/adapterref/iobroker.owntracks/admin/owntracks.png)

＃ioBroker.owntracks
[OwnTracks](http://owntracks.org/)是适用于Android和iOS的应用程序。

应用程序将您的位置（设备位置）连续发送到特定服务器。在我们的例子中，它将是ioBroker服务器。 MQTT协议将用于通信或ioBroker.cloud / ioBroker.iot适配器。

链接：

 -  Android：[https://play.google.com/store/apps/details?id=org.owntracks.android](https://play.google.com/store/apps/details?id=org.owntracks .android）
 -  iOS：[https://itunes.apple.com/de/app/owntracks/id692424691?mt=8](https://itunes.apple.com/de/app/owntracks/id692424691?mt=8）

##安装说明
###连接配置（使用MQTT服务器）
OwnTracks适配器在端口1883（可配置）上启动MQTT服务器以从具有坐标的设备接收消息。
问题是必须可以从Internet访问此服务器。
通常有路由器或防火墙，必须配置为转发流量。

###应用程序和适配器配置
必须分别在ioBroker适配器的Android / iOS应用程序中设置以下首选项：

 - 连接/模式 -  MQTT私有
 - 连接/主机/主机 - 系统或DynDNS域的IP地址。例如。 http://www.noip.com/允许使用域名而不是IP地址。
 - 连接/主机/端口 -  1883或路由器上的端口
 - 连接/主机/ WebSockets  - 错误
 - 连接/识别/用户名 -  iobroker
 - 连接/标识/密码 - 来自适配器设置
 - 连接/标识/ DeviceID  - 设备或人员的名称。对于此设备，将创建状态。例如。如果deviceID为“Mark”，则首次联系后将创建以下状态：

     -  owntracks.0.users.Mark.longitude
     -  owntracks.0.users.Mark.latitude

 - 连接/标识/跟踪ID  - 用户的简称（最多2个字母），用于在地图上写入。
 - 连接/安全/ TLS  - 关闭
 - 高级/加密密钥 - 可选，但建议：添加密码加密

请通过抽屉中的“状态”条目验证owntracks是否已连接到iobroker实例：

![设置](../../../en/adapterref/iobroker.owntracks/img/connection.jpg)

＃＃＃ 重要的提示！
**当收到特定的有效载荷时，将生成ioBroker中的状态!!这意味着ioBroker中的位置将在用户第一次离开或进入该位置时生成。**下面您将看到目标结构

![设置](../../../en/adapterref/iobroker.owntracks/img/structure.png)

###区域配置
要在owntracks适配器中设置位置，您必须在owntracks Android / iOS应用程序中创建区域。
为此，请转到抽屉中的“区域”

![设置](../../../en/adapterref/iobroker.owntracks/img/regions1.jpg)

单击右上角的加号（+）创建一个新区域

![设置](../../../en/adapterref/iobroker.owntracks/img/regions2.jpg)

使用右上角的位置按钮检索当前位置或自己在纬度和经度中键入它们。此外，指定位置的半径。如果您共享该位置，您的朋友（请参阅Android / iOS应用程序的抽屉）会在您进入/离开某个位置时收到通知。

![设置](../../../en/adapterref/iobroker.owntracks/img/regions3.jpg)

###图标设置（在ioBroker.owntracks适配器中）
您可以为每个用户定义一个图标。只需按拖放或鼠标单击即可上传图像。它将自动缩放到64x64。

该名称必须等于OwnTracks应用程序中的DeviceID。

![设置](../../../en/adapterref/iobroker.owntracks/img/settings1.png)

## Changelog

### 0.6.2 (2019-02-14)
* (zefau) Added support for [ioBroker compact mode](https://forum.iobroker.net/viewtopic.php?f=24&t=20387#p213466)
* (zefau) Added support for Gulp translations

### 0.6.0 (2019-01-27)
* (zefau) Added Admin v3 / materialized support
* (zefau) Added option for websockets in the adapter settings

### 0.5.1 (2019-01-25)
* (zefau) fixed an error when connection got closed

### 0.5.0 (2018-10-14)
* (zefau) Added support for locations

### 0.4.0 (2018-10-14)
* (zefau) Added support for encryption key

### 0.3.0 (2018-06-05)
* (matspi) Fix handling of publish messages

### 0.2.0 (2017-01-03)
* (jp112sdl) added two properties timestamp and datetime

### 0.1.1 (2016-09-05)
* (bluefox) add pictures

### 0.1.0 (2016-09-04)
* (bluefox) initial release

## License
The MIT License (MIT)

Copyright (c) 2016-2017 bluefox<dogafox@gmail.com>

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