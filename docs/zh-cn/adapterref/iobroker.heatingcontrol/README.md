---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.heatingcontrol/README.md
title: ioBroker.HeatingControl
hash: /FBuVliMgA9N2xeblOfpuQ6pvARLncAIy1/qWvxhb0s=
---
![商标](../../../en/adapterref/iobroker.heatingcontrol/admin/heatingcontrol.png)

![安装数量](http://iobroker.live/badges/heatingcontrol-stable.svg)
![NPM版本](https://img.shields.io/npm/v/iobroker.heatingcontrol.svg)
![下载](https://img.shields.io/npm/dm/iobroker.heatingcontrol.svg)
![测试](https://travis-ci.org/rg-engineering/ioBroker.heatingcontrol.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.heatingcontrol.png?downloads=true)

＃ioBroker.HeatingControl
用于控制恒温器的适配器。

特征：

*按时间表控制所有恒温器的设定温度水平
*为每天和晚上配置多个加热时段
*支持各种homematic和max！温控器
*支持多个配置文件（待办事项）
*如果恒温器和执行器之间没有直接连接，执行器可以直接从适配器中切换出来
*目前，当达到设定点温度时，执行器会立即关闭。一旦设定点温度低于实际温度，执行器就会打开。 （要做：实施改进的控制）
*最多支持两个执行器
*每个房间自动检测恒温器和执行器。该功能（例如“加热”）用于此。
*如果房间包含恒温器但不应控制，则可以在管理界面中排除房间
*稍后将提供可视化示例

##设置
### Main
*使用actors =如果你想直接从适配器控制执行器。以防止恒温器和执行器之间没有直接连接。
* Gewerk =用于检测每个房间的恒温器和执行器的功能
*恒温器的路径=恒温器的物体路径，例如“HM-rpc.0。”
*演员的路径=致动器的对象路径，例如“HM-rpc.0。”
* timezone =用于cron调整cron作业
*删除全部=删除管理员打开时的所有房间设置。之后，将开始新的房间扫描

###个人资料
*个人资料类型=此时只有星期一到星期日是支持者。其他的将很快实施
*配置文件的数量=如果您需要更多，然后在配置文件上增加该值。然后，您可以选择要使用的配置文件。
*周期数=定义您需要的每日不同温度段数。随着您设置的越多，将创建更多的数据点。最好使用低值（例如5）
* public holyday =如果你检查这个，你会得到一个单独的公共假期调整（尚未实施）

＃＃＃ 设备
*所有带恒温器和执行器的房间列表。你可以在这里禁用一个房间。您不应更改恒温器或执行器的设置，因为这将在您下次启动管理员时被覆盖

＃＃ 要求
*需要节点版本8或更高版本

##问题和功能请求
*如果您遇到任何错误或有此适配器的功能请求，请在[github]的适配器的GitHub问题部分中创建一个问题（https://github.com/rg-engineering/ioBroker.heatingcontrol/issues ）。任何反馈都表示赞赏，并将有助于改进此适配器。

## Changelog

### 0.0.5 (2019-07-08)
* (René) support for max! thermostats

### 0.0.4 (2019-06-23)
* (René) debugging

### 0.0.3 (2019-06-02)
* (René) ready to publish

### 0.0.2 (2019-05-19)
* (René) actuator handling added

### 0.0.1 (2019-04-27)
* (René) initial release

## License

Copyright (C) <2019>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.