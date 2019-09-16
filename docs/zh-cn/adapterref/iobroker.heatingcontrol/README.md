---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.heatingcontrol/README.md
title: ioBroker.HeatingControl
hash: CIUJBr/fS2w6jX5rdIKlxt0JPx9RDk/w3qim/zQANb8=
---
![商标](../../../en/adapterref/iobroker.heatingcontrol/admin/heatingcontrol.png)

![安装数量](http://iobroker.live/badges/heatingcontrol-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.heatingcontrol.svg)
![下载](https://img.shields.io/npm/dm/iobroker.heatingcontrol.svg)
![NPM](https://nodei.co/npm/iobroker.heatingcontrol.png?downloads=true)
![特拉维斯-CI](http://img.shields.io/travis/rg-engineering/ioBroker.heatingcontrol/master.svg)

＃ioBroker.HeatingControl
用于控制加热系统的适配器。

特征：

*按时间表控制所有恒温器的设定温度水平
*为每天和晚上配置多个加热时段
*支持各种homematic和max！温控器
*支持多个配置文件
*如果恒温器和执行器之间没有直接连接，执行器可以直接从适配器中切换出来
*目前，当达到设定点温度时，执行器会立即关闭。一旦设定点温度低于实际温度，执行器就会打开。 （要做：实施改进的控制）
*支持每间客房无限制的恒温器，执行器和sonsor
*每个房间自动检测恒温器，执行器和传感器。该功能（例如“加热”）用于此。
*如果房间包含恒温器但不应控制，则可以在管理界面中排除房间
*传感器用于降低目标温度（例如，如果窗户打开）
*与Feiertag-Adapter或任何其他人接口以检测公共假期。公众假期可以是正常的一天，也可以像星期日一样。 （管理员设置）
*稍后将提供可视化示例

##设置
### Main
*功能=用于检测每个房间的恒温器，执行器和传感器的功能。这是系统之一
* timezone =用于cron调整cron作业
* Feiertag的路径 - 适配器=如果你想使用Feiertag-Adapter自动检测今天的公共假期，那么在这里设置路径（例如feiertage.0）
*当admin打开时删除所有设备=应禁用。仅在需要删除所有房间，执行器和传感器设置时启用它。适配器管理员打开时将执行设备搜索
*使用传感器=如果您有窗口传感器，并且您希望在窗口打开时降低目标温度，则启用该选项
*演员使用=如果你想直接从适配器控制执行器。以防止恒温器和执行器之间没有直接连接。
*如果没有加热周期=仅对执行器有效，则使用执行器。定义在没有加热周期有效时如何设置执行器
*如果没有可用的恒温器，则使用执行器=仅对执行器有效。如果您的房间没有恒温器但带有加热执行器，您可以打开或关闭它们

###个人资料
*配置文件类型=支持三种不同的配置文件类型（周一 - 周日，或周一 - 周五和周六/周日或每天）
*配置文件的数量=如果您需要更多，然后在配置文件上增加该值。然后，您可以选择要使用的配置文件。
*周期数=定义您需要的每日不同温度段数。随着您设置的越多，将创建更多的数据点。最好使用低值（例如5）
*“像星期日这样的公众假期=如果你想在公众假期设定目标温度，如周日启用该选项。否则公共假期设置与正常日期相同

＃＃＃ 设备
*所有房间的清单。你可以在这里禁用一个房间。
*按右侧的编辑按钮打开该房间的恒温器，执行器和传感器的设置窗口

###编辑室
*在这里，您可以验证并设置恒温器，执行器和传感器的对象ID
*您可以手动添加新的恒温器，执行器或传感器。只需按+按钮。然后你得到一个需要填满的空行。编辑按钮打开系统上可用设备的列表
*恒温器：

**应设置名称，温度目标OID和当前温度OID。

*执行器

**应设置州的名称和OID

*传感器

**应设置当前状态的名称和OID

＃＃ 要求
*需要节点版本8或更高版本

##问题和功能请求
*如果您遇到任何错误或有此适配器的功能请求，请在[github]的适配器的GitHub问题部分中创建一个问题（https://github.com/rg-engineering/ioBroker.heatingcontrol/issues ）。任何反馈都表示赞赏，并将有助于改进此适配器。

## Changelog

### 0.2.2 (2019-09-13)
* (René) see issue #14: description of datapoint time changed ('from' instead 'until')
* (René) see issue #12: unnecessary warnings removed
* (René) see issue #17: seconds removed from time list
* (René) datepoint change handling reworked
* (René) see issue #18: take over values from external PublicHoliday-datapoint

### 0.2.1 (2019-09-08)
* (René) bug fixes in actuator handling

### 0.2.0 (2019-09-05)
* (René) path to Feiertag-Adapter can also include a complete datapoint path 

### 0.1.0 (2019-08-25)
* (René) redesign of data structure
	- more then one actuator, sensor and thermostat per room
	- three different profile types
	- manual configuration of devices (if device is not detected automatically)
	- interface to Feiertag-Adapter
	- public holiday as normal day or like sunday (setting in admin)
	- window sensor support. Reduce target temperature when window is open
	- !!ATTENTION!! data structure/objects has been changed. You need to update your visualisation settings

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