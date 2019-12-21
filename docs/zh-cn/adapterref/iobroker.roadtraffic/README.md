---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.roadtraffic/README.md
title: ioBroker.roadtraffic
hash: 3GNg5U61bVzmvAJjPUT1XYz/q5dqqkVKAu327pb9qMk=
---
![商标](../../../en/adapterref/iobroker.roadtraffic/admin/roadtraffic.png)

![安装数量](http://iobroker.live/badges/roadtraffic-stable.svg)
![NPM版本](https://img.shields.io/npm/v/iobroker.roadtraffic.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.roadtraffic.svg)
![测验](https://travis-ci.org/BuZZy1337/ioBroker.roadtraffic.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.roadtraffic.png?downloads=true)

＃ioBroker.roadtraffic
##关于此适配器
该适配器使用HERE.com API来检查您的路由上的流量。您可以配置多条路线，适配器将检查实际的交通状况，并显示您将花费多长时间。
适配器现在处于早期状态。.我正计划安装一个闹钟-这样您就可以告诉适配器您必须在什么时候上班-以及当它离开/醒来时应该怎么办（开始播放）广播并在Alexa等上发布“在您的路线上似乎出现交通拥堵。您需要立即起床，以免上班迟到！”。
随时在Github上创建一些功能请求-只需为此打开一个Issue！ ;）

＃＃ 入门
所以放手：

1.转到https://developer.here.com/sign-up?create=Freemium-Basic&keepState=true&step=account并创建HERE.com免费开发者帐户（免费增值）。

![这里1](../../../en/adapterref/iobroker.roadtraffic/img/Here1.png)

2.确保已选择Freemium，然后在左侧填写表格。（名字，姓氏，电子邮件等）

![这里2](../../../en/adapterref/iobroker.roadtraffic/img/Here2.png)

3.单击注册此处的帐户...，并且不要忘记勾选复选框（同意服务条款等。）。

![这里3](../../../en/adapterref/iobroker.roadtraffic/img/Here3.png)

4.再过一次-同意条款和条件，然后单击“开始编码”按钮。

![这里4](../../../en/adapterref/iobroker.roadtraffic/img/Here4.png)

5.在下一页，您已经在HERE.com仪表板上。查找REST部分，然后单击“ Generate App”。

![这里5](../../../en/adapterref/iobroker.roadtraffic/img/Here5.png)

6.单击“创建API密钥”-您将获得一个API密钥..在ioBroker中打开roadtraffic适配器的Instancesettings并将该API密钥粘贴到config字段中。

![这里6](../../../en/adapterref/iobroker.roadtraffic/img/Here6.png)

7.单击“实例设置”中的加号图标，然后创建您的第一个路径。

在将所有信息输入到配置对话框后，单击“保存并关闭”。
适配器现在应该重新启动，您就可以开始了！

## Changelog
### 0.1.1 (2019-12-13)
* (BuZZy1337) HERE.com changed the Authentication.
* (BuZZy1337) Prepare for Alarm.. (NOT WORKING YET!!! - But needed to push this version because of authentication changes))

### 0.1.0 (2019-12-08)
* (BuZZy1337) Using HERE.com instead of Google API (READ THE UPDATED README!!)

### 0.0.2 (2019-02-27)
* (BuZZy1337) Release to latest repository

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