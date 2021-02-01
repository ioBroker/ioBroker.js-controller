---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.comfoair/README.md
title: ioBroker.comfoair
hash: LTfi9mFuDSsjCUQ4ChFSb+pQMDe+6XevF7mLBrqeslo=
---
![商标](../../../en/adapterref/iobroker.comfoair/admin/comfoair.png)

![安装数量](http://iobroker.live/badges/comfoair-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.comfoair.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.comfoair.svg)
![NPM](https://nodei.co/npm/iobroker.comfoair.png?downloads=true)

＃ioBroker.comfoair
用于Zehnder Comfoair'CA'通风的ioBroker适配器（即ComfoAir CA350，而不是ComfoAir Q350 ...）。

##连接
###通过IP / LAN
使用RS232到LAN或WiFi转换器将ioBroker与Zehnder Comfoair连接。
安装用于TCP的硬件-连接到comfoair：即，将RS232到LAN适配器连接到comfoair的串行接口。仅连接引脚2、3和5（也应与TX，RX和GND一起使用-cc-Ease连接的触点也应如此）。

###串行连接
将您的交流串行接口连接到ioBroker正在运行的设备的串行接口。即使用RS232toUSB电缆或RS232toTTL适配器连接到Raspberry Pis UART-引脚。

##配置
选择您喜欢的连接模式（IP或串行），设置comfoair-IP地址和端口，或指定您的串行设备，定义（RS232）comfoair连接模式（请参阅“适配器和CC缓动”）并定义轮询-intervall。

##适配器和CC轻松
通常，不建议通过RS232串行通信将数据从2个发送器发送到一个接收器。并行使用CCEase和适配器可能会导致错误，甚至在最坏的情况下会损坏您的舒适控制！因此，当您启动ComfoAir-适配器时，CC Ease应该断开连接或将被关闭。
comfoair本身知道4种不同的rs232模式：CCEaseonly，PConly，PCMaster，PCLogmode。在PConly和PCMaster中，CC-Ease关闭。
在实例-配置中，您可以选择以下连接-模式之一。请仅勾选其中之一！适配器仅在适配器或并行模式下运行后，就可以切换comrsair的rs232模式（不建议这样做，因为特定的连接模式需要特定的rs232模式！）。

###仅适配器
CC Ease已断开连接（推荐）或将在适配器启动时关闭，您只能使用ioBroker（rs232mode为PCMaster）控制您的交流。此模式为默认模式，建议使用。

###只听
适配器捕获从comfoair或CC Ease发送的数据。 CC Ease正在运行，无法从适配器发送任何命令。在这种模式下，您只能获得一组基本值（温度，通风状态）。在这种模式下，也没有通信错误/损坏的风险，因为从适配器到同伴没有通信。

###并行模式
CC Ease和适配器正在运行。 com rs232mode设置为“ PCLogmode”。适配器正在“监听”基本值（温度，通风水平），并轮询其他值（错误，过滤器计时器）。设置延长的轮询间隔以减少通信错误的风险。您可以使用ioBroker和CC Ease设备控制ComfoAir。在发送命令（包括查询）之前，rs232模式已切换到PC Master。发送每个命令后，还会进行轮询。测试显示无错误-并行运行更长的时间。但是：运行此模式需要您自担风险。

###恒定PC日志模式下的并行模式
一些用户在PC-Logmode中持续运行comfoair取得了积极的经验。此模式具有与仅适配器模式相同的功能，但具有正在运行的CC Ease。但是：运行此模式需要您自担风险。

##使用适配器
交流的值应在“状态”和“温度”通道中可见。请在更改连接模式后刷新对象-视图。

通过在“控制”通道中设置/更改值，可以控制舒适通风。必须将“控制”-通道中的所有值设置为ACK = false，才能将其识别为适配器的命令。

Boostmode：设置启动时间并开始。增压时间过后，通风将恢复到先前的水平。如果在升压期间改变通风水平，则取消返回。

在comfoair CA350上测试。

## Changelog

### 1.1.3

-   boostmode added

### 1.1.2

-   adapter - internal filter-h counter added

### 1.1.1

-   Periodical self-test with restart in case of fail added

### 1.1.0

-   displays now working hours of different ventilation levels, preheating, bypass and frost-protection.

### 1.0.0

-   offers now the possibility of a direct serial connection besides the connection over IP/LAN.

### 0.3.2

-   Bypass - error bug fixed.

### 0.3.1

-   new connection mode: parallel in constant PC-Logmode.

### 0.3.0

-   new connection modes, i.e. 'listening only', selftest-function and setting filter-timer added.

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

-   bugfix set vent levels.

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

Copyright (c) 2021 forelleblau marceladam@gmx.ch

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