---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.luxtronik1/README.md
title: ioBroker.luxtronik1
hash: Po+chEZbghLY/Su1PBHqqVHf/YjON7BBpvj1jHK8iWI=
---
![商标](../../../en/adapterref/iobroker.luxtronik1/admin/luxtronik1.png)

![安装数量](http://iobroker.live/badges/luxtronik1-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.luxtronik1.svg)
![下载](https://img.shields.io/npm/dm/iobroker.luxtronik1.svg)
![NPM](https://nodei.co/npm/iobroker.luxtronik1.png?downloads=true)

＃ioBroker.luxtronik1
适用于Luxtronik 1的ioBroker适配器 - 热泵 - 控制器（即Alpha Innotec，Siemens ......）

安装适配器，创建实例。
安装硬件：即RS232到LAN适配器到热泵主机的串行接口（RS232）。
规格：串行电缆：链接PINS 2,3和5（如果它不起作用，更换引脚2和3）RS232到LAN转换器：USR TCP232  -  302。
设置串口：57600/8 / N / 1，模式：TCP-Server复位超时：0

设置comfoair  -  IP地址，端口和轮询 -  intervall

在luxtronik 1和AlphaInnotec热泵上测试

读取热泵的不同值和统计数据（温度，误差，运行时间......）。
通过设置“控制” - 通道中的值来控制Luxtronik 1。控制以下值：

 - 热水 - 温度设定
 - 加热 -  modelo
 -  Hotwater  -  modelo
 - 加热 - 曲线（差异，终点，起点，夜间减少）。

## Changelog

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

Copyright (c) 2018-2019 forelleblau marceladam@gmx.ch

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