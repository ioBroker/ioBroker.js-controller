---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.rainbird/README.md
title: ioBroker.rainbird
hash: I5DvFG4EAJokL/cHf2SvLiANcKh5W1Gh3IVaAxUUnqg=
---
![商标](../../../en/adapterref/iobroker.rainbird/admin/rainbird.png)

![安装数量](http://iobroker.live/badges/rainbird-installed.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.rainbird.svg)
![NPM](https://nodei.co/npm/iobroker.rainbird.png?downloads=true)
![稳定](http://iobroker.live/badges/rainbird-stable.svg)
![NPM版本](https://img.shields.io/npm/v/iobroker.rainbird.svg)
![建立状态](https://travis-ci.org/StrathCole/ioBroker.rainbird.svg?branch=master)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

＃ioBroker.rainbird
用于带有LNK WiFi适配器的Rain Bird的ioBroker适配器。该项目与Rain Bird没有隶属关系。

基于https://github.com/jbarrancos/pyrainbird的python库“ pyrainbird”，并完全移植到NodeJS。适配器通过WiFi连接直接连接到设备，并且未使用Rain Bird云服务。

＃＃ 状态
`rainbird.X.device.commands.advanceZone`-当前程序正在运行时，前进到下一个灌溉区并停止当前程序。
`rainbird.X.device.commands.runProgram`-手动运行指定的程序（1到X），如先前在设备中配置的那样。
`rainbird.X.device.commands.stopIrrigation`-立即停止所有区域的灌溉。

`rainbird.X.device.irrigation.active`-灌溉当前处于活动状态。如果为false，则意味着您将设备上的开关设置为“停止”。
`rainbird.X.device.irrigation.station`-当前灌溉的区域编号。

`rainbird.X.device.sensors.rain`-如果安装了雨水传感器并且检测到雨水，则为true。

`rainbird.X.device.settings.rainDelay`-为设备设置的当前灌溉延迟（以天为单位）。

`rainbird.X.device.stations.Y.available`-如果设备中的区域Y可用，则为True。
`rainbird.X.device.stations.Y.irrigation`-如果当前正在灌溉区域Y，则为True。
`rainbird.X.device.stations.Y.runZone`-手动在Y区进行指定时间的灌溉。
`rainbird.X.device.stations.Y.testZone`-测试区Y。

##捐赠
[![贝宝]（https://www.paypalobjects.com/zh_CN/i/btn/btn_donateCC_LG.gif）](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SFLJ8HCW9T698&source=url)

## Changelog

### 0.1.2

-   Fixed adapter stalling on connection timeout

### 0.1.1

-   Smaller fixes

### 0.1.0

-   First running Version

## License

The MIT License (MIT)

Copyright (c) 2020 Marius Burkard

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