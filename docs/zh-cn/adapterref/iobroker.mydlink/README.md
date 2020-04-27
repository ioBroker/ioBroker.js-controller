---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mydlink/README.md
title: ioBroker.mydlink
hash: Tx0RggrpUy6Edc2CQQDri98x8JiWjf19dZvAb9iZutk=
---
![商标](../../../en/adapterref/iobroker.mydlink/admin/mydlink.png)

![安装数量](http://iobroker.live/badges/mydlink-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.mydlink.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.mydlink.svg)
![测验](https://travis-ci.org/arteck/ioBroker.mydlink.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.mydlink.png?downloads=true)
![环保管理员徽章](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.mydlink.svg)

＃ioBroker.mydlink
ioBroker的MyDlink适配器。
-------------------------------------------------- ----------------------------

允许从ioBroker中的[D-Link](https://eu.dlink.com/uk/en/for-home/smart-home)控制电源插座或运动检测器。

**此适配器使用Sentry库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参见[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！ Sentry报告从js-controller 3.0开始使用。
这也有助于支持新设备。

当前测试的设备：

|型号|类型图片|
| :---: | :---: | :---: |
| [DSP-W215](https://eu.dlink.com/uk/en/products/dsp-w215-smart-plug)|插座（插座，温度，电流）| ![图片](../../../en/adapterref/iobroker.mydlink/admin/DSP_W215.png)|
| [DCH-S150]（https://eu.dlink.com/uk/zh/products/dch-s150-motion-sensor）|动作检测器（检测到最后动作）| ！[Image]（admin / DCH_S150.png）|

适配器需要轮询设备。因此，传感器的读数和运动检测将被轮询间隔延迟（可以在配置中设置）。

####配置：
*全局轮询间隔-如果未设置特定间隔，则适配器将轮询该间隔中的所有设备。设置为0禁用。
*设备列表，每个设备具有以下设置：

<table><tr><td>名称</td><td>在此处设置名称，必须唯一（对于mydlink设备） </td></tr><tr><td>知识产权</td><td>在这里填写IP地址，主机名也应该起作用</td></tr><tr><td>销</td><td> PIN码印在设备的不干胶标签上，可能在底部</td></tr><tr><td>轮询间隔</td><td>每设备轮询间隔，请留空以使用全局轮询间隔。 <br />设置为0以禁用轮询。 <br /> <b>建议：</b>为传感器设置一个快速轮询间隔，为插头设置一个较长的轮询间隔。 </td></tr><tr><td>使能</td><td>如果未启用，将不会被轮询或控制。 <br />可以禁用未插入的设备，以避免日志中出现错误消息。 </td></tr></table>

适配器不会干扰应用程序的使用。

## Changelog

### 0.0.7
* (Garfonso) added info.connection state
* (Garfonso) suppressed repeated error messages during polling.

### 0.0.6
* (Garfonso) prevent removement of custom details in objects.

### 0.0.5
* (Garfonso) fixed config files for release in latest repository.

### 0.0.4
* (Garfonso) polling interval can now be configured on per device basis (if not configured for a device global poll intervall will be used.) Recommendation: Use high global poll interval and a smaller one for motion detectors.
* (Garfonso) added no_motion state for motion detectors, contains number of seconds since last motion.

### 0.0.3
* (Garfonso) use setStateChanged instead of polling state before writing.
* (Garfonso) minor clean ups.

### 0.0.2
* (Garfonso) move to ioborker-community-adapters

### 0.0.1
* (Garfonso) initial release

## License
MIT License

Copyright (c) 2020 Garfonso <garfonso@mobo.info>

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