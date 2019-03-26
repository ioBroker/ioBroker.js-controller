---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/forelleblau/ioBroker.comfoair/edit/master//README.md
title: comfoair
hash: 6GAu1GeuUy1Oo5FXAaT0gUvgzOqnDZQt1u0x3oIDq0A=
adapter: true
license: MIT
authors: forelleblau <marceladam@gmx.ch>
description: Control you ComfoAir ventilation
keywords: comfoair, ventilation, smart, home
readme: https://github.com/forelleblau/ioBroker.comfoair/blob/master/README.md
mode: daemon
materialize: true
compact: true
published: 2019-02-13T23:30:00.339Z
version: 0.1.4
BADGE-安装数量: http://iobroker.live/badges/comfoair-stable.svg
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.comfoair.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.comfoair.svg
BADGE-NPM: https://nodei.co/npm/iobroker.comfoair.png?downloads=true
---
![商标](zh-cn/adapterref/iobroker.comfoair/../../../en/adapterref/iobroker.comfoair/admin/comfoair.png)


＃ioBroker.comfoair
用于Zehnder Comfoair'CA'通风的ioBroker适配器（即ComfoAir CA350，而不是ComfoAir Q350 ......）

要使用此适配器，您需要RS232到LAN或WiFi转换器才能将ioBroker与Zehnder Comfoair连接。
安装TCP的硬件 - 连接到comfoair：即RS232到LAN适配器到comfoair的串行接口。仅连接引脚2,3和5（也应与TX，RX和GND一起使用 - 也可以使用cc-Ease连接的触点）。
实际上，此适配器仅适用于LAN-Connection。基于直接串行连接的直接链接正在开发中。

安装适配器，创建实例。
设置comfoair  -  IP地址，端口和轮询 -  intervall。

您的comfoair的值现在应该在'status'和'temperature'频道中可见。

通过设置/更改“控制” - 通道中的值，您可以控制comfoair通风。

即使连接CC-Ease Panel也可能会工作（风险自负）。如果ccEASE  -  Panel断开连接，效果很好。

在comfoair CA350上测试。

## Changelog

### 0.1.2

- ReadME updated, minor bugfixes.

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