---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.luxtronik1/README.md
title: ioBroker.luxtronik1
hash: DFgt0+UkXwVLDlE+SoE8gYKyy2A4U5NakxuX7u0Pqto=
---
![商标](../../../en/adapterref/iobroker.luxtronik1/admin/luxtronik1.png)

![安装数量](http://iobroker.live/badges/luxtronik1-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.luxtronik1.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.luxtronik1.svg)
![NPM](https://nodei.co/npm/iobroker.luxtronik1.png?downloads=true)
![环保管理员徽章](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.luxtronik1.svg)

＃ioBroker.luxtronik1
用于Luxtronik 1-热泵-控制器的ioBroker适配器（即Alpha Innotec，Siemens ...）

安装适配器，创建实例。
安装硬件：即将RS232到LAN的适配器连接到热泵mainbord的串行接口（RS232）。
规格：串行电缆：链接PINS 2、3和5（如果不起作用，请更改引脚2和3）RS232到LAN转换器：即USR TCP232 – 302。
设置串行接口：57600/8 / N / 1，模式：TCP-服务器复位超时：0

设置luxtronik-IP地址，端口和轮询-intervall

在luxtronik 1和AlphaInnotec热泵上测试

读取热泵的不同值和统计信息（温度，错误，运行时间等）。
通过在“控制”通道中设置值来控制Luxtronik 1。控制以下值：

-热水-温度设定
-加热-模式
-热水-模式
-加热-曲线（差异，终点，起点，夜间减少）。

必须使用ack = false设置“控制”-通道中的值才能触发操作。

## Changelog

### 0.2.3

-   adapter - restart in case of connection - problems added.

### 0.2.2

-   .npmignore and .gitignore added, small bugfix.

### 0.2.1

-   Readme / License update.

### 0.2.0

-   missing temperature values added, displays now all available temperature values.

### 0.1.0

-   error-handling on communication errors optimized, adapter restart in case of multiple communication errors.

### 0.0.7

-   error-handling on connections added.

### 0.0.6

-   diminished risk of multiple connection, small bugfixes

### 0.0.5

-   controls hotwater-temperature, heating- & hotwater - mode and heating-curve setting.

### 0.0.4

-   error - handling optimized

### 0.0.3

-   Reads mode heating, water and heating-curve

### 0.0.2

-   First published version

### 0.0.1

-   In development stage

## License

The MIT License (MIT)

Copyright (c) 2018-2020 forelleblau marceladam@gmx.ch

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