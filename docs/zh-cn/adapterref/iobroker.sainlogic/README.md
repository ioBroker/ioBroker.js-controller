---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sainlogic/README.md
title: ioBroker.sainlogic
hash: oZy344kV1gK0Lo1OUjQkqEk5OkhMReMwWGYf6OSxkLc=
---
![标识](../../../en/adapterref/iobroker.sainlogic/admin/sainlogic.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.sainlogic.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.sainlogic.svg)
![安装数量（最新）](http://iobroker.live/badges/sainlogic-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/sainlogic-stable.svg)
![依赖状态](https://img.shields.io/david/phifogg/iobroker.sainlogic.svg)
![已知漏洞](https://snyk.io/test/github/phifogg/ioBroker.sainlogic/badge.svg)
![NPM](https://nodei.co/npm/iobroker.sainlogic.png?downloads=true)

＃ioBroker.sainlogic
##用于ioBroker的sainlogic适配器
从基于Sainlogic的气象站读取数据

##支持的设备
基本上，任何与sainlogic硬件一起工作的设备，固件通常报告为“ EasyWeather Vx.x.x）”。

已知的工作设备：

1. ELV WS980Wifi
1. Eurochron EFWS2900（仅侦听器模式）
1. Froggit WH400SE
1. Froggit DP1500
1. Sainlogic WS3500（仅侦听器模式）

＃＃ 用法
适配器支持两种模式以显示气象站的数据。

如果从气象站交付，则在侦听器模式下，适配器确实支持其他传感器。当前支持的温度和湿度。如果您还有其他传感器，请提出github问题并发布您的数据字符串，因为这有助于我扩展功能。

###侦听器模式：
使用最新的固件版本，气象站支持将数据发送到自定义服务器。该适配器将充当此类服务器。设置需要两个步骤：

####配置气象站
使用移动设备上的“ WS View”应用程序配置气象站。为自定义服务器设置配置以下设置：

-服务器：IOBroker服务器的IP /主机名
-路径：任何东西，只要记住它即可用于适配器配置
-端口：1024到65000之间的任何数字（默认值为45000），在IOBroker系统上必须唯一且免费
-站号：未使用
-站键：未使用
-协议类型：WeatherUnderground
-上传间隔：气象站支持的任何更新

####配置监听器
在实例配置中，选择选项卡“侦听器”并进行以下设置：

-有效：正确
-IP：选择IOBroker的IP，气象站将能够连接到该IP（默认值为0.0.0.0，以允许所有IP），如果您有多个网络，则这主要是相关的，否则默认值将起作用
-端口：输入与WS View应用程序中相同的端口
-路径：输入与WS View应用程序中相同的路径
-转发URL：如果要将接收到的数据转发给其他使用者，则可以指定其他地址。例如。您可能会收到WU格式的数据，但仍然希望将其转发给WeatherUnderground。

保存。
侦听器将启动并等待传入的连接。根据您的时间间隔，您应该在日志中看到一条带有数据的消息“侦听器收到更新：...”。

###调度程序模式：
如果您的气象站支持提取数据，则可以配置调度程序来提取数据。使用的协议基于[WS980文档](https://github.com/RrPt/WS980)。

####配置调度程序
在实例配置中，选择“调度程序”选项卡并进行以下设置：

-有效：正确
-IP：选择气象站的IP，请确保IP是固定的且不会更改
-端口：输入要连接的端口（默认为45000）
-时间间隔：输入时间间隔（以秒为单位）（我建议至少10秒，以免系统或网络过载）

保存。

在第一个间隔时间之后，调度程序将启动并连接到气象站。您应该在日志中看到类似“计划程序提取新数据”的消息。如果将日志模式设置为调试，则还将看到收到的数据字符串。

##学分
感谢：lemuba，StrathCole，Glasfaser，Latzi：对我的bug进行了不懈的测试:) Lisa的[在标题中转换风向的代码](https://www.programmieraufgaben.ch/aufgabe/windrichtung-bestimmen/ibbn2e7d)

## Changelog

Latest version

#### 0.6.6 Adressed github issue #53 - warning on non existing object

#### 0.6.5 Removed unneeded events

#### 0.6.4 For WH2650: Adding model name and weather station communication frequency datapoint

#### 0.6.3 Fixed outdoor humidity

#### 0.6.2 Added additional sensor support


For detailed change log or previous versions check io-package.json

## License
MIT License

Copyright (c) 2020 Fogg <foggch@gmail.com>

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