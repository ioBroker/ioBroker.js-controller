---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.comfoair/README.md
title: ioBroker.comfoair
hash: G1IV30sMIv9dhiCRQd/TU2CqG9JhNIpBSkzaWsHybYc=
---
![商标](../../../en/adapterref/iobroker.comfoair/admin/comfoair.png)

![安装数量](http://iobroker.live/badges/comfoair-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.comfoair.svg)
![下载](https://img.shields.io/npm/dm/iobroker.comfoair.svg)
![NPM](https://nodei.co/npm/iobroker.comfoair.png?downloads=true)

＃ioBroker.comfoair
用于Zehnder Comfoair'CA'通风的ioBroker适配器（即ComfoAir CA350，而不是ComfoAir Q350 ......）

要使用此适配器，您需要RS232到LAN或WiFi转换器才能将ioBroker与Zehnder Comfoair连接。
安装TCP的硬件 - 连接到comfoair：即RS232到LAN适配器到comfoair的串行接口。仅连接引脚2,3和5（也应与TX，RX和GND一起使用 - 也可以使用cc-Ease连接的触点）。
实际上，此适配器仅适用于LAN-Connection。基于直接串行连接的直接链接正在开发中。

安装适配器，创建实例。

##配置
设置comfoair  -  IP地址，端口和轮询 -  intervall。

## Adapter＆CC Ease
通常，不建议在RS232串行通信中将数据从2个发送器发送到一个接收器。并行使用CCEase和适配器可能会导致错误，或者最坏的情况是导致您的comfoair控件损坏！因此，当您启动ComfoAir适配器时，您的CC Ease shold将被断开或将被关闭。
comfoair本身知道4种不同的rs232模式：CCEaseonly，PConly，PCMaster，PCLogmode。在PConly和PCMaster中，CC-Ease已关闭。
在实例 -  config中，您可以选择以下连接模式之一。请只勾选其中一个！一旦适配器仅在适配器或并行模式下运行，您就可以切换comfoair的rs232模式（不建议这样做，因为特定的连接模式需要特定的rs232模式！）。

###仅限适配器
CC Ease断开连接或在适配器启动时关闭，您只能使用ioBroker控制comfoair。 （rs232mode ist PCMaster，默认为＆推荐）。

###只听
适配器捕获从comfoair或CC Ease发送的数据。 CC Ease正在运行，不能从适配器发送任何命令。在此模式下，您只能获得一组基本值（温度，通风状态）。

###并行模式
CC Ease和适配器正在运行。 comfoiar rs232mode设置为'PCLogmode'。适配器正在“监听”基本值并轮询其他值（选择扩展轮询间隔）您可以使用ioBroker和CC Ease单元控制ComfoAir。在发送命令（包括轮询）之前，rs232模式切换到PC Master。发送每个命令后，也会进行轮询。测试显示无错误 - 并行运行较长时间。但是：你自己承担这种模式的风险。

##使用适配器
您的comfoair的值应该在'status'和'temperature'频道中可见。

通过设置/更改“控制” - 通道中的值，您可以控制comfoair通风。 “控制” - 通道中的所有值都必须设置为wieth ACK = false，以便被识别为适配器的命令。

在comfoair CA350上测试。

## Changelog

### 0.3.0

-   new connection modes, i.e. 'listening only'-

### 0.2.1

-   smaller bugfixes.

### 0.2.0

-   New rs232 - Modes, reading enthalpie-values, handling connection-errors.

### 0.1.4

-   README-Update 'NO PARALLEL USE', discard 'Safe-Mode'.

### 0.1.3

-   RS - 232 interface: manual- or safe - mode possible.

### 0.1.2

-   ReadME updated, minor bugfixes.

### 0.1.1

-   bugfix ventlevels, reading errors

### 0.1.0

-   ReadME Update

### 0.0.7

-   Core Files/Testing Update and introduce adapter-core

### 0.0.6

-   Filter - change - indicator.

### 0.0.5

-   bugfig set vent levels.

### 0.0.4

-   gets & sets vent levels, gets filter-timer.

### 0.0.3

-   minor bugfixes, sets comfort-temperature and resets filter-hours.

### 0.0.2

-   First running Version. Gets temp, vent, bypass and filter states, sets fan level.

### 0.0.1

-   In development stage, contributions welcome

## License

The MIT License (MIT)

Copyright (c) 2019 forelleblau marceladam@gmx.ch

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