---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.roadtraffic/README.md
title: ioBroker.roadtraffic
hash: tyNpA/0hQ+n0OCG3Mnofzv9ocHgboD9cNkeV7eIb/CU=
---
![商标](../../../en/adapterref/iobroker.roadtraffic/admin/roadtraffic.png)

![安装数量](http://iobroker.live/badges/roadtraffic-stable.svg)
![NPM版本](https://img.shields.io/npm/v/iobroker.roadtraffic.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.roadtraffic.svg)
![测验](https://travis-ci.org/BuZZy1337/ioBroker.roadtraffic.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.roadtraffic.png?downloads=true)

＃ioBroker.roadtraffic
##关于此适配器
该适配器使用HERE.com API来检查您的路由上的流量。您可以配置多条路线，适配器将检查实际的交通状况并显示您需要花费多长时间。
适配器有一个闹钟-因此您可以告诉适配器您必须在什么时候上班-适配器开始播放Radio并在Alexa上发出通知（需要Alexa2适配器）-或者您可以使用自己的脚本进行响应在适配器的警报上。

＃＃ 入门
所以放手：

1.转到https://developer.here.com/sign-up?create=Freemium-Basic&keepState=true&step=account并创建HERE.com免费开发者帐户（免费增值）。

![这里1](../../../en/adapterref/iobroker.roadtraffic/img/Here1.png)

2.确保已选择Freemium，然后在左侧填写表格。.（名字，姓氏，电子邮件等）

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

##闹钟
在实例设置中，可以通过选中“启用警报时钟功能”来启用警报时钟。
您应该已安装Alexa2适配器，并且已将其设置为在Alexa2实例设置中使用推送连接。
选择要由适配器控制的Alexa设备，然后输入要在触发警报时播放的TuneIn StationID。
警报音量的范围是0-100。
使用“说话”字符串，您可以控制Alexa的广播。
默认值为：Guten Morgen％name。贝阿克杜勒出版社（Bei aktueller Verkehrslage）发行了。

Alexa开始播放指定的TuneIn电台后15秒，将宣布弦乐。
例如，如果您有一个名为“ Daniel”的路线，并且警报触发器Alexa会说：Guten Morgen Daniel。在29分钟的Arbeit大会上亮相。

如果只希望适配器开始播放TuneIn Station，并且不接收任何通知，则将“说起”字符串保留为空。

每个路线都有7个警报通道（星期一至星期日）。
在每个通道中，您都有以下状态：

*到达时间：输入您想要到达目的地的时间（例如：07：30是早上7点半）。
*洗澡时间：输入您要添加到旅行持续时间的时间。 （例如：45为45分钟。假设您已将Arrivaltime设置为10：00，Bathtime设置为30 Minute，并且当前旅行时间是1小时。那么适配器将在08:30触发（Arrivaltime-Bathtime-Travelduration）。
*已启用：如果要启用当天的警报，则设置为true
*已触发：触发警报时，适配器会将此状态设置为true。 （例如，您可以将其与自己的脚本一起使用。）触发状态将在相应日期的00:00重置为false。 （周六触发器将在周六00:00设置为false）。

## Changelog
### 0.2.0 (2019-12-21)
* (BuZZy1337) Alarm-Clock implemented. (See Readme "Alarm-Clock" section for details)

### 0.1.1 (2019-12-13)
* (BuZZy1337) HERE.com changed the Authentication.
* (BuZZy1337) Prepare for Alarm.. (NOT WORKING YET!!! - But needed to push this version because of authentication changes)

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