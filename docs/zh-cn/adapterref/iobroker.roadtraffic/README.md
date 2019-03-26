---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.roadtraffic/README.md
title: ioBroker.roadtraffic
hash: Ejk9bvs8M8TCDQBOLAEAJ5prrYoMaM1LdHgVm29BGwo=
---
![商标](../../../en/adapterref/iobroker.roadtraffic/admin/roadtraffic.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.roadtraffic.svg)
![下载](https://img.shields.io/npm/dm/iobroker.roadtraffic.svg)
![测试](https://travis-ci.org/BuZZy1337/ioBroker.roadtraffic.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.roadtraffic.png?downloads=true)

＃ioBroker.roadtraffic =================
##关于此适配器
此适配器使用Google Maps API检查路由上的流量。您可以配置多条路线，适配器将检查实际的交通状况，并显示您的行程需要多长时间。 （目前它以秒为单位节省时间）。
适配器现在处于一个早期的状态..我正计划实现一个闹钟 - 所以你可以告诉适配器你必须在哪个时间工作 - 以及当它离开/醒来时应该发生什么（开始播放电台并做一个公告，例如“你的路线上似乎有一些交通堵塞。你现在需要起床，因为没有上班迟到！”在Alexa上等等。）
在Github上随意创建一些功能请求 - 只需打开一个问题！ ;）

＃＃ 入门
首先：您可能会担心Google在创建帐户以获取API密钥时可能会要求您设置“结算帐户和付款方式”这一步骤。别担心！ Google每月为您提供200美元的赠送金额..（有关详细信息，请访问https://cloud.google.com/maps-platform/pricing/sheet/）。你可以免费每月~40,000个请求。

那就放手吧：

1.转到https://cloud.google.com/maps-platform/?apis=routes并使用您的Google帐户登录（如果您还没有Google帐户，请创建一个新帐户）。

![Readme1](../../../en/adapterref/iobroker.roadtraffic/img/Readme1.png)

2.选择项目的名称。你可以在这里输入你想要的任何东西该名称仅用于识别，以防您在Google帐户上运行多个项目。

![Readme2](../../../en/adapterref/iobroker.roadtraffic/img/Readme2.png)

3.设置Google帐户的结算方式和付款方式（如上所述 - 不用担心 - 您的结算帐户每月可获得200美元的信用额度）。

如果您仍然担心 - 请查看此页面：https：//cloud.google.com/maps-platform/pricing/sheet/）。

![Readme3](../../../en/adapterref/iobroker.roadtraffic/img/Readme3.png)

4.完成Google API设置

![Readme4](../../../en/adapterref/iobroker.roadtraffic/img/Readme4.png)

5.将API密钥复制到剪贴板。

![Readme5](../../../en/adapterref/iobroker.roadtraffic/img/Readme5.png)

6.在ioBroker中打开roadtraffic适配器的Instancesettings，并将Google API密钥粘贴到输入字段。

之后，您可以单击“加号图标”来设置第一个路线。

![Readme6](../../../en/adapterref/iobroker.roadtraffic/img/Readme6.png)

在配置对话框中输入所有信息后，单击“保存并关闭”。
适配器现在应该重新启动，你准备好了！

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