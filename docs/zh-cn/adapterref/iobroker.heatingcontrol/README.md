---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.heatingcontrol/README.md
title: ioBroker.HeatingControl
hash: QFFQ+XpzNHiaN3UC8I8z18KMu//7TXoO1vmRGLC+mf8=
---
![商标](../../../en/adapterref/iobroker.heatingcontrol/admin/heatingcontrol.png)

![安装数量](http://iobroker.live/badges/heatingcontrol-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.heatingcontrol.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.heatingcontrol.svg)
![NPM](https://nodei.co/npm/iobroker.heatingcontrol.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/rg-engineering/ioBroker.heatingcontrol/master.svg)

＃ioBroker.HeatingControl
**如果您愿意，请考虑捐赠：**

[![贝宝（https://www.paypalobjects.com/zh_CN/DK/i/btn/btn_donateCC_LG.gif）](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YBAZTEBT9SYC2&source=url)

用于控制加热系统的适配器。

特征：

*根据时间表控制所有恒温器的设定温度水平
*为白天和黑夜配置多个供暖时段
*支持各种homematic和max！恒温器
*支持多个配置文件
*如果恒温器和执行器之间没有直接连接，则可以直接从适配器中切换执行器
*当前，当达到设定温度时，执行器直接关闭。只要设定温度低于实际温度，执行器便会打开。 （这样做：实施改进的控制）
*每个房间均支持无限制的恒温器，执行器和传感器
*每个房间自动检测恒温器，执行器和传感器。为此使用功能（例如“加热”）。
*如果房间中装有恒温器，但不应对其进行控制，则可以在管理界面中排除房间
*传感器用于降低目标温度（例如，如果窗户打开）；可选配SensorDelay
*与Feiertag-Adapter或任何其他接口，以检测公共假期。公众假期可以是正常的一天，也可以是星期日。 （管理员设置）
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
*如果没有加热时间=仅对执行器有效，请使用执行器。定义没有加热时间时如何设置执行器
*如果没有恒温器，则使用执行器=仅对执行器有效。如果您的房间没有恒温器但带有加热执行器，则可以永久打开或关闭它们

###个人资料
*配置文件类型=支持三种不同的配置文件类型（周一-周日，或周一-周五和周六/周日或每天）
*配置文件数量=如果您需要更多，则在配置文件上增加该值。然后，您可以选择要使用的配置文件。
*周期数=定义您需要多少个不同温度的每日区域。设置的越多，将创建更多的数据点。最好使用较低的值（例如5）
*““公众假期如星期天=如果您想在公众假期如星期天设置目标温度，请启用该选项。否则，公众假期设置与正常天相同
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

＃＃ 数据点
| DP名称|描述|
|---------------------|-----------------------------------------------------------------------------------------------------|
| ActivePeriodActive |如果关闭，则将不使用配置文件。 |
| CurrentProfile |选择当前配置文件（基于1，表示配置文件1使用heatingcontrol.0.Profiles.0下的数据点）|
| LastProgramRun |显示适配器运行的最后一次时间 |

###温度降低/升高
| DP名称|描述|相对降低的目标温度|绝对降低的目标温度|
|-------------------|------------------------------------------------------------|--------------------------------------------------------------------------------|---------------------------------------------------------------|
|来宾升高温度，因为客人想要变暖|通过Profiles.0.room.GuestIncrease增加当前剖面温度。将目标设置为Profiles.0.room.absolute.GuestIncrease |
| PartyNow |降低温度，因为温度变高'|通过Profiles.0.room.PartyDecrease降低当前温度曲线温度|将目标设置为Profiles.0.room.absolute.PartyDecrease |
|现在|我们在场，如果我们不在场降低温度|通过Profiles.0.room.AbsentDecrease降低当前温度曲线温度|将目标设置为Profiles.0.room.absolute.AbsentDecrease |
|假期缺席|我们缺席，所以周末也减少通过Profiles.0.room.VacationAbsentDecrease降低当前温度曲线温度|将目标设置为Profiles.0.room.absolute.VacationAbsentDecrease |

*在两种情况下，仅使用一次降脂（在适配器的先前版本中，可以使用一次以上的脱脂剂）
*在绝对脱脂配方中，仅使用不等于0°C的目标值。如果不需要降低某个房间的温度，则将降低值保持在0°C

＃＃ 其他
* HolidayPresent

如果HolidayPresent设置为true，则在任何情况下都将使用星期日的配置文件。我们假设您像星期天一样在家。

* PublicHolidyToday

有一个选项可以像周日一样处理PublicHoliday。可以在admin中启用此选项。

###窗口打开
如果“使用传感器”处于活动状态并且配置了一个房间的传感器，则

a）如果配置了相对降低，则通过Profiles.0.room.WindowOpenDecrease降低当前窗口温度（true）时通过Profiles.0.room.WindowOpenDecrease b）将窗口打开时将目标设置为Profiles.0.room.absolute.WindowOpenDecrease（true）如果绝对降低已配置

可选地，可以使用延迟。如果仅在短时间内打开窗户，则传感器延迟可以避免在很短的时间内减小并恢复正常。

##医疗支持
您可以使用日历来更改适配器中的数据点。
只需在admin中从ical配置事件即可。支持的是

*加热控制0.存在
*加热控制0.HolidayPresent
*加热控制0.缺席
* heatingcontrol.0.GuestsPresent
* heatingcontrol.0.PartyNow

＃＃ 要求
*需要8版或更高版本的节点

##问题和功能请求
*如果您遇到此适配器的任何错误或有功能要求，请在[github]（https://github.com/rg-engineering/ioBroker.heatingcontrol/issues ）。感谢您提供任何反馈意见，这将有助于改进此适配器。

## Changelog

### 0.3.10 (2019-12-xx)
* (René) see issue #54: stop override with OverrideTemperature =0
* (René) new priority for lowering reasons
* (René) handling of actuators without thermostat
* (René) see issue #66: handle lowering in time between 0:00 and first period
* (René) see issue #64: import of configuration fixed

### 0.3.9 (2019-12-14)
* (René) see issue #60: sensor delay
* (René) see issue #57: support of the same sensor for different rooms
* (René) bug fix: "AbsentDecrease not defined" for relative lowering

### 0.3.8 (2019-12-12)
* (René) see issue #59: TemperaturOverride: acceppt hh:mm and hh:mm:ss
* (René) PartyNow support by iCal 
* (René) if useActuators: show how many actuators are active (as a datapoint)

### 0.3.7 (2019-11-29)
Attention: some changes in datapoints!!
* (René) see issue  #53: moved datapoints for relative lowering into "relative"
* (René) new datapoint to show lowering decrease mode (heatingcontrol.0.TemperatureDecreaseMode)
* (René) guest present as interface to ical
* (René) see issue #52: support radar adapter
* (René) all external states checked when adapter starts

### 0.3.6 (2019-11-23)
Attention: some changes in datapoints!!
* (René) moved some datapoints from "profile" to "rooms"
* (René) see issue #50: support absolute and relative decrease of target temperature
* (René) do not check all rooms everytime: when data only for one room changed then check only one room
* (René) only one event is used to lower temperature
* (René) add interface to ical (path to vacation and path to holiday present datapoints)
* (René) support of more then one instance

### 0.3.4 (2019-11-09)
* (René) bug fix in data point name

### 0.3.3 (2019-11-08)
Attention: some changes in datapoints!!
* (René) in admin: new buttons to add search new rooms
* (René) bug fix: in profil type Mo-Fr / Sa- So period order check failed  
* (René) see issue #38: new datapoint for WindowIsOpen
* (René) change datapoint "CurrentTimePeriod" to "CurrentTimePeriodFull", "CurrentTimePeriod" and "CurrentTimePeriodTime"
* (René) bugfix datapoint name "Sa-Su"
* (René) see issue #16: new datapoint "state" per room to show reason for temperatur change 
* (René) change format of LastProgramRun date / time

### 0.3.2 (2019-11-01)
* (René) try to convert temperature to number if NaN
* (René) see issue #33: check for heating period when adapter starts
* (René) fix a problem in subscription function when room can not be found 

### 0.3.1 (2019-10-31)
* (René) see issue #42 and #44: check all sensors per room and set state when adapter starts
* (René) show message in admin when adapter is not online
* (René) pre-define devicelist; add dummy thermostat, if list is empty

### 0.3.0 (2019-10-27)
* (René) see issue #20 + #24: start and end of heating period is configurable in admin 
* (René) see issue #24: use external data point to set internal "present" data point 
* (René) see issue #15: manual temperatur override
* (René) see issue #35: delete of devices
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