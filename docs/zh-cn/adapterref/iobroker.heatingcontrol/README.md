---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.heatingcontrol/README.md
title: ioBroker.HeatingControl
hash: 1ToEgJe7doDulYCX0KfF2YpHGeMzxNdZcpovXFyKcI8=
---
![商标](../../../en/adapterref/iobroker.heatingcontrol/admin/heatingcontrol.png)

![安装数量](http://iobroker.live/badges/heatingcontrol-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.heatingcontrol.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.heatingcontrol.svg)
![NPM](https://nodei.co/npm/iobroker.heatingcontrol.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/rg-engineering/ioBroker.heatingcontrol/master.svg)

＃ioBroker.HeatingControl
用于控制加热系统的适配器。

特征：

*根据时间表控制所有恒温器的设定温度水平
*为白天和黑夜配置多个供暖时段
*支持各种homematic和max！温控器
*支持多个配置文件
*如果恒温器和执行器之间没有直接连接，则可以直接从适配器中切换执行器
*当前，当达到设定温度时，执行器直接关闭。只要设定温度低于实际温度，执行器便会打开。 （这样做：实施改进的控制）
*每个房间均支持无限制的恒温器，执行器和传感器
*每个房间自动检测恒温器，执行器和传感器。为此使用功能（例如“加热”）。
*如果房间内装有恒温器，但不应对其进行控制，则可以在管理界面中排除房间
*传感器用于降低目标温度（例如，如果窗户打开）
*与Feiertag-Adapter或任何其他接口，以检测公众假期。公众假期可以是正常的一天，也可以是星期日。 （管理员设置）
*手动控制温度超过一定时间
*预定加热时间
*稍后将提供可视化示例

##设置
###主要
*功能=每个房间用于检测恒温器，执行器和传感器的功能。这是系统枚举之一
*时区=用于cron调整cron作业
* Feiertag的路径-适配器=如果您使用Feiertag-Adapter自动检测今天的公共假期，则在此处设置路径（例如feiertage.0）
*当管理员打开时删除所有设备=应该被禁用。仅在需要删除所有房间，执行器和传感器设置时才启用它。当适配器管理员打开时，将执行设备搜索
*使用的传感器=如果您有窗户传感器，并且要在窗户打开时降低目标温度，则启用该选项
*使用的执行器=如果要直接从适配器控制执行器。万一温控器和执行器之间没有直接连接，以防万一。
*如果没有加热时间，则使用执行器=仅对执行器有效。定义没有加热时间时如何设置执行器
*如果没有恒温器，则使用执行器=仅对执行器有效。如果您的房间没有恒温器但带有加热执行器，则可以永久打开或关闭它们

###个人资料
*配置文件类型=支持三种不同的配置文件类型（周一-周日，或周一-周五和周六/周日或每天）
*配置文件数量=如果需要更多，则在配置文件上增加该值。然后，您可以选择要使用的配置文件。
*周期数=定义您需要多少个不同温度的每日区域。设置的越多，将创建更多的数据点。最好使用较低的值（例如5）
*““公众假期如星期天=如果您要在公众假期如星期天设置目标温度，请启用该选项。否则，公众假期设置与正常天相同
* HeatPeriod =加热周期的开始和结束日期。用于设置“ HeatingPeriodActive”

＃＃＃ 设备
*所有房间的清单。您可以在此处禁用房间。
*按右侧的编辑按钮可打开该房间的恒温器，执行器和传感器的设置窗口

###编辑室
*您可以在此处验证并设置恒温器，执行器和传感器的对象ID
*您可以手动添加新的恒温器，执行器或传感器。只需按+按钮。然后，您会得到一个空行，需要填写。编辑按钮将打开系统上可用设备的列表
*温控器：

**应设置名称，目标温度OID和当前温度OID。

*执行器

**应该设置状态的名称和OID

*传感器

**应设置当前状态的名称和OID

＃＃ 要求
*需要节点版本8或更高版本

##问题和功能请求
*如果您遇到此适配器的任何错误或有功能要求，请在[github]（https://github.com/rg-engineering/ioBroker.heatingcontrol/issues ）。感谢您提供任何反馈意见，这将有助于改进此适配器。

## Changelog

### 0.3.0 (2019-10-xx)
* (René) see issue #20 + #24: start and end of heating period is configurable in admin 
* (René) see issue #24: use external data point to set internal "present" data point 
* (René) see issue #15: manual temperatur override
* (René) reset DeleteAll at next admin start 


### 0.2.3 (2019-09-20)
* (René) see issue #19: handling of enums created in iobroker admin fixed
* (René) see issue #13: check order of periods; if order is wrong (next time is smaller than previous) then time si not used for cron and a warning appears in log
* (René) see issue #21: check temperatures after changing of period settings (e.g. time)
* (René) see issue #25: select OID for target and current of thermostat in admin overworked
* (René) change datapoint type from bool to boolean


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