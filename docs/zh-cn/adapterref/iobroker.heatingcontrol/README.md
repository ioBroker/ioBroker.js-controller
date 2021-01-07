---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.heatingcontrol/README.md
title: ioBroker.HeatingControl
hash: 2PQtLeckVKGn4znp7cn2E1jsJeLHKPYwsyQvRJFeJrA=
---
![商标](../../../en/adapterref/iobroker.heatingcontrol/admin/heatingcontrol.png)

![安装数量](http://iobroker.live/badges/heatingcontrol-stable.svg)
![NPM版本](https://img.shields.io/npm/v/iobroker.heatingcontrol.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.heatingcontrol.svg)
![测验](https://travis-ci.org/rg-engineering/ioBroker.heatingcontrol.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.heatingcontrol.png?downloads=true)

＃ioBroker.HeatingControl
**此适配器使用Sentry库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参见[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！ Sentry报告从js-controller 3.0开始使用。

**如果您愿意，请考虑捐赠：**

[![贝宝（https://www.paypalobjects.com/zh_CN/DK/i/btn/btn_donateCC_LG.gif）](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YBAZTEBT9SYC2&source=url)

##用于控制加热系统的适配器。
特征：

*根据时间表控制所有恒温器的设定温度水平
*为白天和黑夜配置多个供暖时段
*支持所有类型的恒温器（前提条件：它必须在ioBroker中可用）
* Homematic设备自动检测
*支持多个配置文件
*如果温控器和执行器之间没有直接连接，则可以直接从适配器中切换执行器
*当前，当达到设定温度时，执行器直接关闭。只要设定温度低于实际温度，执行器便会打开。 （要做的事情：实施改进的控制）
*每个房间支持无限数量的恒温器，执行器和传感器
*每个房间自动检测恒温器，执行器和传感器。为此使用功能（例如“加热”）。
*如果房间内装有恒温器，但不应对其进行控制，则可以在管理界面中排除房间
*传感器用于降低目标温度（例如，如果窗户打开）；可选配SensorDelay
*与Feiertag-Adapter或任何其他接口，以检测公众假期。公众假期可以是正常的一天，也可以是星期日。 （管理员设置）
*手动控制温度超过一定时间
*预定加热时间
*从恒温器接管更改（可选）
*支持来自[Pittini]（https://github.com/Pittini/iobroker-heatingcontrol-vis）的可视化。谢谢！

[常问问题](doc/FAQ.md)

##安装
##设置
###主要
*功能=每个房间用于检测恒温器，执行器和传感器的功能。这是系统枚举之一
*时区=用于cron调整cron作业
* Feiertag的路径-适配器=如果您拥有使用Feiertag-Adapter自动检测今天的公众假期的权限，请在此处设置路径（例如feiertage.0）
*当管理员打开时删除所有设备=应该被禁用。仅在需要删除所有房间，执行器和传感器设置时才启用它。当适配器管理员打开时，将执行设备搜索
*使用的传感器=如果您有窗户传感器，并且要在窗户打开时降低目标温度，则启用该选项
*使用的执行器=如果要直接从适配器控制执行器。万一温控器和执行器之间没有直接连接，以防万一。
*如果没有加热时间=仅对执行器有效，则使用执行器。定义在没有加热时间的情况下如何设置执行器
*如果没有恒温器，则使用执行器=仅对执行器有效。如果您的房间没有恒温器但带有加热执行器，则可以永久打开或关闭它们

###个人资料
*配置文件类型=支持三种不同的配置文件类型（周一至周日或周一至周五和周六/周日或每天）
*配置文件数量=如果您需要更多，则在配置文件上增加该值。然后，您可以选择要使用的配置文件。
*周期数=定义您需要多少个不同温度的每日区域。设置的越多，将创建更多的数据点。最好使用较低的值（例如5）
*““公众假期如星期天=如果您想在公众假期如星期天设置目标温度，请启用该选项。否则，公众假期设置与正常天相同
* HeatPeriod =加热周期的开始和结束日期。用于设置“ HeatingPeriodActive”

＃＃＃ 设备
*所有房间的清单。您可以在此处禁用房间。
*按右侧的编辑按钮可打开该房间的恒温器，执行器和传感器的设置窗口

###编辑室
*在这里您可以验证并设置恒温器，执行器和传感器的对象ID
*您可以手动添加新的恒温器，执行器或传感器。只需按+按钮。然后您会得到一个空行，需要填写。编辑按钮将打开系统上可用设备的列表
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
|现在|我们在场，如果我们不在场，降低温度|通过Profiles.0.room.AbsentDecrease降低当前温度曲线温度|将目标设置为Profiles.0.room.absolute.AbsentDecrease |
|假期缺席|我们缺席，所以周末也减少通过Profiles.0.room.VacationAbsentDecrease降低当前温度曲线温度|将目标设置为Profiles.0.room.absolute.VacationAbsentDecrease |

*在两种情况下，仅使用一次降脂（在适配器的早期版本中，可以使用一次以上的脱脂剂）
*在绝对脱脂配方中，仅使用不等于0°C的目标值。如果您不需要降低某个房间的温度，则将降低值保持在0°C

###没有加热时间
有三种选择

*固定每个房间的温度

如果选择此选项，则将为每个房间在对象树中显示一个新的数据点。您可以在此处设置固定目标温度，该目标温度在不激活加热时间时设置。

*修复所有房间的温度

使用此选项，您可以在不激活供暖时段时为每个房间使用一个目标温度

* 没有

如果没有激活加热时间，则使用此选项不会将任何东西发送到恒温器。当加热期间仍处于活动状态时，目标温度从最后一个标签开始保持。
在这种情况下，如果您使用适配器中的执行器，则可以定义执行器的设置方式（关闭，打开或保持原样）

＃＃ 其他
* HolidayPresent /今天公开假期

如果在管理员中启用了“像星期天一样的假日礼物”或“像星期天一样的公共假日”，则当适配器被告知今天是公共假日或您在家度假时，将使用星期日的个人资料。

###窗口打开
如果“使用传感器”处于活动状态并且配置了一个房间的传感器，则

*通过Profiles.0.room.WindowOpenDec（如果配置了相对降低）打开窗口时，降低当前轮廓温度（true）
*如果配置了绝对减小，则在打开窗口（真）时将目标设置为Profiles.0.room.absolute.WindowOpenDecrease

可选地，可以使用延迟。如果仅在短时间内打开窗户，则传感器延迟可以避免在很短的时间内减小并恢复正常。

##医疗支持
您可以使用日历或任何其他数据点来更改适配器中的数据点。
只需在admin中配置来自ical或其他数据点的事件即可。支持的是

|                                     |

| ------------------------------------- | ----------- -------------------------------------------------- --------------- |加热控制0.当前| |将其设置为true（如果是布尔型）或设置为一个比限制高的数字（如果是数字）| heatingcontrol.0.HolidayPresent |当您在假期在家中时，将其设置为true | heatingcontrol.0.VacationAbsent |当您不在家度假时，将其设置为true | heatingcontrol.0.GuestsPresent | |将其设置为true（如果是布尔值）或将其设置为一个更高的值（如果是数字，则为limit）| heatingcontrol.0.PartyNow |将其设置为true（对于布尔值）或大于限制的数字（对于数字）

提示：使用数字数据点，您可以算出房子里有多少人，然后再决定例如我们有足够的聚会...

##使用恒温器的更改
许多用户要求一个选项来将恒温器的更改接管适配器。现在实现了四个选项：

|选项|说明| -------------------------- | --------------------- -------------------------------------------------- ---------------- |没有温控器的变化将被忽略|作为替代|温控器的变化被视为优先；必须在heatingcontrol.0.Rooms.RoomName.TemperaturOverrideTime中提前设置替代时间。 |如果未设置替代时间，则不执行替代|作为新的配置文件设置|恒温器的变化被视为当前温度曲线期间的目标温度|直到下一个轮廓点|从恒温器的变化视为目标温度，直到下一个轮廓点。这是手动模式，因此仅使用窗口传感器。所有其他| |增加/减少被忽略。每个房间中都有一个数据点，可以在到达下一个配置文件点之前禁用手动模式。

##更改温度时扩展覆盖
替代的标准行为是，当您更改温度时，替代时间不会更改。例如，如果您在25°C下启动覆盖20分钟，而在15分钟后更改为28°C，则仅在最后5分钟使用28°C。使用该选项，只要您更改倍率温度，就可以重新启动倍率。
在高于28°C的示例中，将使用20分钟，这将导致15分钟（25°C）和20分钟（28°C）

##温控器处理“窗口打开”
一些恒温器可以自己处理“窗口打开”。在那些情况下，会配置车窗传感器和恒温器之间的直接连接，并且在打开车窗时恒温器会降低其目标温度。
结合选项“使用恒温器的更改” /“直到下一个配置文件点”将导致此状态变为意外的手动状态。在这种情况下，将使用降低的温度直到下一个轮廓点。
但是adpater可以处理此行为。您必须启用选项“ Thermostat处理'Window is Open'”，并且还可以在适配器中配置窗口传感器。
当窗口打开时，适配器等待最大值。恒温器设定的新目标温度为3秒。如果在那段时间内收到新的目标温度，它将用作降低的绝对温度。状态将变为“自动打开窗口”。窗户一旦关闭，状态就会恢复为自动，并且恒温器会将原始目标温度设置为“注意” **，在这种情况下，请勿使用“传感器打开延迟”。如果使用它，则从恒温器接收到目标温度后，将出现“打开窗口”事件。最终以手动状态结束。

##问题和功能请求
*如果您遇到此适配器的任何错误或有功能要求，请在[github]（https://github.com/rg-engineering/ioBroker.heatingcontrol/issues）的GitHub问题部分内创建一个问题。 ）。感谢您提供任何反馈意见，这将有助于改进此适配器。

＃＃ 已知的问题
###带有Homematic IPFußbodenheizungsaktorHmIP-FAL230-C10的适配器– 10fach，230 V
似乎HmIP-FAL230-C10无法与该适配器一起直接用作致动器。如果您将HmIP-FAL230-C10与Homematic温控器一起使用，它应该可以工作。
另请参阅[论坛](https://forum.iobroker.net/topic/22579/test-adapter-heatingcontrol-v1-0-x/1553)

当适配器崩溃或发生其他代码错误时，此错误消息（也出现在ioBroker日志中）将提交给Sentry。所有这些都帮助我提供了基本不会崩溃的无错误适配器。

## Changelog

### 2.0.0 (2021-01-xx)
* (René) internal refactoring

**ATTENTION: breaking changes !!!!**
* complete internal refactoring (new source files, internal data structures, code review, ...)
* **Periods and Profils count from 1 instead 0**
* ChangesFromThermostat adjustable per room is removed
* recalculation of room temperature is performed only for the room where necessary (in previous versions all rooms were recalculated and new value transmitted)
* SensorOpenDelay / SensorCloseDelay renamed
* ResetButton to disable manual mode (and go back to auto)
* status log per room
* complete profile can be saved and loaded in admin
* copy profile (complete or for a single room) and periods (for a certain profile and room) by button supported
* datapoint selector for external datapoints added in admin
* autodectection for thermostats, sensors and actuators completely overworked
* room detection overworked
* limits and step widh for profil temperatures adjustable in admin for Pittini vis
* simple window status view (in html) for Pittini vis added
* room state as simple html table for vis added
* (optionally) extend override when temperature is changed; in standard new temperature is set, but timer is not changed
* (optionally) Thermostat handles "window is open"
* issues in github: 
	* #161 Profil springt zur angegebenen Zeit nicht um
	* #153 cron Probleme beim ändern eines Profils mittels Javascript
	* #152 Fenstererkennung im manuellen Modus
	* #148 Bei Änderung vom Thermostat bis zum nächsten Profilpunkt müssen Sensoren berücksichtigt werden


### 1.1.2 (2020-11-11)
* (René) bug fix: activate actors after temperatur change

### 1.1.0 (2020-11-01)
* (René) see issue #149: bug fix: calculate current period in case we are still in last period from yesterday

### 1.1.0 (2020-10-20)
* (René) see issue #132: timer before on and off for actuators 
* (René) see issue #143: additional checks to avoid unneccessary override 
* (René) see issue #140: use guests present and party now DP's also as counter like present (as a option); add adjustable counter limit for present, party now and guest present
* (René) see issue #145: avoid reset of target temperatur by profile settings in option "until next profil point" when set by thermostat 

### 1.0.0 (2020-10-09)
* (matida538) added better Handling of strings in HandleThermostat (convert to Number, instead of warn) (e.g. fhem connector for fht80)
* (matida538) changed Check4ValidTemperature to convert strings to Number instead of Int (else we lose information e.g. 18.5 will be 18)
* (René) some smaller code optimisations

### 0.6.0 (2020-09-15)
* (René) see issue #123: use window open / close delay only when window state changed
* (René) see issue #122: better log for different type warning
* (René) see issue #120: override from thermostat only if it's different to current settings
* (René) see issue #126: TestThermostat should not be checked for correct configuration
* (René) see issue #124: vis from Pittini: Image for open / closed window adjustabel (as an option, if nothing is configured the original will be used)
* (René) see issue #127: use value from thermostat until next profile point 
* (René) see issue #128: try to convert string data to number

### 0.5.7 (2020-07-07)
* (René) see issue #116: get MinimumTemperature for vis only if enabled

### 0.5.6 (2020-06-14)
* (René) see issue #113: re-order of rooms added
* (René) see issue #112: bug fix "Fensterübersicht"

### 0.5.4 (2020-06-04)
* (René) bug fix: HeatingControlVis avoid exceptions like "Cannot read property 'val' of null"

### 0.5.3 (2020-06-03)
* (René) bug fix: new temperatures set when current profile is changed
* (René) refactoring HeatingControlVis to avoid exceptions like "Cannot read property 'val' of null"

### 0.5.2 (2020-05-25)
* (René) bug fix: log a warning if actors are configured but UseActors are off

### 0.5.1 (2020-05-22)
* (René) log a warning if actors are configured but UseActors are off
* (René) sentry added
* (René) some hints in admin

### 0.5.0 (2020-05-03)
* (René) see issue #101: sensor close delay added (similar to already existing sensor open delay)
* (René) see issue #103: date/time format string corrected for vis
* (René) see issue #104: bug fix to take over changes from vis
* (René) see issue #102: bug fix change current time period to be shown on vis

### 0.4.0 (2020-05-02)
* (René) see issue #70: use changes from thermostat
* (René) see issue #91 bug fix: if the same sensor is configured for more than one room thermostat target temperature will be set for all configured rooms
* (René) script from Pittini integrated to support his visualization [Pittini](https://github.com/Pittini/iobroker-heatingcontrol-vis) 
* (Dutchman) some refactoring 

### 0.3.19 (2020-03-15)
* (René) create correct cron job for sunday if profile type "every day" is used
* (René) see issue #87: change type of time data points to string
* (René) see issue #87: set correct roles for data points
* (René) see issue #84: set default value for minimum temperature
* (René) see issue #86: all "float" converted to "number""

### 0.3.18 (2020-03-08)
* (René) fix issues reported by adapter checker

### 0.3.17 (2020-03-01)
* (René) check datapoint configuration: if datapoint points to itself then error messages
* (René) support of new vis see issue  #76
* (Rene) thermostat mode if no heating period

### 0.3.16 (2020-02-09)
* (René) deccrease/increase-handling also when Override is active (see issue #72)
* (René) priority handling for temperature increase / decrease overworked (use only values not equal zero)

### 0.3.15 (2020-01-18)
* (René) bug fix: avoid exception when go to override if MinTemperature-check is active

### 0.3.14 (2020-01-12)
* (René) format conversion for temperatures in string to number
* (René) ack for MinTemperature

### 0.3.13 (2019-12-28)
* (René) bugfix create cron jobs for profile type 3 (daily)

### 0.3.12 (2019-12-27)
* (René) bugfix exception in CheckTemperatureChange [ReferenceError: RoomState is not defined] 

### 0.3.11 (2019-12-27)
* (René) option: minimum temperature per room
* (René) bugfix exception in CheckTemperatureChange [ReferenceError: PublicHolidyToday is not defined] 

### 0.3.10 (2019-12-26)
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

Copyright (C) <2019-2021>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.