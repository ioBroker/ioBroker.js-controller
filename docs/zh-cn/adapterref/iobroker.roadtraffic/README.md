---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.roadtraffic/README.md
title: ioBroker.roadtraffic
hash: IUmLDzAkE5Cb6dAckIUOdrK6ff5u79VdmrRKAR9jGpw=
---
![商标](../../../en/adapterref/iobroker.roadtraffic/admin/roadtraffic.png)

![安装数量](http://iobroker.live/badges/roadtraffic-stable.svg)
![NPM版本](https://img.shields.io/npm/v/iobroker.roadtraffic.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.roadtraffic.svg)
![测验](https://travis-ci.org/BuZZy1337/ioBroker.roadtraffic.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.roadtraffic.png?downloads=true)

＃ioBroker.roadtraffic
##关于此适配器
该适配器使用Google Maps API来检查您的路线上的路况。您可以配置多条路线，适配器将检查实际的交通状况，并显示您将花费多长时间。 （目前，它以秒为单位节省了时间）。
适配器目前处于早期状态。我正计划安装一个闹钟-这样您就可以告诉适配器您必须在什么时候上班-以及当它离开/醒来时应该怎么办（开始播放广播，并在Alexa等上发布“您的路线上似乎出现交通拥堵。您需要立即起床，以免上班迟到！”）。
随时在Github上创建一些功能请求-只需为此打开一个Issue！ ;）

＃＃ 入门
首先：您可能会担心创建帐户以获取API密钥时Google可能会要求您执行的“设置帐单帐户和付款方式”步骤。 Google每月为您提供200美元的信用额。（有关更多信息，请访问https://cloud.google.com/maps-platform/pricing/sheet/）。您每月可以免费执行约40.000个请求。

所以放手：

1.转到https://cloud.google.com/maps-platform/?apis=routes并使用您的Google帐户登录（或者如果没有，则创建一个新帐户）。

![自述文件1](../../../en/adapterref/iobroker.roadtraffic/img/Readme1.png)

2.为您的项目选择一个名称。您可以在此处输入任何内容。该名称仅用于标识，以防您在Google帐户上运行多个项目。

![自述文件2](../../../en/adapterref/iobroker.roadtraffic/img/Readme2.png)

3.设置Google帐户的结算和付款方式（如上所述-不必担心-您每月将从Google的结算帐户获得200美元的信用）。

如果您仍然担心，请查看此页面：https://cloud.google.com/maps-platform/pricing/sheet/）。

![自述文件3](../../../en/adapterref/iobroker.roadtraffic/img/Readme3.png)

4.完成您的Google API设置

![自述文件4](../../../en/adapterref/iobroker.roadtraffic/img/Readme4.png)

5.并将您的API密钥复制到剪贴板。

![自述文件5](../../../en/adapterref/iobroker.roadtraffic/img/Readme5.png)

6.在ioBroker中打开roadtraffic适配器的Instancesettings，然后将您的Google API密钥粘贴到输入字段。

之后，您可以单击“加号图标”来设置您的第一条路线。

![自述文件6](../../../en/adapterref/iobroker.roadtraffic/img/Readme6.png)

在将所有信息输入到配置对话框后，单击“保存并关闭”。
适配器现在应该重新启动，您就可以开始了！

## Changelog

### 0.0.1
* (BuZZy1337) initial release

## License
The MIT License (MIT)

Copyright (c) 2019 BuZZy1337 <buzzy1337@outlook.de>

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