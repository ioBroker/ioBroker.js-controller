---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.owntracks/README.md
title: ioBroker.owntracks
hash: BaMk8Twp+HBcGMd2T3dPGP8Xy7GcC93ZZrFxYd5H1hk=
---
![商标](../../../en/adapterref/iobroker.owntracks/admin/owntracks.png)

![安装数量](http://iobroker.live/badges/owntracks-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.owntracks.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.owntracks.svg)
![NPM](https://nodei.co/npm/iobroker.owntracks.png?downloads=true)

＃ioBroker.owntracks
[自己的曲目](http://owntracks.org/)是适用于Android和iOS的应用程序。

App会将您的位置（设备的位置）连续发送到特定服务器。在我们的例子中，它将是ioBroker服务器。 MQTT协议将用于通信或ioBroker.cloud / ioBroker.iot适配器。

链接：

-Android：[https://play.google.com/store/apps/details?id=org.owntracks.android]（https://play.google.com/store/apps/details?id=org.owntracks .android）
-iOS：[https://itunes.apple.com/de/app/owntracks/id692424691?mt=8]（https://itunes.apple.com/de/app/owntracks/id692424691?mt=8）

##安装说明
###连接配置（使用MQTT服务器）
OwnTracks适配器在MQTT服务器的端口1883（可配置）上启动，以从具有坐标的设备接收消息。
问题在于该服务器必须可以从Internet进行访问。
通常，必须配置路由器或防火墙以转发流量。

###应用和适配器配置
必须分别在ioBroker适配器的Android / iOS应用中设置以下首选项：

-连接/模式-MQTT专用
-连接/主机/主机-系统或DynDNS域的IP地址。例如。 http://www.noip.com/让我们使用域名代替IP地址。
-连接/主机/端口-1883或路由器上的端口
-连接/主机/ WebSockets-否
-连接/标识/用户名-iobroker
-连接/标识/密码-通过适配器设置
-连接/标识/设备ID-设备或人员的名称。对于该设备，将创建状态。例如。如果deviceID为“标记”，则在首次联系后将创建以下状态：

    -owntracks.0.users.Mark.longitude
    -owntracks.0.users.Mark.latitude

-连接/标识/ TrackerID-将其写在地图上的用户简称（最多2个字母）。
-连接/安全性/ TLS-关闭
-高级/加密密钥-可选，但建议：添加密码短语以进行加密

请确认自己的轨道通过抽屉中的“状态”条目连接到iobroker实例：

![设定值](../../../en/adapterref/iobroker.owntracks/img/connection.jpg)

＃＃＃ 重要的提示！
**当收到特定的有效负载时，将生成ioBroker中的状态！这意味着ioBroker中的位置将在用户第一次离开或输入位置时生成。**您将在下面看到目标结构

![设定值](../../../en/adapterref/iobroker.owntracks/img/structure.png)

###区域配置
要在owntracks适配器中设置位置，您必须在owntracks Android / iOS应用中创建区域。
为此，请转到抽屉中的“区域”

![设定值](../../../en/adapterref/iobroker.owntracks/img/regions1.jpg)

通过单击右上角的加号（+）创建一个新区域

![设定值](../../../en/adapterref/iobroker.owntracks/img/regions2.jpg)

使用右上角的位置按钮可检索当前位置，或自己在“纬度和经度”中输入位置。此外，指定位置的半径。如果您共享位置，则当您输入/离开位置时，您的好友（请参阅Android / iOS应用的抽屉中的信息）会收到通知。

![设定值](../../../en/adapterref/iobroker.owntracks/img/regions3.jpg)

###图标设置（在ioBroker.owntracks适配器内）
您可以为每个用户定义一个图标。只需通过拖放或鼠标单击上传图片即可。它将自动缩放为64x64。

该名称必须等于OwnTracks应用中的DeviceID。

![设定值](../../../en/adapterref/iobroker.owntracks/img/settings1.png)

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